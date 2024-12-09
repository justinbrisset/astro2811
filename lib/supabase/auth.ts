import { createClient } from '@/lib/supabase/client'
import { type Provider } from '@supabase/supabase-js'

const supabase = createClient()

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error

  // Check if onboarding is completed
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", data.user.id)
    .single()

  if (!profile || !profile.onboarding_completed) {
    window.location.href = "/onboarding/company"
  } else {
    window.location.href = "/dashboard"
  }

  return { data, error: null }
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
      data: {
        full_name: email.split('@')[0], // Default name from email
      }
    },
  })
  
  if (error) throw error

  // If user is created and signed in immediately (no email confirmation required)
  if (data?.user && !data.user.confirmed_at) {
    window.location.href = "/onboarding/company"
  }

  return { data, error: null }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${location.origin}/auth/reset-password`,
  })
  
  if (error) throw error
} 