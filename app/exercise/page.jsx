"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const ExerciseSelectionPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const exercises = [
    { id: 1, name: "Morning Yoga", category: "recommend", image: "/construction/meme1.jpg" },
    { id: 2, name: "HIIT Workout", category: "recommend", image: "/construction/meme1.jpg" },
    { id: 3, name: "Pilates", category: "recommend", image: "/construction/meme1.jpg" },
    { id: 4, name: "Strength Training", category: "popular", image: "/construction/meme1.jpg" },
    { id: 5, name: "Cardio Blast", category: "popular", image: "/construction/meme1.jpg" },
    { id: 6, name: "Stretching", category: "popular", image: "/construction/meme1.jpg" },
    { id: 7, name: "Core Workout", category: "popular", image: "/construction/meme1.jpg" },
    { id: 8, name: "Dance Fitness", category: "popular", image: "/construction/meme1.jpg" },
    { id: 9, name: "Boxing", category: "popular", image: "/construction/meme1.jpg" },
    { id: 10, name: "Running", category: "popular", image: "/construction/meme1.jpg" },
  ];

  // Filter exercises based on search query
  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommendedExercises = filteredExercises.filter(ex => ex.category === "recommend");
  const popularExercises = filteredExercises.filter(ex => ex.category === "popular");

  // Simple Exercise Card Component
  const ExerciseCard = ({ exercise }) => (
    <div
      onClick={() => setSelectedExercise(exercise.id)}
      className={`
        w-40 h-40 
        bg-gray-200 
        rounded-lg 
        cursor-pointer 
        overflow-hidden
        transition-all
        ${selectedExercise === exercise.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}
      `}
    >
      {/* Image Area dengan warna berbeda per workout */}
      <div className="w-full h-32 bg-gradient-to-br from-purple-300 to-pink-400 flex items-center justify-center">
        <Image
          src={exercise.image}
          alt={exercise.name}
          width={96}
          height={96}
          className="object-cover rounded"
        />
      </div>
      
      {/* Text Area */}
      <div className="h-8 flex items-center justify-center bg-white">
        <p className="text-xs font-medium text-gray-800 text-center px-2">
          {exercise.name}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
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
          <h1 className="text-2xl font-bold text-gray-900">
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
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-pink-400 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={exercises.find(ex => ex.id === selectedExercise)?.image || "/construction/meme1.jpg"}
                  alt="Selected exercise"
                  width={40}
                  height={40}
                  className="object-cover rounded"
                />
              </div>
              <div>
                <span className="font-medium">
                  {exercises.find(ex => ex.id === selectedExercise)?.name}
                </span>
                <p className="text-sm text-gray-500">Selected workout</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedExercise(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Start Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseSelectionPage;