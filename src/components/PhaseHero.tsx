import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type Phase = Database['public']['Tables']['phases']['Row'];

interface PhaseHeroProps {
  phase: Phase;
}

export const PhaseHero = ({ phase }: PhaseHeroProps) => {
  const phaseGradients = {
    spark: 'gradient-spark',
    momentum: 'gradient-momentum',
    mastery: 'gradient-mastery'
  };

  const gradientClass = phaseGradients[phase.slug as keyof typeof phaseGradients] || 'gradient-hero';

  return (
    <div className={cn(
      "rounded-2xl p-8 md:p-12 text-white mb-12",
      gradientClass
    )}>
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          {phase.headline || phase.title}
        </h1>
        <p className="text-xl md:text-2xl mb-6 opacity-95">
          {phase.subheadline}
        </p>
        
        {phase.primary_objectives && Array.isArray(phase.primary_objectives) && phase.primary_objectives.length > 0 && (
          <div className="space-y-2 mt-6">
            {(phase.primary_objectives as string[]).slice(0, 3).map((objective, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-base">{objective}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
