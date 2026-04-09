/**
 * Hafta 11 — Görüntü İşlemenin Temelleri ve OpenCV
 * ==================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 11: Görüntü İşlemenin Temelleri ve OpenCV");
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
  "OpenCV ile\nGörüntü İşleme",
  "Hafta 11 · Modül 11\nDijital Görüntü, Filtreler, Kenar Tespiti ve Konturlar",
  "Dr. Murat Altun",
  [
    { value: "6",    label: "Saat\n(Teori + Uygulama)" },
    { value: "3",    label: "Notebook\n(Temel, Filtre, Şekil)" },
    { value: "10+",  label: "OpenCV Fonk.\n(imread, Canny, vb.)" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "İçindekiler", null);

  const sections = [
    { num: "01", title: "Dijital Görüntü Temelleri",  items: "Piksel · Kanal (RGB) · Renk derinliği · OpenCV kurulumu",         color: C.sec,    slides: "Slayt 3–5" },
    { num: "02", title: "Temel İşlemler",             items: "Renk dönüşümü · Boyutlandırma · Eşikleme · Şekil çizme",         color: C.acc,    slides: "Slayt 6–13" },
    { num: "03", title: "Filtreler ve Kenar Tespiti",  items: "Blur · Gaussian · Median · Canny · Morfolojik işlemler",          color: C.amber,  slides: "Slayt 8–16" },
    { num: "04", title: "Kontur, Renk ve Canlı Video", items: "findContours · HSV maskeleme · VideoCapture · Notebook & ödev",  color: C.purple, slides: "Slayt 14–20" },
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
// SLAYT 3 — DİJİTAL GÖRÜNTÜ NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Dijital Görüntü Nedir?", "BÖLÜM 1");

  // Açıklama kartı
  card(s, 0.4, 0.95, 5.4, 2.2, { leftColor: C.sec });
  T.cardTitle(s, 0.6, 1.05, 5.0, "Piksel, Kanal ve Renk Derinliği", C.sec);
  T.cardBody(s, 0.6, 1.45, 5.0, 1.5,
    "Dijital görüntü, satır ve sütunlardan oluşan bir piksel matrisidir. Her piksel bir renk değeri taşır. " +
    "Gri tonlamalı görüntüde 1 kanal (0–255), renkli görüntüde 3 kanal (BGR veya RGB) bulunur. " +
    "8-bit derinlikte her kanal 256 farklı ton alabilir; 3 kanalla 16.7 milyon renk elde edilir."
  );

  // Stat kutular
  stat(s, 0.4, 3.35, 2.1, 1.3, "H×W×C", "Görüntü\nBoyutları", C.acc);
  stat(s, 2.7, 3.35, 2.1, 1.3, "0–255", "Piksel Değer\nAralığı", C.sec);
  stat(s, 5.0, 3.35, 2.1, 1.3, "3", "Kanal Sayısı\n(BGR)", C.amber);

  // Sağ üst: kanal bilgisi kartları
  card(s, 6.0, 0.95, 3.7, 2.2, { topColor: C.acc });
  T.cardTitle(s, 6.2, 1.15, 3.3, "Renk Kanalları", C.acc);
  const channels = [
    { ch: "B (Mavi)", desc: "Kanal 0 — Mavi tonlar", color: C.blue },
    { ch: "G (Yeşil)", desc: "Kanal 1 — Yeşil tonlar", color: C.green },
    { ch: "R (Kırmızı)", desc: "Kanal 2 — Kırmızı tonlar", color: C.red },
  ];
  channels.forEach((c, i) => {
    const y = 1.6 + i * 0.5;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.25, y, w: 0.28, h: 0.28, fill: { color: c.color } });
    s.addText(c.ch, { x: 6.65, y: y - 0.02, w: 1.3, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark });
    s.addText(c.desc, { x: 7.9, y: y - 0.02, w: 1.6, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid });
  });

  stat(s, 7.3, 3.35, 2.4, 1.3, "16.7M", "Renk\nKombinasyonu", C.purple);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — OPENCV TANITIMI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "OpenCV Tanıtımı", "BÖLÜM 1");

  // Üst açıklama
  card(s, 0.4, 0.95, 9.2, 1.1, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 1.0, 4.0, "Open Source Computer Vision Library", C.acc);
  T.cardBody(s, 0.6, 1.38, 8.8, 0.55,
    "2000 yılında Intel tarafından başlatılan OpenCV, 2500+ optimize algoritma içerir. " +
    "Python, C++, Java desteği ile bilgisayarlı görme alanının en yaygın kütüphanesidir. Kurulum: pip install opencv-python"
  );

  // 4 kullanım alanı kartı
  const areas = [
    { title: "Otonom Araçlar",  desc: "Şerit takibi, nesne algılama, trafik işareti tanıma",           color: C.sec,    icon: "🚗" },
    { title: "Tıbbi Görüntüleme", desc: "X-ray, MRI analizi, tümör segmentasyonu, hücre sayımı",       color: C.acc,    icon: "🏥" },
    { title: "Güvenlik Sistemleri", desc: "Yüz tanıma, hareket algılama, plaka okuma sistemi",         color: C.amber,  icon: "🔒" },
    { title: "Endüstriyel Üretim", desc: "Kalite kontrol, ürün sayma, kusur tespiti, ölçüm",           color: C.purple, icon: "🏭" },
  ];

  areas.forEach((a, i) => {
    const x = 0.4 + i * 2.35;
    card(s, x, 2.3, 2.15, 2.6, { topColor: a.color });
    s.addText(a.icon, { x, y: 2.5, w: 2.15, h: 0.7, margin: 0, fontSize: 28, align: "center" });
    T.cardTitle(s, x + 0.15, 3.2, 1.85, a.title, a.color);
    T.cardBody(s, x + 0.15, 3.6, 1.85, 1.1, a.desc, { size: 9.5 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — GÖRÜNTÜ OKUMA / YAZMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Görüntü Okuma ve Yazma", "BÖLÜM 1");

  code(s, 0.4, 0.95, 5.8, 3.6, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "cv2\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "matplotlib.pyplot ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "plt\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Görüntü okuma (BGR formatında)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "img = cv2.imread(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "'resim.jpg'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Boyut bilgisi\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "print(img.shape)  ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# (yükseklik, genişlik, kanal)\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "# BGR → RGB dönüşümü ve gösterim\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "plt.imshow(rgb)\nplt.axis(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "'off'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\nplt.show()\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Görüntü kaydetme\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "cv2.imwrite(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "'cikti.png'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ", img)", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
  ]);

  // Sağ taraf açıklama kartları
  card(s, 6.4, 0.95, 3.3, 1.5, { topColor: C.sec });
  T.cardTitle(s, 6.6, 1.15, 3.0, "cv2.imread()", C.sec);
  T.cardBody(s, 6.6, 1.55, 3.0, 0.75,
    "Görüntüyü NumPy dizisi olarak yükler. Varsayılan format BGR'dir (RGB değil!). " +
    "Dosya bulunamazsa None döner."
  );

  card(s, 6.4, 2.65, 3.3, 1.1, { topColor: C.acc });
  T.cardTitle(s, 6.6, 2.8, 3.0, "plt.imshow()", C.acc);
  T.cardBody(s, 6.6, 3.18, 3.0, 0.45,
    "Matplotlib RGB bekler. Önce cvtColor ile dönüştürün."
  );

  card(s, 6.4, 3.95, 3.3, 0.9, { topColor: C.amber });
  T.cardTitle(s, 6.6, 4.08, 3.0, "cv2.imwrite()", C.amber);
  T.cardBody(s, 6.6, 4.42, 3.0, 0.35,
    "PNG, JPG, BMP formatlarında kayıt."
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — RENK DÖNÜŞTÜRME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Renk Uzayı Dönüşümleri", "BÖLÜM 2");

  const conversions = [
    {
      title: "BGR → RGB",
      code: "cv2.cvtColor(img, cv2.COLOR_BGR2RGB)",
      desc: "Matplotlib ve diğer kütüphaneler RGB kullanır. Görselleştirme öncesi zorunlu dönüşüm.",
      color: C.sec,
    },
    {
      title: "BGR → Grayscale",
      code: "cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)",
      desc: "Tek kanala düşürür (0–255). Eşikleme, kenar tespiti gibi işlemlerden önce gereklidir.",
      color: C.acc,
    },
    {
      title: "BGR → HSV",
      code: "cv2.cvtColor(img, cv2.COLOR_BGR2HSV)",
      desc: "Hue (renk tonu), Saturation (doygunluk), Value (parlaklık). Renk bazlı maskeleme için idealdir.",
      color: C.amber,
    },
  ];

  conversions.forEach((c, i) => {
    const y = 0.95 + i * 1.55;
    card(s, 0.4, y, 9.2, 1.38, { leftColor: c.color });
    badge(s, 0.55, y + 0.12, i + 1, c.color);
    T.cardTitle(s, 1.05, y + 0.08, 3.5, c.title, c.color);
    // kod satırı
    s.addShape(pres.shapes.RECTANGLE, { x: 1.05, y: y + 0.48, w: 8.35, h: 0.38, fill: { color: C.codeBg } });
    s.addText(c.code, { x: 1.15, y: y + 0.48, w: 8.15, h: 0.38, margin: 0, fontFace: "Consolas", fontSize: 10, color: C.codeGreen });
    T.cardBody(s, 1.05, y + 0.92, 8.35, 0.4, c.desc, { size: 10 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — GÖRÜNTÜ BOYUTLANDIRMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Görüntü Boyutlandırma", "BÖLÜM 2");

  // Sol: kod bloğu
  code(s, 0.4, 0.95, 5.0, 2.4, [
    { text: "# Sabit boyuta yeniden boyutlandırma\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "resized = cv2.resize(img, (", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "300, 200", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "))\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Oran koruyarak küçültme\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "half = cv2.resize(img, None,\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    fx=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "0.5", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ", fy=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "0.5", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Interpolasyon belirterek\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "up = cv2.resize(img, (", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "800, 600", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "),\n    interpolation=cv2.", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "INTER_CUBIC", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: ")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
  ]);

  // Sağ: interpolasyon yöntemleri tablosu
  card(s, 5.6, 0.95, 4.1, 2.4, { topColor: C.acc });
  T.cardTitle(s, 5.8, 1.12, 3.7, "Interpolasyon Yöntemleri", C.acc);

  const methods = [
    { name: "INTER_NEAREST", use: "En hızlı, düşük kalite" },
    { name: "INTER_LINEAR",  use: "Varsayılan, dengeli" },
    { name: "INTER_CUBIC",   use: "Büyütmede yüksek kalite" },
    { name: "INTER_AREA",    use: "Küçültmede en iyi sonuç" },
  ];
  methods.forEach((m, i) => {
    const y = 1.58 + i * 0.42;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.75, y, w: 3.8, h: 0.38, fill: { color: bg } });
    s.addText(m.name, { x: 5.85, y, w: 1.9, h: 0.38, margin: 0, fontFace: "Consolas", fontSize: 8.5, color: C.acc, bold: true, valign: "middle" });
    s.addText(m.use, { x: 7.75, y, w: 1.7, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, valign: "middle" });
  });

  // Alt: ipucu
  card(s, 0.4, 3.55, 9.3, 1.2, { leftColor: C.purple });
  T.cardTitle(s, 0.6, 3.62, 4, "💡 Pratik İpucu", C.purple);
  T.cardBody(s, 0.6, 3.98, 8.9, 0.65,
    "cv2.resize() genişlik × yükseklik (W, H) sırasıyla alır, ancak img.shape yükseklik × genişlik (H, W) döner. " +
    "Bu fark sık karıştırılır! Modele beslenmeden önce tüm görüntülerin aynı boyutta olması gerekir (ör. 224×224)."
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — TEMEL FİLTRELER (TABLO)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Temel Bulanıklaştırma Filtreleri", "BÖLÜM 3");

  // Tablo başlık
  const cols = [
    { x: 0.5, w: 2.0, text: "Filtre" },
    { x: 2.5, w: 3.0, text: "OpenCV Fonksiyonu" },
    { x: 5.5, w: 2.2, text: "Kullanım Alanı" },
    { x: 7.7, w: 2.0, text: "Kernel Boyutu" },
  ];
  // Başlık satırı
  cols.forEach(c => {
    s.addShape(pres.shapes.RECTANGLE, { x: c.x, y: 0.95, w: c.w, h: 0.45, fill: { color: C.pri } });
    s.addText(c.text, { x: c.x, y: 0.95, w: c.w, h: 0.45, margin: [0, 5, 0, 5], fontFace: "Georgia", fontSize: 11, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  });

  const rows = [
    { name: "Box Blur",     fn: "cv2.blur(img, (5,5))",             use: "Genel yumuşatma",      kernel: "3×3, 5×5, 7×7" },
    { name: "Gaussian Blur", fn: "cv2.GaussianBlur(img, (5,5), 0)", use: "Gürültü azaltma",      kernel: "Tek sayı: 3,5,7" },
    { name: "Median Blur",  fn: "cv2.medianBlur(img, 5)",           use: "Tuz-biber gürültüsü",  kernel: "Tek sayı: 3,5,7" },
    { name: "Bilateral",    fn: "cv2.bilateralFilter(img, 9, 75, 75)", use: "Kenar koruyarak blur", kernel: "d=5,7,9" },
  ];
  rows.forEach((r, i) => {
    const y = 1.4 + i * 0.65;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    cols.forEach(c => {
      s.addShape(pres.shapes.RECTANGLE, { x: c.x, y, w: c.w, h: 0.6, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    });
    s.addText(r.name, { x: 0.5, y, w: 2.0, h: 0.6, margin: [0, 5, 0, 8], fontFace: "Georgia", fontSize: 10.5, bold: true, color: C.dark, valign: "middle" });
    s.addText(r.fn, { x: 2.5, y, w: 3.0, h: 0.6, margin: [0, 5, 0, 5], fontFace: "Consolas", fontSize: 8.5, color: C.acc, valign: "middle" });
    s.addText(r.use, { x: 5.5, y, w: 2.2, h: 0.6, margin: [0, 5, 0, 5], fontFace: "Calibri", fontSize: 10, color: C.mid, valign: "middle", align: "center" });
    s.addText(r.kernel, { x: 7.7, y, w: 2.0, h: 0.6, margin: [0, 5, 0, 5], fontFace: "Calibri", fontSize: 10, color: C.dark, valign: "middle", align: "center" });
  });

  // Alt açıklama
  card(s, 0.4, 4.1, 9.3, 1.1, { leftColor: C.acc });
  T.cardTitle(s, 0.6, 4.18, 4, "Kernel (Çekirdek) Nedir?", C.acc);
  T.cardBody(s, 0.6, 4.52, 8.9, 0.55,
    "Kernel, görüntü üzerinde kayan küçük bir matristir. Her pikselin yeni değeri, komşu piksellerin ağırlıklı " +
    "ortalaması ile hesaplanır. Büyük kernel = daha fazla bulanıklaştırma. Gaussian kernel merkeze daha çok ağırlık verir."
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — GAUSSIAN BLUR KODU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Gaussian Blur — Kod Örneği", "BÖLÜM 3");

  code(s, 0.4, 0.95, 6.0, 3.8, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "cv2\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "matplotlib.pyplot ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "plt\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "img = cv2.imread(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "'foto.jpg'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Farklı kernel boyutları ile karşılaştırma\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "kernels = [(3,3), (7,7), (15,15), (31,31)]\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "fig, axes = plt.subplots(1, 4, figsize=(16,4))\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "for ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "ax, k ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "in ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "zip(axes, kernels):\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    blur = cv2.GaussianBlur(img, k, ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "0", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    ax.imshow(cv2.cvtColor(blur,\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "        cv2.COLOR_BGR2RGB))\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    ax.set_title(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "f'Kernel {k}'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\nplt.tight_layout()\nplt.show()", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
  ]);

  // Sağ: karşılaştırma kartları
  const kernels = [
    { size: "3×3", effect: "Hafif yumuşatma", level: "▓░░░", color: C.green },
    { size: "7×7", effect: "Orta bulanıklık", level: "▓▓░░", color: C.acc },
    { size: "15×15", effect: "Güçlü blur", level: "▓▓▓░", color: C.amber },
    { size: "31×31", effect: "Çok güçlü blur", level: "▓▓▓▓", color: C.red },
  ];
  kernels.forEach((k, i) => {
    const y = 0.95 + i * 0.98;
    card(s, 6.6, y, 3.1, 0.85, { leftColor: k.color });
    s.addText(k.size, { x: 6.8, y: y + 0.05, w: 1.0, h: 0.38, margin: 0, fontFace: "Georgia", fontSize: 16, bold: true, color: k.color });
    s.addText(k.effect, { x: 7.8, y: y + 0.05, w: 1.8, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.dark, valign: "middle" });
    s.addText(k.level, { x: 6.8, y: y + 0.42, w: 2.7, h: 0.35, margin: 0, fontFace: "Consolas", fontSize: 14, color: k.color });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — KENAR TESPİTİ: CANNY
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Kenar Tespiti: Canny Algoritması", "BÖLÜM 3");

  // Sol: algoritma adımları
  card(s, 0.4, 0.95, 4.8, 3.3, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.4, "Canny Algoritma Adımları", C.sec);

  const steps = [
    { step: "Gürültü Azaltma", desc: "Gaussian blur ile yumuşatma" },
    { step: "Gradyan Hesaplama", desc: "Sobel filtresi ile x ve y yönlü türevler" },
    { step: "Non-Maximum Suppression", desc: "İnce kenarlar elde etme" },
    { step: "Çift Eşikleme", desc: "Güçlü ve zayıf kenarları ayırma" },
    { step: "Hysteresis", desc: "Zayıf kenarları güçlülere bağlama" },
  ];
  steps.forEach((st, i) => {
    const y = 1.6 + i * 0.52;
    badge(s, 0.6, y + 0.06, i + 1, C.sec);
    s.addText(st.step, { x: 1.08, y, w: 1.9, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText(st.desc, { x: 3.0, y, w: 2.0, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, valign: "middle" });
  });

  // Sağ: kod bloğu
  code(s, 5.4, 0.95, 4.3, 2.2, [
    { text: "# Canny kenar tespiti\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "gray = cv2.cvtColor(img,\n    cv2.COLOR_BGR2GRAY)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# threshold1=50, threshold2=150\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "edges = cv2.Canny(gray, ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "50", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ", ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "150", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "plt.imshow(edges, cmap=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "'gray'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\nplt.show()", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
  ]);

  // Sağ alt: threshold kartları
  stat(s, 5.4, 3.35, 2.05, 1.2, "50", "Alt Eşik\n(threshold1)", C.acc);
  stat(s, 7.6, 3.35, 2.05, 1.2, "150", "Üst Eşik\n(threshold2)", C.sec);

  // Alt sol açıklama
  card(s, 0.4, 4.45, 4.8, 0.8, { leftColor: C.amber });
  T.cardBody(s, 0.6, 4.55, 4.4, 0.55,
    "Düşük eşik → daha fazla kenar (gürültülü). Yüksek eşik → daha az ama keskin kenarlar. " +
    "Oran genelde 1:2 veya 1:3 olarak seçilir.", { size: 9.5 }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — GÖRÜNTÜ EŞİKLEME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Görüntü Eşikleme (Thresholding)", "BÖLÜM 2");

  const types = [
    {
      title: "Binary Threshold",
      code: "ret, th = cv2.threshold(\n    gray, 127, 255,\n    cv2.THRESH_BINARY)",
      desc: "Piksel > eşik → beyaz, değilse → siyah. En temel eşikleme yöntemi.",
      color: C.sec,
    },
    {
      title: "Adaptive Threshold",
      code: "th = cv2.adaptiveThreshold(\n    gray, 255,\n    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,\n    cv2.THRESH_BINARY, 11, 2)",
      desc: "Bölgesel eşik hesaplar. Farklı aydınlatma koşullarında çok daha iyi sonuç verir.",
      color: C.acc,
    },
    {
      title: "Otsu Threshold",
      code: "ret, th = cv2.threshold(\n    gray, 0, 255,\n    cv2.THRESH_BINARY + cv2.THRESH_OTSU)",
      desc: "Optimum eşik değerini otomatik bulur. Bimodal histogramlarda mükemmel çalışır.",
      color: C.amber,
    },
  ];

  types.forEach((t, i) => {
    const x = 0.4 + i * 3.15;
    card(s, x, 0.95, 2.95, 4.2, { topColor: t.color });
    badge(s, x + 0.12, 1.12, i + 1, t.color);
    T.cardTitle(s, x + 0.55, 1.12, 2.2, t.title, t.color);

    // Kod alanı
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: 1.6, w: 2.75, h: 1.5, fill: { color: C.codeBg } });
    s.addText(t.code, { x: x + 0.2, y: 1.65, w: 2.55, h: 1.4, margin: 0, fontFace: "Consolas", fontSize: 8, color: C.codeGreen });

    T.cardBody(s, x + 0.15, 3.25, 2.65, 1.7, t.desc, { size: 10 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — ŞEKİL ÇİZME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Görüntü Üzerine Şekil Çizme", "BÖLÜM 2");

  code(s, 0.4, 0.95, 9.2, 4.0, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "numpy ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "np\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Boş tuval oluştur (siyah, 400x600, 3 kanal)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "canvas = np.zeros((400, 600, 3), dtype=np.uint8)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Dikdörtgen: sol-üst (50,50), sağ-alt (200,150), yeşil, kalınlık 2\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "cv2.rectangle(canvas, (50,50), (200,150), (0,255,0), ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "2", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Daire: merkez (300,200), yarıçap 60, mavi, dolu (-1)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "cv2.circle(canvas, (300,200), 60, (255,0,0), ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "-1", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Çizgi: başlangıç (0,0), bitiş (600,400), kırmızı, kalınlık 3\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "cv2.line(canvas, (0,0), (600,400), (0,0,255), ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "3", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Elips: merkez (450,300), eksenler (80,50), açı 30\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "cv2.ellipse(canvas, (450,300), (80,50), 30, 0, 360, (0,255,255), 2)", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — METİN EKLEME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Görüntüye Metin Ekleme", "BÖLÜM 2");

  // Sol: kod bloğu
  code(s, 0.4, 0.95, 5.4, 2.8, [
    { text: "# Metin ekleme\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "cv2.putText(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    img,\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    'Merhaba OpenCV!'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ",        ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# metin\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "    (50, 100),              ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# konum (x,y)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "    cv2.FONT_HERSHEY_SIMPLEX, ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "# font\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "    1.5,                    ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "# ölçek\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "    (255, 255, 255),        ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# renk (beyaz)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "    2,                      ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "# kalınlık\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "    cv2.LINE_AA             ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "# anti-alias\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: ")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
  ]);

  // Sağ: font seçenekleri
  card(s, 6.0, 0.95, 3.7, 3.8, { topColor: C.acc });
  T.cardTitle(s, 6.2, 1.15, 3.3, "Font Seçenekleri", C.acc);

  const fonts = [
    { name: "HERSHEY_SIMPLEX",      style: "Sans-serif, düz" },
    { name: "HERSHEY_PLAIN",        style: "Küçük, sade" },
    { name: "HERSHEY_DUPLEX",       style: "Sans-serif, kalın" },
    { name: "HERSHEY_COMPLEX",      style: "Serif, normal" },
    { name: "HERSHEY_TRIPLEX",      style: "Serif, kalın" },
    { name: "HERSHEY_SCRIPT_SIMPLEX", style: "El yazısı" },
    { name: "ITALIC",               style: "Herhangi biri + italik" },
  ];
  fonts.forEach((f, i) => {
    const y = 1.58 + i * 0.42;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.15, y, w: 3.4, h: 0.38, fill: { color: bg } });
    s.addText(f.name, { x: 6.25, y, w: 2.1, h: 0.38, margin: 0, fontFace: "Consolas", fontSize: 7.5, color: C.acc, bold: true, valign: "middle" });
    s.addText(f.style, { x: 8.3, y, w: 1.2, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, valign: "middle" });
  });

  // Alt: ipucu
  card(s, 0.4, 4.0, 5.4, 1.0, { leftColor: C.purple });
  T.cardBody(s, 0.6, 4.1, 5.0, 0.8,
    "⚠️ OpenCV Türkçe karakter desteklemez (ö, ş, ğ, ü, ç, ı). " +
    "Türkçe metin için PIL/Pillow kütüphanesini kullanın: ImageDraw.text() ile TTF font yükleyebilirsiniz.", { size: 9.5 }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — KONTUR TESPİTİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Kontur Tespiti", "BÖLÜM 4");

  // Sol: kod
  code(s, 0.4, 0.95, 5.4, 2.8, [
    { text: "# Gri tonlama ve eşikleme\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "_, thresh = cv2.threshold(gray, 127, 255,\n    cv2.THRESH_BINARY)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Konturları bul\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "contours, hierarchy = cv2.findContours(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    thresh, cv2.", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "RETR_TREE", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: ",\n    cv2.", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "CHAIN_APPROX_SIMPLE", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: ")\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Konturları çiz (tümü, yeşil, kalınlık 2)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "cv2.drawContours(img, contours, ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "-1", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ",\n    (0,255,0), 2)", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
  ]);

  // Sağ: kullanım alanları
  card(s, 6.0, 0.95, 3.7, 2.8, { topColor: C.purple });
  T.cardTitle(s, 6.2, 1.15, 3.3, "Kullanım Alanları", C.purple);
  const uses = [
    { text: "Nesne sayma (hücre, ürün)", color: C.sec },
    { text: "Şekil tanıma ve sınıflandırma", color: C.acc },
    { text: "Bölge seçme (ROI) ve kırpma", color: C.amber },
    { text: "Belge tarama ve düzeltme", color: C.purple },
    { text: "Hareket takibi (tracking)", color: C.blue },
  ];
  uses.forEach((u, i) => {
    const y = 1.6 + i * 0.42;
    badge(s, 6.2, y + 0.04, i + 1, u.color);
    s.addText(u.text, { x: 6.65, y, w: 2.9, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.dark, valign: "middle" });
  });

  // Alt: retrieval modları
  card(s, 0.4, 3.95, 9.3, 1.2, { topColor: C.acc });
  T.cardTitle(s, 0.6, 4.1, 4, "Retrieval Modları", C.acc);
  const modes = [
    { mode: "RETR_EXTERNAL", desc: "Sadece dış konturlar" },
    { mode: "RETR_LIST", desc: "Tüm konturlar (hiyerarşisiz)" },
    { mode: "RETR_TREE", desc: "Tam hiyerarşi ağacı" },
  ];
  modes.forEach((m, i) => {
    const x = 0.6 + i * 3.05;
    s.addText(m.mode, { x, y: 4.52, w: 2.0, h: 0.28, margin: 0, fontFace: "Consolas", fontSize: 9, bold: true, color: C.acc });
    s.addText(m.desc, { x, y: 4.8, w: 2.8, h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — HSV İLE RENK TESPİTİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "HSV ile Renk Tespiti", "BÖLÜM 4");

  // Sol: kod bloğu
  code(s, 0.4, 0.95, 5.4, 3.2, [
    { text: "# BGR → HSV dönüşümü\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Mavi renk aralığı tanımla\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "lower_blue = np.array([", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "100, 50, 50", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "])\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "upper_blue = np.array([", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "130, 255, 255", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "])\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Maske oluştur\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "mask = cv2.inRange(hsv,\n    lower_blue, upper_blue)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# Maskeyi uygula\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "result = cv2.bitwise_and(\n    img, img, mask=mask)", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
  ]);

  // Sağ: HSV renk aralıkları
  card(s, 6.0, 0.95, 3.7, 3.2, { topColor: C.amber });
  T.cardTitle(s, 6.2, 1.15, 3.3, "HSV Renk Aralıkları", C.amber);

  const colors = [
    { name: "Kırmızı", hue: "0–10, 170–180", color: C.red },
    { name: "Turuncu", hue: "10–25",          color: C.amber },
    { name: "Sarı",    hue: "25–35",          color: "D4A017" },
    { name: "Yeşil",   hue: "35–85",          color: C.green },
    { name: "Mavi",    hue: "100–130",         color: C.blue },
    { name: "Mor",     hue: "130–170",         color: C.purple },
  ];
  colors.forEach((c, i) => {
    const y = 1.6 + i * 0.4;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.25, y, w: 0.3, h: 0.3, fill: { color: c.color } });
    s.addText(c.name, { x: 6.65, y, w: 1.0, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText("H: " + c.hue, { x: 7.65, y, w: 1.9, h: 0.3, margin: 0, fontFace: "Consolas", fontSize: 9, color: C.mid, valign: "middle" });
  });

  // Alt: gerçek dünya örneği
  card(s, 0.4, 4.35, 9.3, 0.9, { leftColor: C.green });
  T.cardTitle(s, 0.6, 4.4, 4, "🌍 Gerçek Dünya Örneği", C.green);
  T.cardBody(s, 0.6, 4.75, 8.9, 0.4,
    "Tarımda yeşil yaprak segmentasyonu, fabrikada renkli ürün ayırma, trafik ışığı tanıma — hepsi HSV maskeleme ile başlar."
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — MORFOLOJİK İŞLEMLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Morfolojik İşlemler", "BÖLÜM 3");

  const ops = [
    {
      title: "Erosion (Aşındırma)",
      code: "cv2.erode(img, kernel, iterations=1)",
      desc: "Beyaz bölgeleri küçültür. Gürültü noktalarını yok eder, nesneleri inceltir.",
      color: C.sec,
    },
    {
      title: "Dilation (Genişletme)",
      code: "cv2.dilate(img, kernel, iterations=1)",
      desc: "Beyaz bölgeleri büyütür. Boşlukları doldurur, nesneleri kalınlaştırır.",
      color: C.acc,
    },
    {
      title: "Opening (Açma)",
      code: "cv2.morphologyEx(img, cv2.MORPH_OPEN, k)",
      desc: "Erosion + Dilation. Küçük gürültü noktalarını temizler, nesne boyutunu korur.",
      color: C.amber,
    },
    {
      title: "Closing (Kapama)",
      code: "cv2.morphologyEx(img, cv2.MORPH_CLOSE, k)",
      desc: "Dilation + Erosion. Küçük delikleri kapatır, nesne içi boşlukları doldurur.",
      color: C.purple,
    },
  ];

  ops.forEach((op, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.7;
    const y = 0.95 + row * 2.2;
    card(s, x, y, 4.5, 2.0, { topColor: op.color });
    badge(s, x + 0.12, y + 0.18, i + 1, op.color);
    T.cardTitle(s, x + 0.55, y + 0.15, 3.7, op.title, op.color);

    // kod
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: y + 0.58, w: 4.3, h: 0.48, fill: { color: C.codeBg } });
    s.addText(op.code, { x: x + 0.2, y: y + 0.6, w: 4.1, h: 0.44, margin: 0, fontFace: "Consolas", fontSize: 8.5, color: C.codeGreen });

    T.cardBody(s, x + 0.15, y + 1.15, 4.2, 0.7, op.desc, { size: 10 });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — WEBCAM İLE CANLI İŞLEME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Webcam ile Canlı Görüntü İşleme", "BÖLÜM 4");

  code(s, 0.4, 0.95, 5.6, 3.8, [
    { text: "# Webcam bağlantısı\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "cap = cv2.VideoCapture(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "0", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ")  ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "# 0 = varsayılan kamera\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "while ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "True:\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    ret, frame = cap.read()\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    if not ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "ret: ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "break\n\n", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "    # Gerçek zamanlı filtre uygula\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 10 } },
    { text: "    gray = cv2.cvtColor(frame,\n        cv2.COLOR_BGR2GRAY)\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    edges = cv2.Canny(gray, 50, 150)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    cv2.imshow(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "'Kenarlar'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: ", edges)\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "    if ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "cv2.waitKey(1) & 0xFF == ord(", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "'q'", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 10 } },
    { text: "):\n        ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
    { text: "break\n\n", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 10 } },
    { text: "cap.release()\ncv2.destroyAllWindows()", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 10 } },
  ]);

  // Sağ: adımlar
  card(s, 6.2, 0.95, 3.5, 3.8, { topColor: C.sec });
  T.cardTitle(s, 6.4, 1.15, 3.1, "İşlem Akışı", C.sec);

  const flow = [
    { step: "VideoCapture(0)", desc: "Kamerayı aç" },
    { step: "cap.read()", desc: "Kare oku (frame)" },
    { step: "İşlem uygula", desc: "Filtre, kenar, renk" },
    { step: "imshow()", desc: "Pencerede göster" },
    { step: "waitKey(1)", desc: "Tuş bekle (1ms)" },
    { step: "release()", desc: "Kaynakları serbest bırak" },
  ];
  flow.forEach((f, i) => {
    const y = 1.6 + i * 0.5;
    badge(s, 6.4, y + 0.05, i + 1, i < 5 ? C.sec : C.red);
    s.addText(f.step, { x: 6.88, y, w: 1.6, h: 0.4, margin: 0, fontFace: "Consolas", fontSize: 8.5, bold: true, color: C.dark, valign: "middle" });
    s.addText(f.desc, { x: 8.45, y, w: 1.1, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, valign: "middle" });
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
      title: "opencv_temel.ipynb",
      desc: "Görüntü okuma/yazma, BGR↔RGB dönüşümü, boyutlandırma, piksel manipülasyonu, renk uzayları",
      topics: ["cv2.imread", "cv2.resize", "cvtColor"],
      color: C.sec,
      icon: "📷",
    },
    {
      title: "filtreler_kenar.ipynb",
      desc: "Blur filtreleri karşılaştırma, Canny kenar tespiti, eşikleme yöntemleri, morfolojik işlemler",
      topics: ["GaussianBlur", "Canny", "threshold"],
      color: C.acc,
      icon: "🔍",
    },
    {
      title: "sekil_metin.ipynb",
      desc: "Geometrik şekil çizme, metin ekleme, kontur tespiti, HSV maskeleme, webcam örneği",
      topics: ["drawContours", "putText", "inRange"],
      color: C.amber,
      icon: "✏️",
    },
  ];

  notebooks.forEach((nb, i) => {
    const x = 0.4 + i * 3.15;
    card(s, x, 0.95, 2.95, 3.8, { topColor: nb.color });
    s.addText(nb.icon, { x, y: 1.1, w: 2.95, h: 0.6, margin: 0, fontSize: 28, align: "center" });
    T.cardTitle(s, x + 0.15, 1.7, 2.65, nb.title, nb.color);
    T.cardBody(s, x + 0.15, 2.1, 2.65, 1.4, nb.desc, { size: 10 });

    // Alt: topic etiketleri
    nb.topics.forEach((t, j) => {
      const tx = x + 0.15 + j * 0.95;
      s.addShape(pres.shapes.RECTANGLE, { x: tx, y: 3.65, w: 0.88, h: 0.32, fill: { color: nb.color } });
      s.addText(t, { x: tx, y: 3.65, w: 0.88, h: 0.32, margin: 0, fontFace: "Consolas", fontSize: 7, color: "FFFFFF", align: "center", valign: "middle" });
    });
  });

  // Alt: not
  card(s, 0.4, 4.95, 9.3, 0.5, { leftColor: C.purple });
  T.cardBody(s, 0.6, 5.0, 8.9, 0.38,
    "Tüm notebook'lar Google Colab'da çalışacak şekilde hazırlanmıştır. pip install opencv-python-headless komutu ile kurulum yapabilirsiniz."
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ödev ve Kaynaklar", "BÖLÜM 4");

  // Ödev 1
  card(s, 0.4, 0.95, 4.5, 2.2, { topColor: C.sec });
  badge(s, 0.55, 1.15, 1, C.sec);
  T.cardTitle(s, 0.98, 1.12, 3.7, "5 Filtre Kolajı", C.sec);
  T.cardBody(s, 0.6, 1.55, 4.1, 1.4,
    "Bir fotoğrafa 5 farklı filtre uygulayın (orijinal, blur, gaussian, median, bilateral). " +
    "plt.subplots ile 2×3 grid oluşturup her birinin altına filtre adını yazın. " +
    "Karşılaştırma yorumlarınızı markdown hücresine ekleyin.",
    { size: 10 }
  );

  // Ödev 2
  card(s, 5.1, 0.95, 4.6, 2.2, { topColor: C.acc });
  badge(s, 5.25, 1.15, 2, C.acc);
  T.cardTitle(s, 5.68, 1.12, 3.8, "HSV Renk Tespiti Projesi", C.acc);
  T.cardBody(s, 5.3, 1.55, 4.2, 1.4,
    "Bir görüntüden belirli bir rengi (kırmızı veya mavi) HSV maskeleme ile izole edin. " +
    "Orijinal, maske ve sonuç görüntülerini yan yana gösterin. " +
    "Farklı renk aralıklarını deneyip en iyi sonucu belgeleyin.",
    { size: 10 }
  );

  // Kaynaklar
  card(s, 0.4, 3.35, 9.3, 1.9, { topColor: C.purple });
  T.cardTitle(s, 0.6, 3.5, 4, "📚 Kaynaklar", C.purple);

  const resources = [
    { name: "OpenCV Resmi Dokümantasyon", url: "docs.opencv.org", color: C.sec },
    { name: "OpenCV-Python Tutorials", url: "docs.opencv.org/4.x/d6/d00/tutorial_py_root.html", color: C.acc },
    { name: "PyImageSearch Blog", url: "pyimagesearch.com", color: C.amber },
    { name: "Computer Vision: Algorithms and Applications", url: "Szeliski (2022) — Ücretsiz PDF", color: C.purple },
  ];
  resources.forEach((r, i) => {
    const y = 3.92 + i * 0.32;
    badge(s, 0.6, y, i + 1, r.color);
    s.addText(r.name, { x: 1.08, y: y - 0.02, w: 3.5, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.dark, valign: "middle" });
    s.addText(r.url, { x: 4.6, y: y - 0.02, w: 5.0, h: 0.3, margin: 0, fontFace: "Consolas", fontSize: 8.5, color: C.acc, valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 11 — Önemli Çıkarımlar",
  [
    { text: "Dijital görüntü = piksel matrisi. OpenCV ile NumPy dizisi olarak manipüle edilir.", color: C.sec },
    { text: "BGR ↔ RGB ↔ HSV dönüşümleri, her görüntü işleme projesinin temelidir.", color: C.acc },
    { text: "Filtreler gürültüyü azaltır, Canny kenarları tespit eder — ikisi birlikte güçlüdür.", color: C.amber },
    { text: "Kontur tespiti ile nesneleri sayabilir, şekillerini analiz edebilirsiniz.", color: C.purple },
    { text: "HSV maskeleme, renk bazlı nesne tespitinin en basit ve etkili yoludur.", color: C.green },
  ],
  "Bir bilgisayarın görmesini sağlamak, ona dünyayı piksel piksel öğretmekle başlar.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// DOSYAYA YAZ
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta11_opencv_goruntu_isleme.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("✅ Sunum oluşturuldu:", outPath))
  .catch(err => { console.error("❌ Hata:", err); process.exit(1); });
