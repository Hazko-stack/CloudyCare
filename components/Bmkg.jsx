"use client";
import React, { useState, useEffect, useRef } from 'react';
import { cityList } from '@/data/CityList'; // Import city list dari file terpisah

const Bmkg  = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regionCode, setRegionCode] = useState('31.71.03.1001');
  const [currentSlide, setCurrentSlide] = useState(0);
  const chartRef = useRef(null);

  // Data slide untuk gambar saja
  const exerciseSlides = [
    {
      image: "/construction/meme1.jpg",
      alt: "Exercise Image 1"
    },
    {
      image: "/construction/meme1.jpg", 
      alt: "Exercise Image 2"
    },
    {
      image: "/construction/meme1.jpg",
      alt: "Exercise Image 3"
    }
  ];

  // Fungsi untuk fetch data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${regionCode}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Data dari BMKG:', data); // Debug log
      setWeatherData(data);
    } catch (err) {
      setError('Gagal mengambil data cuaca: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data saat component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Chart.js effect
  useEffect(() => {
    if (allWeatherData.length > 0 && chartRef.current) {
      import('chart.js/auto').then((Chart) => {
        const ctx = chartRef.current.getContext('2d');
        
        // Destroy existing chart if it exists
        if (ctx.chart) {
          ctx.chart.destroy();
        }

        // Prepare data for chart
        const chartData = allWeatherData.slice(0, 12).map(weather => ({
          time: new Date(weather.local_datetime).toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          temperature: weather.t,
          humidity: weather.hu
        }));

        ctx.chart = new Chart.Chart(ctx, {
          type: 'line',
          data: {
            labels: chartData.map(item => item.time),
            datasets: [
              {
                label: 'Temperature (°C)',
                data: chartData.map(item => item.temperature),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
              },
              {
                label: 'Humidity (%)',
                data: chartData.map(item => item.humidity),
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                yAxisID: 'y1'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Weather Forecast Chart',
                font: {
                  size: 16
                }
              }
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Time'
                }
              },
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                  display: true,
                  text: 'Temperature (°C)'
                },
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                  display: true,
                  text: 'Humidity (%)'
                },
                grid: {
                  drawOnChartArea: false,
                },
              },
            }
          }
        });
      });
    }

    // Cleanup function
    return () => {
      if (chartRef.current?.getContext('2d').chart) {
        chartRef.current.getContext('2d').chart.destroy();
      }
    };
  }, [weatherData]);

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % exerciseSlides.length);
    }, 3000); // Ganti slide setiap 3 detik

    return () => clearInterval(timer);
  }, []);

  // Next slide function
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % exerciseSlides.length);
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + exerciseSlides.length) % exerciseSlides.length);
  };

  // Handle dropdown change
  const handleCityChange = (e) => {
    setRegionCode(e.target.value);
    fetchData(); // Auto fetch ketika ganti kota
  };

  // Get current city name - Updated to use adm4 instead of code
  const getCurrentCityName = () => {
    const city = cityList.find(city => city.adm4 === regionCode);
    return city ? city.name : 'Kemayoran, Jakarta Pusat';
  };

  // Get weather icon berdasarkan weather code
  const getWeatherIcon = (weatherCode, desc) => {
    switch (weatherCode) {
      case 0:
      case 1:
        return '☀️'; // Cerah
      case 2:
        return '⛅'; // Cerah Berawan
      case 3:
        return '☁️'; // Berawan
      case 4:
        return '☁️'; // Berawan Tebal
      case 5:
        return '🌫️'; // Udara Kabur
      case 10:
        return '🌫️'; // Asap
      case 45:
        return '🌫️'; // Kabut
      case 60:
      case 61:
        return '🌦️'; // Hujan Ringan
      case 63:
        return '🌧️'; // Hujan Sedang
      case 65:
        return '🌧️'; // Hujan Lebat
      case 80:
        return '🌦️'; // Hujan Lokal
      case 95:
      case 97:
        return '⛈️'; // Hujan Petir
      default:
        return desc?.toLowerCase().includes('cerah') ? '☀️' : 
               desc?.toLowerCase().includes('berawan') ? '☁️' :
               desc?.toLowerCase().includes('hujan') ? '🌧️' : '🌤️';
    }
  };

  // Flatten cuaca data untuk ditampilkan dengan sorting yang benar
  const getAllWeatherData = () => {
    if (!weatherData?.data?.[0]?.cuaca) return [];
    
    const allData = [];
    weatherData.data[0].cuaca.forEach(dayData => {
      allData.push(...dayData);
    });
    
    // Sort berdasarkan waktu dari sekarang ke depan
    return allData.sort((a, b) => {
      const timeA = new Date(a.local_datetime).getTime();
      const timeB = new Date(b.local_datetime).getTime();
      return timeA - timeB;
    });
  };

  const allWeatherData = getAllWeatherData();
  const currentWeather = allWeatherData[0];
  const currentTime = new Date();
  const dateString = currentTime.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-white p-0 md:p-4 lg:p-8">
      {/* Responsive Container - Better tablet sizing */}
      <div className="max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto min-h-screen sm:min-h-0 bg-white rounded-none sm:rounded-3xl overflow-hidden shadow-none sm:shadow-lg">
        
        {/* Responsive Header - White background with black text */}
        <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-8 sm:pt-10 md:pt-14 lg:pt-16 pb-6 sm:pb-8 md:pb-10 lg:pb-12 text-gray-800 relative rounded-none sm:rounded-t-3xl">
          
          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="flex items-center text-gray-600 mb-2">
              <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-sm md:text-base lg:text-base font-medium">{getCurrentCityName()}</span>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium mb-1 text-gray-800">Hello, good morning 👋</h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-4">Today, {dateString}</p>
            
            {/* Temperature di pojok kiri dengan bold */}
            {currentWeather && (
              <div className="flex items-center space-x-4">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-800">{currentWeather.t}°C</div>
                <div className="bg-gray-100 rounded-full px-3 py-1.5 md:px-4 md:py-2 flex items-center border border-gray-200">
                  <span className="text-xs md:text-sm mr-1.5">💧</span>
                  <span className="text-xs md:text-sm font-semibold text-gray-700">{currentWeather.hu}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Responsive Content - Better tablet padding */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
          
          {/* Image Slider - Better tablet sizing */}
          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-white shadow-lg">
              {/* Slider Container */}
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {exerciseSlides.map((slide, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[240px]"
                  >
                    {/* Gambar dari public folder */}
                    <image
                      src={slide.image} 
                      alt={slide.alt}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                      onError={(e) => {
                        // Fallback jika gambar tidak ditemukan
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23f3f4f6'/%3E%3Ctext x='100' y='75' font-family='Arial' font-size='14' text-anchor='middle' fill='%236b7280'%3EImage not found%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Navigation Buttons - Better tablet size */}
              <button 
                onClick={prevSlide}
                className="absolute left-1 sm:left-2 md:left-3 lg:left-4 xl:left-6 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/30 rounded-full p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-5 text-white backdrop-blur-sm transition-all duration-200 shadow-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-1 sm:right-2 md:right-3 lg:right-4 xl:right-6 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/30 rounded-full p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-5 text-white backdrop-blur-sm transition-all duration-200 shadow-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator - Better tablet size */}
              <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 md:space-x-2.5 lg:space-x-3">
                {exerciseSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-gray-700' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Weather Chart */}
          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="h-64 sm:h-80 md:h-96">
                <canvas ref={chartRef} className="w-full h-full"></canvas>
              </div>
            </div>
          </div>

          {/* Question - Better tablet sizing */}
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-center">How's the temperature today?</h2>
          </div>

          {/* Responsive Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8 md:py-10 lg:py-12">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-2 sm:border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 text-sm sm:text-base md:text-lg">Mengambil data cuaca...</span>
              </div>
            </div>
          )}

          {/* Responsive Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 md:mb-8">
              <p className="text-red-700 text-sm md:text-base">{error}</p>
            </div>
          )}

          {/* Responsive Weather Hourly Forecast - Better tablet grid */}
          {allWeatherData.length > 0 && !loading && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              {allWeatherData
                .slice(0, typeof window !== 'undefined' && window.innerWidth >= 1536 ? 8 : typeof window !== 'undefined' && window.innerWidth >= 1024 ? 6 : typeof window !== 'undefined' && window.innerWidth >= 768 ? 5 : 4)
                .map((weather, index) => {
                  const date = new Date(weather.local_datetime);
                  const timeString = date.toLocaleTimeString('id-ID', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                  });
                  const dateString = date.toLocaleDateString('id-ID', { 
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short'
                  });
                  
                  return (
                    <div key={`${weather.local_datetime}-${index}`} className="text-center">
                      <div className="bg-gray-50 hover:bg-gray-100 rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 mb-2 md:mb-3 lg:mb-4 transition-colors border border-gray-100 shadow-sm">
                        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-1 md:mb-2 lg:mb-3">
                          {getWeatherIcon(weather.weather, weather.weather_desc)}
                        </div>
                      </div>
                      <div className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-700 mb-1 md:mb-1.5 lg:mb-2">
                        {weather.t}°
                      </div>
                      <div className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-500 font-medium mb-1">
                        {dateString}
                      </div>
                      <div className="text-xs md:text-sm lg:text-sm xl:text-base text-gray-400">
                        {timeString}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* City Selector Dropdown - Better tablet sizing */}
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <div className="max-w-md md:max-w-lg mx-auto">
              <label className="block text-gray-700 text-sm md:text-base lg:text-base font-medium mb-2">
                Choose Location:
              </label>
              <select
                value={regionCode}
                onChange={handleCityChange}
                disabled={loading}
                className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 text-sm md:text-base lg:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm appearance-none cursor-pointer"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                {cityList.map((city) => (
                  <option 
                    key={city.adm4} 
                    value={city.adm4}
                    className="text-gray-800 font-medium py-2 px-3 bg-white hover:bg-gray-50"
                  >
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bmkg;