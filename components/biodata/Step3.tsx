"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { StepProps } from "@/component/types/biodata"

export default function Step3({ formState, updateFormState }: StepProps) {
  const [selectedHistories, setSelectedHistories] = useState<string[]>(
    formState.medical_history ? formState.medical_history.split(',') : []
  )
  const [other, setOther] = useState(formState.other_medical_history || "")

  const handleCheckboxChange = (value: string) => {
    setSelectedHistories(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  // Update parent form state when local state changes
  useEffect(() => {
    updateFormState({
      medical_history: selectedHistories.join(','),
      other_medical_history: other
    })
  }, [selectedHistories, other, updateFormState])

  return (
    <div className="text-left w-full">
      <Image
        src="/biodata/history.png"
        alt="history"
        width={230}
        height={10}
        className="w-70 h-50 mx-auto mb-6"
      />

      <h2 className="text-xl font-semibold mb-10">
        ⚡Punya riwayat kesehatan?
      </h2>

      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            value="asma"
            checked={selectedHistories.includes("asma")}
            onChange={() => handleCheckboxChange("asma")}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Asma</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            value="hipertensi"
            checked={selectedHistories.includes("hipertensi")}
            onChange={() => handleCheckboxChange("hipertensi")}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Hipertensi</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            value="alergi"
            checked={selectedHistories.includes("alergi")}
            onChange={() => handleCheckboxChange("alergi")}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Alergi</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            value="tidak_ada"
            checked={selectedHistories.includes("tidak_ada")}
            onChange={() => handleCheckboxChange("tidak_ada")}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Tidak ada</span>
        </label>
      </div>

      <div className="mt-6">
        <p className="mb-2">Lainnya:</p>
        <input
          type="text"
          value={other}
          onChange={(e) => setOther(e.target.value)}
          placeholder="Tuliskan riwayat lain"
          className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2"
        />
      </div>
    </div>
  )
}