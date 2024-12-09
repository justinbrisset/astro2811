import Link from "next/link"
import { Metadata } from "next"
import { AuthForm } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Register | Astroland",
  description: "Create your account",
}

export default function RegisterPage() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-semibold">Create an account</h2>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </CardHeader>
      <CardContent>
        <AuthForm type="register" />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Already have an account?
            </span>
          </div>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 