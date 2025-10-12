export default function BMICard({ bmi, biodata }) {
  const getBMICategory = (bmi) => {
    if (!bmi) return { category: 'Tidak Diketahui', color: 'gray', description: 'BMI tidak dapat dihitung' }
    
    const bmiValue = parseFloat(bmi)
    if (bmiValue < 18.5) {
      return { category: 'Kurus', color: 'blue', description: 'Di bawah berat normal' }
    } else if (bmiValue < 25) {
      return { category: 'Sehat', color: 'green', description: 'Rentang berat normal' }
    } else if (bmiValue < 30) {
      return { category: 'Berlebih', color: 'yellow', description: 'Di atas berat normal' }
    } else {
      return { category: 'Obesitas', color: 'red', description: 'Jauh di atas berat normal' }
    }
  }

  const bmiInfo = getBMICategory(bmi)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">BMI</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          bmiInfo.color === 'green' ? 'bg-green-100 text-green-800' :
          bmiInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
          bmiInfo.color === 'red' ? 'bg-red-100 text-red-800' :
          bmiInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {bmiInfo.category}
        </div>
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {bmi || '--'}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          {bmiInfo.description}
        </div>

        {biodata.weight && biodata.height ? (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{biodata.weight}kg</div>
              <div className="text-sm text-gray-500">Berat</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{biodata.height}cm</div>
              <div className="text-sm text-gray-500">Tinggi</div>
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t">
            <div className="text-gray-500 text-sm">
              Berat: {biodata.weight || 'Belum diisi'} | Tinggi: {biodata.height || 'Belum diisi'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}