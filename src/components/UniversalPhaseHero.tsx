import { usePhase } from "@/contexts/PhaseContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type Phase = Database['public']['Tables']['phases']['Row'];

interface HeroContent {
  title: string;
  subtitle: string;
  body: string;
}

interface UniversalPhaseHeroProps {
  variant?: 'home' | 'solutions' | 'products' | 'apps' | 'resources' | 'newsletter' | 'assessment-results' | 'generic';
  size?: 'compact' | 'full';
  overrideTitle?: string;
  overrideSubheadline?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  className?: string;
  phasesData?: Phase[];
  activePhase?: string;
}

const phaseGradients = {
  spark: 'gradient-spark',
  momentum: 'gradient-momentum',
  mastery: 'gradient-mastery'
};

const variantLabels = {
  home: '',
  solutions: 'Solutions',
  products: 'Products',
  apps: 'Automation Apps',
  resources: 'Resources',
  newsletter: 'Newsletter',
  'assessment-results': 'Results',
  generic: ''
};

export const UniversalPhaseHero = ({
  variant = 'generic',
  size = 'compact',
  overrideTitle,
  overrideSubheadline,
  primaryCta,
  secondaryCta,
  className,
  phasesData,
  activePhase: propActivePhase
}: UniversalPhaseHeroProps) => {
  const { phase: contextPhase } = usePhase();
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  // Use prop if provided (handling 'all'), otherwise context
  const activePhase = propActivePhase || contextPhase;
  const isAllPhase = activePhase === 'all' || activePhase === 'All';

  // Fetch variant-specific hero content from database
  useEffect(() => {
    const fetchHeroContent = async () => {
      if (variant === 'generic' || isAllPhase) {
        setLoading(false);
        return;
      }

      const contentKey = `hero.${variant}.${activePhase}`;
      const { data } = await supabase
        .from('site_content')
        .select('value')
        .eq('key', contentKey)
        .single();

      if (data?.value && typeof data.value === 'object' && !Array.isArray(data.value)) {
        const content = data.value as { title?: string; subtitle?: string; body?: string };
        if (content.title && content.subtitle && content.body) {
          setHeroContent({
            title: content.title,
            subtitle: content.subtitle,
            body: content.body
          });
        }
      }
      setLoading(false);
    };

    fetchHeroContent();
  }, [activePhase, variant, isAllPhase]);

  const currentPhaseData = phasesData?.find(p => p.slug === activePhase);

  let gradientClass = phaseGradients[activePhase as keyof typeof phaseGradients] || 'gradient-hero';
  if (isAllPhase) {
    gradientClass = 'bg-[#1B1B3A]';
  }

  const variantLabel = variantLabels[variant];

  // Use variant-specific content from DB, then override props, then fallback to phase data
  let title = overrideTitle || heroContent?.title || currentPhaseData?.headline || currentPhaseData?.title;
  let subheadline = overrideSubheadline || heroContent?.subtitle || currentPhaseData?.subheadline;

  if (isAllPhase) {
    const typeLabel = variant === 'products' ? 'Product' :
      variant === 'resources' ? 'Resource' :
        variant === 'apps' ? 'App' :
          variant === 'solutions' ? 'Solution' : 'Content';
    title = `The Complete ${typeLabel} Ecosystem`;
    subheadline = "Browse our full library of phase-aware systems, playbooks, and tools.";
  }

  const body = heroContent?.body;
  const overview = currentPhaseData?.overview;
  const objectives = currentPhaseData?.primary_objectives as string[] | null;

  const phaseName = isAllPhase ? 'All Phases' : (currentPhaseData?.title || activePhase.charAt(0).toUpperCase() + activePhase.slice(1));

  const isCompact = size === 'compact';

  return (
    <div className={cn(
      "text-white",
      gradientClass,
      className
    )}>
      <div className={cn(
        "container mx-auto px-4",
        isCompact ? "py-8 md:py-12" : "py-12 md:py-16"
      )}>
        <div className="max-w-4xl">
          {(phaseName || variantLabel) && (
            <div className="text-sm font-medium opacity-90 mb-2">
              {phaseName} {variantLabel && phaseName && '·'} {variantLabel}
            </div>
          )}

          {title && (
            <h1 className={cn(
              "font-heading font-bold mb-4",
              isCompact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"
            )}>
              {title}
            </h1>
          )}

          {subheadline && (
            <p className={cn(
              "mb-6 opacity-95",
              isCompact ? "text-lg md:text-xl" : "text-xl md:text-2xl"
            )}>
              {subheadline}
            </p>
          )}

          {/* Only show body and objectives in full mode */}
          {!isCompact && body && (
            <p className="text-base md:text-lg mb-6 opacity-90">
              {body}
            </p>
          )}

          {!isCompact && !body && overview && (
            <p className="text-base md:text-lg mb-6 opacity-90">
              {overview}
            </p>
          )}

          {!isCompact && objectives && Array.isArray(objectives) && objectives.length > 0 && (
            <div className="space-y-2 mb-8">
              <p className="text-sm font-medium opacity-90 mb-3">
                In this phase, your priorities are:
              </p>
              {objectives.slice(0, 4).map((objective, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base">{objective}</span>
                </div>
              ))}
            </div>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-4 mt-6">
              {primaryCta && (
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/95 shadow-lg"
                >
                  <a href={primaryCta.href}>{primaryCta.label}</a>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white bg-white/95 text-foreground hover:bg-white hover:border-white"
                >
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
