// Stylized AI Character Avatar & NG Placeholders

// Generates an ultra clean high-contrast SVG badge for NG placeholders
export const createNgSvg = (text = 'NG', subtitle = 'NEXT GEN', bg = '#111315', accent = '#ffc700') => `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120">
    <rect width="160" height="120" rx="16" fill="${bg}"/>
    <rect x="3" y="3" width="154" height="114" rx="13" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
    <circle cx="80" cy="50" r="28" fill="${accent}"/>
    <text x="80" y="59" font-family="'IBM Plex Sans', sans-serif" font-size="22" font-weight="900" fill="#111315" text-anchor="middle" letter-spacing="1">${text}</text>
    <text x="80" y="98" font-family="'IBM Plex Sans', sans-serif" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle" letter-spacing="2">${subtitle}</text>
  </svg>
`)}`;

export const AI_AVATARS = {
  // Driver Younes stylized AI avatar
  driverYounes: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="bgY" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#181c21"/>
          <stop offset="100%" stop-color="#2d3136"/>
        </linearGradient>
        <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffdf94"/>
          <stop offset="100%" stop-color="#ffc700"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#bgY)"/>
      <path d="M20 95 C20 72 32 68 50 68 C68 68 80 72 80 95 Z" fill="#ffc700"/>
      <path d="M35 70 L42 95 L58 95 L65 70 Z" fill="#181c21"/>
      <rect x="25" y="80" width="8" height="15" fill="#ffffff" opacity="0.8"/>
      <rect x="67" y="80" width="8" height="15" fill="#ffffff" opacity="0.8"/>
      <rect x="42" y="56" width="16" height="16" rx="4" fill="#d9986b"/>
      <ellipse cx="50" cy="46" rx="19" ry="21" fill="#e8ab7e"/>
      <ellipse cx="43" cy="44" rx="2.5" ry="3" fill="#181c21"/>
      <ellipse cx="57" cy="44" rx="2.5" ry="3" fill="#181c21"/>
      <path d="M39 39 Q43 37 47 39" stroke="#181c21" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M53 39 Q57 37 61 39" stroke="#181c21" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M44 54 Q50 60 56 54" stroke="#873e23" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M30 36 C30 20 70 20 70 36 Z" fill="url(#capGrad)"/>
      <path d="M26 36 C26 36 50 30 74 36 L70 41 C50 37 30 41 26 36 Z" fill="#ffb300"/>
      <path d="M29 38 A22 22 0 0 1 71 38" fill="none" stroke="#636467" stroke-width="3"/>
      <ellipse cx="29" cy="42" rx="4" ry="6" fill="#181c21"/>
      <path d="M29 44 Q33 55 42 55" fill="none" stroke="#636467" stroke-width="2.5"/>
      <circle cx="43" cy="55" r="2" fill="#ffc700"/>
    </svg>
  `)}`,

  // Driver Boushaib stylized AI avatar
  driverBoushaib: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="bgB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2d3136"/>
          <stop offset="100%" stop-color="#111315"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#bgB)"/>
      <path d="M18 95 C18 70 30 66 50 66 C70 66 82 70 82 95 Z" fill="#ff9f00"/>
      <path d="M30 72 L33 95 L40 95 L37 72 Z" fill="#ffffff" opacity="0.9"/>
      <path d="M70 72 L67 95 L60 95 L63 72 Z" fill="#ffffff" opacity="0.9"/>
      <path d="M42 66 L50 78 L58 66 Z" fill="#2d3136"/>
      <rect x="42" y="55" width="16" height="16" rx="4" fill="#c98a58"/>
      <ellipse cx="50" cy="45" rx="20" ry="21" fill="#d9986b"/>
      <path d="M41 53 Q50 56 59 53 Q50 51 41 53 Z" fill="#2d3136"/>
      <path d="M44 56 Q50 60 56 56" stroke="#2d3136" stroke-width="2" stroke-linecap="round" fill="none"/>
      <circle cx="42" cy="43" r="2.5" fill="#181c21"/>
      <circle cx="58" cy="43" r="2.5" fill="#181c21"/>
      <path d="M28 35 C28 18 72 18 72 35 Z" fill="#181c21"/>
      <path d="M25 35 C25 35 50 28 75 35 L71 40 C50 36 29 40 25 35 Z" fill="#ffc700"/>
      <circle cx="50" cy="27" r="4.5" fill="#ffc700"/>
      <path d="M48 25 L52 27 L48 29" stroke="#181c21" stroke-width="1.5" fill="none"/>
    </svg>
  `)}`,

  // AI Profile NG Badge
  ngProfile: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="ngGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#181c21"/>
          <stop offset="100%" stop-color="#111315"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#ngGrad)" stroke="#ffc700" stroke-width="4"/>
      <text x="50" y="58" font-family="'IBM Plex Sans', sans-serif" font-size="36" font-weight="900" fill="#ffc700" text-anchor="middle" letter-spacing="1">NG</text>
      <circle cx="78" cy="78" r="10" fill="#006c49" stroke="#ffffff" stroke-width="3"/>
    </svg>
  `)}`,
};

// All images replaced with high-end NG-branded badges as requested
export const ASSETS = {
  logo: createNgSvg('NG', 'NEXT GEN LOGISTICS', '#111315', '#ffc700'),
  profile: AI_AVATARS.ngProfile,
  driverBoushaib: AI_AVATARS.driverBoushaib,
  driverYounes: AI_AVATARS.driverYounes,
  
  // NG-branded visuals replacing external real photos
  truckHighway: createNgSvg('NG', 'NEXT GEN LOGISTICS MAROC 24/7', '#111315', '#ffc700'),
  warehouseBoxes: createNgSvg('NG', 'تغليف وتوثيق السلعة', '#181c21', '#ffc700'),
  mapSidiMaarouf: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYBhnd0ROrfHzgOsJLHHfPLqJ6ibMR6Tg5SJdMEDC-WGMsv2Yso_rYpQkfjCc1tjqM3XNKGXfwvRQS6JQgaz5ZZ8I2Y-sQSy4WH7w4_5WNOfAC9t2S3jhnLMr2mXh0r_LfrU5zJ_kcU9okZP9tYI_jU5d3HgB3a4CnHSXDXS_jf544uJpkknYTs6g_eS99Vt93r5I19PN7osTLVDuwlVpNVJoS0GDjAqaG5cdjVm451Gdd1HvoKGQj',
  package1: createNgSvg('NG', 'طرد 1 - موثق', '#181c21', '#006c49'),
  package2: createNgSvg('NG', 'طرد 2 - موثق', '#181c21', '#ffc700'),
  mapLarache: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd-x5dwFDHqN8DMc5aavqsrb1HIr_ZFoQ4IgiV5oyRMDR4cTnkZ479SmhcmpWadWSEofh0HIJOvcqYMtXun-RVD7QuO7dwd628dPc0Oy7Od34w8ucZtPJFJ73EJDIAq0fPGQsqONGEnZsla5bYVj3TQa_HrGWELCOfm3L5nf0oJ1ufi04w6MfjT7IiubJcNBxF-nBIalD-jmDuMbgT9rIIBHxySO8q6H1zgoxjUFDcCBWbbchghDCQ',
  cargoPallet: createNgSvg('NG', 'باليطة مؤمنة', '#181c21', '#006c49'),
  cargoBarcode: createNgSvg('NG', 'كود التتبع الإلكتروني', '#111315', '#ffc700'),
  cargoTruckBay: createNgSvg('NG', 'فالشاحنة الوطنية', '#181c21', '#ffc700'),
  mapTangier: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtbNMzsm7Mi2yncY5MXDJSrZfV9J6ZHdtlsqo42lDS_guZpIDFiLFjUDnAvFdFBSnMHLn6UAQ90oTfK_x3wcOqHi8upAOUXOh--xxiPpkyK7D-zahNT-jIB_TR-vQ4RARt_SCVWB3ubG_FkbEi86w9MKmtAeza05xdCuSamXpUHhngPTgUWRRBQ7bYGHF2qEpdMclKwi0RYGfQttLEGzgKNrgYgv39IrZy_lc5jzuee-7KPDCIhLqf',
  cargoVanBoxes: createNgSvg('NG', '8 كراطن موثقة', '#111315', '#006c49'),
};
