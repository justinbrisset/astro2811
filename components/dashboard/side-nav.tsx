"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
} from "lucide-react"

interface SideNavProps {
  isAdmin: boolean
}

export function SideNav({ isAdmin }: SideNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/posts",
      label: "Posts",
      icon: FileText,
    },
    ...(isAdmin
      ? [
          {
            href: "/dashboard/users",
            label: "Users",
            icon: Users,
          },
          {
            href: "/dashboard/settings",
            label: "Settings",
            icon: Settings,
          },
        ]
      : []),
  ]

  return (
    <nav className="hidden md:flex flex-col gap-2 w-[240px] p-4 border-r">
      {routes.map((route) => {
        const Icon = route.icon
        return (
          <Button
            key={route.href}
            variant={pathname === route.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              pathname === route.href && "bg-muted"
            )}
            asChild
          >
            <Link href={route.href}>
              <Icon className="h-4 w-4" />
              {route.label}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
} 