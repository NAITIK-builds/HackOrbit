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
          username: string | null
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          year: string | null
          branch: string | null
          roll_number: string | null
          phone: string | null
          location: string | null
          github_url: string | null
          linkedin_url: string | null
          website_url: string | null
          skills: string[] | null
          level: string | null
          points: number | null
          streak: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          year?: string | null
          branch?: string | null
          roll_number?: string | null
          phone?: string | null
          location?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          website_url?: string | null
          skills?: string[] | null
          level?: string | null
          points?: number | null
          streak?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          year?: string | null
          branch?: string | null
          roll_number?: string | null
          phone?: string | null
          location?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          website_url?: string | null
          skills?: string[] | null
          level?: string | null
          points?: number | null
          streak?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      todos: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          completed: boolean | null
          priority: string | null
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          completed?: boolean | null
          priority?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          completed?: boolean | null
          priority?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          location: string | null
          category: string | null
          max_participants: number | null
          organizer_id: string | null
          image_url: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          location?: string | null
          category?: string | null
          max_participants?: number | null
          organizer_id?: string | null
          image_url?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          location?: string | null
          category?: string | null
          max_participants?: number | null
          organizer_id?: string | null
          image_url?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string
          user_id: string
          registered_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          registered_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          registered_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          user_id: string
          tech_stack: string[] | null
          github_url: string | null
          demo_url: string | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          user_id: string
          tech_stack?: string[] | null
          github_url?: string | null
          demo_url?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          user_id?: string
          tech_stack?: string[] | null
          github_url?: string | null
          demo_url?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          icon: string | null
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          icon?: string | null
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          icon?: string | null
          earned_at?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}