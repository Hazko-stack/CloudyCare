"use client";
import { useState } from "react";
import Image from "next/image";

export default function Step3() {
  const [history, setHistory] = useState("");
  const [other, setOther] = useState("");

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
        {/* Asma */}
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="history"
            value="asma"
            checked={history === "asma"}
            onChange={(e) => setHistory(e.target.value)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Asma</span>
        </label>

        {/* Hipertensi */}
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="history"
            value="hipertensi"
            checked={history === "hipertensi"}
            onChange={(e) => setHistory(e.target.value)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Hipertensi</span>
        </label>

        {/* Alergi */}
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="history"
            value="alergi"
            checked={history === "alergi"}
            onChange={(e) => setHistory(e.target.value)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Alergi</span>
        </label>
      </div>

      {/* Lainnya */}
      <div className="mt-6">
        <p className="mb-2">Lainnya :</p>
        <input
          type="text"
          value={other}
          onChange={(e) => setOther(e.target.value)}
          placeholder="Tuliskan riwayat lain"
          className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2"
        />
      </div>
    </div>
  );
}
