/**
 * Hafta 14 — Generative AI, LLM ve Prompt Mühendisliği
 * =====================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 14: Generative AI ve Prompt Mühendisliği");
const TOTAL = 20;

// Kısa yardımcılar
const hdr = (s, title, sec) => T.slideHeader(pres, s, title, sec, null, TOTAL);
const card = (s, x, y, w, h, o) => T.addCard(pres, s, x, y, w, h, o);
const badge = (s, x, y, n, c) => T.numBadge(pres, s, x, y, n, c);
const stat = (s, x, y, w, h, v, l, c) => T.statBox(pres, s, x, y, w, h, v, l, c);
const code = (s, x, y, w, h, lines) => T.addCodeBlock(pres, s, x, y, w, h, lines);


// ═══════════════════════════════════════════════════════════
// SLAYT 1 — KAPAK
// ═══════════════════════════════════════════════════════════
T.addCoverSlide(pres,
  "Generative AI\nve Prompt\nMühendisliği",
  "Hafta 14 · Modül 14\nBüyük Dil Modelleri, Prompt Teknikleri ve RAG",
  "Dr. Murat Altun",
  [
    { value: "6",  label: "Saat" },
    { value: "4",  label: "Notebook" },
    { value: "\u221e", label: "Olasılık" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "\u0130\u00e7indekiler", null);

  const sections = [
    { num: "01", title: "LLM Temelleri",       items: "Transformer \u00b7 Self-Attention \u00b7 GPT \u00b7 Gemini \u00b7 Claude", color: C.sec,    slides: "Slayt 3\u20135" },
    { num: "02", title: "Prompt Engineering",   items: "Zero/Few-shot \u00b7 Chain-of-Thought \u00b7 Sistem Prompt\u2019u \u00b7 Persona", color: C.acc,    slides: "Slayt 6\u20139" },
    { num: "03", title: "Gemini API",           items: "google-generativeai \u00b7 JSON \u00e7\u0131kt\u0131 \u00b7 Chatbot \u00b7 Blog Yazan", color: C.amber,  slides: "Slayt 10\u201314" },
    { num: "04", title: "RAG Giri\u015f",       items: "Embedding \u00b7 Vekt\u00f6r DB \u00b7 ChromaDB \u00b7 Basit RAG Sistemi", color: C.purple, slides: "Slayt 15\u201320" },
  ];

  sections.forEach((sec, i) => {
    const y = 1.05 + i * 1.1;
    card(s, 0.5, y, 9.0, 0.92, { leftColor: sec.color });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.56, y: y + 0.15, w: 0.7, h: 0.6, fill: { color: sec.color } });
    s.addText(sec.num, { x: 0.56, y: y + 0.15, w: 0.7, h: 0.6, margin: 0, fontFace: "Georgia", fontSize: 20, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(sec.title, { x: 1.4, y: y + 0.1, w: 5, h: 0.42, margin: 0, fontFace: "Georgia", fontSize: 15, bold: true, color: C.dark });
    s.addText(sec.items, { x: 1.4, y: y + 0.52, w: 5, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid });
    s.addText(sec.slides, { x: 7.8, y: y + 0.24, w: 1.5, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10, color: sec.color, bold: true, align: "right" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 3 — BÜYÜK DİL MODELLERİ (LLM)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "B\u00fcy\u00fck Dil Modelleri (LLM)", "B\u00d6L\u00dcM 1");

  // Açıklama kartı
  card(s, 0.4, 0.95, 5.5, 1.6, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 5.1, "LLM Nedir?", C.sec);
  T.cardBody(s, 0.6, 1.45, 5.1, 0.95,
    "Milyarlarca parametreyle e\u011fitilmi\u015f, insan benzeri metin \u00fcreten devasa sinir a\u011flar\u0131. Dil\u2019i anlayan, \u00e7eviren, \u00f6zetleyen ve yeni i\u00e7erik \u00fcreten yap\u0131lar."
  );

  // Stat boxlar — parametre sayıları
  stat(s, 0.4, 2.8, 2.0, 1.3, "175B",  "GPT-3\nParametre", C.blue);
  stat(s, 2.6, 2.8, 2.0, 1.3, "1.8T",  "GPT-4\nParametre (tahmin)", C.sec);
  stat(s, 4.8, 2.8, 2.0, 1.3, "2T+",   "Gemini Ultra\nParametre", C.amber);

  // Sağ panel — Model kartları
  const models = [
    { name: "GPT (OpenAI)",    desc: "ChatGPT\u2019in arkas\u0131ndaki model ailesi", color: C.green },
    { name: "Gemini (Google)", desc: "Multimodal: metin + g\u00f6r\u00fcnt\u00fc + kod", color: C.blue },
    { name: "Claude (Anthropic)", desc: "G\u00fcvenli, anayasal AI yakla\u015f\u0131m\u0131", color: C.purple },
    { name: "LLaMA (Meta)",    desc: "A\u00e7\u0131k kaynak, topluluk odakl\u0131", color: C.red },
  ];
  models.forEach((m, i) => {
    const y = 0.95 + i * 0.8;
    card(s, 6.2, y, 3.5, 0.7, { leftColor: m.color });
    s.addText(m.name, { x: 6.4, y: y + 0.05, w: 3.1, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark });
    s.addText(m.desc, { x: 6.4, y: y + 0.36, w: 3.1, h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid });
  });

  // Alt bilgi kutusu
  card(s, 0.4, 4.3, 9.3, 0.8, { topColor: C.acc });
  T.cardBody(s, 0.6, 4.5, 8.9, 0.5,
    "\u0130pucu: Parametre say\u0131s\u0131 = modelin \u00f6\u011frenme kapasitesi. Daha fazla parametre \u2260 her zaman daha iyi sonu\u00e7. Verimlilik (efficiency) de \u00f6nemli!",
    { size: 10, color: C.acc }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — TRANSFORMER MİMARİSİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Transformer Mimarisi", "B\u00d6L\u00dcM 1");

  // Sol: Açıklama
  card(s, 0.4, 0.95, 4.4, 2.2, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.05, 4.0, "\"Attention Is All You Need\" (2017)", C.acc);
  T.cardBody(s, 0.6, 1.45, 4.0, 1.55,
    "Google\u2019\u0131n \u00e7\u0131\u011f\u0131r a\u00e7an makalesi. RNN/LSTM\u2019nin s\u0131ral\u0131 i\u015fleme sorununu \u00e7\u00f6zd\u00fc. T\u00fcm kelimeleri ayn\u0131 anda i\u015fleyerek paralel e\u011fitim m\u00fcmk\u00fcn k\u0131ld\u0131.\n\nTemel fikir: Her kelime, c\u00fcmledeki di\u011fer t\u00fcm kelimelere \"bakarak\" ba\u011flam\u0131n\u0131 anlar."
  );

  // Sağ: Mimari bileşenler — dikey kartlar
  const parts = [
    { title: "Encoder", desc: "Girdi metnini anlaml\u0131 vekt\u00f6rlere d\u00f6n\u00fc\u015ft\u00fcr\u00fcr", icon: "E", color: C.blue },
    { title: "Decoder", desc: "\u00c7\u0131kt\u0131 metnini token token \u00fcretir", icon: "D", color: C.sec },
    { title: "Attention", desc: "Kelimeler aras\u0131 ili\u015fkileri \u00f6\u011frenir", icon: "A", color: C.acc },
  ];
  parts.forEach((p, i) => {
    const y = 0.95 + i * 1.1;
    card(s, 5.1, y, 4.6, 0.95, { topColor: p.color });
    s.addShape(pres.shapes.OVAL, { x: 5.25, y: y + 0.25, w: 0.5, h: 0.5, fill: { color: p.color } });
    s.addText(p.icon, { x: 5.25, y: y + 0.25, w: 0.5, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(p.title, { x: 5.9, y: y + 0.18, w: 3.5, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: C.dark });
    s.addText(p.desc, { x: 5.9, y: y + 0.52, w: 3.5, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid });
  });

  // Alt: Karşılaştırma tablosu
  card(s, 0.4, 3.4, 9.3, 1.7);
  T.cardTitle(s, 0.6, 3.5, 8.9, "RNN vs Transformer Kar\u015f\u0131la\u015ft\u0131rmas\u0131", C.pri);
  const rows = [
    ["", "RNN / LSTM", "Transformer"],
    ["\u0130\u015fleme", "S\u0131ral\u0131 (yava\u015f)", "Paralel (h\u0131zl\u0131)"],
    ["Uzun ba\u011flam", "Unutma sorunu var", "Attention ile \u00e7\u00f6z\u00fcl\u00fcr"],
    ["E\u011fitim s\u00fcresi", "Uzun", "K\u0131sa (GPU paralelli\u011fi)"],
  ];
  rows.forEach((row, ri) => {
    const isHeader = ri === 0;
    const y = 3.88 + ri * 0.28;
    const bg = isHeader ? C.pri : (ri % 2 === 0 ? C.warmBg : C.card);
    const fc = isHeader ? "FFFFFF" : C.dark;
    row.forEach((cell, ci) => {
      const x = 0.6 + ci * 3.0;
      s.addText(cell, { x, y, w: 2.9, h: 0.28, margin: [0,4,0,4], fontFace: "Calibri", fontSize: 9.5, bold: isHeader, color: fc, fill: { color: bg }, valign: "middle" });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — SELF-ATTENTION
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Self-Attention Mekanizmas\u0131", "B\u00d6L\u00dcM 1");

  // Ana açıklama kartı
  card(s, 0.4, 0.95, 9.3, 1.6, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 8.9, "Sorgu (Q) \u2014 Anahtar (K) \u2014 De\u011fer (V)", C.sec);
  T.cardBody(s, 0.6, 1.55, 8.9, 0.85,
    "Her kelime \u00fc\u00e7 vekt\u00f6re d\u00f6n\u00fc\u015ft\u00fcr\u00fcl\u00fcr: Sorgu (\"neyi ar\u0131yorum?\"), Anahtar (\"ben neyim?\"), De\u011fer (\"i\u00e7eri\u011fim ne?\"). Sorgu ile Anahtar \u00e7arp\u0131l\u0131r \u2192 attention skoru \u2192 De\u011ferler a\u011f\u0131rl\u0131kl\u0131 toplan\u0131r. B\u00f6ylece her kelime, hangi di\u011fer kelimelere \"dikkat etmesi\" gerekti\u011fini \u00f6\u011frenir."
  );

  // Formül kutusu
  card(s, 0.4, 2.75, 4.5, 1.1, { bg: C.codeBg });
  s.addText("Attention(Q, K, V) = softmax(QK\u1d40 / \u221ad\u2096) \u00d7 V", {
    x: 0.6, y: 2.85, w: 4.1, h: 0.4, margin: 0, fontFace: "Consolas", fontSize: 12, bold: true, color: C.codeYellow
  });
  s.addText("d\u2096 = anahtar boyutu (normalizasyon i\u00e7in)", {
    x: 0.6, y: 3.3, w: 4.1, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.codeWhite, italic: true
  });

  // Sağ: Multi-Head Attention açıklaması
  card(s, 5.2, 2.75, 4.5, 1.1, { leftColor: C.purple });
  T.cardTitle(s, 5.4, 2.85, 4.1, "Multi-Head Attention", C.purple);
  T.cardBody(s, 5.4, 3.22, 4.1, 0.5,
    "Birden fazla attention ba\u015f\u0131 paralel \u00e7al\u0131\u015f\u0131r. Her ba\u015f farkl\u0131 bir ili\u015fki t\u00fcr\u00fcn\u00fc (s\u00f6zdizimi, anlam, referans) \u00f6\u011frenir."
  );

  // Alt: Neden devrim?
  const reasons = [
    { title: "Paralel i\u015fleme", desc: "T\u00fcm kelimeler ayn\u0131 anda", color: C.green },
    { title: "Uzun mesafe", desc: "1000+ token ba\u011flam\u0131", color: C.blue },
    { title: "\u00d6l\u00e7eklenebilirlik", desc: "GPU\u2019larda verimli", color: C.amber },
    { title: "Transfer \u00f6\u011frenme", desc: "Pre-train + fine-tune", color: C.purple },
  ];
  reasons.forEach((r, i) => {
    const x = 0.4 + i * 2.38;
    card(s, x, 4.1, 2.2, 1.0, { topColor: r.color });
    s.addText(r.title, { x: x + 0.1, y: 4.25, w: 2.0, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: r.color });
    s.addText(r.desc, { x: x + 0.1, y: 4.58, w: 2.0, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — PROMPT ENGINEERING NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Prompt Engineering Nedir?", "B\u00d6L\u00dcM 2");

  // Tanım kartı
  card(s, 0.4, 0.95, 9.3, 1.2, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.1, 8.9, "Prompt = LLM\u2019e verilen talimat", C.acc);
  T.cardBody(s, 0.6, 1.5, 8.9, 0.5,
    "LLM\u2019lerden en iyi sonucu almak i\u00e7in talimatlar\u0131 (prompt\u2019lar\u0131) sistematik olarak tasarlama sanat\u0131 ve bilimi. K\u00fc\u00e7\u00fck de\u011fi\u015fiklikler \u00e7\u0131kt\u0131da dev farklar yaratabilir."
  );

  // İyi vs kötü prompt karşılaştırması
  card(s, 0.4, 2.35, 4.4, 2.8, { topColor: C.red });
  s.addText("\u2717  K\u00f6t\u00fc Prompt", { x: 0.6, y: 2.5, w: 4.0, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: C.red });
  const badPrompts = [
    "\"Python\u2019da bir \u015fey yaz\"",
    "\"Makine \u00f6\u011frenimi anlat\"",
    "\"Veri analizi yap\"",
  ];
  badPrompts.forEach((p, i) => {
    s.addText(p, { x: 0.6, y: 2.95 + i * 0.42, w: 4.0, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.mid, italic: true });
  });
  s.addText("Belirsiz, ba\u011flams\u0131z, format belirtilmemi\u015f", { x: 0.6, y: 4.25, w: 4.0, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.red });

  card(s, 5.3, 2.35, 4.4, 2.8, { topColor: C.green });
  s.addText("\u2713  \u0130yi Prompt", { x: 5.5, y: 2.5, w: 4.0, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: C.green });
  const goodPrompts = [
    "\"Python\u2019da Pandas ile CSV oku,\neksik verileri doldur, gruplama yap\"",
    "\"Lojistik regresyonu, 5 maddelik\nliste halinde, \u00f6rneklerle a\u00e7\u0131kla\"",
  ];
  goodPrompts.forEach((p, i) => {
    s.addText(p, { x: 5.5, y: 2.95 + i * 0.68, w: 4.0, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.mid, italic: true });
  });
  s.addText("Spesifik, ba\u011flaml\u0131, format ve \u00e7\u0131kt\u0131 belirli", { x: 5.5, y: 4.25, w: 4.0, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.green });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — ZERO-SHOT vs FEW-SHOT
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Zero-shot vs Few-shot Prompting", "B\u00d6L\u00dcM 2");

  // Zero-shot kart
  card(s, 0.4, 0.95, 4.4, 2.0, { topColor: C.blue });
  T.cardTitle(s, 0.6, 1.12, 4.0, "Zero-shot (S\u0131f\u0131r \u00d6rnek)", C.blue);
  T.cardBody(s, 0.6, 1.5, 4.0, 1.3,
    "Modele hi\u00e7 \u00f6rnek vermeden do\u011frudan soru sorma. Model, \u00f6nceden \u00f6\u011frendi\u011fi bilgilerle yan\u0131t \u00fcretir.\n\n\u00d6rnek: \"Bu yorum olumlu mu olumsuz mu?\nYorum: Harika bir \u00fcr\u00fcn!\""
  );

  // Few-shot kart
  card(s, 5.3, 0.95, 4.4, 2.0, { topColor: C.amber });
  T.cardTitle(s, 5.5, 1.12, 4.0, "Few-shot (Birka\u00e7 \u00d6rnek)", C.amber);
  T.cardBody(s, 5.5, 1.5, 4.0, 1.3,
    "Modele 2\u20135 \u00f6rnek g\u00f6stererek pattern \u00f6\u011fretme. Model, \u00f6r\u00fcnt\u00fcy\u00fc kavray\u0131p devam eder.\n\n\u00d6rnek: \"Harika! \u2192 Olumlu\nBerbat! \u2192 Olumsuz\nF\u0131rsat ka\u00e7maz! \u2192 ?\""
  );

  // Kod bloğu
  code(s, 0.4, 3.2, 9.3, 2.1, [
    { text: "# Few-shot Prompt Örneği",  options: { color: C.codeGreen, fontSize: 9 } },
    { text: "prompt = \"\"\"",              options: { color: C.codeWhite, fontSize: 9 } },
    { text: "Metin sınıflandırma yapıyorsun. Örnekler:",  options: { color: C.codeYellow, fontSize: 9 } },
    { text: "\"Çok beğendim\" → Olumlu",     options: { color: C.codeWhite, fontSize: 9 } },
    { text: "\"Kötü hizmet\" → Olumsuz",     options: { color: C.codeWhite, fontSize: 9 } },
    { text: "\"İdare eder\" → Nötr",          options: { color: C.codeWhite, fontSize: 9 } },
    { text: "",                               options: { color: C.codeWhite, fontSize: 9 } },
    { text: "Şimdi sınıflandır: \"Mükemmel kalite, teşekkürler!\" →", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "\"\"\"",                          options: { color: C.codeWhite, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — CHAIN-OF-THOUGHT
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Chain-of-Thought (CoT) Prompting", "B\u00d6L\u00dcM 2");

  // Üst açıklama
  card(s, 0.4, 0.95, 5.5, 1.6, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.05, 5.1, "Ad\u0131m Ad\u0131m D\u00fc\u015f\u00fcnme", C.acc);
  T.cardBody(s, 0.6, 1.45, 5.1, 0.95,
    "\"Ad\u0131m ad\u0131m d\u00fc\u015f\u00fcn\" ekledi\u011finizde model, cevaba atlamak yerine mant\u0131k zinciri kurar. Matematik, kodlama ve mant\u0131ksal \u00e7\u0131kar\u0131m g\u00f6revlerinde %40\u201370 do\u011fruluk art\u0131\u015f\u0131 sa\u011flar."
  );

  // Performans stat boxları
  stat(s, 6.2, 0.95, 1.7, 1.1, "+40%", "Matematik", C.green);
  stat(s, 8.0, 0.95, 1.7, 1.1, "+70%", "Mant\u0131k", C.blue);

  // Örnek prompt
  code(s, 0.4, 2.8, 9.3, 2.4, [
    { text: "# Chain-of-Thought Prompt Örneği",   options: { color: C.codeGreen, fontSize: 9 } },
    { text: "prompt = \"\"\"",                      options: { color: C.codeWhite, fontSize: 9 } },
    { text: "Soru: Bir mağazada 15 elma var. 8 tanesini sattılar,", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "sonra 12 tane daha geldi. Kaç elma kaldı?", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "",                                     options: { color: C.codeWhite, fontSize: 9 } },
    { text: "Adım adım düşünerek çöz:",           options: { color: C.codeGreen, fontSize: 9 } },
    { text: "1. Başlangıç: 15 elma",               options: { color: C.codeWhite, fontSize: 9 } },
    { text: "2. Satılan: 15 - 8 = 7 elma",         options: { color: C.codeWhite, fontSize: 9 } },
    { text: "3. Gelen: 7 + 12 = 19 elma",          options: { color: C.codeWhite, fontSize: 9 } },
    { text: "Cevap: 19 elma",                       options: { color: C.codeYellow, fontSize: 9 } },
    { text: "\"\"\"",                                options: { color: C.codeWhite, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — SİSTEM PROMPT'U VE PERSONA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Sistem Prompt\u2019u ve Persona", "B\u00d6L\u00dcM 2");

  // Sol: Açıklama
  card(s, 0.4, 0.95, 4.4, 1.8, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 4.0, "Sistem Prompt\u2019u Nedir?", C.sec);
  T.cardBody(s, 0.6, 1.45, 4.0, 1.15,
    "Chatbot\u2019un ki\u015fili\u011fini, davran\u0131\u015f kurallar\u0131n\u0131 ve s\u0131n\u0131rlar\u0131n\u0131 belirleyen gizli talimat. Kullan\u0131c\u0131 g\u00f6rmez ama her yan\u0131t\u0131 etkiler."
  );

  // Sağ: Persona örnekleri
  const personas = [
    { title: "Veri Bilimci Asistan", desc: "Teknik, \u00f6l\u00e7\u00fcml\u00fc, kod odakl\u0131", color: C.acc },
    { title: "T\u00fcrk\u00e7e \u00d6\u011fretmen", desc: "Sabrl\u0131, te\u015fvik edici, basit dil", color: C.green },
    { title: "SEO Uzman\u0131", desc: "Anahtar kelime odakl\u0131, pragmatik", color: C.amber },
  ];
  personas.forEach((p, i) => {
    const y = 0.95 + i * 0.62;
    card(s, 5.3, y, 4.4, 0.52, { leftColor: p.color });
    s.addText(p.title, { x: 5.5, y: y + 0.04, w: 2.4, h: 0.24, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark });
    s.addText(p.desc, { x: 5.5, y: y + 0.28, w: 4.0, h: 0.2, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid });
  });

  // Alt: Sistem prompt kodu
  code(s, 0.4, 3.0, 9.3, 2.2, [
    { text: "# Sistem Prompt Örneği",                options: { color: C.codeGreen, fontSize: 9 } },
    { text: "system_instruction = \"\"\"",             options: { color: C.codeBlue, fontSize: 9 } },
    { text: "Sen bir veri bilimi eğitmenisin.",        options: { color: C.codeYellow, fontSize: 9 } },
    { text: "Kuralların:",                             options: { color: C.codeYellow, fontSize: 9 } },
    { text: "1. Her açıklamaya bir Python örneği ekle", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "2. Türkçe yanıt ver",                     options: { color: C.codeWhite, fontSize: 9 } },
    { text: "3. Bilmediğin konularda 'bilmiyorum' de", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "4. Zararlı içerik üretme",                options: { color: C.codeWhite, fontSize: 9 } },
    { text: "\"\"\"",                                   options: { color: C.codeBlue, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — GOOGLE GEMİNİ API
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Google Gemini API", "B\u00d6L\u00dcM 3");

  // Üst: 3 adım kartı
  const steps = [
    { num: "1", title: "API Key Al", desc: "Google AI Studio\u2019dan\n\u00fccretsiz API anahtar\u0131", color: C.blue },
    { num: "2", title: "SDK Kur", desc: "pip install\ngoogle-generativeai", color: C.acc },
    { num: "3", title: "Kullan", desc: "genai.configure() +\nGenerativeModel()", color: C.green },
  ];
  steps.forEach((st, i) => {
    const x = 0.4 + i * 3.15;
    card(s, x, 0.95, 2.95, 1.6, { topColor: st.color });
    badge(s, x + 0.15, 1.15, st.num, st.color);
    s.addText(st.title, { x: x + 0.6, y: 1.12, w: 2.1, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: C.dark });
    s.addText(st.desc, { x: x + 0.15, y: 1.65, w: 2.6, h: 0.7, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid });
  });

  // Alt: Özellik stat boxları
  stat(s, 0.4, 2.8, 2.2, 1.2, "1M+", "Token\nKontext Penceresi", C.sec);
  stat(s, 2.8, 2.8, 2.2, 1.2, "\u00dccretsiz", "Ba\u015flang\u0131\u00e7\nKotas\u0131", C.green);
  stat(s, 5.2, 2.8, 2.2, 1.2, "Multi", "Metin+G\u00f6r\u00fcnt\u00fc\n+Kod+Ses", C.blue);
  stat(s, 7.6, 2.8, 2.2, 1.2, "2.5", "Flash/Pro\nModel Se\u00e7imi", C.amber);

  // Uyarı kutusu
  card(s, 0.4, 4.25, 9.3, 0.85, { leftColor: C.red });
  s.addText("\u26a0  G\u00dcVENL\u0130K", { x: 0.6, y: 4.3, w: 1.6, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.red });
  T.cardBody(s, 2.2, 4.3, 7.3, 0.7,
    "API key\u2019i ASLA frontend koduna (VITE_, NEXT_PUBLIC_) veya GitHub\u2019a eklemeyin! Supabase Edge Function veya backend .env dosyas\u0131nda saklay\u0131n.",
    { size: 10.5, color: C.dark }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — GEMİNİ API KODU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Gemini API \u2014 Temel Kullan\u0131m Kodu", "B\u00d6L\u00dcM 3");

  code(s, 0.4, 0.95, 9.3, 4.2, [
    { text: "# Gemini API — Temel Kullanım",           options: { color: C.codeGreen, fontSize: 10 } },
    { text: "import google.generativeai as genai",      options: { color: C.codeBlue, fontSize: 10 } },
    { text: "",                                          options: { color: C.codeWhite, fontSize: 10 } },
    { text: "# 1) API key yapılandır",                  options: { color: C.codeGreen, fontSize: 10 } },
    { text: "genai.configure(api_key=\"YOUR_API_KEY\")", options: { color: C.codeYellow, fontSize: 10 } },
    { text: "",                                          options: { color: C.codeWhite, fontSize: 10 } },
    { text: "# 2) Model seç",                           options: { color: C.codeGreen, fontSize: 10 } },
    { text: "model = genai.GenerativeModel(\"gemini-2.5-flash\")", options: { color: C.codeYellow, fontSize: 10 } },
    { text: "",                                          options: { color: C.codeWhite, fontSize: 10 } },
    { text: "# 3) İçerik üret",                         options: { color: C.codeGreen, fontSize: 10 } },
    { text: "response = model.generate_content(",        options: { color: C.codeWhite, fontSize: 10 } },
    { text: "    \"Python'da liste comprehension'ı açıkla\"", options: { color: C.codeYellow, fontSize: 10 } },
    { text: ")",                                         options: { color: C.codeWhite, fontSize: 10 } },
    { text: "",                                          options: { color: C.codeWhite, fontSize: 10 } },
    { text: "# 4) Sonucu yazdır",                       options: { color: C.codeGreen, fontSize: 10 } },
    { text: "print(response.text)",                      options: { color: C.codeGreen, fontSize: 10 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — YAPISAL ÇIKTI (JSON)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Yap\u0131sal \u00c7\u0131kt\u0131 \u2014 JSON \u00dcretme", "B\u00d6L\u00dcM 3");

  // Sol açıklama
  card(s, 0.4, 0.95, 4.2, 1.6, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.05, 3.8, "Neden Yap\u0131sal \u00c7\u0131kt\u0131?", C.acc);
  T.cardBody(s, 0.6, 1.45, 3.8, 0.95,
    "LLM\u2019den d\u00fcz metin yerine JSON, CSV veya tablo format\u0131nda \u00e7\u0131kt\u0131 almak, veriyi programatik olarak i\u015flemek i\u00e7in kritiktir. Gemini API\u2019da response_schema ile garanti edilir."
  );

  // Sağ: JSON örneği
  card(s, 4.8, 0.95, 4.9, 1.6, { bg: C.codeBg });
  s.addText([
    { text: "// Beklenen JSON çıktı\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "{\n", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "  \"konu\": \"Makine Öğrenimi\",\n", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "  \"özet\": \"Veriden öğrenen...\",\n", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "  \"seviye\": \"başlangıç\"\n", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "}", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
  ], { x: 5.0, y: 1.05, w: 4.5, h: 1.4 });

  // Alt: Kod bloğu
  code(s, 0.4, 2.8, 9.3, 2.4, [
    { text: "# JSON çıktı almak için prompt tasarımı",    options: { color: C.codeGreen, fontSize: 9 } },
    { text: "import json",                                 options: { color: C.codeBlue, fontSize: 9 } },
    { text: "",                                            options: { color: C.codeWhite, fontSize: 9 } },
    { text: "prompt = \"\"\"Aşağıdaki metni analiz et ve JSON döndür:", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "{\"duygu\": \"olumlu/olumsuz/nötr\", \"güven\": 0.0-1.0}", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "",                                            options: { color: C.codeWhite, fontSize: 9 } },
    { text: "Metin: 'Bu ürün gerçekten harika!'\"\"\"",   options: { color: C.codeYellow, fontSize: 9 } },
    { text: "",                                            options: { color: C.codeWhite, fontSize: 9 } },
    { text: "response = model.generate_content(prompt)",   options: { color: C.codeWhite, fontSize: 9 } },
    { text: "result = json.loads(response.text)",          options: { color: C.codeGreen, fontSize: 9 } },
    { text: "print(result[\"duygu\"])  # → olumlu",       options: { color: C.codeGreen, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — KİŞİSEL ASİSTAN CHATBOT
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ki\u015fisel Asistan Chatbot", "B\u00d6L\u00dcM 3");

  // Üst: Mimari açıklama
  card(s, 0.4, 0.95, 9.3, 1.1, { topColor: C.purple });
  T.cardTitle(s, 0.6, 1.1, 8.9, "Persona + System Instruction + \u00c7ok Turlu Konu\u015fma", C.purple);
  T.cardBody(s, 0.6, 1.5, 8.9, 0.4,
    "Chatbot\u2019a ki\u015filik verin, kural koyun, ge\u00e7mi\u015f mesajlar\u0131 hat\u0131rlas\u0131n. Gemini\u2019nin chat() metodu \u00e7ok turlu konu\u015fmay\u0131 otomatik y\u00f6netir."
  );

  // Kod bloğu
  code(s, 0.4, 2.25, 9.3, 3.0, [
    { text: "# Kişisel Asistan Chatbot",                   options: { color: C.codeGreen, fontSize: 9 } },
    { text: "import google.generativeai as genai",          options: { color: C.codeBlue, fontSize: 9 } },
    { text: "",                                              options: { color: C.codeWhite, fontSize: 9 } },
    { text: "genai.configure(api_key=API_KEY)",              options: { color: C.codeYellow, fontSize: 9 } },
    { text: "model = genai.GenerativeModel(",                options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    \"gemini-2.5-flash\",",                     options: { color: C.codeYellow, fontSize: 9 } },
    { text: "    system_instruction=\"Sen yardımcı bir veri bilimi asistanısın.\"", options: { color: C.codeYellow, fontSize: 9 } },
    { text: ")",                                              options: { color: C.codeWhite, fontSize: 9 } },
    { text: "",                                               options: { color: C.codeWhite, fontSize: 9 } },
    { text: "chat = model.start_chat(history=[])",            options: { color: C.codeGreen, fontSize: 9 } },
    { text: "",                                               options: { color: C.codeWhite, fontSize: 9 } },
    { text: "while True:",                                    options: { color: C.codeBlue, fontSize: 9 } },
    { text: "    user_input = input(\"Sen: \")",              options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    response = chat.send_message(user_input)",   options: { color: C.codeGreen, fontSize: 9 } },
    { text: "    print(f\"Asistan: {response.text}\")",       options: { color: C.codeGreen, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — BLOG YAZARI UYGULAMASI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Blog Yazar\u0131 Uygulamas\u0131", "B\u00d6L\u00dcM 3");

  // Sol: Prompt tasarımı açıklaması
  card(s, 0.4, 0.95, 4.4, 2.1, { leftColor: C.amber });
  T.cardTitle(s, 0.6, 1.05, 4.0, "SEO Uyumlu Blog \u00dcretimi", C.amber);
  T.cardBody(s, 0.6, 1.45, 4.0, 1.45,
    "LLM\u2019e detayl\u0131 talimat vererek otomatik blog yaz\u0131s\u0131 \u00fcrettirme:\n\n\u2022 Konu ve hedef kitle belirle\n\u2022 SEO anahtar kelimeleri listele\n\u2022 Ba\u015fl\u0131k, giri\u015f, geli\u015fme, sonu\u00e7 yap\u0131s\u0131\n\u2022 Meta description ve etiketler"
  );

  // Sağ: Akış adımları
  const flow = [
    { step: "Konu Girdisi",  desc: "\"Yapay zek\u00e2 e\u011fitimde\"", color: C.blue },
    { step: "Prompt \u015eablonu", desc: "SEO talimatlar\u0131 + format", color: C.acc },
    { step: "LLM \u00dcretimi",  desc: "Blog yaz\u0131s\u0131 + meta", color: C.sec },
    { step: "Son \u00c7\u0131kt\u0131",    desc: "HTML/Markdown blog", color: C.green },
  ];
  flow.forEach((f, i) => {
    const y = 0.95 + i * 0.7;
    card(s, 5.3, y, 4.4, 0.6, { leftColor: f.color });
    badge(s, 5.45, y + 0.12, i + 1, f.color);
    s.addText(f.step, { x: 5.95, y: y + 0.04, w: 2.2, h: 0.28, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark });
    s.addText(f.desc, { x: 5.95, y: y + 0.3, w: 3.5, h: 0.24, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid });
  });

  // Alt: Kod snippet
  code(s, 0.4, 3.3, 9.3, 1.9, [
    { text: "# Blog Yazarı Prompt Tasarımı",              options: { color: C.codeGreen, fontSize: 9 } },
    { text: "blog_prompt = f\"\"\"",                        options: { color: C.codeWhite, fontSize: 9 } },
    { text: "Konu: {konu} | Hedef Kitle: {hedef_kitle}",   options: { color: C.codeYellow, fontSize: 9 } },
    { text: "SEO Anahtar Kelimeler: {anahtar_kelimeler}",  options: { color: C.codeYellow, fontSize: 9 } },
    { text: "Görev: 800-1200 kelimelik, SEO uyumlu blog yaz.", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "Format: Markdown, H2/H3 başlıklar, meta description ekle.", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "\"\"\"",                                        options: { color: C.codeWhite, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — RAG NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "RAG Nedir? (Retrieval-Augmented Generation)", "B\u00d6L\u00dcM 4");

  // Ana açıklama
  card(s, 0.4, 0.95, 9.3, 1.5, { topColor: C.purple });
  T.cardTitle(s, 0.6, 1.12, 8.9, "Bilgi Taban\u0131 + LLM = Do\u011fru ve G\u00fcncel Yan\u0131tlar", C.purple);
  T.cardBody(s, 0.6, 1.52, 8.9, 0.75,
    "LLM\u2019ler e\u011fitim verisiyle s\u0131n\u0131rl\u0131d\u0131r ve \"hal\u00fcsinasyon\" yapabilir. RAG, \u00f6nce ilgili dok\u00fcmanlar\u0131 arar (Retrieval), sonra bu dok\u00fcmanlar\u0131 prompt\u2019a ekleyerek (Augmented) LLM\u2019in do\u011fru cevap \u00fcretmesini (Generation) sa\u011flar."
  );

  // RAG pipeline — 3 aşama kartları
  const stages = [
    { title: "1. Retrieval", desc: "Sorguyu vekt\u00f6r DB\u2019de ara, en benzer dok\u00fcmanlar\u0131 bul", icon: "\ud83d\udd0d", color: C.blue },
    { title: "2. Augmentation", desc: "Bulunan dok\u00fcmanlar\u0131 prompt\u2019a context olarak ekle", icon: "\u2795", color: C.acc },
    { title: "3. Generation", desc: "LLM, context + soru ile do\u011fru cevap \u00fcretir", icon: "\u2728", color: C.green },
  ];
  stages.forEach((st, i) => {
    const x = 0.4 + i * 3.15;
    card(s, x, 2.7, 2.95, 1.5, { topColor: st.color });
    s.addText(st.title, { x: x + 0.15, y: 2.88, w: 2.6, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: st.color });
    s.addText(st.desc, { x: x + 0.15, y: 3.3, w: 2.6, h: 0.75, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid });
  });

  // Alt: RAG vs Sade LLM karşılaştırma
  card(s, 0.4, 4.4, 4.4, 0.75, { leftColor: C.red });
  s.addText("Sade LLM", { x: 0.6, y: 4.45, w: 1.5, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.red });
  s.addText("Eski bilgi, hal\u00fcsinasyon riski y\u00fcksek", { x: 0.6, y: 4.73, w: 4.0, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid });

  card(s, 5.3, 4.4, 4.4, 0.75, { leftColor: C.green });
  s.addText("RAG + LLM", { x: 5.5, y: 4.45, w: 1.5, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.green });
  s.addText("G\u00fcncel, kaynak g\u00f6sterebilen, do\u011fru", { x: 5.5, y: 4.73, w: 4.0, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — EMBEDDING VE VEKTÖR DB
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Embedding ve Vekt\u00f6r Veritaban\u0131", "B\u00d6L\u00dcM 4");

  // Sol: Embedding açıklaması
  card(s, 0.4, 0.95, 4.4, 2.2, { leftColor: C.blue });
  T.cardTitle(s, 0.6, 1.05, 4.0, "Metin \u2192 Vekt\u00f6r D\u00f6n\u00fc\u015f\u00fcm\u00fc", C.blue);
  T.cardBody(s, 0.6, 1.45, 4.0, 1.55,
    "Her metin par\u00e7as\u0131, y\u00fczlerce boyutlu bir say\u0131 dizisine (vekt\u00f6r) d\u00f6n\u00fc\u015ft\u00fcr\u00fcl\u00fcr. Anlamca yak\u0131n metinlerin vekt\u00f6rleri de yak\u0131nd\u0131r.\n\n\"kral\" - \"erkek\" + \"kad\u0131n\" \u2248 \"krali\u00e7e\"\n\nBu ili\u015fkiler, cosine similarity ile \u00f6l\u00e7\u00fcl\u00fcr."
  );

  // Sağ: Vektör DB seçenekleri
  const dbs = [
    { name: "ChromaDB",  desc: "A\u00e7\u0131k kaynak, Python-native, kolay ba\u015flang\u0131\u00e7", color: C.green },
    { name: "Pinecone",  desc: "Bulut tabanl\u0131, y\u00f6netilen hizmet, \u00f6l\u00e7eklenebilir", color: C.blue },
    { name: "FAISS",     desc: "Meta\u2019n\u0131n k\u00fct\u00fcphanesi, \u00e7ok h\u0131zl\u0131, lokal", color: C.purple },
    { name: "Weaviate",  desc: "GraphQL API, hibrit arama", color: C.amber },
  ];
  dbs.forEach((d, i) => {
    const y = 0.95 + i * 0.56;
    card(s, 5.3, y, 4.4, 0.48, { leftColor: d.color });
    s.addText(d.name, { x: 5.5, y: y + 0.03, w: 1.6, h: 0.22, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: d.color });
    s.addText(d.desc, { x: 7.1, y: y + 0.03, w: 2.4, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid });
  });

  // Alt: Cosine similarity formülü
  card(s, 0.4, 3.4, 9.3, 1.7, { topColor: C.acc });
  T.cardTitle(s, 0.6, 3.55, 8.9, "Cosine Similarity \u2014 Benzerlik \u00d6l\u00e7\u00fcm\u00fc", C.acc);
  code(s, 0.6, 3.95, 8.9, 0.95, [
    { text: "from sklearn.metrics.pairwise import cosine_similarity", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "",                                                         options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# embedding1 ve embedding2: iki metnin vektör temsilleri", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "benzerlik = cosine_similarity([emb1], [emb2])  # 0.0 - 1.0", options: { color: C.codeYellow, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — BASİT RAG SİSTEMİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Basit RAG Sistemi \u2014 Kod \u00d6rne\u011fi", "B\u00d6L\u00dcM 4");

  code(s, 0.4, 0.95, 9.3, 4.2, [
    { text: "# Basit RAG Sistemi — ChromaDB + Gemini",          options: { color: C.codeGreen, fontSize: 9 } },
    { text: "import chromadb",                                    options: { color: C.codeBlue, fontSize: 9 } },
    { text: "import google.generativeai as genai",                options: { color: C.codeBlue, fontSize: 9 } },
    { text: "",                                                    options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# 1) Dokümanları yükle ve embedding oluştur",       options: { color: C.codeGreen, fontSize: 9 } },
    { text: "client = chromadb.Client()",                          options: { color: C.codeWhite, fontSize: 9 } },
    { text: "collection = client.create_collection(\"dersler\")",  options: { color: C.codeYellow, fontSize: 9 } },
    { text: "collection.add(",                                     options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    documents=[\"Pandas ile veri analizi...\", \"Scikit-learn ile ML...\"],", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "    ids=[\"doc1\", \"doc2\"]",                        options: { color: C.codeYellow, fontSize: 9 } },
    { text: ")",                                                    options: { color: C.codeWhite, fontSize: 9 } },
    { text: "",                                                     options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# 2) Kullanıcı sorusuyla en benzer dokümanı bul",    options: { color: C.codeGreen, fontSize: 9 } },
    { text: "results = collection.query(query_texts=[\"Veri nasıl analiz edilir?\"], n_results=2)", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "",                                                     options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# 3) Bulunan dokümanları prompt'a ekleyip LLM'e gönder", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "context = \"\\n\".join(results[\"documents\"][0])",   options: { color: C.codeWhite, fontSize: 9 } },
    { text: "prompt = f\"Bağlam: {context}\\n\\nSoru: Veri nasıl analiz edilir?\"", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "response = model.generate_content(prompt)",            options: { color: C.codeGreen, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 18 — HAFTALIK NOTEBOOK'LAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Haftal\u0131k Notebook\u2019lar", "B\u00d6L\u00dcM 4");

  const notebooks = [
    {
      title: "gemini_api.ipynb",
      desc: "Gemini API\u2019ye ba\u011flanma, metin \u00fcretme, parametre ayarlama (temperature, top_p)",
      color: C.blue,
      tags: "API \u00b7 SDK \u00b7 Temel"
    },
    {
      title: "kisisel_asistan.ipynb",
      desc: "\u00c7ok turlu chatbot olu\u015fturma, sistem prompt\u2019u, konu\u015fma haf\u0131zas\u0131",
      color: C.acc,
      tags: "Chat \u00b7 Persona \u00b7 Memory"
    },
    {
      title: "blog_yazari.ipynb",
      desc: "SEO uyumlu blog \u00fcretimi, prompt \u015fablonu, Markdown \u00e7\u0131kt\u0131, meta tag\u2019ler",
      color: C.amber,
      tags: "NLP \u00b7 SEO \u00b7 \u0130\u00e7erik"
    },
    {
      title: "rag_giris.ipynb",
      desc: "ChromaDB kurulumu, embedding olu\u015fturma, basit RAG pipeline, sorgulama",
      color: C.purple,
      tags: "RAG \u00b7 ChromaDB \u00b7 Vekt\u00f6r"
    },
  ];

  notebooks.forEach((nb, i) => {
    const isLeft = i % 2 === 0;
    const x = isLeft ? 0.4 : 5.1;
    const y = 0.95 + Math.floor(i / 2) * 2.1;
    card(s, x, y, 4.5, 1.85, { topColor: nb.color });
    // Notebook ikonu
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: y + 0.2, w: 0.5, h: 0.5, fill: { color: nb.color } });
    s.addText("NB", { x: x + 0.15, y: y + 0.2, w: 0.5, h: 0.5, margin: 0, fontFace: "Consolas", fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(nb.title, { x: x + 0.8, y: y + 0.18, w: 3.4, h: 0.35, margin: 0, fontFace: "Consolas", fontSize: 12, bold: true, color: C.dark });
    s.addText(nb.desc, { x: x + 0.15, y: y + 0.8, w: 4.1, h: 0.6, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid });
    // Tag'ler
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: y + 1.45, w: 3.5, h: 0.28, fill: { color: C.warmBg } });
    s.addText(nb.tags, { x: x + 0.25, y: y + 1.45, w: 3.3, h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 9, color: nb.color, bold: true });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "\u00d6dev ve Kaynaklar", "B\u00d6L\u00dcM 4");

  // Sol: Ödev
  card(s, 0.4, 0.95, 4.4, 3.6, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.12, 4.0, "\ud83c\udfaf Hafta 14 \u00d6devi", C.sec);

  const tasks = [
    { num: "1", text: "Gemini API ile ki\u015fisel chatbot olu\u015fturun (persona + 3 kural)", color: C.blue },
    { num: "2", text: "10 farkl\u0131 prompt tekni\u011fini kar\u015f\u0131la\u015ft\u0131r\u0131n (tablo format\u0131nda)", color: C.acc },
    { num: "3", text: "Basit RAG sistemi kurun: 5 dok\u00fcman + soru-cevap", color: C.purple },
  ];
  tasks.forEach((t, i) => {
    const y = 1.6 + i * 0.82;
    badge(s, 0.6, y + 0.08, t.num, t.color);
    s.addText(t.text, { x: 1.1, y, w: 3.5, h: 0.7, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark });
  });

  s.addText("Teslim: Jupyter Notebook (.ipynb) format\u0131nda", {
    x: 0.6, y: 4.0, w: 4.0, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.sec
  });

  // Sağ: Kaynaklar
  card(s, 5.3, 0.95, 4.4, 3.6, { topColor: C.acc });
  T.cardTitle(s, 5.5, 1.12, 4.0, "\ud83d\udcda Kaynaklar", C.acc);

  const resources = [
    "Google AI Studio: aistudio.google.com",
    "Prompt Engineering Guide: promptingguide.ai",
    "LangChain Docs: python.langchain.com",
    "ChromaDB Docs: docs.trychroma.com",
    "Attention Is All You Need (2017 makalesi)",
    "Google Generative AI Cookbook",
    "OpenAI Prompt Best Practices",
    "Hugging Face NLP Course",
  ];
  resources.forEach((r, i) => {
    s.addText("\u2022 " + r, {
      x: 5.5, y: 1.55 + i * 0.36, w: 4.0, h: 0.32, margin: 0,
      fontFace: "Calibri", fontSize: 10, color: C.dark
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 14 \u2014 \u00d6zet",
  [
    { text: "LLM\u2019ler Transformer mimarisi \u00fczerine in\u015fa edilir; Self-Attention her \u015feyi de\u011fi\u015ftirdi", color: C.blue },
    { text: "Prompt m\u00fchendisli\u011fi: Zero-shot, Few-shot ve Chain-of-Thought ile sonu\u00e7lar %40\u201370 iyile\u015fir", color: C.acc },
    { text: "Gemini API ile Python\u2019dan metin \u00fcretme, chatbot ve JSON \u00e7\u0131kt\u0131 almak 5 sat\u0131r kod", color: C.amber },
    { text: "Sistem prompt\u2019u ile chatbot\u2019a ki\u015filik, kural ve s\u0131n\u0131r verilebilir", color: C.sec },
    { text: "RAG = Retrieval + Augmentation + Generation \u2014 hal\u00fcsinasyonu azalt\u0131r, do\u011frulu\u011fu art\u0131r\u0131r", color: C.purple },
  ],
  "Yapay zek\u00e2 soru sormay\u0131 bilene cevap verir; prompt m\u00fchendisli\u011fi, do\u011fru soruyu sorma sanat\u0131d\u0131r.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// DOSYAYA YAZ
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta14_generative_ai.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("PPTX olusturuldu:", outPath))
  .catch(err => { console.error("HATA:", err); process.exit(1); });
