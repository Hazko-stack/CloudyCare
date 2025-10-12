import { login, signup } from './actions'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white sm:bg-black flex items-center justify-center px-0 py-0 sm:px-4 sm:py-8">
      <div className="w-full sm:max-w-sm sm:mx-auto">
        
        <div className="bg-white rounded-none sm:rounded-3xl overflow-hidden shadow-none sm:shadow-2xl min-h-screen sm:min-h-0">
          
          <div className="relative h-48 overflow-hidden -mx-0">
            <Image
              src="/header_img.png"
              alt="Header Image"
              fill
              className="object-cover w-full"
              priority
            />
          </div>

          {/* Form Section */}
          <div className="px-8 py-10">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12 tracking-wide">
              Let&apos;s Connect with Us!
            </h2>

            <form className="space-y-8">
             
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-0 py-4 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 text-base font-light"
                  placeholder="Apa email kamu"
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-0 py-4 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 text-base font-light pr-8"
                  placeholder="Masukkan password"
                />
              </div>
              
              <button
                formAction={login}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 text-base tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Masuk
              </button>

              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-light">atau</span>
                </div>
              </div>

              <button
                formAction={signup}
                className="w-full bg-white hover:bg-gray-50 text-black font-medium py-4 px-6 rounded-2xl transition-all duration-300 text-base tracking-wide border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
              >
                Daftar Akun Baru
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}