import { createClient } from '@supabase/supabase-js'

// Support both naming conventions
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export bucket name if needed
export const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'health-articles'