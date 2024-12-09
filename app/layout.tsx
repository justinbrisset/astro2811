import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { AuthProvider } from "@/components/providers/auth-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Astroland - Employee Advocacy Platform',
  description: 'Empower your team to share company content on LinkedIn',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className
        )}
      >
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
