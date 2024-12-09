import { Button } from "@/components/ui/button"
import {
  FileText,
  Users,
  Settings,
  Share2,
} from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      label: "Create New Post",
      icon: FileText,
      onClick: () => {},
    },
    {
      label: "Invite Team Member",
      icon: Users,
      onClick: () => {},
    },
    {
      label: "Share to LinkedIn",
      icon: Share2,
      onClick: () => {},
    },
    {
      label: "Account Settings",
      icon: Settings,
      onClick: () => {},
    },
  ]

  return (
    <div className="space-y-4">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Button
            key={action.label}
            variant="outline"
            className="w-full justify-start"
            onClick={action.onClick}
          >
            <Icon className="mr-2 h-4 w-4" />
            {action.label}
          </Button>
        )
      })}
    </div>
  )
} 