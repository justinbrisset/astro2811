export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          job_title: string | null
          role: string
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          created_by: string
          created_at: string
          updated_at: string
        }
      }
      company_members: {
        Row: {
          id: string
          company_id: string
          user_id: string
          role: string
          status: string
          created_at: string
          updated_at: string
        }
      }
      linkedin_accounts: {
        Row: {
          id: string
          user_id: string
          access_token: string
          created_at: string
          updated_at: string
        }
      }
    }
  }
} 