/**
 * Hafta 4 — İstatistiksel Analiz ve A/B Testleri
 * ================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 4: İstatistiksel Analiz ve A/B Testleri");
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
  "İstatistiksel\nAnaliz ve\nA/B Testleri",
  "Hafta 4 \u00b7 Mod\u00fcl 4\nTan\u0131mlay\u0131c\u0131 \u0130statistik, Da\u011f\u0131l\u0131mlar, Hipotez Testleri ve A/B Testi",
  "Dr. Murat Altun",
  [
    { value: "6",  label: "Saat" },
    { value: "3",  label: "Notebook" },
    { value: "7+", label: "\u0130statistik Testi" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "\u0130\u00e7indekiler", null);

  const sections = [
    { num: "01", title: "Tan\u0131mlay\u0131c\u0131 \u0130statistik",       items: "Ortalama \u00b7 Medyan \u00b7 Mod \u00b7 Standart Sapma \u00b7 Merkezi E\u011filim \u00b7 Yay\u0131l\u0131m",        color: C.sec,    slides: "Slayt 3\u20136" },
    { num: "02", title: "Da\u011f\u0131l\u0131mlar ve Korelasyon",  items: "Normal Da\u011f\u0131l\u0131m \u00b7 Normallik Testleri \u00b7 Pearson \u00b7 Spearman",                    color: C.acc,    slides: "Slayt 5\u20137" },
    { num: "03", title: "Hipotez Testleri",              items: "H0/H1 \u00b7 p-value \u00b7 T-Test \u00b7 ANOVA \u00b7 Ki-Kare \u00b7 G\u00fcven Aral\u0131klar\u0131",              color: C.amber,  slides: "Slayt 8\u201313" },
    { num: "04", title: "A/B Testi ve Uygulama",         items: "Metodoloji \u00b7 Uygulama \u00b7 Tip I/II Hata \u00b7 Notebook\u2019lar \u00b7 \u00d6dev",                     color: C.purple, slides: "Slayt 14\u201320" },
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
// SLAYT 3 — TANIMLAYICI İSTATİSTİK
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Tan\u0131mlay\u0131c\u0131 \u0130statistik", "B\u00d6L\u00dcM 1");

  stat(s, 0.4, 1.0, 2.1, 1.7, "x\u0304", "Ortalama\nT\u00fcm de\u011ferlerin toplam\u0131n\u0131n\nveri say\u0131s\u0131na b\u00f6l\u00fcm\u00fc", C.sec);
  stat(s, 2.7, 1.0, 2.1, 1.7, "M\u0303", "Medyan\nS\u0131ralanm\u0131\u015f verinin\northadaki de\u011feri", C.acc);
  stat(s, 5.0, 1.0, 2.1, 1.7, "Mo", "Mod\nEn s\u0131k tekrar eden\nde\u011fer", C.amber);
  stat(s, 7.3, 1.0, 2.1, 1.7, "\u03c3", "Standart Sapma\nVerinin ortalamadan\nne kadar sapt\u0131\u011f\u0131", C.purple);

  // Alt açıklama kartı
  card(s, 0.4, 3.0, 9.2, 2.35, { topColor: C.pri });
  T.cardTitle(s, 0.6, 3.12, 8.8, "Python ile Hesaplama", C.pri);

  code(s, 0.6, 3.55, 8.8, 1.65, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "numpy ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "np\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "pandas ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "pd\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "veri = pd.Series([12, 15, 12, 18, 20, 15, 12, 25, 30])\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"Ortalama: {veri.mean():.2f}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"Medyan:   {veri.median():.2f}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"Mod:      {veri.mode()[0]}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"Std:      {veri.std():.2f}\")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — MERKEZİ EĞİLİM vs YAYILIM
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Merkezi E\u011filim vs Yay\u0131l\u0131m \u00d6l\u00e7\u00fcleri", "B\u00d6L\u00dcM 1");

  // Sol kart: Merkezi eğilim
  card(s, 0.4, 1.0, 4.3, 4.2, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 3.9, "Merkezi E\u011filim \u00d6l\u00e7\u00fcleri", C.sec);

  const merkezi = [
    { title: "Ortalama (Mean)", desc: "T\u00fcm de\u011ferlerin aritmetik ortalamas\u0131. A\u015f\u0131r\u0131 de\u011ferlerden etkilenir." },
    { title: "Medyan (Median)", desc: "S\u0131ralanm\u0131\u015f verinin orta noktas\u0131. A\u015f\u0131r\u0131 de\u011ferlere dayan\u0131kl\u0131." },
    { title: "Mod (Mode)", desc: "En s\u0131k tekrar eden de\u011fer. Kategorik veri i\u00e7in idealdir." },
    { title: "A\u011f\u0131rl\u0131kl\u0131 Ortalama", desc: "Her de\u011fere farkl\u0131 a\u011f\u0131rl\u0131k verilir. \u00d6rn: not ortalamas\u0131." },
  ];
  merkezi.forEach((item, i) => {
    const y = 1.6 + i * 0.88;
    badge(s, 0.6, y + 0.05, i + 1, C.sec);
    s.addText(item.title, { x: 1.1, y, w: 3.4, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark });
    s.addText(item.desc, { x: 1.1, y: y + 0.3, w: 3.4, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid });
  });

  // Sağ kart: Yayılım
  card(s, 5.0, 1.0, 4.6, 4.2, { topColor: C.acc });
  T.cardTitle(s, 5.2, 1.15, 4.2, "Yay\u0131l\u0131m \u00d6l\u00e7\u00fcleri", C.acc);

  const yayilim = [
    { title: "Varyans (\u03c3\u00b2)", desc: "Ortalamadan sapmalar\u0131n karelerinin ortalamas\u0131." },
    { title: "Standart Sapma (\u03c3)", desc: "Varyans\u0131n karek\u00f6k\u00fc. Orijinal birimle ayn\u0131 \u00f6l\u00e7ekte." },
    { title: "Aral\u0131k (Range)", desc: "Max \u2212 Min. En basit yay\u0131l\u0131m \u00f6l\u00e7\u00fcs\u00fc, a\u015f\u0131r\u0131 de\u011ferlere hassas." },
    { title: "IQR (Q3 \u2212 Q1)", desc: "\u00c7eyrekler aras\u0131 a\u00e7\u0131kl\u0131k. Boxplot\u2019un temelini olu\u015fturur." },
  ];
  yayilim.forEach((item, i) => {
    const y = 1.6 + i * 0.88;
    badge(s, 5.2, y + 0.05, i + 1, C.acc);
    s.addText(item.title, { x: 5.7, y, w: 3.7, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark });
    s.addText(item.desc, { x: 5.7, y: y + 0.3, w: 3.7, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — NORMAL DAĞILIM
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Normal Da\u011f\u0131l\u0131m (Gauss E\u011frisi)", "B\u00d6L\u00dcM 2");

  // Sol: açıklama kartı
  card(s, 0.4, 1.0, 4.6, 2.5, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.1, 4.2, "Normal Da\u011f\u0131l\u0131m Nedir?", C.acc);
  T.cardBody(s, 0.6, 1.5, 4.2, 1.8,
    "Do\u011fadaki pek \u00e7ok olay normal da\u011f\u0131l\u0131ma uyar: boy, a\u011f\u0131rl\u0131k, s\u0131nav puanlar\u0131...\n\n" +
    "\u2022 Simetrik, \u00e7an \u015feklinde e\u011fri\n" +
    "\u2022 Ortalama = Medyan = Mod\n" +
    "\u2022 \u03bc (ortalama) ve \u03c3 (std sapma) ile tan\u0131mlan\u0131r\n" +
    "\u2022 Pek \u00e7ok istatistiksel testin \u00f6n ko\u015fulu"
  );

  // Sağ: 68-95-99.7 kuralı
  card(s, 5.3, 1.0, 4.3, 2.5, { topColor: C.purple });
  T.cardTitle(s, 5.5, 1.12, 3.9, "68-95-99.7 Kural\u0131", C.purple);

  const rules = [
    { range: "\u03bc \u00b1 1\u03c3", pct: "%68.3", color: C.green },
    { range: "\u03bc \u00b1 2\u03c3", pct: "%95.4", color: C.amber },
    { range: "\u03bc \u00b1 3\u03c3", pct: "%99.7", color: C.red },
  ];
  rules.forEach((r, i) => {
    const y = 1.55 + i * 0.6;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y, w: 1.6, h: 0.45, fill: { color: r.color } });
    s.addText(r.range, { x: 5.5, y, w: 1.6, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(r.pct + " veri bu aral\u0131kta", { x: 7.2, y, w: 2.2, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark, valign: "middle" });
  });

  // Alt: çan eğrisi açıklaması
  card(s, 0.4, 3.7, 9.2, 1.65, { topColor: C.sec });
  T.cardTitle(s, 0.6, 3.82, 8.8, "\u00c7an E\u011frisi \u00d6zellikleri", C.sec);
  T.cardBody(s, 0.6, 4.2, 4.2, 1.0,
    "\u2022 E\u011fri alt\u0131ndaki toplam alan = 1\n" +
    "\u2022 Ortalamadan uzakla\u015ft\u0131k\u00e7a olas\u0131l\u0131k azal\u0131r\n" +
    "\u2022 Z-skoru: (X \u2212 \u03bc) / \u03c3 ile standartla\u015ft\u0131r\u0131l\u0131r"
  );
  T.cardBody(s, 5.2, 4.2, 4.2, 1.0,
    "\u2022 \u03c3 k\u00fc\u00e7\u00fck \u2192 sivri e\u011fri (homojen veri)\n" +
    "\u2022 \u03c3 b\u00fcy\u00fck \u2192 yayvan e\u011fri (heterojen veri)\n" +
    "\u2022 Merkezi limit teoremi: n\u226530 \u2192 \u00f6rneklem da\u011f\u0131l\u0131m\u0131 \u2248 normal"
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — NORMALLİK TESTLERİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Normallik Testleri", "B\u00d6L\u00dcM 2");

  card(s, 0.4, 0.95, 5.0, 1.4, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.05, 4.6, "Neden Normallik Testi?", C.acc);
  T.cardBody(s, 0.6, 1.4, 4.6, 0.8,
    "Pek \u00e7ok parametrik test (t-test, ANOVA) verinin\nnormal da\u011f\u0131ld\u0131\u011f\u0131n\u0131 varsayar. Test se\u00e7iminden\n\u00f6nce normallik kontrol\u00fc \u015fart!"
  );

  // Sağ üst: test karşılaştırma
  card(s, 5.6, 0.95, 4.0, 1.4, { topColor: C.purple });
  T.cardTitle(s, 5.8, 1.07, 3.6, "G\u00f6rsel vs \u0130statistiksel", C.purple);
  T.cardBody(s, 5.8, 1.4, 3.6, 0.8,
    "\u2022 Histogram + KDE \u2192 g\u00f6zle de\u011ferlendirme\n" +
    "\u2022 Q-Q Plot \u2192 do\u011fruya yak\u0131nl\u0131k\n" +
    "\u2022 Shapiro-Wilk \u2192 p < 0.05 \u2192 normal de\u011fil"
  );

  // Alt: kod bloğu
  code(s, 0.4, 2.55, 9.2, 2.85, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "scipy.stats ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "shapiro\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "matplotlib.pyplot ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "plt\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Shapiro-Wilk normallik testi\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "stat, p_value = shapiro(veri)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"Test \u0130statistik: {stat:.4f}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"p-value: {p_value:.4f}\")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "if ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "p_value > 0.05:\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    print(\"\u2705 Normal da\u011f\u0131l\u0131m varsay\u0131m\u0131 reddedilmez\")\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "else:\n", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "    print(\"\u274c Normal da\u011f\u0131l\u0131m de\u011fil \u2192 non-parametrik test\")\n\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Histogram ile g\u00f6rsel kontrol\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "plt.hist(veri, bins=20, edgecolor='black', alpha=0.7)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "plt.title('Veri Da\u011f\u0131l\u0131m\u0131')\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "plt.show()", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — KORELASYON ANALİZİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Korelasyon Analizi", "B\u00d6L\u00dcM 2");

  // Tablo: Pearson vs Spearman
  card(s, 0.4, 1.0, 9.2, 2.4, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.12, 8.8, "Pearson vs Spearman Kar\u015f\u0131la\u015ft\u0131rmas\u0131", C.acc);

  // Tablo başlıkları
  const cols = [
    { x: 0.6, w: 2.0, text: "\u00d6zellik" },
    { x: 2.6, w: 3.3, text: "Pearson (r)" },
    { x: 5.9, w: 3.5, text: "Spearman (\u03c1)" },
  ];
  cols.forEach(col => {
    s.addShape(pres.shapes.RECTANGLE, { x: col.x, y: 1.5, w: col.w, h: 0.38, fill: { color: C.pri } });
    s.addText(col.text, { x: col.x, y: 1.5, w: col.w, h: 0.38, margin: [0, 5, 0, 5], fontFace: "Calibri", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  });

  const rows = [
    ["Veri T\u00fcr\u00fc", "S\u00fcrekli, normal da\u011f\u0131l\u0131m", "S\u0131ral\u0131 veya s\u00fcrekli"],
    ["\u0130li\u015fki Tipi", "Do\u011frusal ili\u015fki \u00f6l\u00e7er", "Monoton ili\u015fki \u00f6l\u00e7er"],
    ["Dayan\u0131kl\u0131l\u0131k", "A\u015f\u0131r\u0131 de\u011ferlere hassas", "A\u015f\u0131r\u0131 de\u011ferlere dayan\u0131kl\u0131"],
    ["Kullan\u0131m", "Ya\u015f\u2013Gelir ili\u015fkisi", "M\u00fc\u015fteri memnuniyeti s\u0131ralamas\u0131"],
  ];
  rows.forEach((row, i) => {
    const y = 1.88 + i * 0.36;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    [0.6, 2.6, 5.9].forEach((x, j) => {
      const w = cols[j].w;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.36, fill: { color: bg } });
      s.addText(row[j], { x, y, w, h: 0.36, margin: [0, 5, 0, 5], fontFace: "Calibri", fontSize: 10, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: "center", valign: "middle" });
    });
  });

  // Alt: Yorumlama rehberi
  card(s, 0.4, 3.6, 9.2, 1.75, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 3.7, 8.8, "Korelasyon Katsay\u0131s\u0131 Yorumlama Rehberi", C.sec);

  const interp = [
    { range: "0.00 \u2013 0.19", label: "\u00c7ok Zay\u0131f", color: C.subtle },
    { range: "0.20 \u2013 0.39", label: "Zay\u0131f", color: C.amber },
    { range: "0.40 \u2013 0.59", label: "Orta", color: C.blue },
    { range: "0.60 \u2013 0.79", label: "G\u00fc\u00e7l\u00fc", color: C.acc },
    { range: "0.80 \u2013 1.00", label: "\u00c7ok G\u00fc\u00e7l\u00fc", color: C.green },
  ];
  interp.forEach((item, i) => {
    const x = 0.6 + i * 1.8;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.12, w: 1.6, h: 0.35, fill: { color: item.color } });
    s.addText(item.range, { x, y: 4.12, w: 1.6, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(item.label, { x, y: 4.5, w: 1.6, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.dark, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — HİPOTEZ TESTİ NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Hipotez Testi Nedir?", "B\u00d6L\u00dcM 3");

  // H0 vs H1
  card(s, 0.4, 1.0, 4.3, 2.0, { topColor: C.red });
  T.cardTitle(s, 0.6, 1.12, 3.9, "H\u2080 \u2014 S\u0131f\u0131r Hipotezi (Null)", C.red);
  T.cardBody(s, 0.6, 1.5, 3.9, 1.3,
    "\u201cFark yoktur\u201d veya \u201cEtki yoktur\u201d iddias\u0131.\n\n" +
    "\u00d6rnek: Yeni ila\u00e7 ile plasebo aras\u0131nda fark yoktur.\n\n" +
    "Test sonucunda ya reddedilir ya da reddedilemez."
  );

  card(s, 5.0, 1.0, 4.6, 2.0, { topColor: C.green });
  T.cardTitle(s, 5.2, 1.12, 4.2, "H\u2081 \u2014 Alternatif Hipotez", C.green);
  T.cardBody(s, 5.2, 1.5, 4.2, 1.3,
    "\u201cFark vard\u0131r\u201d veya \u201cEtki vard\u0131r\u201d iddias\u0131.\n\n" +
    "\u00d6rnek: Yeni ila\u00e7 plaseboya g\u00f6re daha etkilidir.\n\n" +
    "Kan\u0131tlamak istedi\u011fimiz hipotezdir."
  );

  // Alt: p-value ve alpha
  card(s, 0.4, 3.2, 4.8, 2.2, { leftColor: C.purple });
  T.cardTitle(s, 0.6, 3.3, 4.4, "p-value (Anlaml\u0131l\u0131k De\u011feri)", C.purple);
  T.cardBody(s, 0.6, 3.7, 4.4, 1.5,
    "H\u2080 do\u011fruyken g\u00f6zlenen sonucu elde etme olas\u0131l\u0131\u011f\u0131.\n\n" +
    "\u2022 p < 0.05 \u2192 \u0130statistiksel olarak anlaml\u0131\n" +
    "\u2022 p < 0.01 \u2192 Y\u00fcksek d\u00fczeyde anlaml\u0131\n" +
    "\u2022 p < 0.001 \u2192 \u00c7ok y\u00fcksek d\u00fczeyde anlaml\u0131\n\n" +
    "D\u00fc\u015f\u00fck p-value = H\u2080\u2019a kar\u015f\u0131 g\u00fc\u00e7l\u00fc kan\u0131t"
  );

  // Sağ: alpha kutusu
  stat(s, 5.5, 3.2, 4.1, 1.0, "\u03b1 = 0.05", "Anlaml\u0131l\u0131k D\u00fczeyi\n(E\u015fik De\u011fer)", C.amber);
  card(s, 5.5, 4.35, 4.1, 1.05, { topColor: C.amber });
  T.cardBody(s, 5.7, 4.5, 3.7, 0.8,
    "\u2022 \u03b1 = 0.05 \u2192 %5 hata pay\u0131 (en yayg\u0131n)\n" +
    "\u2022 \u03b1 = 0.01 \u2192 %1 hata pay\u0131 (kat\u0131 kriter)\n" +
    "\u2022 p < \u03b1 ise H\u2080 reddedilir"
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — HİPOTEZ TESTİ ADIMLARI (TİMELİNE)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Hipotez Testi Ad\u0131mlar\u0131", "B\u00d6L\u00dcM 3");

  const steps = [
    { title: "Hipotez Kur", desc: "H\u2080 ve H\u2081\u2019i net\n\u015fekilde tan\u0131mla", color: C.sec },
    { title: "Veri Topla", desc: "\u00d6rneklem b\u00fcy\u00fckl\u00fc\u011f\u00fc\nve y\u00f6ntemi belirle", color: C.acc },
    { title: "Test Se\u00e7", desc: "Veri t\u00fcr\u00fcne uygun\nistatistik testi se\u00e7", color: C.amber },
    { title: "Hesapla", desc: "Test istatisti\u011fi ve\np-value hesapla", color: C.purple },
    { title: "Karar Ver", desc: "p < \u03b1 ise H\u2080\u2019\u0131\nreddet, sonucu yorumla", color: C.green },
  ];

  // Yatay çizgi (timeline)
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.3, w: 8.4, h: 0.06, fill: { color: C.bdr } });

  steps.forEach((step, i) => {
    const x = 0.5 + i * 1.85;
    // Daire
    s.addShape(pres.shapes.OVAL, { x: x + 0.5, y: 2.05, w: 0.55, h: 0.55, fill: { color: step.color } });
    s.addText(String(i + 1), { x: x + 0.5, y: 2.05, w: 0.55, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 16, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    // Başlık
    s.addText(step.title, { x: x, y: 1.25, w: 1.55, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: step.color, align: "center" });
    // Açıklama
    s.addText(step.desc, { x: x, y: 2.75, w: 1.55, h: 0.7, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, align: "center" });
  });

  // Alt: ipucu kutusu
  card(s, 0.4, 3.7, 9.2, 1.65, { topColor: C.pri });
  T.cardTitle(s, 0.6, 3.82, 8.8, "Kritik Uyar\u0131lar", C.pri);
  T.cardBody(s, 0.6, 4.2, 4.3, 1.0,
    "\u2022 \u0130statistiksel anlaml\u0131l\u0131k \u2260 pratik anlaml\u0131l\u0131k\n" +
    "\u2022 p-value etkinin b\u00fcy\u00fckl\u00fc\u011f\u00fcn\u00fc g\u00f6stermez\n" +
    "\u2022 Etki b\u00fcy\u00fckl\u00fc\u011f\u00fc (Cohen\u2019s d) mutlaka raporlay\u0131n"
  );
  T.cardBody(s, 5.2, 4.2, 4.2, 1.0,
    "\u2022 \u00c7oklu kar\u015f\u0131la\u015ft\u0131rma? Bonferroni d\u00fczeltmesi\n" +
    "\u2022 \u00d6rneklem b\u00fcy\u00fckl\u00fc\u011f\u00fc yeterli mi? G\u00fc\u00e7 analizi\n" +
    "\u2022 Varsay\u0131mlar\u0131 her zaman kontrol edin"
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — T-TEST
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "T-Test: \u0130ki Grup Kar\u015f\u0131la\u015ft\u0131rmas\u0131", "B\u00d6L\u00dcM 3");

  // Üst: açıklama
  card(s, 0.4, 1.0, 4.5, 1.6, { leftColor: C.blue });
  T.cardTitle(s, 0.6, 1.1, 4.1, "Ba\u011f\u0131ms\u0131z \u0130ki \u00d6rneklem T-Testi", C.blue);
  T.cardBody(s, 0.6, 1.5, 4.1, 0.9,
    "\u0130ki grubun ortalamalar\u0131 aras\u0131nda istatistiksel\nolarak anlaml\u0131 bir fark olup olmad\u0131\u011f\u0131n\u0131 test eder.\n" +
    "\u00d6nko\u015ful: Normal da\u011f\u0131l\u0131m + varyans homojenli\u011fi"
  );

  // Sağ üst: test türleri
  card(s, 5.2, 1.0, 4.4, 1.6, { topColor: C.acc });
  T.cardTitle(s, 5.4, 1.12, 4.0, "T-Test T\u00fcrleri", C.acc);
  const ttypes = [
    { name: "Ba\u011f\u0131ms\u0131z", desc: "Farkl\u0131 gruplar (kontrol vs deney)" },
    { name: "E\u015flenikli", desc: "Ayn\u0131 grup, \u00f6nce-sonra \u00f6l\u00e7\u00fcm" },
    { name: "Tek \u00d6rneklem", desc: "Grup ortalamas\u0131 vs bilinen de\u011fer" },
  ];
  ttypes.forEach((t, i) => {
    const y = 1.45 + i * 0.35;
    badge(s, 5.4, y, i + 1, C.acc);
    s.addText(t.name + ": ", { x: 5.85, y, w: 1.3, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText(t.desc, { x: 7.1, y, w: 2.3, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, valign: "middle" });
  });

  // Alt: kod
  code(s, 0.4, 2.8, 9.2, 2.55, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "scipy.stats ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "ttest_ind\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# A grubu: Eski reklam     B grubu: Yeni reklam\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "grup_a = [23, 25, 28, 22, 30, 27, 24, 26, 29, 31]\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "grup_b = [30, 33, 35, 28, 38, 32, 36, 34, 31, 37]\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "t_stat, p_value = ttest_ind(grup_a, grup_b)\n\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"T istatisti\u011fi: {t_stat:.4f}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"p-value:       {p_value:.4f}\")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "if ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "p_value < 0.05:\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    print(\"\u2705 Gruplar aras\u0131nda anlaml\u0131 fark var!\")", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — ANOVA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "ANOVA: \u00c7oklu Grup Kar\u015f\u0131la\u015ft\u0131rmas\u0131", "B\u00d6L\u00dcM 3");

  // Sol: açıklama
  card(s, 0.4, 1.0, 4.5, 2.0, { leftColor: C.amber });
  T.cardTitle(s, 0.6, 1.1, 4.1, "Tek Y\u00f6nl\u00fc ANOVA (One-Way)", C.amber);
  T.cardBody(s, 0.6, 1.5, 4.1, 1.3,
    "2 veya daha fazla grubun ortalamalar\u0131n\u0131\nayn\u0131 anda kar\u015f\u0131la\u015ft\u0131r\u0131r.\n\n" +
    "\u2022 F istatisti\u011fi = Gruplar aras\u0131 varyans / Grup i\u00e7i varyans\n" +
    "\u2022 F b\u00fcy\u00fck \u2192 Gruplar aras\u0131 fark anlaml\u0131\n" +
    "\u2022 Post-hoc test (Tukey) ile hangi gruplar farkl\u0131?"
  );

  // Sağ: T-test vs ANOVA
  card(s, 5.2, 1.0, 4.4, 2.0, { topColor: C.purple });
  T.cardTitle(s, 5.4, 1.12, 4.0, "T-Test vs ANOVA", C.purple);
  T.cardBody(s, 5.4, 1.5, 4.0, 1.3,
    "\u2022 T-Test: 2 grup kar\u015f\u0131la\u015ft\u0131rmas\u0131\n" +
    "\u2022 ANOVA: 2+ grup kar\u015f\u0131la\u015ft\u0131rmas\u0131\n" +
    "\u2022 3+ grup i\u00e7in \u00e7oklu t-test YAPMAYIN!\n" +
    "  (Tip I hata artar: \u03b1' = 1-(1-\u03b1)^k)\n\n" +
    "\u2022 ANOVA sonucu anlaml\u0131 \u2192 Post-hoc test\n" +
    "\u2022 Varsay\u0131m: Normal da\u011f\u0131l\u0131m + e\u015fit varyans"
  );

  // Alt: kod
  code(s, 0.4, 3.2, 9.2, 2.15, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "scipy.stats ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "f_oneway\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# \u00dc\u00e7 farkl\u0131 \u00f6\u011fretim y\u00f6ntemiyle s\u0131nav puanlar\u0131\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "yontem_a = [78, 82, 85, 79, 88, 90]\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "yontem_b = [65, 70, 68, 72, 66, 74]\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "yontem_c = [90, 92, 88, 95, 91, 87]\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "f_stat, p_value = f_oneway(yontem_a, yontem_b, yontem_c)\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"F istatisti\u011fi: {f_stat:.4f}, p-value: {p_value:.6f}\")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — Kİ-KARE TESTİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ki-Kare (\u03c7\u00b2) Ba\u011f\u0131ms\u0131zl\u0131k Testi", "B\u00d6L\u00dcM 3");

  // Sol: açıklama
  card(s, 0.4, 1.0, 4.5, 1.6, { leftColor: C.red });
  T.cardTitle(s, 0.6, 1.1, 4.1, "Ki-Kare Testi Nedir?", C.red);
  T.cardBody(s, 0.6, 1.45, 4.1, 1.0,
    "\u0130ki kategorik de\u011fi\u015fken aras\u0131nda ba\u011f\u0131ms\u0131zl\u0131k\nolup olmad\u0131\u011f\u0131n\u0131 test eder.\n\n" +
    "\u00d6rn: Yolcu s\u0131n\u0131f\u0131 ile hayatta kalma aras\u0131nda\nili\u015fki var m\u0131? (Titanic)"
  );

  // Sağ: Titanic çapraz tablosu
  card(s, 5.2, 1.0, 4.4, 1.6, { topColor: C.acc });
  T.cardTitle(s, 5.4, 1.12, 4.0, "Titanic \u00d6rne\u011fi: \u00c7apraz Tablo", C.acc);

  // Mini tablo
  const chiCols = [
    { x: 5.5, w: 1.2, text: "" },
    { x: 6.7, w: 1.3, text: "Hayatta" },
    { x: 8.0, w: 1.3, text: "Vefat" },
  ];
  chiCols.forEach(col => {
    s.addShape(pres.shapes.RECTANGLE, { x: col.x, y: 1.48, w: col.w, h: 0.3, fill: { color: C.pri } });
    s.addText(col.text, { x: col.x, y: 1.48, w: col.w, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  });
  const chiRows = [
    ["1. S\u0131n\u0131f", "136", "80"],
    ["2. S\u0131n\u0131f", "87", "97"],
    ["3. S\u0131n\u0131f", "119", "372"],
  ];
  chiRows.forEach((row, i) => {
    const y = 1.78 + i * 0.28;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    [5.5, 6.7, 8.0].forEach((x, j) => {
      const w = chiCols[j].w;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.28, fill: { color: bg } });
      s.addText(row[j], { x, y, w, h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 9, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: "center", valign: "middle" });
    });
  });

  // Alt: kod
  code(s, 0.4, 2.8, 9.2, 2.55, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "pandas ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "pd\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "scipy.stats ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "chi2_contingency\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Titanic veri seti\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "df = pd.read_csv('titanic.csv')\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "capraz = pd.crosstab(df['Pclass'], df['Survived'])\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "chi2, p_val, dof, expected = chi2_contingency(capraz)\n\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"\u03c7\u00b2 = {chi2:.2f}, p = {p_val:.6f}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"Serbestlik derecesi: {dof}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# p < 0.05 \u2192 S\u0131n\u0131f ile hayatta kalma ili\u015fkili!", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — GÜVEN ARALIKLARI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "G\u00fcven Aral\u0131klar\u0131 (Confidence Intervals)", "B\u00d6L\u00dcM 3");

  // Üst: ana açıklama
  card(s, 0.4, 1.0, 5.5, 2.0, { leftColor: C.green });
  T.cardTitle(s, 0.6, 1.1, 5.1, "%95 G\u00fcven Aral\u0131\u011f\u0131 Nedir?", C.green);
  T.cardBody(s, 0.6, 1.5, 5.1, 1.3,
    "Pop\u00fclasyon parametresinin (ger\u00e7ek ortalama)\nhangi aral\u0131kta oldu\u011funa dair tahmin.\n\n" +
    "\u2022 100 kez \u00f6rneklem alsan, 95\u2019inde ger\u00e7ek\n  de\u011fer bu aral\u0131kta olur\n" +
    "\u2022 Aral\u0131k dar \u2192 tahmin kesin\n" +
    "\u2022 Aral\u0131k geni\u015f \u2192 belirsizlik y\u00fcksek"
  );

  // Sağ üst: formül
  card(s, 6.15, 1.0, 3.45, 2.0, { topColor: C.purple });
  T.cardTitle(s, 6.35, 1.12, 3.05, "Form\u00fcl", C.purple);
  s.addText("x\u0304 \u00b1 z \u00d7 (\u03c3 / \u221an)", { x: 6.35, y: 1.55, w: 3.05, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 18, bold: true, color: C.pri, align: "center" });
  T.cardBody(s, 6.35, 2.1, 3.05, 0.75,
    "x\u0304 = \u00f6rneklem ortalamas\u0131\nz = 1.96 (%95 i\u00e7in)\n\u03c3 = standart sapma, n = \u00f6rneklem"
  );

  // Alt: örnek hesaplama
  card(s, 0.4, 3.2, 9.2, 2.15, { topColor: C.amber });
  T.cardTitle(s, 0.6, 3.32, 8.8, "\u00d6rnek Hesaplama: M\u00fc\u015fteri Memnuniyet Puan\u0131", C.amber);

  const params = [
    { label: "n (veri say\u0131s\u0131)", val: "100", color: C.blue },
    { label: "x\u0304 (ortalama)", val: "7.2", color: C.acc },
    { label: "\u03c3 (std sapma)", val: "1.5", color: C.amber },
    { label: "z (%95)", val: "1.96", color: C.purple },
  ];
  params.forEach((p, i) => {
    const x = 0.6 + i * 2.2;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 3.8, w: 1.9, h: 0.55, fill: { color: p.color } });
    s.addText(p.val, { x, y: 3.8, w: 1.9, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(p.label, { x, y: 4.15, w: 1.9, h: 0.2, margin: 0, fontFace: "Calibri", fontSize: 8, color: "FFFFFF", align: "center" });
  });

  // Sonuç
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.55, w: 8.8, h: 0.6, fill: { color: C.accPale } });
  s.addText("GA = 7.2 \u00b1 1.96 \u00d7 (1.5 / \u221a100) = 7.2 \u00b1 0.294 = [6.906 , 7.494]", {
    x: 0.6, y: 4.55, w: 8.8, h: 0.6, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: C.acc, align: "center", valign: "middle"
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — A/B TESTİ NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "A/B Testi Nedir?", "B\u00d6L\u00dcM 4");

  // Üst: tanım kartı
  card(s, 0.4, 1.0, 9.2, 1.5, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 8.8, "Kontroll\u00fc Deney Y\u00f6ntemi", C.sec);
  T.cardBody(s, 0.6, 1.5, 8.8, 0.85,
    "\u0130ki (veya daha fazla) versiyonun rastgele se\u00e7ilmi\u015f kullan\u0131c\u0131 gruplar\u0131na sunularak performans fark\u0131n\u0131n istatistiksel olarak \u00f6l\u00e7\u00fcld\u00fc\u011f\u00fc deneysel y\u00f6ntem. " +
    "Veri odakl\u0131 karar vermenin temel ta\u015f\u0131d\u0131r."
  );

  // Alt: 4 kart grid — iş dünyası kullanım alanları
  const areas = [
    { title: "Web Tasar\u0131m\u0131", desc: "Buton rengi, sayfa d\u00fczeni,\nCTA metni, form uzunlu\u011fu", icon: "\ud83c\udf10", color: C.blue },
    { title: "E-Ticaret", desc: "Fiyatland\u0131rma, \u00fcr\u00fcn g\u00f6rseli,\n\u00f6deme ak\u0131\u015f\u0131, kampanya", icon: "\ud83d\uded2", color: C.green },
    { title: "Mobil Uygulama", desc: "Onboarding ak\u0131\u015f\u0131, bildirim\nzamanla, UI de\u011fi\u015fikli\u011fi", icon: "\ud83d\udcf1", color: C.amber },
    { title: "Pazarlama", desc: "E-posta konu sat\u0131r\u0131, reklam\nmetni, hedef kitle se\u00e7imi", icon: "\ud83d\udce7", color: C.purple },
  ];
  areas.forEach((area, i) => {
    const x = 0.4 + i * 2.35;
    card(s, x, 2.75, 2.15, 2.55, { topColor: area.color });
    s.addText(area.icon, { x, y: 2.95, w: 2.15, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 26, align: "center", valign: "middle" });
    s.addText(area.title, { x: x + 0.15, y: 3.55, w: 1.85, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: area.color, align: "center" });
    s.addText(area.desc, { x: x + 0.15, y: 3.95, w: 1.85, h: 1.0, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — A/B TESTİ METODOLOJİSİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "A/B Testi Metodolojisi", "B\u00d6L\u00dcM 4");

  const steps = [
    { num: "1", title: "Hedef Belirle", desc: "KPI se\u00e7: d\u00f6n\u00fc\u015f\u00fcm oran\u0131,\nt\u0131klama oran\u0131, gelir...", color: C.sec },
    { num: "2", title: "Hipotez Kur", desc: "H\u2080: Fark yok\nH\u2081: Yeni versiyon daha iyi", color: C.acc },
    { num: "3", title: "\u00d6rneklem Hesapla", desc: "G\u00fc\u00e7 analizi ile gerekli\nkullan\u0131c\u0131 say\u0131s\u0131n\u0131 bul", color: C.amber },
    { num: "4", title: "Uygula", desc: "Rastgele atama ile A/B\ngruplar\u0131na b\u00f6l", color: C.blue },
    { num: "5", title: "Analiz Et", desc: "Yeterli veri sonras\u0131\nistatistik testi uygula", color: C.purple },
    { num: "6", title: "Karar Ver", desc: "p < \u03b1 ise kazanan\u0131\nkalıcı yap", color: C.green },
  ];

  steps.forEach((step, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const x = 0.4 + col * 3.15;
    const y = 1.0 + row * 2.15;

    card(s, x, y, 2.95, 1.9, { topColor: step.color });
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.2, w: 0.5, h: 0.5, fill: { color: step.color } });
    s.addText(step.num, { x: x + 0.15, y: y + 0.2, w: 0.5, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(step.title, { x: x + 0.75, y: y + 0.25, w: 2.0, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: step.color, valign: "middle" });
    s.addText(step.desc, { x: x + 0.15, y: y + 0.85, w: 2.65, h: 0.85, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — A/B TESTİ UYGULAMA (KOD)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "A/B Testi: Mobil Oyun Reklam \u00d6rne\u011fi", "B\u00d6L\u00dcM 4");

  // Üst: senaryo kartı
  card(s, 0.4, 1.0, 9.2, 1.0, { leftColor: C.amber });
  T.cardTitle(s, 0.6, 1.08, 4.0, "Senaryo", C.amber);
  T.cardBody(s, 0.6, 1.4, 8.8, 0.45,
    "Mobil oyun \u015firketi yeni reklam format\u0131n\u0131 test ediyor. A: mevcut reklam (banner), B: yeni reklam (video). Metrik: g\u00fcnl\u00fck gelir ($)."
  );

  // Kod
  code(s, 0.4, 2.2, 9.2, 3.15, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "numpy ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "np\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "scipy.stats ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "ttest_ind\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "np.random.seed(42)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# A grubu: banner reklam (30 g\u00fcnl\u00fck gelir)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "banner = np.random.normal(loc=45, scale=8, size=30)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# B grubu: video reklam (30 g\u00fcnl\u00fck gelir)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "video  = np.random.normal(loc=52, scale=10, size=30)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "t_stat, p_value = ttest_ind(banner, video)\n\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"Banner ortalama: ${banner.mean():.2f}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"Video  ortalama: ${video.mean():.2f}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"T-istatistik:    {t_stat:.4f}\")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "print(f\"p-value:         {p_value:.4f}\")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "alpha = 0.05\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "if ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "p_value < alpha:\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    print(\"\u2705 Video reklam anlaml\u0131 fark yarat\u0131yor!\")\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "else:\n", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "    print(\"\u274c Anlaml\u0131 fark bulunamad\u0131\")", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — TİP I ve TİP II HATA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Tip I ve Tip II Hata", "B\u00d6L\u00dcM 4");

  // 2x2 matris başlıkları
  // Boş sol üst
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.2, w: 2.0, h: 0.5, fill: { color: C.pri } });
  s.addText("Karar \u2193 / Ger\u00e7ek \u2192", { x: 0.6, y: 1.2, w: 2.0, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

  // Sütun başlıkları
  s.addShape(pres.shapes.RECTANGLE, { x: 2.6, y: 1.2, w: 3.2, h: 0.5, fill: { color: C.green } });
  s.addText("H\u2080 Do\u011fru (Fark Yok)", { x: 2.6, y: 1.2, w: 3.2, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 11, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.8, y: 1.2, w: 3.2, h: 0.5, fill: { color: C.red } });
  s.addText("H\u2080 Yanl\u0131\u015f (Fark Var)", { x: 5.8, y: 1.2, w: 3.2, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 11, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

  // Satır 1: H0 Reddedildi
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.7, w: 2.0, h: 1.5, fill: { color: C.pri } });
  s.addText("H\u2080\nReddedildi", { x: 0.6, y: 1.7, w: 2.0, h: 1.5, margin: 0, fontFace: "Calibri", fontSize: 11, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

  card(s, 2.6, 1.7, 3.2, 1.5, { bg: "FDEAEA" });
  T.cardTitle(s, 2.8, 1.8, 2.8, "\u274c Tip I Hata (\u03b1)", C.red);
  T.cardBody(s, 2.8, 2.2, 2.8, 0.85,
    "Fark yokken \u201cfark var\u201d demek.\n\u00d6rn: Etkisiz ilac\u0131 \u201cetkili\u201d\nilan etmek. (Yanl\u0131\u015f Pozitif)"
  );

  card(s, 5.8, 1.7, 3.2, 1.5, { bg: C.accPale });
  T.cardTitle(s, 6.0, 1.8, 2.8, "\u2705 Do\u011fru Karar", C.green);
  T.cardBody(s, 6.0, 2.2, 2.8, 0.85,
    "Ger\u00e7ekten fark varken\n\u201cfark var\u201d demek.\n(Do\u011fru Pozitif \u2014 G\u00fc\u00e7 = 1\u2212\u03b2)"
  );

  // Satır 2: H0 Reddedilmedi
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.2, w: 2.0, h: 1.5, fill: { color: C.pri } });
  s.addText("H\u2080\nReddedilmedi", { x: 0.6, y: 3.2, w: 2.0, h: 1.5, margin: 0, fontFace: "Calibri", fontSize: 11, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

  card(s, 2.6, 3.2, 3.2, 1.5, { bg: C.accPale });
  T.cardTitle(s, 2.8, 3.3, 2.8, "\u2705 Do\u011fru Karar", C.green);
  T.cardBody(s, 2.8, 3.7, 2.8, 0.85,
    "Ger\u00e7ekten fark yokken\n\u201cfark yok\u201d demek.\n(Do\u011fru Negatif)"
  );

  card(s, 5.8, 3.2, 3.2, 1.5, { bg: "FEF3E0" });
  T.cardTitle(s, 6.0, 3.3, 2.8, "\u26a0\ufe0f Tip II Hata (\u03b2)", C.amber);
  T.cardBody(s, 6.0, 3.7, 2.8, 0.85,
    "Fark varken \u201cfark yok\u201d demek.\n\u00d6rn: Etkili ilac\u0131 \u201cetkisiz\u201d\nilan etmek. (Yanl\u0131\u015f Negatif)"
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 18 — HAFTALIK NOTEBOOK'LAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Haftal\u0131k Notebook\u2019lar", "B\u00d6L\u00dcM 4");

  const notebooks = [
    {
      title: "istatistik_temel.ipynb",
      desc: "Tan\u0131mlay\u0131c\u0131 istatistik hesaplamalar\u0131, normal da\u011f\u0131l\u0131m analizi, Shapiro-Wilk testi, korelasyon matrisi olu\u015fturma",
      items: ["describe(), mean(), median()", "Shapiro-Wilk normallik testi", "Pearson & Spearman korelasyon", "Histogram + Q-Q Plot"],
      color: C.sec,
    },
    {
      title: "ab_testi.ipynb",
      desc: "A/B testi tasar\u0131m\u0131, uygulamas\u0131 ve sonu\u00e7 analizi. T-test ile grup kar\u015f\u0131la\u015ft\u0131rmas\u0131, g\u00fcven aral\u0131\u011f\u0131 hesaplama",
      items: ["Rastgele grup atamas\u0131", "ttest_ind ile analiz", "G\u00fcven aral\u0131\u011f\u0131 hesaplama", "Etki b\u00fcy\u00fckl\u00fc\u011f\u00fc (Cohen's d)"],
      color: C.acc,
    },
    {
      title: "chi_square.ipynb",
      desc: "Titanic veri seti \u00fczerinde Ki-Kare ba\u011f\u0131ms\u0131zl\u0131k testi, \u00e7apraz tablo analizi ve g\u00f6rselle\u015ftirme",
      items: ["pd.crosstab() kullan\u0131m\u0131", "chi2_contingency testi", "Heatmap g\u00f6rselle\u015ftirme", "ANOVA ve post-hoc testler"],
      color: C.purple,
    },
  ];

  notebooks.forEach((nb, i) => {
    const x = 0.4 + i * 3.15;
    card(s, x, 1.0, 2.95, 4.3, { topColor: nb.color });
    // Notebook ikonu
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 1.2, w: 2.65, h: 0.4, fill: { color: nb.color } });
    s.addText(nb.title, { x: x + 0.15, y: 1.2, w: 2.65, h: 0.4, margin: 0, fontFace: "Consolas", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    // Açıklama
    T.cardBody(s, x + 0.15, 1.75, 2.65, 1.2, nb.desc, { size: 10 });
    // İçerik listesi
    nb.items.forEach((item, j) => {
      const y = 3.05 + j * 0.45;
      badge(s, x + 0.15, y, j + 1, nb.color);
      s.addText(item, { x: x + 0.6, y, w: 2.2, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, valign: "middle" });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "\u00d6dev ve Kaynaklar", "B\u00d6L\u00dcM 4");

  // Sol: Ödevler
  card(s, 0.4, 1.0, 4.5, 4.3, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 4.1, "Haftal\u0131k \u00d6devler", C.sec);

  const odevler = [
    { title: "\u00d6dev 1: Tan\u0131mlay\u0131c\u0131 \u0130statistik", desc: "Bir veri seti i\u00e7in ortalama, medyan, mod, std hesaplay\u0131n ve normal da\u011f\u0131l\u0131m\u0131 kontrol edin." },
    { title: "\u00d6dev 2: Korelasyon Analizi", desc: "En az 3 say\u0131sal de\u011fi\u015fken aras\u0131nda Pearson ve Spearman korelasyonu hesaplay\u0131n." },
    { title: "\u00d6dev 3: A/B Testi", desc: "Bir senaryo olu\u015fturup t-test ile A/B testi ger\u00e7ekle\u015ftirin ve g\u00fcven aral\u0131\u011f\u0131 hesaplay\u0131n." },
    { title: "\u00d6dev 4: Ki-Kare Testi", desc: "Titanic veri setinde farkl\u0131 \u00e7apraz tablo kombinasyonlar\u0131 ile \u03c7\u00b2 testi uygulay\u0131n." },
  ];
  odevler.forEach((od, i) => {
    const y = 1.55 + i * 0.92;
    badge(s, 0.6, y + 0.05, i + 1, C.sec);
    s.addText(od.title, { x: 1.1, y, w: 3.6, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark });
    s.addText(od.desc, { x: 1.1, y: y + 0.3, w: 3.6, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid });
  });

  // Sağ: Kaynaklar
  card(s, 5.2, 1.0, 4.4, 4.3, { leftColor: C.acc });
  T.cardTitle(s, 5.4, 1.1, 4.0, "Kaynaklar", C.acc);

  const kaynaklar = [
    { title: "SciPy Stats Dok\u00fcmantasyonu", desc: "docs.scipy.org/doc/scipy/reference/stats.html", color: C.blue },
    { title: "Think Stats (Allen Downey)", desc: "\u00dccretsiz e-kitap: greenteapress.com/thinkstats", color: C.green },
    { title: "Khan Academy: \u0130statistik", desc: "Temel istatistik dersleri (T\u00fcrk\u00e7e alt yaz\u0131l\u0131)", color: C.amber },
    { title: "Trustworthy Online Experiments", desc: "Kohavi et al. — A/B Testi referans kitab\u0131", color: C.purple },
    { title: "Statistics for Data Science", desc: "Field, A. (2013) — Discovering Statistics", color: C.red },
  ];
  kaynaklar.forEach((k, i) => {
    const y = 1.55 + i * 0.72;
    s.addShape(pres.shapes.OVAL, { x: 5.4, y: y + 0.02, w: 0.3, h: 0.3, fill: { color: k.color } });
    s.addText(k.title, { x: 5.85, y, w: 3.5, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark });
    s.addText(k.desc, { x: 5.85, y: y + 0.3, w: 3.5, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, italic: true });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 4 \u2014 \u00d6zet",
  [
    { text: "Tan\u0131mlay\u0131c\u0131 istatistik (ortalama, medyan, std) verinin hikayesini anlamam\u0131z\u0131 sa\u011flar", color: C.sec },
    { text: "Normallik testi, do\u011fru istatistiksel y\u00f6ntemi se\u00e7mek i\u00e7in \u00f6nko\u015fuldur", color: C.acc },
    { text: "Hipotez testleri (t-test, ANOVA, \u03c7\u00b2) farkl\u0131 senaryolarda karar deste\u011fi sunar", color: C.amber },
    { text: "A/B testi, veri odakl\u0131 karar vermenin en g\u00fc\u00e7l\u00fc arac\u0131d\u0131r", color: C.purple },
    { text: "p-value tek ba\u015f\u0131na yetmez: etki b\u00fcy\u00fckl\u00fc\u011f\u00fc ve g\u00fcven aral\u0131\u011f\u0131 da raporlay\u0131n", color: C.green },
  ],
  "Veri olmadan fikir y\u00fcr\u00fctmek, kar\u015f\u0131 tak\u0131m\u0131 g\u00f6rmeden strateji kurmaya benzer.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// KAYDET
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta04_istatistik_ab_testi.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("PPTX olu\u015fturuldu: " + outPath);
}).catch(err => {
  console.error("HATA:", err);
});
