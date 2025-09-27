import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import BiodataForm from '@/components/BiodataForm'
import { getBiodata } from './actions'

interface BiodataPageProps {
  searchParams: Promise<{  // ✅ Ubah menjadi Promise
    error?: string
    success?: string
  }>
}

export default async function BiodataPage({ searchParams }: BiodataPageProps) {
  const supabase = await createClient()
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get existing biodata
  const existingBiodata = await getBiodata()

  // ✅ Await searchParams (Next.js 15 requirement)
  const params = await searchParams

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-xl font-semibold text-center">Form Biodata Kesehatan</h1>
        </div>

        {/* Messages */}
        {params.error && (
          <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {params.error}
          </div>
        )}

        {params.success && (
          <div className="mx-4 mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {params.success}
          </div>
        )}

        {/* Form */}
        <BiodataForm existingData={existingBiodata ?? undefined} />
      </div>
    </div>
  )
}