/**
 * Hafta 13 — Doğal Dil İşleme (NLP) ve Hugging Face Ekosistemi
 * =============================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 13: NLP ve Hugging Face Ekosistemi");
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
  "NLP ve\nHugging Face",
  "Hafta 13 · Modül 13\nDoğal Dil İşleme Temelleri ve Hugging Face Ekosistemi",
  "Dr. Murat Altun",
  [
    { value: "6",    label: "Saat" },
    { value: "3",    label: "Notebook" },
    { value: "1M+",  label: "HF Model" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "İçindekiler", null);

  const sections = [
    { num: "01", title: "NLP Temelleri",        items: "Tanım · Kullanım alanları · Tarihçe · Temel kavramlar",               color: C.sec,    slides: "Slayt 3–5" },
    { num: "02", title: "Metin Ön İşleme",      items: "Tokenization · BoW · TF-IDF · Word Embeddings · BERT",                color: C.acc,    slides: "Slayt 6–9" },
    { num: "03", title: "Hugging Face",          items: "Ekosistem · pipeline() · Duygu analizi · NER · Özetleme · Türkçe NLP", color: C.amber,  slides: "Slayt 10–15" },
    { num: "04", title: "Uygulamalar ve Özet",   items: "Spam tespiti · Proje iş akışı · Notebook'lar · Ödev · Kapanış",        color: C.purple, slides: "Slayt 16–20" },
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
// SLAYT 3 — NLP NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Doğal Dil İşleme (NLP) Nedir?", "BÖLÜM 1");

  // Tanım kartı
  card(s, 0.4, 0.95, 5.4, 1.55, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 5.0, "Tanım", C.sec);
  T.cardBody(s, 0.6, 1.42, 5.0, 0.95,
    "NLP (Natural Language Processing), bilgisayarların insan dilini anlama, yorumlama ve üretme yeteneğidir. Yapay zekânın en hızlı büyüyen alt alanlarından biridir."
  );

  // Kullanım alanları kartları (2x2 grid)
  const areas = [
    { title: "Chatbot & Asistan",  desc: "Siri, Alexa, ChatGPT",            color: C.acc },
    { title: "Makine Çevirisi",    desc: "Google Translate, DeepL",          color: C.blue },
    { title: "Metin Özetleme",     desc: "Haber, makale, belge özetleri",    color: C.green },
    { title: "Duygu Analizi",      desc: "Sosyal medya, müşteri yorumları",  color: C.amber },
  ];

  areas.forEach((a, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 2.8;
    const y = 2.7 + row * 1.15;
    card(s, x, y, 2.6, 1.0, { topColor: a.color });
    T.cardTitle(s, x + 0.12, y + 0.18, 2.3, a.title, a.color);
    T.cardBody(s, x + 0.12, y + 0.55, 2.3, 0.35, a.desc);
  });

  // Sağ stat box'lar
  stat(s, 6.0, 0.95, 1.75, 1.2, "$43B", "NLP Pazar\nBüyüklüğü (2025)", C.acc);
  stat(s, 7.95, 0.95, 1.75, 1.2, "%25+", "Yıllık\nBüyüme Oranı", C.sec);

  // Sağ alt açıklama
  card(s, 6.0, 2.35, 3.7, 2.5, { leftColor: C.purple });
  T.cardTitle(s, 6.2, 2.45, 3.3, "NLP Tarihçesi", C.purple);
  const hist = [
    { text: "1950  ", options: { fontFace: "Calibri", fontSize: 9.5, bold: true, color: C.acc } },
    { text: "Turing Testi\n", options: { fontFace: "Calibri", fontSize: 9.5, color: C.dark } },
    { text: "1966  ", options: { fontFace: "Calibri", fontSize: 9.5, bold: true, color: C.acc } },
    { text: "ELIZA — ilk chatbot\n", options: { fontFace: "Calibri", fontSize: 9.5, color: C.dark } },
    { text: "2013  ", options: { fontFace: "Calibri", fontSize: 9.5, bold: true, color: C.acc } },
    { text: "Word2Vec devrimi\n", options: { fontFace: "Calibri", fontSize: 9.5, color: C.dark } },
    { text: "2017  ", options: { fontFace: "Calibri", fontSize: 9.5, bold: true, color: C.acc } },
    { text: "Transformer mimarisi\n", options: { fontFace: "Calibri", fontSize: 9.5, color: C.dark } },
    { text: "2018  ", options: { fontFace: "Calibri", fontSize: 9.5, bold: true, color: C.acc } },
    { text: "BERT — bidirectional\n", options: { fontFace: "Calibri", fontSize: 9.5, color: C.dark } },
    { text: "2022  ", options: { fontFace: "Calibri", fontSize: 9.5, bold: true, color: C.acc } },
    { text: "ChatGPT — LLM çağı", options: { fontFace: "Calibri", fontSize: 9.5, color: C.dark } },
  ];
  s.addText(hist, { x: 6.2, y: 2.85, w: 3.3, h: 1.9, margin: 0, lineSpacingMultiple: 1.2 });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — METİN ÖN İŞLEME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Metin Ön İşleme Pipeline", "BÖLÜM 1");

  // 5 adımlı pipeline
  const steps = [
    { num: 1, title: "Tokenization",   desc: "Metni kelime veya alt-kelime parçalarına ayırma",     color: C.sec },
    { num: 2, title: "Lowercasing",     desc: "Tüm karakterleri küçük harfe çevirme",                color: C.acc },
    { num: 3, title: "Stop Words",      desc: "Anlam taşımayan kelimeleri çıkarma (ve, bir, ile...)", color: C.blue },
    { num: 4, title: "Stemming",        desc: "Kelimeleri kök formuna indirgeme (koşuyordum → koş)",  color: C.amber },
    { num: 5, title: "Lemmatization",   desc: "Sözlük temelli kök bulma (better → good)",            color: C.green },
  ];

  steps.forEach((st, i) => {
    const y = 1.0 + i * 0.88;
    card(s, 0.4, y, 9.2, 0.75, { leftColor: st.color });
    badge(s, 0.6, y + 0.2, st.num, st.color);
    s.addText(st.title, { x: 1.1, y: y + 0.08, w: 2.4, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: st.color });
    s.addText(st.desc, { x: 1.1, y: y + 0.4, w: 8.3, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark });

    // Ok işareti (son adım hariç)
    if (i < steps.length - 1) {
      s.addText("▼", { x: 4.5, y: y + 0.68, w: 1.0, h: 0.22, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, align: "center" });
    }
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — TOKENİZATİON DETAY
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Tokenization Yöntemleri", "BÖLÜM 1");

  // Word tokenization kartı
  card(s, 0.4, 0.95, 4.4, 2.0, { topColor: C.sec });
  T.cardTitle(s, 0.55, 1.12, 4.1, "Word Tokenization", C.sec);
  T.cardBody(s, 0.55, 1.5, 4.1, 0.55,
    "Metni boşluk ve noktalama işaretlerine göre ayırır. Basit ama etkili yöntem."
  );
  code(s, 0.55, 2.15, 4.1, 0.7, [
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "nltk.tokenize ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "word_tokenize\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "tokens = word_tokenize(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"NLP çok güçlü bir alan"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "# ['NLP', 'çok', 'güçlü', 'bir', 'alan']", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
  ]);

  // Subword tokenization kartı
  card(s, 5.1, 0.95, 4.5, 2.0, { topColor: C.acc });
  T.cardTitle(s, 5.25, 1.12, 4.2, "Subword Tokenization", C.acc);
  T.cardBody(s, 5.25, 1.5, 4.2, 0.55,
    "BPE, WordPiece gibi yöntemlerle kelimeleri alt parçalara ayırır. BERT ve GPT bu yöntemi kullanır."
  );
  code(s, 5.25, 2.15, 4.2, 0.7, [
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "transformers ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "AutoTokenizer\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "tok = AutoTokenizer.from_pretrained(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"bert-base-uncased"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "# ['un', '##believ', '##able']", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
  ]);

  // Karşılaştırma tablosu
  card(s, 0.4, 3.15, 9.2, 1.85);
  T.cardTitle(s, 0.6, 3.25, 8.8, "Karşılaştırma", C.pri);

  // Tablo başlıkları
  const thStyle = { fontFace: "Calibri", fontSize: 10, bold: true, color: "FFFFFF" };
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.6, w: 8.8, h: 0.35, fill: { color: C.pri } });
  s.addText("Özellik", { x: 0.6, y: 3.6, w: 2.5, h: 0.35, margin: [0,0,0,8], ...thStyle, valign: "middle" });
  s.addText("Word Tokenization", { x: 3.1, y: 3.6, w: 3.0, h: 0.35, margin: 0, ...thStyle, align: "center", valign: "middle" });
  s.addText("Subword Tokenization", { x: 6.1, y: 3.6, w: 3.3, h: 0.35, margin: 0, ...thStyle, align: "center", valign: "middle" });

  const rows = [
    ["Bilinmeyen kelimeler", "OOV (tanımsız)", "Alt parçalara ayırır"],
    ["Sözlük boyutu", "Çok büyük", "Kompakt (~30K)"],
    ["Kullanım", "NLTK, spaCy", "BERT, GPT, T5"],
  ];
  rows.forEach((r, i) => {
    const y = 3.98 + i * 0.32;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 8.8, h: 0.32, fill: { color: bg } });
    s.addText(r[0], { x: 0.6, y, w: 2.5, h: 0.32, margin: [0,0,0,8], fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText(r[1], { x: 3.1, y, w: 3.0, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, align: "center", valign: "middle" });
    s.addText(r[2], { x: 6.1, y, w: 3.3, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, align: "center", valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — BAG OF WORDS (BoW)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Bag of Words (Kelime Torbası)", "BÖLÜM 2");

  // Açıklama
  card(s, 0.4, 0.95, 4.8, 1.6, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 4.4, "BoW Yaklaşımı", C.sec);
  T.cardBody(s, 0.6, 1.42, 4.4, 1.0,
    "Her belgeyi, içerdiği kelimelerin frekanslarıyla temsil eder. Kelime sırası dikkate alınmaz. Basit ama güçlü bir başlangıç noktasıdır. Metin sınıflandırma ve bilgi çıkarma için yaygın kullanılır."
  );

  // Matris örneği
  card(s, 5.4, 0.95, 4.2, 1.6, { topColor: C.acc });
  T.cardTitle(s, 5.55, 1.12, 3.9, "BoW Matris Örneği", C.acc);

  // Mini tablo
  const mh = { fontFace: "Calibri", fontSize: 9, bold: true, color: "FFFFFF" };
  s.addShape(pres.shapes.RECTANGLE, { x: 5.55, y: 1.52, w: 3.9, h: 0.28, fill: { color: C.acc } });
  s.addText("Belge", { x: 5.55, y: 1.52, w: 0.9, h: 0.28, margin: 0, ...mh, align: "center", valign: "middle" });
  s.addText("nlp", { x: 6.45, y: 1.52, w: 0.6, h: 0.28, margin: 0, ...mh, align: "center", valign: "middle" });
  s.addText("güçlü", { x: 7.05, y: 1.52, w: 0.7, h: 0.28, margin: 0, ...mh, align: "center", valign: "middle" });
  s.addText("alan", { x: 7.75, y: 1.52, w: 0.6, h: 0.28, margin: 0, ...mh, align: "center", valign: "middle" });
  s.addText("model", { x: 8.35, y: 1.52, w: 0.7, h: 0.28, margin: 0, ...mh, align: "center", valign: "middle" });

  const mrows = [
    ["D1", "1", "1", "1", "0"],
    ["D2", "1", "0", "0", "1"],
    ["D3", "0", "1", "1", "1"],
  ];
  mrows.forEach((r, i) => {
    const y = 1.82 + i * 0.26;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.55, y, w: 3.9, h: 0.26, fill: { color: bg } });
    s.addText(r[0], { x: 5.55, y, w: 0.9, h: 0.26, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: C.dark, align: "center", valign: "middle" });
    r.slice(1).forEach((v, j) => {
      const cx = 6.45 + j * (j < 1 ? 0 : j < 2 ? 0.7 : 0.6);
      const positions = [6.45, 7.05, 7.75, 8.35];
      s.addText(v, { x: positions[j], y, w: [0.6, 0.7, 0.6, 0.7][j], h: 0.26, margin: 0, fontFace: "Calibri", fontSize: 9, color: v === "0" ? C.subtle : C.acc, bold: v !== "0", align: "center", valign: "middle" });
    });
  });

  // Kod bloğu
  code(s, 0.4, 2.75, 9.2, 2.15, [
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "sklearn.feature_extraction.text ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "CountVectorizer\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "corpus = [\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '    "NLP güçlü bir alan",\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: '    "NLP model eğitimi",\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: '    "güçlü alan model"\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: "]\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "vectorizer = CountVectorizer()\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "X = vectorizer.fit_transform(corpus)\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "print(X.toarray())", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — TF-IDF
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "TF-IDF: Kelime Önem Ağırlıklandırma", "BÖLÜM 2");

  // Formül kartı
  card(s, 0.4, 0.95, 5.4, 1.7, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.12, 5.0, "TF-IDF Formülü", C.sec);
  s.addText("TF-IDF(t,d) = TF(t,d) × IDF(t)", {
    x: 0.6, y: 1.55, w: 5.0, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 16, bold: true, color: C.acc, align: "center"
  });

  const formParts = [
    { text: "TF (Term Frequency): ", options: { fontFace: "Calibri", fontSize: 10, bold: true, color: C.sec } },
    { text: "Kelimenin belgede kaç kez geçtiği\n", options: { fontFace: "Calibri", fontSize: 10, color: C.dark } },
    { text: "IDF (Inverse Document Frequency): ", options: { fontFace: "Calibri", fontSize: 10, bold: true, color: C.sec } },
    { text: "log(Toplam belge / Kelimeyi içeren belge)", options: { fontFace: "Calibri", fontSize: 10, color: C.dark } },
  ];
  s.addText(formParts, { x: 0.6, y: 2.0, w: 5.0, h: 0.55, margin: 0, lineSpacingMultiple: 1.15 });

  // Neden TF-IDF?
  card(s, 6.0, 0.95, 3.6, 1.7, { leftColor: C.acc });
  T.cardTitle(s, 6.2, 1.05, 3.2, "Neden TF-IDF?", C.acc);
  T.cardBody(s, 6.2, 1.45, 3.2, 1.1,
    "• BoW'dan daha bilgilendirici\n• Yaygın kelimelerin ağırlığını düşürür\n• Nadir ama önemli kelimeleri öne çıkarır\n• Metin sınıflandırma ve bilgi erişiminde standart"
  );

  // Kod bloğu
  code(s, 0.4, 2.85, 9.2, 2.05, [
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "sklearn.feature_extraction.text ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "TfidfVectorizer\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "corpus = [\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '    "makine öğrenmesi ile doğal dil işleme",\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: '    "doğal dil işleme uygulamaları",\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: '    "derin öğrenme modelleri"\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: "]\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "tfidf = TfidfVectorizer()\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "matrix = tfidf.fit_transform(corpus)\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "print(tfidf.get_feature_names_out())", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — WORD EMBEDDINGS
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Word Embeddings: Kelimeler Vektör Uzayında", "BÖLÜM 2");

  // Word2Vec açıklama
  card(s, 0.4, 0.95, 4.8, 2.3, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.05, 4.4, "Word2Vec (2013 — Mikolov et al.)", C.acc);
  T.cardBody(s, 0.6, 1.45, 4.4, 1.65,
    "Her kelimeyi sabit boyutlu bir vektörle temsil eder (genellikle 100-300 boyut).\n\n" +
    "Anlamsal ilişkileri yakalar:\n" +
    "  kral − erkek + kadın ≈ kraliçe\n" +
    "  Ankara − Türkiye + Fransa ≈ Paris\n\n" +
    "İki mimari:\n• CBOW: Bağlamdan kelime tahmin\n• Skip-gram: Kelimeden bağlam tahmin"
  );

  // Sağ taraf: yaklaşımlar karşılaştırması
  const embedTypes = [
    { title: "Word2Vec", desc: "Statik, kelime düzeyi, hızlı eğitim", yr: "2013", color: C.sec },
    { title: "GloVe", desc: "Eş-oluşum matrisi tabanlı, global istatistik", yr: "2014", color: C.blue },
    { title: "FastText", desc: "Alt-kelime bilgisi, nadir kelimelerde güçlü", yr: "2016", color: C.green },
    { title: "ELMo", desc: "Bağlam duyarlı, çift yönlü LSTM tabanlı", yr: "2018", color: C.amber },
    { title: "BERT", desc: "Transformer, dinamik bağlam, SOTA performans", yr: "2018", color: C.purple },
  ];

  embedTypes.forEach((e, i) => {
    const y = 0.95 + i * 0.72;
    card(s, 5.4, y, 4.2, 0.62, { leftColor: e.color });
    s.addText(e.yr, { x: 5.55, y: y + 0.05, w: 0.55, h: 0.52, margin: 0, fontFace: "Georgia", fontSize: 9, bold: true, color: e.color, align: "center", valign: "middle" });
    s.addText(e.title, { x: 6.15, y: y + 0.05, w: 1.5, h: 0.28, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark });
    s.addText(e.desc, { x: 6.15, y: y + 0.32, w: 3.3, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid });
  });

  // Benzerlik hesaplama kod
  code(s, 0.4, 3.45, 9.2, 1.4, [
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "gensim.models ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "Word2Vec\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "model = Word2Vec(sentences, vector_size=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "100", options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ", window=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "5", options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ", min_count=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "1", options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "similar = model.wv.most_similar(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"yapay_zeka"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ", topn=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "5", options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — BERT MODELİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "BERT: Bidirectional Encoder Representations", "BÖLÜM 2");

  // BERT açıklama
  card(s, 0.4, 0.95, 5.4, 2.2, { topColor: C.purple });
  T.cardTitle(s, 0.6, 1.12, 5.0, "BERT Nedir? (Google, 2018)", C.purple);
  T.cardBody(s, 0.6, 1.52, 5.0, 1.5,
    "Transformer mimarisinin encoder kısmını kullanan, çift yönlü (bidirectional) dil modeli.\n\n" +
    "Pre-training görevleri:\n" +
    "  1. Masked Language Model (MLM): Rastgele kelimeleri maskele, tahmin et\n" +
    "  2. Next Sentence Prediction (NSP): İki cümle ardışık mı?\n\n" +
    "Fine-tuning ile her NLP görevine uyarlanabilir."
  );

  // Sağ: BERT özellikleri
  const features = [
    { label: "Parametre", value: "110M / 340M", color: C.sec },
    { label: "Katman", value: "12 / 24", color: C.acc },
    { label: "Gizli Boyut", value: "768 / 1024", color: C.amber },
    { label: "Attention Head", value: "12 / 16", color: C.blue },
  ];

  features.forEach((f, i) => {
    const y = 0.95 + i * 0.55;
    card(s, 6.0, y, 3.6, 0.48, { leftColor: f.color });
    s.addText(f.label, { x: 6.15, y, w: 1.6, h: 0.48, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText(f.value, { x: 7.75, y, w: 1.7, h: 0.48, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: f.color, align: "right", valign: "middle" });
  });

  // Alt: Transformer avantajları
  card(s, 0.4, 3.35, 9.2, 1.65, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 3.45, 8.8, "Transformer Avantajları", C.acc);

  const advItems = [
    { title: "Self-Attention", desc: "Her kelime diğer tüm kelimelere bakabilir", color: C.sec },
    { title: "Paralel İşleme", desc: "RNN'den farklı olarak sıralı değil, paralel eğitim", color: C.blue },
    { title: "Transfer Learning", desc: "Bir kez eğit, her göreve uyarla (fine-tuning)", color: C.green },
  ];

  advItems.forEach((a, i) => {
    const x = 0.6 + i * 3.05;
    s.addText(a.title, { x, y: 3.85, w: 2.85, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: a.color });
    s.addText(a.desc, { x, y: 4.15, w: 2.85, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — HUGGİNG FACE EKOSİSTEMİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Hugging Face Ekosistemi", "BÖLÜM 3");

  const hfCards = [
    { title: "🤗 Transformers", desc: "PyTorch ve TensorFlow ile 100K+ model. pipeline() ile tek satırda NLP. AutoModel, AutoTokenizer sınıfları.", color: C.sec, icon: "T" },
    { title: "Model Hub", desc: "1M+ açık kaynak model. Filtrele, dene, indir. Topluluk katkıları ve model kartları.", color: C.acc, icon: "H" },
    { title: "Datasets", desc: "50K+ hazır veri seti. load_dataset() ile anında yükle. Streaming desteği büyük veriler için.", color: C.blue, icon: "D" },
    { title: "Spaces", desc: "Gradio ve Streamlit ile demo oluştur. Ücretsiz GPU/TPU. Model denemeleri ve paylaşım.", color: C.purple, icon: "S" },
  ];

  hfCards.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.7;
    const y = 0.95 + row * 2.2;
    card(s, x, y, 4.45, 2.0, { topColor: c.color });

    // İkon daire
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.2, w: 0.55, h: 0.55, fill: { color: c.color } });
    s.addText(c.icon, { x: x + 0.15, y: y + 0.2, w: 0.55, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

    T.cardTitle(s, x + 0.85, y + 0.25, 3.4, c.title, c.color);
    T.cardBody(s, x + 0.15, y + 0.75, 4.15, 1.1, c.desc);
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — pipeline() İLE NLP
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "pipeline() ile Tek Satırda NLP", "BÖLÜM 3");

  // Açıklama
  card(s, 0.4, 0.95, 9.2, 0.65);
  T.cardBody(s, 0.55, 1.02, 8.9, 0.5,
    "Hugging Face pipeline() fonksiyonu, model yükleme, tokenization ve inference işlemlerini tek satırda gerçekleştirir.",
    { size: 11 }
  );

  // 4 pipeline örneği
  code(s, 0.4, 1.75, 4.4, 1.55, [
    { text: "# Duygu Analizi\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "transformers ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "pipeline\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "classifier = pipeline(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"sentiment-analysis"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: 'result = classifier("Bu film harikaydı!")', options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);

  code(s, 5.2, 1.75, 4.4, 1.55, [
    { text: "# İsim Varlık Tanıma (NER)\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "ner = pipeline(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"ner"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ",\n  grouped_entities=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "True", options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: 'result = ner("Ankara Türkiye\'nin\n  başkentidir.")', options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);

  code(s, 0.4, 3.45, 4.4, 1.55, [
    { text: "# Metin Özetleme\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "summarizer = pipeline(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"summarization"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "summary = summarizer(long_text,\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "  max_length=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "130", options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ", min_length=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "30", options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);

  code(s, 5.2, 3.45, 4.4, 1.55, [
    { text: "# Çeviri (EN → FR)\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "translator = pipeline(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"translation_en_to_fr"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "result = translator(\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '  "Natural Language Processing\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: '   is amazing!"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: "\n)", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — DUYGU ANALİZİ UYGULAMASI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Duygu Analizi Uygulaması", "BÖLÜM 3");

  // Senaryo kartı
  card(s, 0.4, 0.95, 4.8, 1.5, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 4.4, "Twitter/X Duygu Analizi Senaryosu", C.sec);
  T.cardBody(s, 0.6, 1.45, 4.4, 0.9,
    "1. Twitter API ile tweet toplama\n2. Metin ön işleme (temizleme, tokenization)\n3. HF pipeline ile duygu sınıflandırma\n4. Sonuçları görselleştirme (pasta, bar grafik)"
  );

  // Sonuç stat'ları
  stat(s, 5.5, 0.95, 1.35, 1.15, "%62", "Pozitif", C.green);
  stat(s, 7.0, 0.95, 1.35, 1.15, "%28", "Negatif", C.red);
  stat(s, 8.5, 0.95, 1.2, 1.15, "%10", "Nötr", C.mid);

  // Kod
  code(s, 0.4, 2.65, 9.2, 2.3, [
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "transformers ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "pipeline\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "pandas ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "as ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "pd\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "classifier = pipeline(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"sentiment-analysis"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "tweets = pd.read_csv(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"tweets.csv"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "tweets[", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"duygu"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: "] = tweets[", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"text"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: "].apply(\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "    lambda x: classifier(x[:512])[0][", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"label"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: "]\n)\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "print(tweets[", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"duygu"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: "].value_counts())", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — NER (İSİM VARLIK TANIMA)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "NER: İsim Varlık Tanıma", "BÖLÜM 3");

  // Açıklama
  card(s, 0.4, 0.95, 5.0, 1.3, { leftColor: C.blue });
  T.cardTitle(s, 0.6, 1.05, 4.6, "Named Entity Recognition (NER)", C.blue);
  T.cardBody(s, 0.6, 1.42, 4.6, 0.7,
    "Metindeki özel isimleri (kişi, kurum, yer, tarih, miktar) otomatik olarak tespit eder ve kategorize eder."
  );

  // Varlık türleri
  const entityTypes = [
    { tag: "PER", desc: "Kişi", ex: "Dr. Murat Altun", color: C.sec },
    { tag: "ORG", desc: "Kurum", ex: "Hugging Face, Google", color: C.acc },
    { tag: "LOC", desc: "Yer", ex: "Ankara, Türkiye", color: C.blue },
    { tag: "MISC", desc: "Diğer", ex: "Python, BERT", color: C.amber },
  ];

  entityTypes.forEach((e, i) => {
    const x = 5.6;
    const y = 0.95 + i * 0.6;
    card(s, x, y, 4.0, 0.52, { leftColor: e.color });
    s.addText(e.tag, { x: x + 0.15, y, w: 0.6, h: 0.52, margin: 0, fontFace: "Consolas", fontSize: 10, bold: true, color: e.color, valign: "middle" });
    s.addText(e.desc, { x: x + 0.8, y, w: 0.7, h: 0.52, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText(e.ex, { x: x + 1.55, y, w: 2.3, h: 0.52, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, valign: "middle" });
  });

  // Örnek çıktı kartı
  card(s, 0.4, 2.45, 9.2, 0.85, { topColor: C.green });
  T.cardTitle(s, 0.6, 2.58, 8.8, "Örnek Çıktı", C.green);
  s.addText([
    { text: '"', options: { fontFace: "Calibri", fontSize: 11, color: C.dark } },
    { text: "Dr. Murat Altun", options: { fontFace: "Calibri", fontSize: 11, bold: true, color: C.sec } },
    { text: " ", options: { fontFace: "Calibri", fontSize: 11, color: C.dark } },
    { text: "Ankara", options: { fontFace: "Calibri", fontSize: 11, bold: true, color: C.blue } },
    { text: "'da ", options: { fontFace: "Calibri", fontSize: 11, color: C.dark } },
    { text: "Hugging Face", options: { fontFace: "Calibri", fontSize: 11, bold: true, color: C.acc } },
    { text: ' eğitimi verdi."', options: { fontFace: "Calibri", fontSize: 11, color: C.dark } },
    { text: "  →  PER | LOC | ORG", options: { fontFace: "Consolas", fontSize: 10, bold: true, color: C.green } },
  ], { x: 0.6, y: 2.92, w: 8.8, h: 0.3, margin: 0 });

  // Kod
  code(s, 0.4, 3.5, 9.2, 1.5, [
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "transformers ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "pipeline\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "ner = pipeline(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"ner"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ", grouped_entities=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "True", options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: 'entities = ner("Dr. Murat Altun Ankara\'da eğitim verdi.")\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "for ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "e ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "in ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "entities:\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '    print(f"{e[\'word\']}: {e[\'entity_group\']} ({e[\'score\']:.2f})")', options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — METİN ÖZETLEME VE ÇEVİRİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Metin Özetleme ve Çeviri", "BÖLÜM 3");

  // Özetleme
  card(s, 0.4, 0.95, 4.5, 1.4, { topColor: C.acc });
  T.cardTitle(s, 0.55, 1.12, 4.2, "Abstractive Summarization", C.acc);
  T.cardBody(s, 0.55, 1.5, 4.2, 0.75,
    "Orijinal metni yeniden ifade ederek özet üretir. Kopyalama değil, anlama ve yeniden yazma. T5, BART, Pegasus gibi modeller kullanılır."
  );

  // Çeviri
  card(s, 5.1, 0.95, 4.5, 1.4, { topColor: C.amber });
  T.cardTitle(s, 5.25, 1.12, 4.2, "Machine Translation", C.amber);
  T.cardBody(s, 5.25, 1.5, 4.2, 0.75,
    "Bir dilden diğerine otomatik çeviri. Helsinki-NLP ve MarianMT modelleri. 500+ dil çifti destekli."
  );

  // Özetleme kodu
  code(s, 0.4, 2.55, 4.5, 2.4, [
    { text: "# Metin Özetleme\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "transformers ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "pipeline\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "summarizer = pipeline(\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '  "summarization"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ",\n  model=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"facebook/bart-large-cnn"\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "text = ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"Uzun makale metni..."\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: "summary = summarizer(text,\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "  max_length=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "150", options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);

  // Çeviri kodu
  code(s, 5.1, 2.55, 4.5, 2.4, [
    { text: "# Makine Çevirisi\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "transformers ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "pipeline\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "translator = pipeline(\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '  "translation"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ",\n  model=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"Helsinki-NLP/\n    opus-mt-en-tr"\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "result = translator(\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '  "Deep learning has\n', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: '   transformed NLP."', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: "\n)", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — TÜRKÇE NLP
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Türkçe NLP: Zorluklar ve Çözümler", "BÖLÜM 3");

  // Model kartı
  card(s, 0.4, 0.95, 5.0, 1.6, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.12, 4.6, "dbmdz/bert-base-turkish-cased", C.sec);
  T.cardBody(s, 0.6, 1.5, 4.6, 0.95,
    "Türkçe BERT modeli (MDZ Digital Library). 35GB Türkçe metin ile eğitildi. Duygu analizi, NER, soru cevaplama ve metin sınıflandırmada İngilizce BERT'ten çok daha başarılı Türkçe sonuçlar."
  );

  // Zorluklar
  card(s, 5.6, 0.95, 4.0, 1.6, { leftColor: C.red });
  T.cardTitle(s, 5.8, 1.05, 3.6, "Türkçe NLP Zorlukları", C.red);
  T.cardBody(s, 5.8, 1.45, 3.6, 1.0,
    "• Sondan eklemeli dil (agglutinative)\n• Kelime sayısı çok fazla\n• Serbest söz dizimi (SOV)\n• Etiketli veri kıtlığı\n• Özel karakter sorunları (İ/ı, Ş/ş)"
  );

  // Çözümler — 3 kart
  const solutions = [
    { title: "Morphological Analysis", desc: "Zemberek kütüphanesi ile Türkçe morfolojik çözümleme. Kök bulma ve ek ayrıştırma.", color: C.acc },
    { title: "Transfer Learning", desc: "Çok dilli modeller (mBERT, XLM-R) fine-tune ederek Türkçe'ye uyarlama.", color: C.blue },
    { title: "Veri Artırma", desc: "Back-translation ve paraphrase ile Türkçe eğitim verisini zenginleştirme.", color: C.green },
  ];

  solutions.forEach((sol, i) => {
    const x = 0.4 + i * 3.15;
    card(s, x, 2.75, 2.95, 1.15, { topColor: sol.color });
    T.cardTitle(s, x + 0.12, 2.92, 2.7, sol.title, sol.color);
    T.cardBody(s, x + 0.12, 3.3, 2.7, 0.5, sol.desc, { size: 9.5 });
  });

  // Kod
  code(s, 0.4, 4.1, 9.2, 0.95, [
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "transformers ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "pipeline\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "classifier = pipeline(", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"sentiment-analysis"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ", model=", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: '"savasy/bert-base-turkish-sentiment-cased"', options: { fontFace: "Consolas", fontSize: 9, color: C.codeYellow } },
    { text: ")\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: 'print(classifier("Bu ürün gerçekten harika!"))', options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — SMS SPAM TESPİTİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "SMS Spam Tespiti: NLP + ML", "BÖLÜM 4");

  // Pipeline açıklaması
  card(s, 0.4, 0.95, 4.8, 1.5, { leftColor: C.amber });
  T.cardTitle(s, 0.6, 1.05, 4.4, "NLP + ML Pipeline", C.amber);
  T.cardBody(s, 0.6, 1.42, 4.4, 0.9,
    "1. SMS verisi yükleme (ham/spam etiketli)\n2. Metin temizleme ve ön işleme\n3. TF-IDF ile özellik çıkarma\n4. Naive Bayes / SVM / Random Forest ile sınıflandırma\n5. Precision, Recall, F1-Score ile değerlendirme"
  );

  // Sonuç stat'ları
  stat(s, 5.5, 0.95, 1.35, 1.15, "%97", "Accuracy", C.green);
  stat(s, 7.0, 0.95, 1.35, 1.15, "%95", "F1-Score", C.acc);
  stat(s, 8.5, 0.95, 1.2, 1.15, "5.5K", "SMS Veri", C.blue);

  // Kod
  code(s, 0.4, 2.65, 9.2, 2.4, [
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "sklearn.feature_extraction.text ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "TfidfVectorizer\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "sklearn.naive_bayes ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "MultinomialNB\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "sklearn.pipeline ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "make_pipeline\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "from ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "sklearn.metrics ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "import ", options: { fontFace: "Consolas", fontSize: 9, color: C.codeBlue } },
    { text: "classification_report\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "# Pipeline: TF-IDF → Naive Bayes\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "model = make_pipeline(TfidfVectorizer(), MultinomialNB())\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "model.fit(X_train, y_train)\n\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeGreen } },
    { text: "y_pred = model.predict(X_test)\n", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
    { text: "print(classification_report(y_test, y_pred))", options: { fontFace: "Consolas", fontSize: 9, color: C.codeWhite } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — NLP PROJELERİ İŞ AKIŞI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "NLP Projeleri İş Akışı", "BÖLÜM 4");

  const timeline = [
    { num: 1, title: "Veri Toplama",       desc: "Web scraping, API, hazır veri setleri. Metin verisi toplama ve etiketleme.",                          color: C.sec },
    { num: 2, title: "Ön İşleme",          desc: "Temizleme, tokenization, stop words, lemmatization. Veri kalitesi her şeydir.",                       color: C.acc },
    { num: 3, title: "Özellik Çıkarma",    desc: "BoW, TF-IDF, Word Embeddings. Metni sayısal vektörlere dönüştürme.",                                 color: C.blue },
    { num: 4, title: "Model Seçimi",       desc: "Geleneksel ML (NB, SVM) veya Transformer (BERT, GPT). Görevin karmaşıklığına göre karar.",           color: C.amber },
    { num: 5, title: "Değerlendirme",      desc: "Accuracy, Precision, Recall, F1-Score. Confusion matrix ve cross-validation.",                        color: C.green },
    { num: 6, title: "Deploy",             desc: "FastAPI / Flask + Hugging Face Spaces / Docker. Model servisi ve API oluşturma.",                     color: C.purple },
  ];

  timeline.forEach((t, i) => {
    const y = 0.92 + i * 0.78;
    // Sol: numara ve çizgi
    s.addShape(pres.shapes.OVAL, { x: 0.55, y: y + 0.08, w: 0.42, h: 0.42, fill: { color: t.color } });
    s.addText(String(t.num), { x: 0.55, y: y + 0.08, w: 0.42, h: 0.42, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

    // Bağlantı çizgisi (son hariç)
    if (i < timeline.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.74, y: y + 0.52, w: 0.04, h: 0.28, fill: { color: C.bdr } });
    }

    // Kart
    card(s, 1.15, y, 8.4, 0.65, { leftColor: t.color });
    s.addText(t.title, { x: 1.3, y, w: 2.2, h: 0.65, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: t.color, valign: "middle" });
    s.addText(t.desc, { x: 3.5, y, w: 5.9, h: 0.65, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark, valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 18 — HAFTALIK NOTEBOOK'LAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Haftalık Notebook'lar", "BÖLÜM 4");

  const notebooks = [
    {
      title: "Notebook 1: NLP Temelleri",
      file: "hafta13_nlp_temel.ipynb",
      items: [
        "NLTK ile tokenization ve stop words",
        "CountVectorizer ile Bag of Words",
        "TfidfVectorizer ile TF-IDF",
        "Kelime bulutu (WordCloud) görselleştirme",
      ],
      color: C.sec,
      icon: "1",
    },
    {
      title: "Notebook 2: Duygu Analizi",
      file: "hafta13_duygu_analizi.ipynb",
      items: [
        "HF pipeline ile İngilizce duygu analizi",
        "Türkçe BERT ile Türkçe duygu analizi",
        "Tweet veri seti ile toplu analiz",
        "Sonuçları Matplotlib ile görselleştirme",
      ],
      color: C.acc,
      icon: "2",
    },
    {
      title: "Notebook 3: Spam Tespiti",
      file: "hafta13_spam_tespiti.ipynb",
      items: [
        "SMS Spam Collection veri seti",
        "TF-IDF + Naive Bayes pipeline",
        "Model karşılaştırma (NB vs SVM vs RF)",
        "Classification report ve confusion matrix",
      ],
      color: C.purple,
      icon: "3",
    },
  ];

  notebooks.forEach((nb, i) => {
    const x = 0.35 + i * 3.15;
    card(s, x, 0.95, 2.95, 3.85, { topColor: nb.color });

    // İkon
    s.addShape(pres.shapes.OVAL, { x: x + 0.12, y: 1.12, w: 0.5, h: 0.5, fill: { color: nb.color } });
    s.addText(nb.icon, { x: x + 0.12, y: 1.12, w: 0.5, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

    T.cardTitle(s, x + 0.75, 1.2, 2.05, nb.title, nb.color);

    // Dosya adı
    s.addText(nb.file, { x: x + 0.12, y: 1.72, w: 2.7, h: 0.28, margin: 0, fontFace: "Consolas", fontSize: 8, color: C.mid, italic: true });

    // İçerik maddeleri
    nb.items.forEach((item, j) => {
      const iy = 2.08 + j * 0.55;
      s.addText("•", { x: x + 0.12, y: iy, w: 0.2, h: 0.48, margin: 0, fontFace: "Calibri", fontSize: 11, color: nb.color, valign: "top" });
      s.addText(item, { x: x + 0.32, y: iy, w: 2.45, h: 0.48, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.dark, valign: "top" });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ödev ve Kaynaklar", "BÖLÜM 4");

  // Ödev 1
  card(s, 0.4, 0.95, 4.5, 2.0, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.12, 4.1, "Ödev 1: Duygu Analizi (1000+ Tweet)", C.sec);
  T.cardBody(s, 0.6, 1.52, 4.1, 1.3,
    "• Twitter/X API veya hazır veri seti kullanın\n• En az 1000 tweet toplayın\n• HF pipeline ile duygu sınıflandırma\n• Pozitif/negatif/nötr dağılımı görselleştirin\n• En yaygın kelimeler için WordCloud\n• Teslim: Jupyter Notebook + rapor"
  );

  // Ödev 2
  card(s, 5.1, 0.95, 4.5, 2.0, { topColor: C.acc });
  T.cardTitle(s, 5.3, 1.12, 4.1, "Ödev 2: SMS Spam Tespiti Raporu", C.acc);
  T.cardBody(s, 5.3, 1.52, 4.1, 1.3,
    "• SMS Spam Collection veri setini indirin\n• TF-IDF + en az 3 farklı sınıflandırıcı\n• Performans karşılaştırma tablosu\n• En iyi modelin confusion matrix'i\n• Yanlış sınıflandırılan örnekleri analiz edin\n• Teslim: Jupyter Notebook + rapor"
  );

  // Kaynaklar
  card(s, 0.4, 3.15, 9.2, 1.85, { leftColor: C.purple });
  T.cardTitle(s, 0.6, 3.25, 8.8, "Kaynaklar ve İleri Okuma", C.purple);

  const resources = [
    { text: "Hugging Face Docs  ", options: { fontFace: "Calibri", fontSize: 10, bold: true, color: C.acc } },
    { text: "huggingface.co/docs/transformers\n", options: { fontFace: "Calibri", fontSize: 10, color: C.mid } },
    { text: "NLTK Book  ", options: { fontFace: "Calibri", fontSize: 10, bold: true, color: C.acc } },
    { text: "nltk.org/book — Doğal Dil İşleme ile Python\n", options: { fontFace: "Calibri", fontSize: 10, color: C.mid } },
    { text: "Speech and Language Processing  ", options: { fontFace: "Calibri", fontSize: 10, bold: true, color: C.acc } },
    { text: "Jurafsky & Martin (3rd Ed.) — web.stanford.edu/~jurafsky/slp3\n", options: { fontFace: "Calibri", fontSize: 10, color: C.mid } },
    { text: "Türkçe NLP  ", options: { fontFace: "Calibri", fontSize: 10, bold: true, color: C.acc } },
    { text: "github.com/Firat-Yilmaz/TurkishNLPResources\n", options: { fontFace: "Calibri", fontSize: 10, color: C.mid } },
    { text: "Papers With Code  ", options: { fontFace: "Calibri", fontSize: 10, bold: true, color: C.acc } },
    { text: "paperswithcode.com/area/natural-language-processing", options: { fontFace: "Calibri", fontSize: 10, color: C.mid } },
  ];
  s.addText(resources, { x: 0.6, y: 3.62, w: 8.8, h: 1.3, margin: 0, lineSpacingMultiple: 1.2 });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 13 — Özet",
  [
    { text: "NLP, bilgisayarların insan dilini anlamasını sağlayan yapay zekânın en dinamik alanıdır.", color: C.sec },
    { text: "Tokenization, BoW, TF-IDF ve Word Embeddings metin temsil yöntemlerinin temelini oluşturur.", color: C.acc },
    { text: "BERT ve Transformer mimarisi, NLP'de devrim yaratarak transfer learning'i mümkün kıldı.", color: C.blue },
    { text: "Hugging Face pipeline() ile tek satırda duygu analizi, NER, özetleme ve çeviri yapılabilir.", color: C.green },
    { text: "Türkçe NLP için özel modeller (bert-base-turkish) ve morfolojik analiz araçları gereklidir.", color: C.purple },
  ],
  "Dil, düşüncenin giysisidir. — Samuel Johnson",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// KAYDET
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta13_nlp_huggingface.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("PPTX oluşturuldu:", outPath))
  .catch(err => { console.error("HATA:", err); process.exit(1); });
