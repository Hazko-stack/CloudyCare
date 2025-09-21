"use client";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const PersetujuanData = () => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgree = () => {
    if (isAgreed) {
      console.log("User agreed to terms");
    } else {
      alert("Silakan centang kotak persetujuan terlebih dahulu");
    }
  };

  const handleDisagree = () => {
    console.log("User disagreed to terms");
  };

  return (
    <div className="text-center max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Persetujuan Penggunaan Data Kesehatan
      </h2>
      
      <Collapsible className="mb-2 text-left">
        <CollapsibleTrigger className="flex justify-between items-center w-full font-medium py-2 hover:bg-gray-50 px-3 rounded">
          📊 Data yang Dikumpulkan
          <span className="text-lg">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 text-sm text-gray-700 space-y-1 px-3">
          <p>Data yang kamu isi dipakai untuk:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Memberikan rekomendasi kesehatan harian</li>
            <li>Menyediakan tips gaya hidup sehat</li>
            <li>Menampilkan info cuaca sesuai lokasi</li>
            <li>Menyimpan riwayat agar progress bisa dilihat</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="mb-2 text-left">
        <CollapsibleTrigger className="flex justify-between items-center w-full font-medium py-2 hover:bg-gray-50 px-3 rounded">
          🎯 Tujuan Penggunaan Data
          <span className="text-lg text-gray-700">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 text-sm text-gray-700 space-y-1 px-3">
          <p>Data yang kamu isi dipakai untuk:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Memberikan rekomendasi kesehatan harian</li>
            <li>Menyediakan tips gaya hidup sehat</li>
            <li>Menampilkan info cuaca sesuai lokasi</li>
            <li>Menyimpan riwayat agar progress bisa dilihat</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="mb-2 text-left">
        <CollapsibleTrigger className="flex justify-between items-center w-full font-medium py-2 hover:bg-gray-50 px-3 rounded">
          🔒 Keamanan & Privasi
          <span className="text-lg">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 text-sm text-gray-700 space-y-1 px-3">
          <p>Privasi kamu adalah prioritas utama. Karena itu:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Data hanya digunakan di aplikasi</li>
            <li>Tidak dibagikan ke pihak ketiga</li>
            <li>Bisa dihapus kapan saja</li>
            <li>Bukan untuk diagnosis medis</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <div className="text-sm text-gray-600 mt-6">
        <label className="flex items-start space-x-2 cursor-pointer">
          <input 
            type="checkbox" 
            className="mt-1" 
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <span>
            Dengan mencentang kotak ini, saya menyetujui syarat dan ketentuan di atas.
          </span>
        </label>
      </div>

      <div className="flex flex-col items-center mt-6 space-y-2">
        <Button 
          onClick={handleAgree}
          className="w-full max-w-xs"
          style={{ backgroundColor: "#FADA7A", color: "#FFFFFF" }}
          disabled={!isAgreed}
        >
          Saya Setuju
        </Button>
        <button 
          onClick={handleDisagree}
          className="font-semibold text-[16px] hover:underline cursor-pointer"
          style={{ color: "#FADA7A" }}
        >
          Saya Tidak Setuju
        </button>
      </div>
    </div>
  );
};

export default PersetujuanData;