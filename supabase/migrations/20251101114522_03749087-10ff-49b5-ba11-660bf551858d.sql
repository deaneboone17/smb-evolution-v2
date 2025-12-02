-- Fix and create submit_assessment function with correct parameter order
CREATE OR REPLACE FUNCTION public.submit_assessment(
  p_assessment_id uuid,
  p_answers jsonb,
  p_score int,
  p_email text DEFAULT NULL,
  p_first_name text DEFAULT NULL,
  p_last_name text DEFAULT NULL,
  p_company text DEFAULT NULL,
  p_phone text DEFAULT NULL,
  p_breakdown jsonb DEFAULT NULL,
  p_segment text DEFAULT NULL,
  p_result_slug text DEFAULT NULL,
  p_utm jsonb DEFAULT NULL,
  p_consent boolean DEFAULT false
)
RETURNS TABLE (submission_id uuid, result_slug text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_submission_id uuid;
BEGIN
  INSERT INTO public.assessment_submissions (
    assessment_id,
    email,
    first_name,
    last_name,
    company,
    phone,
    answers,
    score,
    breakdown,
    segment,
    result_slug,
    utm,
    consent
  ) VALUES (
    p_assessment_id,
    p_email,
    p_first_name,
    p_last_name,
    p_company,
    p_phone,
    p_answers,
    p_score,
    p_breakdown,
    p_segment,
    p_result_slug,
    p_utm,
    p_consent
  ) RETURNING id INTO new_submission_id;

  -- Log submission event
  INSERT INTO public.funnel_events (submission_id, event, meta)
  VALUES (new_submission_id, 'submit', jsonb_build_object('segment', p_segment, 'score', p_score));

  RETURN QUERY SELECT new_submission_id, COALESCE(p_result_slug, 'beginner');
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_assessment TO anon, authenticated;