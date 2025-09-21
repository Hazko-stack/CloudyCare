const Step2Content = () => (
  <div className="text-left">
    <div className="flex justify-center mb-4">
      <img src="/formImage/stepping.png" alt="stepping"  />
    </div>
    <h2 className="text-xl font-semibold mb-6">Info tubuh kamu</h2>
    <p className="text-gray-600 mb-2">Berri tingkah (kg)?</p>
    <input
      type="number"
      placeholder="Berat badan"
      className="w-full p-3 border border-gray-300 rounded-lg mb-4"
    />
    <p className="text-gray-600 mb-2">Tinggi badan (cm)?</p>
    <input
      type="number"
      placeholder="Tinggi badan"
      className="w-full p-3 border border-gray-300 rounded-lg"
    />
  </div>
);
export default Step2Content;
