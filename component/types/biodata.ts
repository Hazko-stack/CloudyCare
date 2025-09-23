export interface BiodataType {
  id?: string
  user_id?: string
  
  // Step 1
  full_name?: string | null
  age?: number | null
  gender?: 'male' | 'female' | 'other' | null
  
  // Step 2
  weight?: number | null
  height?: number | null
  
  // Step 3
  medical_history?: string[] | null
  other_medical_history?: string | null
  
  // Step 4
  workout_frequency?: string | null
  other_workout_info?: string | null
  
  // Step 5
  location_name?: string | null
  location_adm4?: string | null
  latitude?: number | null
  longitude?: number | null
  
  created_at?: string
  updated_at?: string
}