'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { BiodataType } from '@/component/types/biodata'

export async function saveBiodata(formData: FormData) {
  console.log('=== SAVE BIODATA STARTED ===')
  
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  console.log('User:', user?.id, user?.email)
  console.log('User Error:', userError)
  
  if (userError || !user) {
    console.log('User not authenticated, redirecting to login')
    redirect('/login')
  }

  // Extract and log form data
  const biodataData = {
    user_id: user.id,
    full_name: formData.get('full_name') as string,
    age: parseInt(formData.get('age') as string) || null,
    gender: formData.get('gender') as string,
    weight: parseFloat(formData.get('weight') as string) || null,
    height: parseFloat(formData.get('height') as string) || null,
    medical_history: formData.getAll('medical_history') as string[],
    other_medical_history: formData.get('other_medical_history') as string,
    workout_frequency: formData.get('workout_frequency') as string,
    other_workout_info: formData.get('other_workout_info') as string,
    location_name: formData.get('location_name') as string,
    location_adm4: formData.get('location_adm4') as string,
  }

  console.log('Biodata to save:', biodataData)

  // Check if biodata already exists
  const { data: existingData, error: checkError } = await supabase
    .from('user_biodata')
    .select('id')
    .eq('user_id', user.id)
    .single()

  console.log('Existing data:', existingData)
  console.log('Check error:', checkError)

  let error

  if (existingData) {
    console.log('Updating existing biodata...')
    const result = await supabase
      .from('user_biodata')
      .update(biodataData)
      .eq('user_id', user.id)
      .select()
    error = result.error
    console.log('Update result:', result)
  } else {
    console.log('Inserting new biodata...')
    const result = await supabase
      .from('user_biodata')
      .insert(biodataData)
      .select()
    error = result.error
    console.log('Insert result:', result)
  }

  console.log('Save error:', error)

  if (error) {
    console.error('Biodata save error:', error)
    redirect('/biodata?error=Gagal menyimpan biodata: ' + error.message)
  }

  console.log('Biodata saved successfully!')
  revalidatePath('/biodata')
  redirect('/home?success=Biodata berhasil disimpan')
}

export async function getBiodata(): Promise<BiodataType | null> {
  console.log('=== GET BIODATA STARTED ===')
  
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  console.log('User for get:', user?.id, user?.email)
  
  if (!user) {
    console.log('No user found')
    return null
  }

  const { data, error } = await supabase
    .from('user_biodata')
    .select('*')
    .eq('user_id', user.id)
    .single()

  console.log('Get biodata result:', data)
  console.log('Get biodata error:', error)

  if (error && error.code !== 'PGRST116') {
    console.error('Get biodata error:', error)
    return null
  }

  return data
}