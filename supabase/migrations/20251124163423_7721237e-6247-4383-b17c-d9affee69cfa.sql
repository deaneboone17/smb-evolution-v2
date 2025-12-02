-- Create site_content table for flexible homepage content management
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public can read site content
CREATE POLICY "Public can view site content"
  ON public.site_content
  FOR SELECT
  USING (true);

-- Admins can manage site content
CREATE POLICY "Admins can manage site_content"
  ON public.site_content
  FOR ALL
  USING (is_admin(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Seed homepage content
INSERT INTO public.site_content (key, value) VALUES
  ('homepage.hero.headline', '"Your Business. Your Growth. Your AI."'),
  ('homepage.hero.subheadline', '"Take full control with strategic AI-powered guidance that accelerates your business evolution with ease"'),
  ('homepage.hero.primary_cta', '{"label": "Explore Assessment", "href": "/assessment"}'),
  ('homepage.hero.secondary_cta', '{"label": "View Solutions", "href": "/solutions"}'),
  ('homepage.steps.title', '"How SMB Evolution.ai Works"'),
  ('homepage.steps.subtitle', '"Three simple steps to transform your business with AI-powered systems"'),
  ('homepage.steps.items', '[
    {
      "title": "Take the Assessment",
      "body": "In a few minutes, discover whether you are in Spark, Momentum, or Mastery and get instant clarity on your biggest opportunities."
    },
    {
      "title": "See Your Phase Plan",
      "body": "We map your results to a simple roadmap so you know exactly what to automate and improve next—no guesswork."
    },
    {
      "title": "Install Proven Systems",
      "body": "Use our playbooks, automations, and apps to implement AI-powered systems that free your time and grow your business."
    }
  ]'),
  ('homepage.featured.title', '"What to Focus on Right Now"'),
  ('homepage.featured.subtitle', '"Based on your phase, these are the most impactful systems to install first"'),
  ('homepage.newsletter.title', '"Stay Ahead with AI for SMBs"'),
  ('homepage.newsletter.body', '"Get one practical, phase-aware AI and automation tip each week. No hype, just systems you can actually use."')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;