/**
 * Hafta 1: Veri Bilimi Ekosistemi ve Python Temelleri
 * 20 slaytlik PPTX sunum olusturucu
 */
const T = require('/Users/drmurataltun/.claude/pptx-template.js');
const C = T.C;
const TOTAL = 20;

const pres = T.createPres("Hafta 1 — Python Temelleri ve Veri Bilimi Ekosistemi", "Dr. Murat Altun");

// ═══════════════════════════════════════════════════════════
// SLAYT 1 — KAPAK
// ═══════════════════════════════════════════════════════════
T.addCoverSlide(pres,
  "Python Temelleri\nve Veri Bilimi\nEkosistemi",
  "Hafta 1 \u00b7 Mod\u00fcl 1",
  "Dr. Murat Altun",
  [
    { value: "6", label: "Saat" },
    { value: "3", label: "Notebook" },
    { value: "\u221e", label: "Potansiyel" }
  ]
);

// ═══════════════════════════════════════════════════════════
// SLAYT 2 — \u0130\u00c7\u0130NDEK\u0130LER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "\u0130\u00e7indekiler", "GENEL BAKI\u015e", C.cream, TOTAL);

  const sections = [
    { num: 1, title: "Veri Bilimi Ekosistemi", desc: "Veri bilimi nedir, neden \u00f6nemlidir, yol haritas\u0131 ve Google Colab tan\u0131t\u0131m\u0131", color: C.acc },
    { num: 2, title: "Python Temelleri", desc: "De\u011fi\u015fkenler, veri tipleri, operat\u00f6rler, input/output i\u015flemleri", color: C.sec },
    { num: 3, title: "Veri Yap\u0131lar\u0131 ve Kontrol Ak\u0131\u015f\u0131", desc: "Listeler, s\u00f6zl\u00fckler, tuple, set, d\u00f6ng\u00fcler ve ko\u015fullu ifadeler", color: C.purple },
    { num: 4, title: "Fonksiyonlar ve GitHub", desc: "Fonksiyon tan\u0131mlama, lambda, GitHub temelleri, \u00f6devler", color: C.green }
  ];

  sections.forEach((sec, i) => {
    const y = 1.1 + i * 1.05;
    T.addCard(pres, s, 0.5, y, 9.0, 0.88, { leftColor: sec.color });
    T.numBadge(pres, s, 0.7, y + 0.26, sec.num, sec.color);
    T.cardTitle(s, 1.2, y + 0.1, 3.5, sec.title, sec.color);
    T.cardBody(s, 1.2, y + 0.45, 8.0, 0.35, sec.desc);
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 3 — VER\u0130 B\u0130L\u0130M\u0130 NED\u0130R?
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Veri Bilimi Nedir?", "B\u00d6L\u00dcM 1", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 9.0, 1.35, { topColor: C.acc });
  T.cardTitle(s, 0.7, 1.2, 8.5, "Tan\u0131m", C.acc);
  T.cardBody(s, 0.7, 1.55, 8.5, 0.7,
    "Veri bilimi; istatistik, matematik, programlama ve alan bilgisini birle\u015ftirerek " +
    "veriden anlaml\u0131 i\u00e7g\u00f6r\u00fcler \u00e7\u0131karan ve bu i\u00e7g\u00f6r\u00fcleri karar alma s\u00fcre\u00e7lerine d\u00f6n\u00fc\u015ft\u00fcren " +
    "disiplinler aras\u0131 bir aland\u0131r."
  );

  T.statBox(pres, s, 0.5, 2.7, 2.8, 1.5, "150K+", "T\u00fcrkiye'de y\u0131ll\u0131k\nveri bilimi i\u015f ilan\u0131", C.acc);
  T.statBox(pres, s, 3.6, 2.7, 2.8, 1.5, "\u20ba85K", "Ortalama ba\u015flang\u0131\u00e7\nmaa\u015f\u0131 (ayl\u0131k br\u00fct)", C.sec);
  T.statBox(pres, s, 6.7, 2.7, 2.8, 1.5, "%36", "Y\u0131ll\u0131k b\u00fcy\u00fcme\noran\u0131 (2023\u20132026)", C.green);

  T.cardBody(s, 0.5, 4.5, 9.0, 0.6,
    "Kaynak: LinkedIn Talent Insights, Glassdoor TR, McKinsey Global AI Survey 2025",
    { size: 9, color: C.subtle, italic: true }
  );
}

// ═══════════════════════════════════════════════════════════
// SLAYT 4 — VER\u0130 B\u0130L\u0130MC\u0130 YOL HAR\u0130TASI (Timeline)
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Veri Bilimci Yol Haritas\u0131", "B\u00d6L\u00dcM 1", C.cream, TOTAL);

  const steps = [
    { title: "\u0130statistik\nTemelleri", desc: "Olas\u0131l\u0131k, da\u011f\u0131l\u0131mlar,\nhipotez testleri", color: C.acc },
    { title: "Programlama\n(Python/R)", desc: "Veri yap\u0131lar\u0131, k\u00fct\u00fcphaneler,\notomasyon", color: C.sec },
    { title: "Makine\n\u00d6\u011frenmesi", desc: "Regresyon, s\u0131n\u0131fland\u0131rma,\nk\u00fcmeleme", color: C.purple },
    { title: "Derin\n\u00d6\u011frenme", desc: "Sinir a\u011flar\u0131, CNN,\nRNN, Transformer", color: C.blue },
    { title: "Uzmanla\u015fma\nAlan\u0131", desc: "NLP, G\u00f6r\u00fcnt\u00fc \u0130\u015fleme,\nGenerative AI", color: C.green }
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 2.55, w: 8.0, h: 0.06, fill: { color: C.bdr } });

  steps.forEach((st, i) => {
    const x = 0.5 + i * 1.85;
    s.addShape(pres.shapes.OVAL, { x: x + 0.5, y: 2.35, w: 0.46, h: 0.46, fill: { color: st.color } });
    s.addText(String(i + 1), { x: x + 0.5, y: 2.35, w: 0.46, h: 0.46, margin: 0, fontFace: "Calibri", fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(st.title, { x: x, y: 1.3, w: 1.7, h: 0.8, margin: 0, fontFace: "Georgia", fontSize: 10, bold: true, color: st.color, align: "center", valign: "bottom" });
    s.addText(st.desc, { x: x, y: 3.1, w: 1.7, h: 0.9, margin: 0, fontFace: "Calibri", fontSize: 9, color: C.mid, align: "center" });
  });

  T.addCard(pres, s, 0.5, 4.2, 9.0, 0.9, { topColor: C.pri });
  T.cardBody(s, 0.7, 4.4, 8.5, 0.6,
    "Bu e\u011fitimde 15 hafta boyunca t\u00fcm bu a\u015famalar\u0131 kapsayan uygulamal\u0131 projelerle ilerleyece\u011fiz. " +
    "Her hafta en az bir notebook ve bir mini proje tamamlayacaks\u0131n\u0131z."
  );
}

// ═══════════════════════════════════════════════════════════
// SLAYT 5 — GOOGLE COLAB TANITIMI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Google Colab Tan\u0131t\u0131m\u0131", "B\u00d6L\u00dcM 1", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.3, 2.5, { topColor: C.acc });
  T.cardTitle(s, 0.7, 1.2, 3.8, "Google Colab Nedir?", C.acc);
  T.cardBody(s, 0.7, 1.6, 3.8, 1.8,
    "\u2022 Taray\u0131c\u0131da \u00e7al\u0131\u015fan \u00fccretsiz Jupyter ortam\u0131\n" +
    "\u2022 Google Drive entegrasyonu\n" +
    "\u2022 \u00dccretsiz GPU/TPU eri\u015fimi\n" +
    "\u2022 Kurulum gerektirmez\n" +
    "\u2022 Payla\u015f\u0131m ve i\u015fbirli\u011fi kolay\n" +
    "\u2022 colab.research.google.com"
  );

  T.addCard(pres, s, 5.2, 1.05, 4.3, 2.5, { topColor: C.sec });
  T.cardTitle(s, 5.4, 1.2, 3.8, "H\u00fccre T\u00fcrleri", C.sec);
  T.cardBody(s, 5.4, 1.6, 3.8, 1.8,
    "Kod H\u00fccresi:\n" +
    "  Python kodu yaz\u0131p \u00e7al\u0131\u015ft\u0131rabilirsiniz\n" +
    "  Shift+Enter ile h\u0131zl\u0131 \u00e7al\u0131\u015ft\u0131rma\n\n" +
    "Metin (Markdown) H\u00fccresi:\n" +
    "  A\u00e7\u0131klama, form\u00fcl, ba\u015fl\u0131k yazabilirsiniz\n" +
    "  LaTeX matematik form\u00fclleri destekler"
  );

  T.addCard(pres, s, 0.5, 3.8, 9.0, 1.3, { leftColor: C.green });
  T.cardTitle(s, 0.75, 3.9, 8.5, "H\u0131zl\u0131 \u0130pu\u00e7lar\u0131", C.green);
  T.cardBody(s, 0.75, 4.25, 8.5, 0.7,
    "Ctrl+Enter \u2192 H\u00fccreyi \u00e7al\u0131\u015ft\u0131r  |  Shift+Enter \u2192 \u00c7al\u0131\u015ft\u0131r ve sonrakine ge\u00e7  |  " +
    "Ctrl+M B \u2192 Alt\u0131na yeni h\u00fccre  |  Ctrl+M D \u2192 H\u00fccreyi sil  |  !pip install paket \u2192 Paket y\u00fckle"
  );
}

// ═══════════════════════════════════════════════════════════
// SLAYT 6 — DE\u011e\u0130\u015eKENLER VE VER\u0130 T\u0130PLER\u0130
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "De\u011fi\u015fkenler ve Veri Tipleri", "B\u00d6L\u00dcM 2", C.cream, TOTAL);

  const rows = [
    [
      { text: "Tip", options: { fontFace: "Georgia", fontSize: 10, bold: true, color: "FFFFFF", fill: { color: C.pri }, align: "center" } },
      { text: "Anahtar", options: { fontFace: "Georgia", fontSize: 10, bold: true, color: "FFFFFF", fill: { color: C.pri }, align: "center" } },
      { text: "\u00d6rnek", options: { fontFace: "Georgia", fontSize: 10, bold: true, color: "FFFFFF", fill: { color: C.pri }, align: "center" } },
      { text: "A\u00e7\u0131klama", options: { fontFace: "Georgia", fontSize: 10, bold: true, color: "FFFFFF", fill: { color: C.pri }, align: "center" } },
    ],
    [
      { text: "Metin", options: { fill: { color: C.warmBg } } },
      { text: "str", options: { fill: { color: C.warmBg }, bold: true, color: C.acc } },
      { text: '"Merhaba"', options: { fill: { color: C.warmBg } } },
      { text: "Karakter dizisi, t\u0131rnak i\u00e7inde", options: { fill: { color: C.warmBg } } },
    ],
    [
      { text: "Tam Say\u0131" }, { text: "int", options: { bold: true, color: C.acc } },
      { text: "42" }, { text: "Ondal\u0131k k\u0131sm\u0131 olmayan say\u0131lar" },
    ],
    [
      { text: "Ondal\u0131kl\u0131", options: { fill: { color: C.warmBg } } },
      { text: "float", options: { fill: { color: C.warmBg }, bold: true, color: C.acc } },
      { text: "3.14", options: { fill: { color: C.warmBg } } },
      { text: "Noktal\u0131 (ondal\u0131kl\u0131) say\u0131lar", options: { fill: { color: C.warmBg } } },
    ],
    [
      { text: "Mant\u0131ksal" }, { text: "bool", options: { bold: true, color: C.acc } },
      { text: "True / False" }, { text: "Do\u011fru veya yanl\u0131\u015f de\u011fer" },
    ],
  ];

  s.addTable(rows, {
    x: 0.5, y: 1.1, w: 9.0,
    fontFace: "Calibri", fontSize: 10,
    border: { color: C.bdr, pt: 1 },
    colW: [1.6, 1.2, 2.2, 4.0],
    rowH: [0.4, 0.4, 0.4, 0.4, 0.4],
  });

  T.addCodeBlock(pres, s, 0.5, 3.3, 9.0, 1.8, [
    { text: "# De\u011fi\u015fken tan\u0131mlama", options: { color: C.codeGreen } },
    { text: 'isim = "Ahmet"              # str', options: { color: C.codeWhite } },
    { text: "yas = 25                    # int", options: { color: C.codeWhite } },
    { text: "boy = 1.78                  # float", options: { color: C.codeWhite } },
    { text: "ogrenci_mi = True           # bool", options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "print(type(isim))           # <class 'str'>", options: { color: C.codeYellow } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 7 — OPERAT\u00d6RLER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Operat\u00f6rler", "B\u00d6L\u00dcM 2", C.cream, TOTAL);

  const ops = [
    {
      title: "Aritmetik", color: C.acc,
      body: "+   Toplama\n\u2212   \u00c7\u0131karma\n*   \u00c7arpma\n/   B\u00f6lme\n//  Tam b\u00f6lme\n%   Mod (kalan)\n**  \u00dcs alma"
    },
    {
      title: "Kar\u015f\u0131la\u015ft\u0131rma", color: C.sec,
      body: "==  E\u015fit mi?\n!=  Farkl\u0131 m\u0131?\n>   B\u00fcy\u00fck m\u00fc?\n<   K\u00fc\u00e7\u00fck m\u00fc?\n>=  B\u00fcy\u00fck e\u015fit\n<=  K\u00fc\u00e7\u00fck e\u015fit"
    },
    {
      title: "Mant\u0131ksal", color: C.purple,
      body: "and   Her ikisi do\u011fru\nor    En az biri do\u011fru\nnot   Tersini al\n\n\u00d6rnek:\nx > 5 and x < 10\nnot ogrenci_mi"
    }
  ];

  ops.forEach((op, i) => {
    const x = 0.5 + i * 3.1;
    T.addCard(pres, s, x, 1.05, 2.85, 4.0, { topColor: op.color });
    T.cardTitle(s, x + 0.15, 1.2, 2.5, op.title, op.color);
    T.cardBody(s, x + 0.15, 1.6, 2.5, 3.2, op.body, { size: 10 });
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 8 — input() ve print()
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "input() ve print() Fonksiyonlar\u0131", "B\u00d6L\u00dcM 2", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.3, 1.4, { topColor: C.acc });
  T.cardTitle(s, 0.7, 1.2, 3.8, "input() \u2014 Kullan\u0131c\u0131dan Veri Alma", C.acc);
  T.cardBody(s, 0.7, 1.55, 3.8, 0.8,
    "Kullan\u0131c\u0131dan klavye ile veri al\u0131r.\nD\u00f6nen de\u011fer her zaman str tipindedir.\nSay\u0131 almak i\u00e7in int() veya float() ile d\u00f6n\u00fc\u015ft\u00fcr\u00fcn."
  );

  T.addCard(pres, s, 5.2, 1.05, 4.3, 1.4, { topColor: C.sec });
  T.cardTitle(s, 5.4, 1.2, 3.8, "print() \u2014 Ekrana Yazd\u0131rma", C.sec);
  T.cardBody(s, 5.4, 1.55, 3.8, 0.8,
    "De\u011ferleri ekrana yazd\u0131r\u0131r.\nf-string ile de\u011fi\u015fken g\u00f6mme: f\"...\"\nsep ve end parametreleri ile \u00f6zelle\u015ftirme."
  );

  T.addCodeBlock(pres, s, 0.5, 2.7, 9.0, 2.4, [
    { text: "# input() ile veri alma", options: { color: C.codeGreen } },
    { text: 'isim = input("Ad\u0131n\u0131z: ")', options: { color: C.codeWhite } },
    { text: 'yas = int(input("Ya\u015f\u0131n\u0131z: "))', options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# f-string ile formatl\u0131 \u00e7\u0131kt\u0131", options: { color: C.codeGreen } },
    { text: 'print(f"Merhaba {isim}, {yas} ya\u015f\u0131ndas\u0131n\u0131z!")', options: { color: C.codeYellow } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# sep ve end parametreleri", options: { color: C.codeGreen } },
    { text: 'print("Python", "Veri", "Bilimi", sep=" | ")', options: { color: C.codeWhite } },
    { text: "# \u00c7\u0131kt\u0131: Python | Veri | Bilimi", options: { color: C.codeGreen } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 9 — L\u0130STELER
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Listeler (list)", "B\u00d6L\u00dcM 3", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.3, 1.1, { leftColor: C.acc });
  T.cardTitle(s, 0.75, 1.15, 3.8, "Liste Nedir?", C.acc);
  T.cardBody(s, 0.75, 1.5, 3.8, 0.55,
    "S\u0131ral\u0131, de\u011fi\u015ftirilebilir (mutable) ve farkl\u0131 veri tiplerini bar\u0131nd\u0131rabilen koleksiyon yap\u0131s\u0131d\u0131r."
  );

  T.addCard(pres, s, 5.2, 1.05, 4.3, 1.1, { leftColor: C.sec });
  T.cardTitle(s, 5.45, 1.15, 3.8, "Temel \u00d6zellikler", C.sec);
  T.cardBody(s, 5.45, 1.5, 3.8, 0.55,
    "\u2022 \u0130ndeks 0'dan ba\u015flar  \u2022 Negatif indeks: -1 son eleman\n\u2022 Dilimleme (slicing): liste[1:4]  \u2022 \u0130\u00e7 i\u00e7e listeler"
  );

  T.addCodeBlock(pres, s, 0.5, 2.4, 9.0, 2.7, [
    { text: "# Liste olu\u015fturma", options: { color: C.codeGreen } },
    { text: 'meyveler = ["elma", "armut", "kiraz", "muz"]', options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# Eleman ekleme ve silme", options: { color: C.codeGreen } },
    { text: 'meyveler.append("portakal")       # Sona ekle', options: { color: C.codeWhite } },
    { text: 'meyveler.insert(1, "\u00e7ilek")       # \u0130ndekse ekle', options: { color: C.codeWhite } },
    { text: 'meyveler.remove("armut")          # De\u011fere g\u00f6re sil', options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# Dilimleme (Slicing)", options: { color: C.codeGreen } },
    { text: 'print(meyveler[1:3])              # ["\u00e7ilek", "kiraz"]', options: { color: C.codeYellow } },
    { text: "print(meyveler[::-1])             # Ters \u00e7evir", options: { color: C.codeYellow } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 10 — S\u00d6ZL\u00dcKLER VE TUPLE
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "S\u00f6zl\u00fckler (dict) ve Tuple", "B\u00d6L\u00dcM 3", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.3, 4.0, { topColor: C.acc });
  T.cardTitle(s, 0.7, 1.2, 3.8, "S\u00f6zl\u00fck (Dictionary)", C.acc);
  T.cardBody(s, 0.7, 1.6, 3.8, 0.6,
    "Anahtar-de\u011fer (key-value) \u00e7iftlerinden olu\u015fur.\nAnahtarlar benzersiz olmal\u0131d\u0131r."
  );
  T.addCodeBlock(pres, s, 0.7, 2.3, 3.8, 2.5, [
    { text: "ogrenci = {", options: { color: C.codeWhite } },
    { text: '  "ad": "Ay\u015fe",', options: { color: C.codeYellow } },
    { text: '  "yas": 22,', options: { color: C.codeYellow } },
    { text: '  "bolum": "Bilgisayar"', options: { color: C.codeYellow } },
    { text: "}", options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# Eri\u015fim", options: { color: C.codeGreen } },
    { text: 'print(ogrenci["ad"])', options: { color: C.codeWhite } },
    { text: 'ogrenci["not"] = 3.5', options: { color: C.codeWhite } },
  ]);

  T.addCard(pres, s, 5.2, 1.05, 4.3, 4.0, { topColor: C.sec });
  T.cardTitle(s, 5.4, 1.2, 3.8, "Tuple (Demet)", C.sec);
  T.cardBody(s, 5.4, 1.6, 3.8, 0.6,
    "S\u0131ral\u0131 ve de\u011fi\u015ftirilemez (immutable).\nParantez ile tan\u0131mlan\u0131r."
  );
  T.addCodeBlock(pres, s, 5.4, 2.3, 3.8, 2.5, [
    { text: "# Tuple olu\u015fturma", options: { color: C.codeGreen } },
    { text: "koordinat = (41.01, 28.97)", options: { color: C.codeWhite } },
    { text: 'renkler = ("k\u0131rm\u0131z\u0131", "mavi")', options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# Unpacking", options: { color: C.codeGreen } },
    { text: "x, y = koordinat", options: { color: C.codeYellow } },
    { text: 'print(f"Enlem: {x}")', options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# De\u011fi\u015ftirilemez!", options: { color: C.codeGreen } },
    { text: "# koordinat[0] = 40  # HATA!", options: { color: "FF6B6B" } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 11 — SET VER\u0130 YAPISI
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Set (K\u00fcme) Veri Yap\u0131s\u0131", "B\u00d6L\u00dcM 3", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.3, 1.3, { topColor: C.purple });
  T.cardTitle(s, 0.7, 1.2, 3.8, "Set Nedir?", C.purple);
  T.cardBody(s, 0.7, 1.55, 3.8, 0.65,
    "\u2022 S\u0131ras\u0131z ve tekrars\u0131z eleman koleksiyonu\n" +
    "\u2022 Matematikteki k\u00fcme kavram\u0131na kar\u015f\u0131l\u0131k gelir\n" +
    "\u2022 H\u0131zl\u0131 \u00fcyelik testi (in operat\u00f6r\u00fc) sa\u011flar"
  );

  T.addCard(pres, s, 5.2, 1.05, 4.3, 1.3, { topColor: C.green });
  T.cardTitle(s, 5.4, 1.2, 3.8, "K\u00fcme \u0130\u015flemleri", C.green);
  T.cardBody(s, 5.4, 1.55, 3.8, 0.65,
    "union()        \u2192  Birle\u015fim (A \u222a B)\nintersection() \u2192  Kesi\u015fim (A \u2229 B)\ndifference()   \u2192  Fark (A \u2212 B)"
  );

  T.addCodeBlock(pres, s, 0.5, 2.6, 9.0, 2.5, [
    { text: "# Set olu\u015fturma", options: { color: C.codeGreen } },
    { text: "A = {1, 2, 3, 4, 5}", options: { color: C.codeWhite } },
    { text: "B = {4, 5, 6, 7, 8}", options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# K\u00fcme i\u015flemleri", options: { color: C.codeGreen } },
    { text: "print(A | B)       # Birle\u015fim:  {1,2,3,4,5,6,7,8}", options: { color: C.codeYellow } },
    { text: "print(A & B)       # Kesi\u015fim:   {4, 5}", options: { color: C.codeYellow } },
    { text: "print(A - B)       # Fark:      {1, 2, 3}", options: { color: C.codeYellow } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# Tekrarlar\u0131 kald\u0131rma", options: { color: C.codeGreen } },
    { text: 'sehirler = ["Ankara", "\u0130stanbul", "Ankara", "\u0130zmir"]', options: { color: C.codeWhite } },
    { text: "print(set(sehirler))  # {'Ankara', '\u0130stanbul', '\u0130zmir'}", options: { color: C.codeYellow } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 12 — for D\u00d6NG\u00dcS\u00dc
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "for D\u00f6ng\u00fcs\u00fc", "B\u00d6L\u00dcM 3", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 9.0, 0.8, { leftColor: C.acc });
  T.cardBody(s, 0.75, 1.15, 8.5, 0.6,
    "for d\u00f6ng\u00fcs\u00fc, bir koleksiyon (liste, string, range vb.) \u00fczerinde iterasyon yapar. " +
    "Python'da en s\u0131k kullan\u0131lan d\u00f6ng\u00fc yap\u0131s\u0131d\u0131r. range(), enumerate() ve list comprehension ile g\u00fc\u00e7l\u00fc kombinasyonlar olu\u015fturur."
  );

  T.addCodeBlock(pres, s, 0.5, 2.1, 9.0, 3.0, [
    { text: "# range() ile d\u00f6ng\u00fc", options: { color: C.codeGreen } },
    { text: "for i in range(5):", options: { color: C.codeBlue } },
    { text: '    print(f"Ad\u0131m {i}")', options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# enumerate() \u2014 indeks + de\u011fer", options: { color: C.codeGreen } },
    { text: 'dersler = ["Python", "\u0130statistik", "ML"]', options: { color: C.codeWhite } },
    { text: "for i, ders in enumerate(dersler, 1):", options: { color: C.codeBlue } },
    { text: '    print(f"{i}. {ders}")', options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# List Comprehension \u2014 tek sat\u0131rda liste", options: { color: C.codeGreen } },
    { text: "kareler = [x**2 for x in range(1, 11)]", options: { color: C.codeYellow } },
    { text: "cift_kareler = [x**2 for x in range(1, 11) if x % 2 == 0]", options: { color: C.codeYellow } },
    { text: "print(kareler)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]", options: { color: C.codeWhite } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 13 — while D\u00d6NG\u00dcS\u00dc
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "while D\u00f6ng\u00fcs\u00fc", "B\u00d6L\u00dcM 3", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.3, 1.1, { topColor: C.sec });
  T.cardTitle(s, 0.7, 1.2, 3.8, "while Nedir?", C.sec);
  T.cardBody(s, 0.7, 1.55, 3.8, 0.5,
    "Ko\u015ful do\u011fru oldu\u011fu s\u00fcrece \u00e7al\u0131\u015f\u0131r.\nbreak ile d\u00f6ng\u00fcden \u00e7\u0131k\u0131labilir.\ncontinue ile sonraki iterasyona ge\u00e7ilir."
  );

  T.addCard(pres, s, 5.2, 1.05, 4.3, 1.1, { topColor: C.amber });
  T.cardTitle(s, 5.4, 1.2, 3.8, "Dikkat!", C.amber);
  T.cardBody(s, 5.4, 1.55, 3.8, 0.5,
    "Sonsuz d\u00f6ng\u00fc riski var!\nKo\u015fulun bir noktada False olaca\u011f\u0131ndan\nemin olun veya break kullan\u0131n."
  );

  T.addCodeBlock(pres, s, 0.5, 2.4, 9.0, 2.7, [
    { text: "# Say\u0131 Tahmin Oyunu", options: { color: C.codeGreen } },
    { text: "import random", options: { color: C.codeBlue } },
    { text: "gizli = random.randint(1, 100)", options: { color: C.codeWhite } },
    { text: "hak = 7", options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "while hak > 0:", options: { color: C.codeBlue } },
    { text: '    tahmin = int(input("Tahmininiz: "))', options: { color: C.codeWhite } },
    { text: "    if tahmin == gizli:", options: { color: C.codeBlue } },
    { text: '        print("Tebrikler!")', options: { color: C.codeGreen } },
    { text: "        break", options: { color: C.codeYellow } },
    { text: "    elif tahmin < gizli:", options: { color: C.codeBlue } },
    { text: '        print("Daha b\u00fcy\u00fck!")', options: { color: C.codeWhite } },
    { text: "    else:", options: { color: C.codeBlue } },
    { text: '        print("Daha k\u00fc\u00e7\u00fck!")', options: { color: C.codeWhite } },
    { text: "    hak -= 1", options: { color: C.codeYellow } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 14 — if/elif/else
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Ko\u015fullu \u0130fadeler: if / elif / else", "B\u00d6L\u00dcM 3", C.cream, TOTAL);

  const flow = [
    { label: "if", desc: "Ko\u015ful do\u011fruysa\n\u00e7al\u0131\u015f\u0131r", color: C.acc },
    { label: "elif", desc: "\u00d6nceki yanl\u0131\u015fsa\nbunu kontrol et", color: C.sec },
    { label: "else", desc: "Hi\u00e7biri de\u011filse\n\u00e7al\u0131\u015f\u0131r", color: C.purple },
  ];

  flow.forEach((f, i) => {
    const x = 0.5 + i * 3.1;
    T.addCard(pres, s, x, 1.05, 2.85, 1.0, { topColor: f.color });
    T.cardTitle(s, x + 0.15, 1.18, 2.5, f.label, f.color);
    T.cardBody(s, x + 0.15, 1.5, 2.5, 0.45, f.desc, { size: 10 });
  });

  s.addText("\u2192", { x: 3.35, y: 1.3, w: 0.3, h: 0.4, fontFace: "Calibri", fontSize: 20, color: C.mid, align: "center", valign: "middle" });
  s.addText("\u2192", { x: 6.45, y: 1.3, w: 0.3, h: 0.4, fontFace: "Calibri", fontSize: 20, color: C.mid, align: "center", valign: "middle" });

  T.addCard(pres, s, 0.5, 2.25, 9.0, 0.4, { topColor: C.green });
  T.cardTitle(s, 0.7, 2.32, 8.5, "\u00d6rnek: V\u00fccut Kitle \u0130ndeksi (VK\u0130) Hesaplay\u0131c\u0131", C.green);

  T.addCodeBlock(pres, s, 0.5, 2.7, 9.0, 2.4, [
    { text: "# VK\u0130 Hesaplay\u0131c\u0131", options: { color: C.codeGreen } },
    { text: 'kilo = float(input("Kilonuz (kg): "))', options: { color: C.codeWhite } },
    { text: 'boy = float(input("Boyunuz (m): "))', options: { color: C.codeWhite } },
    { text: "vki = kilo / (boy ** 2)", options: { color: C.codeYellow } },
    { text: "", options: { color: C.codeWhite } },
    { text: "if vki < 18.5:", options: { color: C.codeBlue } },
    { text: '    print(f"VK\u0130: {vki:.1f} \u2014 Zay\u0131f")', options: { color: C.codeWhite } },
    { text: "elif vki < 25:", options: { color: C.codeBlue } },
    { text: '    print(f"VK\u0130: {vki:.1f} \u2014 Normal")', options: { color: C.codeGreen } },
    { text: "elif vki < 30:", options: { color: C.codeBlue } },
    { text: '    print(f"VK\u0130: {vki:.1f} \u2014 Fazla Kilolu")', options: { color: C.codeYellow } },
    { text: "else:", options: { color: C.codeBlue } },
    { text: '    print(f"VK\u0130: {vki:.1f} \u2014 Obez")', options: { color: "FF6B6B" } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 15 — FONKS\u0130YONLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Fonksiyonlar (def)", "B\u00d6L\u00dcM 4", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 9.0, 1.2, { leftColor: C.acc });
  T.cardTitle(s, 0.75, 1.15, 8.5, "Fonksiyon Nedir?", C.acc);
  T.cardBody(s, 0.75, 1.5, 8.5, 0.6,
    "Fonksiyonlar, tekrar eden kod bloklar\u0131n\u0131 adland\u0131rarak yeniden kullan\u0131labilir hale getirir. " +
    "def anahtar kelimesi ile tan\u0131mlan\u0131r. Parametreler alabilir ve return ile de\u011fer d\u00f6nd\u00fcrebilir. " +
    "Kodun okunabilirli\u011fini, test edilebilirli\u011fini ve bak\u0131m\u0131n\u0131 kolayla\u015ft\u0131r\u0131r."
  );

  T.addCodeBlock(pres, s, 0.5, 2.5, 9.0, 2.6, [
    { text: "# Temel fonksiyon tan\u0131mlama", options: { color: C.codeGreen } },
    { text: "def selamla(isim, dil='tr'):", options: { color: C.codeBlue } },
    { text: '    """Kullan\u0131c\u0131y\u0131 selamlar."""', options: { color: C.codeGreen } },
    { text: "    if dil == 'tr':", options: { color: C.codeBlue } },
    { text: '        return f"Merhaba {isim}!"', options: { color: C.codeYellow } },
    { text: '    return f"Hello {isim}!"', options: { color: C.codeYellow } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# Birden fazla de\u011fer d\u00f6nd\u00fcrme", options: { color: C.codeGreen } },
    { text: "def istatistik(sayilar):", options: { color: C.codeBlue } },
    { text: "    ort = sum(sayilar) / len(sayilar)", options: { color: C.codeWhite } },
    { text: "    return min(sayilar), max(sayilar), ort", options: { color: C.codeYellow } },
    { text: "", options: { color: C.codeWhite } },
    { text: "mn, mx, ort = istatistik([10, 20, 30, 40])", options: { color: C.codeWhite } },
    { text: 'print(f"Min={mn}, Max={mx}, Ort={ort}")  # Min=10, Max=40, Ort=25.0', options: { color: C.codeWhite } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 16 — LAMBDA VE map/filter
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Lambda Fonksiyonlar\u0131 ve map/filter", "B\u00d6L\u00dcM 4", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.3, 1.5, { topColor: C.sec });
  T.cardTitle(s, 0.7, 1.2, 3.8, "Lambda Nedir?", C.sec);
  T.cardBody(s, 0.7, 1.6, 3.8, 0.8,
    "Tek sat\u0131rl\u0131k anonim fonksiyondur.\nK\u0131sa i\u015flemler i\u00e7in idealdir.\nS\u00f6z dizimi: lambda parametre: ifade\n" +
    "Pandas apply() ile s\u0131k kullan\u0131l\u0131r."
  );

  T.addCard(pres, s, 5.2, 1.05, 4.3, 1.5, { topColor: C.purple });
  T.cardTitle(s, 5.4, 1.2, 3.8, "map() ve filter()", C.purple);
  T.cardBody(s, 5.4, 1.6, 3.8, 0.8,
    "map(): Her elemana fonksiyon uygular\nfilter(): Ko\u015fula uyanlar\u0131 filtreler\nHer ikisi de lambda ile\ng\u00fc\u00e7l\u00fc kombinasyonlar olu\u015fturur."
  );

  T.addCodeBlock(pres, s, 0.5, 2.8, 9.0, 2.3, [
    { text: "# Lambda \u00f6rnekleri", options: { color: C.codeGreen } },
    { text: "kare = lambda x: x ** 2", options: { color: C.codeYellow } },
    { text: "toplam = lambda a, b: a + b", options: { color: C.codeYellow } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# map() \u2014 her elemana uygula", options: { color: C.codeGreen } },
    { text: "sayilar = [1, 2, 3, 4, 5]", options: { color: C.codeWhite } },
    { text: "kareler = list(map(lambda x: x**2, sayilar))", options: { color: C.codeYellow } },
    { text: "print(kareler)    # [1, 4, 9, 16, 25]", options: { color: C.codeWhite } },
    { text: "", options: { color: C.codeWhite } },
    { text: "# filter() \u2014 ko\u015fula g\u00f6re filtrele", options: { color: C.codeGreen } },
    { text: "ciftler = list(filter(lambda x: x % 2 == 0, sayilar))", options: { color: C.codeYellow } },
    { text: "print(ciftler)    # [2, 4]", options: { color: C.codeWhite } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 17 — GITHUB TEMELLER\u0130
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "GitHub Temelleri", "B\u00d6L\u00dcM 4", C.cream, TOTAL);

  const steps = [
    { num: 1, title: "Hesap A\u00e7", desc: "github.com'da \u00fccretsiz\nhesap olu\u015fturun", color: C.acc },
    { num: 2, title: "Repo Olu\u015ftur", desc: "New Repository ile\nyeni proje ba\u015flat\u0131n", color: C.sec },
    { num: 3, title: "Commit", desc: "De\u011fi\u015fikliklerinizi\nkaydedin (snapshot)", color: C.purple },
    { num: 4, title: "Push", desc: "Yerel de\u011fi\u015fiklikleri\nuzak sunucuya g\u00f6nderin", color: C.green },
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 1.2, y: 2.0, w: 7.6, h: 0.06, fill: { color: C.bdr } });

  steps.forEach((st, i) => {
    const x = 0.5 + i * 2.35;
    s.addShape(pres.shapes.OVAL, { x: x + 0.72, y: 1.78, w: 0.5, h: 0.5, fill: { color: st.color } });
    s.addText(String(st.num), { x: x + 0.72, y: 1.78, w: 0.5, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 16, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(st.title, { x: x, y: 1.1, w: 1.95, h: 0.55, margin: 0, fontFace: "Georgia", fontSize: 11, bold: true, color: st.color, align: "center", valign: "bottom" });
    s.addText(st.desc, { x: x, y: 2.5, w: 1.95, h: 0.7, margin: 0, fontFace: "Calibri", fontSize: 9.5, color: C.mid, align: "center" });
  });

  T.addCodeBlock(pres, s, 0.5, 3.4, 9.0, 1.7, [
    { text: "# Terminal komutlar\u0131", options: { color: C.codeGreen } },
    { text: "git init                        # Yeni repo ba\u015flat", options: { color: C.codeBlue } },
    { text: "git add .                       # T\u00fcm dosyalar\u0131 haz\u0131rla", options: { color: C.codeBlue } },
    { text: 'git commit -m "\u0130lk commit"     # De\u011fi\u015fiklikleri kaydet', options: { color: C.codeYellow } },
    { text: "git push origin main            # Sunucuya g\u00f6nder", options: { color: C.codeBlue } },
  ]);
}

// ═══════════════════════════════════════════════════════════
// SLAYT 18 — HAFTALIK NOTEBOOK'LAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "Haftal\u0131k Notebook'lar", "B\u00d6L\u00dcM 4", C.cream, TOTAL);

  const notebooks = [
    {
      title: "Notebook 1: Python Temel",
      file: "01_python_temel.ipynb",
      desc: "De\u011fi\u015fkenler, veri tipleri, operat\u00f6rler, ko\u015fullu ifadeler ve d\u00f6ng\u00fclerle ilgili 15+ al\u0131\u015ft\u0131rma. " +
            "Her al\u0131\u015ft\u0131rmada beklenen \u00e7\u0131kt\u0131 ve a\u00e7\u0131klama bulunur.",
      color: C.acc
    },
    {
      title: "Notebook 2: VK\u0130 Hesaplay\u0131c\u0131",
      file: "02_vki_hesaplayici.ipynb",
      desc: "Kullan\u0131c\u0131dan boy ve kilo alarak VK\u0130 hesaplayan, sonucu kategorize eden ve sonu\u00e7lar\u0131 " +
            "g\u00f6rselle\u015ftiren interaktif uygulama.",
      color: C.sec
    },
    {
      title: "Notebook 3: Say\u0131 Tahmin Oyunu",
      file: "03_sayi_tahmin_oyunu.ipynb",
      desc: "Random mod\u00fcl\u00fc ile say\u0131 \u00fcreten, while d\u00f6ng\u00fcs\u00fc ve if/else ile ipu\u00e7lar\u0131 veren, " +
            "skor tablosu tutan e\u011flenceli bir konsol oyunu.",
      color: C.purple
    }
  ];

  notebooks.forEach((nb, i) => {
    const y = 1.05 + i * 1.4;
    T.addCard(pres, s, 0.5, y, 9.0, 1.2, { leftColor: nb.color });
    T.numBadge(pres, s, 0.7, y + 0.15, i + 1, nb.color);
    T.cardTitle(s, 1.2, y + 0.1, 5.0, nb.title, nb.color);
    s.addText(nb.file, { x: 7.0, y: y + 0.1, w: 2.3, h: 0.3, margin: 0, fontFace: "Consolas", fontSize: 8, color: C.subtle, align: "right" });
    T.cardBody(s, 1.2, y + 0.48, 8.0, 0.6, nb.desc, { size: 10 });
  });
}

// ═══════════════════════════════════════════════════════════
// SLAYT 19 — \u00d6DEV VE KAYNAKLAR
// ═══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  T.slideHeader(pres, s, "\u00d6dev ve Kaynaklar", "B\u00d6L\u00dcM 4", C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.3, 4.0, { topColor: C.acc });
  T.cardTitle(s, 0.7, 1.2, 3.8, "Bu Hafta Yap\u0131lacaklar", C.acc);
  T.cardBody(s, 0.7, 1.6, 3.8, 3.2,
    "\u2713 Google Colab hesab\u0131 a\u00e7\u0131n\n\n" +
    "\u2713 3 notebook'u tamamlay\u0131n:\n" +
    "   \u2022 python_temel al\u0131\u015ft\u0131rmalar\u0131\n" +
    "   \u2022 VK\u0130 hesaplay\u0131c\u0131 projesi\n" +
    "   \u2022 Say\u0131 tahmin oyunu\n\n" +
    "\u2713 GitHub hesab\u0131 olu\u015fturun\n\n" +
    "\u2713 \u0130lk repo'nuzu a\u00e7\u0131p notebook'lar\u0131\n   y\u00fckleyin\n\n" +
    "Teslim: Hafta 2 dersinden \u00f6nce"
  );

  T.addCard(pres, s, 5.2, 1.05, 4.3, 4.0, { topColor: C.sec });
  T.cardTitle(s, 5.4, 1.2, 3.8, "\u00d6nerilen Kaynaklar", C.sec);
  T.cardBody(s, 5.4, 1.6, 3.8, 3.2,
    "Kitaplar:\n" +
    "\u2022 Python Crash Course (E. Matthes)\n" +
    "\u2022 Automate the Boring Stuff\n\n" +
    "Video:\n" +
    "\u2022 CS50P \u2014 Harvard (YouTube)\n" +
    "\u2022 Corey Schafer Python Tutorials\n\n" +
    "Dok\u00fcman:\n" +
    "\u2022 docs.python.org/3/tutorial\n" +
    "\u2022 realpython.com\n" +
    "\u2022 w3schools.com/python\n\n" +
    "Uygulama:\n" +
    "\u2022 HackerRank Python Challenge\n" +
    "\u2022 LeetCode Easy Problems"
  );
}

// ═══════════════════════════════════════════════════════════
// SLAYT 20 — KAPANI\u015e
// ═══════════════════════════════════════════════════════════
T.addClosingSlide(pres,
  "Hafta 1 \u2014 \u00d6zet",
  [
    { text: "Veri bilimi; istatistik, programlama ve alan bilgisini birle\u015ftiren disiplinler aras\u0131 bir aland\u0131r.", color: C.acc },
    { text: "Python'da 4 temel veri tipi (str, int, float, bool) ve 4 koleksiyon yap\u0131s\u0131 (list, dict, tuple, set) vard\u0131r.", color: C.sec },
    { text: "for ve while d\u00f6ng\u00fcleri ile if/elif/else yap\u0131lar\u0131 Python'un kontrol ak\u0131\u015f\u0131n\u0131n temelini olu\u015fturur.", color: C.purple },
    { text: "Fonksiyonlar ve lambda ifadeleri kodun yeniden kullan\u0131labilirli\u011fini ve okunabilirli\u011fini art\u0131r\u0131r.", color: C.green },
    { text: "GitHub ile versiyon kontrol\u00fc, profesyonel yaz\u0131l\u0131m geli\u015ftirmenin vazge\u00e7ilmez bir par\u00e7as\u0131d\u0131r.", color: C.blue }
  ],
  "Veriye dokunan, gelece\u011fi \u015fekillendirir.",
  "Dr. Murat Altun"
);

// ═══════════════════════════════════════════════════════════
// DOSYAYI KAYDET
// ═══════════════════════════════════════════════════════════
const outPath = "/Users/drmurataltun/Documents/vb-yz-90/sunumlar_yeni/hafta01_python_temelleri.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("Sunum olusturuldu: " + outPath))
  .catch(err => { console.error("Hata:", err); process.exit(1); });
