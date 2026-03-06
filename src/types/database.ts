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
      roles: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          meta_title: string | null
          meta_description: string | null
          status: 'draft' | 'published' | 'archived'
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          meta_title: string | null
          meta_description: string | null
          status: 'draft' | 'published' | 'archived'
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          long_description: string | null
          url: string | null
          logo_url: string | null
          category: string | null
          pricing: string | null
          meta_title: string | null
          meta_description: string | null
          status: 'draft' | 'published' | 'archived'
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          long_description?: string | null
          url?: string | null
          logo_url?: string | null
          category?: string | null
          pricing?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          long_description?: string | null
          url?: string | null
          logo_url?: string | null
          category?: string | null
          pricing?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      guides: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          content: string | null
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          reading_time_minutes: number | null
          icon: string | null
          meta_title: string | null
          meta_description: string | null
          status: 'draft' | 'published' | 'archived'
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          content?: string | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          reading_time_minutes?: number | null
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          content?: string | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          reading_time_minutes?: number | null
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          long_description: string | null
          prompt: string | null
          example_output: string | null
          use_case: string | null
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          icon: string | null
          meta_title: string | null
          meta_description: string | null
          status: 'draft' | 'published' | 'archived'
          featured: boolean
          sort_order: number
          role_id: string | null
          task_id: string | null
          tool_id: string | null
          guide_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          long_description?: string | null
          prompt?: string | null
          example_output?: string | null
          use_case?: string | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          sort_order?: number
          role_id?: string | null
          task_id?: string | null
          tool_id?: string | null
          guide_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          long_description?: string | null
          prompt?: string | null
          example_output?: string | null
          use_case?: string | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          sort_order?: number
          role_id?: string | null
          task_id?: string | null
          tool_id?: string | null
          guide_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflows_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflows_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflows_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
        ]
      }
      prompts: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          prompt_text: string
          example_output: string | null
          category: string | null
          meta_title: string | null
          meta_description: string | null
          status: 'draft' | 'published' | 'archived'
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          prompt_text: string
          example_output?: string | null
          category?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          prompt_text?: string
          example_output?: string | null
          category?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_posts: {
        Row: {
          id: string
          title: string
          slug: string
          body: string | null
          excerpt: string | null
          platform: string | null
          content_type: string | null
          image_url: string | null
          cta: string | null
          hashtags: string | null
          meta_title: string | null
          meta_description: string | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          body?: string | null
          excerpt?: string | null
          platform?: string | null
          content_type?: string | null
          image_url?: string | null
          cta?: string | null
          hashtags?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          body?: string | null
          excerpt?: string | null
          platform?: string | null
          content_type?: string | null
          image_url?: string | null
          cta?: string | null
          hashtags?: string | null
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      role_tasks: {
        Row: {
          role_id: string
          task_id: string
        }
        Insert: {
          role_id: string
          task_id: string
        }
        Update: {
          role_id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_tasks_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
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
