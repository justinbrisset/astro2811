import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL!))
  }

  const redirectTo = new URL('/api/auth/callback/linkedin', process.env.NEXT_PUBLIC_SITE_URL)

  return NextResponse.redirect(
    `https://www.linkedin.com/oauth/v2/authorization?` +
    new URLSearchParams({
      response_type: 'code',
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      redirect_uri: redirectTo.toString(),
      state: crypto.randomUUID(),
      scope: 'r_liteprofile r_emailaddress',
    })
  )
} 