/**
 * Üretken YZ Atölyesi · Prompttan Ürüne — Toplu PPTX Üretici (v2 · Aurora)
 * ========================================================================
 * Aurora paleti + zenginleştirilmiş topics + hafta-spesifik özel slaytlar.
 * Çalıştır: node gen_uretken_pptx.js
 * Çıktı: sunumlar/haftaXX_<slug>.pptx (14 dosya, lokal — Drive'a yüklenecek)
 */

const fs = require('fs');
const path = require('path');
const T = require('/Users/drmurataltun/.claude/pptx-template.js');
const C = T.C;

// ═══════════════════════════════════════════════════════════
// 14 HAFTA — Aurora Paletinde Zengin Meta
// ═══════════════════════════════════════════════════════════
const WEEKS = [
  // ───────────────── HAFTA 1 ─────────────────
  {
    id: 1, slug: '01',
    title: "Üretken YZ'ye Giriş",
    subtitle: 'Modül 1 — "Makine Düşünebilir mi?"',
    section: 'TEMELLER VE ASİSTANLAR',
    sectionShort: 'BÖLÜM 1',
    color: C.acc,
    hours: 6,
    intro: 'YZ ve üretken YZ ekosistemine giriş — kavramlar, tarihçe, etik ve Türkiye perspektifi.',
    topics: [
      { icon: '🧠', title: 'YZ vs ML vs Üretken YZ', detail: 'Yapay zekânın katmanları, üretken modellerin (LLM, diffusion, GAN) sınıflandırıcılardan farkı.' },
      { icon: '⏳', title: 'Tarihçe ve Türkiye köklü', detail: 'Turing 1950 → Cahit Arf 1958 → Transformer 2017 → ChatGPT 2022 → Multimodal 2026.' },
      { icon: '⚖️', title: 'Ne yapar / ne yapamaz', detail: 'Halüsinasyon, deepfake riski, telif belirsizliği, eğitim verisi bias\'ı — gerçekçi beklenti haritası.' },
      { icon: '🇹🇷', title: 'KVKK + MEB Politikası', detail: 'AB AI Act özeti, MEB Yapay Zeka Politika Belgesi, Konya AI stratejisi.' },
      { icon: '🌐', title: 'Topluluklar ve hesaplar', detail: 'Discord, GitHub, Kaggle, Hugging Face — hangi hesaplar açılmalı, hangi takipler yapılmalı.' },
    ],
    specialSlides: [
      { type: 'timeline', title: 'Üretken YZ Tarihçesi', points: [
        { year: '1950', title: 'Turing Testi', desc: 'Computing Machinery and Intelligence' },
        { year: '1958', title: 'Cahit Arf', desc: 'Türkçe ilk YZ sorusu' },
        { year: '2014', title: 'GAN', desc: 'Üretken çekişmeli ağlar' },
        { year: '2017', title: 'Transformer', desc: 'Attention is All You Need' },
        { year: '2022', title: 'ChatGPT', desc: '5 günde 1M kullanıcı' },
        { year: '2026', title: 'Multimodal', desc: 'GPT-5, Gemini 2.5, Claude 4.7' },
      ]},
      { type: 'caseStudy', title: 'Etik Vakası: Sahte Hukuk Davası', case: {
        problem: 'Bir avukat ChatGPT\'ye dava emsali sordu. Sistem 6 sahte dava uydurdu, avukat fark etmedi.',
        approach: 'Avukat doğrulama yapmadan mahkemeye sundu. Hakim, davaların hiçbirinin var olmadığını tespit etti.',
        solution: '5000 USD para cezası + meslek odası uyarısı. Ders: Üretken YZ çıktısını ASLA doğrulamadan kullanma.',
      }},
    ],
    libraries: ['ChatGPT', 'Gemini', 'Claude', 'NotebookLM (önizleme)'],
    notebooks: [
      { name: 'hafta01_kavram_haritasi.ipynb', desc: 'YZ-ML-DL-GenAI kavram haritası ve interaktif quiz', dur: '20 dk' },
      { name: 'hafta01_tarihce_timeline.ipynb', desc: 'Turing\'den 2026\'ya görsel zaman çizgisi', dur: '15 dk' },
      { name: 'hafta01_etik_senaryolar.ipynb', desc: '10 gerçek vaka — sen olsan ne yapardın?', dur: '40 dk' },
    ],
    assignments: [
      'Cahit Arf — "Makine Düşünebilir mi?" makalesini oku, 1 sayfa Türkçe özet yaz',
      'ChatGPT, Gemini ve Claude\'a aynı 5 soruyu sor; yanıtları tabloda kıyasla',
      'Notion / Google Docs üzerinde 14 haftalık öğrenme defterini aç',
    ],
    resources: [
      { label: 'MEB Yapay Zeka Araçları Öğretmen El Kitabı', url: 'docs/' },
      { label: 'Cahit Arf — Makine Düşünebilir mi?', url: 'docs/' },
      { label: 'AB AI Act Özeti', url: 'artificialintelligenceact.eu' },
    ],
    takeaways: [
      'Üretken YZ = mevcut veriden yeni içerik üreten YZ. Sınıflandırıcı değil, üretici.',
      'Cahit Arf 1958\'de bu soruyu sordu — Türkiye\'nin YZ kökü 60+ yıl öncesine uzanır.',
      'KVKK + MEB politikası + AI Act çerçevesi her hafta gündemde olacak.',
    ],
    quote: 'Makine düşünebilir mi? Bu sorunun cevabı, "düşünmek" sözünün anlamına bağlıdır.',
    quoteAuthor: 'Cahit Arf, 1958',
  },

  // ───────────────── HAFTA 2 ─────────────────
  {
    id: 2, slug: '02',
    title: 'Prompt Mühendisliği',
    subtitle: 'Modül 2 — "İyi Prompt = İyi Sonuç"',
    section: 'TEMELLER VE ASİSTANLAR',
    sectionShort: 'BÖLÜM 1',
    color: C.acc,
    hours: 6,
    intro: 'Promptun 6 yapı taşı, few-shot, Chain-of-Thought, yapılandırılmış çıktı ve prompt güvenliği.',
    topics: [
      { icon: '🎭', title: 'Rol + Bağlam + Görev', detail: 'Modele "kim olduğunu, hangi durumda, ne yapacağını" net söyle. İlk üç temel taş.' },
      { icon: '📐', title: 'Kısıt + Format + Örnek', detail: 'Sınırlar (dil, ton, uzunluk), çıktı yapısı (JSON/tablo) ve few-shot örnekler.' },
      { icon: '🪜', title: 'Chain-of-Thought', detail: '"Adım adım düşün" sihirli kelimesi karmaşık akıl yürütmede %20+ doğruluk getirir.' },
      { icon: '🇹🇷', title: 'Türkçe için özel teknikler', detail: 'Dil kilidi, kalıp ifadeler, deyimler — modeli sapmadan tutmanın yolları.' },
      { icon: '🛡️', title: 'Prompt güvenliği', detail: 'Prompt injection, jailbreak, savunma stratejileri — promptu mühendislik gibi tasarla.' },
      { icon: '📚', title: 'Prompt kütüphanesi', detail: 'Notion / GitHub / Gem / Project üzerinde versiyonlanabilir prompt arşivi tut.' },
    ],
    specialSlides: [
      { type: 'iconGrid', title: 'Promptun 6 Yapı Taşı', items: [
        { emoji: '🎭', title: 'ROL', desc: '"Sen 20 yıllık bir öğretmensin..."' },
        { emoji: '🌍', title: 'BAĞLAM', desc: 'Hedef kitle, kurum, kısıtlar' },
        { emoji: '🎯', title: 'GÖREV', desc: 'Net fiil + somut çıktı' },
        { emoji: '📐', title: 'KISIT', desc: 'Dil, uzunluk, ton, yasaklar' },
        { emoji: '📋', title: 'FORMAT', desc: 'JSON, tablo, markdown' },
        { emoji: '💡', title: 'ÖRNEK', desc: '1-3 few-shot örnek' },
      ]},
      { type: 'matrix', title: 'Zero / One / Few-Shot Karşılaştırma',
        columns: ['Kriter', 'Zero-shot', 'One-shot', 'Few-shot'],
        rows: [
          { label: 'Örnek sayısı', values: ['0', '1', '2-5'] },
          { label: 'Doğruluk', values: ['Düşük', 'Orta', 'Yüksek'] },
          { label: 'Token maliyeti', values: ['Düşük', 'Orta', 'Yüksek'] },
          { label: 'Kullanım', values: ['Genel sorular', 'Format kopyalama', 'Sınıflandırma'] },
        ]
      },
    ],
    libraries: ['ChatGPT', 'Gemini Studio', 'Claude', 'Notion'],
    notebooks: [
      { name: 'hafta02_prompt_anatomi.ipynb', desc: 'Yan yana 10 örnek prompt çözümlemesi', dur: '30 dk' },
      { name: 'hafta02_few_shot_atolye.ipynb', desc: 'Duygu analizi, zero/one/few-shot kıyas', dur: '40 dk' },
      { name: 'hafta02_cot_matematik_mantik.ipynb', desc: 'CoT ile 5 mantık bulmacası', dur: '25 dk' },
      { name: 'hafta02_yapilandirilmis_cikti.ipynb', desc: 'JSON, tablo, markdown şablonları', dur: '20 dk' },
      { name: 'hafta02_prompt_kutuphanesi_sablon.ipynb', desc: 'Notion / Obsidian arşiv yapısı', dur: '15 dk' },
    ],
    assignments: [
      'Aynı görevi 5 farklı prompt versiyonuyla çalıştır, sonuçları rubrik ile puanla',
      'Kendi mesleğine özel 10 prompt\'tan oluşan "Altın Prompt Kütüphanesi" hazırla',
      'Bir öğrenci/çalışan ödev değerlendirme prompt\'u tasarla (rubrik + örnek + JSON çıktı)',
    ],
    resources: [
      { label: 'docs/Prompt yazma.docx', url: 'docs/' },
      { label: 'Anthropic Prompt Engineering Guide', url: 'docs.anthropic.com' },
      { label: 'Learn Prompting (TR)', url: 'learnprompting.org' },
    ],
    takeaways: [
      '6 yapı taşı (rol+bağlam+görev+kısıt+format+örnek) bilinçli birleştirildiğinde %80 hata düşer.',
      'Few-shot 2-5 örnekle çözüm; CoT karmaşık akıl yürütme için olmazsa olmaz.',
      'Prompt güvenliği bir mühendislik disiplini — enjeksiyon savunması başından planlanır.',
    ],
    quote: 'Doğru soru, doğru cevabın yarısıdır.',
    quoteAuthor: 'Konfüçyüs',
  },

  // ───────────────── HAFTA 3 ─────────────────
  {
    id: 3, slug: '03',
    title: 'Sohbet Asistanları',
    subtitle: 'Modül 3 — "Doğru İşe Doğru Asistan"',
    section: 'TEMELLER VE ASİSTANLAR',
    sectionShort: 'BÖLÜM 1',
    color: C.acc,
    hours: 6,
    intro: 'ChatGPT, Gemini, Claude, Grok, DeepSeek — özellikleri, maliyetleri, Türkçe performansları.',
    topics: [
      { icon: '🤖', title: 'ChatGPT (GPT-5/o3)', detail: 'Custom GPTs, Projects, Canvas, Code Interpreter, Memory. Genel amaçlı en güçlü.' },
      { icon: '✨', title: 'Gemini (2.5 Pro/Flash)', detail: 'Gems, 2M token context, Deep Research, Türkiye direkt erişim — Türkçe için güçlü.' },
      { icon: '🪶', title: 'Claude (Sonnet 4.6/Opus 4.7)', detail: 'Projects, Artifacts, Computer Use, MCP — kod ve uzun yazı için lider.' },
      { icon: '🚀', title: 'Grok + DeepSeek', detail: 'Grok: X gerçek zamanlı arama, Think mode. DeepSeek R1: ücretsiz reasoning, açık ağırlık.' },
      { icon: '🔍', title: 'Arama tabanlı', detail: 'Perplexity, You.com, Phind — kaynak gösteren, güncel webdir bilgisi.' },
      { icon: '🇹🇷', title: 'Türkçe modeller', detail: 'Trendyol-LLM, KocLM, Cosmos, Llama-Türk — yerli ekosistem keşfi.' },
      { icon: '⚙️', title: 'Custom GPT/Gem/Project', detail: 'Kendi asistanını yarat — sistem prompt + bilgi tabanı + paylaşım.' },
    ],
    specialSlides: [
      { type: 'matrix', title: '5 Asistan Detaylı Kıyas',
        columns: ['Kriter', 'ChatGPT', 'Gemini', 'Claude', 'Grok', 'DeepSeek'],
        rows: [
          { label: 'Aylık ücret', values: ['$20', '$19', '$20', '$8', 'Free'] },
          { label: 'Türkçe', values: ['İyi', 'Çok iyi', 'İyi', 'Orta', 'Orta'] },
          { label: 'Kod', values: ['Çok iyi', 'İyi', 'Mükemmel', 'Orta', 'İyi'] },
          { label: 'Reasoning', values: ['o3', '2.5 Pro', 'Opus 4.7', 'Think', 'R1'] },
          { label: 'Context', values: ['256K', '2M', '200K', '256K', '128K'] },
          { label: 'Image gen', values: ['DALL-E 3', 'Imagen 3', 'Yok', 'Aurora', 'Yok'] },
          { label: 'Türkiye erişim', values: ['Direkt', 'Direkt', 'Direkt', 'X üyeliği', 'Direkt'] },
        ]
      },
    ],
    libraries: ['ChatGPT', 'Gemini', 'Claude', 'Grok', 'DeepSeek', 'Perplexity'],
    notebooks: [
      { name: 'hafta03_asistan_kiyas_matrisi.ipynb', desc: '10 görev × 5 asistan kıyas tablosu', dur: '45 dk' },
      { name: 'hafta03_chatgpt_custom_gpt.ipynb', desc: 'Kendi GPT\'ni yap — adım adım', dur: '30 dk' },
      { name: 'hafta03_gemini_gem_olustur.ipynb', desc: 'Gemini Gems atölyesi', dur: '25 dk' },
      { name: 'hafta03_claude_projects_artifacts.ipynb', desc: 'Claude Projects + Artifacts', dur: '25 dk' },
      { name: 'hafta03_perplexity_arastirma_atolyesi.ipynb', desc: 'Perplexity Spaces araştırma akışı', dur: '20 dk' },
    ],
    assignments: [
      'Aynı 10 mesleki soruyu 5 asistana sor, kıyas raporu yaz',
      'Kendi alanına özel 1 Custom GPT + 1 Gem + 1 Claude Project yarat — link paylaş',
      'Aile/iş için "kişisel asistan paneli" hazırla (hangi araç, hangi durumda)',
    ],
    resources: [
      { label: 'OpenAI Help Center', url: 'help.openai.com' },
      { label: 'Google AI Gemini', url: 'gemini.google.com' },
      { label: 'Anthropic Claude', url: 'anthropic.com' },
    ],
    takeaways: [
      'Tek asistan yetmez — görev tipine göre seçim. Kod/araştırma/yaratıcı/Türkçe farklı modeller.',
      'Custom GPT, Gem ve Project ile asistanlarını "kişiselleştirmek" verimliliği katlar.',
      'Türkçe için Gemini ve Claude güçlü; akıl yürütmede o3/R1/Opus öne çıkar.',
    ],
    quote: 'Aracını seç, ustalaş, sonra başkasına öğret.',
    quoteAuthor: 'Atölye Felsefesi',
  },

  // ───────────────── HAFTA 4 ─────────────────
  {
    id: 4, slug: '04',
    title: 'NotebookLM ve Bilgi Yönetimi',
    subtitle: 'Modül 4 — "Kendi Bilgi Tabanını Kur"',
    section: 'TEMELLER VE ASİSTANLAR',
    sectionShort: 'BÖLÜM 1',
    color: C.acc,
    hours: 6,
    intro: 'NotebookLM Uzmanlık Döngüsü ile kendi PDF\'lerinden bilgi tabanı, Türkçe podcast üretimi.',
    topics: [
      { icon: '📚', title: 'NotebookLM nedir', detail: 'Google\'ın halka açtığı RAG aracı — 50+ kaynaktan oluşan kendi bilgi tabanı.' },
      { icon: '🔄', title: 'Uzmanlık Döngüsü', detail: 'Kaynak Topla → Sorgula → Değer Yarat. Eğitmenin yeni okuma akışı.' },
      { icon: '📂', title: 'Kaynak türleri', detail: 'PDF, Google Docs/Slides, web URL, YouTube, Markdown, paste — toplam 50/notebook.' },
      { icon: '🎙️', title: 'Audio Overview', detail: 'Türkçe destekli podcast üretimi — 2 AI sunucu, doğal sohbet, indirilebilir MP3.' },
      { icon: '🗺️', title: 'Mind Map + Study Guide', detail: 'Kaynaklarını görsel haritaya, briefing dökümanına, sınav rehberine çevir.' },
      { icon: '🆚', title: 'Alternatifler', detail: 'Claude Projects, ChatGPT Knowledge, AI Studio Files — hangisi ne için.' },
    ],
    specialSlides: [
      { type: 'pipeline', title: 'NotebookLM Uzmanlık Döngüsü', steps: [
        { emoji: '📥', label: 'KAYNAK TOPLA', sub: 'PDF, web, YouTube, Docs' },
        { emoji: '❓', label: 'SORGULA', sub: 'Sorularla bilgiyi süz' },
        { emoji: '✨', label: 'ÜRET', sub: 'Mind map, podcast, özet' },
        { emoji: '🚀', label: 'PAYLAŞ', sub: 'Sınıf, ekip, kanal' },
      ]},
    ],
    libraries: ['NotebookLM', 'Google AI Studio', 'Claude Projects'],
    notebooks: [
      { name: 'hafta04_notebooklm_kurulum_rehber.ipynb', desc: 'NotebookLM\'e ilk adım — ekran görüntülü', dur: '20 dk' },
      { name: 'hafta04_kendi_kitabini_konustur.ipynb', desc: '5 PDF, 20 soru-cevap testi', dur: '40 dk' },
      { name: 'hafta04_audio_overview_podcast.ipynb', desc: 'Türkçe podcast üretimi', dur: '30 dk' },
      { name: 'hafta04_mind_map_studyguide.ipynb', desc: 'Mind Map ve Study Guide', dur: '20 dk' },
      { name: 'hafta04_alternatif_araclar_kiyas.ipynb', desc: 'NotebookLM vs Claude vs ChatGPT', dur: '25 dk' },
    ],
    assignments: [
      'Kendi alanından 10 PDF/URL ile NotebookLM kur, 20 soruluk doğruluk testi',
      'Bir konuda 20 dakikalık Türkçe Audio Overview podcast üret, kanal aç',
      'Bir öğrenciye/çalışana NotebookLM eğitimi ver (mini sunum)',
    ],
    resources: [
      { label: 'docs/NotebookLM Uzmanlık Döngüsü PDF', url: 'docs/' },
      { label: 'NotebookLM resmî sayfa', url: 'notebooklm.google.com' },
      { label: 'NotebookLM Help Center', url: 'support.google.com/notebooklm' },
    ],
    takeaways: [
      'NotebookLM, herkes için RAG — PDF\'inle konuşmanın en kolay yolu.',
      'Audio Overview Türkçe podcast üretiyor — eğitim materyali için altın değerinde.',
      'Mind Map çıktısı bir kitabı 5 dakikada görselleştirir.',
    ],
    quote: 'Bilgi, yapılandırılmadan değer üretmez.',
    quoteAuthor: 'Peter Drucker (uyarlanmış)',
  },

  // ───────────────── HAFTA 5 ─────────────────
  {
    id: 5, slug: '05',
    title: 'Görsel Üretim Atölyesi',
    subtitle: 'Modül 5 — "Hayalden Piksele"',
    section: 'İÇERİK ÜRETİM ATÖLYELERİ',
    sectionShort: 'BÖLÜM 2',
    color: C.sec,
    hours: 6,
    intro: 'DALL-E, Midjourney, Imagen, Flux ve Türkiye yapımı Nano Banana ile diffusion modelleri.',
    topics: [
      { icon: '🌫️', title: 'Diffusion sezgisi', detail: 'Gürültüden anlam çıkarma — diffusion modellerinin altındaki temel mantık.' },
      { icon: '🟢', title: 'Gemini Imagen 3', detail: 'Google AI Studio\'dan ücretsiz, Türkiye direkt — başlangıç için ideal.' },
      { icon: '🎨', title: 'DALL-E 3 + Midjourney', detail: 'ChatGPT\'de DALL-E, Discord/Web\'de Midjourney — sanat değeri en yüksek.' },
      { icon: '✍️', title: 'Ideogram + Flux', detail: 'Ideogram metin yazımında lider, Flux açık kaynak en iyi.' },
      { icon: '🍌', title: 'Nano Banana', detail: 'Türkiye yapımı görsel üretim aracı — yerel ekosistem, KVKK uyumlu.' },
      { icon: '🎯', title: 'Prompt yapısı', detail: 'Özne + ortam + ışık + stil + kamera + negatif — 6 unsurlu görsel formülü.' },
      { icon: '⚖️', title: 'Telif ve etik', detail: 'C2PA standardı, watermark, "AI etiketi" yasal durumu.' },
    ],
    specialSlides: [
      { type: 'iconGrid', title: '8 Görsel Üretim Aracı', items: [
        { emoji: '🟢', title: 'Gemini Imagen', desc: 'Ücretsiz, Türkçe' },
        { emoji: '🎨', title: 'DALL-E 3', desc: 'ChatGPT içinde' },
        { emoji: '🌟', title: 'Midjourney', desc: 'Sanat değeri lider' },
        { emoji: '✍️', title: 'Ideogram', desc: 'Metin yazımı' },
        { emoji: '⚡', title: 'Flux', desc: 'Açık kaynak' },
        { emoji: '🎭', title: 'Krea + Leonardo', desc: 'Yaratıcı' },
        { emoji: '🍌', title: 'Nano Banana', desc: 'Türkiye yapımı' },
        { emoji: '🔍', title: 'Magnific', desc: 'Upscaler' },
      ]},
    ],
    libraries: ['Gemini Imagen', 'DALL-E 3', 'Midjourney', 'Ideogram', 'Flux', 'Nano Banana'],
    notebooks: [
      { name: 'hafta05_gorsel_arac_kiyasla.ipynb', desc: '5 araç × 5 prompt karşılaştırma posteri', dur: '50 dk' },
      { name: 'hafta05_gemini_imagen_atolye.ipynb', desc: 'Google AI Studio ile ücretsiz görsel', dur: '30 dk' },
      { name: 'hafta05_midjourney_atolye.ipynb', desc: 'Midjourney Discord + Web', dur: '40 dk' },
      { name: 'hafta05_flux_huggingface.ipynb', desc: 'Flux Schnell HF Spaces', dur: '25 dk' },
      { name: 'hafta05_nano_banana_uygulama.ipynb', desc: 'Nano Banana atölyesi', dur: '20 dk' },
      { name: 'hafta05_kamera_acilari_atolye.ipynb', desc: 'Kamera/ışık/stil prompt', dur: '30 dk' },
    ],
    assignments: [
      'Aynı sahneyi 4 farklı modelde üret, kıyaslama posteri yap',
      'Kendi alanına özel 10\'lu görsel kütüphanesi (kapak, infografi, karakter)',
      'Tutarlı bir karakter yarat — 5 farklı poz, aynı yüz',
    ],
    resources: [
      { label: 'docs/Görsel üretim Rehberi', url: 'docs/' },
      { label: 'docs/Kamera açıları', url: 'docs/' },
      { label: 'docs/Nano Banana Uygulamaları', url: 'docs/' },
    ],
    takeaways: [
      '6 öğeli prompt yapısı her modelde işe yarar — özne+ortam+ışık+stil+kamera+negatif.',
      'Tutarlı karakter için seed sabitleme + IP-Adapter kritik.',
      'Telif ve C2PA etiketi — eğitim/ticari kullanımda yasal sınırı bil.',
    ],
    quote: 'Hayal gücü, doğru prompt ile pikselleşir.',
    quoteAuthor: 'Atölye Felsefesi',
  },

  // ───────────────── HAFTA 6 ─────────────────
  {
    id: 6, slug: '06',
    title: 'Ses, TTS ve Müzik',
    subtitle: 'Modül 6 — "Sesi Yarat, Sesi Anla"',
    section: 'İÇERİK ÜRETİM ATÖLYELERİ',
    sectionShort: 'BÖLÜM 2',
    color: C.sec,
    hours: 6,
    intro: 'ElevenLabs Türkçe, OpenAI TTS, Whisper STT, Suno müzik. Voice cloning etiği ve KVKK.',
    topics: [
      { icon: '🔊', title: 'TTS evrimi', detail: 'Robotik sesten doğal Türkçe sese — ElevenLabs Multilingual v2 mevcut altın standart.' },
      { icon: '🎤', title: 'OpenAI + Gemini TTS', detail: 'gpt-4o-tts ve Gemini TTS — bulut tabanlı, Türkçe destekli.' },
      { icon: '🏢', title: 'Kurumsal: Azure + GCP', detail: 'KVKK uyumu için Azure Speech ve Google Cloud TTS — daha katı veri kontrolü.' },
      { icon: '🎙️', title: 'Whisper STT', detail: 'Açık kaynak transkript — Türkçe %95+ doğruluk. Whisper large-v3 best.' },
      { icon: '🎵', title: 'Müzik üretimi', detail: 'Suno v4 (sözlü şarkı), Udio, Riffusion — Türkçe destekli, eğitim için ideal.' },
      { icon: '⚖️', title: 'Voice cloning etiği', detail: 'Onay protokolü zorunlu — KVKK + deepfake yasası — yazılı izin olmadan klonlama yasaktır.' },
      { icon: '🎭', title: 'Lip sync avatar', detail: 'HeyGen, D-ID, Hedra — konuşan avatar üretimi (Hafta 7\'de derinleşeceğiz).' },
    ],
    specialSlides: [
      { type: 'timeline', title: 'TTS Evrimi', points: [
        { year: '2017', title: 'Tacotron', desc: 'Google ilk doğal TTS' },
        { year: '2019', title: 'WaveNet', desc: 'DeepMind kalitesi' },
        { year: '2021', title: 'VITS', desc: 'Açık kaynak' },
        { year: '2023', title: 'ElevenLabs', desc: 'Türkçe Multilingual' },
        { year: '2025', title: 'Gemini Live', desc: 'Real-time çeviri' },
      ]},
    ],
    libraries: ['ElevenLabs', 'OpenAI TTS', 'Whisper', 'Suno', 'NotebookLM'],
    notebooks: [
      { name: 'hafta06_tts_arac_kiyasla.ipynb', desc: 'Aynı metin × 5 TTS aracı', dur: '30 dk' },
      { name: 'hafta06_elevenlabs_atolye.ipynb', desc: 'Ses klonlama + Türkçe', dur: '40 dk' },
      { name: 'hafta06_whisper_transkript.ipynb', desc: 'Video → SRT altyazı (Whisper Colab)', dur: '35 dk' },
      { name: 'hafta06_suno_egitim_jingle.ipynb', desc: 'Sınıf jingle\'ı üret', dur: '20 dk' },
      { name: 'hafta06_voice_clone_etik.ipynb', desc: 'Onay protokolü atölyesi', dur: '25 dk' },
    ],
    assignments: [
      'Tanıtım videon için 3 farklı TTS sesiyle dublaj üret, A/B test',
      '1 saatlik dersini Whisper ile transkript et, SRT altyazı yap',
      'Bir konuda 3 dakikalık eğitim podcast\'i üret',
    ],
    resources: [
      { label: 'docs/ Türkçe ses örnekleri arşivi', url: 'docs/' },
      { label: 'ElevenLabs Docs', url: 'elevenlabs.io/docs' },
      { label: 'OpenAI Whisper', url: 'openai.com/research/whisper' },
    ],
    takeaways: [
      'ElevenLabs Multilingual v2, Türkçe TTS\'in mevcut altın standardı.',
      'Whisper free + open-source; Türkçede %95+ doğruluk.',
      'Voice cloning yasal yükümlülük getirir — onay protokolü olmadan klonlama yapma.',
    ],
    quote: 'Ses, anlamın taşıyıcısıdır.',
    quoteAuthor: 'Atölye Felsefesi',
  },

  // ───────────────── HAFTA 7 ─────────────────
  {
    id: 7, slug: '07',
    title: 'Video, Avatar ve Animasyon',
    subtitle: 'Modül 7 — "Hareketli Görüntünün Çağı"',
    section: 'İÇERİK ÜRETİM ATÖLYELERİ',
    sectionShort: 'BÖLÜM 2',
    color: C.sec,
    hours: 6,
    intro: 'Sora, Veo, Kling, Runway, HeyGen. Multimodal Gemini ile video özetleme. Uçtan uca pipeline.',
    topics: [
      { icon: '🎬', title: 'Sora 2 + Veo 3', detail: 'OpenAI Sora ve Google Veo — text-to-video ve image-to-video lider modeller.' },
      { icon: '🎥', title: 'Kling/Runway/Luma/Pika', detail: 'Çinli ve ABD\'li alternatifler — 5-10 saniyelik klipler, hızlı üretim.' },
      { icon: '🐲', title: 'Wan 2.2', detail: 'Alibaba açık kaynak — lokal kullanım için ideal (16GB+ VRAM önerilir).' },
      { icon: '🗣️', title: 'Avatar: HeyGen', detail: 'HeyGen Türkçe destekli, Synthesia ve D-ID alternatifleri — eğitim videosu için.' },
      { icon: '✨', title: 'Animasyon araçları', detail: 'Animate Diff, LeiaPix, Genmo — sabit görselden hareketli içerik.' },
      { icon: '🎞️', title: 'Video editleme YZ', detail: 'Descript (otomatik kesim), CapCut AI, Captions — son düzenleme katmanı.' },
      { icon: '🧠', title: 'Multimodal Gemini', detail: 'Uzun video → özet + soru-cevap — Gemini 2.5\'in 2M context\'i ile.' },
    ],
    specialSlides: [
      { type: 'pipeline', title: 'Uçtan Uca Video Pipeline', steps: [
        { emoji: '✍️', label: 'SENARYO', sub: 'LLM (ChatGPT/Gemini)' },
        { emoji: '🎨', label: 'GÖRSEL', sub: 'Imagen / Midjourney' },
        { emoji: '🔊', label: 'SES', sub: 'ElevenLabs / OpenAI TTS' },
        { emoji: '🎬', label: 'VİDEO', sub: 'Veo / Runway / Sora' },
        { emoji: '✂️', label: 'EDİT', sub: 'CapCut AI / Descript' },
      ]},
    ],
    libraries: ['Sora', 'Veo', 'Runway', 'HeyGen', 'CapCut AI', 'Wan 2.2'],
    notebooks: [
      { name: 'hafta07_video_arac_kiyasla.ipynb', desc: '5 video aracını aynı promptla', dur: '40 dk' },
      { name: 'hafta07_veo_gemini_studio.ipynb', desc: 'Veo 3 ile ilk video', dur: '30 dk' },
      { name: 'hafta07_heygen_egitim_avatari.ipynb', desc: 'Türkçe konuşan avatar', dur: '35 dk' },
      { name: 'hafta07_uzun_video_ozetle.ipynb', desc: 'Gemini ile 1 saatlik dersi 5 paragrafa', dur: '25 dk' },
      { name: 'hafta07_uctan_uca_pipeline.ipynb', desc: 'Senaryodan videoya tek başına', dur: '60 dk' },
    ],
    assignments: [
      'Bir ders konusu için 60 saniyelik tanıtım videosu (uçtan uca)',
      'Tarihi/edebi karakteri canlandıran 3 dakikalık avatar dersi',
      '30 dk öğrenci sunumunu izlet, otomatik geri bildirim raporu üret',
    ],
    resources: [
      { label: 'docs/Komuttan Ürüne Üretken YZ.mp4', url: 'docs/' },
      { label: 'Google AI Studio — Veo', url: 'aistudio.google.com' },
      { label: 'HeyGen', url: 'heygen.com' },
    ],
    takeaways: [
      'Senaryo + görsel + ses + video bağımsız üret, CapCut\'ta birleştir — pipeline mantığı.',
      'HeyGen Türkçe avatar için en olgun seçenek; eğitim videolarında öğretmen-süreklilik sağlar.',
      'Multimodal Gemini 1 saatlik videoyu okuyabilir — ders değerlendirmede güçlü.',
    ],
    quote: 'Hikâye akıyorsa, ürün hazır demektir.',
    quoteAuthor: 'Atölye Felsefesi',
  },

  // ───────────────── HAFTA 8 ─────────────────
  {
    id: 8, slug: '08',
    title: 'Yazı, Sunum, Doküman, Ofis',
    subtitle: 'Modül 8 — "Yazıdan Sunuma, Tablodan Rapora"',
    section: 'İÇERİK ÜRETİM ATÖLYELERİ',
    sectionShort: 'BÖLÜM 2',
    color: C.sec,
    hours: 6,
    intro: 'Gamma, Canva AI, Microsoft Copilot, Gemini Workspace. Toplantı asistanları, e-posta otomasyonu.',
    topics: [
      { icon: '✍️', title: 'Yazma araçları', detail: 'Notion AI, Grammarly, DeepL Write (Türkçe), Quillbot — yazıyı kişisel asistanla rafine et.' },
      { icon: '📊', title: 'Sunum: Gamma + Tome', detail: 'Tek prompt → 20 slaytlık sunum 5 dakikada. Beautiful AI, Canva Magic Design alternatifleri.' },
      { icon: '📈', title: 'Microsoft Copilot 365', detail: 'Excel formül üretimi, PowerPoint çevirisi, Word taslağı — kurumsal ofis YZ\'si.' },
      { icon: '🟢', title: 'Gemini Workspace', detail: 'Google Docs/Sheets/Slides içinde Gemini — ücretsiz hesaplarda da var.' },
      { icon: '📄', title: 'PDF asistanları', detail: 'ChatPDF, AskYourPDF, Humata — uzun dokümanlarla sohbet.' },
      { icon: '🎨', title: 'Adobe Firefly', detail: 'Express, Photoshop, Illustrator AI özellikleri — profesyonel tasarım.' },
      { icon: '🎙️', title: 'Toplantı asistanları', detail: 'Otter, Fireflies, tldv, Zoom AI — otomatik özet + aksiyon maddeleri.' },
    ],
    specialSlides: [
      { type: 'iconGrid', title: 'Ofis YZ Araç Seti', items: [
        { emoji: '📊', title: 'Gamma', desc: 'Sunum 5 dk' },
        { emoji: '🎨', title: 'Canva AI', desc: 'Tasarım + magic' },
        { emoji: '🪟', title: 'Copilot 365', desc: 'Excel/PPT/Word' },
        { emoji: '🟢', title: 'Gemini Workspace', desc: 'Docs/Sheets' },
        { emoji: '📄', title: 'ChatPDF', desc: 'PDF sohbet' },
        { emoji: '🎙️', title: 'Otter / tldv', desc: 'Toplantı özeti' },
      ]},
    ],
    libraries: ['Gamma', 'Canva AI', 'Microsoft Copilot', 'Gemini Workspace', 'ChatPDF', 'Otter'],
    notebooks: [
      { name: 'hafta08_gamma_sunum_atolye.ipynb', desc: 'Gamma ile 20 slaytlık sunum', dur: '30 dk' },
      { name: 'hafta08_copilot_excel_otomasyon.ipynb', desc: 'Excel formül + grafik üretimi', dur: '40 dk' },
      { name: 'hafta08_canva_magic_design.ipynb', desc: 'Pazarlama görselleri', dur: '25 dk' },
      { name: 'hafta08_chatpdf_arastirma.ipynb', desc: 'ChatPDF araştırma akışı', dur: '20 dk' },
      { name: 'hafta08_toplanti_asistani.ipynb', desc: 'Otter / tldv kıyas', dur: '25 dk' },
    ],
    assignments: [
      'Mesleğine özel 20 slaytlık sunumu Gamma + Canva ile üret',
      'Bir aylık veriyi Copilot/Gemini ile rapor haline getir',
      'Bir aylık e-posta trafiğini Superhuman ile otomatize et',
    ],
    resources: [
      { label: 'Gamma Docs', url: 'help.gamma.app' },
      { label: 'Microsoft Copilot Help', url: 'support.microsoft.com/copilot' },
      { label: 'Google Workspace Gemini', url: 'workspace.google.com' },
    ],
    takeaways: [
      'Gamma sunum üretimini 30 dakikadan 5 dakikaya indirir.',
      'Copilot 365 + Excel finans/yönetim için sıçrama.',
      'Toplantı asistanı, "ekibin ekstra üyesi" — özet + aksiyonlar otomatik.',
    ],
    quote: 'İyi yazı, iyi düşüncenin görünür hâlidir.',
    quoteAuthor: 'Atölye Felsefesi',
  },

  // ───────────────── HAFTA 9 ─────────────────
  {
    id: 9, slug: '09',
    title: 'Otomasyon ve İş Akışları',
    subtitle: 'Modül 9 — "Sıkıcı İşi YZ Yapsın"',
    section: 'İÇERİK ÜRETİM ATÖLYELERİ',
    sectionShort: 'BÖLÜM 2',
    color: C.sec,
    hours: 6,
    intro: 'Zapier, Make, n8n ile no-code otomasyon. AI node\'ları, Telegram bot, Notion AI.',
    topics: [
      { icon: '⚙️', title: 'Zapier + Make + n8n', detail: 'No-code akış araçları — Zapier popüler, Make güçlü, n8n self-hosted.' },
      { icon: '🤖', title: 'AI node\'ları', detail: 'OpenAI, Gemini, Anthropic, ElevenLabs node\'ları her platforma entegre.' },
      { icon: '🚦', title: 'Tetikleyiciler', detail: 'E-posta, form, takvim, webhook, Telegram, RSS — her şey otomasyonun başlangıcı.' },
      { icon: '📩', title: 'Telegram bot otomasyonu', detail: 'Günlük brifing, hava+takvim+haber özet → @MyBot — kişisel asistan.' },
      { icon: '📋', title: 'Notion AI Database', detail: 'Notion database\'inde AI sütunları — kişisel CRM, proje paneli.' },
      { icon: '🐳', title: 'n8n self-hosted', detail: 'VPS\'te Docker ile — sınırsız akış, sıfır maliyet, gizlilik max.' },
      { icon: '💰', title: 'Maliyet ve gizlilik', detail: 'Ücretli katmanlar, hata yönetimi, gizli verilerle çalışma protokolü.' },
    ],
    specialSlides: [
      { type: 'caseStudy', title: 'Senaryo: Günlük Brifing Botu', case: {
        problem: 'Her sabah hava durumu + takvim + e-posta + haber tek tek 4 farklı kaynaktan kontrol ediliyor — 20 dk israf.',
        approach: 'n8n\'de Schedule trigger (08:00) → 4 paralel HTTP request → Gemini ile Türkçe özet → Telegram bot.',
        solution: '20 dk\'lık sabah rutini 30 saniyeye indi. Bot Telegram\'a günlük brifing gönderir, manuel kontrol bitti.',
      }},
    ],
    libraries: ['Zapier', 'Make', 'n8n', 'Notion AI'],
    notebooks: [
      { name: 'hafta09_zapier_ilk_zap.ipynb', desc: 'Gmail → Sheets + GPT özet', dur: '25 dk' },
      { name: 'hafta09_make_senaryo.ipynb', desc: 'RSS → ChatGPT → Telegram', dur: '30 dk' },
      { name: 'hafta09_n8n_kurulum.ipynb', desc: 'Docker + ücretsiz katman', dur: '40 dk' },
      { name: 'hafta09_telegram_bot_otomasyon.ipynb', desc: 'Günlük brifing botu', dur: '35 dk' },
      { name: 'hafta09_notion_database_ai.ipynb', desc: 'Notion AI Database', dur: '20 dk' },
    ],
    assignments: [
      'Kendi günlük rutinini otomatize eden 1 Zap + 1 Make senaryosu',
      'n8n ile haftalık özet rapor (RSS + Gmail → AI → Telegram)',
      'Notion\'da AI destekli kişisel CRM/proje paneli',
    ],
    resources: [
      { label: 'Zapier Learn AI', url: 'zapier.com/learn/ai' },
      { label: 'Make Help Center', url: 'make.com/help' },
      { label: 'n8n Docs', url: 'docs.n8n.io' },
    ],
    takeaways: [
      'Tekrarlayan iş = otomatik iş. n8n + Gemini ile haftada 5+ saat kazanırsın.',
      'Telegram bot kişisel asistanın en hızlı kanalı — webhook ile her şey bağlanır.',
      'Self-hosted n8n bulut maliyetini sıfıra indirir, gizliliği maxa çıkarır.',
    ],
    quote: 'En değerli zaman, başkasına devredilebilen zamandır.',
    quoteAuthor: 'Atölye Felsefesi',
  },

  // ───────────────── HAFTA 10 ─────────────────
  {
    id: 10, slug: '10',
    title: 'Eğitimciler İçin Üretken YZ',
    subtitle: 'Modül 10 — "Sınıfa, Atölyeye, Dersaneye"',
    section: 'MESLEĞE ÖZEL · LOKAL · API',
    sectionShort: 'BÖLÜM 3',
    color: C.pri,
    hours: 6,
    intro: 'MEB rehberi 45+ aracın disipliner uygulanması. Ders planı, ölçme-değerlendirme, akademik dürüstlük.',
    topics: [
      { icon: '📚', title: 'MEB Yapay Zeka Rehberi', detail: '45+ araç, disiplin başına haritalandırılmış — Türkiye\'nin resmî YZ eğitim kaynağı.' },
      { icon: '🔢', title: 'Matematik araçları', detail: 'MathGPTPro, QANDA, Wolfram Alpha, SymboLab, Mathway — adım adım çözüm.' },
      { icon: '🔬', title: 'Fen ve doğa', detail: 'Science360, DIY Nano, Toca Lab — sanal deney ve simülasyon.' },
      { icon: '🇬🇧', title: 'İngilizce dil', detail: 'TalkPal AI, Babbel AI, Preply — pratik konuşma partneri.' },
      { icon: '🪄', title: 'Eğitim platformları', detail: 'MagicSchool, Khanmigo, Diffit, Curipod — öğretmenler için all-in-one.' },
      { icon: '📝', title: 'Ders planı + rubrik', detail: 'Gemini Gems + Custom GPT ile 5E modeli, otomatik soru bankası, rubrik.' },
      { icon: '🎮', title: 'Etkileşimli sınıf', detail: 'Mentimeter AI, Kahoot AI, Quizizz AI — anlık etkileşim.' },
      { icon: '⚖️', title: 'Akademik dürüstlük', detail: 'Turnitin AI, GPTZero, atıf protokolü — sınıf kuralları başta belirlenir.' },
    ],
    specialSlides: [
      { type: 'iconGrid', title: 'MEB Rehberi Disipliner Haritası', items: [
        { emoji: '📖', title: 'Türkçe', desc: 'Ello, Edufy, Quizlet' },
        { emoji: '🔢', title: 'Matematik', desc: 'MathGPT, QANDA' },
        { emoji: '🔬', title: 'Fen', desc: 'Science360, DIY Nano' },
        { emoji: '🇬🇧', title: 'İngilizce', desc: 'TalkPal, Babbel' },
        { emoji: '🏛️', title: 'Sosyal', desc: 'Tarih + Coğrafya AI' },
        { emoji: '🎨', title: 'Görsel Sanatlar', desc: 'Magic Design' },
      ]},
    ],
    libraries: ['MagicSchool', 'Diffit', 'Curipod', 'Khanmigo', 'Kahoot AI', 'Quizizz AI'],
    notebooks: [
      { name: 'hafta10_meb_rehberi_disipliner_tarama.ipynb', desc: '45+ aracın haritası', dur: '40 dk' },
      { name: 'hafta10_dersplani_5e_uretici.ipynb', desc: '5E modeline uygun ders planı', dur: '35 dk' },
      { name: 'hafta10_soru_bankasi_yapilandirilmis.ipynb', desc: 'JSON çıktılı soru bankası', dur: '30 dk' },
      { name: 'hafta10_rubrik_otomasyon.ipynb', desc: 'Otomatik rubrik üretimi', dur: '25 dk' },
      { name: 'hafta10_kahoot_quizizz_ai.ipynb', desc: 'Etkileşimli quiz', dur: '20 dk' },
    ],
    assignments: [
      'Branşına özel 10 araç testi + sınıfta deneme + rapor',
      '1 ünitelik (4 ders) plan + etkinlik + ölçme paketi',
      'Velilere YZ kullanımı bilgilendirme broşürü',
    ],
    resources: [
      { label: 'docs/MEB YZ Araçları Öğretmen El Kitabı', url: 'docs/' },
      { label: 'docs/Eğitici Eğitimi ÜYZ 4 gün', url: 'docs/' },
      { label: 'MagicSchool', url: 'magicschool.ai' },
    ],
    takeaways: [
      'MEB rehberi Türk eğitimcisi için altın referans — 45+ aracı kendi branşına haritalandır.',
      'Ders planı + soru bankası + rubrik = 3 saatlik haftalık iş yarım saate iner.',
      'Akademik dürüstlük protokolü olmadan YZ sınıfa girmemeli — atıf kuralları başta.',
    ],
    quote: 'En iyi öğretmen, öğrenmeye en açık olandır.',
    quoteAuthor: 'Atölye Felsefesi',
  },

  // ───────────────── HAFTA 11 ─────────────────
  {
    id: 11, slug: '11',
    title: 'Mesleğe Özel Atölyeler',
    subtitle: 'Modül 11 — "Araştırmadan Karara"',
    section: 'MESLEĞE ÖZEL · LOKAL · API',
    sectionShort: 'BÖLÜM 3',
    color: C.pri,
    hours: 6,
    intro: 'Akademisyen, sağlık/hukuk/finans, yaratıcı/girişimci — 3 paralel parkur, dikey araçlar.',
    topics: [
      { icon: '🎓', title: 'Akademik parkur', detail: 'Elicit, Consensus, ResearchRabbit, Connected Papers — sistematik review akışı.' },
      { icon: '✍️', title: 'Akademik yazma', detail: 'Paperpal, Trinka, DeepL Write, Zotero AI — atıf yönetimi ve dil rafinasyonu.' },
      { icon: '⚕️', title: 'Sağlık dikey', detail: 'OpenEvidence, Doximity GPT — TTB etik kuralları altında klinik karar destek.' },
      { icon: '⚖️', title: 'Hukuk dikey', detail: 'Harvey AI, Lexis+ AI — Barolar Birliği uyumlu dava analizi, sözleşme.' },
      { icon: '💰', title: 'Finans dikey', detail: 'Bloomberg GPT, FinChat — SPK uyumlu piyasa analizi, raporlama.' },
      { icon: '📈', title: 'Pazarlama + SEO', detail: 'Jasper, Copy.ai, SurferSEO, Frase — içerik üretimi ve arama optimizasyonu.' },
      { icon: '🚀', title: 'Girişimci no-code', detail: 'Lovable, Bolt.new, Replit Agent — fikrini 1 saatte canlı uygulamaya çevir.' },
    ],
    specialSlides: [
      { type: 'infoCard3Col', title: '3 Paralel Parkur Seçimi', cards: [
        { emoji: '🎓', title: 'AKADEMİK', desc: 'Elicit + Consensus + NotebookLM', color: C.acc, items: [
          'Sistematik review',
          'Atıf grafiği',
          'AI yazma asistanı',
          'Zotero entegrasyonu',
        ]},
        { emoji: '🏥', title: 'DİKEY ALANLAR', desc: 'Sağlık / Hukuk / Finans', color: C.sec, items: [
          'OpenEvidence',
          'Harvey AI',
          'Bloomberg GPT',
          'Meslek etik kuralları',
        ]},
        { emoji: '🎨', title: 'YARATICI/GİRİŞİMCİ', desc: 'Pazarlama + No-Code', color: C.pri, items: [
          'Jasper / Copy.ai',
          'SurferSEO',
          'Lovable / Bolt.new',
          '1 saatte deploy',
        ]},
      ]},
    ],
    libraries: ['Elicit', 'Consensus', 'ResearchRabbit', 'Lovable', 'Bolt.new', 'Harvey AI'],
    notebooks: [
      { name: 'hafta11A_akademik_arastirma.ipynb', desc: 'Elicit + Consensus + NotebookLM', dur: '60 dk' },
      { name: 'hafta11B_dikey_alanlar.ipynb', desc: 'Sağlık/Hukuk/Finans', dur: '40 dk' },
      { name: 'hafta11C_pazarlama_girisimcilik.ipynb', desc: 'Pazarlama + SEO + içerik', dur: '40 dk' },
      { name: 'hafta11_lovable_bolt_replit_atolye.ipynb', desc: 'No-code uygulama', dur: '60 dk' },
    ],
    assignments: [
      'Akademisyen: 1 makalelik mini sistematik review',
      'Hekim/Hukukçu: 1 vakalık dikey araç testi + etik raporu',
      'Yaratıcı/Girişimci: Lovable / Bolt ile küçük landing page',
    ],
    resources: [
      { label: 'docs/akademik araçlar', url: 'docs/' },
      { label: 'Elicit', url: 'elicit.com' },
      { label: 'Lovable', url: 'lovable.dev' },
    ],
    takeaways: [
      'YZ \'genel asistan\' değil — branşına özel dikey araçlar verimliliği patlatır.',
      'Akademide Elicit + Consensus, sistematik review süresini günlerden saatlere indirir.',
      'Lovable/Bolt.new ile fikrini 1 saatte canlı uygulamaya dönüştürebilirsin.',
    ],
    quote: 'Genel araç çok şey bilir, dikey araç bir şeyi mükemmel bilir.',
    quoteAuthor: 'Atölye Felsefesi',
  },

  // ───────────────── HAFTA 12 ─────────────────
  {
    id: 12, slug: '12',
    title: 'Lokal LLM Kurulumu',
    subtitle: 'Modül 12 — "Bulut Bağımlılığını Kır"',
    section: 'MESLEĞE ÖZEL · LOKAL · API',
    sectionShort: 'BÖLÜM 3',
    color: C.pri,
    hours: 6,
    intro: 'Ollama, LM Studio, Open WebUI ile YZ\'yi kendi bilgisayarında çalıştır. Türkçe modeller.',
    topics: [
      { icon: '🔒', title: 'Neden lokal?', detail: 'Gizlilik, sıfır maliyet, internet bağımsızlığı, KVKK uyumu — hassas veri için zorunlu.' },
      { icon: '💻', title: 'Donanım eşiği', detail: '8 GB RAM minimum (3B model), 16 GB (7B), 32 GB+ (13B+). GPU önerilir, CPU\'da da çalışır.' },
      { icon: '🦙', title: 'Ollama', detail: 'En kolay başlangıç — Mac/Win/Linux. Tek komut: `ollama run llama3.2`.' },
      { icon: '🖥️', title: 'LM Studio', detail: 'GUI tercih edenlere — model arama, sohbet, local server (OpenAI uyumlu).' },
      { icon: '🌐', title: 'Open WebUI', detail: 'Docker ile ChatGPT benzeri arayüz — çoklu kullanıcı, RAG, web search.' },
      { icon: '🇹🇷', title: 'Türkçe modeller', detail: 'llama3.2:3b, qwen2.5:7b, gemma2:9b, Trendyol-LLM — pratik kıyaslama.' },
      { icon: '⚡', title: 'Optimize et', detail: 'Kuantizasyon (Q4_K_M, Q8), Apple Silicon MLX, GPU offload — hız ipuçları.' },
    ],
    specialSlides: [
      { type: 'matrix', title: 'Donanım × Model Boyutu Tablosu',
        columns: ['RAM', '3B (Q4)', '7B (Q4)', '13B (Q4)', '70B (Q4)'],
        rows: [
          { label: '8 GB', values: ['✅ Akıcı', '⚠️ Yavaş', '❌', '❌'] },
          { label: '16 GB', values: ['✅', '✅', '⚠️', '❌'] },
          { label: '32 GB', values: ['✅', '✅', '✅', '⚠️'] },
          { label: '64 GB+', values: ['✅', '✅', '✅', '✅'] },
        ]
      },
      { type: 'statsRow', title: 'Türkçe Model Karşılaştırma', stats: [
        { value: '3B', label: 'Llama 3.2', sub: 'Hızlı, basit görevler' },
        { value: '7B', label: 'Qwen 2.5', sub: 'Türkçe en iyi denge' },
        { value: '9B', label: 'Gemma 2', sub: 'Akıl yürütme güçlü' },
      ]},
    ],
    libraries: ['Ollama', 'LM Studio', 'Open WebUI', 'Jan', 'GPT4All'],
    notebooks: [
      { name: 'hafta12_ollama_kurulum_macwinlinux.ipynb', desc: '3 işletim sistemi adım adım', dur: '30 dk' },
      { name: 'hafta12_ilk_konusma.ipynb', desc: 'ollama run + Python REST API', dur: '40 dk' },
      { name: 'hafta12_lm_studio_atolye.ipynb', desc: 'GUI ile model deneme', dur: '30 dk' },
      { name: 'hafta12_openwebui_docker.ipynb', desc: 'Docker kurulum (Mac + VPS)', dur: '45 dk' },
      { name: 'hafta12_model_kiyaslama.ipynb', desc: 'Llama vs Qwen vs Gemma TR', dur: '40 dk' },
    ],
    assignments: [
      'Ollama kurulumu + 3 modeli indir, 10 Türkçe görevde kıyas',
      'Open WebUI Docker kurulum, aile üyesine erişim ver',
      'Donanımına en uygun model + kuantizasyon raporu',
    ],
    resources: [
      { label: 'Ollama Library', url: 'ollama.com/library' },
      { label: 'LM Studio', url: 'lmstudio.ai' },
      { label: 'Open WebUI', url: 'github.com/open-webui' },
    ],
    takeaways: [
      'Lokal LLM = gizliliğin kazandığı an. Ollama 5 dakikada kurulur, çevrimdışı çalışır.',
      'Türkçe için Qwen 2.5 7B Q4 + Mac M1 Pro = pratik üretkenlik.',
      'Open WebUI Docker, evdeki herkesin "ChatGPT\'sine" sıfır maliyetle dönüşür.',
    ],
    quote: 'Bulut, başkasının bilgisayarıdır — kendi bilgisayarın daha sadıktır.',
    quoteAuthor: 'Atölye Felsefesi',
  },

  // ───────────────── HAFTA 13 ─────────────────
  {
    id: 13, slug: '13',
    title: 'Lokal RAG ve Kendi Verinle Konuşma',
    subtitle: 'Modül 13 — "Kendi NotebookLM\'ini Kur"',
    section: 'MESLEĞE ÖZEL · LOKAL · API',
    sectionShort: 'BÖLÜM 3',
    color: C.pri,
    hours: 6,
    intro: 'AnythingLLM, Cherry Studio, Page Assist — tamamen lokal RAG. Embedding modelleri, Türkçe doğruluk.',
    topics: [
      { icon: '🔄', title: 'RAG nedir', detail: 'Retrieval-Augmented Generation: dokümanı parçala → embed → sorguda en alakalı parçaları LLM\'e ver.' },
      { icon: '🗂️', title: 'AnythingLLM', detail: 'Mintplex Labs — sınırsız workspace, herhangi LLM, çoklu doküman kaynağı.' },
      { icon: '🍒', title: 'Cherry Studio', detail: 'Türkçe destekli, çoklu API + Ollama — Çin yapımı ama yerli pratik.' },
      { icon: '🌐', title: 'Page Assist', detail: 'Browser uzantısı — açık web sayfasıyla anında konuş.' },
      { icon: '💼', title: 'GPT4All + MSTY', detail: 'Düşük donanımda dosya indeksi, MSTY local+cloud hibrit.' },
      { icon: '📐', title: 'Embedding seçimi', detail: 'nomic-embed-text, mxbai, multilingual-e5 — Türkçe için multilingual-e5 en iyi.' },
      { icon: '⚙️', title: 'Performans ayarları', detail: 'Chunk size 512 + overlap 64 + parent retriever = pratik production formülü.' },
    ],
    specialSlides: [
      { type: 'pipeline', title: 'Lokal RAG Mimarisi', steps: [
        { emoji: '📄', label: 'PDF/DOCX', sub: 'Yükle' },
        { emoji: '✂️', label: 'CHUNK', sub: '512+overlap' },
        { emoji: '🧮', label: 'EMBED', sub: 'nomic / e5' },
        { emoji: '🗄️', label: 'VECTOR DB', sub: 'LanceDB / Chroma' },
        { emoji: '🔍', label: 'RETRIEVE', sub: 'Top-K alakalı' },
        { emoji: '💬', label: 'LLM', sub: 'Ollama / Cloud' },
        { emoji: '📤', label: 'CEVAP', sub: 'Kaynaklı' },
      ]},
    ],
    libraries: ['AnythingLLM', 'Cherry Studio', 'Page Assist', 'MSTY', 'Open WebUI'],
    notebooks: [
      { name: 'hafta13_anythingllm_kurulum.ipynb', desc: 'Workspace + ilk soru', dur: '40 dk' },
      { name: 'hafta13_cherry_studio_turkce.ipynb', desc: 'Türkçe destekli kullanım', dur: '30 dk' },
      { name: 'hafta13_page_assist_browser.ipynb', desc: 'Browser uzantısı', dur: '20 dk' },
      { name: 'hafta13_kendi_kitabini_konustur_lokal.ipynb', desc: '5 PDF tamamen offline', dur: '60 dk' },
      { name: 'hafta13_embedding_kiyas_tr.ipynb', desc: 'Türkçe embedding doğruluk', dur: '45 dk' },
    ],
    assignments: [
      'AnythingLLM ile 20 PDF\'lik bilgi tabanı, NotebookLM ile kıyasla',
      'Cherry Studio + Ollama tam offline iş akışı',
      'Page Assist ile günlük araştırma rutinini hızlandır',
    ],
    resources: [
      { label: 'AnythingLLM', url: 'useanything.com' },
      { label: 'Cherry Studio', url: 'cherry-ai.com' },
      { label: 'MSTY', url: 'msty.app' },
    ],
    takeaways: [
      'AnythingLLM = "kendi NotebookLM\'in" — tamamen lokal, sınırsız doküman.',
      'Türkçe için multilingual-e5 + Qwen 2.5 = en iyi kombinasyon.',
      'Chunk 512 + overlap 64 + parent retriever = pratik production formülü.',
    ],
    quote: 'Verin, senin kalır.',
    quoteAuthor: 'Lokal LLM Manifestosu',
  },

  // ───────────────── HAFTA 14 ─────────────────
  {
    id: 14, slug: '14',
    title: 'API ile Üretken YZ + Capstone',
    subtitle: 'Modül 14 — Final · "Prompttan Ürüne"',
    section: 'MESLEĞE ÖZEL · LOKAL · API',
    sectionShort: 'BÖLÜM 3',
    color: C.pri,
    hours: 6,
    intro: 'Google AI Studio, OpenRouter, HF Spaces. Streamlit/Gradio + v0/Vercel. Capstone proje sunumu.',
    topics: [
      { icon: '🔑', title: 'API anahtarı', detail: 'Google AI Studio ücretsiz, OpenRouter 100+ model, HF Inference. .env / Colab Secrets ile sakla.' },
      { icon: '🟢', title: 'Gemini 2.5 Flash', detail: 'Ücretsiz katman, haftalık kota, Türkiye direkt — başlangıç için ideal.' },
      { icon: '🌐', title: 'OpenRouter', detail: 'Tek API ile Gemini/Claude/GPT/Llama/DeepSeek — provider değişimi tek satırda.' },
      { icon: '🤗', title: 'HF Inference', detail: 'Açık kaynak modeller, sıfır maliyet katmanı, Replicate/Fal.ai görsel/video API\'ları.' },
      { icon: '🐍', title: 'Basit Python', detail: 'pip install google-generativeai, ilk istek 3 satırda — kopyala-yapıştır şablon.' },
      { icon: '🎨', title: 'Streamlit/Gradio', detail: '30 satırda canlı arayüz — chat input, sidebar ayarlar, geçmiş tutma.' },
      { icon: '🚀', title: 'HF Spaces + Vercel v0', detail: 'Sıfır kart deploy. v0.dev ile no-code arayüz + AI bağlantısı.' },
      { icon: '💵', title: 'Maliyet izleme', detail: 'OpenAI Dashboard, Anthropic Console — günlük limit, sürpriz fatura yok.' },
    ],
    specialSlides: [
      { type: 'infoCard3Col', title: 'Capstone Proje Fikirleri', cards: [
        { emoji: '👨‍🏫', title: 'EĞİTİMCİLER', desc: 'Sınıfa, atölyeye, dersaneye', color: C.acc, items: [
          'Veli iletişim botu',
          'Soru bankası üretici',
          'Ders planı asistanı',
          'Otomatik rubrik',
        ]},
        { emoji: '🎓', title: 'AKADEMİSYENLER', desc: 'Araştırma + yazma', color: C.sec, items: [
          'Mini sistematik review',
          'Atıf yönetici',
          'Türkçe akademik yazı',
          'Sınav hazırlık botu',
        ]},
        { emoji: '🚀', title: 'GİRİŞİMCİLER', desc: 'Ürün + pazarlama', color: C.pri, items: [
          'Müşteri destek botu',
          'İçerik fabrikası',
          'No-code SaaS',
          'AI destekli landing',
        ]},
      ]},
      { type: 'pipeline', title: 'Proje → Deploy Zinciri', steps: [
        { emoji: '💡', label: 'FİKİR', sub: 'Sorun seç' },
        { emoji: '🎨', label: 'TASARIM', sub: 'v0.dev / Streamlit' },
        { emoji: '🔌', label: 'API', sub: 'Gemini / OpenRouter' },
        { emoji: '🧪', label: 'TEST', sub: 'Yerel deneme' },
        { emoji: '🚀', label: 'DEPLOY', sub: 'HF Spaces / Vercel' },
        { emoji: '📺', label: 'DEMO', sub: '5 dk sunum' },
      ]},
    ],
    libraries: ['google-generativeai', 'streamlit', 'gradio', 'OpenRouter', 'HF Spaces', 'Vercel v0'],
    notebooks: [
      { name: 'hafta14_aistudio_ilk_api.ipynb', desc: 'Gemini 2.5 Flash hello world', dur: '30 dk' },
      { name: 'hafta14_openrouter_uc_model.ipynb', desc: 'Gemini/Claude/GPT karşılaştırma', dur: '35 dk' },
      { name: 'hafta14_streamlit_kisisel_asistan.ipynb', desc: '50 satır kişisel asistan', dur: '45 dk' },
      { name: 'hafta14_hf_spaces_deploy.ipynb', desc: 'HF Spaces sıfır maliyet deploy', dur: '30 dk' },
      { name: 'hafta14_v0_vercel_nocode.ipynb', desc: 'v0.dev no-code arayüz', dur: '25 dk' },
      { name: 'hafta14_capstone_sablon.ipynb', desc: 'Capstone iskeleti', dur: '60 dk' },
    ],
    assignments: [
      'CAPSTONE: 14 hafta birikimini birleştiren bir ürün üret (en az 3 madde)',
      'Canlı deploy: HF Spaces, Vercel + v0 ya da Open WebUI',
      'README + mimari diyagram + 3 dakikalık demo videosu',
      'Sunum günü: 5 dk demo + 2 dk Q&A, sertifika töreni 🎓',
    ],
    resources: [
      { label: 'Google AI Studio', url: 'aistudio.google.com' },
      { label: 'OpenRouter Docs', url: 'openrouter.ai/docs' },
      { label: 'HF Spaces', url: 'huggingface.co/spaces' },
      { label: 'Vercel v0', url: 'v0.dev' },
    ],
    takeaways: [
      '14 hafta birikimini canlı deploy edilmiş bir ürüne dönüştürdün — CV\'nin yeni satırı.',
      'Gemini 2.5 Flash + Streamlit + HF Spaces = sıfır maliyetle ürünleştirme zinciri.',
      'Atölyenin sonu yolculuğun başlangıcı — kendi öğrenme döngünü kur, paylaşımı sürdür.',
    ],
    quote: 'En iyi prompt, ürünleşmiş olandır.',
    quoteAuthor: 'Atölye Felsefesi',
  },
];

// ═══════════════════════════════════════════════════════════
// HAFTA İÇİN PPTX ÜRETEN ANA FONKSİYON
// ═══════════════════════════════════════════════════════════
function generateWeekPPTX(week, outputDir) {
  const pres = T.createPres(`Hafta ${week.id} — ${week.title}`, 'Dr. Murat Altun');

  // ─── 1. KAPAK ────────────────────────────────────────────
  T.addCoverSlide(pres,
    week.title,
    week.subtitle + ' · ' + week.intro,
    'Dr. Murat Altun',
    [
      { value: String(week.hours), label: 'Saat' },
      { value: String(week.notebooks.length), label: 'Notebook' },
      { value: String(week.assignments.length), label: 'Ödev' },
      { value: String(week.libraries.length), label: 'Araç' },
    ],
    week.sectionShort + ' · HAFTA ' + week.id,
  );

  // ─── 2. AÇILIŞ QUOTE ─────────────────────────────────────
  T.addQuoteSlide(pres, week.quote, week.quoteAuthor || 'Dr. Murat Altun', week.section);

  // ─── 3. HAFTA ÖZETİ (3-card grid) ────────────────────────
  T.addInfoCard3Col(pres, 'Bu Haftada Ne Öğreneceğiz?', week.sectionShort, [
    {
      emoji: '🎯', title: 'KAVRAMLAR', color: C.acc,
      desc: `${week.topics.length} ana konu, kavram haritası ve gerçek örnekler`,
      items: week.topics.slice(0, 3).map(t => t.title),
    },
    {
      emoji: '🛠️', title: 'ATÖLYE', color: C.sec,
      desc: `${week.notebooks.length} notebook, adım adım pratik uygulama`,
      items: week.notebooks.slice(0, 3).map(nb => nb.name.replace('.ipynb', '').split('_').slice(1).join(' ')),
    },
    {
      emoji: '🚀', title: 'ÇIKTI', color: C.pri,
      desc: `${week.assignments.length} somut ödev, paylaşılabilir ürün`,
      items: week.assignments.slice(0, 3).map(a => a.length > 50 ? a.substring(0, 50) + '...' : a),
    },
  ]);

  // ─── 4-5. HAFTA-SPESİFİK ÖZEL SLAYTLAR ───────────────────
  (week.specialSlides || []).forEach(sp => {
    if (sp.type === 'timeline') {
      T.addTimelineSlide(pres, sp.title, week.sectionShort, sp.points);
    } else if (sp.type === 'matrix') {
      T.addComparisonMatrix(pres, sp.title, week.sectionShort, sp.columns, sp.rows);
    } else if (sp.type === 'iconGrid') {
      T.addIconGrid(pres, sp.title, week.sectionShort, sp.items);
    } else if (sp.type === 'infoCard3Col') {
      T.addInfoCard3Col(pres, sp.title, week.sectionShort, sp.cards);
    } else if (sp.type === 'caseStudy') {
      T.addCaseStudySlide(pres, sp.title, week.sectionShort, sp.case);
    } else if (sp.type === 'pipeline') {
      T.addPipelineDiagram(pres, sp.title, week.sectionShort, sp.steps);
    } else if (sp.type === 'statsRow') {
      T.addStatsRow(pres, sp.title, week.sectionShort, sp.stats);
    }
  });

  // ─── 6-N. KONULAR (zenginleştirilmiş, her slaytta 4 konu) ──
  const TOPICS_PER_SLIDE = 4;
  for (let i = 0; i < week.topics.length; i += TOPICS_PER_SLIDE) {
    const chunk = week.topics.slice(i, i + TOPICS_PER_SLIDE);
    const slideIdx = Math.floor(i / TOPICS_PER_SLIDE) + 1;
    const totalSlides = Math.ceil(week.topics.length / TOPICS_PER_SLIDE);
    const s = pres.addSlide();
    T.slideHeader(pres, s, `Konular · ${slideIdx}/${totalSlides}`, week.sectionShort, C.cream);

    chunk.forEach((topic, idx) => {
      const y = 1.0 + idx * 1.05;
      T.addCard(pres, s, 0.5, y, 9.0, 0.92, { leftColor: week.color });
      // Numara badge
      T.numBadge(pres, s, 0.7, y + 0.28, i + idx + 1, week.color);
      // Emoji
      s.addText(topic.icon || '✨', { x: 1.2, y: y + 0.18, w: 0.5, h: 0.55, margin: 0, fontFace: 'Calibri', fontSize: 24, align: 'center' });
      // Başlık
      s.addText(topic.title, { x: 1.8, y: y + 0.1, w: 7.2, h: 0.34, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: week.color });
      // Detay
      s.addText(topic.detail || '', { x: 1.8, y: y + 0.45, w: 7.2, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });
    });
  }

  // ─── ARAÇ SETİ (icon grid ile zenginleştirilmiş) ─────────
  {
    const s = pres.addSlide();
    T.slideHeader(pres, s, 'Bu Haftanın Araç Seti', week.sectionShort, C.cream);
    const cols = 2, rows = Math.ceil(week.libraries.length / cols);
    const cellW = 4.4, cellH = 0.85, gap = 0.15;
    week.libraries.forEach((lib, i) => {
      const x = 0.5 + (i % cols) * (cellW + gap);
      const y = 1.0 + Math.floor(i / cols) * (cellH + gap);
      T.addCard(pres, s, x, y, cellW, cellH, { leftColor: week.color });
      s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: y + 0.22, w: 0.42, h: 0.42, fill: { color: week.color }, line: { type: 'none' } });
      s.addText(String(i + 1), { x: x + 0.18, y: y + 0.22, w: 0.42, h: 0.42, fontFace: 'Calibri', fontSize: 13, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      s.addText(lib, { x: x + 0.75, y: y + 0.18, w: cellW - 0.85, h: 0.5, fontFace: 'Calibri', fontSize: 13, bold: true, color: C.dark, valign: 'middle' });
    });
    T.cardBody(s, 0.5, 5.0, 9.0, 0.4,
      'Tüm araçların ücretsiz katmanı atölyede gösterilir. Premium gerekmez.',
      { size: 10, color: C.subtle, italic: true });
  }

  // ─── NOTEBOOK'LAR (süre rozetli) ────────────────────────
  {
    const s = pres.addSlide();
    T.slideHeader(pres, s, 'Atölye Notebook\'ları', week.sectionShort, C.cream);
    week.notebooks.slice(0, 6).forEach((nb, i) => {
      const y = 1.0 + i * 0.7;
      T.addCard(pres, s, 0.5, y, 9.0, 0.6, { leftColor: C.acc });
      s.addText('📓', { x: 0.65, y: y + 0.12, w: 0.4, h: 0.4, fontFace: 'Calibri', fontSize: 18, align: 'center' });
      s.addText(nb.name, { x: 1.1, y: y + 0.08, w: 3.6, h: 0.28, fontFace: 'Consolas', fontSize: 10, bold: true, color: C.acc });
      s.addText(nb.desc, { x: 1.1, y: y + 0.32, w: 6.5, h: 0.28, fontFace: 'Calibri', fontSize: 10, color: C.dark });
      // Süre rozeti
      if (nb.dur) {
        s.addShape(pres.shapes.RECTANGLE, { x: 8.1, y: y + 0.14, w: 0.8, h: 0.32, fill: { color: C.amber }, line: { type: 'none' } });
        s.addText('⏱ ' + nb.dur, { x: 8.1, y: y + 0.14, w: 0.8, h: 0.32, fontFace: 'Calibri', fontSize: 9, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      }
    });
  }

  // ─── ÖDEVLER ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    T.slideHeader(pres, s, 'Pratik Ödevler', week.sectionShort, C.cream);
    week.assignments.forEach((a, i) => {
      const y = 1.0 + i * (week.assignments.length > 3 ? 0.85 : 1.05);
      const h = week.assignments.length > 3 ? 0.75 : 0.92;
      T.addCard(pres, s, 0.5, y, 9.0, h, { leftColor: C.sec, bg: C.warmBg });
      T.numBadge(pres, s, 0.7, y + (h - 0.36) / 2, i + 1, C.sec);
      T.cardBody(s, 1.25, y + 0.18, 7.7, h - 0.3, a, { size: 12 });
    });
  }

  // ─── KAYNAKLAR ───────────────────────────────────────────
  {
    const s = pres.addSlide();
    T.slideHeader(pres, s, 'Kaynaklar ve Referanslar', week.sectionShort, C.cream);
    week.resources.forEach((r, i) => {
      const y = 1.0 + i * 1.0;
      T.addCard(pres, s, 0.5, y, 9.0, 0.85, { leftColor: C.priLt });
      s.addText('🔗', { x: 0.65, y: y + 0.22, w: 0.4, h: 0.4, fontFace: 'Calibri', fontSize: 18, align: 'center' });
      s.addText(r.label, { x: 1.15, y: y + 0.12, w: 7.8, h: 0.32, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.dark });
      s.addText(r.url, { x: 1.15, y: y + 0.45, w: 7.8, h: 0.28, fontFace: 'Consolas', fontSize: 9, color: C.subtle });
    });
  }

  // ─── KAPANIŞ ─────────────────────────────────────────────
  T.addClosingSlide(pres, `Hafta ${week.id} · ${week.title}`,
    week.takeaways.map((t, i) => ({ text: t, color: [C.acc, C.sec, C.pri][i % 3] })),
    week.quote,
    'Dr. Murat Altun');

  // ─── YAZ ─────────────────────────────────────────────────
  const filename = `hafta${week.slug}_${week.title.toLowerCase()
    .replace(/['"·•]/g, '')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .substring(0, 50)
  }.pptx`;
  const filepath = path.join(outputDir, filename);
  return pres.writeFile({ fileName: filepath }).then(() => filepath);
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
async function main() {
  const outputDir = path.join(__dirname, 'sunumlar');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  console.log(`\n🎨 Üretken YZ Atölyesi · Aurora paleti · 14 hafta PPTX → ${outputDir}\n`);
  for (const week of WEEKS) {
    try {
      const fp = await generateWeekPPTX(week, outputDir);
      const size = (fs.statSync(fp).size / 1024).toFixed(0);
      console.log(`  ✓ Hafta ${String(week.id).padStart(2)} · ${path.basename(fp)} (${size} KB)`);
    } catch (e) {
      console.error(`  ✗ Hafta ${week.id} HATA:`, e.message);
    }
  }
  console.log(`\n✅ ${WEEKS.length} PPTX üretildi. Drive'a yükle, ID'leri curriculum.ts'e ekle.\n`);
}

main();
