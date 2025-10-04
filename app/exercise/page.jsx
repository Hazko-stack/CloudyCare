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
    name: "Yoga Pagi untuk Pemula",
    category: "popular",
    image: "https://cdn.pixabay.com/photo/2020/02/05/06/38/yoga-day-4820228_1280.jpg",
    videoId: "T41mYCmtWls",
    duration: "15 min",
    level: "Pemula",
    focus: "Fleksibilitas & Ketenangan",
    description: "Awali hari dengan peregangan lembut untuk membangunkan tubuh, meningkatkan energi, dan menenangkan pikiran.",
  },
  {
    id: 2,
    name: "Peregangan Seluruh Tubuh",
    category: "recommend",
    image: "https://cdn.pixabay.com/photo/2016/04/07/01/03/yoga-1313115_1280.jpg",
    videoId: "pi5WhX24uS4",
    duration: "10 min",
    level: "Pemula",
    focus: "Pemulihan & Fleksibilitas",
    description: "Penting untuk melepas ketegangan otot, mempercepat pemulihan, dan mencegah cedera setelah beraktivitas.",
  },
  {
    id: 3,
    name: "Kardio Dansa (Zumba)",
    category: "popular",
    image: "https://cdn.pixabay.com/photo/2019/06/30/20/09/zumba-4308708_1280.jpg",
    videoId: "xUoY-SzeQdo",
    duration: "15 min",
    level: "Pemula",
    focus: "Kardio Menyenangkan",
    description: "Bakar kalori sambil bersenang-senang! Gerakan tari yang mudah diikuti untuk membuat jantung Anda memompa.",
  },
  {
    id: 4,
    name: "Tinju Bayangan (Shadow Boxing)",
    category: "recommend",
    image: "https://cdn.pixabay.com/photo/2021/11/05/20/36/boxing-6771969_1280.jpg",
    videoId: "J4j3AOVWuHE",
    duration: "20 min",
    level: "Pemula",
    focus: "Kardio & Koordinasi",
    description: "Latihan kardio intens yang melatih kecepatan, kelincahan, dan kekuatan tubuh bagian atas tanpa memerlukan samsak.",
  },
  {
    id: 5,
    name: "Kardio Lompat Tali",
    category: "popular",
    image: "https://cdn.pixabay.com/photo/2022/08/08/05/13/legs-7371917_1280.jpg",
    videoId: "EkGoiC1ilW0",
    duration: "10 min",
    level: "Menengah",
    focus: "Kelincahan & Bakar Kalori",
    description: "Salah satu cara tercepat untuk meningkatkan detak jantung. Hanya butuh tali dan sedikit ruang untuk memulai.",
  },
    {
    id: 6,
    name: "Naik Turun Tangga",
    category: "recommend",
    image: "https://cdn.pixabay.com/photo/2024/06/25/15/11/girl-8852892_1280.jpg",
    videoId: "EFXOQS5xq3c",
    duration: "15 min",
    level: "Pemula",
    focus: "Kaki & Kardio",
    description: "Manfaatkan tangga di rumah atau kantor untuk latihan kardio efektif yang menguatkan otot kaki dan paha.",
  },
  {
    id: 7,
    name: "HIIT di Rumah (Tanpa Alat)",
    category: "popular",
    image: "https://cdn.pixabay.com/photo/2022/05/23/13/17/fitnes-7216184_1280.jpg",
    videoId: "1skBf6h2ksI",
    duration: "20 min",
    level: "Menengah",
    focus: "Bakar Kalori & Jantung",
    description: "Latihan intensitas tinggi dalam waktu singkat untuk membakar kalori secara maksimal tanpa perlu keluar rumah.",
  },
  {
    id: 8,
    name: "Latihan Perut & Inti Tubuh",
    category: "popular",
    image: "https://cdn.pixabay.com/photo/2017/08/20/12/27/belly-2661555_1280.jpg",
    videoId: "3oeimlA6s68",
    duration: "15 min",
    level: "Menengah",
    focus: "Stabilitas & Kekuatan Inti",
    description: "Targetkan otot perut dengan latihan tanpa alat yang dirancang untuk memperkuat dan mendefinisikan inti tubuh Anda.",
  },
  {
    id: 9,
    name: "Dasar-Dasar Pilates",
    category: "recommend",
    image: "https://cdn.pixabay.com/photo/2017/01/03/07/52/weights-1948813_1280.jpg",
    videoId: "jRFpuiIhKAQ",
    duration: "20 min",
    level: "Pemula",
    focus: "Postur & Kekuatan Inti",
    description: "Perkuat otot inti Anda dengan gerakan yang terkontrol untuk memperbaiki postur tubuh melalui dasar-dasar Pilates.",
  },
  {
    id: 10,
    name: "Tantangan Push-Up Pemula",
    category: "popular",
    image: "https://cdn.pixabay.com/photo/2016/02/16/19/28/burpee-1203906_1280.jpg",
    videoId: "fYZw5xyeVuc",
    duration: "10 min",
    level: "Pemula",
    focus: "Dada, Bahu, Trisep",
    description: "Bangun kekuatan tubuh bagian atas. Mulai dari push-up tembok atau lutut, dan tingkatkan secara bertahap.",
  },
  {
    id: 11,
    name: "Latihan Kaki (Squat & Lunge)",
    category: "popular",
    image: "https://cdn.pixabay.com/photo/2016/02/16/19/26/exercise-1203896_1280.jpg",
    videoId: "p-R0HSfL6nw",
    duration: "15 min",
    level: "Pemula",
    focus: "Kekuatan Kaki & Paha",
    description: "Gerakan fundamental untuk membangun kekuatan dan membentuk otot kaki, paha, serta bokong tanpa memerlukan alat.",
  },
    {
    id: 12,
    name: "Latihan Lengan Tanpa Alat",
    category: "recommend",
    image: "https://cdn.pixabay.com/photo/2017/09/27/18/49/sport-2792995_1280.jpg",
    videoId: "LRQetoEf194",
    duration: "10 min",
    level: "Pemula",
    focus: "Bahu, Bisep, Trisep",
    description: "Kencangkan lengan Anda dengan latihan sederhana seperti arm circles dan tricep dips menggunakan kursi.",
  },
  {
    id: 13,
    name: "Tantangan Wall Sit",
    category: "recommend",
    image: "https://blog.nasm.org/hubfs/walls-sits.jpg",
    videoId: "gd7iOXJHvFw",
    duration: "5 min",
    level: "Pemula",
    focus: "Daya Tahan Kaki",
    description: "Uji daya tahan otot paha Anda dengan latihan isometrik yang sederhana namun sangat menantang ini.",
  },
  {
    id: 14,
    name: "Latihan Glute Bridge",
    category: "recommend",
    image: "https://tse1.mm.bing.net/th/id/OIP.CpwsT_spgJ8OWTJmyQkacQHaFj?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    videoId: "VjGOiFr5oAk",
    duration: "10 min",
    level: "Pemula",
    focus: "Bokong & Punggung Bawah",
    description: "Aktifkan otot bokong dan perkuat punggung bagian bawah untuk postur yang lebih baik dengan gerakan sederhana ini.",
  },
  {
    id: 15,
    name: "Jalan Cepat atau Lari Santai",
    category: "popular",
    image: "https://th.bing.com/th/id/OIP.PVmNLJUj_rNW9STJ99PI6AHaE3?w=276&h=181&c=7&r=0&o=7&cb=12&dpr=1.2&pid=1.7&rm=3",
    videoId: "Wi3-ftoT3Vw",
    duration: "30 min",
    level: "Pemula",
    focus: "Stamina & Kesehatan Jantung",
    description: "Aktivitas sederhana di luar ruangan untuk meningkatkan kesehatan kardiovaskular dan menikmati udara segar.",
  },
    {
    id: 16,
    name: "Bersepeda Statis",
    category: "popular",
    image: "https://tse4.mm.bing.net/th/id/OIP.yXUQPKUaxlp2Q5IR4mwiCQHaEe?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    videoId: "mAUl8azvVjY",
    duration: "30 min",
    level: "Menengah",
    focus: "Daya Tahan & Kaki",
    description: "Jika Anda memiliki akses, bersepeda statis adalah cara hebat untuk kardio yang ramah bagi persendian.",
  },
    {
    id: 17,
    name: "Lari di Treadmill",
    category: "popular",
    image: "https://photo-fhad-fithub.s3.ap-southeast-1.amazonaws.com/Macam_Macam_Latihan_Lari_di_Treadmill_freepik_d7cd1e0661.jpg",
    videoId: "zlnnCNg_iPM",
    duration: "20 min",
    level: "Menengah",
    focus: "Kardio & Stamina",
    description: "Kontrol kecepatan dan tanjakan Anda untuk sesi lari yang efektif, terlepas dari cuaca di luar.",
  },
  {
    id: 18,
    name: "Kekuatan Seluruh Tubuh",
    category: "popular",
    image: "https://images.unsplash.com/photo-1758875569243-47fe02e1ba04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RnVsbCUyMEJvZHklMjBTdHJlbmd0aHxlbnwwfHwwfHx8MA%3D%3D",
    videoId: "U0bhE67HuDY",
    duration: "30 min",
    level: "Menengah",
    focus: "Pembentukan Otot",
    description: "Gunakan dumbbell, botol air, atau berat tubuh untuk membentuk dan memperkuat semua kelompok otot utama.",
  },
  {
    id: 19,
    name: "Latihan Keseimbangan",
    category: "recommend",
    image: "https://aidsindonesia.or.id/wp-content/uploads/2021/08/f71e69bbbd994e271ada32347bcae6b4e4355644_700.jpeg",
    videoId: "pi5WhX24uS4",
    duration: "10 min",
    level: "Pemula",
    focus: "Keseimbangan & Stabilitas",
    description: "Tingkatkan keseimbangan dan stabilitas Anda dengan latihan sederhana seperti berdiri dengan satu kaki.",
  },
  {
    id: 20,
    name: "Meditasi & Teknik Pernapasan",
    category: "recommend",
    image: "https://images.unsplash.com/photo-1603983616619-faf118d6c374?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fE1lZGl0YXRpb258ZW58MHx8MHx8fDA%3D",
    videoId: "8VwufJrUhic",
    duration: "10 min",
    level: "Pemula",
    focus: "Relaksasi & Fokus",
    description: "Akhiri hari Anda atau tenangkan pikiran kapan saja dengan meditasi terpandu untuk mengurangi stres.",
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