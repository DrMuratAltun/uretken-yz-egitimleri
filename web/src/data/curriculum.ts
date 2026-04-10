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
  pptxDriveId?: string;
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
      { name: 'hafta01_python_temel.ipynb', desc: 'Değişkenler, veri tipleri, operatörler, listeler, sözlükler', url: 'https://colab.research.google.com/drive/1j9v0TLhB3ReMtZ3rJajqP5KcBWOPj7vQ' },
      { name: 'hafta01_vki_hesaplayici.ipynb', desc: 'Vücut Kitle İndeksi hesaplayıcı (input + if-else)', url: 'https://colab.research.google.com/drive/1PO4mqW7XbMsK07e0QjNoP24XzAnAksi9' },
      { name: 'hafta01_sayi_tahmin_oyunu.ipynb', desc: 'Sayı tahmin oyunu (while döngüsü + random)', url: 'https://colab.research.google.com/drive/1LqfSPMdZgN2Sco1iSrG9GhVjaCrPdEiD' },
      { name: 'ek_python101_giris.ipynb', desc: 'Python giriş alıştırmaları (Ek)', url: 'https://colab.research.google.com/drive/146il2XP6LnZnUdd1ZC_P_YE2HgvLcoLe' },
      { name: 'ek_python102_kontrol_yapilari.ipynb', desc: 'Kontrol yapıları ve veri yapıları pratik (Ek)', url: 'https://colab.research.google.com/drive/1cbswQrLLT8i3BaS_1W7THD_Oe_uiaHMb' },
      { name: 'ek_python103_fonksiyonlar.ipynb', desc: 'Fonksiyon alıştırmaları (Ek)', url: 'https://colab.research.google.com/drive/1QS3XufHSYFcJMmrgUMh8j12G8DhiDOYn' }
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
    pptxDriveId: '1x0vvRHjGMAHhGhJhSMKSIfS61rzMkB8F',
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
      { name: 'hafta02_numpy_pandas_temel.ipynb', desc: 'NumPy array işlemleri + Pandas DataFrame temelleri', url: 'https://colab.research.google.com/drive/1kSAdWq8x9GamCIOtV3KA-PfI5DuVJl6V' },
      { name: 'hafta02_bahsis_analizi.ipynb', desc: 'Restaurant Tips veri seti analizi', url: 'https://colab.research.google.com/drive/11Zl_-0LQiRzuBOe5N5BzXyJ5xuTr0Wnp' },
      { name: 'hafta02_titanic_eda.ipynb', desc: 'Titanic veri seti ile EDA', url: 'https://colab.research.google.com/drive/1HwDlw_G__IpgM9FHXdK1h26c64VYB6nu' },
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
    pptxDriveId: '1cUEkkqAfsxVmOIxAnsjDcdwCf00Mr6SI',
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
      { name: 'hafta03_matplotlib_seaborn.ipynb', desc: 'Temel grafik türleri ve Seaborn', url: 'https://colab.research.google.com/drive/1jXCZCc-z_zXQ_rrTu16oeue_Fx8UUYKV' },
      { name: 'hafta03_covid_yarisan_grafik.ipynb', desc: 'COVID verileri ile Bar Chart Race', url: 'https://colab.research.google.com/drive/15ZTNVl_9Xl5JoPOjlIlEiAr-Vme1U4fU' },
      { name: 'hafta03_supermarket_gorsellestirme.ipynb', desc: 'Süpermarket satış görselleştirme', url: 'https://colab.research.google.com/drive/1XHGapnTa-ydHFEeSSu7Nw3Oho6RpucqO' },
      { name: 'hafta03_google_trends.ipynb', desc: 'Google Trends API analizi', url: 'https://colab.research.google.com/drive/1CGjgbReSt2iPrfRvPCaH3_fHabPvH5YL' },
      { name: 'ek_matplotlib_pratik.ipynb', desc: 'Matplotlib pratik çalışma (Ek)', url: 'https://colab.research.google.com/drive/1nOkH6hT-bCjhKNRniQDDvRh3sO2d71jn' },
      { name: 'ek_iris_gorsellestirme.ipynb', desc: 'Iris veri seti görselleştirme (Ek)', url: 'https://colab.research.google.com/drive/1J2B8m8Px5dsaJgSH4VjSuFznWELthISC' }
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
    pptxDriveId: '13zSvu7JZhu9FLyhhG-4b4Wb623pXUMR_',
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
      { name: 'hafta04_istatistik_temel.ipynb', desc: 'Tanımlayıcı istatistik, normallik, korelasyon', url: 'https://colab.research.google.com/drive/17bRPQI-hhEcRa1xTIWNWAaSa8mx4QBlO' },
      { name: 'hafta04_ab_testi.ipynb', desc: 'Mobil oyun A/B testi', url: 'https://colab.research.google.com/drive/1YzVjuXcG5YSdf-hUmmsIAyjUtKCVhUJQ' },
      { name: 'hafta04_chi_square.ipynb', desc: 'Titanic: sınıf vs hayatta kalma testi', url: 'https://colab.research.google.com/drive/1MNuAooIOJ0BRXNweslzsfWSUUBnaZGA_' },
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
    pptxDriveId: '1SJNz4tpVLyylMZEisoa6Ifs3uktSqt--',
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
      { name: 'hafta05_lineer_regresyon.ipynb', desc: 'Basit ve çoklu lineer regresyon', url: 'https://colab.research.google.com/drive/1bhgyx_8L0SiTYpAUknAu9ZlvBRaP7TT6' },
      { name: 'hafta05_arac_fiyat_tahmini.ipynb', desc: 'Araç fiyat tahmini (cars.xls)', url: 'https://colab.research.google.com/drive/1nRYof6ZzukvN8SPuWf3pnqTNUda6afeK' },
      { name: 'hafta05_ev_fiyat_tahmini.ipynb', desc: 'House Price Prediction (Kaggle)', url: 'https://colab.research.google.com/drive/1JCUgB3MS7MwRpiFaXaEslHfLD_vgqF4K' },
      { name: 'hafta05_gradio_deployment.ipynb', desc: 'Gradio + HF Spaces deploy', url: 'https://colab.research.google.com/drive/1R2bM0SUf5o-Q0auvaXBS2dXiI6habD9I' },
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
    pptxDriveId: '1hcP0xkbekpPBJXgZc1WKjmf-zxEZMcbR',
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
      { name: 'hafta06_siniflandirma_temel.ipynb', desc: 'LR, KNN, Decision Tree karşılaştırma', url: 'https://colab.research.google.com/drive/1IddOFA-waWNIPrvXlzVUBXOHNWV4pEG0' },
      { name: 'hafta06_titanic_kaggle.ipynb', desc: 'Titanic Kaggle submission', url: 'https://colab.research.google.com/drive/1UyR9DUVbGKIVWvVjcLqHuSGms1qYfQso' },
      { name: 'hafta06_diyabet_teshisi.ipynb', desc: 'Pima Indians Diabetes', url: 'https://colab.research.google.com/drive/1QTKrUrSYULQVflUV7q8cEKW7AzE3Zou2' },
      { name: 'ek_titanic_kaggle_cozum.ipynb', desc: 'Kapsamlı Kaggle Titanic çözümü (Ek)', url: 'https://colab.research.google.com/drive/1CGCLdZ0gI302mTVPr2BCn2XY38exKKzv' }
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
    pptxDriveId: '1cvcyOkP0tg9YjgqgbhO2PtAS_U4UlZSz',
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
      { name: 'hafta07_ensemble_modeller.ipynb', desc: 'RF, XGBoost, LightGBM karşılaştırma', url: 'https://colab.research.google.com/drive/1b6Y1uBe1XxuOKAUpAMriXiM7OH786rWU' },
      { name: 'hafta07_musteri_terk_analizi.ipynb', desc: 'Telekom Churn Prediction (XGBoost)', url: 'https://colab.research.google.com/drive/1DcMFhkiVsfRR0_0vWd9oFn_rp_xRtKqW' },
      { name: 'hafta07_hiperparametre_avi.ipynb', desc: 'GridSearch ile optimal parametre', url: 'https://colab.research.google.com/drive/1rRcyGo5aD3HnehYMrE9V2JdadbJ2wfvm' },
      { name: 'ek_kaggle_akademik_basari.ipynb', desc: 'Kaggle akademik başarı sınıflandırma (Ek)', url: 'https://colab.research.google.com/drive/1q5EeNYlEq_5oRtc2yrS1ot5OZv2MJL4X' }
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
    pptxDriveId: '1Q70_U0b0DeGNF77khsBTm6eoAgGGCmut',
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
      { name: 'hafta08_kmeans_segmentasyon.ipynb', desc: 'Müşteri segmentasyonu (RFM + K-Means)', url: 'https://colab.research.google.com/drive/1OuoySMmgGxCVY7UZKwa52R-T1Gx8M5Jj' },
      { name: 'hafta08_zaman_serisi_prophet.ipynb', desc: 'Ürün satış tahmini (Prophet)', url: 'https://colab.research.google.com/drive/1DpNuZpMjhFl_sInsvAWRaPXaJHltP_EX' },
      { name: 'hafta08_film_oneri_sistemi.ipynb', desc: 'Film öneri sistemi (Content-Based + Collaborative + Gradio UI)', url: 'https://colab.research.google.com/drive/1YvNtTrHtv2x_FB3-lL7TdzEGIa10IZsP' },
      { name: 'ek_askeri_guc_kumeleme.ipynb', desc: 'Ülkelerin askeri güç verisi ile kümeleme (Ek)', url: 'https://colab.research.google.com/drive/1X06pGvrdVfXKkW2gL127W_jQ54_upT6y' }
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
    pptxDriveId: '12sX3HcZ3cPivZTgI8eRq4GcgND5qze_1',
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
      { name: 'hafta09_mlops_pipeline.ipynb', desc: 'Model eğitim-kaydetme-yükleme pipeline', url: 'https://colab.research.google.com/drive/1rYpA-kd97WOXFNU4heGryVK-tJJwxb2f' },
      { name: 'hafta09_streamlit_ornek.ipynb', desc: 'Streamlit interaktif ML uygulaması', url: 'https://colab.research.google.com/drive/1o8uWFbZto_7shG49CWx-Zvm40BhPddfw' },
      { name: 'hafta09_capstone_sablon.ipynb', desc: 'Capstone proje şablonu', url: 'https://colab.research.google.com/drive/1dWd9NPFMtt03BnMCPqa4acBlDDeXjTPU' },
      { name: 'ek_streamlit_form_uygulamasi.ipynb', desc: 'Streamlit kişisel bilgi formu (Ek)', url: 'https://colab.research.google.com/drive/1elI73RDFqeJ8CZ7Uenj6YADUAp0j-jk4' }
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
    pptxDriveId: '12dEhelwQC6Pcko79ioQC6howWb8jiB2G',
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
      { name: 'hafta10_ann_temel.ipynb', desc: 'MNIST el yazısı rakam tanıma', url: 'https://colab.research.google.com/drive/1TvQXmRLtCCIwAhf-SPdzLu8NCjXIFwKk' },
      { name: 'hafta10_quickdraw.ipynb', desc: 'Google QuickDraw çizim tanıma', url: 'https://colab.research.google.com/drive/1tZPpxRVcX7UXFCDKmFnl48sqPBk-bual' },
      { name: 'hafta10_ann_regresyon.ipynb', desc: 'ANN ile ev fiyat tahmini', url: 'https://colab.research.google.com/drive/1-Z3XmYEDDye7vUFIkXL_-ehKsx1Q0zIm' },
      { name: 'ek_ev_fiyat_keras.ipynb', desc: 'Keras ile ileri regresyon projesi (Ek)', url: 'https://colab.research.google.com/drive/1mYqjnyF3C5O8r6jC8DxSZCFAiZPvidLK' },
      { name: 'ek_titanic_deep_learning.ipynb', desc: 'Titanic ile derin öğrenme projesi (Ek)', url: 'https://colab.research.google.com/drive/17SBpTIRwreAHvDNgnAmwmwPKkpAYmPOV' }
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
    pptxDriveId: '1RUQBaXKQHDJsXIju67ytf_etcYINoEzV',
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
      { name: 'hafta11_opencv_temel.ipynb', desc: 'Görüntü okuma, renk kanalları', url: 'https://colab.research.google.com/drive/1kyhtJ-ABbpJUJDxrpi7bo9Y_MkK22Ojr' },
      { name: 'hafta11_filtreler_kenar.ipynb', desc: 'Filtreler, kenar tespiti, eşikleme', url: 'https://colab.research.google.com/drive/1bZIifT63d8H8dz_CqM9fBeF2bWBlrepF' },
      { name: 'hafta11_sekil_metin.ipynb', desc: 'Şekil çizme, metin ekleme, kontur', url: 'https://colab.research.google.com/drive/1Fu4HfYjkWwZSNwaZlXmfD5vU0xgf3IZi' },
      { name: 'ek_opencv_ders_notu.ipynb', desc: 'Kapsamlı OpenCV ders notu (Ek)', url: 'https://colab.research.google.com/drive/1DebHDPT3I6DByqVQdsiPDL97G-2q0c3t' }
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
    pptxDriveId: '1ZfWgNmBN8EVDYlJXtuFdCQcH4FBs61vw',
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
      { name: 'hafta12_cnn_temel.ipynb', desc: 'CIFAR-10 CNN sınıflandırma', url: 'https://colab.research.google.com/drive/1_vKoPmRVcJZQy9NdpIr3jIEi1CQgq4ZA' },
      { name: 'hafta12_transfer_learning.ipynb', desc: 'MobileNet ile Kedi/Köpek', url: 'https://colab.research.google.com/drive/1bfiVzf48SRoB12y-xTEwtgcf96rcuELT' },
      { name: 'hafta12_maske_tespiti.ipynb', desc: 'CNN ile maskeli/maskesiz yüz ayrımı', url: 'https://colab.research.google.com/drive/1txox8-ysk6Psk0Ca7ALKoPzZ5WXC5b4m' },
      { name: 'ek_cnn_hurma_siniflandirma.ipynb', desc: 'CNN ile hurma sınıflandırma (Ek)', url: 'https://colab.research.google.com/drive/17cCexyMxf__6twbdiuqEVqDwrp8FlIc8' },
      { name: 'ek_cnn_balik_siniflandirma.ipynb', desc: 'CNN ile balık sınıflandırma (Ek)', url: 'https://colab.research.google.com/drive/1viW1arz1_IzLxsuG647WTZUhvIjtatMu' }
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
    pptxDriveId: '1zGtOQfqF4Ix2a_XBufM7gyelURRuKnN8',
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
      { name: 'hafta13_nlp_temel.ipynb', desc: 'Metin ön işleme, BoW, TF-IDF', url: 'https://colab.research.google.com/drive/1jJ0rgAGhm1CpRB695LFZs9AHOy__uyu7' },
      { name: 'hafta13_duygu_analizi.ipynb', desc: 'Twitter duygu analizi (HuggingFace)', url: 'https://colab.research.google.com/drive/1ntpAoIVs53qHkkuLs62m6oXQg1VK0IZs' },
      { name: 'hafta13_spam_tespiti.ipynb', desc: 'SMS Spam tespiti', url: 'https://colab.research.google.com/drive/1qD89vSin5A-S5X_WyDTKyePcg2hnyHIQ' },
      { name: 'ek_spam_siniflandirici_proje.ipynb', desc: 'Kapsamlı spam sınıflandırıcı projesi (Ek)', url: 'https://colab.research.google.com/drive/1BbCpCsaXHlEtgs7y7yd3shSivt-hRsUa' },
      { name: 'ek_wordcloud_gradio.ipynb', desc: 'Kelime bulutu + Gradio arayüz (Ek)', url: 'https://colab.research.google.com/drive/1A8P9Y4xjPClafaI0Q_x_2OS_zP6vedqA' },
      { name: 'ek_amazon_yorumlari_nlp.ipynb', desc: 'Amazon yorum analizi NLP projesi (Ek)', url: 'https://colab.research.google.com/drive/18pzjsuUblMeD5Q-266wNrz5zo0AuPe_2' }
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
    pptxDriveId: '1piKMcznnZ-v4E1Q8LYvJccewNSYo3lkq',
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
      { name: 'hafta14_gemini_api.ipynb', desc: 'Gemini API temel kullanım', url: 'https://colab.research.google.com/drive/1nvPI--3jp_UNJxnFqcmFR-voxCILnAEm' },
      { name: 'hafta14_kisisel_asistan.ipynb', desc: 'Persona chatbot (Gemini)', url: 'https://colab.research.google.com/drive/12-NFvnMRXfLjVZZjbxhv0FrKr6FTAnG5' },
      { name: 'hafta14_blog_yazari.ipynb', desc: 'Otomatik SEO blog yazarı', url: 'https://colab.research.google.com/drive/1bT97p0BFkmC73xtPmT1J3uUHDwqGiUvQ' },
      { name: 'hafta14_rag_giris.ipynb', desc: 'Basit RAG sistemi', url: 'https://colab.research.google.com/drive/1z5pQaynSUD0Qs1gRGRJau50bbNB5VflK' },
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
    pptxDriveId: '1HyozzBXxrBKAJt2py_t2rbwljNtOCq9v',
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
      { name: 'hafta15_capstone_sablon.ipynb', desc: 'AI Capstone proje şablonu', url: 'https://colab.research.google.com/drive/1bdle-oCASAh3JykdvEPavpCG1Nfi-HhV' },
      { name: 'hafta15_ai_etik.ipynb', desc: 'AI bias analizi ve fairness metrikleri', url: 'https://colab.research.google.com/drive/1h9XmSEN3kc6j9O9DgtlzAyCEqtX9zlSn' },
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
    pptxDriveId: '1Hck1r9dVtfhKmEUnqgJkdz_v7DccoZVE',
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
