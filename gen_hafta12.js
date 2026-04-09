/**
 * Hafta 12 — Bilgisayarlı Görü ve Transfer Learning
 * ===================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 12: Bilgisayarlı Görü ve Transfer Learning");
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
  "CNN ve\nTransfer Learning",
  "Hafta 12 · Modül 12\nBilgisayarlı Görü, Evrişimli Ağlar ve Önceden Eğitilmiş Modeller",
  "Dr. Murat Altun",
  [
    { value: "6",    label: "Saat" },
    { value: "3",    label: "Notebook" },
    { value: "90%+", label: "Hedef Doğruluk" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "İçindekiler", null);

  const sections = [
    { num: "01", title: "CNN Mimarisi",          items: "Evrişim · Katmanlar · Filtre/Kernel · Conv2D · MaxPooling", color: C.sec,    slides: "Slayt 3–8" },
    { num: "02", title: "Ünlü Modeller",         items: "CIFAR-10 · VGG16 · ResNet50 · MobileNet · Karşılaştırma", color: C.acc,    slides: "Slayt 8–12" },
    { num: "03", title: "Transfer Learning",      items: "Fine-tuning · Feature Extraction · Data Augmentation",     color: C.amber,  slides: "Slayt 10–16" },
    { num: "04", title: "Uygulamalar",            items: "Kedi/Köpek · Maske Tespiti · Notebook'lar · Ödev",         color: C.purple, slides: "Slayt 14–20" },
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
// SLAYT 3 — CNN NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "CNN Nedir? — Evrişimli Sinir Ağları", "BÖLÜM 1");

  // Sol kart: Tanım
  card(s, 0.4, 0.95, 4.5, 2.1, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.15, 4.1, "Convolutional Neural Network", C.sec);
  T.cardBody(s, 0.6, 1.55, 4.1, 1.3,
    "CNN, görüntü verisi üzerinde uzmanlaşmış derin öğrenme mimarisidir. Piksel komşuluk ilişkilerini öğrenir, " +
    "her katmanda daha soyut özellikler çıkarır. İnsan görme sisteminden ilham alır: kenarlar → şekiller → nesneler."
  );

  // Sağ: ANN vs CNN karşılaştırma
  card(s, 5.15, 0.95, 4.45, 2.1, { topColor: C.acc });
  T.cardTitle(s, 5.35, 1.15, 4.0, "ANN vs CNN — Temel Farklar", C.acc);
  const rows = [
    ["Özellik",      "ANN (Dense)",         "CNN"],
    ["Girdi",        "Düz vektör (1D)",     "2D/3D tensör (görüntü)"],
    ["Bağlantı",     "Tam bağlantılı",      "Yerel bağlantılı (kernel)"],
    ["Parametre",    "Çok fazla",           "Paylaşımlı ağırlıklar"],
    ["Kullanım",     "Tablo verisi",        "Görüntü, video, ses"],
  ];
  rows.forEach((r, i) => {
    const yy = 1.55 + i * 0.28;
    const bg = i === 0 ? C.pri : (i % 2 === 0 ? C.warmBg : C.card);
    const fc = i === 0 ? "FFFFFF" : C.dark;
    s.addText(r[0], { x: 5.35, y: yy, w: 1.3, h: 0.28, margin: [0,4,0,4], fontFace: "Calibri", fontSize: 9, bold: i === 0, color: fc, fill: { color: bg } });
    s.addText(r[1], { x: 6.65, y: yy, w: 1.5, h: 0.28, margin: [0,4,0,4], fontFace: "Calibri", fontSize: 9, bold: i === 0, color: fc, fill: { color: bg } });
    s.addText(r[2], { x: 8.15, y: yy, w: 1.45, h: 0.28, margin: [0,4,0,4], fontFace: "Calibri", fontSize: 9, bold: i === 0, color: fc, fill: { color: bg } });
  });

  // Alt: neden görüntü için ideal
  card(s, 0.4, 3.25, 9.2, 1.9, { leftColor: C.purple });
  T.cardTitle(s, 0.6, 3.35, 8.8, "Neden Görüntü için İdeal?", C.purple);

  const reasons = [
    { icon: "1", title: "Uzamsal Hiyerarşi", desc: "İlk katmanlar kenar, sonrakiler şekil, en derin katmanlar nesne tanır" },
    { icon: "2", title: "Parametre Paylaşımı", desc: "Aynı filtre tüm görüntü üzerinde kayarak çok az parametre ile öğrenir" },
    { icon: "3", title: "Öteleme Değişmezliği", desc: "Nesnenin konumu değişse de aynı filtreyle tespit edilir" },
  ];
  reasons.forEach((r, i) => {
    const xx = 0.6 + i * 3.05;
    badge(s, xx, 3.8, r.icon, C.purple);
    s.addText(r.title, { x: xx + 0.45, y: 3.8, w: 2.4, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10.5, bold: true, color: C.dark });
    s.addText(r.desc, { x: xx + 0.45, y: 4.12, w: 2.4, h: 0.7, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — CNN KATMANLARI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "CNN Katmanları — 4 Adımlı Pipeline", "BÖLÜM 1");

  const steps = [
    { num: "1", title: "Conv2D", desc: "Evrişim katmanı: filtreler görüntüyü tarar,\nözellik haritaları (feature maps) üretir.\nGirdi: (H×W×C) → Çıktı: (H'×W'×F)", color: C.sec },
    { num: "2", title: "MaxPool", desc: "Boyut küçültme: özellik haritalarını\nözetler, hesaplama maliyetini düşürür.\nGirdi: (H×W) → Çıktı: (H/2×W/2)", color: C.acc },
    { num: "3", title: "Flatten", desc: "2D özellik haritalarını 1D vektöre\ndönüştürür. Sınıflandırma katmanlarına\nköprü görevi görür.", color: C.amber },
    { num: "4", title: "Dense", desc: "Tam bağlantılı katman: sınıflandırma\nyapar. Son katmanda softmax ile\nolasılık dağılımı üretir.", color: C.purple },
  ];

  steps.forEach((st, i) => {
    const y = 1.0 + i * 1.1;
    card(s, 0.4, y, 9.2, 0.95, { leftColor: st.color });
    // Numara kutusu
    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: y + 0.15, w: 0.65, h: 0.65, fill: { color: st.color } });
    s.addText(st.num, { x: 0.55, y: y + 0.15, w: 0.65, h: 0.65, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(st.title, { x: 1.4, y: y + 0.08, w: 2, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: st.color });
    s.addText(st.desc, { x: 1.4, y: y + 0.38, w: 8.0, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.dark });

    // Ok (son step hariç)
    if (i < steps.length - 1) {
      s.addText("▼", { x: 4.5, y: y + 0.88, w: 1, h: 0.22, margin: 0, fontFace: "Calibri", fontSize: 12, color: C.mid, align: "center" });
    }
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — FİLTRE/KERNEL KAVRAMI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Filtre/Kernel — CNN Görüntüyü Nasıl Görür?", "BÖLÜM 1");

  // Üst açıklama
  card(s, 0.4, 0.95, 9.2, 1.3, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 8.8, "Hiyerarşik Özellik Çıkarımı", C.sec);
  T.cardBody(s, 0.6, 1.48, 8.8, 0.6,
    "CNN'in her katmanı, bir önceki katmanın çıktısından daha soyut özellikler çıkarır. İlk katmanlar düşük seviyeli " +
    "özellikleri (kenarlar, gradyanlar), orta katmanlar dokuları ve şekilleri, derin katmanlar nesneleri tanır."
  );

  // 3 aşama kartları
  const phases = [
    { title: "Katman 1–2", subtitle: "Kenarlar & Köşeler", desc: "Yatay, dikey ve çapraz\nkenarları tespit eder.\n3×3 kernel ile basit\ngradyan filtreleri.", color: C.acc, emoji: "▤" },
    { title: "Katman 3–4", subtitle: "Dokular & Şekiller", desc: "Kenarları birleştirerek\ndaireler, dikdörtgenler,\ndokular oluşturur.\nDaha büyük alıcı alan.", color: C.amber, emoji: "◆" },
    { title: "Katman 5+", subtitle: "Nesneler & Yüzler", desc: "Yüz, araba, hayvan\ngibi yüksek seviyeli\nkavramları tanır.\nSemantik anlam.", color: C.purple, emoji: "★" },
  ];
  phases.forEach((p, i) => {
    const x = 0.4 + i * 3.1;
    card(s, x, 2.5, 2.9, 2.6, { topColor: p.color });
    s.addText(p.emoji, { x, y: 2.7, w: 2.9, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 28, color: p.color, align: "center" });
    s.addText(p.title, { x: x + 0.15, y: 3.2, w: 2.6, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: p.color, align: "center" });
    s.addText(p.subtitle, { x: x + 0.15, y: 3.48, w: 2.6, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark, align: "center" });
    s.addText(p.desc, { x: x + 0.15, y: 3.78, w: 2.6, h: 1.1, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — CONV2D KATMANI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Conv2D Katmanı — Parametreler", "BÖLÜM 1");

  // Sol: parametreler
  card(s, 0.4, 0.95, 4.5, 2.4, { leftColor: C.acc });
  T.cardTitle(s, 0.65, 1.05, 4.0, "Temel Parametreler", C.acc);

  const params = [
    { name: "filters", desc: "Kaç farklı özellik haritası üretilecek (ör: 32, 64, 128)" },
    { name: "kernel_size", desc: "Filtre boyutu — genellikle (3,3) veya (5,5)" },
    { name: "strides", desc: "Filtrenin kaydırma adımı — (1,1) standart, (2,2) hızlı" },
    { name: "padding", desc: "'valid' (küçültür) veya 'same' (boyutu korur)" },
    { name: "activation", desc: "'relu' en yaygın — negatif değerleri sıfırlar" },
  ];
  params.forEach((p, i) => {
    const yy = 1.45 + i * 0.38;
    s.addText(p.name, { x: 0.65, y: yy, w: 1.2, h: 0.34, margin: 0, fontFace: "Consolas", fontSize: 9, bold: true, color: C.acc });
    s.addText(p.desc, { x: 1.9, y: yy, w: 2.85, h: 0.34, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.dark });
  });

  // Sağ: kod bloğu
  code(s, 5.15, 0.95, 4.45, 2.4, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "tensorflow.keras.layers ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "Conv2D\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# İlk evrişim katmanı\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "Conv2D(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    filters=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "32,\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "    kernel_size=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "(3, 3),\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "    strides=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "(1, 1),\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "    padding=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'same',\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "    activation=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'relu'\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: ")", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);

  // Alt: padding ve stride görsel açıklama
  card(s, 0.4, 3.55, 9.2, 1.6, { topColor: C.amber });
  T.cardTitle(s, 0.6, 3.7, 8.8, "Padding ve Stride — Görsel Karşılaştırma", C.amber);

  const comparisons = [
    { title: "padding='valid'", desc: "Filtre sadece tam sığdığı yerlere uygulanır.\nÇıktı boyutu küçülür:\n(H−K+1) × (W−K+1)", color: C.sec },
    { title: "padding='same'", desc: "Girdi sıfırlarla çevrelenir.\nÇıktı boyutu girdiye eşit kalır:\nH × W (stride=1 ise)", color: C.acc },
    { title: "stride=2", desc: "Filtre 2 piksel atlayarak kayar.\nÇıktı boyutu yarıya düşer:\nPooling'e alternatif.", color: C.purple },
  ];
  comparisons.forEach((c, i) => {
    const xx = 0.6 + i * 3.05;
    s.addText(c.title, { x: xx, y: 4.05, w: 2.8, h: 0.28, margin: 0, fontFace: "Consolas", fontSize: 10, bold: true, color: c.color });
    s.addText(c.desc, { x: xx, y: 4.33, w: 2.8, h: 0.7, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.dark });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — MAXPOOLING
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "MaxPooling — Boyut Küçültme", "BÖLÜM 1");

  // Sol: Açıklama
  card(s, 0.4, 0.95, 4.5, 2.0, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.1, 4.1, "MaxPooling2D Nedir?", C.acc);
  T.cardBody(s, 0.6, 1.5, 4.1, 1.3,
    "Her pencere (pool_size) içindeki en büyük değeri seçer. Böylece:\n" +
    "• Özellik haritası boyutu küçülür (hesaplama azalır)\n" +
    "• En belirgin özellikler korunur\n" +
    "• Küçük öteleme farklılıkları tolere edilir\n" +
    "• Overfitting riski azalır"
  );

  // Sağ: 2×2 MaxPool örneği (tablo)
  card(s, 5.15, 0.95, 4.45, 2.0, { topColor: C.sec });
  T.cardTitle(s, 5.35, 1.1, 4.0, "2×2 MaxPool Örneği", C.sec);

  // Girdi 4x4
  s.addText("Girdi (4×4)", { x: 5.35, y: 1.45, w: 2, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: C.mid });
  const inp = [[1,3,2,1],[5,6,1,0],[2,1,8,4],[3,0,2,7]];
  inp.forEach((row, ri) => {
    row.forEach((v, ci) => {
      const highlight = (ri < 2 && ci < 2) ? C.accPale : C.card;
      s.addText(String(v), { x: 5.35 + ci * 0.45, y: 1.72 + ri * 0.3, w: 0.45, h: 0.3, margin: 0, fontFace: "Consolas", fontSize: 10, color: C.dark, align: "center", valign: "middle", fill: { color: highlight }, line: { color: C.bdr, width: 0.5 } });
    });
  });

  // Ok
  s.addText("→", { x: 7.3, y: 2.15, w: 0.4, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 20, color: C.sec, align: "center" });

  // Çıktı 2x2
  s.addText("Çıktı (2×2)", { x: 7.75, y: 1.45, w: 2, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: C.mid });
  const outp = [[6,2],[3,8]];
  outp.forEach((row, ri) => {
    row.forEach((v, ci) => {
      s.addText(String(v), { x: 7.75 + ci * 0.55, y: 1.87 + ri * 0.4, w: 0.55, h: 0.4, margin: 0, fontFace: "Consolas", fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle", fill: { color: C.acc }, line: { color: C.bdr, width: 0.5 } });
    });
  });

  // Alt stat kutular
  stat(s, 0.4, 3.2, 2.2, 1.3, "÷4", "Boyut Küçültme\n(2×2 pool → ¼)", C.acc);
  stat(s, 2.85, 3.2, 2.2, 1.3, "0", "Öğrenilebilir\nParametre", C.sec);
  stat(s, 5.3, 3.2, 2.15, 1.3, "Max", "Havuzlama Tipi\n(Average da var)", C.amber);
  stat(s, 7.7, 3.2, 1.9, 1.3, "2×2", "Standart\nPool Boyutu", C.purple);

  // İpucu
  card(s, 0.4, 4.7, 9.2, 0.55, { leftColor: C.green });
  T.cardBody(s, 0.65, 4.78, 8.8, 0.4,
    "💡 İpucu: Stride=2 ile Conv2D, MaxPooling'in yerine kullanılabilir. Modern mimarilerde (ResNet) bu tercih edilir.",
    { size: 9.5, color: C.mid, italic: true }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — CIFAR-10 İLE CNN
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "CIFAR-10 ile CNN — Veri Seti Tanıtımı", "BÖLÜM 2");

  // Üst stat kutular
  stat(s, 0.4, 0.95, 1.8, 1.2, "10", "Sınıf", C.sec);
  stat(s, 2.4, 0.95, 1.8, 1.2, "60K", "Görüntü", C.acc);
  stat(s, 4.4, 0.95, 1.8, 1.2, "32×32", "Piksel", C.amber);
  stat(s, 6.4, 0.95, 1.5, 1.2, "RGB", "3 Kanal", C.purple);
  stat(s, 8.1, 0.95, 1.5, 1.2, "50K/10K", "Train/Test", C.blue);

  // Sınıflar tablosu
  card(s, 0.4, 2.35, 4.5, 2.9, { topColor: C.sec });
  T.cardTitle(s, 0.6, 2.5, 4.1, "10 Sınıf", C.sec);

  const classes = [
    ["Uçak (airplane)",       "Otomobil (automobile)"],
    ["Kuş (bird)",            "Kedi (cat)"],
    ["Geyik (deer)",          "Köpek (dog)"],
    ["Kurbağa (frog)",        "At (horse)"],
    ["Gemi (ship)",           "Kamyon (truck)"],
  ];
  classes.forEach((row, i) => {
    const yy = 2.88 + i * 0.42;
    const bg = i % 2 === 0 ? C.warmBg : C.card;
    s.addText(row[0], { x: 0.6, y: yy, w: 2.1, h: 0.38, margin: [0,6,0,6], fontFace: "Calibri", fontSize: 10, color: C.dark, fill: { color: bg } });
    s.addText(row[1], { x: 2.7, y: yy, w: 2.1, h: 0.38, margin: [0,6,0,6], fontFace: "Calibri", fontSize: 10, color: C.dark, fill: { color: bg } });
  });

  // Sağ: Model mimarisi
  card(s, 5.15, 2.35, 4.45, 2.9, { topColor: C.acc });
  T.cardTitle(s, 5.35, 2.5, 4.0, "Önerilen CNN Mimarisi", C.acc);

  const layers = [
    { layer: "Conv2D(32, 3×3) + ReLU",  out: "(32, 32, 32)", color: C.sec },
    { layer: "MaxPooling2D(2×2)",         out: "(16, 16, 32)", color: C.acc },
    { layer: "Conv2D(64, 3×3) + ReLU",  out: "(16, 16, 64)", color: C.sec },
    { layer: "MaxPooling2D(2×2)",         out: "(8, 8, 64)",   color: C.acc },
    { layer: "Conv2D(64, 3×3) + ReLU",  out: "(8, 8, 64)",   color: C.sec },
    { layer: "Flatten",                   out: "(4096,)",      color: C.amber },
    { layer: "Dense(64) + ReLU",         out: "(64,)",        color: C.purple },
    { layer: "Dense(10) + Softmax",      out: "(10,)",        color: C.red },
  ];
  layers.forEach((l, i) => {
    const yy = 2.88 + i * 0.28;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y: yy, w: 0.12, h: 0.25, fill: { color: l.color } });
    s.addText(l.layer, { x: 5.55, y: yy, w: 2.6, h: 0.25, margin: 0, fontFace: "Consolas", fontSize: 8.5, color: C.dark });
    s.addText(l.out, { x: 8.15, y: yy, w: 1.3, h: 0.25, margin: 0, fontFace: "Consolas", fontSize: 8.5, color: C.mid, align: "right" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — CIFAR-10 MODEL KODU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "CIFAR-10 — Tam Model Kodu", "BÖLÜM 2");

  code(s, 0.4, 0.95, 5.5, 4.15, [
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "tensorflow ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "as ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "tf\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "tensorflow.keras ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "layers, models\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Veri yükleme ve normalizasyon\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "(x_train, y_train), (x_test, y_test) = \\\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    tf.keras.datasets.cifar10.load_data()\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "x_train, x_test = x_train/255.0, x_test/255.0\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Model oluşturma\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "model = models.Sequential([\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "  layers.Conv2D(32,(3,3),activation=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'relu'", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: ",\n    input_shape=(32,32,3)),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "  layers.MaxPooling2D((2,2)),\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "  layers.Conv2D(64,(3,3),activation=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'relu'", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "  layers.MaxPooling2D((2,2)),\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "  layers.Conv2D(64,(3,3),activation=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'relu'", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "  layers.Flatten(),\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "  layers.Dense(64,activation=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'relu'", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "),\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "  layers.Dense(10,activation=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'softmax'", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n])\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
  ]);

  // Sağ: compile + fit kodu
  code(s, 6.15, 0.95, 3.45, 2.0, [
    { text: "# Derleme\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "model.compile(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "  optimizer=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'adam',\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "  loss=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'sparse_categorical_\n    crossentropy',\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "  metrics=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "['accuracy']\n)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
  ]);

  // Sağ alt: fit + sonuçlar
  code(s, 6.15, 3.15, 3.45, 1.0, [
    { text: "# Eğitim\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "history = model.fit(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "  x_train, y_train,\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "  epochs=10, batch_size=64,\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "  validation_split=0.2)\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
  ]);

  // Beklenen sonuç
  card(s, 6.15, 4.35, 3.45, 0.8, { leftColor: C.green });
  s.addText("Beklenen Sonuç", { x: 6.35, y: 4.4, w: 3.0, h: 0.25, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: C.green });
  s.addText("~70% doğruluk (10 epoch)\n~75% (data augmentation ile)", { x: 6.35, y: 4.65, w: 3.0, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.dark });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — TRANSFER LEARNING NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Transfer Learning Nedir?", "BÖLÜM 3");

  // Üst analoji kartı
  card(s, 0.4, 0.95, 9.2, 1.8, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 8.8, "Analoji: Bisiklet Süren Çocuk → Motosiklet", C.sec);
  T.cardBody(s, 0.6, 1.5, 8.8, 1.05,
    "Bisiklet sürmeyi öğrenen bir çocuk, motosiklete geçtiğinde sıfırdan başlamaz. Denge, yön kontrolü, fren refleksi gibi " +
    "temel becerileri transfer eder. Transfer Learning de aynı mantıkla çalışır: Büyük bir veri setinde (ImageNet — 14M görüntü) " +
    "eğitilmiş bir model, yeni ve küçük bir veri setine uyarlanır. Önceki bilgi, yeni göreve aktarılır."
  );

  // Akış diyagramı
  const flow = [
    { title: "1. Önceden Eğitilmiş\nModel (ImageNet)", desc: "1.2M görüntü\n1000 sınıf\nMilyonlarca parametre", color: C.acc },
    { title: "2. Üst Katmanları\nKaldır", desc: "Son Dense katmanları\nçıkarılır\n(sınıflandırma kafası)", color: C.amber },
    { title: "3. Yeni Katmanlar\nEkle", desc: "Kendi veri setinize\nuygun Dense/Softmax\nkatmanları eklenir", color: C.purple },
    { title: "4. Fine-tune veya\nFreeze + Train", desc: "Alt katmanları dondur\nveya düşük lr ile\ntümünü eğit", color: C.green },
  ];
  flow.forEach((f, i) => {
    const x = 0.4 + i * 2.35;
    card(s, x, 3.0, 2.15, 2.15, { topColor: f.color });
    s.addText(f.title, { x: x + 0.1, y: 3.15, w: 1.95, h: 0.6, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: f.color, align: "center" });
    s.addText(f.desc, { x: x + 0.1, y: 3.8, w: 1.95, h: 1.1, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, align: "center" });
    if (i < flow.length - 1) {
      s.addText("→", { x: x + 2.15, y: 3.7, w: 0.2, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 18, color: C.sec, align: "center", valign: "middle" });
    }
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — NEDEN TRANSFER LEARNING?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Neden Transfer Learning?", "BÖLÜM 3");

  // 3 büyük stat kutusu
  stat(s, 0.4, 0.95, 2.8, 1.8, "100×", "Daha Az Veri\nGereksinimi", C.sec);
  stat(s, 3.5, 0.95, 2.8, 1.8, "10×", "Daha Hızlı\nEğitim Süresi", C.acc);
  stat(s, 6.6, 0.95, 3.0, 1.8, "95%+", "Yüksek\nDoğruluk", C.green);

  // Alt karşılaştırma tablosu
  card(s, 0.4, 3.0, 9.2, 2.15, { topColor: C.purple });
  T.cardTitle(s, 0.6, 3.15, 8.8, "Sıfırdan Eğitim vs Transfer Learning", C.purple);

  const tRows = [
    ["Kriter",         "Sıfırdan CNN",           "Transfer Learning"],
    ["Veri",           "10.000+ görüntü gerekli", "100–1000 yeterli"],
    ["Eğitim Süresi",  "Saatler / Günler",       "Dakikalar"],
    ["GPU İhtiyacı",   "Güçlü GPU şart",         "CPU bile yeterli olabilir"],
    ["Doğruluk",       "Veriye bağlı, değişken", "Genellikle yüksek (%90+)"],
    ["Zorluk",         "Mimari tasarım gerekli",  "Hazır model seç, uyarla"],
  ];
  tRows.forEach((r, i) => {
    const yy = 3.52 + i * 0.27;
    const bg = i === 0 ? C.pri : (i % 2 === 0 ? C.warmBg : C.card);
    const fc = i === 0 ? "FFFFFF" : C.dark;
    s.addText(r[0], { x: 0.6, y: yy, w: 1.8, h: 0.27, margin: [0,4,0,4], fontFace: "Calibri", fontSize: 9.5, bold: i === 0, color: fc, fill: { color: bg } });
    s.addText(r[1], { x: 2.4, y: yy, w: 3.5, h: 0.27, margin: [0,4,0,4], fontFace: "Calibri", fontSize: 9.5, bold: i === 0, color: fc, fill: { color: bg } });
    s.addText(r[2], { x: 5.9, y: yy, w: 3.5, h: 0.27, margin: [0,4,0,4], fontFace: "Calibri", fontSize: 9.5, bold: i === 0, color: fc, fill: { color: bg } });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — ÖNCEDEN EĞİTİLMİŞ MODELLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Önceden Eğitilmiş Modeller — Karşılaştırma", "BÖLÜM 2");

  // Tablo
  card(s, 0.4, 0.95, 9.2, 3.0, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 8.8, "Popüler ImageNet Modelleri", C.sec);

  const headers = ["Model", "Yıl", "Parametre", "Top-1 Acc", "Boyut (MB)", "Hız", "Avantaj"];
  const widths  = [1.2, 0.6, 1.1, 0.9, 0.9, 0.8, 3.3];
  const data = [
    ["VGG16",      "2014", "138M",  "71.3%", "528",  "Yavaş", "Basit mimari, öğretici — eğitim amaçlı ideal"],
    ["ResNet50",   "2015", "25.6M", "76.0%", "98",   "Orta",  "Skip connection: derin ağlarda gradyan kaybını çözer"],
    ["InceptionV3","2015", "23.8M", "77.9%", "92",   "Orta",  "Paralel filtreler: farklı ölçekleri aynı anda yakalar"],
    ["MobileNetV2","2018", "3.4M",  "71.3%", "14",   "Hızlı", "Depthwise separable conv: mobil cihazlar için hafif"],
    ["EfficientB0","2019", "5.3M",  "77.1%", "29",   "Hızlı", "Compound scaling: genişlik × derinlik × çözünürlük"],
  ];

  // Header row
  let xOff = 0.6;
  headers.forEach((h, i) => {
    s.addText(h, { x: xOff, y: 1.48, w: widths[i], h: 0.3, margin: [0,3,0,3], fontFace: "Calibri", fontSize: 9, bold: true, color: "FFFFFF", fill: { color: C.pri } });
    xOff += widths[i];
  });

  data.forEach((row, ri) => {
    const yy = 1.78 + ri * 0.35;
    const bg = ri % 2 === 0 ? C.warmBg : C.card;
    let xx = 0.6;
    row.forEach((cell, ci) => {
      s.addText(cell, { x: xx, y: yy, w: widths[ci], h: 0.35, margin: [0,3,0,3], fontFace: ci === 0 ? "Georgia" : "Calibri", fontSize: 9, bold: ci === 0, color: C.dark, fill: { color: bg } });
      xx += widths[ci];
    });
  });

  // Alt öneri kartları
  const recs = [
    { title: "Eğitim İçin", model: "VGG16", desc: "Basit yapı, anlaşılması\nkolay, pedagojik", color: C.sec },
    { title: "Genel Kullanım", model: "ResNet50", desc: "Dengeli performans,\nen popüler seçim", color: C.acc },
    { title: "Mobil/Edge", model: "MobileNetV2", desc: "Hafif, hızlı, düşük\nkaynak tüketimi", color: C.green },
  ];
  recs.forEach((r, i) => {
    const x = 0.4 + i * 3.1;
    card(s, x, 4.2, 2.9, 1.0, { topColor: r.color });
    s.addText(r.title, { x: x + 0.1, y: 4.3, w: 1.3, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: r.color });
    s.addText(r.model, { x: x + 1.4, y: 4.3, w: 1.3, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.dark });
    s.addText(r.desc, { x: x + 0.1, y: 4.62, w: 2.7, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — FINE-TUNING VS FEATURE EXTRACTION
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Fine-tuning vs Feature Extraction", "BÖLÜM 3");

  // Sol kart: Feature Extraction
  card(s, 0.4, 0.95, 4.4, 3.2, { topColor: C.acc });
  T.cardTitle(s, 0.6, 1.15, 4.0, "Feature Extraction", C.acc);
  s.addText("Strateji:", { x: 0.6, y: 1.5, w: 4.0, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark });
  T.cardBody(s, 0.6, 1.75, 4.0, 1.0,
    "• Önceden eğitilmiş modelin TÜM katmanlarını dondur\n" +
    "• Sadece en üstteki sınıflandırma katmanlarını eğit\n" +
    "• Model, sabit bir özellik çıkarıcı olarak kullanılır"
  );
  s.addText("Ne Zaman?", { x: 0.6, y: 2.8, w: 4.0, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.acc });
  T.cardBody(s, 0.6, 3.05, 4.0, 0.85,
    "✓ Çok az veri olduğunda (100–500 görüntü)\n" +
    "✓ Hedef veri seti, kaynak veriye benzediğinde\n" +
    "✓ Hızlı sonuç istendiğinde\n" +
    "✓ GPU kaynağı sınırlı olduğunda"
  );

  // Sağ kart: Fine-tuning
  card(s, 5.05, 0.95, 4.55, 3.2, { topColor: C.sec });
  T.cardTitle(s, 5.25, 1.15, 4.1, "Fine-tuning", C.sec);
  s.addText("Strateji:", { x: 5.25, y: 1.5, w: 4.1, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark });
  T.cardBody(s, 5.25, 1.75, 4.1, 1.0,
    "• Önce Feature Extraction ile başla (birkaç epoch)\n" +
    "• Sonra bazı üst katmanları aç (unfreeze)\n" +
    "• Düşük learning rate ile tüm modeli eğit\n" +
    "• Temel özellikleri koruyarak yeni özellikleri öğret"
  );
  s.addText("Ne Zaman?", { x: 5.25, y: 2.8, w: 4.1, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.sec });
  T.cardBody(s, 5.25, 3.05, 4.1, 0.85,
    "✓ Daha fazla veri olduğunda (1000+)\n" +
    "✓ Hedef veri seti, kaynaktan farklı olduğunda\n" +
    "✓ Maksimum doğruluk hedeflendiğinde\n" +
    "✓ Eğitim süresi sorun olmadığında"
  );

  // Alt karar akışı
  card(s, 0.4, 4.35, 9.2, 0.85, { leftColor: C.amber });
  T.cardTitle(s, 0.65, 4.42, 8.8, "Karar Ağacı", C.amber);
  T.cardBody(s, 0.65, 4.72, 8.8, 0.35,
    "Az veri + benzer domain → Feature Extraction  |  Çok veri + farklı domain → Fine-tuning  |  Emin değilsen → Feature Extraction ile başla, sonuç yetersizse Fine-tune",
    { size: 9.5 }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — MOBILENET İLE KEDİ/KÖPEK
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "MobileNet ile Kedi/Köpek Sınıflandırma", "BÖLÜM 3");

  // Üst bilgi
  card(s, 0.4, 0.95, 3.8, 0.7, { leftColor: C.green });
  T.cardBody(s, 0.65, 1.02, 3.4, 0.5,
    "Az veri (2000 görüntü) ile %95+ doğruluk!\nMobileNetV2 + Feature Extraction stratejisi.",
    { size: 10, color: C.dark }
  );

  stat(s, 4.45, 0.95, 1.5, 0.7, "2K", "Görüntü", C.sec);
  stat(s, 6.15, 0.95, 1.5, 0.7, "95%+", "Doğruluk", C.green);
  stat(s, 7.85, 0.95, 1.75, 0.7, "~2dk", "Eğitim", C.acc);

  // Kod bloğu
  code(s, 0.4, 1.85, 9.2, 3.35, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "tensorflow.keras.applications ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "MobileNetV2\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "tensorflow.keras ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "layers, models\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# 1. Önceden eğitilmiş modeli yükle (ImageNet ağırlıkları)\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "base_model = MobileNetV2(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    weights=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'imagenet'", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: ",\n    include_top=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "False", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: ",  ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "# Sınıflandırma kafası YOK\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "    input_shape=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "(160, 160, 3)\n)\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# 2. Tüm katmanları dondur\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "base_model.trainable = ", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "False\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "# 3. Yeni sınıflandırma kafası ekle\n", options: { color: "6A9955", fontFace: "Consolas", fontSize: 9 } },
    { text: "model = models.Sequential([\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    base_model,\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    layers.GlobalAveragePooling2D(),\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    layers.Dense(1, activation=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'sigmoid'", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: ")\n])\n\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "model.compile(optimizer=", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "'adam'", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: ", loss=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "'binary_crossentropy'", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: ", metrics=", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "['accuracy'])\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — DATA AUGMENTATION
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Data Augmentation — Veri Çoğaltma", "BÖLÜM 3");

  // Sol açıklama
  card(s, 0.4, 0.95, 4.5, 1.6, { topColor: C.amber });
  T.cardTitle(s, 0.6, 1.1, 4.1, "Neden Veri Çoğaltma?", C.amber);
  T.cardBody(s, 0.6, 1.48, 4.1, 0.9,
    "Az veri ile eğitim yaparken overfitting kaçınılmazdır. Data Augmentation, mevcut " +
    "görüntülere rastgele dönüşümler uygulayarak sanal olarak veri setini büyütür. " +
    "Model farklı açılardan aynı nesneyi görmeyi öğrenir."
  );

  // Sağ: ImageDataGenerator kodu
  code(s, 5.15, 0.95, 4.45, 1.6, [
    { text: "from ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "tensorflow.keras.preprocessing\\\n  .image ", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "import ", options: { color: C.codeBlue, fontFace: "Consolas", fontSize: 9 } },
    { text: "ImageDataGenerator\n\n", options: { color: C.codeGreen, fontFace: "Consolas", fontSize: 9 } },
    { text: "datagen = ImageDataGenerator(\n", options: { color: C.codeWhite, fontFace: "Consolas", fontSize: 9 } },
    { text: "    rotation_range=20,\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    horizontal_flip=True,\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    zoom_range=0.2,\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
    { text: "    width_shift_range=0.1)\n", options: { color: C.codeYellow, fontFace: "Consolas", fontSize: 9 } },
  ]);

  // Augmentation teknikleri grid
  const augs = [
    { title: "Rotation", desc: "±20° rastgele döndürme.\nNesne açısı değişse de\ntanınmalı.", color: C.sec, param: "rotation_range=20" },
    { title: "Horizontal Flip", desc: "Yatay aynalama.\nSol-sağ simetrisi olan\nnesneler için ideal.", color: C.acc, param: "horizontal_flip=True" },
    { title: "Zoom", desc: "±%20 yakınlaştırma.\nNesne boyutu değişse\nde tanınmalı.", color: C.amber, param: "zoom_range=0.2" },
    { title: "Shift", desc: "Yatay/dikey kaydırma.\nNesne konumu değişse\nde tanınmalı.", color: C.purple, param: "width_shift_range=0.1" },
  ];
  augs.forEach((a, i) => {
    const x = 0.4 + i * 2.35;
    card(s, x, 2.8, 2.15, 2.35, { topColor: a.color });
    s.addText(a.title, { x: x + 0.1, y: 2.95, w: 1.95, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: a.color, align: "center" });
    s.addText(a.desc, { x: x + 0.1, y: 3.3, w: 1.95, h: 0.9, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, align: "center" });
    s.addText(a.param, { x: x + 0.1, y: 4.3, w: 1.95, h: 0.3, margin: 0, fontFace: "Consolas", fontSize: 8, color: a.color, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — MODEL DEĞERLENDİRME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Model Değerlendirme — Accuracy/Loss Grafikleri", "BÖLÜM 3");

  // Sol: Accuracy grafik yorumlama
  card(s, 0.4, 0.95, 4.5, 2.0, { topColor: C.green });
  T.cardTitle(s, 0.6, 1.1, 4.1, "Accuracy (Doğruluk) Grafiği", C.green);
  T.cardBody(s, 0.6, 1.48, 4.1, 1.3,
    "• Train accuracy sürekli artar\n" +
    "• Validation accuracy bir noktada düzleşir\n" +
    "• İkisi arasındaki fark KÜÇÜK → İyi model\n" +
    "• İkisi arasındaki fark BÜYÜK → Overfitting!\n" +
    "• Val accuracy düşmeye başlarsa eğitimi durdur"
  );

  // Sağ: Loss grafik yorumlama
  card(s, 5.15, 0.95, 4.45, 2.0, { topColor: C.red });
  T.cardTitle(s, 5.35, 1.1, 4.0, "Loss (Kayıp) Grafiği", C.red);
  T.cardBody(s, 5.35, 1.48, 4.0, 1.3,
    "• Train loss sürekli düşer\n" +
    "• Validation loss bir noktada düzleşir\n" +
    "• Val loss artmaya başlarsa → Overfitting!\n" +
    "• Train loss = Val loss → İdeal durum\n" +
    "• EarlyStopping callback ile otomatik durdur"
  );

  // Alt: Overfitting tespiti ve çözümleri
  card(s, 0.4, 3.2, 9.2, 2.0, { topColor: C.amber });
  T.cardTitle(s, 0.6, 3.35, 8.8, "Overfitting Tespiti ve Çözümleri", C.amber);

  const solutions = [
    { num: "1", title: "Data Augmentation", desc: "Veri çeşitliliğini artırarak modelin\nezberleme yerine genellemesini sağlar", color: C.sec },
    { num: "2", title: "Dropout", desc: "Eğitimde rastgele nöronları kapatarak\nbağımlılıkları kırar (0.2–0.5)", color: C.acc },
    { num: "3", title: "EarlyStopping", desc: "Val loss artmaya başlayınca eğitimi\notomatik durdurur (patience=5)", color: C.amber },
    { num: "4", title: "Regularization", desc: "L2 regularization ile büyük ağırlıkları\ncezalandırır, modeli basitleştirir", color: C.purple },
  ];
  solutions.forEach((sol, i) => {
    const x = 0.5 + i * 2.25;
    badge(s, x, 3.75, sol.num, sol.color);
    s.addText(sol.title, { x: x + 0.42, y: 3.75, w: 1.7, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: sol.color });
    s.addText(sol.desc, { x: x, y: 4.12, w: 2.1, h: 0.75, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — MASKE TESPİTİ ÖRNEĞİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Gerçek Dünya: Maske Tespiti Uygulaması", "BÖLÜM 4");

  // Üst: Proje tanıtımı
  card(s, 0.4, 0.95, 9.2, 1.3, { topColor: C.red });
  T.cardTitle(s, 0.6, 1.1, 8.8, "COVID-19 Maske Tespiti — Transfer Learning ile", C.red);
  T.cardBody(s, 0.6, 1.48, 8.8, 0.6,
    "Gerçek bir pandemi döneminde ortaya çıkan ihtiyaç: Maskeli ve maskesiz yüzleri ayırt eden bir model. " +
    "MobileNetV2 + Transfer Learning ile sadece 1000 görüntü kullanarak %98+ doğruluk elde edilebilir."
  );

  // Proje adımları
  const steps = [
    { num: "1", title: "Veri Toplama", desc: "Kaggle'dan maskeli/maskesiz\nyüz görüntüleri indirme\n(~1000 görüntü yeterli)", color: C.sec },
    { num: "2", title: "Ön İşleme", desc: "Yeniden boyutlandırma (224×224)\nNormalizasyon (0-1)\nData Augmentation", color: C.acc },
    { num: "3", title: "Model Kurulumu", desc: "MobileNetV2 (frozen)\n+ GlobalAveragePooling\n+ Dense(1, sigmoid)", color: C.amber },
    { num: "4", title: "Eğitim", desc: "Binary crossentropy\nAdam optimizer\n5 epoch yeterli", color: C.purple },
    { num: "5", title: "Değerlendirme", desc: "Accuracy: %98+\nConfusion Matrix\nSınıf bazlı F1-score", color: C.green },
  ];

  steps.forEach((st, i) => {
    const x = 0.3 + i * 1.9;
    card(s, x, 2.5, 1.75, 2.4, { topColor: st.color });
    badge(s, x + 0.65, 2.65, st.num, st.color);
    s.addText(st.title, { x: x + 0.1, y: 3.1, w: 1.55, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: st.color, align: "center" });
    s.addText(st.desc, { x: x + 0.1, y: 3.42, w: 1.55, h: 1.2, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, align: "center" });
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
      num: "1",
      title: "CNN Temel",
      file: "hafta12_cnn_temel.ipynb",
      desc: "CIFAR-10 ile sıfırdan CNN modeli oluşturma. Conv2D, MaxPooling, Flatten ve Dense katmanlarını " +
            "adım adım ekleme, model.summary() ile parametreleri inceleme, ~70% doğruluk elde etme.",
      topics: "Conv2D · MaxPooling · Flatten · Dense · model.summary() · history plot",
      color: C.sec,
    },
    {
      num: "2",
      title: "Transfer Learning",
      file: "hafta12_transfer_learning.ipynb",
      desc: "MobileNetV2 ile kedi/köpek sınıflandırma. Feature Extraction stratejisi, katman dondurma, " +
            "yeni sınıflandırma kafası ekleme, Data Augmentation ile doğruluğu artırma.",
      topics: "MobileNetV2 · Feature Extraction · Fine-tuning · ImageDataGenerator",
      color: C.acc,
    },
    {
      num: "3",
      title: "Maske Tespiti",
      file: "hafta12_maske_tespiti.ipynb",
      desc: "Gerçek dünya uygulaması: COVID-19 maske tespiti. Kaggle veri seti, ön işleme pipeline, " +
            "MobileNetV2 ile Transfer Learning, confusion matrix ve sınıf bazlı metrikler.",
      topics: "Kaggle veri · Pipeline · Confusion Matrix · Classification Report",
      color: C.amber,
    },
  ];

  notebooks.forEach((nb, i) => {
    const y = 0.95 + i * 1.55;
    card(s, 0.4, y, 9.2, 1.4, { leftColor: nb.color });

    // Numara badge
    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: y + 0.25, w: 0.7, h: 0.85, fill: { color: nb.color } });
    s.addText(nb.num, { x: 0.55, y: y + 0.25, w: 0.7, h: 0.5, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText("NB", { x: 0.55, y: y + 0.7, w: 0.7, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 9, color: "FFFFFF", align: "center" });

    // Başlık ve dosya adı
    s.addText(nb.title, { x: 1.45, y: y + 0.08, w: 3, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: nb.color });
    s.addText(nb.file, { x: 4.5, y: y + 0.12, w: 5, h: 0.25, margin: 0, fontFace: "Consolas", fontSize: 9, color: C.mid });

    // Açıklama
    s.addText(nb.desc, { x: 1.45, y: y + 0.4, w: 7.9, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.dark });

    // Konu etiketleri
    s.addText(nb.topics, { x: 1.45, y: y + 1.0, w: 7.9, h: 0.25, margin: 0, fontFace: "Consolas", fontSize: 8.5, color: nb.color });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Ödev ve Kaynaklar", "BÖLÜM 4");

  // Sol: Ödev
  card(s, 0.4, 0.95, 5.3, 3.5, { topColor: C.sec });
  T.cardTitle(s, 0.6, 1.1, 5.0, "Haftalık Ödev", C.sec);

  const tasks = [
    { num: "1", text: "Kendi veri setinizi hazırlayın: En az 2 sınıf, sınıf başına 200+ görüntü (Kaggle veya Google Images)", color: C.sec },
    { num: "2", text: "Transfer Learning ile sınıflandırma modeli kurun: MobileNetV2 veya ResNet50 kullanarak Feature Extraction uygulayın", color: C.acc },
    { num: "3", text: "Data Augmentation ekleyin: rotation, flip, zoom, shift dönüşümleri ile veri çeşitliliğini artırın", color: C.amber },
    { num: "4", text: "%90+ doğruluk hedefleyin: Accuracy/Loss grafiklerini çizin, overfitting varsa önlem alın", color: C.green },
    { num: "5", text: "Confusion Matrix ve Classification Report oluşturun: Sınıf bazlı precision, recall, F1-score raporlayın", color: C.purple },
  ];
  tasks.forEach((t, i) => {
    const yy = 1.48 + i * 0.55;
    badge(s, 0.6, yy, t.num, t.color);
    s.addText(t.text, { x: 1.05, y: yy, w: 4.4, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.dark, valign: "middle" });
  });

  // Sağ: Kaynaklar
  card(s, 5.95, 0.95, 3.65, 3.5, { topColor: C.acc });
  T.cardTitle(s, 6.15, 1.1, 3.3, "Faydalı Kaynaklar", C.acc);

  const resources = [
    { title: "TensorFlow CNN Eğitimi", desc: "tensorflow.org/tutorials/images/cnn", color: C.sec },
    { title: "Transfer Learning Guide", desc: "tensorflow.org/tutorials/images/transfer_learning", color: C.acc },
    { title: "Keras Applications", desc: "keras.io/api/applications/\n(tüm önceden eğitilmiş modeller)", color: C.amber },
    { title: "Kaggle Datasets", desc: "kaggle.com/datasets\n(cats-vs-dogs, face-mask)", color: C.purple },
    { title: "CS231n (Stanford)", desc: "cs231n.stanford.edu\n(CNN teorisi derinlemesine)", color: C.green },
  ];
  resources.forEach((r, i) => {
    const yy = 1.48 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.15, y: yy, w: 0.08, h: 0.45, fill: { color: r.color } });
    s.addText(r.title, { x: 6.35, y: yy, w: 3.0, h: 0.22, margin: 0, fontFace: "Georgia", fontSize: 9.5, bold: true, color: r.color });
    s.addText(r.desc, { x: 6.35, y: yy + 0.22, w: 3.0, h: 0.28, margin: 0, fontFace: "Calibri", fontSize: 8.5, color: C.mid });
  });

  // Alt: Deadline
  card(s, 0.4, 4.65, 9.2, 0.55, { leftColor: C.red });
  T.cardBody(s, 0.65, 4.72, 8.8, 0.4,
    "Teslim: Hafta 13 dersi öncesi · Jupyter Notebook (.ipynb) + PDF rapor · Google Colab linki de kabul edilir",
    { size: 10, color: C.dark }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 12 — Özet",
  [
    { text: "CNN, görüntü verisinde uzamsal ilişkileri öğrenen özel bir derin öğrenme mimarisidir", color: C.sec },
    { text: "Conv2D → MaxPool → Flatten → Dense pipeline'ı ile özellik çıkarımı ve sınıflandırma yapılır", color: C.acc },
    { text: "Transfer Learning, büyük modellerin bilgisini küçük veri setlerine aktarmanın en etkili yoludur", color: C.amber },
    { text: "MobileNetV2 gibi hafif modeller, az veri ile bile %95+ doğruluk sağlar", color: C.green },
    { text: "Data Augmentation + EarlyStopping + Dropout: overfitting'e karşı üçlü kalkan", color: C.purple },
  ],
  "Görmek, inanmaktır. Bilgisayarların görmesini sağlamak ise mühendisliktir.",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// DOSYA KAYDET
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta12_cnn_transfer_learning.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("✅ Sunum oluşturuldu:", outPath))
  .catch(err => { console.error("❌ Hata:", err); process.exit(1); });
