/**
 * Countries Configuration
 * Data for all supported countries in World Exams
 */

export interface Country {
  code: string;
  name: string;
  exam: string;
  flag: string;
  flagStripe: string;
  status: 'live' | 'setup' | 'soon';
  region: 'top10' | 'latam' | 'europe' | 'asia';
  questionCount?: number;
  folder?: string;  // Folder name in src/content/questions/ (defaults to code.toLowerCase())
  externalUrl?: string;  // External URL for dedicated exam platforms (e.g., saberparatodos)
}

export const countries: Country[] = [
  // LIVE COUNTRIES
  {
    code: 'CO',
    name: 'Colombia',
    exam: 'Saber 11 / ICFES',
    flag: '🇨🇴',
    flagStripe: 'linear-gradient(to right, #FCD116 50%, #003893 50%, #003893 75%, #CE1126 75%)',
    status: 'live',
    region: 'latam',
    folder: 'colombia',
    questionCount: 1813,
    externalUrl: 'https://saberparatodos.space/',
  },

  // TOP 10 Countries by Population
  {
    code: 'CN',
    name: 'China',
    exam: '高考 Gaokao',
    flag: '🇨🇳',
    flagStripe: 'linear-gradient(to right, #DE2910 60%, #FFDE00 60%)',
    status: 'soon',
    region: 'top10',
  },
  {
    code: 'IN',
    name: 'India',
    exam: 'JEE / NEET',
    flag: '🇮🇳',
    flagStripe: 'linear-gradient(to right, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
    status: 'soon',
    region: 'top10',
  },
  {
    code: 'US',
    name: 'United States',
    exam: 'SAT / ACT',
    flag: '🇺🇸',
    flagStripe: 'linear-gradient(to right, #3C3B6E 33%, #B22234 33%, #B22234 66%, #FFFFFF 66%)',
    status: 'soon',
    region: 'top10',
    folder: 'usa',
  },
  {
    code: 'ID',
    name: 'Indonesia',
    exam: 'SNBT / UTBK',
    flag: '🇮🇩',
    flagStripe: 'linear-gradient(to right, #CE1126 50%, #FFFFFF 50%)',
    status: 'soon',
    region: 'top10',
  },
  {
    code: 'BR',
    name: 'Brasil',
    exam: 'ENEM',
    flag: '🇧🇷',
    flagStripe: 'linear-gradient(to right, #009739 33%, #FEDD00 33%, #FEDD00 66%, #002776 66%)',
    status: 'soon',
    region: 'top10',
    folder: 'brasil',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    exam: 'UTME / JAMB',
    flag: '🇳🇬',
    flagStripe: 'linear-gradient(to right, #008751 33%, #FFFFFF 33%, #FFFFFF 66%, #008751 66%)',
    status: 'soon',
    region: 'top10',
  },
  {
    code: 'RU',
    name: 'Russia',
    exam: 'ЕГЭ EGE',
    flag: '🇷🇺',
    flagStripe: 'linear-gradient(to right, #FFFFFF 33%, #0039A6 33%, #0039A6 66%, #D52B1E 66%)',
    status: 'soon',
    region: 'top10',
  },
  {
    code: 'JP',
    name: 'Japan',
    exam: '共通テスト Center',
    flag: '🇯🇵',
    flagStripe: 'linear-gradient(to right, #FFFFFF 40%, #BC002D 40%, #BC002D 60%, #FFFFFF 60%)',
    status: 'soon',
    region: 'top10',
  },
  {
    code: 'MX',
    name: 'México',
    exam: 'EXANI / CENEVAL',
    flag: '🇲🇽',
    flagStripe: 'linear-gradient(to right, #006847 33%, #FFFFFF 33%, #FFFFFF 66%, #CE1126 66%)',
    status: 'soon',
    region: 'top10',
    folder: 'mexico',
  },
  {
    code: 'EG',
    name: 'Egypt',
    exam: 'الثانوية Thanaweya',
    flag: '🇪🇬',
    flagStripe: 'linear-gradient(to right, #CE1126 33%, #FFFFFF 33%, #FFFFFF 66%, #000000 66%)',
    status: 'soon',
    region: 'top10',
  },

  // LATIN AMERICA
  {
    code: 'AR',
    name: 'Argentina',
    exam: 'Ingreso Universitario',
    flag: '🇦🇷',
    flagStripe: 'linear-gradient(to right, #74ACDF 33%, #FFFFFF 33%, #FFFFFF 66%, #74ACDF 66%)',
    status: 'setup',
    region: 'latam',
  },
  {
    code: 'CL',
    name: 'Chile',
    exam: 'PAES',
    flag: '🇨🇱',
    flagStripe: 'linear-gradient(to right, #0039A6 33%, #FFFFFF 33%, #FFFFFF 66%, #D52B1E 66%)',
    status: 'setup',
    region: 'latam',
  },
  {
    code: 'PE',
    name: 'Perú',
    exam: 'Admisión Universitaria',
    flag: '🇵🇪',
    flagStripe: 'linear-gradient(to right, #D91023 33%, #FFFFFF 33%, #FFFFFF 66%, #D91023 66%)',
    status: 'setup',
    region: 'latam',
  },
  {
    code: 'EC',
    name: 'Ecuador',
    exam: 'Ser Bachiller',
    flag: '🇪🇨',
    flagStripe: 'linear-gradient(to right, #FFD100 50%, #0072CE 50%, #0072CE 75%, #EF3340 75%)',
    status: 'setup',
    region: 'latam',
  },
  {
    code: 'VE',
    name: 'Venezuela',
    exam: 'OPSU',
    flag: '🇻🇪',
    flagStripe: 'linear-gradient(to right, #FFCC00 33%, #00247D 33%, #00247D 66%, #CF142B 66%)',
    status: 'setup',
    region: 'latam',
  },

  // EUROPE
  {
    code: 'ES',
    name: 'España',
    exam: 'Selectividad / EBAU',
    flag: '🇪🇸',
    flagStripe: 'linear-gradient(to right, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%)',
    status: 'setup',
    region: 'europe',
  },
  {
    code: 'FR',
    name: 'France',
    exam: 'Baccalauréat',
    flag: '🇫🇷',
    flagStripe: 'linear-gradient(to right, #002395 33%, #FFFFFF 33%, #FFFFFF 66%, #ED2939 66%)',
    status: 'soon',
    region: 'europe',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    exam: 'GCSE / A-Levels',
    flag: '🇬🇧',
    flagStripe: 'linear-gradient(to right, #012169 33%, #FFFFFF 33%, #FFFFFF 66%, #C8102E 66%)',
    status: 'setup',
    region: 'europe',
  },

  // ASIA-PACIFIC
  {
    code: 'KR',
    name: 'South Korea',
    exam: '수능 Suneung / CSAT',
    flag: '🇰🇷',
    flagStripe: 'linear-gradient(to right, #FFFFFF 25%, #0047A0 25%, #0047A0 50%, #C60C30 50%, #C60C30 75%, #FFFFFF 75%)',
    status: 'soon',
    region: 'asia',
  },
  {
    code: 'AU',
    name: 'Australia',
    exam: 'ATAR / NAPLAN',
    flag: '🇦🇺',
    flagStripe: 'linear-gradient(to right, #00008B 60%, #FFFFFF 60%, #FFFFFF 70%, #FF0000 70%)',
    status: 'setup',
    region: 'asia',
  },
];

export const getCountriesByRegion = (region: Country['region']) =>
  countries.filter(c => c.region === region);

export const getCountryByCode = (code: string) =>
  countries.find(c => c.code.toLowerCase() === code.toLowerCase());
