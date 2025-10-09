"use client";
import React, { useState, useEffect, useRef } from 'react';
import { cityList } from '@/data/CityList';
import Image from 'next/image';
import WeatherRecommendationBanner from '@/components/WeatherRecommendationBanner';
import BMKGFooter from '@/components/BMKGFooter'; 

const GuestWeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regionCode, setRegionCode] = useState('31.71.03.1001');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const chartRef = useRef(null);

  // Data slide untuk gambar saja
  const exerciseSlides = [
    {
      image: "/construction/meme1.jpg",
      alt: "Weather Image 1"
    },
    {
      image: "/construction/meme1.jpg", 
      alt: "Weather Image 2"
    },
    {
      image: "/construction/meme1.jpg",
      alt: "Weather Image 3"
    }
  ];

  // Guest limitations - hanya tampilkan 3 jam ke depan
  const GUEST_FORECAST_LIMIT = 3;

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

  // Chart.js effect - Limited for guests
  useEffect(() => {
    if (allWeatherData.length > 0 && chartRef.current) {
      import('chart.js/auto').then((Chart) => {
        const ctx = chartRef.current.getContext('2d');
        
        // Destroy existing chart if it exists
        if (ctx.chart) {
          ctx.chart.destroy();
        }

        // Prepare data for chart - Limited to GUEST_FORECAST_LIMIT for guests
        const chartData = allWeatherData.slice(0, GUEST_FORECAST_LIMIT).map(weather => ({
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
                text: 'Weather Forecast Chart (Guest Preview - Limited)',
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

  // Show login prompt after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginPrompt(true);
    }, 30000); // Show after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  // Next slide function
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % exerciseSlides.length);
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + exerciseSlides.length) % exerciseSlides.length);
  };

  // Handle dropdown change - Limited for guests
  const handleCityChange = (e) => {
    setRegionCode(e.target.value);
    fetchData(); // Auto fetch ketika ganti kota
    
    // Show upgrade prompt for guests after changing city multiple times
    setShowLoginPrompt(true);
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
    <div className="min-h-screen bg-white p-0 md:p-4 lg:p-8 relative">
      {/* Guest Banner */}
      <div className="bg-black text-white p-3 text-center relative rounded-b-md">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm font-medium">Welcome, Guest!</span>
          <span className="text-xs opacity-75">Limited preview</span>
        </div>
        <button 
          onClick={() => window.location.href = '/login'}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-medium transition-colors"
        >
          Sign In
        </button>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative">
            <button 
              onClick={() => setShowLoginPrompt(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🌤️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Get Full Weather Access!</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Sign in to unlock extended forecasts, detailed charts, and more weather data.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Sign In with Account
                </button>
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Create New Account
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Continue as guest with limited features
              </p>
            </div>
          </div>
        </div>
      )}

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
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium mb-1 text-gray-800">Hello, good morning </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-2">Today, {dateString}</p>
            
            {/* Guest limitation text - Better mobile positioning */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 mb-4">
              <p className="text-xs sm:text-sm text-orange-700 font-medium text-center">
                🔒 Guest Preview - Limited to {GUEST_FORECAST_LIMIT} hours forecast
              </p>
            </div>
            
            {/* Temperature di pojok kiri dengan bold */}
            {currentWeather && (
              <div className="flex items-center space-x-4 mt-4">
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
          
          {/* Responsive Weather Hourly Forecast - LIMITED for guests */}
          {allWeatherData.length > 0 && !loading && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                {allWeatherData
                  .slice(0, GUEST_FORECAST_LIMIT) // Limited to 3 hours for guests
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

              {/* Upgrade Prompt */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-center border border-blue-200">
                <div className="text-3xl mb-3">🌟</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Want to see more?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get more features.
                </p>
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="bg-black text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Sign Up Free
                </button>
              </div>

              {/* Weather Recommendation Banner */}
              <div className="mb-4 mt-6">
                <WeatherRecommendationBanner 
                  weatherData={allWeatherData.slice(0, GUEST_FORECAST_LIMIT)} 
                  showHourSelector={false}
                />
              </div>
              
              
            </div>
          )}
          {/* Weather Chart Section - Fixed overlay positioning */}
          <div className="mb-6 md:mb-8 lg:mb-10">
            {/* Chart title and limitation info - Better mobile layout */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Weather Forecast Chart</h3>
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                Guest: {GUEST_FORECAST_LIMIT}h only
              </div>
            </div>
            
            <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="h-64 sm:h-80 md:h-96">
                <canvas ref={chartRef} className="w-full h-full"></canvas>
              </div>
            </div>
          </div>

          {/* Question - Better tablet sizing */}
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-center">How's the temperature today?</h2>
            <p className="text-center text-sm text-gray-500 mt-2">Guest preview - Sign in for extended forecasts</p>
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

          

          {/* City Selector Dropdown - Better tablet sizing */}
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <div className="max-w-md md:max-w-lg mx-auto">
              <label className="block text-gray-700 text-sm md:text-base lg:text-base font-medium mb-2">
                Choose Location:
                <span className="text-xs text-orange-600 ml-2">Limited cities for guests</span>
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
                {/* Limited cities for guest */}
                {cityList.slice(0, 10).map((city) => (
                  <option 
                    key={city.adm4} 
                    value={city.adm4}
                    className="text-gray-800 font-medium py-2 px-3 bg-white hover:bg-gray-50"
                  >
                    {city.name}
                  </option>
                ))}
                <option disabled className="text-gray-400 font-medium py-2 px-3">
                  --- Sign in for all cities ---
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* BMKG Attribution Footer */}
      <BMKGFooter />
    </div>
  );
};

export default GuestWeatherPage;