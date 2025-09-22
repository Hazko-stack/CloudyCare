"use client";
import { useState } from "react";
import Image from "next/image";

export default function Step4() {
  const [workout, setWorkout] = useState("");
  const [other, setOther] = useState("");

  return (
    <div className="text-left w-full">
      <Image
        src="/biodata/working.png"
        alt="intro"
        width={164}
        height={184}
        className="w-50 h-60 mx-auto mb-6"
      />

      <h2 className="text-xl font-semibold mb-10">🏃 Seberapa sering kamu olahraga?</h2>

      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="workout"
            value="jarang"
            checked={workout === "jarang"}
            onChange={(e) => setWorkout(e.target.value)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Jarang</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="workout"
            value="2days"
            checked={workout === "2days"}
            onChange={(e) => setWorkout(e.target.value)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Setiap 2 hari sekali</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="workout"
            value="weekly"
            checked={workout === "weekly"}
            onChange={(e) => setWorkout(e.target.value)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Setiap seminggy sekali</span>
        </label>

        
      </div>

      <div className="mt-6">
        <p className="mb-2">Lainnya :</p>
        <input
          type="text"
          value={other}
          onChange={(e) => setOther(e.target.value)}
          placeholder=""
          className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2"
        />
      </div>

    </div>
  );
}
