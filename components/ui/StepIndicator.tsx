import React from 'react';

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center space-x-3 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;

        return (
          <div
            key={stepNumber}
            className={`w-15 h-3 rounded-full transition-colors duration-300 ${
              isActive ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        );
      })}
    </div>
  );
};

export default StepIndicator;
