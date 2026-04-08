export const courseData = [
  {
    weekId: "hafta01",
    title: "Hafta 1: Veri Bilimi Ekosistemi ve Python Temelleri",
    module: "Modül 1 — Bölüm A",
    hours: 6,
    topics: [
      {
        id: "vbilimi-nedir",
        title: "1. Veri Bilimi Nedir? Kariyer Yolları",
        content: `
# Veri Bilimi (Data Science) Nedir?

**Veri bilimi**, modern dünyanın en değerli varlığı olan "veriden" anlamlı değerler, öngörüler ve çözümler üretme sanatıdır. Veri bilimi; istatistik, matematik, bilgisayar bilimleri (özellikle Python/R) ve sektör (domain) bilgisini bir araya getiren multidisipliner bir alandır.

## Neden Önemli?
Günümüzde atılan her adım dijital bir iz bırakır. Hastane kayıtları, e-ticaret sitelerindeki tıklamalarımız, sosyal medya beğenilerimiz birer veridir. Şirketler bu veri okyanusunda boğulmamak ve geleceği öngörmek (Örn: Hangi müşteri aboneliğini iptal edecek? Yarın kaç adet ürün satılacak?) için Veri Bilimine ihtiyaç duyar.

## Veri Bilimi Ekosistemindeki Kariyer Yolları
1. **Veri Analisti (Data Analyst):** Verileri toplar, temizler ve geçmişte ne olduğunu anlamak için görselleştirme araçları (PowerBI, Tableau) ile raporlar sunar.
2. **Veri Bilimci (Data Scientist):** Analistin yaptığına ek olarak makine öğrenimi modelleri kurar. "Gelecekte ne olacak?" (Predictive Analysis) sorusuna yanıt arar.
3. **Makine Öğrenmesi Mühendisi (ML Engineer):** Veri bilimcinin kurduğu modelleri, büyük sunucularda ve canlı web projelerinde çalışacak şekilde yazılıma (MLOps) entegre eder.
        `
      },
      {
        id: "python-temelleri",
        title: "2. Python Temelleri (Değişkenler ve Veri Tipleri)",
        content: `
# Python Temelleri

Python, söz dizimi (syntax) okunabilirliği yüksek, İngilizce diline çok yakın, öğrenmesi en kolay ve aynı zamanda yapay zeka dünyasının endüstri standardı haline gelmiş programlama dilidir.

## Değişkenler ve Veri Tipleri

Python'da değişken tanımlarken türünü (type) belirtmenize gerek yoktur (Dinamik tip). Sadece ismini yazıp eşittir ( \`=\` ) koyarak tanımlayabilirsiniz.

\`\`\`python
isim = "Murat"      # Sözel (String - str)
yas = 28            # Tam sayı (Integer - int)
boy = 1.78          # Ondalıklı sayı (Float - float)
ogrenci_mi = True   # Mantıksal (Boolean - bool)
\`\`\`

Python'da türünü merak ettiğiniz bir değişken için \`type()\` fonksiyonunu kullanabilirsiniz:
\`\`\`python
print(type(isim))  # Çıktı: <class 'str'>
\`\`\`

## Operatörler
Python'daki temel matematiksel ve karşılaştırma operatörleri oldukça basittir:
- \`+\` Toplama, \`-\` Çıkarma, \`*\` Çarpma, \`/\` Tam Bölme
- \`//\` Kalansız Bölme (Aşağı yuvarlar)
- \`%\` Mod (Kalanı bulma)
- \`**\` Üs alma (Örn: \`2 ** 3 = 8\`)
- \`==\` Eşittir, \`!=\` Eşit değildir

`
      },
      {
        id: "donguler-karar",
        title: "3. Karar Yapıları ve Döngüler",
        content: `
# Karar Yapıları (if, elif, else)

Kodlarınızın farklı durumlara göre farklı tepkiler vermesini sağlayan mekanizmalardır.
Python'da bloklar, **girintilerle (indentation - boşluk)** belirlenir. Süslü parantez \`{}\` kullanılmaz.

\`\`\`python
sicaklik = 25

if sicaklik > 30:
    print("Hava çok sıcak")
elif sicaklik >= 20:
    print("Hava güzel")
else:
    print("Hava soğuk")
\`\`\`

---

# Döngüler (for ve while)

Belirli bir işlemi defalarca tekrarlamak için kullanılır.

## For Döngüsü ve range()
Belli bir aralık veya liste içinde dönmek için harikadır.
\`\`\`python
for i in range(5): 
    # range(5) fonksiyonu 0,1,2,3,4 üretir.
    print(f"{i}. tur")
\`\`\`

## While Döngüsü
Bir koşul **Doğru (True)** olduğu sürece döngü devam eder.

\`\`\`python
sayac = 0
while sayac < 3:
    print(sayac)
    sayac += 1    # sayac değerini 1 arttır
\`\`\`
`
      },
      {
        id: "fonksiyonlar",
        title: "4. Fonksiyonlar (def)",
        content: `
# Fonksiyonlar

Fonksiyonlar, kod tekrarını önleyen, projenizi parçalara bölen "görev odaklı" yapboz parçalarıdır. 
Python'da \`def\` anahtar kelimesi ile oluşturulur.

\`\`\`python
def kdv_hesapla(fiyat):
    kdv_orani = 0.20
    sonuc = fiyat + (fiyat * kdv_orani)
    return sonuc

# Kullanımı:
alinan_fiyat = 100
kdvli_fiyat = kdv_hesapla(alinan_fiyat)
print(kdvli_fiyat) # 120.0
\`\`\`

## Fonksiyonlarda Return Kullanımı
Bir fonksiyon genelde işlemi bitirdikten sonra bir "sonuç" döndürür. Bu amaçla \`return\` kullanılır. Eğer dışarı bir değer "fırlatması" gerekmiyorsa, sadece işlem yapıyor demektir, bu tip fonksiyonlara \`void\` davranan fonksiyonlar denebilir.
`
      }
    ],
    notebooks: [
      {
        id: "nb-python-temelleri",
        title: "hafta01_python_temel.ipynb",
        description: "Temel değişkenler, listeler, koşullar ve fonksiyon uygulamalarını içeren başlangıç seviyesi pratiği.",
        githubUrl: "https://github.com/drmurataltun/vb-yz-90/blob/main/notebooks/hafta01/hafta01_python_temel.ipynb"
      },
      {
        id: "nb-vki-hesaplayici",
        title: "hafta01_vki_hesaplayici.ipynb",
        description: "input(), if-else ve float hesaplamalarını kullanarak basit bir Vücut Kitle İndeksi ölçüm uygulaması.",
        githubUrl: "https://github.com/drmurataltun/vb-yz-90/blob/main/notebooks/hafta01/hafta01_vki_hesaplayici.ipynb"
      },
      {
        id: "nb-sayi-tahmin",
        title: "hafta01_sayi_tahmin_oyunu.ipynb",
        description: "while döngüsü ve random() metodu kullanarak sonsuz döngülü sayı tahmin oyunu.",
        githubUrl: "https://github.com/drmurataltun/vb-yz-90/blob/main/notebooks/hafta01/hafta01_sayi_tahmin_oyunu.ipynb"
      }
    ]
  },
  {
    weekId: "hafta02",
    title: "Hafta 2: NumPy ve Pandas ile Keşifsel Veri Analizi",
    module: "Modül 2",
    hours: 6,
    topics: [
      {
        id: "numpy-nedir",
        title: "1. NumPy Kütüphanesine Giriş",
        content: "# NumPy Çok Boyutlu Uzay ve Hesaplamalar\\n\\nSıfırdan veri yapılarıyla oynayacağız..."
      }
    ],
    notebooks: []
  }
];
