"use client"
import React, { useState } from 'react';
import { Menu, Bell, Cloud, Sun, CloudRain, Moon, Droplets, Umbrella, Shield, Dumbbell, MapPin } from 'lucide-react';

export default function WeatherHealthApp() {
  const [currentTemp] = useState(34);
  const [weatherCondition] = useState('sunny');

  const getHealthRecommendations = () => {
    if (currentTemp >= 32) {
      return [
        { icon: Shield, text: "Gunakan sunscreen SPF 30+", priority: "high" },
        { icon: Droplets, text: "Minum air minimal 2.5L hari ini", priority: "high" },
        { text: "Hindari aktivitas outdoor 10:00-15:00", priority: "medium" }
      ];
    } else if (currentTemp <= 25) {
      return [
        { icon: Umbrella, text: "Bawa payung/jaket", priority: "high" },
        { text: "Tetap di dalam ruangan jika memungkinkan", priority: "medium" }
      ];
    }
    return [];
  };

  const weatherData = [
    { time: "Morning", temp: "20°", icon: CloudRain, condition: "cloudy" },
    { time: "Afternoon", temp: "34°", icon: Sun, condition: "sunny" },
    { time: "Evening", temp: "28°", icon: Cloud, condition: "partly-cloudy" },
    { time: "Night", temp: "22°", icon: Moon, condition: "clear" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
              <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">CloudyCare</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Jakarta, Indonesia</span>
              </div>
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">K</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Welcome Section */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Selamat Pagi! </h2>
                  <p className="text-blue-100 text-lg">Rekomendasi kesehatan berdasarkan cuaca hari ini</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Sun className="w-8 h-8 text-yellow-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Weather */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cuaca Hari Ini</h3>
              
              {/* Weather Timeline */}
              <div className="bg-gradient-to-r from-orange-100 via-yellow-100 to-blue-100 rounded-xl p-6">
                <div className="grid grid-cols-4 gap-4">
                  {weatherData.map((weather, index) => {
                    const IconComponent = weather.icon;
                    return (
                      <div key={index} className="text-center">
                        <IconComponent className={`w-8 h-8 mx-auto mb-2 ${
                          weather.condition === 'sunny' ? 'text-yellow-500' :
                          weather.condition === 'cloudy' ? 'text-gray-500' :
                          weather.condition === 'partly-cloudy' ? 'text-gray-400' :
                          'text-gray-600'
                        }`} />
                        <div className="text-lg font-semibold text-gray-800">{weather.temp}</div>
                        <div className="text-xs text-gray-600">{weather.time}</div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Temperature curve visualization */}
                <div className="mt-4 relative h-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-orange-300 to-blue-300 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rekomendasi Kesehatan</h3>
              
              <div className="space-y-4">
                {getHealthRecommendations().map((rec, index) => (
                  <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                    rec.priority === 'high' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    {rec.icon && <rec.icon className={`w-5 h-5 mt-0.5 ${
                      rec.priority === 'high' ? 'text-red-500' : 'text-yellow-600'
                    }`} />}
                    <p className={`text-sm ${
                      rec.priority === 'high' ? 'text-red-800' : 'text-yellow-800'
                    }`}>{rec.text}</p>
                  </div>
                ))}
              </div>

              {/* Air Quality Alert */}
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Perhatian:</strong> Suhu tinggi hari ini. Batasi aktivitas outdoor.
                </p>
              </div>
            </div>
          </div>

          {/* Exercise Recommendation */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex-1">
                  <Dumbbell className="w-8 h-8 mb-3" />
                  <h3 className="text-2xl font-bold mb-2">Aktivitas Direkomendasikan</h3>
                  <p className="text-blue-100 mb-4">Olahraga indoor atau yoga di rumah</p>
                  <button className="bg-white text-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Lihat Panduan
                  </button>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/30 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hydration Tracker */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hidrasi Hari Ini</h3>
              
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-16 h-20">
                  <div className="w-full h-full border-2 border-blue-300 rounded-b-full rounded-t-lg"></div>
                  <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-blue-400 to-blue-300 rounded-b-full rounded-t-lg"></div>
                  <Droplets className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 text-blue-500" />
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">1.8L</p>
                <p className="text-sm text-gray-600">dari 2.5L target</p>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '72%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">72% tercapai</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-green-500">Good</div>
                <div className="text-sm text-gray-600">Air Quality</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-orange-500">High</div>
                <div className="text-sm text-gray-600">UV Index</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-500">65%</div>
                <div className="text-sm text-gray-600">Humidity</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-500">15km/h</div>
                <div className="text-sm text-gray-600">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}