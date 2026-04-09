/**
 * Hafta 6 — Makine Öğrenmesi II: Sınıflandırma ve Kaggle
 * =======================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 6: Makine Öğrenmesi II — Sınıflandırma ve Kaggle");
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
  "Sınıflandırma\nve Kaggle",
  "Hafta 6 · Modül 6\nLojistik Regresyon, KNN, Karar Ağacı ve İlk Kaggle Yarışması",
  "Dr. Murat Altun",
  [
    { value: "6",  label: "Saat\nUygulama Ağırlıklı" },
    { value: "3",  label: "Notebook\n(Temel + Titanic + Diyabet)" },
    { value: "3",  label: "Algoritma\n(LR · KNN · DT)" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "İçindekiler", null);

  const sections = [
    { num: "01", title: "Sınıflandırma Temelleri",    items: "Binary vs Multi-class · Gerçek dünya örnekleri · Karar sınırı", color: C.sec,    slides: "Slayt 3–4" },
    { num: "02", title: "Algoritmalar",                items: "Lojistik Regresyon · KNN · Karar Ağacı · Karşılaştırma", color: C.acc,    slides: "Slayt 5–8" },
    { num: "03", title: "Model Değerlendirme",         items: "Confusion Matrix · Metrikler · ROC/AUC · Cross Validation", color: C.amber,  slides: "Slayt 9–13" },
    { num: "04", title: "Kaggle Uygulamaları",         items: "Titanic · Diyabet teşhisi · Kaggle kültürü · Ödev", color: C.purple, slides: "Slayt 14–20" },
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
// SLAYT 3 — SINIFLANDIRMA NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Sınıflandırma Nedir?", "BÖLÜM 1");

  // Binary vs Multi-class
  card(s, 0.4, 0.95, 4.4, 1.6, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.1, 4.0, "Binary Sınıflandırma", C.acc);
  T.cardBody(s, 0.6, 1.5, 4.0, 0.9,
    "Sadece 2 sınıf: Evet/Hayır, Spam/Normal, Hasta/Sağlıklı.\nÇıktı: 0 veya 1 (olasılık ile)"
  );

  card(s, 5.1, 0.95, 4.4, 1.6, { topColor: C.sec });
  T.cardTitle(s, 5.3, 1.1, 4.0, "Multi-class Sınıflandırma", C.sec);
  T.cardBody(s, 5.3, 1.5, 4.0, 0.9,
    "3+ sınıf: Hayvan türü, rakam tanıma (0-9), hastalık tipi.\nÇıktı: N sınıftan biri"
  );

  // Gerçek dünya örnekleri
  card(s, 0.4, 2.8, 9.1, 2.5, { leftColor: C.purple });
  T.cardTitle(s, 0.65, 2.9, 8.6, "Gerçek Dünya Uygulamaları", C.purple);

  const examples = [
    { icon: "📧", title: "Spam Tespiti", desc: "E-posta spam mı değil mi?", color: C.red },
    { icon: "🏥", title: "Tıbbi Teşhis", desc: "Tümör iyi huylu mu kötü mü?", color: C.green },
    { icon: "🏦", title: "Kredi Riski", desc: "Müşteri ödeyecek mi?", color: C.blue },
    { icon: "🔢", title: "Rakam Tanıma", desc: "El yazısı → 0-9 sınıfı", color: C.amber },
  ];

  examples.forEach((ex, i) => {
    const x = 0.65 + i * 2.2;
    card(s, x, 3.35, 2.0, 1.7, { topColor: ex.color });
    s.addText(ex.icon, { x, y: 3.5, w: 2.0, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 22, align: "center" });
    s.addText(ex.title, { x, y: 3.95, w: 2.0, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: ex.color, align: "center" });
    s.addText(ex.desc, { x: x + 0.1, y: 4.3, w: 1.8, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — LOJİSTİK REGRESYON
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Lojistik Regresyon", "BÖLÜM 2");

  // Sigmoid açıklaması
  card(s, 0.4, 0.95, 4.8, 2.2, { leftColor: C.sec });
  T.cardTitle(s, 0.65, 1.05, 4.4, "Sigmoid Fonksiyonu", C.sec);
  T.cardBody(s, 0.65, 1.45, 4.4, 1.5,
    "Doğrusal kombinasyonu 0–1 arasına sıkıştırır.\n\nσ(z) = 1 / (1 + e^(-z))\n\n• z > 0 → olasılık > 0.5 → Sınıf 1\n• z < 0 → olasılık < 0.5 → Sınıf 0\n• Karar eşiği varsayılan: 0.5"
  );

  // Sağ: avantaj/dezavantaj
  card(s, 5.5, 0.95, 4.1, 1.0, { topColor: C.green });
  T.cardTitle(s, 5.7, 1.05, 3.7, "Avantajlar", C.green);
  T.cardBody(s, 5.7, 1.4, 3.7, 0.45, "Hızlı · Yorumlanabilir · Olasılık çıktısı");

  card(s, 5.5, 2.1, 4.1, 1.0, { topColor: C.red });
  T.cardTitle(s, 5.7, 2.2, 3.7, "Dezavantajlar", C.red);
  T.cardBody(s, 5.7, 2.55, 3.7, 0.45, "Doğrusal sınır · Karmaşık ilişkilerde zayıf");

  // Kod bloğu
  code(s, 0.4, 3.4, 9.2, 1.9, [
    { text: "from ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "sklearn.linear_model ", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "import ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "LogisticRegression\n\n", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "model = LogisticRegression(", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "max_iter=200", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: ")\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "model.fit(X_train, y_train)\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "y_pred = model.predict(X_test)\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "y_proba = model.predict_proba(X_test)  ", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "# Olasılık çıktısı", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas", italic: true } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — KNN
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "K-Nearest Neighbors (KNN)", "BÖLÜM 2");

  // Nasıl çalışır
  card(s, 0.4, 0.95, 5.0, 2.5, { leftColor: C.acc });
  T.cardTitle(s, 0.65, 1.05, 4.6, "Nasıl Çalışır?", C.acc);
  T.cardBody(s, 0.65, 1.45, 4.6, 1.85,
    "1. Yeni veri noktasına en yakın K komşuyu bul\n2. Komşuların çoğunluk sınıfını ata\n3. Uzaklık ölçütü: Öklid, Manhattan\n\nK Seçimi Kritik:\n• K küçük → gürültüye hassas (overfitting)\n• K büyük → fazla genelleme (underfitting)\n• Genelde K = √n veya tek sayı seçilir"
  );

  // Sağ: istatistik kutuları
  stat(s, 5.7, 0.95, 1.8, 1.15, "K=5", "Varsayılan\nKomşu Sayısı", C.acc);
  stat(s, 7.7, 0.95, 1.8, 1.15, "O(n)", "Tahmin\nMaliyeti", C.red);

  // Avantaj / Dezavantaj kartları
  card(s, 5.7, 2.3, 3.8, 1.15, { topColor: C.green });
  T.cardTitle(s, 5.9, 2.4, 3.4, "Avantajlar", C.green);
  T.cardBody(s, 5.9, 2.75, 3.4, 0.55,
    "• Basit ve sezgisel\n• Eğitim süresi yok (lazy learner)\n• Non-linear sınırlara uyum sağlar"
  );

  // Alt: dezavantaj
  card(s, 0.4, 3.7, 9.1, 1.4, { topColor: C.red });
  T.cardTitle(s, 0.65, 3.8, 8.6, "Dezavantajlar ve Dikkat Edilecekler", C.red);
  T.cardBody(s, 0.65, 4.15, 8.6, 0.8,
    "• Büyük veri setlerinde yavaş (tüm mesafeler hesaplanır)\n• Özellik ölçekleme zorunlu (StandardScaler / MinMaxScaler)\n• Yüksek boyutlu veride performans düşer (boyut laneti)\n• Kategorik özelliklerle doğrudan çalışamaz"
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — KARAR AĞACI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Karar Ağacı (Decision Tree)", "BÖLÜM 2");

  // Ağaç yapısı açıklaması
  card(s, 0.4, 0.95, 5.0, 2.3, { leftColor: C.amber });
  T.cardTitle(s, 0.65, 1.05, 4.6, "Ağaç Yapısı ve Bölme Kriterleri", C.amber);
  T.cardBody(s, 0.65, 1.45, 4.6, 1.6,
    "Kök Düğüm → Dallar → Yapraklar\n\nHer düğüm bir özelliğe göre veriyi böler:\n• Gini Impurity: 1 - Σ(pᵢ²) → 0 = saf\n• Entropy: -Σ(pᵢ × log₂(pᵢ)) → 0 = saf\n\nAğaç en saf yapraklara ulaşana kadar büyür.\nBilgi kazancı en yüksek özellik seçilir."
  );

  // Sağ: Gini vs Entropy kutuları
  card(s, 5.7, 0.95, 3.8, 1.05, { topColor: C.acc });
  T.cardTitle(s, 5.9, 1.05, 3.4, "Gini Impurity", C.acc);
  T.cardBody(s, 5.9, 1.4, 3.4, 0.45, "Hızlı hesaplama · sklearn varsayılanı");

  card(s, 5.7, 2.15, 3.8, 1.05, { topColor: C.purple });
  T.cardTitle(s, 5.9, 2.25, 3.4, "Entropy (Bilgi Kazancı)", C.purple);
  T.cardBody(s, 5.9, 2.6, 3.4, 0.45, "Daha dengeli bölme · Daha yavaş hesaplama");

  // Overfitting uyarı kartı
  card(s, 0.4, 3.5, 9.1, 1.7, { topColor: C.red });
  T.cardTitle(s, 0.65, 3.6, 8.6, "Overfitting Riski ve Çözümler", C.red);

  const tips = [
    { label: "max_depth", desc: "Ağaç derinliğini sınırla (ör: 5)" },
    { label: "min_samples_split", desc: "Bölme için minimum örnek (ör: 10)" },
    { label: "min_samples_leaf", desc: "Yaprakta minimum örnek (ör: 5)" },
    { label: "Pruning", desc: "ccp_alpha ile budama (cost-complexity)" },
  ];
  tips.forEach((t, i) => {
    const y = 3.98 + i * 0.28;
    s.addText(t.label, { x: 0.85, y, w: 2.2, h: 0.26, margin: 0, fontFace: "Consolas", fontSize: 9, bold: true, color: C.acc });
    s.addText(t.desc, { x: 3.1, y, w: 6.2, h: 0.26, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.dark });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — 3 ALGORİTMA KARŞILAŞTIRMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "3 Algoritma Karşılaştırma Tablosu", "BÖLÜM 2");

  const rows = [
    ["Özellik",            "Lojistik Regresyon",  "KNN",                 "Karar Ağacı"],
    ["Tip",                "Parametrik",           "Non-parametrik",      "Non-parametrik"],
    ["Eğitim Hızı",       "Çok hızlı",           "Yok (lazy)",          "Orta"],
    ["Tahmin Hızı",        "Çok hızlı",           "Yavaş (O(n))",       "Çok hızlı"],
    ["Yorumlanabilirlik",  "Yüksek (katsayılar)", "Düşük",              "Çok yüksek (görsel)"],
    ["Non-linear Sınır",   "Hayır",               "Evet",                "Evet"],
    ["Ölçekleme Gerekli",  "Evet",                "Evet (zorunlu)",     "Hayır"],
    ["Overfitting Riski",  "Düşük",               "Orta",                "Yüksek"],
    ["Hiperparametre",     "C, penalty",          "K, distance metric", "max_depth, criterion"],
  ];

  const colW = [2.0, 2.3, 2.4, 2.4];
  const colX = [0.45, 2.45, 4.75, 7.15];

  rows.forEach((row, ri) => {
    const y = 1.0 + ri * 0.48;
    const isHead = ri === 0;
    const bgColor = isHead ? C.pri : (ri % 2 === 1 ? C.warmBg : C.card);
    const txtColor = isHead ? "FFFFFF" : C.dark;
    const fSize = isHead ? 10.5 : 10;

    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: colX[ci], y, w: colW[ci], h: 0.46,
        fill: { color: bgColor },
        line: { color: C.bdr, width: 0.5 },
      });
      s.addText(cell, {
        x: colX[ci] + 0.08, y, w: colW[ci] - 0.16, h: 0.46, margin: 0,
        fontFace: isHead ? "Georgia" : "Calibri", fontSize: fSize,
        bold: isHead, color: txtColor, valign: "middle"
      });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — CONFUSION MATRIX
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Confusion Matrix (Karışıklık Matrisi)", "BÖLÜM 3");

  // Sol: 2x2 matris görsel
  card(s, 0.4, 0.95, 5.2, 3.8, {});

  // Matris başlıkları
  s.addText("Tahmin: Pozitif", { x: 1.5, y: 1.05, w: 1.8, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 9, bold: true, color: C.pri, align: "center" });
  s.addText("Tahmin: Negatif", { x: 3.4, y: 1.05, w: 1.8, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 9, bold: true, color: C.pri, align: "center" });
  s.addText("Gerçek:\nPozitif", { x: 0.55, y: 1.55, w: 0.9, h: 1.3, margin: 0, fontFace: "Georgia", fontSize: 9, bold: true, color: C.pri, align: "center", valign: "middle" });
  s.addText("Gerçek:\nNegatif", { x: 0.55, y: 3.0, w: 0.9, h: 1.3, margin: 0, fontFace: "Georgia", fontSize: 9, bold: true, color: C.pri, align: "center", valign: "middle" });

  // TP kutusu
  s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 1.55, w: 1.8, h: 1.3, fill: { color: "E8F5E9" }, line: { color: C.green, width: 2 } });
  s.addText("TP", { x: 1.5, y: 1.6, w: 1.8, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: C.green, align: "center" });
  s.addText("True Positive\nDoğru pozitif", { x: 1.5, y: 2.15, w: 1.8, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.dark, align: "center" });

  // FN kutusu
  s.addShape(pres.shapes.RECTANGLE, { x: 3.4, y: 1.55, w: 1.8, h: 1.3, fill: { color: "FFF3E0" }, line: { color: C.amber, width: 2 } });
  s.addText("FN", { x: 3.4, y: 1.6, w: 1.8, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: C.amber, align: "center" });
  s.addText("False Negative\nKaçırılan pozitif", { x: 3.4, y: 2.15, w: 1.8, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.dark, align: "center" });

  // FP kutusu
  s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 3.0, w: 1.8, h: 1.3, fill: { color: "FFEBEE" }, line: { color: C.red, width: 2 } });
  s.addText("FP", { x: 1.5, y: 3.05, w: 1.8, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: C.red, align: "center" });
  s.addText("False Positive\nYanlış alarm", { x: 1.5, y: 3.6, w: 1.8, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.dark, align: "center" });

  // TN kutusu
  s.addShape(pres.shapes.RECTANGLE, { x: 3.4, y: 3.0, w: 1.8, h: 1.3, fill: { color: "E3F2FD" }, line: { color: C.blue, width: 2 } });
  s.addText("TN", { x: 3.4, y: 3.05, w: 1.8, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: C.blue, align: "center" });
  s.addText("True Negative\nDoğru negatif", { x: 3.4, y: 3.6, w: 1.8, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.dark, align: "center" });

  // Sağ: açıklamalar
  card(s, 5.85, 0.95, 3.7, 3.8, { leftColor: C.purple });
  T.cardTitle(s, 6.1, 1.05, 3.3, "Neden Önemli?", C.purple);
  T.cardBody(s, 6.1, 1.45, 3.3, 3.1,
    "Accuracy tek başına yanıltıcı olabilir!\n\n" +
    "Örnek: 1000 hasta, 950 sağlıklı\n" +
    "Model hep \"sağlıklı\" derse:\n" +
    "• Accuracy = %95 (harika görünür!)\n" +
    "• Ama hiç hasta tespit edilmedi\n\n" +
    "Confusion Matrix bize 4 farklı\nhata türünü ayrı ayrı gösterir.\n\n" +
    "Özellikle dengesiz veri setlerinde\ncritik bir araçtır."
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — METRİKLER: ACCURACY, PRECISION, RECALL
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Metrikler: Accuracy, Precision, Recall", "BÖLÜM 3");

  // Accuracy
  card(s, 0.4, 0.95, 2.9, 2.3, { topColor: C.blue });
  T.cardTitle(s, 0.6, 1.1, 2.5, "Accuracy", C.blue);
  s.addText("(TP + TN) / Toplam", { x: 0.6, y: 1.5, w: 2.5, h: 0.35, margin: 0, fontFace: "Consolas", fontSize: 10, color: C.acc, bold: true });
  T.cardBody(s, 0.6, 1.9, 2.5, 1.1,
    "Genel doğruluk oranı.\n\nNe zaman kullan?\nDengeli sınıf dağılımı varsa."
  );

  // Precision
  card(s, 3.55, 0.95, 2.9, 2.3, { topColor: C.green });
  T.cardTitle(s, 3.75, 1.1, 2.5, "Precision", C.green);
  s.addText("TP / (TP + FP)", { x: 3.75, y: 1.5, w: 2.5, h: 0.35, margin: 0, fontFace: "Consolas", fontSize: 10, color: C.acc, bold: true });
  T.cardBody(s, 3.75, 1.9, 2.5, 1.1,
    "Pozitif dediğimin kaçı gerçekten pozitif?\n\nNe zaman kullan?\nFP maliyetli: Spam filtresi"
  );

  // Recall
  card(s, 6.7, 0.95, 2.9, 2.3, { topColor: C.amber });
  T.cardTitle(s, 6.9, 1.1, 2.5, "Recall", C.amber);
  s.addText("TP / (TP + FN)", { x: 6.9, y: 1.5, w: 2.5, h: 0.35, margin: 0, fontFace: "Consolas", fontSize: 10, color: C.acc, bold: true });
  T.cardBody(s, 6.9, 1.9, 2.5, 1.1,
    "Gerçek pozitiflerin kaçını yakaladım?\n\nNe zaman kullan?\nFN maliyetli: Kanser teşhisi"
  );

  // Alt: senaryo karşılaştırma
  card(s, 0.4, 3.5, 9.1, 1.7, { leftColor: C.sec });
  T.cardTitle(s, 0.65, 3.6, 8.6, "Senaryo Karşılaştırması", C.sec);

  const scenarios = [
    ["Senaryo", "Öncelik", "Neden?"],
    ["Spam filtresi", "Precision", "Normal mail spam klasörüne düşmesin (FP azalt)"],
    ["Kanser tespiti", "Recall", "Hasta kaçırılmasın, yanlış alarm kabul edilebilir (FN azalt)"],
    ["Kredi dolandırıcılığı", "Precision + Recall", "İkisi de kritik: hem kaçırma hem yanlış alarm pahalı"],
  ];

  scenarios.forEach((row, ri) => {
    const y = 3.95 + ri * 0.3;
    const isHead = ri === 0;
    const bg = isHead ? C.pri : (ri % 2 === 0 ? C.warmBg : C.card);
    const tc = isHead ? "FFFFFF" : C.dark;
    const ws = [2.5, 1.8, 4.5];
    const xs = [0.65, 3.15, 4.95];
    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, { x: xs[ci], y, w: ws[ci], h: 0.28, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
      s.addText(cell, { x: xs[ci] + 0.05, y, w: ws[ci] - 0.1, h: 0.28, margin: 0, fontFace: isHead ? "Georgia" : "Calibri", fontSize: 9, bold: isHead, color: tc, valign: "middle" });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — F1-SCORE
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "F1-Score: Denge Metriği", "BÖLÜM 3");

  // Formül kartı
  card(s, 0.4, 0.95, 9.1, 1.5, { topColor: C.purple });
  T.cardTitle(s, 0.65, 1.1, 8.6, "Harmonik Ortalama", C.purple);
  s.addText("F1 = 2 × (Precision × Recall) / (Precision + Recall)", {
    x: 0.65, y: 1.55, w: 8.6, h: 0.5, margin: 0, fontFace: "Consolas", fontSize: 14, color: C.acc, bold: true, align: "center"
  });
  T.cardBody(s, 0.65, 2.05, 8.6, 0.3,
    "Aritmetik ortalama yerine harmonik ortalama: düşük olan değer F1'i daha çok etkiler", { size: 10 }
  );

  // Karşılaştırma kutuları
  stat(s, 0.4, 2.7, 2.15, 1.2, "0.67", "P=1.0, R=0.5\nYüksek P, Düşük R", C.amber);
  stat(s, 2.8, 2.7, 2.15, 1.2, "0.80", "P=0.8, R=0.8\nDengeli", C.green);
  stat(s, 5.2, 2.7, 2.15, 1.2, "0.91", "P=0.9, R=0.92\nİyi Denge", C.acc);
  stat(s, 7.6, 2.7, 2.15, 1.2, "1.00", "P=1.0, R=1.0\nMükemmel", C.purple);

  // Alt: dengesiz veri notu
  card(s, 0.4, 4.15, 9.1, 1.2, { leftColor: C.red });
  T.cardTitle(s, 0.65, 4.25, 8.6, "Dengesiz Veri Setlerinde F1-Score Kritik", C.red);
  T.cardBody(s, 0.65, 4.6, 8.6, 0.6,
    "• Accuracy %95 olsa bile F1-Score %30 olabilir (nadir sınıf yakalanmıyorsa)\n" +
    "• Macro F1: Her sınıfın F1'ini eşit ağırlıkla ortalar → dengesiz setlerde adil\n" +
    "• Weighted F1: Sınıf büyüklüğüne göre ağırlıklı → genel performans göstergesi"
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — ROC EĞRİSİ VE AUC
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "ROC Eğrisi ve AUC", "BÖLÜM 3");

  // Sol: ROC açıklama
  card(s, 0.4, 0.95, 5.0, 2.3, { leftColor: C.acc });
  T.cardTitle(s, 0.65, 1.05, 4.6, "ROC Eğrisi Ne Gösterir?", C.acc);
  T.cardBody(s, 0.65, 1.45, 4.6, 1.6,
    "X ekseni: False Positive Rate (FPR)\nY ekseni: True Positive Rate (TPR = Recall)\n\n" +
    "Her eşik değeri (threshold) için bir nokta:\n" +
    "• Sol üst köşeye yakınlık = iyi model\n" +
    "• Köşegen çizgi = rastgele tahmin\n" +
    "• Eğri altında kalan alan = AUC"
  );

  // Sağ: AUC yorumlama kutuları
  const aucLevels = [
    { val: "0.50", label: "Rastgele\nTahmin", color: C.red },
    { val: "0.70", label: "Orta\nPerformans", color: C.amber },
    { val: "0.85", label: "İyi\nModel", color: C.blue },
    { val: "0.95", label: "Mükemmel\nModel", color: C.green },
  ];
  aucLevels.forEach((a, i) => {
    stat(s, 5.7, 0.95 + i * 0.83, 3.85, 0.72, a.val, a.label, a.color);
  });

  // Alt: kod bloğu
  code(s, 0.4, 3.5, 9.2, 1.7, [
    { text: "from ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "sklearn.metrics ", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "import ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "roc_curve, roc_auc_score\n\n", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "y_proba = model.predict_proba(X_test)[:, 1]\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "fpr, tpr, thresholds = roc_curve(y_test, y_proba)\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "auc_score = roc_auc_score(y_test, y_proba)\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "print(f\"AUC: {auc_score:.3f}\")  ", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "# AUC: 0.876", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas", italic: true } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — CROSS VALIDATION
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Cross Validation (Çapraz Doğrulama)", "BÖLÜM 3");

  // Neden tek split yetmez
  card(s, 0.4, 0.95, 4.6, 1.8, { topColor: C.red });
  T.cardTitle(s, 0.6, 1.1, 4.2, "Neden Tek Split Yetmez?", C.red);
  T.cardBody(s, 0.6, 1.5, 4.2, 1.1,
    "• Train/test bölümü rastgeledir\n• Şanslı/şanssız bir bölme olabilir\n• Model performansı değişkenlik gösterir\n• Küçük veri setlerinde özellikle sorunlu"
  );

  // K-fold açıklama
  card(s, 5.2, 0.95, 4.4, 1.8, { topColor: C.acc });
  T.cardTitle(s, 5.4, 1.1, 4.0, "K-Fold Cross Validation", C.acc);
  T.cardBody(s, 5.4, 1.5, 4.0, 1.1,
    "1. Veriyi K eşit parçaya böl\n2. Her seferinde 1 parça test, K-1 eğitim\n3. K kez tekrarla, sonuçları ortala\n\nK=5 veya K=10 yaygın tercih"
  );

  // Görsel: K=5 fold gösterimi
  card(s, 0.4, 3.0, 9.1, 0.9, {});
  const foldColors = [C.acc, C.sec, C.amber, C.purple, C.blue];
  for (let f = 0; f < 5; f++) {
    for (let b = 0; b < 5; b++) {
      const isTest = f === b;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.2 + b * 1.5, y: 3.15 + f * 0.13, w: 1.4, h: 0.11,
        fill: { color: isTest ? C.red : C.green },
      });
    }
  }
  s.addText("Test", { x: 0.5, y: 3.15, w: 0.6, h: 0.11, margin: 0, fontFace: "Calibri", fontSize: 7, color: C.red, bold: true });
  s.addText("Eğitim", { x: 0.5, y: 3.3, w: 0.6, h: 0.11, margin: 0, fontFace: "Calibri", fontSize: 7, color: C.green, bold: true });

  // Kod bloğu
  code(s, 0.4, 4.1, 9.2, 1.2, [
    { text: "from ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "sklearn.model_selection ", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "import ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "cross_val_score\n\n", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "scores = cross_val_score(model, X, y, ", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "cv=5", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: ", ", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "scoring='accuracy'", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: ")\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "print(f\"Ortalama: {scores.mean():.3f} ± {scores.std():.3f}\")", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — TİTANİC KAGGLE YARIŞMASI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Titanic: İlk Kaggle Yarışması", "BÖLÜM 4");

  // Veri seti tanıtımı
  card(s, 0.4, 0.95, 5.2, 2.0, { leftColor: C.blue });
  T.cardTitle(s, 0.65, 1.05, 4.8, "Veri Seti Tanıtımı", C.blue);
  T.cardBody(s, 0.65, 1.45, 4.8, 1.3,
    "891 yolcu · 12 özellik · Binary sınıflandırma\n\n" +
    "Hedef: Survived (0 = Hayır, 1 = Evet)\n" +
    "Kaggle'ın en popüler başlangıç yarışması!\n" +
    "\"Machine Learning from Disaster\""
  );

  // Sağ: istatistikler
  stat(s, 5.85, 0.95, 1.85, 1.2, "891", "Eğitim\nÖrnekleri", C.acc);
  stat(s, 7.85, 0.95, 1.85, 1.2, "418", "Test\nÖrnekleri", C.sec);

  // Temel özellikler tablosu
  card(s, 0.4, 3.2, 9.1, 2.2, { topColor: C.amber });
  T.cardTitle(s, 0.65, 3.3, 8.6, "Temel Özellikler", C.amber);

  const features = [
    ["Özellik", "Tip", "Açıklama"],
    ["Pclass", "Kategorik (1-3)", "Yolcu sınıfı (1st, 2nd, 3rd)"],
    ["Sex", "Kategorik", "Cinsiyet (male, female)"],
    ["Age", "Sayısal", "Yaş (eksik veri var!)"],
    ["SibSp / Parch", "Sayısal", "Kardeş + Ebeveyn/Çocuk sayısı"],
    ["Fare", "Sayısal", "Bilet ücreti"],
    ["Embarked", "Kategorik", "Biniş limanı (C, Q, S)"],
  ];

  features.forEach((row, ri) => {
    const y = 3.68 + ri * 0.24;
    const isHead = ri === 0;
    const bg = isHead ? C.pri : (ri % 2 === 1 ? C.warmBg : C.card);
    const tc = isHead ? "FFFFFF" : C.dark;
    const ws = [1.8, 2.0, 5.0];
    const xs = [0.65, 2.45, 4.45];
    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, { x: xs[ci], y, w: ws[ci], h: 0.22, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
      s.addText(cell, { x: xs[ci] + 0.05, y, w: ws[ci] - 0.1, h: 0.22, margin: 0, fontFace: isHead ? "Georgia" : "Calibri", fontSize: 8.5, bold: isHead, color: tc, valign: "middle" });
    });
  });

  // Submission formatı notu
  s.addText("Submission: PassengerId + Survived (0/1) → CSV dosyası yükle", {
    x: 0.65, y: 2.35, w: 8.6, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, italic: true,
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — TİTANİC: VERİ HAZIRLAMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Titanic: Veri Hazırlama", "BÖLÜM 4");

  // Adımlar kartları
  const steps = [
    { num: "1", title: "Eksik Veri", desc: "Age → median ile doldur\nEmbarked → mod ile doldur\nCabin → düşür (çok eksik)", color: C.sec },
    { num: "2", title: "Encoding", desc: "Sex → 0/1 (LabelEncoder)\nEmbarked → One-Hot Encoding\nPclass zaten sayısal", color: C.acc },
    { num: "3", title: "Feature Engineering", desc: "FamilySize = SibSp + Parch + 1\nIsAlone = FamilySize == 1\nTitle: Name'den çıkar (Mr, Mrs...)", color: C.amber },
    { num: "4", title: "Özellik Seçimi", desc: "Name, Ticket, Cabin → düşür\nPassengerId → düşür\nKalan: Pclass, Sex, Age, Fare, +yeni", color: C.purple },
  ];

  steps.forEach((step, i) => {
    const y = 0.95 + i * 1.1;
    card(s, 0.4, y, 9.1, 0.95, { leftColor: step.color });
    badge(s, 0.55, y + 0.3, step.num, step.color);
    T.cardTitle(s, 1.05, y + 0.05, 2.5, step.title, step.color);
    T.cardBody(s, 3.5, y + 0.05, 5.8, 0.85, step.desc);
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — TİTANİC: MODEL EĞİTİMİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Titanic: Model Eğitimi ve Karşılaştırma", "BÖLÜM 4");

  // Kod bloğu
  code(s, 0.4, 0.95, 9.2, 2.6, [
    { text: "from ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "sklearn.linear_model ", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "import ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "LogisticRegression\n", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "from ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "sklearn.neighbors ", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "import ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "KNeighborsClassifier\n", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "from ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "sklearn.tree ", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "import ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "DecisionTreeClassifier\n\n", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "models = {\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "    \"Lojistik Regresyon\": LogisticRegression(max_iter=200),\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "    \"KNN (K=5)\":          KNeighborsClassifier(n_neighbors=5),\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "    \"Karar Ağacı\":        DecisionTreeClassifier(max_depth=5),\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "}\n\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "for ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "name, model ", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "in ", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "models.items():\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "    scores = cross_val_score(model, X, y, cv=5)\n", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "    print(f\"{name}: {scores.mean():.3f} ± {scores.std():.3f}\")", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
  ]);

  // Sonuç kutuları
  stat(s, 0.4, 3.8, 2.9, 1.4, "%80.2", "Lojistik\nRegresyon", C.sec);
  stat(s, 3.55, 3.8, 2.9, 1.4, "%78.5", "KNN\n(K=5)", C.acc);
  stat(s, 6.7, 3.8, 2.9, 1.4, "%79.8", "Karar Ağacı\n(depth=5)", C.amber);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — DİYABET TEŞHİSİ ÖRNEĞİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Diyabet Teşhisi: Pima Indians", "BÖLÜM 4");

  // Veri seti açıklaması
  card(s, 0.4, 0.95, 5.2, 2.2, { leftColor: C.green });
  T.cardTitle(s, 0.65, 1.05, 4.8, "Pima Indians Diabetes Dataset", C.green);
  T.cardBody(s, 0.65, 1.45, 4.8, 1.5,
    "768 kadın hasta · 8 klinik özellik\nHedef: Outcome (0 = Diyabet yok, 1 = Diyabet)\n\n" +
    "Özellikler:\n" +
    "Pregnancies · Glucose · BloodPressure\n" +
    "SkinThickness · Insulin · BMI\n" +
    "DiabetesPedigreeFunction · Age"
  );

  // Sağ: istatistikler
  stat(s, 5.85, 0.95, 1.85, 1.05, "768", "Toplam\nÖrnek", C.acc);
  stat(s, 7.85, 0.95, 1.85, 1.05, "%34.9", "Diyabet\nOranı", C.red);

  card(s, 5.85, 2.15, 3.85, 1.0, { topColor: C.amber });
  T.cardTitle(s, 6.05, 2.25, 3.45, "Dikkat!", C.amber);
  T.cardBody(s, 6.05, 2.6, 3.45, 0.45, "Dengesiz veri seti!\nAccuracy yerine F1-Score kullan.");

  // Alt: Pipeline adımları
  card(s, 0.4, 3.4, 9.1, 1.8, { topColor: C.purple });
  T.cardTitle(s, 0.65, 3.5, 8.6, "Uygulama Pipeline", C.purple);

  const pipeline = [
    { step: "Veri Yükle", detail: "pd.read_csv('diabetes.csv')", color: C.blue },
    { step: "Temizle", detail: "0 değerler → NaN → median", color: C.amber },
    { step: "Ölçekle", detail: "StandardScaler fit_transform", color: C.green },
    { step: "Böl", detail: "train_test_split (80/20)", color: C.sec },
    { step: "Eğit+Değerlendir", detail: "3 model + classification_report", color: C.purple },
  ];

  pipeline.forEach((p, i) => {
    const x = 0.6 + i * 1.8;
    card(s, x, 3.9, 1.6, 1.1, { topColor: p.color });
    badge(s, x + 0.6, 3.95, i + 1, p.color);
    s.addText(p.step, { x, y: 4.35, w: 1.6, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 9, bold: true, color: p.color, align: "center" });
    s.addText(p.detail, { x: x + 0.05, y: 4.6, w: 1.5, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 7.5, color: C.mid, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — KAGGLE KÜLTÜRÜ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Kaggle Kültürü ve İlk Adımlar", "BÖLÜM 4");

  const cards = [
    { title: "Hesap Açma", icon: "1", desc: "kaggle.com'da ücretsiz kayıt.\nGoogle hesabı ile giriş.\nProfil bilgilerini doldur.\nPortföy görünürlüğü!", color: C.sec },
    { title: "Notebook Kullanımı", icon: "2", desc: "Kaggle Notebooks: ücretsiz GPU!\n30 saat/hafta GPU kotası.\nKod + markdown + çıktı bir arada.\nPaylaş ve oy topla.", color: C.acc },
    { title: "Veri Setleri", icon: "3", desc: "50.000+ açık veri seti.\nCSV, JSON, resim, metin...\nKendi veri setini yükle.\nDataset yarışmaları.", color: C.amber },
    { title: "Yarışma & Submission", icon: "4", desc: "Submit → Leaderboard sıralaması.\nPublic / Private LB farkı!\nKernel-only yarışmalar.\nMedal sistemi (Bronz→Altın).", color: C.purple },
  ];

  cards.forEach((c, i) => {
    const x = 0.4 + (i % 2) * 4.6;
    const y = 0.95 + Math.floor(i / 2) * 2.3;
    card(s, x, y, 4.3, 2.05, { topColor: c.color });
    badge(s, x + 0.15, y + 0.15, c.icon, c.color);
    T.cardTitle(s, x + 0.6, y + 0.15, 3.4, c.title, c.color);
    T.cardBody(s, x + 0.2, y + 0.6, 3.9, 1.3, c.desc);
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
      title: "siniflandirma_temel.ipynb",
      desc: "Sınıflandırma algoritmalarının temel uygulaması.\n\n• Iris veri seti ile 3 algoritma\n• Confusion matrix ve metrikler\n• Karar sınırı görselleştirme\n• Cross validation karşılaştırma",
      color: C.sec, duration: "~60 dk"
    },
    {
      title: "titanic_kaggle.ipynb",
      desc: "Kaggle Titanic yarışması tam çözüm.\n\n• EDA ve veri temizleme\n• Feature engineering (Title, FamilySize)\n• 3 model eğitim + karşılaştırma\n• Kaggle submission dosyası oluşturma",
      color: C.acc, duration: "~90 dk"
    },
    {
      title: "diyabet_teshisi.ipynb",
      desc: "Pima Indians diyabet tahmini projesi.\n\n• Klinik veri analizi ve ön işleme\n• Dengesiz veri ile başa çıkma\n• F1-Score ve ROC/AUC değerlendirme\n• En iyi modeli seçme stratejisi",
      color: C.amber, duration: "~60 dk"
    },
  ];

  notebooks.forEach((nb, i) => {
    const x = 0.4 + i * 3.1;
    card(s, x, 0.95, 2.85, 4.2, { topColor: nb.color });
    badge(s, x + 0.15, y = 1.1, i + 1, nb.color);
    s.addText(nb.title, { x: x + 0.6, y: 1.08, w: 2.1, h: 0.35, margin: 0, fontFace: "Consolas", fontSize: 9, bold: true, color: nb.color });
    T.cardBody(s, x + 0.15, 1.55, 2.55, 3.0, nb.desc);
    // Süre etiketi
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.8, y: 4.7, w: 1.2, h: 0.3, fill: { color: nb.color } });
    s.addText(nb.duration, { x: x + 0.8, y: 4.7, w: 1.2, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ödev ve Kaynaklar", "BÖLÜM 4");

  // Ödev kartı
  card(s, 0.4, 0.95, 4.5, 3.2, { topColor: C.sec });
  T.cardTitle(s, 0.65, 1.1, 4.0, "Haftalık Ödev", C.sec);

  const assignments = [
    { task: "Kaggle Titanic Submission", detail: "Titanic notebook'unu tamamla ve Kaggle'a submit et.\nSkor ekran görüntüsünü paylaş.", color: C.acc },
    { task: "3 Algoritma Raporu", detail: "Her algoritma için: Accuracy, Precision, Recall,\nF1-Score ve Confusion Matrix tablosu.", color: C.amber },
    { task: "En İyi Model Analizi", detail: "Neden o model en iyi? Hangi metriğe göre\nseçtin? 1 sayfa yazılı açıklama.", color: C.purple },
  ];

  assignments.forEach((a, i) => {
    const y = 1.55 + i * 0.82;
    badge(s, 0.6, y + 0.06, i + 1, a.color);
    s.addText(a.task, { x: 1.1, y, w: 3.6, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10.5, bold: true, color: a.color });
    T.cardBody(s, 1.1, y + 0.3, 3.6, 0.45, a.detail, { size: 9.5 });
  });

  // Kaynaklar kartı
  card(s, 5.15, 0.95, 4.45, 3.2, { topColor: C.acc });
  T.cardTitle(s, 5.35, 1.1, 4.05, "Kaynaklar", C.acc);

  const resources = [
    { title: "Kaggle Learn: Intro to ML", url: "kaggle.com/learn/intro-to-machine-learning" },
    { title: "sklearn Classification Docs", url: "scikit-learn.org/stable/supervised_learning.html" },
    { title: "Titanic Tutorial (Kaggle)", url: "kaggle.com/competitions/titanic" },
    { title: "Confusion Matrix Explained", url: "YouTube: StatQuest" },
    { title: "ROC ve AUC Açıklaması", url: "YouTube: StatQuest" },
    { title: "Pima Indians Dataset", url: "kaggle.com/datasets/uciml/pima-indians-diabetes" },
  ];

  resources.forEach((r, i) => {
    const y = 1.55 + i * 0.42;
    s.addText("▸ " + r.title, { x: 5.35, y, w: 4.05, h: 0.22, margin: 0, fontFace: "Georgia", fontSize: 9.5, bold: true, color: C.dark });
    s.addText(r.url, { x: 5.55, y: y + 0.2, w: 3.85, h: 0.18, margin: 0, fontFace: "Calibri", fontSize: 8, color: C.acc, italic: true });
  });

  // Alt: teslim tarihi
  card(s, 0.4, 4.4, 9.2, 0.8, { leftColor: C.red });
  T.cardTitle(s, 0.65, 4.48, 8.8, "Teslim", C.red);
  T.cardBody(s, 0.65, 4.8, 8.8, 0.3, "Kaggle submission ekran görüntüsü + rapor → bir sonraki hafta dersten önce. Kaggle hesap linkinizi paylaşmayı unutmayın!");
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 6 — Önemli Çıkarımlar",
  [
    { text: "Sınıflandırma, veriyi önceden tanımlı kategorilere atama işlemidir — binary veya multi-class", color: C.sec },
    { text: "Lojistik Regresyon, KNN ve Karar Ağacı farklı güçlere sahip: probleme göre seçin", color: C.acc },
    { text: "Confusion Matrix ve metrikler (Precision, Recall, F1) doğru değerlendirmenin temelidir", color: C.amber },
    { text: "Cross Validation ile model performansını güvenilir şekilde ölçün", color: C.purple },
    { text: "Kaggle ile gerçek dünya problemlerinde pratik yapın — öğrenmenin en iyi yolu uygulamadır!", color: C.green },
  ],
  "Veri bilimcinin en güçlü silahı doğru soruyu sormak ve doğru metrikle değerlendirmektir.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// KAYDET
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta06_siniflandirma_kaggle.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("PPTX olusturuldu:", outPath))
  .catch(err => console.error("HATA:", err));
