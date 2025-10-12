"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const WorkoutContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [tip, setTip] = useState("");
  const playerRef = useRef(null);

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

  const tips = [
    "Push yourself, no one else will do it for you!",
    "Consistency beats motivation every time.",
    "Don't count the days, make the days count.",
    "Small progress is still progress.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "The only bad workout is the one that didn't happen.",
    "Sweat is just your fat crying. Keep going!",
    "Believe in yourself and you will be unstoppable.",
    "Sakit hari ini adalah kekuatan di esok hari. Terus bergerak!",
    "Cuaca panas? Pilih waktu pagi atau sore hari untuk olahraga di luar ruangan.",
    "Jangan biarkan hujan menghentikanmu. Latihan di dalam ruangan sama hebatnya!",
    "Saat cuaca ideal, manfaatkan untuk mencoba rute lari atau sepeda yang baru!",
    "Hidrasi adalah kunci! Minum air yang cukup, terutama saat cuaca terik.",
    "Pakaian yang tepat membuat perbedaan besar. Kenakan yang ringan saat panas dan anti-air saat hujan ringan.",
  ];

  // Helper function to convert exercise name to URL-friendly format
  const exerciseNameToUrl = (name) => {
    return name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()&]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
  };


  useEffect(() => {
    const exerciseName = searchParams.get("exercise");
    if (exerciseName) {
      const decodedName = decodeURIComponent(exerciseName).replace(/-/g, " ");
      const exercise = exercises.find(
        (ex) => ex.name.toLowerCase() === decodedName.toLowerCase()
      );
      setCurrentExercise(exercise || exercises[0]);
    } else {
      setCurrentExercise(exercises[0]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentExercise) {
      setTip(tips[Math.floor(Math.random() * tips.length)]);
      setIsOverlayVisible(true); // Reset overlay for new video
    }
  }, [currentExercise]);

  useEffect(() => {
    // This effect ensures the YouTube API script is loaded only once.
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const createPlayer = () => {
      // Destroy existing player if it exists
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      playerRef.current = new window.YT.Player("ytplayer", {
        videoId: currentExercise?.videoId, // Load video ID from current exercise
        playerVars: {
            controls: 0, // Hide default controls
            modestbranding: 1,
            rel: 0,
        },
        events: {
          onReady: () => console.log("YouTube Player Ready"),
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsOverlayVisible(false);
            }
            if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              setIsOverlayVisible(true);
            }
          },
        },
      });
    };

    if (currentExercise && typeof window.YT?.Player === 'function') {
        createPlayer();
    } else {
        window.onYouTubeIframeAPIReady = createPlayer;
    }
    
    return () => {
        if(playerRef.current) {
            playerRef.current.destroy();
        }
    }
  }, [currentExercise]);


  const handlePlay = () => {
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
    }
  };

  const handleNext = () => {
    const idx = exercises.findIndex(ex => ex.id === currentExercise.id);
    const nextExercise = exercises[(idx + 1) % exercises.length];
    const urlFriendlyName = exerciseNameToUrl(nextExercise.name);
    router.push(`/workout?exercise=${urlFriendlyName}`);
  };

  const handlePrev = () => {
    const idx = exercises.findIndex(ex => ex.id === currentExercise.id);
    const prevExercise = exercises[(idx - 1 + exercises.length) % exercises.length];
    const urlFriendlyName = exerciseNameToUrl(prevExercise.name);
    router.push(`/workout?exercise=${urlFriendlyName}`);
  };

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading workout...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/exercise')}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Exercises</span>
            </button>
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                {currentExercise.name}
              </h1>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {currentExercise.duration}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {currentExercise.level}
                </span>
                <span className="hidden sm:inline">{currentExercise.focus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Video Player Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative w-full aspect-video">
            <div id="ytplayer" className="w-full h-full"></div>
            
            {isOverlayVisible && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <button
                  onClick={handlePlay}
                  className="group flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-6 group-hover:bg-white/30 transition-all duration-300">
                    <svg
                      className="w-16 h-16 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Exercise Info & Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {/* Exercise Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About This Exercise</h2>
            <p className="text-gray-600 leading-relaxed">{currentExercise.description}</p>
          </div>

          {/* Exercise Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{currentExercise.duration}</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{currentExercise.level}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-lg font-bold text-purple-600 truncate">{currentExercise.focus}</div>
              <div className="text-sm text-gray-600">Focus</div>
            </div>
          </div>

          {/* Exercise Image */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-md">
              <Image
                src={currentExercise.image}
                alt={currentExercise.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                unoptimized={true}
              />
            </div>
          </div>

          {/* Motivational Tip */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Workout Tip</h3>
                <p className="text-gray-700 italic">{tip}</p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Exercise Progress</span>
              <span className="text-sm text-gray-500">
                {exercises.findIndex(ex => ex.id === currentExercise.id) + 1} of {exercises.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {exercises.map((ex, index) => (
                <div
                  key={ex.id}
                  className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                    ex.id === currentExercise.id 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500" 
                      : index < exercises.findIndex(e => e.id === currentExercise.id)
                      ? "bg-green-400"
                      : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <button
              onClick={() => router.push('/exercise')}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              All Exercises
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Dock
      <FloatingDockDemo /> */}
    </div>
  );
};

const WorkoutPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600">Loading workout...</p>
        </div>
      }
    >
      <WorkoutContent />
    </Suspense>
  );
};

export default WorkoutPage;