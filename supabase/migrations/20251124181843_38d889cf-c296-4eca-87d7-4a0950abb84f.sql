-- Add new fields to newsletter_issues table for phase-aware filtering and features
ALTER TABLE newsletter_issues
ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS priority integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS badge text,
ADD COLUMN IF NOT EXISTS type text DEFAULT 'insight';

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_is_featured ON newsletter_issues(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_priority ON newsletter_issues(priority);
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_type ON newsletter_issues(type);

-- Add comment explaining type field
COMMENT ON COLUMN newsletter_issues.type IS 'Type of newsletter content: insight, guide, case-study, announcement';