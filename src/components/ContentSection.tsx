import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const ContentSection = ({ title, subtitle, children, className = "" }: ContentSectionProps) => {
  return (
    <div className={`py-16 ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};
