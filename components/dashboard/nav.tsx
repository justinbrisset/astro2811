"use client"

import Link from "next/link"
import { User } from "@supabase/supabase-js"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/dashboard/user-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"

interface DashboardNavProps {
  user: User
  isAdmin: boolean
}

export function DashboardNav({ user, isAdmin }: DashboardNavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="md:hidden">
          <MobileNav isAdmin={isAdmin} />
        </div>
        <div className="hidden md:flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold">Astroland</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/dashboard/posts">
              <Button variant="ghost">Posts</Button>
            </Link>
            {isAdmin && (
              <>
                <Link href="/dashboard/users">
                  <Button variant="ghost">Users</Button>
                </Link>
                <Link href="/dashboard/settings">
                  <Button variant="ghost">Settings</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <UserNav user={user} />
        </div>
      </div>
    </header>
  )
} 