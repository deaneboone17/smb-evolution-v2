import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PhaseChip } from "@/components/PhaseChip";

export const PhaseAwareBadge = () => {
  const [currentPhase, setCurrentPhase] = useState<'spark' | 'momentum' | 'mastery' | null>(null);

  useEffect(() => {
    // Check localStorage for assessment result
    const storedPhase = localStorage.getItem('assessmentPhase');
    if (storedPhase && ['spark', 'momentum', 'mastery'].includes(storedPhase)) {
      setCurrentPhase(storedPhase as 'spark' | 'momentum' | 'mastery');
    }
  }, []);

  if (!currentPhase) return null;

  return (
    <div className="bg-secondary-light/50 border border-primary-blue/10 rounded-lg p-4 mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Your current phase:</span>
          <PhaseChip phase={currentPhase} />
        </div>
        <Link to="/assessment">
          <Button variant="outline" size="sm">
            Retake Assessment
          </Button>
        </Link>
      </div>
    </div>
  );
};
