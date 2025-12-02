-- Add new fields to products table for phase-aware catalog
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS headline text,
ADD COLUMN IF NOT EXISTS outcome text,
ADD COLUMN IF NOT EXISTS badge text,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS cta_label text DEFAULT 'View Details',
ADD COLUMN IF NOT EXISTS cta_link text,
ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS priority integer DEFAULT 0;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_products_phase_category ON products(phase_id, category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;