import { Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Rocket className="h-6 w-6 text-primary" />
      <span className="font-bold text-xl">Astroland</span>
    </div>
  )
} 