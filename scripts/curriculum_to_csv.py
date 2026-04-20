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


def extract_weeks(ts_content: str):
    """curriculum.ts dosyasındaki weeks array'ini parse eder."""
    weeks = []

    week_pattern = re.compile(
        r"\{\s*id:\s*(\d+),.*?\}(?=,\s*\{|\s*\];)",
        re.DOTALL,
    )

    for match in week_pattern.finditer(ts_content):
        block = match.group(0)
        week_id = int(match.group(1))

        title = _extract_string(block, "title")
        topics = _extract_array(block, "topics")
        assignments = _extract_array(block, "assignments")
        resources = _extract_resources(block)

        weeks.append(
            {
                "id": week_id,
                "title": title,
                "topics": topics,
                "assignments": assignments,
                "resources": resources,
            }
        )

    return weeks


def _extract_string(block: str, key: str) -> str:
    m = re.search(rf"{key}:\s*'((?:[^'\\]|\\.)*)'", block)
    if not m:
        m = re.search(rf'{key}:\s*"((?:[^"\\]|\\.)*)"', block)
    return m.group(1).replace("\\'", "'").replace('\\"', '"') if m else ""


def _extract_array(block: str, key: str) -> list[str]:
    pattern = key + r":\s*\[(.*?)\](?=,\s*(?:\w+:|\}))"
    m = re.search(pattern, block, re.DOTALL)
    if not m:
        return []
    content = m.group(1)
    items = re.findall(r"'((?:[^'\\]|\\.)*)'", content)
    return [it.replace("\\'", "'").replace('\\"', '"') for it in items]


def _extract_resources(block: str) -> list[dict]:
    m = re.search(r"resources:\s*\[(.*?)\](?=,\s*(?:\w+:|\}))", block, re.DOTALL)
    if not m:
        return []
    content = m.group(1)
    resources = []
    for obj in re.finditer(
        r"\{\s*label:\s*'((?:[^'\\]|\\.)*)'\s*,\s*url:\s*'((?:[^'\\]|\\.)*)'\s*\}",
        content,
    ):
        resources.append({"label": obj.group(1), "url": obj.group(2)})
    return resources


def main():
    ts_content = CURRICULUM.read_text(encoding="utf-8")
    weeks = extract_weeks(ts_content)

    with OUTPUT.open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(
            [
                "hafta_id",
                "baslik",
                "konular",
                "odevler",
                "kaynaklar",
            ]
        )
        for w in weeks:
            writer.writerow(
                [
                    w["id"],
                    w["title"],
                    "\n".join(w["topics"]),
                    "\n".join(w["assignments"]),
                    "\n".join(
                        f"{r['label']} | {r['url']}" for r in w["resources"]
                    ),
                ]
            )

    print(f"✅ {len(weeks)} hafta → {OUTPUT}")
    print()
    print("📋 Sıradaki adımlar:")
    print("  1. Google Sheets aç: sheets.new")
    print(f"  2. Dosya → İçe Aktar → {OUTPUT.name}")
    print("  3. Ayırıcı: Virgül, 'Mevcut sayfayı değiştir' seç")
    print("  4. Paylaş → 'Bağlantıya sahip herkes (Görüntüleyici)'")
    print("  5. Sheet ID'sini CURRICULUM_SYNC.ipynb'ye yapıştır")


if __name__ == "__main__":
    main()
