/**
 * Hafta 10 — Derin Öğrenmeye Giriş ve Yapay Sinir Ağları
 * =======================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 10: Derin Öğrenme ve Yapay Sinir Ağları");
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
  "Derin Öğrenme\nve Yapay\nSinir Ağları",
  "Hafta 10 · Modül 10\nNörondan Derin Ağlara: TensorFlow/Keras ile Uygulama",
  "Dr. Murat Altun",
  [
    { value: "6",    label: "Saat" },
    { value: "3",    label: "Notebook" },
    { value: "98%+", label: "MNIST Hedef" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "İçindekiler", null);

  const sections = [
    { num: "01", title: "Nöron Temelleri",     items: "Biyolojik nöron · Yapay nöron · Aktivasyon fonksiyonları · İleri/Geri yayılım", color: C.sec,    slides: "Slayt 3–9" },
    { num: "02", title: "ANN Mimarisi",        items: "Loss fonksiyonları · Optimizer'lar · Epoch · Batch Size · Learning Rate", color: C.acc,    slides: "Slayt 8–12" },
    { num: "03", title: "TensorFlow / Keras",  items: "Sequential model · MNIST · Overfitting önleme · Google QuickDraw", color: C.amber,  slides: "Slayt 10–16" },
    { num: "04", title: "Uygulamalar",         items: "ANN vs Klasik ML · Notebook'lar · Ödev ve kaynaklar", color: C.purple, slides: "Slayt 17–20" },
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
// SLAYT 3 — BİYOLOJİK NÖRONDAN YAPAY NÖRONA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Biyolojik Nörondan Yapay Nörona", "BÖLÜM 1");

  // Sol kart: Biyolojik Nöron
  card(s, 0.4, 0.95, 4.3, 4.3, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 3.9, "Biyolojik Nöron", C.sec);

  const bioItems = [
    { label: "Dendrit",       desc: "Sinyalleri alır (girdiler)" },
    { label: "Soma (Hücre)",  desc: "Sinyalleri işler (toplama)" },
    { label: "Akson",         desc: "Çıktıyı iletir" },
    { label: "Sinaps",        desc: "Diğer nöronlara bağlantı (ağırlık)" },
    { label: "Eşik değeri",   desc: "Ateşleme kararı (aktivasyon)" },
  ];
  bioItems.forEach((item, i) => {
    const y = 1.55 + i * 0.65;
    badge(s, 0.6, y, i + 1, C.sec);
    s.addText(item.label, { x: 1.08, y, w: 1.5, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.pri });
    s.addText(item.desc, { x: 2.55, y, w: 2.0, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid, valign: "middle" });
  });

  // Ok (ortada)
  s.addText("→", { x: 4.55, y: 2.7, w: 0.9, h: 0.6, margin: 0, fontFace: "Georgia", fontSize: 36, bold: true, color: C.acc, align: "center", valign: "middle" });

  // Sağ kart: Yapay Nöron
  card(s, 5.3, 0.95, 4.3, 4.3, { topColor: C.acc });
  T.cardTitle(s, 5.5, 1.1, 3.9, "Yapay Nöron (Perceptron)", C.acc);

  const artItems = [
    { label: "Girdiler (x)",     desc: "Veri özellikleri (features)" },
    { label: "Ağırlıklar (w)",   desc: "Bağlantı gücü (öğrenilir)" },
    { label: "Toplama (Σ)",      desc: "w₁x₁ + w₂x₂ + ... + b" },
    { label: "Aktivasyon (f)",   desc: "Doğrusal olmayan dönüşüm" },
    { label: "Çıktı (ŷ)",       desc: "Tahmin değeri" },
  ];
  artItems.forEach((item, i) => {
    const y = 1.55 + i * 0.65;
    badge(s, 5.5, y, i + 1, C.acc);
    s.addText(item.label, { x: 5.98, y, w: 1.7, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.pri });
    s.addText(item.desc, { x: 7.6, y, w: 1.85, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid, valign: "middle" });
  });

  // Alt formül kutusu
  card(s, 0.4, 5.05, 9.2, 0.45, { bg: C.warmBg });
  s.addText("Formül:  ŷ = f( Σ wᵢxᵢ + b )    →   Biyolojik nöronun matematiksel modeli", {
    x: 0.6, y: 5.05, w: 8.8, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 12, color: C.dark, italic: true, valign: "middle"
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — YAPAY SİNİR AĞI MİMARİSİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Yapay Sinir Ağı (ANN) Mimarisi", "BÖLÜM 1");

  // 3 katman kartı
  const layers = [
    { title: "Input Layer\n(Giriş Katmanı)", desc: "Veri özelliklerini alır.\nHer özellik bir nöron.\nÖrnek: 784 piksel → 784 nöron", color: C.blue, x: 0.4 },
    { title: "Hidden Layer(s)\n(Gizli Katmanlar)", desc: "Öğrenmenin gerçekleştiği yer.\nHer nöron bir özellik öğrenir.\nDerin = çok gizli katman", color: C.acc, x: 3.55 },
    { title: "Output Layer\n(Çıkış Katmanı)", desc: "Sonuç üretir.\nSınıflandırma: softmax\nRegresyon: lineer", color: C.sec, x: 6.7 },
  ];

  layers.forEach((l, i) => {
    card(s, l.x, 0.95, 2.95, 2.5, { topColor: l.color });
    s.addText(l.title, { x: l.x + 0.15, y: 1.1, w: 2.65, h: 0.7, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: l.color, align: "center" });
    s.addText(l.desc, { x: l.x + 0.15, y: 1.85, w: 2.65, h: 1.4, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark });
    // Ok
    if (i < 2) {
      s.addText("→", { x: l.x + 2.85, y: 1.6, w: 0.8, h: 0.6, margin: 0, fontFace: "Georgia", fontSize: 28, bold: true, color: C.mid, align: "center", valign: "middle" });
    }
  });

  // Alt kart: Ağırlıklar ve Bias
  card(s, 0.4, 3.65, 4.4, 1.8, { leftColor: C.purple });
  T.cardTitle(s, 0.6, 3.75, 4.0, "Ağırlıklar (Weights) ve Bias", C.purple);
  T.cardBody(s, 0.6, 4.15, 4.0, 1.1,
    "• Ağırlık (w): Bağlantının önemi — büyük w = güçlü sinyal\n• Bias (b): Eşik değeri — nöronun ne kadar kolay ateşleneceği\n• Eğitim = En iyi w ve b değerlerini bulmak"
  );

  // Alt sağ kart: Terminoloji
  card(s, 5.05, 3.65, 4.55, 1.8, { leftColor: C.amber });
  T.cardTitle(s, 5.25, 3.75, 4.15, "Temel Terminoloji", C.amber);
  const terms = [
    ["Derin Öğrenme",    "2+ gizli katmanlı ağ"],
    ["Fully Connected",  "Her nöron bir sonraki katmana bağlı"],
    ["Parametre",        "Toplam ağırlık + bias sayısı"],
  ];
  terms.forEach((t, i) => {
    const y = 4.2 + i * 0.38;
    s.addText(t[0], { x: 5.25, y, w: 1.8, h: 0.34, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark });
    s.addText(t[1], { x: 7.05, y, w: 2.55, h: 0.34, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — AKTİVASYON FONKSİYONLARI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Aktivasyon Fonksiyonları", "BÖLÜM 1");

  // Tablo başlığı
  const colX = [0.4, 2.2, 4.6, 6.8];
  const colW = [1.8, 2.4, 2.2, 3.0];
  const headers = ["Fonksiyon", "Formül", "Aralık", "Kullanım Alanı"];

  // Başlık satırı
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 0.95, w: 9.2, h: 0.45, fill: { color: C.pri } });
  headers.forEach((h, i) => {
    s.addText(h, { x: colX[i], y: 0.95, w: colW[i], h: 0.45, margin: [0,5,0,5], fontFace: "Georgia", fontSize: 11, bold: true, color: "FFFFFF", valign: "middle" });
  });

  const rows = [
    { fn: "ReLU", formula: "max(0, x)", range: "[0, +∞)", usage: "Gizli katmanlar (varsayılan)", color: C.green },
    { fn: "Sigmoid", formula: "1 / (1 + e⁻ˣ)", range: "(0, 1)", usage: "İkili sınıflandırma çıkışı", color: C.blue },
    { fn: "Softmax", formula: "eˣⁱ / Σeˣʲ", range: "(0, 1) toplam=1", usage: "Çoklu sınıf çıkışı", color: C.purple },
    { fn: "Tanh", formula: "(eˣ − e⁻ˣ)/(eˣ + e⁻ˣ)", range: "(-1, 1)", usage: "RNN, gizli katmanlar", color: C.amber },
    { fn: "Leaky ReLU", formula: "max(0.01x, x)", range: "(-∞, +∞)", usage: "Dying ReLU sorununa çözüm", color: C.red },
  ];

  rows.forEach((r, i) => {
    const y = 1.45 + i * 0.68;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.62, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    // Color dot
    s.addShape(pres.shapes.OVAL, { x: 0.5, y: y + 0.2, w: 0.22, h: 0.22, fill: { color: r.color } });
    s.addText(r.fn, { x: 0.8, y, w: 1.4, h: 0.62, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark, valign: "middle" });
    s.addText(r.formula, { x: 2.2, y, w: 2.4, h: 0.62, margin: [0,5,0,5], fontFace: "Consolas", fontSize: 10, color: C.pri, valign: "middle" });
    s.addText(r.range, { x: 4.6, y, w: 2.2, h: 0.62, margin: [0,5,0,5], fontFace: "Calibri", fontSize: 10.5, color: C.mid, valign: "middle" });
    s.addText(r.usage, { x: 6.8, y, w: 3.0, h: 0.62, margin: [0,5,0,5], fontFace: "Calibri", fontSize: 10.5, color: C.dark, valign: "middle" });
  });

  // Alt ipucu
  card(s, 0.4, 4.95, 9.2, 0.55, { bg: C.accPale });
  s.addText("💡 Pratik Kural:  Gizli katman → ReLU  |  İkili çıkış → Sigmoid  |  Çoklu sınıf → Softmax", {
    x: 0.6, y: 4.95, w: 8.8, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 12, bold: true, color: C.acc, valign: "middle"
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — İLERİ YAYILIM (FORWARD PROPAGATION)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "İleri Yayılım (Forward Propagation)", "BÖLÜM 1");

  // Adım adım akış
  const steps = [
    { num: 1, title: "Girdi Al",        desc: "x₁, x₂, ..., xₙ özellik değerleri ağa verilir", color: C.blue },
    { num: 2, title: "Ağırlıkla Çarp",  desc: "Her girdi kendi ağırlığıyla çarpılır: wᵢ × xᵢ", color: C.acc },
    { num: 3, title: "Topla + Bias",    desc: "z = Σ(wᵢ × xᵢ) + b  (ağırlıklı toplam)", color: C.amber },
    { num: 4, title: "Aktivasyon Uygula", desc: "a = f(z) — doğrusal olmayan dönüşüm", color: C.purple },
    { num: 5, title: "Sonraki Katmana",  desc: "Çıktı bir sonraki katmanın girdisi olur", color: C.sec },
    { num: 6, title: "Tahmin Üret",      desc: "Son katman çıktısı = modelin tahmini (ŷ)", color: C.green },
  ];

  steps.forEach((st, i) => {
    const col = i % 2 === 0 ? 0 : 1;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.7;
    const y = 0.95 + row * 1.35;

    card(s, x, y, 4.4, 1.15, { leftColor: st.color });
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.2, w: 0.5, h: 0.5, fill: { color: st.color } });
    s.addText(String(st.num), { x: x + 0.15, y: y + 0.2, w: 0.5, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(st.title, { x: x + 0.8, y: y + 0.12, w: 3.3, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: C.dark });
    s.addText(st.desc, { x: x + 0.8, y: y + 0.55, w: 3.3, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.mid });
  });

  // Formül kutusu
  card(s, 0.4, 5.0, 9.2, 0.5, { bg: C.warmBg });
  s.addText("Tam Akış:   x → (w·x + b) → f(z) → a → ... → ŷ    (katman katman ilerler)", {
    x: 0.6, y: 5.0, w: 8.8, h: 0.5, margin: 0, fontFace: "Consolas", fontSize: 11.5, color: C.pri, valign: "middle"
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — GERİ YAYILIM (BACKPROPAGATION)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Geri Yayılım (Backpropagation)", "BÖLÜM 1");

  // Sol: Gradient Descent açıklama
  card(s, 0.4, 0.95, 4.4, 2.6, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 4.0, "Gradient Descent (Gradyan İnişi)", C.sec);
  T.cardBody(s, 0.6, 1.5, 4.0, 1.9,
    "Amaç: Loss fonksiyonunu minimize etmek.\n\n" +
    "1. Tahmin yap (forward pass)\n" +
    "2. Hatayı hesapla (loss)\n" +
    "3. Gradyanları hesapla (∂L/∂w)\n" +
    "4. Ağırlıkları güncelle:\n   w = w − η × ∂L/∂w"
  );

  // Sağ: Chain Rule
  card(s, 5.05, 0.95, 4.55, 2.6, { topColor: C.acc });
  T.cardTitle(s, 5.25, 1.1, 4.15, "Zincir Kuralı (Chain Rule)", C.acc);
  T.cardBody(s, 5.25, 1.5, 4.15, 1.9,
    "Türev zinciri ile her ağırlığın hataya katkısı hesaplanır:\n\n" +
    "∂L/∂w₁ = ∂L/∂ŷ × ∂ŷ/∂z × ∂z/∂w₁\n\n" +
    "• Çıkıştan girişe doğru geriye gider\n" +
    "• Her katmandaki gradyan hesaplanır\n" +
    "• Tüm ağırlıklar eş zamanlı güncellenir"
  );

  // Alt: Adım adım özet
  card(s, 0.4, 3.75, 9.2, 1.7, { bg: C.warmBg });
  T.cardTitle(s, 0.6, 3.85, 8.8, "Backpropagation Döngüsü", C.purple);

  const cycle = [
    { step: "Forward Pass", icon: "→", desc: "Girdi → Tahmin", clr: C.blue },
    { step: "Loss Hesapla", icon: "⚡", desc: "Hata ölçümü", clr: C.red },
    { step: "Backward Pass", icon: "←", desc: "Gradyan hesapla", clr: C.amber },
    { step: "Güncelle", icon: "↻", desc: "w = w − η∇L", clr: C.green },
  ];
  cycle.forEach((c, i) => {
    const x = 0.6 + i * 2.25;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.3, w: 2.0, h: 0.95, fill: { color: C.card }, line: { color: c.clr, width: 1.5 }, shadow: T.mkShadow() });
    s.addText(c.icon, { x, y: 4.3, w: 2.0, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 16, color: c.clr, align: "center" });
    s.addText(c.step, { x, y: 4.62, w: 2.0, h: 0.28, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark, align: "center" });
    s.addText(c.desc, { x, y: 4.88, w: 2.0, h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — LOSS FONKSİYONLARI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Loss (Kayıp) Fonksiyonları", "BÖLÜM 2");

  const losses = [
    {
      title: "MSE\n(Mean Squared Error)",
      formula: "L = (1/n) Σ(yᵢ − ŷᵢ)²",
      usage: "Regresyon problemleri",
      detail: "Büyük hatalara daha fazla ceza verir.\nEv fiyat tahmini, sıcaklık tahmini.",
      color: C.blue,
    },
    {
      title: "Binary\nCross-Entropy",
      formula: "L = −[y·log(ŷ) + (1−y)·log(1−ŷ)]",
      usage: "İkili sınıflandırma",
      detail: "Sigmoid çıkışı ile kullanılır.\nSpam/normal, hasta/sağlıklı.",
      color: C.acc,
    },
    {
      title: "Categorical\nCross-Entropy",
      formula: "L = −Σ yᵢ·log(ŷᵢ)",
      usage: "Çoklu sınıflandırma",
      detail: "Softmax çıkışı ile kullanılır.\nMNIST (0–9), hayvan türü.",
      color: C.purple,
    },
  ];

  losses.forEach((l, i) => {
    const x = 0.4 + i * 3.15;
    card(s, x, 0.95, 2.9, 4.3, { topColor: l.color });
    s.addText(l.title, { x: x + 0.15, y: 1.1, w: 2.6, h: 0.65, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: l.color, align: "center" });

    // Formül kutusu
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 1.85, w: 2.6, h: 0.55, fill: { color: C.codeBg } });
    s.addText(l.formula, { x: x + 0.25, y: 1.85, w: 2.4, h: 0.55, margin: 0, fontFace: "Consolas", fontSize: 9, color: C.codeYellow, valign: "middle" });

    // Kullanım rozeti
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 2.55, w: 2.6, h: 0.35, fill: { color: l.color } });
    s.addText(l.usage, { x: x + 0.15, y: 2.55, w: 2.6, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

    // Detay
    s.addText(l.detail, { x: x + 0.25, y: 3.1, w: 2.4, h: 1.9, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — OPTIMIZER'LAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Optimizer'lar: SGD vs Adam", "BÖLÜM 2");

  // SGD kartı
  card(s, 0.4, 0.95, 4.4, 3.0, { topColor: C.blue });
  T.cardTitle(s, 0.6, 1.1, 4.0, "SGD (Stochastic Gradient Descent)", C.blue);
  const sgdItems = [
    "En temel optimizer",
    "w = w − η × ∇L",
    "Sabit learning rate kullanır",
    "Basit ama yavaş yakınsama",
    "Momentum eklenebilir (hız artışı)",
    "Avantaj: Anlaması kolay, az bellek",
  ];
  sgdItems.forEach((item, i) => {
    s.addText("•  " + item, { x: 0.6, y: 1.55 + i * 0.37, w: 4.0, h: 0.34, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark });
  });

  // Adam kartı
  card(s, 5.2, 0.95, 4.4, 3.0, { topColor: C.green });
  T.cardTitle(s, 5.4, 1.1, 4.0, "Adam (Adaptive Moment)", C.green);
  const adamItems = [
    "Momentum + RMSProp birleşimi",
    "Adaptif learning rate (her w için)",
    "Hızlı yakınsama",
    "Varsayılan tercih (çoğu projede)",
    "β₁=0.9, β₂=0.999, ε=1e-8",
    "Avantaj: Hiper parametre hassasiyeti az",
  ];
  adamItems.forEach((item, i) => {
    s.addText("•  " + item, { x: 5.4, y: 1.55 + i * 0.37, w: 4.0, h: 0.34, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark });
  });

  // Alt: Learning Rate önemi
  card(s, 0.4, 4.15, 9.2, 1.35, { leftColor: C.amber });
  T.cardTitle(s, 0.6, 4.25, 8.8, "Learning Rate (η) — Öğrenme Hızı", C.amber);

  const lrCards = [
    { val: "η çok küçük", eff: "Çok yavaş öğrenir,\nepoch israfı", clr: C.blue },
    { val: "η ideal", eff: "Hızlı ve kararlı\nyakınsama", clr: C.green },
    { val: "η çok büyük", eff: "Salınım yapar,\nöğrenemez", clr: C.red },
  ];
  lrCards.forEach((lr, i) => {
    const x = 0.7 + i * 3.0;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.7, w: 2.6, h: 0.65, fill: { color: lr.clr }, shadow: T.mkShadow() });
    s.addText(lr.val, { x, y: 4.7, w: 1.1, h: 0.65, margin: [0,5,0,8], fontFace: "Georgia", fontSize: 10, bold: true, color: "FFFFFF", valign: "middle" });
    s.addText(lr.eff, { x: x + 1.1, y: 4.7, w: 1.5, h: 0.65, margin: [0,5,0,0], fontFace: "Calibri", fontSize: 9.5, color: "FFFFFF", valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — TENSORFLOW VE KERAS
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "TensorFlow ve Keras", "BÖLÜM 3");

  // Sol: TensorFlow
  card(s, 0.4, 0.95, 4.4, 2.4, { topColor: C.amber });
  T.cardTitle(s, 0.6, 1.1, 4.0, "TensorFlow Nedir?", C.amber);
  T.cardBody(s, 0.6, 1.5, 4.0, 1.7,
    "• Google tarafından geliştirilen açık kaynak kütüphane\n" +
    "• Tensör tabanlı hesaplama grafikleri\n" +
    "• GPU/TPU desteği ile hızlı eğitim\n" +
    "• Üretim ortamı (TF Serving, TF Lite)\n" +
    "• Dünya çapında en yaygın DL framework'ü"
  );

  // Sağ: Keras
  card(s, 5.05, 0.95, 4.55, 2.4, { topColor: C.red });
  T.cardTitle(s, 5.25, 1.1, 4.15, "Keras Neden?", C.red);
  T.cardBody(s, 5.25, 1.5, 4.15, 1.7,
    "• TensorFlow'un yüksek seviye API'si\n" +
    "• Hızlı prototipleme (az kodla çok iş)\n" +
    "• Okunabilir ve sezgisel sözdizimi\n" +
    "• Eğitim için ideal başlangıç noktası\n" +
    "• tf.keras olarak TF 2.x'e entegre"
  );

  // Alt: Ekosistem
  card(s, 0.4, 3.55, 9.2, 1.95, { bg: C.warmBg });
  T.cardTitle(s, 0.6, 3.65, 8.8, "TensorFlow Ekosistemi", C.purple);

  const eco = [
    { name: "TensorFlow Core",   desc: "Düşük seviye hesaplama", clr: C.amber },
    { name: "Keras (tf.keras)",   desc: "Yüksek seviye model API", clr: C.red },
    { name: "TF Data",            desc: "Veri pipeline'ları", clr: C.blue },
    { name: "TensorBoard",        desc: "Görselleştirme aracı", clr: C.acc },
    { name: "TF Lite",            desc: "Mobil/Edge cihazlar", clr: C.green },
    { name: "TF Serving",         desc: "Üretim deploy", clr: C.purple },
  ];
  eco.forEach((e, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.6 + col * 3.05;
    const y = 4.05 + row * 0.7;
    s.addShape(pres.shapes.OVAL, { x, y: y + 0.06, w: 0.22, h: 0.22, fill: { color: e.clr } });
    s.addText(e.name, { x: x + 0.3, y, w: 1.5, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark });
    s.addText(e.desc, { x: x + 1.8, y, w: 1.2, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — SEQUENTIAL MODEL OLUŞTURMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Keras Sequential Model Oluşturma", "BÖLÜM 3");

  // Kod bloğu
  code(s, 0.4, 0.95, 5.8, 3.8, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "tensorflow as tf\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "tensorflow.keras.models ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "Sequential\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "tensorflow.keras.layers ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "Dense\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },

    { text: "# Model oluştur\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 10 } },
    { text: "model = Sequential([\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    Dense(", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "128, activation='relu', input_shape=(784,)", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    Dense(", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "64, activation='relu'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    Dense(", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "10, activation='softmax'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\n])\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },

    { text: "# Compile\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 10 } },
    { text: "model.compile(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    optimizer=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "'adam'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ",\n    loss=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "'categorical_crossentropy'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ",\n    metrics=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "['accuracy']", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "\n)", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
  ]);

  // Sağ: Açıklama kartları
  card(s, 6.4, 0.95, 3.2, 1.15, { leftColor: C.blue });
  T.cardTitle(s, 6.55, 1.05, 2.9, "Katman 1 — Dense(128)", C.blue);
  T.cardBody(s, 6.55, 1.35, 2.9, 0.6, "128 nöron, ReLU aktivasyon.\n784 girdi → 128 çıktı.");

  card(s, 6.4, 2.25, 3.2, 1.15, { leftColor: C.acc });
  T.cardTitle(s, 6.55, 2.35, 2.9, "Katman 2 — Dense(64)", C.acc);
  T.cardBody(s, 6.55, 2.65, 2.9, 0.6, "64 nöron, ReLU aktivasyon.\nÖzellik çıkarma katmanı.");

  card(s, 6.4, 3.55, 3.2, 1.15, { leftColor: C.purple });
  T.cardTitle(s, 6.55, 3.65, 2.9, "Katman 3 — Dense(10)", C.purple);
  T.cardBody(s, 6.55, 3.95, 2.9, 0.6, "10 nöron, Softmax aktivasyon.\n10 sınıf olasılıkları.");

  // Alt: model.summary() bilgi
  card(s, 0.4, 4.95, 9.2, 0.55, { bg: C.accPale });
  s.addText("model.summary()  →  Toplam parametre: 109,386  (128×784 + 128 + 64×128 + 64 + 10×64 + 10)", {
    x: 0.6, y: 4.95, w: 8.8, h: 0.55, margin: 0, fontFace: "Consolas", fontSize: 10, color: C.acc, valign: "middle"
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — EPOCH, BATCH SIZE, LEARNING RATE
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Eğitim Hiper Parametreleri", "BÖLÜM 3");

  // 3 stat box
  stat(s, 0.4, 0.95, 2.9, 1.4, "Epoch", "Tüm veriyi kaç kez\ngöreceği", C.sec);
  stat(s, 3.55, 0.95, 2.9, 1.4, "Batch", "Bir adımda kaç\nörnek işleneceği", C.acc);
  stat(s, 6.7, 0.95, 2.9, 1.4, "η (LR)", "Ağırlık güncelleme\nadım büyüklüğü", C.amber);

  // Detay kartları
  const params = [
    {
      title: "Epoch Sayısı",
      items: [
        "1 epoch = tüm eğitim verisinin 1 tur geçişi",
        "Az epoch → underfitting (yetersiz öğrenme)",
        "Çok epoch → overfitting (ezber)",
        "Tipik: 10–100 epoch (veri boyutuna göre)",
        "Early Stopping ile otomatik durdurma",
      ],
      color: C.sec,
    },
    {
      title: "Batch Size",
      items: [
        "Mini-batch: veriyi parçalar halinde işle",
        "Küçük batch (32): daha iyi genelleme, yavaş",
        "Büyük batch (256+): hızlı ama bellek gerekir",
        "Varsayılan: 32 (dengeli tercih)",
        "GPU belleğine göre ayarlanır",
      ],
      color: C.acc,
    },
    {
      title: "Learning Rate",
      items: [
        "En kritik hiper parametre",
        "Tipik başlangıç: 0.001 (Adam için)",
        "LR Scheduler ile eğitim sırasında azaltma",
        "ReduceLROnPlateau: plato → küçült",
        "Warmup: düşük LR ile başla, artır",
      ],
      color: C.amber,
    },
  ];

  params.forEach((p, i) => {
    const x = 0.4 + i * 3.15;
    card(s, x, 2.55, 2.9, 2.95, { topColor: p.color });
    T.cardTitle(s, x + 0.15, 2.7, 2.6, p.title, p.color);
    p.items.forEach((item, j) => {
      s.addText("•  " + item, { x: x + 0.15, y: 3.1 + j * 0.35, w: 2.6, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.dark });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — MNIST EL YAZISI TANIMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "MNIST El Yazısı Rakam Tanıma", "BÖLÜM 3");

  // Üst: stat boxes
  stat(s, 0.4, 0.95, 2.15, 1.3, "60K", "Eğitim\nGörüntüsü", C.blue);
  stat(s, 2.75, 0.95, 2.15, 1.3, "10K", "Test\nGörüntüsü", C.acc);
  stat(s, 5.1, 0.95, 2.15, 1.3, "28×28", "Piksel\nBoyutu", C.purple);
  stat(s, 7.45, 0.95, 2.15, 1.3, "0–9", "Sınıf\nSayısı", C.sec);

  // Alt sol: Veri seti açıklama
  card(s, 0.4, 2.5, 4.5, 2.95, { leftColor: C.blue });
  T.cardTitle(s, 0.6, 2.6, 4.1, "Veri Seti Hakkında", C.blue);
  T.cardBody(s, 0.6, 3.0, 4.1, 2.2,
    "• Yann LeCun tarafından oluşturuldu (1998)\n" +
    "• \"Hello World\" of Deep Learning\n" +
    "• Gri tonlama: 0 (siyah) – 255 (beyaz)\n" +
    "• Normalize: piksel/255 → [0,1]\n" +
    "• Flatten: 28×28 → 784 boyutlu vektör\n" +
    "• Label: One-hot encoding (10 sınıf)\n" +
    "• Keras'ta hazır: tf.keras.datasets.mnist"
  );

  // Alt sağ: Ön işleme adımları
  card(s, 5.15, 2.5, 4.45, 2.95, { topColor: C.acc });
  T.cardTitle(s, 5.35, 2.65, 4.05, "Ön İşleme Adımları", C.acc);

  const prepSteps = [
    { num: 1, text: "Veriyi yükle: mnist.load_data()", clr: C.blue },
    { num: 2, text: "Normalize et: X / 255.0", clr: C.acc },
    { num: 3, text: "Flatten: reshape(-1, 784)", clr: C.purple },
    { num: 4, text: "One-hot: to_categorical(y, 10)", clr: C.amber },
    { num: 5, text: "Train/Test split (hazır geliyor)", clr: C.green },
  ];
  prepSteps.forEach((st, i) => {
    const y = 3.1 + i * 0.44;
    badge(s, 5.35, y, st.num, st.clr);
    s.addText(st.text, { x: 5.8, y, w: 3.6, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark, valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — MNIST MODEL KODU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "MNIST — Tam Kod Örneği", "BÖLÜM 3");

  code(s, 0.4, 0.95, 6.2, 4.5, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "tensorflow as tf\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "tensorflow.keras.utils ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "to_categorical\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },

    { text: "# 1. Veri yükle\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "(X_train, y_train), (X_test, y_test) = \\\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    tf.keras.datasets.mnist.load_data()\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },

    { text: "# 2. Ön işleme\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "X_train = X_train.reshape(-1, 784) / ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "255.0\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "X_test  = X_test.reshape(-1, 784) / ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "255.0\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "y_train = to_categorical(y_train, ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "10", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "y_test  = to_categorical(y_test, ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "10", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },

    { text: "# 3. Model\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "model = tf.keras.Sequential([\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    Dense(256, activation=", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "'relu'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ", input_shape=(784,)),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    Dense(128, activation=", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "'relu'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    Dense(10,  activation=", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "'softmax'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n])\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },

    { text: "# 4. Eğit\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "model.compile(optimizer=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "'adam'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ", loss=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "'categorical_crossentropy'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ",\n                metrics=[", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "'accuracy'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "])\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "model.fit(X_train, y_train, epochs=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "20", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ", batch_size=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "32", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ",\n          validation_split=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "0.2", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },

    { text: "# 5. Değerlendir\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "loss, acc = model.evaluate(X_test, y_test)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f'Test Accuracy: {acc:.4f}')", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
  ]);

  // Sağ: Sonuçlar
  card(s, 6.8, 0.95, 2.8, 2.0, { topColor: C.green });
  T.cardTitle(s, 6.95, 1.1, 2.5, "Beklenen Sonuçlar", C.green);
  T.cardBody(s, 6.95, 1.5, 2.5, 1.3,
    "• Eğitim acc: ~99.5%\n• Test acc: ~98.2%\n• Eğitim süresi: ~2 dk\n• Parametre: ~235K"
  );

  card(s, 6.8, 3.15, 2.8, 2.3, { topColor: C.amber });
  T.cardTitle(s, 6.95, 3.3, 2.5, "Önemli Notlar", C.amber);
  T.cardBody(s, 6.95, 3.7, 2.5, 1.5,
    "• validation_split ile aşırı öğrenme takibi\n• Epoch artışı = daha iyi (bir yere kadar)\n• batch_size GPU belleğine göre ayarla"
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — OVERFITTING ÖNLEME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Overfitting (Aşırı Öğrenme) Önleme", "BÖLÜM 3");

  const methods = [
    {
      title: "Dropout",
      desc: "Eğitim sırasında rastgele nöronları kapat.\nHer epoch'ta farklı alt ağ eğitilir.\nModel tek bir yola bağımlı kalmaz.",
      code: "model.add(Dropout(0.3))\n# %30 nöron rastgele kapatılır",
      color: C.blue,
      icon: "🎲",
    },
    {
      title: "Early Stopping",
      desc: "Validation loss artmaya başlayınca dur.\nPatience: kaç epoch bekle.\nEn iyi modeli geri yükle.",
      code: "EarlyStopping(\n  patience=5,\n  restore_best_weights=True\n)",
      color: C.acc,
      icon: "⏱",
    },
    {
      title: "Regularization",
      desc: "Ağırlıklara ceza ekle (L1/L2).\nBüyük ağırlıkları küçültür.\nModel basitliğini teşvik eder.",
      code: "Dense(64,\n  kernel_regularizer=\n    l2(0.01)\n)",
      color: C.purple,
      icon: "⚖",
    },
  ];

  methods.forEach((m, i) => {
    const x = 0.4 + i * 3.15;
    card(s, x, 0.95, 2.9, 4.5, { topColor: m.color });

    // İkon + Başlık
    s.addText(m.icon, { x: x + 0.15, y: 1.1, w: 0.5, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 22, align: "center" });
    s.addText(m.title, { x: x + 0.6, y: 1.1, w: 2.1, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: m.color, valign: "middle" });

    // Açıklama
    T.cardBody(s, x + 0.15, 1.65, 2.6, 1.2, m.desc);

    // Kod kutusu
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 3.0, w: 2.6, h: 1.2, fill: { color: C.codeBg } });
    s.addText(m.code, { x: x + 0.25, y: 3.05, w: 2.4, h: 1.1, margin: 0, fontFace: "Consolas", fontSize: 9, color: C.codeGreen });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — GOOGLE QUICKDRAW
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Google Quick, Draw! ile Çizim Tanıma", "BÖLÜM 3");

  // Sol: Veri seti tanıtımı
  card(s, 0.4, 0.95, 5.0, 2.5, { topColor: C.amber });
  T.cardTitle(s, 0.6, 1.1, 4.6, "Quick, Draw! Veri Seti", C.amber);
  T.cardBody(s, 0.6, 1.5, 4.6, 1.8,
    "• Google'ın interaktif çizim oyunu verileri\n" +
    "• 345 kategori, 50M+ çizim\n" +
    "• Her çizim: 28×28 piksel (MNIST benzeri)\n" +
    "• Gerçek insan çizimleri (gürültülü veri)\n" +
    "• .npy formatında indirilebilir\n" +
    "• quickdraw.readthedocs.io"
  );

  // Sağ: Stat boxes
  stat(s, 5.6, 0.95, 1.95, 1.1, "345", "Kategori", C.amber);
  stat(s, 7.75, 0.95, 1.85, 1.1, "50M+", "Çizim", C.acc);

  stat(s, 5.6, 2.2, 1.95, 1.1, "28px", "Boyut", C.blue);
  stat(s, 7.75, 2.2, 1.85, 1.1, ".npy", "Format", C.purple);

  // Alt: Uygulama adımları
  card(s, 0.4, 3.65, 9.2, 1.85, { bg: C.warmBg });
  T.cardTitle(s, 0.6, 3.75, 8.8, "Notebook Uygulaması: 10 Kategori Sınıflandırma", C.acc);

  const appSteps = [
    { num: 1, text: "10 kategori seç (kedi, köpek, araba, ev, ağaç...)", clr: C.blue },
    { num: 2, text: "Her kategoriden 10.000 çizim indir (.npy)", clr: C.acc },
    { num: 3, text: "Normalize et (/ 255.0) ve train/test split", clr: C.purple },
    { num: 4, text: "Dense ANN modeli oluştur ve eğit", clr: C.amber },
    { num: 5, text: "Confusion matrix ile sonuçları değerlendir", clr: C.green },
  ];
  appSteps.forEach((st, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i < 3 ? i : i - 3;
    const x = 0.6 + col * 4.6;
    const y = 4.15 + row * 0.4;
    badge(s, x, y, st.num, st.clr);
    s.addText(st.text, { x: x + 0.45, y, w: 4.0, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark, valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — ANN vs KLASİK ML
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "ANN vs Klasik Makine Öğrenmesi", "BÖLÜM 4");

  // Tablo başlıkları
  const cols = [
    { x: 0.4, w: 2.2, label: "Kriter" },
    { x: 2.6, w: 3.3, label: "Klasik ML (RF, SVM, XGB)" },
    { x: 5.9, w: 3.7, label: "Yapay Sinir Ağları (ANN)" },
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 0.95, w: 9.2, h: 0.45, fill: { color: C.pri } });
  cols.forEach(c => {
    s.addText(c.label, { x: c.x, y: 0.95, w: c.w, h: 0.45, margin: [0,8,0,8], fontFace: "Georgia", fontSize: 11, bold: true, color: "FFFFFF", valign: "middle" });
  });

  const rows = [
    { kriter: "Doğruluk (Tabular)", ml: "Genellikle daha iyi (XGBoost güçlü)", ann: "Tabular veride bazen geride", icon: "📊" },
    { kriter: "Doğruluk (Görüntü)", ml: "Sınırlı (özellik çıkarma gerekir)", ann: "Çok üstün (CNN ile)", icon: "🖼" },
    { kriter: "Eğitim Süresi", ml: "Hızlı (dakikalar)", ann: "Yavaş (GPU gerekebilir)", icon: "⏱" },
    { kriter: "Veri Gereksinimi", ml: "Az veriyle çalışabilir", ann: "Çok veri ister (1000+)", icon: "📦" },
    { kriter: "Yorumlanabilirlik", ml: "Yüksek (feature importance)", ann: "Düşük (kara kutu)", icon: "🔍" },
    { kriter: "Özellik Mühendisliği", ml: "Manuel gerekir", ann: "Otomatik öğrenir", icon: "⚙" },
    { kriter: "GPU İhtiyacı", ml: "Gerekmez", ann: "Büyük modellerde şart", icon: "🖥" },
  ];

  rows.forEach((r, i) => {
    const y = 1.45 + i * 0.56;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.5, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    s.addText(r.icon + " " + r.kriter, { x: 0.4, y, w: 2.2, h: 0.5, margin: [0,8,0,8], fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText(r.ml, { x: 2.6, y, w: 3.3, h: 0.5, margin: [0,8,0,8], fontFace: "Calibri", fontSize: 10, color: C.mid, valign: "middle" });
    s.addText(r.ann, { x: 5.9, y, w: 3.7, h: 0.5, margin: [0,8,0,8], fontFace: "Calibri", fontSize: 10, color: C.mid, valign: "middle" });
  });

  // Alt sonuç
  card(s, 0.4, 5.0, 9.2, 0.5, { bg: C.accPale });
  s.addText("Sonuç: Tabular veri → Klasik ML (XGBoost)  |  Görüntü/Metin/Ses → Derin Öğrenme (ANN/CNN/RNN)", {
    x: 0.6, y: 5.0, w: 8.8, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 11.5, bold: true, color: C.acc, valign: "middle"
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
      title: "ann_temel.ipynb",
      desc: "Yapay sinir ağı temellerini öğrenme notebook'u.",
      items: [
        "Basit ANN oluşturma (from scratch)",
        "Aktivasyon fonksiyonlarını görselleştirme",
        "Forward/Backward pass implementasyonu",
        "Numpy ile gradient descent",
      ],
      color: C.sec,
      icon: "🧠",
    },
    {
      title: "quickdraw.ipynb",
      desc: "Google Quick, Draw! çizim tanıma uygulaması.",
      items: [
        "10 kategori veri indirme (.npy)",
        "Keras Sequential model oluşturma",
        "Eğitim ve validation takibi",
        "Confusion matrix analizi",
      ],
      color: C.acc,
      icon: "✏",
    },
    {
      title: "ann_regresyon.ipynb",
      desc: "ANN ile regresyon problemi çözme.",
      items: [
        "Boston/California Housing veri seti",
        "MSE loss ile model eğitimi",
        "Tahmin vs gerçek scatter plot",
        "Klasik ML ile karşılaştırma",
      ],
      color: C.amber,
      icon: "📈",
    },
  ];

  notebooks.forEach((nb, i) => {
    const x = 0.4 + i * 3.15;
    card(s, x, 0.95, 2.9, 4.5, { topColor: nb.color });

    s.addText(nb.icon, { x: x + 0.15, y: 1.1, w: 0.5, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 22, align: "center" });
    s.addText(nb.title, { x: x + 0.6, y: 1.1, w: 2.15, h: 0.45, margin: 0, fontFace: "Consolas", fontSize: 11, bold: true, color: nb.color, valign: "middle" });

    T.cardBody(s, x + 0.15, 1.65, 2.6, 0.55, nb.desc, { size: 10, italic: true });

    nb.items.forEach((item, j) => {
      badge(s, x + 0.15, 2.35 + j * 0.5, j + 1, nb.color);
      s.addText(item, { x: x + 0.6, y: 2.35 + j * 0.5, w: 2.15, h: 0.42, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark, valign: "middle" });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ödev ve Kaynaklar", "BÖLÜM 4");

  // Sol: Ödevler
  card(s, 0.4, 0.95, 4.5, 4.5, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 4.1, "Bu Hafta Yapılacaklar", C.sec);

  const tasks = [
    { task: "MNIST %98+ doğruluk hedefi", detail: "Katman sayısı, nöron sayısı, dropout ile deneme", clr: C.red },
    { task: "QuickDraw 10 kategori sınıflandırma", detail: "Kendi seçtiğin 10 kategori ile model eğit", clr: C.acc },
    { task: "ANN Regresyon notebook", detail: "Housing veri seti ile fiyat tahmini", clr: C.blue },
    { task: "Hiperparametre deneyleri", detail: "Epoch, batch, LR değiştirerek sonuçları karşılaştır", clr: C.amber },
    { task: "TensorBoard görselleştirme", detail: "Eğitim/validation loss grafiklerini incele", clr: C.purple },
  ];
  tasks.forEach((t, i) => {
    const y = 1.55 + i * 0.75;
    badge(s, 0.6, y, i + 1, t.clr);
    s.addText(t.task, { x: 1.08, y, w: 3.6, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark });
    s.addText(t.detail, { x: 1.08, y: y + 0.3, w: 3.6, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, italic: true });
  });

  // Sağ: Kaynaklar
  card(s, 5.15, 0.95, 4.45, 4.5, { topColor: C.acc });
  T.cardTitle(s, 5.35, 1.1, 4.05, "Önerilen Kaynaklar", C.acc);

  const resources = [
    { name: "TensorFlow Resmi Dökümantasyon", url: "tensorflow.org/tutorials", clr: C.amber },
    { name: "3Blue1Brown — Neural Networks", url: "youtube.com (görsel açıklama)", clr: C.blue },
    { name: "Deep Learning with Python", url: "François Chollet (Keras yaratıcısı)", clr: C.red },
    { name: "Google Quick, Draw! Dataset", url: "quickdraw.withgoogle.com", clr: C.acc },
    { name: "Keras Örnekleri", url: "keras.io/examples", clr: C.green },
    { name: "Playground TensorFlow", url: "playground.tensorflow.org", clr: C.purple },
  ];
  resources.forEach((r, i) => {
    const y = 1.55 + i * 0.62;
    s.addShape(pres.shapes.OVAL, { x: 5.35, y: y + 0.06, w: 0.22, h: 0.22, fill: { color: r.clr } });
    s.addText(r.name, { x: 5.65, y, w: 3.75, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 10.5, bold: true, color: C.dark });
    s.addText(r.url, { x: 5.65, y: y + 0.28, w: 3.75, h: 0.26, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.acc, italic: true });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 10 — Özet",
  [
    { text: "Yapay nöron, biyolojik nöronun matematiksel modelidir: ŷ = f(Σwx + b)", color: C.sec },
    { text: "Forward → Loss → Backward → Update döngüsü ile ağ öğrenir", color: C.acc },
    { text: "Keras ile 10 satır kodda güçlü modeller oluşturulabilir", color: C.amber },
    { text: "Dropout + Early Stopping + Regularization ile overfitting önlenir", color: C.purple },
    { text: "Bölüm 3 başlıyor: Derin öğrenme yolculuğu artık CNN ve RNN ile devam edecek", color: C.green },
  ],
  "Yapay sinir ağları, insan beyninin öğrenme biçimini taklit eden en güçlü araçtır.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// KAYDET
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta10_derin_ogrenme.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("PPTX kaydedildi:", outPath))
  .catch(err => { console.error("HATA:", err); process.exit(1); });
