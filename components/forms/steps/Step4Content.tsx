const Step4Content = () => (
  <div className="text-left">
    <div className="flex justify-center mb-4">
      <img src="/formImage/working.png" alt="working"  />
    </div>  
    <h2 className="text-xl font-semibold mb-4">Seberapa sering kamu olahraga?</h2>
    <div className="space-y-3">
      <label className="flex items-center space-x-2">
        <input type="radio" name="exercise" value="never" />
        <span>Tidak pernah</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="radio" name="exercise" value="rarely" />
        <span>Jarang</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="radio" name="exercise" value="sometimes" />
        <span>Kadang-kadang</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="radio" name="exercise" value="often" />
        <span>Sering</span>
      </label>
    </div>
  </div>
);
export default Step4Content;