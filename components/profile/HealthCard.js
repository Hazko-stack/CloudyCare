export default function HealthCard({ biodata }) {
  const getCondition = () => {
    if (!biodata.medical_history || biodata.medical_history.length === 0) {
      return 'Tidak ada kondisi yang tercatat'
    }
    
    const condition = biodata.medical_history
    switch (condition) {
      case 'asma': return 'Asma'
      case 'hipertensi': return 'Hipertensi'
      case 'alergi': return 'Alergi'
      case 'tidak_ada': return 'Tidak ada kondisi'
      default: return condition
    }
  }

  return (
    <div className="border border-gray-200 p-8">
      <h2 className="text-lg font-light mb-6 text-gray-900">Kesehatan</h2>
      
      <div className="space-y-4">
        <div className="pb-4 border-b border-gray-100">
          <p className="text-gray-900">{getCondition()}</p>
        </div>
        
        {biodata.other_medical_history && (
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Catatan tambahan:</p>
            <p>{biodata.other_medical_history}</p>
          </div>
        )}

        {(!biodata.medical_history || biodata.medical_history.length === 0) && !biodata.other_medical_history && (
          <div className="text-center py-4">
            <p className="text-gray-400 mb-2">Tidak ada data kesehatan</p>
            <a 
              href="/biodata"
              className="text-black border-b border-gray-300 hover:border-black transition-colors pb-1 text-sm"
            >
              Tambah Info Kesehatan
            </a>
          </div>
        )}
      </div>
    </div>
  )
}