# World Exams - Batch Update Script
# Run from E:\scripts-python\worldexams

$countries = @{
    "snbt-id" = @{
        flag = "🇮🇩"; name = "Indonesia"; lang = "id-ID"; exam = "SNBT / UTBK"
        c1 = "#FF0000"; c2 = "#FFFFFF"; c3 = "#FF0000"
        title = "Bank Soal SNBT | Indonesia"
        desc = "Bank soal open source terbaik untuk SNBT dan UTBK. Latihan Matematika, Bahasa, dan lainnya secara gratis."
    }
    "suneung-kr" = @{
        flag = "🇰🇷"; name = "대한민국"; lang = "ko-KR"; exam = "수능 (Suneung)"
        c1 = "#CD2E3A"; c2 = "#0047A0"; c3 = "#FFFFFF"
        title = "수능 문제은행 | 한국"
        desc = "최고의 오픈소스 수능 문제은행. 수학, 국어, 영어 등 무료 모의고사로 연습하세요."
    }
    "thanaweya-eg" = @{
        flag = "🇪🇬"; name = "مصر"; lang = "ar-EG"; exam = "الثانوية العامة"
        c1 = "#CE1126"; c2 = "#FFFFFF"; c3 = "#000000"
        title = "بنك الأسئلة | مصر"
        desc = "أفضل بنك أسئلة مفتوح المصدر للثانوية العامة. تدرب على الرياضيات واللغة العربية مجاناً."
    }
    "utme-ng" = @{
        flag = "🇳🇬"; name = "Nigeria"; lang = "en-NG"; exam = "UTME / JAMB"
        c1 = "#008751"; c2 = "#FFFFFF"; c3 = "#008751"
        title = "JAMB Question Bank | Nigeria"
        desc = "The best open source question bank for UTME and JAMB. Practice Mathematics, English, and more for free."
    }
    "ege-ru" = @{
        flag = "🇷🇺"; name = "Россия"; lang = "ru-RU"; exam = "ЕГЭ (EGE)"
        c1 = "#FFFFFF"; c2 = "#0039A6"; c3 = "#D52B1E"
        title = "Банк заданий ЕГЭ | Россия"
        desc = "Лучший открытый банк заданий для ЕГЭ. Практикуйте математику, русский язык и другие предметы бесплатно."
    }
    "bac-fr" = @{
        flag = "🇫🇷"; name = "France"; lang = "fr-FR"; exam = "Baccalauréat"
        c1 = "#002395"; c2 = "#FFFFFF"; c3 = "#ED2939"
        title = "Banque de Questions Bac | France"
        desc = "La meilleure banque de questions open source pour le Baccalauréat. Entraînez-vous gratuitement."
    }
    "center-jp" = @{
        flag = "🇯🇵"; name = "日本"; lang = "ja-JP"; exam = "共通テスト"
        c1 = "#FFFFFF"; c2 = "#BC002D"; c3 = "#FFFFFF"
        title = "共通テスト問題集 | 日本"
        desc = "最高のオープンソース共通テスト問題集。数学、国語、英語などを無料で練習しましょう。"
    }
    "saber-ar" = @{
        flag = "🇦🇷"; name = "Argentina"; lang = "es-AR"; exam = "Evaluación Nacional"
        c1 = "#74ACDF"; c2 = "#FFFFFF"; c3 = "#74ACDF"
        title = "Banco de Preguntas | Argentina"
        desc = "El mejor banco de preguntas open source para la Evaluación Nacional. Practicá Matemática, Lengua y más gratis."
    }
    "abitur-de" = @{
        flag = "🇩🇪"; name = "Deutschland"; lang = "de-DE"; exam = "Abitur"
        c1 = "#000000"; c2 = "#DD0000"; c3 = "#FFCC00"
        title = "Abitur Aufgabenbank | Deutschland"
        desc = "Die beste Open-Source-Aufgabenbank für das Abitur. Üben Sie Mathematik, Deutsch und mehr kostenlos."
    }
    "vestibular-pt" = @{
        flag = "🇵🇹"; name = "Portugal"; lang = "pt-PT"; exam = "Exames Nacionais"
        c1 = "#006600"; c2 = "#FF0000"; c3 = "#006600"
        title = "Banco de Questões | Portugal"
        desc = "O melhor banco de questões open source para os Exames Nacionais. Pratique Matemática, Português e mais."
    }
    "saber-pe" = @{
        flag = "🇵🇪"; name = "Perú"; lang = "es-PE"; exam = "ECE / Evaluación"
        c1 = "#D91023"; c2 = "#FFFFFF"; c3 = "#D91023"
        title = "Banco de Preguntas ECE | Perú"
        desc = "El mejor banco de preguntas open source para la ECE. Practica Matemáticas, Comunicación y más gratis."
    }
    "saber-cl" = @{
        flag = "🇨🇱"; name = "Chile"; lang = "es-CL"; exam = "SIMCE / PAES"
        c1 = "#D52B1E"; c2 = "#FFFFFF"; c3 = "#0039A6"
        title = "Banco de Preguntas PAES | Chile"
        desc = "El mejor banco de preguntas open source para SIMCE y PAES. Practica Matemáticas, Lenguaje y más gratis."
    }
    "nta-pk" = @{
        flag = "🇵🇰"; name = "Pakistan"; lang = "en-PK"; exam = "NTA / ECAT"
        c1 = "#01411C"; c2 = "#FFFFFF"; c3 = "#01411C"
        title = "ECAT Question Bank | Pakistan"
        desc = "The best open source question bank for ECAT and NTA. Practice Mathematics, Physics, Chemistry for free."
    }
    "eapcet-bd" = @{
        flag = "🇧🇩"; name = "Bangladesh"; lang = "bn-BD"; exam = "University Admission"
        c1 = "#006A4E"; c2 = "#F42A41"; c3 = "#006A4E"
        title = "প্রশ্ন ব্যাংক | বাংলাদেশ"
        desc = "বিশ্ববিদ্যালয় ভর্তি পরীক্ষার জন্য সেরা ওপেন সোর্স প্রশ্ন ব্যাংক।"
    }
    "vnuhcm-vn" = @{
        flag = "🇻🇳"; name = "Việt Nam"; lang = "vi-VN"; exam = "Kỳ thi THPT"
        c1 = "#DA251D"; c2 = "#FFCD00"; c3 = "#DA251D"
        title = "Ngân hàng Đề thi | Việt Nam"
        desc = "Ngân hàng đề thi mã nguồn mở tốt nhất cho kỳ thi THPT. Luyện tập Toán, Văn, Anh miễn phí."
    }
    "simce-ec" = @{
        flag = "🇪🇨"; name = "Ecuador"; lang = "es-EC"; exam = "Ser Bachiller"
        c1 = "#FFD100"; c2 = "#034EA2"; c3 = "#E10019"
        title = "Banco de Preguntas Ser Bachiller | Ecuador"
        desc = "El mejor banco de preguntas open source para Ser Bachiller. Practica Matemáticas, Lengua y más gratis."
    }
}

Write-Host "Countries configuration loaded: $($countries.Count) countries"
$countries.Keys | ForEach-Object { Write-Host "- $_" }
