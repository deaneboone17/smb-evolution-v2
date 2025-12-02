-- Assessment system tables
CREATE TABLE IF NOT EXISTS public.assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  scoring_strategy text DEFAULT 'weighted',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assessment_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES public.assessments(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  ordinal int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assessment_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES public.assessment_sections(id) ON DELETE CASCADE NOT NULL,
  key text NOT NULL,
  prompt text NOT NULL,
  type text NOT NULL CHECK (type IN ('single', 'multi', 'scale', 'number', 'text')),
  ordinal int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assessment_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES public.assessment_questions(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  value text NOT NULL,
  score int DEFAULT 0,
  weights jsonb DEFAULT '{}'::jsonb,
  ordinal int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES public.assessments(id) ON DELETE CASCADE NOT NULL,
  slug text NOT NULL,
  title text NOT NULL,
  hero text,
  body_md text,
  cta_label text,
  cta_url text,
  score_min int NOT NULL,
  score_max int NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assessment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES public.assessments(id) ON DELETE CASCADE,
  email text,
  first_name text,
  last_name text,
  company text,
  phone text,
  answers jsonb NOT NULL,
  score int NOT NULL,
  breakdown jsonb,
  segment text,
  result_slug text,
  ghl_contact_id text,
  created_at timestamptz DEFAULT now(),
  utm jsonb,
  consent boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.funnel_events (
  id bigserial PRIMARY KEY,
  submission_id uuid REFERENCES public.assessment_submissions(id) ON DELETE CASCADE,
  event text NOT NULL,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_events ENABLE ROW LEVEL SECURITY;

-- Public read access for assessment configuration
CREATE POLICY "Public can view assessments" ON public.assessments FOR SELECT USING (true);
CREATE POLICY "Public can view sections" ON public.assessment_sections FOR SELECT USING (true);
CREATE POLICY "Public can view questions" ON public.assessment_questions FOR SELECT USING (true);
CREATE POLICY "Public can view options" ON public.assessment_options FOR SELECT USING (true);
CREATE POLICY "Public can view results" ON public.assessment_results FOR SELECT USING (true);

-- Public can insert submissions and events
CREATE POLICY "Public can create submissions" ON public.assessment_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create events" ON public.funnel_events FOR INSERT WITH CHECK (true);

-- Admins can manage everything
CREATE POLICY "Admins can manage assessments" ON public.assessments FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage sections" ON public.assessment_sections FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage questions" ON public.assessment_questions FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage options" ON public.assessment_options FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage results" ON public.assessment_results FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins can view submissions" ON public.assessment_submissions FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admins can view events" ON public.funnel_events FOR SELECT USING (is_admin(auth.uid()));

-- Triggers for updated_at
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();