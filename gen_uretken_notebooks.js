/**
 * Üretken YZ Atölyesi — Toplu Notebook Üretici (.ipynb)
 * ======================================================
 * Her hafta için 3-6 araç kılavuzu notebook'u üretir.
 * Notebook felsefesi: çoğunlukla markdown (kavramlar + ekran görüntüsü placeholder + adım adım rehber).
 * Sadece Hafta 12-14'te gerçek kod hücreleri (Ollama API, Gemini API, Streamlit şablon).
 *
 * Çalıştır: node gen_uretken_notebooks.js
 * Çıktı: notebooks/haftaXX/<notebook_name>.ipynb
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════
// HELPERS — ipynb hücre üretimi
// ═══════════════════════════════════════════════════════════
function mdCell(lines) {
  return {
    cell_type: 'markdown',
    metadata: {},
    source: Array.isArray(lines) ? lines.map(l => l + '\n') : [lines + '\n'],
  };
}

function codeCell(lines) {
  return {
    cell_type: 'code',
    execution_count: null,
    metadata: {},
    outputs: [],
    source: Array.isArray(lines) ? lines.map(l => l + '\n') : [lines + '\n'],
  };
}

function buildNotebook(title, cells) {
  return {
    cells,
    metadata: {
      kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' },
      language_info: {
        name: 'python',
        version: '3.11',
        mimetype: 'text/x-python',
        codemirror_mode: { name: 'ipython', version: 3 },
        pygments_lexer: 'ipython3',
        nbconvert_exporter: 'python',
        file_extension: '.py',
      },
      colab: { name: title, provenance: [] },
    },
    nbformat: 4,
    nbformat_minor: 5,
  };
}

// ═══════════════════════════════════════════════════════════
// GENEL ŞABLON: Araç Kılavuzu (markdown ağırlıklı)
// ═══════════════════════════════════════════════════════════
function toolGuideNotebook(opts) {
  // opts: { weekId, weekTitle, notebookTitle, notebookDesc, sections[], tasks[], next }
  const cells = [];

  // Header
  cells.push(mdCell([
    `# ${opts.notebookTitle}`,
    '',
    `> **Hafta ${opts.weekId} · ${opts.weekTitle}** · *Üretken YZ Atölyesi · Dr. Murat Altun*`,
    '',
    `**Bu notebook hakkında:** ${opts.notebookDesc}`,
    '',
    '---',
  ]));

  // Hedefler
  if (opts.objectives && opts.objectives.length) {
    cells.push(mdCell([
      '## 🎯 Hedefler',
      '',
      'Bu notebook\'u tamamladığında:',
      '',
      ...opts.objectives.map(o => `- ${o}`),
      '',
      '---',
    ]));
  }

  // Ön hazırlık
  if (opts.prep && opts.prep.length) {
    cells.push(mdCell([
      '## 📋 Ön Hazırlık',
      '',
      ...opts.prep.map(p => `- ${p}`),
      '',
      '---',
    ]));
  }

  // Bölümler
  (opts.sections || []).forEach((sec, i) => {
    cells.push(mdCell([
      `## ${i + 1}. ${sec.title}`,
      '',
      sec.intro || '',
    ]));

    if (sec.steps) {
      cells.push(mdCell([
        '**Adım adım rehber:**',
        '',
        ...sec.steps.map((s, idx) => `${idx + 1}. ${s}`),
      ]));
    }

    if (sec.tip) {
      cells.push(mdCell([
        `> 💡 **İpucu:** ${sec.tip}`,
      ]));
    }

    if (sec.code) {
      cells.push(codeCell(sec.code));
    }

    if (sec.image) {
      cells.push(mdCell([
        `![${sec.image.alt || 'ekran görüntüsü'}](${sec.image.url || 'placeholder.png'})`,
        '',
        `*${sec.image.caption || ''}*`,
      ]));
    }

    if (sec.note) {
      cells.push(mdCell([
        `> ℹ️ ${sec.note}`,
      ]));
    }
  });

  // Görevler / Sen Yap
  if (opts.tasks && opts.tasks.length) {
    cells.push(mdCell([
      '---',
      '',
      '## 🛠️ Sen Yap — Atölye Görevleri',
      '',
      ...opts.tasks.map((t, i) => `**Görev ${i + 1}.** ${t}`),
      '',
      '> Çıktılarını öğrenme defterine kaydet, capstone projesinde tekrar kullanırsın.',
    ]));
  }

  // Sıradaki
  cells.push(mdCell([
    '---',
    '',
    '## 📚 Sıradaki',
    '',
    opts.next || 'Bir sonraki notebook ile atölye akışına devam et.',
    '',
    '*— Üretken YZ Atölyesi · Prompttan Ürüne · Dr. Murat Altun · 2026*',
  ]));

  return buildNotebook(opts.notebookTitle, cells);
}

// ═══════════════════════════════════════════════════════════
// KOD ŞABLONU: Hafta 12-14 için gerçek kod örnekleri
// ═══════════════════════════════════════════════════════════
function codeExampleNotebook(opts) {
  const cells = [];

  cells.push(mdCell([
    `# ${opts.notebookTitle}`,
    '',
    `> **Hafta ${opts.weekId} · ${opts.weekTitle}** · *Üretken YZ Atölyesi · Dr. Murat Altun*`,
    '',
    opts.notebookDesc,
    '',
    '---',
  ]));

  if (opts.objectives && opts.objectives.length) {
    cells.push(mdCell([
      '## 🎯 Hedefler',
      '',
      ...opts.objectives.map(o => `- ${o}`),
      '',
    ]));
  }

  cells.push(mdCell([
    '## 📦 Kurulum',
    '',
    'Bu notebook\'taki kodu çalıştırmak için aşağıdaki paketler gerekir:',
  ]));
  if (opts.install) cells.push(codeCell(opts.install));

  (opts.sections || []).forEach((sec) => {
    cells.push(mdCell([`## ${sec.title}`, '', sec.intro || '']));
    if (sec.code) cells.push(codeCell(sec.code));
    if (sec.note) cells.push(mdCell([`> ${sec.note}`]));
  });

  if (opts.tasks && opts.tasks.length) {
    cells.push(mdCell([
      '---',
      '## 🛠️ Sen Yap',
      '',
      ...opts.tasks.map((t, i) => `**Görev ${i + 1}.** ${t}`),
    ]));
  }

  cells.push(mdCell([
    '---',
    '*— Üretken YZ Atölyesi · Dr. Murat Altun · 2026*',
  ]));

  return buildNotebook(opts.notebookTitle, cells);
}

// ═══════════════════════════════════════════════════════════
// 14 HAFTA × NOTEBOOK META
// ═══════════════════════════════════════════════════════════
const NOTEBOOKS = [
  // ═══ HAFTA 1 ═══
  {
    week: 1, slug: '01', weekTitle: "Üretken YZ'ye Giriş",
    files: [
      {
        filename: 'hafta01_kavram_haritasi.ipynb',
        type: 'guide',
        opts: {
          notebookTitle: 'Üretken YZ Kavram Haritası ve Mini Quiz',
          notebookDesc: 'YZ → ML → DL → Üretken YZ kavramları arasındaki ilişkiyi görsel olarak keşfedip, küçük bir self-quiz ile pekiştireceğiz.',
          objectives: [
            'YZ, ML, DL ve Üretken YZ\'nin sınır ve kesişimlerini ayırt etmek',
            'Diskriminatif (sınıflandırıcı) ve üretken modeller farkını kavramak',
            'Türkiye\'den 5 üretken YZ örneğini sıralayabilmek',
          ],
          prep: [
            'Kahve/çay hazır 😊',
            'Defter ve kalem (kavram haritasını kendin de çiz)',
            'ChatGPT veya Gemini açık olsun (denemeler için)',
          ],
          sections: [
            {
              title: 'YZ vs ML vs DL vs Üretken YZ',
              intro: 'En geniş kümeden en dar olanına doğru ilerleyen 4 katmanlı bir set düşün:\n\n- **YZ (Yapay Zekâ):** İnsan zekâsını taklit eden tüm sistemler (sembolik AI, kural tabanlı dahil).\n- **ML (Makine Öğrenmesi):** Veriden örüntü çıkaran YZ alt kümesi.\n- **DL (Derin Öğrenme):** Çok katmanlı sinir ağları kullanan ML alt kümesi.\n- **Üretken YZ:** İçerik (metin, görsel, ses, video) üreten modeller. Genelde DL temellidir.',
              tip: 'Üretken YZ ≠ ML\'in karşıtı. Üretken YZ, ML/DL\'in bir uygulama tipi.',
            },
            {
              title: 'Diskriminatif vs Üretken Model',
              intro: 'İki temel ML görev türü vardır:\n\n- **Diskriminatif (sınıflandırıcı):** Veri verildiğinde etiket tahmin eder. Örnek: "Bu mail spam mi?"\n- **Üretken:** Veri dağılımını öğrenir, yeni örnek üretir. Örnek: "Spam-benzeri yeni bir mail metni yaz."',
              tip: 'ChatGPT, Gemini, DALL-E, Sora hep üretken. Yorum analizi, OCR, yüz tanıma diskriminatif.',
            },
            {
              title: 'Mini Quiz — Sen Sınıflandır',
              intro: 'Aşağıdaki sistemlerin hangisi üretken, hangisi diskriminatif?\n\n1. Google Translate\n2. Spam filtresi\n3. Midjourney\n4. Yüz tanıma sistemi\n5. Bir blog yazısı tamamlayıcı\n6. Hava durumu tahmin modeli\n7. Suno (müzik üretici)\n\n*Cevaplarını öğrenme defterine yaz, sonra kontrol et.*',
              note: '**Cevap anahtarı:** 1) Üretken (çeviri = metin üretimi) | 2) Diskriminatif | 3) Üretken | 4) Diskriminatif | 5) Üretken | 6) Diskriminatif (sayısal tahmin) | 7) Üretken',
            },
            {
              title: 'Türkiye Perspektifi',
              intro: 'Türkiye\'de bilinen 5 üretken YZ örneği:\n\n1. **Trendyol-LLM** — Türkçe büyük dil modeli\n2. **Nano Banana** — yerli görsel üretim aracı\n3. **NotebookLM Türkçe podcast** (Google, Türkçe destek)\n4. **Cosmos LLM** — KUIS (Koç) tarafından eğitilmiş\n5. **MEB YZ Politika Belgesi** araçları (45+ tool)',
            },
          ],
          tasks: [
            'Bir kavram haritası çiz: YZ → ML → DL → Üretken YZ. Her halkanın içine 3 örnek koy.',
            'ChatGPT\'ye sor: "Bana Türkiye\'deki son 12 ayda öne çıkan 5 üretken YZ aracını listele." Yanıtı kavram haritana ekle.',
            'Aile/iş arkadaşına 3 dakikalık bir "Üretken YZ nedir?" anlatımı yap. Geri bildirim al.',
          ],
          next: 'Sonraki notebook: `hafta01_tarihce_timeline.ipynb` — Turing\'den ChatGPT\'ye yolculuk.',
        },
      },
      {
        filename: 'hafta01_tarihce_timeline.ipynb',
        type: 'guide',
        opts: {
          notebookTitle: 'Üretken YZ Tarihçesi — Turing\'den 2026\'ya',
          notebookDesc: 'YZ\'nin köklerinden bugünün multimodal modellerine uzanan görsel zaman çizgisi.',
          objectives: [
            '7 dönüm noktasını sıralı olarak hatırlamak',
            'Cahit Arf (1958) ve Türkiye\'nin yerini görmek',
            'Transformer (2017) öncesi/sonrası ayrımını anlamak',
          ],
          sections: [
            {
              title: '1950 — Turing Testi',
              intro: 'Alan Turing "Computing Machinery and Intelligence" makalesinde "Makineler düşünebilir mi?" sorusunu sordu. Cevap arayışı YZ\'nin doğum tetikleyicisi oldu.',
            },
            {
              title: '1956 — Dartmouth Konferansı',
              intro: 'John McCarthy ve ekibi YZ\'yi resmi bir araştırma alanı olarak kurdu. "Artificial Intelligence" terimi burada doğdu.',
            },
            {
              title: '1958 — Cahit Arf: "Makine Düşünebilir mi?"',
              intro: 'Türk matematikçi Cahit Arf, **1958\'de** Erzurum Atatürk Üniversitesi açılış konuşmasında bu soruyu Türkçe olarak ele aldı. Türkiye\'nin YZ kökü 60+ yıl öncesine uzanır.',
              note: 'docs/cahit-arf-makine-dusunebilir-mi-orjinal.pdf — orijinal makale.',
            },
            {
              title: '2014 — GAN (Üretken Çekişmeli Ağlar)',
              intro: 'Ian Goodfellow, GAN\'leri (Generative Adversarial Networks) yayınladı. "Üretken çağ" başladı — fotogerçek görsel üretimi mümkün hale geldi.',
            },
            {
              title: '2017 — "Attention is All You Need" (Transformer)',
              intro: 'Google ekibi Transformer mimarisini yayınladı. Bu, BERT/GPT/Claude/Gemini gibi tüm modern LLM\'lerin temelidir.',
              tip: 'Transformer öncesi: kısa context, RNN/LSTM. Sonrası: uzun context, paralel hesaplama, ölçeklenebilir.',
            },
            {
              title: '2022 — ChatGPT (30 Kasım)',
              intro: 'OpenAI, GPT-3.5\'i ChatGPT olarak halka açtı. 5 günde 1 milyon kullanıcıya ulaştı — tüm zamanların en hızlı yayılan teknolojik ürünü.',
            },
            {
              title: '2024-2026 — Multimodal & Agent çağı',
              intro: 'GPT-4o, Gemini 2.5, Claude Sonnet 4.6 — tek modelle metin+ses+görsel+video. MCP (Anthropic), Computer Use (browser kontrol), agentic workflows.',
            },
          ],
          tasks: [
            '7 dönüm noktasını kendi sözlerinle özetleyen 1 sayfalık zaman çizgisi hazırla.',
            'Her dönüm noktası için "şimdi olsa nasıl olurdu?" düşünce deneyi yap (örneğin "Cahit Arf\'ın 1958\'de bir LLM\'i olsaydı?").',
            'Cahit Arf makalesini oku (docs/), 1 sayfa Türkçe özetle.',
          ],
          next: 'Sonraki: `hafta01_etik_senaryolar.ipynb`',
        },
      },
      {
        filename: 'hafta01_etik_senaryolar.ipynb',
        type: 'guide',
        opts: {
          notebookTitle: 'Üretken YZ Etiği — 10 Vaka, Sen Ne Yapardın?',
          notebookDesc: 'Halüsinasyon, deepfake, telif, bias konularında gerçek vakalar üzerinden etik karar atölyesi.',
          objectives: [
            '4 ana etik kategoride risk türlerini tanıyabilmek',
            'KVKK, MEB ve AB AI Act çerçevesini özetleyebilmek',
            'Kişisel/kurumsal kullanım için etik kontrol listesi hazırlamak',
          ],
          sections: [
            {
              title: 'Vaka 1: Hayali Hukuk Davası',
              intro: 'Bir avukat ChatGPT\'ye dava emsali sordu, sistem 6 sahte dava uydurdu, avukat kullandı. Hakim 5000 USD ceza verdi.\n\n**Soru:** Bu avukatın yapması gereken neydi? Bir kontrol listesi yaz.',
            },
            {
              title: 'Vaka 2: Deepfake Politikacı',
              intro: 'Sosyal medyada bir politikacının gerçekte söylemediği şeyler söylediği video yayıldı. Seçmen davranışı etkilendi.\n\n**Soru:** Platformlar ne yapmalı? KVKK kapsamında nasıl şikayet edersin?',
            },
            {
              title: 'Vaka 3: Öğrenci Ödevi',
              intro: 'Lise öğrencisi tarih ödevini ChatGPT ile yazdırdı, atıf yapmadı. Öğretmen GPTZero ile tespit etti.\n\n**Soru:** Sınıf protokolün ne olmalı? "Yardım aldı" ile "kopya çekti" arasındaki sınır?',
            },
            {
              title: 'Vaka 4: Görsel Telif',
              intro: 'Tasarımcı Midjourney ile poster yaptı, müşteriye sattı. Sonra başka bir sanatçının "stilini" taklit ettiği iddia edildi.\n\n**Soru:** "Stil" telifli mi? Müşteriye ne diyeceksin?',
            },
            {
              title: 'Vaka 5: KVKK ve Hasta Verisi',
              intro: 'Doktor, ChatGPT\'ye hasta vakası yazdı, hastanın adını da ekledi. KVKK ihlali oluştu.\n\n**Soru:** Lokal LLM neden burada zorunlu? Hasta verisi YZ\'ye nasıl verilir?',
            },
            {
              title: 'Yasal Çerçeve Özeti',
              intro: '- **KVKK (TR):** Kişisel veri YZ\'ye verilemez (anonim olmadıkça).\n- **MEB YZ Politika Belgesi:** Eğitimde YZ kullanım çerçevesi.\n- **AB AI Act (2024):** Yüksek riskli sistemlere uyum yükümlülüğü.\n- **C2PA:** AI üretimi içerik için dijital etiket standardı.',
            },
          ],
          tasks: [
            '5 vakanın her biri için 3 maddelik "kişisel kontrol listesi" hazırla.',
            'Kendi mesleğine özel 5 etik risk listele (örn. öğretmen: ödev intihali, doktor: hasta gizliliği, gazeteci: kaynak doğrulama).',
            'KVKK kapsamında YZ ile yapılabilecek/yapılamayacak 3 işlem örneği yaz.',
          ],
          next: 'Hafta 1 tamamlandı. Sıradaki: `hafta02_prompt_anatomi.ipynb` (Prompt Mühendisliği).',
        },
      },
    ],
  },

  // ═══ HAFTA 2 ═══
  {
    week: 2, slug: '02', weekTitle: 'Prompt Mühendisliği',
    files: [
      {
        filename: 'hafta02_prompt_anatomi.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'Prompt Anatomisi — 6 Yapı Taşı',
          notebookDesc: 'Bir prompt\'un içindeki 6 unsuru tek tek inceleyip, hepsini birleştirmenin gücünü göreceğiz.',
          objectives: [
            'Rol + Bağlam + Görev + Kısıt + Format + Örnek 6\'lı yapısını ezberlemek',
            'Aynı görevi 6 farklı kalitede prompt ile karşılaştırmak',
            'Kendi mesleğine özel "prompt iskeleti" oluşturmak',
          ],
          sections: [
            { title: 'Yapı 1 — ROL', intro: '"Sen bir... uzmanısın." Modelin "kim olduğunu" bilmesi cevabın tonunu, derinliğini ve dilini belirler.\n\n**Örnek:**\n```\nSen 20 yıllık bir matematik öğretmenisin. 8. sınıf öğrencilerine üslü sayıları somut örneklerle anlatırsın.\n```' },
            { title: 'Yapı 2 — BAĞLAM', intro: 'Modele "neye bağlı" olduğunu söyle. Sınıf düzeyi, hedef kitle, kısıtlar, kurum kuralları.\n\n**Örnek:**\n```\nÖğrenciler MEB müfredatına göre çalışıyor. Önümüzdeki hafta TEOG sınavı var. Konuyu hızlı pekiştirmem gerekiyor.\n```' },
            { title: 'Yapı 3 — GÖREV', intro: 'Net bir fiil + somut çıktı. "Yardım et" değil, "5 örnek soru hazırla".' },
            { title: 'Yapı 4 — KISIT', intro: 'Sınırlar: dil, uzunluk, format, ton, yasak kelimeler.\n\n**Örnek:**\n```\n- Türkçe (ı, ğ, ü, ö, ş, ç kullan)\n- Her cevap maksimum 100 kelime\n- Akademik dil değil, samimi öğretmen dili\n```' },
            { title: 'Yapı 5 — FORMAT', intro: 'JSON, tablo, markdown, listeleme. Yapılandırılmış çıktı kullanım kolaylığı sağlar.' },
            { title: 'Yapı 6 — ÖRNEK (Few-shot)', intro: '1-3 örnek vermek %80 işi çözer. "Örneğin böyle olsun: ..."' },
            {
              title: 'Birleştirme',
              intro: '6 unsuru tek prompt\'ta:',
              tip: '6 unsur olmadan prompt yazma. İlk başta uzun gelir, sonra reflex olur.',
            },
          ],
          tasks: [
            'Kendi mesleğine özel 1 görev seç. 6 unsurla bir prompt yaz, ChatGPT/Gemini\'de dene.',
            'Aynı görevi sadece "Görev" unsuruyla yaz, sonuçları kıyasla. Kalite farkını gözlemle.',
            'Bir "Altın Prompt Şablonu" oluştur — Notion sayfası aç, 6 unsur başlığıyla doldurabileceğin bir form.',
          ],
          next: 'Sonraki: `hafta02_few_shot_atolye.ipynb`',
        },
      },
      {
        filename: 'hafta02_few_shot_atolye.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'Few-Shot Prompting — Örnekle Öğret',
          notebookDesc: 'Zero-shot, one-shot, few-shot ne zaman hangisi? Duygu analizi ve sınıflandırma görevlerinde kıyas.',
          objectives: ['Zero/one/few-shot farkını uygulamalı görmek', 'Few-shot için iyi örnek seçim kriterlerini öğrenmek'],
          sections: [
            { title: 'Tanımlar', intro: '- **Zero-shot:** Hiç örnek vermeden görev. "Bu yorumun duygusunu söyle."\n- **One-shot:** 1 örnek. "Şöyle: \'Harika!\' = pozitif. Sıra sende: \'Berbat\' = ?"\n- **Few-shot:** 2-5 örnek. Modelin örüntüyü çıkarmasını sağlar.' },
            { title: 'Atölye 1 — Türkçe Yorum Duygu Analizi', intro: 'ChatGPT veya Gemini\'de aşağıdaki üç prompt\'u dene ve sonuçları kaydet:\n\n**Zero-shot:**\n```\nBu Türkçe yorumun duygusu nedir (pozitif/negatif/nötr)?\nYorum: "Kargo geç geldi ama ürün güzel."\n```\n\n**Few-shot (3 örnek):**\n```\nYorum: "Teslim çok hızlı, çok memnunum." → POZ\nYorum: "Renk fotoğraftaki gibi değil." → NEG\nYorum: "İdare eder, beklediğim kadar değil." → NÖT\nYorum: "Kargo geç geldi ama ürün güzel." →\n```' },
            { title: 'Atölye 2 — Soru Sınıflandırma (TYT)', intro: 'TYT soru tipi sınıflandırma:\n```\nSoru: "x² - 5x + 6 = 0 denklemini çözünüz." → CEBİR\nSoru: "Türkiye\'nin en büyük gölü hangisidir?" → COĞRAFYA\nSoru: "Aşağıdakilerden hangisi atom çekirdeğinde bulunmaz?" →\n```' },
            { title: 'İyi Few-shot Örnekleri Nasıl Seçilir?', intro: '- **Çeşitlilik:** Farklı tipte örnekler (kısa/uzun, pozitif/negatif/nötr)\n- **Format tutarlılığı:** Aynı yapı (girdi → çıktı)\n- **Sınır vakaları:** "İdare eder" gibi belirsizler dahil et\n- **3-5 yeterli:** Çok örnek hız+maliyet getirir, az fayda' },
          ],
          tasks: [
            'Kendi alanından 5 örnek hazırla, few-shot ile bir sınıflandırıcı kur.',
            'Aynı görevi zero-shot vs few-shot ile dene, doğruluk farkını rapor yaz.',
            '"Soruyu prompt\'a kopyalamak" vs "few-shot örnek olarak vermek" deneyini yap.',
          ],
        },
      },
      {
        filename: 'hafta02_cot_matematik_mantik.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'Chain-of-Thought — Adım Adım Düşündür',
          notebookDesc: '"Önce planla, sonra yaz" stratejisi. Mantık bulmacaları ve matematik sorularında uygulamalı.',
          objectives: ['CoT\'nin neden çalıştığını sezgisel anlamak', '5 mantık bulmacasında doğruluk ölçmek'],
          sections: [
            { title: 'CoT Nedir?', intro: 'Modele "düşünme alanı" vermek. "Cevabı tek seferde söyleme, önce adım adım düşün, sonra cevapla."\n\n**Sihirli kelime:** *"Adım adım düşünelim."* veya *"Önce planla, sonra cevapla."*' },
            { title: 'Bulmaca 1', intro: 'Aşağıdaki bulmacayı 2 prompt\'la dene:\n\n**Bulmaca:** "Bir tren saat 8\'de Ankara\'dan, 80 km/saat hızla yola çıktı. Saat 9\'da İstanbul\'dan 120 km/saat hızla bir tren yola çıktı. İki şehir arası 450 km. Trenler ne zaman karşılaşır?"\n\n**Prompt A (CoT yok):** "Cevabı söyle."\n**Prompt B (CoT):** "Adım adım düşün ve göster."' },
            { title: 'Bulmaca 2 — Mantık', intro: '"Üç kişi (Ali, Veli, Selim) farklı meslekte (öğretmen, doktor, mühendis). Ali doktor değil. Selim öğretmenden uzun. Doktor en kısa kişi. Selim en uzun. Kim ne meslekte?"' },
            { title: 'Self-Consistency', intro: 'CoT + birden fazla cevap üret + en sık çıkan cevabı al. Karmaşık sorularda doğruluğu %20+ artırabilir.\n\n**Prompt:** "Bu soruyu 5 farklı yoldan adım adım çözerek 5 cevap üret. Sonra çoğunluğun cevabı hangisi?"' },
          ],
          tasks: [
            '5 mantık bulmacası seç, CoT\'siz vs CoT\'li dene, doğruluk oranlarını kaydet.',
            'Kendi alanından bir karmaşık karar problemi yaz, CoT ile çözdür.',
          ],
        },
      },
      {
        filename: 'hafta02_yapilandirilmis_cikti.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'Yapılandırılmış Çıktı — JSON, Tablo, Markdown',
          notebookDesc: 'Modelin cevabını otomasyona/diğer araçlara verebilmek için yapılandırılmış çıktı talep etmek.',
          objectives: ['JSON, tablo ve markdown çıktı şablonları yazmak', 'Çıktıyı doğrudan başka bir araca beslemek'],
          sections: [
            { title: 'Neden Yapılandırılmış Çıktı?', intro: 'Düz metin → insan okur. JSON/tablo → bilgisayar okur. Otomasyon (Hafta 9), API (Hafta 14), n8n akışı için olmazsa olmaz.' },
            { title: 'JSON Çıktı', intro: '**Prompt:**\n```\nAşağıdaki yorumdan duygu, ürün özelliği ve şikayet kategorisini çıkar.\nÇıktı şu JSON formatında olsun:\n{\n  "duygu": "POZ|NEG|NÖT",\n  "ozellik": "...",\n  "sikayet_kategorisi": "kargo|kalite|fiyat|diğer|yok"\n}\n\nYorum: "Ürün güzel ama kargo 2 hafta sürdü, çileden çıkardı."\n```' },
            { title: 'Markdown Tablo', intro: '"Aşağıdaki 5 LLM aracını maliyet, hız, Türkçe doğruluk açısından markdown tablosu olarak kıyasla: ChatGPT, Gemini, Claude, Grok, DeepSeek."' },
            { title: 'Listeleme + Numaralı', intro: '"5 maddelik kontrol listesi, her madde 1 cümle, her cümlede maksimum 12 kelime."' },
            { title: 'Pydantic / Schema (ileri)', intro: 'OpenAI ve Gemini, yapılandırılmış çıktı için "Schema" desteği sunar. Hafta 14\'te API ile derinleşeceğiz.' },
          ],
          tasks: [
            'Kendi mesleğine özel bir form (JSON) tanımla. ChatGPT\'ye 10 örnek girdiyi formla doldurt.',
            '5 araçlı kıyas tablosu prompt\'u yaz, sonucu Notion\'a kopyala.',
          ],
        },
      },
      {
        filename: 'hafta02_prompt_kutuphanesi_sablon.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'Prompt Kütüphanesi Şablonu',
          notebookDesc: 'Notion / GitHub / Obsidian üzerinde kişisel prompt arşivinin nasıl kurulacağı.',
          objectives: ['Prompt versiyonlama yapısı kurmak', 'Etiket sistemi ve aramayı öğrenmek'],
          sections: [
            { title: 'Şablon Yapısı', intro: 'Her prompt için minimum alanlar:\n\n- **Başlık** (1 satır)\n- **Etiket** (#egitimci, #pazarlama, #kod...)\n- **Kullanım Sıklığı** (★★★)\n- **Versiyon** (v1.0)\n- **Prompt metni**\n- **Örnek Çıktı**\n- **Değişkenler** ({{konu}}, {{seviye}})\n- **Notlar** (kim için, hangi araçta test edildi)' },
            { title: 'Notion Şablonu', intro: 'Notion\'da Database aç → her prompt bir kart. Filtre: etiket. Sırala: kullanım sıklığı. Paylaş: takım için "Public" link.' },
            { title: 'GitHub Şablonu', intro: 'Bir repo aç (`prompt-kutuphanesi`). Klasör yapısı:\n```\n/prompts/\n  /egitimci/\n    /ders-plani.md\n    /soru-uretici.md\n  /kod/\n  /yazilim/\n```' },
            { title: 'Custom GPT / Gem\'e Aktarma', intro: 'En sık kullandığın 5 prompt\'u Custom GPT veya Gem\'e dönüştür. Tek tıkla aktif et.' },
          ],
          tasks: [
            'En az 10 prompt\'tan oluşan kişisel kütüphane kur (Notion veya GitHub).',
            'Her prompt için "değişken" mantığı uygula ({{konu}}, {{seviye}}).',
            'En sık kullandığın 3 prompt\'u Gemini Gem veya Custom GPT olarak kaydet.',
          ],
        },
      },
    ],
  },
];

// ═══ Kalan haftalar için kısa stub'lar (her notebook için minimum başlık + kavram + ödev) ═══
function stubWeek(weekId, slug, weekTitle, notebooks) {
  return {
    week: weekId, slug, weekTitle,
    files: notebooks.map(nb => ({
      filename: nb[0],
      type: 'guide',
      opts: {
        notebookTitle: nb[1],
        notebookDesc: nb[2] || '',
        objectives: nb[3] || [`${nb[1]} aracını ileri seviye kullanmak`, 'Pratik atölye çıktıları üretmek'],
        sections: (nb[4] || []).map(sec => ({ title: sec[0], intro: sec[1], tip: sec[2] })),
        tasks: nb[5] || ['Ders sonrası 1 somut çıktı üret ve öğrenme defterine kaydet.'],
      },
    })),
  };
}

NOTEBOOKS.push(
  stubWeek(3, '03', 'Sohbet Asistanları', [
    ['hafta03_asistan_kiyas_matrisi.ipynb', 'Sohbet Asistanları Kıyas Matrisi', 'ChatGPT, Gemini, Claude, Grok, DeepSeek — 10 görev × 5 araç kıyas tablosu',
      ['Maliyet vs hız vs doğruluk dengelemek', '5 aracın güçlü/zayıf yanını ezbere bilmek'],
      [
        ['Maliyet ve Erişim', 'Free tier limitleri, premium fiyatlar (USD/ay), Türkiye\'den erişim.\n\n- ChatGPT Plus: 20 USD/ay, GPT-5 + o3 + Sora\n- Gemini Advanced: 19 USD/ay (Türkiye direkt)\n- Claude Pro: 20 USD/ay, Opus + Sonnet 4.6 + 4.7\n- Grok: X Premium ile, 8 USD\n- DeepSeek: Tamamen ücretsiz (web)'],
        ['Türkçe Performans', 'Aynı 10 Türkçe soruyu 5 araca sor, doğruluk + üslup karşılaştır. Türk argosu, deyimler, bölgesel ifadelerde fark belirginleşir.'],
        ['Özel Yetenekler', '- ChatGPT: Code Interpreter, Sora, Memory\n- Gemini: 2M context, Deep Research, Veo\n- Claude: Computer Use, Artifacts, MCP\n- Grok: X gerçek zamanlı arama, Think mode\n- DeepSeek: Açık ağırlık, ücretsiz reasoning'],
        ['Kıyas Tablosu Şablonu', 'Bir Excel/Sheets dosyası oluştur. Kolonlar: Görev, ChatGPT, Gemini, Claude, Grok, DeepSeek. Satırlar: 10 görev. Her hücreye 1-5 puan + kısa not.'],
      ],
      ['10 mesleki görevi 5 araca sor, kıyas raporu yaz', 'En sık kullandığın aracın "yapamadığı" 3 şeyi bul, alternatife geç', 'Aile/iş için kişisel asistan paneli hazırla (hangi araç, hangi durumda)'],
    ],
    ['hafta03_chatgpt_custom_gpt.ipynb', 'ChatGPT Custom GPT Atölyesi', 'Kendi GPT\'ni adım adım yarat — sistem prompt\'u, bilgi tabanı, eylemler.',
      ['Custom GPT yaratma 5 adımını uygulamak', 'Knowledge base ile doküman bağlamak', 'Actions ile API entegrasyonu görmek'],
      [
        ['1. Adım: Builder\'ı aç', 'ChatGPT Plus → "Explore GPTs" → "Create" → Builder ile sohbet ederek tanımla.'],
        ['2. Adım: Sistem Prompt\'u', 'Hafta 2\'de öğrendiğin 6\'lı yapı (Rol+Bağlam+Görev+Kısıt+Format+Örnek) ile sistem prompt\'u yaz.'],
        ['3. Adım: Knowledge', '20\'ye kadar dosya yükleyebilirsin (PDF, DOCX). GPT bunlardan RAG yapar.'],
        ['4. Adım: Capabilities', 'Web Browser, DALL-E, Code Interpreter — gerekenleri aç/kapat.'],
        ['5. Adım: Test ve Yayınla', '"Only me", "Only with link", "Public" — paylaşım seviyesini seç.'],
      ],
      ['Kendi alanına özel 1 Custom GPT yarat, link paylaş', '5 farklı sistem prompt\'u dene, kalite farkını gözlemle'],
    ],
    ['hafta03_gemini_gem_olustur.ipynb', 'Gemini Gems ile Kişisel Asistan', 'Gemini\'nin Custom GPT muadili olan Gems\'i atölye formatında öğren.',
      [], [['Gem nedir?', 'Gemini Advanced\'a özel kişisel asistan tanımlama özelliği. Sistem prompt + Knowledge + Connectors (Drive, Gmail, Docs).'], ['Türkçe için ipuçları', 'Türkçe yanıt için sistem prompt\'una "TÜRKÇE YANITLA" yaz, dil kilidi at. Gemini bazı durumlarda otomatik İngilizce kayar.'], ['Drive Bağlantısı', 'Gem\'e Google Drive klasörü bağlayabilirsin — RAG otomatik.']],
      ['1 mesleki Gem yarat, link paylaş', 'Drive klasörü bağla, soru-cevap dene'],
    ],
    ['hafta03_claude_projects_artifacts.ipynb', 'Claude Projects ve Artifacts', 'Claude\'un proje bazlı çalışma + canlı kod/HTML önizleme yetenekleri.',
      [], [['Projects', 'Bir proje = paylaşılan bağlam + dosyalar + sistem prompt\'u. Bir hafta boyunca aynı proje üzerinden devam edebilirsin.'], ['Artifacts', 'Claude\'un kod, HTML, mermaid diyagram, react component üretimini canlı önizleyen panel. "Kodu burada göster, ben düzelteyim" akışı.'], ['Computer Use (önizleme)', 'Claude\'un browser\'ı ya da masaüstünü kontrol etmesi. Anthropic API ile kullanılır.']],
      ['1 Claude Project oluştur, 5 dosya bağla, hafta boyu kullan', '1 Artifact ile küçük bir landing page üret'],
    ],
    ['hafta03_perplexity_arastirma_atolyesi.ipynb', 'Perplexity Spaces ile Araştırma Akışı', 'Arama tabanlı asistanlar — kaynak gösteren, gerçek zamanlı bilgi.',
      [], [['Perplexity vs ChatGPT', 'Perplexity her cevaba kaynak gösterir + güncel webdir. ChatGPT eski bilgiyi sentezler. Araştırma için Perplexity, yaratıcılık için ChatGPT.'], ['Spaces', 'Bir konu = bir Space. Belirli kaynaklara odaklan (ör: sadece arxiv.org + GitHub).'], ['Pro Search vs Deep Research', 'Pro Search: 1-2 dakikada cevap. Deep Research: 5-10 dakika, 30+ kaynak tarar, rapor yazar.']],
      ['Bir araştırma sorusunu Perplexity Deep Research ile çözdür, kaynak listesini değerlendir', 'Kendi alanına özel 1 Space oluştur'],
    ],
  ]),

  stubWeek(4, '04', 'NotebookLM ve Bilgi Yönetimi', [
    ['hafta04_notebooklm_kurulum_rehber.ipynb', 'NotebookLM\'e İlk Adım', 'notebooklm.google\'a giriş, ilk notebook oluşturma, kaynak yükleme.',
      ['NotebookLM\'e giriş yapmak', 'PDF/web/YouTube kaynaklarını eklemek', 'İlk soru-cevap denemesi'],
      [
        ['Erişim', 'notebooklm.google.com → Google hesabınla giriş. Türkiye\'den direkt erişim var, ücretsiz.'],
        ['Kaynak Türleri', '50 kaynak/notebook (Free), Plus\'ta daha fazla. Tipler: PDF, Google Docs/Slides, web URL, YouTube linki, paste markdown.'],
        ['İlk Notebook', 'New notebook → 5-10 PDF yükle → "Generate" tuşuna basma, soru sormaya başla.'],
        ['Sınırlar', '500 MB / kaynak, kombineli ~25M kelime. YouTube transcript otomatik. Web URL sayfasının metnini alır (görsel anlamaz).'],
      ],
      ['Kendi alanından 5-10 PDF/URL ile ilk NotebookLM\'ini kur', '20 soru sor, doğruluk yüzdesini ölç', 'Bir konuyu öğretmek için NotebookLM\'i kullan, geri bildirim al'],
    ],
    ['hafta04_kendi_kitabini_konustur.ipynb', 'Kendi Kitabınla Konuş', '5 PDF yükle, 20 soru-cevap atölyesi.',
      [], [['Kaynak Hazırlığı', 'PDF\'leri kontrol et: OCR yapılmış mı? Resim ağırlıklı PDF\'lerde NotebookLM zayıf.'], ['Soru Tipi 1: Tanımsal', '"X nedir?" — direkt cevap, kaynak alıntılı.'], ['Soru Tipi 2: Sentez', '"X ile Y arasındaki ilişki nedir?" — birden fazla kaynaktan derler.'], ['Soru Tipi 3: Eleştirel', '"Yazarın X argümanına karşı 3 zayıf nokta?" — analitik düşünce.']],
      ['10 soruluk doğruluk testi yap', 'NotebookLM\'in halüsinasyon yaptığı 1 örnek bul ve raporla'],
    ],
    ['hafta04_audio_overview_podcast.ipynb', 'Audio Overview ile Türkçe Podcast', 'NotebookLM\'in en sevilen özelliği — kaynaklarından otomatik podcast üretimi.',
      [], [['Audio Overview Nedir?', '2 AI sunucu, kaynaklarından bir podcast yapar. Doğal sohbet, sorular, espriler.'], ['Türkçe Destek', '"Customize" → dil → Türkçe seç. Hâlâ İngilizce karışık olabilir; sistem mesajıyla zorla Türkçe.'], ['Customize Talimatları', 'Hedef kitle, ton, vurgu yapılacak konular — sen belirle.'], ['İndir ve Paylaş', 'MP3 olarak indir, Spotify/YouTube\'a yükle, ya da Google Drive ile paylaş.']],
      ['1 konuda 20 dakikalık Türkçe podcast üret', 'Spotify/YouTube\'a yayınla, kanal aç (sınıfa, takıma)'],
    ],
    ['hafta04_mind_map_studyguide.ipynb', 'Mind Map ve Study Guide', 'NotebookLM\'in 2024 sonu eklenen özellikleri.',
      [], [['Mind Map', 'Tek tuşla kaynaklarını görsel haritaya çevirir. Konu hiyerarşisini saniyelerde görmenin en hızlı yolu.'], ['Briefing Doc', '5-10 sayfa kaynak özeti — toplantı brifingi için ideal.'], ['Study Guide', 'Sınava hazırlık formatında — kavramlar, sorular, cevaplar.'], ['Timeline', 'Olay sırası — tarih dersi için altın değerinde.']],
      ['Kendi alanında 1 Mind Map üret, sınıfta/takımda paylaş', 'Bir konu için Study Guide oluştur, kullanım sürecini raporla'],
    ],
    ['hafta04_alternatif_araclar_kiyas.ipynb', 'NotebookLM Alternatifleri', 'Claude Projects, ChatGPT Knowledge, Google AI Studio Files — kıyas.',
      [], [['Claude Projects', 'Daha sıkı kaynak kontrolü, Artifacts ile ek özellik. Ücretsiz katmanı yok.'], ['ChatGPT Knowledge', 'Custom GPT içine doküman yükleme. Audio yok ama Code Interpreter var.'], ['AI Studio Files', 'Gemini\'nin gelişmekte olan özelliği — büyük 2M context\'le 100MB+ tek doküman.'], ['Karar Matrisi', 'Türkçe podcast → NotebookLM. Kod + doküman → Claude. Excel/Sheets entegrasyonu → ChatGPT. Çok büyük tek doküman → AI Studio.']],
      ['Aynı 5 PDF\'i 4 araca yükle, soru-cevap kıyaslaması yap'],
    ],
  ]),

  stubWeek(5, '05', 'Görsel Üretim Atölyesi', [
    ['hafta05_gorsel_arac_kiyasla.ipynb', 'Görsel Üretim Araç Kıyası', '5 araç × 5 prompt karşılaştırma posteri',
      [], [['Test Promptları', '1) "Bir Türk öğretmenin sınıfında üretken YZ dersi anlattığı, fotogerçekçi kare." 2) "Cyberpunk Antalya gece" 3) "Çocuklar için bilim laboratuvarı, Pixar tarzı" 4) "Geleneksel Türk minyatürü stilinde modern teknoloji" 5) "Bir kitabın açılış kapağı, minimalist"'], ['Araçlar', 'Gemini Imagen, DALL-E 3, Midjourney, Ideogram, Flux Schnell. Hepsi ücretsiz katmandan.'], ['Değerlendirme Kriterleri', 'Prompt sadakati, fotogerçekçilik, sanat değeri, Türkçe metin yazımı (varsa), aspect ratio kontrolü.']],
      ['5 prompt × 5 araç poster yap (Canva\'da grid)', 'En iyi performans gösteren aracın "neden" iyi olduğunu yaz'],
    ],
    ['hafta05_gemini_imagen_atolye.ipynb', 'Google AI Studio + Imagen 3', 'Ücretsiz, Türkiye\'den erişilebilir, hızlı.',
      [], [['Erişim', 'aistudio.google.com → Imagen 3 → Free tier (haftalık limitli).'], ['Prompt Yapısı', 'Imagen, kısa açıklayıcı prompt\'u sever. "Bir kedi" değil, "Sokak kedisi, gri tüylü, mavi göz, fotogerçekçi, doğal ışık".'], ['Aspect Ratio', '1:1, 9:16, 16:9 — sosyal medya için seç.'], ['Negatif Prompt', '"--no text" — Türkçe metin yazımında zayıf, hata yapar.']],
      ['Mesleğine özel 5 görsel üret', 'Aynı prompt × 4 farklı aspect ratio dene'],
    ],
    ['hafta05_midjourney_atolye.ipynb', 'Midjourney v6.1 Atölyesi', 'Discord ve Web — sanat değeri en yüksek.',
      [], [['Erişim', 'midjourney.com — 10 USD/ay, Discord veya web.'], ['/imagine', 'Discord\'da `/imagine prompt: ...` ile başlat.'], ['Parametreler', '--ar 16:9 (aspect), --s 250 (stilize), --v 6 (versiyon), --niji (anime).'], ['Variation, Upscale', 'Ürettiği 4 görselden seçim. Variation = benzer üretim, Upscale = yüksek çözünürlük.']],
      ['1 karakter yarat, 5 farklı pozda tutarlı şekilde üret (--cref)'],
    ],
    ['hafta05_flux_huggingface.ipynb', 'Flux Schnell — HF Spaces (Ücretsiz)', 'Açık kaynak en iyi diffusion modeli.',
      [], [['HF Spaces', 'huggingface.co/spaces → Flux Schnell ara → Free GPU ile dene.'], ['Schnell vs Dev vs Pro', 'Schnell: 4 step, en hızlı, ücretsiz. Dev: 28 step, daha kaliteli. Pro: API.'], ['Local Çalıştırma', 'Hafta 12\'deki lokal LLM gibi, Flux\'u da kendi GPU\'nda çalıştırabilirsin (16GB+ VRAM).']],
      ['HF Spaces\'tan 5 görsel üret', 'Flux Schnell × Imagen 3 kıyas et'],
    ],
    ['hafta05_nano_banana_uygulama.ipynb', 'Nano Banana — Türk Yapımı', 'Yerli görsel üretim aracı (docs/Nano Banana Uygulamaları.docx referans).',
      [], [['Tanıtım', 'Türk yapımı görsel + üretken YZ aracı. Türkçe arayüz, yerel kullanım odaklı.'], ['Kullanım Senaryoları', 'Eğitim materyali, infografi, sosyal medya görseli.'], ['Avantajlar', 'Türkçe destek, KVKK uyumu, yerli ekosistem desteği.']],
      ['Nano Banana\'da bir mesleki proje üret, blogda tanıt'],
    ],
    ['hafta05_kamera_acilari_atolye.ipynb', 'Kamera, Işık, Stil — Prompt Geliştirme', 'Bir görseli profesyonelleştiren detaylar (docs/Kamera açıları.docx referans).',
      [], [['Kamera Açıları', 'low angle (alttan), high angle (üstten), Dutch angle (eğik), POV (1. şahıs), bird\'s eye (kuş bakışı), Worm\'s eye (solucan bakışı).'], ['Mercek/Lens', 'wide-angle (geniş), telephoto (uzak yakın çekim), macro (yakın), fisheye, portrait (85mm).'], ['Işık', 'golden hour, blue hour, harsh sunlight, soft diffused light, neon, candle light, rim light.'], ['Sanat Akımı', 'impressionist, art nouveau, baroque, minimalist, brutalist, watercolor, oil painting, pencil sketch.']],
      ['Aynı sahneyi 5 farklı kamera açısı ile üret', '5 farklı sanat akımıyla aynı konu'],
    ],
  ]),

  stubWeek(6, '06', 'Ses, TTS ve Müzik', [
    ['hafta06_tts_arac_kiyasla.ipynb', 'TTS Araç Kıyası — Aynı Metin × 5 Araç', 'ElevenLabs, OpenAI TTS, Gemini TTS, Azure, Google Cloud — Türkçe doğallık testi.',
      [], [['Test Metni', 'Bir 10-cümlelik Türkçe metin yaz (deyimler, sayılar, özel adlar dahil). Aynı metni 5 araca seslendirt.'], ['Değerlendirme', 'Doğallık, ı/ğ/ü/ö/ş/ç doğruluğu, vurgu, tempo.']],
      ['Kendi alanın için ideal TTS\'i belirle, kaynak listesi tut'],
    ],
    ['hafta06_elevenlabs_atolye.ipynb', 'ElevenLabs Türkçe + Ses Klonlama', 'Multilingual v2 ile Türkçe doğallık + 30 saniyede ses klonu.',
      [], [['Voice Library', 'Hazır Türkçe sesler (kadın/erkek, genç/yetişkin). Premium\'da daha çok seçenek.'], ['Voice Cloning (Etik!)', '30 saniyelik temiz ses örneği → klon. Hangi onayla, kim için olduğunu kayıt altına al!'], ['SSML / Etiketler', '`<break time="500ms"/>`, `[laughter]`, `[whisper]` ile detaylı kontrol.'], ['Maliyet', 'Free: 10 dk/ay. Starter: 5 USD, 30 dk/ay.']],
      ['Tanıtım metnini 3 farklı sesle dublajla', 'Etik onaylı bir voice clone yap (kendi sesin)'],
    ],
    ['hafta06_whisper_transkript.ipynb', 'Whisper STT — Video → Altyazı', 'Open-source, Türkçe %95+ doğruluk.',
      [], [['OpenAI Whisper', 'Açık kaynak, free. large-v3 modeli en iyi. Colab\'da ücretsiz çalıştırılabilir.'], ['Türkçe Performans', 'Doğal konuşma %95+. Argo, gürültü, çok hızlı konuşma → düşer.'], ['SRT Üretimi', 'Otomatik altyazı (SRT format) üretir. YouTube\'a direkt yüklenir.'], ['MacWhisper / WhisperX', 'GUI alternatifleri. Çoklu konuşmacı ayrımı için WhisperX.']],
      ['Kendi 1 saatlik dersini transkript et', 'Otomatik SRT altyazı yap, YouTube\'a yükle'],
    ],
    ['hafta06_suno_egitim_jingle.ipynb', 'Suno ile Müzik Üretimi', 'Eğitim için marş, jingle, ders açılış müziği.',
      [], [['Suno v4', 'Tek prompt → tam şarkı (sözlü). 50 free credit, sonra 8 USD/ay.'], ['Custom Mode', '"Style of Music" + "Lyrics" — Türkçe destekli.'], ['Eğitimde Kullanım', 'Sınıfa marş, ders konuları için akılda kalıcı şarkı, çocuklara yaratıcı projeler.']],
      ['Sınıf/takım için bir marş üret', 'Bir konu için akılda kalıcı eğitim şarkısı yaz'],
    ],
    ['hafta06_voice_clone_etik.ipynb', 'Voice Cloning Etiği — Onay Protokolü', 'KVKK + deepfake yasası + meslek etiği çerçevesi.',
      [], [['Yasal Çerçeve', '6698 KVKK kapsamında ses kişisel veridir. Sahibin yazılı onayı olmadan klonlama yasal değil.'], ['Onay Protokolü Şablonu', '1) Onay belgesi imzalat (kim, ne zaman, hangi amaçla, ne kadar süre)\n2) Kullanım sınırı tanımla\n3) Geri çekilme hakkı belirt\n4) Klon dosyasını saklama süresi sınırla.'], ['Deepfake Riski', 'Klonladığın ses başkası tarafından kötüye kullanılabilir — hash + watermark düşün.']],
      ['Ailendeki birinin sesini onaylı bir şekilde klonla, eğitim videolarında kullan', 'Onay belgesi şablonunu mesleki kullanım için özelleştir'],
    ],
  ]),

  stubWeek(7, '07', 'Video, Avatar, Animasyon', [
    ['hafta07_video_arac_kiyasla.ipynb', '5 Video Aracı Kıyası', 'Sora, Veo, Kling, Runway, Pika — aynı promptla.',
      [], [['Test Promptu', '"Üretken YZ ile çocuk eğitimi yapan bir öğretmen, sınıfta tablet kullanıyor, doğal ışık, fotogerçekçi"'], ['Erişim', 'Veo (Google AI Studio, ücretsiz), Sora (ChatGPT Plus), Kling (kling.ai), Runway (runway.ml), Pika (pika.art)'], ['Değerlendirme', 'Süre, kalite, hareketin tutarlılığı, fotogerçekçilik, prompt sadakati']],
      ['5 araçtan 5 video üret, kıyas posteri yap', 'Hangisi mesleğine en uygun, raporla'],
    ],
    ['hafta07_veo_gemini_studio.ipynb', 'Veo 3 — Google AI Studio (Ücretsiz)', 'Türkiye\'den direkt, 8 saniyelik videolar.',
      [], [['Erişim', 'aistudio.google.com → Veo → Free tier'], ['Prompt İpuçları', 'Sahne + kamera hareketi + ışık + ton: "Bir kafede oturan kadın, kamera yavaş zoom, golden hour ışık, sıcak ton"'], ['Sınırlar', '8 saniye, 1080p, haftalık kota.']],
      ['1 dakikalık tanıtım videon için 8 saniyelik 8 sahne üret, CapCut\'ta birleştir'],
    ],
    ['hafta07_heygen_egitim_avatari.ipynb', 'HeyGen — Türkçe Eğitim Avatarı', 'Konuşan avatar, Türkçe destekli.',
      [], [['Foto Avatar', 'Tek fotoğraf + metin → konuşan avatar (15 sn ücretsiz).'], ['Voice Clone Avatar', 'Kendi sesini + kendi yüzünü klonla. Premium.'], ['Eğitim Senaryosu', 'Tarihi karakter canlandırma, sürekli "öğretmen avatar" — öğrencilerin alışkanlığı için.']],
      ['Tarihi/edebi karakteri canlandıran 3 dakikalık avatar dersi'],
    ],
    ['hafta07_uzun_video_ozetle.ipynb', 'Multimodal Gemini — Uzun Video → Özet', 'Gemini 2.5\'in 2M context\'i ile 1 saatlik video → 5 paragraf.',
      [], [['Video Yükleme', 'aistudio.google.com → Files → upload (1 saate kadar)'], ['Prompt', '"Bu videodaki 5 ana noktayı çıkar, her birini 1 paragrafla özetle."'], ['Geri Bildirim Üretici', 'Öğrenci sunumunu izlet, otomatik geri bildirim raporu üret.']],
      ['Bir 30 dakikalık öğrenci sunumunu Gemini\'ye izlet, geri bildirim raporu üret'],
    ],
    ['hafta07_uctan_uca_pipeline.ipynb', 'Uçtan Uca Pipeline — Senaryodan Videoya', 'Senaryo (LLM) → Görsel (Imagen) → Ses (ElevenLabs) → Video (Veo) → Edit (CapCut).',
      [], [['Aşama 1: Senaryo', 'ChatGPT/Gemini ile 60 saniyelik sahne sahne senaryo.'], ['Aşama 2: Görseller', 'Her sahne için Imagen ile 1 görsel.'], ['Aşama 3: Seslendirme', 'ElevenLabs ile Türkçe dublaj.'], ['Aşama 4: Hareket', 'Görselleri Runway/Luma image-to-video ile 5 saniye animasyon.'], ['Aşama 5: Birleştirme', 'CapCut\'ta tüm parçalar + altyazı + müzik.']],
      ['Bir konu için 60 saniyelik tanıtım videosu — uçtan uca tek başına yap'],
    ],
  ]),

  stubWeek(8, '08', 'Yazı, Sunum, Doküman, Ofis', [
    ['hafta08_gamma_sunum_atolye.ipynb', 'Gamma — Sunum Üretim Atölyesi', '20 slaytlık sunum 5 dakikada.',
      [], [['Erişim', 'gamma.app — 400 free credits.'], ['Prompt → Sunum', '"Üretken YZ giriş, 20 slayt, lise öğretmenleri için" yaz, gerisini Gamma yapsın.'], ['Tema ve Marka', 'Renk paleti, font, logo — kurumsal şablon olarak kaydet.'], ['Edit ve İhraç', 'Slaytları düzenleyebilir, PDF/PPT/PNG ihraç edebilir.']],
      ['Mesleğine özel 20 slaytlık sunum üret, PowerPoint ile kıyasla'],
    ],
    ['hafta08_copilot_excel_otomasyon.ipynb', 'Microsoft Copilot — Excel Otomasyonu', 'Formül + grafik + analiz, doğal dilde.',
      [], [['Erişim', 'Copilot 365 lisansı (kurumsal yaygın). Bireysel: Copilot Pro (28 USD/ay).'], ['Excel\'de Açma', 'Excel ribbon → Copilot. Tablonu seç, "Bu veriyi analiz et" yaz.'], ['Formül Üretimi', '"Her satırın yıllık ortalamasını al, sıralı tablo döndür."'], ['Grafik Önerisi', '"Bu veriye en uygun grafik nedir?"']],
      ['Bir aylık veriyi Copilot ile rapor haline getir'],
    ],
    ['hafta08_canva_magic_design.ipynb', 'Canva Magic Design', 'Pazarlama görselleri tek prompt\'la.',
      [], [['Magic Design', 'Tek prompt → 8 farklı tasarım önerisi (sosyal medya, sunum, broşür).'], ['Brand Kit', 'Logo, renk paleti, font — bir kez tanımla, her tasarıma otomatik.'], ['Magic Write', 'Canva içinden metin yazma + görsel üretme entegre.']],
      ['Mesleğine özel marka kiti kur, 5 farklı paylaşım tasarla'],
    ],
    ['hafta08_chatpdf_arastirma.ipynb', 'ChatPDF — Araştırma Akışı', 'Akademik makale, hukuki belge, teknik şartname ile sohbet.',
      [], [['Yükleme', 'chatpdf.com → 120 sayfa free / belge.'], ['Soru Tipleri', 'Özet, tanım, eleştiri, atıf bulma.'], ['Multi-PDF', 'Ücretli: birden fazla belge aynı anda — meta-analiz için ideal.']],
      ['5 mesleki PDF\'inle ChatPDF\'i NotebookLM\'e karşı kıyasla'],
    ],
    ['hafta08_toplanti_asistani.ipynb', 'Toplantı Asistanları — Otter, tldv, Fireflies', 'Otomatik özet + aksiyon maddeleri.',
      [], [['Otter.ai', 'Real-time transcript, özet, action items. Türkçe destek geldi.'], ['tldv.io', 'Zoom/Meet otomatik kaydı + özet. Free tier güçlü.'], ['Fireflies.ai', 'Daha "kurumsal" — CRM, Slack entegrasyonu.']],
      ['Bir haftalık toplantılarını 1 araçla kaydet, özetlerini değerlendir'],
    ],
  ]),

  stubWeek(9, '09', 'Otomasyon ve İş Akışları', [
    ['hafta09_zapier_ilk_zap.ipynb', 'İlk Zap — Gmail → Sheets + GPT', 'Sıfırdan otomasyon: yeni e-posta gelince GPT özetle, Sheets\'e yaz.',
      [], [['Zapier 101', 'Tetikleyici (Trigger) + Aksiyonlar (Actions) zinciri = Zap.'], ['Adım 1: Trigger', 'Gmail → "New Email matching search" → konu="kayıt"'], ['Adım 2: GPT Action', 'OpenAI → "Create Chat Completion" → prompt="Bu e-postayı 2 cümlede özetle"'], ['Adım 3: Sheets Action', 'Google Sheets → "Create Spreadsheet Row" → sütunlar: tarih, kimden, özet'], ['Test ve Yayınla', 'Zap\'ı test et, başarılıysa "Publish".']],
      ['Kendi günlük rutinini otomatize eden 1 Zap kur'],
    ],
    ['hafta09_make_senaryo.ipynb', 'Make — RSS → ChatGPT → Telegram', 'Görsel akış editörü, daha güçlü mantık.',
      [], [['Make vs Zapier', 'Make: visual editör, daha çok step, daha ucuz. Zapier: kolay, popüler entegrasyon.'], ['Senaryo', 'RSS feed (örn HuggingFace blog) → ChatGPT (Türkçe özet) → Telegram bot (sana gönder).'], ['Hata Yönetimi', 'Routes, filters, error handlers — production senaryolar için.']],
      ['Kendi haberlerini takip eden günlük brifing senaryosu kur'],
    ],
    ['hafta09_n8n_kurulum.ipynb', 'n8n — Self-Hosted Otomasyon', 'Open source, sınırsız, kendi sunucunda.',
      [], [['n8n Cloud vs Self-Hosted', 'Cloud: 20 USD/ay. Self-hosted: 1 VPS (5 USD/ay), sınırsız.'], ['Docker Kurulum', '`docker run -it --rm -p 5678:5678 n8nio/n8n` → localhost:5678'], ['VPS\'e Kurulum', 'Hetzner/DigitalOcean/Oracle Free Tier — Docker Compose ile kalıcı kurulum.'], ['AI Nodes', 'OpenAI, Gemini, Anthropic, ElevenLabs node\'ları hazır.']],
      ['n8n\'i Docker ile kur, ilk akışı kur'],
    ],
    ['hafta09_telegram_bot_otomasyon.ipynb', 'Günlük Brifing Telegram Botu', 'Hava durumu + takvim + haber → Türkçe özet → senin Telegram\'ına.',
      [], [['BotFather ile Bot Aç', '@BotFather → /newbot → token al.'], ['n8n\'de Schedule Trigger', 'Her sabah 09:00 → akış başlasın.'], ['Veri Topla', 'OpenWeather (hava) + Google Calendar (takvim) + RSS (haber).'], ['Gemini ile Özet', '"Bu 3 verikaynağını sıcak, samimi bir Türkçe brifing haline getir."'], ['Telegram\'a Gönder', 'Telegram node → Send Message → senin chat ID\'in.']],
      ['Kendi günlük brifing botunu kur (Hava + Takvim + Mail + Haber)'],
    ],
    ['hafta09_notion_database_ai.ipynb', 'Notion AI + Database Otomasyonu', 'Kişisel CRM/proje paneli — AI destekli.',
      [], [['Database', 'Notion\'da database aç (kişiler, projeler, görevler).'], ['AI Auto-fill', '"Bu kişinin LinkedIn URL\'inden özgeçmişini doldur" — sütunda AI.'], ['Notion AI Q&A', '"Bu projeyle ilgili son hafta neler oldu?" — AI cevap verir.']],
      ['Kişisel CRM/proje paneli kur, AI sütunlarıyla otomatize et'],
    ],
  ]),

  stubWeek(10, '10', 'Eğitimciler İçin Üretken YZ', [
    ['hafta10_meb_rehberi_disipliner_tarama.ipynb', 'MEB Rehberi — 45+ Aracın Disipliner Haritası', 'docs/MEB Yapay Zeka Araçları Öğretmen El Kitabı temelli.',
      [], [['Disiplinler', 'Türkçe, Matematik, Fen, Sosyal, İngilizce — her biri için 5-10 araç.'], ['Araç Kartı Şablonu', 'İsim, kullanım amacı, ücretsiz/ücretli, KVKK uyumu, sınıf seviyesi, örnek uygulama.'], ['Branş Spesifik Rehber', 'Kendi branşına özel 10 araç seç, sırayla dene, kıyasla.']],
      ['Branşına özel 10 araç testi + sınıfta deneme + rapor'],
    ],
    ['hafta10_dersplani_5e_uretici.ipynb', '5E Modeli ile Ders Planı Üretimi', 'Engage → Explore → Explain → Elaborate → Evaluate.',
      [], [['5E Modeli', '5 aşamalı ders modeli — bilim eğitiminin altın standardı.'], ['Gemini Gem ile Şablon', 'Bir Gem yarat: "Sen 5E modeline göre ders planı uzmanısın. MEB müfredatına uygun, 40 dakika için planlar üretirsin."'], ['Çıktı Format', 'Markdown tablosu: aşama, süre, öğretmen davranışı, öğrenci davranışı, materyal.']],
      ['1 ünitelik (4 ders) plan üret, sınıfta dene'],
    ],
    ['hafta10_soru_bankasi_yapilandirilmis.ipynb', 'JSON Çıktılı Soru Bankası', 'Otomatik soru üretimi + format kontrolü.',
      [], [['JSON Şema', '`{"konu": "...", "zorluk": "kolay|orta|zor", "tipi": "çoktan_seçmeli|açık_uçlu|doğru_yanlış", "soru": "...", "secenekler": [...], "dogru_cevap": "...", "aciklama": "..."}`'], ['Toplu Üretim', 'Bir ünite için 50 soru üret, JSON dosyasına yaz, Quiz aracına aktar.'], ['Doğruluk Kontrolü', 'Her soruyu önce kendi gözünle, sonra ChatGPT/Gemini\'ye "Bu soru tutarlı mı?" diye sor.']],
      ['1 ünite için 30 soruluk banka üret, sınıfta dene'],
    ],
    ['hafta10_rubrik_otomasyon.ipynb', 'Otomatik Rubrik Üretimi', 'Ödev değerlendirme rubrikleri — saatlik iş, dakikalara iner.',
      [], [['Rubrik Bileşenleri', 'Kriter + ağırlık + 4 düzey (mükemmel-iyi-orta-zayıf) + her düzey için tanım.'], ['Prompt Şablonu', '"6. sınıf bilim dersi proje ödevi için 5 kriterli analitik rubrik üret. Her kriter 4 düzey, her düzey 1 cümle açıklama."']],
      ['Kendi mesleğin için 3 rubrik üret, sınıfta uygula'],
    ],
    ['hafta10_kahoot_quizizz_ai.ipynb', 'Kahoot AI + Quizizz AI', 'Etkileşimli sınıf — quiz üretimi otomatik.',
      [], [['Kahoot AI', 'Kahoot\'a "Üretken YZ" yazınca bir konuyla ilgili otomatik quiz çıkarıyor.'], ['Quizizz AI', 'PDF/web URL\'i yükle → otomatik quiz. Türkçe destek var.']],
      ['1 ders için Kahoot + Quizizz quiz üret, sınıfta dene'],
    ],
  ]),

  stubWeek(11, '11', 'Mesleğe Özel Atölyeler', [
    ['hafta11A_akademik_arastirma.ipynb', 'Akademik Parkur — Elicit + Consensus + NotebookLM', 'Mini sistematik review akışı.',
      [], [['Elicit', 'elicit.com — soruyu sor, 100+ makaleden cevap derler. Atıf gösterir.'], ['Consensus', 'consensus.app — kanıta dayalı sorular ("Causes of obesity?") — bilimsel uzlaşı yüzdesi.'], ['ResearchRabbit', 'researchrabbit.ai — 1 makale → görsel atıf grafiği + benzer makaleler.'], ['NotebookLM ile Birleştir', 'Elicit\'ten gelen 20 makaleyi NotebookLM\'e yükle → derin sentez.']],
      ['1 makalelik mini sistematik review (Elicit + Consensus + NotebookLM)'],
    ],
    ['hafta11B_dikey_alanlar.ipynb', 'Sağlık / Hukuk / Finans Dikey Araçlar', 'Branşa özel asistanlar.',
      [], [['Sağlık: OpenEvidence + Doximity GPT', 'Klinik karar destek, hekimlere özel.'], ['Hukuk: Harvey AI + Lexis+ AI', 'Dava analizi, sözleşme inceleme.'], ['Finans: Bloomberg GPT + FinChat', 'Piyasa analizi, finansal tablolar.'], ['Etik & Uyum', 'Her dikey araç KVKK + meslek odası kuralları altında.']],
      ['Mesleğine uygun 1 dikey aracı dene, etik raporu yaz'],
    ],
    ['hafta11C_pazarlama_girisimcilik.ipynb', 'Pazarlama + SEO + İçerik', 'Jasper, Copy.ai, SurferSEO, Frase.',
      [], [['Jasper', 'Pazarlama içeriği özelinde hızlı şablonlar.'], ['SurferSEO', 'Anahtar kelime odaklı blog yazısı + SEO skor.'], ['Frase', 'Soru-cevap odaklı içerik (People Also Ask + AI).'], ['Karşılaştırma', 'ChatGPT genel amaçlı; Jasper/Surfer pazarlamaya optimize.']],
      ['Bir blog yazısı 3 araçla üret, kıyas yap'],
    ],
    ['hafta11_lovable_bolt_replit_atolye.ipynb', 'Lovable / Bolt.new / Replit Agent', 'No-code uygulama — fikir → çalışan ürün, 1 saatte.',
      [], [['Lovable', 'lovable.dev — prompt → tam stack web uygulaması (React + DB).'], ['Bolt.new', 'bolt.new — StackBlitz + AI, anında preview.'], ['Replit Agent', 'replit.com → Agent → otonom kod yazma.'], ['Karşılaştırma', 'Lovable: en güzel UI. Bolt: en hızlı. Replit: en otonom.']],
      ['Fikrini 1 saatte canlı uygulamaya çevir (Lovable veya Bolt ile)'],
    ],
  ]),

  // ═══ HAFTA 12-13-14: KOD AĞIRLIKLI (gerçek API çağrıları) ═══
  {
    week: 12, slug: '12', weekTitle: 'Lokal LLM Kurulumu',
    files: [
      {
        filename: 'hafta12_ollama_kurulum_macwinlinux.ipynb', type: 'code',
        opts: {
          notebookTitle: 'Ollama Kurulum — Mac/Win/Linux',
          notebookDesc: 'Lokal LLM\'e en kolay başlangıç. 5 dakikada kuruluyor, çevrimdışı çalışıyor.',
          objectives: ['Ollama\'yı OS\'ne göre kurmak', 'İlk modeli indirip çalıştırmak', 'Python ile API bağlantısı'],
          install: ['# 1. macOS / Linux (Homebrew)\n# brew install ollama\n# Ya da: curl https://ollama.com/install.sh | sh\n\n# 2. Windows\n# https://ollama.com/download/windows → exe indir, kur\n\n# 3. Python için (sonraki hücrede):\n# pip install ollama'],
          sections: [
            {
              title: 'İlk Model — llama3.2 (3B)',
              intro: 'Terminal\'de:\n```bash\nollama pull llama3.2:3b\nollama run llama3.2:3b\n```\n\nİlk soru: "Merhaba, kendini Türkçe tanıt."',
            },
            {
              title: 'Python Client',
              code: ['import ollama\n', '\n', '# İlk konuşma\n', 'response = ollama.chat(model="llama3.2:3b", messages=[\n', '    {"role": "user", "content": "Türkiye\'nin başkenti neresi? Tek cümleyle cevap ver."}\n', '])\n', '\n', 'print(response["message"]["content"])\n'],
            },
            {
              title: 'Türkçe Test',
              code: ['# Aynı soruyu 3 model için karşılaştır\n', 'modeller = ["llama3.2:3b", "qwen2.5:7b", "gemma2:9b"]\n', 'soru = "Türkçe bir atasözü açıkla: \'Damlaya damlaya göl olur.\'"\n', '\n', 'for m in modeller:\n', '    try:\n', '        r = ollama.chat(model=m, messages=[{"role": "user", "content": soru}])\n', '        print(f"--- {m} ---")\n', '        print(r["message"]["content"][:200])\n', '        print()\n', '    except Exception as e:\n', '        print(f"{m}: {e}")\n'],
              note: 'İlk çalıştırmada model indirilir (1-5 dk). Bir kez indirildikten sonra çevrimdışı.',
            },
            {
              title: 'Streaming (Akış Halinde Yanıt)',
              code: ['# ChatGPT gibi yazarken görmek\n', 'stream = ollama.chat(\n', '    model="llama3.2:3b",\n', '    messages=[{"role": "user", "content": "Üretken YZ\'yi 3 paragrafla anlat."}],\n', '    stream=True\n', ')\n', '\n', 'for chunk in stream:\n', '    print(chunk["message"]["content"], end="", flush=True)\n'],
            },
          ],
          tasks: [
            'Ollama\'yı kur, 3 model indir, aynı 5 Türkçe soruyu sor, en iyiyi seç.',
            'Donanımına en uygun model + kuantizasyon raporu yaz.',
            'Python client ile basit bir CLI sohbet uygulaması yaz (~30 satır).',
          ],
        },
      },
      {
        filename: 'hafta12_ilk_konusma.ipynb', type: 'code',
        opts: {
          notebookTitle: 'Ollama ile İlk Konuşma — Çoklu Turn',
          notebookDesc: 'System message, çoklu turn (memory), parametreler.',
          install: ['# pip install ollama'],
          sections: [
            { title: 'System Message', code: ['from ollama import chat\n', '\n', 'cevap = chat(\n', '    model="llama3.2:3b",\n', '    messages=[\n', '        {"role": "system", "content": "Sen 20 yıllık bir Türk matematik öğretmenisin. Cevapların kısa, Türkçe ve örnekli olur."},\n', '        {"role": "user", "content": "Üslü sayıyı 5. sınıf öğrencisine nasıl anlatırsın?"}\n', '    ]\n', ')\n', 'print(cevap["message"]["content"])\n'] },
            { title: 'Çoklu Turn (Memory)', code: ['# Konuşma geçmişini elle yönet\n', 'history = [\n', '    {"role": "system", "content": "Sen yardımsever bir asistanır. Türkçe konuş."},\n', ']\n', '\n', 'def sor(soru):\n', '    history.append({"role": "user", "content": soru})\n', '    r = chat(model="llama3.2:3b", messages=history)\n', '    cevap = r["message"]["content"]\n', '    history.append({"role": "assistant", "content": cevap})\n', '    return cevap\n', '\n', 'print(sor("Merhaba!"))\n', 'print(sor("Adın ne?"))\n', 'print(sor("Az önce ne sordum?"))\n'] },
            { title: 'Parametreler — temperature, top_p', code: ['# Yaratıcılık vs tutarlılık\n', 'r = chat(\n', '    model="llama3.2:3b",\n', '    messages=[{"role": "user", "content": "Üretken YZ üzerine 4 satırlık bir şiir yaz."}],\n', '    options={"temperature": 1.5, "top_p": 0.95}\n', ')\n', 'print("Yaratıcı:", r["message"]["content"])\n', '\n', 'r = chat(\n', '    model="llama3.2:3b",\n', '    messages=[{"role": "user", "content": "Üretken YZ üzerine 4 satırlık bir şiir yaz."}],\n', '    options={"temperature": 0.2, "top_p": 0.5}\n', ')\n', 'print("Tutarlı:", r["message"]["content"])\n'] },
          ],
          tasks: ['Kendi alanına özel system message ile bir asistan kur', '5 farklı temperature ile aynı görevi dene'],
        },
      },
      {
        filename: 'hafta12_lm_studio_atolye.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'LM Studio Atölyesi (GUI)',
          notebookDesc: 'GUI seven kullanıcılar için — terminal yok, model arama + sohbet.',
          objectives: ['LM Studio kurulum', 'Model arama ve indirme', 'Local server ile API erişimi'],
          sections: [
            { title: 'Kurulum', intro: 'lmstudio.ai → indir → kur (Mac/Win/Linux). 1.5 GB.' },
            { title: 'Model Arama', intro: 'Search\'te "Qwen 2.5 7B Instruct GGUF" yaz. Q4_K_M kuantizasyonunu seç (en dengeli).' },
            { title: 'Sohbet Modu', intro: 'Chat sekmesi → model seç → konuş. Sistem prompt\'u yan panelden.' },
            { title: 'Local Server', intro: 'Local Server → "Start Server" → port 1234. Artık OpenAI API uyumlu endpoint!\n\n```python\nimport openai\nclient = openai.OpenAI(base_url="http://localhost:1234/v1", api_key="not-needed")\nresponse = client.chat.completions.create(...)\n```' },
          ],
          tasks: ['LM Studio ile 3 model dene', 'Local Server\'ı OpenAI client ile kullan'],
        },
      },
      {
        filename: 'hafta12_openwebui_docker.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'Open WebUI — Docker ile ChatGPT Benzeri Arayüz',
          notebookDesc: 'Çoklu kullanıcı, profil, RAG, web search — hepsi açık kaynak.',
          objectives: ['Docker ile kurulum', 'Ollama bağlama', 'Aile/takım için arayüz açma'],
          sections: [
            { title: 'Docker Komutu', intro: '```bash\ndocker run -d -p 3000:8080 \\\n  --add-host=host.docker.internal:host-gateway \\\n  -v open-webui:/app/backend/data \\\n  --name open-webui --restart always \\\n  ghcr.io/open-webui/open-webui:main\n```\n\nlocalhost:3000 → ilk admin kayıt.' },
            { title: 'Ollama Bağlama', intro: 'Settings → Connections → Ollama URL: `http://host.docker.internal:11434`. Modeller otomatik gelir.' },
            { title: 'Çoklu Kullanıcı', intro: 'Aile / takım için profil aç. RBAC (Admin / User) mevcut.' },
            { title: 'Documents (RAG)', intro: 'Workspace → Documents → PDF yükle → soru sor (Hafta 13\'te derinleşeceğiz).' },
            { title: 'VPS\'te Kurulum', intro: 'Hetzner / Oracle Free Tier VPS\'te aynı Docker komutu + nginx reverse proxy → kendi domaininden erişim.' },
          ],
          tasks: ['Open WebUI\'yi yerelde Docker ile kur, aile üyesine erişim ver', 'VPS\'e kur (opsiyonel, ileri)'],
        },
      },
      {
        filename: 'hafta12_model_kiyaslama.ipynb', type: 'code',
        opts: {
          notebookTitle: 'Türkçe Model Kıyaslaması — Llama vs Qwen vs Gemma',
          notebookDesc: 'Aynı 10 Türkçe görevde 3 lokal modelin performansı.',
          install: ['# pip install ollama pandas'],
          sections: [
            { title: 'Test Görevleri', intro: '10 Türkçe görev:\n1. "Türkiye\'nin başkenti?"\n2. "Damlaya damlaya göl olur" deyimini açıkla\n3. 5 yaşındaki çocuğa atomu anlat\n4. "İstanbul\'u dinliyorum" şiirinden bir bölüm\n5. "Ben gidiyorum" cümlesini İngilizceye çevir\n6. KVKK 3 maddeyle özetle\n7. Bir öğretmen için ders planı (1 paragraf)\n8. 3+5×2 sonucu, adım adım\n9. JSON formatında bir kitap meta verisi üret\n10. Karikatür önerisi: "öğretmen ve YZ"' },
            { title: 'Otomatik Kıyaslama', code: ['import ollama\n', 'import pandas as pd\n', 'from datetime import datetime\n', '\n', 'gorevler = [\n', '    "Türkiye\'nin başkenti hangi şehirdir?",\n', '    "Damlaya damlaya göl olur deyimini açıkla.",\n', '    "5 yaşındaki bir çocuğa atomu Türkçe anlat.",\n', '    "Bir öğretmen için 5E modelinde 1 paragraf ders planı yaz.",\n', '    "Karikatür önerisi: öğretmen ve üretken YZ.",\n', ']\n', '\n', 'modeller = ["llama3.2:3b", "qwen2.5:7b", "gemma2:9b"]\n', 'sonuclar = []\n', '\n', 'for g in gorevler:\n', '    for m in modeller:\n', '        baslangic = datetime.now()\n', '        try:\n', '            r = ollama.chat(model=m, messages=[{"role": "user", "content": g}])\n', '            cevap = r["message"]["content"][:300]\n', '            sure = (datetime.now() - baslangic).total_seconds()\n', '            sonuclar.append({"gorev": g[:50], "model": m, "cevap": cevap, "saniye": round(sure, 1)})\n', '        except Exception as e:\n', '            sonuclar.append({"gorev": g[:50], "model": m, "cevap": f"HATA: {e}", "saniye": -1})\n', '\n', 'df = pd.DataFrame(sonuclar)\n', 'df.to_csv("kiyas_sonuclari.csv", index=False)\n', 'df\n'] },
            { title: 'Manuel Puanlama', intro: 'Her cevabı 1-5 arası puanla:\n- Doğruluk\n- Türkçe doğallığı\n- Hız (kullanıcı için "yeterli mi?")\n\nSonuçları öğrenme defterine kaydet.' },
          ],
          tasks: ['10 görevi 3 modelde çalıştır, manuel puanla, en iyi modelini seç', 'Donanımına göre kuantizasyon kararını yaz (Q4 vs Q8)'],
        },
      },
    ],
  },
  {
    week: 13, slug: '13', weekTitle: 'Lokal RAG ve Kendi Verinle Konuşma',
    files: [
      {
        filename: 'hafta13_anythingllm_kurulum.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'AnythingLLM — Kendi NotebookLM\'in',
          notebookDesc: 'Tamamen lokal RAG. Sınırsız PDF, hibrit LLM (Ollama veya bulut), workspace mantığı.',
          objectives: ['AnythingLLM\'i kurmak', 'İlk workspace oluşturmak', 'PDF\'lerle soru-cevap'],
          sections: [
            { title: 'Kurulum', intro: 'useanything.com → Mac/Win/Linux installer → kur (Ollama varsa otomatik bağlar).' },
            { title: 'İlk Workspace', intro: '"+ New Workspace" → adı ver (örn "Mesleki Bilgi Tabanım").\n\nLLM seç:\n- Ollama (lokal, ücretsiz, gizlilik max)\n- OpenAI/Gemini/Claude (bulut, daha kaliteli ama API key gerekir)' },
            { title: 'Doküman Yükleme', intro: 'Workspace → Documents → upload PDF/DOCX/TXT/MD/web URL.\n\nAnythingLLM otomatik:\n- Chunking (512 token, 64 overlap)\n- Embedding (nomic-embed-text varsayılan)\n- Vector DB (LanceDB lokal)' },
            { title: 'Soru-Cevap', intro: 'Chat sekmesinde sor. AnythingLLM:\n1. Sorunu embed eder\n2. Vector DB\'den en benzer 4 chunk\'ı çeker\n3. LLM\'e bağlam + soru gönderir\n4. Cevap + kaynak gösterir' },
            { title: 'NotebookLM\'e Karşı', intro: '+ AnythingLLM: tamamen lokal, sınırsız, çoklu workspace.\n+ NotebookLM: Audio Overview, Mind Map, daha güzel UI.\n\nKaranlık dengesi: kişisel/iş için AnythingLLM, paylaşılan içerik üretimi için NotebookLM.' },
          ],
          tasks: ['20 PDF\'lik kişisel bilgi tabanı kur, NotebookLM ile aynı sorular sor, kıyasla'],
        },
      },
      {
        filename: 'hafta13_cherry_studio_turkce.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'Cherry Studio — Türkçe Destekli RAG',
          notebookDesc: 'Çoklu API + Ollama + Türkçe dostu arayüz.',
          sections: [
            { title: 'Kurulum', intro: 'cherry-ai.com → indir.' },
            { title: 'Çoklu Provider', intro: 'OpenAI + Gemini + Claude + Ollama hepsi tek panelde. API key yoksa lokal Ollama yeterli.' },
            { title: 'Knowledge Base', intro: 'Ayarlar → Knowledge Base → Yeni → PDF yükle → workspace oluştur.' },
            { title: 'Türkçe Avantaj', intro: 'Çince yapımı ama Türkçe arayüz çevirisi mevcut. Türkçe modellerle (Trendyol-LLM, KocLM) kolay entegrasyon.' },
          ],
          tasks: ['Cherry Studio + Ollama tam offline iş akışı kur'],
        },
      },
      {
        filename: 'hafta13_page_assist_browser.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'Page Assist — Browser Uzantısı RAG',
          notebookDesc: 'Açık olan web sayfasıyla anında konuş.',
          sections: [
            { title: 'Kurulum', intro: 'Chrome Web Store → "Page Assist" ara → Add to Chrome.' },
            { title: 'Ollama Bağla', intro: 'Settings → Ollama URL: `http://localhost:11434`.' },
            { title: 'Kullanım', intro: 'Bir web sayfası aç → Page Assist ikonuna tıkla → "Bu sayfanın özetini ver" sor. Sayfa içeriği otomatik kontekste girer.' },
            { title: 'Web Search Mode', intro: 'Chat sırasında "/" tuşu → search → DuckDuckGo + Ollama ile araştırma yap.' },
          ],
          tasks: ['Page Assist ile günlük araştırma rutinini hızlandır'],
        },
      },
      {
        filename: 'hafta13_kendi_kitabini_konustur_lokal.ipynb', type: 'code',
        opts: {
          notebookTitle: 'Tamamen Lokal RAG — 50 Satırda',
          notebookDesc: 'Hiçbir bulut API kullanmadan. Ollama + ChromaDB + Python.',
          install: ['# pip install ollama chromadb pypdf'],
          sections: [
            { title: 'PDF\'leri Oku', code: ['from pypdf import PdfReader\n', 'import os\n', '\n', 'def pdf_text(yol):\n', '    pdf = PdfReader(yol)\n', '    return "\\n".join(p.extract_text() for p in pdf.pages if p.extract_text())\n', '\n', 'pdf_klasoru = "./belgelerim"  # PDF\'lerini buraya koy\n', 'metinler = {}\n', 'for f in os.listdir(pdf_klasoru):\n', '    if f.endswith(".pdf"):\n', '        metinler[f] = pdf_text(os.path.join(pdf_klasoru, f))\n', 'print(f"{len(metinler)} PDF okundu")\n'] },
            { title: 'Chunk\'la', code: ['def chunkla(metin, boyut=500, overlap=50):\n', '    chunks = []\n', '    for i in range(0, len(metin), boyut - overlap):\n', '        chunks.append(metin[i:i + boyut])\n', '    return chunks\n', '\n', 'tum_chunks = []\n', 'for dosya, metin in metinler.items():\n', '    for i, c in enumerate(chunkla(metin)):\n', '        tum_chunks.append({"id": f"{dosya}_{i}", "text": c, "kaynak": dosya})\n', 'print(f"{len(tum_chunks)} chunk üretildi")\n'] },
            { title: 'ChromaDB\'ye Yaz (lokal embedding)', code: ['import chromadb\n', 'from chromadb.utils.embedding_functions import OllamaEmbeddingFunction\n', '\n', 'embed_fn = OllamaEmbeddingFunction(\n', '    url="http://localhost:11434/api/embeddings",\n', '    model_name="nomic-embed-text",\n', ')\n', 'client = chromadb.PersistentClient(path="./chroma_db")\n', 'col = client.get_or_create_collection("benim_kitap", embedding_function=embed_fn)\n', '\n', 'col.add(\n', '    documents=[c["text"] for c in tum_chunks],\n', '    metadatas=[{"kaynak": c["kaynak"]} for c in tum_chunks],\n', '    ids=[c["id"] for c in tum_chunks],\n', ')\n', 'print("İndekslendi")\n'] },
            { title: 'Sor', code: ['import ollama\n', '\n', 'def sor(soru, k=4):\n', '    sonuc = col.query(query_texts=[soru], n_results=k)\n', '    baglam = "\\n\\n".join(sonuc["documents"][0])\n', '    kaynaklar = list(set(m["kaynak"] for m in sonuc["metadatas"][0]))\n', '\n', '    cevap = ollama.chat(\n', '        model="llama3.2:3b",\n', '        messages=[\n', '            {"role": "system", "content": "Türkçe cevap ver. Sadece verilen bağlamdan yararlan, kaynak göster."},\n', '            {"role": "user", "content": f"Bağlam:\\n{baglam}\\n\\nSoru: {soru}\\n\\nCevap:"}\n', '        ]\n', '    )\n', '    return cevap["message"]["content"], kaynaklar\n', '\n', 'cevap, kaynaklar = sor("Bu kitapların ana teması nedir?")\n', 'print(cevap)\n', 'print("\\nKaynaklar:", kaynaklar)\n'] },
          ],
          tasks: ['Bu kodu kendi PDF\'lerinle çalıştır', '3 farklı chunk_size (300/500/1000) dene, en iyiyi seç'],
        },
      },
      {
        filename: 'hafta13_embedding_kiyas_tr.ipynb', type: 'code',
        opts: {
          notebookTitle: 'Türkçe Embedding Kıyaslaması',
          notebookDesc: 'Hangi embedding modeli Türkçede en iyi?',
          install: ['# pip install ollama sentence-transformers numpy'],
          sections: [
            { title: 'Test Cümleleri', code: ['# Anlamca yakın 3 çift\n', 'ciftler = [\n', '    ("İstanbul Türkiye\'nin en kalabalık şehridir.", "Türkiye\'de en çok insan İstanbul\'da yaşar."),\n', '    ("Yapay zeka eğitimi yaygınlaşıyor.", "AI öğrenme programları popüler oluyor."),\n', '    ("Bugün hava çok güzel.", "Hava yağışlı ve soğuk."),  # ← bu çift uzak olmalı\n', ']\n'] },
            { title: 'Ollama Embedding (lokal)', code: ['import ollama\n', 'import numpy as np\n', '\n', 'def cosine(a, b):\n', '    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\n', '\n', 'def embed_ollama(metin, model="nomic-embed-text"):\n', '    r = ollama.embeddings(model=model, prompt=metin)\n', '    return np.array(r["embedding"])\n', '\n', 'for c1, c2 in ciftler:\n', '    e1, e2 = embed_ollama(c1), embed_ollama(c2)\n', '    print(f"{cosine(e1, e2):.3f} | {c1[:40]}... ↔ {c2[:40]}...")\n'] },
            { title: 'Multilingual-e5 Karşılaştırma', code: ['from sentence_transformers import SentenceTransformer\n', '\n', 'model = SentenceTransformer("intfloat/multilingual-e5-large")\n', '\n', 'def embed_e5(metin):\n', '    return model.encode("query: " + metin)\n', '\n', 'print("\\n--- multilingual-e5 ---")\n', 'for c1, c2 in ciftler:\n', '    e1, e2 = embed_e5(c1), embed_e5(c2)\n', '    print(f"{cosine(e1, e2):.3f} | {c1[:40]}... ↔ {c2[:40]}...")\n'] },
            { title: 'Sonuç Yorumu', intro: 'İlk 2 çift için kosinüs >0.85 olmalı (yakın anlam). 3. çift için <0.5 olmalı (uzak anlam). Hangi model daha "ayırt edici" → o seçilir.' },
          ],
          tasks: ['10 cümle çifti hazırla, 3 farklı embedding modeliyle test et'],
        },
      },
    ],
  },
  {
    week: 14, slug: '14', weekTitle: 'API ile Üretken YZ + Capstone',
    files: [
      {
        filename: 'hafta14_aistudio_ilk_api.ipynb', type: 'code',
        opts: {
          notebookTitle: 'Google AI Studio + Gemini 2.5 Flash — İlk API',
          notebookDesc: 'Ücretsiz katman, haftalık kota, Türkiye direkt erişim.',
          objectives: ['API key almak ve güvenli saklamak', 'İlk API çağrısı yapmak', 'Streaming, system message, JSON çıktı'],
          install: ['# pip install google-generativeai'],
          sections: [
            { title: 'API Key Al', intro: 'aistudio.google.com → Get API Key → "Create API Key" → kopyala.\n\n**ASLA kodun içine yazma!** `.env` dosyasına ya da Colab Secrets\'a koy.' },
            { title: 'Güvenli Saklama (.env)', code: ['# .env dosyası (kodla aynı klasörde):\n', '# GEMINI_API_KEY=AIzaSy...\n', '\n', '# Notebook\'a yükle:\n', 'from dotenv import load_dotenv\n', 'import os\n', 'load_dotenv()\n', '\n', 'API_KEY = os.environ["GEMINI_API_KEY"]\n', 'print("Key okundu, uzunluk:", len(API_KEY))\n'] },
            { title: 'İlk Çağrı', code: ['import google.generativeai as genai\n', '\n', 'genai.configure(api_key=API_KEY)\n', 'model = genai.GenerativeModel("gemini-2.5-flash")\n', '\n', 'cevap = model.generate_content("Türkiye\'nin başkenti?")\n', 'print(cevap.text)\n'] },
            { title: 'Streaming', code: ['stream = model.generate_content(\n', '    "Üretken YZ\'yi 3 paragrafla anlat.",\n', '    stream=True,\n', ')\n', 'for chunk in stream:\n', '    print(chunk.text, end="", flush=True)\n'] },
            { title: 'System Message', code: ['model = genai.GenerativeModel(\n', '    "gemini-2.5-flash",\n', '    system_instruction="Sen 20 yıllık bir Türk matematik öğretmenisin. Türkçe konuşursun.",\n', ')\n', '\n', 'r = model.generate_content("Üslü sayıyı 5. sınıfa nasıl anlatırsın?")\n', 'print(r.text)\n'] },
            { title: 'Yapılandırılmış Çıktı (JSON)', code: ['import json\n', '\n', 'response = model.generate_content(\n', '    \'Bu yorumdan duygu, ürün, şikayet kategorisi çıkar. JSON: {"duygu": "POZ|NEG|NÖT", "urun": "...", "kategori": "kargo|kalite|fiyat|diğer"}\\n\\nYorum: "Ürün güzel ama kargo geç geldi."\',\n', '    generation_config={"response_mime_type": "application/json"}\n', ')\n', 'data = json.loads(response.text)\n', 'print(data)\n'] },
          ],
          tasks: ['API key al, ilk 5 farklı görev için API çağır', 'JSON çıktıyı bir n8n akışına bağla (Hafta 9 ile köprü)'],
        },
      },
      {
        filename: 'hafta14_openrouter_uc_model.ipynb', type: 'code',
        opts: {
          notebookTitle: 'OpenRouter — Tek API ile 100+ Model',
          notebookDesc: 'Gemini, Claude, GPT, DeepSeek — hepsi tek API üzerinden.',
          install: ['# pip install openai\n# OpenAI SDK uyumlu olduğu için aynı paket'],
          sections: [
            { title: 'API Key', intro: 'openrouter.ai → Sign Up → API Keys → Create Key.\n\nÜcretsiz katmanda DeepSeek, Llama, Qwen vs. kullanılır.' },
            { title: '3 Model Karşılaştırma', code: ['import openai\n', 'import os\n', '\n', 'client = openai.OpenAI(\n', '    base_url="https://openrouter.ai/api/v1",\n', '    api_key=os.environ["OPENROUTER_API_KEY"],\n', ')\n', '\n', 'modeller = [\n', '    "google/gemini-2.5-flash",\n', '    "anthropic/claude-sonnet-4.6",\n', '    "openai/gpt-5",\n', '    "deepseek/deepseek-r1",\n', ']\n', 'soru = "İstanbul\'da bir öğretmenin Üretken YZ ile ders planı hazırlamasını 5 maddede özetle."\n', '\n', 'for m in modeller:\n', '    try:\n', '        r = client.chat.completions.create(\n', '            model=m,\n', '            messages=[{"role": "user", "content": soru}],\n', '            max_tokens=300,\n', '        )\n', '        print(f"--- {m} ---")\n', '        print(r.choices[0].message.content[:300])\n', '        print()\n', '    except Exception as e:\n', '        print(f"{m}: {e}")\n'] },
          ],
          tasks: ['3 modeli aynı 10 görevde kıyasla, en iyi/uygun olanı raporla'],
        },
      },
      {
        filename: 'hafta14_streamlit_kisisel_asistan.ipynb', type: 'code',
        opts: {
          notebookTitle: 'Streamlit ile 50 Satırda Kişisel Asistan',
          notebookDesc: 'Tek dosya Python uygulaması, 30 dakikada deploy.',
          install: ['# pip install streamlit google-generativeai python-dotenv'],
          sections: [
            { title: 'app.py — Tüm Kod', code: ['# Bu kodu app.py adıyla kaydet\n', 'import streamlit as st\n', 'import google.generativeai as genai\n', 'import os\n', '\n', 'st.set_page_config(page_title="Kişisel YZ Asistanım", page_icon="✨")\n', 'st.title("✨ Kişisel YZ Asistanım")\n', 'st.caption("Üretken YZ Atölyesi · Capstone şablonu")\n', '\n', '# API key (Streamlit Secrets ya da env)\n', 'genai.configure(api_key=st.secrets.get("GEMINI_API_KEY", os.environ.get("GEMINI_API_KEY")))\n', '\n', '# Sidebar — kişiselleştirme\n', 'with st.sidebar:\n', '    st.header("Ayarlar")\n', '    rol = st.text_area("Rol", "Sen yardımsever bir Türk eğitim danışmanısın.")\n', '    sicaklik = st.slider("Yaratıcılık", 0.0, 1.5, 0.7)\n', '\n', 'model = genai.GenerativeModel("gemini-2.5-flash", system_instruction=rol)\n', '\n', '# Chat geçmişi\n', 'if "messages" not in st.session_state:\n', '    st.session_state.messages = []\n', '\n', 'for msg in st.session_state.messages:\n', '    with st.chat_message(msg["role"]):\n', '        st.write(msg["content"])\n', '\n', 'if prompt := st.chat_input("Sorunu yaz..."):\n', '    st.session_state.messages.append({"role": "user", "content": prompt})\n', '    with st.chat_message("user"):\n', '        st.write(prompt)\n', '\n', '    with st.chat_message("assistant"):\n', '        with st.spinner("Düşünüyor..."):\n', '            r = model.generate_content(\n', '                prompt,\n', '                generation_config={"temperature": sicaklik},\n', '            )\n', '            st.write(r.text)\n', '            st.session_state.messages.append({"role": "assistant", "content": r.text})\n'] },
            { title: 'Yerel Çalıştırma', code: ['# Terminal\'de:\n', '# streamlit run app.py\n', '# → http://localhost:8501\n'] },
            { title: 'Hugging Face Spaces\'a Deploy', intro: '1. huggingface.co/new-space → Streamlit\n2. app.py + requirements.txt yükle\n3. Settings → Repository secrets → GEMINI_API_KEY\n4. Build başlar, ~2 dakikada canlı.' },
          ],
          tasks: ['Bu kodu kişiselleştir, kendi alanına özelleştir', 'HF Spaces\'a deploy et, link paylaş'],
        },
      },
      {
        filename: 'hafta14_hf_spaces_deploy.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'Hugging Face Spaces — Sıfır Maliyet Deploy',
          notebookDesc: 'Adım adım canlı yayın.',
          sections: [
            { title: '1. Space Aç', intro: 'huggingface.co → New Space → Streamlit/Gradio seç → MIT lisansı.' },
            { title: '2. Dosyaları Yükle', intro: 'Web arayüzünden (drag-drop) ya da git ile:\n```bash\ngit clone https://huggingface.co/spaces/USER/SPACENAME\ncp app.py SPACENAME/\ncp requirements.txt SPACENAME/\ncd SPACENAME && git add . && git commit -m "ilk" && git push\n```' },
            { title: '3. Secrets', intro: 'Space → Settings → Repository secrets → API_KEY ekle. Kod\'da `os.environ["GEMINI_API_KEY"]` ile oku.' },
            { title: '4. Auto-Build', intro: 'Push edildi → otomatik build → 1-3 dakika → canlı URL.' },
            { title: '5. Custom Domain (opsiyonel)', intro: 'Pro plan ile özel domain. Free\'de huggingface.co/spaces/USER/SPACE URL\'i.' },
          ],
          tasks: ['Streamlit asistanını HF Spaces\'a deploy et'],
        },
      },
      {
        filename: 'hafta14_v0_vercel_nocode.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'v0.dev + Vercel — No-Code Arayüz + AI',
          notebookDesc: 'Promptdan ürüne, kod yazmadan.',
          sections: [
            { title: 'v0.dev', intro: 'v0.dev → "Bir kişisel YZ asistanı, sohbet arayüzü" yaz → Next.js + Tailwind + shadcn UI hazır.' },
            { title: 'AI Bağla', intro: 'v0\'da Gemini/OpenAI/Anthropic SDK seç → API key gir → backend route otomatik.' },
            { title: 'Vercel\'e Deploy', intro: 'v0 → "Deploy to Vercel" tek tık → Vercel hesabı bağla → canlı URL.' },
            { title: 'Custom Domain', intro: 'Vercel → Settings → Domains → kendi domain\'ini bağla.' },
          ],
          tasks: ['v0.dev ile bir YZ uygulaması üret, Vercel\'e deploy et'],
        },
      },
      {
        filename: 'hafta14_capstone_sablon.ipynb', type: 'guide',
        opts: {
          notebookTitle: 'Capstone Proje Şablonu',
          notebookDesc: '14 haftanın sentezi olan bir ürün üret.',
          objectives: ['Capstone proje seçimi', 'Mimari tasarımı', 'Sunum + sertifika'],
          sections: [
            { title: 'Adım 1 — Sorun Seç', intro: 'Kendi mesleğinde yıllardır seni yoran 1 sorun seç. Örnekler:\n- "Veliye haftalık öğrenci raporu yazmak"\n- "Hasta dosyalarında hızlı arama"\n- "Aylık vergi tablolarını analiz etmek"\n- "Kitap yazarken karakter takibi"' },
            { title: 'Adım 2 — Sentez Bileşenleri', intro: 'Aşağıdakilerden en az 3\'ünü dahil et:\n\n- ✅ Sohbet arayüzü (Hafta 3, 14)\n- ✅ Görsel/ses/video üretimi (Hafta 5-7)\n- ✅ NotebookLM ya da AnythingLLM ile bilgi tabanı (Hafta 4, 13)\n- ✅ Otomasyon akışı (Hafta 9 — Zapier/n8n/Make)\n- ✅ Lokal LLM (Hafta 12 — Ollama)\n- ✅ API tabanlı asistan (Hafta 14 — Gemini)' },
            { title: 'Adım 3 — Mimari Diyagram', intro: 'Mermaid ya da Excalidraw ile bir görsel diyagram çiz:\n\n```mermaid\ngraph LR\n    A[Kullanıcı] --> B[Streamlit UI]\n    B --> C[Gemini 2.5]\n    B --> D[AnythingLLM RAG]\n    D --> E[PDF Klasörüm]\n    C --> F[Telegram Bot]\n```' },
            { title: 'Adım 4 — Geliştir', intro: 'Hafta 14\'teki Streamlit şablonunu temel al, kendi mantığını ekle.' },
            { title: 'Adım 5 — Deploy', intro: 'HF Spaces / Vercel / Open WebUI — biri yeter.' },
            { title: 'Adım 6 — README + Demo Video', intro: '- README: ne yapar, kim için, nasıl kullanılır\n- Demo video: Hafta 7\'de öğrendiğin pipeline ile (senaryo → görsel → ses → video)\n- Mimari diyagram: yukarıdaki mermaid' },
            { title: 'Adım 7 — Sunum Günü', intro: 'Atölyenin son haftasının 6. saatinde:\n- 5 dakika ürün demosu\n- 2 dakika soru-cevap\n- Sertifika töreni 🎓' },
          ],
          tasks: ['Capstone projeni seç, mimari diyagramını çiz, başla — atölye sonu sunum günü için tamamla'],
        },
      },
    ],
  },
);

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
function main() {
  const outputBase = path.join(__dirname, 'notebooks');
  if (!fs.existsSync(outputBase)) fs.mkdirSync(outputBase, { recursive: true });

  let total = 0;
  console.log('\n📓 Üretken YZ Atölyesi · 14 hafta için ipynb üretiliyor →', outputBase, '\n');

  for (const week of NOTEBOOKS) {
    const weekDir = path.join(outputBase, `hafta${week.slug}`);
    if (!fs.existsSync(weekDir)) fs.mkdirSync(weekDir, { recursive: true });

    for (const nb of week.files) {
      const nbObj = nb.type === 'code'
        ? codeExampleNotebook({ ...nb.opts, weekId: week.week, weekTitle: week.weekTitle })
        : toolGuideNotebook({ ...nb.opts, weekId: week.week, weekTitle: week.weekTitle });
      const filepath = path.join(weekDir, nb.filename);
      fs.writeFileSync(filepath, JSON.stringify(nbObj, null, 1), 'utf-8');
      const size = (fs.statSync(filepath).size / 1024).toFixed(1);
      console.log(`  ✓ Hafta ${String(week.week).padStart(2)} · ${nb.filename} (${size} KB)`);
      total++;
    }
  }

  console.log(`\n✅ ${total} notebook üretildi (${NOTEBOOKS.length} hafta).\n`);
}

main();
