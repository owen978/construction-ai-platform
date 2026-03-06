-- ============================================================
-- Construction AI Platform — V1 Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- CORE TABLES
-- ============================================================

-- ROLES: Professional construction roles (QS, Project Manager, Site Manager, etc.)
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- TASKS: Things roles do (e.g., "Cost Estimation", "Project Scheduling")
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- TOOLS: AI tools (e.g., "ChatGPT", "Claude", "Midjourney")
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  long_description TEXT,
  url TEXT,
  logo_url TEXT,
  category TEXT,
  pricing TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- GUIDES: Long-form guides and tutorials
CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  reading_time_minutes INTEGER,
  icon TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- WORKFLOWS: AI workflows (the primary content type)
-- V1: Simple foreign keys to role, task, tool, guide
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  long_description TEXT,
  prompt TEXT,
  example_output TEXT,
  use_case TEXT,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  icon TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  -- V1 simplified foreign keys (upgrade to junction tables later)
  role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  tool_id UUID REFERENCES tools(id) ON DELETE SET NULL,
  guide_id UUID REFERENCES guides(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- PROMPTS: Standalone prompt library
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  prompt_text TEXT NOT NULL,
  example_output TEXT,
  category TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- CONTENT_POSTS: Blog/social content
CREATE TABLE content_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  body TEXT,
  excerpt TEXT,
  platform TEXT,
  content_type TEXT,
  image_url TEXT,
  cta TEXT,
  hashtags TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- JUNCTION TABLE: role_tasks (roles have multiple tasks)
-- ============================================================

CREATE TABLE role_tasks (
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, task_id)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_roles_slug ON roles(slug);
CREATE INDEX idx_tasks_slug ON tasks(slug);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_guides_slug ON guides(slug);
CREATE INDEX idx_workflows_slug ON workflows(slug);
CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_workflows_role_id ON workflows(role_id);
CREATE INDEX idx_workflows_task_id ON workflows(task_id);
CREATE INDEX idx_workflows_tool_id ON workflows(tool_id);
CREATE INDEX idx_workflows_guide_id ON workflows(guide_id);
CREATE INDEX idx_prompts_slug ON prompts(slug);
CREATE INDEX idx_content_posts_slug ON content_posts(slug);
CREATE INDEX idx_content_posts_status ON content_posts(status);

-- ============================================================
-- ROW-LEVEL SECURITY
-- ============================================================

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_tasks ENABLE ROW LEVEL SECURITY;

-- Public read access for published content (anon key)
CREATE POLICY "Public read published roles" ON roles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published tasks" ON tasks FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published tools" ON tools FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published guides" ON guides FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published workflows" ON workflows FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published prompts" ON prompts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published content_posts" ON content_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read role_tasks" ON role_tasks FOR SELECT USING (true);

-- Service role key bypasses RLS automatically for admin operations.

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON tools FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON guides FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON prompts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON content_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
