export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      apps: {
        Row: {
          app_type: string | null
          badge: string | null
          category: string | null
          changelog_mdx: string | null
          created_at: string | null
          cta_label: string | null
          cta_link: string | null
          description: string | null
          features: Json | null
          id: string
          integrations: Json | null
          is_featured: boolean | null
          name: string
          oneliner: string | null
          outcome: string | null
          phase_id: string | null
          phases: string[] | null
          pricing: Json | null
          priority: number | null
          published: boolean | null
          slug: string
          sort_order: number | null
          updated_at: string | null
          use_case: string | null
        }
        Insert: {
          app_type?: string | null
          badge?: string | null
          category?: string | null
          changelog_mdx?: string | null
          created_at?: string | null
          cta_label?: string | null
          cta_link?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          integrations?: Json | null
          is_featured?: boolean | null
          name: string
          oneliner?: string | null
          outcome?: string | null
          phase_id?: string | null
          phases?: string[] | null
          pricing?: Json | null
          priority?: number | null
          published?: boolean | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
          use_case?: string | null
        }
        Update: {
          app_type?: string | null
          badge?: string | null
          category?: string | null
          changelog_mdx?: string | null
          created_at?: string | null
          cta_label?: string | null
          cta_link?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          integrations?: Json | null
          is_featured?: boolean | null
          name?: string
          oneliner?: string | null
          outcome?: string | null
          phase_id?: string | null
          phases?: string[] | null
          pricing?: Json | null
          priority?: number | null
          published?: boolean | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
          use_case?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apps_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_options: {
        Row: {
          created_at: string | null
          id: string
          label: string
          ordinal: number
          question_id: string
          score: number | null
          value: string
          weights: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          label: string
          ordinal?: number
          question_id: string
          score?: number | null
          value: string
          weights?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string
          ordinal?: number
          question_id?: string
          score?: number | null
          value?: string
          weights?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "assessment_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions: {
        Row: {
          created_at: string | null
          id: string
          key: string
          ordinal: number
          prompt: string
          section_id: string
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          ordinal?: number
          prompt: string
          section_id: string
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          ordinal?: number
          prompt?: string
          section_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "assessment_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_results: {
        Row: {
          assessment_id: string
          body_md: string | null
          created_at: string | null
          cta_label: string | null
          cta_url: string | null
          hero: string | null
          id: string
          score_max: number
          score_min: number
          slug: string
          title: string
        }
        Insert: {
          assessment_id: string
          body_md?: string | null
          created_at?: string | null
          cta_label?: string | null
          cta_url?: string | null
          hero?: string | null
          id?: string
          score_max: number
          score_min: number
          slug: string
          title: string
        }
        Update: {
          assessment_id?: string
          body_md?: string | null
          created_at?: string | null
          cta_label?: string | null
          cta_url?: string | null
          hero?: string | null
          id?: string
          score_max?: number
          score_min?: number
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_sections: {
        Row: {
          assessment_id: string
          created_at: string | null
          id: string
          ordinal: number
          title: string
        }
        Insert: {
          assessment_id: string
          created_at?: string | null
          id?: string
          ordinal?: number
          title: string
        }
        Update: {
          assessment_id?: string
          created_at?: string | null
          id?: string
          ordinal?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_sections_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_submissions: {
        Row: {
          answers: Json
          assessment_id: string | null
          breakdown: Json | null
          company: string | null
          consent: boolean | null
          created_at: string | null
          email: string | null
          first_name: string | null
          ghl_contact_id: string | null
          id: string
          last_name: string | null
          phone: string | null
          result_slug: string | null
          score: number
          segment: string | null
          utm: Json | null
        }
        Insert: {
          answers: Json
          assessment_id?: string | null
          breakdown?: Json | null
          company?: string | null
          consent?: boolean | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          ghl_contact_id?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          result_slug?: string | null
          score: number
          segment?: string | null
          utm?: Json | null
        }
        Update: {
          answers?: Json
          assessment_id?: string | null
          breakdown?: Json | null
          company?: string | null
          consent?: boolean | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          ghl_contact_id?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          result_slug?: string | null
          score?: number
          segment?: string | null
          utm?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_submissions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          scoring_strategy: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          scoring_strategy?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          scoring_strategy?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          abstract: string | null
          created_at: string | null
          ends_at: string | null
          id: string
          phase_id: string | null
          published: boolean | null
          registration_url: string | null
          replay_url: string | null
          slug: string
          starts_at: string | null
          timezone: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          abstract?: string | null
          created_at?: string | null
          ends_at?: string | null
          id?: string
          phase_id?: string | null
          published?: boolean | null
          registration_url?: string | null
          replay_url?: string | null
          slug: string
          starts_at?: string | null
          timezone?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          abstract?: string | null
          created_at?: string | null
          ends_at?: string | null
          id?: string
          phase_id?: string | null
          published?: boolean | null
          registration_url?: string | null
          replay_url?: string | null
          slug?: string
          starts_at?: string | null
          timezone?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_events: {
        Row: {
          created_at: string | null
          event: string
          id: number
          meta: Json | null
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          event: string
          id?: number
          meta?: Json | null
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          event?: string
          id?: number
          meta?: Json | null
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_events_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "assessment_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_ctas: {
        Row: {
          created_at: string | null
          href: string
          id: string
          issue_id: string | null
          label: string
        }
        Insert: {
          created_at?: string | null
          href: string
          id?: string
          issue_id?: string | null
          label: string
        }
        Update: {
          created_at?: string | null
          href?: string
          id?: string
          issue_id?: string | null
          label?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_ctas_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "newsletter_issues"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_issues: {
        Row: {
          badge: string | null
          body_mdx: string | null
          created_at: string | null
          id: string
          is_featured: boolean | null
          phase_id: string | null
          phases: string[] | null
          priority: number | null
          published: boolean | null
          published_at: string | null
          slug: string
          summary: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          badge?: string | null
          body_mdx?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          phase_id?: string | null
          phases?: string[] | null
          priority?: number | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          summary?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          badge?: string | null
          body_mdx?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          phase_id?: string | null
          phases?: string[] | null
          priority?: number | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          summary?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_issues_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string | null
          hero: Json | null
          id: string
          published: boolean | null
          sections: Json | null
          seo: Json | null
          slug: string
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          hero?: Json | null
          id?: string
          published?: boolean | null
          sections?: Json | null
          seo?: Json | null
          slug: string
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          hero?: Json | null
          id?: string
          published?: boolean | null
          sections?: Json | null
          seo?: Json | null
          slug?: string
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      phases: {
        Row: {
          color: string
          created_at: string | null
          headline: string | null
          id: string
          next_10_weeks_focus: string | null
          overview: string | null
          primary_objectives: Json | null
          primary_pains: Json | null
          slug: string
          subheadline: string | null
          tagline: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          color: string
          created_at?: string | null
          headline?: string | null
          id?: string
          next_10_weeks_focus?: string | null
          overview?: string | null
          primary_objectives?: Json | null
          primary_pains?: Json | null
          slug: string
          subheadline?: string | null
          tagline?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          headline?: string | null
          id?: string
          next_10_weeks_focus?: string | null
          overview?: string | null
          primary_objectives?: Json | null
          primary_pains?: Json | null
          slug?: string
          subheadline?: string | null
          tagline?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      product_media: {
        Row: {
          created_at: string | null
          id: string
          kind: string
          product_id: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          kind: string
          product_id?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          kind?: string
          product_id?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_media_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          badge: string | null
          category: string | null
          created_at: string | null
          cta_label: string | null
          cta_link: string | null
          delivery: string | null
          description: string | null
          features: Json | null
          headline: string | null
          id: string
          is_featured: boolean | null
          outcome: string | null
          phase_id: string | null
          phases: string[] | null
          price: number | null
          priority: number | null
          product_type: string | null
          published: boolean | null
          short_pitch: string | null
          sku: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          badge?: string | null
          category?: string | null
          created_at?: string | null
          cta_label?: string | null
          cta_link?: string | null
          delivery?: string | null
          description?: string | null
          features?: Json | null
          headline?: string | null
          id?: string
          is_featured?: boolean | null
          outcome?: string | null
          phase_id?: string | null
          phases?: string[] | null
          price?: number | null
          priority?: number | null
          product_type?: string | null
          published?: boolean | null
          short_pitch?: string | null
          sku?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          badge?: string | null
          category?: string | null
          created_at?: string | null
          cta_label?: string | null
          cta_link?: string | null
          delivery?: string | null
          description?: string | null
          features?: Json | null
          headline?: string | null
          id?: string
          is_featured?: boolean | null
          outcome?: string | null
          phase_id?: string | null
          phases?: string[] | null
          price?: number | null
          priority?: number | null
          product_type?: string | null
          published?: boolean | null
          short_pitch?: string | null
          sku?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          badge: string | null
          body_mdx: string | null
          created_at: string | null
          cta_label: string | null
          cta_link: string | null
          format: string | null
          headline: string | null
          id: string
          is_featured: boolean | null
          outcome: string | null
          phase_id: string | null
          phases: string[] | null
          priority: number | null
          published: boolean | null
          published_at: string | null
          reading_time: number | null
          slug: string
          summary: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          badge?: string | null
          body_mdx?: string | null
          created_at?: string | null
          cta_label?: string | null
          cta_link?: string | null
          format?: string | null
          headline?: string | null
          id?: string
          is_featured?: boolean | null
          outcome?: string | null
          phase_id?: string | null
          phases?: string[] | null
          priority?: number | null
          published?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          summary?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          badge?: string | null
          body_mdx?: string | null
          created_at?: string | null
          cta_label?: string | null
          cta_link?: string | null
          format?: string | null
          headline?: string | null
          id?: string
          is_featured?: boolean | null
          outcome?: string | null
          phase_id?: string | null
          phases?: string[] | null
          priority?: number | null
          published?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          summary?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmaps: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          order: number
          phase: string
          step_label: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          order?: number
          phase: string
          step_label: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          order?: number
          phase?: string
          step_label?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          created_at: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          domain: string | null
          id: string
          mission: string | null
          name: string
          tagline: string | null
          updated_at: string | null
          vision: string | null
        }
        Insert: {
          created_at?: string | null
          domain?: string | null
          id?: string
          mission?: string | null
          name?: string
          tagline?: string | null
          updated_at?: string | null
          vision?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string | null
          id?: string
          mission?: string | null
          name?: string
          tagline?: string | null
          updated_at?: string | null
          vision?: string | null
        }
        Relationships: []
      }
      solutions: {
        Row: {
          approach: string | null
          created_at: string | null
          deliverables: Json | null
          id: string
          name: string
          phase_id: string | null
          price_from: number | null
          price_to: number | null
          problem: string | null
          published: boolean | null
          slug: string
          tier: string | null
          updated_at: string | null
        }
        Insert: {
          approach?: string | null
          created_at?: string | null
          deliverables?: Json | null
          id?: string
          name: string
          phase_id?: string | null
          price_from?: number | null
          price_to?: number | null
          problem?: string | null
          published?: boolean | null
          slug: string
          tier?: string | null
          updated_at?: string | null
        }
        Update: {
          approach?: string | null
          created_at?: string | null
          deliverables?: Json | null
          id?: string
          name?: string
          phase_id?: string | null
          price_from?: number | null
          price_to?: number | null
          problem?: string | null
          published?: boolean | null
          slug?: string
          tier?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "solutions_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      compute_score_server: {
        Args: { p_answers: Json; p_assessment_id: string }
        Returns: Json
      }
      get_assessment_result: {
        Args: { p_result_slug: string; p_submission_id: string }
        Returns: {
          result: Json
          submission: Json
        }[]
      }
      is_admin: { Args: { user_id: string }; Returns: boolean }
      submit_assessment:
        | {
            Args: {
              p_answers: Json
              p_assessment_id: string
              p_breakdown?: Json
              p_company?: string
              p_consent?: boolean
              p_email?: string
              p_first_name?: string
              p_last_name?: string
              p_phone?: string
              p_result_slug?: string
              p_score: number
              p_segment?: string
              p_utm?: Json
            }
            Returns: {
              result_slug: string
              submission_id: string
            }[]
          }
        | {
            Args: {
              p_answers: Json
              p_assessment_id: string
              p_company?: string
              p_consent?: boolean
              p_email?: string
              p_first_name?: string
              p_last_name?: string
              p_phone?: string
              p_utm?: Json
            }
            Returns: {
              result_slug: string
              submission_id: string
            }[]
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
