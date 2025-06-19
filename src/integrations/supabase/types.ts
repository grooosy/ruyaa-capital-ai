export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_usage: {
        Row: {
          agent: string | null
          content: string | null
          id: number
          msg_role: string | null
          ts: string | null
          user_id: string | null
        }
        Insert: {
          agent?: string | null
          content?: string | null
          id?: never
          msg_role?: string | null
          ts?: string | null
          user_id?: string | null
        }
        Update: {
          agent?: string | null
          content?: string | null
          id?: never
          msg_role?: string | null
          ts?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      arbitrage_sessions: {
        Row: {
          amount_usd: number | null
          created_at: string | null
          duration_days: number | null
          id: string
          mode: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount_usd?: number | null
          created_at?: string | null
          duration_days?: number | null
          id?: string
          mode?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount_usd?: number | null
          created_at?: string | null
          duration_days?: number | null
          id?: string
          mode?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string | null
          created_at: string
          id: number
          role: string
          thread_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: never
          role: string
          thread_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: never
          role?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "chat_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_recordings: {
        Row: {
          id: string
          user_id: string | null
          thread_id: string | null
          file_url: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          thread_id?: string | null
          file_url: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          thread_id?: string | null
          file_url?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_recordings_thread_id_fkey",
            columns: ["thread_id"],
            isOneToOne: false,
            referencedRelation: "chat_threads",
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_recordings_user_id_fkey",
            columns: ["user_id"],
            isOneToOne: false,
            referencedRelation: "users",
            referencedColumns: ["id"]
          }
        ]
      }
      chat_threads: {
        Row: {
          agent: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          agent: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          agent?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      deposits: {
        Row: {
          amount_usd: number | null
          chain: string | null
          created_at: string | null
          id: string
          status: string | null
          tx_hash: string | null
          user_id: string | null
        }
        Insert: {
          amount_usd?: number | null
          chain?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          tx_hash?: string | null
          user_id?: string | null
        }
        Update: {
          amount_usd?: number | null
          chain?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          tx_hash?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      user_course_progress: {
        Row: {
          completed_at: string | null
          completed_lessons: string[] | null
          course_id: string
          id: string
          last_accessed_at: string
          progress_percentage: number
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_lessons?: string[] | null
          course_id: string
          id?: string
          last_accessed_at?: string
          progress_percentage?: number
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_lessons?: string[] | null
          course_id?: string
          id?: string
          last_accessed_at?: string
          progress_percentage?: number
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_course_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "video_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_features: {
        Row: {
          activated_at: string | null
          feature: string
          user_id: string
        }
        Insert: {
          activated_at?: string | null
          feature: string
          user_id: string
        }
        Update: {
          activated_at?: string | null
          feature?: string
          user_id?: string
        }
        Relationships: []
      }
      video_courses: {
        Row: {
          created_at: string
          description: string
          description_ar: string
          difficulty_level: string
          id: string
          is_active: boolean
          thumbnail_url: string | null
          title: string
          title_ar: string
          total_duration_minutes: number
          total_lessons: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          description_ar: string
          difficulty_level?: string
          id?: string
          is_active?: boolean
          thumbnail_url?: string | null
          title: string
          title_ar: string
          total_duration_minutes?: number
          total_lessons?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          description_ar?: string
          difficulty_level?: string
          id?: string
          is_active?: boolean
          thumbnail_url?: string | null
          title?: string
          title_ar?: string
          total_duration_minutes?: number
          total_lessons?: number
          updated_at?: string
        }
        Relationships: []
      }
      video_lessons: {
        Row: {
          course_id: string
          created_at: string
          description: string
          description_ar: string
          duration_seconds: number
          id: string
          is_active: boolean
          lesson_number: number
          thumbnail_url: string | null
          title: string
          title_ar: string
          topics: string[] | null
          topics_ar: string[] | null
          video_url: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description: string
          description_ar: string
          duration_seconds: number
          id?: string
          is_active?: boolean
          lesson_number: number
          thumbnail_url?: string | null
          title: string
          title_ar: string
          topics?: string[] | null
          topics_ar?: string[] | null
          video_url: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string
          description_ar?: string
          duration_seconds?: number
          id?: string
          is_active?: boolean
          lesson_number?: number
          thumbnail_url?: string | null
          title?: string
          title_ar?: string
          topics?: string[] | null
          topics_ar?: string[] | null
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "video_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          address: string
          chain: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          address: string
          chain: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          address?: string
          chain?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      },
      broker_registrations: {
        Row: {
          id: string
          user_id: string | null
          full_name: string
          email: string
          phone: string | null
          country: string | null
          platform: string | null
          account_type: string | null
          deposit: number | null
          kyc_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          full_name: string
          email: string
          phone?: string | null
          country?: string | null
          platform?: string | null
          account_type?: string | null
          deposit?: number | null
          kyc_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          full_name?: string
          email?: string
          phone?: string | null
          country?: string | null
          platform?: string | null
          account_type?: string | null
          deposit?: number | null
          kyc_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "broker_registrations_user_id_fkey",
            columns: ["user_id"],
            isOneToOne: false,
            referencedRelation: "users",
            referencedColumns: ["id"]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
