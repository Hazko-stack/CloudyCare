"use client";
import { useState } from "react";
import Image from "next/image";

export default function Step4() {
  const [gender, setGender] = useState("");

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

    </div>
  );
}
