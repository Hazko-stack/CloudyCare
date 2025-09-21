"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import StepIndicator from "../ui/StepIndicator";
import Step1Content from "./steps/Step1Content";
import Step2Content from "./steps/Step2Content";
import Step3Content from "./steps/Step3Content";
import Step4Content from "./steps/Step4Content";
import Step5Content from "./steps/Step5Content";

const BiodataStepper = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  const stepComponents: Record<number, React.ReactElement> = {
    1: <Step1Content />,
    2: <Step2Content />,
    3: <Step3Content />,
    4: <Step4Content />,
    5: <Step5Content />,
  };

  const stepTitles: Record<number, string> = {
    1: "Perkenalan",
    2: "Info Fisik",
    3: "Riwayat Kesehatan",
    4: "Aktivitas Olahraga",
    5: "Izin Lokasi",
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev: number) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev: number) => prev - 1);
    }
  };

  const handleFinish = () => {
    alert("Biodata selesai diisi!");
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="flex items-center p-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`p-2 ${
            currentStep === 1
              ? "text-gray-300"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <ChevronLeft size={30} />
        </button>

        <div className="flex-1 flex justify-center">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      <div className="p-6">
        <div className="min-h-96">{stepComponents[currentStep]}</div>

        <div className="mt-8 space-y-3">
          {currentStep < totalSteps ? (
            <>
              <button
                onClick={handleNext}
                className="w-full bg-[#FADA7A] text-white py-3 rounded-lg font-medium hover:bg-[#FADA7A] transition-colors"
              >
                Lanjut
              </button>
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="w-full text-gray-500 py-3 rounded-lg hover:text-gray-700 transition-colors"
                >
                  Kembali
                </button>
              )}
            </>
          ) : (
            <button
              onClick={handleFinish}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Selesai
            </button>
          )}
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            F
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataStepper;
