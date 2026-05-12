# Üretken YZ Atölyesi · Prompttan Ürüne

> **Dr. Murat Altun · 14 Hafta · 84 Saat · Sıfırdan Kahramana**
> Programlama bilmek gerekmez. Hazır araçları ileri seviye kullan, lokal LLM'i kendi bilgisayarında çalıştır, API ile kendi ürününü yayınla.

🌐 **Canlı Site:** https://drmurataltun.github.io/uretken-yz-egitimleri/
📱 **Kayıt:** WhatsApp +90 539 257 82 06 (Referans: **Mayıs-2026**)

---

## Kapsam

3 bölüm × 14 hafta × 6 saat = **84 saat**

### 🟢 Bölüm 1 — Temeller ve Sohbet Asistanları (Hafta 1-4, 24 saat)
1. Üretken YZ'ye Giriş — Kavramlar, Tarihçe, Etik
2. Prompt Mühendisliği — Sıfırdan İleri Seviyeye
3. Sohbet Asistanları Karşılaştırma (ChatGPT, Gemini, Claude, Grok, DeepSeek)
4. NotebookLM Uzmanlık Döngüsü ve Bilgi Yönetimi

### 🟠 Bölüm 2 — İçerik Üretim Atölyeleri (Hafta 5-9, 30 saat)
5. Görsel Üretim (DALL-E, Midjourney, Imagen, Flux, Nano Banana)
6. Ses, TTS, Müzik (ElevenLabs, Whisper, Suno)
7. Video, Avatar, Animasyon (Sora, Veo, Kling, Runway, HeyGen)
8. Yazı, Sunum, Doküman (Gamma, Canva AI, Microsoft Copilot)
9. Otomasyon ve İş Akışları (Zapier, Make, n8n)

### 🔴 Bölüm 3 — Mesleğe Özel · Lokal LLM · API (Hafta 10-14, 30 saat)
10. Eğitimciler İçin Üretken YZ (MEB rehberi, MagicSchool, Khanmigo)
11. Akademisyen, Araştırmacı, Profesyonel Atölyeler (Elicit, Consensus, Lovable, Bolt.new)
12. Lokal LLM Kurulumu (Ollama, LM Studio, Open WebUI)
13. Lokal RAG ve Kendi Verinle Konuşma (AnythingLLM, Cherry Studio)
14. API ile Üretken YZ + Capstone (Google AI Studio, Streamlit, HF Spaces)

---

## Teknik Mimari

| Katman | Teknoloji |
|---|---|
| Frontend | Astro 4.16 (SSG) + Tailwind 3.4 + TypeScript |
| Veri modeli | `web/src/data/curriculum.ts` (`Week[]` array) |
| PPTX üretimi | `pptxgenjs` + `~/.claude/pptx-template.js` (Warm Terracotta) |
| Notebook | Jupyter (markdown ağırlıklı, araç kılavuzu) |
| Drive sync | `scripts/curriculum_to_csv.py` (Sheets entegrasyonu) |
| Hosting | GitHub Pages (`/uretken-yz-egitimleri/`) |
| SEO | JSON-LD `Course`, sitemap.xml, OG image |

## Lokal Geliştirme

```bash
cd web
npm install
npm run dev          # http://localhost:4321
npm run build        # dist/ üretir
npm run preview      # production build önizleme
```

## docs/ Klasörü

`docs/` altında 1.4 GB referans materyal var (MEB Yapay Zeka Araçları Öğretmen El Kitabı, NotebookLM Uzmanlık Döngüsü, Nano Banana, Konya AI stratejisi, Türkçe ses/video örnekleri, Prompt yazma rehberi, Görsel üretim rehberi, Eğitici Eğitimi 4 günlük taslak).

**Not:** Büyük medya dosyaları `.gitignore`'da — Drive üzerinden paylaşılır. Sadece markdown dosyaları (AI_DECISIONS, ai_collab_chat, protokol) commit'lenir.

## AI İşbirliği

Bu proje **Claude + Gemini + Dr. Murat** üçlüsüyle yürütülüyor.
Detaylar: [docs/ai-collab-protocol.md](docs/ai-collab-protocol.md)
Karar geçmişi: [docs/AI_DECISIONS.md](docs/AI_DECISIONS.md)

## Lisans ve Telif

İçerik ve müfredat — © 2026 Dr. Murat Altun.
Klon temel alınan: [VB-YZ-90](https://drmurataltun.github.io/VB-YZ-90/) (mimari ve şablon).
