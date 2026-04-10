const REPO = "DrMuratAltun/VB-YZ-90";
const NB_BASE = `https://github.com/${REPO}/blob/main/notebooks`;
const COLAB_BASE = `https://colab.research.google.com/github/${REPO}/blob/main/notebooks`;
const SUNUM_BASE = `https://github.com/${REPO}/raw/main/sunumlar_yeni`;

function nb(week, file, title, desc) {
  return {
    id: file.replace(".ipynb", ""),
    title: file,
    description: desc,
    githubUrl: `${NB_BASE}/${week}/${file}`,
    colabUrl: `${COLAB_BASE}/${week}/${file}`,
  };
}

function sunum(file, title) {
  return { id: file.replace(".pptx", ""), title, downloadUrl: `${SUNUM_BASE}/${file}` };
}

export const courseData = [
  {
    weekId: "hafta01",
    title: "Hafta 1: Veri Bilimi Ekosistemi ve Python Temelleri",
    module: "Modül 1",
    section: "VERİ BİLİMİ TEMELLERİ",
    hours: 6,
    topics: [
      { id: "python-degiskenler", title: "Değişkenler ve Veri Tipleri (str, int, float, bool)" },
      { id: "python-operatorler", title: "Operatörler (aritmetik, karşılaştırma, mantıksal)" },
      { id: "python-veri-yapilari", title: "Listeler, Tuple, Sözlükler, Kümeler" },
      { id: "python-donguler", title: "Döngüler (for, while) ve Karar Yapıları (if/elif/else)" },
      { id: "python-fonksiyonlar", title: "Fonksiyonlar (def, return, *args)" },
      { id: "python-github", title: "GitHub hesabı açma, commit/push" },
    ],
    notebooks: [
      nb("hafta01", "hafta01_python_temel.ipynb", "Python Temel", "Değişkenler, veri tipleri, operatörler, listeler, sözlükler, döngüler, fonksiyonlar"),
      nb("hafta01", "hafta01_vki_hesaplayici.ipynb", "VKİ Hesaplayıcı", "input() ve if-else ile Vücut Kitle İndeksi hesaplama"),
      nb("hafta01", "hafta01_sayi_tahmin_oyunu.ipynb", "Sayı Tahmin Oyunu", "while döngüsü ve random ile interaktif oyun"),
      nb("hafta01", "ek_python101_giris.ipynb", "Ek: Python 101", "Python giriş alıştırmaları (ABD YZ Kursu)"),
      nb("hafta01", "ek_python102_kontrol_yapilari.ipynb", "Ek: Kontrol Yapıları", "Kontrol akışı ve veri yapıları pratik"),
      nb("hafta01", "ek_python103_fonksiyonlar.ipynb", "Ek: Fonksiyonlar", "Fonksiyon alıştırmaları"),
    ],
    presentations: [
      sunum("hafta01_python_temelleri.pptx", "Python Temelleri ve Veri Bilimi Ekosistemi"),
    ],
  },
  {
    weekId: "hafta02",
    title: "Hafta 2: NumPy ve Pandas ile Keşifsel Veri Analizi",
    module: "Modül 2",
    section: "VERİ BİLİMİ TEMELLERİ",
    hours: 6,
    topics: [
      { id: "numpy-temel", title: "NumPy: Array oluşturma, indexleme, istatistik fonksiyonlar" },
      { id: "pandas-temel", title: "Pandas: Series, DataFrame, read_csv, info, describe" },
      { id: "pandas-secim", title: "Veri seçme: .loc[], .iloc[], koşullu filtreleme" },
      { id: "pandas-eksik", title: "Eksik veri analizi: isnull, fillna, dropna" },
      { id: "pandas-gruplama", title: "Gruplama: groupby, value_counts, apply, lambda" },
    ],
    notebooks: [
      nb("hafta02", "hafta02_numpy_pandas_temel.ipynb", "NumPy & Pandas", "Array işlemleri, DataFrame temelleri, veri seçme ve manipülasyon"),
      nb("hafta02", "hafta02_bahsis_analizi.ipynb", "Bahşiş Analizi", "Seaborn tips veri seti ile EDA (gruplama, filtreleme)"),
      nb("hafta02", "hafta02_titanic_eda.ipynb", "Titanic EDA", "Titanic veri seti ile keşifsel veri analizi"),
    ],
    presentations: [
      sunum("hafta02_numpy_pandas_eda.pptx", "NumPy, Pandas ve Keşifsel Veri Analizi"),
    ],
  },
  {
    weekId: "hafta03",
    title: "Hafta 3: Veri Görselleştirme ve Hikayeleştirme",
    module: "Modül 3",
    section: "VERİ BİLİMİ TEMELLERİ",
    hours: 6,
    topics: [
      { id: "matplotlib", title: "Matplotlib: plot, bar, scatter, hist, pie, subplots" },
      { id: "seaborn", title: "Seaborn: countplot, boxplot, heatmap, pairplot" },
      { id: "barchart-race", title: "Bar Chart Race ile animasyonlu grafikler" },
      { id: "oto-eda", title: "Oto-EDA: Sweetviz, YData-Profiling" },
    ],
    notebooks: [
      nb("hafta03", "hafta03_matplotlib_seaborn.ipynb", "Matplotlib & Seaborn", "Temel grafik türleri ve istatistiksel görselleştirme"),
      nb("hafta03", "hafta03_covid_yarisan_grafik.ipynb", "COVID Yarışan Grafik", "Johns Hopkins gerçek verisiyle Bar Chart Race"),
      nb("hafta03", "hafta03_supermarket_gorsellestirme.ipynb", "Süpermarket Analizi", "Kaggle Supermarket Sales veri seti görselleştirme"),
      nb("hafta03", "hafta03_google_trends.ipynb", "Google Trends", "pytrends ile anahtar kelime analizi"),
      nb("hafta03", "ek_matplotlib_pratik.ipynb", "Ek: Matplotlib Pratik", "Matplotlib pratik çalışma"),
      nb("hafta03", "ek_iris_gorsellestirme.ipynb", "Ek: Iris Görselleştirme", "Iris veri seti ile görselleştirme"),
    ],
    presentations: [
      sunum("hafta03_veri_gorsellestirme.pptx", "Veri Görselleştirme (Matplotlib, Seaborn)"),
    ],
  },
  {
    weekId: "hafta04",
    title: "Hafta 4: İstatistiksel Analiz ve A/B Testleri",
    module: "Modül 4",
    section: "VERİ BİLİMİ TEMELLERİ",
    hours: 6,
    topics: [
      { id: "tanimlayici-istatistik", title: "Tanımlayıcı istatistik: ortalama, medyan, std, varyans" },
      { id: "normallik", title: "Normal dağılım ve normallik testleri (Shapiro-Wilk)" },
      { id: "korelasyon", title: "Korelasyon: Pearson, Spearman" },
      { id: "hipotez", title: "Hipotez testleri: T-Test, ANOVA, Chi-Square" },
      { id: "ab-test", title: "A/B testi metodolojisi" },
    ],
    notebooks: [
      nb("hafta04", "hafta04_istatistik_temel.ipynb", "İstatistik Temelleri", "Tanımlayıcı istatistik, normallik, korelasyon"),
      nb("hafta04", "hafta04_ab_testi.ipynb", "A/B Testi", "Mobil oyun A/B testi (Geçilebilir vs Ödüllü Reklam)"),
      nb("hafta04", "hafta04_chi_square.ipynb", "Ki-Kare Testi", "Titanic: bilet sınıfı vs hayatta kalma bağımsızlık testi"),
    ],
    presentations: [
      sunum("hafta04_istatistik_ab_testi.pptx", "İstatistiksel Analiz ve A/B Testleri"),
    ],
  },
  {
    weekId: "hafta05",
    title: "Hafta 5: Makine Öğrenmesi I — Regresyon ve Deployment",
    module: "Modül 5",
    section: "MAKİNE ÖĞRENMESİ UZMANLIĞI",
    hours: 6,
    topics: [
      { id: "ml-giris", title: "Makine öğrenmesi nedir? Denetimli vs denetimsiz" },
      { id: "lineer-regresyon", title: "Lineer, çoklu ve polinom regresyon" },
      { id: "metrikler", title: "Metrikler: MAE, MSE, RMSE, R²" },
      { id: "deployment", title: "Gradio ve Hugging Face Spaces ile deployment" },
    ],
    notebooks: [
      nb("hafta05", "hafta05_lineer_regresyon.ipynb", "Lineer Regresyon", "Basit, çoklu ve polinom regresyon temelleri"),
      nb("hafta05", "hafta05_arac_fiyat_tahmini.ipynb", "Araç Fiyat Tahmini", "CarPrice veri seti ile fiyat tahmini"),
      nb("hafta05", "hafta05_ev_fiyat_tahmini.ipynb", "Ev Fiyat Tahmini", "California Housing ile regresyon karşılaştırma"),
      nb("hafta05", "hafta05_gradio_deployment.ipynb", "Gradio Deployment", "Model arayüzü + HuggingFace Spaces deploy"),
    ],
    presentations: [
      sunum("hafta05_regresyon_deployment.pptx", "Regresyon ve Model Deployment"),
    ],
  },
  {
    weekId: "hafta06",
    title: "Hafta 6: Makine Öğrenmesi II — Sınıflandırma ve Kaggle",
    module: "Modül 6",
    section: "MAKİNE ÖĞRENMESİ UZMANLIĞI",
    hours: 6,
    topics: [
      { id: "siniflandirma", title: "Lojistik Regresyon, KNN, Karar Ağacı" },
      { id: "confusion-matrix", title: "Confusion Matrix, Precision, Recall, F1" },
      { id: "roc-auc", title: "ROC eğrisi ve AUC skoru" },
      { id: "kaggle", title: "Kaggle kültürü ve submission" },
    ],
    notebooks: [
      nb("hafta06", "hafta06_siniflandirma_temel.ipynb", "Sınıflandırma Temelleri", "Lojistik Regresyon, KNN, Karar Ağacı karşılaştırma"),
      nb("hafta06", "hafta06_titanic_kaggle.ipynb", "Titanic Kaggle", "Gerçek Kaggle Titanic yarışma verisi ile model"),
      nb("hafta06", "hafta06_diyabet_teshisi.ipynb", "Diyabet Teşhisi", "Pima Indians Diabetes — 3 model karşılaştırma"),
      nb("hafta06", "ek_titanic_kaggle_cozum.ipynb", "Ek: Titanic Çözüm", "Kapsamlı Kaggle Titanic çözümü (ABD YZ Kursu)"),
    ],
    presentations: [
      sunum("hafta06_siniflandirma_kaggle.pptx", "Sınıflandırma Algoritmaları ve Kaggle"),
    ],
  },
  {
    weekId: "hafta07",
    title: "Hafta 7: İleri Makine Öğrenmesi ve Ensemble Modeller",
    module: "Modül 7",
    section: "MAKİNE ÖĞRENMESİ UZMANLIĞI",
    hours: 6,
    topics: [
      { id: "ensemble", title: "Ensemble Learning: Bagging vs Boosting" },
      { id: "xgboost", title: "Random Forest, XGBoost, LightGBM" },
      { id: "hiperparametre", title: "Hiperparametre optimizasyonu: GridSearchCV" },
      { id: "churn", title: "Müşteri terk (Churn) analizi" },
    ],
    notebooks: [
      nb("hafta07", "hafta07_ensemble_modeller.ipynb", "Ensemble Modeller", "Random Forest, XGBoost, LightGBM karşılaştırma"),
      nb("hafta07", "hafta07_musteri_terk_analizi.ipynb", "Müşteri Terk Analizi", "IBM Telco Churn verisi ile XGBoost"),
      nb("hafta07", "hafta07_hiperparametre_avi.ipynb", "Hiperparametre Avı", "GridSearch ve RandomizedSearch ile optimizasyon"),
      nb("hafta07", "ek_kaggle_akademik_basari.ipynb", "Ek: Akademik Başarı", "Kaggle akademik başarı sınıflandırma"),
    ],
    presentations: [
      sunum("hafta07_ensemble_modeller.pptx", "Ensemble Modeller (XGBoost, LightGBM)"),
      sunum("Musteri_Terk_Analizi.pptx", "Müşteri Terk Analizi"),
    ],
  },
  {
    weekId: "hafta08",
    title: "Hafta 8: Denetimsiz Öğrenme, Zaman Serileri ve Öneri Sistemleri",
    module: "Modül 8",
    section: "MAKİNE ÖĞRENMESİ UZMANLIĞI",
    hours: 6,
    topics: [
      { id: "kmeans", title: "K-Means kümeleme, Elbow, Silhouette" },
      { id: "zaman-serisi", title: "Zaman serileri ve Facebook Prophet" },
      { id: "oneri-sistemi", title: "Öneri sistemleri: Collaborative Filtering" },
    ],
    notebooks: [
      nb("hafta08", "hafta08_kmeans_segmentasyon.ipynb", "Müşteri Segmentasyonu", "Mall Customers ile K-Means kümeleme"),
      nb("hafta08", "hafta08_zaman_serisi_prophet.ipynb", "Zaman Serisi", "Airline Passengers ile Prophet tahmini"),
      nb("hafta08", "hafta08_film_oneri_sistemi.ipynb", "Film Öneri Sistemi", "MovieLens ile Collaborative Filtering"),
      nb("hafta08", "ek_askeri_guc_kumeleme.ipynb", "Ek: Askeri Güç Kümeleme", "Ülkelerin askeri güç verisi ile kümeleme"),
    ],
    presentations: [
      sunum("hafta08_zaman_serisi.pptx", "Zaman Serisi Analizi ve Tahmini"),
      sunum("hafta08_kumeleme_oneri.pptx", "Kümeleme ve Öneri Sistemleri"),
    ],
  },
  {
    weekId: "hafta09",
    title: "Hafta 9: MLOps Temelleri ve DS Capstone",
    module: "Modül 9",
    section: "MAKİNE ÖĞRENMESİ UZMANLIĞI",
    hours: 6,
    topics: [
      { id: "mlops", title: "MLOps nedir? Model yaşam döngüsü" },
      { id: "model-kaydetme", title: "Model kaydetme: joblib" },
      { id: "streamlit", title: "Streamlit ile interaktif dashboard" },
      { id: "capstone", title: "Capstone proje sunumu" },
    ],
    notebooks: [
      nb("hafta09", "hafta09_mlops_pipeline.ipynb", "MLOps Pipeline", "Model eğitim → kaydetme → yükleme → tahmin"),
      nb("hafta09", "hafta09_streamlit_ornek.ipynb", "Streamlit Örnek", "Streamlit ile ML uygulaması"),
      nb("hafta09", "hafta09_capstone_sablon.ipynb", "Capstone Şablonu", "Veri Bilimi bitirme projesi şablonu"),
      nb("hafta09", "ek_streamlit_form_uygulamasi.ipynb", "Ek: Streamlit Form", "Streamlit ile kişisel bilgi formu"),
    ],
    presentations: [
      sunum("hafta09_mlops_capstone.pptx", "MLOps ve Capstone Projesi"),
    ],
  },
  {
    weekId: "hafta10",
    title: "Hafta 10: Derin Öğrenmeye Giriş ve Yapay Sinir Ağları",
    module: "Modül 10",
    section: "YAPAY ZEKA MÜHENDİSLİĞİ",
    hours: 6,
    topics: [
      { id: "ann", title: "Yapay Sinir Ağları (ANN) mimarisi" },
      { id: "aktivasyon", title: "Aktivasyon fonksiyonları: ReLU, Sigmoid, Softmax" },
      { id: "tensorflow", title: "TensorFlow ve Keras ile Sequential model" },
      { id: "overfitting", title: "Overfitting önleme: Dropout, Early Stopping" },
    ],
    notebooks: [
      nb("hafta10", "hafta10_ann_temel.ipynb", "ANN Temel (MNIST)", "İlk yapay sinir ağı — el yazısı rakam tanıma"),
      nb("hafta10", "hafta10_quickdraw.ipynb", "QuickDraw", "Google QuickDraw veri seti ile çizim tanıma"),
      nb("hafta10", "hafta10_ann_regresyon.ipynb", "ANN Regresyon", "ANN ile ev fiyat tahmini (ML ile karşılaştırma)"),
      nb("hafta10", "ek_ev_fiyat_keras.ipynb", "Ek: Ev Fiyat Keras", "Keras ile ileri regresyon projesi"),
      nb("hafta10", "ek_titanic_deep_learning.ipynb", "Ek: Titanic DL", "Titanic ile derin öğrenme projesi"),
    ],
    presentations: [
      sunum("hafta10_derin_ogrenme.pptx", "Derin Öğrenme ve Yapay Sinir Ağları"),
    ],
  },
  {
    weekId: "hafta11",
    title: "Hafta 11: Görüntü İşlemenin Temelleri ve OpenCV",
    module: "Modül 11",
    section: "YAPAY ZEKA MÜHENDİSLİĞİ",
    hours: 6,
    topics: [
      { id: "piksel", title: "Dijital görüntü, piksel ve renk kanalları" },
      { id: "opencv-temel", title: "OpenCV: görüntü okuma, renk dönüştürme, resize" },
      { id: "filtreler", title: "Filtreler: Blur, Gaussian, Canny kenar tespiti" },
      { id: "sekiller", title: "Şekil çizme, metin ekleme, kontur tespiti" },
    ],
    notebooks: [
      nb("hafta11", "hafta11_opencv_temel.ipynb", "OpenCV Temel", "Görüntü okuma, renk kanalları, dönüştürme"),
      nb("hafta11", "hafta11_filtreler_kenar.ipynb", "Filtreler ve Kenar", "Blur, Gaussian, Canny, eşikleme"),
      nb("hafta11", "hafta11_sekil_metin.ipynb", "Şekil ve Metin", "Şekil çizme, metin ekleme, kontur tespiti"),
      nb("hafta11", "ek_opencv_ders_notu.ipynb", "Ek: OpenCV Ders Notu", "Kapsamlı OpenCV ders notu (ABD YZ Kursu)"),
    ],
    presentations: [
      sunum("hafta11_opencv_goruntu_isleme.pptx", "OpenCV ve Görüntü İşleme"),
    ],
  },
  {
    weekId: "hafta12",
    title: "Hafta 12: Bilgisayarlı Görü ve Transfer Learning",
    module: "Modül 12",
    section: "YAPAY ZEKA MÜHENDİSLİĞİ",
    hours: 6,
    topics: [
      { id: "cnn", title: "CNN mimarisi: Conv2D, MaxPool, Flatten, Dense" },
      { id: "transfer-learning", title: "Transfer Learning: VGG16, ResNet, MobileNet" },
      { id: "data-augmentation", title: "Data Augmentation ile veri artırma" },
    ],
    notebooks: [
      nb("hafta12", "hafta12_cnn_temel.ipynb", "CNN Temel", "Sıfırdan CNN ile CIFAR-10 sınıflandırma"),
      nb("hafta12", "hafta12_transfer_learning.ipynb", "Transfer Learning", "MobileNet ile Kedi/Köpek sınıflandırma"),
      nb("hafta12", "hafta12_maske_tespiti.ipynb", "Maske Tespiti", "CNN ile maskeli/maskesiz yüz ayrımı"),
      nb("hafta12", "ek_cnn_hurma_siniflandirma.ipynb", "Ek: Hurma Sınıflandırma", "CNN ile hurma çeşidi sınıflandırma"),
      nb("hafta12", "ek_cnn_balik_siniflandirma.ipynb", "Ek: Balık Sınıflandırma", "CNN ile balık türü sınıflandırma"),
    ],
    presentations: [
      sunum("hafta12_cnn_transfer_learning.pptx", "CNN ve Transfer Learning"),
    ],
  },
  {
    weekId: "hafta13",
    title: "Hafta 13: Doğal Dil İşleme (NLP) ve Hugging Face",
    module: "Modül 13",
    section: "YAPAY ZEKA MÜHENDİSLİĞİ",
    hours: 6,
    topics: [
      { id: "nlp-temel", title: "Tokenization, Stemming, Lemmatization, Stop Words" },
      { id: "tfidf", title: "Bag of Words, TF-IDF" },
      { id: "huggingface", title: "Hugging Face Transformers, BERT, pipeline()" },
      { id: "duygu-analizi", title: "Duygu analizi ve Türkçe NLP" },
    ],
    notebooks: [
      nb("hafta13", "hafta13_nlp_temel.ipynb", "NLP Temel", "Metin ön işleme, BoW, TF-IDF"),
      nb("hafta13", "hafta13_duygu_analizi.ipynb", "Duygu Analizi", "HuggingFace pipeline ile sentiment analysis"),
      nb("hafta13", "hafta13_spam_tespiti.ipynb", "Spam Tespiti", "UCI SMS Spam Collection ile sınıflandırma"),
      nb("hafta13", "ek_spam_siniflandirici_proje.ipynb", "Ek: Spam Projesi", "Kapsamlı spam sınıflandırıcı projesi"),
      nb("hafta13", "ek_wordcloud_gradio.ipynb", "Ek: WordCloud Gradio", "Kelime bulutu + Gradio arayüz"),
      nb("hafta13", "ek_amazon_yorumlari_nlp.ipynb", "Ek: Amazon NLP", "Amazon yorum analizi NLP projesi"),
    ],
    presentations: [
      sunum("hafta13_nlp_huggingface.pptx", "NLP ve Hugging Face Ekosistemi"),
    ],
  },
  {
    weekId: "hafta14",
    title: "Hafta 14: Generative AI, LLM ve Prompt Mühendisliği",
    module: "Modül 14",
    section: "YAPAY ZEKA MÜHENDİSLİĞİ",
    hours: 6,
    topics: [
      { id: "llm", title: "LLM nedir? GPT, Gemini, Claude" },
      { id: "prompt-engineering", title: "Prompt Engineering: Zero-shot, Few-shot, CoT" },
      { id: "gemini-api", title: "Google Gemini API kullanımı" },
      { id: "rag", title: "RAG (Retrieval-Augmented Generation) giriş" },
    ],
    notebooks: [
      nb("hafta14", "hafta14_gemini_api.ipynb", "Gemini API", "Google Gemini API temel kullanım"),
      nb("hafta14", "hafta14_kisisel_asistan.ipynb", "Kişisel Asistan", "Persona ile chatbot oluşturma"),
      nb("hafta14", "hafta14_blog_yazari.ipynb", "Blog Yazarı", "Otomatik SEO uyumlu blog yazarı"),
      nb("hafta14", "hafta14_rag_giris.ipynb", "RAG Giriş", "Basit RAG sistemi (doküman → embedding → sorgu)"),
    ],
    presentations: [
      sunum("hafta14_generative_ai.pptx", "Generative AI ve Prompt Mühendisliği"),
    ],
  },
  {
    weekId: "hafta15",
    title: "Hafta 15: AI Etik, Gelecek ve AI Capstone Projesi",
    module: "Modül 15",
    section: "YAPAY ZEKA MÜHENDİSLİĞİ",
    hours: 6,
    topics: [
      { id: "ai-etik", title: "Yapay zeka etiği: Bias, Fairness, Transparency" },
      { id: "eu-ai-act", title: "AI regülasyonları: EU AI Act" },
      { id: "kariyer", title: "Yapay zeka kariyer yolları" },
      { id: "capstone", title: "AI Capstone proje sunumları" },
    ],
    notebooks: [
      nb("hafta15", "hafta15_ai_etik.ipynb", "AI Etik", "AI bias analizi ve fairness metrikleri"),
      nb("hafta15", "hafta15_capstone_sablon.ipynb", "AI Capstone Şablon", "AI bitirme projesi şablonu"),
    ],
    presentations: [
      sunum("hafta15_ai_etik_capstone.pptx", "AI Etik ve Capstone Projesi"),
    ],
  },
];
