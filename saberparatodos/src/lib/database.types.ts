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
          credits: number
          credits_refill_at: string
          subscription_tier: 'free' | 'pro'
          institution_id: string | null
          school_id: string | null
          preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          credits?: number
          credits_refill_at?: string
          subscription_tier?: 'free' | 'pro'
          institution_id?: string | null
          school_id?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          credits?: number
          credits_refill_at?: string
          subscription_tier?: 'free' | 'pro'
          institution_id?: string | null
          school_id?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      colleges: {
        Row: {
          id: string
          cod_dane: string
          name: string
          department: string | null
          municipality: string | null
          sector: string | null
          character: string | null
          calendar: string | null
          address: string | null
          phone: string | null
          email: string | null
          principal: string | null
          total_students: number | null
          created_at: string
        }
        Insert: {
          id?: string
          cod_dane: string
          name: string
          department?: string | null
          municipality?: string | null
          sector?: string | null
          character?: string | null
          calendar?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          principal?: string | null
          total_students?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          cod_dane?: string
          name?: string
          department?: string | null
          municipality?: string | null
          sector?: string | null
          character?: string | null
          calendar?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          principal?: string | null
          total_students?: number | null
          created_at?: string
        }
        Relationships: []
      }

      training_sessions: {
        Row: {
          id: string
          user_id: string
          subject: string
          topic: string
          current_difficulty: number
          questions_answered: number
          correct_answers: number
          status: 'active' | 'completed' | 'abandoned'
          started_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          topic: string
          current_difficulty?: number
          questions_answered?: number
          correct_answers?: number
          status?: 'active' | 'completed' | 'abandoned'
          started_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          topic?: string
          current_difficulty?: number
          questions_answered?: number
          correct_answers?: number
          status?: 'active' | 'completed' | 'abandoned'
          started_at?: string
          completed_at?: string | null
        }
        Relationships: []
      }

      generated_content: {
        Row: {
          id: string
          user_id: string
          training_session_id: string | null
          type: 'infographic' | 'explanation' | 'quiz'
          prompt_used: string
          content_payload: Json
          cost: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          training_session_id?: string | null
          type: 'infographic' | 'explanation' | 'quiz'
          prompt_used: string
          content_payload: Json
          cost: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          training_session_id?: string | null
          type?: 'infographic' | 'explanation' | 'quiz'
          prompt_used?: string
          content_payload?: Json
          cost?: number
          created_at?: string
        }
        Relationships: []
      }

      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'refill' | 'purchase' | 'spend'
          amount: number
          service_used: string | null
          reference_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'refill' | 'purchase' | 'spend'
          amount: number
          service_used?: string | null
          reference_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'refill' | 'purchase' | 'spend'
          amount?: number
          service_used?: string | null
          reference_id?: string | null
          created_at?: string
        }
        Relationships: []
      }

      user_answered_questions: {
        Row: {
          id: number
          user_id: string
          question_id: string
          was_correct: boolean
          time_taken: number | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id?: string
          question_id: string
          was_correct: boolean
          time_taken?: number | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          question_id?: string
          was_correct?: boolean
          time_taken?: number | null
          metadata?: Json | null
          created_at?: string
        }
        Relationships: []
      }

      user_stats: {
        Row: {
          user_id: string
          total_answered: number
          correct_count: number
          avg_time_seconds: number | null
          updated_at: string | null
        }
        Insert: {
          user_id?: string
          total_answered?: number
          correct_count?: number
          avg_time_seconds?: number | null
          updated_at?: string | null
        }
        Update: {
          user_id?: string
          total_answered?: number
          correct_count?: number
          avg_time_seconds?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }

      party_sessions: {
        Row: {
          id: string
          party_code: string
          host_id: string
          created_at: string
        }
        Insert: {
          id?: string
          party_code: string
          host_id: string
          created_at?: string
        }
        Update: {
          id?: string
          party_code?: string
          host_id?: string
          created_at?: string
        }
        Relationships: []
      }

      parties: {
        Row: {
          id: string
          pin: string
          host_id: string
          status: string
          config: Json
          total_questions: number
          ended_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          pin: string
          host_id: string
          status: string
          config: Json
          total_questions: number
          ended_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          pin?: string
          host_id?: string
          status?: string
          config?: Json
          total_questions?: number
          ended_at?: string | null
          created_at?: string
        }
        Relationships: []
      }

      party_players: {
        Row: {
          id: string
          party_id: string
          player_id: string
          nickname: string
          score: number
          rank: number | null
          correct_answers: number
          joined_at: string
        }
        Insert: {
          id?: string
          party_id: string
          player_id: string
          nickname: string
          score?: number
          rank?: number | null
          correct_answers?: number
          joined_at?: string
        }
        Update: {
          id?: string
          party_id?: string
          player_id?: string
          nickname?: string
          score?: number
          rank?: number | null
          correct_answers?: number
          joined_at?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          owner_user_id: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          owner_user_id?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          owner_user_id?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
        Relationships: []
      }

      bot_linking_codes: {
        Row: {
          code: string
          user_id: string | null
          created_at: string
          expires_at: string
        }
        Insert: {
          code: string
          user_id?: string | null
          created_at?: string
          expires_at?: string
        }
        Update: {
          code?: string
          user_id?: string | null
          created_at?: string
          expires_at?: string
        }
        Relationships: []
      }

      question_comments: {
        Row: {
          id: string
          question_id: string
          user_id: string | null
          user_name: string | null
          content: string
          created_at: string
          updated_at: string
          is_approved: boolean
          github_issue_url: string | null
        }
        Insert: {
          id?: string
          question_id: string
          user_id?: string | null
          user_name?: string | null
          content: string
          created_at?: string
          updated_at?: string
          is_approved?: boolean
          github_issue_url?: string | null
        }
        Update: {
          id?: string
          question_id?: string
          user_id?: string | null
          user_name?: string | null
          content?: string
          created_at?: string
          updated_at?: string
          is_approved?: boolean
          github_issue_url?: string | null
        }
        Relationships: []
      }

    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_tier: 'free' | 'pro'
      content_type: 'infographic' | 'explanation' | 'quiz'
      transaction_type: 'refill' | 'purchase' | 'spend'
    }
  }
}
