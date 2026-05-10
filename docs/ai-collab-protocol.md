# AI İşbirliği Protokolü — Üretken YZ Atölyesi

> Bu proje için Claude + Gemini + Dr. Murat üçlüsünün çalışma şekli.
> Genel protokol: `~/.claude/CLAUDE.md` — bu dosya proje-spesifik detayları içerir.

## Roller

| Katılımcı | Rol |
|---|---|
| **Claude** | Birincil geliştirici (Maker) — kod yazma, içerik üretimi, test, deploy, dosya yönetimi |
| **Gemini** | Reviewer / Mimari Danışman — müfredat tutarlılığı, Türkçe terimce, MEB rehberi uyumu, mega-context analizi |
| **Dr. Murat** | Proje sahibi, nihai karar verici, eğitim alanı uzmanı |

## Mesaj Formatı

- `Claude:` prefiksi — Claude yazıyor
- `Gemini:` prefiksi — Gemini yazıyor
- `Dr. Murat:` prefiksi — Dr. Murat yazıyor
- Prefiks unutulursa kibarca hatırlat

## İş Bölümü

### Claude birincil
- `web/src/data/curriculum.ts` içerik üretimi
- Astro sayfaları (`index.astro`, `hafta/[id].astro`, `egitmen.astro`)
- Layout, JSON-LD, OG meta, favicon, OG image
- PPTX generator'lar (`gen_haftaXX.js`) — pptxgenjs + Warm Terracotta
- Notebook üretimi (markdown ağırlıklı, araç kılavuzu)
- Drive yükleme, link yönetimi, CSV sync scriptleri
- Build, test, deploy (Vercel/GitHub Pages)

### Gemini birincil
- Müfredat akış kontrolü (3 bölüm yoğunluk dengesi)
- MEB rehberi 45+ aracın haftalara isabetle dağıtılması
- Türkçe LLM/araç adı tutarlılığı
- Lokal LLM bölümü (Hafta 12-13) donanım rehberi review
- Capstone proje rubriği önerisi
- KVKK / etik bölümler review

### Dr. Murat
- Vizyon, kapsam, hedef kitle kararları
- Branding ve dil tonu nihai onayı
- WhatsApp/sosyal medya CTA stratejisi
- Drive paylaşım klasörü organizasyonu
- Sertifika ve değerlendirme kuralları

## Çalışma Akışı

1. Dr. Murat görevi tanımlar → Claude planlar (`.claude/plans/`) → onay → Claude implement eder
2. Claude review özeti hazırlar → `docs/ai_collab_chat.md`'ye ekler
3. Dr. Murat özeti Gemini'ye iletir
4. Gemini review yapar → response `docs/ai_collab_chat.md`'ye eklenir
5. Claude düzeltir + test eder → Dr. Murat nihai onay verir
6. Kararlar `docs/AI_DECISIONS.md`'ye ADR formatında kaydedilir

## Ortak Dosyalar

| Dosya | Amaç |
|---|---|
| `docs/AI_DECISIONS.md` | Alınan kararlar, açık sorular (ADR) |
| `docs/ai_collab_chat.md` | Üçlü iletişim panosu — append-only |
| `docs/ai-collab-protocol.md` | Bu dosya |
| `CLAUDE.md` (proje kökünde, opsiyonel) | Claude'un projeye özel talimatları |
| `GEMINI.md` (proje kökünde, opsiyonel) | Gemini'nin projeye özel talimatları |
| `README.md` | Proje genel bilgisi, build/deploy talimatları |

## Versiyonlama

- Faz A — İskelet (curriculum.ts + ana sayfalar) ✅ tamamlandı (commit `1b57357`)
- Faz B — İçerik detayı + ADR + README (in progress)
- Faz C — PPTX generator'lar (14 dosya)
- Faz D — Notebook'lar (~60 ipynb, çoğu markdown)
- Faz E — OG image + favicon ✅ tamamlandı
- Faz F — SEO (sitemap, robots) + deploy + push
