import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/service-role"

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) {
    console.error("Session error:", sessionError)
    redirect("/login")
  }

  if (!session) {
    redirect("/login")
  }

  try {
    let { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()

    if (profile?.onboarding_completed) {
      redirect("/dashboard")
    }

    if (profileError?.code === 'PGRST116') {
      const { data: newProfile, error: createError } = await supabaseAdmin
        .from("profiles")
        .insert([{
          id: session.user.id,
          role: 'user',
          onboarding_completed: false,
          full_name: session.user.email?.split('@')[0] || '',
        }])
        .select()
        .single()

      if (createError) {
        console.error("Create profile error details:", JSON.stringify(createError, null, 2))
        redirect("/login")
      }

      profile = newProfile
    } else if (profileError) {
      redirect("/login")
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md mx-auto p-6">
          {children}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Layout error:", error)
    redirect("/login")
  }
}