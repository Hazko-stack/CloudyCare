"use client";
import React, { useState, useEffect } from 'react';

const weatherRecommendations = {
  sunny: {
    title: "Cuaca Cerah",
    icon: "☀️",
    color: "from-yellow-400 to-orange-500",
    recommendations: [
      {
        title: "Gunakan Sunscreen SPF 30+",
        description: "Lindungi kulit dari paparan sinar UV dengan sunscreen minimal SPF 30. Aplikasikan 15-30 menit sebelum keluar rumah.",
        source: "WHO - Sun Protection Guidelines"
      },
      {
        title: "Minum Air Minimal 2L",
        description: "Cuaca panas meningkatkan risiko dehidrasi. Pastikan minum air putih minimal 8 gelas per hari.",
        source: "Kementerian Kesehatan RI"
      },
      {
        title: "Olahraga Pagi atau Sore",
        description: "Hindari olahraga outdoor saat matahari terik (10.00-15.00). Pilih waktu pagi atau sore hari.",
        source: "American Heart Association"
      }
    ]
  },
  cloudy: {
    title: "Cuaca Berawan",
    icon: "☁️",
    color: "from-gray-400 to-gray-600",
    recommendations: [
      {
        title: "Tetap Pakai Sunscreen",
        description: "Sinar UV masih bisa menembus awan tipis. Tetap gunakan sunscreen meski cuaca berawan.",
        source: "Skin Cancer Foundation"
      },
      {
        title: "Waktu Ideal untuk Aktivitas Outdoor",
        description: "Cuaca berawan cocok untuk jogging, bersepeda, atau piknik karena tidak terlalu panas.",
        source: "National Weather Service"
      },
      {
        title: "Jaga Hidrasi Tubuh",
        description: "Meski tidak panas, tubuh tetap membutuhkan cairan yang cukup untuk metabolisme optimal.",
        source: "Mayo Clinic"
      }
    ]
  },
  rainy: {
    title: "Cuaca Hujan",
    icon: "🌧️",
    color: "from-blue-400 to-blue-600",
    recommendations: [
      {
        title: "Siapkan Payung dan Jas Hujan",
        description: "Selalu bawa payung atau jas hujan saat keluar rumah. Hindari terjebak hujan tanpa perlindungan.",
        source: "BMKG Safety Guidelines"
      },
      {
        title: "Waspadai Cuaca Ekstrem",
        description: "Jika ada petir dan angin kencang, hindari berada di tempat terbuka atau di bawah pohon tinggi.",
        source: "BNPB - Disaster Management"
      },
      {
        title: "Konsumsi Makanan Hangat",
        description: "Sup, teh hangat, atau jahe dapat membantu menjaga suhu tubuh dan meningkatkan imunitas.",
        source: "Indonesian Nutrition Association"
      }
    ]
  }
};


const getWeatherTypeFromCode = (weatherCode, weatherDesc = '') => {
  if ([0, 1].includes(weatherCode)) return 'sunny';
  if ([60, 61, 63, 65, 80, 95, 97].includes(weatherCode)) return 'rainy';
  if ([2, 3, 4, 5, 10, 45].includes(weatherCode)) return 'cloudy';
  
  const desc = weatherDesc?.toLowerCase() || '';
  if (desc.includes('cerah')) return 'sunny';
  if (desc.includes('hujan')) return 'rainy';
  if (desc.includes('berawan')) return 'cloudy';
  
  return 'cloudy';
};

const WeatherRecommendationBanner = ({ weatherData = null, showHourSelector = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedHour, setSelectedHour] = useState(0);

  let weatherType = 'cloudy';
  let selectedWeatherData = null;
  
  if (weatherData && Array.isArray(weatherData) && weatherData.length > 0) {
    selectedWeatherData = weatherData[selectedHour] || weatherData[0];
    weatherType = getWeatherTypeFromCode(selectedWeatherData.weather, selectedWeatherData.weather_desc);
  }

  const weatherInfo = weatherRecommendations[weatherType];
  const recommendations = weatherInfo.recommendations;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendations.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [recommendations.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedHour]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentRecommendation = recommendations[currentIndex];

  return (
    <div className="space-y-4">
      {showHourSelector && weatherData && weatherData.length > 1 && (
        <div className="bg-background rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Pilih Waktu untuk Rekomendasi:</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {weatherData.slice(0, 8).map((weather, index) => {
              const time = new Date(weather.local_datetime);
              const timeStr = time.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              });
              const isSelected = selectedHour === index;
              const hourWeatherType = getWeatherTypeFromCode(weather.weather, weather.weather_desc);
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedHour(index)}
                  className={`flex-shrink-0 rounded-xl p-3 transition-all transform hover:scale-105 ${
                    isSelected 
                      ? 'bg-accent text-white shadow-lg scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-center min-w-[60px]">
                    <div className="text-2xl mb-1">
                      {hourWeatherType === 'sunny' && '☀️'}
                      {hourWeatherType === 'cloudy' && '☁️'}
                      {hourWeatherType === 'rainy' && '🌧️'}
                    </div>
                    <div className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                      {timeStr}
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                      {weather.t}°C
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-primary shadow-lg">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${weatherInfo.color} opacity-10`}></div>
        
        {/* Content */}
        <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 min-h-[200px] sm:min-h-[220px] md:min-h-[240px] flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl">{weatherInfo.icon}</span>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  Rekomendasi untuk {weatherInfo.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {selectedWeatherData && (
                    <>
                      {new Date(selectedWeatherData.local_datetime).toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })} - {selectedWeatherData.t}°C, {selectedWeatherData.hu}% kelembaban
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation Content */}
          <div className="flex-grow mb-6">
            <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              {currentRecommendation.title}
            </h4>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              {currentRecommendation.description}
            </p>
            
            {/* Source */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-lg px-3 py-2 inline-flex">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Sumber:</span>
              <span className="italic">{currentRecommendation.source}</span>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-4">
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

          {/* Progress Bar */}
          <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all"
              style={{ 
                animation: `progress 5000ms linear`,
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
};

export default WeatherRecommendationBanner;