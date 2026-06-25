export type Locale = "en" | "ms-bn" | "id";

export const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ms-bn", label: "Bahasa Melayu Brunei" },
  { code: "id", label: "Bahasa Indonesia" },
];

export const defaultLocale: Locale = "en";

/**
 * UI chrome translations. Calculator forms and long-form articles remain
 * English-only for now — translating 25 calculators and dozens of articles
 * is a much larger follow-up effort. This covers navigation, homepage
 * sections, and footer, so switching language has an immediate, real,
 * site-wide effect rather than being a cosmetic dropdown.
 */
export interface Dictionary {
  nav: {
    health: string;
    fitness: string;
    nutrition: string;
    finance: string;
    converters: string;
    articles: string;
  };
  search: {
    placeholder: string;
    noResults: string;
  };
  hero: {
    eyebrow: string;
    headline1: string;
    headline2: string;
    subtext: string;
    statCalculators: string;
    statArticles: string;
    statLanguages: string;
  };
  popular: {
    eyebrow: string;
    title: string;
    viewAll: string;
    calculate: string;
  };
  categories: {
    eyebrow: string;
    title: string;
  };
  articlesSection: {
    eyebrow: string;
    title: string;
    viewAll: string;
    minRead: string;
  };
  latest: {
    eyebrow: string;
    title: string;
    newBadge: string;
  };
  stats: {
    calculationsPerformed: string;
    calculatorsLive: string;
    healthCategories: string;
    languages: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  newsletter: {
    title: string;
    subtitle: string;
    placeholder: string;
    subscribe: string;
    subscribed: string;
  };
  footer: {
    company: string;
    categories: string;
    resources: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    allArticles: string;
    sitemap: string;
    copyright: string;
    builtFor: string;
  };
  category: {
    label: string;
    comingSoon: string;
  };
  calculator: {
    home: string;
    faqTitle: string;
    relatedCalculators: string;
  };
}

export const dictionary: Record<Locale, Dictionary> = {
  en: {
    nav: {
      health: "Health",
      fitness: "Fitness",
      nutrition: "Nutrition",
      finance: "Finance",
      converters: "Converters",
      articles: "Articles",
    },
    search: {
      placeholder: "Search 150+ calculators…",
      noResults: 'No calculators match "{query}" yet.',
    },
    hero: {
      eyebrow: "Brunei's health calculator platform",
      headline1: "Measure what matters.",
      headline2: "Understand it instantly.",
      subtext:
        "From BMI to body fat, calories to heart rate zones — every calculator comes with the formula, the context, and what your number actually means.",
      statCalculators: "Health calculators",
      statArticles: "In-depth articles",
      statLanguages: "Languages supported",
    },
    popular: {
      eyebrow: "Most used",
      title: "Popular calculators",
      viewAll: "View all",
      calculate: "Calculate",
    },
    categories: {
      eyebrow: "Browse by category",
      title: "Nine ways to measure your health",
    },
    articlesSection: {
      eyebrow: "From the journal",
      title: "Featured articles",
      viewAll: "All articles",
      minRead: "min read",
    },
    latest: {
      eyebrow: "Just added",
      title: "Latest calculators",
      newBadge: "New",
    },
    stats: {
      calculationsPerformed: "Calculations performed",
      calculatorsLive: "Calculators live",
      healthCategories: "Health categories",
      languages: "Languages",
    },
    faq: {
      eyebrow: "Good to know",
      title: "Frequently asked questions",
      items: [
        {
          q: "Are FitCalc Brunei's calculators medically accurate?",
          a: "Every calculator is built on peer-reviewed formulas (e.g. Mifflin-St Jeor for BMR, WHO standards for BMI). Results are estimates intended for general guidance, not a substitute for professional medical advice.",
        },
        {
          q: "Is FitCalc Brunei free to use?",
          a: "Yes. All calculators, articles and conversion tools are free, with no account required. The site is supported by non-intrusive advertising.",
        },
        {
          q: "Can I use FitCalc Brunei in Bahasa Melayu?",
          a: "Yes — the site supports English, Bahasa Melayu Brunei and Bahasa Indonesia. Switch languages from the header at any time.",
        },
        {
          q: "How often are new calculators added?",
          a: "New calculators and articles are published weekly as the platform grows toward 150+ health, fitness, nutrition and finance tools.",
        },
      ],
    },
    newsletter: {
      title: "New calculators, straight to your inbox",
      subtitle: "One short email a month. No spam, unsubscribe any time.",
      placeholder: "you@example.com",
      subscribe: "Subscribe",
      subscribed: "You're subscribed — thanks for joining.",
    },
    footer: {
      company: "Company",
      categories: "Categories",
      resources: "Resources",
      about: "About",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      allArticles: "All Articles",
      sitemap: "Sitemap",
      copyright: "All results are estimates, not medical advice.",
      builtFor: "Built for Brunei Darussalam 🇧🇳 and Southeast Asia.",
    },
    category: {
      label: "Category",
      comingSoon: "Calculators in this category are coming soon.",
    },
    calculator: {
      home: "Home",
      faqTitle: "Frequently asked questions",
      relatedCalculators: "Related calculators",
    },
  },
  "ms-bn": {
    nav: {
      health: "Kesihatan",
      fitness: "Kecergasan",
      nutrition: "Pemakanan",
      finance: "Kewangan",
      converters: "Penukar Unit",
      articles: "Artikel",
    },
    search: {
      placeholder: "Cari 150+ kalkulator…",
      noResults: 'Tiada kalkulator sepadan dengan "{query}" lagi.',
    },
    hero: {
      eyebrow: "Platform kalkulator kesihatan Brunei",
      headline1: "Ukur apa yang penting.",
      headline2: "Fahami dengan serta-merta.",
      subtext:
        "Daripada BMI ke lemak badan, kalori ke zon kadar jantung — setiap kalkulator disertakan formula, konteks, dan apa maksud sebenar angka anda.",
      statCalculators: "Kalkulator kesihatan",
      statArticles: "Artikel mendalam",
      statLanguages: "Bahasa disokong",
    },
    popular: {
      eyebrow: "Paling banyak digunakan",
      title: "Kalkulator popular",
      viewAll: "Lihat semua",
      calculate: "Kira",
    },
    categories: {
      eyebrow: "Cari mengikut kategori",
      title: "Sembilan cara untuk mengukur kesihatan anda",
    },
    articlesSection: {
      eyebrow: "Daripada jurnal",
      title: "Artikel pilihan",
      viewAll: "Semua artikel",
      minRead: "minit bacaan",
    },
    latest: {
      eyebrow: "Baru ditambah",
      title: "Kalkulator terbaharu",
      newBadge: "Baharu",
    },
    stats: {
      calculationsPerformed: "Pengiraan dilakukan",
      calculatorsLive: "Kalkulator aktif",
      healthCategories: "Kategori kesihatan",
      languages: "Bahasa",
    },
    faq: {
      eyebrow: "Perlu tahu",
      title: "Soalan lazim",
      items: [
        {
          q: "Adakah kalkulator FitCalc Brunei tepat dari segi perubatan?",
          a: "Setiap kalkulator dibina berdasarkan formula yang disemak rakan setara (contohnya Mifflin-St Jeor untuk BMR, piawaian WHO untuk BMI). Keputusan adalah anggaran untuk panduan umum, bukan pengganti nasihat perubatan profesional.",
        },
        {
          q: "Adakah FitCalc Brunei percuma digunakan?",
          a: "Ya. Semua kalkulator, artikel dan alat penukaran adalah percuma, tanpa perlu akaun. Laman ini disokong oleh pengiklanan yang tidak mengganggu.",
        },
        {
          q: "Bolehkah saya guna FitCalc Brunei dalam Bahasa Melayu?",
          a: "Ya — laman ini menyokong Bahasa Inggeris, Bahasa Melayu Brunei dan Bahasa Indonesia. Tukar bahasa dari header pada bila-bila masa.",
        },
        {
          q: "Berapa kerap kalkulator baharu ditambah?",
          a: "Kalkulator dan artikel baharu diterbitkan setiap minggu apabila platform ini berkembang ke arah 150+ alat kesihatan, kecergasan, pemakanan dan kewangan.",
        },
      ],
    },
    newsletter: {
      title: "Kalkulator baharu, terus ke peti masuk anda",
      subtitle: "Satu e-mel ringkas sebulan. Tiada spam, boleh berhenti melanggan bila-bila masa.",
      placeholder: "anda@contoh.com",
      subscribe: "Langgan",
      subscribed: "Anda telah melanggan — terima kasih kerana menyertai.",
    },
    footer: {
      company: "Syarikat",
      categories: "Kategori",
      resources: "Sumber",
      about: "Tentang Kami",
      contact: "Hubungi Kami",
      privacy: "Dasar Privasi",
      terms: "Terma Perkhidmatan",
      allArticles: "Semua Artikel",
      sitemap: "Peta Laman",
      copyright: "Semua keputusan adalah anggaran, bukan nasihat perubatan.",
      builtFor: "Dibina untuk Brunei Darussalam 🇧🇳 dan Asia Tenggara.",
    },
    category: {
      label: "Kategori",
      comingSoon: "Kalkulator dalam kategori ini akan datang tidak lama lagi.",
    },
    calculator: {
      home: "Laman Utama",
      faqTitle: "Soalan lazim",
      relatedCalculators: "Kalkulator berkaitan",
    },
  },
  id: {
    nav: {
      health: "Kesehatan",
      fitness: "Kebugaran",
      nutrition: "Nutrisi",
      finance: "Keuangan",
      converters: "Konverter",
      articles: "Artikel",
    },
    search: {
      placeholder: "Cari 150+ kalkulator…",
      noResults: 'Belum ada kalkulator yang cocok dengan "{query}".',
    },
    hero: {
      eyebrow: "Platform kalkulator kesehatan Brunei",
      headline1: "Ukur apa yang penting.",
      headline2: "Pahami secara instan.",
      subtext:
        "Dari BMI hingga lemak tubuh, kalori hingga zona detak jantung — setiap kalkulator dilengkapi formula, konteks, dan apa arti sebenar dari angka Anda.",
      statCalculators: "Kalkulator kesehatan",
      statArticles: "Artikel mendalam",
      statLanguages: "Bahasa didukung",
    },
    popular: {
      eyebrow: "Paling banyak digunakan",
      title: "Kalkulator populer",
      viewAll: "Lihat semua",
      calculate: "Hitung",
    },
    categories: {
      eyebrow: "Jelajahi berdasarkan kategori",
      title: "Sembilan cara mengukur kesehatan Anda",
    },
    articlesSection: {
      eyebrow: "Dari jurnal",
      title: "Artikel pilihan",
      viewAll: "Semua artikel",
      minRead: "menit baca",
    },
    latest: {
      eyebrow: "Baru ditambahkan",
      title: "Kalkulator terbaru",
      newBadge: "Baru",
    },
    stats: {
      calculationsPerformed: "Kalkulasi dilakukan",
      calculatorsLive: "Kalkulator aktif",
      healthCategories: "Kategori kesehatan",
      languages: "Bahasa",
    },
    faq: {
      eyebrow: "Perlu diketahui",
      title: "Pertanyaan yang sering diajukan",
      items: [
        {
          q: "Apakah kalkulator FitCalc Brunei akurat secara medis?",
          a: "Setiap kalkulator dibangun berdasarkan formula yang telah ditinjau sejawat (misalnya Mifflin-St Jeor untuk BMR, standar WHO untuk BMI). Hasilnya adalah perkiraan untuk panduan umum, bukan pengganti nasihat medis profesional.",
        },
        {
          q: "Apakah FitCalc Brunei gratis digunakan?",
          a: "Ya. Semua kalkulator, artikel, dan alat konversi gratis digunakan, tanpa perlu akun. Situs ini didukung oleh iklan yang tidak mengganggu.",
        },
        {
          q: "Bisakah saya menggunakan FitCalc Brunei dalam Bahasa Indonesia?",
          a: "Ya — situs ini mendukung Bahasa Inggris, Bahasa Melayu Brunei, dan Bahasa Indonesia. Ganti bahasa dari header kapan saja.",
        },
        {
          q: "Seberapa sering kalkulator baru ditambahkan?",
          a: "Kalkulator dan artikel baru dipublikasikan setiap minggu seiring platform ini berkembang menuju 150+ alat kesehatan, kebugaran, nutrisi, dan keuangan.",
        },
      ],
    },
    newsletter: {
      title: "Kalkulator baru, langsung ke kotak masuk Anda",
      subtitle: "Satu email singkat per bulan. Tanpa spam, bisa berhenti berlangganan kapan saja.",
      placeholder: "anda@contoh.com",
      subscribe: "Berlangganan",
      subscribed: "Anda telah berlangganan — terima kasih sudah bergabung.",
    },
    footer: {
      company: "Perusahaan",
      categories: "Kategori",
      resources: "Sumber Daya",
      about: "Tentang Kami",
      contact: "Kontak",
      privacy: "Kebijakan Privasi",
      terms: "Ketentuan Layanan",
      allArticles: "Semua Artikel",
      sitemap: "Peta Situs",
      copyright: "Semua hasil adalah perkiraan, bukan nasihat medis.",
      builtFor: "Dibuat untuk Brunei Darussalam 🇧🇳 dan Asia Tenggara.",
    },
    category: {
      label: "Kategori",
      comingSoon: "Kalkulator dalam kategori ini akan segera hadir.",
    },
    calculator: {
      home: "Beranda",
      faqTitle: "Pertanyaan yang sering diajukan",
      relatedCalculators: "Kalkulator terkait",
    },
  },
} as const;

