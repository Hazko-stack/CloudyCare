"use client";
import { useState } from "react";
import Image from "next/image";

export default function Step5() {
  const [gender, setGender] = useState("");

  return (
    <div className="text-left w-full">
      <Image
        src="/biodata/location.png"
        alt="intro"
        width={256}
        height={199}
        className="w-80 h-60 mx-auto mb-6"
      />

      <h2 className="text-xl font-semibold mb-10">🌍 Biar lebih akurat, izinkan akses lokasi kamu</h2>

      
    </div>
  );
}
