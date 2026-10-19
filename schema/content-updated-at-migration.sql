-- content_updated_at: the date a page's content last changed.
--
-- updated_at moves on every edit (a title tweak, a meta description, a status
-- change), and the site showed it as "Last updated", in dateModified and in the
-- sitemap, so SEO edits re-dated pages (27 guides on 18 Oct 2026). This column
-- only moves when a content column changes. The site reads
-- content_updated_at, falling back to updated_at.
--
-- An update that changes content_updated_at itself is left alone. So to make a
-- maintenance edit (e.g. a punctuation clean-up) without re-dating the page,
-- follow it with a second update that sets only content_updated_at back to its
-- old value. (Sending the old value in the same update doesn't work: it's equal
-- to OLD, so the trigger can't tell it was meant.)
--
-- Run once in the Supabase SQL editor. Safe to re-run.

CREATE OR REPLACE FUNCTION update_content_updated_at()
RETURNS TRIGGER AS $$
DECLARE
  -- Columns that don't count as content.
  ignored text[] := ARRAY['updated_at', 'content_updated_at', 'meta_title', 'meta_description',
                          'sort_order', 'featured', 'status', 'icon'];
BEGIN
  IF NEW.content_updated_at IS DISTINCT FROM OLD.content_updated_at THEN
    RETURN NEW;
  END IF;
  IF (to_jsonb(NEW) - ignored) IS DISTINCT FROM (to_jsonb(OLD) - ignored) THEN
    NEW.content_updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['guides', 'workflows', 'templates', 'roles', 'tasks', 'tools'] LOOP
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS content_updated_at timestamptz', t);
    -- Backfill from updated_at without the updated_at trigger re-dating every row.
    EXECUTE format('ALTER TABLE %I DISABLE TRIGGER set_updated_at', t);
    EXECUTE format('UPDATE %I SET content_updated_at = updated_at WHERE content_updated_at IS NULL', t);
    EXECUTE format('ALTER TABLE %I ENABLE TRIGGER set_updated_at', t);
    EXECUTE format('ALTER TABLE %I ALTER COLUMN content_updated_at SET DEFAULT now()', t);
    EXECUTE format('ALTER TABLE %I ALTER COLUMN content_updated_at SET NOT NULL', t);
    EXECUTE format('DROP TRIGGER IF EXISTS set_content_updated_at ON %I', t);
    EXECUTE format('CREATE TRIGGER set_content_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_content_updated_at()', t);
  END LOOP;
END $$;

-- Check: every table should show the same count in both columns.
SELECT 'guides' AS t, count(*) AS rows, count(content_updated_at) AS with_date FROM guides
UNION ALL SELECT 'workflows', count(*), count(content_updated_at) FROM workflows
UNION ALL SELECT 'templates', count(*), count(content_updated_at) FROM templates
UNION ALL SELECT 'roles', count(*), count(content_updated_at) FROM roles
UNION ALL SELECT 'tasks', count(*), count(content_updated_at) FROM tasks
UNION ALL SELECT 'tools', count(*), count(content_updated_at) FROM tools;
