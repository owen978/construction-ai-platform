import type { Database } from './database'

// Row types
export type Role = Database['public']['Tables']['roles']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']
export type Tool = Database['public']['Tables']['tools']['Row']
export type Guide = Database['public']['Tables']['guides']['Row']
export type Workflow = Database['public']['Tables']['workflows']['Row']
export type Prompt = Database['public']['Tables']['prompts']['Row']
export type ContentPost = Database['public']['Tables']['content_posts']['Row']

// Insert types
export type RoleInsert = Database['public']['Tables']['roles']['Insert']
export type TaskInsert = Database['public']['Tables']['tasks']['Insert']
export type ToolInsert = Database['public']['Tables']['tools']['Insert']
export type GuideInsert = Database['public']['Tables']['guides']['Insert']
export type WorkflowInsert = Database['public']['Tables']['workflows']['Insert']
export type PromptInsert = Database['public']['Tables']['prompts']['Insert']
export type ContentPostInsert = Database['public']['Tables']['content_posts']['Insert']

// Update types
export type RoleUpdate = Database['public']['Tables']['roles']['Update']
export type TaskUpdate = Database['public']['Tables']['tasks']['Update']
export type ToolUpdate = Database['public']['Tables']['tools']['Update']
export type GuideUpdate = Database['public']['Tables']['guides']['Update']
export type WorkflowUpdate = Database['public']['Tables']['workflows']['Update']
export type PromptUpdate = Database['public']['Tables']['prompts']['Update']
export type ContentPostUpdate = Database['public']['Tables']['content_posts']['Update']

// Composite types with relations
export type WorkflowWithRelations = Workflow & {
  role: Role | null
  task: Task | null
  tool: Tool | null
  guide: Guide | null
}

export type RoleWithTasks = Role & {
  tasks: Task[]
}

// Template type (manual definition until database types are regenerated)
export interface Template {
  id: string
  name: string
  slug: string
  description: string | null
  what_is_it: string | null
  key_sections: string | null
  template_content: string | null
  when_to_use: string | null
  who_uses_it: string | null
  ai_tips: string | null
  icon: string | null
  primary_keyword: string | null
  meta_title: string | null
  meta_description: string | null
  status: string
  sort_order: number | null
  created_at: string
  updated_at: string
}

// Status and difficulty types
export type ContentStatus = 'draft' | 'published' | 'archived'
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'
