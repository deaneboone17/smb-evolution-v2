-- SMB Evolution.ai Database Schema
-- Flashboard-compatible normalized schema with RLS

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Taxonomy: phases (Spark, Momentum, Mastery)
CREATE TABLE public.phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Site settings (single row config)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'SMB Evolution.ai',
  tagline TEXT,
  domain TEXT,
  mission TEXT,
  vision TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Pages (static content with SEO)
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type TEXT,
  hero JSONB,
  sections JSONB,
  seo JSONB,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Newsletter issues
CREATE TABLE public.newsletter_issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  body_mdx TEXT,
  phase_id UUID REFERENCES public.phases(id),
  published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Newsletter CTAs
CREATE TABLE public.newsletter_ctas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_id UUID REFERENCES public.newsletter_issues(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Resources (guides, playbooks, toolkits)
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  body_mdx TEXT,
  type TEXT,
  phase_id UUID REFERENCES public.phases(id),
  reading_time INT,
  published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Products (courses, templates)
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_pitch TEXT,
  description TEXT,
  price NUMERIC(10,2),
  sku TEXT,
  features JSONB,
  phase_id UUID REFERENCES public.phases(id),
  delivery TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Product media
CREATE TABLE public.product_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  kind TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Solutions (consulting services)
CREATE TABLE public.solutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tier TEXT,
  problem TEXT,
  approach TEXT,
  deliverables JSONB,
  price_from NUMERIC(10,2),
  price_to NUMERIC(10,2),
  phase_id UUID REFERENCES public.phases(id),
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Apps (micro-SaaS)
CREATE TABLE public.apps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  oneliner TEXT,
  description TEXT,
  features JSONB,
  pricing JSONB,
  integrations JSONB,
  phase_id UUID REFERENCES public.phases(id),
  changelog_mdx TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Events/Webinars (scaffold for future)
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  abstract TEXT,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  timezone TEXT,
  registration_url TEXT,
  replay_url TEXT,
  phase_id UUID REFERENCES public.phases(id),
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 12. User roles for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create indexes for performance
CREATE INDEX idx_newsletter_issues_slug ON public.newsletter_issues(slug);
CREATE INDEX idx_newsletter_issues_published ON public.newsletter_issues(published, published_at DESC);
CREATE INDEX idx_resources_slug ON public.resources(slug);
CREATE INDEX idx_resources_published ON public.resources(published, published_at DESC);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_published ON public.products(published);
CREATE INDEX idx_solutions_slug ON public.solutions(slug);
CREATE INDEX idx_solutions_published ON public.solutions(published);
CREATE INDEX idx_apps_slug ON public.apps(slug);
CREATE INDEX idx_apps_published ON public.apps(published);
CREATE INDEX idx_pages_slug ON public.pages(slug);

-- Enable Row Level Security
ALTER TABLE public.phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_ctas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read access for published content
CREATE POLICY "Public can view published phases"
  ON public.phases FOR SELECT
  USING (true);

CREATE POLICY "Public can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Public can view published pages"
  ON public.pages FOR SELECT
  USING (published = true);

CREATE POLICY "Public can view published newsletter issues"
  ON public.newsletter_issues FOR SELECT
  USING (published = true);

CREATE POLICY "Public can view newsletter CTAs"
  ON public.newsletter_ctas FOR SELECT
  USING (true);

CREATE POLICY "Public can view published resources"
  ON public.resources FOR SELECT
  USING (published = true);

CREATE POLICY "Public can view published products"
  ON public.products FOR SELECT
  USING (published = true);

CREATE POLICY "Public can view product media"
  ON public.product_media FOR SELECT
  USING (true);

CREATE POLICY "Public can view published solutions"
  ON public.solutions FOR SELECT
  USING (published = true);

CREATE POLICY "Public can view published apps"
  ON public.apps FOR SELECT
  USING (published = true);

CREATE POLICY "Public can view published events"
  ON public.events FOR SELECT
  USING (published = true);

-- Admin write policies (using security definer function)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = is_admin.user_id
    AND role = 'admin'
  )
$$;

-- Admin write policies
CREATE POLICY "Admins can insert phases"
  ON public.phases FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update phases"
  ON public.phases FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete phases"
  ON public.phases FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Apply similar policies to all tables
CREATE POLICY "Admins can manage site_settings"
  ON public.site_settings FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage pages"
  ON public.pages FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage newsletter_issues"
  ON public.newsletter_issues FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage newsletter_ctas"
  ON public.newsletter_ctas FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage resources"
  ON public.resources FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage product_media"
  ON public.product_media FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage solutions"
  ON public.solutions FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage apps"
  ON public.apps FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage events"
  ON public.events FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage user_roles"
  ON public.user_roles FOR ALL
  USING (public.is_admin(auth.uid()));

-- Seed initial phases
INSERT INTO public.phases (slug, title, tagline, color) VALUES
  ('spark', 'Spark', 'Ignite Your Foundation', '#FF6B6B'),
  ('momentum', 'Momentum', 'Build Sustainable Growth', '#FFD166'),
  ('mastery', 'Mastery', 'Scale with Precision', '#06D6A0');

-- Seed initial site settings
INSERT INTO public.site_settings (name, tagline, mission, vision) VALUES
  ('SMB Evolution.ai', 'Transform Your Business Journey', 'Empower small and medium businesses to evolve through strategic guidance and innovative solutions', 'A world where every SMB reaches its full potential');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_phases_updated_at BEFORE UPDATE ON public.phases FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_newsletter_issues_updated_at BEFORE UPDATE ON public.newsletter_issues FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_solutions_updated_at BEFORE UPDATE ON public.solutions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_apps_updated_at BEFORE UPDATE ON public.apps FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();