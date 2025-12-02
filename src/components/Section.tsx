import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'alt';
  fullWidth?: boolean;
}

export const Section = ({ 
  children, 
  className = "", 
  variant = 'default',
  fullWidth = false 
}: SectionProps) => {
  const bgClass = variant === 'alt' ? 'bg-muted/30' : 'bg-background';
  
  return (
    <section className={cn(bgClass, className)}>
      {fullWidth ? (
        children
      ) : (
        <div className="container mx-auto px-4">
          {children}
        </div>
      )}
    </section>
  );
};
