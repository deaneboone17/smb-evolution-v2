-- Add new fields to resources table for phase-aware resource hub
ALTER TABLE public.resources
ADD COLUMN IF NOT EXISTS headline text,
ADD COLUMN IF NOT EXISTS outcome text,
ADD COLUMN IF NOT EXISTS badge text,
ADD COLUMN IF NOT EXISTS cta_label text DEFAULT 'Read More',
ADD COLUMN IF NOT EXISTS cta_link text,
ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS priority integer DEFAULT 0;

-- Add index for featured resources
CREATE INDEX IF NOT EXISTS idx_resources_is_featured ON public.resources(is_featured) WHERE is_featured = true;

-- Add index for priority sorting
CREATE INDEX IF NOT EXISTS idx_resources_priority ON public.resources(priority DESC);

-- Add index for type filtering
CREATE INDEX IF NOT EXISTS idx_resources_type ON public.resources(type);

COMMENT ON COLUMN public.resources.headline IS 'Short value-prop or hook (1 sentence)';
COMMENT ON COLUMN public.resources.outcome IS 'The specific result the resource delivers';
COMMENT ON COLUMN public.resources.badge IS 'Optional highlight like "Start Here", "Most Popular", "New"';
COMMENT ON COLUMN public.resources.cta_label IS 'Label for the call-to-action button';
COMMENT ON COLUMN public.resources.cta_link IS 'URL for the call-to-action (optional override)';
COMMENT ON COLUMN public.resources.is_featured IS 'Flag for recommended/featured resources';
COMMENT ON COLUMN public.resources.priority IS 'Higher numbers appear first in listings';