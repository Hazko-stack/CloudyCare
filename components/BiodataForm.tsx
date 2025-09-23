'use client'

import { useState, useCallback } from 'react'
import Step1 from './biodata/Step1'
import Step2 from './biodata/Step2'
import Step3 from './biodata/Step3'
import Step4 from './biodata/Step4'
import Step5 from './biodata/Step5'
import { saveBiodata } from '@/app/biodata/actions'
import { BiodataType, FormState } from '@/component/types/biodata'

interface BiodataFormProps {
  existingData?: BiodataType
}

export default function BiodataForm({ existingData }: BiodataFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Centralized form state
  const [formState, setFormState] = useState<FormState>({
    // Step 1
    full_name: existingData?.full_name || '',
    age: existingData?.age?.toString() || '',
    gender: existingData?.gender || '',
    // Step 2
    weight: existingData?.weight?.toString() || '',
    height: existingData?.height?.toString() || '',
    // Step 3
    medical_history: existingData?.medical_history || '',
    other_medical_history: existingData?.other_medical_history || '',
    // Step 4
    workout_frequency: existingData?.workout_frequency || '',
    other_workout_info: existingData?.other_workout_info || '',
    // Step 5
    location_name: existingData?.location_name || '',
    location_adm4: existingData?.location_adm4 || '',
    latitude: existingData?.latitude?.toString() || '',
    longitude: existingData?.longitude?.toString() || '',
  })

  // Update form state with useCallback to prevent infinite loop
  const updateFormState = useCallback((updates: Partial<FormState>) => {
    setFormState(prev => {
      // Only update if values actually changed
      const newState = { ...prev, ...updates }
      const hasChanges = Object.keys(updates).some(key => 
        prev[key as keyof FormState] !== updates[key as keyof FormState]
      )
      
      if (!hasChanges) {
        return prev // Return same reference if no changes
      }
      
      console.log('Form state updated:', updates)
      return newState
    })
  }, [])

  const handleNext = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    console.log('Form submitting with state:', formState)
    setIsSubmitting(true)
    
    // Create new FormData with all steps data
    const completeFormData = new FormData()
    
    // Add all form state to FormData
    completeFormData.append('full_name', formState.full_name)
    completeFormData.append('age', formState.age)
    completeFormData.append('gender', formState.gender)
    completeFormData.append('weight', formState.weight)
    completeFormData.append('height', formState.height)
    completeFormData.append('medical_history', formState.medical_history)
    completeFormData.append('other_medical_history', formState.other_medical_history)
    completeFormData.append('workout_frequency', formState.workout_frequency)
    completeFormData.append('other_workout_info', formState.other_workout_info)
    completeFormData.append('location_name', formState.location_name)
    completeFormData.append('location_adm4', formState.location_adm4)
    completeFormData.append('latitude', formState.latitude)
    completeFormData.append('longitude', formState.longitude)
    
    console.log('Complete FormData entries:')
    for (const [key, value] of completeFormData.entries()) {
      console.log(key, value)
    }
    
    try {
      await saveBiodata(completeFormData)
    } catch (error) {
      console.error('Error saving biodata:', error)
      setIsSubmitting(false)
    }
  }

  const handleFormKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep < 5) {
      e.preventDefault()
      handleNext()
    }
  }

  const renderStep = () => {
    const stepProps = {
      existingData,
      formState,
      updateFormState
    }

    switch(currentStep) {
      case 1:
        return <Step1 key={`step-${currentStep}`} {...stepProps} />
      case 2:
        return <Step2 key={`step-${currentStep}`} {...stepProps} />
      case 3:
        return <Step3 key={`step-${currentStep}`} {...stepProps} />
      case 4:
        return <Step4 key={`step-${currentStep}`} {...stepProps} />
      case 5:
        return <Step5 key={`step-${currentStep}`} {...stepProps} />
      default:
        return <Step1 key={`step-${currentStep}`} {...stepProps} />
    }
  }

  return (
    <form 
      action={handleSubmit} 
      onKeyDown={handleFormKeyPress}
      className="bg-white"
    >
      <div className="p-6">
        {/* Debug Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <details>
            <summary className="font-semibold text-blue-800 cursor-pointer">Debug Form State</summary>
            <div className="text-sm text-blue-700 mt-2">
              <p>Step: {currentStep}</p>
              <p>Name: {formState.full_name || 'Empty'}</p>
              <p>Age: {formState.age || 'Empty'}</p>
              <p>Gender: {formState.gender || 'Empty'}</p>
              <p>Weight: {formState.weight || 'Empty'}</p>
              <p>Height: {formState.height || 'Empty'}</p>
              <p>Location: {formState.location_name || 'Empty'}</p>
            </div>
          </details>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep
                  ? 'bg-yellow-400 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step}
            </div>
          ))}
        </div>

        {/* Current Step */}
        {renderStep()}

        {/* Hidden inputs to preserve all form data */}
        <div style={{ display: 'none' }}>
          <input name="full_name" value={formState.full_name} readOnly />
          <input name="age" value={formState.age} readOnly />
          <input name="gender" value={formState.gender} readOnly />
          <input name="weight" value={formState.weight} readOnly />
          <input name="height" value={formState.height} readOnly />
          <input name="medical_history" value={formState.medical_history} readOnly />
          <input name="other_medical_history" value={formState.other_medical_history} readOnly />
          <input name="workout_frequency" value={formState.workout_frequency} readOnly />
          <input name="other_workout_info" value={formState.other_workout_info} readOnly />
          <input name="location_name" value={formState.location_name} readOnly />
          <input name="location_adm4" value={formState.location_adm4} readOnly />
          <input name="latitude" value={formState.latitude} readOnly />
          <input name="longitude" value={formState.longitude} readOnly />
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button 
              type="button"
              onClick={(e) => handlePrev(e)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Kembali
            </button>
          )}
          
          {currentStep < 5 ? (
            <button 
              type="button"
              onClick={(e) => handleNext(e)}
              className="px-6 py-2 bg-yellow-400 text-white rounded-lg ml-auto hover:bg-yellow-500 transition-colors"
            >
              Selanjutnya
            </button>
          ) : (
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-500 text-white rounded-lg ml-auto hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
