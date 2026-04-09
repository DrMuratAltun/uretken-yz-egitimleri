/**
 * Hafta 9 — MLOps Temelleri ve Veri Bilimi Capstone Projesi
 * ==========================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 9: MLOps Temelleri ve Veri Bilimi Capstone Projesi");
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
  "MLOps ve\nCapstone",
  "Hafta 9 \u00b7 Mod\u00fcl 9\nModel Deployment, Streamlit ve Proje Y\u00f6netimi",
  "Dr. Murat Altun",
  [
    { value: "6",  label: "Saat" },
    { value: "3",  label: "Notebook" },
    { value: "4",  label: "Proje \u00d6nerisi" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "\u0130\u00e7indekiler", null);

  const sections = [
    { num: "01", title: "MLOps Temelleri",       items: "ML ya\u015fam d\u00f6ng\u00fcs\u00fc \u00b7 model serialization \u00b7 joblib", color: C.sec,    slides: "Slayt 3\u20136" },
    { num: "02", title: "Deployment & Ara\u00e7lar",   items: "Streamlit \u00b7 Gradio \u00b7 Hugging Face Spaces \u00b7 deploy ad\u0131mlar\u0131", color: C.acc,    slides: "Slayt 7\u201312" },
    { num: "03", title: "Capstone Projesi",       items: "Proje y\u00f6netimi \u00b7 portfolio \u00b7 Airbnb \u00b7 Trendyol \u00b7 Spotify", color: C.amber,  slides: "Slayt 13\u201320" },
  ];

  sections.forEach((sec, i) => {
    const y = 1.15 + i * 1.35;
    card(s, 0.5, y, 9.0, 1.15, { leftColor: sec.color });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.56, y: y + 0.2, w: 0.7, h: 0.7, fill: { color: sec.color } });
    s.addText(sec.num, { x: 0.56, y: y + 0.2, w: 0.7, h: 0.7, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(sec.title, { x: 1.4, y: y + 0.15, w: 5, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 16, bold: true, color: C.dark });
    s.addText(sec.items, { x: 1.4, y: y + 0.6, w: 5, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.mid });
    s.addText(sec.slides, { x: 7.8, y: y + 0.35, w: 1.5, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10, color: sec.color, bold: true, align: "right" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 3 — MLOps NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "MLOps Nedir?", "B\u00d6L\u00dcM 1");

  // Tan\u0131m kart\u0131
  card(s, 0.4, 0.95, 5.5, 1.6, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 5.1, "ML + DevOps = MLOps", C.sec);
  T.cardBody(s, 0.6, 1.45, 5.1, 1.0,
    "MLOps, makine \u00f6\u011frenmesi modellerinin geli\u015ftirme, e\u011fitim, deploy ve izleme s\u00fcre\u00e7lerini otomatikle\u015ftiren m\u00fchendislik disiplinidir. DevOps prensiplerini ML ya\u015fam d\u00f6ng\u00fcs\u00fcne uygular."
  );

  // Neden \u00f6nemli kart\u0131
  card(s, 0.4, 2.75, 5.5, 1.8, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 2.85, 5.1, "Neden \u00d6nemli?", C.acc);
  const reasons = [
    "Modellerin %87\u2019si \u00fcretime ge\u00e7emiyor (Gartner)",
    "Tekrarlanabilirlik ve versiyon kontrol\u00fc sa\u011flar",
    "Model bozulmas\u0131n\u0131 (drift) erken tespit eder",
    "Ekip i\u015f birli\u011fini standartla\u015ft\u0131r\u0131r",
  ];
  reasons.forEach((r, i) => {
    badge(s, 0.6, 3.3 + i * 0.3, i + 1, C.acc);
    T.cardBody(s, 1.05, 3.26 + i * 0.3, 4.6, 0.3, r, { size: 10 });
  });

  // Sa\u011f: stat box'lar
  stat(s, 6.2, 0.95, 1.7, 1.25, "%87", "Model\n\u00dcretime Ge\u00e7emez", C.red);
  stat(s, 8.1, 0.95, 1.7, 1.25, "2x", "H\u0131zl\u0131\nDeploy D\u00f6ng\u00fcs\u00fc", C.acc);
  stat(s, 6.2, 2.4, 1.7, 1.25, "10x", "Daha Az\nManuel \u0130\u015f", C.green);
  stat(s, 8.1, 2.4, 1.7, 1.25, "CI/CD", "S\u00fcrekli\nEntegrasyon", C.purple);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — MODEL YAŞAM DÖNGÜSÜ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Model Ya\u015fam D\u00f6ng\u00fcs\u00fc", "B\u00d6L\u00dcM 1");

  const steps = [
    { num: "1", title: "Veri Toplama",      desc: "Ham veri kaynaklar\u0131,\nETL pipeline",            color: C.sec },
    { num: "2", title: "\u00d6n \u0130\u015fleme",         desc: "Temizleme, d\u00f6n\u00fc\u015ft\u00fcrme,\n\u00f6zellik m\u00fchendisli\u011fi",  color: C.acc },
    { num: "3", title: "Model E\u011fitimi",     desc: "Algoritma se\u00e7imi,\nhiperparametre ayar\u0131",       color: C.amber },
    { num: "4", title: "De\u011ferlendirme",     desc: "Metrikler, cross-val,\nA/B test",               color: C.green },
    { num: "5", title: "Deploy",            desc: "API, web app,\ncontainer",                      color: C.blue },
    { num: "6", title: "\u0130zleme",            desc: "Model drift, performans\nalert, g\u00fcncelleme",    color: C.purple },
  ];

  steps.forEach((st, i) => {
    const x = 0.35 + i * 1.55;
    const y = 1.15;

    // Ba\u011flant\u0131 oku (ilk 5 ad\u0131m)
    if (i < 5) {
      s.addShape(pres.shapes.RECTANGLE, { x: x + 1.15, y: y + 0.42, w: 0.4, h: 0.06, fill: { color: C.secLt } });
      s.addText("\u25B6", { x: x + 1.4, y: y + 0.25, w: 0.3, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.secLt, align: "center", valign: "middle" });
    }

    // Daire numara
    s.addShape(pres.shapes.OVAL, { x: x + 0.32, y: y, w: 0.5, h: 0.5, fill: { color: st.color } });
    s.addText(st.num, { x: x + 0.32, y: y, w: 0.5, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

    // Ba\u015fl\u0131k
    s.addText(st.title, { x: x, y: y + 0.6, w: 1.15, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 10.5, bold: true, color: C.dark, align: "center" });
    // A\u00e7\u0131klama
    s.addText(st.desc, { x: x, y: y + 1.0, w: 1.15, h: 0.7, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, align: "center" });
  });

  // Alt: geri besleme oku
  s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 3.2, w: 8.0, h: 0.04, fill: { color: C.secLt } });
  s.addText("\u21BB  S\u00fcrekli G\u00fcncelleme D\u00f6ng\u00fcs\u00fc  \u21BB", {
    x: 2.5, y: 3.35, w: 5.0, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 11, color: C.sec, italic: true, align: "center"
  });

  // Alt bilgi kart\u0131
  card(s, 0.4, 3.9, 9.2, 1.25, { topColor: C.acc });
  T.cardTitle(s, 0.6, 4.05, 8.8, "MLOps\u2019un Temel \u0130lkesi", C.acc);
  T.cardBody(s, 0.6, 4.4, 8.8, 0.65,
    "Bir model bir kez e\u011fitilip b\u0131rak\u0131lmaz; s\u00fcrekli izlenir, de\u011ferlendirilir ve g\u00fcncellenir. Veri de\u011fi\u015ftik\u00e7e model de de\u011fi\u015fmelidir. Bu d\u00f6ng\u00fcy\u00fc otomatikle\u015ftirmek MLOps\u2019un \u00f6z\u00fcd\u00fcr."
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — MODEL SERİALİZATİON
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Model Serialization: Kaydetme ve Y\u00fckleme", "B\u00d6L\u00dcM 1");

  // Joblib kod blo\u011fu
  card(s, 0.4, 0.95, 4.6, 2.0, { topColor: C.acc });
  T.cardTitle(s, 0.55, 1.1, 4.2, "joblib ile Model Kaydetme", C.acc);
  code(s, 0.55, 1.5, 4.3, 1.3, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "joblib\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "\n", options: { fontSize: 5 } },
    { text: "# Modeli kaydet\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "joblib.dump(model, ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "'model.joblib'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Modeli y\u00fckle\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "model = joblib.load(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "'model.joblib'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);

  // Alternatif y\u00f6ntem
  card(s, 0.4, 3.15, 4.6, 1.85, { topColor: C.sec });
  T.cardTitle(s, 0.55, 3.3, 4.2, "Alternatif: JSON / ONNX Format\u0131", C.sec);
  code(s, 0.55, 3.7, 4.3, 1.15, [
    { text: "# ONNX ile model export\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "skl2onnx\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "onnx_model = skl2onnx.convert(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    model, initial_types=...\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);

  // Sa\u011f: kar\u015f\u0131la\u015ft\u0131rma tablosu
  card(s, 5.2, 0.95, 4.6, 4.05, { topColor: C.purple });
  T.cardTitle(s, 5.4, 1.1, 4.2, "Serialization Y\u00f6ntemleri Kar\u015f\u0131la\u015ft\u0131rma", C.purple);

  const rows = [
    ["\u00d6zellik",       "joblib",          "ONNX"],
    ["NumPy Deste\u011fi", "M\u00fckemmel \u2713",     "Var"],
    ["B\u00fcy\u00fck Dosya",   "S\u0131k\u0131\u015ft\u0131rma var", "Kompakt"],
    ["H\u0131z",           "H\u0131zl\u0131",          "\u00c7ok H\u0131zl\u0131"],
    ["G\u00fcvenlik",      "G\u00fcvenilir kaynak gerekli", "G\u00fcvenli"],
    ["Kullan\u0131m",      "ML modelleri",   "Cross-platform"],
  ];

  rows.forEach((row, i) => {
    const y = 1.55 + i * 0.5;
    const bg = i === 0 ? C.pri : (i % 2 === 0 ? C.warmBg : C.card);
    const txtColor = i === 0 ? "FFFFFF" : C.dark;
    const fSize = i === 0 ? 10 : 9.5;
    const bld = i === 0;

    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y, w: 4.3, h: 0.45, fill: { color: bg } });
    s.addText(row[0], { x: 5.35, y, w: 1.35, h: 0.45, margin: [0, 4], fontFace: "Calibri", fontSize: fSize, bold: bld, color: txtColor, valign: "middle" });
    s.addText(row[1], { x: 6.7,  y, w: 1.5,  h: 0.45, margin: [0, 4], fontFace: "Calibri", fontSize: fSize, bold: bld, color: txtColor, align: "center", valign: "middle" });
    s.addText(row[2], { x: 8.2,  y, w: 1.45, h: 0.45, margin: [0, 4], fontFace: "Calibri", fontSize: fSize, bold: bld, color: txtColor, align: "center", valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — STREAMLİT NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Streamlit Nedir?", "B\u00d6L\u00dcM 2");

  // Tan\u0131m
  card(s, 0.4, 0.95, 9.2, 1.3, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.05, 8.8, "Python ile Web Uygulama Geli\u015ftirme", C.acc);
  T.cardBody(s, 0.6, 1.45, 8.8, 0.7,
    "Streamlit, Python ile interaktif web uygulamalar\u0131 olu\u015fturman\u0131z\u0131 sa\u011flayan a\u00e7\u0131k kaynak bir framework\u2019t\u00fcr. HTML/CSS/JS bilgisi gerektirmez. Tek bir Python dosyas\u0131yla tam i\u015flevsel bir dashboard olu\u015fturabilirsiniz."
  );

  // Avantaj kartlar\u0131
  const advantages = [
    { title: "Tek Dosya",        desc: "T\u00fcm uygulama tek bir\nPython dosyas\u0131nda",        color: C.sec },
    { title: "H\u0131zl\u0131 Prototip",   desc: "Dakikalar i\u00e7inde\n\u00e7al\u0131\u015fan demo",                  color: C.acc },
    { title: "\u00dccretsiz Deploy",  desc: "Streamlit Cloud\nile bedava yay\u0131nlama",           color: C.green },
    { title: "ML Entegrasyonu",  desc: "scikit-learn, TF,\nPyTorch ile uyumlu",           color: C.purple },
  ];

  advantages.forEach((a, i) => {
    const x = 0.4 + i * 2.32;
    card(s, x, 2.5, 2.15, 2.3, { topColor: a.color });
    s.addText(a.title, { x: x + 0.1, y: 2.75, w: 1.95, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: a.color, align: "center" });
    s.addText(a.desc, { x: x + 0.1, y: 3.3, w: 1.95, h: 0.8, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — STREAMLİT TEMEL BİLEŞENLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Streamlit Temel Bile\u015fenler", "B\u00d6L\u00dcM 2");

  const components = [
    ["Bile\u015fen",        "A\u00e7\u0131klama",                       "Kullan\u0131m"],
    ["st.title()",     "Sayfa ba\u015fl\u0131\u011f\u0131",                  "st.title('Ba\u015fl\u0131k')"],
    ["st.write()",     "Metin, tablo, grafik yazd\u0131rma",  "st.write(df)"],
    ["st.slider()",    "Kayd\u0131r\u0131c\u0131 widget",               "st.slider('Ya\u015f', 0, 100)"],
    ["st.selectbox()", "A\u00e7\u0131l\u0131r men\u00fc",                    "st.selectbox('\u015eehir', liste)"],
    ["st.button()",    "Buton widget",                   "st.button('Tahmin Et')"],
    ["st.dataframe()", "DataFrame tablosu",              "st.dataframe(df)"],
    ["st.metric()",    "KPI metrik kart\u0131",               "st.metric('Do\u011fruluk', '%95')"],
  ];

  components.forEach((row, i) => {
    const y = 0.95 + i * 0.55;
    const bg = i === 0 ? C.pri : (i % 2 === 0 ? C.warmBg : C.card);
    const txtColor = i === 0 ? "FFFFFF" : C.dark;
    const fSize = i === 0 ? 10.5 : 10;
    const bld = i === 0;

    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.5, fill: { color: bg } });
    s.addText(row[0], { x: 0.4,  y, w: 2.5, h: 0.5, margin: [0, 8], fontFace: bld ? "Calibri" : "Consolas", fontSize: fSize, bold: bld, color: i === 0 ? "FFFFFF" : C.acc, valign: "middle" });
    s.addText(row[1], { x: 2.9,  y, w: 3.0, h: 0.5, margin: [0, 8], fontFace: "Calibri", fontSize: fSize, bold: bld, color: txtColor, valign: "middle" });
    s.addText(row[2], { x: 5.9,  y, w: 3.7, h: 0.5, margin: [0, 8], fontFace: bld ? "Calibri" : "Consolas", fontSize: i === 0 ? fSize : 9, bold: bld, color: txtColor, valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — STREAMLİT İLE ML DASHBOARD
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Streamlit ile ML Dashboard", "B\u00d6L\u00dcM 2");

  card(s, 0.4, 0.95, 9.2, 4.1, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.1, 8.8, "Tam Bir Streamlit ML Uygulamas\u0131", C.acc);

  code(s, 0.6, 1.5, 8.8, 3.4, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "streamlit ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "st\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "joblib\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "numpy ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "np\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Modeli y\u00fckle\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "model = joblib.load('model.joblib')\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "st.title('Fiyat Tahmin Uygulamas\u0131')\n\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Kullan\u0131c\u0131 girdileri\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "alan = st.slider('Alan (m\u00b2)', 30, 300, 100)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "oda = st.selectbox('Oda Say\u0131s\u0131', [1,2,3,4,5])\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "if ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "st.button('Tahmin Et'):\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    X = np.array([[alan, oda]])\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    fiyat = model.predict(X)[0]\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    st.metric('Tahmini Fiyat', f'{fiyat:,.0f} TL')", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — GRADİO ALTERNATİFİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Gradio Alternatifi", "B\u00d6L\u00dcM 2");

  // Sol: Streamlit
  card(s, 0.4, 0.95, 4.4, 4.05, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.1, 4.0, "Streamlit", C.acc);
  const stItems = [
    "Genel ama\u00e7l\u0131 dashboard",
    "\u00c7oklu sayfa deste\u011fi",
    "Zengin widget k\u00fct\u00fcphanesi",
    "Streamlit Cloud ile deploy",
    "Daha fazla \u00f6zelle\u015ftirme",
    "B\u00fcy\u00fck topluluk",
  ];
  stItems.forEach((item, i) => {
    badge(s, 0.6, 1.55 + i * 0.5, "\u2713", C.acc);
    T.cardBody(s, 1.05, 1.52 + i * 0.5, 3.5, 0.35, item, { size: 10.5 });
  });

  // Sa\u011f: Gradio
  card(s, 5.2, 0.95, 4.6, 4.05, { topColor: C.purple });
  T.cardTitle(s, 5.4, 1.1, 4.2, "Gradio", C.purple);
  const grItems = [
    "ML modeli odakl\u0131 aray\u00fcz",
    "3 sat\u0131r kod ile demo",
    "Otomatik API endpoint",
    "Hugging Face Spaces entegrasyonu",
    "Input/Output tabanl\u0131 tasar\u0131m",
    "H\u0131zl\u0131 prototipleme",
  ];
  grItems.forEach((item, i) => {
    badge(s, 5.4, 1.55 + i * 0.5, "\u2713", C.purple);
    T.cardBody(s, 5.85, 1.52 + i * 0.5, 3.7, 0.35, item, { size: 10.5 });
  });

  // Alt kar\u015f\u0131la\u015ft\u0131rma notu
  card(s, 0.4, 5.15, 9.4, 0.35, { bg: C.warmBg, noShadow: true });
  T.cardBody(s, 0.6, 5.15, 9.0, 0.35, "Dashboard istiyorsan\u0131z Streamlit, h\u0131zl\u0131 ML demo istiyorsan\u0131z Gradio tercih edin.", { size: 10, color: C.mid });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — HUGGİNG FACE SPACES
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Hugging Face Spaces", "B\u00d6L\u00dcM 2");

  // Nedir kart\u0131
  card(s, 0.4, 0.95, 5.5, 1.5, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 5.1, "HF Spaces Nedir?", C.sec);
  T.cardBody(s, 0.6, 1.45, 5.1, 0.9,
    "Hugging Face Spaces, Streamlit veya Gradio uygulamalar\u0131n\u0131z\u0131 \u00fccretsiz olarak bar\u0131nd\u0131ran bir platformdur. GitHub benzeri repo yap\u0131s\u0131yla \u00e7al\u0131\u015f\u0131r, GPU deste\u011fi sunar."
  );

  // Neden kullan\u0131l\u0131r
  card(s, 0.4, 2.65, 5.5, 2.4, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 2.75, 5.1, "Neden Kullan\u0131l\u0131r?", C.acc);
  const hfReasons = [
    { text: "\u00dccretsiz hosting (2 vCPU, 16 GB RAM)", color: C.green },
    { text: "Git tabanl\u0131 versiyon kontrol\u00fc", color: C.acc },
    { text: "Streamlit & Gradio native deste\u011fi", color: C.blue },
    { text: "Docker container deste\u011fi", color: C.purple },
    { text: "GPU eri\u015fimi (\u00fccretli plan)", color: C.amber },
  ];
  hfReasons.forEach((r, i) => {
    badge(s, 0.6, 3.2 + i * 0.36, i + 1, r.color);
    T.cardBody(s, 1.05, 3.17 + i * 0.36, 4.6, 0.34, r.text, { size: 10.5 });
  });

  // Sa\u011f: stat box'lar
  stat(s, 6.2, 0.95, 1.7, 1.25, "300K+", "Space\nPayla\u015f\u0131ld\u0131", C.acc);
  stat(s, 8.1, 0.95, 1.7, 1.25, "0 \u20ac", "\u00dccretsiz\nHosting", C.green);
  stat(s, 6.2, 2.4, 3.6, 1.25, "GPU", "A10G / T4 ile H\u0131zland\u0131rma", C.purple);

  // Alt ipucu
  card(s, 6.2, 3.85, 3.6, 1.2, { topColor: C.amber });
  T.cardTitle(s, 6.35, 4.0, 3.3, "\u0130pucu", C.amber);
  T.cardBody(s, 6.35, 4.35, 3.3, 0.6, "huggingface.co/spaces adresinden binlerce uygulama inceleyerek ilham alabilirsiniz.", { size: 10 });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — HF SPACES DEPLOY
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "HF Spaces Deploy Ad\u0131mlar\u0131", "B\u00d6L\u00dcM 2");

  const deploySteps = [
    { num: "1", title: "Repo Olu\u015ftur",       desc: "huggingface.co \u2192 New Space\nStreamlit veya Gradio se\u00e7in",                    color: C.sec },
    { num: "2", title: "requirements.txt",    desc: "Ba\u011f\u0131ml\u0131l\u0131klar\u0131 listeleyin:\nstreamlit, joblib, scikit-learn, pandas",            color: C.acc },
    { num: "3", title: "app.py Haz\u0131rla",      desc: "Streamlit/Gradio uygulaman\u0131z\u0131\ntek dosyada yaz\u0131n",                               color: C.amber },
    { num: "4", title: "Git Push",            desc: "git add . && git commit\ngit push \u2192 Otomatik deploy!",                      color: C.green },
  ];

  deploySteps.forEach((st, i) => {
    const y = 1.0 + i * 1.1;
    // Ba\u011flant\u0131 \u00e7izgisi
    if (i < 3) {
      s.addShape(pres.shapes.RECTANGLE, { x: 1.05, y: y + 0.85, w: 0.04, h: 0.3, fill: { color: C.secLt } });
    }
    // Numara dairesi
    s.addShape(pres.shapes.OVAL, { x: 0.5, y: y + 0.12, w: 0.55, h: 0.55, fill: { color: st.color } });
    s.addText(st.num, { x: 0.5, y: y + 0.12, w: 0.55, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 20, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    // Kart
    card(s, 1.3, y, 8.3, 0.85, { leftColor: st.color });
    s.addText(st.title, { x: 1.5, y: y + 0.05, w: 3.0, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: C.dark });
    s.addText(st.desc, { x: 1.5, y: y + 0.38, w: 7.8, h: 0.42, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — PROJE YÖNETİMİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Proje Y\u00f6netimi ve Dok\u00fcmantasyon", "B\u00d6L\u00dcM 3");

  // README kart\u0131
  card(s, 0.4, 0.95, 5.2, 4.1, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 4.8, "\u0130yi Bir README Rehberi", C.sec);

  const readmeItems = [
    { section: "Proje Ba\u015fl\u0131\u011f\u0131 & A\u00e7\u0131klama",  desc: "Ne yapar? Neden \u00f6nemli?",            color: C.sec },
    { section: "Kurulum",                     desc: "pip install, gereksinimler",          color: C.acc },
    { section: "Kullan\u0131m",                    desc: "\u00d6rnek kod, ekran g\u00f6r\u00fcnt\u00fcleri",       color: C.amber },
    { section: "Veri Seti",                   desc: "Kaynak, boyut, \u00f6zellikler",          color: C.green },
    { section: "Model & Metrikler",           desc: "Algoritma, accuracy, F1 skoru",      color: C.blue },
    { section: "Demo Linki",                  desc: "HF Spaces / Streamlit Cloud URL",   color: C.purple },
    { section: "Lisans & \u0130leti\u015fim",           desc: "MIT, Apache, katk\u0131da bulunma",       color: C.red },
  ];

  readmeItems.forEach((r, i) => {
    const y = 1.55 + i * 0.48;
    badge(s, 0.6, y, i + 1, r.color);
    s.addText(r.section, { x: 1.08, y, w: 2.0, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText(r.desc, { x: 3.1, y, w: 2.3, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, valign: "middle" });
  });

  // Sa\u011f: Portfolio ipu\u00e7lar\u0131
  card(s, 5.8, 0.95, 4.0, 4.1, { topColor: C.purple });
  T.cardTitle(s, 6.0, 1.1, 3.6, "Portfolio Haz\u0131rlama \u0130pu\u00e7lar\u0131", C.purple);

  const tips = [
    "Her proje i\u00e7in ayr\u0131 repo a\u00e7\u0131n",
    "README.md\u2019de g\u00f6rsel kullan\u0131n",
    "Live demo linki mutlaka ekleyin",
    "Veri temizleme s\u00fcrecini belgeleyin",
    "Model se\u00e7im gerek\u00e7esini a\u00e7\u0131klay\u0131n",
    "Sonu\u00e7lar\u0131 g\u00f6rsellerle destekleyin",
    "GitHub Profile README olu\u015fturun",
  ];

  tips.forEach((tip, i) => {
    const y = 1.55 + i * 0.48;
    s.addText("\u2022", { x: 6.0, y, w: 0.2, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.purple, valign: "middle" });
    T.cardBody(s, 6.2, y, 3.4, 0.35, tip, { size: 10 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — GİTHUB PORTFOLIO
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "GitHub Portfolio: Veri Bilimci Portf\u00f6y\u00fc", "B\u00d6L\u00dcM 3");

  const cards = [
    { title: "Pinned Repositories",   desc: "En iyi 6 projenizi pin\u2019leyin. \u00c7e\u015fitlilik g\u00f6sterin: EDA, ML, NLP, Deep Learning.",                       color: C.sec },
    { title: "README Kalitesi",        desc: "Her repoda detayl\u0131 README: problem tan\u0131m\u0131, veri seti, model, sonu\u00e7lar ve demo linki.",                       color: C.acc },
    { title: "Temiz Kod",             desc: "PEP8 uyumlu, docstring\u2019li, mod\u00fcler yap\u0131da kod. Jupyter Notebook + .py dosyalar\u0131 birlikte.",              color: C.green },
    { title: "Contribution Graph",    desc: "D\u00fczenli commit\u2019ler ye\u015fil kare grafi\u011fini doldurur. S\u00fcreklilik \u00f6nemli, miktar de\u011fil.",                     color: C.purple },
  ];

  cards.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.7;
    const y = 0.95 + row * 2.15;

    card(s, x, y, 4.5, 1.95, { topColor: c.color });
    s.addText(c.title, { x: x + 0.15, y: y + 0.2, w: 4.2, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: c.color, align: "center" });
    T.cardBody(s, x + 0.2, y + 0.7, 4.1, 1.0, c.desc, { size: 10.5 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — CAPSTONE: AİRBNB FİYATLANDIRMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Capstone: Airbnb Fiyatland\u0131rma Tahmini", "B\u00d6L\u00dcM 3");

  // Proje tan\u0131m\u0131
  card(s, 0.4, 0.95, 5.5, 1.5, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 5.1, "Proje Tan\u0131m\u0131", C.sec);
  T.cardBody(s, 0.6, 1.45, 5.1, 0.9,
    "Airbnb listelerinin \u00f6zelliklerinden (konum, oda tipi, yorum say\u0131s\u0131, minimum gece) gecelik fiyat\u0131 tahmin eden bir regresyon modeli geli\u015ftirin."
  );

  // Veri \u00f6zellikleri
  card(s, 0.4, 2.65, 5.5, 2.4, { topColor: C.acc });
  T.cardTitle(s, 0.6, 2.8, 5.1, "Veri Seti \u00d6zellikleri", C.acc);
  const features = [
    ["\u00d6zellik",           "A\u00e7\u0131klama"],
    ["neighbourhood",     "Mahalle / b\u00f6lge bilgisi"],
    ["room_type",         "T\u00fcm ev, \u00f6zel oda, payla\u015f\u0131ml\u0131"],
    ["minimum_nights",    "Minimum konaklama s\u00fcresi"],
    ["number_of_reviews", "Toplam yorum say\u0131s\u0131"],
    ["availability_365",  "Y\u0131ll\u0131k m\u00fcsaitlik g\u00fcn\u00fc"],
    ["price (hedef)",     "Gecelik fiyat (USD)"],
  ];
  features.forEach((row, i) => {
    const y = 3.2 + i * 0.25;
    const bg = i === 0 ? C.pri : (i % 2 === 0 ? C.warmBg : C.card);
    const tc = i === 0 ? "FFFFFF" : C.dark;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y, w: 5.2, h: 0.25, fill: { color: bg } });
    s.addText(row[0], { x: 0.55, y, w: 2.2, h: 0.25, margin: [0, 4], fontFace: i === 0 ? "Calibri" : "Consolas", fontSize: 8.5, bold: i === 0, color: tc, valign: "middle" });
    s.addText(row[1], { x: 2.75, y, w: 3.0, h: 0.25, margin: [0, 4], fontFace: "Calibri", fontSize: 8.5, bold: i === 0, color: tc, valign: "middle" });
  });

  // Sa\u011f: hedefler
  stat(s, 6.2, 0.95, 1.7, 1.15, "48K+", "Kay\u0131t\n(\u0130stanbul)", C.sec);
  stat(s, 8.1, 0.95, 1.7, 1.15, "16+", "\u00d6zellik\nKolonu", C.acc);

  card(s, 6.2, 2.3, 3.6, 2.75, { topColor: C.amber });
  T.cardTitle(s, 6.4, 2.45, 3.2, "Beklenen \u00c7\u0131kt\u0131lar", C.amber);
  const outputs = [
    "EDA + g\u00f6rselle\u015ftirme",
    "Feature engineering",
    "3+ model kar\u015f\u0131la\u015ft\u0131rma",
    "En iyi modeli deploy",
    "Streamlit / Gradio demo",
    "README + sunum",
  ];
  outputs.forEach((o, i) => {
    badge(s, 6.4, 2.85 + i * 0.35, i + 1, C.amber);
    T.cardBody(s, 6.85, 2.82 + i * 0.35, 2.8, 0.32, o, { size: 10 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — CAPSTONE: TRENDYOL YORUM ANALİZİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Capstone: Trendyol Yorum Analizi", "B\u00d6L\u00dcM 3");

  // Proje tan\u0131m\u0131
  card(s, 0.4, 0.95, 9.2, 1.3, { leftColor: C.purple });
  T.cardTitle(s, 0.6, 1.05, 8.8, "Proje Tan\u0131m\u0131: Sentiment Analizi + NLP + ML", C.purple);
  T.cardBody(s, 0.6, 1.45, 8.8, 0.7,
    "Trendyol \u00fcr\u00fcn yorumlar\u0131n\u0131 pozitif/negatif olarak s\u0131n\u0131fland\u0131ran bir NLP modeli. Metin \u00f6n i\u015fleme, TF-IDF vekt\u00f6rizasyonu ve makine \u00f6\u011frenmesi s\u0131n\u0131fland\u0131r\u0131c\u0131lar\u0131 kullanarak duygu analizi yap\u0131n."
  );

  // NLP Pipeline
  const pipeline = [
    { step: "Veri Toplama",     desc: "Web scraping veya\nhaz\u0131r veri seti",     color: C.sec },
    { step: "Metin Temizleme",  desc: "K\u00fc\u00e7\u00fck harf, noktalama,\nstopword \u00e7\u0131karma", color: C.acc },
    { step: "Vekt\u00f6rizasyon",    desc: "TF-IDF veya\nCountVectorizer",            color: C.amber },
    { step: "Model E\u011fitimi",   desc: "Logistic Reg, SVM,\nRandom Forest",       color: C.green },
    { step: "De\u011ferlendirme",   desc: "Confusion matrix,\nF1-score, ROC-AUC",    color: C.blue },
  ];

  pipeline.forEach((p, i) => {
    const x = 0.35 + i * 1.9;
    card(s, x, 2.5, 1.75, 2.0, { topColor: p.color });
    s.addShape(pres.shapes.OVAL, { x: x + 0.6, y: 2.65, w: 0.5, h: 0.5, fill: { color: p.color } });
    s.addText(String(i + 1), { x: x + 0.6, y: 2.65, w: 0.5, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 16, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(p.step, { x: x + 0.1, y: 3.2, w: 1.55, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: p.color, align: "center" });
    s.addText(p.desc, { x: x + 0.1, y: 3.6, w: 1.55, h: 0.7, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, align: "center" });
  });

  // Alt istatistikler
  stat(s, 0.4, 4.7, 2.2, 0.8, "50K+", "Yorum Verisi", C.purple);
  stat(s, 2.8, 4.7, 2.2, 0.8, "%90+", "Hedef Do\u011fruluk", C.green);
  stat(s, 5.2, 4.7, 2.2, 0.8, "TF-IDF", "Vekt\u00f6rizasyon", C.acc);
  stat(s, 7.6, 4.7, 2.2, 0.8, "NLP", "Do\u011fal Dil \u0130\u015fleme", C.blue);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — CAPSTONE: SPOTİFY
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Capstone: Spotify Pop\u00fclerlik Tahmini", "B\u00d6L\u00dcM 3");

  // Proje tan\u0131m\u0131
  card(s, 0.4, 0.95, 5.5, 1.5, { leftColor: C.green });
  T.cardTitle(s, 0.6, 1.05, 5.1, "\u015eark\u0131 \u00d6zellikleri \u2192 Pop\u00fclerlik Skoru", C.green);
  T.cardBody(s, 0.6, 1.45, 5.1, 0.9,
    "Spotify API\u2019dan al\u0131nan \u015fark\u0131 \u00f6zellikleri (danceability, energy, tempo, loudness vb.) kullanarak pop\u00fclerlik skorunu tahmin eden bir regresyon modeli geli\u015ftirin."
  );

  // \u00d6zellik kartlar\u0131 (2x3 grid)
  const feats = [
    { name: "danceability",   desc: "Dans edilebilirlik\n(0.0 - 1.0)",    color: C.sec },
    { name: "energy",         desc: "Enerji seviyesi\n(0.0 - 1.0)",       color: C.acc },
    { name: "tempo",          desc: "BPM (beats per\nminute)",             color: C.amber },
    { name: "loudness",       desc: "Ses y\u00fcksekli\u011fi\n(dB)",               color: C.green },
    { name: "valence",        desc: "Mutluluk skoru\n(0.0 - 1.0)",        color: C.blue },
    { name: "speechiness",    desc: "Konu\u015fma oran\u0131\n(0.0 - 1.0)",         color: C.purple },
  ];

  feats.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.4 + col * 1.85;
    const y = 2.7 + row * 1.25;
    card(s, x, y, 1.7, 1.1, { topColor: f.color });
    s.addText(f.name, { x: x + 0.05, y: y + 0.12, w: 1.6, h: 0.3, margin: 0, fontFace: "Consolas", fontSize: 9, bold: true, color: f.color, align: "center" });
    s.addText(f.desc, { x: x + 0.05, y: y + 0.45, w: 1.6, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, align: "center" });
  });

  // Sa\u011f stat box'lar
  stat(s, 6.2, 0.95, 1.7, 1.15, "170K+", "\u015eark\u0131\nVerisi", C.green);
  stat(s, 8.1, 0.95, 1.7, 1.15, "0-100", "Pop\u00fclerlik\nSkoru", C.purple);

  card(s, 6.2, 2.3, 3.6, 2.75, { topColor: C.blue });
  T.cardTitle(s, 6.4, 2.45, 3.2, "Proje Ad\u0131mlar\u0131", C.blue);
  const spotifySteps = [
    "Spotify API ile veri \u00e7ekme",
    "Korelasyon analizi + EDA",
    "Feature selection",
    "Linear Reg, RF, XGBoost",
    "Streamlit ile demo",
    "HF Spaces\u2019e deploy",
  ];
  spotifySteps.forEach((st, i) => {
    badge(s, 6.4, 2.85 + i * 0.35, i + 1, C.blue);
    T.cardBody(s, 6.85, 2.82 + i * 0.35, 2.8, 0.32, st, { size: 10 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — CAPSTONE DEĞERLENDİRME KRİTERLERİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Capstone De\u011ferlendirme Kriterleri", "B\u00d6L\u00dcM 3");

  const criteria = [
    {
      title: "Teknik Kalite",
      pct: "%40",
      items: "Do\u011fru algoritma se\u00e7imi\nTemiz ve mod\u00fcler kod\nModel performans metrikleri\nHata analizi ve iyile\u015ftirme",
      color: C.sec,
    },
    {
      title: "Sunum & Dok\u00fcmantasyon",
      pct: "%20",
      items: "README kalitesi\nG\u00f6rselle\u015ftirme zenginli\u011fi\nSunum ak\u0131\u015f\u0131\nSonu\u00e7lar\u0131n yorumlanmas\u0131",
      color: C.acc,
    },
    {
      title: "Yenilik\u00e7ilik",
      pct: "%20",
      items: "\u00d6zg\u00fcn yakla\u015f\u0131m\nEk veri kaynaklar\u0131\nYarat\u0131c\u0131 feature engineering\nFarkl\u0131 model denemeleri",
      color: C.amber,
    },
    {
      title: "Deploy & Demo",
      pct: "%20",
      items: "\u00c7al\u0131\u015fan web uygulamas\u0131\nKullan\u0131c\u0131 dostu aray\u00fcz\nHF Spaces veya Streamlit Cloud\nAPI endpoint (bonus)",
      color: C.purple,
    },
  ];

  criteria.forEach((c, i) => {
    const x = 0.3 + i * 2.4;
    card(s, x, 0.95, 2.2, 4.05, { topColor: c.color });

    // Y\u00fczde dairesi
    s.addShape(pres.shapes.OVAL, { x: x + 0.7, y: 1.15, w: 0.8, h: 0.8, fill: { color: c.color } });
    s.addText(c.pct, { x: x + 0.7, y: 1.15, w: 0.8, h: 0.8, margin: 0, fontFace: "Georgia", fontSize: 16, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

    s.addText(c.title, { x: x + 0.1, y: 2.05, w: 2.0, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: c.color, align: "center" });

    // Items
    const lines = c.items.split("\n");
    lines.forEach((line, j) => {
      s.addText("\u2022  " + line, { x: x + 0.15, y: 2.5 + j * 0.42, w: 1.9, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.dark, valign: "middle" });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 18 — HAFTALIK NOTEBOOK'LAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Haftal\u0131k Notebook\u2019lar", "B\u00d6L\u00dcM 3");

  const notebooks = [
    {
      title: "mlops_pipeline.ipynb",
      desc: "Model e\u011fitimi, joblib ile kaydetme/y\u00fckleme, basit pipeline olu\u015fturma. sklearn Pipeline + ColumnTransformer kullan\u0131m\u0131.",
      topics: ["joblib", "Pipeline", "ColumnTransformer", "cross_val_score"],
      color: C.sec,
    },
    {
      title: "streamlit_app.py",
      desc: "E\u011fitilmi\u015f modeli Streamlit ile web uygulamas\u0131na d\u00f6n\u00fc\u015ft\u00fcrme. Kullan\u0131c\u0131dan input alma ve tahmin g\u00f6sterme.",
      topics: ["st.slider", "st.selectbox", "st.metric", "model.predict"],
      color: C.acc,
    },
    {
      title: "capstone_sablon.ipynb",
      desc: "Capstone proje \u015fablonu: veri y\u00fckleme, EDA, model e\u011fitimi, de\u011ferlendirme ve raporlama b\u00f6l\u00fcmleri haz\u0131r.",
      topics: ["Proje yap\u0131s\u0131", "EDA \u015fablonu", "Model kar\u015f\u0131la\u015ft\u0131rma", "Raporlama"],
      color: C.amber,
    },
  ];

  notebooks.forEach((nb, i) => {
    const y = 0.95 + i * 1.5;
    card(s, 0.4, y, 9.2, 1.35, { leftColor: nb.color });

    // Notebook title
    s.addText(nb.title, { x: 0.65, y: y + 0.08, w: 4.0, h: 0.35, margin: 0, fontFace: "Consolas", fontSize: 12, bold: true, color: nb.color });

    // A\u00e7\u0131klama
    T.cardBody(s, 0.65, y + 0.45, 5.8, 0.45, nb.desc, { size: 10 });

    // Konu etiketleri
    nb.topics.forEach((topic, j) => {
      const tx = 6.8 + (j % 2) * 1.55;
      const ty = y + 0.1 + Math.floor(j / 2) * 0.55;
      s.addShape(pres.shapes.RECTANGLE, { x: tx, y: ty, w: 1.45, h: 0.4, fill: { color: C.warmBg }, line: { color: nb.color, width: 1 } });
      s.addText(topic, { x: tx, y: ty, w: 1.45, h: 0.4, margin: 0, fontFace: "Consolas", fontSize: 8, color: nb.color, align: "center", valign: "middle" });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "\u00d6dev ve Kaynaklar", "B\u00d6L\u00dcM 3");

  // \u00d6dev kart\u0131
  card(s, 0.4, 0.95, 4.5, 4.1, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 4.1, "Capstone Proje \u00d6devi", C.sec);

  const tasks = [
    { task: "Proje konusu se\u00e7in", desc: "Airbnb, Trendyol veya Spotify\u2019dan birini se\u00e7in (veya kendi konunuzu \u00f6nerin)", color: C.sec },
    { task: "Proje plan\u0131 haz\u0131rlay\u0131n", desc: "Veri kayna\u011f\u0131, hedef de\u011fi\u015fken, kullan\u0131lacak algoritmalar, zaman \u00e7izelgesi", color: C.acc },
    { task: "Veri setini haz\u0131rlay\u0131n", desc: "Veriyi indirin, ilk EDA\u2019y\u0131 yap\u0131n, temizleme stratejisi belirleyin", color: C.amber },
    { task: "GitHub repo a\u00e7\u0131n", desc: "README.md \u015fablonunu doldurun, .gitignore ekleyin, ilk commit", color: C.green },
  ];

  tasks.forEach((t, i) => {
    const y = 1.55 + i * 0.62;
    badge(s, 0.6, y, i + 1, t.color);
    s.addText(t.task, { x: 1.08, y, w: 3.6, h: 0.25, margin: 0, fontFace: "Georgia", fontSize: 10.5, bold: true, color: C.dark });
    s.addText(t.desc, { x: 1.08, y: y + 0.25, w: 3.6, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid });
  });

  // Teslim tarihi
  card(s, 0.6, 4.15, 4.1, 0.55, { bg: C.accPale, noShadow: true });
  s.addText("Teslim: Hafta 10 ders ba\u015flang\u0131c\u0131", { x: 0.75, y: 4.15, w: 3.8, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.acc, valign: "middle" });

  // Sa\u011f: Kaynaklar
  card(s, 5.1, 0.95, 4.7, 4.1, { topColor: C.purple });
  T.cardTitle(s, 5.3, 1.1, 4.3, "Faydal\u0131 Kaynaklar", C.purple);

  const resources = [
    { title: "Streamlit Dok\u00fcmantasyon",          url: "docs.streamlit.io",                  color: C.acc },
    { title: "Gradio Dok\u00fcmantasyon",             url: "gradio.app/docs",                    color: C.purple },
    { title: "Hugging Face Spaces",              url: "huggingface.co/spaces",              color: C.amber },
    { title: "Kaggle Datasets",                  url: "kaggle.com/datasets",                color: C.blue },
    { title: "Inside Airbnb",                    url: "insideairbnb.com",                   color: C.sec },
    { title: "Spotify Web API",                  url: "developer.spotify.com",              color: C.green },
    { title: "MLOps Principles",                 url: "ml-ops.org",                         color: C.red },
  ];

  resources.forEach((r, i) => {
    const y = 1.55 + i * 0.48;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y, w: 0.08, h: 0.35, fill: { color: r.color } });
    s.addText(r.title, { x: 5.5, y, w: 2.5, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText(r.url, { x: 8.0, y, w: 1.7, h: 0.35, margin: 0, fontFace: "Consolas", fontSize: 7.5, color: C.blue, valign: "middle", align: "right" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 9 \u00d6zet",
  [
    { text: "MLOps, modelin \u00fcretim ortam\u0131na ge\u00e7i\u015fini ve ya\u015fam d\u00f6ng\u00fcs\u00fcn\u00fc y\u00f6netir",  color: C.sec },
    { text: "joblib ile model serialization, Streamlit ile interaktif demo olu\u015fturma",                                          color: C.acc },
    { text: "Hugging Face Spaces \u00fccretsiz deploy platformu olarak g\u00fc\u00e7l\u00fc bir se\u00e7enek",                      color: C.amber },
    { text: "Capstone projesi t\u00fcm \u00f6\u011frenilenleri tek bir projede birle\u015ftirir",                                    color: C.green },
    { text: "\u0130yi bir GitHub portfolio, i\u015f ba\u015fvurular\u0131nda fark yarat\u0131r",                                     color: C.purple },
  ],
  "En iyi model \u00fcretimde \u00e7al\u0131\u015fan modeldir.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// KAYDET
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta09_mlops_capstone.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("Sunum olusturuldu: " + outPath);
}).catch(err => {
  console.error("Hata:", err);
});
