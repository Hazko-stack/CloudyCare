export interface BiodataType {
  id?: string
  user_id?: string
  full_name?: string | null
  age?: number | null
  gender?: 'male' | 'female' | 'other' | null
  weight?: number | null
  height?: number | null
  medical_history?: string | null
  other_medical_history?: string | null
  workout_frequency?: string | null
  other_workout_info?: string | null
  location_name?: string | null
  location_adm4?: string | null
  created_at?: string
  updated_at?: string
}

export interface FormState {
  full_name: string
  age: string
  gender: string
  weight: string
  height: string
  medical_history: string
  other_medical_history: string
  workout_frequency: string
  other_workout_info: string
  location_name: string
  location_adm4: string
}

export interface StepProps {
  existingData?: BiodataType
  formState: FormState
  updateFormState: (updates: Partial<FormState>) => void
}

export interface CityData {
  adm4: string 
  name: string
}