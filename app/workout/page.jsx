"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const WorkoutPage = () => {
  const searchParams = useSearchParams();
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const playerRef = useRef(null);

  const exercises = [
    { id: 1, name: "Morning Yoga", image: "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-15-378_512.gif", videoId: "" },
    { id: 2, name: "Treadmill", image: "https://cdn.pixabay.com/animation/2024/07/07/06/31/06-31-28-535_512.gif", videoId: "dQw4w9WgXcQ" },
    { id: 3, name: "Pilates", image: "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-28-251_512.gif", videoId: "" },
    { id: 4, name: "Strength Training", image: "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-41-935_512.gif", videoId: "" },
    { id: 5, name: "Cardio Blast", image: "https://cdn.pixabay.com/animation/2024/07/07/06/31/06-31-28-535_512.gif", videoId: "" },
    { id: 6, name: "Stretching", image: "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-15-378_512.gif", videoId: "" },
    { id: 7, name: "Core Workout", image: "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-28-251_512.gif", videoId: "" },
    { id: 8, name: "Pull up", image: "https://cdn.pixabay.com/animation/2024/07/07/07/05/07-05-11-50_512.gif", videoId: "" },
    { id: 9, name: "Boxing", image: "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-41-935_512.gif", videoId: "" },
    { id: 10, name: "Running", image: "https://cdn.pixabay.com/animation/2024/07/07/06/32/06-32-41-935_512.gif", videoId: "" },
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

  // Load YT iframe API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new YT.Player("ytplayer", {
        events: {
          onReady: () => console.log("YouTube Player Ready"),
          onStateChange: (event) => {
            // Hide overlay when playing
            if (event.data === YT.PlayerState.PLAYING) {
              setIsOverlayVisible(false);
            }
          },
        },
      });
    };
  }, []);

  const handlePlay = () => {
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
    }
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
        <h1 className="text-xl font-bold text-gray-900">{currentExercise.name}</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="relative w-full max-w-2xl mx-auto">
            {/* YouTube iframe */}
            <iframe
              id="ytplayer"
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${currentExercise.videoId}?enablejsapi=1&controls=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            ></iframe>

            {/* Overlay Play Button */}
            {isOverlayVisible && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-gray-700/70 rounded-full p-6">
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
            )}
          </div>

          <p className="text-black-800 font-semibold mt-4">
            Let&apos;s do exercise like the video
          </p>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <Image
                src={currentExercise.image}
                alt={currentExercise.name}
                width={150}
                height={150}
                className="object-cover rounded-lg"
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;
