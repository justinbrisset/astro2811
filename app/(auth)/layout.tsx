import { Logo } from '@/components/ui/logo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-[400px] space-y-6 px-4">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo className="h-12 w-12" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Astroland
          </h1>
          <p className="text-sm text-muted-foreground">
            Employee advocacy platform for modern teams
          </p>
        </div>
        {children}
      </div>
    </div>
  )
} 