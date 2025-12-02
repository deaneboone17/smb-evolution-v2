-- Add new fields to apps table for phase-aware catalog
ALTER TABLE public.apps
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS outcome text,
ADD COLUMN IF NOT EXISTS badge text,
ADD COLUMN IF NOT EXISTS cta_label text DEFAULT 'Explore App',
ADD COLUMN IF NOT EXISTS cta_link text,
ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS priority integer DEFAULT 0;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_apps_category ON public.apps(category);
CREATE INDEX IF NOT EXISTS idx_apps_is_featured ON public.apps(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_apps_priority ON public.apps(priority DESC);