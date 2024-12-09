"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Logo } from "@/components/ui/logo"

interface MobileNavProps {
  isAdmin: boolean
}

export function MobileNav({ isAdmin }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          href="/dashboard"
          className="flex items-center space-x-2"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-6 w-6" />
          <span className="font-bold">Astroland</span>
        </Link>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
            <Link href="/dashboard/posts" onClick={() => setOpen(false)}>
              Posts
            </Link>
            {isAdmin && (
              <>
                <Link href="/dashboard/users" onClick={() => setOpen(false)}>
                  Users
                </Link>
                <Link href="/dashboard/settings" onClick={() => setOpen(false)}>
                  Settings
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 