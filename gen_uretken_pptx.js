/**
 * Üretken YZ Atölyesi · Prompttan Ürüne — Toplu PPTX Üretici
 * ============================================================
 * Tek master generator. Her hafta için ~16 slaytlık tutarlı PPTX üretir.
 * Çalıştır: node gen_uretken_pptx.js
 * Çıktı: sunumlar/haftaXX_<slug>.pptx (14 dosya)
 *
 * Yapı (her sunum):
 *  1. Kapak (koyu arka plan, sağ panel istatistikler)
 *  2. İçindekiler (4 ana alt-bölüm)
 *  3. Hafta hedefleri (kazanım kartları)
 *  4-9. Konular (her konu için 1-2 kart slayt)
 *  10. Kullanılacak araç seti (libraries)
 *  11. Atölye notebook'ları (notebooks listesi)
 *  12. Veri/dataset (varsa)
 *  13. Ödevler (numbered cards)
 *  14. Kaynaklar
 *  15. WhatsApp kayıt CTA + sonraki hafta
 *  16. Kapanış (key takeaway'ler)
 */

const fs = require('fs');
const path = require('path');
const T = require('/Users/drmurataltun/.claude/pptx-template.js');
const C = T.C;

// ═══════════════════════════════════════════════════════════
// CURRICULUM META — curriculum.ts ile senkron
// (TS'i Node ile import etmek yerine inline tutuyoruz)
// ═══════════════════════════════════════════════════════════
const WEEKS = [
  {
    id: 1, slug: '01',
    title: "Üretken YZ'ye Giriş",
    subtitle: 'Modül 1 — "Makine Düşünebilir mi?"',
    section: 'TEMELLER VE ASİSTANLAR',
    sectionShort: 'BÖLÜM 1',
    color: C.acc,
    hours: 6,
    intro: 'Yapay zeka kavramlarından üretken YZ\'ye, etik ve KVKK\'dan Türkiye perspektifine kadar giriş bölümü.',
    topics: [
      'YZ vs ML vs Üretken YZ — kavram haritası ve görsel sezgi',
      'Tarihçe: Turing → Cahit Arf (1958) → Transformer (2017) → ChatGPT (2022) → Multimodal',
      'Üretken YZ ne yapar / ne yapamaz — gerçekçi beklenti',
      'Halüsinasyon, deepfake, telif, bias — Türkiye\'den gerçek vakalar',
      'KVKK, MEB Yapay Zeka Politika Belgesi, AB AI Act özeti',
      'Konya Akıllı Şehir AI stratejisi ve ulusal araç ekosistemi',
      'Topluluklar, kanallar, GitHub/Kaggle/HuggingFace hesapları',
    ],
    libraries: ['ChatGPT', 'Gemini', 'Claude', 'NotebookLM (önizleme)'],
    notebooks: [
      { name: 'hafta01_kavram_haritasi.ipynb', desc: 'YZ-ML-DL-GenAI kavram haritası ve interaktif quiz' },
      { name: 'hafta01_tarihce_timeline.ipynb', desc: 'Turing\'den 2026\'ya görsel zaman çizgisi' },
      { name: 'hafta01_etik_senaryolar.ipynb', desc: '10 gerçek vaka — sen olsan ne yapardın?' },
    ],
    assignments: [
      'Cahit Arf — "Makine Düşünebilir mi?" makalesini oku, 1 sayfalık Türkçe özet yaz',
      'ChatGPT, Gemini ve Claude\'a aynı 5 soruyu sor; yanıtları tabloya dök, kıyasla',
      'Notion ya da Google Docs üzerinde 14 haftalık öğrenme defterini aç',
    ],
    resources: [
      { label: 'MEB — YZ Araçları Öğretmen El Kitabı (60 sayfa)', url: 'github.com/DrMuratAltun/uretken-yz-egitimleri' },
      { label: 'Cahit Arf — Makine Düşünebilir mi?', url: 'docs/' },
      { label: 'AB AI Act Özeti', url: 'artificialintelligenceact.eu' },
    ],
    takeaways: [
      'Üretken YZ = mevcut veriden yeni içerik üreten YZ; sınıflandırıcıdan farklı.',
      'Cahit Arf 1958\'de bu soruyu sordu — Türkiye\'nin YZ kökü derindir.',
      'KVKK ve MEB politikası kapsam dahilinde; etik ve hukuk her hafta gündemde.',
    ],
    quote: 'Makine düşünebilir mi? Bu sorunun cevabı, "düşünmek" sözünün anlamına bağlıdır.',
  },
  {
    id: 2, slug: '02',
    title: 'Prompt Mühendisliği',
    subtitle: 'Modül 2 — "İyi Prompt = İyi Sonuç"',
    section: 'TEMELLER VE ASİSTANLAR',
    sectionShort: 'BÖLÜM 1',
    color: C.acc,
    hours: 6,
    intro: 'Prompt anatomisi, Few-shot, CoT, yapılandırılmış çıktı ve prompt güvenliği. Türkçe için özel teknikler.',
    topics: [
      'Prompt anatomisi: Rol + Bağlam + Görev + Kısıt + Format + Örnek',
      'Zero-shot, One-shot, Few-shot — ne zaman hangisi?',
      'Chain-of-Thought (adım adım düşündürme), "önce planla, sonra yaz"',
      'Yapılandırılmış çıktı: tablo, JSON, markdown, listeleme',
      'Türkçe için özel teknikler: dil kilidi, kalıp ifadeler, ölçek',
      'Prompt zincirleri: 1. taslak → 2. eleştir → 3. düzelt',
      'Prompt enjeksiyonu, jailbreak ve güvenli prompt tasarımı',
      'Prompt kütüphanesi tutmak: Notion, GitHub, Gem, Project',
    ],
    libraries: ['ChatGPT', 'Gemini Studio', 'Claude', 'Notion'],
    notebooks: [
      { name: 'hafta02_prompt_anatomi.ipynb', desc: 'Yan yana 10 örnek prompt çözümlemesi' },
      { name: 'hafta02_few_shot_atolye.ipynb', desc: 'Duygu analizi, sınıflandırma — zero/one/few-shot' },
      { name: 'hafta02_cot_matematik_mantik.ipynb', desc: 'Chain-of-Thought ile 5 mantık bulmacası' },
      { name: 'hafta02_yapilandirilmis_cikti.ipynb', desc: 'JSON, tablo, markdown şablonları' },
      { name: 'hafta02_prompt_kutuphanesi_sablon.ipynb', desc: 'Notion / Obsidian prompt kütüphanesi' },
    ],
    assignments: [
      'Aynı görev için 5 farklı prompt versiyonu yaz, sonuçları rubrik ile puanla',
      'Kendi mesleğine yönelik 10 prompt\'tan oluşan "Altın Prompt Kütüphanesi" hazırla',
      'Bir öğrenci/çalışan ödev değerlendirme prompt\'u tasarla (rubrik + örnek + JSON)',
    ],
    resources: [
      { label: 'docs/Prompt yazma.docx', url: 'docs/' },
      { label: 'Anthropic Prompt Engineering Guide', url: 'docs.anthropic.com' },
      { label: 'Learn Prompting (TR)', url: 'learnprompting.org' },
    ],
    takeaways: [
      'İyi prompt 6 unsurun (rol, bağlam, görev, kısıt, format, örnek) bilinçli kombinasyonudur.',
      'Few-shot örnekler %80 hatayı çözer; CoT karmaşık akıl yürütme için olmazsa olmaz.',
      'Prompt güvenliği bir mühendislik disiplini — enjeksiyon savunması başından planlanır.',
    ],
    quote: 'Doğru soru, doğru cevabın yarısıdır.',
  },
  {
    id: 3, slug: '03',
    title: 'Sohbet Asistanları',
    subtitle: 'Modül 3 — "Doğru İşe Doğru Asistan"',
    section: 'TEMELLER VE ASİSTANLAR',
    sectionShort: 'BÖLÜM 1',
    color: C.acc,
    hours: 6,
    intro: 'ChatGPT, Gemini, Claude, Grok, DeepSeek — özelliklerin, maliyetlerin ve Türkçe performansların kıyası. Custom GPT, Gem, Project oluşturma atölyesi.',
    topics: [
      'ChatGPT (GPT-5/o3): Custom GPTs, Projects, Canvas, Code Interpreter, Memory, Tasks',
      'Gemini (2.5 Pro/Flash): Gems, Gemini Live, Deep Research, 2M token context',
      'Claude (Sonnet 4.6/Opus 4.7): Projects, Artifacts, Computer Use, MCP',
      'Grok (3): X entegrasyonu, gerçek zamanlı arama, Think mode',
      'DeepSeek (V3/R1): Ücretsiz reasoning, açık ağırlık',
      'Perplexity, You.com, Phind: Arama tabanlı asistanlar',
      'Türkçe modeller: Trendyol-LLM, KocLM, Cosmos, Llama-Türk',
      'Karşılaştırma matrisi: maliyet, hız, doğruluk, gizlilik',
      'Custom GPT / Gem / Project oluşturma — adım adım',
    ],
    libraries: ['ChatGPT', 'Gemini', 'Claude', 'Grok', 'DeepSeek', 'Perplexity'],
    notebooks: [
      { name: 'hafta03_asistan_kiyas_matrisi.ipynb', desc: '10 görev × 5 asistan kıyas tablosu' },
      { name: 'hafta03_chatgpt_custom_gpt.ipynb', desc: 'Kendi GPT\'ni yap — adım adım rehber' },
      { name: 'hafta03_gemini_gem_olustur.ipynb', desc: 'Gemini Gems ile kişisel asistan' },
      { name: 'hafta03_claude_projects_artifacts.ipynb', desc: 'Claude Projects ve Artifacts' },
      { name: 'hafta03_perplexity_arastirma_atolyesi.ipynb', desc: 'Perplexity Spaces araştırma akışı' },
    ],
    assignments: [
      'Aynı 10 mesleki soruyu 5 asistana sor, kıyas raporu yaz',
      'Kendi alanına özel 1 Custom GPT + 1 Gem + 1 Claude Project yarat',
      'Aile üyesi/iş arkadaşı için "kişisel asistan paneli" hazırla',
    ],
    resources: [
      { label: 'OpenAI Help Center', url: 'help.openai.com' },
      { label: 'Google AI — Gemini', url: 'gemini.google.com' },
      { label: 'Anthropic — Claude', url: 'anthropic.com/news' },
    ],
    takeaways: [
      'Tek bir asistan yetmez — görev tipine göre seçim yapılır (kod/araştırma/yaratıcı/Türkçe).',
      'Custom GPT, Gem ve Claude Project ile asistanlarını "kişiselleştirmek" verimlilik katlar.',
      'Türkçe için Gemini ve Claude güçlü; akıl yürütmede o3/R1/Opus öne çıkar.',
    ],
    quote: 'Aracını seç, ustalaş, sonra başkasına öğret.',
  },
  {
    id: 4, slug: '04',
    title: 'NotebookLM ve Bilgi Yönetimi',
    subtitle: 'Modül 4 — "Kendi Bilgi Tabanını Kur"',
    section: 'TEMELLER VE ASİSTANLAR',
    sectionShort: 'BÖLÜM 1',
    color: C.acc,
    hours: 6,
    intro: 'NotebookLM Uzmanlık Döngüsü ile kendi PDF\'lerinden, web içeriklerinden ve YouTube\'dan kişisel bilgi tabanı oluştur. Türkçe podcast üretimi.',
    topics: [
      'NotebookLM nedir, neden devrimsel — RAG\'ın halka açılmış hâli',
      'Uzmanlık Döngüsü: Kaynak Topla → Sorgula → Değer Yarat',
      'Kaynak türleri: PDF, Google Docs, web URL, YouTube, Markdown',
      'Audio Overview ile Türkçe podcast üretimi',
      'Mind Map, Briefing Doc, Study Guide, Timeline çıktıları',
      'NotebookLM Plus özellikleri: paylaşım, analitik',
      'Alternatifler: Google AI Studio, Claude Projects, ChatGPT Knowledge',
      'Akademik, eğitim ve iş uygulamaları',
    ],
    libraries: ['NotebookLM', 'Google AI Studio', 'Claude Projects'],
    notebooks: [
      { name: 'hafta04_notebooklm_kurulum_rehber.ipynb', desc: 'NotebookLM\'e ilk adım — ekran görüntülü' },
      { name: 'hafta04_kendi_kitabini_konustur.ipynb', desc: '5 PDF, 20 soruluk doğruluk testi' },
      { name: 'hafta04_audio_overview_podcast.ipynb', desc: 'Türkçe podcast üretimi' },
      { name: 'hafta04_mind_map_studyguide.ipynb', desc: 'Mind Map ve Study Guide ile öğrenme' },
      { name: 'hafta04_alternatif_araclar_kiyas.ipynb', desc: 'NotebookLM vs Claude vs ChatGPT' },
    ],
    assignments: [
      'Kendi alanından 10 PDF/URL ile NotebookLM kur, 20 soruluk test',
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
      'Audio Overview, Türkçe destekli podcast üretiyor — eğitim materyali için altın değerinde.',
      'Mind Map çıktısı bir kitabı 5 dakikada görselleştirir.',
    ],
    quote: 'Bilgi, yapılandırılmadan değer üretmez.',
  },
  {
    id: 5, slug: '05',
    title: 'Görsel Üretim Atölyesi',
    subtitle: 'Modül 5 — "Hayalden Piksele"',
    section: 'İÇERİK ÜRETİM ATÖLYELERİ',
    sectionShort: 'BÖLÜM 2',
    color: C.sec,
    hours: 6,
    intro: 'DALL-E, Midjourney, Imagen, Flux ve Türkiye yapımı Nano Banana ile diffusion modelleri. Prompt yapısı, kontrol parametreleri, telif.',
    topics: [
      'Diffusion sezgisi: gürültüden anlam çıkarma',
      'Gemini Imagen 3 + Google AI Studio (ücretsiz)',
      'DALL-E 3 (ChatGPT içinde) ve Sora image',
      'Midjourney v6.1 + Niji (Discord ve Web)',
      'Ideogram 2.0 — en iyi metin yazımı',
      'Flux (Pro/Dev/Schnell) — açık kaynak en iyi',
      'Krea, Leonardo, Magnific (upscaler)',
      'Nano Banana — Türkiye yapımı',
      'Prompt yapısı: özne + ortam + ışık + stil + kamera + negatif',
      'Aspect ratio, seed, CFG, sampler, ControlNet, IP-Adapter',
      'Telif, watermark, C2PA, "AI etiketi" yasal durumu',
    ],
    libraries: ['Gemini Imagen', 'DALL-E 3', 'Midjourney', 'Ideogram', 'Flux', 'Nano Banana'],
    notebooks: [
      { name: 'hafta05_gorsel_arac_kiyasla.ipynb', desc: '5 araç × 5 prompt karşılaştırma posteri' },
      { name: 'hafta05_gemini_imagen_atolye.ipynb', desc: 'Google AI Studio ile ücretsiz görsel' },
      { name: 'hafta05_midjourney_atolye.ipynb', desc: 'Midjourney Discord + Web — adım adım' },
      { name: 'hafta05_flux_huggingface.ipynb', desc: 'Flux Schnell — HF Spaces ücretsiz' },
      { name: 'hafta05_nano_banana_uygulama.ipynb', desc: 'Nano Banana atölyesi' },
      { name: 'hafta05_kamera_acilari_atolye.ipynb', desc: 'Kamera açıları, ışık, stil prompt' },
    ],
    assignments: [
      'Aynı sahneyi 4 farklı modelde üret, kıyaslama posteri yap',
      'Kendi alanına özel 10\'lu görsel kütüphanesi (kapak, infografi, karakter)',
      'Tutarlı bir karakter yarat — 5 farklı poz, aynı yüz',
    ],
    resources: [
      { label: 'docs/Görsel üretim Rehberi.docx', url: 'docs/' },
      { label: 'docs/Kamera açıları.docx', url: 'docs/' },
      { label: 'docs/Nano Banana Uygulamaları.docx', url: 'docs/' },
      { label: 'Lexica Prompt Galerisi', url: 'lexica.art' },
    ],
    takeaways: [
      '6 öğeli prompt yapısı (özne+ortam+ışık+stil+kamera+negatif) her modelde işe yarar.',
      'Tutarlı karakter için seed sabitleme + IP-Adapter olmazsa olmaz.',
      'Telif ve C2PA etiketi — eğitim/ticari kullanımda yasal sınırı bil.',
    ],
    quote: 'Hayal gücü, doğru prompt ile pikselleşir.',
  },
  {
    id: 6, slug: '06',
    title: 'Ses, TTS ve Müzik',
    subtitle: 'Modül 6 — "Sesi Yarat, Sesi Anla"',
    section: 'İÇERİK ÜRETİM ATÖLYELERİ',
    sectionShort: 'BÖLÜM 2',
    color: C.sec,
    hours: 6,
    intro: 'ElevenLabs Türkçe, OpenAI TTS, Whisper STT, Suno müzik. Voice cloning etiği, NotebookLM Audio Overview, lip sync avatar.',
    topics: [
      'TTS evrimi: robotik sesten doğal sese',
      'ElevenLabs Multilingual v2 — Türkçe ses, klonlama',
      'OpenAI TTS (gpt-4o-tts) ve Gemini TTS',
      'Azure Speech ve Google Cloud TTS (kurumsal)',
      'NotebookLM Audio Overview — Türkçe podcast',
      'Whisper (STT): video → transkript → SRT altyazı',
      'Müzik üretimi: Suno v4, Udio, Riffusion',
      'Voice cloning etiği: onay protokolü, KVKK',
      'Lip sync: HeyGen, D-ID, Hedra konuşan avatar',
    ],
    libraries: ['ElevenLabs', 'OpenAI TTS', 'Whisper', 'Suno', 'NotebookLM'],
    notebooks: [
      { name: 'hafta06_tts_arac_kiyasla.ipynb', desc: 'Aynı metin × 5 farklı TTS aracı' },
      { name: 'hafta06_elevenlabs_atolye.ipynb', desc: 'Ses klonlama + Türkçe örnek' },
      { name: 'hafta06_whisper_transkript.ipynb', desc: 'Kendi videondan altyazı (Whisper Colab)' },
      { name: 'hafta06_suno_egitim_jingle.ipynb', desc: 'Suno ile sınıf jingle\'ı' },
      { name: 'hafta06_voice_clone_etik.ipynb', desc: 'Voice cloning onay protokolü atölyesi' },
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
      'Whisper free + open-source; uzun videolarda %95+ doğruluk Türkçede.',
      'Voice cloning yasal yükümlülük getirir — onay protokolü olmadan klonlama yapma.',
    ],
    quote: 'Ses, anlamın taşıyıcısıdır.',
  },
  {
    id: 7, slug: '07',
    title: 'Video, Avatar ve Animasyon',
    subtitle: 'Modül 7 — "Hareketli Görüntünün Çağı"',
    section: 'İÇERİK ÜRETİM ATÖLYELERİ',
    sectionShort: 'BÖLÜM 2',
    color: C.sec,
    hours: 6,
    intro: 'Sora, Veo, Kling, Runway, HeyGen. Multimodal Gemini ile uzun video özetleme. Senaryodan videoya uçtan uca pipeline.',
    topics: [
      'Sora 2 (OpenAI) — text-to-video, image-to-video',
      'Veo 3 (Google) — Gemini Studio ücretsiz katman',
      'Kling, Runway Gen-3, Luma, Pika 2.0, Hailuo',
      'Wan 2.2 (Alibaba açık kaynak) — lokal',
      'Avatar: HeyGen (Türkçe), Synthesia, D-ID',
      'Animasyon: Animate Diff, LeiaPix, Genmo',
      'Video editleme YZ: Descript, CapCut AI, Captions',
      'Multimodal Gemini: uzun videodan özet, soru-cevap',
      'Pipeline: senaryo → görsel → ses → video → edit',
    ],
    libraries: ['Sora', 'Veo', 'Runway', 'HeyGen', 'CapCut AI', 'Wan 2.2'],
    notebooks: [
      { name: 'hafta07_video_arac_kiyasla.ipynb', desc: '5 video aracını aynı promptla' },
      { name: 'hafta07_veo_gemini_studio.ipynb', desc: 'Veo 3 ile ilk video' },
      { name: 'hafta07_heygen_egitim_avatari.ipynb', desc: 'Türkçe konuşan avatar' },
      { name: 'hafta07_uzun_video_ozetle.ipynb', desc: 'Gemini ile 1 saatlik dersi 5 paragrafa' },
      { name: 'hafta07_uctan_uca_pipeline.ipynb', desc: 'Senaryodan videoya tek başına' },
    ],
    assignments: [
      'Bir ders konusu için 60 saniyelik tanıtım videosu (uçtan uca)',
      'Tarihi/edebi karakteri canlandıran 3 dk avatar dersi',
      '30 dk öğrenci sunumunu izleyip otomatik geri bildirim raporu',
    ],
    resources: [
      { label: 'docs/Komuttan Ürüne Üretken YZ.mp4', url: 'docs/' },
      { label: 'Google AI Studio — Veo', url: 'aistudio.google.com' },
      { label: 'HeyGen', url: 'heygen.com' },
    ],
    takeaways: [
      'Senaryo + görsel + ses + video bağımsız üretilip CapCut\'ta birleştirilir — pipeline mantığı.',
      'HeyGen, Türkçe avatar için en olgun seçenek; eğitim videolarında öğretmen-süreklilik sağlar.',
      'Multimodal Gemini, 1 saatlik videoyu okuyabilir — ders değerlendirmede güçlü.',
    ],
    quote: 'Hikâye akıyorsa, ürün hazır demektir.',
  },
  {
    id: 8, slug: '08',
    title: 'Yazı, Sunum, Doküman, Ofis',
    subtitle: 'Modül 8 — "Yazıdan Sunuma, Tablodan Rapora"',
    section: 'İÇERİK ÜRETİM ATÖLYELERİ',
    sectionShort: 'BÖLÜM 2',
    color: C.sec,
    hours: 6,
    intro: 'Gamma, Tome, Canva AI ile sunum. Microsoft Copilot 365, Gemini Workspace ile doküman/tablo. PDF asistanları, e-posta ve toplantı otomasyonu.',
    topics: [
      'Yazma: Notion AI, Grammarly, DeepL Write (Türkçe), Quillbot',
      'Sunum: Gamma, Tome, Beautiful AI, Canva Magic Design',
      'Doküman & Tablo: Copilot 365, Gemini Workspace, Excel AI',
      'PDF asistanları: ChatPDF, AskYourPDF, Humata',
      'Adobe Firefly: Express, Photoshop, Illustrator',
      'Tasarım: Figma AI, Framer AI, Uizard',
      'E-posta otomasyonu: Superhuman, Shortwave',
      'Toplantı asistanı: Otter, Fireflies, tldv, Zoom AI',
      'Türkçe ipuçları: dil tonu, resmi yazışma, KVKK',
    ],
    libraries: ['Gamma', 'Canva AI', 'Microsoft Copilot', 'Gemini Workspace', 'ChatPDF', 'Otter'],
    notebooks: [
      { name: 'hafta08_gamma_sunum_atolye.ipynb', desc: 'Gamma ile 20 slaytlık sunum' },
      { name: 'hafta08_copilot_excel_otomasyon.ipynb', desc: 'Excel formül + grafik' },
      { name: 'hafta08_canva_magic_design.ipynb', desc: 'Pazarlama görselleri' },
      { name: 'hafta08_chatpdf_arastirma.ipynb', desc: 'ChatPDF araştırma akışı' },
      { name: 'hafta08_toplanti_asistani.ipynb', desc: 'Otter / tldv kıyas' },
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
      'Gamma, sunum üretimini 30 dakikadan 5 dakikaya indirir.',
      'Copilot 365 + Excel — finans/yönetim için tablo otomasyonu sıçraması.',
      'Toplantı asistanı, herkesin "ekstra üyesi" — özet + aksiyonlar otomatik.',
    ],
    quote: 'İyi yazı, iyi düşüncenin görünür hâlidir.',
  },
  {
    id: 9, slug: '09',
    title: 'Otomasyon ve İş Akışları',
    subtitle: 'Modül 9 — "Sıkıcı İşi YZ Yapsın"',
    section: 'İÇERİK ÜRETİM ATÖLYELERİ',
    sectionShort: 'BÖLÜM 2',
    color: C.sec,
    hours: 6,
    intro: 'Zapier, Make, n8n ile no-code otomasyon. AI node\'ları ile zincir. Telegram bot, Notion AI, VPS\'te self-hosted n8n kurulum.',
    topics: [
      'Otomasyon platformları: Zapier, Make, n8n',
      'AI node\'ları: OpenAI, Gemini, Anthropic, ElevenLabs',
      'Tetikleyiciler: e-posta, form, takvim, webhook, Telegram, RSS',
      'Senaryo: "Yeni ders kaydı → transkript + özet → Drive + Slack"',
      'Telegram bot otomasyonu — kişisel asistan',
      'Make Scenarios + AI ile sıfırdan akış',
      'Notion AI + Database otomasyonları',
      'n8n self-hosted — Docker / VPS kurulum',
      'Maliyet, hata yönetimi, gizlilik',
    ],
    libraries: ['Zapier', 'Make', 'n8n', 'Notion AI'],
    notebooks: [
      { name: 'hafta09_zapier_ilk_zap.ipynb', desc: 'İlk Zap — Gmail → Sheets + GPT' },
      { name: 'hafta09_make_senaryo.ipynb', desc: 'Make: RSS → ChatGPT → Telegram' },
      { name: 'hafta09_n8n_kurulum.ipynb', desc: 'n8n Docker kurulum' },
      { name: 'hafta09_telegram_bot_otomasyon.ipynb', desc: 'Günlük brifing botu (n8n + Gemini)' },
      { name: 'hafta09_notion_database_ai.ipynb', desc: 'Notion AI Database otomasyonu' },
    ],
    assignments: [
      'Kendi günlük rutinini otomatize eden 1 Zap + 1 Make senaryosu',
      'n8n ile haftalık özet rapor (RSS + Gmail → AI → Telegram)',
      'Notion\'da AI destekli kişisel CRM/proje paneli',
    ],
    resources: [
      { label: 'Zapier — Learn AI', url: 'zapier.com/learn/ai' },
      { label: 'Make Help Center', url: 'make.com/en/help' },
      { label: 'n8n Docs', url: 'docs.n8n.io' },
    ],
    takeaways: [
      'Tekrarlayan iş = otomatik iş. n8n + Gemini ile haftada 5+ saat kazanılır.',
      'Telegram bot, "kişisel asistan"ın en hızlı kanalı; webhook ile her şey bağlanır.',
      'Self-hosted n8n (VPS), bulut maliyetini sıfıra indirir, gizliliği maxa çıkarır.',
    ],
    quote: 'En değerli zaman, başkasına devredilebilen zamandır.',
  },
  {
    id: 10, slug: '10',
    title: 'Eğitimciler İçin Üretken YZ',
    subtitle: 'Modül 10 — "Sınıfa, Atölyeye, Dersaneye"',
    section: 'MESLEĞE ÖZEL · LOKAL · API',
    sectionShort: 'BÖLÜM 3',
    color: C.pri,
    hours: 6,
    intro: 'MEB rehberi 45+ aracın disipliner uygulanması. MagicSchool, Khanmigo, Diffit, Curipod. Ders planı, ölçme-değerlendirme, akademik dürüstlük.',
    topics: [
      'MEB rehberi araçlarını disiplinde uygulama',
      'Türkçe: Ello, Edufy, Vocabulary.com, Quizlet',
      'Matematik: MathGPTPro, QANDA, Wolfram, SymboLab',
      'Fen: Science360, DIY Nano, Toca Lab',
      'İngilizce: TalkPal AI, Babbel AI, Preply',
      'Eğitim platformları: MagicSchool, Khanmigo, Diffit, Curipod',
      'Ders planı + etkinlik üretimi (Gemini Gems)',
      'Ölçme-değerlendirme: rubrik, soru bankası, otomatik puanlama',
      'Etkileşimli: Mentimeter AI, Kahoot AI, Quizizz AI',
      'Akademik dürüstlük: Turnitin AI, GPTZero, atıf protokolü',
      'Veli iletişimi ve idari yazışma otomasyonu',
    ],
    libraries: ['MagicSchool', 'Diffit', 'Curipod', 'Khanmigo', 'Kahoot AI', 'Quizizz AI'],
    notebooks: [
      { name: 'hafta10_meb_rehberi_disipliner_tarama.ipynb', desc: '45+ aracın disipliner haritası' },
      { name: 'hafta10_dersplani_5e_uretici.ipynb', desc: '5E modeline uygun ders planı' },
      { name: 'hafta10_soru_bankasi_yapilandirilmis.ipynb', desc: 'JSON çıktılı soru bankası' },
      { name: 'hafta10_rubrik_otomasyon.ipynb', desc: 'Otomatik rubrik üretimi' },
      { name: 'hafta10_kahoot_quizizz_ai.ipynb', desc: 'Kahoot AI + Quizizz AI' },
    ],
    assignments: [
      'Kendi branşına özel 10 araç testi + sınıfta deneme + rapor',
      '1 ünitelik (4 ders) plan + etkinlik + ölçme paketi',
      'Velilere YZ kullanımı bilgilendirme broşürü',
    ],
    resources: [
      { label: 'docs/MEB YZ Araçları Öğretmen El Kitabı', url: 'docs/' },
      { label: 'docs/Eğitici Eğitimi ÜYZ 4 gün', url: 'docs/' },
      { label: 'MagicSchool', url: 'magicschool.ai' },
    ],
    takeaways: [
      'MEB rehberi, Türk eğitimcisi için altın referans — 45+ aracı kendi branşına haritalandır.',
      'Ders planı + soru bankası + rubrik = 3 saatlik haftalık iş yarım saate iner.',
      'Akademik dürüstlük protokolü olmadan YZ sınıfa girmemeli — atıf kuralları başta belirlenir.',
    ],
    quote: 'En iyi öğretmen, öğrenmeye en açık olandır.',
  },
  {
    id: 11, slug: '11',
    title: 'Mesleğe Özel Atölyeler',
    subtitle: 'Modül 11 — "Araştırmadan Karara"',
    section: 'MESLEĞE ÖZEL · LOKAL · API',
    sectionShort: 'BÖLÜM 3',
    color: C.pri,
    hours: 6,
    intro: 'Akademisyen (Elicit, Consensus, ResearchRabbit), sağlık/hukuk/finans dikey araçları, yaratıcı/girişimci no-code (Lovable, Bolt.new) — 3 paralel parkur.',
    topics: [
      'AKADEMİK: NotebookLM ileri, Elicit, Consensus',
      'AKADEMİK: ResearchRabbit + Connected Papers',
      'AKADEMİK: SciSpace, Scite, Paperpal, Trinka',
      'AKADEMİK: Atıf yönetimi (Zotero AI, Mendeley AI)',
      'SAĞLIK: OpenEvidence, Doximity GPT — TTB etik',
      'HUKUK: Harvey AI, Lexis+ AI — Barolar uyumu',
      'FİNANS: Bloomberg GPT, FinChat — SPK uyumu',
      'YARATICI: Jasper, Copy.ai, SurferSEO, Frase',
      'GİRİŞİMCİ: Lovable, Bolt.new, Replit Agent (no-code uygulama)',
    ],
    libraries: ['Elicit', 'Consensus', 'ResearchRabbit', 'Lovable', 'Bolt.new', 'Harvey AI'],
    notebooks: [
      { name: 'hafta11A_akademik_arastirma.ipynb', desc: 'Elicit + Consensus + NotebookLM' },
      { name: 'hafta11B_dikey_alanlar.ipynb', desc: 'Sağlık / Hukuk / Finans atölyesi' },
      { name: 'hafta11C_pazarlama_girisimcilik.ipynb', desc: 'Pazarlama + SEO + içerik' },
      { name: 'hafta11_lovable_bolt_replit_atolye.ipynb', desc: 'No-code uygulama atölyesi' },
    ],
    assignments: [
      'Akademisyen: 1 makalelik mini sistematik review',
      'Hekim/Hukukçu: 1 vakalık dikey araç testi + etik raporu',
      'Yaratıcı/Girişimci: Lovable veya Bolt ile küçük landing page',
    ],
    resources: [
      { label: 'docs/akademik araçlar.docx', url: 'docs/' },
      { label: 'Elicit', url: 'elicit.com' },
      { label: 'Lovable', url: 'lovable.dev' },
      { label: 'Bolt.new', url: 'bolt.new' },
    ],
    takeaways: [
      'YZ \'genel asistan\' değil — branşına özel dikey araçlar, sektör verimliliğini patlatır.',
      'Akademide Elicit + Consensus, sistematik review süresini günlerden saatlere indirir.',
      'Lovable / Bolt.new ile fikrini 1 saatte canlı uygulamaya dönüştürebilirsin.',
    ],
    quote: 'Genel araç çok şey bilir, dikey araç bir şeyi mükemmel bilir.',
  },
  {
    id: 12, slug: '12',
    title: 'Lokal LLM Kurulumu',
    subtitle: 'Modül 12 — "Bulut Bağımlılığını Kır"',
    section: 'MESLEĞE ÖZEL · LOKAL · API',
    sectionShort: 'BÖLÜM 3',
    color: C.pri,
    hours: 6,
    intro: 'Ollama, LM Studio, Open WebUI, Jan, GPT4All. Türkçe modeller. Donanım eşiği, kuantizasyon (Q4_K_M, Q8), GPU ve MLX optimizasyon.',
    topics: [
      'Neden lokal LLM? Gizlilik, maliyet, internet bağımsızlığı, KVKK',
      'Donanım: GPU/CPU, RAM, kuantizasyon (Q4_K_M, Q8)',
      'Ollama — en kolay başlangıç (Mac/Win/Linux)',
      'LM Studio — GUI, model arama, sohbet',
      'Open WebUI (Docker) — çoklu kullanıcı arayüzü',
      'Jan — açık kaynak alternatif',
      'GPT4All — düşük donanımda',
      'Türkçe: llama3.2, qwen2.5, gemma2, Trendyol-LLM',
      'Hız optimizasyonu, GPU, MLX (Apple Silicon)',
      'Türkçe performans kıyaslaması',
    ],
    libraries: ['Ollama', 'LM Studio', 'Open WebUI', 'Jan', 'GPT4All'],
    notebooks: [
      { name: 'hafta12_ollama_kurulum_macwinlinux.ipynb', desc: '3 işletim sistemi adım adım' },
      { name: 'hafta12_ilk_konusma.ipynb', desc: 'ollama run + Python REST API' },
      { name: 'hafta12_lm_studio_atolye.ipynb', desc: 'GUI ile model deneme' },
      { name: 'hafta12_openwebui_docker.ipynb', desc: 'Docker kurulum (Mac + VPS)' },
      { name: 'hafta12_model_kiyaslama.ipynb', desc: 'Llama vs Qwen vs Gemma TR' },
    ],
    assignments: [
      'Ollama kurulumu + 3 modeli indir, 10 Türkçe görevde kıyas',
      'Open WebUI\'yi Docker ile kur, aile üyesine erişim ver',
      'Donanımına en uygun model + kuantizasyon raporu',
    ],
    resources: [
      { label: 'Ollama Library', url: 'ollama.com/library' },
      { label: 'LM Studio', url: 'lmstudio.ai' },
      { label: 'Open WebUI', url: 'github.com/open-webui' },
    ],
    takeaways: [
      'Lokal LLM = gizliliğin kazandığı an. Ollama 5 dakikada kurulur, çevrimdışı çalışır.',
      'Türkçe için Qwen 2.5 7B Q4 + Mac M1 Pro = pratik üretkenlik için yeterli.',
      'Open WebUI Docker, evdeki herkesin "ChatGPT\'sine" sıfır maliyetle dönüşür.',
    ],
    quote: 'Bulut, başkasının bilgisayarıdır — kendi bilgisayarın daha sadıktır.',
  },
  {
    id: 13, slug: '13',
    title: 'Lokal RAG ve Kendi Verinle Konuşma',
    subtitle: 'Modül 13 — "Kendi NotebookLM\'ini Kur"',
    section: 'MESLEĞE ÖZEL · LOKAL · API',
    sectionShort: 'BÖLÜM 3',
    color: C.pri,
    hours: 6,
    intro: 'AnythingLLM, Cherry Studio, Page Assist, GPT4All Local Docs, MSTY. Embedding modelleri, chunk stratejisi, Türkçe doğruluk.',
    topics: [
      'RAG nedir, neden lokal? (Hafta 4 NotebookLM ile bağ)',
      'AnythingLLM — çoklu workspace, herhangi LLM',
      'Cherry Studio — Türkçe destekli, çoklu API + Ollama',
      'Page Assist (browser) — web sayfası RAG',
      'GPT4All Local Docs — basit dosya indeksi',
      'MSTY — local + cloud hibrit',
      'Open WebUI Documents özelliği',
      'Embedding: nomic-embed, mxbai, multilingual-e5 (TR)',
      'Doküman türleri: PDF, DOCX, TXT, web URL, YouTube',
      'Chunk size, overlap, retrieval limit',
      'Gizlilik: tam lokal vs hibrit vs bulut',
    ],
    libraries: ['AnythingLLM', 'Cherry Studio', 'Page Assist', 'MSTY', 'Open WebUI'],
    notebooks: [
      { name: 'hafta13_anythingllm_kurulum.ipynb', desc: 'Workspace + ilk soru' },
      { name: 'hafta13_cherry_studio_turkce.ipynb', desc: 'Türkçe destekli kullanım' },
      { name: 'hafta13_page_assist_browser.ipynb', desc: 'Browser uzantısı atölyesi' },
      { name: 'hafta13_kendi_kitabini_konustur_lokal.ipynb', desc: '5 PDF tamamen offline RAG' },
      { name: 'hafta13_embedding_kiyas_tr.ipynb', desc: 'Türkçe embedding doğruluk testi' },
    ],
    assignments: [
      'AnythingLLM ile 20 PDF\'lik bilgi tabanı, NotebookLM ile kıyasla',
      'Cherry Studio + Ollama ile tam offline iş akışı',
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
      'Chunk size 512 + overlap 64 + parent retriever = pratik production formülü.',
    ],
    quote: 'Verin, senin kalır.',
  },
  {
    id: 14, slug: '14',
    title: 'API ile Üretken YZ + Capstone',
    subtitle: 'Modül 14 — Final · "Prompttan Ürüne"',
    section: 'MESLEĞE ÖZEL · LOKAL · API',
    sectionShort: 'BÖLÜM 3',
    color: C.pri,
    hours: 6,
    intro: 'Google AI Studio, OpenRouter, HF Spaces. Streamlit/Gradio şablon. v0 + Vercel ile no-code arayüz. Capstone proje sunum günü.',
    topics: [
      'API nedir? Anahtar saklama (.env, Colab Secrets)',
      'Google AI Studio — ücretsiz Gemini 2.5 Flash',
      'OpenRouter — tek API ile 100+ model',
      'Hugging Face Inference API — açık kaynak',
      'Replicate ve Fal.ai — görsel/video API\'ları',
      'Basit Python: pip install google-generativeai',
      'No-code API: Postman, Bruno, Apidog',
      'Streamlit/Gradio ile 30 satırda arayüz (kopyala-yapıştır)',
      'Hugging Face Spaces — sıfır kart deploy',
      'Vercel + v0 ile no-code arayüz + AI',
      'Maliyet izleme: OpenAI Dashboard, Anthropic Console',
      'Capstone proje sunumu, sertifika töreni',
    ],
    libraries: ['google-generativeai', 'streamlit', 'gradio', 'OpenRouter', 'HF Spaces', 'Vercel v0'],
    notebooks: [
      { name: 'hafta14_aistudio_ilk_api.ipynb', desc: 'Gemini 2.5 Flash hello world' },
      { name: 'hafta14_openrouter_uc_model.ipynb', desc: 'Gemini/Claude/GPT karşılaştırma' },
      { name: 'hafta14_streamlit_kisisel_asistan.ipynb', desc: '50 satır kişisel asistan' },
      { name: 'hafta14_hf_spaces_deploy.ipynb', desc: 'HF Spaces sıfır maliyet deploy' },
      { name: 'hafta14_v0_vercel_nocode.ipynb', desc: 'v0.dev ile no-code arayüz' },
      { name: 'hafta14_capstone_sablon.ipynb', desc: 'Capstone proje iskeleti' },
    ],
    assignments: [
      'CAPSTONE: Tüm dönemde öğrendiklerini birleştiren bir ürün üret (en az 3 madde dahil)',
      'Canlı deploy: HF Spaces, Vercel + v0 ya da Open WebUI',
      'README + mimari diyagram + 3 dakikalık demo videosu',
      'Sunum günü: 5 dk demo + 2 dk Q&A, sertifika töreni',
    ],
    resources: [
      { label: 'Google AI Studio', url: 'aistudio.google.com' },
      { label: 'OpenRouter Docs', url: 'openrouter.ai/docs' },
      { label: 'HF Spaces', url: 'huggingface.co/spaces' },
      { label: 'Vercel v0', url: 'v0.dev' },
    ],
    takeaways: [
      '14 hafta birikimini canlı deploy edilmiş bir ürüne dönüştürdün — bu CV\'nin yeni satırı.',
      'Gemini 2.5 Flash + Streamlit + HF Spaces = sıfır maliyetle ürünleştirme zinciri.',
      'Atölyenin sonu yolculuğun başlangıcı — kendi öğrenme döngüsünü kur, paylaşımı sürdür.',
    ],
    quote: 'En iyi prompt, ürünleşmiş olandır.',
  },
];

// ═══════════════════════════════════════════════════════════
// HER HAFTA İÇİN PPTX ÜRETEN ANA FONKSİYON
// ═══════════════════════════════════════════════════════════
function generateWeekPPTX(week, outputDir) {
  const pres = T.createPres(`Hafta ${week.id} — ${week.title}`, 'Dr. Murat Altun');
  const TOTAL = 16;

  // ─── Slayt 1: Kapak ───────────────────────────────────────
  const sCover = pres.addSlide();
  sCover.background = { color: C.pri };
  sCover.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.acc } });
  sCover.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: 0, w: 3.5, h: 5.625, fill: { color: '4A2518' } });
  sCover.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: 0, w: 0.05, h: 5.625, fill: { color: C.sec } });
  sCover.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.6, w: 3.0, h: 0.34, fill: { color: C.acc } });
  sCover.addText('ÜRETKEN YZ ATÖLYESİ', { x: 0.5, y: 0.6, w: 3.0, h: 0.34, fontFace: 'Calibri', fontSize: 10, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', charSpacing: 3 });
  sCover.addText(week.title, { x: 0.5, y: 1.2, w: 5.6, h: 1.6, fontFace: 'Georgia', fontSize: 42, bold: true, color: 'FFFFFF' });
  sCover.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.85, w: 3.0, h: 0.05, fill: { color: C.sec } });
  sCover.addText(week.subtitle, { x: 0.5, y: 3.05, w: 5.6, h: 0.6, fontFace: 'Calibri', fontSize: 14, color: C.secLt, italic: true });
  sCover.addText(week.intro, { x: 0.5, y: 3.7, w: 5.6, h: 0.8, fontFace: 'Calibri', fontSize: 11, color: 'F5E8DC' });
  sCover.addText('Dr. Murat Altun', { x: 0.5, y: 4.65, w: 3, h: 0.32, fontFace: 'Georgia', fontSize: 13, color: C.sec, bold: true });
  sCover.addText('Üretken YZ Atölyesi · Prompttan Ürüne · 2026', { x: 0.5, y: 4.96, w: 5, h: 0.3, fontFace: 'Calibri', fontSize: 10, color: C.subtle });
  // Sağ panel istatistikler
  const stats = [
    { value: String(week.hours), label: 'Saat' },
    { value: String(week.notebooks.length), label: 'Atölye Notebook' },
    { value: String(week.assignments.length), label: 'Pratik Ödev' },
    { value: String(week.libraries.length), label: 'Araç Seti' },
  ];
  stats.forEach((r, i) => {
    const yy = 0.35 + i * 1.32;
    sCover.addText(r.value, { x: 6.7, y: yy, w: 3.1, h: 0.55, fontFace: 'Georgia', fontSize: 30, bold: true, color: C.sec, align: 'center' });
    sCover.addText(r.label, { x: 6.7, y: yy + 0.55, w: 3.1, h: 0.52, fontFace: 'Calibri', fontSize: 10, color: C.secLt, align: 'center' });
    if (i < stats.length - 1) sCover.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: yy + 1.15, w: 2.1, h: 0.02, fill: { color: '6B3A28' } });
  });

  // ─── Slayt 2: Hafta Özeti ─────────────────────────────────
  {
    const s = pres.addSlide();
    T.slideHeader(pres, s, 'Bu Haftada Ne Öğreneceğiz?', week.sectionShort, C.cream, TOTAL);
    T.addCard(pres, s, 0.5, 1.0, 9.0, 1.4, { topColor: week.color });
    T.cardTitle(s, 0.7, 1.15, 8.5, week.section, week.color);
    T.cardBody(s, 0.7, 1.55, 8.5, 0.8, week.intro);

    // 4 alt-başlık özet
    const segments = [
      { num: 1, title: 'Konseptler', desc: `${week.topics.length} ana konu, kavram haritası ve etkin örnekler.`, color: C.acc },
      { num: 2, title: 'Atölye Pratiği', desc: `${week.notebooks.length} adım-adım notebook ile uygulamalı çalışma.`, color: C.sec },
      { num: 3, title: 'Araç Seti', desc: `${week.libraries.length} farklı aracın derinlikli kullanımı.`, color: C.purple },
      { num: 4, title: 'Çıktı', desc: `${week.assignments.length} ödev ile somut, paylaşılabilir ürün.`, color: C.green },
    ];
    segments.forEach((sec, i) => {
      const x = 0.5 + (i % 2) * 4.75;
      const y = 2.7 + Math.floor(i / 2) * 1.15;
      T.addCard(pres, s, x, y, 4.25, 1.0, { leftColor: sec.color });
      T.numBadge(pres, s, x + 0.15, y + 0.32, sec.num, sec.color);
      T.cardTitle(s, x + 0.65, y + 0.15, 3.5, sec.title, sec.color);
      T.cardBody(s, x + 0.65, y + 0.5, 3.5, 0.45, sec.desc);
    });
  }

  // ─── Slaytlar 3-N: Konular (her 4 konuda 1 slayt) ─────────
  const TOPIC_PER_SLIDE = 4;
  const topicChunks = [];
  for (let i = 0; i < week.topics.length; i += TOPIC_PER_SLIDE) topicChunks.push(week.topics.slice(i, i + TOPIC_PER_SLIDE));
  topicChunks.forEach((chunk, idx) => {
    const s = pres.addSlide();
    T.slideHeader(pres, s, `Konular · ${idx + 1}/${topicChunks.length}`, week.sectionShort, C.cream, TOTAL);
    chunk.forEach((topic, i) => {
      const y = 1.0 + i * 0.95;
      T.addCard(pres, s, 0.5, y, 9.0, 0.78, { leftColor: week.color });
      T.numBadge(pres, s, 0.7, y + 0.21, idx * TOPIC_PER_SLIDE + i + 1, week.color);
      T.cardBody(s, 1.25, y + 0.18, 8.0, 0.5, topic, { size: 13 });
    });
  });

  // ─── Araç Seti ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    T.slideHeader(pres, s, 'Bu Haftanın Araç Seti', week.sectionShort, C.cream, TOTAL);
    const cols = 2, rows = Math.ceil(week.libraries.length / cols);
    week.libraries.forEach((lib, i) => {
      const x = 0.5 + (i % cols) * 4.75;
      const y = 1.0 + Math.floor(i / cols) * 0.85;
      T.addCard(pres, s, x, y, 4.25, 0.7, { leftColor: week.color });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.18, y: y + 0.15, w: 0.4, h: 0.4, fill: { color: week.color } });
      s.addText(String(i + 1), { x: x + 0.18, y: y + 0.15, w: 0.4, h: 0.4, fontFace: 'Calibri', fontSize: 12, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
      s.addText(lib, { x: x + 0.7, y: y + 0.18, w: 3.4, h: 0.4, fontFace: 'Calibri', fontSize: 13, bold: true, color: C.dark, valign: 'middle' });
    });
    T.cardBody(s, 0.5, 4.7, 9.0, 0.5,
      'Tüm araçların ücretsiz katmanı atölyede gösterilir. Premium gerekmez.',
      { size: 10, color: C.subtle, italic: true });
  }

  // ─── Atölye Notebook'ları ─────────────────────────────────
  {
    const s = pres.addSlide();
    T.slideHeader(pres, s, 'Atölye Notebook\'ları', week.sectionShort, C.cream, TOTAL);
    week.notebooks.forEach((nb, i) => {
      const y = 1.0 + i * 0.78;
      if (y + 0.65 > 5.4) return; // sığmazsa atla
      T.addCard(pres, s, 0.5, y, 9.0, 0.65, { leftColor: C.acc });
      s.addText(`📓 ${nb.name}`, { x: 0.7, y: y + 0.1, w: 4.0, h: 0.3, fontFace: 'Consolas', fontSize: 10, color: C.acc, bold: true });
      s.addText(nb.desc, { x: 4.8, y: y + 0.13, w: 4.5, h: 0.4, fontFace: 'Calibri', fontSize: 10.5, color: C.dark, valign: 'middle' });
    });
  }

  // ─── Ödevler ──────────────────────────────────────────────
  {
    const s = pres.addSlide();
    T.slideHeader(pres, s, 'Pratik Ödevler', week.sectionShort, C.cream, TOTAL);
    week.assignments.forEach((a, i) => {
      const y = 1.0 + i * 1.05;
      T.addCard(pres, s, 0.5, y, 9.0, 0.92, { leftColor: C.sec, bg: C.warmBg });
      T.numBadge(pres, s, 0.7, y + 0.28, i + 1, C.sec);
      T.cardBody(s, 1.25, y + 0.18, 8.0, 0.65, a, { size: 12 });
    });
    T.cardBody(s, 0.5, 4.85, 9.0, 0.4,
      'Her ödev kişisel öğrenme defterine kaydedilir, capstone projesinde tekrar kullanılır.',
      { size: 9.5, color: C.subtle, italic: true });
  }

  // ─── Kaynaklar ────────────────────────────────────────────
  {
    const s = pres.addSlide();
    T.slideHeader(pres, s, 'Kaynaklar ve Referanslar', week.sectionShort, C.cream, TOTAL);
    week.resources.forEach((r, i) => {
      const y = 1.0 + i * 0.85;
      T.addCard(pres, s, 0.5, y, 9.0, 0.72, { leftColor: C.purple });
      s.addText('🔗', { x: 0.7, y: y + 0.18, w: 0.4, h: 0.4, fontFace: 'Calibri', fontSize: 16, valign: 'middle' });
      s.addText(r.label, { x: 1.2, y: y + 0.1, w: 7.8, h: 0.3, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.dark });
      s.addText(r.url, { x: 1.2, y: y + 0.4, w: 7.8, h: 0.25, fontFace: 'Consolas', fontSize: 9, color: C.subtle });
    });
  }

  // ─── Kapanış ──────────────────────────────────────────────
  T.addClosingSlide(pres, `Hafta ${week.id} · ${week.title}`,
    week.takeaways.map(t => ({ text: t, color: week.color })),
    week.quote,
    'Dr. Murat Altun');

  // ─── Yaz ──────────────────────────────────────────────────
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
// MAIN — 14 HAFTA İÇİN ÜRET
// ═══════════════════════════════════════════════════════════
async function main() {
  const outputDir = path.join(__dirname, 'sunumlar');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  console.log(`\n🎨 Üretken YZ Atölyesi · 14 hafta PPTX üretiliyor → ${outputDir}\n`);
  for (const week of WEEKS) {
    try {
      const fp = await generateWeekPPTX(week, outputDir);
      const size = (fs.statSync(fp).size / 1024).toFixed(0);
      console.log(`  ✓ Hafta ${String(week.id).padStart(2)} · ${path.basename(fp)} (${size} KB)`);
    } catch (e) {
      console.error(`  ✗ Hafta ${week.id} HATA:`, e.message);
    }
  }
  console.log(`\n✅ ${WEEKS.length} PPTX üretildi.\n`);
}

main();
