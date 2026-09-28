// Stylized AI Character Avatar SVGs (Non-photographic, digital AI illustrations)

export const AI_AVATARS = {
  // AI Character Driver Younes (young modern driver with yellow logistics cap and audio headset)
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
      <!-- Vest & Shoulders -->
      <path d="M20 95 C20 72 32 68 50 68 C68 68 80 72 80 95 Z" fill="#ffc700"/>
      <path d="M35 70 L42 95 L58 95 L65 70 Z" fill="#181c21"/>
      <rect x="25" y="80" width="8" height="15" fill="#ffffff" opacity="0.8"/>
      <rect x="67" y="80" width="8" height="15" fill="#ffffff" opacity="0.8"/>
      <!-- Neck -->
      <rect x="42" y="56" width="16" height="16" rx="4" fill="#d9986b"/>
      <!-- Head -->
      <ellipse cx="50" cy="46" rx="19" ry="21" fill="#e8ab7e"/>
      <!-- Eyes & Eyebrows -->
      <ellipse cx="43" cy="44" rx="2.5" ry="3" fill="#181c21"/>
      <ellipse cx="57" cy="44" rx="2.5" ry="3" fill="#181c21"/>
      <path d="M39 39 Q43 37 47 39" stroke="#181c21" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M53 39 Q57 37 61 39" stroke="#181c21" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Friendly Smile -->
      <path d="M44 54 Q50 60 56 54" stroke="#873e23" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <!-- Modern Driver Cap with visor -->
      <path d="M30 36 C30 20 70 20 70 36 Z" fill="url(#capGrad)"/>
      <path d="M26 36 C26 36 50 30 74 36 L70 41 C50 37 30 41 26 36 Z" fill="#ffb300"/>
      <!-- Headset for dispatch -->
      <path d="M29 38 A22 22 0 0 1 71 38" fill="none" stroke="#636467" stroke-width="3"/>
      <ellipse cx="29" cy="42" rx="4" ry="6" fill="#181c21"/>
      <path d="M29 44 Q33 55 42 55" fill="none" stroke="#636467" stroke-width="2.5"/>
      <circle cx="43" cy="55" r="2" fill="#ffc700"/>
    </svg>
  `)}`,

  // AI Character Driver Boushaib (Moroccan veteran trucker with high-vis vest and friendly smile)
  driverBoushaib: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="bgB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2d3136"/>
          <stop offset="100%" stop-color="#111315"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#bgB)"/>
      <!-- Body / Hi-Vis Orange/Yellow Vest -->
      <path d="M18 95 C18 70 30 66 50 66 C70 66 82 70 82 95 Z" fill="#ff9f00"/>
      <!-- Reflective Silver Stripes -->
      <path d="M30 72 L33 95 L40 95 L37 72 Z" fill="#ffffff" opacity="0.9"/>
      <path d="M70 72 L67 95 L60 95 L63 72 Z" fill="#ffffff" opacity="0.9"/>
      <path d="M42 66 L50 78 L58 66 Z" fill="#2d3136"/>
      <!-- Neck -->
      <rect x="42" y="55" width="16" height="16" rx="4" fill="#c98a58"/>
      <!-- Head -->
      <ellipse cx="50" cy="45" rx="20" ry="21" fill="#d9986b"/>
      <!-- Subtle Moustache for Boushaib -->
      <path d="M41 53 Q50 56 59 53 Q50 51 41 53 Z" fill="#2d3136"/>
      <path d="M44 56 Q50 60 56 56" stroke="#2d3136" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Eyes & Gentle Crow's Feet -->
      <circle cx="42" cy="43" r="2.5" fill="#181c21"/>
      <circle cx="58" cy="43" r="2.5" fill="#181c21"/>
      <!-- Trucker Baseball Cap -->
      <path d="M28 35 C28 18 72 18 72 35 Z" fill="#181c21"/>
      <path d="M25 35 C25 35 50 28 75 35 L71 40 C50 36 29 40 25 35 Z" fill="#ffc700"/>
      <!-- Next Gen Cap Badge -->
      <circle cx="50" cy="27" r="4.5" fill="#ffc700"/>
      <path d="M48 25 L52 27 L48 29" stroke="#181c21" stroke-width="1.5" fill="none"/>
    </svg>
  `)}`,

  // AI Character Profile Logo (NG Badge)
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

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1U9sn4Zp2wqsqcMwNWAqk3z2MgtUO_uHMy9Ml4iD9QnugdMo9EHnrcPzJYWo4ZQZtRR_Ik8gwJpK_qnTcE334bBj3rXIBZhpsSGVikIEnySQm5GsWrgZCNPmEu0fbFEHeVg5oj_TGmbVoipP-6PERNUwwQy7TWuqOhDXx9RnugFXfxx7UqfY5LEW41ciEuB3Q6i54Xevy7-Wgxv28UeHrHTrUB4Trq1CTid_ylH7ppqNgfzjWw7kdGHpEo',
  profile: AI_AVATARS.ngProfile,
  driverBoushaib: AI_AVATARS.driverBoushaib,
  driverYounes: AI_AVATARS.driverYounes,
  truckHighway: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZWMT0hLEA0ZdSfOibmYZkHP5UPI9xKcxhJKP_zcKpKPD6fDw-_Nfd6-4X8PcWmyFL9jonQZ_rbRwZ6slahSJHUuzS0VCzOP30NfBaeNwnUqTQpFJMqU8NXNwNDbNohfOtyjdkmAt6OOeileYXjrjGPf9mMQEcfQJOfDGp0SIkSsSaJRd4j4btiSNP7o4sKu7F11F7kFA0jJZE--lgLLZsbxSz_GJ73WdTs33eEuUFXhk2pwra7k6R',
  warehouseBoxes: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiA7VD-aIk9nocRbspigArwo5Hx3fFVTwlFeYgrcRjFPtprgMhJf5ShhMu9Lf7hMhNcA0ksdZSZ5JHAqeBC0S0Xs6GUB6X1GzwTi7eMsbGxSpwymJg-LsO3L5nA1YMd8RhnT2Qep39UL9o-E3GfzrnCTTDxZgN0BFkgmIzyBtk7vzePT7WGcpfZWRuJ1_1y6p3mVmAiG8tj9tENowQwwHZ6DX08utrrgc3UMz3Y2LJfk61bkjybXnY',
  mapSidiMaarouf: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYBhnd0ROrfHzgOsJLHHfPLqJ6ibMR6Tg5SJdMEDC-WGMsv2Yso_rYpQkfjCc1tjqM3XNKGXfwvRQS6JQgaz5ZZ8I2Y-sQSy4WH7w4_5WNOfAC9t2S3jhnLMr2mXh0r_LfrU5zJ_kcU9okZP9tYI_jU5d3HgB3a4CnHSXDXS_jf544uJpkknYTs6g_eS99Vt93r5I19PN7osTLVDuwlVpNVJoS0GDjAqaG5cdjVm451Gdd1HvoKGQj',
  package1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd1IYX6KeE6vlX_wCg-GUg9rIK1WNKWbQlOR4P_3SuzYobakcKiurAOvA2K28_JWWv8yKO_D1HP0Xk6LR_oF67yTVVnryd7oG0gv1XWI3WmE5IDTRL8-ilsHuCR_dat-gFBf34zIve1lAXpCXq8Br5Wz_26f09UZEHQUbjb1HGgA7EkA4B1XqUYJIJ_q0EuBERyjYZ6M8ndNrbxiefjDvaZAlNvzFHfhdz6OP0gDGvap-rJ85t1Fsd',
  package2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANxHwaBAR02IfWnNtFxPRjvdnm9XNvKUUFBnBGWA42jN_p8y93qQwyY-ksEcaodwIsvEgD0W7-guBcvSb_AuiYT1fLC7gMeoI8cvEfJ2xngoTWCIwGyo4B4Eys3ktm36LDIfbIQi41Q_nC6gPGz-JJ1jEZvUrRiwSCNKWJnPSe_UscFSJH4wPoyKO8N7fV6t4YzfDO4Zo953SNuOp04D4Q9Wjwmt97_Xm_B7QBP_iSlBG9AfYe_x2E',
  mapLarache: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd-x5dwFDHqN8DMc5aavqsrb1HIr_ZFoQ4IgiV5oyRMDR4cTnkZ479SmhcmpWadWSEofh0HIJOvcqYMtXun-RVD7QuO7dwd628dPc0Oy7Od34w8ucZtPJFJ73EJDIAq0fPGQsqONGEnZsla5bYVj3TQa_HrGWELCOfm3L5nf0oJ1ufi04w6MfjT7IiubJcNBxF-nBIalD-jmDuMbgT9rIIBHxySO8q6H1zgoxjUFDcCBWbbchghDCQ',
  cargoPallet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgUFaduWTuJOoC1lGaS1IHR9NuLY-OZ5bWPrqowgnAe6pF6m5p5L_yX9RP8No1mnmispso7r_rkd05sUFyeNqJkj8wHgQgBqG_SrEBEKQVrWMDZ5QuriKTUrHiGqCQvlmvaKJEBtczc5y_-FGrQNcXHV3AKuqIi1PPNupLBJf5r2P8mrQGQAxwENnmtb1VMODYNAT08VHxRC2cNH1_ewasggX1DQU_cvxi7qxmWplCyek93MTQmTUE',
  cargoBarcode: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgLGddvOibp0MyCx2uDHbaqjzK1M4-mALGsOlJM1hkEpgYCJW4rLFamNmngq-68qBKPywaVszVG_0nvmcGjvGBJQQ3dTMuHE0LsgOLq_SQkK8M8LIrdT3uBMZy3ngxTVb8hyJKkJnP2nFpKUWIlikNfETI3Eis-qAlAH91aEWAYTOEAZdNfKNVHZtvZzPgWmT4sTXptNOvSWWalml5ayT-15O4hcZt1iqHpB0EZSsjDiKLNod59tGb',
  cargoTruckBay: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFBYWQv-MWfdxlqRPAOOOodlsP-9L2usXv3FuFYqYZ-VLp0LPApTbn0vzpRhEfGR_CgRbwKOvMz8w5dtlB87T-wEnwVleeWRbKgUjBir-MNytdbnAOHvn1WuqBvNC_LkVyXZa7ctVGOmHorhv-8ijbjtoZTNHVfIiUc9tgI-2wZbIb6kCa4JM-8fbFqAQd0FwM9TDu5vCBkT8_sV7Hyo77qTUf91YA6_NxBx3Ou0NgQe39jtKnZV9p',
  mapTangier: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtbNMzsm7Mi2yncY5MXDJSrZfV9J6ZHdtlsqo42lDS_guZpIDFiLFjUDnAvFdFBSnMHLn6UAQ90oTfK_x3wcOqHi8upAOUXOh--xxiPpkyK7D-zahNT-jIB_TR-vQ4RARt_SCVWB3ubG_FkbEi86w9MKmtAeza05xdCuSamXpUHhngPTgUWRRBQ7bYGHF2qEpdMclKwi0RYGfQttLEGzgKNrgYgv39IrZy_lc5jzuee-7KPDCIhLqf',
  cargoVanBoxes: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWw0z0PtSjsCThJtPkH64tu7aoQFT69GNSzQO5pGoikLzzi7rMkqWgisnMQKfVMErwUc4n-63afamSASsNLE3Zfn2YL1H2lcgvcsgQaKpSfsNZ7cGcFQaFCn3xGRfxLzYcj-lvQ8RtZ5z3R13QPhQ6b4e8JzWYBf1y2vMDOuKqNWBKwjQgCT8q6ddV1Gkp3lV2tKYvdUjbFRtRuT8m8jOjjSO5yzq_KSAmjRqtfH7rxj1PGDS6ceOH',
};
