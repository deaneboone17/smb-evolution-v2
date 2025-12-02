-- Fix search_path for submit_assessment function
CREATE OR REPLACE FUNCTION public.submit_assessment(
  p_assessment_id uuid,
  p_answers jsonb,
  p_score integer,
  p_email text DEFAULT NULL::text,
  p_first_name text DEFAULT NULL::text,
  p_last_name text DEFAULT NULL::text,
  p_company text DEFAULT NULL::text,
  p_phone text DEFAULT NULL::text,
  p_breakdown jsonb DEFAULT NULL::jsonb,
  p_segment text DEFAULT NULL::text,
  p_result_slug text DEFAULT NULL::text,
  p_utm jsonb DEFAULT NULL::jsonb,
  p_consent boolean DEFAULT false
)
RETURNS TABLE(submission_id uuid, result_slug text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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

  INSERT INTO public.funnel_events (submission_id, event, meta)
  VALUES (new_submission_id, 'submit', jsonb_build_object('segment', p_segment, 'score', p_score));

  RETURN QUERY SELECT new_submission_id, COALESCE(p_result_slug, 'beginner');
END;
$function$;

-- Fix search_path for get_assessment_result function
CREATE OR REPLACE FUNCTION public.get_assessment_result(p_submission_id uuid, p_result_slug text)
RETURNS TABLE(submission jsonb, result jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    to_jsonb(s.*) as submission,
    to_jsonb(r.*) as result
  FROM public.assessment_submissions s
  LEFT JOIN public.assessment_results r ON r.slug = p_result_slug
  WHERE s.id = p_submission_id;
END;
$function$;

-- Fix search_path for is_admin function
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = is_admin.user_id
    AND role = 'admin'
  )
$function$;