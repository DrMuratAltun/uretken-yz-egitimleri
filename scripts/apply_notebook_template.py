#!/usr/bin/env python3
"""
Tüm notebook'lara profesyonel header/footer şablonu uygular.
Idempotent: mevcut header/footer varsa önce kaldırır, sonra yeniden ekler.

Kullanım: python scripts/apply_notebook_template.py
"""

import json
import os
import sys
from pathlib import Path

REPO_OWNER = "DrMuratAltun"
REPO_NAME = "VB-YZ-90"
BASE_URL = f"https://github.com/{REPO_OWNER}/{REPO_NAME}/blob/main"
COLAB_URL = f"https://colab.research.google.com/github/{REPO_OWNER}/{REPO_NAME}/blob/main"
RAW_URL = f"https://raw.githubusercontent.com/{REPO_OWNER}/{REPO_NAME}/main"
WEB_URL = f"https://drmurataltun.github.io/{REPO_NAME}"

# Hafta bilgileri: (hafta_no, başlık, bölüm, modül, saat, pptx_dosyası)
WEEKS = {
    "01": ("Veri Bilimi Ekosistemi ve Python Temelleri", "VERİ BİLİMİ TEMELLERİ", "Modül 1", 6, "hafta01_python_temelleri.pptx"),
    "02": ("NumPy ve Pandas ile Keşifsel Veri Analizi", "VERİ BİLİMİ TEMELLERİ", "Modül 2", 6, "hafta02_numpy_pandas_eda.pptx"),
    "03": ("Veri Görselleştirme ve Hikayeleştirme", "VERİ BİLİMİ TEMELLERİ", "Modül 3", 6, "hafta03_veri_gorsellestirme.pptx"),
    "04": ("İstatistiksel Analiz ve A/B Testleri", "VERİ BİLİMİ TEMELLERİ", "Modül 4", 6, "hafta04_istatistik_ab_testi.pptx"),
    "05": ("Makine Öğrenmesi I — Regresyon", "MAKİNE ÖĞRENMESİ UZMANLIĞI", "Modül 5", 6, "hafta05_regresyon_deployment.pptx"),
    "06": ("Makine Öğrenmesi II — Sınıflandırma ve Kaggle", "MAKİNE ÖĞRENMESİ UZMANLIĞI", "Modül 6", 6, "hafta06_siniflandirma_kaggle.pptx"),
    "07": ("İleri Makine Öğrenmesi — Ensemble Modeller", "MAKİNE ÖĞRENMESİ UZMANLIĞI", "Modül 7", 6, "hafta07_ensemble_modeller.pptx"),
    "08": ("Kümeleme, Zaman Serileri ve Öneri Sistemleri", "MAKİNE ÖĞRENMESİ UZMANLIĞI", "Modül 8", 6, "hafta08_kumeleme_oneri.pptx"),
    "09": ("MLOps Temelleri ve Veri Bilimi Capstone", "MAKİNE ÖĞRENMESİ UZMANLIĞI", "Modül 9", 6, "hafta09_mlops_capstone.pptx"),
    "10": ("Derin Öğrenmeye Giriş ve Yapay Sinir Ağları", "YAPAY ZEKA MÜHENDİSLİĞİ", "Modül 10", 6, "hafta10_derin_ogrenme.pptx"),
    "11": ("Görüntü İşlemenin Temelleri ve OpenCV", "YAPAY ZEKA MÜHENDİSLİĞİ", "Modül 11", 6, "hafta11_opencv_goruntu_isleme.pptx"),
    "12": ("Bilgisayarlı Görü ve Transfer Learning", "YAPAY ZEKA MÜHENDİSLİĞİ", "Modül 12", 6, "hafta12_cnn_transfer_learning.pptx"),
    "13": ("Doğal Dil İşleme (NLP) ve Hugging Face", "YAPAY ZEKA MÜHENDİSLİĞİ", "Modül 13", 6, "hafta13_nlp_huggingface.pptx"),
    "14": ("Generative AI, LLM ve Prompt Mühendisliği", "YAPAY ZEKA MÜHENDİSLİĞİ", "Modül 14", 6, "hafta14_generative_ai.pptx"),
    "15": ("AI Etik, Gelecek ve AI Capstone Projesi", "YAPAY ZEKA MÜHENDİSLİĞİ", "Modül 15", 6, "hafta15_ai_etik_capstone.pptx"),
}

# Notebook başlıkları (dosya adı → insan-okunur başlık)
NOTEBOOK_TITLES = {
    # Hafta 01
    "hafta01_python_temel": "Python Temel Programlama",
    "hafta01_sayi_tahmin_oyunu": "Sayı Tahmin Oyunu",
    "hafta01_vki_hesaplayici": "Vücut Kitle İndeksi Hesaplayıcı",
    "ek_python101_giris": "Ek: Python 101 — Giriş",
    "ek_python102_kontrol_yapilari": "Ek: Python 102 — Kontrol Yapıları",
    "ek_python103_fonksiyonlar": "Ek: Python 103 — Fonksiyonlar",
    # Hafta 02
    "hafta02_numpy_pandas_temel": "NumPy ve Pandas Temelleri",
    "hafta02_bahsis_analizi": "Bahşiş Veri Seti Analizi",
    "hafta02_titanic_eda": "Titanic Keşifsel Veri Analizi",
    # Hafta 03
    "hafta03_matplotlib_seaborn": "Matplotlib ve Seaborn ile Görselleştirme",
    "hafta03_covid_yarisan_grafik": "COVID-19 Yarışan Çubuk Grafik",
    "hafta03_supermarket_gorsellestirme": "Süpermarket Satış Görselleştirme",
    "hafta03_google_trends": "Google Trends API Analizi",
    "ek_iris_gorsellestirme": "Ek: Iris Veri Seti Görselleştirme",
    "ek_matplotlib_pratik": "Ek: Matplotlib Pratik Alıştırmalar",
    # Hafta 04
    "hafta04_istatistik_temel": "Temel İstatistik ve Normallik Testleri",
    "hafta04_ab_testi": "A/B Testi Metodolojisi",
    "hafta04_chi_square": "Ki-Kare Bağımsızlık Testi",
    # Hafta 05
    "hafta05_lineer_regresyon": "Lineer Regresyon",
    "hafta05_arac_fiyat_tahmini": "Araç Fiyat Tahmini",
    "hafta05_ev_fiyat_tahmini": "Ev Fiyat Tahmini (Kaggle)",
    "hafta05_gradio_deployment": "Gradio ile Model Deployment",
    # Hafta 06
    "hafta06_siniflandirma_temel": "Sınıflandırma Algoritmaları",
    "hafta06_titanic_kaggle": "Titanic Kaggle Yarışması",
    "hafta06_diyabet_teshisi": "Diyabet Teşhisi",
    "ek_titanic_kaggle_cozum": "Ek: Titanic Kaggle Çözüm",
    # Hafta 07
    "hafta07_ensemble_modeller": "Ensemble Modeller (RF, XGBoost, LightGBM)",
    "hafta07_musteri_terk_analizi": "Müşteri Terk Analizi (Churn)",
    "hafta07_hiperparametre_avi": "Hiperparametre Optimizasyonu",
    "ek_kaggle_akademik_basari": "Ek: Kaggle Akademik Başarı Tahmini",
    # Hafta 08
    "hafta08_kmeans_segmentasyon": "K-Means Müşteri Segmentasyonu",
    "hafta08_zaman_serisi_prophet": "Zaman Serisi Tahmini (Prophet)",
    "hafta08_film_oneri_sistemi": "Film Öneri Sistemi",
    "ek_askeri_guc_kumeleme": "Ek: Askeri Güç Kümeleme Analizi",
    # Hafta 09
    "hafta09_mlops_pipeline": "MLOps Pipeline",
    "hafta09_streamlit_ornek": "Streamlit Örnek Uygulama",
    "hafta09_capstone_sablon": "Capstone Proje Şablonu",
    "ek_streamlit_form_uygulamasi": "Ek: Streamlit Form Uygulaması",
    # Hafta 10
    "hafta10_ann_temel": "Yapay Sinir Ağları (ANN) Temelleri",
    "hafta10_quickdraw": "Google QuickDraw Çizim Tanıma",
    "hafta10_ann_regresyon": "ANN ile Regresyon",
    "ek_ev_fiyat_keras": "Ek: Keras ile Ev Fiyat Tahmini",
    "ek_titanic_deep_learning": "Ek: Titanic Deep Learning",
    # Hafta 11
    "hafta11_opencv_temel": "OpenCV Temel İşlemler",
    "hafta11_filtreler_kenar": "Filtreler ve Kenar Tespiti",
    "hafta11_sekil_metin": "Şekil Çizme ve Metin Ekleme",
    "ek_opencv_ders_notu": "Ek: OpenCV Ders Notu",
    # Hafta 12
    "hafta12_cnn_temel": "CNN Temel Sınıflandırma",
    "hafta12_transfer_learning": "Transfer Learning",
    "hafta12_maske_tespiti": "Maske Tespiti (CNN)",
    "ek_cnn_balik_siniflandirma": "Ek: CNN Balık Sınıflandırma",
    "ek_cnn_hurma_siniflandirma": "Ek: CNN Hurma Sınıflandırma",
    # Hafta 13
    "hafta13_nlp_temel": "NLP Temel İşlemler",
    "hafta13_duygu_analizi": "Duygu Analizi (HuggingFace)",
    "hafta13_spam_tespiti": "Spam Tespiti",
    "ek_amazon_yorumlari_nlp": "Ek: Amazon Yorumları NLP",
    "ek_spam_siniflandirici_proje": "Ek: Spam Sınıflandırıcı Proje",
    "ek_wordcloud_gradio": "Ek: WordCloud + Gradio",
    # Hafta 14
    "hafta14_gemini_api": "Google Gemini API Kullanımı",
    "hafta14_kisisel_asistan": "Kişisel AI Asistan (Chatbot)",
    "hafta14_blog_yazari": "Otomatik SEO Blog Yazarı",
    "hafta14_rag_giris": "RAG Sistemi Giriş",
    # Hafta 15
    "hafta15_ai_etik": "AI Etik ve Fairness Metrikleri",
    "hafta15_capstone_sablon": "AI Capstone Proje Şablonu",
}

# Notebook konuları (dosya adı → konu listesi)
NOTEBOOK_TOPICS = {
    "hafta01_python_temel": [
        "Değişkenler, veri tipleri (str, int, float, bool)",
        "Operatörler ve tip dönüşümleri",
        "Listeler, tuple, dictionary, set",
        "Koşullar (if-elif-else) ve döngüler (for, while)",
        "Fonksiyonlar, lambda, *args, **kwargs",
        "String metodları, f-string, dosya okuma/yazma",
    ],
    "hafta01_sayi_tahmin_oyunu": [
        "while döngüsü ile oyun mantığı",
        "random modülü ile rastgele sayı üretme",
        "Kullanıcıdan input alma ve doğrulama",
    ],
    "hafta01_vki_hesaplayici": [
        "input() ile kullanıcıdan veri alma",
        "if-elif-else karar yapıları",
        "VKİ formülü ve sağlık kategorileri",
    ],
    "hafta02_numpy_pandas_temel": [
        "NumPy array oluşturma ve temel işlemler",
        "Pandas Series ve DataFrame kavramları",
        "CSV/Excel okuma, veri seçme, filtreleme",
        "Eksik veri analizi ve manipülasyon",
    ],
    "hafta02_bahsis_analizi": [
        "Seaborn tips veri seti analizi",
        "Gruplandırma ve istatistiksel özetler",
        "Veri filtreleme ve koşullu analiz",
    ],
    "hafta02_titanic_eda": [
        "Titanic veri seti keşifsel analizi",
        "Eksik veri görselleştirme",
        "Hayatta kalma oranları analizi",
    ],
    "hafta03_matplotlib_seaborn": [
        "Matplotlib: plot, bar, scatter, hist, pie",
        "Grafik özelleştirme: başlık, eksen, renk",
        "Seaborn: countplot, boxplot, heatmap, pairplot",
    ],
    "hafta03_covid_yarisan_grafik": [
        "COVID-19 verileri ile bar chart race",
        "Animasyonlu görselleştirme",
        "bar_chart_race kütüphanesi",
    ],
    "hafta03_supermarket_gorsellestirme": [
        "Süpermarket satış verileri analizi",
        "Çoklu grafik türleri ile görselleştirme",
        "Kategori bazlı satış karşılaştırması",
    ],
    "hafta03_google_trends": [
        "Google Trends API ile veri çekme",
        "pytrends kütüphanesi kullanımı",
        "Trend analizi ve görselleştirme",
    ],
    "hafta04_istatistik_temel": [
        "Tanımlayıcı istatistik: ortalama, medyan, mod",
        "Normal dağılım ve Shapiro-Wilk testi",
        "Korelasyon: Pearson, Spearman",
        "T-Test ve ANOVA",
    ],
    "hafta04_ab_testi": [
        "A/B testi metodolojisi",
        "Hipotez testleri: H0, H1, p-value",
        "İstatistiksel anlamlılık değerlendirmesi",
    ],
    "hafta04_chi_square": [
        "Ki-Kare bağımsızlık testi",
        "Titanic: sınıf vs hayatta kalma",
        "Kategorik değişkenler arası ilişki",
    ],
    "hafta05_lineer_regresyon": [
        "Basit ve Çoklu Lineer Regresyon",
        "Train/Test Split",
        "MAE, MSE, RMSE, R² metrikleri",
    ],
    "hafta05_arac_fiyat_tahmini": [
        "Araç fiyat tahmini modeli",
        "Feature Engineering",
        "Model değerlendirme ve karşılaştırma",
    ],
    "hafta05_ev_fiyat_tahmini": [
        "Kaggle House Prices yarışması",
        "Polinom Regresyon",
        "Pipeline ve model seçimi",
    ],
    "hafta05_gradio_deployment": [
        "Gradio arayüz oluşturma",
        "Model deployment temelleri",
        "Hugging Face Spaces'a yükleme",
    ],
    "hafta06_siniflandirma_temel": [
        "Lojistik Regresyon, KNN, Decision Tree",
        "Confusion Matrix: TP, TN, FP, FN",
        "Accuracy, Precision, Recall, F1-Score",
        "ROC Eğrisi ve AUC",
    ],
    "hafta06_titanic_kaggle": [
        "Kaggle Titanic yarışması submission",
        "Feature Engineering stratejileri",
        "Cross Validation",
    ],
    "hafta06_diyabet_teshisi": [
        "Pima Indians Diabetes veri seti",
        "Sınıflandırma algoritmaları karşılaştırma",
        "Model performans değerlendirmesi",
    ],
    "hafta07_ensemble_modeller": [
        "Ensemble Learning: Bagging vs Boosting",
        "Random Forest, XGBoost, LightGBM",
        "Feature Importance analizi",
    ],
    "hafta07_musteri_terk_analizi": [
        "Telekom müşteri terk tahmini",
        "XGBoost ile sınıflandırma",
        "İş zekası odaklı analiz",
    ],
    "hafta07_hiperparametre_avi": [
        "GridSearchCV ve RandomizedSearchCV",
        "Optimal parametre arama",
        "Overfitting ve Regularization",
    ],
    "hafta08_kmeans_segmentasyon": [
        "K-Means kümeleme algoritması",
        "Elbow Method ve Silhouette Score",
        "RFM müşteri segmentasyonu",
    ],
    "hafta08_zaman_serisi_prophet": [
        "Zaman serisi kavramları",
        "Facebook Prophet ile tahmin",
        "Trend ve mevsimsellik analizi",
    ],
    "hafta08_film_oneri_sistemi": [
        "Content-Based Filtering",
        "Collaborative Filtering",
        "Cosine Similarity ve Lift-based scoring",
        "Gradio UI ile interaktif öneri",
    ],
    "hafta09_mlops_pipeline": [
        "Model yaşam döngüsü yönetimi",
        "joblib ile model kaydetme/yükleme",
        "MLOps pipeline tasarımı",
    ],
    "hafta09_streamlit_ornek": [
        "Streamlit ile interaktif dashboard",
        "Widget'lar ve layout yönetimi",
        "Veri görselleştirme entegrasyonu",
    ],
    "hafta09_capstone_sablon": [
        "Capstone proje yapısı",
        "Veri toplama → Model → Deploy akışı",
        "Proje sunumu ve değerlendirme",
    ],
    "hafta10_ann_temel": [
        "Yapay sinir ağı mimarisi",
        "MNIST el yazısı rakam tanıma",
        "TensorFlow/Keras ile model oluşturma",
        "Aktivasyon fonksiyonları ve optimizer",
    ],
    "hafta10_quickdraw": [
        "Google QuickDraw veri seti",
        "CNN ile çizim tanıma",
        "Data preprocessing ve augmentation",
    ],
    "hafta10_ann_regresyon": [
        "ANN ile regresyon problemi",
        "Ev fiyat tahmini",
        "Dropout ve Early Stopping",
    ],
    "hafta11_opencv_temel": [
        "Dijital görüntü kavramları",
        "OpenCV: imread, imwrite",
        "Renk dönüştürme: BGR→RGB, Grayscale",
    ],
    "hafta11_filtreler_kenar": [
        "Blur, Gaussian Blur, Median Blur",
        "Canny Edge Detection",
        "Eşikleme (Thresholding)",
    ],
    "hafta11_sekil_metin": [
        "Şekil çizme: rectangle, circle, line",
        "Metin ekleme: putText",
        "Kontur tespiti ve analizi",
    ],
    "hafta12_cnn_temel": [
        "CNN mimarisi: Conv2D, MaxPool, Dense",
        "CIFAR-10 sınıflandırma",
        "Filtre/Kernel görselleştirme",
    ],
    "hafta12_transfer_learning": [
        "Transfer Learning kavramı",
        "MobileNet/VGG16 ile fine-tuning",
        "Feature Extraction stratejisi",
    ],
    "hafta12_maske_tespiti": [
        "CNN ile yüz maskesi tespiti",
        "Data Augmentation",
        "Binary sınıflandırma pipeline",
    ],
    "hafta13_nlp_temel": [
        "Tokenization, stemming, lemmatization",
        "Bag of Words ve TF-IDF",
        "Stop words ve metin temizleme",
    ],
    "hafta13_duygu_analizi": [
        "HuggingFace Transformers pipeline",
        "BERT/DistilBERT ile duygu analizi",
        "Türkçe NLP modelleri",
    ],
    "hafta13_spam_tespiti": [
        "SMS spam sınıflandırma",
        "TF-IDF + ML pipeline",
        "Model değerlendirme metrikleri",
    ],
    "hafta14_gemini_api": [
        "Google Gemini API kurulumu",
        "Text generation ve chat",
        "Yapısal çıktı (JSON) üretme",
    ],
    "hafta14_kisisel_asistan": [
        "Persona chatbot oluşturma",
        "Sistem prompt'u tasarımı",
        "Konuşma geçmişi yönetimi",
    ],
    "hafta14_blog_yazari": [
        "Otomatik SEO blog yazımı",
        "Prompt chaining tekniği",
        "İçerik yapılandırma",
    ],
    "hafta14_rag_giris": [
        "RAG: Retrieval-Augmented Generation",
        "ChromaDB ile vektör veritabanı",
        "Doküman embedding ve arama",
    ],
    "hafta15_ai_etik": [
        "AI bias türleri ve tespiti",
        "Fairness metrikleri",
        "Sorumlu AI geliştirme ilkeleri",
    ],
    "hafta15_capstone_sablon": [
        "AI Capstone proje yapısı",
        "End-to-end AI projesi",
        "Sunum ve değerlendirme kriterleri",
    ],
}


def get_week_num(filepath: str) -> str:
    """Dosya yolundan hafta numarasını çıkarır."""
    basename = os.path.basename(filepath).replace(".ipynb", "")
    # hafta01/hafta01_xxx.ipynb → "01"
    # hafta01/ek_xxx.ipynb → parent dizinden al
    if basename.startswith("hafta"):
        return basename[5:7]
    # ek_ dosyaları → parent dizinden
    parent = os.path.basename(os.path.dirname(filepath))
    if parent.startswith("hafta"):
        return parent[5:7]
    return "00"


def get_notebook_key(filepath: str) -> str:
    """Dosya yolundan NOTEBOOK_TITLES key'ini çıkarır."""
    return os.path.basename(filepath).replace(".ipynb", "")


def get_relative_path(filepath: str, notebooks_dir: str) -> str:
    """Notebook'un repo-relative path'ini döndürür."""
    return os.path.relpath(filepath, os.path.dirname(notebooks_dir))


def is_header_cell(source: str) -> bool:
    """Hücrenin bizim header'ımız olup olmadığını kontrol eder."""
    return "ECS" in source and "shields.io" in source and "Eğitmen" in source


def is_footer_cell(source: str) -> bool:
    """Hücrenin bizim footer'ımız olup olmadığını kontrol eder."""
    return "Dr. Murat Altun" in source and ("Tüm hakları saklıdır" in source or "hakları saklıdır" in source or "Yapay Zeka Okulum" in source) and "shields.io" in source


def build_header(week_num: str, nb_key: str, nb_rel_path: str) -> str:
    """Profesyonel header markdown oluşturur."""
    week_info = WEEKS.get(week_num)
    if not week_info:
        return ""

    week_title, section, module, hours, pptx_file = week_info
    nb_title = NOTEBOOK_TITLES.get(nb_key, nb_key.replace("_", " ").title())
    pdf_file = pptx_file.replace(".pptx", ".pdf")

    # Colab ve GitHub URL'leri
    colab_url = f"{COLAB_URL}/{nb_rel_path}"
    github_url = f"{BASE_URL}/{nb_rel_path}"
    pdf_url = f"{RAW_URL}/web/public/sunumlar/{pdf_file}"
    web_url = f"{WEB_URL}/hafta/{week_num}/"

    # Ek notebook mu?
    is_ek = nb_key.startswith("ek_")

    # Konu listesi
    topics = NOTEBOOK_TOPICS.get(nb_key, [])
    topics_md = ""
    if topics:
        items = "\n".join(f"> - {t}" for t in topics)
        topics_md = f"""
---

> **Bu defterde neler öğreneceksiniz?**
>
{items}"""

    # Ek badge
    ek_badge = ""
    if is_ek:
        ek_badge = ' <img src="https://img.shields.io/badge/EK%20MATERYAL-FFB300?style=flat&logoColor=white" alt="Ek Materyal"/>'

    header = f"""<div align="center">

<img src="https://img.shields.io/badge/ECS-Veri%20Bilimi%20%26%20YZ%20Uzmanl%C4%B1%C4%9F%C4%B1-5B2C1E?style=for-the-badge&logo=python&logoColor=white" alt="ECS VB&YZ 90"/>{ek_badge}

# Hafta {int(week_num)}: {nb_title}

**{section}** · {module} · {hours} Saat

---

<a href="{colab_url}"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Colab'da Aç"/></a>&nbsp;
<a href="{github_url}"><img src="https://img.shields.io/badge/GitHub'da%20A%C3%A7-181717?style=flat&logo=github&logoColor=white" alt="GitHub'da Aç"/></a>&nbsp;
<a href="{pdf_url}"><img src="https://img.shields.io/badge/PDF%20Sunum-EC1C24?style=flat&logo=adobeacrobatreader&logoColor=white" alt="PDF Sunum"/></a>&nbsp;
<a href="{web_url}"><img src="https://img.shields.io/badge/Web%20Sitesi-2B7A78?style=flat&logo=googlechrome&logoColor=white" alt="Web Sitesi"/></a>

</div>

---

**Eğitmen:** Dr. Murat Altun · [yapayzekaokulum.com](https://yapayzekaokulum.com) · [GitHub](https://github.com/DrMuratAltun)

**Program:** ECS Veri Bilimi ve Yapay Zeka Uzmanlığı · 90 Saat · 15 Hafta{topics_md}"""

    return header


def build_footer() -> str:
    """Profesyonel footer markdown oluşturur."""
    return """---

<div align="center">

<img src="https://img.shields.io/badge/ECS-Veri%20Bilimi%20%26%20YZ-5B2C1E?style=flat-square&logo=python&logoColor=white" alt="ECS"/>

**Dr. Murat Altun** · Veri Bilimi ve Yapay Zeka Eğitmeni

<a href="https://yapayzekaokulum.com">Yapay Zeka Okulum</a> ·
<a href="https://gencyz.com">GençYZ</a> ·
<a href="https://yz-araclari.com">YZ Araçları</a> ·
<a href="https://scholargent.com">ScholarAI</a> ·
<a href="https://drmurataltun.github.io">Kişisel Site</a>

<a href="https://drmurataltun.github.io/VB-YZ-90/">drmurataltun.github.io/VB-YZ-90</a>

---

*Bu materyal ECS Veri Bilimi ve Yapay Zeka Uzmanlığı Programı için hazırlanmıştır.*

&copy; 2026 Dr. Murat Altun. Tüm hakları saklıdır.

</div>"""


def make_markdown_cell(source: str) -> dict:
    """Yeni bir markdown cell oluşturur."""
    return {
        "cell_type": "markdown",
        "metadata": {},
        "source": source.split("\n")  # Her satırı ayrı eleman olarak
    }


def process_notebook(filepath: str, notebooks_dir: str) -> bool:
    """Tek bir notebook'u işler. Değişiklik olduysa True döner."""
    with open(filepath, "r", encoding="utf-8") as f:
        nb = json.load(f)

    cells = nb.get("cells", [])
    if not cells:
        print(f"  ⚠ Boş notebook, atlanıyor: {filepath}")
        return False

    nb_rel_path = get_relative_path(filepath, notebooks_dir)
    week_num = get_week_num(filepath)
    nb_key = get_notebook_key(filepath)

    if week_num == "00":
        print(f"  ⚠ Hafta numarası belirlenemedi, atlanıyor: {filepath}")
        return False

    header_md = build_header(week_num, nb_key, nb_rel_path)
    footer_md = build_footer()

    if not header_md:
        print(f"  ⚠ Header oluşturulamadı, atlanıyor: {filepath}")
        return False

    # Mevcut header/footer'ı kaldır (idempotent)
    new_cells = []
    for cell in cells:
        if cell.get("cell_type") != "markdown":
            new_cells.append(cell)
            continue
        source = "".join(cell.get("source", []))
        if is_header_cell(source) or is_footer_cell(source):
            continue  # Eski header/footer'ı atla
        new_cells.append(cell)

    # source satırlarını düzelt — her satır \n ile bitmeli (son satır hariç)
    def source_lines(md: str) -> list:
        lines = md.split("\n")
        result = []
        for i, line in enumerate(lines):
            if i < len(lines) - 1:
                result.append(line + "\n")
            else:
                result.append(line)
        return result

    # Header ve footer ekle
    header_cell = {
        "cell_type": "markdown",
        "metadata": {},
        "source": source_lines(header_md)
    }
    footer_cell = {
        "cell_type": "markdown",
        "metadata": {},
        "source": source_lines(footer_md)
    }

    new_cells.insert(0, header_cell)
    new_cells.append(footer_cell)

    nb["cells"] = new_cells

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(nb, f, ensure_ascii=False, indent=1)

    return True


def main():
    project_dir = Path(__file__).parent.parent
    notebooks_dir = project_dir / "notebooks"

    if not notebooks_dir.exists():
        print(f"❌ Notebooks dizini bulunamadı: {notebooks_dir}")
        sys.exit(1)

    # Tüm notebook'ları bul
    notebooks = sorted(notebooks_dir.rglob("*.ipynb"))

    # Root seviyedeki (hafta klasörü dışındaki) notebook'ları hariç tut
    notebooks = [nb for nb in notebooks if nb.parent != notebooks_dir]

    print(f"📚 {len(notebooks)} notebook bulundu.\n")

    success = 0
    skipped = 0

    for nb_path in notebooks:
        rel = nb_path.relative_to(notebooks_dir)
        print(f"📝 İşleniyor: {rel}")

        if process_notebook(str(nb_path), str(notebooks_dir)):
            success += 1
            print(f"   ✅ Başarılı")
        else:
            skipped += 1
            print(f"   ⏭ Atlandı")

    print(f"\n{'='*50}")
    print(f"✅ Başarılı: {success}")
    print(f"⏭ Atlanan: {skipped}")
    print(f"📊 Toplam: {len(notebooks)}")


if __name__ == "__main__":
    main()
