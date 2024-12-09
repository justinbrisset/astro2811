"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Linkedin } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function LinkedInSetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const handleLinkedInConnect = async () => {
    setIsLoading(true)
    try {
      window.location.href = '/api/auth/linkedin'
    } catch (error) {
      console.error("LinkedIn error:", error)
      toast({
        title: "Error",
        description: "Failed to connect LinkedIn account.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleSkip = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error("No user found")

      // Mark onboarding as completed
      const { error } = await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("id", user.id)

      if (error) throw error

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect LinkedIn</CardTitle>
        <CardDescription>
          Connect your LinkedIn account to enhance your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          className="w-full"
          onClick={handleLinkedInConnect}
          disabled={isLoading}
        >
          <Linkedin className="mr-2 h-4 w-4" />
          {isLoading ? "Connecting..." : "Connect LinkedIn"}
        </Button>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          className="w-full"
          onClick={handleSkip}
          disabled={isLoading}
        >
          Skip for now
        </Button>
      </CardFooter>
    </Card>
  )
} 