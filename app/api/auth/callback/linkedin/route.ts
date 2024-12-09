import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')

  if (error || !code) {
    console.error('LinkedIn OAuth error:', error)
    return NextResponse.redirect(new URL('/onboarding/linkedin?error=oauth_denied', process.env.NEXT_PUBLIC_SITE_URL!))
  }

  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('No authenticated user found')
    }

    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: new URL('/api/auth/callback/linkedin', process.env.NEXT_PUBLIC_SITE_URL!).toString(),
        client_id: process.env.LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const { access_token } = await tokenResponse.json()

    // Update user profile and create LinkedIn account record
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ linkedin_connected: true })
      .eq('id', user.id)

    if (updateError) throw updateError

    const { error: linkedinError } = await supabase
      .from('linkedin_accounts')
      .upsert({
        user_id: user.id,
        access_token,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (linkedinError) throw linkedinError

    return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_SITE_URL!))
  } catch (err) {
    console.error('LinkedIn callback error:', err)
    return NextResponse.redirect(new URL('/onboarding/linkedin?error=callback_failed', process.env.NEXT_PUBLIC_SITE_URL!))
  }
} 