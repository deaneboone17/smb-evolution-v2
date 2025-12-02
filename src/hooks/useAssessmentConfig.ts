import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AssessmentConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  sections: Array<{
    id: string;
    title: string;
    questions: Array<{
      id: string;
      key: string;
      prompt: string;
      type: string;
      options: Array<{
        id: string;
        label: string;
        value: string;
        score: number;
        weights: Record<string, number>;
      }>;
    }>;
  }>;
  results: Array<{
    id: string;
    slug: string;
    title: string;
    hero: string;
    body_md: string;
    cta_label: string;
    cta_url: string;
    score_min: number;
    score_max: number;
  }>;
}

export function useAssessmentConfig(slug: string) {
  const [config, setConfig] = useState<AssessmentConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        setLoading(true);
        
        // Fetch assessment with all related data
        const { data: assessment, error: assessmentError } = await supabase
          .from('assessments')
          .select('*')
          .eq('slug', slug)
          .single();

        if (assessmentError) throw assessmentError;
        if (!assessment) throw new Error('Assessment not found');

        // Fetch sections
        const { data: sections, error: sectionsError } = await supabase
          .from('assessment_sections')
          .select('*')
          .eq('assessment_id', assessment.id)
          .order('ordinal');

        if (sectionsError) throw sectionsError;

        // Fetch questions and options for each section
        const sectionsWithQuestions = await Promise.all(
          (sections || []).map(async (section) => {
            const { data: questions, error: questionsError } = await supabase
              .from('assessment_questions')
              .select('*')
              .eq('section_id', section.id)
              .order('ordinal');

            if (questionsError) throw questionsError;

            const questionsWithOptions = await Promise.all(
              (questions || []).map(async (question) => {
                const { data: options, error: optionsError } = await supabase
                  .from('assessment_options')
                  .select('*')
                  .eq('question_id', question.id)
                  .order('ordinal');

                if (optionsError) throw optionsError;

                return {
                  ...question,
                  options: options || []
                };
              })
            );

            return {
              ...section,
              questions: questionsWithOptions
            };
          })
        );

        // Fetch results
        const { data: results, error: resultsError } = await supabase
          .from('assessment_results')
          .select('*')
          .eq('assessment_id', assessment.id)
          .order('score_min');

        if (resultsError) throw resultsError;

        // Map to clean config structure
        const cleanConfig: AssessmentConfig = {
          id: assessment.id,
          slug: assessment.slug,
          title: assessment.title,
          description: assessment.description,
          sections: sectionsWithQuestions.map(section => ({
            id: section.id,
            title: section.title,
            questions: section.questions.map(question => ({
              id: question.id,
              key: question.key,
              prompt: question.prompt,
              type: question.type,
              options: question.options.map(option => ({
                id: option.id,
                label: option.label,
                value: option.value,
                score: option.score,
                weights: (option.weights as any) || {}
              }))
            }))
          })),
          results: (results || []).map(result => ({
            id: result.id,
            slug: result.slug,
            title: result.title,
            hero: result.hero,
            body_md: result.body_md,
            cta_label: result.cta_label,
            cta_url: result.cta_url,
            score_min: result.score_min,
            score_max: result.score_max
          }))
        };

        setConfig(cleanConfig);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setConfig(null);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, [slug]);

  return { config, loading, error };
}
