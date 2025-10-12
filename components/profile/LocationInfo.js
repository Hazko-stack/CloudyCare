export default function LocationInfo({ biodata }) {
  return (
    <div className="border border-gray-200 p-8">
      <h2 className="text-lg font-light mb-6 text-gray-900">Lokasi</h2>

      {biodata.location_name ? (
        <div className="space-y-4">
          <div className="pb-4 border-b border-gray-100">
            <p className="text-gray-900 font-medium">{biodata.location_name}</p>
            {biodata.location_adm4 && (
              <p className="text-sm text-gray-500 mt-1">ID: {biodata.location_adm4}</p>
            )}
          </div>

          {biodata.latitude && biodata.longitude && (
            <div className="text-sm text-gray-600">
              <p>Koordinat:</p>
              <p className="font-mono text-xs mt-1">
                {parseFloat(biodata.latitude).toFixed(4)}, {parseFloat(biodata.longitude).toFixed(4)}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">Tidak ada data lokasi</p>
          <a 
            href="/biodata"
            className="text-black border-b border-gray-300 hover:border-black transition-colors pb-1 text-sm"
          >
            Tambah Lokasi
          </a>
        </div>
      )}
    </div>
  )
}