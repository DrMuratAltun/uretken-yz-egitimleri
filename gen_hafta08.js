/**
 * Hafta 8 — Denetimsiz Öğrenme, Zaman Serileri ve Öneri Sistemleri
 * =================================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 8: Kümeleme, Zaman Serileri ve Öneri Sistemleri");
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
  "Kümeleme,\nZaman Serileri\nve Öneri Sistemleri",
  "Hafta 8 · Modül 8",
  "Dr. Murat Altun",
  [
    { value: "6",  label: "Saat" },
    { value: "3",  label: "Notebook" },
    { value: "3",  label: "Yöntem" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "İçindekiler", null);

  const sections = [
    { num: "01", title: "Kümeleme (Denetimsiz Öğrenme)", items: "K-Means · Elbow Method · Silhouette Score · RFM Segmentasyonu", color: C.sec, slides: "Slayt 3–8" },
    { num: "02", title: "Zaman Serileri Analizi",        items: "Trend · Mevsimsellik · Facebook Prophet · Satış Tahmini", color: C.acc, slides: "Slayt 9–12" },
    { num: "03", title: "Öneri Sistemleri",              items: "Content-based · Collaborative Filtering · SVD · MovieLens", color: C.amber, slides: "Slayt 13–16" },
  ];

  sections.forEach((sec, i) => {
    const y = 1.1 + i * 1.35;
    card(s, 0.5, y, 9.0, 1.15, { leftColor: sec.color });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.56, y: y + 0.2, w: 0.7, h: 0.7, fill: { color: sec.color } });
    s.addText(sec.num, { x: 0.56, y: y + 0.2, w: 0.7, h: 0.7, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(sec.title, { x: 1.45, y: y + 0.12, w: 5.5, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 16, bold: true, color: C.dark });
    s.addText(sec.items, { x: 1.45, y: y + 0.6, w: 5.5, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.mid });
    s.addText(sec.slides, { x: 7.8, y: y + 0.35, w: 1.5, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10, color: sec.color, bold: true, align: "right" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 3 — DENETİMSİZ ÖĞRENME NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Denetimsiz Öğrenme Nedir?", "BÖLÜM 1");

  // Sol: Denetimli vs Denetimsiz karşılaştırma tablosu
  card(s, 0.4, 0.95, 5.6, 3.2, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 5.2, "Denetimli vs Denetimsiz Öğrenme", C.sec);

  const rows = [
    ["Özellik",         "Denetimli",                "Denetimsiz"],
    ["Etiket",          "Var (y değeri)",            "Yok"],
    ["Amaç",            "Tahmin / Sınıflandırma",   "Yapı Keşfi / Gruplama"],
    ["Örnek",           "Spam tespiti, fiyat tahmini","Müşteri segmentasyonu"],
    ["Algoritma",       "Lojistik Reg., RF, XGB",   "K-Means, DBSCAN, PCA"],
    ["Değerlendirme",   "Accuracy, RMSE",           "Silhouette, Inertia"],
  ];

  rows.forEach((row, i) => {
    const y = 1.52 + i * 0.42;
    const bg = i === 0 ? C.pri : (i % 2 === 0 ? C.warmBg : C.card);
    const fc = i === 0 ? "FFFFFF" : C.dark;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y, w: 5.3, h: 0.4, fill: { color: bg } });
    s.addText(row[0], { x: 0.6,  y, w: 1.3, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 9.5, bold: i === 0, color: fc, valign: "middle" });
    s.addText(row[1], { x: 1.95, y, w: 1.95, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 9.5, bold: i === 0, color: fc, valign: "middle" });
    s.addText(row[2], { x: 3.95, y, w: 1.85, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 9.5, bold: i === 0, color: fc, valign: "middle" });
  });

  // Sağ: Kullanım alanları kartları
  card(s, 6.2, 0.95, 3.5, 1.45, { topColor: C.acc });
  T.cardTitle(s, 6.4, 1.1, 3.1, "Kullanım Alanları", C.acc);
  const usages = [
    "• Müşteri segmentasyonu",
    "• Anomali tespiti (fraud)",
    "• Boyut indirgeme (PCA)",
    "• Market sepet analizi",
  ];
  T.cardBody(s, 6.4, 1.5, 3.1, 0.85, usages.join("\n"), { size: 10 });

  // Sağ alt stat
  stat(s, 6.2, 2.6, 1.6, 1.15, "%60", "Verinin\nEtiketsiz", C.sec);
  stat(s, 8.1, 2.6, 1.6, 1.15, "3+", "Kümeleme\nAlgoritmasi", C.acc);

  // Alt bilgi
  card(s, 0.4, 4.35, 9.3, 0.75, { leftColor: C.amber });
  T.cardBody(s, 0.6, 4.42, 8.9, 0.6,
    "Gerçek dünyada verilerin büyük çoğunluğu etiketsizdir. Denetimsiz öğrenme, verinin doğal yapısını keşfetmek için en güçlü yaklaşımdır.",
    { size: 10.5, color: C.mid }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — K-MEANS KÜMELEME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "K-Means Kümeleme Algoritması", "BÖLÜM 1");

  // Sol: Algoritma adımları
  card(s, 0.4, 0.95, 5.2, 3.6, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 4.8, "Algoritma Adımları", C.sec);

  const steps = [
    { n: 1, txt: "K adet rastgele merkez (centroid) seç", color: C.sec },
    { n: 2, txt: "Her veri noktasını en yakın centroid'e ata", color: C.acc },
    { n: 3, txt: "Her kümenin yeni centroid'ini hesapla (ortalama)", color: C.amber },
    { n: 4, txt: "Centroid'ler değişmeyene kadar 2–3'ü tekrarla", color: C.purple },
    { n: 5, txt: "Yakınsama → Kümeler oluştu!", color: C.green },
  ];

  steps.forEach((st, i) => {
    const y = 1.55 + i * 0.58;
    badge(s, 0.6, y + 0.05, st.n, st.color);
    card(s, 1.08, y, 4.35, 0.48, { leftColor: st.color });
    T.cardBody(s, 1.22, y + 0.02, 4.1, 0.44, st.txt, { size: 10.5 });
  });

  // Sağ: Anahtar kavramlar
  card(s, 5.85, 0.95, 3.85, 1.6, { topColor: C.acc });
  T.cardTitle(s, 6.05, 1.1, 3.5, "Anahtar Kavramlar", C.acc);
  T.cardBody(s, 6.05, 1.5, 3.5, 1.0,
    "Inertia: Küme içi toplam mesafe\n(düşük → sıkı kümeler)\n\nK: Küme sayısı (kullanıcı belirler)\n\nÖklid mesafesi: Varsayılan uzaklık ölçüsü",
    { size: 9.5 }
  );

  // Sağ alt: avantaj/dezavantaj
  card(s, 5.85, 2.75, 1.85, 1.8, { topColor: C.green });
  T.cardTitle(s, 6.0, 2.9, 1.6, "Avantajlar", C.green);
  T.cardBody(s, 6.0, 3.25, 1.6, 1.2,
    "• Hızlı ve ölçeklenebilir\n• Anlaşılması kolay\n• Büyük veri setleri\n  için uygun",
    { size: 9 }
  );

  card(s, 7.85, 2.75, 1.85, 1.8, { topColor: C.red });
  T.cardTitle(s, 8.0, 2.9, 1.6, "Dezavantajlar", C.red);
  T.cardBody(s, 8.0, 3.25, 1.6, 1.2,
    "• K önceden bilinmeli\n• Küresel kümeler varsayar\n• Outlier'lara duyarlı\n• Başlangıç noktası etkisi",
    { size: 9 }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — ELBOW METHOD
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Elbow Method — Optimal K Seçimi", "BÖLÜM 1");

  // Sol: Açıklama kartı
  card(s, 0.4, 0.95, 5.0, 2.0, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.1, 4.6, "Dirsek Yöntemi (Elbow Method)", C.acc);
  T.cardBody(s, 0.6, 1.52, 4.6, 1.3,
    "• Her K değeri için inertia (WCSS) hesaplanır\n• Grafik K vs Inertia olarak çizilir\n• Eğrinin \"dirsek\" yaptığı nokta optimal K'dır\n• Dirsek sonrası iyileşme azalır → diminishing returns\n• Gerçek dünyada net dirsek her zaman oluşmaz",
    { size: 10.5 }
  );

  // Sağ üst: stat box'lar
  stat(s, 5.65, 0.95, 1.95, 1.15, "K=?", "Optimal\nKüme Sayısı", C.sec);
  stat(s, 7.75, 0.95, 2.0, 1.15, "WCSS", "Within-Cluster\nSum of Squares", C.acc);

  // Sağ: Inertia tablosu (örnek)
  card(s, 5.65, 2.3, 4.1, 2.2, { topColor: C.amber });
  T.cardTitle(s, 5.85, 2.45, 3.7, "Örnek Inertia Değerleri", C.amber);
  const inRows = [
    ["K", "Inertia", "Değişim"],
    ["2", "1500", "—"],
    ["3", "800",  "-700 ↓↓"],
    ["4", "500",  "-300 ↓ (dirsek)"],
    ["5", "420",  "-80 ↓"],
    ["6", "400",  "-20"],
  ];
  inRows.forEach((r, i) => {
    const y = 2.88 + i * 0.25;
    const bg = i === 0 ? C.pri : (i === 3 ? C.accPale : (i % 2 === 0 ? C.warmBg : C.card));
    const fc = i === 0 ? "FFFFFF" : C.dark;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.8, y, w: 3.8, h: 0.24, fill: { color: bg } });
    s.addText(r[0], { x: 5.85, y, w: 0.8, h: 0.24, margin: 0, fontFace: "Calibri", fontSize: 9, bold: i === 0, color: fc, align: "center", valign: "middle" });
    s.addText(r[1], { x: 6.65, y, w: 1.2, h: 0.24, margin: 0, fontFace: "Calibri", fontSize: 9, bold: i === 0, color: fc, align: "center", valign: "middle" });
    s.addText(r[2], { x: 7.85, y, w: 1.7, h: 0.24, margin: 0, fontFace: "Calibri", fontSize: 9, bold: i === 0 || i === 3, color: i === 3 ? C.acc : fc, align: "center", valign: "middle" });
  });

  // Alt: Kod
  code(s, 0.4, 3.15, 5.0, 1.8, [
    { text: "from ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "sklearn.cluster ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "KMeans\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "\ninertias = []\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "for ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "k ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "in ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "range(2, 11):\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "    km = KMeans(n_clusters=k, random_state=42)\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    km.fit(X_scaled)\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "    inertias.append(km.inertia_)\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "\nplt.plot(range(2,11), inertias, 'o-')", options: { color: C.codeGreen, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — SILHOUETTE SCORE
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Silhouette Score — Kümeleme Kalitesi", "BÖLÜM 1");

  // Sol: Formül ve açıklama
  card(s, 0.4, 0.95, 5.4, 2.2, { topColor: C.purple });
  T.cardTitle(s, 0.6, 1.1, 5.0, "Silhouette Katsayısı", C.purple);
  T.cardBody(s, 0.6, 1.5, 5.0, 0.5,
    "s(i) = (b(i) - a(i)) / max(a(i), b(i))",
    { size: 13, color: C.pri }
  );
  T.cardBody(s, 0.6, 2.0, 5.0, 1.0,
    "a(i) = Aynı küme içi ortalama uzaklık (cohesion)\nb(i) = En yakın komşu kümeye ortalama uzaklık (separation)\nDeğer aralığı: -1 ile +1 arası",
    { size: 10 }
  );

  // Sağ: Yorumlama rehberi
  card(s, 6.05, 0.95, 3.65, 2.2, { topColor: C.acc });
  T.cardTitle(s, 6.25, 1.1, 3.3, "Yorumlama Rehberi", C.acc);

  const scores = [
    { range: "0.71 – 1.00", label: "Mükemmel kümeleme", color: C.green },
    { range: "0.51 – 0.70", label: "İyi kümeleme", color: C.acc },
    { range: "0.26 – 0.50", label: "Orta düzey", color: C.amber },
    { range: "≤ 0.25",      label: "Zayıf / yapay kümeler", color: C.red },
  ];

  scores.forEach((sc, i) => {
    const y = 1.52 + i * 0.38;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.2, y, w: 0.3, h: 0.3, fill: { color: sc.color } });
    s.addText(sc.range, { x: 6.58, y, w: 1.3, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText(sc.label, { x: 7.9, y, w: 1.6, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, valign: "middle" });
  });

  // Alt: Kod
  code(s, 0.4, 3.35, 9.3, 1.6, [
    { text: "from ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "sklearn.metrics ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "silhouette_score\n\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "km = KMeans(n_clusters=4, random_state=42)\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "labels = km.fit_predict(X_scaled)\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "score = silhouette_score(X_scaled, labels)\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "print(f'Silhouette Score: {score:.3f}')", options: { color: C.codeWhite, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — MÜŞTERİ SEGMENTASYONU (RFM)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Müşteri Segmentasyonu — RFM Analizi", "BÖLÜM 1");

  // RFM Kartları
  const rfmItems = [
    { letter: "R", title: "Recency", desc: "Son alışverişten bu yana\ngeçen gün sayısı", color: C.sec },
    { letter: "F", title: "Frequency", desc: "Toplam alışveriş\nsayısı (sipariş adedi)", color: C.acc },
    { letter: "M", title: "Monetary", desc: "Toplam harcama\ntutarı (TL)", color: C.amber },
  ];

  rfmItems.forEach((r, i) => {
    const x = 0.4 + i * 3.1;
    card(s, x, 0.95, 2.85, 2.1, { topColor: r.color });
    s.addShape(pres.shapes.OVAL, { x: x + 1.05, y: 1.15, w: 0.7, h: 0.7, fill: { color: r.color } });
    s.addText(r.letter, { x: x + 1.05, y: 1.15, w: 0.7, h: 0.7, margin: 0, fontFace: "Georgia", fontSize: 24, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    T.cardTitle(s, x + 0.2, 1.95, 2.4, r.title, r.color);
    T.cardBody(s, x + 0.2, 2.35, 2.4, 0.6, r.desc, { size: 10, color: C.mid });
  });

  // Alt: Segment tablosu
  card(s, 0.4, 3.25, 9.3, 1.85, { topColor: C.purple });
  T.cardTitle(s, 0.6, 3.4, 8.9, "K-Means ile Oluşturulan Tipik Segmentler", C.purple);

  const segs = [
    ["Segment",        "Recency", "Frequency", "Monetary", "Aksiyon"],
    ["VIP Müşteri",    "Düşük ↓", "Yüksek ↑", "Yüksek ↑", "Sadakat programı"],
    ["Risk Altında",   "Yüksek ↑", "Orta",     "Orta",     "Geri kazanım kampanyası"],
    ["Yeni Müşteri",   "Düşük ↓", "Düşük ↓",  "Düşük ↓",  "Hoş geldin teklifi"],
    ["Pasif Müşteri",  "Yüksek ↑", "Düşük ↓",  "Düşük ↓",  "Re-engagement e-mail"],
  ];

  segs.forEach((row, i) => {
    const y = 3.82 + i * 0.24;
    const bg = i === 0 ? C.pri : (i % 2 === 0 ? C.warmBg : C.card);
    const fc = i === 0 ? "FFFFFF" : C.dark;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y, w: 9.0, h: 0.23, fill: { color: bg } });
    [0, 1.6, 3.2, 4.6, 6.2].forEach((dx, j) => {
      const ws = [1.6, 1.6, 1.4, 1.6, 2.6];
      s.addText(row[j], { x: 0.6 + dx, y, w: ws[j], h: 0.23, margin: 0, fontFace: "Calibri", fontSize: 9, bold: i === 0, color: fc, valign: "middle" });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — RFM + K-MEANS KODU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "RFM + K-Means Kod Uygulaması", "BÖLÜM 1");

  code(s, 0.4, 0.95, 9.3, 4.0, [
    { text: "import ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "pandas ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "pd\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "sklearn.preprocessing ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "StandardScaler\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "sklearn.cluster ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "KMeans\n\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "# RFM metriklerini hesapla\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "snapshot = df['InvoiceDate'].max() + pd.Timedelta(days=1)\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "rfm = df.groupby('CustomerID').agg({\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    'InvoiceDate': ", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "lambda x: (snapshot - x.max()).days,  ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# Recency\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "    'InvoiceNo':   'nunique',                       ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# Frequency\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "    'TotalPrice':  'sum'                            ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# Monetary\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "})\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "rfm.columns = ['Recency', 'Frequency', 'Monetary']\n\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# Ölçekleme + Kümeleme\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "scaler = StandardScaler()\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "rfm_scaled = scaler.fit_transform(rfm)\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "km = KMeans(n_clusters=4, random_state=42)\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "rfm['Segment'] = km.fit_predict(rfm_scaled)\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "rfm['Segment'].value_counts()", options: { color: C.codeWhite, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — ZAMAN SERİLERİ NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Zaman Serileri Nedir?", "BÖLÜM 2");

  // Sol: Tanım kartı
  card(s, 0.4, 0.95, 5.4, 1.6, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.1, 5.0, "Tanım ve Temel Kavramlar", C.acc);
  T.cardBody(s, 0.6, 1.5, 5.0, 0.95,
    "Zaman serisi: Belirli zaman aralıklarında toplanan sıralı veri noktaları. Geçmiş verilerdeki örüntülerden geleceği tahmin etmeyi amaçlar. Hisse senedi fiyatları, hava sıcaklığı, satış verileri gibi alanlarda yaygın kullanılır.",
    { size: 10.5 }
  );

  // Sağ üst: stat box
  stat(s, 6.05, 0.95, 1.8, 1.15, "24/7", "Sürekli\nVeri Akışı", C.sec);
  stat(s, 8.0, 0.95, 1.7, 1.15, "∞", "Sektör\nUygulaması", C.acc);

  // Alt: 3 bileşen kartı
  const comps = [
    { title: "Trend", desc: "Uzun vadeli yükseliş veya düşüş. Satışların yıldan yıla artması gibi.", icon: "↗", color: C.sec },
    { title: "Mevsimsellik", desc: "Düzenli tekrar eden kalıplar. Kış aylarında enerji tüketimi artışı gibi.", icon: "~", color: C.acc },
    { title: "Durağanlık", desc: "İstatistiksel özelliklerin zamana göre sabit kalması. Model için önemli.", icon: "—", color: C.amber },
  ];

  comps.forEach((c, i) => {
    const x = 0.4 + i * 3.1;
    card(s, x, 2.8, 2.85, 2.15, { topColor: c.color });
    s.addShape(pres.shapes.OVAL, { x: x + 1.05, y: 2.95, w: 0.65, h: 0.65, fill: { color: c.color } });
    s.addText(c.icon, { x: x + 1.05, y: 2.95, w: 0.65, h: 0.65, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    T.cardTitle(s, x + 0.2, 3.7, 2.5, c.title, c.color);
    T.cardBody(s, x + 0.2, 4.1, 2.5, 0.75, c.desc, { size: 9.5, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — FACEBOOK PROPHET
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Facebook Prophet — Otomatik Zaman Serisi", "BÖLÜM 2");

  // Sol üst: Prophet tanımı
  card(s, 0.4, 0.95, 5.4, 1.75, { topColor: C.blue });
  T.cardTitle(s, 0.6, 1.1, 5.0, "Prophet Nedir?", C.blue);
  T.cardBody(s, 0.6, 1.5, 5.0, 1.1,
    "Meta (Facebook) tarafından geliştirilen açık kaynaklı zaman serisi tahmin aracı. Trend + mevsimsellik + tatil etkilerini otomatik ayrıştırır. Eksik veri ve outlier'lara dayanıklıdır. Minimum ayarlama ile güçlü sonuçlar verir.",
    { size: 10.5 }
  );

  // Sağ üst: Özellikler
  card(s, 6.05, 0.95, 3.65, 1.75, { topColor: C.acc });
  T.cardTitle(s, 6.25, 1.1, 3.3, "Neden Prophet?", C.acc);

  const features = [
    { txt: "Otomatik trend algılama", color: C.green },
    { txt: "Haftalık / yıllık mevsimsellik", color: C.acc },
    { txt: "Tatil etkisi ekleme desteği", color: C.amber },
    { txt: "Belirsizlik aralıkları (CI)", color: C.blue },
  ];

  features.forEach((f, i) => {
    const y = 1.52 + i * 0.28;
    badge(s, 6.2, y + 0.02, i + 1, f.color);
    T.cardBody(s, 6.65, y, 2.9, 0.28, f.txt, { size: 9.5 });
  });

  // Alt: Decomposition açıklama
  card(s, 0.4, 2.9, 9.3, 2.1, { topColor: C.sec });
  T.cardTitle(s, 0.6, 3.05, 8.9, "Trend Decomposition: y(t) = g(t) + s(t) + h(t) + ε(t)", C.sec);

  const decomp = [
    { sym: "g(t)", label: "Trend", desc: "Doğrusal veya lojistik büyüme modeli", color: C.sec },
    { sym: "s(t)", label: "Mevsimsellik", desc: "Fourier serileri ile periyodik değişimler", color: C.acc },
    { sym: "h(t)", label: "Tatil Etkisi", desc: "Bayram, kampanya gibi özel günler", color: C.amber },
    { sym: "ε(t)", label: "Hata", desc: "Modelin açıklayamadığı gürültü", color: C.mid },
  ];

  decomp.forEach((d, i) => {
    const x = 0.55 + i * 2.28;
    card(s, x, 3.48, 2.1, 1.35, { topColor: d.color });
    s.addText(d.sym, { x, y: 3.6, w: 2.1, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 16, bold: true, color: d.color, align: "center" });
    s.addText(d.label, { x, y: 4.0, w: 2.1, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark, align: "center" });
    s.addText(d.desc, { x: x + 0.1, y: 4.3, w: 1.9, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 8.5, color: C.mid, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — PROPHET KODU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Prophet — Kod Uygulaması", "BÖLÜM 2");

  code(s, 0.4, 0.95, 9.3, 3.8, [
    { text: "from ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "prophet ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "Prophet\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "pandas ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "pd\n\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "# Veriyi Prophet formatına dönüştür (ds, y)\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "df_prophet = df[['Date', 'Sales']].rename(\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    columns={'Date': 'ds', 'Sales': 'y'}\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# Model oluştur ve eğit\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "model = Prophet(\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    yearly_seasonality=True,\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "    weekly_seasonality=True,\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "    changepoint_prior_scale=0.05\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: ")\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "model.fit(df_prophet)\n\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "# 90 günlük tahmin\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "future = model.make_future_dataframe(periods=90)\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "forecast = model.predict(future)\n\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "# Görselleştirme\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "model.plot(forecast)\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "model.plot_components(forecast)", options: { color: C.codeGreen, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — ZAMAN SERİSİ UYGULAMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Uygulama: Adidas US Sales Satış Tahmini", "BÖLÜM 2");

  // Sol: Veri seti kartı
  card(s, 0.4, 0.95, 4.6, 2.1, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 4.2, "Veri Seti: Adidas US Sales", C.sec);
  T.cardBody(s, 0.6, 1.5, 4.2, 1.45,
    "• Kaynak: Kaggle Adidas US Sales Dataset\n• Dönem: 2020–2021 (2 yıllık satış verisi)\n• Özellikler: Tarih, ürün kategorisi, eyalet, satış tutarı, birim fiyat, kâr marjı\n• Amaç: Prophet ile 2022 Q1 satış tahmini",
    { size: 10 }
  );

  // Sağ üst: stat box'lar
  stat(s, 5.25, 0.95, 2.2, 1.15, "9.6K", "Satış\nKaydı", C.acc);
  stat(s, 7.6, 0.95, 2.1, 1.15, "90", "Günlük\nTahmin", C.sec);

  // Sağ: Analiz adımları
  card(s, 5.25, 2.3, 4.45, 2.75, { topColor: C.acc });
  T.cardTitle(s, 5.45, 2.45, 4.1, "Analiz İş Akışı", C.acc);

  const workflow = [
    { n: 1, txt: "Veri yükleme ve tarih dönüşümü", color: C.sec },
    { n: 2, txt: "Günlük satış toplamı → zaman serisi", color: C.acc },
    { n: 3, txt: "Prophet modeli eğitimi", color: C.amber },
    { n: 4, txt: "90 günlük gelecek tahmini", color: C.purple },
    { n: 5, txt: "Trend ve mevsimsellik analizi", color: C.green },
  ];

  workflow.forEach((w, i) => {
    const y = 2.88 + i * 0.42;
    badge(s, 5.45, y + 0.03, w.n, w.color);
    T.cardBody(s, 5.9, y, 3.6, 0.38, w.txt, { size: 10 });
  });

  // Sol alt: Beklenen sonuçlar
  card(s, 0.4, 3.25, 4.6, 1.8, { topColor: C.amber });
  T.cardTitle(s, 0.6, 3.4, 4.2, "Beklenen Çıktılar", C.amber);
  T.cardBody(s, 0.6, 3.8, 4.2, 1.15,
    "• Tahmin grafiği (gerçek + forecast + CI)\n• Trend bileşeni: Genel yükseliş eğilimi\n• Haftalık mevsimsellik: Haftasonu ↑\n• Yıllık mevsimsellik: Q4 (tatil sezonu) ↑\n• MAPE < %15 hedefi",
    { size: 10 }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — ÖNERİ SİSTEMLERİ NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Öneri Sistemleri Nedir?", "BÖLÜM 3");

  // Üst: Tanım
  card(s, 0.4, 0.95, 6.0, 1.3, { topColor: C.amber });
  T.cardTitle(s, 0.6, 1.1, 5.6, "Tanım", C.amber);
  T.cardBody(s, 0.6, 1.48, 5.6, 0.65,
    "Kullanıcıların ilgisini çekebilecek ürünleri, içerikleri veya hizmetleri otomatik olarak tahmin eden ve öneren sistemlerdir. Kişiselleştirilmiş deneyim sunarak kullanıcı memnuniyetini ve geliri artırır.",
    { size: 10.5 }
  );

  // Sağ üst: stat box'lar
  stat(s, 6.65, 0.95, 1.5, 1.3, "%35", "Amazon\nGeliri", C.sec);
  stat(s, 8.3, 0.95, 1.4, 1.3, "%80", "Netflix\nİzlenmesi", C.acc);

  // Alt: Örnek platformlar
  const platforms = [
    { name: "Netflix", desc: "İzleme geçmişi + puanlama → film/dizi önerisi", stat: "300M+", statLabel: "Abone", color: C.red },
    { name: "Spotify", desc: "Dinleme alışkanlıkları → haftalık keşif listesi", stat: "600M+", statLabel: "Kullanıcı", color: C.green },
    { name: "Amazon", desc: "Satın alma + göz atma → ürün önerisi", stat: "350M+", statLabel: "Ürün", color: C.amber },
    { name: "YouTube", desc: "İzleme süresi + etkileşim → video önerisi", stat: "2B+", statLabel: "Kullanıcı", color: C.blue },
  ];

  platforms.forEach((p, i) => {
    const x = 0.4 + i * 2.35;
    card(s, x, 2.5, 2.15, 2.55, { topColor: p.color });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 2.7, w: 1.85, h: 0.5, fill: { color: p.color } });
    s.addText(p.name, { x: x + 0.15, y: 2.7, w: 1.85, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 16, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    T.cardBody(s, x + 0.15, 3.3, 1.85, 0.7, p.desc, { size: 9, color: C.mid });
    s.addText(p.stat, { x: x + 0.15, y: 4.05, w: 1.85, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 20, bold: true, color: p.color, align: "center" });
    s.addText(p.statLabel, { x: x + 0.15, y: 4.5, w: 1.85, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — CONTENT-BASED vs COLLABORATIVE
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "İçerik Tabanlı vs İşbirlikçi Filtreleme", "BÖLÜM 3");

  // Sol kart: Content-based
  card(s, 0.4, 0.95, 4.4, 4.0, { topColor: C.sec });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: 1.1, w: 4.1, h: 0.55, fill: { color: C.sec } });
  s.addText("İçerik Tabanlı (Content-based)", { x: 0.55, y: 1.1, w: 4.1, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

  T.cardBody(s, 0.6, 1.8, 4.0, 0.5,
    "Öğenin özellikleri ile kullanıcı profilini eşleştirir.",
    { size: 11, color: C.pri }
  );

  const cbFeatures = [
    "• Ürün/içerik özelliklerini analiz eder",
    "• Kullanıcının geçmiş tercihlerini kullanır",
    "• Yeni kullanıcı sorunu (cold start) az",
    "• TF-IDF, cosine similarity kullanır",
  ];
  T.cardBody(s, 0.6, 2.35, 4.0, 1.1, cbFeatures.join("\n"), { size: 10 });

  card(s, 0.6, 3.6, 4.0, 1.15, { leftColor: C.sec, bg: C.warmBg });
  T.cardBody(s, 0.75, 3.68, 3.7, 0.4, "Örnek:", { size: 9, color: C.mid });
  T.cardBody(s, 0.75, 3.95, 3.7, 0.7,
    "\"Aksiyon filmi sevdin → benzer aksiyon filmleri öner\"\nFilmin türü, yönetmeni, oyuncuları analiz edilir.",
    { size: 9.5 }
  );

  // Sağ kart: Collaborative
  card(s, 5.2, 0.95, 4.5, 4.0, { topColor: C.acc });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y: 1.1, w: 4.2, h: 0.55, fill: { color: C.acc } });
  s.addText("İşbirlikçi Filtreleme (Collaborative)", { x: 5.35, y: 1.1, w: 4.2, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

  T.cardBody(s, 5.4, 1.8, 4.1, 0.5,
    "Benzer kullanıcıların tercihlerini kullanır.",
    { size: 11, color: C.pri }
  );

  const cfFeatures = [
    "• Kullanıcı-öğe etkileşim matrisini analiz eder",
    "• Öğe özelliklerine ihtiyaç duymaz",
    "• Sürpriz öneriler yapabilir (serendipity)",
    "• SVD, ALS, NMF gibi matris ayrıştırma",
  ];
  T.cardBody(s, 5.4, 2.35, 4.1, 1.1, cfFeatures.join("\n"), { size: 10 });

  card(s, 5.4, 3.6, 4.1, 1.15, { leftColor: C.acc, bg: C.warmBg });
  T.cardBody(s, 5.55, 3.68, 3.8, 0.4, "Örnek:", { size: 9, color: C.mid });
  T.cardBody(s, 5.55, 3.95, 3.8, 0.7,
    "\"Sana benzeyen kullanıcılar şunu beğendi → sana da öner\"\nKullanıcı puanlamaları ve davranışları analiz edilir.",
    { size: 9.5 }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — COLLABORATIVE FILTERING DETAYı
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Collaborative Filtering — Matris Ayrıştırma", "BÖLÜM 3");

  // Sol: Kullanıcı-Ürün Matrisi
  card(s, 0.4, 0.95, 5.0, 2.3, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.1, 4.6, "Kullanıcı-Ürün Puanlama Matrisi", C.acc);

  const matrix = [
    ["",           "Film A", "Film B", "Film C", "Film D"],
    ["Ali",        "5",      "3",      "?",      "1"],
    ["Ayşe",       "4",      "?",      "5",      "2"],
    ["Mehmet",     "?",      "4",      "4",      "?"],
    ["Zeynep",     "3",      "5",      "?",      "3"],
  ];

  matrix.forEach((row, i) => {
    const y = 1.55 + i * 0.35;
    const bg = i === 0 ? C.pri : (i % 2 === 0 ? C.warmBg : C.card);
    const fc = i === 0 ? "FFFFFF" : C.dark;
    row.forEach((cell, j) => {
      const x = 0.6 + j * 0.95;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.93, h: 0.33, fill: { color: cell === "?" ? C.accPale : bg } });
      s.addText(cell, { x, y, w: 0.93, h: 0.33, margin: 0, fontFace: "Calibri", fontSize: 10, bold: i === 0 || j === 0, color: cell === "?" ? C.red : fc, align: "center", valign: "middle" });
    });
  });

  // Sağ: Cosine Similarity
  card(s, 5.65, 0.95, 4.05, 2.3, { topColor: C.purple });
  T.cardTitle(s, 5.85, 1.1, 3.7, "Cosine Similarity", C.purple);
  T.cardBody(s, 5.85, 1.5, 3.7, 0.5,
    "cos(A, B) = (A · B) / (||A|| × ||B||)",
    { size: 13, color: C.pri }
  );
  T.cardBody(s, 5.85, 2.05, 3.7, 1.0,
    "• Vektörler arası açıyı ölçer\n• 0 = ilişkisiz, 1 = özdeş tercihler\n• Yüksek benzerlik → güçlü öneri\n• Seyrek matris sorununa çözüm: SVD",
    { size: 10 }
  );

  // Alt: SVD açıklama
  card(s, 0.4, 3.45, 9.3, 1.6, { topColor: C.blue });
  T.cardTitle(s, 0.6, 3.6, 8.9, "SVD (Singular Value Decomposition) — Matris Ayrıştırma", C.blue);

  const svdCards = [
    { title: "R ≈ U × Σ × V^T", desc: "Rating matrisi, kullanıcı ve öğe gizli faktörlerine ayrıştırılır", color: C.blue },
    { title: "Boyut İndirgeme", desc: "Binlerce boyutlu matris k boyuta indirilir (genellikle k=50-200)", color: C.purple },
    { title: "Boşluk Doldurma", desc: "\"?\" hücreleri tahmin edilir → öneri yapılır", color: C.green },
  ];

  svdCards.forEach((sv, i) => {
    const x = 0.55 + i * 3.08;
    card(s, x, 4.0, 2.88, 0.9, { topColor: sv.color });
    s.addText(sv.title, { x: x + 0.1, y: 4.08, w: 2.68, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: sv.color });
    s.addText(sv.desc, { x: x + 0.1, y: 4.38, w: 2.68, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — FİLM ÖNERİ SİSTEMİ KODU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Film Öneri Sistemi — Surprise SVD", "BÖLÜM 3");

  code(s, 0.4, 0.95, 9.3, 4.0, [
    { text: "from ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "surprise ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "Dataset, Reader, SVD\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "surprise.model_selection ", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "cross_validate\n\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: "# MovieLens veri seti\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "data = Dataset.load_builtin('ml-100k')\n\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# SVD modeli oluştur ve değerlendir\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "model = SVD(n_factors=100, n_epochs=20, lr_all=0.005)\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "results = cross_validate(\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "    model, data, measures=['RMSE', 'MAE'], cv=5\n", options: { color: C.codeYellow, fontSize: 9 } },
    { text: ")\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "print(f\"RMSE: {results['test_rmse'].mean():.4f}\")\n\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "# Tüm veri ile eğit + tahmin\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "trainset = data.build_full_trainset()\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "model.fit(trainset)\n\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "# Kullanıcı 196 için Film 302 tahmin puanı\n", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "pred = model.predict(uid='196', iid='302')\n", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "print(f\"Tahmini puan: {pred.est:.2f}\")", options: { color: C.codeWhite, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — 3 YÖNTEM KARŞILAŞTIRMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "3 Yöntem Karşılaştırma Tablosu", "ÖZET");

  card(s, 0.4, 0.95, 9.3, 3.8, {});

  const cmpRows = [
    ["Özellik",           "Kümeleme",                  "Zaman Serisi",               "Öneri Sistemleri"],
    ["Amaç",              "Gruplama / Segmentasyon",   "Gelecek değer tahmini",      "Kişiselleştirilmiş öneri"],
    ["Veri Tipi",         "Özellik vektörleri",        "Zamana bağlı sıralı veri",   "Kullanıcı-öğe etkileşimi"],
    ["Algoritma",         "K-Means, DBSCAN",           "Prophet, ARIMA, LSTM",       "SVD, ALS, Content-based"],
    ["Çıktı",             "Küme etiketi (0, 1, 2..)",  "Sayısal tahmin + CI",        "Top-N öneri listesi"],
    ["Metrik",            "Silhouette, Inertia",       "MAPE, RMSE",                 "RMSE, Precision@K"],
    ["İş Uygulaması",     "Müşteri segmentasyonu",     "Satış/stok tahmini",         "Ürün/içerik önerme"],
    ["Python Kütüphanesi","scikit-learn",               "prophet, statsmodels",       "surprise, implicit"],
    ["Veri Boyutu",       "Orta-Büyük",                "Zaman serisi uzunluğu",      "Seyrek matris (sparse)"],
  ];

  cmpRows.forEach((row, i) => {
    const y = 1.15 + i * 0.38;
    const bg = i === 0 ? C.pri : (i % 2 === 0 ? C.warmBg : C.card);
    const fc = i === 0 ? "FFFFFF" : C.dark;
    const colors = i === 0 ? ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"] : [C.dark, C.sec, C.acc, C.amber];

    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y, w: 9.0, h: 0.36, fill: { color: bg } });
    [0, 1.7, 3.9, 6.2].forEach((dx, j) => {
      const ws = [1.7, 2.2, 2.3, 2.7];
      s.addText(row[j], { x: 0.6 + dx, y, w: ws[j], h: 0.36, margin: [0,4,0,4], fontFace: "Calibri", fontSize: 9.5, bold: i === 0, color: j === 0 ? fc : colors[j], valign: "middle" });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 18 — HAFTALIK NOTEBOOK'LAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Haftalık Notebook'lar", "UYGULAMA");

  const notebooks = [
    {
      title: "Notebook 1: K-Means Segmentasyon",
      file: "kmeans_segmentasyon.ipynb",
      desc: "Online Retail veri seti ile RFM analizi ve müşteri segmentasyonu. Elbow Method ve Silhouette Score ile optimal K belirleme.",
      tags: ["K-Means", "RFM", "Elbow", "Silhouette"],
      color: C.sec,
    },
    {
      title: "Notebook 2: Zaman Serisi Prophet",
      file: "zaman_serisi_prophet.ipynb",
      desc: "Adidas US Sales verisi ile satış tahmini. Prophet modeli, trend decomposition, mevsimsellik analizi ve 90 günlük forecast.",
      tags: ["Prophet", "Forecast", "Trend", "Mevsimsellik"],
      color: C.acc,
    },
    {
      title: "Notebook 3: Film Öneri Sistemi",
      file: "film_oneri.ipynb",
      desc: "MovieLens 100K veri seti ile collaborative filtering. Surprise SVD modeli, cross-validation ve kişiselleştirilmiş öneriler.",
      tags: ["SVD", "MovieLens", "Surprise", "Collaborative"],
      color: C.amber,
    },
  ];

  notebooks.forEach((nb, i) => {
    const y = 0.95 + i * 1.5;
    card(s, 0.4, y, 9.3, 1.35, { topColor: nb.color });
    badge(s, 0.6, y + 0.2, i + 1, nb.color);
    T.cardTitle(s, 1.1, y + 0.15, 5, nb.title, nb.color);
    s.addText(nb.file, { x: 6.5, y: y + 0.15, w: 3.0, h: 0.3, margin: 0, fontFace: "Consolas", fontSize: 9, color: C.mid, align: "right" });
    T.cardBody(s, 0.6, y + 0.5, 8.9, 0.45, nb.desc, { size: 10 });
    nb.tags.forEach((tag, j) => {
      const tx = 0.6 + j * 1.65;
      s.addShape(pres.shapes.RECTANGLE, { x: tx, y: y + 0.98, w: 1.5, h: 0.28, fill: { color: nb.color }, rectRadius: 0.14 });
      s.addText(tag, { x: tx, y: y + 0.98, w: 1.5, h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 8.5, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ödev ve Kaynaklar", "UYGULAMA");

  // Sol: Ödevler
  card(s, 0.4, 0.95, 4.6, 4.0, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 4.2, "Bu Hafta Ödevleri", C.sec);

  const assignments = [
    { title: "Ödev 1: Mall Customer Segmentasyon", desc: "Kaggle Mall Customers veri seti ile K-Means kümeleme. Müşterileri gelir ve harcama skoruna göre segmentlere ayırın. Elbow + Silhouette ile K seçin.", color: C.sec },
    { title: "Ödev 2: MovieLens Öneri Sistemi", desc: "MovieLens 100K veri seti ile SVD tabanlı film öneri sistemi kurun. RMSE'yi minimize edin ve kendinize 5 film önerisi oluşturun.", color: C.acc },
  ];

  assignments.forEach((a, i) => {
    const y = 1.55 + i * 1.35;
    card(s, 0.6, y, 4.2, 1.2, { leftColor: a.color, bg: C.warmBg });
    T.cardTitle(s, 0.8, y + 0.08, 3.8, a.title, a.color);
    T.cardBody(s, 0.8, y + 0.45, 3.8, 0.7, a.desc, { size: 9.5, color: C.mid });
  });

  // Sağ: Kaynaklar
  card(s, 5.25, 0.95, 4.45, 4.0, { topColor: C.acc });
  T.cardTitle(s, 5.45, 1.1, 4.1, "Faydalı Kaynaklar", C.acc);

  const resources = [
    { icon: "1", txt: "scikit-learn Clustering Dokümantasyonu\nscikit-learn.org/stable/modules/clustering", color: C.sec },
    { icon: "2", txt: "Prophet Dokümantasyonu\nfacebook.github.io/prophet/", color: C.acc },
    { icon: "3", txt: "Surprise Kütüphanesi\nsurpriselib.com", color: C.amber },
    { icon: "4", txt: "Kaggle: Mall Customers Dataset\nkaggle.com/datasets/vjchoudhary7/...", color: C.purple },
    { icon: "5", txt: "Kaggle: MovieLens 100K\nkaggle.com/datasets/prajitdatta/...", color: C.blue },
  ];

  resources.forEach((r, i) => {
    const y = 1.5 + i * 0.68;
    badge(s, 5.45, y + 0.08, r.icon, r.color);
    T.cardBody(s, 5.9, y + 0.02, 3.6, 0.6, r.txt, { size: 9 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 8 — Öne Çıkan Noktalar",
  [
    { text: "Denetimsiz öğrenme, etiketsiz veriden anlamlı yapılar keşfeder — K-Means en yaygın yöntemdir.", color: C.sec },
    { text: "RFM analizi ile müşteri segmentasyonu, pazarlama stratejisinin temelini oluşturur.", color: C.acc },
    { text: "Facebook Prophet, minimum kod ile güçlü zaman serisi tahminleri yapar.", color: C.amber },
    { text: "Öneri sistemleri, kişiselleştirilmiş deneyim sunarak geliri %35'e kadar artırır.", color: C.purple },
    { text: "3 yöntem birlikte kullanıldığında veri biliminin tam gücü ortaya çıkar.", color: C.green },
  ],
  "Verinin dilini anlamak, geleceği şekillendirmenin ilk adımıdır.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// DOSYAYA YAZ
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta08_kumeleme_oneri.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("PPTX oluşturuldu:", outPath))
  .catch(err => { console.error("Hata:", err); process.exit(1); });
