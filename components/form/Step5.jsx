"use client";
import { useState } from "react";
import Image from "next/image";
import { cityList } from "@/data/CityList";

export default function Step5() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocation = cityList.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="text-left w-full">
      <Image
        src="/biodata/location.png"
        alt="intro"
        width={256}
        height={199}
        className="w-80 h-60 mx-auto mb-6"
      />

      <h2 className="text-xl font-semibold mb-10">
        🌍 Biar lebih akurat, izinkan akses lokasi kamu
      </h2>

      <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search your location..."
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

        {/* Display filtered locations */}
        {searchQuery && filteredLocation.length > 0 && (
          <div className="mt-4 max-w-md bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredLocation.map((location) => (
              <div
                key={location.adm4}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setSearchQuery(location.name);
                }}
              >
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-900">{location.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchQuery && filteredLocation.length === 0 && (
          <div className="mt-4 max-w-md bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            <div className="text-gray-500 text-center">
              No locations found for "{searchQuery}"
            </div>
          </div>
        )}
    </div>
  );
}
