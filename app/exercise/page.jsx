"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FloatingDockDemo } from '@/components/Dock';

const ExerciseSelectionPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const exercises = [
    {
      id: 1,
      name: "Morning Yoga Flow",
      category: "popular",
      image: "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-15-378_512.gif",
      videoId: "VaoV1PrYft4", 
      duration: "15 min",
      level: "Beginner",
      focus: "Flexibility & Calm",
      description: "Awali hari dengan yoga flow lembut untuk membangunkan tubuh, meningkatkan fleksibilitas, dan menenangkan pikiran.",
    },
    {
      id: 2,
      name: "Post-Workout Stretching",
      category: "recommend",
      image: "https://cdn.pixabay.com/animation/2023/05/23/01/10/01-10-09-27_512.gif",
      videoId: "S0Q4gqBUs7c", 
      duration: "10 min",
      level: "Beginner",
      focus: "Recovery & Flexibility",
      description: "Peregangan penting untuk melepas ketegangan otot, mempercepat pemulihan, dan mencegah cedera setelah berolahraga.",
    },
    {
      id: 3,
      name: "HIIT at Home",
      category: "popular",
      image: "https://cdn.pixabay.com/animation/2023/05/23/01/12/01-12-32-617_512.gif",
      videoId: "ml6cT4AZdqI", 
      duration: "20 min",
      level: "Intermediate",
      focus: "Full Body Burn",
      description: "Latihan interval intensitas tinggi tanpa alat untuk membakar kalori secara maksimal dalam waktu singkat.",
    },
    {
      id: 4,
      name: "Indoor Cycling (Spinning)",
      category: "popular",
      image: "https://cdn.pixabay.com/animation/2022/11/24/18/20/18-20-30-798_512.gif",
      videoId: "jSS2p7_xM-g", 
      duration: "30 min",
      level: "Intermediate",
      focus: "Endurance & Legs",
      description: "Simulasi bersepeda di dalam ruangan dengan musik yang memacu semangat untuk membangun daya tahan kardiovaskular.",
    },
    {
      id: 5,
      name: "Zumba Dance Party",
      category: "popular",
      image: "https://cdn.pixabay.com/animation/2023/08/13/02/08/02-08-39-555_512.gif",
      videoId: "8_p-eAnsmQc", 
      duration: "15 min",
      level: "Beginner",
      focus: "Fun Cardio",
      description: "Bakar kalori sambil bersenang-senang! Gerakan tari yang mudah diikuti untuk membuat jantung Anda memompa.",
    },
    {
      id: 6,
      name: "Treadmill Run",
      category: "popular",
      image: "https://cdn.pixabay.com/animation/2024/07/07/06/31/06-31-28-535_512.gif",
      videoId: "36k0a0b2YBE", 
      duration: "20 min",
      level: "Intermediate",
      focus: "Cardio Endurance",
      description: "Lari dengan kecepatan stabil di treadmill untuk membangun stamina, meningkatkan detak jantung, dan membakar kalori secara efektif.",
    },
    {
      id: 7,
      name: "Full Body Strength",
      category: "popular",
      image: "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-41-935_512.gif",
      videoId: "U0bhE67HuDY", 
      duration: "30 min",
      level: "Intermediate",
      focus: "Muscle Building",
      description: "Sesi latihan kekuatan menggunakan dumbbell untuk membentuk dan memperkuat semua kelompok otot utama tubuh.",
    },
    {
      id: 8,
      name: "Core & Abs Definition",
      category: "popular",
      image: "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-28-251_512.gif",
      videoId: "v_fA5zw1OOY", 
      duration: "15 min",
      level: "Intermediate",
      focus: "Core Stability",
      description: "Targetkan otot perut dan oblik Anda dengan latihan tanpa alat yang dirancang untuk memperkuat dan mendefinisikan inti tubuh.",
    },
    {
      id: 9,
      name: "Pilates Fundamentals",
      category: "popular",
      image: "https://cdn.pixabay.com/animation/2023/04/17/02/45/02-45-21-284_512.gif",
      videoId: "K-P_TAN9_vM", 
      duration: "20 min",
      level: "Beginner",
      focus: "Core Strength & Posture",
      description: "Perkuat otot inti Anda dengan gerakan yang terkontrol dan perbaiki postur tubuh melalui dasar-dasar Pilates.",
    },
    {
      id: 10,
      name: "Upper Body Power",
      category: "recommend",
      image: "https://cdn.pixabay.com/animation/2024/07/07/07/05/07-05-11-50_512.gif",
      videoId: "4p3gPTAY-T8",
      duration: "25 min",
      level: "Advanced",
      focus: "Back, Chest, Arms",
      description: "Tingkatkan kekuatan tubuh bagian atas dengan variasi latihan yang menantang punggung, lengan, dan bahu Anda.",
    },
    {
      id: 11,
      name: "Swimming Drills",
      category: "recommend",
      image: "https://cdn.pixabay.com/animation/2023/04/06/15/55/15-55-10-410_512.gif",
      videoId: "cBh504_rM7E", 
      duration: "45 min",
      level: "All Levels",
      focus: "Cooling Cardio",
      description: "Latihan di dalam air yang menyegarkan. Sempurnakan teknik renang gaya bebas Anda untuk efisiensi dan kecepatan.",
    },
    {
      id: 12,
      name: "Aqua Aerobics",
      category: "recommend",
      image: "https://cdn.pixabay.com/animation/2023/08/13/02/08/02-08-39-555_512.gif",
      videoId: "Ym3D7U_9n6E", 
      duration: "30 min",
      level: "Beginner",
      focus: "Low-Impact Cardio",
      description: "Olahraga kardio yang menyenangkan dan berdampak rendah di dalam air, bagus untuk persendian dan menjaga tubuh tetap sejuk.",
    },
    {
      id: 13,
      name: "Outdoor Run",
      category: "popular",
      image: "https://cdn.pixabay.com/animation/2023/09/23/03/40/03-40-02-392_512.gif",
      videoId: "8Fftv-f_i4M", 
      duration: "30 min",
      level: "Intermediate",
      focus: "Stamina & Scenery",
      description: "Lari dengan kecepatan sedang di luar ruangan untuk meningkatkan kesehatan kardiovaskular dan menikmati udara segar.",
    },
    {
      id: 14,
      name: "Trail Hiking Prep",
      category: "recommend",
      image: "https://cdn.pixabay.com/animation/2023/03/24/02/25/02-25-06-899_512.gif",
      videoId: "wfvJCoYgS8o", 
      duration: "25 min",
      level: "Beginner",
      focus: "Leg Strength & Stability",
      description: "Persiapkan tubuh Anda untuk mendaki dengan latihan yang menargetkan kekuatan kaki dan keseimbangan.",
    },
    {
      id: 15,
      name: "Outdoor Cycling",
      category: "popular",
      image: "https://cdn.pixabay.com/animation/2023/03/28/01/21/01-21-29-378_512.gif",
      videoId: "u91I3r3gWz4", 
      duration: "45 min",
      level: "Intermediate",
      focus: "Endurance & Exploration",
      description: "Jelajahi lingkungan sekitar sambil membangun daya tahan. Cocok untuk hari yang cerah dan tidak terlalu panas.",
    },
    {
      id: 16,
      name: "Boxing Drills",
      category: "recommend",
      image: "https://cdn.pixabay.com/animation/2023/04/18/14/23/14-23-45-779_512.gif",
      videoId: "E8_1SAnkfD4", 
      duration: "15 min",
      level: "Intermediate",
      focus: "Cardio & Coordination",
      description: "Tingkatkan stamina, bakar lemak, dan pertajam refleks melalui latihan dan pukulan tinju yang intens.",
    },
    {
      id: 17,
      name: "Jump Rope HIIT",
      category: "recommend",
      image: "https://cdn.pixabay.com/animation/2023/04/18/14/23/14-23-45-779_512.gif",
      videoId: "z_hF0fR_v5M", 
      duration: "10 min",
      level: "Intermediate",
      focus: "Agility & Coordination",
      description: "Lompat tali adalah salah satu cara tercepat untuk meningkatkan detak jantung dan melatih koordinasi seluruh tubuh.",
    },
    {
      id: 18,
      name: "Calisthenics Basics",
      category: "recommend",
      image: "https://cdn.pixabay.com/animation/2023/04/01/10/45/10-45-31-409_512.gif",
      videoId: "r3a-m3n3E48", 
      duration: "20 min",
      level: "Advanced",
      focus: "Bodyweight Mastery",
      description: "Kuasai gerakan dasar kalistenik seperti push-up, pull-up, dan dip untuk membangun kekuatan fungsional.",
    },
    {
      id: 19,
      name: "Kettlebell Flow",
      category: "recommend",
      image: "https://cdn.pixabay.com/animation/2023/04/17/02/45/02-45-21-284_512.gif",
      videoId: "23267K_o0-s", 
      duration: "15 min",
      level: "Advanced",
      focus: "Power & Endurance",
      description: "Latihan dinamis menggunakan kettlebell untuk membangun kekuatan eksplosif, daya tahan, dan membakar banyak kalori.",
    },
    {
      id: 20,
      name: "Futsal Footwork Drills",
      category: "recommend",
      image: "https://cdn.pixabay.com/animation/2022/11/29/18/42/18-42-20-410_512.gif",
      videoId: "wisqJ20aVyI", 
      duration: "18 min",
      level: "Intermediate",
      focus: "Agility & Ball Control",
      description: "Pertajam kelincahan dan kontrol bola Anda dengan latihan gerak kaki futsal yang bisa dilakukan sendiri.",
    },
];

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommendedExercises = filteredExercises.filter(ex => ex.category === "recommend");
  const popularExercises = filteredExercises.filter(ex => ex.category === "popular");

  const ExerciseCard = ({ exercise }) => (
    <div
      onClick={() => setSelectedExercise(exercise.id)}
      className={`
        w-[calc(50%-8px)] sm:w-40 md:w-44 lg:w-48
        h-36 sm:h-40 md:h-44 lg:h-48
        bg-gray-200 
        rounded-lg 
        cursor-pointer 
        overflow-hidden
        transition-all
        ${selectedExercise === exercise.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}
      `}
    >
      {/* Image Area dengan warna berbeda per workout */}
      <div className="w-full h-28 sm:h-32 md:h-36 lg:h-40 bg-gradient-to-br from-purple-300 to-pink-400 flex items-center justify-center">
        <Image
          src={exercise.image}
          alt={exercise.name}
          width={80}
          height={80}
          className="object-cover rounded"
          unoptimized={true}
        />
      </div>
      
      {/* Text Area */}
      <div className="h-8 flex items-center justify-center bg-white">
        <p className="text-xs font-medium text-gray-800 text-center px-2 leading-tight">
          {exercise.name}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 pb-20">
        {/* Enhanced Header with Search */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Select Your Workout
            </h1>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Search Results ({filteredExercises.length})
            </h2>
            <div className="flex gap-4 flex-wrap">
              {filteredExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
            {filteredExercises.length === 0 && (
              <div className="text-center py-8 bg-white rounded-lg">
                <p className="text-gray-700 font-medium mb-2">No exercises found for "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Recommend Section */}
        {!searchQuery && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended</h2>
            <p className="text-sm text-gray-600 mb-4">
              The weather's cloudy, so this is a recommend workout or exercise for u
            </p>
            <div className="flex gap-4 flex-wrap">
              {recommendedExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          </div>
        )}

        {/* Popular Section */}
        {!searchQuery && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular</h2>
            <p className="text-sm text-gray-600 mb-4">
              Most popular workout selections from our community
            </p>
            <div className="flex gap-4 flex-wrap">
              {popularExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Bottom Sheet */}
        {selectedExercise && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-pink-400 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={exercises.find(ex => ex.id === selectedExercise)?.image || "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-28-251_512.gif"}
                    alt="Selected exercise"
                    width={40}
                    height={40}
                    className="object-cover rounded"
                    unoptimized={true}
                  />
                </div>
                <div>
                  <span className="font-medium text-sm sm:text-base">
                    {exercises.find(ex => ex.id === selectedExercise)?.name}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-500">Selected workout</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedExercise(null)}
                  className="px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    const exerciseName = exercises.find(ex => ex.id === selectedExercise)?.name || '';
                    const encodedName = encodeURIComponent(exerciseName.toLowerCase().replace(/\s+/g, '-'));
                    router.push(`/workout?exercise=${encodedName}`);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm"
                >
                  Start Workout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Floating Dock - Always visible */}
      <FloatingDockDemo />
    </>
  );
};

export default ExerciseSelectionPage;