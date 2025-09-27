"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

import { cityList } from '@/data/CityList';
const Bmkg  = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regionCode, setRegionCode] = useState('31.71.03.1001');
  const [currentSlide, setCurrentSlide] = useState(0);
  const chartRef = useRef(null);
  
  // Search location states
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true);

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

  // fetch data
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
      console.log('Data dari BMKG:', data);
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

  // Fetch user biodata location on mount
  useEffect(() => {
    const loadUserLocation = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data: biodata } = await supabase
            .from('user_biodata')
            .select('location_adm4, location_name')
            .eq('user_id', user.id)
            .single();

          if (biodata && biodata.location_adm4) {
            // Set region code dari biodata
            setRegionCode(biodata.location_adm4);
            console.log('Loaded location from biodata:', biodata.location_name);
          }
        }
      } catch (error) {
        console.error('Error loading user location:', error);
      } finally {
        setLoadingLocation(false);
      }
    };

    loadUserLocation();
  }, []);

  // Fetch data when region changes
  useEffect(() => {
    // Only fetch if location is loaded
    if (regionCode && !loadingLocation) {
      fetchData();
    }
  }, [regionCode, loadingLocation]);

  // Chart.js effect
  useEffect(() => {
    if (allWeatherData.length > 0 && chartRef.current) {
      import('chart.js/auto').then((Chart) => {
        const ctx = chartRef.current.getContext('2d');
        
        if (ctx.chart) {
          ctx.chart.destroy();
        }

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
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Get current city name
  const getCurrentCityName = () => {
    const city = cityList.find(city => city.adm4 === regionCode);
    return city ? city.name : 'Kemayoran, Jakarta Pusat';
  };

  // Filter locations based on search
  const filteredLocations = cityList.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle location select
  const handleLocationSelect = (location) => {
    setRegionCode(location.adm4);
    setSearchQuery(location.name);
    setShowDropdown(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setShowDropdown(false);
  };

  // Get weather icon
  const getWeatherIcon = (weatherCode, desc) => {
    switch (weatherCode) {
      case 0:
      case 1:
        return '☀️';
      case 2:
        return '⛅';
      case 3:
        return '☁️';
      case 4:
        return '☁️';
      case 5:
        return '🌫️';
      case 10:
        return '🌫️';
      case 45:
        return '🌫️';
      case 60:
      case 61:
        return '🌦️';
      case 63:
        return '🌧️';
      case 65:
        return '🌧️';
      case 80:
        return '🌦️';
      case 95:
      case 97:
        return '⛈️';
      default:
        return desc?.toLowerCase().includes('cerah') ? '☀️' : 
               desc?.toLowerCase().includes('berawan') ? '☁️' :
               desc?.toLowerCase().includes('hujan') ? '🌧️' : '🌤️';
    }
  };

  // Get all weather data
  const getAllWeatherData = () => {
    if (!weatherData?.data?.[0]?.cuaca) return [];
    
    const allData = [];
    weatherData.data[0].cuaca.forEach(dayData => {
      allData.push(...dayData);
    });
    
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
      <div className="max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto min-h-screen sm:min-h-0 bg-white rounded-none sm:rounded-3xl overflow-hidden shadow-none sm:shadow-lg">
        
        {/* Header */}
        <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-8 sm:pt-10 md:pt-14 lg:pt-16 pb-6 sm:pb-8 md:pb-10 lg:pb-12 text-gray-800 relative rounded-none sm:rounded-t-3xl">
          
          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="flex items-center text-gray-600 mb-2">
              <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-sm md:text-base lg:text-base font-medium">{getCurrentCityName()}</span>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium mb-1 text-gray-800">Hello, good morning </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-4">Today, {dateString}</p>
            
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

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
          
          {/* Image Slider */}
          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-white shadow-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {exerciseSlides.map((slide, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[240px]"
                  >
                    <Image
                      src={slide.image} 
                      alt={slide.alt}
                      width={300}
                      height={200}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23f3f4f6'/%3E%3Ctext x='100' y='75' font-family='Arial' font-size='14' text-anchor='middle' fill='%236b7280'%3EImage not found%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
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

          {/* Question */}
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-center">How's the temperature today?</h2>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8 md:py-10 lg:py-12">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-2 sm:border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 text-sm sm:text-base md:text-lg">Mengambil data cuaca...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 md:mb-8">
              <p className="text-red-700 text-sm md:text-base">{error}</p>
            </div>
          )}

          {/* Weather Hourly Forecast */}
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

          {/* Location Search with Dropdown */}
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <div className="max-w-md md:max-w-lg mx-auto">
              <label className="block text-gray-700 text-sm md:text-base lg:text-base font-medium mb-2">
                Choose Location:
              </label>
              
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search location..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full pl-10 pr-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-900 placeholder-gray-500 text-sm md:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Dropdown Results */}
              {showDropdown && searchQuery && filteredLocations.length > 0 && (
                <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto absolute z-10 w-full max-w-md md:max-w-lg">
                  {filteredLocations.slice(0, 10).map((location, index) => (
                    <div
                      key={`${location.adm4}-${index}`}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-900 text-sm md:text-base">{location.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {showDropdown && searchQuery && filteredLocations.length === 0 && (
                <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                  <div className="text-gray-500 text-center text-sm">
                    No location found for "{searchQuery}"
                  </div>
                </div>
              )}

              {/* Selected Location Display */}
              {!searchQuery && getCurrentCityName() && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-800 font-medium text-sm md:text-base">Current location: {getCurrentCityName()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bmkg;