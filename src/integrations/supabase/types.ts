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
      exam_attempts: {
        Row: {
          completed: boolean | null
          created_at: string | null
          device_info: string | null
          end_time: string | null
          exam_id: string
          id: string
          ip_address: unknown | null
          pass_status: Database["public"]["Enums"]["pass_status"] | null
          percentage: number | null
          score: number | null
          start_time: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          device_info?: string | null
          end_time?: string | null
          exam_id: string
          id?: string
          ip_address?: unknown | null
          pass_status?: Database["public"]["Enums"]["pass_status"] | null
          percentage?: number | null
          score?: number | null
          start_time?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          device_info?: string | null
          end_time?: string | null
          exam_id?: string
          id?: string
          ip_address?: unknown | null
          pass_status?: Database["public"]["Enums"]["pass_status"] | null
          percentage?: number | null
          score?: number | null
          start_time?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_attempts_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_results: {
        Row: {
          completed_at: string | null
          created_at: string | null
          exam_type: string
          id: string
          percentage: number
          score: number
          subject: string
          time_taken: number | null
          total_questions: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          exam_type: string
          id?: string
          percentage: number
          score: number
          subject: string
          time_taken?: number | null
          total_questions: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          exam_type?: string
          id?: string
          percentage?: number
          score?: number
          subject?: string
          time_taken?: number | null
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          exam_name: string
          exam_type: Database["public"]["Enums"]["exam_type"]
          id: string
          is_active: boolean | null
          passing_score: number | null
          subject: Database["public"]["Enums"]["subject_type"]
          time_limit: number | null
          total_questions: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          exam_name: string
          exam_type: Database["public"]["Enums"]["exam_type"]
          id?: string
          is_active?: boolean | null
          passing_score?: number | null
          subject: Database["public"]["Enums"]["subject_type"]
          time_limit?: number | null
          total_questions?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          exam_name?: string
          exam_type?: Database["public"]["Enums"]["exam_type"]
          id?: string
          is_active?: boolean | null
          passing_score?: number | null
          subject?: Database["public"]["Enums"]["subject_type"]
          time_limit?: number | null
          total_questions?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          expiry_date: string | null
          id: string
          is_read: boolean | null
          notification_text: string
          notification_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          is_read?: boolean | null
          notification_text: string
          notification_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          is_read?: boolean | null
          notification_text?: string
          notification_type?: string
          user_id?: string
        }
        Relationships: []
      }
      options: {
        Row: {
          created_at: string | null
          id: string
          is_correct: boolean | null
          option_image: string | null
          option_text: string
          question_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          option_image?: string | null
          option_text: string
          question_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          option_image?: string | null
          option_text?: string
          question_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"] | null
          age: number | null
          created_at: string | null
          education_level: string | null
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          profile_image: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          subscription_end_date: string | null
          subscription_plan:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          target_exam: Database["public"]["Enums"]["exam_type"] | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          age?: number | null
          created_at?: string | null
          education_level?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          last_name?: string | null
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          subscription_end_date?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          target_exam?: Database["public"]["Enums"]["exam_type"] | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          age?: number | null
          created_at?: string | null
          education_level?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          subscription_end_date?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          target_exam?: Database["public"]["Enums"]["exam_type"] | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string | null
          created_by: string | null
          difficulty_level:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          exam_id: string
          explanation: string | null
          id: string
          question_image: string | null
          question_text: string
          question_type: Database["public"]["Enums"]["question_type"] | null
          score: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          exam_id: string
          explanation?: string | null
          id?: string
          question_image?: string | null
          question_text: string
          question_type?: Database["public"]["Enums"]["question_type"] | null
          score?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          exam_id?: string
          explanation?: string | null
          id?: string
          question_image?: string | null
          question_text?: string
          question_type?: Database["public"]["Enums"]["question_type"] | null
          score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan: Database["public"]["Enums"]["subscription_plan"]
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["subscription_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["subscription_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_tracking: {
        Row: {
          created_at: string | null
          exam_type: string
          id: string
          subject: string
          updated_at: string | null
          usage_count: number | null
          usage_month: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          exam_type: string
          id?: string
          subject: string
          updated_at?: string | null
          usage_count?: number | null
          usage_month: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          exam_type?: string
          id?: string
          subject?: string
          updated_at?: string | null
          usage_count?: number | null
          usage_month?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_tracking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_answers: {
        Row: {
          answer_time: string | null
          attempt_id: string
          id: string
          is_correct: boolean | null
          question_id: string
          result_id: string | null
          selected_option_id: string | null
          time_spent: number | null
        }
        Insert: {
          answer_time?: string | null
          attempt_id: string
          id?: string
          is_correct?: boolean | null
          question_id: string
          result_id?: string | null
          selected_option_id?: string | null
          time_spent?: number | null
        }
        Update: {
          answer_time?: string | null
          attempt_id?: string
          id?: string
          is_correct?: boolean | null
          question_id?: string
          result_id?: string | null
          selected_option_id?: string | null
          time_spent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "exam_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_result_id_fkey"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "exam_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_selected_option_id_fkey"
            columns: ["selected_option_id"]
            isOneToOne: false
            referencedRelation: "options"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_exam_quota: {
        Args: { p_user_id: string; p_exam_type: string; p_subject: string }
        Returns: boolean
      }
      check_user_subscription: {
        Args: { user_id: string }
        Returns: {
          plan: Database["public"]["Enums"]["subscription_plan"]
          status: Database["public"]["Enums"]["subscription_status"]
          is_premium: boolean
          expires_at: string
        }[]
      }
      update_usage_tracking: {
        Args: { p_user_id: string; p_exam_type: string; p_subject: string }
        Returns: undefined
      }
    }
    Enums: {
      account_status: "active" | "inactive" | "suspended"
      difficulty_level: "easy" | "medium" | "hard"
      exam_type: "civil-service" | "toeic" | "aisa"
      pass_status: "pass" | "fail"
      question_type: "multiple_choice" | "true_false" | "fill_in_blank"
      subject_type:
        | "general-knowledge"
        | "thai-language"
        | "mathematics"
        | "english"
        | "listening"
        | "reading"
        | "grammar"
        | "vocabulary"
        | "science"
        | "general"
      subscription_plan: "free" | "premium"
      subscription_status: "active" | "inactive" | "cancelled" | "past_due"
      user_role: "user" | "admin" | "super_admin"
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
    Enums: {
      account_status: ["active", "inactive", "suspended"],
      difficulty_level: ["easy", "medium", "hard"],
      exam_type: ["civil-service", "toeic", "aisa"],
      pass_status: ["pass", "fail"],
      question_type: ["multiple_choice", "true_false", "fill_in_blank"],
      subject_type: [
        "general-knowledge",
        "thai-language",
        "mathematics",
        "english",
        "listening",
        "reading",
        "grammar",
        "vocabulary",
        "science",
        "general",
      ],
      subscription_plan: ["free", "premium"],
      subscription_status: ["active", "inactive", "cancelled", "past_due"],
      user_role: ["user", "admin", "super_admin"],
    },
  },
} as const
