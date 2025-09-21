import React from "react";

export default function ProgressBar({ total, current, activeColor = "bg-[#578FCA]", inactiveColor = "bg-gray-300" }) {
  return (
    <div className="flex justify-center mb-8 space-x-2 w-full max-w-md mx-auto">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i <= current;
        return (
          <div
            key={i}
            className={`rounded-full transition-colors duration-300 ${
              isActive ? activeColor : inactiveColor
            }`}
            style={{ width: '60px', height: '15px' }}
          />
        );
      })}
    </div>
  );
}
