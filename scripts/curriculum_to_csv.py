"""
curriculum.ts'deki Konular, Ödevler, Kaynaklar verisini Google Sheets'e
import edilebilir CSV formatına dönüştürür.

Kullanım:
    python scripts/curriculum_to_csv.py

Çıktı: scripts/curriculum_sheets_template.csv
"""

import csv
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CURRICULUM = ROOT / "web" / "src" / "data" / "curriculum.ts"
OUTPUT = ROOT / "scripts" / "curriculum_sheets_template.csv"


def split_weeks(ts_content: str) -> list[tuple[int, str]]:
    """Her haftayı 'id: N,' satırları arasına bölerek ayır."""
    # Her haftanın başlangıç pozisyonunu bul
    week_starts = []
    for m in re.finditer(r"^\s*id:\s*(\d+),\s*$", ts_content, re.MULTILINE):
        week_starts.append((int(m.group(1)), m.start()))

    weeks = []
    for i, (wid, start) in enumerate(week_starts):
        end = week_starts[i + 1][1] if i + 1 < len(week_starts) else len(ts_content)
        weeks.append((wid, ts_content[start:end]))
    return weeks


def extract_string(block: str, key: str) -> str:
    m = re.search(rf"^\s*{key}:\s*'((?:[^'\\]|\\.)*)'", block, re.MULTILINE)
    if not m:
        m = re.search(rf'^\s*{key}:\s*"((?:[^"\\]|\\.)*)"', block, re.MULTILINE)
    return m.group(1).replace("\\'", "'").replace('\\"', '"') if m else ""


def extract_string_array(block: str, key: str) -> list[str]:
    """topics/assignments gibi string dizilerini çıkar."""
    # Satır başında "key: [" ile başlayıp aynı girinti seviyesinde "]" ile biten blok
    pattern = rf"^(\s*){key}:\s*\[\s*$(.*?)^\1\],?\s*$"
    m = re.search(pattern, block, re.MULTILINE | re.DOTALL)
    if not m:
        # Tek satırlı: key: []
        m2 = re.search(rf"^\s*{key}:\s*\[\s*\]", block, re.MULTILINE)
        if m2:
            return []
        # Tek satırlı içerikli: key: ['...', '...']
        m3 = re.search(rf"^\s*{key}:\s*\[([^\]]*)\]", block, re.MULTILINE)
        if m3:
            content = m3.group(1)
        else:
            return []
    else:
        content = m.group(2)

    items = re.findall(r"'((?:[^'\\]|\\.)*)'", content)
    return [it.replace("\\'", "'").replace('\\"', '"') for it in items]


def extract_resources(block: str) -> list[dict]:
    """resources: [{ label: '...', url: '...' }, ...] ayrıştır."""
    pattern = r"^(\s*)resources:\s*\[\s*$(.*?)^\1\],?\s*$"
    m = re.search(pattern, block, re.MULTILINE | re.DOTALL)
    if not m:
        # Tek satır boş: resources: []
        if re.search(r"^\s*resources:\s*\[\s*\]", block, re.MULTILINE):
            return []
        return []

    content = m.group(2)
    resources = []
    for obj in re.finditer(
        r"\{\s*label:\s*'((?:[^'\\]|\\.)*)'\s*,\s*url:\s*'((?:[^'\\]|\\.)*)'\s*\}",
        content,
    ):
        resources.append({
            "label": obj.group(1).replace("\\'", "'"),
            "url": obj.group(2).replace("\\'", "'"),
        })
    return resources


def main():
    ts_content = CURRICULUM.read_text(encoding="utf-8")
    weeks = split_weeks(ts_content)

    rows = []
    for week_id, block in weeks:
        rows.append({
            "id": week_id,
            "title": extract_string(block, "title"),
            "topics": extract_string_array(block, "topics"),
            "assignments": extract_string_array(block, "assignments"),
            "resources": extract_resources(block),
        })

    with OUTPUT.open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["hafta_id", "baslik", "konular", "odevler", "kaynaklar"])
        for r in rows:
            writer.writerow([
                r["id"],
                r["title"],
                "\n".join(r["topics"]),
                "\n".join(r["assignments"]),
                "\n".join(f"{x['label']} | {x['url']}" for x in r["resources"]),
            ])

    print(f"✅ {len(rows)} hafta → {OUTPUT.name}")
    for r in rows:
        print(
            f"  Hafta {r['id']:2d}: "
            f"konular={len(r['topics'])}, "
            f"ödevler={len(r['assignments'])}, "
            f"kaynaklar={len(r['resources'])}"
        )


if __name__ == "__main__":
    main()
