export interface Week {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  section: string;
  sectionColor: string;
  hours: number;
  topics: string[];
  notebooks: { name: string; desc: string; url?: string }[];
  datasets: string[];
  libraries: string[];
  assignments: string[];
  resources: { label: string; url: string }[];
  pptxFile: string;
}

export function getPdfFileName(pptxFile: string): string {
  return pptxFile.replace('.pptx', '.pdf');
}

export const weeks: Week[] = [
  {
    id: 1,
    slug: '01',
    title: 'Veri Bilimi Ekosistemi ve Python Temelleri',
    subtitle: 'Modül 1 — Bölüm A',
    section: 'VERİ BİLİMİ TEMELLERİ',
    sectionColor: 'bg-accent',
    hours: 6,
    topics: [
      'Veri bilimi nedir? Kariyer yolları',
      'Google Colab arayüz tanıtımı',
      'Python: Değişkenler, veri tipleri (str, int, float, bool)',
      'Operatörler (aritmetik, karşılaştırma, mantıksal)',
      'Listeler, Tuple, Sözlükler, Set',
      'Döngüler: for, while, range()',
      'Karar yapıları: if, elif, else',
      'Fonksiyon tanımlama: def, parametreler, return',
      'GitHub: hesap açma, repo oluşturma, commit/push',
    ],
    notebooks: [
      { name: 'hafta01_python_temel.ipynb', desc: 'Değişkenler, veri tipleri, operatörler, listeler, sözlükler', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta01/hafta01_python_temel.ipynb' },
      { name: 'hafta01_vki_hesaplayici.ipynb', desc: 'Vücut Kitle İndeksi hesaplayıcı (input + if-else)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta01/hafta01_vki_hesaplayici.ipynb' },
      { name: 'hafta01_sayi_tahmin_oyunu.ipynb', desc: 'Sayı tahmin oyunu (while döngüsü + random)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta01/hafta01_sayi_tahmin_oyunu.ipynb' },
      { name: 'ek_python101_giris.ipynb', desc: 'Python giriş alıştırmaları (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta01/ek_python101_giris.ipynb' },
      { name: 'ek_python102_kontrol_yapilari.ipynb', desc: 'Kontrol yapıları ve veri yapıları pratik (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta01/ek_python102_kontrol_yapilari.ipynb' },
      { name: 'ek_python103_fonksiyonlar.ipynb', desc: 'Fonksiyon alıştırmaları (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta01/ek_python103_fonksiyonlar.ipynb' }
    ],
    datasets: [],
    libraries: ['python built-ins'],
    assignments: [
      'GitHub hesabı açıp ilk repo oluşturma',
      '3 farklı fonksiyon yazma (sıcaklık çevirici, alan hesaplama, not ortalaması)',
      'Notebook\'ları GitHub\'a yükleme',
    ],
    resources: [
      { label: 'Python Resmi Tutorial', url: 'https://docs.python.org/3/tutorial/' },
      { label: 'Google Colab Başlangıç', url: 'https://colab.research.google.com/' },
    ],
    pptxFile: 'hafta01_python_temelleri.pptx',
  },
  {
    id: 2,
    slug: '02',
    title: 'NumPy ve Pandas ile Keşifsel Veri Analizi',
    subtitle: 'Modül 2',
    section: 'VERİ BİLİMİ TEMELLERİ',
    sectionColor: 'bg-accent',
    hours: 6,
    topics: [
      'NumPy: Array oluşturma, temel işlemler, istatistik fonksiyonları',
      'Pandas: Series ve DataFrame kavramları',
      'CSV/Excel okuma: pd.read_csv(), pd.read_excel()',
      'Veri seçme: .loc[], .iloc[], koşullu filtreleme',
      'Temel EDA: .info(), .describe(), .shape, .dtypes',
      'Eksik veri analizi: .isnull(), .fillna(), .dropna()',
      'Veri manipülasyonu: filtreleme, sıralama, .groupby()',
      'Yeni sütun oluşturma, apply() ve lambda',
    ],
    notebooks: [
      { name: 'hafta02_numpy_pandas_temel.ipynb', desc: 'NumPy array işlemleri + Pandas DataFrame temelleri', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta02/hafta02_numpy_pandas_temel.ipynb' },
      { name: 'hafta02_bahsis_analizi.ipynb', desc: 'Restaurant Tips veri seti analizi', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta02/hafta02_bahsis_analizi.ipynb' },
      { name: 'hafta02_titanic_eda.ipynb', desc: 'Titanic veri seti ile EDA', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta02/hafta02_titanic_eda.ipynb' },
    ],
    datasets: ['tips (Seaborn)', 'titanic (Seaborn)', 'supermarket.csv'],
    libraries: ['numpy', 'pandas'],
    assignments: [
      'Supermarket veri setini yükleyip 10 farklı EDA sorusu cevaplama',
      'Titanic verisinde cinsiyet ve sınıfa göre hayatta kalma oranlarını hesaplama',
    ],
    resources: [
      { label: 'Pandas Dokümantasyon', url: 'https://pandas.pydata.org/docs/' },
      { label: 'NumPy Dokümantasyon', url: 'https://numpy.org/doc/' },
    ],
    pptxFile: 'hafta02_numpy_pandas_eda.pptx',
  },
  {
    id: 3,
    slug: '03',
    title: 'Veri Görselleştirme ve Hikayeleştirme',
    subtitle: 'Modül 3',
    section: 'VERİ BİLİMİ TEMELLERİ',
    sectionColor: 'bg-accent',
    hours: 6,
    topics: [
      'Matplotlib: plot, bar, scatter, hist, pie',
      'Grafik özelleştirme: başlık, eksen, renk, grid',
      'plt.subplots() ile çoklu grafik',
      'Seaborn: countplot, boxplot, heatmap, pairplot',
      'Korelasyon matrisi ve Heatmap',
      'Bar Chart Race: bar_chart_race kütüphanesi',
      'Oto-EDA araçları: Sweetviz, YData-Profiling',
    ],
    notebooks: [
      { name: 'hafta03_matplotlib_seaborn.ipynb', desc: 'Temel grafik türleri ve Seaborn', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta03/hafta03_matplotlib_seaborn.ipynb' },
      { name: 'hafta03_covid_yarisan_grafik.ipynb', desc: 'COVID verileri ile Bar Chart Race', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta03/hafta03_covid_yarisan_grafik.ipynb' },
      { name: 'hafta03_supermarket_gorsellestirme.ipynb', desc: 'Süpermarket satış görselleştirme', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta03/hafta03_supermarket_gorsellestirme.ipynb' },
      { name: 'hafta03_google_trends.ipynb', desc: 'Google Trends API analizi', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta03/hafta03_google_trends.ipynb' },
      { name: 'ek_matplotlib_pratik.ipynb', desc: 'Matplotlib pratik çalışma (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta03/ek_matplotlib_pratik.ipynb' },
      { name: 'ek_iris_gorsellestirme.ipynb', desc: 'Iris veri seti görselleştirme (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta03/ek_iris_gorsellestirme.ipynb' }
    ],
    datasets: ['COVID-19 (Johns Hopkins)', 'supermarket.csv', 'Google Trends (canlı)'],
    libraries: ['matplotlib', 'seaborn', 'bar_chart_race', 'sweetviz', 'ydata-profiling', 'pytrends'],
    assignments: [
      'Seçilen veri setinde en az 5 farklı grafik türü ile analiz raporu',
      'Sweetviz ile otomatik EDA raporu üretme',
    ],
    resources: [
      { label: 'Matplotlib Gallery', url: 'https://matplotlib.org/stable/gallery/' },
      { label: 'Seaborn Tutorial', url: 'https://seaborn.pydata.org/tutorial.html' },
    ],
    pptxFile: 'hafta03_veri_gorsellestirme.pptx',
  },
  {
    id: 4,
    slug: '04',
    title: 'İstatistiksel Analiz ve A/B Testleri',
    subtitle: 'Modül 4',
    section: 'VERİ BİLİMİ TEMELLERİ',
    sectionColor: 'bg-accent',
    hours: 6,
    topics: [
      'Tanımlayıcı istatistik: ortalama, medyan, mod, standart sapma',
      'Normal dağılım ve normallik testleri (Shapiro-Wilk)',
      'Korelasyon: Pearson, Spearman',
      'Hipotez testleri: H0, H1, p-value, alpha=0.05',
      'T-Test (bağımsız iki grup)',
      'ANOVA (ikiden fazla grup)',
      'Chi-Square (Ki-Kare) bağımsızlık testi',
      'A/B testi metodolojisi',
    ],
    notebooks: [
      { name: 'hafta04_istatistik_temel.ipynb', desc: 'Tanımlayıcı istatistik, normallik, korelasyon', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta04/hafta04_istatistik_temel.ipynb' },
      { name: 'hafta04_ab_testi.ipynb', desc: 'Mobil oyun A/B testi', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta04/hafta04_ab_testi.ipynb' },
      { name: 'hafta04_chi_square.ipynb', desc: 'Titanic: sınıf vs hayatta kalma testi', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta04/hafta04_chi_square.ipynb' },
    ],
    datasets: ['titanic (Seaborn)', 'tips (Seaborn)', 'sentetik A/B verisi'],
    libraries: ['scipy', 'statsmodels'],
    assignments: [
      'Kendi A/B test senaryosu tasarlama ve analiz etme',
      'Titanic verisinde 3 farklı hipotez testi uygulama',
    ],
    resources: [
      { label: 'SciPy Stats Dokümantasyon', url: 'https://docs.scipy.org/doc/scipy/reference/stats.html' },
    ],
    pptxFile: 'hafta04_istatistik_ab_testi.pptx',
  },
  {
    id: 5,
    slug: '05',
    title: 'Makine Öğrenmesi I — Regresyon',
    subtitle: 'Modül 5',
    section: 'MAKİNE ÖĞRENMESİ UZMANLIĞI',
    sectionColor: 'bg-secondary',
    hours: 6,
    topics: [
      'Makine öğrenmesi: denetimli vs denetimsiz',
      'Basit ve Çoklu Lineer Regresyon',
      'Polinom Regresyon',
      'Train/Test Split: train_test_split()',
      'Başarı metrikleri: MAE, MSE, RMSE, R²',
      'Feature Engineering: Label/One-Hot Encoding',
      'Scikit-learn Pipeline',
      'Model kaydetme: joblib',
      'Deployment: Streamlit, Gradio, Hugging Face Spaces',
    ],
    notebooks: [
      { name: 'hafta05_lineer_regresyon.ipynb', desc: 'Basit ve çoklu lineer regresyon', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta05/hafta05_lineer_regresyon.ipynb' },
      { name: 'hafta05_arac_fiyat_tahmini.ipynb', desc: 'Araç fiyat tahmini (cars.xls)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta05/hafta05_arac_fiyat_tahmini.ipynb' },
      { name: 'hafta05_ev_fiyat_tahmini.ipynb', desc: 'House Price Prediction (Kaggle)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta05/hafta05_ev_fiyat_tahmini.ipynb' },
      { name: 'hafta05_gradio_deployment.ipynb', desc: 'Gradio + HF Spaces deploy', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta05/hafta05_gradio_deployment.ipynb' },
    ],
    datasets: ['cars.xls', 'California Housing (sklearn)', 'House Prices (Kaggle)'],
    libraries: ['scikit-learn', 'gradio', 'streamlit', 'joblib'],
    assignments: [
      'Araç fiyat tahmin modelini Gradio ile sarmalayıp Hugging Face\'e yükleme',
      'Link\'i GitHub repo README\'sine ekleme',
    ],
    resources: [
      { label: 'Scikit-learn Regression', url: 'https://scikit-learn.org/stable/supervised_learning.html' },
      { label: 'Gradio Quickstart', url: 'https://gradio.app/guides/quickstart' },
      { label: 'Hugging Face Spaces', url: 'https://huggingface.co/docs/hub/spaces' },
    ],
    pptxFile: 'hafta05_regresyon_deployment.pptx',
  },
  {
    id: 6,
    slug: '06',
    title: 'Makine Öğrenmesi II — Sınıflandırma ve Kaggle',
    subtitle: 'Modül 6',
    section: 'MAKİNE ÖĞRENMESİ UZMANLIĞI',
    sectionColor: 'bg-secondary',
    hours: 6,
    topics: [
      'Sınıflandırma: Binary ve Multi-class',
      'Lojistik Regresyon',
      'K-Nearest Neighbors (KNN)',
      'Decision Tree (Karar Ağacı)',
      'Confusion Matrix: TP, TN, FP, FN',
      'Metrikler: Accuracy, Precision, Recall, F1-Score',
      'ROC Eğrisi ve AUC',
      'Cross Validation',
      'Kaggle: hesap, notebook, submission',
    ],
    notebooks: [
      { name: 'hafta06_siniflandirma_temel.ipynb', desc: 'LR, KNN, Decision Tree karşılaştırma', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta06/hafta06_siniflandirma_temel.ipynb' },
      { name: 'hafta06_titanic_kaggle.ipynb', desc: 'Titanic Kaggle submission', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta06/hafta06_titanic_kaggle.ipynb' },
      { name: 'hafta06_diyabet_teshisi.ipynb', desc: 'Pima Indians Diabetes', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta06/hafta06_diyabet_teshisi.ipynb' },
      { name: 'ek_titanic_kaggle_cozum.ipynb', desc: 'Kapsamlı Kaggle Titanic çözümü (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta06/ek_titanic_kaggle_cozum.ipynb' }
    ],
    datasets: ['Titanic (Kaggle)', 'Pima Indians Diabetes (Kaggle)'],
    libraries: ['scikit-learn'],
    assignments: [
      'Kaggle Titanic yarışmasına submission yapma ve Leaderboard skor paylaşma',
      'Diyabet veri setinde en az 3 algoritma karşılaştırma raporu',
    ],
    resources: [
      { label: 'Kaggle Titanic', url: 'https://www.kaggle.com/c/titanic' },
      { label: 'Scikit-learn Classification', url: 'https://scikit-learn.org/stable/modules/classes.html' },
    ],
    pptxFile: 'hafta06_siniflandirma_kaggle.pptx',
  },
  {
    id: 7,
    slug: '07',
    title: 'İleri Makine Öğrenmesi — Ensemble Modeller',
    subtitle: 'Modül 7',
    section: 'MAKİNE ÖĞRENMESİ UZMANLIĞI',
    sectionColor: 'bg-secondary',
    hours: 6,
    topics: [
      'Ensemble Learning: Bagging vs Boosting',
      'Random Forest',
      'Gradient Boosting: XGBoost, LightGBM',
      'Feature Importance',
      'Hiperparametre Optimizasyonu: GridSearchCV, RandomizedSearchCV',
      'Overfitting ve Regularization',
      'Model karşılaştırma ve seçim stratejileri',
    ],
    notebooks: [
      { name: 'hafta07_ensemble_modeller.ipynb', desc: 'RF, XGBoost, LightGBM karşılaştırma', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta07/hafta07_ensemble_modeller.ipynb' },
      { name: 'hafta07_musteri_terk_analizi.ipynb', desc: 'Telekom Churn Prediction (XGBoost)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta07/hafta07_musteri_terk_analizi.ipynb' },
      { name: 'hafta07_hiperparametre_avi.ipynb', desc: 'GridSearch ile optimal parametre', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta07/hafta07_hiperparametre_avi.ipynb' },
      { name: 'ek_kaggle_akademik_basari.ipynb', desc: 'Kaggle akademik başarı sınıflandırma (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta07/ek_kaggle_akademik_basari.ipynb' }
    ],
    datasets: ['Telco Customer Churn (Kaggle)', 'Titanic (Kaggle)'],
    libraries: ['scikit-learn', 'xgboost', 'lightgbm'],
    assignments: [
      'Telco Churn verisinde XGBoost modeli eğitip %85+ accuracy hedefleme',
      'Hiperparametre optimizasyonu öncesi/sonrası karşılaştırma raporu',
    ],
    resources: [
      { label: 'XGBoost Docs', url: 'https://xgboost.readthedocs.io/' },
      { label: 'LightGBM Docs', url: 'https://lightgbm.readthedocs.io/' },
    ],
    pptxFile: 'hafta07_ensemble_modeller.pptx',
  },
  {
    id: 8,
    slug: '08',
    title: 'Kümeleme, Zaman Serileri ve Öneri Sistemleri',
    subtitle: 'Modül 8',
    section: 'MAKİNE ÖĞRENMESİ UZMANLIĞI',
    sectionColor: 'bg-secondary',
    hours: 6,
    topics: [
      'K-Means Kümeleme: Elbow Method, Silhouette Score',
      'Müşteri segmentasyonu (RFM)',
      'Zaman serileri: trend, mevsimsellik, durağanlık',
      'Facebook Prophet ile zaman serisi tahmini',
      'Öneri sistemleri: Content-based vs Collaborative',
      'Kullanıcı-Ürün matrisi, Cosine Similarity',
    ],
    notebooks: [
      { name: 'hafta08_kmeans_segmentasyon.ipynb', desc: 'Müşteri segmentasyonu (RFM + K-Means)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta08/hafta08_kmeans_segmentasyon.ipynb' },
      { name: 'hafta08_zaman_serisi_prophet.ipynb', desc: 'Ürün satış tahmini (Prophet)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta08/hafta08_zaman_serisi_prophet.ipynb' },
      { name: 'hafta08_film_oneri_sistemi.ipynb', desc: 'Film öneri sistemi (Content-Based + Collaborative + Gradio UI)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta08/hafta08_film_oneri_sistemi.ipynb' },
      { name: 'ek_askeri_guc_kumeleme.ipynb', desc: 'Ülkelerin askeri güç verisi ile kümeleme (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta08/ek_askeri_guc_kumeleme.ipynb' }
    ],
    datasets: ['Mall Customer Segmentation (Kaggle)', 'Adidas US Sales (Kaggle)', 'MovieLens 100K'],
    libraries: ['scikit-learn', 'prophet', 'scikit-surprise'],
    assignments: [
      'Mall Customer verisinde 3-5 segment oluşturup isimlendirme',
      'MovieLens verisinde basit öneri sistemi kurma',
    ],
    resources: [
      { label: 'Prophet Docs', url: 'https://facebook.github.io/prophet/' },
      { label: 'Surprise Library', url: 'https://surpriselib.com/' },
    ],
    pptxFile: 'hafta08_kumeleme_oneri.pptx',
  },
  {
    id: 9,
    slug: '09',
    title: 'MLOps Temelleri ve Veri Bilimi Capstone',
    subtitle: 'Modül 9',
    section: 'MAKİNE ÖĞRENMESİ UZMANLIĞI',
    sectionColor: 'bg-secondary',
    hours: 6,
    topics: [
      'MLOps: model yaşam döngüsü',
      'Model Serialization: joblib',
      'Streamlit ile interaktif dashboard',
      'Hugging Face Spaces\'a model deploy',
      'Proje yönetimi: README, portfolio',
      'Capstone proje sunumu ve değerlendirme',
    ],
    notebooks: [
      { name: 'hafta09_mlops_pipeline.ipynb', desc: 'Model eğitim-kaydetme-yükleme pipeline', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta09/hafta09_mlops_pipeline.ipynb' },
      { name: 'hafta09_streamlit_ornek.ipynb', desc: 'Streamlit interaktif ML uygulaması', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta09/hafta09_streamlit_ornek.ipynb' },
      { name: 'hafta09_capstone_sablon.ipynb', desc: 'Capstone proje şablonu', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta09/hafta09_capstone_sablon.ipynb' },
      { name: 'ek_streamlit_form_uygulamasi.ipynb', desc: 'Streamlit kişisel bilgi formu (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta09/ek_streamlit_form_uygulamasi.ipynb' }
    ],
    datasets: ['Seçilen Capstone verisi'],
    libraries: ['streamlit', 'joblib'],
    assignments: [
      'Capstone proje: Airbnb Fiyatlandırma, Trendyol Yorum Analizi veya Spotify Popülerlik',
      'Uçtan uca proje: veri → model → Streamlit/Gradio → GitHub',
    ],
    resources: [
      { label: 'Streamlit Docs', url: 'https://docs.streamlit.io/' },
      { label: 'HF Spaces Overview', url: 'https://huggingface.co/docs/hub/spaces-overview' },
    ],
    pptxFile: 'hafta09_mlops_capstone.pptx',
  },
  {
    id: 10,
    slug: '10',
    title: 'Derin Öğrenmeye Giriş ve Yapay Sinir Ağları',
    subtitle: 'Modül 10',
    section: 'YAPAY ZEKA MÜHENDİSLİĞİ',
    sectionColor: 'bg-primary',
    hours: 6,
    topics: [
      'Biyolojik nörondan yapay nörona',
      'ANN mimarisi: Input, Hidden, Output katmanları',
      'Aktivasyon fonksiyonları: ReLU, Sigmoid, Softmax',
      'Forward/Backpropagation',
      'Loss fonksiyonları ve Optimizer\'lar (SGD, Adam)',
      'TensorFlow ve Keras\'a giriş',
      'Sequential model oluşturma',
      'Overfitting önleme: Dropout, Early Stopping',
    ],
    notebooks: [
      { name: 'hafta10_ann_temel.ipynb', desc: 'MNIST el yazısı rakam tanıma', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta10/hafta10_ann_temel.ipynb' },
      { name: 'hafta10_quickdraw.ipynb', desc: 'Google QuickDraw çizim tanıma', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta10/hafta10_quickdraw.ipynb' },
      { name: 'hafta10_ann_regresyon.ipynb', desc: 'ANN ile ev fiyat tahmini', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta10/hafta10_ann_regresyon.ipynb' },
      { name: 'ek_ev_fiyat_keras.ipynb', desc: 'Keras ile ileri regresyon projesi (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta10/ek_ev_fiyat_keras.ipynb' },
      { name: 'ek_titanic_deep_learning.ipynb', desc: 'Titanic ile derin öğrenme projesi (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta10/ek_titanic_deep_learning.ipynb' }
    ],
    datasets: ['MNIST (tf.keras)', 'Google QuickDraw', 'California Housing (sklearn)'],
    libraries: ['tensorflow', 'keras'],
    assignments: [
      'MNIST modelinin doğruluğunu %98+ yapma denemesi',
      'QuickDraw\'dan 10 kategori ile çizim tanıma modeli eğitme',
    ],
    resources: [
      { label: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials' },
      { label: 'TF Playground', url: 'https://playground.tensorflow.org/' },
    ],
    pptxFile: 'hafta10_derin_ogrenme.pptx',
  },
  {
    id: 11,
    slug: '11',
    title: 'Görüntü İşlemenin Temelleri ve OpenCV',
    subtitle: 'Modül 11',
    section: 'YAPAY ZEKA MÜHENDİSLİĞİ',
    sectionColor: 'bg-primary',
    hours: 6,
    topics: [
      'Dijital görüntü: piksel, kanal (RGB, Grayscale)',
      'OpenCV: imread, imwrite, imshow',
      'Renk dönüştürme: BGR→RGB, Grayscale, HSV',
      'Görüntü boyutlandırma: cv2.resize()',
      'Filtreler: Blur, Gaussian Blur, Median Blur',
      'Kenar tespiti: Canny Edge Detection',
      'Şekil çizme: rectangle, circle, line',
      'Kontur tespiti',
    ],
    notebooks: [
      { name: 'hafta11_opencv_temel.ipynb', desc: 'Görüntü okuma, renk kanalları', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta11/hafta11_opencv_temel.ipynb' },
      { name: 'hafta11_filtreler_kenar.ipynb', desc: 'Filtreler, kenar tespiti, eşikleme', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta11/hafta11_filtreler_kenar.ipynb' },
      { name: 'hafta11_sekil_metin.ipynb', desc: 'Şekil çizme, metin ekleme, kontur', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta11/hafta11_sekil_metin.ipynb' },
      { name: 'ek_opencv_ders_notu.ipynb', desc: 'Kapsamlı OpenCV ders notu (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta11/ek_opencv_ders_notu.ipynb' }
    ],
    datasets: ['Örnek görseller'],
    libraries: ['opencv-python-headless', 'numpy', 'matplotlib'],
    assignments: [
      '5 farklı filtre uygulanmış görüntü kolajı oluşturma',
      'HSV ile belirli renkteki nesneleri tespit etme',
    ],
    resources: [
      { label: 'OpenCV Python Tutorial', url: 'https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html' },
    ],
    pptxFile: 'hafta11_opencv_goruntu_isleme.pptx',
  },
  {
    id: 12,
    slug: '12',
    title: 'Bilgisayarlı Görü ve Transfer Learning',
    subtitle: 'Modül 12',
    section: 'YAPAY ZEKA MÜHENDİSLİĞİ',
    sectionColor: 'bg-primary',
    hours: 6,
    topics: [
      'CNN mimarisi: Conv2D, MaxPool, Flatten, Dense',
      'Filtre/Kernel: CNN görüntüyü nasıl görür',
      'Transfer Learning: önceden öğrenilmiş bilgiyi transfer etme',
      'VGG16, ResNet50, MobileNet',
      'Fine-tuning vs Feature Extraction',
      'Data Augmentation: ImageDataGenerator',
    ],
    notebooks: [
      { name: 'hafta12_cnn_temel.ipynb', desc: 'CIFAR-10 CNN sınıflandırma', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta12/hafta12_cnn_temel.ipynb' },
      { name: 'hafta12_transfer_learning.ipynb', desc: 'MobileNet ile Kedi/Köpek', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta12/hafta12_transfer_learning.ipynb' },
      { name: 'hafta12_maske_tespiti.ipynb', desc: 'CNN ile maskeli/maskesiz yüz ayrımı', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta12/hafta12_maske_tespiti.ipynb' },
      { name: 'ek_cnn_hurma_siniflandirma.ipynb', desc: 'CNN ile hurma sınıflandırma (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta12/ek_cnn_hurma_siniflandirma.ipynb' },
      { name: 'ek_cnn_balik_siniflandirma.ipynb', desc: 'CNN ile balık sınıflandırma (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta12/ek_cnn_balik_siniflandirma.ipynb' }
    ],
    datasets: ['CIFAR-10 (tf.keras)', 'Dogs vs Cats (Kaggle)', 'Face Mask (Kaggle)'],
    libraries: ['tensorflow', 'keras'],
    assignments: [
      'Kendi seçtiği 2 kategorili görüntü verisi ile Transfer Learning modeli',
      'Accuracy %90+ hedefleme',
    ],
    resources: [
      { label: 'Keras Applications', url: 'https://keras.io/api/applications/' },
      { label: 'Transfer Learning Guide', url: 'https://www.tensorflow.org/tutorials/images/transfer_learning' },
    ],
    pptxFile: 'hafta12_cnn_transfer_learning.pptx',
  },
  {
    id: 13,
    slug: '13',
    title: 'Doğal Dil İşleme (NLP) ve Hugging Face',
    subtitle: 'Modül 13',
    section: 'YAPAY ZEKA MÜHENDİSLİĞİ',
    sectionColor: 'bg-primary',
    hours: 6,
    topics: [
      'NLP: tokenization, stemming, lemmatization, stop words',
      'Bag of Words (BoW) ve TF-IDF',
      'Word Embeddings: Word2Vec kavramı',
      'Hugging Face Transformers: BERT, DistilBERT',
      'pipeline(): sentiment analysis, NER, summarization, translation',
      'Türkçe NLP: dbmdz/bert-base-turkish-cased',
    ],
    notebooks: [
      { name: 'hafta13_nlp_temel.ipynb', desc: 'Metin ön işleme, BoW, TF-IDF', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta13/hafta13_nlp_temel.ipynb' },
      { name: 'hafta13_duygu_analizi.ipynb', desc: 'Twitter duygu analizi (HuggingFace)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta13/hafta13_duygu_analizi.ipynb' },
      { name: 'hafta13_spam_tespiti.ipynb', desc: 'SMS Spam tespiti', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta13/hafta13_spam_tespiti.ipynb' },
      { name: 'ek_spam_siniflandirici_proje.ipynb', desc: 'Kapsamlı spam sınıflandırıcı projesi (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta13/ek_spam_siniflandirici_proje.ipynb' },
      { name: 'ek_wordcloud_gradio.ipynb', desc: 'Kelime bulutu + Gradio arayüz (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta13/ek_wordcloud_gradio.ipynb' },
      { name: 'ek_amazon_yorumlari_nlp.ipynb', desc: 'Amazon yorum analizi NLP projesi (Ek)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta13/ek_amazon_yorumlari_nlp.ipynb' }
    ],
    datasets: ['Twitter Sentiment140 (Kaggle)', 'SMS Spam Collection (Kaggle)'],
    libraries: ['transformers', 'nltk'],
    assignments: [
      '1000+ tweet üzerinde duygu analizi ve görselleştirme',
      'SMS spam tespiti modeli ve başarı raporu',
    ],
    resources: [
      { label: 'Hugging Face Docs', url: 'https://huggingface.co/docs/transformers/' },
      { label: 'Hugging Face Model Hub', url: 'https://huggingface.co/models' },
    ],
    pptxFile: 'hafta13_nlp_huggingface.pptx',
  },
  {
    id: 14,
    slug: '14',
    title: 'Generative AI, LLM ve Prompt Mühendisliği',
    subtitle: 'Modül 14',
    section: 'YAPAY ZEKA MÜHENDİSLİĞİ',
    sectionColor: 'bg-primary',
    hours: 6,
    topics: [
      'Büyük Dil Modelleri (LLM): GPT, Gemini, Claude',
      'Transformer mimarisi ve Attention mekanizması',
      'Prompt Engineering: Zero-shot, Few-shot, Chain-of-Thought',
      'Google Gemini API kullanımı',
      'Sistem prompt\'u ve persona oluşturma',
      'Yapısal çıktı (JSON) üretme',
      'RAG: Retrieval-Augmented Generation giriş',
    ],
    notebooks: [
      { name: 'hafta14_gemini_api.ipynb', desc: 'Gemini API temel kullanım', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta14/hafta14_gemini_api.ipynb' },
      { name: 'hafta14_kisisel_asistan.ipynb', desc: 'Persona chatbot (Gemini)', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta14/hafta14_kisisel_asistan.ipynb' },
      { name: 'hafta14_blog_yazari.ipynb', desc: 'Otomatik SEO blog yazarı', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta14/hafta14_blog_yazari.ipynb' },
      { name: 'hafta14_rag_giris.ipynb', desc: 'Basit RAG sistemi', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta14/hafta14_rag_giris.ipynb' },
    ],
    datasets: [],
    libraries: ['google-generativeai', 'chromadb', 'langchain'],
    assignments: [
      'Kendi alanına özel chatbot oluşturma',
      '10 farklı prompt tekniği deneyip karşılaştırma raporu',
    ],
    resources: [
      { label: 'Google AI Studio', url: 'https://aistudio.google.com/' },
      { label: 'Prompt Engineering Guide', url: 'https://promptingguide.ai/' },
    ],
    pptxFile: 'hafta14_generative_ai.pptx',
  },
  {
    id: 15,
    slug: '15',
    title: 'AI Etik, Gelecek ve AI Capstone Projesi',
    subtitle: 'Modül 15 — Final',
    section: 'YAPAY ZEKA MÜHENDİSLİĞİ',
    sectionColor: 'bg-primary',
    hours: 6,
    topics: [
      'AI etiği: Bias, Fairness, Transparency',
      'Sorumlu AI geliştirme ilkeleri',
      'EU AI Act ve regülasyonlar',
      'AI\'ın geleceği: AGI, multimodal, otonom ajanlar',
      'Yapay zeka kariyer yolları',
      'Capstone proje sunumları',
    ],
    notebooks: [
      { name: 'hafta15_capstone_sablon.ipynb', desc: 'AI Capstone proje şablonu', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta15/hafta15_capstone_sablon.ipynb' },
      { name: 'hafta15_ai_etik.ipynb', desc: 'AI bias analizi ve fairness metrikleri', url: 'https://github.com/DrMuratAltun/VB-YZ-90/blob/main/notebooks/hafta15/hafta15_ai_etik.ipynb' },
    ],
    datasets: ['Capstone projeye göre'],
    libraries: ['Projeye göre değişir'],
    assignments: [
      'AI Capstone Projesi (seçenekler: Fitness Asistanı, Film Öneri, Bilgi Botu, Görüntü Sınıflandırıcı)',
      'Proje: Teknik %40 + Sunum %20 + Yenilikçilik %20 + Deploy %20',
    ],
    resources: [
      { label: 'EU AI Act', url: 'https://artificialintelligenceact.eu/' },
      { label: 'Responsible AI — Google', url: 'https://ai.google/responsibility/responsible-ai-practices/' },
    ],
    pptxFile: 'hafta15_ai_etik_capstone.pptx',
  },
];

export function getWeekBySlug(slug: string): Week | undefined {
  return weeks.find(w => w.slug === slug);
}

export const sectionColors: Record<string, string> = {
  'VERİ BİLİMİ TEMELLERİ':       'text-accent  border-accent',
  'MAKİNE ÖĞRENMESİ UZMANLIĞI':  'text-secondary border-secondary',
  'YAPAY ZEKA MÜHENDİSLİĞİ':     'text-primary border-primary',
};
