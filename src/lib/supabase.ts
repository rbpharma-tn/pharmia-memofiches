import { createClient } from '@supabase/supabase-js'

// Configuration par défaut (sera remplacée par les vraies valeurs plus tard)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Client pour les composants côté client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client simplifié pour le développement
export const createSupabaseClient = () => supabase

// Types pour la base de données
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'pharmacien' | 'preparateur' | 'etudiant'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role: 'pharmacien' | 'preparateur' | 'etudiant'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'pharmacien' | 'preparateur' | 'etudiant'
          created_at?: string
          updated_at?: string
        }
      }
      memofiches: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          description: string | null
          image_url: string | null
          content: any // JSON content
          created_at: string
          updated_at: string
          created_by: string
          is_published: boolean
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          description?: string | null
          image_url?: string | null
          content: any
          created_at?: string
          updated_at?: string
          created_by: string
          is_published?: boolean
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          description?: string | null
          image_url?: string | null
          content?: any
          created_at?: string
          updated_at?: string
          created_by?: string
          is_published?: boolean
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          memofiche_id: string
          progress_percentage: number
          completed_sections: string[]
          quiz_scores: any | null
          last_accessed: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          memofiche_id: string
          progress_percentage?: number
          completed_sections?: string[]
          quiz_scores?: any | null
          last_accessed?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          memofiche_id?: string
          progress_percentage?: number
          completed_sections?: string[]
          quiz_scores?: any | null
          last_accessed?: string
          created_at?: string
          updated_at?: string
        }
      }
      glossary_terms: {
        Row: {
          id: string
          term: string
          definition: string
          memofiche_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          term: string
          definition: string
          memofiche_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          term?: string
          definition?: string
          memofiche_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'pharmacien' | 'preparateur' | 'etudiant'
    }
  }
}
