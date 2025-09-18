"use client"

import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="text-left mb-6">
          <h1 className="text-gray-400 text-lg font-medium">Login</h1>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Image */}
          <div className="relative h-32 sm:h-36 overflow-hidden">
            <img
              src="/construction/meme1.jpg"
              alt="CloudCar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Let's Connect with Us!
            </h2>

            <form className="space-y-4">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-blue-500 focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                  placeholder="Apa email kamu"
                />
              </div>
              
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-blue-500 focus:outline-none text-gray-700 placeholder-gray-500 text-sm pr-10"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => {}}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>

              <div className="pt-8 space-y-3">
                <button
                  formAction={login}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 px-4 rounded-full font-medium hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Masuk
                </button>
                
                <button
                  formAction={signup}
                  className="w-full border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-full font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}