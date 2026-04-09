/**
 * Hafta 15 — AI Etik, Gelecek ve AI Capstone Projesi
 * ===================================================
 * Dr. Murat Altun — Veri Bilimi ve Yapay Zekâ Eğitimi
 */

const T = require("/Users/drmurataltun/.claude/pptx-template.js");
const C = T.C;

const pres = T.createPres("Hafta 15: AI Etik ve Capstone Projesi");
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
  "AI Etik ve\nCapstone Projesi",
  "Hafta 15 \u00b7 Mod\u00fcl 15 (Final)\nSorumlu AI, Gelecek Vizyonu ve B\u00fcy\u00fck Final Projesi",
  "Dr. Murat Altun",
  [
    { value: "6",  label: "Saat" },
    { value: "2",  label: "Notebook" },
    { value: "5",  label: "Proje Se\u00e7ene\u011fi" },
  ]
);


// ═══════════════════════════════════════════════════════════
// SLAYT 2 — İÇİNDEKİLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "\u0130\u00e7indekiler", null);

  const sections = [
    { num: "01", title: "AI Etik",            items: "Bias \u00b7 Fairness \u00b7 Transparency \u00b7 EU AI Act \u00b7 Sorumlu AI \u0130lkeleri", color: C.sec,    slides: "Slayt 3\u20139" },
    { num: "02", title: "AI\u2019\u0131n Gelece\u011fi",     items: "AGI \u00b7 Multimodal \u00b7 Otonom Ajanlar \u00b7 Kariyer Yollar\u0131 \u00b7 15 Hafta \u00d6zeti", color: C.acc,    slides: "Slayt 10\u201312" },
    { num: "03", title: "Capstone Projesi",   items: "5 Proje Se\u00e7ene\u011fi \u00b7 De\u011ferlendirme \u00b7 Notebook\u2019lar \u00b7 \u00d6dev", color: C.amber,  slides: "Slayt 13\u201319" },
  ];

  sections.forEach((sec, i) => {
    const y = 1.15 + i * 1.35;
    card(s, 0.5, y, 9.0, 1.15, { leftColor: sec.color });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.56, y: y + 0.2, w: 0.7, h: 0.7, fill: { color: sec.color } });
    s.addText(sec.num, { x: 0.56, y: y + 0.2, w: 0.7, h: 0.7, margin: 0, fontFace: "Georgia", fontSize: 22, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(sec.title, { x: 1.4, y: y + 0.15, w: 5, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 16, bold: true, color: C.dark });
    s.addText(sec.items, { x: 1.4, y: y + 0.6, w: 5, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 11, color: C.mid });
    s.addText(sec.slides, { x: 7.8, y: y + 0.35, w: 1.5, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10, color: sec.color, bold: true, align: "right" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 3 — AI ETİĞİ NEDİR?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "AI Eti\u011fi Nedir?", "B\u00d6L\u00dcM 1");

  // Tanım kartı
  card(s, 0.5, 1.0, 9.0, 1.1, { topColor: C.pri });
  T.cardTitle(s, 0.7, 1.12, 8.5, "Tan\u0131m");
  T.cardBody(s, 0.7, 1.45, 8.5, 0.55, "AI eti\u011fi, yapay zek\u00e2 sistemlerinin tasarlanmas\u0131, geli\u015ftirilmesi ve kullan\u0131lmas\u0131 s\u0131ras\u0131nda ortaya \u00e7\u0131kan ahlaki sorular\u0131, toplumsal etkileri ve sorumluluklar\u0131 inceleyen disiplinler aras\u0131 bir aland\u0131r.");

  // Neden önemli?
  card(s, 0.5, 2.3, 4.3, 1.3, { leftColor: C.acc });
  T.cardTitle(s, 0.7, 2.4, 3.8, "Neden \u00d6nemli?", C.acc);
  T.cardBody(s, 0.7, 2.75, 3.8, 0.75, "\u2022 AI kararlar\u0131 milyarlarca insan\u0131 etkiliyor\n\u2022 \u00d6nyarg\u0131l\u0131 modeller e\u015fitsizli\u011fi derinle\u015ftirebilir\n\u2022 \u015eeffafl\u0131k olmadan g\u00fcven in\u015fa edilemez");

  // Gerçek dünya etkileri
  card(s, 5.0, 2.3, 4.5, 1.3, { leftColor: C.red });
  T.cardTitle(s, 5.2, 2.4, 4.0, "Ger\u00e7ek D\u00fcnya Etkileri", C.red);
  T.cardBody(s, 5.2, 2.75, 4.0, 0.75, "\u2022 Ceza adalet sistemlerinde \u0131rk\u00e7\u0131 tahminler\n\u2022 Kredi skorlamas\u0131nda cinsiyet ayr\u0131mc\u0131l\u0131\u011f\u0131\n\u2022 Deepfake ile dezenformasyon yay\u0131l\u0131m\u0131");

  // 3 stat box
  stat(s, 0.5, 3.85, 2.8, 1.35, "78%", "AI Liderlerinin\nEtik Endi\u015feleri", C.sec);
  stat(s, 3.6, 3.85, 2.8, 1.35, "40+", "\u00dclkede AI\nD\u00fczenleme \u00c7al\u0131\u015fmas\u0131", C.acc);
  stat(s, 6.7, 3.85, 2.8, 1.35, "$4.7T", "2030 AI Pazar\nB\u00fcy\u00fckl\u00fc\u011f\u00fc", C.amber);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 4 — BIAS (YANLILIK)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Bias (Yanl\u0131l\u0131k)", "B\u00d6L\u00dcM 1");

  // Veri yanlılığı
  card(s, 0.5, 1.0, 4.3, 1.6, { topColor: C.red });
  badge(s, 0.65, 1.12, 1, C.red);
  T.cardTitle(s, 1.1, 1.12, 3.5, "Veri Yanl\u0131l\u0131\u011f\u0131 (Data Bias)");
  T.cardBody(s, 0.7, 1.5, 3.9, 0.95, "\u2022 E\u011fitim verisi toplumu temsil etmiyorsa\n\u2022 Tarihi \u00f6nyarg\u0131lar veriye yans\u0131r\n\u2022 \u00d6rne\u011fin: Y\u00fcz tan\u0131mada koyu ten rengi i\u00e7in d\u00fc\u015f\u00fck ba\u015far\u0131 oran\u0131");

  // Algoritma yanlılığı
  card(s, 5.2, 1.0, 4.3, 1.6, { topColor: C.purple });
  badge(s, 5.35, 1.12, 2, C.purple);
  T.cardTitle(s, 5.8, 1.12, 3.5, "Algoritma Yanl\u0131l\u0131\u011f\u0131");
  T.cardBody(s, 5.4, 1.5, 3.9, 0.95, "\u2022 Model mimarisinin kendisi yanlı olabilir\n\u2022 Optimizasyon hedefi etik de\u011fil\n\u2022 Proxy de\u011fi\u015fkenler \u00fczerinden dolayl\u0131 ayr\u0131mc\u0131l\u0131k");

  // Amazon örneği (vaka kutusu)
  card(s, 0.5, 2.85, 9.0, 2.35, { topColor: C.amber });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.85, w: 9.0, h: 0.45, fill: { color: C.amber } });
  s.addText("\u26a0\ufe0f  VAKA \u00c7ALI\u015eMASI: Amazon \u0130\u015fe Al\u0131m AI\u2019\u0131", { x: 0.7, y: 2.85, w: 8.5, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 13, bold: true, color: "FFFFFF", valign: "middle" });

  const amazonItems = [
    { label: "Problem", text: "Amazon\u2019\u0131n i\u015fe al\u0131m AI\u2019\u0131 kad\u0131n adaylar\u0131 sistematik olarak d\u00fc\u015f\u00fck puanlad\u0131", color: C.red },
    { label: "Neden", text: "10 y\u0131ll\u0131k \u00e7o\u011funlukla erkek \u00e7al\u0131\u015fan verisiyle e\u011fitildi \u2014 model \u2018erkek = ba\u015far\u0131l\u0131\u2019 \u00f6\u011frendi", color: C.amber },
    { label: "Sonu\u00e7", text: "Sistem 2018\u2019de kapat\u0131ld\u0131. AI bias\u2019\u0131n en bilinen \u00f6rneklerinden biri oldu", color: C.green },
  ];

  amazonItems.forEach((item, i) => {
    const y = 3.45 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 0.08, h: 0.4, fill: { color: item.color } });
    s.addText(item.label, { x: 0.95, y, w: 1.1, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: item.color, valign: "middle" });
    s.addText(item.text, { x: 2.1, y, w: 7.2, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark, valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 5 — FAIRNESS (ADALET)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Fairness (Adalet)", "B\u00d6L\u00dcM 1");

  // Tablo: farklı adalet tanımları
  const rows = [
    ["Adalet T\u00fcr\u00fc", "Tan\u0131m", "\u00d6rnek"],
    ["Demografik E\u015fitlik", "Her gruba e\u015fit oranda olumlu karar", "Kredi onay\u0131 her etnik grup i\u00e7in %50"],
    ["F\u0131rsat E\u015fitli\u011fi", "Ger\u00e7ek pozitifler i\u00e7in e\u015fit do\u011fru pozitif oran\u0131", "Hastal\u0131\u011f\u0131 olan herkes e\u015fit tan\u0131 \u015fans\u0131"],
    ["Bireysel Adalet", "Benzer ki\u015filere benzer kararlar", "Ayn\u0131 niteliklere sahip ki\u015filer ayn\u0131 sonu\u00e7"],
    ["Kalibre Edilmi\u015f", "Tahmin olas\u0131l\u0131klar\u0131 ger\u00e7ek oranlarla \u00f6rt\u00fc\u015fs\u00fcn", "%80 g\u00fcven = ger\u00e7ekte %80 do\u011fru"],
  ];

  s.addTable(rows, {
    x: 0.5, y: 1.05, w: 9.0,
    fontSize: 10, fontFace: "Calibri",
    border: { type: "solid", color: C.bdr, pt: 0.5 },
    colW: [2.0, 3.5, 3.5],
    rowH: [0.4, 0.55, 0.55, 0.55, 0.55],
    autoPage: false,
    color: C.dark,
    rowOpts: rows.map((_, i) => ({
      fill: i === 0 ? C.pri : (i % 2 === 1 ? C.warmBg : C.card),
      color: i === 0 ? "FFFFFF" : C.dark,
      bold: i === 0,
    })),
  });

  // Alt not kutusu
  card(s, 0.5, 3.9, 9.0, 1.3, { leftColor: C.purple });
  T.cardTitle(s, 0.7, 4.0, 8.5, "Adalet Paradoksu", C.purple);
  T.cardBody(s, 0.7, 4.35, 8.5, 0.75, "T\u00fcm adalet tanımlar\u0131n\u0131 ayn\u0131 anda sa\u011flamak matematiksel olarak imk\u00e2ns\u0131zd\u0131r (Chouldechova, 2017). Bu nedenle hangi adalet tan\u0131m\u0131n\u0131n uygulanaca\u011f\u0131 ba\u011flama (domain) g\u00f6re karar verilmelidir. Sa\u011fl\u0131k alan\u0131nda f\u0131rsat e\u015fitli\u011fi, kredi skorlamas\u0131nda kalibre edilmi\u015f adalet tercih edilir.");
}


// ═══════════════════════════════════════════════════════════
// SLAYT 6 — TRANSPARENCY (ŞEFFAFLIK)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Transparency (\u015eeffafl\u0131k)", "B\u00d6L\u00dcM 1");

  // 3 kart yan yana
  const cards = [
    { title: "Explainable AI (XAI)", body: "Model kararlar\u0131n\u0131n neden verildi\u011fini a\u00e7\u0131klayabilme yetene\u011fi. Kullan\u0131c\u0131 g\u00fcveni ve regülasyon uyumu i\u00e7in kritik.", color: C.acc, icon: "?" },
    { title: "Black Box Problemi", body: "Derin \u00f6\u011frenme modelleri milyarlarca parametreyle karar verir. \u0130\u00e7 mant\u0131k insan i\u00e7in anla\u015f\u0131lmaz. Hayati kararlarda kabul edilemez.", color: C.red, icon: "\u25a0" },
    { title: "LIME & SHAP", body: "LIME: Yerel a\u00e7\u0131klamalar \u00fcretir (her tahmin i\u00e7in).\nSHAP: Shapley de\u011ferleriyle global \u00f6zellik \u00f6nemi hesaplar.", color: C.green, icon: "\u2713" },
  ];

  cards.forEach((c, i) => {
    const x = 0.5 + i * 3.1;
    card(s, x, 1.05, 2.85, 2.6, { topColor: c.color });
    s.addShape(pres.shapes.OVAL, { x: x + 1.12, y: 1.2, w: 0.6, h: 0.6, fill: { color: c.color } });
    s.addText(c.icon, { x: x + 1.12, y: 1.2, w: 0.6, h: 0.6, margin: 0, fontFace: "Georgia", fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    T.cardTitle(s, x + 0.15, 1.9, 2.55, c.title, c.color);
    T.cardBody(s, x + 0.15, 2.28, 2.55, 1.2, c.body);
  });

  // XAI akış diyagramı
  card(s, 0.5, 3.9, 9.0, 1.3, { topColor: C.pri });
  const steps = ["Veri Giri\u015fi", "Model Karar\u0131", "XAI A\u00e7\u0131klamas\u0131", "Kullan\u0131c\u0131 G\u00fcveni"];
  steps.forEach((step, i) => {
    const x = 0.8 + i * 2.2;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.2, w: 1.7, h: 0.55, fill: { color: i === 2 ? C.acc : C.warmBg }, line: { color: C.bdr, width: 1 } });
    s.addText(step, { x, y: 4.2, w: 1.7, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: i === 2 ? "FFFFFF" : C.dark, align: "center", valign: "middle" });
    if (i < steps.length - 1) {
      s.addText("\u2192", { x: x + 1.7, y: 4.2, w: 0.5, h: 0.55, margin: 0, fontFace: "Calibri", fontSize: 18, color: C.sec, align: "center", valign: "middle" });
    }
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 7 — EU AI ACT
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "EU AI Act \u2014 Avrupa AI D\u00fczenleme", "B\u00d6L\u00dcM 1");

  const levels = [
    { level: "YASAK", risk: "Kabul Edilemez Risk", examples: "Sosyal skorlama, biometrik k\u00fctle g\u00f6zetimi, manipulatif AI", color: C.red, bg: "FDECEC" },
    { level: "Y\u00dcKSEK", risk: "Y\u00fcksek Risk", examples: "Sa\u011fl\u0131k AI, i\u015fe al\u0131m, e\u011fitim, kredi skorlama, adalet sistemi", color: C.amber, bg: "FFF3E0" },
    { level: "SINIRLI", risk: "S\u0131n\u0131rl\u0131 Risk", examples: "Chatbotlar, deepfake i\u00e7erik — \u015feffafl\u0131k y\u00fcks\u00fcml\u00fcl\u00fc\u011f\u00fc", color: C.blue, bg: "E8F4FD" },
    { level: "M\u0130N\u0130MAL", risk: "Minimal Risk", examples: "Spam filtre, oyun AI, \u00f6neri sistemleri — d\u00fczenleme yok", color: C.green, bg: "E8F5E9" },
  ];

  levels.forEach((lv, i) => {
    const y = 1.05 + i * 1.05;
    card(s, 0.5, y, 9.0, 0.9, { leftColor: lv.color, bg: lv.bg });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.56, y: y + 0.15, w: 1.2, h: 0.6, fill: { color: lv.color } });
    s.addText(lv.level, { x: 0.56, y: y + 0.15, w: 1.2, h: 0.6, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(lv.risk, { x: 1.9, y: y + 0.1, w: 3.0, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: lv.color });
    s.addText(lv.examples, { x: 1.9, y: y + 0.48, w: 7.4, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.mid });
  });

  // Yürürlük bilgisi
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 5.0, w: 9.0, h: 0.05, fill: { color: C.acc } });
  s.addText("Y\u00fcr\u00fcrl\u00fck: 2024 onay \u2192 2025 yasak uygulamalar\u0131 \u2192 2026 y\u00fcksek risk y\u00fcks\u00fcml\u00fcl\u00fckleri \u2192 2027 tam uygulama", {
    x: 0.5, y: 5.1, w: 9.0, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.acc, italic: true, align: "center"
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 8 — SORUMLU AI İLKELERİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Sorumlu AI \u0130lkeleri", "B\u00d6L\u00dcM 1");

  const principles = [
    { title: "G\u00fcvenlik", desc: "AI sistemleri g\u00fcvenli ve sa\u011flam olmal\u0131. Adversarial sald\u0131r\u0131lara dayan\u0131kl\u0131, hata durumlar\u0131nda g\u00fcvenli mod.", color: C.red },
    { title: "Adalet", desc: "T\u00fcm gruplar i\u00e7in adil sonu\u00e7lar. Bias tespiti ve azaltma s\u00fcre\u00e7leri zorunlu.", color: C.amber },
    { title: "Gizlilik", desc: "Ki\u015fisel verilerin korunmas\u0131. Differential privacy, federe \u00f6\u011frenme, veri minimizasyonu.", color: C.purple },
    { title: "\u015eeffafl\u0131k", desc: "Model kararlar\u0131 a\u00e7\u0131klanabilir olmal\u0131. Dok\u00fcmantasyon, model kartlar\u0131, veri sayfalar\u0131.", color: C.acc },
    { title: "Hesap Verebilirlik", desc: "AI kararlar\u0131ndan sorumlu ki\u015fi/kurum belirlenmeli. Denetim ve log mekanizmalar\u0131.", color: C.blue },
    { title: "Kapsay\u0131c\u0131l\u0131k", desc: "Engelli bireyler dahil herkes i\u00e7in eri\u015filebilir. \u00c7ok dilli, k\u00fclt\u00fcrel fark\u0131ndal\u0131k.", color: C.green },
  ];

  principles.forEach((p, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.1;
    const y = 1.05 + row * 2.05;
    card(s, x, y, 2.85, 1.85, { topColor: p.color });
    badge(s, x + 1.2, y + 0.15, i + 1, p.color);
    T.cardTitle(s, x + 0.15, y + 0.6, 2.55, p.title, p.color);
    T.cardBody(s, x + 0.15, y + 0.95, 2.55, 0.8, p.desc);
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 9 — AI BIAS ANALİZİ KODU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "AI Bias Analizi Kodu", "B\u00d6L\u00dcM 1");

  code(s, 0.5, 1.05, 9.0, 4.2, [
    { text: "# Fairness metrikleri hesaplama", options: { color: C.codeGreen, fontSize: 9 } },
    { text: "import pandas as pd", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "from sklearn.metrics import confusion_matrix", options: { color: C.codeBlue, fontSize: 9 } },
    { text: "", options: { fontSize: 9 } },
    { text: "def demographic_parity(y_pred, group):", options: { color: C.codeYellow, fontSize: 9 } },
    { text: '    """Demografik e\u015fitlik: P(Y=1|G=a) = P(Y=1|G=b)"""', options: { color: C.codeGreen, fontSize: 9 } },
    { text: "    rates = {}", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    for g in group.unique():", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "        mask = (group == g)", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "        rates[g] = y_pred[mask].mean()", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    return rates", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "", options: { fontSize: 9 } },
    { text: "def equalized_odds(y_true, y_pred, group):", options: { color: C.codeYellow, fontSize: 9 } },
    { text: '    """F\u0131rsat e\u015fitli\u011fi: TPR ve FPR gruplar aras\u0131 e\u015fit"""', options: { color: C.codeGreen, fontSize: 9 } },
    { text: "    results = {}", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    for g in group.unique():", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "        mask = (group == g)", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "        tn, fp, fn, tp = confusion_matrix(", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "            y_true[mask], y_pred[mask]).ravel()", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "        tpr = tp / (tp + fn) if (tp + fn) > 0 else 0", options: { color: C.codeWhite, fontSize: 9 } },
    { text: "        fpr = fp / (fp + tn) if (fp + tn) > 0 else 0", options: { color: C.codeWhite, fontSize: 9 } },
    { text: '        results[g] = {"TPR": tpr, "FPR": fpr}', options: { color: C.codeWhite, fontSize: 9 } },
    { text: "    return results", options: { color: C.codeWhite, fontSize: 9 } },
  ]);
}


// ═══════════════════════════════════════════════════════════
// SLAYT 10 — AI'NIN GELECEĞİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "AI\u2019n\u0131n Gelece\u011fi", "B\u00d6L\u00dcM 2");

  const futures = [
    { title: "AGI (Genel Yapay Zek\u00e2)", desc: "\u0130nsan seviyesinde genel zek\u00e2. Hen\u00fcz teorik a\u015famada ama ilerlemeler h\u0131zlan\u0131yor. Tahmin: 2030\u20132050 aral\u0131\u011f\u0131.", color: C.red, icon: "\u221e" },
    { title: "Multimodal Modeller", desc: "Metin + g\u00f6r\u00fcnt\u00fc + ses + video birle\u015fik i\u015fleme. GPT-4V, Gemini, Claude \u00f6rnekleri. Ger\u00e7ek d\u00fcnya alg\u0131s\u0131.", color: C.acc, icon: "\u25ce" },
    { title: "Otonom Ajanlar", desc: "AI\u2019\u0131n kendi ba\u015f\u0131na karar verip eylem yapmas\u0131. Tool-use, planlama, multi-agent i\u015fbirli\u011fi.", color: C.amber, icon: "\u2699" },
    { title: "AI-Human Collaboration", desc: "\u0130nsan + AI birlikte \u00e7al\u0131\u015fma. Augmented intelligence yakla\u015f\u0131m\u0131. Yarat\u0131c\u0131l\u0131k ve karar deste\u011fi.", color: C.purple, icon: "\u2764" },
  ];

  futures.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.6;
    const y = 1.05 + row * 2.1;
    card(s, x, y, 4.3, 1.85, { topColor: f.color });
    s.addShape(pres.shapes.OVAL, { x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55, fill: { color: f.color } });
    s.addText(f.icon, { x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    T.cardTitle(s, x + 0.9, y + 0.25, 3.2, f.title, f.color);
    T.cardBody(s, x + 0.2, y + 0.75, 3.9, 0.95, f.desc);
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 11 — AI KARİYER YOLLARI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "AI Kariyer Yollar\u0131", "B\u00d6L\u00dcM 2");

  const rows = [
    ["Rol", "Temel Beceriler", "Ortalama Ma\u015f (ABD)", "Talep"],
    ["Data Scientist", "Python, ML, \u0130statistik, SQL", "$130K+", "\u2605\u2605\u2605\u2605\u2605"],
    ["ML Engineer", "MLOps, Docker, Cloud, CI/CD", "$145K+", "\u2605\u2605\u2605\u2605\u2605"],
    ["AI Researcher", "Matematik, Paper yazma, PyTorch", "$160K+", "\u2605\u2605\u2605\u2605"],
    ["Prompt Engineer", "LLM\u2019ler, Prompt Design, RAG", "$120K+", "\u2605\u2605\u2605\u2605\u2605"],
    ["AI Ethics Officer", "Hukuk, Sosyoloji, AI bilgisi", "$110K+", "\u2605\u2605\u2605"],
    ["Computer Vision Eng.", "OpenCV, YOLO, CNN, 3D Vision", "$140K+", "\u2605\u2605\u2605\u2605"],
    ["NLP Engineer", "Transformers, Tokenization, LLM", "$135K+", "\u2605\u2605\u2605\u2605\u2605"],
  ];

  s.addTable(rows, {
    x: 0.5, y: 1.05, w: 9.0,
    fontSize: 10, fontFace: "Calibri",
    border: { type: "solid", color: C.bdr, pt: 0.5 },
    colW: [2.2, 2.8, 1.8, 2.2],
    rowH: [0.4, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45],
    autoPage: false,
    color: C.dark,
    rowOpts: rows.map((_, i) => ({
      fill: i === 0 ? C.pri : (i % 2 === 1 ? C.warmBg : C.card),
      color: i === 0 ? "FFFFFF" : C.dark,
      bold: i === 0,
    })),
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 12 — 15 HAFTA ÖZETİ (TIMELINE)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "15 Haftal\u0131k Yolculuk \u00d6zeti", "B\u00d6L\u00dcM 2");

  const weeks = [
    { w: "H1-3", topic: "Python, NumPy, Pandas, G\u00f6rselle\u015ftirme", color: C.sec },
    { w: "H4-5", topic: "\u0130statistik, A/B Testi, Olasılık", color: C.acc },
    { w: "H6-7", topic: "ML Temelleri, Regresyon, S\u0131n\u0131fland\u0131rma", color: C.amber },
    { w: "H8-9", topic: "Ensemble, XGBoost, Hiperparametre", color: C.purple },
    { w: "H10-11", topic: "NLP, Transformers, Sentiment Analizi", color: C.blue },
    { w: "H12-13", topic: "Deep Learning, CNN, Transfer Learning", color: C.green },
    { w: "H14", topic: "GenAI, RAG, Prompt Engineering", color: C.red },
    { w: "H15", topic: "AI Etik, Gelecek, Capstone (BU HAFTA!)", color: C.pri },
  ];

  // Dikey çizgi
  s.addShape(pres.shapes.RECTANGLE, { x: 2.1, y: 1.1, w: 0.04, h: 4.2, fill: { color: C.bdr } });

  weeks.forEach((wk, i) => {
    const y = 1.1 + i * 0.52;
    s.addShape(pres.shapes.OVAL, { x: 1.95, y: y + 0.08, w: 0.34, h: 0.34, fill: { color: wk.color } });
    s.addText(wk.w, { x: 0.5, y: y + 0.02, w: 1.35, h: 0.4, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: wk.color, align: "right" });
    // Yatay konnektör
    s.addShape(pres.shapes.RECTANGLE, { x: 2.35, y: y + 0.22, w: 0.35, h: 0.03, fill: { color: wk.color } });
    card(s, 2.8, y, 6.7, 0.45, { leftColor: wk.color, bg: i === 7 ? wk.color : C.card });
    s.addText(wk.topic, { x: 3.0, y: y, w: 6.3, h: 0.45, margin: 0, fontFace: "Calibri", fontSize: 10.5, bold: i === 7, color: i === 7 ? "FFFFFF" : C.dark, valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 13 — CAPSTONE: AKILLI FİTNESS ASİSTANI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Capstone: Ak\u0131ll\u0131 Fitness Asistan\u0131", "B\u00d6L\u00dcM 3");

  card(s, 0.5, 1.05, 9.0, 1.2, { topColor: C.red });
  T.cardTitle(s, 0.7, 1.15, 8.5, "OpenCV + MediaPipe ile Hareket Sayma ve Form Analizi", C.red);
  T.cardBody(s, 0.7, 1.55, 8.5, 0.6, "Kamera g\u00f6r\u00fcnt\u00fcs\u00fcnden v\u00fccut pozisyonlar\u0131n\u0131 alg\u0131layarak egzersiz tekrarlar\u0131n\u0131 otomatik sayan ve yanl\u0131\u015f formu uyaran bir ger\u00e7ek zamanl\u0131 AI asistan\u0131.");

  const steps = [
    { num: "1", title: "Pose Estimation", desc: "MediaPipe Pose ile 33 landmark tespit", color: C.sec },
    { num: "2", title: "A\u00e7\u0131 Hesaplama", desc: "Diz/dirsek a\u00e7\u0131lar\u0131 ile hareket fazlar\u0131", color: C.acc },
    { num: "3", title: "Tekrar Sayac\u0131", desc: "Durum makinesi: yukar\u0131 \u2192 a\u015fa\u011f\u0131 \u2192 tekrar++", color: C.amber },
    { num: "4", title: "Form Kontrol\u00fc", desc: "Yanl\u0131\u015f a\u00e7\u0131larda uyar\u0131 g\u00f6sterimi", color: C.purple },
  ];

  steps.forEach((st, i) => {
    const x = 0.5 + i * 2.3;
    card(s, x, 2.5, 2.1, 1.8, { topColor: st.color });
    badge(s, x + 0.85, 2.6, st.num, st.color);
    T.cardTitle(s, x + 0.1, 3.05, 1.9, st.title, st.color);
    T.cardBody(s, x + 0.1, 3.4, 1.9, 0.8, st.desc);
  });

  // Teknoloji etiketleri
  const techs = ["Python", "OpenCV", "MediaPipe", "Streamlit"];
  techs.forEach((t, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5 + i * 2.3, y: 4.55, w: 2.1, h: 0.38, fill: { color: C.codeBg } });
    s.addText(t, { x: 0.5 + i * 2.3, y: 4.55, w: 2.1, h: 0.38, margin: 0, fontFace: "Consolas", fontSize: 10, color: C.codeGreen, align: "center", valign: "middle" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 14 — CAPSTONE: FİLM ÖNERİ SİSTEMİ
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Capstone: Film \u00d6neri Sistemi", "B\u00d6L\u00dcM 3");

  card(s, 0.5, 1.05, 9.0, 1.1, { topColor: C.amber });
  T.cardTitle(s, 0.7, 1.15, 8.5, "Collaborative Filtering + GenAI ile Ruh Haline G\u00f6re \u00d6neri", C.amber);
  T.cardBody(s, 0.7, 1.5, 8.5, 0.55, "Kullan\u0131c\u0131 tercihleri ve ruh haline dayal\u0131 ki\u015fisel film \u00f6nerileri sunan, hem geleneksel ML hem de GenAI kullanan hibrit \u00f6neri motoru.");

  // 2 sütunlu mimari
  card(s, 0.5, 2.4, 4.3, 2.7, { leftColor: C.sec });
  T.cardTitle(s, 0.7, 2.5, 3.9, "Collaborative Filtering", C.sec);
  T.cardBody(s, 0.7, 2.85, 3.9, 2.1, "\u2022 User-Item matris fakt\u00f6rizasyonu\n\u2022 Surprise / Implicit k\u00fct\u00fcphaneleri\n\u2022 MovieLens 100K veri seti\n\u2022 Cosine similarity + KNN\n\u2022 Cold-start problemi \u00e7\u00f6z\u00fcmleri");

  card(s, 5.2, 2.4, 4.3, 2.7, { leftColor: C.acc });
  T.cardTitle(s, 5.4, 2.5, 3.9, "GenAI \u00d6neri Katman\u0131", C.acc);
  T.cardBody(s, 5.4, 2.85, 3.9, 2.1, "\u2022 Gemini API ile ruh hali analizi\n\u2022 \u201cBugün \u00fczg\u00fcn\u00fcm\u201d \u2192 komedi/drama \u00f6nerisi\n\u2022 Film \u00f6zetinden embedding \u00e7\u0131karma\n\u2022 Prompt: \u201cBu filme benzer 5 \u00f6ner\u201d\n\u2022 Gradio ile etkile\u015fimli aray\u00fcz");
}


// ═══════════════════════════════════════════════════════════
// SLAYT 15 — CAPSTONE: KURUMSAL BİLGİ BOTU
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Capstone: Kurumsal Bilgi Botu", "B\u00d6L\u00dcM 3");

  card(s, 0.5, 1.05, 9.0, 1.1, { topColor: C.acc });
  T.cardTitle(s, 0.7, 1.15, 8.5, "RAG + Gemini API ile Dok\u00fcman QA Sistemi", C.acc);
  T.cardBody(s, 0.7, 1.5, 8.5, 0.55, "PDF, Word, CSV dok\u00fcmanlar\u0131n\u0131 y\u00fckleyin, sorular sorun, kaynakl\u0131 cevaplar al\u0131n. Kurumsal bilgi y\u00f6netimi i\u00e7in RAG pipeline.");

  // RAG pipeline akış
  const pipeline = [
    { step: "Dok\u00fcman\nY\u00fckleme", color: C.sec },
    { step: "Chunk\nB\u00f6lme", color: C.amber },
    { step: "Embedding\n\u00dcretme", color: C.acc },
    { step: "Vector DB\nKaydetme", color: C.purple },
    { step: "Sorgu +\nRetrieval", color: C.blue },
    { step: "LLM\nCevap", color: C.green },
  ];

  pipeline.forEach((p, i) => {
    const x = 0.5 + i * 1.55;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.5, w: 1.3, h: 1.0, fill: { color: p.color }, shadow: T.mkShadow() });
    s.addText(p.step, { x, y: 2.5, w: 1.3, h: 1.0, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    if (i < pipeline.length - 1) {
      s.addText("\u25b6", { x: x + 1.3, y: 2.7, w: 0.25, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 14, color: C.mid, align: "center", valign: "middle" });
    }
  });

  // Teknolojiler
  card(s, 0.5, 3.8, 9.0, 1.4, { topColor: C.pri });
  T.cardTitle(s, 0.7, 3.9, 8.5, "Kullan\u0131lan Teknolojiler");
  const techItems = [
    { label: "LangChain", desc: "RAG orkestrasyon", color: C.sec },
    { label: "ChromaDB", desc: "Vekt\u00f6r veritaban\u0131", color: C.acc },
    { label: "Gemini API", desc: "LLM cevaplayıcı", color: C.amber },
    { label: "Streamlit", desc: "Web aray\u00fcz", color: C.purple },
  ];
  techItems.forEach((t, i) => {
    const x = 0.7 + i * 2.2;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.35, w: 1.9, h: 0.35, fill: { color: t.color } });
    s.addText(t.label, { x, y: 4.35, w: 1.9, h: 0.35, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(t.desc, { x, y: 4.72, w: 1.9, h: 0.3, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, align: "center" });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 16 — CAPSTONE: GÖRÜNTÜ SINIFLANDIRICI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Capstone: G\u00f6r\u00fcnt\u00fc S\u0131n\u0131fland\u0131r\u0131c\u0131", "B\u00d6L\u00dcM 3");

  card(s, 0.5, 1.05, 9.0, 1.1, { topColor: C.blue });
  T.cardTitle(s, 0.7, 1.15, 8.5, "Transfer Learning + Gradio Aray\u00fcz ile G\u00f6r\u00fcnt\u00fc Tan\u0131ma", C.blue);
  T.cardBody(s, 0.7, 1.5, 8.5, 0.55, "\u00d6nceden e\u011fitilmi\u015f CNN modellerini (ResNet50, EfficientNet) fine-tune ederek \u00f6zel g\u00f6r\u00fcnt\u00fc s\u0131n\u0131fland\u0131rma ve Gradio ile kullan\u0131c\u0131 dostu aray\u00fcz.");

  // Sol: Mimari
  card(s, 0.5, 2.4, 4.3, 2.8, { leftColor: C.blue });
  T.cardTitle(s, 0.7, 2.5, 3.9, "Model Mimarisi", C.blue);
  const archSteps = [
    "ResNet50 (ImageNet a\u011f\u0131rl\u0131klar\u0131)",
    "\u2193 Freeze: \u0130lk 140 katman dondur",
    "\u2193 Fine-tune: Son katmanlar\u0131 e\u011fit",
    "\u2193 Global Average Pooling",
    "\u2193 Dense(256, ReLU) + Dropout(0.5)",
    "\u2193 Dense(num_classes, Softmax)",
  ];
  archSteps.forEach((step, i) => {
    const y = 2.9 + i * 0.35;
    const isMid = i > 0 && i < archSteps.length - 1;
    s.addText(step, { x: 0.7, y, w: 3.9, h: 0.32, margin: 0, fontFace: "Consolas", fontSize: 9, color: i === 0 ? C.blue : (isMid ? C.mid : C.green) });
  });

  // Sağ: Özellikler
  card(s, 5.2, 2.4, 4.3, 2.8, { leftColor: C.green });
  T.cardTitle(s, 5.4, 2.5, 3.9, "\u00d6zellikler", C.green);
  const features = [
    "\u2022 Data Augmentation (d\u00f6nd\u00fcrme, zoom, \u00e7evirme)",
    "\u2022 Learning Rate Scheduler (ReduceLROnPlateau)",
    "\u2022 Early Stopping ile overfitting \u00f6nleme",
    "\u2022 Gradio aray\u00fcz: s\u00fcr\u00fckle-b\u0131rak g\u00f6r\u00fcnt\u00fc y\u00fckle",
    "\u2022 Ger\u00e7ek zamanl\u0131 confidence g\u00f6sterimi",
    "\u2022 Hugging Face Spaces\u2019e deploy",
  ];
  features.forEach((f, i) => {
    s.addText(f, { x: 5.4, y: 2.9 + i * 0.35, w: 3.9, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10, color: C.dark });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 17 — CAPSTONE DEĞERLENDİRME
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Capstone De\u011ferlendirme Kriterleri", "B\u00d6L\u00dcM 3");

  // 4 stat box
  stat(s, 0.5, 1.1, 2.1, 1.4, "%40", "Teknik\nUygulama", C.acc);
  stat(s, 2.85, 1.1, 2.1, 1.4, "%20", "Sunum ve\nDok\u00fcmantasyon", C.sec);
  stat(s, 5.2, 1.1, 2.1, 1.4, "%20", "Yenilik\u00e7ilik\nve Yarat\u0131c\u0131l\u0131k", C.amber);
  stat(s, 7.55, 1.1, 2.1, 1.4, "%20", "Deploy ve\nDemo", C.purple);

  // Detaylı tablo
  const evalRows = [
    ["Kriter", "A\u00e7\u0131klama", "Puan"],
    ["Kod Kalitesi", "Temiz, yorumlu, modüler kod. PEP 8 uyumu.", "15"],
    ["Model Ba\u015far\u0131s\u0131", "Uygun metriklerle \u00f6l\u00e7\u00fclm\u00fc\u015f performans.", "15"],
    ["Veri \u0130\u015fleme", "EDA, temizleme, feature engineering kalitesi.", "10"],
    ["Sunum", "Slayt kalitesi, ak\u0131c\u0131 anlat\u0131m, soru cevaplama.", "10"],
    ["Dok\u00fcmantasyon", "README, notebook a\u00e7\u0131klamalar\u0131, kullan\u0131m k\u0131lavuzu.", "10"],
    ["Yenilik\u00e7ilik", "Farkl\u0131 yakla\u015f\u0131m, \u00f6zg\u00fcn fikir, ek \u00f6zellikler.", "20"],
    ["Deploy", "\u00c7al\u0131\u015fan demo, Streamlit/Gradio/HF Spaces.", "20"],
  ];

  s.addTable(evalRows, {
    x: 0.5, y: 2.8, w: 9.0,
    fontSize: 10, fontFace: "Calibri",
    border: { type: "solid", color: C.bdr, pt: 0.5 },
    colW: [2.0, 5.5, 1.5],
    rowH: [0.35, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32],
    autoPage: false,
    color: C.dark,
    rowOpts: evalRows.map((_, i) => ({
      fill: i === 0 ? C.pri : (i % 2 === 1 ? C.warmBg : C.card),
      color: i === 0 ? "FFFFFF" : C.dark,
      bold: i === 0,
    })),
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 18 — HAFTALIK NOTEBOOK'LAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "Haftal\u0131k Notebook\u2019lar", "B\u00d6L\u00dcM 3");

  // Notebook 1
  card(s, 0.5, 1.1, 4.3, 3.8, { topColor: C.acc });
  badge(s, 0.65, 1.22, 1, C.acc);
  T.cardTitle(s, 1.1, 1.22, 3.5, "capstone_sablon.ipynb", C.acc);
  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.65, w: 3.9, h: 0.04, fill: { color: C.bdr } });
  const nb1 = [
    "\u2022 Capstone proje \u015fablonu",
    "\u2022 Proje yap\u0131s\u0131: veri, model, de\u011ferlendirme",
    "\u2022 README \u015fablonu ve dok\u00fcmantasyon",
    "\u2022 requirements.txt \u00f6rne\u011fi",
    "\u2022 Git repo yap\u0131land\u0131rmas\u0131",
    "\u2022 Streamlit/Gradio demo \u015fablonu",
    "\u2022 Model kaydetme ve y\u00fckleme",
    "\u2022 Deployment kontrol listesi",
  ];
  nb1.forEach((item, i) => {
    s.addText(item, { x: 0.7, y: 1.8 + i * 0.37, w: 3.9, h: 0.34, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark });
  });

  // Notebook 2
  card(s, 5.2, 1.1, 4.3, 3.8, { topColor: C.red });
  badge(s, 5.35, 1.22, 2, C.red);
  T.cardTitle(s, 5.8, 1.22, 3.5, "ai_etik.ipynb", C.red);
  s.addShape(pres.shapes.RECTANGLE, { x: 5.4, y: 1.65, w: 3.9, h: 0.04, fill: { color: C.bdr } });
  const nb2 = [
    "\u2022 Bias analizi: COMPAS veri seti",
    "\u2022 Fairness metrikleri hesaplama",
    "\u2022 Demographic parity implementasyonu",
    "\u2022 Equalized odds kontrolü",
    "\u2022 SHAP ile model a\u00e7\u0131klanabilirlik",
    "\u2022 LIME yerel a\u00e7\u0131klama \u00f6rnekleri",
    "\u2022 Model Card \u015fablonu olu\u015fturma",
    "\u2022 Etik kontrol listesi \u00e7al\u0131\u015fmas\u0131",
  ];
  nb2.forEach((item, i) => {
    s.addText(item, { x: 5.4, y: 1.8 + i * 0.37, w: 3.9, h: 0.34, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark });
  });
}


// ═══════════════════════════════════════════════════════════
// SLAYT 19 — ÖDEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  hdr(s, "\u00d6dev ve Kaynaklar", "B\u00d6L\u00dcM 3");

  // Ödev
  card(s, 0.5, 1.05, 4.3, 2.5, { topColor: C.sec });
  T.cardTitle(s, 0.7, 1.15, 3.9, "Capstone Proje Teslimi", C.sec);
  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.55, w: 3.9, h: 0.04, fill: { color: C.bdr } });
  const tasks = [
    { text: "5 projeden birini se\u00e7in", done: false },
    { text: "GitHub repo olu\u015fturun", done: false },
    { text: "Veri toplama ve EDA", done: false },
    { text: "Model geli\u015ftirme ve de\u011ferlendirme", done: false },
    { text: "Streamlit/Gradio demo", done: false },
    { text: "Sunum haz\u0131rl\u0131\u011f\u0131 (10 dk)", done: false },
  ];
  tasks.forEach((t, i) => {
    const y = 1.7 + i * 0.35;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: y + 0.05, w: 0.22, h: 0.22, fill: { color: C.card }, line: { color: C.bdr, width: 1 } });
    s.addText(t.text, { x: 1.05, y, w: 3.5, h: 0.32, margin: 0, fontFace: "Calibri", fontSize: 10.5, color: C.dark });
  });

  // Kaynaklar
  card(s, 5.2, 1.05, 4.3, 2.5, { topColor: C.acc });
  T.cardTitle(s, 5.4, 1.15, 3.9, "Kaynaklar ve Okumalar", C.acc);
  s.addShape(pres.shapes.RECTANGLE, { x: 5.4, y: 1.55, w: 3.9, h: 0.04, fill: { color: C.bdr } });
  const resources = [
    { title: "EU AI Act (Resmi Metin)", url: "artificialintelligenceact.eu" },
    { title: "Google Responsible AI", url: "ai.google/responsibility" },
    { title: "Microsoft RAI Toolkit", url: "github.com/microsoft/responsible-ai" },
    { title: "Fairlearn K\u00fct\u00fcphanesi", url: "fairlearn.org" },
    { title: "SHAP Dok\u00fcmantasyonu", url: "shap.readthedocs.io" },
    { title: "Model Cards (Google)", url: "modelcards.withgoogle.com" },
  ];
  resources.forEach((r, i) => {
    const y = 1.7 + i * 0.35;
    s.addText(r.title, { x: 5.4, y, w: 3.9, h: 0.2, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: C.dark });
    s.addText(r.url, { x: 5.4, y: y + 0.17, w: 3.9, h: 0.18, margin: 0, fontFace: "Calibri", fontSize: 8.5, color: C.acc, italic: true });
  });

  // Teslim tarihi
  card(s, 0.5, 3.8, 9.0, 1.3, { topColor: C.amber });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.8, w: 9.0, h: 0.45, fill: { color: C.amber } });
  s.addText("TESL\u0130M TAR\u0130H\u0130 VE FORMAT", { x: 0.7, y: 3.8, w: 8.5, h: 0.45, margin: 0, fontFace: "Georgia", fontSize: 12, bold: true, color: "FFFFFF", valign: "middle" });
  T.cardBody(s, 0.7, 4.35, 8.5, 0.65, "Format: GitHub repo linki + Jupyter Notebook + \u00e7al\u0131\u015fan demo linki + 10 dakikal\u0131k sunum\nSon teslim: E\u011fitim bitiminden 2 hafta sonra. Ge\u00e7 teslim her g\u00fcn i\u00e7in %5 puan d\u00fc\u015f\u00fcm\u00fc.");
}


// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANIŞ (BÜYÜK FİNAL)
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "B\u00fcy\u00fck Final \u2014 15 Haftal\u0131k Yolculu\u011fun \u00d6zeti",
  [
    { text: "AI eti\u011fi sadece teknik de\u011fil, toplumsal bir sorumluluktur.", color: C.red },
    { text: "Bias fark\u0131ndal\u0131\u011f\u0131 olmadan adil AI sistemleri in\u015fa edilemez.", color: C.amber },
    { text: "Sorumlu AI ilkeleri her projede tasar\u0131m a\u015famas\u0131ndan itibaren uygulanmal\u0131d\u0131r.", color: C.acc },
    { text: "15 haftada Python\u2019dan GenAI\u2019ye, istatistikten deep learning\u2019e uzanan bir yolculuk tamamland\u0131.", color: C.purple },
    { text: "Capstone projesi \u00f6\u011frendiklerinizi ger\u00e7ek d\u00fcnyada uygulaman\u0131n en g\u00fc\u00e7l\u00fc yoludur.", color: C.green },
  ],
  "Yapay zek\u00e2 g\u00fcc\u00fc, onu sorumlu kullananlar\u0131n elindedir. \u015eimdi s\u0131ra sizde!",
  "Dr. Murat Altun"
);


// ═══════════════════════════════════════════════════════════
// KAYDET
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta15_ai_etik_capstone.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("OK \u2192 " + outPath))
  .catch(err => { console.error("HATA:", err); process.exit(1); });
