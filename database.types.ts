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
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hackathon_tags: {
        Row: {
          created_at: string
          hackathon: string
          id: number
          tag: number
        }
        Insert: {
          created_at?: string
          hackathon?: string
          id?: number
          tag: number
        }
        Update: {
          created_at?: string
          hackathon?: string
          id?: number
          tag?: number
        }
        Relationships: [
          {
            foreignKeyName: "hackathon_tags_hackathon_fkey"
            columns: ["hackathon"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hackathon_tags_tag_fkey"
            columns: ["tag"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      hackathons: {
        Row: {
          banner: string | null
          category: number | null
          contact_info: Json
          created_at: string | null
          deadline: string
          description: string
          duration: string
          id: string
          image_url: string | null
          link: string | null
          mode: Database["public"]["Enums"]["hackathon_mode"]
          organizer: string
          prize_pool: string
          prizes: Json
          requirements: string[]
          resources: Json
          rules: string[]
          schedule: Json
          tags: string[] | null
          team_size: string
          title: string
          updated_at: string | null
        }
        Insert: {
          banner?: string | null
          category?: number | null
          contact_info: Json
          created_at?: string | null
          deadline: string
          description: string
          duration: string
          id?: string
          image_url?: string | null
          link?: string | null
          mode: Database["public"]["Enums"]["hackathon_mode"]
          organizer: string
          prize_pool: string
          prizes: Json
          requirements: string[]
          resources: Json
          rules: string[]
          schedule: Json
          tags?: string[] | null
          team_size: string
          title: string
          updated_at?: string | null
        }
        Update: {
          banner?: string | null
          category?: number | null
          contact_info?: Json
          created_at?: string | null
          deadline?: string
          description?: string
          duration?: string
          id?: string
          image_url?: string | null
          link?: string | null
          mode?: Database["public"]["Enums"]["hackathon_mode"]
          organizer?: string
          prize_pool?: string
          prizes?: Json
          requirements?: string[]
          resources?: Json
          rules?: string[]
          schedule?: Json
          tags?: string[] | null
          team_size?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hackathons_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_complete_hackathon: {
        Args: {
          hackathon_data: Json
          contact_info: Json
          prizes: Json[]
          requirements: string[]
          rules: string[]
          resources: Json[]
          schedule: Json[]
          tag_ids: number[]
        }
        Returns: Json
      }
    }
    Enums: {
      hackathon_mode: "VIRTUAL" | "IN-PERSON" | "HYBRID"
    }
    CompositeTypes: {
      contact_info_type: {
        email: string | null
        discord: string | null
        website: string | null
      }
      prize_item: {
        place: string | null
        amount: string | null
        description: string | null
      }
      requirement_item: {
        title: string | null
        requirement: string | null
      }
      resource_item: {
        title: string | null
        link: string | null
      }
      schedule_item: {
        date: string | null
        event: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
