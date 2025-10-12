export default function ProfileHeader({ user, profile, biodata }) {
  const getInitials = (name) => {
    if (!name) return user.email?.charAt(0).toUpperCase() || 'U'
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()
  }

  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
        
        {/* Minimal Avatar */}
        <div className="w-20 h-20 border-2 border-gray-900 rounded-full flex items-center justify-center">
          <span className="text-2xl font-light text-gray-900">
            {getInitials(biodata.full_name || profile.full_name)}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            {biodata.full_name || profile.full_name || 'Anonim'}
          </h1>
          
          <div className="space-y-1 text-gray-600">
            {biodata.age && (
              <p>{biodata.age} tahun</p>
            )}
            {biodata.location_name && (
              <p>{biodata.location_name}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="text-center sm:text-right">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-gray-900">{user.email}</p>
        </div>
      </div>
    </div>
  )
}