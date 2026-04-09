/**
 * Hafta 5 — Makine Öğrenmesi I: Regresyon
 * =========================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 5: Makine Öğrenmesi I — Regresyon");
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
  "Makine\nÖğrenmesi I:\nRegresyon",
  "Hafta 5 · Modül 5",
  "Dr. Murat Altun",
  [
    { value: "6",  label: "Saat" },
    { value: "4",  label: "Notebook" },
    { value: "3",  label: "Regresyon Türü" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "İçindekiler", null);

  const sections = [
    { num: "01", title: "ML Temelleri",        items: "Denetimli · Denetimsiz · Pekiştirmeli öğrenme · Regresyon vs Sınıflandırma", color: C.sec,    slides: "Slayt 3–4" },
    { num: "02", title: "Regresyon Modelleri",  items: "Basit lineer · Çoklu lineer · Polinom regresyon · Train/Test Split", color: C.acc,    slides: "Slayt 5–9" },
    { num: "03", title: "Model Değerlendirme",  items: "MAE · MSE · RMSE · R² · Feature Engineering · Pipeline", color: C.amber,  slides: "Slayt 10–14" },
    { num: "04", title: "Deployment",           items: "Model kaydetme · Gradio arayüz · Hugging Face Spaces · Ödev", color: C.purple, slides: "Slayt 15–20" },
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
// SLAYT 3 — MAKİNE ÖĞRENMESİ NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Makine Öğrenmesi Nedir?", "BÖLÜM 1");

  const types = [
    { title: "Denetimli Öğrenme", desc: "Etiketli veri ile eğitim. Model, giriş-çıkış ilişkisini öğrenir. Regresyon ve sınıflandırma bu kategoridedir.", color: C.sec },
    { title: "Denetimsiz Öğrenme", desc: "Etiketsiz veride örüntü keşfi. Kümeleme (K-Means), boyut indirgeme (PCA) gibi yöntemler kullanılır.", color: C.acc },
    { title: "Pekiştirmeli Öğrenme", desc: "Ödül-ceza mekanizması ile öğrenme. Ajan, ortamla etkileşerek en iyi stratejiyi keşfeder (oyunlar, robotik).", color: C.purple },
  ];

  types.forEach((t, i) => {
    const x = 0.4 + i * 3.1;
    card(s, x, 1.0, 2.85, 3.5, { topColor: t.color });
    T.cardTitle(s, x + 0.15, 1.25, 2.55, t.title, t.color);
    T.cardBody(s, x + 0.15, 1.7, 2.55, 2.6, t.desc);
  });

  // Alt bilgi barı
  card(s, 0.4, 4.65, 9.2, 0.55, { bg: C.warmBg });
  T.cardBody(s, 0.6, 4.65, 8.8, 0.55, "Bu derste odağımız: Denetimli Öğrenme → Regresyon. Sürekli bir sayısal değeri (fiyat, sıcaklık, satış) tahmin etmek.", { size: 10.5, color: C.pri });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — DENETİMLİ ÖĞRENME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Denetimli Öğrenme: Regresyon vs Sınıflandırma", "BÖLÜM 1");

  // Sol kart — Regresyon
  card(s, 0.4, 1.0, 4.3, 3.8, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.2, 3.9, "Regresyon (Sürekli Çıktı)", C.sec);
  const regItems = [
    "Çıktı: Sürekli sayısal değer (ör: 345.000 TL)",
    "Ev fiyat tahmini",
    "Araç değer tahmini",
    "Sıcaklık tahmini",
    "Satış miktarı öngörüsü",
  ];
  regItems.forEach((item, i) => {
    const y = 1.7 + i * 0.5;
    badge(s, 0.6, y, i + 1, C.sec);
    T.cardBody(s, 1.05, y, 3.45, 0.4, item);
  });

  // Sağ kart — Sınıflandırma
  card(s, 5.0, 1.0, 4.6, 3.8, { topColor: C.acc });
  T.cardTitle(s, 5.2, 1.2, 4.2, "Sınıflandırma (Kategorik Çıktı)", C.acc);
  const clsItems = [
    "Çıktı: Kategori (ör: spam / spam değil)",
    "E-posta sınıflandırma",
    "Hastalık teşhisi",
    "Müşteri kaybı tahmini",
    "Görüntü tanıma (kedi/köpek)",
  ];
  clsItems.forEach((item, i) => {
    const y = 1.7 + i * 0.5;
    badge(s, 5.2, y, i + 1, C.acc);
    T.cardBody(s, 5.65, y, 3.75, 0.4, item);
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — BASİT LİNEER REGRESYON
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Basit Lineer Regresyon", "BÖLÜM 2");

  // Formül kutusu
  card(s, 0.4, 1.0, 5.2, 1.4, { bg: C.warmBg, topColor: C.pri });
  s.addText("y = mx + b", { x: 0.6, y: 1.15, w: 4.8, h: 0.65, margin: 0, fontFace: "Georgia", fontSize: 32, bold: true, color: C.pri, align: "center" });
  s.addText("y: tahmin · m: eğim (katsayı) · x: bağımsız değişken · b: kesişim (intercept)", { x: 0.6, y: 1.82, w: 4.8, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid, align: "center" });

  // Sağ üst — analoji
  card(s, 5.85, 1.0, 3.75, 1.4, { leftColor: C.acc });
  T.cardTitle(s, 6.05, 1.1, 3.35, "Görsel Analoji", C.acc);
  T.cardBody(s, 6.05, 1.5, 3.35, 0.8, "Noktalar arasından en iyi geçen doğruyu çizmek — tüm noktaların hatalarının karelerinin toplamını minimize eden çizgi.");

  // Açıklama kartları
  const details = [
    { title: "Amaç", text: "Bağımsız değişken (X) ile bağımlı değişken (Y) arasındaki doğrusal ilişkiyi modellemek.", color: C.sec },
    { title: "OLS (En Küçük Kareler)", text: "Hata karelerinin toplamını minimize eden m ve b değerlerini bulur. sklearn bu hesaplamayı otomatik yapar.", color: C.acc },
    { title: "Varsayımlar", text: "Doğrusallık, bağımsızlık, homojenlik (sabit varyans), normal dağılım. Gerçek dünyada nadiren tam karşılanır.", color: C.purple },
  ];

  details.forEach((d, i) => {
    const x = 0.4 + i * 3.1;
    card(s, x, 2.65, 2.85, 2.15, { topColor: d.color });
    T.cardTitle(s, x + 0.15, 2.82, 2.55, d.title, d.color);
    T.cardBody(s, x + 0.15, 3.2, 2.55, 1.4, d.text);
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — LİNEER REGRESYON KODU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Lineer Regresyon — Python Kodu", "BÖLÜM 2");

  code(s, 0.4, 1.0, 5.6, 3.8, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.linear_model ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "LinearRegression\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.model_selection ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "train_test_split\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Veriyi ayir\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "X_train, X_test, y_train, y_test = train_test_split(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    X, y, ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "test_size=0.2", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ", ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "random_state=42", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Model olustur ve egit\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "model = LinearRegression()\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "model.fit(X_train, y_train)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Tahmin\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "y_pred = model.predict(X_test)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "f\"R2 Skoru: {model.score(X_test, y_test):.4f}\"", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);

  // Sağ panel — açıklama adımları
  const steps = [
    { num: "1", title: "Import", desc: "LinearRegression ve train_test_split kütüphanelerini yükle" },
    { num: "2", title: "Veri Ayır", desc: "%80 eğitim, %20 test olarak böl" },
    { num: "3", title: "Eğit", desc: "fit() metodu ile modeli eğit" },
    { num: "4", title: "Tahmin", desc: "predict() ile test verisi üzerinde tahmin yap" },
    { num: "5", title: "Değerlendir", desc: "R2 skoru ile modelin başarısını ölç" },
  ];

  steps.forEach((st, i) => {
    const y = 1.0 + i * 0.76;
    badge(s, 6.2, y + 0.05, st.num, C.acc);
    s.addText(st.title, { x: 6.65, y, w: 3.0, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.pri });
    s.addText(st.desc, { x: 6.65, y: y + 0.3, w: 3.0, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — ÇOKLU LİNEER REGRESYON
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Çoklu Lineer Regresyon", "BÖLÜM 2");

  // Formül
  card(s, 0.4, 1.0, 9.2, 1.1, { bg: C.warmBg, topColor: C.pri });
  s.addText("y = b0 + b1*x1 + b2*x2 + ... + bn*xn", { x: 0.6, y: 1.08, w: 8.8, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 26, bold: true, color: C.pri, align: "center" });
  s.addText("Birden fazla bağımsız değişken ile tahmin — her xi bir özellik (feature), her bi o özelliğin katsayısı", { x: 0.6, y: 1.6, w: 8.8, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid, align: "center" });

  // Ev fiyat örneği
  card(s, 0.4, 2.35, 5.2, 2.8, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 2.45, 4.8, "Ev Fiyat Tahmini Örneği", C.sec);

  // Tablo başlık
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.9, w: 4.8, h: 0.35, fill: { color: C.pri } });
  ["Özellik (Feature)", "Katsayı (bi)", "Yorum"].forEach((h, i) => {
    s.addText(h, { x: 0.6 + i * 1.6, y: 2.9, w: 1.6, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  });

  const rows = [
    ["m2 (Alan)", "+2.500 TL/m2", "Alan arttıkça fiyat artar"],
    ["Oda Sayısı", "+15.000 TL/oda", "Her oda fiyatı yükseltir"],
    ["Şehir Merkezi", "-1.200 TL/km", "Merkeze yakınlık değerli"],
    ["Bina Yaşı", "-800 TL/yıl", "Eski bina fiyatı düşürür"],
  ];

  rows.forEach((row, i) => {
    const y = 3.25 + i * 0.42;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 4.8, h: 0.42, fill: { color: bg } });
    row.forEach((cell, j) => {
      s.addText(cell, { x: 0.6 + j * 1.6, y, w: 1.6, h: 0.42, margin: [0, 4, 0, 4], fontFace: "Calibri", fontSize: 9, color: C.dark, align: "center", valign: "middle" });
    });
  });

  // Sağ panel — avantajlar
  card(s, 5.85, 2.35, 3.75, 2.8, { topColor: C.acc });
  T.cardTitle(s, 6.05, 2.52, 3.35, "Tek vs Çoklu Regresyon", C.acc);
  const points = [
    "Tek değişken -> sınırlı bilgi",
    "Çoklu değişken -> gerçekçi model",
    "Multicollinearity riski kontrol et",
    "Feature selection önemli",
    "Overfitting'e dikkat!",
  ];
  points.forEach((p, i) => {
    badge(s, 6.05, 3.0 + i * 0.4, i + 1, i < 2 ? C.green : C.amber);
    T.cardBody(s, 6.5, 3.0 + i * 0.4, 3.0, 0.35, p, { size: 9.5 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — POLİNOM REGRESYON
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Polinom Regresyon", "BÖLÜM 2");

  // Açıklama
  card(s, 0.4, 1.0, 5.2, 1.6, { leftColor: C.purple });
  T.cardTitle(s, 0.6, 1.1, 4.8, "Doğrusal Olmayan İlişkiler", C.purple);
  T.cardBody(s, 0.6, 1.5, 4.8, 1.0, "Veriler doğrusal bir ilişki göstermediğinde, polinom terimler (x2, x3, ...) ekleyerek eğrisel bir model oluşturabiliriz. Dikkat: Yüksek dereceler overfitting'e yol açabilir!");

  // Formül
  card(s, 5.85, 1.0, 3.75, 1.6, { bg: C.warmBg, topColor: C.purple });
  s.addText("y = b0 + b1*x + b2*x2", { x: 6.05, y: 1.18, w: 3.35, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 20, bold: true, color: C.purple, align: "center" });
  s.addText("Derece 2 (quadratic) örneği\nDerece arttıkça model karmaşıklaşır", { x: 6.05, y: 1.75, w: 3.35, h: 0.7, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, align: "center" });

  // Kod bloğu
  code(s, 0.4, 2.85, 9.2, 2.3, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.preprocessing ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "PolynomialFeatures\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.linear_model ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "LinearRegression\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Polinom ozellikleri olustur (derece=2)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "poly = PolynomialFeatures(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "degree=2", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "X_poly = poly.fit_transform(X_train)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Lineer regresyon uygula (polinom ozelliklerle)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "model = LinearRegression()\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "model.fit(X_poly, y_train)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Test verisini de donustur\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "X_test_poly = poly.transform(X_test)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "y_pred = model.predict(X_test_poly)", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — TRAIN/TEST SPLIT
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Train/Test Split", "BÖLÜM 2");

  // Neden ayırıyoruz?
  card(s, 0.4, 1.0, 4.4, 2.0, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.18, 4.0, "Neden Veriyi Ayırıyoruz?", C.sec);
  const reasons = [
    "Modelin görmediği veri üzerinde test etmek",
    "Overfitting'i (aşırı öğrenme) tespit etmek",
    "Gerçek dünya performansını ölçmek",
    "Genelleme yeteneğini doğrulamak",
  ];
  reasons.forEach((r, i) => {
    badge(s, 0.6, 1.65 + i * 0.32, i + 1, C.sec);
    T.cardBody(s, 1.05, 1.65 + i * 0.32, 3.55, 0.3, r, { size: 9.5 });
  });

  // Görsel açıklama — oranlar
  card(s, 5.05, 1.0, 4.55, 2.0, { topColor: C.acc });
  T.cardTitle(s, 5.25, 1.18, 4.15, "Yaygın Bölme Oranları", C.acc);

  // Progress bar benzeri gösterim
  const splits = [
    { label: "%80 / %20", trainW: 3.2, testW: 0.8, note: "En yaygın (varsayılan)" },
    { label: "%70 / %30", trainW: 2.8, testW: 1.2, note: "Küçük veri setleri" },
    { label: "%90 / %10", trainW: 3.6, testW: 0.4, note: "Büyük veri setleri" },
  ];
  splits.forEach((sp, i) => {
    const y = 1.7 + i * 0.4;
    s.addText(sp.label, { x: 5.25, y, w: 0.9, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 8.5, bold: true, color: C.dark });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: y + 0.03, w: sp.trainW, h: 0.22, fill: { color: C.green } });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.2 + sp.trainW, y: y + 0.03, w: sp.testW, h: 0.22, fill: { color: C.red } });
    s.addText(sp.note, { x: 6.2 + sp.trainW + sp.testW + 0.1, y, w: 1.5, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 7.5, color: C.mid });
  });

  // Kod
  code(s, 0.4, 3.2, 9.2, 1.8, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.model_selection ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "train_test_split\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Veriyi %80 egitim, %20 test olarak bol\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "X_train, X_test, y_train, y_test = train_test_split(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    X, y,\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    test_size=0.2", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ",        ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# %20 test\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "    random_state=42", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "     ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Tekrarlanabilirlik\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: ")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — BAŞARI METRİKLERİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Regresyon Başarı Metrikleri", "BÖLÜM 3");

  // Tablo başlık
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.4, fill: { color: C.pri } });
  const headers = ["Metrik", "Formül", "Açıklama", "İdeal Değer"];
  const colW = [1.3, 2.8, 3.6, 1.5];
  let cx = 0.4;
  headers.forEach((h, i) => {
    s.addText(h, { x: cx, y: 1.0, w: colW[i], h: 0.4, margin: [0, 4, 0, 4], fontFace: "Calibri", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    cx += colW[i];
  });

  const metrics = [
    { name: "MAE", formula: "SUM|yi - yi_hat| / n", desc: "Ortalama Mutlak Hata — Tahmin hatalarının ortalama büyüklüğü", ideal: "0'a yakın", color: C.green },
    { name: "MSE", formula: "SUM(yi - yi_hat)^2 / n", desc: "Ortalama Kare Hata — Büyük hataları daha çok cezalandırır", ideal: "0'a yakın", color: C.blue },
    { name: "RMSE", formula: "SQRT(MSE)", desc: "MSE'nin karekökü — Y birimi ile aynı ölçekte, yorumlaması kolay", ideal: "0'a yakın", color: C.amber },
    { name: "R2", formula: "1 - (SS_res / SS_tot)", desc: "Belirleme katsayısı — Modelin varyansı ne kadar açıkladığı", ideal: "1'e yakın", color: C.purple },
  ];

  metrics.forEach((m, i) => {
    const y = 1.4 + i * 0.85;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.85, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });

    // Metrik adı (renkli rozet)
    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: y + 0.2, w: 1.0, h: 0.4, fill: { color: m.color } });
    s.addText(m.name, { x: 0.55, y: y + 0.2, w: 1.0, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

    s.addText(m.formula, { x: 1.7, y, w: 2.8, h: 0.85, margin: 0, fontFace: "Consolas", fontSize: 10, color: C.dark, align: "center", valign: "middle" });
    s.addText(m.desc, { x: 4.5, y, w: 3.6, h: 0.85, margin: [0, 6, 0, 6], fontFace: "Calibri", fontSize: 9.5, color: C.dark, valign: "middle" });
    s.addText(m.ideal, { x: 8.1, y, w: 1.5, h: 0.85, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: m.color, align: "center", valign: "middle" });
  });

  // Alt not
  card(s, 0.4, 4.85, 9.2, 0.45, { bg: C.warmBg });
  T.cardBody(s, 0.6, 4.85, 8.8, 0.45, "Tek bir metriğe güvenmeyin! R2 yüksek olsa bile residual (artık) analizi yapın. RMSE, tahmin hatanızın ortalama büyüklüğünü verir.", { size: 9.5, color: C.pri });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — FEATURE ENGINEERING
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Feature Engineering", "BÖLÜM 3");

  const features = [
    { title: "Label Encoding", desc: "Kategorik değişkeni sayıya çevir.\nÖrnek: Kırmızı=0, Mavi=1, Yeşil=2\nDikkat: Sıralı olmayan verilerde yanıltıcı olabilir.", color: C.sec },
    { title: "One-Hot Encoding", desc: "Her kategori için yeni sütun.\nÖrnek: Renk_Kırmızı, Renk_Mavi, Renk_Yeşil\npd.get_dummies() ile kolayca uygulanır.", color: C.acc },
    { title: "Ölçeklendirme", desc: "Farklı ölçekleri normalize et.\nStandardScaler: ortalama=0, std=1\nMinMaxScaler: [0, 1] aralığına sıkıştır.", color: C.purple },
    { title: "Eksik Değerler", desc: "Null değerleri doldur veya sil.\nSimpleImputer: ortalama, medyan, mod\nKNN Imputer: komşulara bakarak doldur.", color: C.amber },
  ];

  features.forEach((f, i) => {
    const x = 0.3 + (i % 2) * 4.7;
    const y = 1.0 + Math.floor(i / 2) * 2.15;
    card(s, x, y, 4.45, 1.95, { topColor: f.color });
    T.cardTitle(s, x + 0.15, y + 0.2, 4.15, f.title, f.color);
    T.cardBody(s, x + 0.15, y + 0.65, 4.15, 1.2, f.desc, { size: 10 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — SCIKIT-LEARN PIPELINE
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Scikit-learn Pipeline", "BÖLÜM 3");

  // Açıklama
  card(s, 0.4, 1.0, 9.2, 0.8, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.08, 4, "Neden Pipeline?", C.acc);
  T.cardBody(s, 4.6, 1.08, 4.8, 0.65, "Ön işleme adımlarını ve modeli tek bir nesnede birleştir. Tekrarlanabilir, temiz, hata riski az. Cross-validation ile doğrudan kullanılabilir.", { size: 10 });

  // Kod
  code(s, 0.4, 2.0, 9.2, 3.0, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.pipeline ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "Pipeline\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.preprocessing ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "StandardScaler, PolynomialFeatures\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.linear_model ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "LinearRegression\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Pipeline olustur: Olcekle -> Polinom -> Regresyon\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "pipe = Pipeline([\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    (", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "\"scaler\"", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ",   StandardScaler()),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    (", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "\"poly\"", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ",     PolynomialFeatures(degree=2)),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    (", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "\"model\"", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ",    LinearRegression()),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "])\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "pipe.fit(X_train, y_train)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "score = pipe.score(X_test, y_test)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "f\"Pipeline R2: {score:.4f}\"", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — ARAÇ FİYAT TAHMİNİ ÖRNEĞİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Araç Fiyat Tahmini Örneği", "BÖLÜM 3");

  // Veri seti bilgisi
  card(s, 0.4, 1.0, 4.4, 1.5, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.0, "Veri Seti: cars.xls", C.sec);
  const dataInfo = [
    "Kaynak: Gerçek araç satış verileri",
    "Özellikler: marka, model, yıl, km, motor hacmi",
    "Hedef: Araç satış fiyatı (TL)",
    "Satır sayısı: ~2000+ kayıt",
  ];
  dataInfo.forEach((d, i) => {
    T.cardBody(s, 0.6, 1.55 + i * 0.22, 4.0, 0.22, "- " + d, { size: 9.5 });
  });

  // Model sonuçları
  card(s, 5.05, 1.0, 4.55, 1.5, { topColor: C.acc });
  T.cardTitle(s, 5.25, 1.15, 4.15, "Model Sonuçları", C.acc);

  const results = [
    { metric: "R2", value: "0.87", color: C.green },
    { metric: "MAE", value: "12.400 TL", color: C.blue },
    { metric: "RMSE", value: "18.200 TL", color: C.amber },
  ];
  results.forEach((r, i) => {
    const x = 5.25 + i * 1.4;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.6, w: 1.2, h: 0.75, fill: { color: C.warmBg }, line: { color: r.color, width: 1.5 } });
    s.addText(r.value, { x, y: 1.6, w: 1.2, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: r.color, align: "center" });
    s.addText(r.metric, { x, y: 2.05, w: 1.2, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, align: "center" });
  });

  // İş akışı timeline
  card(s, 0.4, 2.75, 9.2, 2.35, { bg: C.warmBg });
  T.cardTitle(s, 0.6, 2.85, 8.8, "Proje İş Akışı", C.pri);

  const steps = [
    { num: "1", title: "Veri Yükleme", desc: "pd.read_excel('cars.xls')", color: C.sec },
    { num: "2", title: "EDA", desc: "df.describe(), korelasyon", color: C.acc },
    { num: "3", title: "Ön İşleme", desc: "Encoding, scaling, split", color: C.purple },
    { num: "4", title: "Model Eğitimi", desc: "LinearRegression().fit()", color: C.blue },
    { num: "5", title: "Değerlendirme", desc: "R2, MAE, RMSE hesapla", color: C.amber },
  ];

  steps.forEach((st, i) => {
    const x = 0.6 + i * 1.78;
    badge(s, x, 3.35, st.num, st.color);
    s.addText(st.title, { x: x - 0.1, y: 3.78, w: 1.6, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: st.color, align: "center" });
    s.addText(st.desc, { x: x - 0.1, y: 4.08, w: 1.6, h: 0.3, margin: 0, fontFace: "Consolas", fontSize: 7.5, color: C.mid, align: "center" });
    // Ok
    if (i < steps.length - 1) {
      s.addText("->", { x: x + 1.35, y: 3.35, w: 0.4, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 16, color: C.mid, align: "center", valign: "middle" });
    }
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — EV FİYAT TAHMİNİ (KAGGLE)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ev Fiyat Tahmini — California Housing", "BÖLÜM 3");

  // Veri seti açıklaması
  card(s, 0.4, 1.0, 4.4, 2.3, { leftColor: C.blue });
  T.cardTitle(s, 0.6, 1.1, 4.0, "California Housing Dataset", C.blue);
  T.cardBody(s, 0.6, 1.5, 4.0, 0.3, "Scikit-learn ile hazır gelen popüler veri seti", { size: 10, color: C.mid });

  const featureList = [
    { name: "MedInc", desc: "Medyan gelir" },
    { name: "HouseAge", desc: "Bina yaşı" },
    { name: "AveRooms", desc: "Ortalama oda sayısı" },
    { name: "AveOccup", desc: "Ortalama doluluk" },
    { name: "Latitude", desc: "Enlem" },
    { name: "Longitude", desc: "Boylam" },
  ];
  featureList.forEach((f, i) => {
    const y = 1.9 + i * 0.23;
    s.addText(f.name, { x: 0.6, y, w: 1.3, h: 0.23, margin: 0, fontFace: "Consolas", fontSize: 8.5, bold: true, color: C.acc });
    s.addText(f.desc, { x: 1.9, y, w: 2.3, h: 0.23, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.dark });
  });

  // Feature Importance kartı
  card(s, 5.05, 1.0, 4.55, 2.3, { topColor: C.purple });
  T.cardTitle(s, 5.25, 1.15, 4.15, "Feature Importance (Önem Sırası)", C.purple);

  const importance = [
    { name: "MedInc", pct: 65, color: C.sec },
    { name: "AveOccup", pct: 12, color: C.acc },
    { name: "Latitude", pct: 8, color: C.blue },
    { name: "Longitude", pct: 7, color: C.amber },
    { name: "HouseAge", pct: 5, color: C.purple },
    { name: "AveRooms", pct: 3, color: C.green },
  ];
  importance.forEach((f, i) => {
    const y = 1.6 + i * 0.27;
    s.addText(f.name, { x: 5.25, y, w: 1.2, h: 0.25, margin: 0, fontFace: "Consolas", fontSize: 8, color: C.dark });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: y + 0.04, w: f.pct * 0.04, h: 0.17, fill: { color: f.color } });
    s.addText(f.pct + "%", { x: 6.5 + f.pct * 0.04 + 0.1, y, w: 0.5, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 8, bold: true, color: f.color });
  });

  // Kod
  code(s, 0.4, 3.55, 9.2, 1.6, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.datasets ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "fetch_california_housing\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "data = fetch_california_housing()\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "X, y = data.data, data.target\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Feature importance: model.coef_ ile katsayilari gor\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "importance = pd.Series(model.coef_, index=data.feature_names)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "importance.abs().sort_values(ascending=False).plot.barh()", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — MODEL KAYDETME (JOBLIB)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Model Kaydetme — joblib", "BÖLÜM 4");

  // Neden kaydetmeliyiz?
  card(s, 0.4, 1.0, 4.4, 1.8, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.0, "Neden Model Kaydederiz?", C.sec);
  const whys = [
    "Eğitim saatler sürebilir — tekrar eğitmek istemezsiniz",
    "Eğitilmiş modeli farklı ortamlara taşımak (deployment)",
    "Model versiyonlama ve karşılaştırma",
    "API veya web uygulamasına entegrasyon",
  ];
  whys.forEach((w, i) => {
    badge(s, 0.6, 1.6 + i * 0.3, i + 1, C.sec);
    T.cardBody(s, 1.05, 1.6 + i * 0.3, 3.55, 0.28, w, { size: 9.5 });
  });

  // joblib vs pickle karşılaştırma
  card(s, 5.05, 1.0, 4.55, 1.8, { topColor: C.acc });
  T.cardTitle(s, 5.25, 1.15, 4.15, "joblib vs pickle", C.acc);

  s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 1.6, w: 4.15, h: 0.3, fill: { color: C.pri } });
  ["Özellik", "joblib", "pickle"].forEach((h, i) => {
    s.addText(h, { x: 5.25 + i * 1.38, y: 1.6, w: 1.38, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  });

  const compRows = [
    ["NumPy dizileri", "Hızlı", "Yavaş"],
    ["Büyük modeller", "Verimli", "Yavaş"],
    ["Kullanım", "Kolay", "Standart"],
  ];
  compRows.forEach((row, i) => {
    const y = 1.9 + i * 0.28;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y, w: 4.15, h: 0.28, fill: { color: bg } });
    row.forEach((cell, j) => {
      s.addText(cell, { x: 5.25 + j * 1.38, y, w: 1.38, h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 8.5, color: C.dark, align: "center", valign: "middle" });
    });
  });

  // Kod
  code(s, 0.4, 3.05, 9.2, 2.1, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "joblib\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Modeli kaydet\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "joblib.dump(model, ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "\"arac_fiyat_model.joblib\"", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(\"Model kaydedildi!\")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Modeli yukle\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "loaded_model = joblib.load(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "\"arac_fiyat_model.joblib\"", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Yuklenen model ile tahmin\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "prediction = loaded_model.predict([[2020, 15000, 1.6]])\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "f\"Tahmin: {prediction[0]:,.0f} TL\"", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — GRADİO İLE ARAYÜZ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Gradio ile Model Arayüzü", "BÖLÜM 4");

  // Açıklama
  card(s, 0.4, 1.0, 9.2, 0.8, { leftColor: C.green });
  T.cardTitle(s, 0.6, 1.08, 3, "Gradio Nedir?", C.green);
  T.cardBody(s, 3.6, 1.08, 5.8, 0.65, "ML modelleriniz için birkaç satır kod ile web arayüzü oluşturun. Paylaşım linki otomatik oluşturulur. Hugging Face Spaces ile deploy edilebilir.", { size: 10 });

  // Kod
  code(s, 0.4, 2.0, 5.6, 3.1, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "gradio ", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "gr\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "joblib\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "model = joblib.load(\"arac_fiyat_model.joblib\")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "def ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "predict_price", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "(yil, km, motor):\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    pred = model.predict([[yil, km, motor]])\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    return ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "f\"{pred[0]:,.0f} TL\"\n\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "demo = gr.Interface(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    fn=predict_price,\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    inputs=[\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "        gr.Slider(2005, 2024, label=\"Yil\"),\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "        gr.Number(label=\"Kilometre\"),\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "        gr.Slider(1.0, 3.0, label=\"Motor\"),\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    ],\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    outputs=\"text\",\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    title=\"Arac Fiyat Tahmini\"\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "demo.launch()", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);

  // Sağ panel — bileşenler
  card(s, 6.2, 2.0, 3.4, 3.1, { topColor: C.green });
  T.cardTitle(s, 6.4, 2.15, 3.0, "Gradio Bileşenleri", C.green);

  const components = [
    { name: "gr.Slider", desc: "Kaydırıcı (min-max aralık)", color: C.sec },
    { name: "gr.Number", desc: "Sayısal giriş kutusu", color: C.acc },
    { name: "gr.Textbox", desc: "Metin girişi/çıkışı", color: C.blue },
    { name: "gr.Dropdown", desc: "Seçim listesi", color: C.purple },
    { name: "gr.Image", desc: "Görüntü giriş/çıkış", color: C.amber },
    { name: "gr.Plot", desc: "Matplotlib/Plotly grafik", color: C.green },
  ];
  components.forEach((c, i) => {
    const y = 2.6 + i * 0.4;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.4, y: y + 0.02, w: 0.12, h: 0.28, fill: { color: c.color } });
    s.addText(c.name, { x: 6.6, y, w: 1.3, h: 0.32, margin: 0, fontFace: "Consolas", fontSize: 8.5, bold: true, color: c.color });
    s.addText(c.desc, { x: 7.9, y, w: 1.6, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 8.5, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — HUGGING FACE SPACES
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Hugging Face Spaces ile Deploy", "BÖLÜM 4");

  // 4 adımlı timeline
  const steps = [
    { num: "1", title: "Hesap Oluştur", desc: "huggingface.co adresinde ücretsiz hesap aç. GitHub hesabınla da giriş yapabilirsin.", color: C.sec },
    { num: "2", title: "Space Oluştur", desc: "New Space -> SDK: Gradio seç -> Public/Private ayarla -> Create Space butonuna bas.", color: C.acc },
    { num: "3", title: "Dosyaları Yükle", desc: "app.py (Gradio kodu) + requirements.txt + model dosyalarını yükle veya git push.", color: C.purple },
    { num: "4", title: "Canlı Demo!", desc: "HF otomatik build eder ve çalıştırır. Linki paylaşarak herkesin modeli denemesini sağla.", color: C.green },
  ];

  steps.forEach((st, i) => {
    const y = 1.0 + i * 1.1;
    // Sol taraf — numara dairesi + dikey çizgi
    badge(s, 0.6, y + 0.2, st.num, st.color);
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.76, y: y + 0.6, w: 0.04, h: 0.55, fill: { color: C.bdr } });
    }
    // Kart
    card(s, 1.2, y, 8.4, 0.9, { leftColor: st.color });
    T.cardTitle(s, 1.4, y + 0.08, 7.8, st.title, st.color);
    T.cardBody(s, 1.4, y + 0.45, 7.8, 0.4, st.desc, { size: 10.5 });
  });

  // Alt not
  card(s, 0.4, 5.0, 9.2, 0.4, { bg: C.warmBg });
  T.cardBody(s, 0.6, 5.0, 8.8, 0.4, "Ücretsiz plan: CPU 2 core, 16 GB RAM. Küçük modeller için yeterli. GPU gerektiren modeller için Pro plan gerekir.", { size: 9.5, color: C.mid });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 18 — HAFTALIK NOTEBOOK'LAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Haftalık Notebook'lar", "BÖLÜM 4");

  const notebooks = [
    { title: "lineer_regresyon.ipynb", desc: "Basit ve çoklu lineer regresyon. Scikit-learn ile model eğitimi, fit/predict döngüsü, katsayı yorumlama.", topics: "LinearRegression - train_test_split - R2", color: C.sec },
    { title: "arac_fiyat_tahmini.ipynb", desc: "Gerçek araç verisi ile fiyat tahmini. EDA, encoding, scaling ve model eğitimi end-to-end proje.", topics: "cars.xls - EDA - Pipeline - MAE/RMSE", color: C.acc },
    { title: "ev_fiyat_tahmini.ipynb", desc: "California Housing veri seti. Feature importance, polinom regresyon denemeleri, görselleştirme.", topics: "fetch_california_housing - Feature Importance", color: C.purple },
    { title: "gradio_deployment.ipynb", desc: "Eğitilmiş modeli Gradio ile web arayüzüne dönüştürme. joblib kaydetme ve Hugging Face deploy.", topics: "Gradio - joblib - Hugging Face Spaces", color: C.green },
  ];

  notebooks.forEach((nb, i) => {
    const x = 0.3 + (i % 2) * 4.7;
    const y = 1.0 + Math.floor(i / 2) * 2.15;
    card(s, x, y, 4.45, 1.95, { topColor: nb.color });
    T.cardTitle(s, x + 0.15, y + 0.2, 4.15, nb.title, nb.color);
    T.cardBody(s, x + 0.15, y + 0.65, 4.15, 0.8, nb.desc, { size: 10 });
    // Alt etiket
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: y + 1.5, w: 4.15, h: 0.3, fill: { color: C.warmBg } });
    s.addText(nb.topics, { x: x + 0.25, y: y + 1.5, w: 3.95, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 8, color: nb.color, italic: true, valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ödev ve Kaynaklar", "BÖLÜM 4");

  // Sol — Ödev
  card(s, 0.4, 1.0, 4.4, 4.0, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.0, "Haftalık Ödev", C.sec);

  const assignments = [
    { title: "Araç Fiyat Modeli", desc: "cars.xls verisini kullanarak en iyi regresyon modelini oluşturun. R2 > 0.85 hedefleyin." },
    { title: "Gradio Arayüzü", desc: "Eğittiğiniz modeli Gradio ile web arayüzüne dönüştürün." },
    { title: "Hugging Face Deploy", desc: "Gradio uygulamanızı Hugging Face Spaces'e deploy edin ve linkini paylaşın." },
    { title: "Rapor", desc: "EDA bulguları, model karşılaştırması, metrik sonuçları ve çıkarımları bir notebook'ta belgeleyin." },
  ];

  assignments.forEach((a, i) => {
    const y = 1.6 + i * 0.8;
    badge(s, 0.6, y, i + 1, C.sec);
    s.addText(a.title, { x: 1.05, y: y - 0.03, w: 3.55, h: 0.28, margin: 0, fontFace: "Georgia", fontSize: 10.5, bold: true, color: C.pri });
    T.cardBody(s, 1.05, y + 0.25, 3.55, 0.45, a.desc, { size: 9.5 });
  });

  // Sağ — Kaynaklar
  card(s, 5.05, 1.0, 4.55, 4.0, { topColor: C.acc });
  T.cardTitle(s, 5.25, 1.15, 4.15, "Faydalı Kaynaklar", C.acc);

  const resources = [
    { title: "Scikit-learn Docs", url: "scikit-learn.org/stable/", desc: "Resmi dokümantasyon — tüm modeller ve API" },
    { title: "Kaggle Learn", url: "kaggle.com/learn", desc: "Ücretsiz ML dersleri + pratik notebook'lar" },
    { title: "Gradio Docs", url: "gradio.app/docs", desc: "Gradio bileşenleri ve kullanım örnekleri" },
    { title: "HF Spaces", url: "huggingface.co/spaces", desc: "Binlerce demo — ilham kaynağı" },
    { title: "StatQuest (YouTube)", url: "youtube.com/@statquest", desc: "Regresyon ve ML konularını görsel anlatan kanal" },
  ];

  resources.forEach((r, i) => {
    const y = 1.6 + i * 0.63;
    badge(s, 5.25, y, i + 1, C.acc);
    s.addText(r.title, { x: 5.7, y: y - 0.03, w: 3.7, h: 0.25, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.pri });
    s.addText(r.url, { x: 5.7, y: y + 0.2, w: 3.7, h: 0.2, margin: 0, fontFace: "Consolas", fontSize: 7.5, color: C.acc });
    T.cardBody(s, 5.7, y + 0.38, 3.7, 0.2, r.desc, { size: 8.5 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 5 — Önemli Çıkarımlar",
  [
    { text: "Makine öğrenmesi = veriden öğrenen algoritmalar. Regresyon, sürekli değerleri tahmin eder.", color: C.sec },
    { text: "Lineer regresyon basit ama güçlü bir temeldir. Çoklu ve polinom ile genişletilir.", color: C.acc },
    { text: "Train/Test split ve metrikler (R2, RMSE) ile modelin gerçek performansını ölçün.", color: C.blue },
    { text: "Feature engineering model başarısını dramatik şekilde artırabilir — veriyi iyi tanıyın.", color: C.purple },
    { text: "Gradio + Hugging Face ile modelinizi dünyayla paylaşın — deployment artık kolay!", color: C.green },
  ],
  "Teori olmadan pratik kördür, pratik olmadan teori işe yaramaz.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// DOSYA KAYDET
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta05_regresyon_deployment.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("PPTX olusturuldu:", outPath))
  .catch(err => { console.error("HATA:", err); process.exit(1); });
