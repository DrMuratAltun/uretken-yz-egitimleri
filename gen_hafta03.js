/**
 * Hafta 3: Veri Görselleştirme ve Hikayeleştirme
 * 20 slaytlık PPTX sunum — pptxgenjs + şablon
 */
const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;
const TOTAL = 20;
const OUT = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta03_veri_gorsellestirme.pptx";

const pres = T.createPres("Hafta 3 — Veri Görselleştirme ve Hikayeleştirme", "Dr. Murat Altun");

// ═══════════════════════════════════════════════════════════
// SLAYT 1 — KAPAK
// ═══════════════════════════════════════════════════════════
T.addCoverSlide(pres,
  "Veri Görselleştirme\nve Hikayeleştirme",
  "Hafta 3 · Modül 3 — Veriden Anlam Çıkarmak",
  "Dr. Murat Altun",
  [
    { value: "6", label: "Saat" },
    { value: "4", label: "Notebook" },
    { value: "5+", label: "Grafik Türü" },
  ]
);

// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "İçindekiler", "GENEL BAKIŞ", C.cream, TOTAL);

  const sections = [
    { num: "1", title: "Matplotlib Temelleri", desc: "Line, bar, histogram, scatter, pie chart; grafik özelleştirme", color: C.sec, items: "Slayt 3–8" },
    { num: "2", title: "Seaborn ile İleri Görselleştirme", desc: "countplot, boxplot, violinplot, heatmap, pairplot", color: C.acc, items: "Slayt 9–13" },
    { num: "3", title: "Bar Chart Race & Google Trends", desc: "Animasyonlu grafikler, pytrends ile veri çekme", color: C.amber, items: "Slayt 14–15" },
    { num: "4", title: "Oto-EDA Araçları", desc: "Sweetviz, YData-Profiling ile otomatik keşifsel analiz", color: C.purple, items: "Slayt 16–17" },
  ];

  sections.forEach((sec, i) => {
    const yy = 1.1 + i * 1.05;
    T.addCard(pres, s, 0.5, yy, 9.0, 0.9, { leftColor: sec.color });
    T.numBadge(pres, s, 0.7, yy + 0.27, sec.num, sec.color);
    s.addText(sec.title, { x: 1.2, y: yy + 0.08, w: 4, h: 0.38, fontFace: "Georgia", fontSize: 14, bold: true, color: C.pri });
    s.addText(sec.desc, { x: 1.2, y: yy + 0.46, w: 5.5, h: 0.35, fontFace: "Calibri", fontSize: 10, color: C.mid });
    s.addText(sec.items, { x: 7.5, y: yy + 0.25, w: 1.8, h: 0.4, fontFace: "Calibri", fontSize: 10, bold: true, color: sec.color, align: "center" });
  });
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 3 — NEDEN GÖRSELLEŞTİRME?
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Neden Görselleştirme?", "BÖLÜM 1", C.cream, TOTAL);

  // Ana açıklama kartı
  T.addCard(pres, s, 0.5, 1.05, 5.5, 2.4, { topColor: C.sec });
  T.cardTitle(s, 0.7, 1.2, 5, "Anscombe Dörtlüsü (1973)");
  T.cardBody(s, 0.7, 1.6, 5.1, 1.7,
    "Dört farklı veri seti aynı ortalama, varyans ve korelasyona sahiptir — ancak grafikleri birbirinden tamamen farklıdır.\n\n" +
    "Bu örnek, sadece istatistiksel özetlerin yeterli olmadığını ve görselleştirmenin neden kritik olduğunu kanıtlar."
  );

  // Sağ taraf: 3 stat box
  T.statBox(pres, s, 6.3, 1.05, 1.35, 1.15, "7.5", "Ortalama X", C.acc);
  T.statBox(pres, s, 7.85, 1.05, 1.35, 1.15, "0.82", "Korelasyon", C.sec);
  T.statBox(pres, s, 6.3, 2.35, 2.9, 1.1, "4", "Farklı Dağılım", C.amber);

  // Alt bilgi kartı
  T.addCard(pres, s, 0.5, 3.7, 9.0, 1.4, { leftColor: C.acc });
  T.cardTitle(s, 0.7, 3.8, 8.5, "Veri Görselleştirmenin Temel İlkeleri");
  const principles = [
    "• Doğru grafik türü seçimi: Karşılaştırma → Bar, Dağılım → Histogram, İlişki → Scatter",
    "• Renk, etiket ve başlık ile hikaye anlatımı (data storytelling)",
    "• Hedef kitleye uygun sadelik düzeyi — teknik vs yönetici raporu",
  ];
  T.cardBody(s, 0.7, 4.2, 8.5, 0.8, principles.join("\n"), { size: 10 });
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 4 — MATPLOTLIB TEMELLERİ
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Matplotlib Temelleri", "BÖLÜM 1", C.cream, TOTAL);

  // Sol: açıklama
  T.addCard(pres, s, 0.5, 1.05, 4.2, 4.0, { topColor: C.pri });
  T.cardTitle(s, 0.7, 1.2, 3.8, "matplotlib.pyplot Modülü");
  T.cardBody(s, 0.7, 1.6, 3.8, 3.2,
    "Python'un en yaygın görselleştirme kütüphanesidir. MATLAB benzeri bir arayüz sunar.\n\n" +
    "Temel bileşenler:\n" +
    "• Figure — tüm grafiğin taşıyıcısı\n" +
    "• Axes — tek bir grafik alanı\n" +
    "• Artist — çizgi, metin, etiket vb.\n\n" +
    "plt.show() ile grafiği ekrana basarsınız.\n" +
    "plt.savefig() ile dosyaya kaydedersiniz."
  );

  // Sağ: kod bloğu
  T.addCodeBlock(pres, s, 5.0, 1.05, 4.5, 4.0, [
    { text: "import matplotlib.pyplot as plt", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "# Basit çizgi grafiği", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "x = [1, 2, 3, 4, 5]", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "y = [10, 25, 18, 32, 28]", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "plt.plot(x, y, color='teal',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "         marker='o', linewidth=2)", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "plt.xlabel('Gün')", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "plt.ylabel('Satış')", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "plt.title('Günlük Satış Trendi')", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "plt.grid(True, alpha=0.3)", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "plt.show()", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
  ]);
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 5 — BAR VE HİSTOGRAM
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Bar Grafiği ve Histogram", "BÖLÜM 1", C.cream, TOTAL);

  // Sol kart: Bar
  T.addCard(pres, s, 0.5, 1.05, 4.3, 2.0, { topColor: C.acc });
  T.cardTitle(s, 0.7, 1.2, 3.8, "plt.bar() — Kategorik Karşılaştırma");
  T.cardBody(s, 0.7, 1.6, 3.8, 1.3,
    "Kategorik değişkenlerin büyüklük karşılaştırması için kullanılır.\n\n" +
    "Parametreler: x (kategoriler), height (değerler), color, edgecolor, width, label"
  );

  // Sağ kart: Histogram
  T.addCard(pres, s, 5.2, 1.05, 4.3, 2.0, { topColor: C.sec });
  T.cardTitle(s, 5.4, 1.2, 3.8, "plt.hist() — Sürekli Dağılım");
  T.cardBody(s, 5.4, 1.6, 3.8, 1.3,
    "Sürekli bir değişkenin frekans dağılımını gösterir.\n\n" +
    "Parametreler: x (veri), bins (çubuk sayısı), alpha (şeffaflık), edgecolor, density"
  );

  // Alt: kod bloğu (ikisi yan yana)
  T.addCodeBlock(pres, s, 0.5, 3.3, 4.3, 1.9, [
    { text: "# Bar Grafiği", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "sehirler = ['İstanbul','Ankara','İzmir']", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "nufus = [16, 5.7, 4.4]", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "plt.bar(sehirler, nufus,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "        color=['#2B7A78','#C97B5A',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "               '#E8913A'])", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
  ]);

  T.addCodeBlock(pres, s, 5.2, 3.3, 4.3, 1.9, [
    { text: "# Histogram", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "import numpy as np", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "veri = np.random.normal(170, 10, 500)", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "plt.hist(veri, bins=25,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "         color='teal', alpha=0.7,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "         edgecolor='white')", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
  ]);
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 6 — SCATTER VE PIE CHART
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Scatter Plot ve Pie Chart", "BÖLÜM 1", C.cream, TOTAL);

  // Sol: Scatter
  T.addCard(pres, s, 0.5, 1.05, 4.3, 2.2, { topColor: C.blue });
  T.cardTitle(s, 0.7, 1.2, 3.8, "plt.scatter() — İlişki Analizi");
  T.cardBody(s, 0.7, 1.6, 3.8, 1.5,
    "İki sürekli değişken arasındaki ilişkiyi gösterir. Noktaların dağılımı korelasyonu ortaya koyar.\n\n" +
    "• Pozitif korelasyon: noktalar sağ üste doğru\n" +
    "• Negatif korelasyon: noktalar sağ alta doğru\n" +
    "• s parametresi: nokta büyüklüğü (3. değişken)"
  );

  // Sağ: Pie
  T.addCard(pres, s, 5.2, 1.05, 4.3, 2.2, { topColor: C.pink });
  T.cardTitle(s, 5.4, 1.2, 3.8, "plt.pie() — Oran Gösterimi");
  T.cardBody(s, 5.4, 1.6, 3.8, 1.5,
    "Bütünün parçalarını yüzdelik dilimler halinde gösterir. 5'ten fazla kategori varsa okunabilirlik düşer.\n\n" +
    "• explode: dilimi dışarı çıkar\n" +
    "• autopct: yüzde göster ('%1.1f%%')\n" +
    "• startangle: başlangıç açısı"
  );

  // Alt kod
  T.addCodeBlock(pres, s, 0.5, 3.5, 4.3, 1.7, [
    { text: "# Scatter Plot", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "plt.scatter(df['Gelir'], df['Harcama'],", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "           c=df['Yaş'], cmap='viridis',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "           s=50, alpha=0.6)", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "plt.colorbar(label='Yaş')", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
  ]);

  T.addCodeBlock(pres, s, 5.2, 3.5, 4.3, 1.7, [
    { text: "# Pie Chart", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "labels = ['Python','R','SQL','Julia']", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "sizes  = [55, 20, 18, 7]", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "plt.pie(sizes, labels=labels,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "        autopct='%1.1f%%',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "        startangle=90)", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
  ]);
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 7 — plt.subplots()
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Çoklu Grafik: plt.subplots()", "BÖLÜM 1", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.0, 4.1, { topColor: C.acc });
  T.cardTitle(s, 0.7, 1.2, 3.5, "Figure ve Axes Yönetimi");
  T.cardBody(s, 0.7, 1.6, 3.5, 3.3,
    "Tek bir figure içinde birden fazla grafik oluşturmak için subplots kullanılır.\n\n" +
    "Avantajları:\n" +
    "• Farklı perspektifleri yan yana karşılaştırma\n" +
    "• Raporlarda alan tasarrufu\n" +
    "• Tutarlı eksen ve ölçek kontrolü\n\n" +
    "Önemli parametreler:\n" +
    "• nrows, ncols — satır ve sütun sayısı\n" +
    "• figsize — (genişlik, yükseklik) tuple\n" +
    "• sharex, sharey — ortak eksen paylaşımı\n" +
    "• tight_layout() — otomatik boşluk ayarı"
  );

  T.addCodeBlock(pres, s, 4.8, 1.05, 4.7, 4.1, [
    { text: "# 2x2 çoklu grafik ızgarası", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "fig, axes = plt.subplots(2, 2,", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "                         figsize=(12, 8))", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "# Sol üst: Çizgi grafiği", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "axes[0,0].plot(x, y, 'b-o')", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "axes[0,0].set_title('Trend')", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "# Sağ üst: Bar grafiği", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "axes[0,1].bar(kategoriler, degerler)", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "# Sol alt: Histogram", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "axes[1,0].hist(veri, bins=20)", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "# Sağ alt: Scatter", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "axes[1,1].scatter(x, y, c='teal')", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "plt.tight_layout()", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "plt.savefig('coklu_grafik.png', dpi=150)", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
  ]);
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 8 — GRAFİK ÖZELLEŞTİRME (tablo)
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Grafik Özelleştirme Parametreleri", "BÖLÜM 1", C.cream, TOTAL);

  const rows = [
    ["Parametre", "Açıklama", "Örnek"],
    ["color / c", "Grafik rengi (isim, hex, RGB)", "color='teal', c='#2B7A78'"],
    ["linewidth / lw", "Çizgi kalınlığı", "lw=2.5"],
    ["marker", "Veri noktası işareti", "marker='o', 's', '^', 'D'"],
    ["alpha", "Şeffaflık (0–1)", "alpha=0.7"],
    ["fontsize", "Yazı boyutu (başlık, etiket)", "fontsize=14"],
    ["grid", "Izgara çizgileri", "plt.grid(True, alpha=0.3)"],
    ["legend", "Açıklama kutusu", "plt.legend(loc='upper left')"],
    ["annotate", "Grafik üzerinde metin", "plt.annotate('Max', xy=(3,32))"],
    ["style", "Hazır stil şablonu", "plt.style.use('seaborn-v0_8')"],
  ];

  const colW = [2.0, 3.5, 3.5];
  const startX = 0.5;
  const startY = 1.1;
  const rowH = 0.42;

  rows.forEach((row, ri) => {
    let cx = startX;
    const yy = startY + ri * rowH;
    const isHeader = ri === 0;
    const bgColor = isHeader ? C.pri : (ri % 2 === 0 ? C.warmBg : C.card);

    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: yy, w: colW[ci], h: rowH, fill: { color: bgColor }, line: { color: C.bdr, width: 0.5 } });
      s.addText(cell, {
        x: cx + 0.1, y: yy, w: colW[ci] - 0.2, h: rowH,
        fontFace: isHeader ? "Georgia" : (ci === 0 ? "Consolas" : "Calibri"),
        fontSize: isHeader ? 10 : 9,
        bold: isHeader,
        color: isHeader ? "FFFFFF" : C.dark,
        valign: "middle"
      });
      cx += colW[ci];
    });
  });

  // Alt not
  T.addCard(pres, s, 0.5, 5.0, 9.0, 0.45, { leftColor: C.acc });
  T.cardBody(s, 0.7, 5.05, 8.5, 0.35, "İpucu: plt.style.available ile tüm hazır stilleri listeleyebilirsiniz.", { size: 9, color: C.mid });
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 9 — SEABORN TANITIMI
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Seaborn Tanıtımı", "BÖLÜM 2", C.cream, TOTAL);

  // Karşılaştırma: 2 büyük kart
  T.addCard(pres, s, 0.5, 1.05, 4.3, 3.0, { topColor: C.sec });
  T.cardTitle(s, 0.7, 1.2, 3.8, "Matplotlib");
  T.cardBody(s, 0.7, 1.6, 3.8, 2.2,
    "• Düşük seviyeli kontrol\n" +
    "• Her detayı elle ayarlama\n" +
    "• Daha fazla kod satırı\n" +
    "• Esnek ama karmaşık\n" +
    "• Varsayılan stiller sade\n" +
    "• Pandas entegrasyonu sınırlı"
  );

  T.addCard(pres, s, 5.2, 1.05, 4.3, 3.0, { topColor: C.acc });
  T.cardTitle(s, 5.4, 1.2, 3.8, "Seaborn");
  T.cardBody(s, 5.4, 1.6, 3.8, 2.2,
    "• Yüksek seviyeli API\n" +
    "• Güzel varsayılan stiller\n" +
    "• Daha az kod, daha çok iş\n" +
    "• İstatistiksel grafikler hazır\n" +
    "• Pandas DataFrame ile doğal uyum\n" +
    "• Matplotlib üzerine kurulu"
  );

  // Alt: kurulum ve import
  T.addCodeBlock(pres, s, 0.5, 4.3, 9.0, 0.9, [
    { text: "pip install seaborn                       # Kurulum", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "import seaborn as sns                     # Import", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "sns.set_theme(style='whitegrid')          # Tema ayarla", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
  ]);
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 10 — sns.countplot() ve barplot()
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "sns.countplot() ve barplot()", "BÖLÜM 2", C.cream, TOTAL);

  // Üst açıklama
  T.addCard(pres, s, 0.5, 1.05, 9.0, 1.3, { topColor: C.acc });
  T.cardTitle(s, 0.7, 1.2, 8.5, "Kategorik Veri Görselleştirme");
  T.cardBody(s, 0.7, 1.6, 8.5, 0.6,
    "countplot(): Kategori frekanslarını otomatik sayar ve gösterir. barplot(): Sayısal bir değişkenin kategoriye göre ortalamasını (veya başka istatistiğini) gösterir."
  );

  // Sol kod: countplot
  T.addCodeBlock(pres, s, 0.5, 2.6, 4.3, 2.6, [
    { text: "# Frekans grafiği", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "sns.countplot(", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "    data=df,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    x='Departman',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    hue='Cinsiyet',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    palette='Set2'", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: ")", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "plt.xticks(rotation=45)", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
  ]);

  // Sağ kod: barplot
  T.addCodeBlock(pres, s, 5.2, 2.6, 4.3, 2.6, [
    { text: "# Ortalama maaş (departmana göre)", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "sns.barplot(", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "    data=df,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    x='Departman',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    y='Maas',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    estimator='mean',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    ci=95,  # güven aralığı", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    palette='coolwarm'", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: ")", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
  ]);
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 11 — sns.boxplot() ve violinplot()
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Boxplot ve Violinplot", "BÖLÜM 2", C.cream, TOTAL);

  // Sol: boxplot açıklama
  T.addCard(pres, s, 0.5, 1.05, 4.3, 2.3, { topColor: C.sec });
  T.cardTitle(s, 0.7, 1.2, 3.8, "sns.boxplot() — Aykırı Değer Tespiti");
  T.cardBody(s, 0.7, 1.6, 3.8, 1.6,
    "5 sayı özeti gösterir:\n" +
    "• Minimum (Q1 - 1.5xIQR)\n" +
    "• Q1 (1. çeyreklik — %25)\n" +
    "• Medyan (Q2 — %50)\n" +
    "• Q3 (3. çeyreklik — %75)\n" +
    "• Maksimum (Q3 + 1.5xIQR)\n" +
    "• Dışındaki noktalar → Aykırı değer (outlier)"
  );

  // Sağ: violinplot
  T.addCard(pres, s, 5.2, 1.05, 4.3, 2.3, { topColor: C.purple });
  T.cardTitle(s, 5.4, 1.2, 3.8, "sns.violinplot() — Dağılım Şekli");
  T.cardBody(s, 5.4, 1.6, 3.8, 1.6,
    "Boxplot + KDE (yoğunluk tahmini) birleşimi.\n\n" +
    "Avantajları:\n" +
    "• Dağılımın bimodal olup olmadığını gösterir\n" +
    "• Veri yoğunluğunu genişlikle ifade eder\n" +
    "• inner='box' ile boxplot'u da içerir\n" +
    "• split=True ile iki grubu karşılaştırır"
  );

  // Alt kod
  T.addCodeBlock(pres, s, 0.5, 3.6, 4.3, 1.6, [
    { text: "sns.boxplot(data=df, x='Kategori',", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "           y='Fiyat',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "           hue='Bölge',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "           palette='pastel',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "           flierprops={'marker':'D'})", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
  ]);

  T.addCodeBlock(pres, s, 5.2, 3.6, 4.3, 1.6, [
    { text: "sns.violinplot(data=df,", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "              x='Kategori',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "              y='Fiyat',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "              inner='box',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "              palette='muted')", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
  ]);
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 12 — sns.heatmap()
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Korelasyon Isı Haritası: sns.heatmap()", "BÖLÜM 2", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 5.0, 4.1, { topColor: C.red });
  T.cardTitle(s, 0.7, 1.2, 4.5, "Korelasyon Matrisi Nedir?");
  T.cardBody(s, 0.7, 1.6, 4.5, 3.3,
    "Her değişken çiftinin doğrusal ilişki gücünü -1 ile +1 arasında ölçer.\n\n" +
    "Yorumlama:\n" +
    "• +1.0 → Mükemmel pozitif ilişki\n" +
    "• +0.7 ~ +1.0 → Güçlü pozitif\n" +
    "• +0.3 ~ +0.7 → Orta pozitif\n" +
    "• -0.3 ~ +0.3 → Zayıf / yok\n" +
    "• -0.7 ~ -1.0 → Güçlü negatif\n\n" +
    "Renk haritaları (cmap):\n" +
    "• 'coolwarm' — mavi-kırmızı (en yaygın)\n" +
    "• 'RdYlGn' — kırmızı-yeşil\n" +
    "• 'viridis' — evrensel erişilebilir"
  );

  T.addCodeBlock(pres, s, 5.8, 1.05, 3.7, 4.1, [
    { text: "# Korelasyon ısı haritası", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "corr = df.select_dtypes('number')", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "           .corr()", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "plt.figure(figsize=(10, 8))", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "sns.heatmap(", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "    corr,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    annot=True,       # değerleri yaz", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    fmt='.2f',        # 2 ondalık", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    cmap='coolwarm',  # renk haritası", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    center=0,         # sıfır merkez", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    linewidths=0.5,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    square=True", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: ")", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "plt.title('Değişkenler Arası Korelasyon')", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
  ]);
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 13 — sns.pairplot()
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Çok Değişkenli Analiz: sns.pairplot()", "BÖLÜM 2", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 5.0, 2.6, { topColor: C.acc });
  T.cardTitle(s, 0.7, 1.2, 4.5, "Pairplot Nedir?");
  T.cardBody(s, 0.7, 1.6, 4.5, 1.8,
    "Tüm sayısal değişken çiftlerini tek seferde görselleştirir.\n\n" +
    "• Köşegen: Her değişkenin kendi dağılımı (histogram veya KDE)\n" +
    "• Üst/Alt üçgen: İkili scatter plotlar\n" +
    "• hue parametresi ile gruplara renk atanır\n" +
    "• Büyük veri setlerinde yavaş olabilir — sütun seçimi yapın"
  );

  T.addCodeBlock(pres, s, 5.8, 1.05, 3.7, 2.6, [
    { text: "# Iris veri seti ile pairplot", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "iris = sns.load_dataset('iris')", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "sns.pairplot(", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "    iris,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    hue='species',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    diag_kind='kde',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    palette='husl',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    plot_kws={'alpha': 0.6}", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: ")", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
  ]);

  // Alt: ipuçları kartları
  T.addCard(pres, s, 0.5, 3.9, 4.3, 1.3, { leftColor: C.amber });
  T.cardTitle(s, 0.7, 4.0, 3.8, "Performans İpucu");
  T.cardBody(s, 0.7, 4.35, 3.8, 0.7, "Çok sütunlu veri setlerinde vars=[...] ile sadece ilgilendiğiniz sütunları seçin. corner=True ile sadece alt üçgeni çizin.", { size: 10 });

  T.addCard(pres, s, 5.2, 3.9, 4.3, 1.3, { leftColor: C.green });
  T.cardTitle(s, 5.4, 4.0, 3.8, "Alternatif: sns.jointplot()");
  T.cardBody(s, 5.4, 4.35, 3.8, 0.7, "İki değişken arasındaki ilişkiyi scatter + kenar histogramları ile gösterir. kind='hex', 'kde', 'reg' seçenekleri.", { size: 10 });
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 14 — BAR CHART RACE
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Bar Chart Race — Animasyonlu Grafikler", "BÖLÜM 3", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.5, 2.0, { topColor: C.amber });
  T.cardTitle(s, 0.7, 1.2, 4.0, "bar_chart_race Kütüphanesi");
  T.cardBody(s, 0.7, 1.6, 4.0, 1.3,
    "Zaman serisi verilerini animasyonlu yarışan çubuk grafiğine dönüştürür.\n\n" +
    "• MP4, GIF veya HTML çıktısı\n" +
    "• Pandas DataFrame doğrudan kullanılır\n" +
    "• COVID-19, nüfus, GSYİH gibi veriler için ideal"
  );

  T.addCard(pres, s, 5.3, 1.05, 4.2, 2.0, { topColor: C.red });
  T.cardTitle(s, 5.5, 1.2, 3.7, "Kullanım Alanları");
  T.cardBody(s, 5.5, 1.6, 3.7, 1.3,
    "• COVID-19 vaka sayıları (ülke bazlı)\n" +
    "• Ülkelerin GSYİH değişimi (1960–2024)\n" +
    "• YouTube en çok izlenen kanallar\n" +
    "• Programlama dilleri popülaritesi\n" +
    "• Şehir nüfus değişimleri"
  );

  T.addCodeBlock(pres, s, 0.5, 3.3, 9.0, 1.9, [
    { text: "import bar_chart_race as bcr", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "import pandas as pd", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "# COVID-19 veri seti (satırlar: tarih, sütunlar: ülke)", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "df = pd.read_csv('covid_worldwide.csv', index_col='date', parse_dates=True)", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "bcr.bar_chart_race(", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "    df=df, filename='covid_race.mp4', n_bars=10,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    title='COVID-19 Toplam Vaka Sayıları', period_length=500,", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    figsize=(8, 5), cmap='dark12', bar_size=0.8)", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
  ]);
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 15 — GOOGLE TRENDS ANALİZİ
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Google Trends Analizi: pytrends", "BÖLÜM 3", C.cream, TOTAL);

  // Üst açıklama
  T.addCard(pres, s, 0.5, 1.05, 9.0, 1.6, { topColor: C.blue });
  T.cardTitle(s, 0.7, 1.2, 8.5, "pytrends — Google Arama Trendlerini Python'a Getirin");
  T.cardBody(s, 0.7, 1.6, 8.5, 0.9,
    "Google Trends verilerini programatik olarak çekmenizi sağlar. Anahtar kelime popülaritesi, bölgesel ilgi, ilgili sorgular ve yükselen trendleri analiz edebilirsiniz. Veri bilimi projelerinde trend keşfi ve mevsimsel analiz için güçlü bir araçtır."
  );

  T.addCodeBlock(pres, s, 0.5, 2.9, 5.0, 2.3, [
    { text: "from pytrends.request import TrendReq", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "pytrends = TrendReq(hl='tr-TR', tz=180)", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "# Anahtar kelime karşılaştırma", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "kw = ['yapay zeka','veri bilimi',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "      'makine öğrenmesi']", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "pytrends.build_payload(kw,", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "    timeframe='2020-01-01 2024-12-31',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    geo='TR')", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "df = pytrends.interest_over_time()", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
  ]);

  // Sağ: çıktı kartları
  T.addCard(pres, s, 5.8, 2.9, 3.7, 1.05, { leftColor: C.acc });
  T.cardTitle(s, 6.0, 3.0, 3.3, "Kullanılabilir Veriler");
  T.cardBody(s, 6.0, 3.35, 3.3, 0.5, "• interest_over_time()\n• interest_by_region()\n• related_queries()", { size: 9 });

  T.addCard(pres, s, 5.8, 4.15, 3.7, 1.05, { leftColor: C.sec });
  T.cardTitle(s, 6.0, 4.25, 3.3, "Görselleştirme");
  T.cardBody(s, 6.0, 4.6, 3.3, 0.5, "• df.plot() ile trend çizgisi\n• sns.heatmap() ile bölgesel ısı haritası", { size: 9 });
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 16 — OTO-EDA: SWEETVIZ
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Oto-EDA: Sweetviz", "BÖLÜM 4", C.cream, TOTAL);

  // Sol: açıklama
  T.addCard(pres, s, 0.5, 1.05, 4.5, 3.4, { topColor: C.purple });
  T.cardTitle(s, 0.7, 1.2, 4.0, "Tek Satırda Tam EDA Raporu");
  T.cardBody(s, 0.7, 1.6, 4.0, 2.7,
    "Sweetviz, veri setinizi otomatik olarak analiz eder ve interaktif bir HTML raporu üretir.\n\n" +
    "Rapor içeriği:\n" +
    "• Her sütun için dağılım grafikleri\n" +
    "• Eksik değer yüzdeleri\n" +
    "• Korelasyon matrisi\n" +
    "• Hedef değişken analizi\n" +
    "• İki veri seti karşılaştırması (train vs test)\n\n" +
    "Avantaj: Saatlerce sürecek EDA'yı saniyede bitirir. Dezavantaj: Büyük veri setlerinde RAM yoğun."
  );

  // Sağ: kod
  T.addCodeBlock(pres, s, 5.3, 1.05, 4.2, 2.0, [
    { text: "import sweetviz as sv", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "import pandas as pd", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "df = pd.read_csv('veri.csv')", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "# Tek satır EDA raporu", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "rapor = sv.analyze(df,", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "    target_feat='Fiyat')", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "rapor.show_html('eda_rapor.html')", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
  ]);

  // Sağ alt: karşılaştırma kodu
  T.addCodeBlock(pres, s, 5.3, 3.3, 4.2, 1.15, [
    { text: "# Train vs Test karşılaştırma", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
    { text: "rapor = sv.compare(", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "    [train, 'Eğitim'],", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    [test,  'Test'])", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
  ]);

  // Alt not
  T.addCard(pres, s, 0.5, 4.7, 9.0, 0.5, { leftColor: C.amber });
  T.cardBody(s, 0.7, 4.75, 8.5, 0.4, "Kurulum: pip install sweetviz  —  Minimum Python 3.7, Pandas >= 1.0 gerektirir.", { size: 9, color: C.mid });
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 17 — OTO-EDA: YDATA-PROFILING
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Oto-EDA: YData-Profiling", "BÖLÜM 4", C.cream, TOTAL);

  // Sol: kod + açıklama
  T.addCard(pres, s, 0.5, 1.05, 4.5, 2.4, { topColor: C.green });
  T.cardTitle(s, 0.7, 1.2, 4.0, "ProfileReport ile Derin Analiz");
  T.cardBody(s, 0.7, 1.6, 4.0, 1.7,
    "Eski adıyla pandas-profiling. Sweetviz'den daha detaylı rapor üretir.\n\n" +
    "Ekstra özellikler:\n" +
    "• Değişken etkileşim grafikleri\n" +
    "• Duplikasyon analizi\n" +
    "• Metin ve kategorik sütun detayları\n" +
    "• Jupyter Notebook içinde gösterim"
  );

  T.addCodeBlock(pres, s, 0.5, 3.7, 4.5, 1.5, [
    { text: "from ydata_profiling import ProfileReport", options: { color: C.codeBlue, fontSize: 9, fontFace: "Consolas" } },
    { text: "", options: { fontSize: 5 } },
    { text: "profil = ProfileReport(df,", options: { color: C.codeWhite, fontSize: 9, fontFace: "Consolas" } },
    { text: "    title='Veri Seti Profili',", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "    explorative=True)", options: { color: C.codeYellow, fontSize: 9, fontFace: "Consolas" } },
    { text: "profil.to_file('profil_rapor.html')", options: { color: C.codeGreen, fontSize: 9, fontFace: "Consolas" } },
  ]);

  // Sağ: karşılaştırma tablosu
  T.addCard(pres, s, 5.3, 1.05, 4.2, 4.15, { topColor: C.pri });
  T.cardTitle(s, 5.5, 1.2, 3.7, "Sweetviz vs YData-Profiling");

  const compRows = [
    ["Özellik", "Sweetviz", "YData-Profiling"],
    ["Kurulum", "pip install sweetviz", "pip install ydata-profiling"],
    ["Hız", "Hızlı", "Daha yavaş (detaylı)"],
    ["Rapor Boyutu", "Kompakt", "Kapsamlı"],
    ["Karşılaştırma", "compare() ile kolay", "compare() mevcut"],
    ["Jupyter", "show_notebook()", "to_notebook_iframe()"],
    ["Duplikasyon", "Yok", "Var"],
    ["Etkileşim", "Sınırlı", "Detaylı"],
  ];

  const cmpColW = [1.4, 1.3, 1.3];
  const cmpStartX = 5.4;
  const cmpStartY = 1.6;
  const cmpRowH = 0.32;

  compRows.forEach((row, ri) => {
    let cx = cmpStartX;
    const yy = cmpStartY + ri * cmpRowH;
    const isH = ri === 0;
    const bg = isH ? C.pri : (ri % 2 === 0 ? C.warmBg : C.card);

    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: yy, w: cmpColW[ci], h: cmpRowH, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
      s.addText(cell, {
        x: cx + 0.05, y: yy, w: cmpColW[ci] - 0.1, h: cmpRowH,
        fontFace: isH ? "Georgia" : "Calibri",
        fontSize: 8,
        bold: isH || ci === 0,
        color: isH ? "FFFFFF" : C.dark,
        valign: "middle"
      });
      cx += cmpColW[ci];
    });
  });
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 18 — HAFTALIK NOTEBOOK'LAR
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Haftalık Notebook'lar", "UYGULAMA", C.cream, TOTAL);

  const notebooks = [
    {
      title: "NB1: Matplotlib & Seaborn",
      desc: "Temel grafik türleri, özelleştirme, stil ayarları. 15+ farklı grafik uygulaması.",
      file: "matplotlib_seaborn.ipynb",
      color: C.acc,
    },
    {
      title: "NB2: COVID Yarışan Çubuk",
      desc: "bar_chart_race ile COVID-19 verilerini animasyonlu görselleştirme.",
      file: "covid_yarisan.ipynb",
      color: C.red,
    },
    {
      title: "NB3: Supermarket EDA",
      desc: "Gerçek süpermarket veri seti üzerinde Sweetviz ve YData-Profiling uygulaması.",
      file: "supermarket_eda.ipynb",
      color: C.amber,
    },
    {
      title: "NB4: Google Trends",
      desc: "pytrends ile Türkiye'deki AI trendlerini çekme ve görselleştirme.",
      file: "google_trends.ipynb",
      color: C.purple,
    },
  ];

  notebooks.forEach((nb, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.7;
    const y = 1.1 + row * 2.1;

    T.addCard(pres, s, x, y, 4.3, 1.85, { topColor: nb.color });
    T.numBadge(pres, s, x + 0.15, y + 0.2, i + 1, nb.color);
    s.addText(nb.title, { x: x + 0.65, y: y + 0.15, w: 3.4, h: 0.35, fontFace: "Georgia", fontSize: 12, bold: true, color: C.pri });
    T.cardBody(s, x + 0.2, y + 0.55, 3.9, 0.65, nb.desc, { size: 10 });
    s.addText(nb.file, { x: x + 0.2, y: y + 1.3, w: 3.9, h: 0.35, fontFace: "Consolas", fontSize: 9, color: C.acc, italic: true });
  });
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Ödev ve Kaynaklar", "UYGULAMA", C.cream, TOTAL);

  // Sol: Ödev
  T.addCard(pres, s, 0.5, 1.05, 4.5, 4.1, { topColor: C.sec });
  T.cardTitle(s, 0.7, 1.2, 4.0, "Haftalık Ödev — 5 Grafik Türü");

  const odevler = [
    { num: "1", text: "Çizgi grafiği: Hava sıcaklığı trendi (7 günlük)", color: C.acc },
    { num: "2", text: "Bar grafiği: Departman bazlı ortalama maaş karşılaştırması", color: C.sec },
    { num: "3", text: "Histogram + Boxplot: Müşteri yaş dağılımı analizi", color: C.amber },
    { num: "4", text: "Heatmap: Korelasyon matrisi ve önemli ilişkiler raporu", color: C.red },
    { num: "5", text: "Bar Chart Race: Türkiye illeri nüfus değişimi (1990–2023)", color: C.purple },
  ];

  odevler.forEach((od, i) => {
    const yy = 1.7 + i * 0.62;
    T.numBadge(pres, s, 0.7, yy + 0.08, od.num, od.color);
    T.cardBody(s, 1.2, yy, 3.5, 0.55, od.text, { size: 10 });
  });

  // Alt not
  s.addText("Teslim: Notebook (.ipynb) + PDF rapor", { x: 0.7, y: 4.6, w: 4.0, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.mid });

  // Sağ: Kaynaklar
  T.addCard(pres, s, 5.3, 1.05, 4.2, 4.1, { topColor: C.acc });
  T.cardTitle(s, 5.5, 1.2, 3.7, "Faydalı Kaynaklar");

  const kaynaklar = [
    "Matplotlib Gallery\nmatplotlib.org/gallery",
    "Seaborn Tutorial\nseaborn.pydata.org/tutorial",
    "Python Graph Gallery\npython-graph-gallery.com",
    "bar_chart_race Docs\ngithub.com/dexplo/bar_chart_race",
    "Sweetviz Docs\ngithub.com/fbdesignpro/sweetviz",
    "YData-Profiling Docs\ndocs.profiling.ydata.ai",
  ];

  kaynaklar.forEach((k, i) => {
    const yy = 1.7 + i * 0.57;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: yy, w: 0.06, h: 0.45, fill: { color: i % 2 === 0 ? C.acc : C.sec } });
    s.addText(k, { x: 5.75, y: yy, w: 3.5, h: 0.5, fontFace: "Calibri", fontSize: 9, color: C.dark });
  });
})();

// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 3 — Öğrendiklerimiz",
  [
    { text: "Matplotlib ile temel grafik türlerini (line, bar, hist, scatter, pie) oluşturmayı öğrendik", color: C.acc },
    { text: "Seaborn ile istatistiksel görselleştirme: boxplot, heatmap, pairplot", color: C.sec },
    { text: "bar_chart_race ile animasyonlu, etkileyici veri hikayesi anlatımı", color: C.amber },
    { text: "Sweetviz ve YData-Profiling ile otomatik EDA raporu üretimi", color: C.purple },
    { text: "Doğru grafik seçimi ve data storytelling ilkeleri", color: C.green },
  ],
  "Verinin en güçlü hikayesi, doğru grafikle anlatılandır.",
  "Dr. Murat Altun"
);

// ═══════════════════════════════════════════════════════════
// KAYDET
// ═══════════════════════════════════════════════════════════
pres.writeFile({ fileName: OUT })
  .then(() => console.log("PPTX oluşturuldu:", OUT))
  .catch(err => { console.error("Hata:", err); process.exit(1); });
