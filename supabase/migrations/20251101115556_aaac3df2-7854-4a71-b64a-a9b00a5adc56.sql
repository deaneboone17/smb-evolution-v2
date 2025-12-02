-- Create a secure function to fetch assessment results
CREATE OR REPLACE FUNCTION public.get_assessment_result(
  p_submission_id uuid,
  p_result_slug text
)
RETURNS TABLE (
  submission jsonb,
  result jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    to_jsonb(s.*) as submission,
    to_jsonb(r.*) as result
  FROM public.assessment_submissions s
  LEFT JOIN public.assessment_results r ON r.slug = p_result_slug
  WHERE s.id = p_submission_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_assessment_result TO anon, authenticated;