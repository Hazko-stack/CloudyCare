"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

interface Step2Props {
  existingData?: any
  formState: any
  updateFormState: (updates: any) => void
}

export default function Step2({ existingData, formState, updateFormState }: Step2Props) {
  const [weight, setWeight] = useState(formState.weight || "")
  const [height, setHeight] = useState(formState.height || "")

  // Update parent form state when local state changes
  useEffect(() => {
    updateFormState({
      weight: weight,
      height: height
    })
  }, [weight, height, updateFormState])

  return (
    <div className="text-left w-full">
      <Image
        src="/biodata/stepping.png"
        alt="stepping"
        width={264}
        height={210}
        className="w-50 h-50 mx-auto mb-6"
      />

      <h2 className="text-xl font-semibold mb-10">📏 Info tubuh kamu</h2>

      <p className="text-gray-700 mb-1">Berat badan (Kg)?</p>
      <input
        type="number"
        placeholder="Tulis berat badan kamu"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        min="1"
        max="300"
        step="0.1"
        className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2 mb-6"
      />

      <p className="text-gray-700 mb-1">Tinggi badan (Cm)?</p>
      <input
        type="number"
        placeholder="Tulis tinggi badan kamu"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        min="50"
        max="250"
        step="0.1"
        className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2 mb-6"
      />
    </div>
  )
}