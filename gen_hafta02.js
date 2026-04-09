const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;
const TOTAL = 22;

const pres = T.createPres("Hafta 2: NumPy ve Pandas ile Keşifsel Veri Analizi");

// ═══════════════════════════════════════════════════════════
// SLAYT 1 — KAPAK
// ═══════════════════════════════════════════════════════════
T.addCoverSlide(pres,
  "NumPy ve Pandas\nile EDA",
  "Keşifsel Veri Analizi: Veriden Anlam Çıkarmanın\nTemel Araçları ve Teknikleri",
  "Dr. Murat Altun",
  [
    { value: "2", label: "Temel Kütüphane\nNumPy + Pandas" },
    { value: "%80", label: "Veri bilimcilerin\nvaktinin EDA'ya ayrılan oranı" },
    { value: "5 dk", label: "CSV'den ilk içgörüye\nortalama süre" },
    { value: "∞", label: "Pandas ile\ncevaplanabilecek soru" },
  ]
);

// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "İçindekiler", null, null, TOTAL);

  const sections = [
    { num: "01", title: "NumPy Temelleri", items: "Array oluşturma · Matematiksel işlemler · İstatistik fonksiyonları", color: C.sec, slides: "Slayt 3-5" },
    { num: "02", title: "Pandas Temelleri", items: "Series ve DataFrame · CSV/Excel okuma · Veri seçme (loc, iloc)", color: C.acc, slides: "Slayt 6-9" },
    { num: "03", title: "Keşifsel Veri Analizi", items: "EDA komutları · Eksik veri · Filtreleme · GroupBy · Apply/Lambda", color: C.amber, slides: "Slayt 10-16" },
    { num: "04", title: "Uygulama ve Özet", items: "Titanic EDA · Tips analizi · Kontrol listesi · Hatalar · Ödev", color: C.purple, slides: "Slayt 17-22" },
  ];

  sections.forEach((sec, i) => {
    const y = 1.05 + i * 1.1;
    T.addCard(pres, s, 0.5, y, 9.0, 0.92, { leftColor: sec.color });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.56, y: y + 0.15, w: 0.7, h: 0.6, fill: { color: sec.color } });
    s.addText(sec.num, { x: 0.56, y: y + 0.15, w: 0.7, h: 0.6, margin: 0, fontFace: "Georgia", fontSize: 20, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(sec.title, { x: 1.4, y: y + 0.1, w: 5, h: 0.42, margin: 0, fontFace: "Georgia", fontSize: 15, bold: true, color: C.dark });
    s.addText(sec.items, { x: 1.4, y: y + 0.52, w: 5, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid });
    s.addText(sec.slides, { x: 7.8, y: y + 0.24, w: 1.5, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10, color: sec.color, bold: true, align: "right" });
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 3 — NUMPY NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "NumPy Nedir?", "BÖLÜM 1", null, TOTAL);

  // Sol: Tanım kartı
  T.addCard(pres, s, 0.4, 1.0, 5.3, 2.0, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 4.8, "Numerical Python");
  T.cardBody(s, 0.6, 1.52, 4.9, 1.3,
    "NumPy, Python'da yüksek performanslı sayısal hesaplama için temel kütüphanedir. Çok boyutlu diziler (ndarray) üzerinde vektörize işlemler yaparak döngülerden 10-100x daha hızlı çalışır."
  );

  // Sağ: Özellikler
  T.addCard(pres, s, 6.0, 1.0, 3.7, 2.0, { topColor: C.acc });
  T.cardTitle(s, 6.2, 1.15, 3.3, "Neden NumPy?", C.acc);
  const features = ["Hızlı vektörize işlemler", "N-boyutlu dizi desteği", "Matematiksel fonksiyonlar", "Bellek verimliliği"];
  features.forEach((f, i) => {
    T.numBadge(pres, s, 6.2, 1.58 + i * 0.32, i + 1, C.acc);
    T.cardBody(s, 6.65, 1.58 + i * 0.32, 2.9, 0.3, f, { size: 10 });
  });

  // Alt: Python List vs NumPy karşılaştırma
  T.addCard(pres, s, 0.4, 3.2, 9.3, 2.2, { topColor: C.pri });
  T.cardTitle(s, 0.6, 3.35, 4, "Python Listesi vs NumPy Array");

  const tblRows = [
    [{ text: "Özellik", options: { bold: true, color: "FFFFFF", fill: { color: C.pri } } },
     { text: "Python Listesi", options: { bold: true, color: "FFFFFF", fill: { color: C.pri } } },
     { text: "NumPy Array", options: { bold: true, color: "FFFFFF", fill: { color: C.pri } } }],
    ["Hız", "Yavaş (döngü)", "Çok hızlı (vektörize)"],
    ["Bellek", "Fazla tüketir", "Optimize edilmiş"],
    ["Tip", "Karışık tipler", "Homojen (tek tip)"],
    ["Boyut", "1D (iç içe ile nD)", "Doğal nD desteği"],
    ["İşlemler", "Manuel döngü", "Elementwise otomatik"],
  ];
  s.addTable(tblRows, {
    x: 0.6, y: 3.75, w: 8.9,
    fontFace: "Calibri", fontSize: 10,
    border: { type: "solid", pt: 0.5, color: C.bdr },
    colW: [2.5, 3.2, 3.2],
    rowH: [0.3, 0.26, 0.26, 0.26, 0.26, 0.26],
    autoPage: false,
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 4 — NUMPY ARRAY OLUŞTURMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "NumPy Array Oluşturma", "BÖLÜM 1", null, TOTAL);

  // Kod bloğu — sol
  T.addCodeBlock(pres, s, 0.4, 1.0, 5.5, 4.3, [
    { text: "import ", options: { color: C.codeBlue } },
    { text: "numpy ", options: { color: C.codeGreen } },
    { text: "as ", options: { color: C.codeBlue } },
    { text: "np\n\n", options: { color: C.codeGreen } },
    { text: "# Listeden array\n", options: { color: C.codeYellow, italic: true } },
    { text: "a = np.array([1, 2, 3, 4, 5])\n\n", options: { color: C.codeWhite } },
    { text: "# Sıfırlardan oluşan 3x3 matris\n", options: { color: C.codeYellow, italic: true } },
    { text: "zeros = np.zeros((3, 3))\n\n", options: { color: C.codeWhite } },
    { text: "# Birlerden oluşan matris\n", options: { color: C.codeYellow, italic: true } },
    { text: "ones = np.ones((2, 4))\n\n", options: { color: C.codeWhite } },
    { text: "# Aralıklı dizi\n", options: { color: C.codeYellow, italic: true } },
    { text: "rng = np.arange(0, 10, 2)  ", options: { color: C.codeWhite } },
    { text: "# [0, 2, 4, 6, 8]\n\n", options: { color: C.codeYellow, italic: true } },
    { text: "# Eşit aralıklı 5 sayı\n", options: { color: C.codeYellow, italic: true } },
    { text: "lin = np.linspace(0, 1, 5)\n\n", options: { color: C.codeWhite } },
    { text: "# Rastgele 3x3 matris\n", options: { color: C.codeYellow, italic: true } },
    { text: "rand = np.random.rand(3, 3)\n\n", options: { color: C.codeWhite } },
    { text: "# Birim matris\n", options: { color: C.codeYellow, italic: true } },
    { text: "eye = np.eye(4)", options: { color: C.codeWhite } },
  ]);

  // Sağ: Açıklama kartları
  const funcs = [
    { title: "np.array()", desc: "Listeden NumPy dizisi oluşturur", color: C.sec },
    { title: "np.zeros() / ones()", desc: "Sıfır veya bir dolu matris", color: C.acc },
    { title: "np.arange()", desc: "Belirli adımlarla aralık dizisi", color: C.amber },
    { title: "np.linspace()", desc: "Eşit aralıklı n adet sayı", color: C.green },
    { title: "np.random.rand()", desc: "0-1 arası rastgele matris", color: C.blue },
    { title: "np.eye()", desc: "nxn birim (identity) matris", color: C.purple },
  ];
  funcs.forEach((f, i) => {
    const y = 1.0 + i * 0.7;
    T.addCard(pres, s, 6.1, y, 3.6, 0.6, { leftColor: f.color });
    s.addText(f.title, { x: 6.3, y: y + 0.03, w: 3.2, h: 0.28, margin: 0, fontFace: "Consolas", fontSize: 10, bold: true, color: f.color });
    s.addText(f.desc, { x: 6.3, y: y + 0.3, w: 3.2, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid });
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 5 — NUMPY İŞLEMLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "NumPy İşlemler: Matematik ve İstatistik", "BÖLÜM 1", null, TOTAL);

  // Sol: Matematiksel işlemler
  T.addCard(pres, s, 0.4, 1.0, 4.4, 2.2, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.0, "Matematiksel İşlemler", C.sec);
  T.addCodeBlock(pres, s, 0.55, 1.55, 4.1, 1.5, [
    { text: "a = np.array([10, 20, 30])\n", options: { color: C.codeWhite } },
    { text: "b = np.array([1, 2, 3])\n\n", options: { color: C.codeWhite } },
    { text: "print", options: { color: C.codeBlue } },
    { text: "(a + b)    ", options: { color: C.codeWhite } },
    { text: "# [11, 22, 33]\n", options: { color: C.codeYellow, italic: true } },
    { text: "print", options: { color: C.codeBlue } },
    { text: "(a * b)    ", options: { color: C.codeWhite } },
    { text: "# [10, 40, 90]\n", options: { color: C.codeYellow, italic: true } },
    { text: "print", options: { color: C.codeBlue } },
    { text: "(a ** 2)   ", options: { color: C.codeWhite } },
    { text: "# [100, 400, 900]", options: { color: C.codeYellow, italic: true } },
  ]);

  // Sağ: İstatistik
  T.addCard(pres, s, 5.1, 1.0, 4.6, 2.2, { topColor: C.acc });
  T.cardTitle(s, 5.3, 1.15, 4.2, "İstatistik Fonksiyonları", C.acc);
  T.addCodeBlock(pres, s, 5.25, 1.55, 4.3, 1.5, [
    { text: "veri = np.array([85, 90, 78, 92, 88])\n\n", options: { color: C.codeWhite } },
    { text: "np.mean(veri)    ", options: { color: C.codeGreen } },
    { text: "# 86.6  (ortalama)\n", options: { color: C.codeYellow, italic: true } },
    { text: "np.median(veri)  ", options: { color: C.codeGreen } },
    { text: "# 88.0  (medyan)\n", options: { color: C.codeYellow, italic: true } },
    { text: "np.std(veri)     ", options: { color: C.codeGreen } },
    { text: "# 4.84  (std sapma)\n", options: { color: C.codeYellow, italic: true } },
    { text: "np.min(veri)     ", options: { color: C.codeGreen } },
    { text: "# 78    (minimum)\n", options: { color: C.codeYellow, italic: true } },
    { text: "np.max(veri)     ", options: { color: C.codeGreen } },
    { text: "# 92    (maksimum)", options: { color: C.codeYellow, italic: true } },
  ]);

  // Alt: Önemli kavramlar — stat kutucukları
  const stats = [
    { val: "mean()", label: "Aritmetik\nOrtalama", color: C.sec },
    { val: "median()", label: "Ortanca\nDeğer", color: C.acc },
    { val: "std()", label: "Standart\nSapma", color: C.amber },
    { val: "var()", label: "Varyans", color: C.green },
    { val: "sum()", label: "Toplam", color: C.blue },
  ];
  stats.forEach((st, i) => {
    const x = 0.4 + i * 1.88;
    T.addCard(pres, s, x, 3.5, 1.72, 1.8, { topColor: st.color });
    s.addText(st.val, { x: x, y: 3.7, w: 1.72, h: 0.55, margin: 0, fontFace: "Consolas", fontSize: 14, bold: true, color: st.color, align: "center" });
    s.addText(st.label, { x: x + 0.1, y: 4.3, w: 1.52, h: 0.8, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, align: "center" });
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 6 — PANDAS NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Pandas Nedir? Series vs DataFrame", "BÖLÜM 2", null, TOTAL);

  // Tanım kartı
  T.addCard(pres, s, 0.4, 1.0, 9.2, 1.2, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.1, 8.8, "Panel Data → Pandas");
  T.cardBody(s, 0.6, 1.5, 8.8, 0.55,
    "Pandas, yapılandırılmış (tablo) verilerle çalışmak için Python'un en güçlü kütüphanesidir. İki temel veri yapısı sunar: Series (tek sütun) ve DataFrame (tablo). Veri okuma, temizleme, dönüştürme ve analiz için tek durak çözümdür."
  );

  // Series kartı
  T.addCard(pres, s, 0.4, 2.4, 4.4, 2.9, { topColor: C.sec });
  T.cardTitle(s, 0.6, 2.55, 4.0, "Series (1 Boyutlu)", C.sec);
  T.addCodeBlock(pres, s, 0.55, 2.95, 4.1, 1.2, [
    { text: "import ", options: { color: C.codeBlue } },
    { text: "pandas ", options: { color: C.codeGreen } },
    { text: "as ", options: { color: C.codeBlue } },
    { text: "pd\n\n", options: { color: C.codeGreen } },
    { text: "notlar = pd.Series(\n", options: { color: C.codeWhite } },
    { text: "  [85, 90, 78, 92],\n", options: { color: C.codeWhite } },
    { text: "  index=['Ali','Ayşe','Can','Defne']\n", options: { color: C.codeYellow } },
    { text: ")", options: { color: C.codeWhite } },
  ]);
  T.cardBody(s, 0.6, 4.25, 4.0, 0.85, "• Etiketli tek boyutlu dizi\n• Index + değerlerden oluşur\n• NumPy array'in etiketli hâli\n• Sözlükten de oluşturulabilir", { size: 10 });

  // DataFrame kartı
  T.addCard(pres, s, 5.1, 2.4, 4.5, 2.9, { topColor: C.acc });
  T.cardTitle(s, 5.3, 2.55, 4.1, "DataFrame (2 Boyutlu)", C.acc);
  T.addCodeBlock(pres, s, 5.25, 2.95, 4.2, 1.2, [
    { text: "df = pd.DataFrame({\n", options: { color: C.codeWhite } },
    { text: "  'İsim': ['Ali','Ayşe','Can'],\n", options: { color: C.codeYellow } },
    { text: "  'Not':  [85, 90, 78],\n", options: { color: C.codeYellow } },
    { text: "  'Yaş':  [20, 22, 21]\n", options: { color: C.codeYellow } },
    { text: "})\n", options: { color: C.codeWhite } },
    { text: "print", options: { color: C.codeBlue } },
    { text: "(df.shape)  ", options: { color: C.codeWhite } },
    { text: "# (3, 3)", options: { color: C.codeYellow, italic: true } },
  ]);
  T.cardBody(s, 5.3, 4.25, 4.1, 0.85, "• Satır ve sütunlu tablo yapısı\n• Her sütun bir Series'dir\n• SQL tablosu / Excel sayfası gibi\n• Sözlük, liste veya dosyadan oluşturulur", { size: 10 });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 7 — CSV/EXCEL OKUMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "DataFrame Oluşturma ve Dosya Okuma", "BÖLÜM 2", null, TOTAL);

  // CSV okuma
  T.addCard(pres, s, 0.4, 1.0, 4.4, 2.0, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.0, "CSV Dosya Okuma", C.sec);
  T.addCodeBlock(pres, s, 0.55, 1.55, 4.1, 1.3, [
    { text: "# Basit okuma\n", options: { color: C.codeYellow, italic: true } },
    { text: "df = pd.read_csv('veri.csv')\n\n", options: { color: C.codeWhite } },
    { text: "# Parametreli okuma\n", options: { color: C.codeYellow, italic: true } },
    { text: "df = pd.read_csv(\n", options: { color: C.codeWhite } },
    { text: "  'veri.csv',\n", options: { color: C.codeYellow } },
    { text: "  sep=';', encoding='utf-8',\n", options: { color: C.codeYellow } },
    { text: "  index_col=0, nrows=1000\n", options: { color: C.codeYellow } },
    { text: ")", options: { color: C.codeWhite } },
  ]);

  // Excel okuma
  T.addCard(pres, s, 5.1, 1.0, 4.6, 2.0, { topColor: C.acc });
  T.cardTitle(s, 5.3, 1.15, 4.2, "Excel Dosya Okuma", C.acc);
  T.addCodeBlock(pres, s, 5.25, 1.55, 4.3, 1.3, [
    { text: "# Excel okuma\n", options: { color: C.codeYellow, italic: true } },
    { text: "df = pd.read_excel('veri.xlsx')\n\n", options: { color: C.codeWhite } },
    { text: "# Belirli sayfa\n", options: { color: C.codeYellow, italic: true } },
    { text: "df = pd.read_excel(\n", options: { color: C.codeWhite } },
    { text: "  'veri.xlsx',\n", options: { color: C.codeYellow } },
    { text: "  sheet_name='Sayfa2',\n", options: { color: C.codeYellow } },
    { text: "  header=0\n", options: { color: C.codeYellow } },
    { text: ")", options: { color: C.codeWhite } },
  ]);

  // Alt: Kaydetme ve diğer formatlar
  T.addCard(pres, s, 0.4, 3.2, 9.3, 2.2, { topColor: C.amber });
  T.cardTitle(s, 0.6, 3.35, 8.8, "Diğer Veri Kaynakları ve Kaydetme");

  const tblRows2 = [
    [{ text: "Fonksiyon", options: { bold: true, color: "FFFFFF", fill: { color: C.pri } } },
     { text: "Açıklama", options: { bold: true, color: "FFFFFF", fill: { color: C.pri } } },
     { text: "Örnek", options: { bold: true, color: "FFFFFF", fill: { color: C.pri } } }],
    ["pd.read_json()", "JSON dosya okuma", "pd.read_json('veri.json')"],
    ["pd.read_sql()", "SQL veritabanından okuma", "pd.read_sql(query, conn)"],
    ["pd.read_html()", "Web sayfasından tablo çekme", "pd.read_html(url)[0]"],
    ["df.to_csv()", "CSV olarak kaydetme", "df.to_csv('sonuc.csv', index=False)"],
    ["df.to_excel()", "Excel olarak kaydetme", "df.to_excel('sonuc.xlsx')"],
  ];
  s.addTable(tblRows2, {
    x: 0.6, y: 3.75, w: 8.9,
    fontFace: "Calibri", fontSize: 10,
    border: { type: "solid", pt: 0.5, color: C.bdr },
    colW: [2.5, 3.2, 3.2],
    rowH: [0.3, 0.26, 0.26, 0.26, 0.26, 0.26],
    autoPage: false,
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 8 — VERİ SEÇME: LOC VE ILOC
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Veri Seçme: .loc[] ve .iloc[]", "BÖLÜM 2", null, TOTAL);

  // .loc[] kartı
  T.addCard(pres, s, 0.4, 1.0, 4.4, 4.3, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.0, ".loc[] — Etiket Bazlı Seçim", C.sec);
  T.addCodeBlock(pres, s, 0.55, 1.55, 4.1, 3.0, [
    { text: "# Tek satır (etiketle)\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.loc[0]  ", options: { color: C.codeWhite } },
    { text: "# 0 indexli satır\n\n", options: { color: C.codeYellow, italic: true } },
    { text: "# Satır + sütun seçimi\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.loc[0:2, 'İsim':'Not']\n\n", options: { color: C.codeWhite } },
    { text: "# Koşullu seçim\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.loc[df['Not'] > 85]\n\n", options: { color: C.codeGreen } },
    { text: "# Belirli sütunlar\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.loc[:, ['İsim', 'Not']]\n\n", options: { color: C.codeWhite } },
    { text: "# Tek hücre değeri\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.loc[0, 'İsim']  ", options: { color: C.codeWhite } },
    { text: "# 'Ali'", options: { color: C.codeYellow, italic: true } },
  ]);
  T.cardBody(s, 0.6, 4.65, 4.0, 0.5, "Etiket (label) ile erişim — aralıklar dahil (inclusive)", { size: 10, italic: true, color: C.mid });

  // .iloc[] kartı
  T.addCard(pres, s, 5.1, 1.0, 4.6, 4.3, { topColor: C.acc });
  T.cardTitle(s, 5.3, 1.15, 4.2, ".iloc[] — Pozisyon Bazlı Seçim", C.acc);
  T.addCodeBlock(pres, s, 5.25, 1.55, 4.3, 3.0, [
    { text: "# İlk satır (indexle)\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.iloc[0]  ", options: { color: C.codeWhite } },
    { text: "# 0. pozisyon\n\n", options: { color: C.codeYellow, italic: true } },
    { text: "# İlk 3 satır, ilk 2 sütun\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.iloc[0:3, 0:2]\n\n", options: { color: C.codeWhite } },
    { text: "# Son satır\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.iloc[-1]\n\n", options: { color: C.codeGreen } },
    { text: "# Belirli satır ve sütunlar\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.iloc[[0, 2], [0, 1]]\n\n", options: { color: C.codeWhite } },
    { text: "# Tek hücre\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.iloc[0, 1]  ", options: { color: C.codeWhite } },
    { text: "# 85", options: { color: C.codeYellow, italic: true } },
  ]);
  T.cardBody(s, 5.3, 4.65, 4.2, 0.5, "Pozisyon (integer) ile erişim — aralıklar hariç (exclusive)", { size: 10, italic: true, color: C.mid });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 9 — KOŞULLU FİLTRELEME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Koşullu Filtreleme", "BÖLÜM 2", null, TOTAL);

  // Ana kod bloğu
  T.addCodeBlock(pres, s, 0.4, 1.0, 9.2, 2.8, [
    { text: "# Tek koşul\n", options: { color: C.codeYellow, italic: true } },
    { text: "yuksek_not = df[df['Not'] > 85]\n\n", options: { color: C.codeWhite } },
    { text: "# Birden fazla koşul (VE)\n", options: { color: C.codeYellow, italic: true } },
    { text: "filtre = df[(df['Not'] > 80) & (df['Yaş'] < 22)]\n\n", options: { color: C.codeGreen } },
    { text: "# Birden fazla koşul (VEYA)\n", options: { color: C.codeYellow, italic: true } },
    { text: "filtre2 = df[(df['Bölüm'] == 'BT') | (df['Bölüm'] == 'YBS')]\n\n", options: { color: C.codeGreen } },
    { text: "# isin() ile çoklu değer kontrolü\n", options: { color: C.codeYellow, italic: true } },
    { text: "secim = df[df['Şehir'].isin(['İstanbul', 'Ankara', 'İzmir'])]\n\n", options: { color: C.codeWhite } },
    { text: "# Metin içeriğine göre filtreleme\n", options: { color: C.codeYellow, italic: true } },
    { text: "ara = df[df['İsim'].str.contains('Ali')]\n\n", options: { color: C.codeWhite } },
    { text: "# between() ile aralık\n", options: { color: C.codeYellow, italic: true } },
    { text: "aralik = df[df['Not'].between(70, 90)]", options: { color: C.codeGreen } },
  ]);

  // Alt: Önemli notlar kartları
  const notes = [
    { icon: "&", title: "VE Koşulu", desc: "Her koşul parantez içinde\n& operatörü kullan", color: C.sec },
    { icon: "|", title: "VEYA Koşulu", desc: "Her koşul parantez içinde\n| operatörü kullan", color: C.acc },
    { icon: "~", title: "DEĞİL (NOT)", desc: "Koşulun tersini almak için\n~ operatörü kullan", color: C.amber },
    { icon: "?", title: "isin()", desc: "Birden fazla değer\nkontrolü için idealdir", color: C.purple },
  ];
  notes.forEach((n, i) => {
    const x = 0.4 + i * 2.35;
    T.addCard(pres, s, x, 4.0, 2.15, 1.35, { topColor: n.color });
    s.addText(n.icon, { x: x, y: 4.1, w: 2.15, h: 0.4, margin: 0, fontFace: "Consolas", fontSize: 18, bold: true, color: n.color, align: "center" });
    s.addText(n.title, { x: x + 0.1, y: 4.5, w: 1.95, h: 0.25, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark, align: "center" });
    s.addText(n.desc, { x: x + 0.1, y: 4.75, w: 1.95, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, align: "center" });
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 10 — TEMEL EDA KOMUTLARI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Temel EDA Komutları", "BÖLÜM 3", null, TOTAL);

  // Sol: Komutlar tablosu
  const edaCmds = [
    [{ text: "Komut", options: { bold: true, color: "FFFFFF", fill: { color: C.pri } } },
     { text: "Açıklama", options: { bold: true, color: "FFFFFF", fill: { color: C.pri } } },
     { text: "Ne Döner?", options: { bold: true, color: "FFFFFF", fill: { color: C.pri } } }],
    ["df.shape", "Satır ve sütun sayısı", "(1000, 8)"],
    ["df.info()", "Sütun tipleri, null sayısı", "Özet tablo (konsol)"],
    ["df.describe()", "Sayısal sütunların istatistikleri", "count, mean, std, min, max..."],
    ["df.dtypes", "Her sütunun veri tipi", "int64, float64, object..."],
    ["df.head(n)", "İlk n satır (varsayılan 5)", "DataFrame"],
    ["df.tail(n)", "Son n satır", "DataFrame"],
    ["df.columns", "Sütun isimleri listesi", "Index objesi"],
    ["df.nunique()", "Her sütundaki benzersiz değer", "Sayısal Series"],
    ["df.value_counts()", "Değer frekansları", "Sıralı Series"],
  ];
  s.addTable(edaCmds, {
    x: 0.4, y: 1.0, w: 9.2,
    fontFace: "Calibri", fontSize: 10,
    border: { type: "solid", pt: 0.5, color: C.bdr },
    colW: [2.4, 3.4, 3.4],
    rowH: [0.32, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
    autoPage: false,
  });

  // Alt bilgi notu
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.85, w: 9.2, h: 0.5, fill: { color: C.accPale }, line: { color: C.acc, width: 1 } });
  s.addText([
    { text: "İpucu: ", options: { bold: true, color: C.acc } },
    { text: "Her yeni veri setinde ilk 5 komutu (shape, info, describe, head, dtypes) mutlaka çalıştırın. Bu, verinin genel yapısını anlamanın en hızlı yoludur." }
  ], { x: 0.55, y: 4.85, w: 8.9, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark, valign: "middle" });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 11 — EKSİK VERİ ANALİZİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Eksik Veri Analizi", "BÖLÜM 3", null, TOTAL);

  // Üst: Tespit kodları
  T.addCard(pres, s, 0.4, 1.0, 9.2, 1.6, { topColor: C.red });
  T.cardTitle(s, 0.6, 1.15, 8.8, "Eksik Veriyi Tespit Etme", C.red);
  T.addCodeBlock(pres, s, 0.55, 1.55, 8.9, 0.9, [
    { text: "df.isnull().sum()        ", options: { color: C.codeGreen } },
    { text: "# Her sütundaki eksik sayısı\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.isnull().mean() * 100 ", options: { color: C.codeGreen } },
    { text: "# Eksik oranı (%)\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.isna().any()          ", options: { color: C.codeGreen } },
    { text: "# Hangi sütunda eksik var?", options: { color: C.codeYellow, italic: true } },
  ]);

  // Sol alt: Silme
  T.addCard(pres, s, 0.4, 2.8, 4.4, 2.5, { topColor: C.amber });
  T.cardTitle(s, 0.6, 2.95, 4.0, "Silme: dropna()", C.amber);
  T.addCodeBlock(pres, s, 0.55, 3.35, 4.1, 1.7, [
    { text: "# Eksik olan satırları sil\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.dropna()\n\n", options: { color: C.codeWhite } },
    { text: "# Sadece tümü eksik olanları sil\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.dropna(how='all')\n\n", options: { color: C.codeWhite } },
    { text: "# Belirli sütuna göre sil\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.dropna(subset=['Not'])\n\n", options: { color: C.codeWhite } },
    { text: "# Eşik: en az 3 dolu değer\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.dropna(thresh=3)", options: { color: C.codeWhite } },
  ]);

  // Sağ alt: Doldurma
  T.addCard(pres, s, 5.1, 2.8, 4.5, 2.5, { topColor: C.green });
  T.cardTitle(s, 5.3, 2.95, 4.1, "Doldurma: fillna()", C.green);
  T.addCodeBlock(pres, s, 5.25, 3.35, 4.2, 1.7, [
    { text: "# Sabit değerle doldur\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Not'].fillna(0)\n\n", options: { color: C.codeWhite } },
    { text: "# Ortalama ile doldur\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Not'].fillna(df['Not'].mean())\n\n", options: { color: C.codeGreen } },
    { text: "# Medyan ile doldur\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Not'].fillna(df['Not'].median())\n\n", options: { color: C.codeGreen } },
    { text: "# Önceki değerle doldur (ffill)\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Not'].fillna(method='ffill')", options: { color: C.codeWhite } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 12 — VERİ MANİPÜLASYONU: SIRALAMA VE FİLTRELEME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Veri Manipülasyonu: Sıralama ve Filtreleme", "BÖLÜM 3", null, TOTAL);

  // Sıralama
  T.addCard(pres, s, 0.4, 1.0, 4.4, 2.4, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.0, "Sıralama: sort_values()", C.sec);
  T.addCodeBlock(pres, s, 0.55, 1.55, 4.1, 1.7, [
    { text: "# Artan sıralama\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.sort_values('Not')\n\n", options: { color: C.codeWhite } },
    { text: "# Azalan sıralama\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.sort_values('Not', ascending=False)\n\n", options: { color: C.codeGreen } },
    { text: "# Çoklu sütun sıralama\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.sort_values(\n  ['Bölüm', 'Not'],\n  ascending=[True, False]\n)", options: { color: C.codeWhite } },
  ]);

  // Sütun işlemleri
  T.addCard(pres, s, 5.1, 1.0, 4.6, 2.4, { topColor: C.acc });
  T.cardTitle(s, 5.3, 1.15, 4.2, "Sütun İşlemleri", C.acc);
  T.addCodeBlock(pres, s, 5.25, 1.55, 4.3, 1.7, [
    { text: "# Sütun silme\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.drop('Gereksiz', axis=1)\n\n", options: { color: C.codeWhite } },
    { text: "# Sütun adı değiştirme\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.rename(columns={\n  'eski_ad': 'yeni_ad'\n})\n\n", options: { color: C.codeGreen } },
    { text: "# Tip dönüştürme\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Not'] = df['Not'].astype(float)", options: { color: C.codeWhite } },
  ]);

  // Alt: Tekrar eden ve benzersiz değerler
  T.addCard(pres, s, 0.4, 3.6, 9.3, 1.8, { topColor: C.purple });
  T.cardTitle(s, 0.6, 3.75, 8.8, "Tekrar Eden ve Benzersiz Değerler");
  T.addCodeBlock(pres, s, 0.55, 4.15, 8.9, 1.1, [
    { text: "df.duplicated().sum()            ", options: { color: C.codeGreen } },
    { text: "# Tekrar eden satır sayısı\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.drop_duplicates()             ", options: { color: C.codeGreen } },
    { text: "# Tekrarları temizle\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Şehir'].unique()             ", options: { color: C.codeGreen } },
    { text: "# Benzersiz değerler\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Şehir'].value_counts()       ", options: { color: C.codeGreen } },
    { text: "# Frekans tablosu", options: { color: C.codeYellow, italic: true } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 13 — GROUPBY İLE GRUPLAMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "GroupBy ile Gruplama ve Özet Tablolar", "BÖLÜM 3", null, TOTAL);

  // Üst: Kod örnekleri
  T.addCodeBlock(pres, s, 0.4, 1.0, 9.2, 2.2, [
    { text: "# Tek sütuna göre gruplama\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.groupby('Bölüm')['Not'].mean()\n\n", options: { color: C.codeGreen } },
    { text: "# Çoklu aggregation\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.groupby('Bölüm')['Not'].agg(['mean', 'std', 'min', 'max', 'count'])\n\n", options: { color: C.codeGreen } },
    { text: "# Çoklu sütuna göre gruplama\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.groupby(['Bölüm', 'Cinsiyet'])['Not'].mean()\n\n", options: { color: C.codeWhite } },
    { text: "# Farklı sütunlara farklı işlem\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.groupby('Bölüm').agg({\n", options: { color: C.codeWhite } },
    { text: "    'Not': 'mean',\n    'Yaş': 'median',\n    'İsim': 'count'\n", options: { color: C.codeYellow } },
    { text: "})", options: { color: C.codeWhite } },
  ]);

  // Alt: Örnek sonuç tablosu
  T.addCard(pres, s, 0.4, 3.4, 5.5, 2.0, { topColor: C.acc });
  T.cardTitle(s, 0.6, 3.55, 5.1, "Örnek Sonuç Tablosu", C.acc);
  const grpTbl = [
    [{ text: "Bölüm", options: { bold: true, color: "FFFFFF", fill: { color: C.acc } } },
     { text: "Ort. Not", options: { bold: true, color: "FFFFFF", fill: { color: C.acc } } },
     { text: "Std Sapma", options: { bold: true, color: "FFFFFF", fill: { color: C.acc } } },
     { text: "Öğrenci Sayısı", options: { bold: true, color: "FFFFFF", fill: { color: C.acc } } }],
    ["Bilişim Tek.", "82.4", "8.3", "45"],
    ["Yönetim Bil.", "78.9", "10.1", "38"],
    ["İstatistik", "86.2", "6.7", "32"],
    ["Matematik", "84.1", "7.5", "28"],
  ];
  s.addTable(grpTbl, {
    x: 0.55, y: 3.95, w: 5.2,
    fontFace: "Calibri", fontSize: 10,
    border: { type: "solid", pt: 0.5, color: C.bdr },
    colW: [1.5, 1.2, 1.2, 1.3],
    rowH: [0.28, 0.26, 0.26, 0.26, 0.26],
    autoPage: false,
  });

  // Sağ alt: GroupBy akışı
  T.addCard(pres, s, 6.1, 3.4, 3.5, 2.0, { topColor: C.amber });
  T.cardTitle(s, 6.3, 3.55, 3.1, "GroupBy Akışı", C.amber);
  const steps = [
    { n: 1, t: "Böl (Split)", c: C.sec },
    { n: 2, t: "Uygula (Apply)", c: C.acc },
    { n: 3, t: "Birleştir (Combine)", c: C.amber },
  ];
  steps.forEach((st, i) => {
    T.numBadge(pres, s, 6.3, 3.98 + i * 0.42, st.n, st.c);
    T.cardBody(s, 6.75, 3.98 + i * 0.42, 2.6, 0.36, st.t, { size: 11 });
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 14 — YENİ SÜTUN VE APPLY/LAMBDA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Yeni Sütun Oluşturma: Apply ve Lambda", "BÖLÜM 3", null, TOTAL);

  // Sol: Basit yeni sütun
  T.addCard(pres, s, 0.4, 1.0, 4.4, 1.8, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.0, "Basit Yeni Sütun", C.sec);
  T.addCodeBlock(pres, s, 0.55, 1.55, 4.1, 1.1, [
    { text: "# Doğrudan hesaplama\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Harf_Notu'] = df['Not'] >= 50\n\n", options: { color: C.codeWhite } },
    { text: "# Matematiksel işlem\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Not_Yuzde'] = df['Not'] / 100 * 40", options: { color: C.codeGreen } },
  ]);

  // Sağ: Apply + Lambda
  T.addCard(pres, s, 5.1, 1.0, 4.6, 1.8, { topColor: C.acc });
  T.cardTitle(s, 5.3, 1.15, 4.2, "Apply + Lambda", C.acc);
  T.addCodeBlock(pres, s, 5.25, 1.55, 4.3, 1.1, [
    { text: "# Lambda ile harf notu\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Durum'] = df['Not'].apply(\n", options: { color: C.codeWhite } },
    { text: "  lambda ", options: { color: C.codeBlue } },
    { text: "x: 'Geçti' ", options: { color: C.codeGreen } },
    { text: "if ", options: { color: C.codeBlue } },
    { text: "x >= 50 ", options: { color: C.codeWhite } },
    { text: "else ", options: { color: C.codeBlue } },
    { text: "'Kaldı'\n)", options: { color: C.codeGreen } },
  ]);

  // Orta: Fonksiyon ile apply
  T.addCard(pres, s, 0.4, 3.0, 9.3, 2.4, { topColor: C.amber });
  T.cardTitle(s, 0.6, 3.15, 8.8, "Fonksiyon ile Apply — Karmaşık Dönüşümler");
  T.addCodeBlock(pres, s, 0.55, 3.55, 4.5, 1.6, [
    { text: "def ", options: { color: C.codeBlue } },
    { text: "harf_notu", options: { color: C.codeGreen } },
    { text: "(not_degeri):\n", options: { color: C.codeWhite } },
    { text: "    if ", options: { color: C.codeBlue } },
    { text: "not_degeri >= 90: ", options: { color: C.codeWhite } },
    { text: "return ", options: { color: C.codeBlue } },
    { text: "'AA'\n", options: { color: C.codeGreen } },
    { text: "    elif ", options: { color: C.codeBlue } },
    { text: "not_degeri >= 80: ", options: { color: C.codeWhite } },
    { text: "return ", options: { color: C.codeBlue } },
    { text: "'BA'\n", options: { color: C.codeGreen } },
    { text: "    elif ", options: { color: C.codeBlue } },
    { text: "not_degeri >= 70: ", options: { color: C.codeWhite } },
    { text: "return ", options: { color: C.codeBlue } },
    { text: "'BB'\n", options: { color: C.codeGreen } },
    { text: "    else", options: { color: C.codeBlue } },
    { text: ": ", options: { color: C.codeWhite } },
    { text: "return ", options: { color: C.codeBlue } },
    { text: "'FF'", options: { color: C.codeGreen } },
  ]);
  T.addCodeBlock(pres, s, 5.2, 3.55, 4.4, 1.6, [
    { text: "# Fonksiyonu uygula\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Harf'] = df['Not'].apply(harf_notu)\n\n", options: { color: C.codeGreen } },
    { text: "# map() ile sözlük eşleme\n", options: { color: C.codeYellow, italic: true } },
    { text: "cinsiyet_map = {'E': 'Erkek', 'K': 'Kadın'}\n", options: { color: C.codeWhite } },
    { text: "df['Cinsiyet'] = df['C'].map(cinsiyet_map)\n\n", options: { color: C.codeGreen } },
    { text: "# applymap() — tüm hücrelere\n", options: { color: C.codeYellow, italic: true } },
    { text: "df[['N1','N2']].applymap(\n  lambda x: round(x, 1)\n)", options: { color: C.codeWhite } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 15 — PIVOT TABLE VE CROSS TAB
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Pivot Table ve Çapraz Tablolar", "BÖLÜM 3", null, TOTAL);

  // Pivot table kodu
  T.addCard(pres, s, 0.4, 1.0, 9.2, 2.0, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 8.8, "pd.pivot_table() — Excel Pivot Benzeri", C.sec);
  T.addCodeBlock(pres, s, 0.55, 1.55, 8.9, 1.3, [
    { text: "# Pivot tablo oluşturma\n", options: { color: C.codeYellow, italic: true } },
    { text: "pivot = pd.pivot_table(\n", options: { color: C.codeWhite } },
    { text: "    df,\n", options: { color: C.codeWhite } },
    { text: "    values='Not',           ", options: { color: C.codeYellow } },
    { text: "# Değer sütunu\n", options: { color: C.codeYellow, italic: true } },
    { text: "    index='Bölüm',          ", options: { color: C.codeYellow } },
    { text: "# Satır grupları\n", options: { color: C.codeYellow, italic: true } },
    { text: "    columns='Cinsiyet',     ", options: { color: C.codeYellow } },
    { text: "# Sütun grupları\n", options: { color: C.codeYellow, italic: true } },
    { text: "    aggfunc='mean',         ", options: { color: C.codeYellow } },
    { text: "# Toplama fonksiyonu\n", options: { color: C.codeYellow, italic: true } },
    { text: "    margins=True            ", options: { color: C.codeYellow } },
    { text: "# Genel toplam satırı\n", options: { color: C.codeYellow, italic: true } },
    { text: ")", options: { color: C.codeWhite } },
  ]);

  // Sonuç tablosu
  T.addCard(pres, s, 0.4, 3.2, 5.0, 2.2, { topColor: C.acc });
  T.cardTitle(s, 0.6, 3.35, 4.6, "Pivot Sonucu", C.acc);
  const pivTbl = [
    [{ text: "Bölüm", options: { bold: true, color: "FFFFFF", fill: { color: C.acc } } },
     { text: "Erkek", options: { bold: true, color: "FFFFFF", fill: { color: C.acc } } },
     { text: "Kadın", options: { bold: true, color: "FFFFFF", fill: { color: C.acc } } },
     { text: "Genel", options: { bold: true, color: "FFFFFF", fill: { color: C.acc } } }],
    ["Bilişim Tek.", "80.2", "84.8", "82.4"],
    ["Yönetim Bil.", "76.5", "81.3", "78.9"],
    ["İstatistik", "85.0", "87.4", "86.2"],
    [{ text: "Genel", options: { bold: true } }, { text: "80.6", options: { bold: true } }, { text: "84.5", options: { bold: true } }, { text: "82.5", options: { bold: true } }],
  ];
  s.addTable(pivTbl, {
    x: 0.55, y: 3.75, w: 4.7,
    fontFace: "Calibri", fontSize: 10,
    border: { type: "solid", pt: 0.5, color: C.bdr },
    colW: [1.4, 1.1, 1.1, 1.1],
    rowH: [0.28, 0.26, 0.26, 0.26, 0.26],
    autoPage: false,
  });

  // Sağ: crosstab
  T.addCard(pres, s, 5.6, 3.2, 4.1, 2.2, { topColor: C.amber });
  T.cardTitle(s, 5.8, 3.35, 3.7, "pd.crosstab()", C.amber);
  T.addCodeBlock(pres, s, 5.75, 3.75, 3.8, 1.4, [
    { text: "# Çapraz tablo\n", options: { color: C.codeYellow, italic: true } },
    { text: "pd.crosstab(\n", options: { color: C.codeWhite } },
    { text: "  df['Bölüm'],\n", options: { color: C.codeYellow } },
    { text: "  df['Cinsiyet'],\n", options: { color: C.codeYellow } },
    { text: "  margins=True,\n", options: { color: C.codeYellow } },
    { text: "  normalize='index'  ", options: { color: C.codeYellow } },
    { text: "# oran\n", options: { color: C.codeYellow, italic: true } },
    { text: ")", options: { color: C.codeWhite } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 16 — STRING VE TARİH İŞLEMLERİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "String ve Tarih İşlemleri", "BÖLÜM 3", null, TOTAL);

  // Sol: String işlemleri
  T.addCard(pres, s, 0.4, 1.0, 4.4, 4.3, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.0, "String (.str) İşlemleri", C.sec);
  T.addCodeBlock(pres, s, 0.55, 1.55, 4.1, 3.5, [
    { text: "# Küçük/büyük harf\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['İsim'].str.lower()\n", options: { color: C.codeWhite } },
    { text: "df['İsim'].str.upper()\n\n", options: { color: C.codeWhite } },
    { text: "# İçerik kontrolü\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['İsim'].str.contains('Ali')\n", options: { color: C.codeGreen } },
    { text: "df['İsim'].str.startswith('A')\n\n", options: { color: C.codeGreen } },
    { text: "# Değiştirme ve bölme\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Tel'].str.replace('-', '')\n", options: { color: C.codeWhite } },
    { text: "df['Ad_Soyad'].str.split(' ')\n\n", options: { color: C.codeWhite } },
    { text: "# Uzunluk ve kırpma\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['İsim'].str.len()\n", options: { color: C.codeWhite } },
    { text: "df['İsim'].str.strip()", options: { color: C.codeWhite } },
  ]);

  // Sağ: Tarih işlemleri
  T.addCard(pres, s, 5.1, 1.0, 4.6, 4.3, { topColor: C.acc });
  T.cardTitle(s, 5.3, 1.15, 4.2, "Tarih (datetime) İşlemleri", C.acc);
  T.addCodeBlock(pres, s, 5.25, 1.55, 4.3, 3.5, [
    { text: "# String → datetime dönüşümü\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Tarih'] = pd.to_datetime(\n  df['Tarih']\n)\n\n", options: { color: C.codeGreen } },
    { text: "# Yıl, ay, gün çıkarma\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Yıl'] = df['Tarih'].dt.year\n", options: { color: C.codeWhite } },
    { text: "df['Ay']  = df['Tarih'].dt.month\n", options: { color: C.codeWhite } },
    { text: "df['Gün'] = df['Tarih'].dt.day_name()\n\n", options: { color: C.codeWhite } },
    { text: "# Tarih farkı hesaplama\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Süre'] = (\n", options: { color: C.codeWhite } },
    { text: "  df['Bitiş'] - df['Başlangıç']\n", options: { color: C.codeGreen } },
    { text: ").dt.days\n\n", options: { color: C.codeWhite } },
    { text: "# Tarih aralığı filtreleme\n", options: { color: C.codeYellow, italic: true } },
    { text: "mask = df['Tarih'] > '2024-01-01'", options: { color: C.codeWhite } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 17 — TİTANİC EDA ÖRNEĞİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Gerçek Veri Seti: Titanic EDA", "BÖLÜM 4", null, TOTAL);

  // Üst: Veri seti bilgisi
  T.addCard(pres, s, 0.4, 1.0, 9.2, 0.7, { leftColor: C.sec });
  T.cardBody(s, 0.6, 1.05, 8.8, 0.55,
    "Titanic veri seti: 891 yolcu, 12 sütun — hayatta kalma (Survived), cinsiyet (Sex), yaş (Age), bilet sınıfı (Pclass), ücret (Fare) gibi değişkenler içerir.",
    { size: 11 }
  );

  // Kod ve analiz
  T.addCodeBlock(pres, s, 0.4, 1.9, 5.5, 3.3, [
    { text: "import ", options: { color: C.codeBlue } },
    { text: "pandas ", options: { color: C.codeGreen } },
    { text: "as ", options: { color: C.codeBlue } },
    { text: "pd\n\n", options: { color: C.codeGreen } },
    { text: "df = pd.read_csv('titanic.csv')\n\n", options: { color: C.codeWhite } },
    { text: "# Genel bakış\n", options: { color: C.codeYellow, italic: true } },
    { text: "print(df.shape)          ", options: { color: C.codeWhite } },
    { text: "# (891, 12)\n", options: { color: C.codeYellow, italic: true } },
    { text: "print(df.isnull().sum()) ", options: { color: C.codeWhite } },
    { text: "# Age:177 eksik\n\n", options: { color: C.codeYellow, italic: true } },
    { text: "# Hayatta kalma oranı\n", options: { color: C.codeYellow, italic: true } },
    { text: "df['Survived'].value_counts(normalize=True)\n", options: { color: C.codeGreen } },
    { text: "# 0: %61.6  |  1: %38.4\n\n", options: { color: C.codeYellow, italic: true } },
    { text: "# Cinsiyete göre hayatta kalma\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.groupby('Sex')['Survived'].mean()\n", options: { color: C.codeGreen } },
    { text: "# female: 0.74  |  male: 0.19\n\n", options: { color: C.codeYellow, italic: true } },
    { text: "# Sınıfa göre hayatta kalma\n", options: { color: C.codeYellow, italic: true } },
    { text: "df.groupby('Pclass')['Survived'].mean()\n", options: { color: C.codeGreen } },
    { text: "# 1: 0.63  |  2: 0.47  |  3: 0.24", options: { color: C.codeYellow, italic: true } },
  ]);

  // Sağ: İçgörüler
  const insights = [
    { val: "%38", label: "Genel Hayatta\nKalma Oranı", color: C.sec },
    { val: "%74", label: "Kadınların\nHayatta Kalması", color: C.green },
    { val: "%63", label: "1. Sınıf\nHayatta Kalma", color: C.acc },
    { val: "177", label: "Eksik Yaş\nDeğeri", color: C.amber },
  ];
  insights.forEach((ins, i) => {
    const y = 1.9 + i * 0.82;
    T.statBox(pres, s, 6.2, y, 3.4, 0.72, ins.val, ins.label, ins.color);
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 18 — TIPS ANALİZİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Gerçek Veri Seti: Tips (Bahşiş) Analizi", "BÖLÜM 4", null, TOTAL);

  // Kod
  T.addCodeBlock(pres, s, 0.4, 1.0, 5.5, 3.0, [
    { text: "import ", options: { color: C.codeBlue } },
    { text: "seaborn ", options: { color: C.codeGreen } },
    { text: "as ", options: { color: C.codeBlue } },
    { text: "sns\n\n", options: { color: C.codeGreen } },
    { text: "tips = sns.load_dataset('tips')\n\n", options: { color: C.codeWhite } },
    { text: "# Bahşiş oranı hesapla\n", options: { color: C.codeYellow, italic: true } },
    { text: "tips['tip_pct'] = (\n  tips['tip'] / tips['total_bill'] * 100\n)\n\n", options: { color: C.codeGreen } },
    { text: "# Güne göre bahşiş ortalaması\n", options: { color: C.codeYellow, italic: true } },
    { text: "tips.groupby('day')['tip_pct'].mean()\n\n", options: { color: C.codeGreen } },
    { text: "# Cinsiyet + sigara durumuna göre\n", options: { color: C.codeYellow, italic: true } },
    { text: "pd.pivot_table(\n  tips, values='tip_pct',\n  index='sex', columns='smoker',\n  aggfunc='mean'\n)", options: { color: C.codeWhite } },
  ]);

  // Sağ: Sonuç tablosu
  T.addCard(pres, s, 6.1, 1.0, 3.6, 2.0, { topColor: C.acc });
  T.cardTitle(s, 6.3, 1.15, 3.2, "Güne Göre Bahşiş %", C.acc);
  const tipsTbl = [
    [{ text: "Gün", options: { bold: true, color: "FFFFFF", fill: { color: C.acc } } },
     { text: "Ort. Bahşiş %", options: { bold: true, color: "FFFFFF", fill: { color: C.acc } } }],
    ["Perşembe (Thur)", "%16.1"],
    ["Cuma (Fri)", "%16.9"],
    ["Cumartesi (Sat)", "%15.3"],
    ["Pazar (Sun)", "%16.7"],
  ];
  s.addTable(tipsTbl, {
    x: 6.2, y: 1.55, w: 3.4,
    fontFace: "Calibri", fontSize: 10,
    border: { type: "solid", pt: 0.5, color: C.bdr },
    colW: [1.8, 1.6],
    rowH: [0.28, 0.26, 0.26, 0.26, 0.26],
    autoPage: false,
  });

  // Sağ alt: EDA çıkarımları
  T.addCard(pres, s, 6.1, 3.2, 3.6, 2.1, { topColor: C.sec });
  T.cardTitle(s, 6.3, 3.35, 3.2, "Öne Çıkan Bulgular", C.sec);
  const findings = [
    "Cuma günü bahşiş oranı en yüksek",
    "Sigara içenler daha az bahşiş veriyor",
    "Erkekler daha yüksek hesap ödüyor",
    "Akşam yemeklerinde bahşiş oranı düşük",
  ];
  findings.forEach((f, i) => {
    T.numBadge(pres, s, 6.3, 3.75 + i * 0.35, i + 1, C.sec);
    T.cardBody(s, 6.75, 3.75 + i * 0.35, 2.8, 0.3, f, { size: 9.5 });
  });

  // Alt: ipucu
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.3, w: 5.5, h: 1.0, fill: { color: C.accPale }, line: { color: C.acc, width: 1 } });
  s.addText([
    { text: "EDA Adımları: ", options: { bold: true, color: C.acc } },
    { text: "1) shape & info → 2) describe → 3) isnull → 4) value_counts → 5) groupby → 6) yeni sütun → 7) pivot_table → 8) görselleştirme" }
  ], { x: 0.55, y: 4.35, w: 5.2, h: 0.85, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.dark });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 19 — EDA KONTROL LİSTESİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "EDA Kontrol Listesi", "BÖLÜM 4", null, TOTAL);

  const checklist = [
    { step: "Veriyi Yükle", cmd: "pd.read_csv() / pd.read_excel()", color: C.sec },
    { step: "Boyut Kontrol", cmd: "df.shape, df.columns, df.dtypes", color: C.sec },
    { step: "İlk Bakış", cmd: "df.head(), df.tail(), df.sample(5)", color: C.acc },
    { step: "İstatistik Özet", cmd: "df.describe(), df.info()", color: C.acc },
    { step: "Eksik Veri", cmd: "df.isnull().sum(), df.isnull().mean()*100", color: C.amber },
    { step: "Tekrarlar", cmd: "df.duplicated().sum(), df.drop_duplicates()", color: C.amber },
    { step: "Kategorik Analiz", cmd: "df['col'].value_counts(), df.nunique()", color: C.green },
    { step: "Gruplama", cmd: "df.groupby('col')['val'].agg([...])", color: C.green },
    { step: "Yeni Sütunlar", cmd: "df['new'] = ..., df['col'].apply(func)", color: C.blue },
    { step: "Görselleştirme", cmd: "Histogramlar, boxplot, scatter, heatmap", color: C.purple },
  ];

  checklist.forEach((item, i) => {
    const y = 1.0 + i * 0.44;
    const rowBg = i % 2 === 0 ? C.cream : C.warmBg;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.4, fill: { color: rowBg } });
    T.numBadge(pres, s, 0.5, y + 0.02, i + 1, item.color);
    s.addText(item.step, { x: 1.0, y, w: 2.5, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark, valign: "middle" });
    s.addText(item.cmd, { x: 3.6, y, w: 5.8, h: 0.4, margin: 0, fontFace: "Consolas", fontSize: 9.5, color: C.mid, valign: "middle" });
  });

  // Alt ipucu
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 5.05, w: 9.2, h: 0.4, fill: { color: C.accPale }, line: { color: C.acc, width: 1 } });
  s.addText([
    { text: "Pro İpucu: ", options: { bold: true, color: C.acc } },
    { text: "Bu listeyi her yeni veri setine uygulamak, analiz kalitesini ve tutarlılığını önemli ölçüde artırır." }
  ], { x: 0.55, y: 5.05, w: 8.9, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark, valign: "middle" });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 20 — SIK YAPILAN HATALAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Sık Yapılan Hatalar ve Çözümleri", "BÖLÜM 4", null, TOTAL);

  const mistakes = [
    {
      err: "df['Not'] > 80 & df['Yaş'] < 25",
      fix: "(df['Not'] > 80) & (df['Yaş'] < 25)",
      why: "Parantez unutulması — & operatörünün önceliği > dan yüksek",
      color: C.red,
    },
    {
      err: "df.dropna(inplace=True)  # sessiz kayıp",
      fix: "df = df.dropna()  # açık atama",
      why: "inplace=True yerine açık atama tercih edin, iz sürülebilirlik artar",
      color: C.amber,
    },
    {
      err: "df[df['Yaş'] == NaN]",
      fix: "df[df['Yaş'].isna()]",
      why: "NaN == NaN her zaman False döner, isna() kullanın",
      color: C.sec,
    },
    {
      err: "df.groupby('A').mean()  # SettingWithCopy",
      fix: "df.loc[mask, 'col'] = value  # .loc[] kullanın",
      why: "Zincirleme indexleme (chained indexing) kopya üzerinde değişiklik yapar",
      color: C.purple,
    },
  ];

  mistakes.forEach((m, i) => {
    const y = 1.0 + i * 1.1;
    T.addCard(pres, s, 0.4, y, 9.2, 1.0, { leftColor: m.color });
    // Hata
    s.addText([
      { text: "HATA:  ", options: { bold: true, color: C.red, fontSize: 9 } },
      { text: m.err, options: { fontFace: "Consolas", fontSize: 9, color: C.red } },
    ], { x: 0.6, y: y + 0.05, w: 8.8, h: 0.28, margin: 0, fontFace: "Consolas" });
    // Düzeltme
    s.addText([
      { text: "DOĞRU: ", options: { bold: true, color: C.green, fontSize: 9 } },
      { text: m.fix, options: { fontFace: "Consolas", fontSize: 9, color: C.green } },
    ], { x: 0.6, y: y + 0.34, w: 8.8, h: 0.28, margin: 0, fontFace: "Consolas" });
    // Açıklama
    s.addText(m.why, { x: 0.6, y: y + 0.65, w: 8.8, h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, italic: true });
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 21 — HAFTALIK ÖDEV
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Haftalık Ödev", "BÖLÜM 4", null, TOTAL);

  // Ödev tanımı
  T.addCard(pres, s, 0.4, 1.0, 9.2, 1.2, { topColor: C.pri });
  T.cardTitle(s, 0.6, 1.15, 8.8, "Ödev: Titanic Veri Seti ile EDA Raporu");
  T.cardBody(s, 0.6, 1.55, 8.8, 0.5,
    "Titanic veri setini (CSV) kullanarak kapsamlı bir Keşifsel Veri Analizi raporu hazırlayın. Jupyter Notebook formatında teslim edin.",
    { size: 11 }
  );

  // Adımlar
  const tasks = [
    { title: "Veri Yükleme ve İlk Bakış", desc: "CSV oku, shape, info, describe, head — ilk 5 gözlemi incele", color: C.sec },
    { title: "Eksik Veri Analizi", desc: "Her sütundaki eksik veri oranını hesapla, uygun strateji ile doldur/sil", color: C.acc },
    { title: "Keşifsel Analiz", desc: "Kategorik: value_counts() | Sayısal: describe() | Korelasyon matrisi", color: C.amber },
    { title: "GroupBy Analiz", desc: "Cinsiyet, sınıf ve binme limanına göre hayatta kalma analizi", color: C.green },
    { title: "Feature Engineering", desc: "En az 2 yeni sütun oluştur (yaş grubu, aile büyüklüğü vb.)", color: C.blue },
    { title: "Sonuç ve Yorum", desc: "Minimum 5 veri odaklı içgörü yazın, her birini kodla destekleyin", color: C.purple },
  ];

  tasks.forEach((t, i) => {
    const y = 2.4 + i * 0.52;
    T.numBadge(pres, s, 0.5, y + 0.08, i + 1, t.color);
    s.addText(t.title, { x: 1.0, y, w: 2.8, h: 0.48, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark, valign: "middle" });
    s.addText(t.desc, { x: 3.9, y, w: 5.6, h: 0.48, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, valign: "middle" });
  });

  // Teslim bilgisi
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 5.05, w: 9.2, h: 0.45, fill: { color: "FFF3E8" }, line: { color: C.sec, width: 1 } });
  s.addText([
    { text: "Teslim: ", options: { bold: true, color: C.sec } },
    { text: "Hafta 3 dersine kadar  ·  Format: Jupyter Notebook (.ipynb)  ·  Bonus: Matplotlib/Seaborn ile en az 3 görselleştirme ekleyin" }
  ], { x: 0.55, y: 5.05, w: 8.9, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark, valign: "middle" });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 22 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Özet ve Çıkarımlar",
  [
    { text: "NumPy, Python'da sayısal hesaplamanın temelidir — vektörize işlemlerle performans kazanın", color: C.sec },
    { text: "Pandas, yapılandırılmış verilerle çalışmanın en güçlü aracıdır — Series ve DataFrame'i iyi öğrenin", color: C.acc },
    { text: "EDA, her veri projesinin ilk ve en kritik adımıdır — sistematik yaklaşın, kontrol listesini takip edin", color: C.amber },
    { text: "Eksik veri ve veri tipleri göz ardı edilmemeli — isnull(), dtypes ve describe() ile başlayın", color: C.green },
    { text: "GroupBy ve Apply, veriyi anlamlı özetlere dönüştürür — pivot table ile görselleştirmeye hazırlayın", color: C.blue },
  ],
  "Veri bilimi, merak ve kodun buluştuğu noktada başlar.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// KAYDET
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta02_numpy_pandas_eda.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("PPTX oluşturuldu:", outPath);
}).catch(err => {
  console.error("Hata:", err);
});
