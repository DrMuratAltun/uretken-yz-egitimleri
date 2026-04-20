"""
Google Sheets'ten indirilen CSV'yi okuyup curriculum.ts'deki
topics/assignments/resources alanlarını günceller.

Kullanım:
    python scripts/update_curriculum_from_csv.py <csv_path>

Sadece topics, assignments, resources alanlarını değiştirir.
Diğer alanlar (notebooks, pptxFile, vb.) olduğu gibi kalır.
"""

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CURRICULUM = ROOT / "web" / "src" / "data" / "curriculum.ts"


def escape_ts_string(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def format_array(items: list[str], indent: str = "      ") -> str:
    if not items:
        return "[]"
    lines = [f"{indent}  '{escape_ts_string(item)}',"
             for item in items if item.strip()]
    if not lines:
        return "[]"
    return "[\n" + "\n".join(lines) + f"\n{indent}]"


def format_resources(items: list[dict], indent: str = "    ") -> str:
    if not items:
        return "[]"
    lines = []
    for r in items:
        label = escape_ts_string(r["label"])
        url = escape_ts_string(r["url"])
        lines.append(
            f"{indent}  {{ label: '{label}', url: '{url}' }},"
        )
    return "[\n" + "\n".join(lines) + f"\n{indent}]"


def parse_resources(raw: str) -> list[dict]:
    resources = []
    for line in raw.strip().splitlines():
        line = line.strip()
        if not line:
            continue
        if "|" in line:
            label, url = line.split("|", 1)
            resources.append({"label": label.strip(), "url": url.strip()})
    return resources


def parse_csv(csv_path: Path) -> dict[int, dict]:
    data = {}
    with csv_path.open("r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                week_id = int(row["hafta_id"])
            except (KeyError, ValueError):
                continue
            data[week_id] = {
                "topics": [
                    t.strip()
                    for t in row.get("konular", "").splitlines()
                    if t.strip()
                ],
                "assignments": [
                    a.strip()
                    for a in row.get("odevler", "").splitlines()
                    if a.strip()
                ],
                "resources": parse_resources(row.get("kaynaklar", "")),
            }
    return data


def update_ts(ts_content: str, data: dict[int, dict]) -> str:
    """Her haftanın topics/assignments/resources bloklarını değiştir."""
    result = ts_content
    changes = 0

    for week_id, fields in data.items():
        # Haftayı bul (id: N, ... bloğu)
        week_pattern = re.compile(
            r"(\{\s*id:\s*" + str(week_id) + r",.*?\})(?=,\s*\{|\s*\];)",
            re.DOTALL,
        )
        m = week_pattern.search(result)
        if not m:
            print(f"⚠️  Hafta {week_id} bulunamadı, atlanıyor")
            continue

        block = m.group(1)
        new_block = block

        # topics
        new_topics = format_array(fields["topics"], indent="    ")
        new_block = re.sub(
            r"topics:\s*\[.*?\](?=,\s*\w+:)",
            f"topics: {new_topics}",
            new_block,
            count=1,
            flags=re.DOTALL,
        )

        # assignments
        new_assignments = format_array(fields["assignments"], indent="    ")
        new_block = re.sub(
            r"assignments:\s*\[.*?\](?=,\s*\w+:)",
            f"assignments: {new_assignments}",
            new_block,
            count=1,
            flags=re.DOTALL,
        )

        # resources
        new_resources = format_resources(fields["resources"], indent="    ")
        new_block = re.sub(
            r"resources:\s*\[.*?\](?=,\s*\w+:)",
            f"resources: {new_resources}",
            new_block,
            count=1,
            flags=re.DOTALL,
        )

        if new_block != block:
            result = result.replace(block, new_block, 1)
            changes += 1

    print(f"✅ {changes} hafta güncellendi")
    return result


def main():
    if len(sys.argv) < 2:
        print("Kullanım: python update_curriculum_from_csv.py <csv_path>")
        sys.exit(1)

    csv_path = Path(sys.argv[1])
    if not csv_path.exists():
        print(f"❌ CSV bulunamadı: {csv_path}")
        sys.exit(1)

    data = parse_csv(csv_path)
    print(f"📊 {len(data)} hafta okundu: {csv_path.name}")

    ts_content = CURRICULUM.read_text(encoding="utf-8")
    updated = update_ts(ts_content, data)

    if updated == ts_content:
        print("ℹ️  Değişiklik yok.")
        return

    CURRICULUM.write_text(updated, encoding="utf-8")
    print(f"📝 {CURRICULUM.relative_to(ROOT)} güncellendi")


if __name__ == "__main__":
    main()
