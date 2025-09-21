import { useState } from "react";

const Step1Content = () => {
  const [gender, setGender] = useState("");

  return (
    <div className="text-left">
      <div className="flex justify-center mb-4">
        <img src="/formImage/introduction.png" alt="Introduction" />
      </div>
      <h2 className="text-xl font-semibold mb-6">Yuk, kenalan dulu...</h2>

      <p className="text-gray-700 mb-1">Siapa nama kamu?</p>
      <input
        type="text"
        placeholder=""
        className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2 mb-6"
      />

      <p className="text-gray-700 mb-1">Berapa umur kamu?</p>
      <input
        type="number"
        placeholder=""
        className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-400 py-2 mb-6"
      />

      <p className="text-gray-700 mb-2">Apa jenis kelamin kamu?</p>
      <div className="flex space-x-3">
        <label
          className={`px-4 py-2 rounded-full cursor-pointer border text-sm transition ${
            gender === "female"
              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
              : "border-gray-300 text-gray-600"
          }`}
        >
          <input
            type="radio"
            name="gender"
            value="female"
            className="hidden"
            onChange={(e) => setGender(e.target.value)}
          />
          {gender === "female" ? "Female 👧" : "Female"}
        </label>

        <label
          className={`px-4 py-2 rounded-full cursor-pointer border text-sm transition ${
            gender === "male"
              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
              : "border-gray-300 text-gray-600"
          }`}
        >
          <input
            type="radio"
            name="gender"
            value="male"
            className="hidden"
            onChange={(e) => setGender(e.target.value)}
          />
          {gender === "male" ? "Male 👦" : "Male"}
        </label>

        <label
          className={`px-4 py-2 rounded-full cursor-pointer border text-sm transition ${
            gender === "other"
              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
              : "border-gray-300 text-gray-600"
          }`}
        >
          <input
            type="radio"
            name="gender"
            value="other"
            className="hidden"
            onChange={(e) => setGender(e.target.value)}
          />
          Other
        </label>
      </div>
    </div>
  );
};

export default Step1Content;
