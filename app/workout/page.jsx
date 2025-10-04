"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const WorkoutContent = () => {
  const searchParams = useSearchParams();
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
    "Don’t count the days, make the days count.",
    "Small progress is still progress.",
    "Your body can stand almost anything. It’s your mind you have to convince.",
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
    setCurrentExercise(exercises[(idx + 1) % exercises.length]);
  };

  const handlePrev = () => {
    const idx = exercises.findIndex(ex => ex.id === currentExercise.id);
    setCurrentExercise(
      exercises[(idx - 1 + exercises.length) % exercises.length]
    );
  };

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading workout...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {currentExercise.name}
        </h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="relative w-full max-w-2xl mx-auto aspect-video"> {/* Use aspect-video for responsive height */}
            <div id="ytplayer" className="w-full h-full rounded-xl"></div>

            {isOverlayVisible && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
                 <button
                onClick={handlePlay}
                className="flex items-center justify-center"
              >
                <div className="bg-gray-700/70 rounded-full p-6 transition-transform hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="yellow"
                    viewBox="0 0 20 22"
                    strokeWidth={1.5}
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3l14 9-14 9V3z"
                    />
                  </svg>
                </div>
              </button>
              </div>
            )}
          </div>

          <div className="mt-6 text-gray-700 space-y-2">
            <p>
              <span className="font-bold">Duration:</span>{" "}
              {currentExercise.duration}
            </p>
            <p>
              <span className="font-bold">Level:</span> {currentExercise.level}
            </p>
            <p>
              <span className="font-bold">Focus:</span> {currentExercise.focus}
            </p>
            <p className="mt-2 text-gray-600">{currentExercise.description}</p>
          </div>

          <div className="text-center mt-4">
            <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={currentExercise.image}
                alt={currentExercise.name}
                width={150}
                height={150}
                className="object-cover"
                unoptimized={true}
              />
            </div>
          </div>

          <p className="italic text-center text-gray-600 mt-4">💡 {tip}</p>

          <div className="flex items-center gap-1 mt-6">
            {exercises.map((ex) => (
              <div
                key={ex.id}
                className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                  ex.id === currentExercise.id ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-300 transition-colors"
            >
              ⬅ Prev
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-yellow-400 rounded-lg font-semibold text-gray-900 hover:bg-yellow-500 transition-colors"
            >
              Next ➡
            </button>
          </div>
        </div>
      </div>
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