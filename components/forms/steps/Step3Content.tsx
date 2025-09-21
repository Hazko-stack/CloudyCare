const Step3Content = () => (
  <div className="text-left">
    <div className="flex justify-center mb-4">
      <img src="/formImage/history.png" alt="history"  />
    </div>  
    <h2 className="text-xl font-semibold mb-4">Punya riwayat kesehatan?</h2>
    <div className="space-y-3">
      <label className="flex items-center space-x-2">
        <input type="radio" name="medical_history" value="none" />
        <span>Tidak ada</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="radio" name="medical_history" value="hypertension" />
        <span>Hipertensi</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="radio" name="medical_history" value="diabetes" />
        <span>Diabetes</span>
      </label>
    </div>
  </div>
);
export default Step3Content;