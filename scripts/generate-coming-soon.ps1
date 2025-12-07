
$template = @"
---
// Generated automatically by generate-coming-soon.ps1

const countryCode = "{{COUNTRY_CODE}}";
const countryName = "{{COUNTRY_NAME}}";
const flag = "{{FLAG}}";
const examName = "{{EXAM_NAME}}";
const colors = {
  primary: "{{COLOR1}}",
  secondary: "{{COLOR2}}",
  tertiary: "{{COLOR3}}"
};
const lang = "{{LANG}}";

// Translations
const translations = {
  'es': {
    title: 'Próximamente',
    subtitle: 'Estamos preparando el mejor banco de preguntas para',
    progress: 'Progreso del contenido',
    contribute: '¿Quieres contribuir?',
    contributeDesc: 'Ayúdanos a crear preguntas para tu país',
    github: 'Ver en GitHub',
    notify: 'Notificarme cuando esté listo',
    colombiaReady: '¡Colombia ya está disponible!',
    tryIt: 'Pruébalo ahora',
    features: 'Lo que tendrás',
    feature1: 'Banco de preguntas 100% gratuito',
    feature2: 'Alineado con el currículo oficial',
    feature3: 'Explicaciones detalladas',
    feature4: 'Sistema de ranking',
    madeWith: 'Hecho con',
    forStudents: 'para los estudiantes de',
  },
  'en': {
    title: 'Coming Soon',
    subtitle: 'We are preparing the best question bank for',
    progress: 'Content progress',
    contribute: 'Want to contribute?',
    contributeDesc: 'Help us create questions for your country',
    github: 'View on GitHub',
    notify: 'Notify me when ready',
    colombiaReady: 'Colombia is already available!',
    tryIt: 'Try it now',
    features: 'What you will get',
    feature1: '100% free question bank',
    feature2: 'Aligned with official curriculum',
    feature3: 'Detailed explanations',
    feature4: 'Ranking system',
    madeWith: 'Made with',
    forStudents: 'for the students of',
  },
  'pt': {
    title: 'Em Breve',
    subtitle: 'Estamos preparando o melhor banco de questões para',
    progress: 'Progresso do conteúdo',
    contribute: 'Quer contribuir?',
    contributeDesc: 'Ajude-nos a criar questões para o seu país',
    github: 'Ver no GitHub',
    notify: 'Avise-me quando estiver pronto',
    colombiaReady: 'Colômbia já está disponível!',
    tryIt: 'Experimente agora',
    features: 'O que você terá',
    feature1: 'Banco de questões 100% gratuito',
    feature2: 'Alinhado com o currículo oficial',
    feature3: 'Explicações detalhadas',
    feature4: 'Sistema de ranking',
    madeWith: 'Feito com',
    forStudents: 'para os estudantes de',
  },
   'fr': {
    title: 'Bientôt disponible',
    subtitle: 'Nous préparons la meilleure banque de questions pour',
    progress: 'Progression du contenu',
    contribute: 'Voulez-vous contribuer?',
    contributeDesc: 'Aidez-nous à créer des questions pour votre pays',
    github: 'Voir sur GitHub',
    notify: 'Prévenez-moi quand c\'est prêt',
    colombiaReady: 'La Colombie est déjà disponible!',
    tryIt: 'Essayez maintenant',
    features: 'Ce que vous aurez',
    feature1: 'Banque de questions 100% gratuite',
    feature2: 'Aligné avec le programme officiel',
    feature3: 'Explications détaillées',
    feature4: 'Système de classement',
    madeWith: 'Fait avec',
    forStudents: 'pour les étudiants de',
  }
};

const langFamily = lang.split('-')[0];
const t = translations[langFamily] || translations['en'];

// GitHub repo URL
const repoUrl = `https://github.com/worldexams/${countryCode}`;
const colombiaUrl = 'https://worldexams.github.io/saber-co';
---

<!DOCTYPE html>
<html lang={lang}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{t.title} - {examName} | {countryName}</title>
  <meta name="description" content={`${t.subtitle} ${examName}. ${t.feature1}.`} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0a0a0a;
      color: #f5f5dc;
      min-height: 100vh;
      overflow-x: hidden;
    }

    .noise {
      position: fixed;
      inset: 0;
      z-index: 0;
      opacity: 0.03;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E");
    }

    .gradient-bg {
      position: fixed;
      inset: 0;
      z-index: 0;
      background: radial-gradient(ellipse at top, var(--color-primary) 0%, transparent 50%),
                  radial-gradient(ellipse at bottom right, var(--color-secondary) 0%, transparent 40%),
                  radial-gradient(ellipse at bottom left, var(--color-tertiary) 0%, transparent 40%);
      opacity: 0.15;
      animation: pulse 8s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.15; }
      50% { opacity: 0.25; }
    }

    .container {
      position: relative;
      z-index: 10;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }

    .flag {
      font-size: 4rem;
      margin-bottom: 1rem;
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .title {
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
      background: linear-gradient(to right, var(--color-primary), var(--color-secondary), var(--color-tertiary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 1.1rem;
      opacity: 0.7;
      max-width: 500px;
      margin-bottom: 2rem;
    }

    .exam-name {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      border: 2px solid currentColor;
      border-radius: 9999px;
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 3rem;
      opacity: 0.9;
    }

    .progress-section {
      width: 100%;
      max-width: 400px;
      margin-bottom: 3rem;
    }

    .progress-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      opacity: 0.5;
      margin-bottom: 0.75rem;
    }

    .progress-bar {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      width: 15%;
      background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      border-radius: 9999px;
      animation: shimmer 2s ease-in-out infinite;
    }

    @keyframes shimmer {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 3rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      font-size: 0.875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      text-decoration: none;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      color: #0a0a0a;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .btn-secondary {
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #f5f5dc;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      width: 100%;
      max-width: 800px;
      margin-bottom: 3rem;
    }

    .feature {
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1rem;
      text-align: left;
    }

    .feature-icon {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .feature-text {
      font-size: 0.875rem;
      opacity: 0.7;
    }

    .colombia-banner {
      padding: 1rem 2rem;
      background: linear-gradient(to right, #FCD116, #003893, #CE1126);
      border-radius: 1rem;
      color: white;
      font-weight: 700;
      margin-bottom: 3rem;
    }

    .colombia-banner a {
      color: white;
      text-decoration: underline;
    }

    footer {
      font-size: 0.75rem;
      opacity: 0.4;
    }

    footer a {
      color: inherit;
    }
  </style>
</head>
<body style={`--color-primary: ${colors.primary}; --color-secondary: ${colors.secondary}; --color-tertiary: ${colors.tertiary};`}>
  <div class="noise"></div>
  <div class="gradient-bg"></div>

  <div class="container">
    <div class="flag">{flag}</div>

    <h1 class="title">{t.title}</h1>

    <p class="subtitle">
      {t.subtitle} <strong>{countryName}</strong>
    </p>

    <div class="exam-name">{examName}</div>

    <div class="progress-section">
      <p class="progress-label">{t.progress}</p>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    </div>

    <div class="actions">
      <a href={repoUrl} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        {t.github}
      </a>
      <a href={colombiaUrl} class="btn btn-primary">
        🇨🇴 {t.tryIt}
      </a>
    </div>

    <div class="colombia-banner">
      ✨ {t.colombiaReady} <a href={colombiaUrl}>{t.tryIt} →</a>
    </div>

    <h2 style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.2em; opacity: 0.5; margin-bottom: 1.5rem;">
      {t.features}
    </h2>

    <div class="features">
      <div class="feature">
        <div class="feature-icon">📚</div>
        <div class="feature-text">{t.feature1}</div>
      </div>
      <div class="feature">
        <div class="feature-icon">✅</div>
        <div class="feature-text">{t.feature2}</div>
      </div>
      <div class="feature">
        <div class="feature-icon">💡</div>
        <div class="feature-text">{t.feature3}</div>
      </div>
      <div class="feature">
        <div class="feature-icon">🏆</div>
        <div class="feature-text">{t.feature4}</div>
      </div>
    </div>

    <footer>
      {t.madeWith} ❤️ {t.forStudents} {countryName} •
      <a href="https://github.com/worldexams" target="_blank">WorldExams</a>
    </footer>
  </div>
</body>
</html>
"@

# Define countries configuration
$countries = @{
    "snbt-id" = @{ flag="🇮🇩"; name="Indonesia"; lang="id-ID"; exam="SNBT / UTBK"; c1="#FF0000"; c2="#FFFFFF"; c3="#FF0000" }
    "suneung-kr" = @{ flag="🇰🇷"; name="South Korea"; lang="ko-KR"; exam="Suneung"; c1="#CD2E3A"; c2="#0047A0"; c3="#FFFFFF" }
    "thanaweya-eg" = @{ flag="🇪🇬"; name="Egypt"; lang="ar-EG"; exam="Thanaweya Amma"; c1="#CE1126"; c2="#FFFFFF"; c3="#000000" }
    "utme-ng" = @{ flag="🇳🇬"; name="Nigeria"; lang="en-NG"; exam="UTME"; c1="#008751"; c2="#FFFFFF"; c3="#008751" }
    "ege-ru" = @{ flag="🇷🇺"; name="Russia"; lang="ru-RU"; exam="EGE"; c1="#FFFFFF"; c2="#0039A6"; c3="#D52B1E" }
    "bac-fr" = @{ flag="🇫🇷"; name="France"; lang="fr-FR"; exam="Baccalauréat"; c1="#002395"; c2="#FFFFFF"; c3="#ED2939" }
    "center-jp" = @{ flag="🇯🇵"; name="Japan"; lang="ja-JP"; exam="Kyotsu Test"; c1="#FFFFFF"; c2="#BC002D"; c3="#FFFFFF" }
    "saber-ar" = @{ flag="🇦🇷"; name="Argentina"; lang="es-AR"; exam="Evaluación Nacional"; c1="#74ACDF"; c2="#FFFFFF"; c3="#74ACDF" }
    "saber-cl" = @{ flag="🇨🇱"; name="Chile"; lang="es-CL"; exam="PAES"; c1="#DA291C"; c2="#FFFFFF"; c3="#0039A6" }
    "saber-mx" = @{ flag="🇲🇽"; name="Mexico"; lang="es-MX"; exam="EXANI-II"; c1="#006847"; c2="#FFFFFF"; c3="#CE1126" }
    "saber-pe" = @{ flag="🇵🇪"; name="Peru"; lang="es-PE"; exam="Examen de Admisión"; c1="#D91023"; c2="#FFFFFF"; c3="#D91023" }
    "gaokao-zh" = @{ flag="🇨🇳"; name="China"; lang="zh-CN"; exam="Gaokao"; c1="#DE2910"; c2="#FFDE00"; c3="#DE2910" }
    "sat-us" = @{ flag="🇺🇸"; name="USA"; lang="en-US"; exam="SAT"; c1="#B22234"; c2="#FFFFFF"; c3="#3C3B6E" }
    "enem-br" = @{ flag="🇧🇷"; name="Brazil"; lang="pt-BR"; exam="ENEM"; c1="#009C3B"; c2="#FFDF00"; c3="#002776" }
    "exani-mx" = @{ flag="🇲🇽"; name="Mexico"; lang="es-MX"; exam="EXANI-II"; c1="#006847"; c2="#FFFFFF"; c3="#CE1126" }
    "jee-in" = @{ flag="🇮🇳"; name="India"; lang="en-IN"; exam="JEE"; c1="#FF9933"; c2="#FFFFFF"; c3="#138808" }
}

$rootPath = "e:\scripts-python\worldexams"

foreach ($key in $countries.Keys) {
    if ($key -eq "saberparatodos") { continue }

    $countryDir = Join-Path $rootPath $key

    if (Test-Path $countryDir) {
        $pagesDir = Join-Path $countryDir "src\pages"
        if (!(Test-Path $pagesDir)) { New-Item -ItemType Directory -Path $pagesDir -Force }

        $indexPath = Join-Path $pagesDir "index.astro"
        $config = $countries[$key]

        $content = $template.Replace("{{COUNTRY_CODE}}", $key)
        $content = $content.Replace("{{COUNTRY_NAME}}", $config.name)
        $content = $content.Replace("{{FLAG}}", $config.flag)
        $content = $content.Replace("{{EXAM_NAME}}", $config.exam)
        $content = $content.Replace("{{COLOR1}}", $config.c1)
        $content = $content.Replace("{{COLOR2}}", $config.c2)
        $content = $content.Replace("{{COLOR3}}", $config.c3)
        $content = $content.Replace("{{LANG}}", $config.lang)

        Set-Content -Path $indexPath -Value $content -Encoding UTF8
        Write-Host "Generated index.astro for $key"
    }
}
