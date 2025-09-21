"use client";
import { useState } from "react";
import Image from "next/image";

export default function Step1() {
  const [gender, setGender] = useState("");

  const options = [
    { label: "Perempuan 👧", value: "female" },
    { label: "Laki-laki 👦", value: "male" },
    { label: "Lainnya", value: "other" },
  ];

  return (
    <div className="text-left w-full">
      <Image
        src="/biodata/introduction.png"
        alt="intro"
        width={166}
        height={234}
        className="w-50 h-60 mx-auto mb-6"
      />

      <h2 className="text-xl font-semibold mb-8">Yuk, kenalan dulu...</h2>

      <p className="text-gray-700 mb-1">Siapa nama kamu?</p>
      <input
        type="text"
        placeholder="Tulis nama lengkap"
        className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2 mb-6"
      />

      <p className="text-gray-700 mb-1">Berapa umur kamu?</p>

      <input
        type="number"
        placeholder="Tulis umur kamu"
        className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2 mb-6"
      />

      <p className="text-gray-600 mb-2">Apa jenis kelamin kamu?</p>
      <div className="flex space-x-3 ">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`px-4 py-2 rounded-lg cursor-pointer border transition-all select-none ${
              gender === opt.value
                ? "border-yellow-400 bg-yellow-100 font-semibold"
                : "border-gray-300 hover:border-yellow-300"
            }`}
          >
            <input
              type="radio"
              name="gender"
              value={opt.value}
              className="hidden"
              onChange={(e) => setGender(e.target.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
