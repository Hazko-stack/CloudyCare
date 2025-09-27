"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { cityList } from "@/data/CityList"
import { StepProps, CityData } from "@/component/types/biodata"

export default function Step5({ formState, updateFormState }: StepProps) {
  const [searchQuery, setSearchQuery] = useState(formState.location_name || "")
  const [selectedLocation, setSelectedLocation] = useState<CityData | null>(
    formState.location_name ? {
      name: formState.location_name,
      adm4: formState.location_adm4,
    } : null
  )
  const [showDropdown, setShowDropdown] = useState(false)

  // Update parent form state when location changes
  useEffect(() => {
    updateFormState({
      location_name: selectedLocation?.name || '',
      location_adm4: selectedLocation?.adm4 || ''
    })
  }, [selectedLocation, updateFormState])

  const filteredLocation = cityList.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLocationSelect = (location: CityData) => {
    setSelectedLocation(location)
    setSearchQuery(location.name)
    setShowDropdown(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowDropdown(true)
    if (e.target.value === '') {
      setSelectedLocation(null)
    }
  }

  return (
    <div className="text-left w-full">
      <Image
        src="/biodata/location.png"
        alt="location"
        width={256}
        height={199}
        className="w-80 h-60 mx-auto mb-6"
      />

      <h2 className="text-xl font-semibold mb-6">
        🌍 Biar lebih akurat, pilih lokasi kamu
      </h2>

      <div className="text-center text-gray-500 mb-4">Pilih lokasi</div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Cari lokasi kamu..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setSelectedLocation(null)
              setShowDropdown(false)
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Display filtered locations */}
      {showDropdown && searchQuery && filteredLocation.length > 0 && (
        <div className="mt-2 max-w-md bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 absolute">
          {filteredLocation.slice(0, 10).map((location, index) => (
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
                <span className="text-gray-900">{location.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDropdown && searchQuery && filteredLocation.length === 0 && (
        <div className="mt-2 max-w-md bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <div className="text-gray-500 text-center">
            Tidak ditemukan lokasi &ldquo;{searchQuery}&rdquo;
          </div>
        </div>
      )}

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 font-medium">Lokasi terpilih: {selectedLocation.name}</span>
          </div>
        </div>
      )}
    </div>
  )
}