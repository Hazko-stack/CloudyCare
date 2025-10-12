export default function ActivityCard({ biodata }) {
  const getActivity = () => {
    switch (biodata.workout_frequency) {
      case 'jarang': return 'Jarang aktif'
      case '2days': return 'Setiap 2 hari'
      case 'weekly': return 'Mingguan'
      case 'daily': return 'Harian'
      default: return 'Tidak ditentukan'
    }
  }

  const getFrequencyLevel = () => {
    switch (biodata.workout_frequency) {
      case 'daily': return 'Tinggi'
      case '2days': return 'Sedang'
      case 'weekly': return 'Rendah'
      case 'jarang': return 'Minimal'
      default: return 'Tidak diketahui'
    }
  }

  return (
    <div className="border border-gray-200 p-8">
      <h2 className="text-lg font-light mb-6 text-gray-900">Aktivitas Fisik</h2>
      
      <div className="space-y-4">
        <div className="pb-4 border-b border-gray-100">
          <p className="text-gray-900 mb-1">{getActivity()}</p>
          <p className="text-sm text-gray-500">Tingkat aktivitas: {getFrequencyLevel()}</p>
        </div>
        
        {biodata.other_workout_info && (
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Detail tambahan:</p>
            <p>{biodata.other_workout_info}</p>
          </div>
        )}

        {!biodata.workout_frequency && !biodata.other_workout_info && (
          <div className="text-center py-4">
            <p className="text-gray-400 mb-2">Tidak ada data aktivitas</p>
            <a 
              href="/biodata"
              className="text-black border-b border-gray-300 hover:border-black transition-colors pb-1 text-sm"
            >
              Tambah Info Aktivitas
            </a>
          </div>
        )}
      </div>
    </div>
  )
}