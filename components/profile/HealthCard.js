export default function HealthCard({ biodata }) {
  const getCondition = () => {
    if (!biodata.medical_history || biodata.medical_history.length === 0) {
      return 'No conditions recorded'
    }
    
    const condition = biodata.medical_history
    switch (condition) {
      case 'asma': return 'Asthma'
      case 'hipertensi': return 'Hypertension'
      case 'alergi': return 'Allergies'
      case 'tidak_ada': return 'No conditions'
      default: return condition
    }
  }

  return (
    <div className="border border-gray-200 p-8">
      <h2 className="text-lg font-light mb-6 text-gray-900">Health</h2>
      
      <div className="space-y-4">
        <div className="pb-4 border-b border-gray-100">
          <p className="text-gray-900">{getCondition()}</p>
        </div>
        
        {biodata.other_medical_history && (
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Additional notes:</p>
            <p>{biodata.other_medical_history}</p>
          </div>
        )}

        {(!biodata.medical_history || biodata.medical_history.length === 0) && !biodata.other_medical_history && (
          <div className="text-center py-4">
            <p className="text-gray-400 mb-2">No health data</p>
            <a 
              href="/biodata"
              className="text-black border-b border-gray-300 hover:border-black transition-colors pb-1 text-sm"
            >
              Add Health Info
            </a>
          </div>
        )}
      </div>
    </div>
  )
}