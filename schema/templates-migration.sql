-- ============================================================
-- TEMPLATES TABLE MIGRATION
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================================

-- TEMPLATES: Downloadable document templates for construction professionals
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  what_is_it TEXT,
  key_sections TEXT,
  template_content TEXT,
  when_to_use TEXT,
  who_uses_it TEXT,
  ai_tips TEXT,
  icon TEXT DEFAULT '📄',
  primary_keyword TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_templates_slug ON templates(slug);
CREATE INDEX idx_templates_status ON templates(status);

-- Row-level security
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published templates" ON templates FOR SELECT USING (status = 'published');

-- Updated_at trigger
CREATE TRIGGER set_updated_at BEFORE UPDATE ON templates FOR EACH ROW EXECUTE FUNCTION update_updated_at();
