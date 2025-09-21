"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Button,
} from "@/components/ui/";

const PersetujuanData = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const router = useRouter();

  const handleAgree = () => {
    if (isAgreed) {
      router.push("/data-kesehatan/form");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="text-center max-w-lg w-full">
      <h2 className="text-2xl font-semibold mb-15">
        Persetujuan Penggunaan Data Kesehatan
      </h2>

      <Collapsible className="mb-2 text-left">
        <CollapsibleTrigger className="flex justify-between items-center w-full font-medium py-2">
          📊 Data yang Dikumpulkan
          <span className="text-lg">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 text-sm text-gray-700 space-y-1">
          <p>Data yang kamu isi dipakai untuk:</p>
          <ul className="list-disc list-inside">
            <li>Memberikan rekomendasi kesehatan harian</li>
            <li>Menyediakan tips gaya hidup sehat</li>
            <li>Menampilkan info cuaca sesuai lokasi</li>
            <li>Menyimpan riwayat agar progress bisa dilihat</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="mb-2 text-left">
        <CollapsibleTrigger className="flex justify-between items-center w-full font-medium py-2">
          🎯 Tujuan Penggunaan Data
          <span className="text-lg text-gray-700">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 text-sm text-gray-700 space-y-1">
          <p>Data yang kamu isi dipakai untuk:</p>
          <ul className="list-disc list-inside">
            <li>Memberikan rekomendasi kesehatan harian</li>
            <li>Menyediakan tips gaya hidup sehat</li>
            <li>Menampilkan info cuaca sesuai lokasi</li>
            <li>Menyimpan riwayat agar progress bisa dilihat</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="mb-2 text-left">
        <CollapsibleTrigger className="flex justify-between items-center w-full font-medium py-2">
          🔒 Keamanan & Privasi
          <span className="text-lg">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 text-sm text-gray-700 space-y-1">
          <p>Privasi kamu adalah prioritas utama. Karena itu:</p>
          <ul className="list-disc list-inside">
            <li>Data hanya digunakan di aplikasi</li>
            <li>Tidak dibagikan ke pihak ketiga</li>
            <li>Bisa dihapus kapan saja</li>
            <li>Bukan untuk diagnosis medis</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <div className="text-sm text-gray-600 mt-15">
        <label className="flex items-start space-x-2">
          <input 
            type="checkbox" 
            className="mt-1" 
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <span>
            Dengan mencentang kotak ini, saya menyetujui syarat dan ketentuan di
            atas.
          </span>
        </label>
      </div>

      <div className="flex flex-col items-center mt-6 space-y-2">
        <Button 
          text="Saya Setuju" 
          onClick={handleAgree}
          disabled={!isAgreed}
        />
        <p className="font-semibold text-[16px]" style={{ color: "#FADA7A" }}>
          Saya Tidak Setuju
        </p>
      </div>
    </div>
  </div>
  );
};

export default PersetujuanData;
