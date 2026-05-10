# AI Kararları — Üretken YZ Atölyesi

> ADR (Architecture Decision Records) formatında, append-only.
> Her karar: **Karar / Bağlam / Sonuçlar** üçlüsüyle kaydedilir.

---

## ADR-001 · Klon yeniden konumlanma: VB-YZ-90 → Üretken YZ Atölyesi

**Tarih:** 2026-05-09 / 2026-05-10
**Statü:** Onaylandı (Dr. Murat Altun)

### Bağlam

`uretken-yz-egitimleri` dizini, VB-YZ-90 (90 saatlik Veri Bilimi + Yapay Zekâ Uzmanlığı) platformunun klonu olarak başladı. Klonda hazır olan altyapı:

- Astro 4.16 + Tailwind 3.4 + TypeScript SSG
- Merkezi `web/src/data/curriculum.ts` (`Week[]` array, 15 elemanlı)
- Dinamik `hafta/[id].astro` sayfaları (4 sekme: Konular / Ödevler / Notebook / Kaynaklar)
- WhatsApp CTA, JSON-LD `Course`, Warm Terracotta paleti
- pptxgenjs + `~/.claude/pptx-template.js` ile PPTX üretimi
- `scripts/curriculum_to_csv.py` ile Sheets sync
- Drive linkli notebook (Colab) ve PPTX preview embedding
- 1.4 GB `docs/` klasörü (MEB rehberi 60 sayfa, NotebookLM PDF, Nano Banana, Konya stratejisi, Türkçe ses/video örnekleri, Prompt yazma, Görsel rehber, Eğitici Eğitimi 4 günlük taslak)

### Karar

Klon yapısının **mimarisi aynen korunarak** içerik tamamen yeniden yazıldı. Yeni konumlanma **"Üretken YZ Atölyesi · Prompttan Ürüne"** — programlama dersi DEĞİL, **araç kullanımı + lokal LLM + API ile capstone** odaklı.

#### Müfredat yapısı (3 bölüm × 14 hafta × 6 saat = 84 saat)

| Bölüm | Hafta | Renk | Felsefe |
|---|---|---|---|
| **Temeller ve Asistanlar** | 1-4 (24 saat) | accent (teal) | Promptu öğren, asistanları karşılaştır, NotebookLM ile bilgi tabanını kur |
| **İçerik Üretim Atölyeleri** | 5-9 (30 saat) | secondary (turuncu) | Görsel, ses, video, doküman ve otomasyon — üretkenliği eline al |
| **Mesleğe Özel · Lokal · API** | 10-14 (30 saat) | primary (kahverengi) | Mesleğe bağla, YZ'yi indir, kendi ürününü yayınla |

#### Hafta başlıkları

1. Üretken YZ'ye Giriş — Kavramlar, Tarihçe, Etik
2. Prompt Mühendisliği — Sıfırdan İleri Seviyeye
3. Sohbet Asistanları Karşılaştırma ve Üst Düzey Kullanım
4. NotebookLM Uzmanlık Döngüsü ve Bilgi Yönetimi
5. Görsel Üretim Atölyesi — Diffusion ve Prompt Sanatı
6. Ses, TTS, Müzik ve Konuşma Atölyesi
7. Video, Avatar ve Animasyon Atölyesi
8. Yazı, Sunum, Doküman ve Ofis Atölyesi
9. Otomasyon ve İş Akışları (No-Code)
10. Eğitimciler İçin Üretken YZ Atölyesi
11. Akademisyen, Araştırmacı ve Profesyonel Atölyeler
12. Lokal LLM Kurulumu — YZ'yi Kendi Bilgisayarında Çalıştır
13. Lokal RAG ve Kendi Verinle Konuşma
14. API ile Üretken YZ + Capstone Projesi

### Sonuçlar

**Korunanlar:**
- Astro mimarisi, Tailwind paleti, hafta sayfası 4-sekmeli yapı
- WhatsApp CTA + Drive link mantığı
- JSON-LD `Course`, statik site (GitHub Pages ready)
- Demo modu (her şey açık) — `isDemo = true`

**Değişenler:**
- Site adı: "Veri Bilimi & YZ Uzmanlığı" → "Üretken YZ Atölyesi · Prompttan Ürüne"
- Hafta sayısı: 15 → 14 (haftalık 6 saat sabit, toplam 90 → 84 saat)
- `curriculum.ts`: Tamamen yeni içerik (programlama yerine araç kullanımı)
- `index.astro`: Hardcoded timeline → dinamik `weeks.map()` ile 14-haftalık yolculuk
- Section adları: VB Temelleri / ML Uzmanlığı / YZ Mühendisliği → Temeller ve Asistanlar / İçerik Atölyeleri / Mesleğe Özel · Lokal · API
- WhatsApp referans kodu: Nisan-2026 → Mayıs-2026
- Site URL base: `/VB-YZ-90/` → `/uretken-yz-egitimleri/`
- OG image (1200×630 JPEG, 98 KB), favicon (gradient ✨), JSON-LD `teaches[]` genişletildi
- `.gitignore`: `docs/` altındaki büyük medyalar (PDF, DOCX, MP4, M4A) ignore — küçük markdown dosyaları commit'lenir
- Notebook felsefesi: kod ağırlıklı ipynb → araç kılavuzu (markdown + ekran görüntüleri); sadece Hafta 12-14'te gerçek kod (Ollama, Gemini API)

**Kapsam dışı (bilinçli):**
- LangChain / LlamaIndex / agent SDK (Claude planının ilk versiyonunda vardı, kullanıcı isteğiyle çıkarıldı — "kral programlama eğitimi değil bu")
- Fine-tuning, LoRA, sentetik veri eğitimi
- Streamlit/Gradio için derin Python — Hafta 14'te sadece kopyala-yapıştır şablon

**Riskler / İzlenecek konular:**
- `docs/` klasörü 1.4 GB — repo'da `.gitignore` ile ignore edildi. Resources alanındaki "docs/..." linkleri şu an GitHub'da çalışmaz; Drive paylaşım klasörü oluşturulup linkler güncellenmeli (Faz F öncesi).
- Hafta 12-13 lokal LLM için katılımcının makinesinde 8 GB+ RAM önerilir; bunu kayıt formuna eklemeli.
- Notebook'lar henüz üretilmedi (Faz D); URL'ler `curriculum.ts`'te `url?` undefined.
- PPTX'ler henüz üretilmedi (Faz C); `pptxDriveId` undefined.

### Referanslar

- Plan dosyası: `/Users/drmurataltun/.claude/plans/bu-klon-bir-proje-velvety-cloud.md`
- İlk commit: `1b57357` (Faz A — iskelet)

---
