import { login, signup } from './actions'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm mx-auto">

        {/* Main Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* Header Image Section */}
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="CloudCare"
                width={160}
                height={100}
                className="object-contain filter drop-shadow-lg"
                priority
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-lg"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-6 right-6 w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-white/40 rounded-full"></div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-10">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12 tracking-wide">
              Let's Connect with Us!
            </h2>

            <form className="space-y-8">
              {/* Email Input */}
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

              {/* Password Input */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-0 py-4 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 text-base font-light pr-8"
                  placeholder="Masukkan password"
                />
                <button type="button" className="absolute right-0 top-4 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>

              {/* Spacer for better proportions */}
              <div className="h-8"></div>

              {/* Login Button */}
              <button
                formAction={login}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 text-base tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Masuk
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-light">atau</span>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                formAction={signup}
                className="w-full bg-white hover:bg-gray-50 text-black font-medium py-4 px-6 rounded-2xl transition-all duration-300 text-base tracking-wide border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
              >
                Daftar Akun Baru
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm font-light leading-relaxed">
            Dengan masuk, Anda menyetujui<br />
            <span className="text-gray-400">syarat dan ketentuan kami</span>
          </p>
        </div>
      </div>
    </div>
  )
}