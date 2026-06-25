import type { CategoryMeta } from "@/types";

export const categories: CategoryMeta[] = [
  {
    slug: "health",
    title: "Health",
    description: "BMI, body fat, ideal weight and vital health metrics.",
    icon: "HeartPulse",
    color: "var(--emerald)",
    translations: {
      "ms-bn": { title: "Kesihatan", description: "BMI, lemak badan, berat ideal dan metrik kesihatan penting." },
      id: { title: "Kesehatan", description: "BMI, lemak tubuh, berat ideal, dan metrik kesehatan vital." },
    },
  },
  {
    slug: "fitness",
    title: "Fitness",
    description: "Heart rate zones, pace, running and training calculators.",
    icon: "Dumbbell",
    color: "var(--teal)",
    translations: {
      "ms-bn": { title: "Kecergasan", description: "Zon kadar jantung, kelajuan, larian dan kalkulator latihan." },
      id: { title: "Kebugaran", description: "Zona detak jantung, pace, lari, dan kalkulator latihan." },
    },
  },
  {
    slug: "nutrition",
    title: "Nutrition",
    description: "Calories, macros, protein and water intake planning.",
    icon: "Apple",
    color: "var(--mint)",
    translations: {
      "ms-bn": { title: "Pemakanan", description: "Perancangan kalori, makro, protein dan pengambilan air." },
      id: { title: "Nutrisi", description: "Perencanaan kalori, makro, protein, dan asupan air." },
    },
  },
  {
    slug: "pregnancy",
    title: "Pregnancy",
    description: "Due dates, weight gain and pregnancy milestones.",
    icon: "Baby",
    color: "var(--teal)",
    translations: {
      "ms-bn": { title: "Kehamilan", description: "Tarikh jangkaan bersalin, kenaikan berat dan kemajuan kehamilan." },
      id: { title: "Kehamilan", description: "Perkiraan tanggal lahir, kenaikan berat, dan tahapan kehamilan." },
    },
  },
  {
    slug: "children",
    title: "Children",
    description: "Growth charts and child health calculators.",
    icon: "PersonStanding",
    color: "var(--emerald)",
    translations: {
      "ms-bn": { title: "Kanak-kanak", description: "Carta pertumbuhan dan kalkulator kesihatan kanak-kanak." },
      id: { title: "Anak-anak", description: "Grafik pertumbuhan dan kalkulator kesehatan anak." },
    },
  },
  {
    slug: "medical",
    title: "Medical",
    description: "Clinical reference calculators for general use.",
    icon: "Stethoscope",
    color: "var(--emerald-deep)",
    translations: {
      "ms-bn": { title: "Perubatan", description: "Kalkulator rujukan klinikal untuk kegunaan umum." },
      id: { title: "Medis", description: "Kalkulator referensi klinis untuk penggunaan umum." },
    },
  },
  {
    slug: "finance",
    title: "Finance",
    description: "Loans, savings, tax and everyday money calculators.",
    icon: "Wallet",
    color: "var(--ink-soft)",
    translations: {
      "ms-bn": { title: "Kewangan", description: "Pinjaman, simpanan, cukai dan kalkulator kewangan harian." },
      id: { title: "Keuangan", description: "Pinjaman, tabungan, pajak, dan kalkulator keuangan sehari-hari." },
    },
  },
  {
    slug: "converters",
    title: "Unit Converters",
    description: "Length, weight, volume and temperature conversions.",
    icon: "ArrowLeftRight",
    color: "var(--teal)",
    translations: {
      "ms-bn": { title: "Penukar Unit", description: "Penukaran panjang, berat, isipadu dan suhu." },
      id: { title: "Konverter Satuan", description: "Konversi panjang, berat, volume, dan suhu." },
    },
  },
  {
    slug: "education",
    title: "Education",
    description: "GPA, grade and study-related calculators.",
    icon: "GraduationCap",
    color: "var(--mint)",
    translations: {
      "ms-bn": { title: "Pendidikan", description: "Kalkulator GPA, gred dan berkaitan pembelajaran." },
      id: { title: "Pendidikan", description: "Kalkulator IPK, nilai, dan hal terkait studi." },
    },
  },
];
