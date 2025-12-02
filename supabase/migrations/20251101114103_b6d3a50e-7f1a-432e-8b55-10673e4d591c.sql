-- Fix RLS policy for public assessment submissions
DROP POLICY IF EXISTS "Public can create submissions" ON public.assessment_submissions;

-- Allow anyone (including anonymous users) to submit assessments
CREATE POLICY "Anyone can submit assessments" 
ON public.assessment_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Also update funnel_events to allow anonymous inserts
DROP POLICY IF EXISTS "Public can create events" ON public.funnel_events;

CREATE POLICY "Anyone can log events" 
ON public.funnel_events 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);