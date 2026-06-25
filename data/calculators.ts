import type { CalculatorMeta } from "@/types";

export const calculators: CalculatorMeta[] = [
  {
    slug: "bmi-calculator", title: "BMI Calculator", shortDescription: "Check your Body Mass Index.",
    category: "health", icon: "HeartPulse", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator BMI", shortDescription: "Semak Indeks Jisim Badan anda." },
      id: { title: "Kalkulator BMI", shortDescription: "Periksa Indeks Massa Tubuh Anda." },
    },
  },
  {
    slug: "body-fat-calculator", title: "Body Fat Calculator", shortDescription: "Estimate your body fat percentage.",
    category: "health", icon: "Activity", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Lemak Badan", shortDescription: "Anggarkan peratusan lemak badan anda." },
      id: { title: "Kalkulator Lemak Tubuh", shortDescription: "Perkirakan persentase lemak tubuh Anda." },
    },
  },
  {
    slug: "muscle-mass-calculator", title: "Muscle Mass Calculator", shortDescription: "Estimate skeletal muscle mass.",
    category: "fitness", icon: "Dumbbell",
    translations: {
      "ms-bn": { title: "Kalkulator Jisim Otot", shortDescription: "Anggarkan jisim otot rangka." },
      id: { title: "Kalkulator Massa Otot", shortDescription: "Perkirakan massa otot rangka." },
    },
  },
  {
    slug: "lean-body-mass-calculator", title: "Lean Body Mass Calculator", shortDescription: "Calculate mass excluding fat.",
    category: "health", icon: "Activity",
    translations: {
      "ms-bn": { title: "Kalkulator Jisim Badan Tanpa Lemak", shortDescription: "Kira jisim badan tidak termasuk lemak." },
      id: { title: "Kalkulator Massa Tubuh Tanpa Lemak", shortDescription: "Hitung massa tubuh tidak termasuk lemak." },
    },
  },
  {
    slug: "ffmi-calculator", title: "FFMI Calculator", shortDescription: "Fat-Free Mass Index for athletes.",
    category: "fitness", icon: "Dumbbell",
    translations: {
      "ms-bn": { title: "Kalkulator FFMI", shortDescription: "Indeks Jisim Tanpa Lemak untuk atlet." },
      id: { title: "Kalkulator FFMI", shortDescription: "Indeks Massa Tanpa Lemak untuk atlet." },
    },
  },
  {
    slug: "ideal-weight-calculator", title: "Ideal Weight Calculator", shortDescription: "Find your ideal body weight range.",
    category: "health", icon: "Scale",
    translations: {
      "ms-bn": { title: "Kalkulator Berat Ideal", shortDescription: "Cari julat berat badan ideal anda." },
      id: { title: "Kalkulator Berat Ideal", shortDescription: "Temukan rentang berat badan ideal Anda." },
    },
  },
  {
    slug: "calories-calculator", title: "Calories Calculator", shortDescription: "Daily calorie needs by goal.",
    category: "nutrition", icon: "Flame", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Kalori", shortDescription: "Keperluan kalori harian mengikut matlamat." },
      id: { title: "Kalkulator Kalori", shortDescription: "Kebutuhan kalori harian sesuai tujuan Anda." },
    },
  },
  {
    slug: "protein-calculator", title: "Protein Calculator", shortDescription: "Daily protein target for your goals.",
    category: "nutrition", icon: "Apple",
    translations: {
      "ms-bn": { title: "Kalkulator Protein", shortDescription: "Sasaran protein harian untuk matlamat anda." },
      id: { title: "Kalkulator Protein", shortDescription: "Target protein harian sesuai tujuan Anda." },
    },
  },
  {
    slug: "water-intake-calculator", title: "Water Intake Calculator", shortDescription: "How much water you should drink.",
    category: "nutrition", icon: "GlassWater",
    translations: {
      "ms-bn": { title: "Kalkulator Pengambilan Air", shortDescription: "Berapa banyak air yang perlu anda minum." },
      id: { title: "Kalkulator Asupan Air", shortDescription: "Berapa banyak air yang harus Anda minum." },
    },
  },
  {
    slug: "bmr-calculator", title: "BMR Calculator", shortDescription: "Basal Metabolic Rate at rest.",
    category: "health", icon: "Flame", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator BMR", shortDescription: "Kadar Metabolik Asas semasa rehat." },
      id: { title: "Kalkulator BMR", shortDescription: "Tingkat Metabolisme Basal saat istirahat." },
    },
  },
  {
    slug: "tdee-calculator", title: "TDEE Calculator", shortDescription: "Total Daily Energy Expenditure.",
    category: "nutrition", icon: "Flame", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator TDEE", shortDescription: "Jumlah Perbelanjaan Tenaga Harian." },
      id: { title: "Kalkulator TDEE", shortDescription: "Total Pengeluaran Energi Harian." },
    },
  },
  {
    slug: "macro-calculator", title: "Macro Calculator", shortDescription: "Protein, carbs and fat split.",
    category: "nutrition", icon: "PieChart",
    translations: {
      "ms-bn": { title: "Kalkulator Makro", shortDescription: "Pembahagian protein, karbohidrat dan lemak." },
      id: { title: "Kalkulator Makro", shortDescription: "Pembagian protein, karbohidrat, dan lemak." },
    },
  },
  {
    slug: "body-surface-area-calculator", title: "Body Surface Area Calculator", shortDescription: "Estimate total skin surface area.",
    category: "medical", icon: "Stethoscope",
    translations: {
      "ms-bn": { title: "Kalkulator Luas Permukaan Badan", shortDescription: "Anggarkan jumlah luas permukaan kulit." },
      id: { title: "Kalkulator Luas Permukaan Tubuh", shortDescription: "Perkirakan total luas permukaan kulit." },
    },
  },
  {
    slug: "waist-to-height-ratio-calculator", title: "Waist to Height Ratio", shortDescription: "A simple cardiovascular risk metric.",
    category: "health", icon: "Ruler",
    translations: {
      "ms-bn": { title: "Nisbah Pinggang ke Tinggi", shortDescription: "Metrik risiko kardiovaskular yang mudah." },
      id: { title: "Rasio Pinggang ke Tinggi", shortDescription: "Metrik risiko kardiovaskular yang sederhana." },
    },
  },
  {
    slug: "waist-hip-ratio-calculator", title: "Waist Hip Ratio Calculator", shortDescription: "Body fat distribution indicator.",
    category: "health", icon: "Ruler",
    translations: {
      "ms-bn": { title: "Kalkulator Nisbah Pinggang Pinggul", shortDescription: "Penunjuk taburan lemak badan." },
      id: { title: "Kalkulator Rasio Pinggang Pinggul", shortDescription: "Indikator distribusi lemak tubuh." },
    },
  },
  {
    slug: "heart-rate-zone-calculator", title: "Heart Rate Zone Calculator", shortDescription: "Training zones for cardio workouts.",
    category: "fitness", icon: "HeartPulse", isNew: true,
    translations: {
      "ms-bn": { title: "Kalkulator Zon Kadar Jantung", shortDescription: "Zon latihan untuk senaman kardio." },
      id: { title: "Kalkulator Zona Detak Jantung", shortDescription: "Zona latihan untuk olahraga kardio." },
    },
  },
  {
    slug: "target-heart-rate-calculator", title: "Target Heart Rate Calculator", shortDescription: "Find your optimal training heart rate.",
    category: "fitness", icon: "HeartPulse",
    translations: {
      "ms-bn": { title: "Kalkulator Sasaran Kadar Jantung", shortDescription: "Cari kadar jantung latihan optimum anda." },
      id: { title: "Kalkulator Target Detak Jantung", shortDescription: "Temukan detak jantung latihan optimal Anda." },
    },
  },
  {
    slug: "pace-calculator", title: "Pace Calculator", shortDescription: "Running and walking pace conversions.",
    category: "fitness", icon: "Timer", isNew: true,
    translations: {
      "ms-bn": { title: "Kalkulator Kelajuan", shortDescription: "Penukaran kelajuan larian dan berjalan." },
      id: { title: "Kalkulator Pace", shortDescription: "Konversi pace lari dan jalan kaki." },
    },
  },
  {
    slug: "running-calculator", title: "Running Calculator", shortDescription: "Estimate finish times and splits.",
    category: "fitness", icon: "Timer",
    translations: {
      "ms-bn": { title: "Kalkulator Larian", shortDescription: "Anggarkan masa tamat dan pecahan masa." },
      id: { title: "Kalkulator Lari", shortDescription: "Perkirakan waktu finish dan split." },
    },
  },
  {
    slug: "walking-calories-calculator", title: "Walking Calories Calculator", shortDescription: "Calories burned while walking.",
    category: "fitness", icon: "Flame", isNew: true,
    translations: {
      "ms-bn": { title: "Kalkulator Kalori Berjalan", shortDescription: "Kalori yang terbakar semasa berjalan." },
      id: { title: "Kalkulator Kalori Jalan Kaki", shortDescription: "Kalori yang terbakar saat berjalan kaki." },
    },
  },
  {
    slug: "loan-emi-calculator", title: "Loan EMI Calculator", shortDescription: "Monthly loan payments and total interest.",
    category: "finance", icon: "Wallet", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Ansuran Pinjaman", shortDescription: "Bayaran bulanan pinjaman dan jumlah faedah." },
      id: { title: "Kalkulator Angsuran Pinjaman", shortDescription: "Pembayaran bulanan pinjaman dan total bunga." },
    },
  },
  {
    slug: "compound-interest-calculator", title: "Compound Interest Calculator", shortDescription: "Grow savings with compounding and contributions.",
    category: "finance", icon: "TrendingUp", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Faedah Kompaun", shortDescription: "Kembangkan simpanan dengan kompaun dan caruman." },
      id: { title: "Kalkulator Bunga Berbunga", shortDescription: "Kembangkan tabungan dengan bunga majemuk dan kontribusi." },
    },
  },
  {
    slug: "simple-interest-calculator", title: "Simple Interest Calculator", shortDescription: "Quick simple interest on a principal amount.",
    category: "finance", icon: "Percent",
    translations: {
      "ms-bn": { title: "Kalkulator Faedah Mudah", shortDescription: "Faedah mudah pantas atas jumlah prinsipal." },
      id: { title: "Kalkulator Bunga Sederhana", shortDescription: "Bunga sederhana cepat atas jumlah pokok." },
    },
  },
  {
    slug: "savings-goal-calculator", title: "Savings Goal Calculator", shortDescription: "Monthly savings needed to hit a target.",
    category: "finance", icon: "PiggyBank",
    translations: {
      "ms-bn": { title: "Kalkulator Matlamat Simpanan", shortDescription: "Simpanan bulanan diperlukan untuk capai sasaran." },
      id: { title: "Kalkulator Target Tabungan", shortDescription: "Tabungan bulanan yang diperlukan untuk capai target." },
    },
  },
  {
    slug: "investment-return-calculator", title: "Investment Return Calculator", shortDescription: "Total and annualized investment returns.",
    category: "finance", icon: "LineChart",
    translations: {
      "ms-bn": { title: "Kalkulator Pulangan Pelaburan", shortDescription: "Jumlah dan pulangan pelaburan tahunan." },
      id: { title: "Kalkulator Imbal Hasil Investasi", shortDescription: "Total dan imbal hasil investasi tahunan." },
    },
  },
];

export function getCalculatorsByCategory(category: string) {
  return calculators.filter((c) => c.category === category);
}

export function getPopularCalculators() {
  return calculators.filter((c) => c.popular);
}

export function getLatestCalculators() {
  return calculators.filter((c) => c.isNew);
}
