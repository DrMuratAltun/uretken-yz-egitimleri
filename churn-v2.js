const pptxgen = require("pptxgenjs");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Müşteri Terk Analizi";
pres.author = "Dr. Murat Altun";

// ── PALET ─────────────────────────────────────────────────
const C = {
  pri:    "5B2C1E",  // koyu kahve-bordo
  priLt:  "8B5E3C",  // açık kahve
  sec:    "C97B5A",  // warm coral
  secLt:  "E8C4A8",  // pastel coral
  acc:    "2B7A78",  // teal
  accLt:  "3DA8A5",  // açık teal
  accPale:"E0F2F1",  // çok açık teal
  cream:  "FFF9F3",  // krem arka plan
  warmBg: "FEF5EE",  // sıcak arka plan
  card:   "FFFFFF",  // kart beyaz
  dark:   "2E1F1A",  // ana metin
  mid:    "6B5B52",  // ikincil metin
  subtle: "A39585",  // soluk metin
  bdr:    "E8DDD3",  // kart kenarlığı
  red:    "D94F4F",
  green:  "3A9E6B",
  amber:  "E8913A",
  purple: "7C5BBF",
  blue:   "4A7FC7",
  pink:   "D4688E",
};

// ── YARDIMCILAR ──────────────────────────────────────────

const mkShadow = () => ({ type: "outer", color: "000000", opacity: 0.08, blur: 5, offset: 2, angle: 135 });

function slideHeader(s, title, section, bgColor) {
  s.background = { color: bgColor || C.cream };
  // üst bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: C.pri } });
  // teal accent altında
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.75, w: 10, h: 0.05, fill: { color: C.acc } });
  // başlık
  s.addText(title, {
    x: 0.5, y: 0, w: 7.5, h: 0.75, margin: 0,
    fontFace: "Georgia", fontSize: 20, bold: true, color: "FFFFFF", valign: "middle"
  });
  // bölüm etiketi
  if (section) {
    s.addShape(pres.shapes.RECTANGLE, { x: 8.2, y: 0.18, w: 1.6, h: 0.38, fill: { color: C.acc } });
    s.addText(section, { x: 8.2, y: 0.18, w: 1.6, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  }
  // sayfa numarası
  s.addText([{ text: "", options: { field: "slidenum" } }, { text: " / 24" }], { x: 8.8, y: 5.22, w: 1.0, h: 0.35, fontFace: "Calibri", fontSize: 8, color: C.subtle, align: "right" });
}

function addCard(s, x, y, w, h, opts = {}) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.bg || C.card },
    line: { color: opts.border || C.bdr, width: 1 },
    shadow: opts.noShadow ? undefined : mkShadow()
  });
  if (opts.topColor) {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.06, fill: { color: opts.topColor } });
  }
  if (opts.leftColor) {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: opts.leftColor } });
  }
}

function cardTitle(s, x, y, w, text, color) {
  s.addText(text, { x, y, w, h: 0.38, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: color || C.pri });
}

function cardBody(s, x, y, w, h, text, opts = {}) {
  s.addText(text, { x, y, w, h, margin: 0, fontFace: "Calibri", fontSize: opts.size || 11, color: opts.color || C.dark, italic: opts.italic });
}

function numBadge(s, x, y, num, color) {
  s.addShape(pres.shapes.OVAL, { x, y, w: 0.36, h: 0.36, fill: { color: color || C.acc } });
  s.addText(String(num), { x, y, w: 0.36, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
}

function statBox(s, x, y, w, h, value, label, color) {
  addCard(s, x, y, w, h, { topColor: color });
  s.addText(value, { x, y: y + 0.15, w, h: 0.65, margin: 0, fontFace: "Georgia", fontSize: 34, bold: true, color, align: "center" });
  s.addText(label, { x: x + 0.1, y: y + 0.82, w: w - 0.2, h: h - 0.92, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid, align: "center" });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 1 — KAPAK
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.pri };

  // dekoratif sol panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.acc } });
  // dekoratif sağ panel
  s.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: 0, w: 3.5, h: 5.625, fill: { color: "4A2518" } });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: 0, w: 0.05, h: 5.625, fill: { color: C.sec } });

  // Ders etiketi
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.6, w: 2.4, h: 0.34, fill: { color: C.acc } });
  s.addText("VER\u0130 B\u0130L\u0130M\u0130 DERS\u0130", { x: 0.5, y: 0.6, w: 2.4, h: 0.34, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle", charSpacing: 3 });

  // Ana başlık
  s.addText("M\u00fc\u015fteri Terk\nAnalizi", {
    x: 0.5, y: 1.2, w: 5.6, h: 2.0, margin: 0,
    fontFace: "Georgia", fontSize: 48, bold: true, color: "FFFFFF"
  });
  // Alt çizgi
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.25, w: 3.0, h: 0.05, fill: { color: C.sec } });
  // Alt başlık
  s.addText("Churn Analysis: Nedenler, G\u00f6stergeler,\nTahmin Modelleri ve \u00d6nleme Stratejileri", {
    x: 0.5, y: 3.45, w: 5.6, h: 0.8, margin: 0,
    fontFace: "Calibri", fontSize: 15, color: C.secLt, italic: true
  });
  // İsim
  s.addText("Dr. Murat Alt\u00fcn", { x: 0.5, y: 4.65, w: 3, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 13, color: C.sec, bold: true });
  s.addText("Veri Bilimi ve Yapay Zek\u00e2 E\u011fitimi  \u00b7  2026", { x: 0.5, y: 4.96, w: 5, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.subtle });

  // Sağ panel: anahtar rakamlar
  const rstats = [
    { v: "%68", d: "M\u00fc\u015fterilerin sessizce\nterk etti\u011fi oran" },
    { v: "5x",  d: "Yeni m\u00fc\u015fteri edinmenin\nelde tutmaya oran\u0131" },
    { v: "%25-95", d: "Elde tutma art\u0131\u015f\u0131n\u0131n\nk\u00e2ra etkisi" },
    { v: "%80+", d: "ML modellerin terk\ntahmin do\u011frulu\u011fu" },
  ];
  rstats.forEach((r, i) => {
    const yy = 0.35 + i * 1.32;
    s.addText(r.v, { x: 6.7, y: yy, w: 3.1, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 32, bold: true, color: C.sec, align: "center" });
    s.addText(r.d, { x: 6.7, y: yy + 0.55, w: 3.1, h: 0.52, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.secLt, align: "center" });
    if (i < 3) s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: yy + 1.15, w: 2.1, h: 0.02, fill: { color: "6B3A28" } });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "\u0130\u00e7indekiler", null);

  const sections = [
    { num: "01", title: "Temel Kavramlar", items: "Tan\u0131m \u00b7 T\u00fcrler \u00b7 \u0130statistikler \u00b7 Form\u00fcl \u00b7 Sekt\u00f6rler", color: C.sec, slides: "Slayt 3-8" },
    { num: "02", title: "Analiz ve Veri Haz\u0131rl\u0131k", items: "Erken uyar\u0131lar \u00b7 Ya\u015fam d\u00f6ng\u00fcs\u00fc \u00b7 RFM \u00b7 Kohort \u00b7 Feature Engineering", color: C.acc, slides: "Slayt 9-14" },
    { num: "03", title: "Tahmin Modelleri", items: "Lojistik Regresyon \u00b7 Random Forest \u00b7 XGBoost \u00b7 De\u011ferlendirme \u00b7 ROC", color: C.amber, slides: "Slayt 15-20" },
    { num: "04", title: "\u00d6nleme ve Uygulama", items: "\u00d6nleme stratejileri \u00b7 Segmentasyon \u00b7 Vaka \u00e7al\u0131\u015fmas\u0131 \u00b7 \u00d6zet", color: C.purple, slides: "Slayt 21-24" },
  ];

  sections.forEach((sec, i) => {
    const y = 1.05 + i * 1.1;
    addCard(s, 0.5, y, 9.0, 0.92, { leftColor: sec.color });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.56, y: y + 0.15, w: 0.7, h: 0.6, fill: { color: sec.color } });
    s.addText(sec.num, { x: 0.56, y: y + 0.15, w: 0.7, h: 0.6, margin: 0, fontFace: "Georgia", fontSize: 20, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(sec.title, { x: 1.4, y: y + 0.1, w: 5, h: 0.42, margin: 0, fontFace: "Georgia", fontSize: 15, bold: true, color: C.dark });
    s.addText(sec.items, { x: 1.4, y: y + 0.52, w: 5, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid });
    s.addText(sec.slides, { x: 7.8, y: y + 0.24, w: 1.5, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10, color: sec.color, bold: true, align: "right" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 3 — MÜŞTERİ TERKİ NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "M\u00fc\u015fteri Terki Nedir?", "B\u00d6L\u00dcM 1");

  // Sol: tanım
  addCard(s, 0.4, 1.0, 5.3, 4.4, { leftColor: C.sec });
  cardTitle(s, 0.6, 1.1, 4.8, "Tan\u0131m");
  cardBody(s, 0.6, 1.52, 4.9, 1.0,
    "M\u00fc\u015fteri terki (churn), bir m\u00fc\u015fterinin belirli bir zaman dilimi i\u00e7inde bir \u00fcr\u00fcn veya hizmeti kullanmay\u0131 b\u0131rakmas\u0131d\u0131r. Abonelik iptali, hesap kapatma veya uzun s\u00fcreli etkile\u015fimsizlik \u015feklinde g\u00f6r\u00fclebilir."
  );

  // Benzetme kutusu
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.65, w: 4.9, h: 0.85, fill: { color: C.accPale }, line: { color: C.acc, width: 1 } });
  s.addText([
    { text: "Benzetme: ", options: { bold: true, color: C.acc } },
    { text: "Bir restoran d\u00fc\u015f\u00fcn\u00fcn. M\u00fc\u015fteriler bir kez gelip bir daha gelmiyorsa, bu terk demektir. Sorun yemekte mi, serviste mi, fiyatta m\u0131? Terk analizi tam olarak bunu sorgular." }
  ], { x: 0.72, y: 2.7, w: 4.65, h: 0.75, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark });

  // Alt: formül özet
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.68, w: 4.9, h: 0.5, fill: { color: "FFF3E8" }, line: { color: C.sec, width: 1 } });
  s.addText([
    { text: "Terk Oran\u0131 = ", options: { bold: true, color: C.pri } },
    { text: "(Kaybedilen M\u00fc\u015fteri / D\u00f6nem Ba\u015f\u0131 Toplam M\u00fc\u015fteri) \u00d7 100", options: { color: C.dark } }
  ], { x: 0.72, y: 3.68, w: 4.65, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 11, valign: "middle" });

  // Anahtar terimler
  cardTitle(s, 0.6, 4.32, 4.8, "Anahtar Terimler", C.acc);
  const terms = [
    ["Churn Rate", "Belirli d\u00f6nemdeki terk oran\u0131"],
    ["Retention Rate", "Elde tutma oran\u0131 (1 - terk oran\u0131)"],
    ["CLV", "M\u00fc\u015fteri ya\u015fam boyu de\u011feri"],
  ];
  terms.forEach(([t, d], i) => {
    const yy = 4.72 + i * 0.22;
    s.addText([{ text: t + ": ", options: { bold: true, color: C.acc, fontSize: 10 } }, { text: d, options: { fontSize: 10, color: C.mid } }], {
      x: 0.72, y: yy, w: 4.7, h: 0.22, margin: 0, fontFace: "Calibri"
    });
  });

  // Sağ: Pie chart
  addCard(s, 5.9, 1.0, 3.7, 4.4, { topColor: C.acc });
  cardTitle(s, 6.1, 1.15, 3.3, "Tipik M\u00fc\u015fteri Da\u011f\u0131l\u0131m\u0131", C.acc);
  s.addChart(pres.charts.DOUGHNUT, [{
    name: "Durum",
    labels: ["Sadık", "Riskli", "Terk Eden"],
    values: [55, 25, 20]
  }], {
    x: 6.2, y: 1.55, w: 3.3, h: 2.6,
    chartColors: [C.green, C.amber, C.red],
    showPercent: true,
    showTitle: false,
    showLegend: true,
    legendPos: "b",
    legendFontSize: 9,
    dataLabelColor: C.dark,
  });
  s.addText("Tipik bir i\u015fletmede m\u00fc\u015fterilerin yakla\u015f\u0131k %20\u2019si her y\u0131l terk eder, %25\u2019i ise risk alt\u0131ndad\u0131r.", {
    x: 6.1, y: 4.3, w: 3.3, h: 0.6, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, italic: true
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — TERK TÜRLERİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Terk T\u00fcrleri", "B\u00d6L\u00dcM 1");

  const types = [
    { title: "G\u00f6n\u00fcll\u00fc Terk", color: C.red,
      desc: "M\u00fc\u015fteri bilin\u00e7li olarak ayr\u0131l\u0131r. Abonelik iptal eder, hesab\u0131n\u0131 kapat\u0131r veya rakibe ge\u00e7er.",
      examples: ["Abonelik iptali", "Hesap silme talebi", "Rakip \u00fcr\u00fcne ge\u00e7i\u015f"],
      pct: "~%60-70" },
    { title: "Zorunlu Terk", color: C.amber,
      desc: "\u00d6deme ba\u015far\u0131s\u0131zl\u0131\u011f\u0131, kredi kart\u0131 s\u00fcresi dolmas\u0131 veya d\u0131\u015f etkenler nedeniyle olu\u015fur.",
      examples: ["\u00d6deme ba\u015far\u0131s\u0131zl\u0131\u011f\u0131", "Kredi kart\u0131 ge\u00e7ersiz", "Hizmet d\u0131\u015f\u0131 b\u00f6lge"],
      pct: "~%20-30" },
    { title: "Sessiz Terk", color: C.purple,
      desc: "Resmi bir iptal olmadan kullan\u0131m azal\u0131r ve sonunda s\u0131f\u0131rlan\u0131r. En tehlikeli t\u00fcr.",
      examples: ["Giri\u015f s\u0131kl\u0131\u011f\u0131 d\u00fc\u015f\u00fc\u015f\u00fc", "Sat\u0131n alma duraksar", "Etkile\u015fim s\u0131f\u0131rlan\u0131r"],
      pct: "~%10-20" },
  ];

  types.forEach((t, i) => {
    const x = 0.35 + i * 3.15;
    addCard(s, x, 0.95, 3.0, 4.45, { topColor: t.color });

    // Üst yüzde rozeti
    s.addShape(pres.shapes.RECTANGLE, { x: x + 1.85, y: 1.08, w: 1.0, h: 0.3, fill: { color: t.color } });
    s.addText(t.pct, { x: x + 1.85, y: 1.08, w: 1.0, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

    s.addText(t.title, { x: x + 0.15, y: 1.08, w: 1.7, h: 0.42, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: t.color });
    cardBody(s, x + 0.15, y = 1.55, 2.7, 1.1, t.desc);

    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 2.72, w: 2.7, h: 0.02, fill: { color: C.bdr } });
    s.addText("\u00d6rnekler", { x: x + 0.15, y: 2.82, w: 2.7, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.mid });
    t.examples.forEach((ex, j) => {
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.18, y: 3.18 + j * 0.4 + 0.07, w: 0.05, h: 0.22, fill: { color: t.color } });
      s.addText(ex, { x: x + 0.32, y: 3.18 + j * 0.4, w: 2.5, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark });
    });

    // Alt uyarı
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: 4.55, w: 2.8, h: 0.72, fill: { color: C.warmBg }, line: { color: C.bdr, width: 1 } });
    const warnings = [
      "En \u00e7ok g\u00f6r\u00fclen t\u00fcr.\nM\u00fc\u015fteri memnuniyetsizli\u011fi ile do\u011frudan ili\u015fkili.",
      "\u00d6nlenebilir t\u00fcr!\nOtomatik \u00f6deme hat\u0131rlatmalar\u0131 ile azalt\u0131labilir.",
      "En sinsi t\u00fcr.\nErken uyar\u0131 sistemi\nkurmak \u015fart."
    ];
    s.addText(warnings[i], { x: x + 0.18, y: 4.58, w: 2.65, h: 0.66, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, italic: true });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — NEDEN ÖNEMLİ?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Neden Bu Kadar \u00d6nemli?", "B\u00d6L\u00dcM 1");

  s.addText("M\u00fc\u015fteri terki, i\u015fletmelerin gelir kayb\u0131n\u0131n en b\u00fcy\u00fck nedenlerinden biridir. Rakamlarla bak\u0131ld\u0131\u011f\u0131nda:", {
    x: 0.4, y: 0.88, w: 9.2, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 12, color: C.mid, italic: true
  });

  statBox(s, 0.35, 1.45, 2.15, 1.65, "5-25x", "Yeni m\u00fc\u015fteri edinme maliyeti\nelde tutmaya k\u0131yasla", C.acc);
  statBox(s, 2.7, 1.45, 2.15, 1.65, "%67", "Daha iyi deneyim sunan\nrakibe ge\u00e7i\u015f oran\u0131", C.red);
  statBox(s, 5.05, 1.45, 2.15, 1.65, "%95", "Elde tutma %5 art\u0131nca\nk\u00e2r art\u0131\u015f \u00fcst s\u0131n\u0131r\u0131", C.green);
  statBox(s, 7.4, 1.45, 2.25, 1.65, "$1.6T", "ABD\u2019de y\u0131ll\u0131k m\u00fc\u015fteri\nterk kaybı (tahmini)", C.amber);

  // Alt grafik: elde tutma vs kâr ilişkisi
  addCard(s, 0.35, 3.35, 4.5, 2.15, { topColor: C.green });
  cardTitle(s, 0.55, 3.48, 4.0, "Elde Tutma ve K\u00e2r \u0130li\u015fkisi", C.green);
  s.addChart(pres.charts.BAR, [{
    name: "Kâr Artışı (%)",
    labels: ["+%1", "+%2", "+%3", "+%4", "+%5"],
    values: [10, 22, 38, 58, 85]
  }], {
    x: 0.4, y: 3.9, w: 4.3, h: 1.5,
    barDir: "col",
    chartColors: [C.green],
    showValue: true, dataLabelColor: C.dark, dataLabelPosition: "outEnd",
    catAxisLabelColor: C.mid, valAxisLabelColor: C.mid,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: false,
  });

  // Alt sağ: maliyet karşılaştırma
  addCard(s, 5.05, 3.35, 4.6, 2.15, { topColor: C.sec });
  cardTitle(s, 5.25, 3.48, 4.2, "Maliyet Kar\u015f\u0131la\u015ft\u0131rmas\u0131", C.sec);
  const costs = [
    ["Yeni müşteri edinme", "₺250-500", C.red],
    ["Mevcut müşteriyi elde tutma", "₺50-100", C.green],
    ["Kaybedilen müşteriyi geri kazanma", "₺150-350", C.amber],
  ];
  costs.forEach(([label, cost, clr], i) => {
    const yy = 3.95 + i * 0.5;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: yy + 0.06, w: 0.35, h: 0.35, fill: { color: clr } });
    s.addText(label, { x: 5.7, y: yy, w: 2.6, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark, valign: "middle" });
    s.addText(cost, { x: 8.45, y: yy, w: 1.0, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 12, bold: true, color: clr, align: "right", valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — TERK ORANI HESAPLAMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Terk Oran\u0131 Nas\u0131l Hesaplan\u0131r?", "B\u00d6L\u00dcM 1");

  // Formül kutusu (büyük)
  addCard(s, 0.4, 0.95, 9.2, 1.5, { topColor: C.sec });
  s.addText("Temel Form\u00fcl", { x: 0.6, y: 1.08, w: 3, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: C.sec });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.48, w: 8.8, h: 0.8, fill: { color: C.accPale }, line: { color: C.acc, width: 1 } });
  s.addText("Ayl\u0131k Terk Oran\u0131 (%) = (Ay i\u00e7inde kaybedilen m\u00fc\u015fteri say\u0131s\u0131 / Ay ba\u015f\u0131 toplam m\u00fc\u015fteri say\u0131s\u0131) \u00d7 100", {
    x: 0.8, y: 1.5, w: 8.4, h: 0.76, margin: 0, fontFace: "Calibri", fontSize: 14, bold: true, color: C.acc, align: "center", valign: "middle"
  });

  // 3 örnek hesaplama
  const examples = [
    { title: "\u00d6rnek 1 — SaaS", color: C.acc, start: "1.000", lost: "50", rate: "%5.0", note: "Kabul edilebilir (SaaS ort. %5-7)" },
    { title: "\u00d6rnek 2 — E-ticaret", color: C.amber, start: "5.000", lost: "400", rate: "%8.0", note: "Y\u00fcksek, \u00f6nlem al\u0131nmal\u0131" },
    { title: "\u00d6rnek 3 — Telekom", color: C.red, start: "100.000", lost: "3.200", rate: "%3.2", note: "Sekt\u00f6r ortalamas\u0131n\u0131n alt\u0131nda — iyi" },
  ];
  examples.forEach((ex, i) => {
    const x = 0.4 + i * 3.1;
    addCard(s, x, 2.65, 2.95, 2.8, { topColor: ex.color });
    s.addText(ex.title, { x: x + 0.12, y: 2.78, w: 2.7, h: 0.38, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: ex.color });

    const rows = [["D\u00f6nem Ba\u015f\u0131", ex.start], ["Kaybedilen", ex.lost], ["Terk Oran\u0131", ex.rate]];
    rows.forEach(([lbl, val], j) => {
      const yy = 3.22 + j * 0.42;
      s.addText(lbl, { x: x + 0.15, y: yy, w: 1.5, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.mid });
      s.addText(val, { x: x + 1.65, y: yy, w: 1.15, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 13, bold: true, color: ex.color, align: "right" });
    });

    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 4.55, w: 2.65, h: 0.02, fill: { color: C.bdr } });
    s.addText(ex.note, { x: x + 0.15, y: 4.62, w: 2.65, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, italic: true });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — SEKTÖREL KARŞILAŞTIRMA
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Sekt\u00f6rel Terk Oranlar\u0131 Kar\u015f\u0131la\u015ft\u0131rmas\u0131", "B\u00d6L\u00dcM 1");

  s.addChart(pres.charts.BAR, [{
    name: "Ortalama Yıllık Terk Oranı (%)",
    labels: ["E-ticaret", "Medya/Yay\u0131nc\u0131l\u0131k", "Telekom", "Finans/Bankac\u0131l\u0131k", "SaaS B2B", "Sigorta", "Sa\u011fl\u0131k"],
    values: [35, 30, 25, 20, 12, 15, 8]
  }], {
    x: 0.4, y: 0.9, w: 6.0, h: 4.3,
    barDir: "bar",
    chartColors: [C.sec],
    showValue: true, dataLabelColor: C.dark, dataLabelPosition: "outEnd",
    catAxisLabelColor: C.dark, catAxisLabelFontSize: 11,
    valAxisLabelColor: C.mid,
    valGridLine: { color: "E8DDD3", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: false,
    chartArea: { fill: { color: "FFFFFF" }, roundedCorners: true },
  });

  // Sağ: yorumlar
  addCard(s, 6.6, 0.9, 3.1, 4.3, { leftColor: C.acc });
  cardTitle(s, 6.8, 1.0, 2.7, "Neden Fark Var?", C.acc);
  const insights = [
    { t: "E-ticaret", d: "D\u00fc\u015f\u00fck ba\u011fl\u0131l\u0131k, kolay ge\u00e7i\u015f. Fiyat hassasiyeti y\u00fcksek." },
    { t: "Telekom", d: "S\u00f6zle\u015fme s\u00fcreleri terki frenler ama s\u00f6zle\u015fme bitiminde art\u0131\u015f." },
    { t: "SaaS B2B", d: "Y\u00fcksek entegrasyon maliyeti ge\u00e7i\u015fi zorla\u015ft\u0131r\u0131r." },
    { t: "Sa\u011fl\u0131k", d: "En d\u00fc\u015f\u00fck terk. Doktor-hasta ba\u011f\u0131 g\u00fc\u00e7l\u00fc." },
  ];
  insights.forEach((ins, i) => {
    const yy = 1.45 + i * 0.7;
    s.addText([{ text: ins.t, options: { bold: true, color: C.sec } }, { text: "\n" + ins.d }], {
      x: 6.8, y: yy, w: 2.7, h: 0.62, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.dark
    });
    if (i < 3) s.addShape(pres.shapes.RECTANGLE, { x: 6.8, y: yy + 0.63, w: 2.6, h: 0.01, fill: { color: C.bdr } });
  });

  s.addText("Kaynak: Statista, Recurly Research, 2024-2025 verileri", {
    x: 6.8, y: 4.6, w: 2.7, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 8.5, color: C.subtle, italic: true
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — TERK NEDENLERİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Terk Nedenleri \u2014 M\u00fc\u015fteri Perspektifi", "B\u00d6L\u00dcM 1");

  const reasons = [
    { title: "K\u00f6t\u00fc M\u00fc\u015fteri Hizmetleri", pct: 82, color: C.red, desc: "Uzun bekleme, \u00e7\u00f6z\u00fclmeyen sorunlar, ilgisiz destek" },
    { title: "Fiyat-De\u011fer Uyumsuzlu\u011fu", pct: 66, color: C.amber, desc: "\u00d6denen tutar\u0131n kar\u015f\u0131l\u0131\u011f\u0131n\u0131 alamama hissi" },
    { title: "Rakipten Daha \u0130yi Teklif", pct: 61, color: C.acc, desc: "Daha ucuz, daha iyi \u00f6zellik veya deneyim" },
    { title: "Kullan\u0131m D\u00fc\u015f\u00fckl\u00fc\u011f\u00fc", pct: 54, color: C.purple, desc: "\u00dcr\u00fcn\u00fc yeterince kullanmayan m\u00fc\u015fteriler" },
    { title: "\u00dcr\u00fcn/Teknik Sorunlar", pct: 47, color: C.blue, desc: "Tekrarlayan bug\u2019lar, eksik \u00f6zellikler, d\u00fc\u015f\u00fck performans" },
    { title: "\u0130htiya\u00e7 De\u011fi\u015fimi", pct: 38, color: C.mid, desc: "M\u00fc\u015fterinin ihtiya\u00e7lar\u0131 art\u0131k \u00fcr\u00fcnle \u00f6rt\u00fc\u015fm\u00fcyor" },
  ];

  reasons.forEach((r, i) => {
    const y = 0.95 + i * 0.72;
    // Arka plan satır
    if (i % 2 === 0) s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.66, fill: { color: C.warmBg } });
    // Sol renk şeridi
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.06, h: 0.66, fill: { color: r.color } });
    // Başlık
    s.addText(r.title, { x: 0.55, y, w: 2.4, h: 0.66, margin: 0, fontFace: "Calibri", fontSize: 11.5, bold: true, color: C.dark, valign: "middle" });
    // Açıklama
    s.addText(r.desc, { x: 3.05, y, w: 3.2, h: 0.66, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid, valign: "middle" });
    // Progress bar
    s.addShape(pres.shapes.RECTANGLE, { x: 6.45, y: y + 0.22, w: 2.5, h: 0.22, fill: { color: C.bdr } });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.45, y: y + 0.22, w: 2.5 * (r.pct / 100), h: 0.22, fill: { color: r.color } });
    // Yüzde
    s.addText("%" + r.pct, { x: 9.05, y, w: 0.6, h: 0.66, margin: 0, fontFace: "Calibri", fontSize: 14, bold: true, color: r.color, align: "right", valign: "middle" });
  });

  s.addText("Kaynak: PwC Future of CX Report, Bain & Company analizleri", { x: 0.4, y: 5.32, w: 5, h: 0.2, margin: 0, fontFace: "Calibri", fontSize: 8.5, color: C.subtle, italic: true });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — ERKEN UYARI SİNYALLERİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Erken Uyar\u0131 Sinyalleri", "B\u00d6L\u00dcM 2");

  s.addText("M\u00fc\u015fteri terk etmeden \u00f6nce davran\u0131\u015fsal de\u011fi\u015fiklikler g\u00f6sterir. Bu sinyalleri yakalamak proaktif m\u00fcdahale i\u00e7in kritiktir.", {
    x: 0.4, y: 0.88, w: 9.2, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.mid, italic: true
  });

  const signals = [
    { num: 1, title: "Kullan\u0131m S\u0131kl\u0131\u011f\u0131 Azal\u0131yor", desc: "Haftal\u0131k giri\u015f say\u0131s\u0131 %30+ d\u00fc\u015ft\u00fcyse alarm", risk: "Y\u00fcksek", color: C.red },
    { num: 2, title: "Destek Talepleri Art\u0131yor", desc: "\u00c7\u00f6z\u00fclmeyen sorunlar\u0131n birikmesi", risk: "Y\u00fcksek", color: C.red },
    { num: 3, title: "NPS Skoru D\u00fc\u015ft\u00fc", desc: "9-10\u2019dan 0-6\u2019ya d\u00fc\u015fen m\u00fc\u015fteriler", risk: "Y\u00fcksek", color: C.red },
    { num: 4, title: "Harcama Tutar\u0131 Azald\u0131", desc: "Downgrade veya ek sat\u0131n almaların durması", risk: "Orta", color: C.amber },
    { num: 5, title: "\u00d6zellik Kullan\u0131m\u0131 Darald\u0131", desc: "Sadece temel \u00f6zelliklere geri d\u00f6n\u00fc\u015f", risk: "Orta", color: C.amber },
    { num: 6, title: "Hesap Ayarlar\u0131 \u0130nceleniyor", desc: "\u0130ptal sayfas\u0131, fatura ge\u00e7mi\u015fi, s\u00f6zle\u015fme ko\u015fullar\u0131", risk: "Orta", color: C.amber },
    { num: 7, title: "Etkile\u015fim E-postalar\u0131 A\u00e7\u0131lm\u0131yor", desc: "E-posta a\u00e7\u0131lma oran\u0131 %10\u2019un alt\u0131na d\u00fc\u015ft\u00fc", risk: "D\u00fc\u015f\u00fck", color: C.green },
    { num: 8, title: "Sosyal Medyada \u015eikayet", desc: "Kamuya a\u00e7\u0131k olumsuz geri bildirim", risk: "De\u011fi\u015fken", color: C.purple },
  ];

  signals.forEach((sig, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    const x = 0.35 + col * 4.8;
    const y = 1.35 + row * 1.02;

    addCard(s, x, y, 4.6, 0.9, { leftColor: sig.color });
    numBadge(s, x + 0.15, y + 0.27, sig.num, sig.color);
    s.addText(sig.title, { x: x + 0.6, y: y + 0.06, w: 2.8, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 11.5, bold: true, color: C.dark });
    s.addText(sig.desc, { x: x + 0.6, y: y + 0.44, w: 2.8, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid });
    // Risk etiketi
    s.addShape(pres.shapes.RECTANGLE, { x: x + 3.6, y: y + 0.3, w: 0.82, h: 0.3, fill: { color: sig.color } });
    s.addText(sig.risk, { x: x + 3.6, y: y + 0.3, w: 0.82, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — MÜŞTERİ YAŞAM DÖNGÜSÜ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "M\u00fc\u015fteri Ya\u015fam D\u00f6ng\u00fcs\u00fc", "B\u00d6L\u00dcM 2");

  const stages = [
    { title: "Edinme", desc: "Yeni m\u00fc\u015fteri kazan\u0131l\u0131r", color: C.blue, risk: "D\u00fc\u015f\u00fck" },
    { title: "Aktivasyon", desc: "\u0130lk de\u011fer deneyimi ya\u015fan\u0131r", color: C.acc, risk: "Orta" },
    { title: "B\u00fcy\u00fcme", desc: "Kullan\u0131m ve harcama artar", color: C.green, risk: "D\u00fc\u015f\u00fck" },
    { title: "Olgunluk", desc: "D\u00fczenli kullan\u0131m, sad\u0131k m\u00fc\u015fteri", color: C.amber, risk: "Orta" },
    { title: "D\u00fc\u015f\u00fc\u015f / Terk", desc: "Etkile\u015fim azal\u0131r, terk riski y\u00fcksek", color: C.red, risk: "Y\u00fcksek" },
  ];

  // Timeline çizgisi
  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 2.8, w: 8.6, h: 0.04, fill: { color: C.bdr } });

  stages.forEach((st, i) => {
    const x = 0.5 + i * 1.85;
    // Daire
    s.addShape(pres.shapes.OVAL, { x: x + 0.45, y: 2.55, w: 0.52, h: 0.52, fill: { color: st.color } });
    s.addText(String(i + 1), { x: x + 0.45, y: 2.55, w: 0.52, h: 0.52, margin: 0, fontFace: "Calibri", fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    // Üst: başlık
    s.addText(st.title, { x, y: 1.65, w: 1.7, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: st.color, align: "center" });
    s.addText(st.desc, { x, y: 2.05, w: 1.7, h: 0.38, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, align: "center" });
    // Alt: risk
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.2, y: 3.25, w: 1.3, h: 0.3, fill: { color: st.color, transparency: 85 }, line: { color: st.color, width: 1 } });
    s.addText("Risk: " + st.risk, { x: x + 0.2, y: 3.25, w: 1.3, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: st.color, align: "center", valign: "middle" });
  });

  // Alt açıklama
  addCard(s, 0.4, 3.8, 9.2, 1.5, { topColor: C.sec });
  s.addText("Terk Riski Nerede En Y\u00fcksek?", { x: 0.6, y: 3.92, w: 8.8, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: C.sec });
  s.addText([
    { text: "Aktivasyon a\u015famas\u0131: ", options: { bold: true, color: C.acc } },
    { text: "\u0130lk 30 g\u00fcnde de\u011fer g\u00f6remeyen m\u00fc\u015fterilerin %40-60\u2019\u0131 geri d\u00f6nmez. ", options: {} },
    { text: "Bu nedenle onboarding (ilk kar\u015f\u0131lama) deneyimi kritik \u00f6nemdedir. ", options: {} },
    { text: "Olgunluk a\u015famas\u0131: ", options: { bold: true, color: C.amber } },
    { text: "Uzun s\u00fcredir aktif m\u00fc\u015fteriler \u201Ckazanilmi\u015f\u201D say\u0131l\u0131r ama dikkat edilmezse sessiz terke d\u00f6n\u00fc\u015febilir.", options: {} },
  ], { x: 0.6, y: 4.3, w: 8.8, h: 0.85, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — VERİ KAYNAKLARI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Veri Kaynaklar\u0131 ve Haz\u0131rl\u0131k", "B\u00d6L\u00dcM 2");

  s.addTable([
    [
      { text: "Veri T\u00fcr\u00fc", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10.5 } },
      { text: "Kaynak", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10.5 } },
      { text: "\u00d6rnek De\u011fi\u015fkenler", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10.5 } },
      { text: "\u00d6nem", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10.5 } },
    ],
    [
      { text: "Demografik", options: { bold: true, fontFace: "Calibri", fontSize: 10 } },
      { text: "CRM", options: { fontFace: "Calibri", fontSize: 10 } },
      { text: "Ya\u015f, cinsiyet, \u015fehir, segment", options: { fontFace: "Calibri", fontSize: 10 } },
      { text: "\u2605\u2605\u2605", options: { fontFace: "Calibri", fontSize: 10, color: C.amber } },
    ],
    [
      { text: "Davranışsal", options: { bold: true, fontFace: "Calibri", fontSize: 10, fill: { color: C.warmBg } } },
      { text: "Uygulama logları", options: { fontFace: "Calibri", fontSize: 10, fill: { color: C.warmBg } } },
      { text: "Giri\u015f s\u0131kl\u0131\u011f\u0131, oturum s\u00fcresi, t\u0131klama", options: { fontFace: "Calibri", fontSize: 10, fill: { color: C.warmBg } } },
      { text: "\u2605\u2605\u2605\u2605\u2605", options: { fontFace: "Calibri", fontSize: 10, color: C.red, fill: { color: C.warmBg } } },
    ],
    [
      { text: "\u0130\u015flemsel", options: { bold: true, fontFace: "Calibri", fontSize: 10 } },
      { text: "\u00d6deme sistemi", options: { fontFace: "Calibri", fontSize: 10 } },
      { text: "Harcama, frekans, son sat\u0131n alma tarihi", options: { fontFace: "Calibri", fontSize: 10 } },
      { text: "\u2605\u2605\u2605\u2605\u2605", options: { fontFace: "Calibri", fontSize: 10, color: C.red } },
    ],
    [
      { text: "Destek", options: { bold: true, fontFace: "Calibri", fontSize: 10, fill: { color: C.warmBg } } },
      { text: "Helpdesk / CRM", options: { fontFace: "Calibri", fontSize: 10, fill: { color: C.warmBg } } },
      { text: "Ticket say\u0131s\u0131, \u00e7\u00f6z\u00fcm s\u00fcresi, CSAT", options: { fontFace: "Calibri", fontSize: 10, fill: { color: C.warmBg } } },
      { text: "\u2605\u2605\u2605\u2605", options: { fontFace: "Calibri", fontSize: 10, color: C.amber, fill: { color: C.warmBg } } },
    ],
    [
      { text: "S\u00f6zle\u015fme", options: { bold: true, fontFace: "Calibri", fontSize: 10 } },
      { text: "Billing sistemi", options: { fontFace: "Calibri", fontSize: 10 } },
      { text: "S\u00f6zle\u015fme tipi, kalan s\u00fcre, yenileme", options: { fontFace: "Calibri", fontSize: 10 } },
      { text: "\u2605\u2605\u2605\u2605", options: { fontFace: "Calibri", fontSize: 10, color: C.amber } },
    ],
    [
      { text: "Geri Bildirim", options: { bold: true, fontFace: "Calibri", fontSize: 10, fill: { color: C.warmBg } } },
      { text: "Anketler", options: { fontFace: "Calibri", fontSize: 10, fill: { color: C.warmBg } } },
      { text: "NPS, CSAT, CES skorlar\u0131", options: { fontFace: "Calibri", fontSize: 10, fill: { color: C.warmBg } } },
      { text: "\u2605\u2605\u2605\u2605", options: { fontFace: "Calibri", fontSize: 10, color: C.amber, fill: { color: C.warmBg } } },
    ],
  ], {
    x: 0.4, y: 0.9, w: 9.2, h: 3.0,
    colW: [1.8, 2.0, 3.4, 2.0],
    border: { pt: 0.5, color: C.bdr },
    rowH: [0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
  });

  // Alt: veri kalitesi uyarısı
  addCard(s, 0.4, 4.0, 9.2, 1.3, { topColor: C.amber });
  s.addText("Veri Haz\u0131rl\u0131k Ad\u0131mlar\u0131", { x: 0.6, y: 4.1, w: 4, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: C.amber });
  const steps = ["Eksik veri analizi ve doldurma (imputation)", "Ayk\u0131r\u0131 de\u011fer tespiti (outlier detection)", "Kategorik de\u011fi\u015fken kodlama (one-hot / label encoding)", "Dengesiz s\u0131n\u0131f problemi: SMOTE veya class_weight kullan\u0131m\u0131"];
  s.addText(steps.map((st, i) => ({ text: (i + 1) + ". " + st, options: { breakLine: true } })), {
    x: 0.6, y: 4.48, w: 8.8, h: 0.8, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — RFM ANALİZİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "RFM Analizi", "B\u00d6L\u00dcM 2");

  s.addText("RFM, m\u00fc\u015fterileri \u00fc\u00e7 temel davran\u0131\u015f boyutunda puanlayarak segmentlere ay\u0131ran klasik bir y\u00f6ntemdir.", {
    x: 0.4, y: 0.88, w: 9.2, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.mid, italic: true
  });

  const rfm = [
    { letter: "R", name: "Recency", tr: "Yak\u0131nl\u0131k", desc: "Son sat\u0131n alma ne zaman yap\u0131ld\u0131?\n\nD\u00fc\u015f\u00fck R skoru = uzun s\u00fcredir al\u0131\u015fveri\u015f yok\n\u2192 Y\u00fcksek terk riski", color: C.red, example: "Son 7 g\u00fcn = 5 puan\nSon 90+ g\u00fcn = 1 puan" },
    { letter: "F", name: "Frequency", tr: "S\u0131kl\u0131k", desc: "Ne s\u0131kl\u0131kla al\u0131\u015fveri\u015f yap\u0131yor?\n\nD\u00fc\u015f\u00fck F skoru = nadir al\u0131\u015fveri\u015f\n\u2192 D\u00fc\u015f\u00fck ba\u011fl\u0131l\u0131k", color: C.amber, example: "Ayda 10+ = 5 puan\nY\u0131lda 1 = 1 puan" },
    { letter: "M", name: "Monetary", tr: "Parasal De\u011fer", desc: "Toplam ne kadar harcad\u0131?\n\nY\u00fcksek M skoru = de\u011ferli m\u00fc\u015fteri\n\u2192 Kaybetme maliyeti y\u00fcksek", color: C.green, example: "10.000+ TL = 5 puan\n100 TL = 1 puan" },
  ];

  rfm.forEach((r, i) => {
    const x = 0.35 + i * 3.15;
    addCard(s, x, 1.4, 3.0, 3.85, { topColor: r.color });

    // Büyük harf
    s.addShape(pres.shapes.OVAL, { x: x + 1.08, y: 1.52, w: 0.84, h: 0.84, fill: { color: r.color } });
    s.addText(r.letter, { x: x + 1.08, y: 1.52, w: 0.84, h: 0.84, margin: 0, fontFace: "Georgia", fontSize: 32, bold: true, color: "FFFFFF", align: "center", valign: "middle" });

    s.addText(r.name, { x: x + 0.15, y: 2.42, w: 2.7, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: r.color, align: "center" });
    s.addText("(" + r.tr + ")", { x: x + 0.15, y: 2.72, w: 2.7, h: 0.24, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, align: "center" });

    cardBody(s, x + 0.15, 3.02, 2.7, 1.1, r.desc, { size: 10.5 });

    // Örnek kutusu
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: 4.2, w: 2.76, h: 0.9, fill: { color: C.warmBg }, line: { color: C.bdr, width: 1 } });
    s.addText("Puanlama \u00d6rne\u011fi", { x: x + 0.2, y: 4.22, w: 2.6, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: C.mid });
    s.addText(r.example, { x: x + 0.2, y: 4.48, w: 2.6, h: 0.58, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.dark });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — KOHORT ANALİZİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Kohort Analizi", "B\u00d6L\u00dcM 2");

  addCard(s, 0.4, 0.9, 5.5, 1.2, { leftColor: C.acc });
  cardTitle(s, 0.6, 1.0, 5.0, "Nedir?", C.acc);
  cardBody(s, 0.6, 1.38, 5.1, 0.6, "M\u00fc\u015fterileri kazanma tarihine g\u00f6re gruplara (kohort) ay\u0131r\u0131p, her grubun zaman i\u00e7indeki davran\u0131\u015f\u0131n\u0131 izler. Hangi d\u00f6nemde kazanilan m\u00fc\u015fterilerin daha \u00e7ok terk etti\u011fini g\u00f6sterir.");

  addCard(s, 6.1, 0.9, 3.5, 1.2, { leftColor: C.sec });
  cardTitle(s, 6.3, 1.0, 3.1, "Neden \u00d6nemli?", C.sec);
  cardBody(s, 6.3, 1.38, 3.1, 0.6, "Kampanya etkisini \u00f6l\u00e7er. \u00d6rne\u011fin Mart\u2019ta yap\u0131lan de\u011fi\u015fiklik Nisan kohortunda terki azaltm\u0131\u015f m\u0131?");

  // Kohort tablosu (ısı haritası benzeri)
  s.addText("\u00d6rnek Kohort Is\u0131 Haritas\u0131 (Elde Tutma %)", { x: 0.4, y: 2.25, w: 9, h: 0.38, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: C.dark });

  const heatColors = {
    95: "E8F5E9", 90: "C8E6C9", 85: "A5D6A7", 80: "81C784",
    75: "FFF9C4", 70: "FFF176", 65: "FFD54F",
    60: "FFCC80", 55: "FFB74D", 50: "FF8A65",
  };
  function hc(val) {
    if (val >= 90) return "C8E6C9"; if (val >= 80) return "A5D6A7"; if (val >= 70) return "FFF9C4";
    if (val >= 60) return "FFCC80"; return "FF8A65";
  }

  const cohortData = [
    ["", "Ay 0", "Ay 1", "Ay 2", "Ay 3", "Ay 4", "Ay 5"],
    ["Ocak", 100, 85, 72, 65, 60, 55],
    ["\u015eubat", 100, 88, 78, 70, 64, "—"],
    ["Mart", 100, 90, 82, 74, "—", "—"],
    ["Nisan", 100, 92, 85, "—", "—", "—"],
    ["May\u0131s", 100, 87, "—", "—", "—", "—"],
  ];

  const tableRows = cohortData.map((row, ri) => {
    return row.map((cell, ci) => {
      const isHeader = ri === 0 || ci === 0;
      const val = typeof cell === "number" ? cell : null;
      return {
        text: String(cell) + (val && ci > 0 && ri > 0 ? "%" : ""),
        options: {
          fill: { color: isHeader ? C.pri : (val ? hc(val) : "F5F5F5") },
          color: isHeader ? "FFFFFF" : C.dark,
          bold: isHeader,
          fontFace: "Calibri", fontSize: 10,
          align: "center",
        }
      };
    });
  });

  s.addTable(tableRows, {
    x: 0.4, y: 2.65, w: 9.2, h: 2.2,
    colW: [1.2, 1.33, 1.33, 1.33, 1.33, 1.33, 1.33],
    border: { pt: 0.5, color: "FFFFFF" },
  });

  s.addText("Yorum: Nisan kohortu en y\u00fcksek elde tutma oran\u0131na sahip \u2192 O d\u00f6nemde yap\u0131lan onboarding iyile\u015ftirmesi etkili olmu\u015f olabilir.", {
    x: 0.4, y: 4.95, w: 9.2, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.acc, italic: true
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — ÖZELLİK MÜHENDİSLİĞİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "\u00d6zellik M\u00fchendisli\u011fi (Feature Engineering)", "B\u00d6L\u00dcM 2");

  s.addText("Ham veriden anlaml\u0131 \u00f6zellikler (feature) t\u00fcretmek, terk tahmin modelinin ba\u015far\u0131s\u0131n\u0131 do\u011frudan etkiler.", {
    x: 0.4, y: 0.88, w: 9.2, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.mid, italic: true
  });

  s.addTable([
    [
      { text: "Kategori", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10 } },
      { text: "\u00d6zellik Ad\u0131", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10 } },
      { text: "A\u00e7\u0131klama", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10 } },
      { text: "\u00d6nem", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10 } },
    ],
    ...[
      ["Recency", "days_since_last_login", "Son giri\u015ften bu yana ge\u00e7en g\u00fcn", "\u2605\u2605\u2605\u2605\u2605"],
      ["Frequency", "login_count_30d", "Son 30 g\u00fcndeki giri\u015f say\u0131s\u0131", "\u2605\u2605\u2605\u2605\u2605"],
      ["Monetary", "total_revenue", "Toplam gelir (\u20ba)", "\u2605\u2605\u2605\u2605"],
      ["Trend", "login_trend", "Son 3 aydaki giri\u015f de\u011fi\u015fim oran\u0131", "\u2605\u2605\u2605\u2605\u2605"],
      ["Engagement", "feature_adoption_rate", "Kullan\u0131lan \u00f6zellik say\u0131s\u0131 / toplam", "\u2605\u2605\u2605\u2605"],
      ["Support", "ticket_count_60d", "Son 60 g\u00fcndeki destek talebi", "\u2605\u2605\u2605"],
      ["Satisfaction", "nps_score", "Son NPS anketi skoru", "\u2605\u2605\u2605\u2605"],
      ["Contract", "days_until_renewal", "S\u00f6zle\u015fme yenilemeye kalan g\u00fcn", "\u2605\u2605\u2605"],
      ["Social", "referral_count", "Referans verilen kullan\u0131c\u0131 say\u0131s\u0131", "\u2605\u2605"],
    ].map((row, i) => row.map((cell, ci) => ({
      text: cell,
      options: {
        fill: { color: i % 2 === 0 ? C.warmBg : "FFFFFF" },
        fontFace: ci === 1 ? "Consolas" : "Calibri",
        fontSize: ci === 1 ? 9 : 10,
        bold: ci === 0,
        color: ci === 3 ? C.amber : C.dark,
      }
    })))
  ], {
    x: 0.4, y: 1.35, w: 9.2, h: 3.6,
    colW: [1.5, 2.5, 3.5, 1.7],
    border: { pt: 0.5, color: C.bdr },
  });

  s.addText("\u0130pucu: Trend \u00f6zellikleri (de\u011fi\u015fim oran\u0131) genellikle statik \u00f6zelliklerden daha g\u00fc\u00e7l\u00fc tahmin edicilerdir.", {
    x: 0.4, y: 5.08, w: 9, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.acc, bold: true
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — TAHMİN MODELLERİ GENEL
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Terk Tahmin Modelleri \u2014 Genel Bak\u0131\u015f", "B\u00d6L\u00dcM 3");

  const models = [
    { name: "Lojistik\nRegresyon", auc: "0.75-0.82", complexity: "D\u00fc\u015f\u00fck", interpret: "Y\u00fcksek", color: C.acc },
    { name: "Karar\nA\u011fac\u0131", auc: "0.72-0.80", complexity: "D\u00fc\u015f\u00fck", interpret: "Y\u00fcksek", color: C.green },
    { name: "Random\nForest", auc: "0.84-0.90", complexity: "Orta", interpret: "Orta", color: C.amber },
    { name: "XGBoost /\nLightGBM", auc: "0.88-0.95", complexity: "Y\u00fcksek", interpret: "D\u00fc\u015f\u00fck", color: C.sec },
  ];

  models.forEach((m, i) => {
    const x = 0.3 + i * 2.4;
    addCard(s, x, 0.95, 2.25, 4.35, { topColor: m.color });
    s.addText(m.name, { x: x + 0.1, y: 1.1, w: 2.05, h: 0.7, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: m.color, align: "center" });

    const metrics = [
      ["AUC", m.auc],
      ["Karma\u015f\u0131kl\u0131k", m.complexity],
      ["Yorumlanabilirlik", m.interpret],
    ];
    metrics.forEach(([lbl, val], j) => {
      const yy = 1.95 + j * 0.55;
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: yy, w: 2.05, h: 0.45, fill: { color: j % 2 === 0 ? C.warmBg : "FFFFFF" }, line: { color: C.bdr } });
      s.addText(lbl, { x: x + 0.18, y: yy, w: 1.0, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.mid, valign: "middle" });
      s.addText(val, { x: x + 1.15, y: yy, w: 0.92, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 11, bold: true, color: C.dark, align: "right", valign: "middle" });
    });

    // AUC bar (visual)
    const minAuc = parseFloat(m.auc.split("-")[0]);
    const barW = (minAuc / 1.0) * 2.0;
    s.addText("AUC G\u00f6rsel", { x: x + 0.1, y: 3.7, w: 2.05, h: 0.25, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.subtle });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: 3.96, w: 2.05, h: 0.2, fill: { color: C.bdr } });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: 3.96, w: barW, h: 0.2, fill: { color: m.color } });

    // Ne zaman kullanılır
    const useCases = [
      "Ba\u015flang\u0131\u00e7 / baseline",
      "G\u00f6rsel a\u00e7\u0131klama",
      "Dengeli performans",
      "En y\u00fcksek do\u011fruluk"
    ];
    s.addText("\u2192 " + useCases[i], { x: x + 0.1, y: 4.35, w: 2.05, h: 0.7, margin: 0, fontFace: "Calibri", fontSize: 10, color: m.color, bold: true });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — LOJİSTİK REGRESYON
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Lojistik Regresyon", "B\u00d6L\u00dcM 3");

  // Sol: açıklama
  addCard(s, 0.4, 0.9, 5.2, 2.2, { leftColor: C.acc });
  cardTitle(s, 0.6, 1.0, 4.8, "Nas\u0131l \u00c7al\u0131\u015f\u0131r?", C.acc);
  cardBody(s, 0.6, 1.42, 4.8, 1.5,
    "Her \u00f6zellik i\u00e7in bir a\u011f\u0131rl\u0131k (katsay\u0131) \u00f6\u011frenir. Bu a\u011f\u0131rl\u0131klar\u0131 sigmoid fonksiyonundan ge\u00e7irerek 0-1 aras\u0131nda terk olas\u0131l\u0131\u011f\u0131 \u00fcretir.\n\nP(terk) = 1 / (1 + e^-(b0 + b1*x1 + b2*x2 + ...))\n\n\u00d6rne\u011fin: giri\u015f sıklı\u011fı azald\u0131kca terk olas\u0131l\u0131\u011f\u0131 artar."
  );

  // Sağ: artı/eksi
  addCard(s, 5.8, 0.9, 3.85, 1.05, { topColor: C.green });
  cardTitle(s, 6.0, 1.0, 3.4, "\u2713 Avantajlar\u0131", C.green);
  s.addText([
    { text: "Yorumlanabilir (hangi \u00f6zellik etkili)", options: { breakLine: true, bullet: true } },
    { text: "H\u0131zl\u0131 e\u011fitim ve tahmin", options: { breakLine: true, bullet: true } },
    { text: "K\u00fc\u00e7\u00fck veri setlerinde \u00e7al\u0131\u015f\u0131r", options: { bullet: true } },
  ], { x: 6.0, y: 1.38, w: 3.4, h: 0.52, fontFace: "Calibri", fontSize: 10, color: C.dark });

  addCard(s, 5.8, 2.05, 3.85, 1.05, { topColor: C.red });
  cardTitle(s, 6.0, 2.15, 3.4, "\u2717 S\u0131n\u0131rl\u0131l\u0131klar\u0131", C.red);
  s.addText([
    { text: "Sadece do\u011frusal ili\u015fkileri yakalar", options: { breakLine: true, bullet: true } },
    { text: "Karma\u015f\u0131k \u00f6r\u00fcnt\u00fcleri ka\u00e7\u0131rabilir", options: { breakLine: true, bullet: true } },
    { text: "\u00d6zellik etkile\u015fimlerini modelleyemez", options: { bullet: true } },
  ], { x: 6.0, y: 2.53, w: 3.4, h: 0.52, fontFace: "Calibri", fontSize: 10, color: C.dark });

  // Alt: Python kodu
  addCard(s, 0.4, 3.3, 9.25, 2.1, { topColor: C.pri });
  s.addText("Python Kodu", { x: 0.6, y: 3.4, w: 3, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: C.pri });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.78, w: 9.0, h: 1.5, fill: { color: "1E1E2E" } });
  s.addText([
    { text: "from sklearn.linear_model import LogisticRegression\n", options: { color: "89B4FA" } },
    { text: "from sklearn.model_selection import train_test_split\n\n", options: { color: "89B4FA" } },
    { text: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n", options: { color: "CDD6F4" } },
    { text: "model = LogisticRegression(class_weight='balanced', max_iter=1000)\n", options: { color: "CDD6F4" } },
    { text: "model.fit(X_train, y_train)\n", options: { color: "A6E3A1" } },
    { text: "y_pred = model.predict_proba(X_test)[:, 1]  # terk olasılığı", options: { color: "F9E2AF" } },
  ], { x: 0.65, y: 3.82, w: 8.7, h: 1.42, fontFace: "Consolas", fontSize: 9 });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — RANDOM FOREST
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Karar A\u011fa\u00e7lar\u0131 ve Random Forest", "B\u00d6L\u00dcM 3");

  // Sol: Karar Ağacı
  addCard(s, 0.4, 0.9, 4.5, 2.2, { topColor: C.green });
  cardTitle(s, 0.6, 1.0, 4.0, "Karar A\u011fac\u0131 (Decision Tree)", C.green);
  cardBody(s, 0.6, 1.42, 4.1, 1.5,
    "Veriyi evet/hay\u0131r sorularla b\u00f6ler:\n\n\u201CSon 30 g\u00fcnde giri\u015f var m\u0131?\u201D\n  \u2192 Hay\u0131r \u2192 \u201CDestek talebi a\u00e7t\u0131 m\u0131?\u201D\n    \u2192 Evet \u2192 Y\u00dcKSEK TERK R\u0130SK\u0130\n\nBasit ama tek ba\u015f\u0131na overfitting\u2019e a\u00e7\u0131k."
  );

  // Sağ: Random Forest
  addCard(s, 5.1, 0.9, 4.55, 2.2, { topColor: C.amber });
  cardTitle(s, 5.3, 1.0, 4.1, "Random Forest", C.amber);
  cardBody(s, 5.3, 1.42, 4.1, 1.5,
    "Y\u00fczlerce karar a\u011fac\u0131n\u0131 paralel e\u011fitir:\n\n\u2022 Her a\u011fa\u00e7 verinin rastgele bir alt k\u00fcmesiyle e\u011fitilir\n\u2022 Sonu\u00e7 olarak \u201Coy \u00e7oklu\u011fu\u201D ile karar verilir\n\u2022 Tek a\u011faca g\u00f6re \u00e7ok daha dayan\u0131kl\u0131\n\u2022 A\u015f\u0131r\u0131 \u00f6\u011frenmeye direnci y\u00fcksek"
  );

  // Feature Importance
  addCard(s, 0.4, 3.3, 5.2, 2.1, { topColor: C.sec });
  s.addText("\u00d6zellik \u00d6nemi (Feature Importance)", { x: 0.6, y: 3.4, w: 4.8, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: C.sec });
  s.addChart(pres.charts.BAR, [{
    name: "Önem",
    labels: ["Son giri\u015f", "Giri\u015f trendi", "Destek say\u0131s\u0131", "NPS", "Harcama", "S\u00f6zle\u015fme"],
    values: [0.28, 0.22, 0.18, 0.14, 0.10, 0.08]
  }], {
    x: 0.45, y: 3.78, w: 5.0, h: 1.5,
    barDir: "bar",
    chartColors: [C.sec],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.dark,
    catAxisLabelColor: C.dark, catAxisLabelFontSize: 9,
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showLegend: false, valAxisHidden: true,
  });

  // Sağ alt: Python
  addCard(s, 5.8, 3.3, 3.85, 2.1, { topColor: C.pri });
  s.addText("Python Kodu", { x: 6.0, y: 3.4, w: 3.4, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: C.pri });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.9, y: 3.78, w: 3.65, h: 1.5, fill: { color: "1E1E2E" } });
  s.addText([
    { text: "from sklearn.ensemble \\\n  import RandomForestClassifier\n\n", options: { color: "89B4FA" } },
    { text: "rf = RandomForestClassifier(\n", options: { color: "CDD6F4" } },
    { text: "    n_estimators=500,\n", options: { color: "F9E2AF" } },
    { text: "    class_weight='balanced'\n)\n", options: { color: "CDD6F4" } },
    { text: "rf.fit(X_train, y_train)", options: { color: "A6E3A1" } },
  ], { x: 6.0, y: 3.82, w: 3.4, h: 1.42, fontFace: "Consolas", fontSize: 8.5 });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 18 — XGBOOST
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "XGBoost / Gradient Boosting", "B\u00d6L\u00dcM 3");

  addCard(s, 0.4, 0.9, 9.2, 1.5, { leftColor: C.sec });
  cardTitle(s, 0.6, 1.0, 8.8, "Nedir ve Neden En G\u00fc\u00e7l\u00fc?", C.sec);
  cardBody(s, 0.6, 1.4, 8.8, 0.85,
    "Gradient Boosting, a\u011fa\u00e7lar\u0131 sıralı olarak e\u011fitir. Her yeni a\u011fa\u00e7, \u00f6nceki a\u011facın hatalar\u0131n\u0131 d\u00fczeltmeye \u00e7al\u0131\u015f\u0131r. XGBoost bu y\u00f6ntemi h\u0131z ve performans i\u00e7in optimize eder. Kaggle yar\u0131\u015fmalar\u0131nda en \u00e7ok kazanan algoritmad\u0131r."
  );

  // 3 özellik kartı
  const features = [
    { title: "Otomatik Eksik Veri", desc: "Eksik de\u011ferleri otomatik y\u00f6netir. Ayr\u0131ca imputation gerekmez.", color: C.acc },
    { title: "Reg\u00fclarizasyon", desc: "L1/L2 reg\u00fclarizasyon ile a\u015f\u0131r\u0131 \u00f6\u011frenmeyi \u00f6nler.", color: C.amber },
    { title: "Paralel Hesaplama", desc: "\u00c7ok \u00e7ekirdekli CPU\u2019lar\u0131 etkin kullan\u0131r. GPU deste\u011fi var.", color: C.green },
  ];
  features.forEach((f, i) => {
    const x = 0.35 + i * 3.15;
    addCard(s, x, 2.6, 3.0, 1.1, { topColor: f.color });
    s.addText(f.title, { x: x + 0.12, y: 2.72, w: 2.76, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: f.color });
    cardBody(s, x + 0.12, 3.05, 2.76, 0.55, f.desc, { size: 10 });
  });

  // Python kodu
  addCard(s, 0.4, 3.9, 9.2, 1.6, { topColor: C.pri });
  s.addText("Python Kodu", { x: 0.6, y: 4.0, w: 3, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: C.pri });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.36, w: 9.0, h: 1.05, fill: { color: "1E1E2E" } });
  s.addText([
    { text: "import xgboost as xgb\n\n", options: { color: "89B4FA" } },
    { text: "model = xgb.XGBClassifier(\n", options: { color: "CDD6F4" } },
    { text: "    n_estimators=1000, learning_rate=0.05, max_depth=6,\n", options: { color: "F9E2AF" } },
    { text: "    scale_pos_weight=ratio, eval_metric='auc'  # dengesiz veri için\n", options: { color: "F9E2AF" } },
    { text: ")\nmodel.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=False)", options: { color: "A6E3A1" } },
  ], { x: 0.65, y: 4.38, w: 8.7, h: 1.0, fontFace: "Consolas", fontSize: 9 });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — MODEL DEĞERLENDİRME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Model De\u011ferlendirme Metrikleri", "B\u00d6L\u00dcM 3");

  const metrics = [
    { name: "Accuracy", formula: "(TP+TN) / Toplam", desc: "Genel do\u011fruluk. Dengesiz veride yan\u0131lt\u0131c\u0131 olabilir!", color: C.blue, warn: true },
    { name: "Precision", formula: "TP / (TP+FP)", desc: "\u201CTerk dedi\u011fimde ger\u00e7ekten terk mi?\u201D\nYanl\u0131\u015f alarm\u0131 azalt\u0131r.", color: C.acc, warn: false },
    { name: "Recall", formula: "TP / (TP+FN)", desc: "\u201CTerk edenlerin ka\u00e7\u0131n\u0131 yakalad\u0131m?\u201D\nKa\u00e7\u0131rmay\u0131 en aza indirir.", color: C.amber, warn: false },
    { name: "F1 Score", formula: "2 \u00d7 (P\u00d7R)/(P+R)", desc: "Precision ve Recall\u2019in dengesi.\nGenel performans g\u00f6stergesi.", color: C.green, warn: false },
  ];

  metrics.forEach((m, i) => {
    const x = 0.3 + i * 2.4;
    addCard(s, x, 0.9, 2.25, 3.0, { topColor: m.color });
    s.addText(m.name, { x: x + 0.1, y: 1.05, w: 2.05, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 14, bold: true, color: m.color, align: "center" });
    // Formül
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: 1.5, w: 2.01, h: 0.42, fill: { color: C.warmBg }, line: { color: C.bdr } });
    s.addText(m.formula, { x: x + 0.12, y: 1.5, w: 2.01, h: 0.42, margin: 0, fontFace: "Consolas", fontSize: 10, color: C.dark, align: "center", valign: "middle" });
    // Açıklama
    cardBody(s, x + 0.12, 2.05, 2.01, 1.0, m.desc, { size: 10 });
    if (m.warn) {
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: 3.15, w: 2.01, h: 0.55, fill: { color: "FEF2F2" }, line: { color: C.red, width: 1 } });
      s.addText("Dikkat: %95 terk etmeyen veride %95 accuracy elde eden model hi\u00e7bir terk tahmin edemeyebilir!", {
        x: x + 0.18, y: 3.17, w: 1.9, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 8.5, color: C.red
      });
    }
  });

  // Confusion Matrix
  addCard(s, 0.4, 4.1, 9.2, 1.4, { topColor: C.purple });
  s.addText("Confusion Matrix (Kar\u0131\u015f\u0131kl\u0131k Matrisi)", { x: 0.6, y: 4.2, w: 4, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: C.purple });

  s.addTable([
    [
      { text: "", options: { fill: { color: "FFFFFF" }, fontFace: "Calibri", fontSize: 9 } },
      { text: "Tahmin: Kalan", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 9 } },
      { text: "Tahmin: Terk", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 9 } },
    ],
    [
      { text: "Ger\u00e7ek: Kalan", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 9 } },
      { text: "TN (Do\u011fru Negatif)\nDo\u011fru tahmin", options: { fill: { color: "E8F5E9" }, fontFace: "Calibri", fontSize: 9, align: "center" } },
      { text: "FP (Yanl\u0131\u015f Pozitif)\nGereksiz alarm", options: { fill: { color: "FFF3E0" }, fontFace: "Calibri", fontSize: 9, align: "center" } },
    ],
    [
      { text: "Ger\u00e7ek: Terk", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 9 } },
      { text: "FN (Yanl\u0131\u015f Negatif)\nKa\u00e7\u0131r\u0131lan terk!", options: { fill: { color: "FFEBEE" }, fontFace: "Calibri", fontSize: 9, align: "center" } },
      { text: "TP (Do\u011fru Pozitif)\nDo\u011fru terk tahmini", options: { fill: { color: "E8F5E9" }, fontFace: "Calibri", fontSize: 9, align: "center" } },
    ],
  ], {
    x: 0.5, y: 4.56, w: 4.5, h: 0.85,
    colW: [1.4, 1.55, 1.55],
    border: { pt: 1, color: "FFFFFF" },
  });

  s.addText("FN (ka\u00e7\u0131r\u0131lan terk) en tehlikeli hatad\u0131r \u2014 m\u00fc\u015fteri zaten gitti\u011finde \u00f6\u011frenirsiniz.\nBu y\u00fczden terk analizinde Recall metri\u011fi \u00f6zellikle \u00f6nemlidir.", {
    x: 5.2, y: 4.56, w: 4.3, h: 0.85, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — ROC EĞRİSİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "ROC E\u011frisi ve AUC", "B\u00d6L\u00dcM 3");

  // Sol: açıklama
  addCard(s, 0.4, 0.9, 4.8, 4.4, { leftColor: C.acc });
  cardTitle(s, 0.6, 1.0, 4.4, "ROC E\u011frisi Nedir?", C.acc);
  cardBody(s, 0.6, 1.42, 4.4, 1.4,
    "ROC (Receiver Operating Characteristic) e\u011frisi, modelin farkl\u0131 e\u015fik de\u011ferlerindeki performansını g\u00f6sterir.\n\nX ekseni: Yanl\u0131\u015f Pozitif Oran\u0131 (FPR)\nY ekseni: Do\u011fru Pozitif Oran\u0131 (TPR = Recall)"
  );

  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.95, w: 4.4, h: 0.02, fill: { color: C.bdr } });
  cardTitle(s, 0.6, 3.05, 4.4, "AUC (Area Under Curve)", C.sec);
  cardBody(s, 0.6, 3.45, 4.4, 0.7, "E\u011frinin alt\u0131ndaki alan. 1.0 = m\u00fckemmel model, 0.5 = rastgele tahmin (i\u015fe yaramaz).");

  const aucRanges = [
    ["0.90-1.00", "M\u00fckemmel", C.green],
    ["0.80-0.90", "\u0130yi", C.acc],
    ["0.70-0.80", "Kabul edilebilir", C.amber],
    ["0.60-0.70", "Zay\u0131f", C.red],
    ["0.50-0.60", "Kullan\u0131\u015fs\u0131z", C.mid],
  ];
  aucRanges.forEach(([range, label, clr], i) => {
    const yy = 4.2 + i * 0.22;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: yy + 0.03, w: 0.35, h: 0.16, fill: { color: clr } });
    s.addText(range, { x: 1.05, y: yy, w: 1.2, h: 0.22, margin: 0, fontFace: "Consolas", fontSize: 9, color: C.dark });
    s.addText(label, { x: 2.3, y: yy, w: 2, h: 0.22, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: clr, bold: true });
  });

  // Sağ: Grafik
  addCard(s, 5.4, 0.9, 4.25, 4.4, { topColor: C.acc });
  s.addText("Model Kar\u015f\u0131la\u015ft\u0131rma (ROC)", { x: 5.6, y: 1.0, w: 3.8, h: 0.32, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: C.acc });

  s.addChart(pres.charts.LINE, [
    { name: "XGBoost (0.92)", labels: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"],
      values: [0, 0.55, 0.72, 0.82, 0.88, 0.92, 0.95, 0.97, 0.98, 0.99, 1.0] },
    { name: "Random Forest (0.87)", labels: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"],
      values: [0, 0.42, 0.60, 0.72, 0.80, 0.86, 0.90, 0.93, 0.96, 0.98, 1.0] },
    { name: "Lojistik Reg. (0.78)", labels: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"],
      values: [0, 0.30, 0.48, 0.60, 0.70, 0.77, 0.83, 0.88, 0.92, 0.96, 1.0] },
  ], {
    x: 5.45, y: 1.4, w: 4.05, h: 3.3,
    chartColors: [C.sec, C.amber, C.acc],
    lineSize: 2.5,
    showLegend: true, legendPos: "b", legendFontSize: 8,
    catAxisLabelColor: C.mid, catAxisLabelFontSize: 8,
    valAxisLabelColor: C.mid,
    valGridLine: { color: "E8DDD3", size: 0.5 },
    catGridLine: { style: "none" },
    valAxisMinVal: 0, valAxisMaxVal: 1,
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 21 — ÖNLEME STRATEJİLERİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "\u00d6nleme Stratejileri", "B\u00d6L\u00dcM 4");

  const strategies = [
    { num: "01", title: "Proaktif \u0130leti\u015fim", color: C.acc,
      items: ["Kullan\u0131m d\u00fc\u015ft\u00fc\u011f\u00fcnde otomatik e-posta", "Ki\u015fisel \u00f6neriler ve \u00f6zel teklifler", "D\u00fczenli \u201Cnasıl gidiyor?\u201D anketi"] },
    { num: "02", title: "M\u00fc\u015fteri Ba\u015far\u0131 Ekibi", color: C.sec,
      items: ["Y\u00fcksek riskli hesaplara \u00f6zel CSM atama", "Ayl\u0131k sa\u011fl\u0131k skoru takibi", "Onboarding deneyimini iyile\u015ftirme"] },
    { num: "03", title: "Sadakat Programlar\u0131", color: C.amber,
      items: ["Puan ve \u00f6d\u00fcllendirme sistemleri", "VIP m\u00fc\u015fteri avantajlar\u0131", "Y\u0131ll\u0131k abonelik te\u015fvikleri"] },
    { num: "04", title: "\u00dcr\u00fcn \u0130yile\u015ftirme", color: C.green,
      items: ["\u00c7\u0131k\u0131\u015f anketi ile geri bildirim", "Tekrarlayan sorunlar\u0131n k\u00f6k neden analizi", "En \u00e7ok istenen \u00f6zellik geli\u015ftirme"] },
    { num: "05", title: "Esnek Fiyatland\u0131rma", color: C.purple,
      items: ["Duraklatma se\u00e7ene\u011fi (iptal yerine)", "Kademeli indirim d\u00f6nemleri", "Ki\u015fiye \u00f6zel paket \u00f6nerileri"] },
    { num: "06", title: "Win-Back Kampanyas\u0131", color: C.pink,
      items: ["\u201CSizi \u00f6zledik\u201D indirimleri", "Neden ayr\u0131ld\u0131lar g\u00f6r\u00fc\u015fmesi", "Geli\u015ftirilmi\u015f \u00fcr\u00fcn\u00fc tan\u0131tma"] },
  ];

  strategies.forEach((st, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.35 + col * 3.15, y = 0.9 + row * 2.28;
    addCard(s, x, y, 3.0, 2.12, { topColor: st.color });
    numBadge(s, x + 0.12, y + 0.12, st.num, st.color);
    s.addText(st.title, { x: x + 0.56, y: y + 0.1, w: 2.3, h: 0.38, margin: 0, fontFace: "Georgia", fontSize: 11.5, bold: true, color: C.dark });
    st.items.forEach((item, j) => {
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.18, y: y + 0.58 + j * 0.44 + 0.1, w: 0.04, h: 0.22, fill: { color: st.color } });
      s.addText(item, { x: x + 0.3, y: y + 0.58 + j * 0.44, w: 2.55, h: 0.42, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid });
    });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 22 — MÜŞTERİ SEGMENTASYONU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "M\u00fc\u015fteri Segmentasyonu ve Aksiyon Plan\u0131", "B\u00d6L\u00dcM 4");

  s.addTable([
    [
      { text: "Segment", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10 } },
      { text: "Risk", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10 } },
      { text: "Profil", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10 } },
      { text: "\u00d6nerilen Aksiyon", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10 } },
      { text: "\u00d6ncelik", options: { fill: { color: C.pri }, color: "FFFFFF", bold: true, fontFace: "Calibri", fontSize: 10 } },
    ],
    ...[
      ["\u015eampiyon", "D\u00fc\u015f\u00fck", "Y\u00fcksek RFM, sad\u0131k", "\u00d6d\u00fcllendirme, referans program\u0131", "Orta"],
      ["Sadık", "D\u00fc\u015f\u00fck", "D\u00fczenli al\u0131\u015fveri\u015f", "VIP avantajlar, cross-sell", "Orta"],
      ["Potansiyel", "Orta", "Yeni, aktif", "Onboarding iyile\u015ftirme, e\u011fitim", "Y\u00fcksek"],
      ["Risk Alt\u0131nda", "Y\u00fcksek", "Kullan\u0131m d\u00fc\u015f\u00fc\u015fte", "Proaktif ileti\u015fim, \u00f6zel teklif", "Kritik"],
      ["Uyuyan", "Y\u00fcksek", "Uzun s\u00fcredir inaktif", "Win-back kampanyas\u0131, indirim", "Kritik"],
      ["Kaybedilmi\u015f", "\u2014", "Terk etmi\u015f", "Geri kazanma e-postas\u0131, anket", "D\u00fc\u015f\u00fck"],
    ].map((row, i) => row.map((cell, ci) => {
      let clr = C.dark;
      if (ci === 1) { if (cell === "Y\u00fcksek") clr = C.red; else if (cell === "Orta") clr = C.amber; else if (cell === "D\u00fc\u015f\u00fck") clr = C.green; }
      if (ci === 4) { if (cell === "Kritik") clr = C.red; else if (cell === "Y\u00fcksek") clr = C.amber; }
      return {
        text: cell,
        options: {
          fill: { color: i % 2 === 0 ? C.warmBg : "FFFFFF" },
          fontFace: "Calibri", fontSize: 10,
          bold: ci === 0 || ci === 4,
          color: clr,
        }
      };
    }))
  ], {
    x: 0.4, y: 0.9, w: 9.2, h: 2.8,
    colW: [1.4, 1.0, 2.0, 3.0, 1.8],
    border: { pt: 0.5, color: C.bdr },
  });

  // Pie chart
  addCard(s, 0.4, 3.9, 4.5, 1.65, { topColor: C.sec });
  s.addText("Tipik Segment Da\u011f\u0131l\u0131m\u0131", { x: 0.6, y: 4.0, w: 4.0, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.sec });
  s.addChart(pres.charts.PIE, [{
    name: "Segment",
    labels: ["\u015eampiyon", "Sad\u0131k", "Potansiyel", "Riskli", "Uyuyan", "Kayb."],
    values: [8, 22, 25, 20, 15, 10]
  }], {
    x: 0.45, y: 4.3, w: 4.3, h: 1.2,
    chartColors: [C.green, C.acc, C.blue, C.amber, C.purple, C.mid],
    showPercent: true, showLegend: true, legendPos: "r", legendFontSize: 8,
  });

  addCard(s, 5.1, 3.9, 4.5, 1.65, { leftColor: C.red });
  s.addText("\u00d6nemli Not", { x: 5.3, y: 4.0, w: 4.1, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.red });
  cardBody(s, 5.3, 4.35, 4.1, 1.1,
    "Kaynaklar\u0131 e\u015fit da\u011f\u0131tmay\u0131n!\n\n\u2022 Riskli ve uyuyan segmentlere \u00f6ncelik verin\n\u2022 \u015eampiyon m\u00fc\u015fterileri ihmal etmeyin ama a\u015f\u0131r\u0131 yat\u0131r\u0131m yapmay\u0131n\n\u2022 Her segmente farkl\u0131 mesaj ve kanal kullan\u0131n",
    { size: 10.5 }
  );
}


// ═══════════════════════════════════════════════════════════
// SLAYT 23 — VAKA ÇALIŞMASI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  slideHeader(s, "Ger\u00e7ek D\u00fcnya \u00d6rne\u011fi: Telekom Sekt\u00f6r\u00fc", "B\u00d6L\u00dcM 4");

  // Senaryo
  addCard(s, 0.4, 0.9, 9.2, 1.2, { leftColor: C.sec });
  s.addText("Senaryo", { x: 0.6, y: 1.0, w: 1.2, h: 0.3, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: C.sec });
  cardBody(s, 0.6, 1.35, 8.8, 0.65,
    "Bir telekom \u015firketi aylık %2.8 terk oran\u0131 ya\u015f\u0131yor. 500.000 aboneden her ay ~14.000\u2019i ayr\u0131l\u0131yor. Her kaybedilen m\u00fc\u015fterinin ortalama ya\u015fam boyu de\u011feri \u20ba2.400. Ayl\u0131k kayıp: ~\u20ba33.6M"
  );

  // Sonuçlar: Öncesi / Sonrası
  const befAft = [
    { title: "\u00d6NCES\u0130", color: C.red, items: [
      ["\u2022 Terk oran\u0131:", "%2.8 / ay"],
      ["\u2022 Ayl\u0131k kayb\u0131:", "14.000 abone"],
      ["\u2022 Ayl\u0131k gelir kaybı:", "\u20ba33.6M"],
      ["\u2022 Model:", "Yok (reaktif)"],
    ]},
    { title: "SONRASI (6 ay)", color: C.green, items: [
      ["\u2022 Terk oran\u0131:", "%1.6 / ay (\u2193%43)"],
      ["\u2022 Ayl\u0131k kayb\u0131:", "8.000 abone"],
      ["\u2022 Ayl\u0131k gelir kaybı:", "\u20ba19.2M"],
      ["\u2022 Model:", "XGBoost (AUC: 0.91)"],
    ]},
  ];
  befAft.forEach((ba, i) => {
    const x = 0.4 + i * 4.7;
    addCard(s, x, 2.3, 4.4, 2.2, { topColor: ba.color });
    s.addText(ba.title, { x: x + 0.15, y: 2.42, w: 4.1, h: 0.35, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: ba.color });
    ba.items.forEach(([lbl, val], j) => {
      const yy = 2.85 + j * 0.38;
      s.addText(lbl, { x: x + 0.15, y: yy, w: 2.2, h: 0.34, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.dark });
      s.addText(val, { x: x + 2.35, y: yy, w: 1.9, h: 0.34, margin: 0, fontFace: "Calibri", fontSize: 12, bold: true, color: ba.color, align: "right" });
    });
  });

  // Yapılanlar
  addCard(s, 0.4, 4.7, 9.2, 0.8, { topColor: C.acc });
  s.addText("Yap\u0131lan M\u00fcdahaleler:", { x: 0.6, y: 4.8, w: 2.5, h: 0.25, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: C.acc });
  s.addText("XGBoost terk modeli kuruldu  \u2192  Y\u00fcksek riskli 3.000 aboneye proaktif arama  \u2192  S\u00f6zle\u015fme yenileme te\u015fvikleri  \u2192  Onboarding s\u00fcreci yenilendi", {
    x: 0.6, y: 5.08, w: 8.8, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 24 — ÖZET
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.pri };

  // Üst teal şerit
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.acc } });

  s.addText("\u00d6zet ve Temel \u00c7\u0131kar\u0131mlar", {
    x: 0.5, y: 0.2, w: 9, h: 0.6, margin: 0,
    fontFace: "Georgia", fontSize: 28, bold: true, color: "FFFFFF"
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.82, w: 2.5, h: 0.04, fill: { color: C.sec } });

  const takeaways = [
    { num: "1", text: "Terk analizi reaktif de\u011fil proaktif olmal\u0131d\u0131r. M\u00fc\u015fteri ayr\u0131lmadan \u00f6nce harekete ge\u00e7in.", color: C.acc },
    { num: "2", text: "Veriye dayal\u0131 karar al\u0131n. Makine \u00f6\u011frenmesi modelleri %80+ do\u011frulukla risk tespiti yapabilir.", color: C.sec },
    { num: "3", text: "Her m\u00fc\u015fteri segmentine farkl\u0131 yakla\u015f\u0131n. Tek tip ileti\u015fim etkisizdir.", color: C.amber },
    { num: "4", text: "Recall metri\u011fini \u00f6n planda tutun. Ka\u00e7\u0131r\u0131lan terk, yanl\u0131\u015f alarmdan daha maliyetlidir.", color: C.green },
    { num: "5", text: "Elde tutmak kazanmaktan ucuzdur. %5 iyile\u015ftirme %25-95 k\u00e2r art\u0131\u015f\u0131 getirebilir.", color: C.purple },
  ];

  takeaways.forEach((t, i) => {
    const y = 1.05 + i * 0.72;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.6, fill: { color: "3D231A" }, line: { color: "5A3828", width: 1 } });
    s.addShape(pres.shapes.OVAL, { x: 0.62, y: y + 0.12, w: 0.36, h: 0.36, fill: { color: t.color } });
    s.addText(t.num, { x: 0.62, y: y + 0.12, w: 0.36, h: 0.36, margin: 0, fontFace: "Calibri", fontSize: 13, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(t.text, { x: 1.12, y, w: 8.2, h: 0.6, margin: 0, fontFace: "Calibri", fontSize: 12, color: C.secLt, valign: "middle" });
  });

  // Alt bölüm
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.65, w: 10, h: 0.975, fill: { color: "2E1710" } });
  s.addText("\u201CM\u00fc\u015fteriyi elde tutmak, b\u00fcy\u00fcmek i\u00e7in kazanmaktan \u00e7ok daha \u00f6nemlidir.\u201D", {
    x: 0.5, y: 4.72, w: 9, h: 0.45, margin: 0,
    fontFace: "Georgia", fontSize: 16, bold: true, color: C.sec, italic: true
  });
  s.addText("Dr. Murat Alt\u00fcn  \u00b7  Veri Bilimi ve Yapay Zek\u00e2 E\u011fitimi  \u00b7  2026", {
    x: 0.5, y: 5.2, w: 9, h: 0.3, margin: 0,
    fontFace: "Calibri", fontSize: 10, color: C.subtle
  });
}


// ── DOSYA YAZ ─────────────────────────────────────────────
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/Musteri_Terk_Analizi_v2.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("OK:", outPath);
}).catch(err => console.error("HATA:", err));
