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