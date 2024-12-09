"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"

export default function CompanySetupPage() {
  const [companyName, setCompanyName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        console.error('User error:', userError)
        throw userError
      }
      
      if (!user) {
        console.error('No user found')
        throw new Error("No user found")
      }

      // First, check if company already exists
      const { data: existingCompany, error: checkError } = await supabase
        .from("companies")
        .select()
        .eq("created_by", user.id)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Check error:', checkError)
        throw checkError
      }

      if (existingCompany) {
        console.log('Company already exists:', existingCompany)
        await router.push("/onboarding/profile")
        return
      }

      // Create company
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .insert([{ 
          name: companyName, 
          created_by: user.id
        }])
        .select()

      if (companyError) throw companyError

      // Create company member record
      const { error: memberError } = await supabase
        .from("company_members")
        .insert([{
          company_id: companyData[0].id,
          user_id: user.id,
          role: 'admin',
          status: 'active'
        }])

      if (memberError) throw memberError

      console.log('Company created successfully:', companyData)
      await router.push("/onboarding/profile")
    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Astroland! 👋</CardTitle>
        <CardDescription>
          Let's start by setting up your company
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="company-name" className="text-sm font-medium">
              Company Name
            </label>
            <Input
              id="company-name"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 