# Drive Yükleme Rehberi — Eğitmen İçin

> **Bu rehber Dr. Murat Altun (eğitmen) içindir.**
> PPTX'leri ve Jupyter notebook'ları Drive'a yükleyip, sadece görüntüleme izniyle katılımcılarla paylaşmak için izle.

---

## Mantık (Neden Drive?)

- **Tek elden kontrol:** Drive'da düzenle → site otomatik yansıtır
- **Sadece görüntüleme izni:** Başkaları içeriğini değiştiremez
- **Repo public olsa bile içerik Drive'da:** Klon riski yok

Bu, VB-YZ-90 → uretken-yz-egitimleri patern'inin temel kuralı. **Asla repo'ya commit etme.**

---

## A. Sunumlar (PPTX → Drive Preview)

### 1. PPTX'leri üret (lokal)

```bash
cd /Users/drmurataltun/Documents/uretken-yz-egitimleri
node gen_uretken_pptx.js
# → sunumlar/hafta01_uretken_yzye_giris.pptx … hafta14_*.pptx
```

### 2. Drive klasörü hazırla

1. Drive'da `Üretken YZ Atölyesi · Sunumlar` klasörü aç
2. Klasör paylaşım: **"Bağlantısı olan herkes" + "Görüntüleyici"**
3. 14 PPTX'i klasöre yükle

### 3. Her PPTX'in ID'sini al

Bir PPTX'e sağ tık → "Bağlantı al" → URL'den ID kısmını kopyala:

```
https://drive.google.com/file/d/1aBcDeFGhIjKlMnOpQrStUvWxYz/view
                                   └─────────── BU KISIM ID ───────────┘
```

### 4. `curriculum.ts`'e ID'yi ekle

[web/src/data/curriculum.ts](web/src/data/curriculum.ts) içinde her hafta nesnesine:

```typescript
{
  id: 1, slug: '01',
  title: 'Üretken YZ\'ye Giriş — Kavramlar, Tarihçe, Etik',
  // ...
  pptxFile: 'hafta01_uretken_yzye_giris.pptx',
  pptxDriveId: '1aBcDeFGhIjKlMnOpQrStUvWxYz',  // ← BU SATIRI EKLE
}
```

### 5. Test et

```bash
cd web && npm run dev
# http://localhost:4321/uretken-yz-egitimleri/hafta/01
```

Sayfada Drive preview iframe'i görünmeli. Görünmezse:
- Drive klasörü "Bağlantısı olan herkes / Görüntüleyici" izninde mi?
- ID doğru mu? (sayfa kaynak kodunda `drive.google.com/file/d/{ID}/preview` URL'i)

---

## B. Notebook'lar (Drive Colab Linki)

### 1. Notebook'ları üret (lokal)

```bash
node gen_uretken_notebooks.js
# → notebooks/hafta01/*.ipynb … hafta14/*.ipynb (toplam 69 dosya)
```

### 2. Drive'a yükle

1. Drive'da `Üretken YZ Atölyesi · Notebooks` klasörü aç
2. Klasör paylaşım: **"Bağlantısı olan herkes" + "Görüntüleyici"**
3. 14 alt klasör (`hafta01/`, `hafta02/`, … `hafta14/`) oluştur
4. Her hafta klasörüne ilgili notebook'ları yükle

### 3. Her notebook'un Drive ID'sini al

Notebook'a sağ tık → "Bağlantı al" → URL'den ID:

```
https://drive.google.com/file/d/1xYz9aBc7DeF.../view
                                   └─────── ID ───────┘
```

### 4. `curriculum.ts`'e Colab Drive linkini ekle

```typescript
notebooks: [
  {
    name: 'hafta01_kavram_haritasi.ipynb',
    desc: 'YZ-ML-DL-GenAI kavram haritası ve interaktif quiz',
    url: 'https://colab.research.google.com/drive/1xYz9aBc7DeF...'  // ← BU SATIRI EKLE
  },
  // ...
]
```

**Not:** `https://colab.research.google.com/github/...` formatını kullanma — bu yapıyı bozar (kontrol senden çıkar).

### 5. Test et

Hafta sayfasında "💻 Notebook" sekmesinde "Colab'da Aç" butonuna tıkla — Colab'da senin Drive'ındaki notebook açılmalı.

---

## C. Otomasyon Önerisi (Opsiyonel)

Eğer çok sayıda dosya varsa, [scripts/curriculum_to_csv.py](scripts/curriculum_to_csv.py) ile Google Sheets sync edebilirsin:

1. `python scripts/curriculum_to_csv.py` → CSV üretir
2. CSV'i Google Sheets'e yükle
3. Sheets'te `pptxDriveId` ve notebook URL kolonlarını doldur
4. `python scripts/update_curriculum_from_csv.py` → CSV'den `curriculum.ts`'e geri yaz

(Bu akış henüz uretken-yz-egitimleri için test edilmedi, gerekirse Claude'a "CSV sync script'lerini bu projeye uyarla" diye söyle.)

---

## D. Hızlı Kontrol Listesi

- [ ] `sunumlar/`, `web/public/sunumlar/`, `notebooks/` klasörleri **`.gitignore`'da** ✓
- [ ] PPTX/PDF/ipynb dosyaları **repo'ya commit edilmedi** ✓
- [ ] `gen_uretken_pptx.js` ve `gen_uretken_notebooks.js` lokalde çalışıyor ✓
- [ ] Drive klasörlerinin paylaşım izni: "Bağlantısı olan herkes / Görüntüleyici" ✓
- [ ] `curriculum.ts`'te `pptxDriveId` ve `notebooks[].url` alanları Drive ID/linkleriyle dolu
- [ ] Lokal `npm run dev` ile her hafta sayfası test edildi
- [ ] `git push` ile canlı yayın güncellendi (GitHub Actions otomatik deploy)

---

## E. İçerik Güncelleme

- **PPTX değiştir:** Drive'da PPTX'i aç → düzenle → kaydet. Site otomatik yeni içeriği gösterir (cache 5-10 dk olabilir).
- **Notebook değiştir:** Drive'da Colab ile aç → düzenle → kaydet. Aynı şekilde otomatik yansır.
- **Yeni hafta ekle:** `curriculum.ts`'e yeni `Week` objesi ekle, `gen_uretken_pptx.js`'in `WEEKS` array'ine de ekle, `node gen_uretken_pptx.js` çalıştır, yeni PPTX'i Drive'a yükle, ID'yi `curriculum.ts`'e bağla.

---

*— Üretken YZ Atölyesi · Prompttan Ürüne · 2026*
