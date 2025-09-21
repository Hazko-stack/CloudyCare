"use client";

import { useState } from "react";
import Step1 from "@/components/form/Step1";
import Step2 from "@/components/form/Step2";
import Step3 from "@/components/form/Step3";
import Step4 from "@/components/form/Step4";
import Step5 from "@/components/form/Step5";
import ProgressBar from "@/components/form/ProgressBar";
import { ChevronLeft } from "lucide-react";

const steps = [Step1, Step2, Step3, Step4, Step5];

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const StepComponent = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-4 max-w-md mx-auto">
      
      {/* Header with Back + ProgressBar */}
      <div className="flex items-center space-x-2 mb-6">
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <div className="flex-1">
          <ProgressBar total={steps.length} current={currentStep} />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center">
        <StepComponent />
      </div>

      {/* Bottom Button */}
      <div className="mt-6">
        <button
          onClick={nextStep}
          className="w-full py-3 bg-[#FADA7A] text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
        >
          {currentStep === steps.length - 1 ? "Selesai" : "Setuju"}
        </button>
      </div>
    </div>
  );
}
