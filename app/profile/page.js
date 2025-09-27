import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileHeader from '@/components/profile/ProfileHeader'
import BMICard from '@/components/profile/BMICard'
import LocationInfo from '@/components/profile/LocationInfo'
import HealthCard from '@/components/profile/HealthCard'
import ActivityCard from '@/components/profile/ActivityCard'
import { FloatingDockDemo } from '@/components/Dock'

async function getProfileData() {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user biodata
  const { data: biodata, error: biodataError } = await supabase
    .from('user_biodata')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return {
    user,
    profile: profile || {},
    biodata: biodata || {},
    hasData: !!biodata && !biodataError
  }
}

export default async function ProfilePage() {
  const { user, profile, biodata, hasData } = await getProfileData()

  // Calculate BMI
  const bmi = biodata.weight && biodata.height 
    ? (biodata.weight / ((biodata.height / 100) ** 2)).toFixed(1)
    : null

  // If no biodata, show minimal empty state
  if (!hasData) {
    return (
      <>
        <div className="min-h-screen bg-white pb-20">
          <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="text-center border border-gray-200 p-12">
              <div className="w-16 h-16 mx-auto mb-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
              
              <h1 className="text-2xl font-light mb-4 text-gray-900">
                Complete Your Profile
              </h1>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Fill out your health information to get started
              </p>
              
              <a
                href="/biodata"
                className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
              >
                Fill Biodata
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating Dock */}
        <FloatingDockDemo />
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-white pb-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          
          {/* Debug Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-blue-800 mb-2">Debug Info:</h3>
            <div className="text-sm text-blue-700">
              <p>User: {user.email}</p>
              <p>Biodata ID: {biodata.id}</p>
              <p>Updated: {biodata.updated_at}</p>
              <p>BMI: {bmi || 'Not calculated'}</p>
            </div>
          </div>

          {/* Minimal Header */}
          <ProfileHeader user={user} profile={profile} biodata={biodata} />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <BMICard bmi={bmi} biodata={biodata} />
            <LocationInfo biodata={biodata} />
            <HealthCard biodata={biodata} />
            <ActivityCard biodata={biodata} />
          </div>

          {/* Edit Link */}
          <div className="mt-12 text-center">
            <a
              href="/biodata"
              className="text-black border-b border-gray-300 hover:border-black transition-colors pb-1"
            >
              Edit Information
            </a>
          </div>
        </div>
      </div>
      
      {/* Floating Dock - Always visible */}
      <FloatingDockDemo />
    </>
  )
}