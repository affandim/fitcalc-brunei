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
  {
    slug: "due-date-calculator", title: "Due Date Calculator", shortDescription: "Estimate your pregnancy due date.",
    category: "pregnancy", icon: "Baby", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Tarikh Jangkaan Bersalin", shortDescription: "Anggarkan tarikh jangkaan bersalin anda." },
      id: { title: "Kalkulator Perkiraan Tanggal Lahir", shortDescription: "Perkirakan tanggal perkiraan lahir Anda." },
    },
  },
  {
    slug: "pregnancy-weight-gain-calculator", title: "Pregnancy Weight Gain Calculator", shortDescription: "Recommended weight gain range during pregnancy.",
    category: "pregnancy", icon: "Activity",
    translations: {
      "ms-bn": { title: "Kalkulator Kenaikan Berat Semasa Hamil", shortDescription: "Julat kenaikan berat disyorkan semasa hamil." },
      id: { title: "Kalkulator Kenaikan Berat Hamil", shortDescription: "Rentang kenaikan berat yang disarankan saat hamil." },
    },
  },
  {
    slug: "height-predictor-calculator", title: "Child Height Predictor", shortDescription: "Predict your child's adult height.",
    category: "children", icon: "PersonStanding", popular: true,
    translations: {
      "ms-bn": { title: "Ramalan Tinggi Kanak-kanak", shortDescription: "Ramalkan tinggi dewasa anak anda." },
      id: { title: "Prediksi Tinggi Anak", shortDescription: "Prediksi tinggi badan anak saat dewasa." },
    },
  },
  {
    slug: "child-calorie-calculator", title: "Child Calorie Needs Calculator", shortDescription: "Estimated daily calories for children 3-18.",
    category: "children", icon: "Flame",
    translations: {
      "ms-bn": { title: "Kalkulator Keperluan Kalori Kanak-kanak", shortDescription: "Anggaran kalori harian untuk kanak-kanak 3-18 tahun." },
      id: { title: "Kalkulator Kebutuhan Kalori Anak", shortDescription: "Perkiraan kalori harian untuk anak usia 3-18 tahun." },
    },
  },
  {
    slug: "blood-pressure-calculator", title: "Blood Pressure Category Calculator", shortDescription: "Check your blood pressure category.",
    category: "medical", icon: "HeartPulse", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Kategori Tekanan Darah", shortDescription: "Semak kategori tekanan darah anda." },
      id: { title: "Kalkulator Kategori Tekanan Darah", shortDescription: "Periksa kategori tekanan darah Anda." },
    },
  },
  {
    slug: "pulse-pressure-calculator", title: "Pulse Pressure & MAP Calculator", shortDescription: "Calculate pulse pressure and mean arterial pressure.",
    category: "medical", icon: "Activity",
    translations: {
      "ms-bn": { title: "Kalkulator Tekanan Nadi & MAP", shortDescription: "Kira tekanan nadi dan tekanan arteri purata." },
      id: { title: "Kalkulator Tekanan Nadi & MAP", shortDescription: "Hitung tekanan nadi dan tekanan arteri rata-rata." },
    },
  },
  {
    slug: "gpa-calculator", title: "GPA Calculator", shortDescription: "Calculate your credit-weighted GPA.",
    category: "education", icon: "GraduationCap", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator GPA", shortDescription: "Kira GPA berwajaran kredit anda." },
      id: { title: "Kalkulator IPK", shortDescription: "Hitung IPK berbobot kredit Anda." },
    },
  },
  {
    slug: "study-time-calculator", title: "Study Time Planner", shortDescription: "Plan daily study hours before an exam.",
    category: "education", icon: "GraduationCap",
    translations: {
      "ms-bn": { title: "Perancang Masa Belajar", shortDescription: "Rancang jam belajar harian sebelum peperiksaan." },
      id: { title: "Perencana Waktu Belajar", shortDescription: "Rencanakan jam belajar harian sebelum ujian." },
    },
  },
  {
    slug: "length-converter", title: "Length Converter", shortDescription: "Convert between metres, feet, miles and more.",
    category: "converters", icon: "ArrowLeftRight", popular: true,
    translations: {
      "ms-bn": { title: "Penukar Panjang", shortDescription: "Tukar antara meter, kaki, batu dan lain-lain." },
      id: { title: "Konverter Panjang", shortDescription: "Konversi antara meter, kaki, mil, dan lainnya." },
    },
  },
  {
    slug: "weight-converter", title: "Weight Converter", shortDescription: "Convert between kg, lb, oz and stone.",
    category: "converters", icon: "ArrowLeftRight", popular: true,
    translations: {
      "ms-bn": { title: "Penukar Berat", shortDescription: "Tukar antara kg, lb, oz dan stone." },
      id: { title: "Konverter Berat", shortDescription: "Konversi antara kg, lb, oz, dan stone." },
    },
  },
  {
    slug: "temperature-converter", title: "Temperature Converter", shortDescription: "Convert between Celsius, Fahrenheit and Kelvin.",
    category: "converters", icon: "ArrowLeftRight", popular: true,
    translations: {
      "ms-bn": { title: "Penukar Suhu", shortDescription: "Tukar antara Celsius, Fahrenheit dan Kelvin." },
      id: { title: "Konverter Suhu", shortDescription: "Konversi antara Celsius, Fahrenheit, dan Kelvin." },
    },
  },
  {
    slug: "volume-converter", title: "Volume Converter", shortDescription: "Convert between litres, cups, gallons and more.",
    category: "converters", icon: "ArrowLeftRight",
    translations: {
      "ms-bn": { title: "Penukar Isipadu", shortDescription: "Tukar antara liter, cawan, gelen dan lain-lain." },
      id: { title: "Konverter Volume", shortDescription: "Konversi antara liter, cup, galon, dan lainnya." },
    },
  },
  {
    slug: "speed-converter", title: "Speed Converter", shortDescription: "Convert between km/h, mph and knots.",
    category: "converters", icon: "ArrowLeftRight",
    translations: {
      "ms-bn": { title: "Penukar Kelajuan", shortDescription: "Tukar antara km/j, mph dan knot." },
      id: { title: "Konverter Kecepatan", shortDescription: "Konversi antara km/jam, mph, dan knot." },
    },
  },
  {
    slug: "time-converter", title: "Time Converter", shortDescription: "Convert between seconds, hours, days and weeks.",
    category: "converters", icon: "ArrowLeftRight",
    translations: {
      "ms-bn": { title: "Penukar Masa", shortDescription: "Tukar antara saat, jam, hari dan minggu." },
      id: { title: "Konverter Waktu", shortDescription: "Konversi antara detik, jam, hari, dan minggu." },
    },
  },
  {
    slug: "bai-calculator", title: "Body Adiposity Index Calculator", shortDescription: "Estimate body fat % from hip and height alone.",
    category: "health", icon: "Activity",
    translations: {
      "ms-bn": { title: "Kalkulator Indeks Adipositi Badan", shortDescription: "Anggarkan peratus lemak badan dari pinggul dan tinggi." },
      id: { title: "Kalkulator Indeks Adipositas Tubuh", shortDescription: "Perkirakan persen lemak tubuh dari pinggul dan tinggi." },
    },
  },
  {
    slug: "frame-size-calculator", title: "Body Frame Size Calculator", shortDescription: "Find your body frame size from wrist circumference.",
    category: "health", icon: "Ruler",
    translations: {
      "ms-bn": { title: "Kalkulator Saiz Rangka Badan", shortDescription: "Cari saiz rangka badan dari lilitan pergelangan tangan." },
      id: { title: "Kalkulator Ukuran Rangka Tubuh", shortDescription: "Temukan ukuran rangka tubuh dari lingkar pergelangan tangan." },
    },
  },
  {
    slug: "one-rep-max-calculator", title: "One Rep Max Calculator", shortDescription: "Estimate your 1RM and training load percentages.",
    category: "fitness", icon: "Dumbbell", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Satu Ulangan Maksimum", shortDescription: "Anggarkan 1RM dan peratusan beban latihan anda." },
      id: { title: "Kalkulator One Rep Max", shortDescription: "Perkirakan 1RM dan persentase beban latihan Anda." },
    },
  },
  {
    slug: "running-calories-calculator", title: "Running Calories Calculator", shortDescription: "Calories burned while running, by pace.",
    category: "fitness", icon: "Timer",
    translations: {
      "ms-bn": { title: "Kalkulator Kalori Berlari", shortDescription: "Kalori terbakar semasa berlari, mengikut kelajuan." },
      id: { title: "Kalkulator Kalori Lari", shortDescription: "Kalori terbakar saat lari, sesuai pace." },
    },
  },
  {
    slug: "cycling-calories-calculator", title: "Cycling Calories Calculator", shortDescription: "Calories burned while cycling, by intensity.",
    category: "fitness", icon: "Activity",
    translations: {
      "ms-bn": { title: "Kalkulator Kalori Berbasikal", shortDescription: "Kalori terbakar semasa berbasikal, mengikut intensiti." },
      id: { title: "Kalkulator Kalori Bersepeda", shortDescription: "Kalori terbakar saat bersepeda, sesuai intensitas." },
    },
  },
  {
    slug: "fiber-intake-calculator", title: "Fiber Intake Calculator", shortDescription: "Your recommended daily fiber target.",
    category: "nutrition", icon: "Apple",
    translations: {
      "ms-bn": { title: "Kalkulator Pengambilan Fiber", shortDescription: "Sasaran fiber harian disyorkan untuk anda." },
      id: { title: "Kalkulator Asupan Serat", shortDescription: "Target serat harian yang disarankan untuk Anda." },
    },
  },
  {
    slug: "sugar-limit-calculator", title: "Sugar Limit Calculator", shortDescription: "Your daily added-sugar limit (AHA guideline).",
    category: "nutrition", icon: "GlassWater",
    translations: {
      "ms-bn": { title: "Kalkulator Had Gula", shortDescription: "Had gula tambahan harian anda (garis panduan AHA)." },
      id: { title: "Kalkulator Batas Gula", shortDescription: "Batas gula tambahan harian Anda (pedoman AHA)." },
    },
  },
  {
    slug: "alcohol-calories-calculator", title: "Alcohol Calories Calculator", shortDescription: "Calories from beer, wine and spirits.",
    category: "nutrition", icon: "GlassWater",
    translations: {
      "ms-bn": { title: "Kalkulator Kalori Alkohol", shortDescription: "Kalori daripada bir, wain dan minuman keras." },
      id: { title: "Kalkulator Kalori Alkohol", shortDescription: "Kalori dari bir, anggur, dan minuman keras." },
    },
  },
  {
    slug: "tip-calculator", title: "Tip Calculator", shortDescription: "Split a bill with tip across any number of people.",
    category: "finance", icon: "Wallet", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Tip", shortDescription: "Bahagikan bil dengan tip antara sebarang bilangan orang." },
      id: { title: "Kalkulator Tip", shortDescription: "Bagi tagihan dengan tip ke sejumlah orang." },
    },
  },
  {
    slug: "discount-calculator", title: "Discount Calculator", shortDescription: "Find the final price and savings on a sale.",
    category: "finance", icon: "Percent", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Diskaun", shortDescription: "Cari harga akhir dan penjimatan semasa jualan." },
      id: { title: "Kalkulator Diskon", shortDescription: "Temukan harga akhir dan penghematan saat diskon." },
    },
  },
  {
    slug: "net-worth-calculator", title: "Net Worth Calculator", shortDescription: "Total assets minus total liabilities.",
    category: "finance", icon: "Wallet",
    translations: {
      "ms-bn": { title: "Kalkulator Nilai Bersih", shortDescription: "Jumlah aset tolak jumlah liabiliti." },
      id: { title: "Kalkulator Kekayaan Bersih", shortDescription: "Total aset dikurangi total liabilitas." },
    },
  },
  {
    slug: "mortgage-affordability-calculator", title: "Mortgage Affordability Calculator", shortDescription: "How much home you can afford (28/36 rule).",
    category: "finance", icon: "Wallet", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Keterjangkauan Gadai Janji", shortDescription: "Berapa rumah yang anda mampu (peraturan 28/36)." },
      id: { title: "Kalkulator Keterjangkauan KPR", shortDescription: "Berapa rumah yang Anda mampu (aturan 28/36)." },
    },
  },
  {
    slug: "test-score-calculator", title: "Test Score Calculator", shortDescription: "Percentage and letter grade from correct answers.",
    category: "education", icon: "GraduationCap",
    translations: {
      "ms-bn": { title: "Kalkulator Markah Ujian", shortDescription: "Peratusan dan gred huruf daripada jawapan betul." },
      id: { title: "Kalkulator Nilai Ujian", shortDescription: "Persentase dan nilai huruf dari jawaban benar." },
    },
  },
  {
    slug: "area-converter", title: "Area Converter", shortDescription: "Convert between m², acres, hectares and more.",
    category: "converters", icon: "ArrowLeftRight",
    translations: {
      "ms-bn": { title: "Penukar Luas", shortDescription: "Tukar antara m², ekar, hektar dan lain-lain." },
      id: { title: "Konverter Luas", shortDescription: "Konversi antara m², acre, hektar, dan lainnya." },
    },
  },
  {
    slug: "data-storage-converter", title: "Data Storage Converter", shortDescription: "Convert between KB, MB, GB and TB.",
    category: "converters", icon: "ArrowLeftRight",
    translations: {
      "ms-bn": { title: "Penukar Storan Data", shortDescription: "Tukar antara KB, MB, GB dan TB." },
      id: { title: "Konverter Penyimpanan Data", shortDescription: "Konversi antara KB, MB, GB, dan TB." },
    },
  },
  {
    slug: "conception-date-calculator", title: "Conception Date Calculator", shortDescription: "Estimate when conception likely occurred.",
    category: "pregnancy", icon: "Baby",
    translations: {
      "ms-bn": { title: "Kalkulator Tarikh Konsepsi", shortDescription: "Anggarkan bila konsepsi mungkin berlaku." },
      id: { title: "Kalkulator Tanggal Konsepsi", shortDescription: "Perkirakan kapan konsepsi kemungkinan terjadi." },
    },
  },
  {
    slug: "ovulation-calculator", title: "Ovulation Calculator", shortDescription: "Estimate your fertile window and ovulation day.",
    category: "pregnancy", icon: "Baby", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Ovulasi", shortDescription: "Anggarkan tempoh subur dan hari ovulasi anda." },
      id: { title: "Kalkulator Ovulasi", shortDescription: "Perkirakan masa subur dan hari ovulasi Anda." },
    },
  },
  {
    slug: "pregnancy-calorie-calculator", title: "Pregnancy Calorie Calculator", shortDescription: "Extra daily calories needed by trimester.",
    category: "pregnancy", icon: "Flame",
    translations: {
      "ms-bn": { title: "Kalkulator Kalori Semasa Hamil", shortDescription: "Kalori tambahan harian mengikut trimester." },
      id: { title: "Kalkulator Kalori Hamil", shortDescription: "Kalori tambahan harian sesuai trimester." },
    },
  },
  {
    slug: "child-bmi-calculator", title: "Child BMI Calculator", shortDescription: "A simplified BMI estimate for children.",
    category: "children", icon: "HeartPulse",
    translations: {
      "ms-bn": { title: "Kalkulator BMI Kanak-kanak", shortDescription: "Anggaran BMI ringkas untuk kanak-kanak." },
      id: { title: "Kalkulator BMI Anak", shortDescription: "Perkiraan BMI sederhana untuk anak-anak." },
    },
  },
  {
    slug: "height-velocity-calculator", title: "Child Height Velocity Calculator", shortDescription: "Growth rate in cm/year between two measurements.",
    category: "children", icon: "Ruler",
    translations: {
      "ms-bn": { title: "Kalkulator Kadar Pertumbuhan Tinggi", shortDescription: "Kadar pertumbuhan cm/tahun antara dua ukuran." },
      id: { title: "Kalkulator Laju Pertumbuhan Tinggi", shortDescription: "Laju pertumbuhan cm/tahun antara dua pengukuran." },
    },
  },
  {
    slug: "sleep-needs-calculator", title: "Sleep Needs Calculator", shortDescription: "Recommended sleep hours by age.",
    category: "children", icon: "Activity", popular: true,
    translations: {
      "ms-bn": { title: "Kalkulator Keperluan Tidur", shortDescription: "Jam tidur disyorkan mengikut umur." },
      id: { title: "Kalkulator Kebutuhan Tidur", shortDescription: "Jam tidur yang disarankan sesuai usia." },
    },
  },
  {
    slug: "anion-gap-calculator", title: "Anion Gap Calculator", shortDescription: "Serum anion gap from sodium, chloride and bicarbonate.",
    category: "medical", icon: "Stethoscope",
    translations: {
      "ms-bn": { title: "Kalkulator Jurang Anion", shortDescription: "Jurang anion serum daripada natrium, klorida dan bikarbonat." },
      id: { title: "Kalkulator Anion Gap", shortDescription: "Anion gap serum dari natrium, klorida, dan bikarbonat." },
    },
  },
  {
    slug: "blood-volume-calculator", title: "Estimated Blood Volume Calculator", shortDescription: "Estimate total blood volume from bodyweight.",
    category: "medical", icon: "Stethoscope",
    translations: {
      "ms-bn": { title: "Kalkulator Anggaran Jumlah Darah", shortDescription: "Anggarkan jumlah darah daripada berat badan." },
      id: { title: "Kalkulator Estimasi Volume Darah", shortDescription: "Perkirakan total volume darah dari berat badan." },
    },
  },
  {
    slug: "weighted-grade-calculator", title: "Weighted Average Grade Calculator", shortDescription: "Combine assignment scores with different weights.",
    category: "education", icon: "GraduationCap",
    translations: {
      "ms-bn": { title: "Kalkulator Gred Purata Berwajaran", shortDescription: "Gabungkan markah tugasan dengan wajaran berbeza." },
      id: { title: "Kalkulator Nilai Rata-Rata Berbobot", shortDescription: "Gabungkan nilai tugas dengan bobot berbeda." },
    },
  },
  {
    slug: "attendance-calculator", title: "Attendance Percentage Calculator", shortDescription: "Check if you meet a minimum attendance requirement.",
    category: "education", icon: "GraduationCap",
    translations: {
      "ms-bn": { title: "Kalkulator Peratusan Kehadiran", shortDescription: "Semak sama ada anda memenuhi keperluan kehadiran minimum." },
      id: { title: "Kalkulator Persentase Kehadiran", shortDescription: "Periksa apakah Anda memenuhi syarat kehadiran minimum." },
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
