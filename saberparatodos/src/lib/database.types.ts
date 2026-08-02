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
