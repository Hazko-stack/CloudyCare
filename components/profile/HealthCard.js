"use client";
import React, { useState, useEffect } from 'react';


const healthRecommendations = {
  asma: {
    title: "Asma",
    icon: "🫁",
    color: "from-blue-400 to-cyan-500",
    recommendations: [
      {
        title: "Hindari Pemicu Asma",
        description: "Jauhkan diri dari debu, asap rokok, polusi udara, dan alergen lainnya. Gunakan masker saat berada di lingkungan berdebu atau berpolusi.",
        source: "Kementerian Kesehatan RI"
      },
      {
        title: "Selalu Bawa Inhaler",
        description: "Pastikan inhaler atau obat pereda asma selalu ada di tas Anda. Periksa tanggal kadaluarsa secara rutin.",
        source: "Global Initiative for Asthma (GINA)"
      },
      {
        title: "Olahraga Teratur dengan Pemanasan",
        description: "Lakukan pemanasan minimal 10-15 menit sebelum berolahraga. Pilih olahraga ringan seperti berenang, yoga, atau jalan santai.",
        source: "American Lung Association"
      },
      {
        title: "Monitor Kualitas Udara",
        description: "Cek indeks kualitas udara sebelum beraktivitas outdoor. Hindari aktivitas luar ruangan saat AQI tinggi (>100).",
        source: "WHO Air Quality Guidelines"
      }
    ]
  },
  hipertensi: {
    title: "Hipertensi",
    icon: "❤️",
    color: "from-red-400 to-pink-500",
    recommendations: [
      {
        title: "Batasi Konsumsi Garam",
        description: "Kurangi asupan garam maksimal 5 gram per hari (1 sendok teh). Hindari makanan kalengan, makanan cepat saji, dan makanan olahan.",
        source: "American Heart Association"
      },
      {
        title: "Rutin Cek Tekanan Darah",
        description: "Ukur tekanan darah minimal 2 kali seminggu di waktu yang sama. Catat hasilnya untuk monitoring dokter.",
        source: "Indonesian Society of Hypertension"
      },
      {
        title: "Kelola Stress dengan Baik",
        description: "Lakukan meditasi, yoga, atau teknik relaksasi napas dalam. Tidur cukup 7-8 jam per malam.",
        source: "Mayo Clinic"
      },
      {
        title: "Olahraga Aerobik 30 Menit",
        description: "Jalan cepat, bersepeda, atau berenang minimal 30 menit sehari, 5 hari seminggu. Konsultasikan intensitas dengan dokter.",
        source: "Kementerian Kesehatan RI"
      }
    ]
  },

  alergi: {
    title: "Alergi",
    icon: "🤧",
    color: "from-green-400 to-emerald-500",
    recommendations: [
      {
        title: "Kenali Pemicu Alergi Anda",
        description: "Catat makanan, lingkungan, atau benda yang memicu reaksi alergi. Konsultasikan dengan dokter untuk tes alergi.",
        source: "Perhimpunan Dokter Spesialis Kulit dan Kelamin Indonesia"
      },
      {
        title: "Jaga Kebersihan Lingkungan",
        description: "Bersihkan rumah secara rutin dari debu dan tungau. Cuci sprei dan sarung bantal minimal 1 minggu sekali dengan air panas.",
        source: "Allergy and Asthma Foundation of America"
      },
      {
        title: "Bawa Antihistamin",
        description: "Selalu sediakan obat antihistamin untuk mengatasi reaksi alergi ringan. Untuk alergi berat, bawa epinephrine auto-injector.",
        source: "American Academy of Allergy, Asthma & Immunology"
      },
      {
        title: "Perhatikan Label Makanan",
        description: "Baca komposisi makanan dengan teliti. Hindari makanan dengan alergen yang Anda sensitif, terutama di restoran.",
        source: "Food Allergy Research & Education (FARE)"
      }
    ]
  },

  tidak_ada: {
    title: "Kondisi Sehat",
    icon: "✨",
    color: "from-teal-400 to-cyan-500",
    recommendations: [
      {
        title: "Jaga Pola Makan Seimbang",
        description: "Konsumsi makanan bergizi dengan komposisi karbohidrat, protein, lemak sehat, vitamin dan mineral yang seimbang setiap hari.",
        source: "Kementerian Kesehatan RI - Pedoman Gizi Seimbang"
      },
      {
        title: "Olahraga Rutin 150 Menit/Minggu",
        description: "Lakukan aktivitas fisik intensitas sedang minimal 30 menit sehari, 5 hari seminggu. Kombinasikan cardio dan latihan kekuatan.",
        source: "WHO Physical Activity Guidelines"
      },
      {
        title: "Medical Check-up Tahunan",
        description: "Lakukan pemeriksaan kesehatan rutin minimal setahun sekali untuk deteksi dini penyakit. Termasuk cek darah lengkap dan fungsi organ.",
        source: "Indonesian Medical Association"
      },
      {
        title: "Tidur Berkualitas 7-9 Jam",
        description: "Jaga kualitas tidur dengan jadwal tidur konsisten, hindari gadget 1 jam sebelum tidur, dan ciptakan suasana kamar yang nyaman.",
        source: "National Sleep Foundation"
      }
    ]
  }
};

export default function HealthRecommendationBanner({ biodata }) {
  const [currentIndex, setCurrentIndex] = useState(0);


  const getMedicalCondition = () => {
    if (!biodata?.medical_history || biodata.medical_history.length === 0) {
      return 'tidak_ada';
    }
    
    const condition = biodata.medical_history;

    if (Array.isArray(condition)) {
      return condition[0] || 'tidak_ada';
    }
    

    if (typeof condition === 'string') {
      return condition.toLowerCase().trim();
    }
    
    return 'tidak_ada';
  };

  const medicalHistory = getMedicalCondition();
  const otherHistory = biodata?.other_medical_history;
  
  
  const isCustomCondition = (medicalHistory === 'tidak_ada' || !medicalHistory) && otherHistory;
  
  let healthInfo;
  if (isCustomCondition) {
    healthInfo = {
      title: otherHistory,
      icon: "🏥",
      color: "from-indigo-400 to-purple-500",
      recommendations: [
        {
          title: "Konsultasi dengan Dokter Spesialis",
          description: "Untuk kondisi kesehatan khusus, sangat disarankan berkonsultasi dengan dokter spesialis yang sesuai untuk mendapatkan diagnosis dan penanganan yang tepat.",
          source: "Indonesian Medical Association"
        },
        {
          title: "Catat Gejala dan Keluhan",
          description: "Buat catatan harian tentang gejala, waktu munculnya, dan faktor pemicu. Informasi ini sangat membantu dokter dalam mendiagnosis dan merencanakan pengobatan.",
          source: "Kementerian Kesehatan RI"
        },
        {
          title: "Patuhi Anjuran Pengobatan",
          description: "Jika sudah mendapat resep atau anjuran dari dokter, pastikan untuk mengikuti petunjuk dengan disiplin. Jangan menghentikan atau mengubah dosis tanpa konsultasi.",
          source: "WHO Patient Safety Guidelines"
        },
        {
          title: "Jaga Pola Hidup Sehat",
          description: "Pola makan seimbang, istirahat cukup, olahraga teratur, dan kelola stress dapat membantu mempercepat pemulihan dan meningkatkan kualitas hidup.",
          source: "Mayo Clinic"
        }
      ]
    };
  } else {
    healthInfo = healthRecommendations[medicalHistory] || healthRecommendations.tidak_ada;
  }
  
  const recommendations = healthInfo.recommendations;


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendations.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [recommendations.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  const currentRecommendation = recommendations[currentIndex];

  return (
    <div>

      <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
        <div className={`absolute inset-0 bg-gradient-to-r ${healthInfo.color} opacity-10`}></div>
        <div className="relative p-6 sm:p-8 min-h-[280px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl">{healthInfo.icon}</span>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-800">
                  Rekomendasi Kesehatan
                </h3>
                <p className="text-sm text-gray-600">
                  {healthInfo.title}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all hover:scale-110"
                aria-label="Previous recommendation"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all hover:scale-110"
                aria-label="Next recommendation"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {otherHistory && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-amber-800 mb-1">Catatan Tambahan:</p>
                  <p className="text-xs text-amber-700">{otherHistory}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex-grow mb-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                  {currentIndex + 1}
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
                  {currentRecommendation.title}
                </h4>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed mb-3 pl-8">
                {currentRecommendation.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-600 bg-white/70 rounded-lg px-3 py-2 inline-flex ml-8">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Sumber:</span>
                <span className="italic">{currentRecommendation.source}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-3">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'w-8 h-2 bg-blue-600' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to recommendation ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ 
                animation: `progress 6000ms linear`,
                width: '100%'
              }}
              key={currentIndex}
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes progress {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}