"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { StepProps } from "@/component/types/biodata"

export default function Step3({ formState, updateFormState }: StepProps) {
  const [history, setHistory] = useState(formState.medical_history || "")
  const [other, setOther] = useState(formState.other_medical_history || "")

  // Update parent form state when local state changes
  useEffect(() => {
    updateFormState({
      medical_history: history,
      other_medical_history: other
    })
  }, [history, other, updateFormState])

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
            type="radio"
            value="asma"
            checked={history === "asma"}
            onChange={(e) => setHistory(e.target.value)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Asma</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="hipertensi"
            checked={history === "hipertensi"}
            onChange={(e) => setHistory(e.target.value)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Hipertensi</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="alergi"
            checked={history === "alergi"}
            onChange={(e) => setHistory(e.target.value)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Alergi</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="tidak_ada"
            checked={history === "tidak_ada"}
            onChange={(e) => setHistory(e.target.value)}
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
