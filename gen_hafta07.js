/**
 * Hafta 7 — İleri Makine Öğrenmesi ve Ensemble Modeller
 * =====================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 7: İleri Makine Öğrenmesi ve Ensemble Modeller");
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
  "Ensemble\nModeller",
  "Hafta 7 \u00b7 Mod\u00fcl 7\nXGBoost, LightGBM ve Hiperparametre Optimizasyonu",
  "Dr. Murat Altun",
  [
    { value: "6",  label: "Saat\n(Teori + Uygulama)" },
    { value: "3",  label: "Notebook\n(Ensemble, Churn, Tune)" },
    { value: "4",  label: "Model\n(RF, GBM, XGB, LGBM)" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "\u0130\u00e7indekiler", null);

  const sections = [
    { num: "01", title: "Ensemble Learning Temelleri", items: "Kalaba\u0131\u011f\u0131n bilgeli\u011fi \u00b7 Bagging vs Boosting \u00b7 \u00e7o\u011funluk oyu", color: C.sec,    slides: "Slayt 3\u20136" },
    { num: "02", title: "Random Forest & Gradient Boosting", items: "Random Forest \u00b7 XGBoost \u00b7 LightGBM \u00b7 model kar\u015f\u0131la\u015ft\u0131rma", color: C.acc,    slides: "Slayt 7\u201310" },
    { num: "03", title: "Feature & Overfitting Y\u00f6netimi", items: "Feature importance \u00b7 overfitting \u00b7 regularization", color: C.amber,  slides: "Slayt 11\u201313" },
    { num: "04", title: "Hiperparametre & Proje",         items: "GridSearchCV \u00b7 Churn analizi \u00b7 model se\u00e7im stratejisi \u00b7 \u00f6dev", color: C.purple, slides: "Slayt 14\u201320" },
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
// SLAYT 3 — ENSEMBLE LEARNING NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ensemble Learning Nedir?", "B\u00d6L\u00dcM 1");

  // Analoji kart\u0131
  card(s, 0.4, 0.95, 4.5, 2.2, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 4.1, "Kalabal\u0131\u011f\u0131n Bilgeli\u011fi", C.sec);
  T.cardBody(s, 0.6, 1.45, 4.1, 1.5,
    "1906'da Francis Galton bir fuarda ke\u015ffetti: 787 ki\u015finin \u00f6k\u00fczn \u00e2\u011f\u0131rl\u0131\u011f\u0131 tahminlerinin ortalamas\u0131, ger\u00e7ek de\u011fere uzmanlardan daha yak\u0131nd\u0131! Ensemble learning de ayn\u0131 prensibi kullan\u0131r \u2014 birden fazla modelin birle\u015fik tahmini, tek bir modelden daha g\u00fc\u00e7l\u00fcd\u00fcr."
  );

  // Sa\u011f panel: kar\u015f\u0131la\u015ft\u0131rma
  card(s, 5.2, 0.95, 4.4, 2.2, { topColor: C.acc });
  T.cardTitle(s, 5.4, 1.15, 4.0, "Tek Model vs Ensemble", C.acc);

  const rows = [
    ["Kriter", "Tek Model", "Ensemble"],
    ["Do\u011fruluk", "Orta", "Y\u00fcksek"],
    ["Varyans", "Y\u00fcksek", "D\u00fc\u015f\u00fck"],
    ["Overfitting", "Risk y\u00fcksek", "Diren\u00e7 y\u00fcksek"],
    ["Yorumlanabilirlik", "Kolay", "Zor"],
  ];
  rows.forEach((r, i) => {
    const ry = 1.55 + i * 0.32;
    const bg = i === 0 ? C.pri : (i % 2 === 0 ? C.warmBg : C.card);
    const fc = i === 0 ? "FFFFFF" : C.dark;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.4, y: ry, w: 4.0, h: 0.3, fill: { color: bg } });
    s.addText(r[0], { x: 5.45, y: ry, w: 1.3, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9.5, bold: i===0, color: fc });
    s.addText(r[1], { x: 6.8, y: ry, w: 1.3, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: fc, align: "center" });
    s.addText(r[2], { x: 8.1, y: ry, w: 1.3, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9.5, bold: i > 0, color: i > 0 ? C.green : fc, align: "center" });
  });

  // Alt: 3 temel strateji
  const strategies = [
    { title: "Bagging", desc: "Paralel e\u011fitim\n\u00d6rn: Random Forest", color: C.acc },
    { title: "Boosting", desc: "S\u0131ral\u0131 hata d\u00fczeltme\n\u00d6rn: XGBoost", color: C.sec },
    { title: "Stacking", desc: "Meta-\u00f6\u011frenme\n\u00d6rn: StackingClassifier", color: C.purple },
  ];
  strategies.forEach((st, i) => {
    const sx = 0.4 + i * 3.15;
    card(s, sx, 3.4, 2.95, 1.8, { topColor: st.color });
    badge(s, sx + 0.1, 3.55, i + 1, st.color);
    s.addText(st.title, { x: sx + 0.55, y: 3.55, w: 2.2, h: 0.36, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: st.color });
    T.cardBody(s, sx + 0.15, 4.0, 2.65, 1.0, st.desc, { size: 10.5 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — BAGGING vs BOOSTING
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Bagging vs Boosting", "B\u00d6L\u00dcM 1");

  // Sol kart: Bagging
  card(s, 0.4, 0.95, 4.4, 4.15, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.15, 4.0, "Bagging (Bootstrap Aggregating)", C.acc);

  const baggingSteps = [
    "Orijinal veriden N rastgele alt \u00f6rneklem \u00e7ek (bootstrap)",
    "Her alt \u00f6rneklem \u00fczerinde ba\u011f\u0131ms\u0131z model e\u011fit",
    "Modeller paralel \u00e7al\u0131\u015f\u0131r \u2014 birbirinden habersiz",
    "Tahminleri \u00e7o\u011funluk oyu ile birle\u015ftir",
    "Varyans\u0131 d\u00fc\u015f\u00fcr\u00fcr, bias'\u0131 de\u011fi\u015ftirmez",
  ];
  baggingSteps.forEach((step, i) => {
    const by = 1.55 + i * 0.6;
    badge(s, 0.55, by + 0.05, i + 1, C.acc);
    T.cardBody(s, 1.0, by, 3.6, 0.5, step, { size: 10 });
  });

  // Sa\u011f kart: Boosting
  card(s, 5.2, 0.95, 4.4, 4.15, { topColor: C.sec });
  T.cardTitle(s, 5.4, 1.15, 4.0, "Boosting (S\u0131ral\u0131 \u00d6\u011frenme)", C.sec);

  const boostingSteps = [
    "\u0130lk model t\u00fcm veriyle e\u011fitilir",
    "Yanl\u0131\u015f tahmin edilen \u00f6rneklerin a\u011f\u0131rl\u0131\u011f\u0131 art\u0131r\u0131l\u0131r",
    "Sonraki model hatalara odaklan\u0131r",
    "Her model \u00f6ncekinin hatas\u0131n\u0131 d\u00fczeltmeye \u00e7al\u0131\u015f\u0131r",
    "Bias'\u0131 d\u00fc\u015f\u00fcr\u00fcr, dikkatli olmazsan overfitting riski",
  ];
  boostingSteps.forEach((step, i) => {
    const by = 1.55 + i * 0.6;
    badge(s, 5.35, by + 0.05, i + 1, C.sec);
    T.cardBody(s, 5.8, by, 3.6, 0.5, step, { size: 10 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — RANDOM FOREST
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Random Forest", "B\u00d6L\u00dcM 1");

  card(s, 0.4, 0.95, 5.0, 1.8, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.05, 4.6, "Nas\u0131l \u00c7al\u0131\u015f\u0131r?", C.acc);
  T.cardBody(s, 0.6, 1.45, 4.6, 1.1,
    "Birden fazla karar a\u011fac\u0131 (decision tree) e\u011fitilir. Her a\u011fa\u00e7 farkl\u0131 veri alt \u00f6rneklemi ve farkl\u0131 \u00f6zellik alt k\u00fcmesi kullan\u0131r. Son tahmin, t\u00fcm a\u011fa\u00e7lar\u0131n \u00e7o\u011funluk oyu (s\u0131n\u0131fland\u0131rma) veya ortalamas\u0131 (regresyon) ile belirlenir."
  );

  // Sa\u011f: stat kutular
  stat(s, 5.7, 0.95, 1.95, 1.3, "100+", "A\u011fa\u00e7 Say\u0131s\u0131\n(varsay\u0131lan)", C.acc);
  stat(s, 7.8, 0.95, 1.95, 1.3, "\u221ap", "\u00d6zellik Alt\nK\u00fcmesi", C.green);

  // Kod blo\u011fu
  code(s, 0.4, 3.0, 9.2, 2.1, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.ensemble ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "RandomForestClassifier\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Model olu\u015ftur ve e\u011fit\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "rf = RandomForestClassifier(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    n_estimators=200, max_depth=10,\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    random_state=42, n_jobs=-1\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "rf.fit(X_train, y_train)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"Accuracy: {rf.score(X_test, y_test):.3f}\")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — RANDOM FOREST AVANTAJLARI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Random Forest Avantajlar\u0131", "B\u00d6L\u00dcM 1");

  const advCards = [
    { title: "Overfitting Direnci", desc: "Bagging ve \u00f6zellik rastgeleli\u011fi sayesinde tekil karar a\u011fa\u00e7lar\u0131na g\u00f6re \u00e7ok daha dayan\u0131kl\u0131. G\u00fcr\u00fclt\u00fcl\u00fc veride bile g\u00fcvenilir.", color: C.acc, icon: "1" },
    { title: "Feature Importance", desc: "Hangi \u00f6zelliklerin tahmine en \u00e7ok katk\u0131da bulundu\u011funu \u00f6l\u00e7er. Veri bilimciler i\u00e7in g\u00fc\u00e7l\u00fc yorumlama arac\u0131.", color: C.sec, icon: "2" },
    { title: "Paralel E\u011fitim", desc: "Her a\u011fa\u00e7 ba\u011f\u0131ms\u0131z e\u011fitilir \u2192 n_jobs=-1 ile t\u00fcm CPU \u00e7ekirdeklerini kullanabilir. B\u00fcy\u00fck veride h\u0131z avantaj\u0131.", color: C.green, icon: "3" },
    { title: "\u00c7ok Y\u00f6nl\u00fcl\u00fck", desc: "S\u0131n\u0131fland\u0131rma ve regresyon. Eksik veri tolerans\u0131. Hem kategorik hem say\u0131sal \u00f6zelliklerle \u00e7al\u0131\u015f\u0131r.", color: C.purple, icon: "4" },
  ];

  advCards.forEach((c, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const cx = 0.4 + col * 4.7;
    const cy = 0.95 + row * 2.2;
    card(s, cx, cy, 4.5, 1.95, { topColor: c.color });
    badge(s, cx + 0.15, cy + 0.2, c.icon, c.color);
    s.addText(c.title, { x: cx + 0.6, y: cy + 0.18, w: 3.6, h: 0.36, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: c.color });
    T.cardBody(s, cx + 0.15, cy + 0.65, 4.2, 1.1, c.desc, { size: 10.5 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — GRADIENT BOOSTING
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Gradient Boosting", "B\u00d6L\u00dcM 2");

  card(s, 0.4, 0.95, 9.2, 1.6, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 8.8, "Ad\u0131m Ad\u0131m Hata D\u00fczeltme", C.sec);
  T.cardBody(s, 0.6, 1.45, 8.8, 0.9,
    "Gradient Boosting, her yeni modelin bir \u00f6nceki modelin art\u0131klar\u0131n\u0131 (residuals) \u00f6\u011frenmesine dayan\u0131r. Bu, gradyan ini\u015f (gradient descent) optimizasyonunun fonksiyon uzay\u0131ndaki kar\u015f\u0131l\u0131\u011f\u0131d\u0131r. Learning rate ile ad\u0131m b\u00fcy\u00fckl\u00fc\u011f\u00fc kontrol edilir."
  );

  // Timeline: 5 ad\u0131m
  const steps = [
    { label: "\u0130lk Model", desc: "Basit tahmin\n(ortalama)", color: C.acc },
    { label: "Hatalar\u0131 Hesapla", desc: "Residuals:\ny - \u0177", color: C.sec },
    { label: "Hatalara Odaklan", desc: "Yeni a\u011fa\u00e7\nresiduals \u00f6\u011frenir", color: C.amber },
    { label: "G\u00fcncelle", desc: "\u0177 += \u03b7 \u00d7 h(x)\n(learning rate)", color: C.green },
    { label: "Tekrarla", desc: "n_estimators\nkadar devam", color: C.purple },
  ];

  steps.forEach((st, i) => {
    const sx = 0.4 + i * 1.88;
    card(s, sx, 2.85, 1.72, 1.8, { topColor: st.color });
    badge(s, sx + 0.68, 3.0, i + 1, st.color);
    s.addText(st.label, { x: sx + 0.05, y: 3.45, w: 1.62, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: st.color, align: "center" });
    T.cardBody(s, sx + 0.05, 3.85, 1.62, 0.7, st.desc, { size: 9.5 });
    // Ok i\u015fareti (son hari\u00e7)
    if (i < steps.length - 1) {
      s.addText("\u2192", { x: sx + 1.62, y: 3.4, w: 0.35, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 18, color: C.mid, align: "center", valign: "middle" });
    }
  });

  // Learning rate notu
  card(s, 0.4, 4.85, 9.2, 0.55, { bg: C.accPale });
  T.cardBody(s, 0.6, 4.88, 8.8, 0.45, "Learning Rate (\u03b7): K\u00fc\u00e7\u00fck de\u011fer \u2192 daha fazla a\u011fa\u00e7 gerekir ama daha iyi genelleme. Tipik aral\u0131k: 0.01\u20130.3", { size: 10, color: C.acc });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — XGBOOST
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "XGBoost", "B\u00d6L\u00dcM 2");

  // \u00dcst: neden pop\u00fcler
  card(s, 0.4, 0.95, 5.4, 1.6, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 5.0, "Neden En Pop\u00fcler?", C.sec);
  const xgbFeatures = [
    "Kaggle yar\u0131\u015fmalar\u0131n\u0131n %70+'unda kazanan model",
    "L1/L2 regularization ile overfitting kontrol\u00fc",
    "Eksik veri otomatik y\u00f6netimi (sparse aware)",
    "Paralel a\u011fa\u00e7 in\u015fas\u0131 \u2192 CPU \u00e7ekirdeklerini verimli kullan\u0131r",
  ];
  xgbFeatures.forEach((f, i) => {
    T.cardBody(s, 0.6, 1.45 + i * 0.27, 5.0, 0.27, "\u2022 " + f, { size: 10 });
  });

  // Sa\u011f stat
  stat(s, 6.1, 0.95, 1.75, 1.3, "%70+", "Kaggle\nKazanan\u0131", C.sec);
  stat(s, 8.0, 0.95, 1.75, 1.3, "2014", "\u0130lk S\u00fcr\u00fcm\nTianqi Chen", C.acc);

  // Kod blo\u011fu
  code(s, 0.4, 2.8, 9.2, 2.5, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "xgboost ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "xgb\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# XGBoost modeli olu\u015ftur\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "model = xgb.XGBClassifier(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    n_estimators=300,\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    learning_rate=0.1,\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    max_depth=6,\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    reg_alpha=0.1,    # L1 regularization\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    reg_lambda=1.0,   # L2 regularization\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    eval_metric='logloss'\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "model.fit(X_train, y_train)", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — LIGHTGBM
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "LightGBM", "B\u00d6L\u00dcM 2");

  // \u00dcst a\u00e7\u0131klama
  card(s, 0.4, 0.95, 5.4, 2.0, { leftColor: C.green });
  T.cardTitle(s, 0.6, 1.05, 5.0, "Histogram Tabanl\u0131 B\u00f6lme", C.green);
  T.cardBody(s, 0.6, 1.45, 5.0, 1.3,
    "LightGBM, s\u00fcrekli de\u011ferleri histogram kutular\u0131na (bins) b\u00f6ler. Bu sayede b\u00f6lme noktas\u0131 arama i\u015flemi O(n) yerine O(bins) olur. Leaf-wise b\u00fcy\u00fcme stratejisi ile daha derin ve etkili a\u011fa\u00e7lar olu\u015fturur. Microsoft Research taraf\u0131ndan 2017'de geli\u015ftirildi."
  );

  // Sa\u011f: h\u0131z kar\u015f\u0131la\u015ft\u0131rma
  stat(s, 6.1, 0.95, 1.75, 1.3, "20x", "H\u0131z Fark\u0131\nvs GBM", C.green);
  stat(s, 8.0, 0.95, 1.75, 1.3, "1/5", "Bellek\nKullan\u0131m\u0131", C.acc);

  // Avantaj kartlar\u0131
  const lgbmAdv = [
    { title: "B\u00fcy\u00fck Veri", desc: "Milyonlarca sat\u0131r ve y\u00fczlerce \u00f6zellik ile verimli \u00e7al\u0131\u015f\u0131r", color: C.green },
    { title: "H\u0131z", desc: "XGBoost'tan 10-20x daha h\u0131zl\u0131 e\u011fitim s\u00fcresi", color: C.acc },
    { title: "Kategorik Destek", desc: "Kategorik \u00f6zellikleri do\u011frudan i\u015fler, encoding gerektirmez", color: C.amber },
  ];

  lgbmAdv.forEach((a, i) => {
    const ax = 0.4 + i * 3.15;
    card(s, ax, 3.2, 2.95, 1.6, { topColor: a.color });
    s.addText(a.title, { x: ax + 0.15, y: 3.35, w: 2.65, h: 0.36, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: a.color });
    T.cardBody(s, ax + 0.15, 3.75, 2.65, 0.9, a.desc, { size: 10.5 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — 4 MODEL KAR\u015eILA\u015eTIRMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "4 Model Kar\u015f\u0131la\u015ft\u0131rma", "B\u00d6L\u00dcM 2");

  // Tablo
  const headers = ["Kriter", "Random Forest", "GBM", "XGBoost", "LightGBM"];
  const tableData = [
    ["E\u011fitim H\u0131z\u0131",        "Orta",          "Yava\u015f",    "H\u0131zl\u0131",     "\u00c7ok H\u0131zl\u0131"],
    ["Do\u011fruluk",           "\u0130yi",           "\u0130yi",      "\u00c7ok \u0130yi",   "\u00c7ok \u0130yi"],
    ["Bellek Kullan\u0131m\u0131",   "Y\u00fcksek",        "Orta",     "Orta",      "D\u00fc\u015f\u00fck"],
    ["Overfitting Riski",  "D\u00fc\u015f\u00fck",         "Orta",     "D\u00fc\u015f\u00fck",     "Orta"],
    ["B\u00fcy\u00fck Veri Deste\u011fi", "Orta",          "Zay\u0131f",    "\u0130yi",       "\u00c7ok \u0130yi"],
    ["Eksik Veri",         "K\u0131smen",        "Hay\u0131r",    "Otomatik",  "Otomatik"],
    ["Paralel E\u011fitim",     "Evet",          "Hay\u0131r",    "Evet",      "Evet"],
    ["Hiperparametre",     "Az",            "\u00c7ok",      "Orta",      "Orta"],
  ];

  // Header row
  const colW = [2.0, 1.8, 1.4, 1.8, 1.8];
  let tx = 0.5;
  headers.forEach((h, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: tx, y: 0.95, w: colW[i], h: 0.42, fill: { color: C.pri } });
    s.addText(h, { x: tx, y: 0.95, w: colW[i], h: 0.42, margin: [0,4,0,4], fontFace: "Calibri", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    tx += colW[i];
  });

  // Data rows
  const bestCols = [null, null, null, [4], [0,3,4], [3,4], [0,3,4], [0]];
  tableData.forEach((row, ri) => {
    const ry = 1.37 + ri * 0.42;
    const rowBg = ri % 2 === 0 ? C.warmBg : C.card;
    let rx = 0.5;
    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, { x: rx, y: ry, w: colW[ci], h: 0.42, fill: { color: rowBg }, line: { color: C.bdr, width: 0.5 } });
      const isBest = bestCols[ri] && bestCols[ri].includes(ci);
      s.addText(cell, {
        x: rx, y: ry, w: colW[ci], h: 0.42, margin: [0,4,0,4],
        fontFace: "Calibri", fontSize: 9.5,
        bold: ci === 0 || isBest,
        color: isBest ? C.green : (ci === 0 ? C.pri : C.dark),
        align: ci === 0 ? "left" : "center", valign: "middle"
      });
      rx += colW[ci];
    });
  });

  // Alt not
  card(s, 0.5, 4.85, 8.8, 0.5, { bg: C.accPale });
  T.cardBody(s, 0.7, 4.88, 8.4, 0.45, "Sonu\u00e7: XGBoost genel ama\u00e7l\u0131 en iyi se\u00e7im. B\u00fcy\u00fck veri ve h\u0131z \u00f6ncelikliyse LightGBM tercih edin.", { size: 10, color: C.acc });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — FEATURE IMPORTANCE
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Feature Importance", "B\u00d6L\u00dcM 3");

  card(s, 0.4, 0.95, 4.8, 1.7, { leftColor: C.amber });
  T.cardTitle(s, 0.6, 1.05, 4.4, "Neden \u00d6nemli?", C.amber);
  T.cardBody(s, 0.6, 1.45, 4.4, 1.0,
    "Feature importance, modelin hangi \u00f6zelliklere (s\u00fctunlara) en \u00e7ok g\u00fcvendi\u011fini g\u00f6sterir. Bu bilgiyle gereksiz \u00f6zellikleri \u00e7\u0131karabilir, modeli sadele\u015ftirebilir ve i\u015f s\u00fcre\u00e7lerini iyile\u015ftirebilirsiniz."
  );

  // Sa\u011f: yorumlama kartlar\u0131
  const interp = [
    { title: "Gain", desc: "\u00d6zelli\u011fin b\u00f6lmelerdeki toplam bilgi kazanc\u0131", color: C.acc },
    { title: "Weight", desc: "\u00d6zelli\u011fin ka\u00e7 b\u00f6lmede kullan\u0131ld\u0131\u011f\u0131", color: C.sec },
    { title: "Cover", desc: "\u00d6zelli\u011fin etkiledi\u011fi \u00f6rnek say\u0131s\u0131", color: C.amber },
  ];
  interp.forEach((item, i) => {
    const iy = 0.95 + i * 0.57;
    card(s, 5.5, iy, 4.2, 0.48, { leftColor: item.color });
    s.addText(item.title, { x: 5.65, y: iy + 0.02, w: 1.0, h: 0.42, margin: 0, fontFace: "Georgia", fontSize: 10.5, bold: true, color: item.color });
    T.cardBody(s, 6.65, iy + 0.02, 2.9, 0.42, item.desc, { size: 9.5 });
  });

  // Kod blo\u011fu
  code(s, 0.4, 2.9, 9.2, 2.4, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "xgboost ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "xgb\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "matplotlib.pyplot ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "plt\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Feature importance grafi\u011fi \u00e7iz\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "xgb.plot_importance(\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "    model,\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    importance_type='gain',\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    max_num_features=10,\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    title='En \u00d6nemli 10 \u00d6zellik'\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "plt.tight_layout()\nplt.show()", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — OVERFITTING PROBLEM\u0130
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Overfitting Problemi", "B\u00d6L\u00dcM 3");

  card(s, 0.4, 0.95, 9.2, 1.4, { leftColor: C.red });
  T.cardTitle(s, 0.6, 1.05, 8.8, "Modelin En B\u00fcy\u00fck D\u00fc\u015fman\u0131: A\u015f\u0131r\u0131 Uyum", C.red);
  T.cardBody(s, 0.6, 1.45, 8.8, 0.7,
    "Overfitting, modelin e\u011fitim verisini ezberlemesi demektir. E\u011fitim setinde m\u00fckemmel performans g\u00f6sterirken, yeni (g\u00f6r\u00fclmemi\u015f) veride ba\u015far\u0131s\u0131z olur. Bu, modelin genelleme yetene\u011fini kaybetti\u011fi anlam\u0131na gelir."
  );

  // 3 durum kart\u0131
  const fits = [
    { title: "Underfitting", desc: "Model \u00e7ok basit\nHem e\u011fitim hem test\nhatas\u0131 y\u00fcksek\n\n\u00d6rn: max_depth=1", color: C.blue, perf: "E\u011fitim: %60\nTest: %58" },
    { title: "Optimal Fit", desc: "Do\u011fru karma\u015f\u0131kl\u0131k\nE\u011fitim ve test\nhatas\u0131 dengeli\n\n\u00d6rn: max_depth=6", color: C.green, perf: "E\u011fitim: %92\nTest: %89" },
    { title: "Overfitting", desc: "Model \u00e7ok karma\u015f\u0131k\nE\u011fitim m\u00fckemmel\ntest k\u00f6t\u00fc\n\n\u00d6rn: max_depth=50", color: C.red, perf: "E\u011fitim: %99\nTest: %72" },
  ];

  fits.forEach((f, i) => {
    const fx = 0.4 + i * 3.15;
    card(s, fx, 2.6, 2.95, 2.75, { topColor: f.color });
    s.addText(f.title, { x: fx + 0.15, y: 2.78, w: 2.65, h: 0.38, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: f.color, align: "center" });
    T.cardBody(s, fx + 0.15, 3.2, 2.65, 1.35, f.desc, { size: 10 });
    // Performans kutusu
    s.addShape(pres.shapes.RECTANGLE, { x: fx + 0.3, y: 4.55, w: 2.35, h: 0.6, fill: { color: C.warmBg } });
    s.addText(f.perf, { x: fx + 0.3, y: 4.55, w: 2.35, h: 0.6, margin: 0, fontFace: "Consolas", fontSize: 9.5, color: f.color, align: "center", valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — REGULARIZATION
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Regularization", "B\u00d6L\u00dcM 3");

  // L1 kart\u0131
  card(s, 0.4, 0.95, 4.4, 2.2, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.15, 4.0, "L1 \u2014 Lasso Regularization", C.acc);
  T.cardBody(s, 0.6, 1.55, 4.0, 1.4,
    "A\u011f\u0131rl\u0131klar\u0131n mutlak de\u011ferlerinin toplam\u0131n\u0131 ceza terimi olarak ekler. Baz\u0131 a\u011f\u0131rl\u0131klar\u0131 tamamen s\u0131f\u0131rlar \u2192 otomatik \u00f6zellik se\u00e7imi yapar.\n\nXGBoost: reg_alpha parametresi\nForm\u00fcl: Loss + \u03b1 \u00d7 \u03a3|w|"
  );

  // L2 kart\u0131
  card(s, 5.2, 0.95, 4.4, 2.2, { topColor: C.sec });
  T.cardTitle(s, 5.4, 1.15, 4.0, "L2 \u2014 Ridge Regularization", C.sec);
  T.cardBody(s, 5.4, 1.55, 4.0, 1.4,
    "A\u011f\u0131rl\u0131klar\u0131n karelerinin toplam\u0131n\u0131 ceza terimi olarak ekler. B\u00fcy\u00fck a\u011f\u0131rl\u0131klar\u0131 k\u00fc\u00e7\u00fclt\u00fcr ama s\u0131f\u0131rlamaz \u2192 t\u00fcm \u00f6zellikler kal\u0131r.\n\nXGBoost: reg_lambda parametresi\nForm\u00fcl: Loss + \u03bb \u00d7 \u03a3w\u00b2"
  );

  // Alt: neden gerekli
  card(s, 0.4, 3.4, 9.2, 1.9, { leftColor: C.amber });
  T.cardTitle(s, 0.6, 3.5, 8.8, "Ensemble Modellerde Neden Gerekli?", C.amber);

  const regReasons = [
    { title: "Karma\u015f\u0131kl\u0131k Kontrol\u00fc", desc: "Y\u00fczlerce a\u011fa\u00e7 \u2192 milyonlarca parametre. Regularization olmadan model ezberlemeye meyillidir.", color: C.acc },
    { title: "Genelleme G\u00fcc\u00fc", desc: "Ceza terimi, modeli basit ve genellenebilir tutarak test performans\u0131n\u0131 art\u0131r\u0131r.", color: C.sec },
    { title: "\u00d6zellik Se\u00e7imi (L1)", desc: "Gereksiz \u00f6zelliklerin etkisini otomatik olarak s\u0131f\u0131rlayarak modeli sadele\u015ftirir.", color: C.amber },
  ];
  regReasons.forEach((r, i) => {
    const rx = 0.6 + i * 3.0;
    badge(s, rx, 3.95, i + 1, r.color);
    s.addText(r.title, { x: rx + 0.42, y: 3.92, w: 2.4, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 10.5, bold: true, color: r.color });
    T.cardBody(s, rx, 4.3, 2.8, 0.85, r.desc, { size: 9.5 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — H\u0130PERPARAMETRE OPT\u0130M\u0130ZASYONU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Hiperparametre Optimizasyonu", "B\u00d6L\u00dcM 4");

  // Grid vs Random kar\u015f\u0131la\u015ft\u0131rma
  card(s, 0.4, 0.95, 4.4, 3.5, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.15, 4.0, "GridSearchCV", C.acc);
  const gridItems = [
    "T\u00fcm parametre kombinasyonlar\u0131n\u0131 dener",
    "Kapsaml\u0131 ama yava\u015f (brute force)",
    "K\u00fc\u00e7\u00fck parametre uzaylar\u0131 i\u00e7in ideal",
    "Cross-validation ile de\u011ferlendirir",
    "En iyi: best_params_, best_score_",
  ];
  gridItems.forEach((item, i) => {
    badge(s, 0.55, 1.55 + i * 0.45, i + 1, C.acc);
    T.cardBody(s, 1.0, 1.55 + i * 0.45, 3.6, 0.4, item, { size: 10 });
  });

  card(s, 5.2, 0.95, 4.4, 3.5, { topColor: C.sec });
  T.cardTitle(s, 5.4, 1.15, 4.0, "RandomizedSearchCV", C.sec);
  const randItems = [
    "Rastgele parametre \u00f6rnekleri dener",
    "n_iter ile deneme say\u0131s\u0131 kontrol edilir",
    "B\u00fcy\u00fck parametre uzaylar\u0131 i\u00e7in ideal",
    "Benzer sonu\u00e7, \u00e7ok daha h\u0131zl\u0131",
    "Da\u011f\u0131l\u0131m nesneleri kullan\u0131labilir (scipy)",
  ];
  randItems.forEach((item, i) => {
    badge(s, 5.35, 1.55 + i * 0.45, i + 1, C.sec);
    T.cardBody(s, 5.8, 1.55 + i * 0.45, 3.6, 0.4, item, { size: 10 });
  });

  // Alt kar\u015f\u0131la\u015ft\u0131rma
  const cmpHeaders = ["Kriter", "GridSearchCV", "RandomizedSearchCV"];
  const cmpData = [
    ["10 parametre \u00d7 5 de\u011fer", "100.000 deneme", "n_iter=50 deneme"],
    ["S\u00fcre", "Saatler/G\u00fcnler", "Dakikalar"],
    ["Sonu\u00e7 Kalitesi", "Garantili en iyi", "Yakla\u015f\u0131k en iyi"],
  ];

  let cx = 0.5;
  const cw = [3.0, 3.0, 3.0];
  cmpHeaders.forEach((h, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 4.65, w: cw[i], h: 0.35, fill: { color: C.pri } });
    s.addText(h, { x: cx, y: 4.65, w: cw[i], h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 9.5, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    cx += cw[i];
  });
  cmpData.forEach((row, ri) => {
    let rx = 0.5;
    const bg = ri % 2 === 0 ? C.warmBg : C.card;
    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, { x: rx, y: 5.0 + ri * 0.28, w: cw[ci], h: 0.28, fill: { color: bg } });
      s.addText(cell, { x: rx, y: 5.0 + ri * 0.28, w: cw[ci], h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.dark, align: "center", valign: "middle" });
      rx += cw[ci];
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — GRIDSEARCHCV UYGULAMASI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "GridSearchCV Uygulamas\u0131", "B\u00d6L\u00dcM 4");

  code(s, 0.4, 0.95, 9.2, 4.3, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "sklearn.model_selection ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "GridSearchCV\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "xgboost ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "XGBClassifier\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Parametre \u0131zgaras\u0131 tan\u0131mla\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "param_grid = {\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    'n_estimators': [100, 200, 300],\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    'max_depth': [3, 5, 7],\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    'learning_rate': [0.01, 0.1, 0.3],\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    'subsample': [0.8, 1.0]\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "}\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# GridSearchCV ile en iyi parametreleri bul\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "grid = GridSearchCV(\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "    XGBClassifier(eval_metric='logloss'),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    param_grid, cv=5, scoring='accuracy',\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    n_jobs=-1, verbose=1\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "grid.fit(X_train, y_train)\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"En iyi parametreler: {grid.best_params_}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"En iyi skor: {grid.best_score_:.4f}\")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — M\u00dc\u015eTER\u0130 TERK ANAL\u0130Z\u0130 \u00d6RNE\u011e\u0130
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "M\u00fc\u015fteri Terk Analizi (Churn)", "B\u00d6L\u00dcM 4");

  card(s, 0.4, 0.95, 5.0, 1.6, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 4.6, "Telco Customer Churn Dataset", C.sec);
  T.cardBody(s, 0.6, 1.45, 4.6, 0.9,
    "Bir telekom\u00fcnikasyon \u015firketinin 7.043 m\u00fc\u015fterisi. Ama\u00e7: Hangi m\u00fc\u015fteriler hizmeti b\u0131rakacak? XGBoost ile tahmin ve i\u015f kararlar\u0131na y\u00f6n verme."
  );

  // Sa\u011f: veri istatistikleri
  stat(s, 5.7, 0.95, 1.95, 1.3, "7K+", "M\u00fc\u015fteri\nKayd\u0131", C.sec);
  stat(s, 7.8, 0.95, 1.95, 1.3, "21", "\u00d6zellik\nSay\u0131s\u0131", C.acc);

  // Pipeline ad\u0131mlar\u0131
  const pipeline = [
    { step: "Veri Y\u00fckleme", desc: "CSV okuma, ilk inceleme", color: C.acc },
    { step: "\u00d6n \u0130\u015fleme", desc: "Encoding, \u00f6l\u00e7ekleme, train/test", color: C.sec },
    { step: "XGBoost E\u011fitim", desc: "Model fit, hiperparametre ayar\u0131", color: C.amber },
    { step: "De\u011ferlendirme", desc: "Accuracy, Precision, Recall, F1", color: C.green },
  ];
  pipeline.forEach((p, i) => {
    const px = 0.4 + i * 2.35;
    card(s, px, 2.8, 2.15, 1.2, { topColor: p.color });
    badge(s, px + 0.85, 2.92, i + 1, p.color);
    s.addText(p.step, { x: px + 0.1, y: 3.3, w: 1.95, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: p.color, align: "center" });
    T.cardBody(s, px + 0.1, 3.6, 1.95, 0.3, p.desc, { size: 9, color: C.mid });
  });

  // Sonu\u00e7 metrikleri
  const metrics = [
    { label: "Accuracy", value: "%81", color: C.acc },
    { label: "Precision", value: "%79", color: C.sec },
    { label: "Recall", value: "%56", color: C.amber },
    { label: "F1-Score", value: "%65", color: C.green },
    { label: "AUC-ROC", value: "0.85", color: C.purple },
  ];
  metrics.forEach((m, i) => {
    const mx = 0.4 + i * 1.88;
    s.addShape(pres.shapes.RECTANGLE, { x: mx, y: 4.25, w: 1.72, h: 0.38, fill: { color: m.color } });
    s.addText(m.label, { x: mx, y: 4.25, w: 1.72, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addShape(pres.shapes.RECTANGLE, { x: mx, y: 4.63, w: 1.72, h: 0.6, fill: { color: C.warmBg }, line: { color: C.bdr, width: 0.5 } });
    s.addText(m.value, { x: mx, y: 4.63, w: 1.72, h: 0.6, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: m.color, align: "center", valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — MODEL SE\u00c7\u0130M STRATEJ\u0130S\u0130
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Model Se\u00e7im Stratejisi", "B\u00d6L\u00dcM 4");

  const timeline = [
    { title: "1. Baseline", desc: "Basit model ile ba\u015flang\u0131\u00e7 skoru belirle (Logistic Regression / Decision Tree). Bu skor, iyile\u015ftirmenin referans noktas\u0131d\u0131r.", color: C.acc },
    { title: "2. Ensemble Modeller", desc: "Random Forest, XGBoost ve LightGBM'i varsay\u0131lan parametrelerle dene. Hangi aile daha iyi \u00e7al\u0131\u015f\u0131yor?", color: C.sec },
    { title: "3. Hiperparametre Tune", desc: "En iyi aileyi GridSearchCV veya RandomizedSearchCV ile optimize et. Cross-validation kullan.", color: C.amber },
    { title: "4. Kar\u015f\u0131la\u015ft\u0131r", desc: "Accuracy, F1, AUC-ROC metrikleri ile modelleri de\u011ferlendir. E\u011fitim/test fark\u0131n\u0131 kontrol et (overfitting).", color: C.green },
    { title: "5. Deploy", desc: "En iyi modeli joblib ile kaydet. Pipeline olu\u015ftur. Monitoring sistemi kur.", color: C.purple },
  ];

  timeline.forEach((t, i) => {
    const ty = 0.95 + i * 0.9;
    card(s, 0.8, ty, 8.6, 0.78, { leftColor: t.color });
    badge(s, 0.4, ty + 0.2, i + 1, t.color);
    s.addText(t.title, { x: 1.0, y: ty + 0.02, w: 3.0, h: 0.34, margin: 0, fontFace: "Georgia", fontSize: 11.5, bold: true, color: t.color });
    T.cardBody(s, 1.0, ty + 0.35, 8.2, 0.4, t.desc, { size: 10 });
    // Ba\u011flant\u0131 \u00e7izgisi (son hari\u00e7)
    if (i < timeline.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.56, y: ty + 0.78, w: 0.04, h: 0.12, fill: { color: C.mid } });
    }
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 18 — HAFTALIK NOTEBOOK'LAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Haftal\u0131k Notebook'lar", "B\u00d6L\u00dcM 4");

  const notebooks = [
    {
      title: "ensemble_modeller.ipynb",
      desc: "Random Forest, Gradient Boosting, XGBoost ve LightGBM modellerinin temel kullan\u0131m\u0131. Iris ve Wine dataset'leri \u00fczerinde kar\u015f\u0131la\u015ft\u0131rmal\u0131 analiz.",
      tags: ["Random Forest", "XGBoost", "LightGBM", "Kar\u015f\u0131la\u015ft\u0131rma"],
      color: C.acc,
    },
    {
      title: "musteri_terk.ipynb",
      desc: "Telco Churn dataset \u00fczerinde u\u00e7tan uca proje. Veri temizleme, feature engineering, XGBoost ile tahmin, SHAP ile yorumlama.",
      tags: ["Churn", "XGBoost", "SHAP", "Pipeline"],
      color: C.sec,
    },
    {
      title: "hiperparametre_avi.ipynb",
      desc: "GridSearchCV ve RandomizedSearchCV ile hiperparametre optimizasyonu. Learning curve analizi ve overfitting tespiti.",
      tags: ["GridSearch", "RandomSearch", "Cross-Val", "Tuning"],
      color: C.amber,
    },
  ];

  notebooks.forEach((nb, i) => {
    const ny = 0.95 + i * 1.5;
    card(s, 0.4, ny, 9.2, 1.35, { leftColor: nb.color });
    badge(s, 0.55, ny + 0.15, i + 1, nb.color);
    s.addText(nb.title, { x: 1.0, y: ny + 0.1, w: 5, h: 0.36, margin: 0, fontFace: "Consolas", fontSize: 12, bold: true, color: nb.color });
    T.cardBody(s, 1.0, ny + 0.48, 8.2, 0.45, nb.desc, { size: 10 });

    // Etiketler
    let tx = 1.0;
    nb.tags.forEach((tag) => {
      const tw = tag.length * 0.075 + 0.35;
      s.addShape(pres.shapes.RECTANGLE, { x: tx, y: ny + 0.95, w: tw, h: 0.28, fill: { color: C.warmBg }, line: { color: nb.color, width: 0.8 } });
      s.addText(tag, { x: tx, y: ny + 0.95, w: tw, h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 8.5, color: nb.color, align: "center", valign: "middle" });
      tx += tw + 0.1;
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — \u00d6DEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "\u00d6dev ve Kaynaklar", "B\u00d6L\u00dcM 4");

  // \u00d6dev kart\u0131
  card(s, 0.4, 0.95, 5.4, 3.0, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 5.0, "Haftal\u0131k \u00d6dev", C.sec);

  const odevler = [
    { text: "XGBoost ile Telco Churn tahmin modeli kur \u2192 %85+ accuracy hedefi", bold: true },
    { text: "GridSearchCV ile en az 3 hiperparametre optimize et" },
    { text: "Feature importance grafi\u011fi \u00e7iz ve en \u00f6nemli 5 \u00f6zelli\u011fi yorumla" },
    { text: "Random Forest vs XGBoost kar\u015f\u0131la\u015ft\u0131rma raporu haz\u0131rla" },
    { text: "Bonus: LightGBM ile ayn\u0131 veriyi dene, h\u0131z fark\u0131n\u0131 \u00f6l\u00e7" },
  ];
  odevler.forEach((o, i) => {
    badge(s, 0.55, 1.6 + i * 0.42, i + 1, o.bold ? C.sec : C.mid);
    T.cardBody(s, 1.0, 1.6 + i * 0.42, 4.6, 0.38, o.text, { size: 10, color: o.bold ? C.sec : C.dark });
  });

  // Teslim notu
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.55, w: 4.8, h: 0.3, fill: { color: C.accPale } });
  T.cardBody(s, 0.7, 3.55, 4.6, 0.3, "Teslim: Hafta 8 dersi \u00f6ncesi \u00b7 Format: Jupyter Notebook (.ipynb)", { size: 9, color: C.acc });

  // Kaynaklar kart\u0131
  card(s, 6.0, 0.95, 3.7, 4.3, { topColor: C.acc });
  T.cardTitle(s, 6.2, 1.15, 3.3, "Kaynaklar", C.acc);

  const kaynaklar = [
    "XGBoost Documentation\nxgboost.readthedocs.io",
    "LightGBM Documentation\nlightgbm.readthedocs.io",
    "scikit-learn Ensemble\nsklearn User Guide",
    "Kaggle Learn:\nIntro to Machine Learning",
    "Hands-On ML (G\u00e9ron)\nB\u00f6l\u00fcm 7: Ensemble",
  ];
  kaynaklar.forEach((k, i) => {
    badge(s, 6.15, 1.6 + i * 0.65, i + 1, C.acc);
    T.cardBody(s, 6.55, 1.6 + i * 0.65, 2.95, 0.58, k, { size: 9 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANI\u015e
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 7 \u2014 \u00d6zet",
  [
    { text: "Ensemble Learning: Birden fazla modelin birle\u015fik g\u00fcc\u00fc, tek modelden her zaman daha g\u00fc\u00e7l\u00fcd\u00fcr", color: C.acc },
    { text: "Bagging varyans\u0131 d\u00fc\u015f\u00fcr\u00fcr (RF), Boosting bias'\u0131 d\u00fc\u015f\u00fcr\u00fcr (XGBoost, LightGBM)", color: C.sec },
    { text: "XGBoost: Regularization + paralel hesaplama ile Kaggle'\u0131n en pop\u00fcler modeli", color: C.amber },
    { text: "Overfitting kontrol\u00fc: Regularization (L1/L2) ve cross-validation \u015fart", color: C.green },
    { text: "Hiperparametre optimizasyonu model ba\u015far\u0131s\u0131n\u0131 %5-15 art\u0131rabilir", color: C.purple },
  ],
  "Tek bir a\u011fa\u00e7 devrilebilir, ama bir orman\u0131 devirmek \u00e7ok zordur.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// DOSYAYA YAZ
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta07_ensemble_modeller.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("PPTX olusturuldu:", outPath))
  .catch(err => { console.error("HATA:", err); process.exit(1); });
