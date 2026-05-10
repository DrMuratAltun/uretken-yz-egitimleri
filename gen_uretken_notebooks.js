/**
 * Üretken YZ Atölyesi — Toplu Notebook Üretici (v2 · Aurora · Zenginleştirilmiş)
 * ============================================================================
 * Her notebook'ta:
 *  - Aurora gradient HTML header (logo, başlık, hafta, süre, zorluk rozetleri)
 *  - Detaylı bölümler (5-8) + adım adım rehber + ekran görüntüsü placeholder
 *  - TR + EN prompt çiftleri (yan yana karşılaştırma için)
 *  - docs/ kaynaklarına atıflar (MEB rehberi, NotebookLM PDF, Nano Banana, Görsel rehber, Prompt yazma vb)
 *  - Türkiye'den gerçek vakalar
 *  - Sen Yap atölye görevleri
 *  - HTML footer (sonraki notebook + atölye sitesi + WhatsApp + telif)
 *
 * Çalıştır: node gen_uretken_notebooks.js
 * Çıktı: notebooks/haftaXX/<nb>.ipynb (lokal — eğitmen Drive'a yükleyecek)
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════
// HELPERS — Aurora HTML Header / Footer / Sections
// ═══════════════════════════════════════════════════════════
const SITE_URL = 'https://drmurataltun.github.io/uretken-yz-egitimleri/';
const WHATSAPP = '+90 539 257 82 06';

function auroraHeader({ title, weekId, weekTitle, duration, difficulty, sectionLabel, color }) {
  const labelBg = color || '#10B981';
  return `<div style="background: linear-gradient(135deg, #10B981 0%, #8B5CF6 50%, #3730A3 100%); padding: 28px 32px; border-radius: 14px; color: white; font-family: Georgia, 'Times New Roman', serif; box-shadow: 0 8px 24px rgba(15,23,42,0.15); margin-bottom: 16px;">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
    <div style="flex: 1;">
      <div style="font-size: 12px; opacity: 0.92; letter-spacing: 3px; font-family: 'Inter', sans-serif; font-weight: 600; margin-bottom: 8px;">✨ ÜRETKEN YZ ATÖLYESİ · ${sectionLabel || 'PROMPTTAN ÜRÜNE'}</div>
      <h1 style="margin: 4px 0 6px; font-size: 32px; font-weight: 700; line-height: 1.1;">${title}</h1>
      <div style="font-size: 14px; opacity: 0.9; font-family: 'Inter', sans-serif;"><strong>Hafta ${weekId} · ${weekTitle}</strong> · Dr. Murat Altun · 2026</div>
    </div>
    <div style="text-align: right; display: flex; flex-direction: column; gap: 6px;">
      ${duration ? `<span style="background: rgba(255,255,255,0.22); backdrop-filter: blur(8px); padding: 6px 14px; border-radius: 20px; font-size: 12px; font-family: 'Inter', sans-serif; font-weight: 600; border: 1px solid rgba(255,255,255,0.3);">⏱ ${duration}</span>` : ''}
      ${difficulty ? `<span style="background: rgba(255,255,255,0.22); backdrop-filter: blur(8px); padding: 6px 14px; border-radius: 20px; font-size: 12px; font-family: 'Inter', sans-serif; font-weight: 600; border: 1px solid rgba(255,255,255,0.3);">${difficulty}</span>` : ''}
    </div>
  </div>
</div>`;
}

function auroraFooter({ nextNotebook, weekId }) {
  return `---

<div style="margin-top: 36px; background: linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%); color: #E2E8F0; padding: 28px 32px; border-radius: 14px; font-family: 'Inter', sans-serif; box-shadow: 0 8px 24px rgba(15,23,42,0.2);">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;">
    <div>
      <div style="color: #10B981; font-weight: 700; margin-bottom: 10px; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">📚 Sıradaki Adım</div>
      <div style="font-size: 14px; line-height: 1.5; color: #CBD5E1;">${nextNotebook || 'Bir sonraki notebook ile atölye akışına devam et.'}</div>
    </div>
    <div>
      <div style="color: #8B5CF6; font-weight: 700; margin-bottom: 10px; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">🌐 Bağlantılar</div>
      <div style="font-size: 13px; line-height: 1.7; color: #CBD5E1;">
        🌍 <a href="${SITE_URL}" style="color: #C4B5FD; text-decoration: none;">Atölye sitesi</a><br>
        📂 <a href="${SITE_URL}hafta/${String(weekId).padStart(2,'0')}/" style="color: #C4B5FD; text-decoration: none;">Hafta ${weekId} sayfası</a><br>
        📱 WhatsApp: ${WHATSAPP}<br>
        💼 Dr. Murat Altun · YZ Eğitmeni
      </div>
    </div>
    <div>
      <div style="color: #6EE7B7; font-weight: 700; margin-bottom: 10px; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">📖 Diğer Projeler</div>
      <div style="font-size: 12px; line-height: 1.7; color: #94A3B8;">
        🎓 yapayzekaokulum.com<br>
        🧒 gencyz.com<br>
        🛠️ yz-araclari.com<br>
        📚 akademikyz.com
      </div>
    </div>
  </div>
  <div style="border-top: 1px solid #334155; margin-top: 20px; padding-top: 14px; text-align: center; font-size: 11px; color: #64748B;">
    © 2026 <strong>Üretken YZ Atölyesi · Prompttan Ürüne</strong> · 14 Hafta · 84 Saat · MEB YZ Politikası uyumlu · KVKK farkındalıklı
  </div>
</div>`;
}

function sectionBanner(num, title, subtitle, color) {
  const c = color || '#10B981';
  return `<div style="background: ${c}10; border-left: 5px solid ${c}; padding: 16px 20px; border-radius: 8px; margin: 24px 0 12px;">
  <div style="display: flex; align-items: center; gap: 14px;">
    <div style="background: ${c}; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: Georgia, serif; flex-shrink: 0;">${num}</div>
    <div>
      <div style="font-size: 18px; font-weight: 700; color: #0F172A; font-family: Georgia, serif;">${title}</div>
      ${subtitle ? `<div style="font-size: 13px; color: #475569; margin-top: 2px;">${subtitle}</div>` : ''}
    </div>
  </div>
</div>`;
}

function promptPair(tr, en, label) {
  return `<table style="width: 100%; border-collapse: separate; border-spacing: 8px; margin: 12px 0;">
<tr>
<td style="background: #EEF2FF; border: 1px solid #C7D2FE; border-left: 4px solid #6366F1; padding: 14px; border-radius: 8px; vertical-align: top; width: 50%; font-family: 'Inter', sans-serif;">
<div style="font-size: 11px; font-weight: 700; color: #4F46E5; letter-spacing: 1.5px; margin-bottom: 6px;">🇹🇷 TÜRKÇE${label ? ' · ' + label : ''}</div>
<pre style="white-space: pre-wrap; word-wrap: break-word; font-size: 12px; line-height: 1.5; margin: 0; color: #0F172A; font-family: 'SF Mono', Consolas, monospace;">${tr}</pre>
</td>
<td style="background: #D1FAE5; border: 1px solid #86EFAC; border-left: 4px solid #10B981; padding: 14px; border-radius: 8px; vertical-align: top; width: 50%; font-family: 'Inter', sans-serif;">
<div style="font-size: 11px; font-weight: 700; color: #047857; letter-spacing: 1.5px; margin-bottom: 6px;">🇬🇧 ENGLISH${label ? ' · ' + label : ''}</div>
<pre style="white-space: pre-wrap; word-wrap: break-word; font-size: 12px; line-height: 1.5; margin: 0; color: #0F172A; font-family: 'SF Mono', Consolas, monospace;">${en}</pre>
</td>
</tr>
</table>`;
}

function calloutBox(emoji, label, text, color) {
  const c = color || '#8B5CF6';
  return `<div style="background: ${c}15; border-left: 4px solid ${c}; padding: 14px 18px; border-radius: 8px; margin: 12px 0; font-family: 'Inter', sans-serif;">
<strong style="color: ${c}; font-size: 13px;">${emoji} ${label}</strong>
<div style="margin-top: 6px; font-size: 13px; color: #1E293B; line-height: 1.55;">${text}</div>
</div>`;
}

function docsReference(items) {
  const list = items.map(it => `<li style="margin-bottom: 6px;"><strong>${it.name}</strong>${it.desc ? ` — ${it.desc}` : ''}</li>`).join('\n');
  return `<div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 14px 18px; border-radius: 8px; margin: 16px 0; font-family: 'Inter', sans-serif;">
<strong style="color: #B45309; font-size: 13px;">📁 docs/ Kaynakları</strong>
<div style="margin-top: 8px; font-size: 13px; color: #1E293B;">
<ul style="margin: 0; padding-left: 20px;">${list}</ul>
<div style="margin-top: 10px; font-size: 11px; color: #78350F; font-style: italic;">Atölye sırasında eğitmen tarafından paylaşılan Drive klasöründen erişilir.</div>
</div>
</div>`;
}

function caseStudyBox(title, problem, approach, solution) {
  return `<div style="margin: 18px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(15,23,42,0.08);">
<div style="background: #3730A3; color: white; padding: 12px 18px; font-family: Georgia, serif; font-weight: 700; font-size: 15px;">📋 Vaka Çalışması: ${title}</div>
<div style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 14px 18px; font-family: 'Inter', sans-serif;">
<strong style="color: #B91C1C; font-size: 12px;">❗ SORUN</strong>
<div style="margin-top: 4px; font-size: 13px; color: #1E293B;">${problem}</div>
</div>
<div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 14px 18px; font-family: 'Inter', sans-serif;">
<strong style="color: #B45309; font-size: 12px;">💡 YAKLAŞIM</strong>
<div style="margin-top: 4px; font-size: 13px; color: #1E293B;">${approach}</div>
</div>
<div style="background: #D1FAE5; border-left: 4px solid #10B981; padding: 14px 18px; font-family: 'Inter', sans-serif;">
<strong style="color: #047857; font-size: 12px;">✅ ÇÖZÜM / DERS</strong>
<div style="margin-top: 4px; font-size: 13px; color: #1E293B;">${solution}</div>
</div>
</div>`;
}

// ═══════════════════════════════════════════════════════════
// CELL & NOTEBOOK BUILDERS
// ═══════════════════════════════════════════════════════════
function mdCell(content) {
  const lines = Array.isArray(content) ? content : [content];
  return {
    cell_type: 'markdown',
    metadata: {},
    source: lines.map((l, i) => i < lines.length - 1 ? l + '\n' : l),
  };
}

function codeCell(lines) {
  return {
    cell_type: 'code',
    execution_count: null,
    metadata: {},
    outputs: [],
    source: (Array.isArray(lines) ? lines : [lines]).map((l, i, arr) => i < arr.length - 1 ? l + '\n' : l),
  };
}

function buildNotebook(title, cells) {
  return {
    cells,
    metadata: {
      kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' },
      language_info: { name: 'python', version: '3.11', mimetype: 'text/x-python', file_extension: '.py' },
      colab: { name: title, provenance: [] },
    },
    nbformat: 4,
    nbformat_minor: 5,
  };
}

// ═══════════════════════════════════════════════════════════
// NOTEBOOK ŞABLONU — Aurora başlıklı, zenginleştirilmiş
// ═══════════════════════════════════════════════════════════
function richGuideNotebook(opts) {
  // opts: {
  //   title, notebookDesc, weekId, weekTitle, sectionLabel, color, duration, difficulty,
  //   objectives[], prep[], sections[{num, title, subtitle, intro, steps[], promptPairs[{tr,en,label}], image, code, callout, caseStudy}],
  //   docsReferences[], tasks[], turkeyExamples[], next
  // }
  const cells = [];

  // Aurora Header
  cells.push(mdCell(auroraHeader({
    title: opts.title,
    weekId: opts.weekId,
    weekTitle: opts.weekTitle,
    duration: opts.duration,
    difficulty: opts.difficulty,
    sectionLabel: opts.sectionLabel,
    color: opts.color,
  })));

  // Description
  if (opts.notebookDesc) {
    cells.push(mdCell([
      `> **Bu notebook hakkında:** ${opts.notebookDesc}`,
      '',
      '---',
    ]));
  }

  // Hedefler
  if (opts.objectives && opts.objectives.length) {
    cells.push(mdCell([
      '## 🎯 Hedefler',
      '',
      'Bu notebook\'u tamamladığında:',
      '',
      ...opts.objectives.map(o => `- ${o}`),
      '',
    ]));
  }

  // Ön Hazırlık
  if (opts.prep && opts.prep.length) {
    cells.push(mdCell([
      '## 📋 Ön Hazırlık',
      '',
      ...opts.prep.map(p => `- ${p}`),
      '',
    ]));
  }

  // docs/ Kaynakları
  if (opts.docsReferences && opts.docsReferences.length) {
    cells.push(mdCell(docsReference(opts.docsReferences)));
  }

  // Bölümler
  (opts.sections || []).forEach((sec, i) => {
    const num = sec.num || (i + 1);
    cells.push(mdCell(sectionBanner(num, sec.title, sec.subtitle, opts.color)));

    if (sec.intro) cells.push(mdCell(sec.intro));

    if (sec.steps && sec.steps.length) {
      cells.push(mdCell([
        '**Adım adım:**',
        '',
        ...sec.steps.map((st, idx) => `${idx + 1}. ${st}`),
      ]));
    }

    if (sec.promptPairs && sec.promptPairs.length) {
      sec.promptPairs.forEach(pp => {
        cells.push(mdCell(promptPair(pp.tr, pp.en, pp.label)));
      });
    }

    if (sec.image) {
      cells.push(mdCell([
        '> 🖼️ **Ekran görüntüsü:** ' + (sec.image.caption || 'Atölyede gösterilecek'),
        '',
        '*Eğitmen Drive klasöründe paylaşır.*',
      ]));
    }

    if (sec.code) cells.push(codeCell(sec.code));

    if (sec.callout) {
      cells.push(mdCell(calloutBox(sec.callout.emoji || '💡', sec.callout.label || 'İPUCU', sec.callout.text, sec.callout.color || opts.color)));
    }

    if (sec.caseStudy) {
      cells.push(mdCell(caseStudyBox(
        sec.caseStudy.title,
        sec.caseStudy.problem,
        sec.caseStudy.approach,
        sec.caseStudy.solution,
      )));
    }
  });

  // Türkiye'den Vakalar
  if (opts.turkeyExamples && opts.turkeyExamples.length) {
    cells.push(mdCell([
      '---',
      '',
      '## 🇹🇷 Türkiye\'den Pratik Örnekler',
      '',
      ...opts.turkeyExamples.map((ex, i) => `**${i + 1}.** ${ex}`),
      '',
    ]));
  }

  // Sen Yap
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

  // Footer
  cells.push(mdCell(auroraFooter({
    nextNotebook: opts.next,
    weekId: opts.weekId,
  })));

  return buildNotebook(opts.title, cells);
}

// ═══════════════════════════════════════════════════════════
// HAFTA RENKLERİ
// ═══════════════════════════════════════════════════════════
const SECTION_COLORS = {
  1: '#10B981', // emerald
  2: '#10B981',
  3: '#10B981',
  4: '#10B981',
  5: '#8B5CF6', // purple
  6: '#8B5CF6',
  7: '#8B5CF6',
  8: '#8B5CF6',
  9: '#8B5CF6',
  10: '#3730A3', // indigo
  11: '#3730A3',
  12: '#3730A3',
  13: '#3730A3',
  14: '#3730A3',
};
const SECTION_LABELS = {
  1: 'BÖLÜM 1 · TEMELLER', 2: 'BÖLÜM 1 · TEMELLER', 3: 'BÖLÜM 1 · TEMELLER', 4: 'BÖLÜM 1 · TEMELLER',
  5: 'BÖLÜM 2 · İÇERİK ATÖLYELERİ', 6: 'BÖLÜM 2 · İÇERİK ATÖLYELERİ', 7: 'BÖLÜM 2 · İÇERİK ATÖLYELERİ',
  8: 'BÖLÜM 2 · İÇERİK ATÖLYELERİ', 9: 'BÖLÜM 2 · İÇERİK ATÖLYELERİ',
  10: 'BÖLÜM 3 · MESLEĞE ÖZEL · LOKAL · API', 11: 'BÖLÜM 3 · MESLEĞE ÖZEL · LOKAL · API',
  12: 'BÖLÜM 3 · MESLEĞE ÖZEL · LOKAL · API', 13: 'BÖLÜM 3 · MESLEĞE ÖZEL · LOKAL · API',
  14: 'BÖLÜM 3 · MESLEĞE ÖZEL · LOKAL · API',
};

// ═══════════════════════════════════════════════════════════
// NOTEBOOK META — 14 hafta × 3-6 notebook = 69 notebook
// ═══════════════════════════════════════════════════════════
const WEEKS = [];

// ───────────────── HAFTA 1 ─────────────────
WEEKS.push({
  week: 1, slug: '01', weekTitle: "Üretken YZ'ye Giriş",
  notebooks: [
    {
      filename: 'hafta01_kavram_haritasi.ipynb',
      opts: {
        title: 'Üretken YZ Kavram Haritası ve Mini Quiz',
        notebookDesc: 'YZ → ML → DL → Üretken YZ kavramlarını görsel haritada ayırt edip self-quiz ile pekiştir.',
        duration: '20-30 dk', difficulty: '🟢 Başlangıç',
        objectives: [
          'YZ, ML, DL ve Üretken YZ\'nin sınır ve kesişimlerini netleştirmek',
          'Diskriminatif (sınıflandırıcı) ve üretken modeller farkını içselleştirmek',
          'Türkiye\'den 5 üretken YZ örneğini sıralayabilmek',
          'docs/ klasöründeki MEB rehberini ve Cahit Arf makalesini etkin kullanmak',
        ],
        prep: [
          'Kahve/çay ☕',
          'Defter ve kalem (kavram haritasını elle de çiz — bilişsel pekiştirme için kritik)',
          'ChatGPT veya Gemini açık olsun (denemeler için)',
          'docs/ klasörüne erişim — eğitmenin paylaştığı Drive linkinden',
        ],
        docsReferences: [
          { name: 'MEB Yapay Zeka Araçları Öğretmen El Kitabı', desc: '60 sayfa, 45+ araç, disipliner örnekler' },
          { name: 'Cahit Arf — Makine Düşünebilir mi?', desc: 'Türkçe ilk YZ makalesi (1958)' },
          { name: 'Konya Akıllı Şehir AI Stratejisi', desc: 'Türkiye\'nin yerel YZ vizyonu' },
        ],
        sections: [
          {
            num: 1, title: 'YZ vs ML vs DL vs Üretken YZ', subtitle: '4 katmanlı Venn diyagramı',
            intro: `**En geniş kümeden en dara doğru:**

- **YZ (Yapay Zekâ):** İnsan zekâsını taklit eden tüm sistemler — sembolik AI, kural tabanlı dahil.
- **ML (Makine Öğrenmesi):** Veriden örüntü çıkaran YZ alt kümesi.
- **DL (Derin Öğrenme):** Çok katmanlı sinir ağları kullanan ML alt kümesi.
- **Üretken YZ:** İçerik (metin, görsel, ses, video) üreten modeller. Genelde DL temellidir.

> ⚠️ **Sık yapılan hata:** "Üretken YZ ≠ ML\'in karşıtı." Üretken YZ, ML/DL\'in bir uygulama tipi.`,
            callout: { emoji: '🎯', label: 'KAVRAM TUZAKLARI', text: 'ChatGPT ≠ "Yapay zekâ". ChatGPT bir LLM — Üretken YZ\'nin bir uygulamasıdır. "Yapay zekâ" çok daha geniş bir alan.' },
          },
          {
            num: 2, title: 'Diskriminatif vs Üretken Model', subtitle: 'İki temel ML görev türü',
            intro: `İki yaklaşım vardır:

- **Diskriminatif (sınıflandırıcı):** Veri verildiğinde etiket tahmin eder. Örnek: "Bu mail spam mi?" "Bu görüntü kedi mi köpek mi?"
- **Üretken:** Veri dağılımını öğrenir, yeni örnek üretir. Örnek: "Spam-benzeri yeni bir mail metni yaz." "Bir kedi resmi çiz."

**Hangisi nerede?**

| Görev | Tip |
|---|---|
| Yorum duygusu (poz/neg) | Diskriminatif |
| Yorum cevabı yazma | Üretken |
| Yüz tanıma (kim?) | Diskriminatif |
| Yüz görüntüsü üretme | Üretken |
| Hava tahmini (kaç °C?) | Diskriminatif |
| Hikâye yazma | Üretken |`,
          },
          {
            num: 3, title: 'İlk Promptlar — TR ve EN', subtitle: 'Aynı kavramı 2 dilde sor',
            intro: 'Her bölümde Türkçe ve İngilizce prompt çiftlerini yan yana göreceğiz. Hem dil farkını öğreneceksin, hem aynı modelin iki dilde nasıl yanıt verdiğini gözlemleyeceksin.',
            promptPairs: [
              {
                label: 'KAVRAM SORGUSU',
                tr: `Sen 20 yıllık bir bilgisayar bilimcisin.
"Üretken YZ" kavramını 12 yaşındaki bir öğrenciye anlatır gibi açıkla.
3 paragrafı geçme. Türkçe yaz.
Bir günlük yaşam örneği ver.`,
                en: `You are a computer scientist with 20 years of experience.
Explain the concept of "Generative AI" as if to a 12-year-old.
Maximum 3 paragraphs. Write in English.
Provide one everyday-life example.`,
              },
              {
                label: 'KARŞILAŞTIRMA',
                tr: `Sınıflandırıcı (diskriminatif) bir model ile üretken bir modeli
karşılaştır. Aşağıdaki tabloyu Markdown olarak doldur:

| Özellik | Diskriminatif | Üretken |
|---|---|---|
| Amaç | ? | ? |
| Çıktı | ? | ? |
| Örnek | ? | ? |`,
                en: `Compare a discriminative (classifier) model with a generative model.
Fill out the following Markdown table:

| Property | Discriminative | Generative |
|---|---|---|
| Goal | ? | ? |
| Output | ? | ? |
| Example | ? | ? |`,
              },
            ],
            callout: { emoji: '🌍', label: 'NEDEN İKİ DİL?', text: 'Üretken YZ modellerinin çoğu İngilizce verilerle eğitildi — İngilizce promptlarda bazen daha doğru sonuç alırsın. Türkçe için "dil kilidi" eklemek gerekir ("Türkçe yaz", "Türkçe yanıtla"). Her iki dilde aynı promptu deneyip sonucu karşılaştır.' },
          },
          {
            num: 4, title: 'Mini Quiz — Sen Sınıflandır',
            intro: `Aşağıdaki sistemlerin hangisi **üretken**, hangisi **diskriminatif**?

1. Google Translate
2. Spam filtresi
3. Midjourney
4. Yüz tanıma sistemi
5. Bir blog yazısı tamamlayıcı
6. Hava durumu tahmin modeli
7. Suno (müzik üretici)
8. Face ID (iPhone kilit açma)
9. ChatGPT'nin yanıtı
10. Netflix öneri sistemi

> Cevaplarını öğrenme defterine yaz, sonra aşağıdaki cevap anahtarıyla karşılaştır.`,
            callout: { emoji: '✅', label: 'CEVAP ANAHTARI', text: '1) Üretken (çeviri = metin üretimi) | 2) Diskriminatif | 3) Üretken | 4) Diskriminatif | 5) Üretken | 6) Diskriminatif | 7) Üretken | 8) Diskriminatif | 9) Üretken | 10) Diskriminatif (öneri puanlama). Doğru: 8/10 → 🌟 İyi başlangıç!' },
          },
          {
            num: 5, title: 'Türkiye Perspektifi — 5 Yerel Örnek',
            intro: `Türkiye'de bilinen 5 üretken YZ örneği:

1. **Trendyol-LLM** — Türkçe büyük dil modeli, e-ticaret odaklı
2. **Nano Banana** — yerli görsel üretim aracı (docs/Nano Banana Uygulamaları.docx referans)
3. **NotebookLM Türkçe podcast** (Google) — Türkçe Audio Overview desteği
4. **Cosmos LLM** — KUIS (Koç Üniversitesi) tarafından eğitilmiş Türkçe LLM
5. **MEB YZ Politika Belgesi araçları** — 45+ tool (docs/MEB rehberi)

> 💼 **Konya Stratejisi:** docs/ klasöründeki "Konya Akıllı Şehir & YZ Stratejisi" Türkiye'nin yerel YZ vizyonunu gösteriyor — okuyup özetlemen tavsiye edilir.`,
          },
        ],
        turkeyExamples: [
          'Bir öğretmen ChatGPT\'ye "5. sınıf öğrencisine fotosentezi hikâye gibi anlat" dedi — 2 dakikada hazır anlatım çıktı.',
          'Bir mağaza sahibi Trendyol-LLM ile ürün açıklamalarını otomatize etti — eskiden 3 saat süren iş 15 dakikaya indi.',
          'Bir akademisyen NotebookLM\'e 30 PDF yükleyip 25 dakikalık Türkçe podcast üretti — kendi kanalında paylaştı.',
        ],
        tasks: [
          'Kavram haritası çiz: YZ → ML → DL → Üretken YZ. Her halkanın içine 3 örnek koy. Defterindeki ya da Notion\'daki haritayı paylaş.',
          'ChatGPT\'ye sor: "Bana Türkiye\'deki son 12 ayda öne çıkan 5 üretken YZ aracını listele." Yanıtı kavram haritana ekle. Aynı soruyu Gemini\'ye de sor, kıyas yap.',
          'Aile/iş arkadaşına 3 dakikalık bir "Üretken YZ nedir?" anlatımı yap. Geri bildirim al, defterine yaz.',
          'docs/Cahit Arf — Makine Düşünebilir mi? makalesini oku, 1 sayfa Türkçe özet yaz.',
        ],
        next: '`hafta01_tarihce_timeline.ipynb` — Turing\'den ChatGPT\'ye yolculuk',
      },
    },
    {
      filename: 'hafta01_tarihce_timeline.ipynb',
      opts: {
        title: 'Üretken YZ Tarihçesi — Turing\'den 2026\'ya',
        notebookDesc: 'YZ\'nin köklerinden bugünün multimodal modellerine uzanan görsel zaman çizgisi.',
        duration: '15-25 dk', difficulty: '🟢 Başlangıç',
        objectives: [
          '7 dönüm noktasını sıralı olarak ezberleyebilmek',
          'Cahit Arf (1958) ve Türkiye\'nin yerini görmek',
          'Transformer (2017) öncesi/sonrası ayrımını anlamak',
          'Tarihsel bağlamı bugünün araçlarına bağlayabilmek',
        ],
        docsReferences: [
          { name: 'docs/cahit-arf-makine-dusunebilir-mi-orjinal.pdf', desc: 'Orijinal 1958 makalesi — Türkiye\'nin YZ kökü' },
          { name: 'docs/Yapay_Zeka_Eğitimde_Yeni_Bir_Çağ.pdf', desc: 'Eğitimde YZ giriş kitabı' },
        ],
        sections: [
          { num: 1, title: '1950 — Turing Testi', intro: `Alan Turing **"Computing Machinery and Intelligence"** makalesinde "Makineler düşünebilir mi?" sorusunu sordu. Cevap arayışı YZ\'nin doğum tetikleyicisi oldu.

> Turing Testi: Bir insan, bir makine ve bir sorgulayıcı. Sorgulayıcı 5 dakika boyunca metin üzerinden konuşup hangisinin makine olduğunu ayırt edemezse, makine "düşünür" sayılır.`, callout: { emoji: '🤔', label: 'BUGÜN', text: 'GPT-5 ve Claude Opus, Turing testini birçok senaryoda geçer. Ama "düşünmek" felsefi bir tartışma — yine de devam ediyor.' } },
          { num: 2, title: '1956 — Dartmouth Konferansı', intro: 'John McCarthy ve ekibi YZ\'yi resmi bir araştırma alanı olarak kurdu. **"Artificial Intelligence" terimi burada doğdu.** McCarthy, Marvin Minsky, Claude Shannon — hepsi orada.' },
          { num: 3, title: '1958 — Cahit Arf: "Makine Düşünebilir mi?"',
            intro: `Türk matematikçi **Cahit Arf**, **1958\'de** Erzurum Atatürk Üniversitesi açılış konuşmasında bu soruyu Türkçe olarak ele aldı.

🇹🇷 **Türkiye\'nin YZ kökü 60+ yıl öncesine uzanır.** Cahit Arf, soruya hem felsefi hem matematiksel açıdan yaklaştı — Turing\'in görüşlerini Türkçe akademik ortama taşıdı.

> docs/cahit-arf-makine-dusunebilir-mi-orjinal.pdf — orijinal makale, atölye sırasında okunması tavsiye edilir.`,
            callout: { emoji: '🇹🇷', label: 'TÜRKİYE GURURU', text: 'Cahit Arf "Arf değişmezi" ile dünya matematik tarihine geçen bir Türk düşünürüdür. Onun YZ\'ye olan ilgisi, Türkiye\'nin bilimsel mirasının bir parçasıdır.' },
          },
          { num: 4, title: '2014 — GAN (Üretken Çekişmeli Ağlar)', intro: `Ian Goodfellow, **GAN\'leri (Generative Adversarial Networks)** yayınladı. "Üretken çağ" başladı — fotogerçek görsel üretimi mümkün hale geldi.

GAN mantığı: 2 ağ birbirine karşı yarışır.
- **Üretici (Generator):** Sahte görsel üretir
- **Ayırıcı (Discriminator):** Gerçek mi sahte mi der
- Yarışla ikisi de gelişir → çok gerçekçi sahteler` },
          { num: 5, title: '2017 — "Attention is All You Need" (Transformer)', intro: `Google ekibi **Transformer mimarisini** yayınladı. Bu, BERT/GPT/Claude/Gemini gibi tüm modern LLM\'lerin temelidir.

**Transformer öncesi:** Kısa context, RNN/LSTM, ardışık işleme.
**Transformer sonrası:** Uzun context, paralel hesaplama, ölçeklenebilir.

Bu makale olmadan ChatGPT olmazdı.`, callout: { emoji: '🧠', label: 'TEKNİK NOT', text: '"Attention" mekanizması: model her kelimenin diğer kelimelerle ilişkisini paralel olarak değerlendirir. RNN\'in ardışık problemini çözer.' } },
          { num: 6, title: '2022 — ChatGPT (30 Kasım)', intro: `**OpenAI**, GPT-3.5\'i ChatGPT olarak halka açtı. **5 günde 1 milyon kullanıcıya** ulaştı — tüm zamanların en hızlı yayılan teknolojik ürünü.

| Ürün | 1M kullanıcı süresi |
|---|---|
| Netflix | 3.5 yıl |
| Twitter | 2 yıl |
| Spotify | 5 ay |
| Instagram | 2.5 ay |
| ChatGPT | **5 gün** |` },
          { num: 7, title: '2024-2026 — Multimodal & Agent çağı', intro: `**GPT-5, Gemini 2.5, Claude Sonnet 4.6, Opus 4.7** — tek modelle metin+ses+görsel+video.

Yenilikler:
- **MCP (Model Context Protocol)** — Anthropic\'in standartı, agentic araçların evrenselliği
- **Computer Use** — browser/masaüstü kontrolü (Anthropic, OpenAI)
- **Agentic workflows** — model kendi başına çoklu adımı yönetir
- **2M token context** (Gemini) — kitap boyutu metin işleyebilir

Bizim atölye **bu çağda** doğdu.` },
        ],
        turkeyExamples: [
          'Türkiye Açık Bilim Akademisi 2025\'te ilk Türkçe LLM yayınladı — sonraki yıl Trendyol-LLM, KocLM, Cosmos geldi.',
          'TÜBİTAK 2026 yılı YZ ulusal stratejisi açıkladı — eğitimde, sağlıkta, sanayide hedefler.',
          'MEB Yapay Zeka Politika Belgesi (2024) — Türk eğitimcisi için resmi YZ rehberi.',
        ],
        tasks: [
          '7 dönüm noktasını kendi sözlerinle özetleyen 1 sayfalık zaman çizgisi hazırla. Canva veya Figma\'da görsel yap.',
          'Her dönüm noktası için "şimdi olsa nasıl olurdu?" düşünce deneyi yap. Örneğin: "Cahit Arf\'ın 1958\'de bir LLM\'i olsaydı, Türkiye\'nin bilim politikası nasıl değişirdi?"',
          'Cahit Arf makalesini oku (docs/), 1 sayfa Türkçe özetle.',
          'ChatGPT\'ye sor: "Üretken YZ tarihinde 8. büyük an ne olabilir?" Aldığın cevabı eleştirel oku.',
        ],
        next: '`hafta01_etik_senaryolar.ipynb` — 10 vaka, sen olsan ne yapardın?',
      },
    },
    {
      filename: 'hafta01_etik_senaryolar.ipynb',
      opts: {
        title: 'Üretken YZ Etiği — 10 Vaka, Sen Ne Yapardın?',
        notebookDesc: 'Halüsinasyon, deepfake, telif, bias konularında gerçek vakalar üzerinden etik karar atölyesi.',
        duration: '40-50 dk', difficulty: '🟡 Orta',
        objectives: [
          '4 ana etik kategoride risk türlerini tanıyabilmek',
          'KVKK, MEB ve AB AI Act çerçevesini özetleyebilmek',
          'Kişisel/kurumsal kullanım için etik kontrol listesi hazırlamak',
          'Vaka analizinde "sen olsan ne yapardın?" sorusuna karar verebilmek',
        ],
        docsReferences: [
          { name: 'MEB Yapay Zeka Politika Belgesi', desc: 'Eğitimde YZ kullanım kuralları' },
          { name: 'docs/Eğitimde YZ Araçları Kullanımı Kursu', desc: 'Sertifika için küçük görev örnekleri' },
        ],
        sections: [
          { num: 1, title: 'Vaka 1 — Hayali Hukuk Davası', intro: '',
            caseStudy: {
              title: 'ABD\'li Avukat ve 6 Sahte Dava',
              problem: 'Bir avukat ChatGPT\'ye dava emsali sordu, sistem 6 sahte dava uydurdu, avukat doğrulama yapmadı.',
              approach: 'Mahkemeye sahte dava emsalleriyle gitti. Hâkim tüm davaları araştırdı, hiçbiri yoktu.',
              solution: '5000 USD para cezası + meslek odası uyarısı. **Ders:** Üretken YZ çıktısını ASLA doğrulamadan kullanma — özellikle hukuki/tıbbi/finansal alanda.',
            },
            callout: { emoji: '⚠️', label: 'PRATIK KURAL', text: 'Üretken YZ "halüsinasyon" yapar — gerçeği bilmediği konularda çok ikna edici sahte cevaplar üretir. Her zaman birincil kaynaktan teyit et.' } },
          { num: 2, title: 'Vaka 2 — Deepfake Politikacı', intro: '',
            caseStudy: {
              title: 'Türkiye Seçim Dönemi Deepfake',
              problem: 'Sosyal medyada bir politikacının gerçekte söylemediği şeyler söylediği video yayıldı. Seçmen davranışı etkilendi.',
              approach: 'Politikacı ekibi C2PA standardı ile videonun sahte olduğunu kanıtladı. Cumhuriyet Savcılığı\'na şikâyet.',
              solution: 'Deepfake yapan kullanıcı 5651 sayılı kanun + KVKK kapsamında yargılandı. **Ders:** Deepfake kanunen suç. Ürettiklerinin etik kullanımına dikkat et.',
            } },
          { num: 3, title: 'Vaka 3 — Öğrenci Ödevi', intro: '',
            caseStudy: {
              title: 'Lise Öğrencisi ve ChatGPT Tarih Ödevi',
              problem: 'Lise öğrencisi tarih ödevini ChatGPT ile yazdırdı, atıf yapmadı. Öğretmen GPTZero ile tespit etti.',
              approach: 'Sınıf protokolü gözden geçirildi: "ChatGPT yardımı yasak" yerine "ChatGPT kullanırsan beyan et" politikası.',
              solution: 'Öğrenciye sıfır verildi (atıf yapmadığı için). Sonraki ödevlerde "AI Yardım Beyanı" formu zorunlu. **Ders:** AI yardımı yasak değil — atıfsızlık yasaktır.',
            } },
          { num: 4, title: 'Vaka 4 — Görsel Telif', intro: '',
            caseStudy: {
              title: 'Tasarımcı ve Midjourney Posteri',
              problem: 'Tasarımcı Midjourney ile poster yaptı, müşteriye 5000 TL\'ye sattı. Sonra başka bir sanatçının "stilini" taklit ettiği iddia edildi.',
              approach: 'Sanatçı sosyal medyada paylaştı, gündem oldu. Tasarımcı C2PA etiketi olmadığını kabul etti.',
              solution: 'Tasarımcı ücreti iade etti, AI etiketi standardını tüm işlerinde uyguladı. **Ders:** "Stil" telif değil ama tanınabilir bir sanatçı stilini kopyalamak etik değil. Üretken YZ ile ticari iş yaparken müşteriye AI kullanımını şeffaf bildir.',
            } },
          { num: 5, title: 'Vaka 5 — KVKK ve Hasta Verisi', intro: '',
            caseStudy: {
              title: 'Doktor ve ChatGPT Vaka Sorgusu',
              problem: 'Doktor, ChatGPT\'ye hasta vakası yazdı, hastanın adını ve dosya no\'sunu da ekledi. KVKK ihlali oluştu.',
              approach: 'Hastane KVKK uzmanı durumu tespit etti. Hekim, hasta verisini bulut servisine vermenin KVKK madde 4 ihlali olduğunu öğrendi.',
              solution: 'Lokal LLM (Ollama, Hafta 12) kuruldu. Hassas veriler artık tamamen offline işleniyor. **Ders:** KVKK kapsamında hasta verisi bulut LLM\'e ASLA verilemez. Lokal LLM zorunlu.',
            },
            callout: { emoji: '🔒', label: 'KVKK ALTIN KURAL', text: 'Hassas veri (sağlık, kimlik, finansal) bulut LLM\'e gitmesin. Lokal LLM (Hafta 12-13) ya da kurumsal Azure/GCP (KVKK uyumlu sözleşme) kullan.' } },
          { num: 6, title: 'Yasal Çerçeve Özeti',
            intro: `**4 ana hukuk düzlemi:**

| Düzlem | Kapsam | Önemli madde |
|---|---|---|
| **KVKK (TR)** | Kişisel veri | Hasta/öğrenci verisi YZ\'ye verilemez (anonim olmadıkça) |
| **MEB Politika** | Eğitim | YZ kullanımı şeffaf, atıflı, öğrenci yetiyle |
| **AB AI Act (2024)** | Yüksek riskli sistemler | Sağlık, hukuk, eğitim — uyum yükümlülüğü |
| **C2PA Standardı** | AI üretimi içerik | Dijital etiket, AI üretimi mi gerçek mi |

> **Atölye standardı:** Her ürettiğin AI içeriğine "AI tarafından üretildi" etiketi ekle.` },
        ],
        turkeyExamples: [
          'Bir hekim ChatGPT\'ye hasta verisi yazdı, KVKK ihlali oldu — Hafta 12\'de göreceğimiz Ollama ile çözülür.',
          'Bir lise öğretmeni "AI Yardım Beyanı" formu uyguladı — şeffaflık + atıf protokolü.',
          'Bir grafik tasarımcı Nano Banana ile ürettiği görsellere C2PA etiketi ekledi — etik şeffaflık.',
        ],
        tasks: [
          '5 vakanın her biri için 3 maddelik "kişisel kontrol listesi" hazırla.',
          'Kendi mesleğine özel 5 etik risk listele (örn. öğretmen: ödev intihali, doktor: hasta gizliliği, gazeteci: kaynak doğrulama).',
          'KVKK kapsamında YZ ile yapılabilecek/yapılamayacak 3 işlem örneği yaz.',
          'docs/MEB Yapay Zeka Politika Belgesi\'ni oku — kendi disiplininle ilgili 3 kuralı çıkar.',
        ],
        next: 'Hafta 1 tamamlandı. Sıradaki: `hafta02_prompt_anatomi.ipynb` — Promptun 6 yapı taşı',
      },
    },
  ],
});

// Hafta 1 tamamlandı — şimdi Hafta 2-14 için zenginleştirilmiş kısa şablon kullanacağız
// (bu dosya çok uzar; her hafta için 3-6 notebook'luk bir base şablon)

// ───────────────── HAFTA 2 ─────────────────
WEEKS.push({
  week: 2, slug: '02', weekTitle: 'Prompt Mühendisliği',
  notebooks: [
    {
      filename: 'hafta02_prompt_anatomi.ipynb',
      opts: {
        title: 'Promptun 6 Yapı Taşı',
        notebookDesc: 'Prompt anatomisi: Rol + Bağlam + Görev + Kısıt + Format + Örnek. Her unsuru tek tek inceleyelim.',
        duration: '30-45 dk', difficulty: '🟢 Başlangıç',
        objectives: [
          '6 yapı taşını ezbere bilmek',
          'Her unsurun çıktıya etkisini gözlemlemek',
          'Aynı görevi 6 farklı kalitede prompt ile karşılaştırmak',
          'Kendi mesleğine özel "altın prompt iskeleti" hazırlamak',
        ],
        docsReferences: [
          { name: 'docs/Prompt yazma.docx', desc: 'Türkçe prompt mühendisliği temelleri' },
          { name: 'docs/Prompt yazma.png', desc: 'Görsel özet — 6 unsur şeması' },
        ],
        sections: [
          { num: 1, title: 'YAPI 1 — ROL', intro: `"Sen bir... uzmanısın." Modelin "kim olduğunu" bilmesi cevabın tonunu, derinliğini ve dilini belirler.`,
            promptPairs: [{ label: 'ROL', tr: 'Sen 20 yıllık bir matematik öğretmenisin. 8. sınıf öğrencilerine üslü sayıları somut örneklerle anlatırsın.', en: 'You are a math teacher with 20 years of experience. You explain exponents to 8th graders with concrete examples.' }] },
          { num: 2, title: 'YAPI 2 — BAĞLAM', intro: 'Modele "neye bağlı" olduğunu söyle. Sınıf düzeyi, hedef kitle, kısıtlar, kurum kuralları.',
            promptPairs: [{ label: 'BAĞLAM', tr: 'Öğrenciler MEB müfredatına göre çalışıyor. Önümüzdeki hafta TEOG sınavı var. Konuyu hızlı pekiştirmem gerekiyor. Süre: 40 dakika.', en: 'Students follow the Turkish national curriculum. They have TEOG exam next week. I need to reinforce the topic quickly. Duration: 40 minutes.' }] },
          { num: 3, title: 'YAPI 3 — GÖREV', intro: 'Net bir fiil + somut çıktı. "Yardım et" değil, "5 örnek soru hazırla".',
            promptPairs: [{ label: 'GÖREV', tr: 'Üslü sayılar konusunda 5 farklı zorlukta örnek soru hazırla. Her sorunun cevabını ayrı bir başlık altında adım adım göster.', en: 'Prepare 5 example questions of different difficulty levels on exponents. Show the answer to each question step-by-step under a separate heading.' }] },
          { num: 4, title: 'YAPI 4 — KISIT', intro: 'Sınırlar: dil, uzunluk, format, ton, yasak kelimeler.',
            promptPairs: [{ label: 'KISIT', tr: 'Türkçe yaz (ı, ğ, ü, ö, ş, ç kullan). Her cevap maksimum 100 kelime. Akademik dil değil, samimi öğretmen dili. "Açıkça görüyoruz ki" gibi klişeleri kullanma.', en: 'Write in English. Each answer maximum 100 words. Not academic language but friendly teacher tone. Avoid clichés like "as we can clearly see".' }] },
          { num: 5, title: 'YAPI 5 — FORMAT', intro: 'JSON, tablo, markdown, listeleme. Yapılandırılmış çıktı kullanım kolaylığı sağlar.',
            promptPairs: [{ label: 'FORMAT', tr: 'Çıktıyı şu formatta ver:\n\n```\n## Soru 1\n**Zorluk:** Kolay\n**Soru:** ...\n**Cevap (adım adım):**\n1. ...\n2. ...\n```', en: 'Provide output in this format:\n\n```\n## Question 1\n**Difficulty:** Easy\n**Question:** ...\n**Answer (step-by-step):**\n1. ...\n2. ...\n```' }] },
          { num: 6, title: 'YAPI 6 — ÖRNEK (Few-shot)', intro: '1-3 örnek vermek %80 işi çözer. Modelin örüntüyü yakalamasını sağlar.',
            promptPairs: [{ label: 'ÖRNEK', tr: 'Örnek soru: "2³ × 2⁴ kaçtır?"\nCevap: "Aynı taban, üsler toplanır → 2⁷ = 128"\n\nŞimdi sen 5 yeni soru hazırla.', en: 'Example question: "What is 2³ × 2⁴?"\nAnswer: "Same base, exponents add up → 2⁷ = 128"\n\nNow you prepare 5 new questions.' }] },
          { num: 7, title: '6\'sını Birleştir', intro: 'Yukarıdaki 6 unsuru tek prompt\'ta birleştir. İlk başta uzun gelir, sonra refleks olur.',
            callout: { emoji: '🌟', label: 'ALTIN KURAL', text: '6 unsur olmadan prompt yazma. İlk başta yavaşlatır gibi görünür ama 1 ay sonra elin alışır ve %80 daha kaliteli sonuç alırsın.' } },
        ],
        tasks: [
          'Kendi mesleğine özel 1 görev seç. 6 unsurla bir prompt yaz, ChatGPT/Gemini\'de dene.',
          'Aynı görevi sadece "Görev" unsuruyla yaz, sonuçları kıyasla. Kalite farkını gözlemle.',
          'Bir "Altın Prompt Şablonu" oluştur — Notion sayfası aç, 6 unsur başlığıyla doldurabileceğin bir form.',
          'Aynı promptun TR ve EN versiyonunu yan yana çalıştır, dil farkını analiz et.',
        ],
        next: '`hafta02_few_shot_atolye.ipynb`',
      },
    },
    // Diğer Hafta 2 notebook'ları (kısa form)
    ...buildBasicNotebooks(2, '02', 'Prompt Mühendisliği', [
      ['hafta02_few_shot_atolye.ipynb', 'Few-Shot Prompting — Örnekle Öğret', 'Zero/one/few-shot karşılaştırma + Türkçe duygu analizi atölyesi', '30-40 dk',
        [{ tr: 'Yorum: "Kargo geç geldi ama ürün güzel."\nDuygu (POZ/NEG/NÖT)?', en: 'Review: "Cargo was late but the product is nice."\nSentiment (POS/NEG/NEU)?' }]],
      ['hafta02_cot_matematik_mantik.ipynb', 'Chain-of-Thought ile Adım Adım Düşündür', '"Önce planla, sonra yaz" stratejisi — 5 mantık bulmacası', '25-35 dk',
        [{ tr: 'Bu bulmacayı adım adım düşünerek çöz, her adımı göster.', en: 'Solve this puzzle step-by-step, show each step.' }]],
      ['hafta02_yapilandirilmis_cikti.ipynb', 'Yapılandırılmış Çıktı — JSON, Tablo, Markdown', 'Otomasyona/diğer araçlara veri besleyen prompt yazma', '20-30 dk',
        [{ tr: 'Yorumdan duygu, ürün, şikayet kategorisi çıkar. JSON döndür.', en: 'Extract sentiment, product, complaint category from review. Return JSON.' }]],
      ['hafta02_prompt_kutuphanesi_sablon.ipynb', 'Prompt Kütüphanesi Şablonu', 'Notion / GitHub / Obsidian üzerinde kişisel prompt arşivi', '15-25 dk', []],
    ]),
  ],
});

// ═══════════════════════════════════════════════════════════
// HELPER: Kalan haftalar için zenginleştirilmiş kısa şablon
// ═══════════════════════════════════════════════════════════
function buildBasicNotebooks(weekId, slug, weekTitle, items) {
  return items.map((it, idx) => ({
    filename: it[0],
    opts: {
      title: it[1],
      notebookDesc: it[2],
      weekId, weekTitle,
      duration: it[3] || '30-40 dk',
      difficulty: weekId >= 12 ? '🟠 İleri' : (weekId >= 5 ? '🟡 Orta' : '🟢 Başlangıç'),
      objectives: [
        `${it[1]} aracını / kavramını ileri seviye kullanmak`,
        'Pratik atölye çıktıları üretmek',
        'docs/ kaynaklarıyla derinleşmek',
      ],
      sections: (it[4] || []).map((p, i) => ({
        num: i + 1,
        title: p.label || `Bölüm ${i + 1}`,
        intro: p.intro || '',
        promptPairs: p.tr ? [p] : undefined,
      })),
      tasks: ['Bu konuyla ilgili 1 somut çıktı üret ve öğrenme defterine kaydet.'],
      next: idx < items.length - 1 ? `\`${items[idx + 1][0]}\`` : 'Sonraki hafta',
    },
  }));
}

// Helper'ı kullanarak kalan haftalar (3-14) — kısa form ama zengin header/footer'lı
const REST_WEEKS_DATA = [
  { week: 3, slug: '03', weekTitle: 'Sohbet Asistanları', items: [
    ['hafta03_asistan_kiyas_matrisi.ipynb', 'Sohbet Asistanları Kıyas Matrisi', '10 görev × 5 asistan kıyas tablosu', '45 dk'],
    ['hafta03_chatgpt_custom_gpt.ipynb', 'ChatGPT Custom GPT Atölyesi', 'Kendi GPT\'ni yarat — adım adım', '30 dk'],
    ['hafta03_gemini_gem_olustur.ipynb', 'Gemini Gems ile Kişisel Asistan', 'Gem yaratma + Drive bağlama', '25 dk'],
    ['hafta03_claude_projects_artifacts.ipynb', 'Claude Projects ve Artifacts', 'Proje bazlı çalışma + canlı kod önizleme', '25 dk'],
    ['hafta03_perplexity_arastirma_atolyesi.ipynb', 'Perplexity Spaces Araştırma Akışı', 'Pro Search + Deep Research', '20 dk'],
  ]},
  { week: 4, slug: '04', weekTitle: 'NotebookLM ve Bilgi Yönetimi', items: [
    ['hafta04_notebooklm_kurulum_rehber.ipynb', 'NotebookLM\'e İlk Adım', 'Kurulum, kaynak yükleme, ilk soru', '20 dk'],
    ['hafta04_kendi_kitabini_konustur.ipynb', 'Kendi Kitabınla Konuş', '5 PDF, 20 soru-cevap testi', '40 dk'],
    ['hafta04_audio_overview_podcast.ipynb', 'Audio Overview Türkçe Podcast', 'NotebookLM\'in en sevilen özelliği', '30 dk'],
    ['hafta04_mind_map_studyguide.ipynb', 'Mind Map ve Study Guide', 'Görsel haritalama + sınav rehberi', '20 dk'],
    ['hafta04_alternatif_araclar_kiyas.ipynb', 'Alternatifleri Kıyasla', 'Claude Projects, ChatGPT Knowledge, AI Studio', '25 dk'],
  ]},
  { week: 5, slug: '05', weekTitle: 'Görsel Üretim Atölyesi', items: [
    ['hafta05_gorsel_arac_kiyasla.ipynb', 'Görsel Üretim Araç Kıyası', '5 araç × 5 prompt karşılaştırma', '50 dk'],
    ['hafta05_gemini_imagen_atolye.ipynb', 'Google AI Studio + Imagen 3', 'Ücretsiz Türkçe görsel üretim', '30 dk'],
    ['hafta05_midjourney_atolye.ipynb', 'Midjourney v6.1 Atölyesi', 'Discord + Web — sanat değeri lider', '40 dk'],
    ['hafta05_flux_huggingface.ipynb', 'Flux Schnell — HF Spaces', 'Açık kaynak en iyi diffusion', '25 dk'],
    ['hafta05_nano_banana_uygulama.ipynb', 'Nano Banana — Türk Yapımı', 'docs/Nano Banana Uygulamaları temelli', '20 dk'],
    ['hafta05_kamera_acilari_atolye.ipynb', 'Kamera, Işık, Stil Atölyesi', 'docs/Kamera açıları.docx temelli', '30 dk'],
  ]},
  { week: 6, slug: '06', weekTitle: 'Ses, TTS ve Müzik', items: [
    ['hafta06_tts_arac_kiyasla.ipynb', 'TTS Araç Kıyası', 'Aynı metin × 5 araç', '30 dk'],
    ['hafta06_elevenlabs_atolye.ipynb', 'ElevenLabs Türkçe + Ses Klonlama', 'Multilingual v2 + 30 sn klon', '40 dk'],
    ['hafta06_whisper_transkript.ipynb', 'Whisper STT — Video → Altyazı', 'Open-source, Türkçe %95+', '35 dk'],
    ['hafta06_suno_egitim_jingle.ipynb', 'Suno ile Müzik Üretimi', 'Sınıf marşı, eğitim jingle\'ı', '20 dk'],
    ['hafta06_voice_clone_etik.ipynb', 'Voice Cloning Etiği', 'KVKK + onay protokolü', '25 dk'],
  ]},
  { week: 7, slug: '07', weekTitle: 'Video, Avatar ve Animasyon', items: [
    ['hafta07_video_arac_kiyasla.ipynb', '5 Video Aracı Kıyası', 'Sora, Veo, Kling, Runway, Pika', '40 dk'],
    ['hafta07_veo_gemini_studio.ipynb', 'Veo 3 — Google AI Studio', 'Ücretsiz, Türkiye direkt', '30 dk'],
    ['hafta07_heygen_egitim_avatari.ipynb', 'HeyGen Türkçe Eğitim Avatarı', 'Konuşan avatar üretimi', '35 dk'],
    ['hafta07_uzun_video_ozetle.ipynb', 'Multimodal Gemini ile Video Özeti', '1 saatlik video → 5 paragraf', '25 dk'],
    ['hafta07_uctan_uca_pipeline.ipynb', 'Uçtan Uca Video Pipeline', 'Senaryo → Görsel → Ses → Video', '60 dk'],
  ]},
  { week: 8, slug: '08', weekTitle: 'Yazı, Sunum, Doküman, Ofis', items: [
    ['hafta08_gamma_sunum_atolye.ipynb', 'Gamma Sunum Atölyesi', '20 slayt 5 dakikada', '30 dk'],
    ['hafta08_copilot_excel_otomasyon.ipynb', 'Microsoft Copilot Excel', 'Formül + grafik + analiz', '40 dk'],
    ['hafta08_canva_magic_design.ipynb', 'Canva Magic Design', 'Pazarlama görselleri', '25 dk'],
    ['hafta08_chatpdf_arastirma.ipynb', 'ChatPDF Araştırma Akışı', 'Akademik makale + hukuki belge', '20 dk'],
    ['hafta08_toplanti_asistani.ipynb', 'Toplantı Asistanları', 'Otter, tldv, Fireflies', '25 dk'],
  ]},
  { week: 9, slug: '09', weekTitle: 'Otomasyon ve İş Akışları', items: [
    ['hafta09_zapier_ilk_zap.ipynb', 'İlk Zap — Gmail → Sheets + GPT', 'Sıfırdan otomasyon', '25 dk'],
    ['hafta09_make_senaryo.ipynb', 'Make Senaryo — RSS → ChatGPT → Telegram', 'Visual editor', '30 dk'],
    ['hafta09_n8n_kurulum.ipynb', 'n8n Self-Hosted Kurulum', 'Docker + ücretsiz katman', '40 dk'],
    ['hafta09_telegram_bot_otomasyon.ipynb', 'Günlük Brifing Telegram Botu', 'n8n + Gemini + 4 kaynak', '35 dk'],
    ['hafta09_notion_database_ai.ipynb', 'Notion AI Database', 'Kişisel CRM/proje paneli', '20 dk'],
  ]},
  { week: 10, slug: '10', weekTitle: 'Eğitimciler İçin Üretken YZ', items: [
    ['hafta10_meb_rehberi_disipliner_tarama.ipynb', 'MEB Rehberi Disipliner Tarama', '45+ aracın haritası', '40 dk'],
    ['hafta10_dersplani_5e_uretici.ipynb', '5E Modeli Ders Planı Üretici', 'Gemini Gem ile şablon', '35 dk'],
    ['hafta10_soru_bankasi_yapilandirilmis.ipynb', 'JSON Çıktılı Soru Bankası', 'Otomatik üretim + format', '30 dk'],
    ['hafta10_rubrik_otomasyon.ipynb', 'Otomatik Rubrik Üretimi', 'Saatlik iş dakikalara', '25 dk'],
    ['hafta10_kahoot_quizizz_ai.ipynb', 'Kahoot AI + Quizizz AI', 'Etkileşimli sınıf', '20 dk'],
  ]},
  { week: 11, slug: '11', weekTitle: 'Mesleğe Özel Atölyeler', items: [
    ['hafta11A_akademik_arastirma.ipynb', 'Akademik Parkur', 'Elicit + Consensus + NotebookLM', '60 dk'],
    ['hafta11B_dikey_alanlar.ipynb', 'Dikey Alanlar', 'Sağlık / Hukuk / Finans', '40 dk'],
    ['hafta11C_pazarlama_girisimcilik.ipynb', 'Pazarlama + SEO + Girişimcilik', 'Jasper, SurferSEO, Frase', '40 dk'],
    ['hafta11_lovable_bolt_replit_atolye.ipynb', 'No-Code Uygulama Atölyesi', 'Lovable, Bolt.new, Replit Agent', '60 dk'],
  ]},
  { week: 12, slug: '12', weekTitle: 'Lokal LLM Kurulumu', items: [
    ['hafta12_ollama_kurulum_macwinlinux.ipynb', 'Ollama Kurulum — 3 OS', 'Adım adım rehber + ilk model', '30 dk'],
    ['hafta12_ilk_konusma.ipynb', 'Ollama Python ile İlk Konuşma', 'pip install ollama + chat()', '40 dk'],
    ['hafta12_lm_studio_atolye.ipynb', 'LM Studio GUI Atölyesi', 'Model arama + local server', '30 dk'],
    ['hafta12_openwebui_docker.ipynb', 'Open WebUI Docker', 'Çoklu kullanıcı arayüzü', '45 dk'],
    ['hafta12_model_kiyaslama.ipynb', 'Türkçe Model Kıyaslaması', 'Llama vs Qwen vs Gemma', '40 dk'],
  ]},
  { week: 13, slug: '13', weekTitle: 'Lokal RAG ve Kendi Verinle Konuşma', items: [
    ['hafta13_anythingllm_kurulum.ipynb', 'AnythingLLM Kurulum', 'Workspace + ilk soru', '40 dk'],
    ['hafta13_cherry_studio_turkce.ipynb', 'Cherry Studio Türkçe', 'Çoklu API + Ollama', '30 dk'],
    ['hafta13_page_assist_browser.ipynb', 'Page Assist Browser RAG', 'Web sayfasıyla konuş', '20 dk'],
    ['hafta13_kendi_kitabini_konustur_lokal.ipynb', 'Tamamen Lokal RAG (50 satır)', 'Ollama + Chroma + pypdf', '60 dk'],
    ['hafta13_embedding_kiyas_tr.ipynb', 'Türkçe Embedding Kıyası', 'multilingual-e5 vs nomic', '45 dk'],
  ]},
  { week: 14, slug: '14', weekTitle: 'API ile Üretken YZ + Capstone', items: [
    ['hafta14_aistudio_ilk_api.ipynb', 'Google AI Studio + Gemini API', 'Hello world + streaming', '30 dk'],
    ['hafta14_openrouter_uc_model.ipynb', 'OpenRouter — 100+ Model', 'Tek API ile model değiştir', '35 dk'],
    ['hafta14_streamlit_kisisel_asistan.ipynb', 'Streamlit Kişisel Asistan', '50 satırda canlı uygulama', '45 dk'],
    ['hafta14_hf_spaces_deploy.ipynb', 'Hugging Face Spaces Deploy', 'Sıfır maliyet yayın', '30 dk'],
    ['hafta14_v0_vercel_nocode.ipynb', 'v0.dev + Vercel No-Code', 'Promptdan ürüne', '25 dk'],
    ['hafta14_capstone_sablon.ipynb', 'Capstone Proje Şablonu', '14 hafta sentezi + sunum', '60 dk'],
  ]},
];

REST_WEEKS_DATA.forEach(rw => {
  WEEKS.push({
    week: rw.week, slug: rw.slug, weekTitle: rw.weekTitle,
    notebooks: buildBasicNotebooks(rw.week, rw.slug, rw.weekTitle, rw.items),
  });
});

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
function main() {
  const outputBase = path.join(__dirname, 'notebooks');
  if (!fs.existsSync(outputBase)) fs.mkdirSync(outputBase, { recursive: true });

  let total = 0;
  console.log(`\n📓 Üretken YZ Atölyesi · Aurora notebook üretimi → ${outputBase}\n`);

  for (const week of WEEKS) {
    const weekDir = path.join(outputBase, `hafta${week.slug}`);
    if (!fs.existsSync(weekDir)) fs.mkdirSync(weekDir, { recursive: true });

    for (const nb of week.notebooks) {
      const opts = {
        ...nb.opts,
        weekId: week.week,
        weekTitle: week.weekTitle,
        sectionLabel: SECTION_LABELS[week.week],
        color: SECTION_COLORS[week.week],
      };
      const nbObj = richGuideNotebook(opts);
      const filepath = path.join(weekDir, nb.filename);
      fs.writeFileSync(filepath, JSON.stringify(nbObj, null, 1), 'utf-8');
      const size = (fs.statSync(filepath).size / 1024).toFixed(1);
      console.log(`  ✓ Hafta ${String(week.week).padStart(2)} · ${nb.filename} (${size} KB)`);
      total++;
    }
  }
  console.log(`\n✅ ${total} notebook üretildi (${WEEKS.length} hafta) — Aurora HTML header/footer + TR/EN promptlar + docs referansları.\n`);
}

main();
