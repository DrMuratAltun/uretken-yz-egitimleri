# ECS - Veri Bilimi ve Yapay Zeka Uzmanlığı Programı
## Haftalık Eğitim İzlencesi (90 Saat / 15 Hafta)

**Eğitmen:** Dr. Murat Altun
**Platform:** Google Colab (Jupyter Notebook)
**Süre:** Haftada 6 saat (3+3 veya 2+2+2)
**Değerlendirme:** GitHub Portföyü (%30) + Final Sınavı (%30) + Capstone Projesi (%40)

---

## BÖLÜM 1: VERİ BİLİMİ TEMELLERİ (24 Saat — Hafta 1-4)

---

### HAFTA 1: Veri Bilimi Ekosistemi ve Python Temelleri (6 Saat)
**Modül 1 — Bölüm A**

#### Konu Başlıkları
- Veri bilimi nedir? Neden önemli? Kariyer yolları
- Google Colab arayüz tanıtımı (hücre türleri, çalıştırma, kaydetme)
- Jupyter Notebook mantığı
- Python temelleri: Değişkenler, veri tipleri (str, int, float, bool)
- Operatörler (aritmetik, karşılaştırma, mantıksal)
- `input()` ile kullanıcıdan veri alma, `print()` ile çıktı verme
- Listeler, Tuple, Sözlükler (Dictionary), Set
- Döngüler: `for`, `while`, `range()`
- Karar yapıları: `if`, `elif`, `else`
- Fonksiyon tanımlama: `def`, parametreler, `return`
- GitHub hesabı açma, repo oluşturma, temel `commit`/`push`

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta01_python_temel.ipynb` | Değişkenler, veri tipleri, operatörler, listeler, sözlükler |
| 2 | `hafta01_vki_hesaplayici.ipynb` | Vücut Kitle İndeksi hesaplayıcı (input + if-else) |
| 3 | `hafta01_sayi_tahmin_oyunu.ipynb` | Sayı tahmin oyunu (while döngüsü + random) |

#### Kaynaklar
- **Kitap:** "Python — Herkes İçin Python Programlama Dili" (Dr. Murat Altun)
- **Video:** Google Colab resmi başlangıç rehberi
- **Doküman:** Python Resmi Tutorial (docs.python.org/3/tutorial/)
- **Cheatsheet:** Python temel veri tipleri ve operatörler

#### Ödev
- GitHub hesabı açıp ilk repo oluşturma
- 3 farklı fonksiyon yazma (sıcaklık çevirici, alan hesaplama, not ortalaması)
- Notebook'ları GitHub'a yükleme

---

### HAFTA 2: NumPy ve Pandas ile Keşifsel Veri Analizi (EDA) (6 Saat)
**Modül 2**

#### Konu Başlıkları
- NumPy: Array oluşturma, temel işlemler, istatistik fonksiyonları
- Pandas: Series ve DataFrame kavramları
- CSV/Excel dosya okuma: `pd.read_csv()`, `pd.read_excel()`
- Veri seçme: `.loc[]`, `.iloc[]`, koşullu filtreleme
- Temel EDA: `.info()`, `.describe()`, `.shape`, `.dtypes`, `.value_counts()`
- Eksik veri analizi: `.isnull()`, `.fillna()`, `.dropna()`
- Veri manipülasyonu: Filtreleme, sıralama (`.sort_values()`), `.groupby()` ile özet tablolar
- Yeni sütun oluşturma, `apply()` ve `lambda`

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta02_numpy_pandas_temel.ipynb` | NumPy array işlemleri + Pandas DataFrame temelleri |
| 2 | `hafta02_bahsis_analizi.ipynb` | Restaurant Tips veri seti analizi (Seaborn tips dataset) |
| 3 | `hafta02_titanic_eda.ipynb` | Titanic veri seti ile EDA (filtreleme, gruplama, eksik veri) |

#### Veri Setleri
- `tips` — Seaborn kütüphanesinden (`sns.load_dataset('tips')`)
- `titanic` — Seaborn kütüphanesinden (`sns.load_dataset('titanic')`)
- `supermarket.csv` — Süpermarket satış verisi (mevcut)

#### Kaynaklar
- **Colab:** Pandas EDA Uygulaması (colab.research.google.com/drive/1SEdT7LGa3igOlRpG8bfPugKmTnHq9pYB)
- **Doküman:** Pandas Resmi Doküman (pandas.pydata.org/docs/)
- **Doküman:** NumPy Resmi Doküman (numpy.org/doc/)
- **Cheatsheet:** Pandas temel fonksiyonlar tablosu

#### Ödev
- Supermarket veri setini yükleyip 10 farklı EDA sorusu cevaplama
- Titanic verisinde cinsiyet ve sınıfa göre hayatta kalma oranlarını hesaplama

---

### HAFTA 3: Veri Görselleştirme ve Hikayeleştirme (6 Saat)
**Modül 3**

#### Konu Başlıkları
- Matplotlib temelleri: `plt.plot()`, `plt.bar()`, `plt.scatter()`, `plt.hist()`, `plt.pie()`
- Grafik özelleştirme: Başlık, eksen etiketi, renk, boyut, grid
- `plt.subplots()` ile çoklu grafik
- Seaborn: `sns.countplot()`, `sns.boxplot()`, `sns.heatmap()`, `sns.pairplot()`
- Korelasyon matrisi ve Heatmap
- Bar Chart Race (Yarışan grafikler): `bar_chart_race` kütüphanesi
- Oto-EDA araçları: Sweetviz, YData-Profiling (tek satırda tam rapor)

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta03_matplotlib_seaborn.ipynb` | Temel grafik türleri ve Seaborn ile ileri görselleştirme |
| 2 | `hafta03_covid_yarisan_grafik.ipynb` | Corona vaka sayıları ile Bar Chart Race animasyonu |
| 3 | `hafta03_supermarket_gorsellestirme.ipynb` | Süpermarket satış verisi görselleştirme |
| 4 | `hafta03_google_trends.ipynb` | Google Trends API ile anahtar kelime analizi |

#### Veri Setleri
- COVID-19 verileri: Johns Hopkins CSSE (github.com/CSSEGISandData/COVID-19) veya `covid19_confirmed_global.csv`
- `supermarket.csv` (mevcut)
- Google Trends: `pytrends` kütüphanesi ile canlı veri çekme

#### Kütüphaneler
```
pip install matplotlib seaborn bar_chart_race sweetviz ydata-profiling pytrends
```

#### Kaynaklar
- **Doküman:** Matplotlib Gallery (matplotlib.org/stable/gallery/)
- **Doküman:** Seaborn Tutorial (seaborn.pydata.org/tutorial.html)
- **Video:** Bar Chart Race oluşturma rehberi

#### Ödev
- Seçilen bir veri setinde en az 5 farklı grafik türü ile analiz raporu hazırlama
- Sweetviz ile otomatik EDA raporu üretme

---

### HAFTA 4: İstatistiksel Analiz ve A/B Testleri (6 Saat)
**Modül 4**

#### Konu Başlıkları
- Tanımlayıcı istatistik: Ortalama, medyan, mod, standart sapma, varyans
- Normal dağılım ve normallik testleri (Shapiro-Wilk)
- Korelasyon analizi: Pearson, Spearman
- Hipotez testleri kavramı: H0, H1, p-value, anlamlılık düzeyi (alpha=0.05)
- T-Test (bağımsız iki grup karşılaştırma)
- ANOVA (ikiden fazla grup karşılaştırma)
- Chi-Square (Ki-Kare) bağımsızlık testi
- Güven aralıkları
- A/B testi metodolojisi

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta04_istatistik_temel.ipynb` | Tanımlayıcı istatistik, normallik, korelasyon |
| 2 | `hafta04_ab_testi.ipynb` | Mobil oyun A/B testi (Geçilebilir vs Ödüllü Reklam) |
| 3 | `hafta04_chi_square.ipynb` | Titanic: Bilet sınıfı vs hayatta kalma bağımsızlık testi |

#### Veri Setleri
- `titanic` (Seaborn)
- A/B test verisi (sentetik olarak üretilecek)
- `tips` (Seaborn — istatistik uygulamaları için)

#### Kütüphaneler
```
from scipy import stats  # ttest_ind, f_oneway, chi2_contingency, shapiro
import statsmodels.api as sm
```

#### Kaynaklar
- **Kitap:** "Yapay Zeka ve Makine Öğrenmesi" (MEB Ders Kitabı, 11-12. sınıf)
- **Doküman:** SciPy Stats (docs.scipy.org/doc/scipy/reference/stats.html)
- **Makale:** A/B Testi nedir? Uygulamalı rehber

#### Ödev
- Kendi oluşturdukları bir A/B test senaryosu tasarlama ve analiz etme
- Titanic verisinde 3 farklı hipotez testi uygulama

---

## BÖLÜM 2: MAKİNE ÖĞRENMESİ UZMANLIĞI (30 Saat — Hafta 5-9)

---

### HAFTA 5: Makine Öğrenmesi I — Regresyon (6 Saat)
**Modül 5**

#### Konu Başlıkları
- Makine öğrenmesi nedir? Denetimli vs denetimsiz öğrenme
- Regresyon problemi tanımı
- Basit Lineer Regresyon: Matematik ve Python uygulaması
- Çoklu Lineer Regresyon
- Polinom Regresyon
- Train/Test Split: `train_test_split()`
- Başarı metrikleri: MAE, MSE, RMSE, R2 skoru
- Feature Engineering temelleri: Label Encoding, One-Hot Encoding
- Scikit-learn pipeline mantığı
- Model kaydetme: joblib
- **Deployment:** Streamlit ve Gradio ile model arayüzü oluşturma
- Hugging Face Spaces üzerinde model yayınlama

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta05_lineer_regresyon.ipynb` | Basit ve çoklu lineer regresyon temelleri |
| 2 | `hafta05_arac_fiyat_tahmini.ipynb` | Araç fiyat tahmini (cars.xls verisi) |
| 3 | `hafta05_ev_fiyat_tahmini.ipynb` | House Price Prediction (Kaggle veri seti) |
| 4 | `hafta05_gradio_deployment.ipynb` | Gradio ile model arayüzü + HF Spaces deploy |

#### Veri Setleri
- `cars.xls` (mevcut — araç verileri)
- California Housing (`sklearn.datasets`)
- House Prices - Advanced (Kaggle yarışması)

#### Kütüphaneler
```
pip install scikit-learn gradio streamlit joblib
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.pipeline import Pipeline
```

#### Kaynaklar
- **Kaggle:** House Prices yarışma sayfası
- **Doküman:** Scikit-learn Regression (scikit-learn.org/stable/supervised_learning.html)
- **Doküman:** Gradio Quickstart (gradio.app/guides/quickstart)
- **Doküman:** Hugging Face Spaces (huggingface.co/docs/hub/spaces)

#### Ödev
- Araç fiyat tahmin modelini Gradio ile sarmalayıp Hugging Face'e yükleme
- Link'i GitHub repo README'sine ekleme

---

### HAFTA 6: Makine Öğrenmesi II — Sınıflandırma ve Kaggle (6 Saat)
**Modül 6**

#### Konu Başlıkları
- Sınıflandırma problemi tanımı (Binary ve Multi-class)
- Lojistik Regresyon
- K-Nearest Neighbors (KNN)
- Decision Tree (Karar Ağacı)
- Confusion Matrix: TP, TN, FP, FN
- Metrikler: Accuracy, Precision, Recall, F1-Score
- ROC Eğrisi ve AUC skoru
- Cross Validation (Çapraz Doğrulama)
- **Kaggle Kültürü:** Hesap açma, Notebook kullanımı, veri seti indirme, Submission yapma

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta06_siniflandirma_temel.ipynb` | Logistic Regression, KNN, Decision Tree karşılaştırma |
| 2 | `hafta06_titanic_kaggle.ipynb` | Titanic Survival Prediction — Kaggle submission |
| 3 | `hafta06_diyabet_teshisi.ipynb` | Pima Indians Diabetes — klinik veriden hastalık tahmini |

#### Veri Setleri
- Titanic - Machine Learning from Disaster (Kaggle yarışması)
- Pima Indians Diabetes (Kaggle)

#### Kütüphaneler
```
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve
from sklearn.model_selection import cross_val_score
```

#### Kaynaklar
- **Kaggle:** Titanic yarışma sayfası ve "Getting Started" rehberi
- **Doküman:** Scikit-learn Classification (scikit-learn.org/stable/modules/classes.html)
- **Video:** Kaggle'da ilk submission nasıl yapılır?

#### Ödev
- Kaggle Titanic yarışmasına submission yapma ve Leaderboard skor paylaşma
- Diyabet veri setinde en az 3 algoritma karşılaştırma raporu

---

### HAFTA 7: İleri Makine Öğrenmesi ve Ensemble Modeller (6 Saat)
**Modül 7**

#### Konu Başlıkları
- Ensemble Learning nedir? Bagging vs Boosting
- Random Forest (rastgele orman)
- Gradient Boosting: XGBoost, LightGBM
- Feature Importance (özellik önemi)
- Hiperparametre Optimizasyonu: GridSearchCV, RandomizedSearchCV
- Overfitting (aşırı öğrenme) ve Regularization
- Model karşılaştırma ve seçim stratejileri

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta07_ensemble_modeller.ipynb` | Random Forest, XGBoost, LightGBM karşılaştırma |
| 2 | `hafta07_musteri_terk_analizi.ipynb` | Telekom Churn Prediction (XGBoost) |
| 3 | `hafta07_hiperparametre_avi.ipynb` | GridSearch ile optimal parametre bulma |

#### Veri Setleri
- Telco Customer Churn (Kaggle)
- Titanic (Kaggle — önceki haftadan devam, skor iyileştirme)

#### Kütüphaneler
```
pip install xgboost lightgbm
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
```

#### Kaynaklar
- **Doküman:** XGBoost Docs (xgboost.readthedocs.io/)
- **Doküman:** LightGBM Docs (lightgbm.readthedocs.io/)
- **Kaggle:** Yarışmalarda kullanılan en iyi modeller (kazanan notebook'lar)

#### Ödev
- Telco Churn verisinde XGBoost modeli eğitip %85+ accuracy hedefleme
- Hiperparametre optimizasyonu öncesi/sonrası sonuçları karşılaştırma raporu

---

### HAFTA 8: Denetimsiz Öğrenme, Zaman Serileri ve Öneri Sistemleri (6 Saat)
**Modül 8**

#### Konu Başlıkları
- Denetimsiz öğrenme nedir?
- K-Means Kümeleme: Elbow Method, Silhouette Score
- Müşteri segmentasyonu
- Zaman serileri kavramı: Trend, mevsimsellik, durağanlık
- Facebook Prophet ile zaman serisi tahmini
- Öneri sistemleri (Recommendation Systems): Content-based vs Collaborative Filtering
- Kullanıcı-Ürün matrisi, Cosine Similarity

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta08_kmeans_segmentasyon.ipynb` | Müşteri segmentasyonu (RFM + K-Means) |
| 2 | `hafta08_zaman_serisi_prophet.ipynb` | Ürün satış tahmini (Prophet) |
| 3 | `hafta08_film_oneri_sistemi.ipynb` | Film öneri sistemi (Collaborative Filtering) |

#### Veri Setleri
- Mall Customer Segmentation (Kaggle)
- Adidas US Sales (Kaggle) veya sentetik satış verisi
- MovieLens 100K (grouplens.org/datasets/movielens/100k/)

#### Kütüphaneler
```
pip install prophet scikit-surprise
from sklearn.cluster import KMeans
from prophet import Prophet
from surprise import SVD, Dataset, Reader
```

#### Kaynaklar
- **Doküman:** Prophet Docs (facebook.github.io/prophet/)
- **Doküman:** Surprise Library (surpriselib.com/)
- **Kaggle:** Customer Segmentation örnekleri

#### Ödev
- Mall Customer verisinde 3-5 segment oluşturup her segmenti isimlendirme
- MovieLens verisinde basit bir öneri sistemi kurma

---

### HAFTA 9: MLOps Temelleri ve Veri Bilimi Capstone Projesi (6 Saat)
**Modül 9**

#### Konu Başlıkları
- MLOps nedir? Model yaşam döngüsü
- Model Serialization: joblib ile model kaydetme/yükleme
- Streamlit ile interaktif dashboard oluşturma
- Hugging Face Spaces'a model deploy etme
- Proje yönetimi: README yazma, portfolio hazırlama
- Capstone proje sunumu ve değerlendirme

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta09_mlops_pipeline.ipynb` | Model eğitim - kaydetme - yükleme - tahmin pipeline |
| 2 | `hafta09_streamlit_app.py` | Streamlit ile interaktif ML uygulaması |
| 3 | `hafta09_capstone_sablon.ipynb` | Capstone proje şablonu (veri-model-sunum) |

#### Capstone Proje Önerileri (Bölüm 1 Finali)
- **Airbnb Fiyatlandırma:** Listing özelliklerinden fiyat tahmini
- **Trendyol Yorum Analizi:** Ürün yorumlarından sentiment analizi
- **Spotify Şarkı Popülerlik Tahmini:** Şarkı özelliklerinden popülerlik skoru
- **Serbest Konu:** Katılımcının seçtiği bir veri seti ile uçtan uca proje

#### Kütüphaneler
```
pip install streamlit
import joblib
import streamlit as st
```

#### Kaynaklar
- **Doküman:** Streamlit Docs (docs.streamlit.io/)
- **Doküman:** Hugging Face Spaces (huggingface.co/docs/hub/spaces-overview)
- **Şablon:** Proje sunumu için PowerPoint/Google Slides şablonu

#### Ödev (CAPSTONE — 1 hafta ek süre)
- Seçilen veri seti ile uçtan uca proje:
  1. Veri toplama ve temizleme
  2. EDA ve görselleştirme
  3. Model eğitimi ve değerlendirme
  4. Streamlit/Gradio ile arayüz
  5. Hugging Face Spaces'a deploy
  6. GitHub repo'suna README ile yükleme

---

## BÖLÜM 3: YAPAY ZEKA MÜHENDİSLİĞİNE GİRİŞ (36 Saat — Hafta 10-15)

---

### HAFTA 10: Derin Öğrenmeye Giriş ve Yapay Sinir Ağları (6 Saat)
**Modül 10**

#### Konu Başlıkları
- Biyolojik nörondan yapay nörona
- Yapay Sinir Ağları (ANN) mimarisi: Input, Hidden, Output katmanları
- Aktivasyon fonksiyonları: ReLU, Sigmoid, Softmax
- İleri yayılım (Forward Propagation) ve geri yayılım (Backpropagation)
- Loss fonksiyonları ve Optimizer'lar (SGD, Adam)
- TensorFlow ve Keras'a giriş
- `Sequential` model oluşturma
- Epoch, Batch Size, Learning Rate kavramları
- "Black Box" modelleri anlamak
- Overfitting önleme: Dropout, Early Stopping

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta10_ann_temel.ipynb` | İlk yapay sinir ağı (MNIST el yazısı rakam tanıma) |
| 2 | `hafta10_quickdraw.ipynb` | Google QuickDraw veri seti ile çizim tanıma |
| 3 | `hafta10_ann_regresyon.ipynb` | ANN ile ev fiyat tahmini (klasik ML ile karşılaştırma) |

#### Veri Setleri
- MNIST: `tf.keras.datasets.mnist`
- Google QuickDraw Dataset (quickdraw.withgoogle.com/data)
- California Housing: `sklearn.datasets.fetch_california_housing()`

#### Kütüphaneler
```
pip install tensorflow
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
```

#### Kaynaklar
- **Doküman:** TensorFlow/Keras Tutorials (tensorflow.org/tutorials)
- **Playground:** TensorFlow Playground (playground.tensorflow.org/)
- **Video:** 3Blue1Brown — Neural Networks serisi

#### Ödev
- MNIST modelinin doğruluğunu %98+ yapma denemesi
- QuickDraw'dan seçilen 10 kategori ile çizim tanıma modeli eğitme

---

### HAFTA 11: Görüntü İşlemenin Temelleri ve OpenCV (6 Saat)
**Modül 11**

#### Konu Başlıkları
- Dijital görüntü nedir? Piksel, kanal (RGB, Grayscale) kavramları
- OpenCV kurulumu ve temel fonksiyonlar
- Görüntü okuma/yazma: `cv2.imread()`, `cv2.imwrite()`
- Renk dönüştürme: BGR - RGB, BGR - Grayscale, BGR - HSV
- Görüntü boyutlandırma: `cv2.resize()`
- Temel filtreler: Blur, Gaussian Blur, Median Blur
- Kenar tespiti: Canny Edge Detection
- Şekil çizme: `cv2.rectangle()`, `cv2.circle()`, `cv2.line()`
- Metin ekleme: `cv2.putText()`
- Görüntü eşikleme (Thresholding)
- Kontur (Contour) tespiti

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta11_opencv_temel.ipynb` | Görüntü okuma, renk kanalları, renk dönüştürme |
| 2 | `hafta11_filtreler_kenar.ipynb` | Filtreler, kenar tespiti, eşikleme |
| 3 | `hafta11_sekil_metin.ipynb` | Şekil çizme, metin ekleme, kontur tespiti |

#### Veri Setleri / Görseller
- Örnek görseller (internet üzerinden veya kendi çekilen fotoğraflar)
- OpenCV ile webcam'den canlı görüntü (isteğe bağlı)

#### Kütüphaneler
```
pip install opencv-python-headless
import cv2
import numpy as np
from matplotlib import pyplot as plt
```

#### Kaynaklar
- **Doküman:** OpenCV Python Tutorial (docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)
- **Kitap:** "OpenCV ile Bilgisayarlı Görü" referansları

#### Ödev
- 5 farklı filtre uygulanmış görüntü kolajı oluşturma
- Bir görüntüdeki belirli renkteki nesneleri HSV ile tespit etme

---

### HAFTA 12: Bilgisayarlı Görü ve Transfer Learning (6 Saat)
**Modül 12**

#### Konu Başlıkları
- Evrişimli Sinir Ağları (CNN) mimarisi: Conv2D, MaxPool, Flatten, Dense
- CNN'in görüntüyü nasıl "gördüğü": Filtre/Kernel kavramı
- Transfer Learning nedir? Neden önemli?
- Önceden eğitilmiş modeller: VGG16, ResNet50, MobileNet
- Fine-tuning vs Feature Extraction
- Data Augmentation (veri artırma): `ImageDataGenerator`
- Model değerlendirme: Accuracy, Loss grafikleri

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta12_cnn_temel.ipynb` | Sıfırdan CNN ile CIFAR-10 sınıflandırma |
| 2 | `hafta12_transfer_learning.ipynb` | MobileNet ile Kedi/Köpek sınıflandırma (az veri, yüksek başarı) |
| 3 | `hafta12_maske_tespiti.ipynb` | CNN ile maskeli/maskesiz yüz ayrımı |

#### Veri Setleri
- CIFAR-10: `tf.keras.datasets.cifar10`
- Dogs vs Cats (Kaggle)
- Face Mask Detection (Kaggle)

#### Kütüphaneler
```
from tensorflow.keras.applications import MobileNetV2, VGG16, ResNet50
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
```

#### Kaynaklar
- **Doküman:** Keras Applications (keras.io/api/applications/)
- **Tutorial:** Transfer Learning Guide (tensorflow.org/tutorials/images/transfer_learning)
- **Kaggle:** Dogs vs Cats yarışma notebook'ları

#### Ödev
- Kendi seçtiği 2 kategorili görüntü veri seti ile Transfer Learning modeli eğitme
- Accuracy %90+ hedefleme

---

### HAFTA 13: Doğal Dil İşleme (NLP) ve Hugging Face Ekosistemi (6 Saat)
**Modül 13**

#### Konu Başlıkları
- NLP nedir? Metin verisinin önemi
- Metin ön işleme: Tokenization, Stemming, Lemmatization, Stop Words
- Bag of Words (BoW) ve TF-IDF
- Word Embeddings: Word2Vec kavramı
- Hugging Face Transformers kütüphanesi
- Önceden eğitilmiş modeller: BERT, DistilBERT
- `pipeline()` ile hazır NLP görevleri: Sentiment Analysis, NER, Summarization, Translation
- Duygu analizi (Sentiment Analysis) uygulaması
- Türkçe NLP: `dbmdz/bert-base-turkish-cased`

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta13_nlp_temel.ipynb` | Metin ön işleme, BoW, TF-IDF |
| 2 | `hafta13_duygu_analizi.ipynb` | Twitter/X duygu analizi (HuggingFace pipeline) |
| 3 | `hafta13_spam_tespiti.ipynb` | SMS Spam tespiti (NLP + ML) |

#### Veri Setleri
- Twitter Sentiment140 (Kaggle)
- SMS Spam Collection (Kaggle)
- Türkçe tweet veri setleri (varsa)

#### Kütüphaneler
```
pip install transformers nltk
from transformers import pipeline
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
```

#### Kaynaklar
- **Doküman:** Hugging Face Docs (huggingface.co/docs/transformers/)
- **Model Hub:** Hugging Face Model Hub (huggingface.co/models)
- **Doküman:** NLTK Book (nltk.org/book/)

#### Ödev
- 1000+ tweet üzerinde duygu analizi yapıp sonuçları görselleştirme
- SMS spam tespiti modelini eğitip başarı raporu hazırlama

---

### HAFTA 14: Generative AI, LLM ve Prompt Mühendisliği (6 Saat)
**Modül 14**

#### Konu Başlıkları
- Büyük Dil Modelleri (LLM) nedir? GPT, Gemini, Claude mimarisi
- Transformer mimarisi temelleri (Attention mekanizması)
- Prompt Engineering: Zero-shot, Few-shot, Chain-of-Thought
- Google Gemini API kullanımı (`google-generativeai` SDK)
- Sistem prompt'u ve persona oluşturma
- Yapısal çıktı (JSON) üretme
- RAG (Retrieval-Augmented Generation) giriş kavramı
- Embedding ve vektör veritabanı kavramı
- LangChain tanıtımı (isteğe bağlı)

#### Uygulamalar (Notebook Dosyaları)
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta14_gemini_api.ipynb` | Google Gemini API temel kullanım |
| 2 | `hafta14_kisisel_asistan.ipynb` | Persona ile chatbot oluşturma (Gemini) |
| 3 | `hafta14_blog_yazari.ipynb` | Otomatik SEO uyumlu blog yazarı |
| 4 | `hafta14_rag_giris.ipynb` | Basit RAG sistemi (doküman - embedding - sorgu) |

#### API Gereksinimleri
- Google Gemini API Key (Google AI Studio: aistudio.google.com)
- Model: `gemini-2.5-flash` (varsayılan)

#### Kütüphaneler
```
pip install google-generativeai chromadb langchain
import google.generativeai as genai
```

#### Kaynaklar
- **Doküman:** Google AI for Developers (ai.google.dev/docs)
- **Doküman:** Prompt Engineering Guide (promptingguide.ai/)
- **Araç:** Google AI Studio (aistudio.google.com/)

#### Ödev
- Kendi alanlarına özel bir chatbot oluşturma (eğitim, sağlık, hukuk vb.)
- 10 farklı prompt tekniği deneyip karşılaştırma raporu

---

### HAFTA 15: AI Etik, Gelecek ve AI Capstone Projesi (6 Saat)
**Modül 15**

#### Konu Başlıkları
- Yapay zeka etiği: Bias (yanlılık), fairness, transparency
- Sorumlu AI geliştirme ilkeleri
- AI regülasyonları: EU AI Act
- AI'ın geleceği: AGI, multimodal modeller, otonom ajanlar
- Yapay zeka kariyer yolları
- Capstone proje sunumları ve değerlendirme

#### AI Capstone Proje Seçenekleri
| # | Proje | Teknolojiler |
|---|-------|-------------|
| 1 | **Akıllı Fitness Asistanı** | OpenCV + MediaPipe ile hareket sayma |
| 2 | **Film Öneri Sistemi** | Collaborative Filtering + GenAI (ruh haline göre öneri) |
| 3 | **Kurumsal Bilgi Botu** | RAG + Gemini API (şirket dokümanları üzerinde soru-cevap) |
| 4 | **Görüntü Sınıflandırıcı** | Transfer Learning + Gradio arayüz |
| 5 | **Serbest Proje** | Katılımcının seçimi |

#### Capstone Proje Notebook'u
| # | Notebook | Açıklama |
|---|----------|----------|
| 1 | `hafta15_capstone_sablon.ipynb` | AI Capstone proje şablonu |
| 2 | `hafta15_ai_etik.ipynb` | AI bias analizi ve fairness metrikleri |

#### Capstone Değerlendirme Kriterleri
- **Teknik Derinlik (40%):** Model kalitesi, kod düzeni, pipeline
- **Sunum (20%):** Slayt kalitesi, anlatım, demo
- **Yenilikçilik (20%):** Özgün yaklaşım, problem seçimi
- **Deploy (20%):** Canlıya alınmış mı? (Streamlit/HF Spaces/Gradio)

#### Kaynaklar
- **Makale:** EU AI Act Summary (artificialintelligenceact.eu/)
- **Kitap/Doküman:** "Responsible AI Practices" — Google AI
- **Video:** AI etiği ve toplumsal etki belgeselleri

---

## GENEL KAYNAKLAR VE ARAÇLAR

### Temel Platformlar
| Platform | Amaç | Link |
|----------|------|------|
| Google Colab | Notebook çalıştırma | colab.research.google.com |
| Kaggle | Yarışma ve veri setleri | kaggle.com |
| GitHub | Kod portföyü | github.com |
| Hugging Face | Model ve Spaces | huggingface.co |
| Google AI Studio | Gemini API | aistudio.google.com |

### Tüm Kütüphaneler (Kurulum Listesi)
```
# Temel
pip install numpy pandas matplotlib seaborn

# Görselleştirme
pip install bar_chart_race sweetviz ydata-profiling pytrends plotly

# İstatistik
pip install scipy statsmodels

# Makine Öğrenmesi
pip install scikit-learn xgboost lightgbm scikit-surprise

# Derin Öğrenme
pip install tensorflow

# Görüntü İşleme
pip install opencv-python-headless mediapipe

# NLP
pip install transformers nltk

# Generative AI
pip install google-generativeai chromadb langchain

# Deployment
pip install gradio streamlit

# Zaman Serisi
pip install prophet

# Yardımcı
pip install joblib openpyxl
```

### Kitaplar (Dr. Murat Altun Önerisi)
1. Python — Herkes İçin Python Programlama Dili
2. Yapay Zeka ve Makine Öğrenmesi (MEB 11-12. Sınıf)

### Haftalık Zaman Planı Özeti

| Hafta | Modül | Bölüm | Ana Konu |
|-------|-------|-------|----------|
| 1 | M1 | VB Temelleri | Python Temelleri + GitHub |
| 2 | M2 | VB Temelleri | NumPy, Pandas, EDA |
| 3 | M3 | VB Temelleri | Görselleştirme (Matplotlib, Seaborn, Bar Chart Race) |
| 4 | M4 | VB Temelleri | İstatistik, Hipotez Testleri, A/B Test |
| 5 | M5 | ML Uzmanlığı | Regresyon + Deployment (Gradio, HF Spaces) |
| 6 | M6 | ML Uzmanlığı | Sınıflandırma + Kaggle |
| 7 | M7 | ML Uzmanlığı | Ensemble (XGBoost, LightGBM) + Hiperparametre |
| 8 | M8 | ML Uzmanlığı | Kümeleme, Zaman Serileri, Öneri Sistemleri |
| 9 | M9 | ML Uzmanlığı | MLOps + DS Capstone Projesi |
| 10 | M10 | YZ Mühendisliği | Derin Öğrenme + ANN (TensorFlow/Keras) |
| 11 | M11 | YZ Mühendisliği | OpenCV + Görüntü İşleme |
| 12 | M12 | YZ Mühendisliği | CNN + Transfer Learning |
| 13 | M13 | YZ Mühendisliği | NLP + Hugging Face |
| 14 | M14 | YZ Mühendisliği | Generative AI + Gemini API + Prompt Engineering |
| 15 | M15 | YZ Mühendisliği | AI Etik + AI Capstone Projesi |

---

**Not:** Bu izlence, her hafta 6 saatlik canlı ders + haftalık 3-4 saat bireysel çalışma üzerine planlanmıştır. Notebook dosyaları Google Colab üzerinde çalıştırılacak ve GitHub'a yüklenecektir.
