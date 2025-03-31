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
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string
          last_name: string
          receive_updates: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          last_name: string
          receive_updates?: boolean
          user_id?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          last_name?: string
          receive_updates?: boolean
          user_id?: string
        }
        Relationships: []
      }
      community_signups: {
        Row: {
          community: string
          id: string
          signup_date: string
          user_id: string
        }
        Insert: {
          community: string
          id?: string
          signup_date?: string
          user_id: string
        }
        Update: {
          community?: string
          id?: string
          signup_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_signups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 