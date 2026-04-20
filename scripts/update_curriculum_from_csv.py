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


def find_week_blocks(ts_content: str) -> list[tuple[int, int, int]]:
    """Her haftanın (id, start_pos, end_pos) bilgisini döndürür."""
    # id: N, satırlarının başlangıç konumlarını bul
    id_positions = []
    for m in re.finditer(r"^\s*id:\s*(\d+),\s*$", ts_content, re.MULTILINE):
        id_positions.append((int(m.group(1)), m.start()))

    blocks = []
    for i, (wid, start) in enumerate(id_positions):
        end = id_positions[i + 1][1] if i + 1 < len(id_positions) else len(ts_content)
        blocks.append((wid, start, end))
    return blocks


def update_block(block: str, fields: dict) -> str:
    """Hafta bloğundaki topics/assignments/resources alanlarını değiştir."""
    new_block = block

    # topics: satır başında, [ ile başlar, aynı girinti düzeyinde ] ile biter
    topics_pattern = r"(^(\s*)topics:\s*)\[\s*$.*?^\2\],?\s*$"
    if re.search(topics_pattern, new_block, re.MULTILINE | re.DOTALL):
        new_topics = format_array(fields["topics"], indent="    ")
        new_block = re.sub(
            topics_pattern,
            lambda m: f"{m.group(1)}{new_topics},",
            new_block,
            count=1,
            flags=re.MULTILINE | re.DOTALL,
        )
    else:
        # Tek satır içeren yapı: topics: []
        new_topics = format_array(fields["topics"], indent="    ")
        new_block = re.sub(
            r"^(\s*)topics:\s*\[\s*\],?\s*$",
            lambda m: f"{m.group(1)}topics: {new_topics},",
            new_block,
            count=1,
            flags=re.MULTILINE,
        )

    # assignments
    assignments_pattern = r"(^(\s*)assignments:\s*)\[\s*$.*?^\2\],?\s*$"
    if re.search(assignments_pattern, new_block, re.MULTILINE | re.DOTALL):
        new_assignments = format_array(fields["assignments"], indent="    ")
        new_block = re.sub(
            assignments_pattern,
            lambda m: f"{m.group(1)}{new_assignments},",
            new_block,
            count=1,
            flags=re.MULTILINE | re.DOTALL,
        )
    else:
        new_assignments = format_array(fields["assignments"], indent="    ")
        new_block = re.sub(
            r"^(\s*)assignments:\s*\[\s*\],?\s*$",
            lambda m: f"{m.group(1)}assignments: {new_assignments},",
            new_block,
            count=1,
            flags=re.MULTILINE,
        )

    # resources
    resources_pattern = r"(^(\s*)resources:\s*)\[\s*$.*?^\2\],?\s*$"
    if re.search(resources_pattern, new_block, re.MULTILINE | re.DOTALL):
        new_resources = format_resources(fields["resources"], indent="    ")
        new_block = re.sub(
            resources_pattern,
            lambda m: f"{m.group(1)}{new_resources},",
            new_block,
            count=1,
            flags=re.MULTILINE | re.DOTALL,
        )
    else:
        new_resources = format_resources(fields["resources"], indent="    ")
        new_block = re.sub(
            r"^(\s*)resources:\s*\[\s*\],?\s*$",
            lambda m: f"{m.group(1)}resources: {new_resources},",
            new_block,
            count=1,
            flags=re.MULTILINE,
        )

    return new_block


def update_ts(ts_content: str, data: dict[int, dict]) -> str:
    """Her haftanın topics/assignments/resources bloklarını değiştir."""
    blocks = find_week_blocks(ts_content)
    changes = 0

    # Son haftadan başa doğru işleyerek konum değişmesini engelle
    result = ts_content
    for wid, start, end in reversed(blocks):
        if wid not in data:
            continue
        old_block = result[start:end]
        new_block = update_block(old_block, data[wid])
        if new_block != old_block:
            result = result[:start] + new_block + result[end:]
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
