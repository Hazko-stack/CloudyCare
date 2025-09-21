"use client";
import { useState } from "react";
import Image from "next/image";

export default function Step2() {
  const [gender, setGender] = useState("");

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

      <p className="text-gray-700 mb-1">Berat badan (Kg) ?</p>
      <input
        type="text"
        placeholder="Tulis berat badan kamu"
        className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2 mb-6"
      />

      <p className="text-gray-700 mb-1">Tinggi badan (Cm) ? </p>

      <input
        type="number"
        placeholder="Tulis tinggi badan kamu"
        className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2 mb-6"
      />
      
    </div>
  );
}
