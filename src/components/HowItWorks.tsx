import { CheckCircle, Map, Rocket } from "lucide-react";

interface Step {
  title: string;
  body: string;
}

interface HowItWorksProps {
  title: string;
  subtitle?: string;
  steps: Step[];
}

const stepIcons = [CheckCircle, Map, Rocket];

export const HowItWorks = ({ title, subtitle, steps }: HowItWorksProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = stepIcons[index] || CheckCircle;
            return (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary-blue/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
