import { usePhase } from "@/contexts/PhaseContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PhaseContextContent {
  heading: string;
  body: string;
}

interface PhaseContextSectionProps {
  variant: 'home' | 'solutions' | 'products' | 'apps' | 'resources' | 'newsletter' | 'assessment-results';
  className?: string;
}

export const PhaseContextSection = ({ variant, className }: PhaseContextSectionProps) => {
  const { phase: activePhase } = usePhase();
  const [content, setContent] = useState<PhaseContextContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const contentKey = `context.${variant}.${activePhase}`;
      const { data } = await supabase
        .from('site_content')
        .select('value')
        .eq('key', contentKey)
        .single();

      if (data?.value && typeof data.value === 'object' && !Array.isArray(data.value)) {
        const contextData = data.value as { heading?: string; body?: string };
        if (contextData.heading && contextData.body) {
          setContent({
            heading: contextData.heading,
            body: contextData.body
          });
        }
      }
      setLoading(false);
    };

    fetchContent();
  }, [activePhase, variant]);

  if (loading || !content) {
    return null;
  }

  return (
    <section className={cn("py-16", className)}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
          {content.heading}
        </h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {content.body}
        </p>
      </div>
    </section>
  );
};
