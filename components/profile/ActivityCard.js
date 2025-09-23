export default function ActivityCard({ biodata }) {
  const getActivity = () => {
    switch (biodata.workout_frequency) {
      case 'jarang': return 'Rarely active'
      case '2days': return 'Every 2 days'
      case 'weekly': return 'Weekly'
      case 'daily': return 'Daily'
      default: return 'Not specified'
    }
  }

  const getFrequencyLevel = () => {
    switch (biodata.workout_frequency) {
      case 'daily': return 'High'
      case '2days': return 'Moderate'
      case 'weekly': return 'Low'
      case 'jarang': return 'Minimal'
      default: return 'Unknown'
    }
  }

  return (
    <div className="border border-gray-200 p-8">
      <h2 className="text-lg font-light mb-6 text-gray-900">Physical Activity</h2>
      
      <div className="space-y-4">
        <div className="pb-4 border-b border-gray-100">
          <p className="text-gray-900 mb-1">{getActivity()}</p>
          <p className="text-sm text-gray-500">Activity level: {getFrequencyLevel()}</p>
        </div>
        
        {biodata.other_workout_info && (
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Additional details:</p>
            <p>{biodata.other_workout_info}</p>
          </div>
        )}

        {!biodata.workout_frequency && !biodata.other_workout_info && (
          <div className="text-center py-4">
            <p className="text-gray-400 mb-2">No activity data</p>
            <a 
              href="/biodata"
              className="text-black border-b border-gray-300 hover:border-black transition-colors pb-1 text-sm"
            >
              Add Activity Info
            </a>
          </div>
        )}
      </div>
    </div>
  )
}