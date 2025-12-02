-- Move scoring logic server-side to prevent client manipulation
-- This replaces the TypeScript computeScore() with secure database function

-- Create server-side scoring function
CREATE OR REPLACE FUNCTION public.compute_score_server(
  p_answers jsonb,
  p_assessment_id uuid
) RETURNS jsonb AS $$
DECLARE
  v_total integer := 0;
  v_dims jsonb := '{"beginner":0,"intermediate":0,"expert":0}'::jsonb;
  v_segment text;
  v_top_gap text;
  v_question record;
  v_option record;
  v_answer_val text;
  v_answer_array jsonb;
  v_max_dim_val integer := 0;
  v_min_dim_val integer := 999999;
  v_current_dim_val integer;
BEGIN
  -- Loop through all questions for this assessment
  FOR v_question IN
    SELECT 
      q.id, 
      q.key, 
      q.type
    FROM assessment_questions q
    JOIN assessment_sections s ON s.id = q.section_id
    WHERE s.assessment_id = p_assessment_id
    ORDER BY s.ordinal, q.ordinal
  LOOP
    -- Get the answer for this question key
    v_answer_val := p_answers->>v_question.key;
    
    IF v_answer_val IS NOT NULL THEN
      -- Handle single choice and scale questions
      IF v_question.type IN ('single', 'scale') THEN
        -- Find matching option
        FOR v_option IN
          SELECT score, weights
          FROM assessment_options
          WHERE question_id = v_question.id
            AND value = v_answer_val
        LOOP
          -- Add score
          v_total := v_total + COALESCE(v_option.score, 0);
          
          -- Add weights to dimensions
          IF v_option.weights IS NOT NULL THEN
            v_dims := jsonb_set(
              v_dims,
              '{beginner}',
              to_jsonb(COALESCE((v_dims->>'beginner')::integer, 0) + COALESCE((v_option.weights->>'beginner')::integer, 0))
            );
            v_dims := jsonb_set(
              v_dims,
              '{intermediate}',
              to_jsonb(COALESCE((v_dims->>'intermediate')::integer, 0) + COALESCE((v_option.weights->>'intermediate')::integer, 0))
            );
            v_dims := jsonb_set(
              v_dims,
              '{expert}',
              to_jsonb(COALESCE((v_dims->>'expert')::integer, 0) + COALESCE((v_option.weights->>'expert')::integer, 0))
            );
          END IF;
        END LOOP;
        
      -- Handle multi-choice questions
      ELSIF v_question.type = 'multi' THEN
        -- Parse array answer
        v_answer_array := p_answers->v_question.key;
        
        IF jsonb_typeof(v_answer_array) = 'array' THEN
          -- Loop through each selected value
          FOR v_option IN
            SELECT o.score, o.weights
            FROM assessment_options o
            WHERE o.question_id = v_question.id
              AND o.value IN (SELECT jsonb_array_elements_text(v_answer_array))
          LOOP
            -- Add score
            v_total := v_total + COALESCE(v_option.score, 0);
            
            -- Add weights to dimensions
            IF v_option.weights IS NOT NULL THEN
              v_dims := jsonb_set(
                v_dims,
                '{beginner}',
                to_jsonb(COALESCE((v_dims->>'beginner')::integer, 0) + COALESCE((v_option.weights->>'beginner')::integer, 0))
              );
              v_dims := jsonb_set(
                v_dims,
                '{intermediate}',
                to_jsonb(COALESCE((v_dims->>'intermediate')::integer, 0) + COALESCE((v_option.weights->>'intermediate')::integer, 0))
              );
              v_dims := jsonb_set(
                v_dims,
                '{expert}',
                to_jsonb(COALESCE((v_dims->>'expert')::integer, 0) + COALESCE((v_option.weights->>'expert')::integer, 0))
              );
            END IF;
          END LOOP;
        END IF;
      END IF;
    END IF;
  END LOOP;
  
  -- Determine segment (highest dimension value)
  v_segment := 'beginner';
  v_max_dim_val := (v_dims->>'beginner')::integer;
  
  v_current_dim_val := (v_dims->>'intermediate')::integer;
  IF v_current_dim_val > v_max_dim_val THEN
    v_segment := 'intermediate';
    v_max_dim_val := v_current_dim_val;
  END IF;
  
  v_current_dim_val := (v_dims->>'expert')::integer;
  IF v_current_dim_val > v_max_dim_val THEN
    v_segment := 'expert';
    v_max_dim_val := v_current_dim_val;
  END IF;
  
  -- Determine top gap (lowest dimension value)
  v_top_gap := 'beginner';
  v_min_dim_val := (v_dims->>'beginner')::integer;
  
  v_current_dim_val := (v_dims->>'intermediate')::integer;
  IF v_current_dim_val < v_min_dim_val THEN
    v_top_gap := 'intermediate';
    v_min_dim_val := v_current_dim_val;
  END IF;
  
  v_current_dim_val := (v_dims->>'expert')::integer;
  IF v_current_dim_val < v_min_dim_val THEN
    v_top_gap := 'expert';
    v_min_dim_val := v_current_dim_val;
  END IF;
  
  -- Return scoring result
  RETURN jsonb_build_object(
    'total', v_total,
    'dims', v_dims,
    'segment', v_segment,
    'topGap', v_top_gap
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Update submit_assessment to compute score server-side
CREATE OR REPLACE FUNCTION public.submit_assessment(
  p_assessment_id uuid,
  p_answers jsonb,
  p_email text DEFAULT NULL::text,
  p_first_name text DEFAULT NULL::text,
  p_last_name text DEFAULT NULL::text,
  p_company text DEFAULT NULL::text,
  p_phone text DEFAULT NULL::text,
  p_utm jsonb DEFAULT NULL::jsonb,
  p_consent boolean DEFAULT false
) RETURNS TABLE(submission_id uuid, result_slug text) AS $$
DECLARE
  new_submission_id uuid;
  v_scoring jsonb;
  v_score integer;
  v_breakdown jsonb;
  v_segment text;
  v_result_slug text;
BEGIN
  -- Compute score server-side (SECURITY: prevents client manipulation)
  v_scoring := compute_score_server(p_answers, p_assessment_id);
  v_score := (v_scoring->>'total')::integer;
  v_breakdown := v_scoring->'dims';
  v_segment := v_scoring->>'segment';
  
  -- Determine result slug from assessment_results table
  SELECT r.slug INTO v_result_slug
  FROM assessment_results r
  WHERE r.assessment_id = p_assessment_id
    AND v_score >= r.score_min
    AND v_score <= r.score_max
  ORDER BY r.score_min DESC
  LIMIT 1;
  
  -- Fallback: use segment-based result if no score match
  IF v_result_slug IS NULL THEN
    SELECT r.slug INTO v_result_slug
    FROM assessment_results r
    WHERE r.assessment_id = p_assessment_id
      AND r.slug ILIKE '%' || v_segment || '%'
    LIMIT 1;
  END IF;
  
  -- Final fallback: use first result
  IF v_result_slug IS NULL THEN
    SELECT r.slug INTO v_result_slug
    FROM assessment_results r
    WHERE r.assessment_id = p_assessment_id
    ORDER BY r.score_min
    LIMIT 1;
  END IF;
  
  -- Insert submission with SERVER-COMPUTED values only
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
    v_score,
    v_breakdown,
    v_segment,
    COALESCE(v_result_slug, 'beginner'),
    p_utm,
    p_consent
  ) RETURNING id INTO new_submission_id;

  -- Log submission event
  INSERT INTO public.funnel_events (submission_id, event, meta)
  VALUES (new_submission_id, 'submit', jsonb_build_object('segment', v_segment, 'score', v_score));

  -- Return submission ID and result slug
  RETURN QUERY SELECT new_submission_id, COALESCE(v_result_slug, 'beginner');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';