import { cn } from "@/lib/utils";

interface PhaseChipProps {
  phase: 'spark' | 'momentum' | 'mastery';
  className?: string;
}

export const PhaseChip = ({ phase, className }: PhaseChipProps) => {
  const phaseConfig = {
    spark: {
      label: 'Spark',
      className: 'bg-spark text-spark-foreground'
    },
    momentum: {
      label: 'Momentum',
      className: 'bg-momentum text-momentum-foreground'
    },
    mastery: {
      label: 'Mastery',
      className: 'bg-mastery text-mastery-foreground'
    }
  };

  const config = phaseConfig[phase];

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-accent uppercase tracking-wider",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};
