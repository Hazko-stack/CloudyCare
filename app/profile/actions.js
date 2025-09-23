'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function getProfileData() {
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

  // Debug logging
  console.log('Profile data:', profile)
  console.log('Biodata data:', biodata)
  console.log('Biodata error:', biodataError)

  return {
    user,
    profile: profile || {},
    biodata: biodata || {},
    hasData: !!biodata && !biodataError
  }
}

export async function updateProfile(formData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const profileData = {
    full_name: formData.get('full_name'),
    // tambah field lain sesuai kebutuhan
  }

  const { error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', user.id)

  if (error) {
    throw new Error('Failed to update profile')
  }
}