import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhaseChip } from "@/components/PhaseChip";
import { UniversalPhaseHero } from "@/components/UniversalPhaseHero";
import { usePhase } from "@/contexts/PhaseContext";
import { ContentSection } from "@/components/ContentSection";
import { PhaseContextSection } from "@/components/PhaseContextSection";
import { PhaseTabs } from "@/components/ui/PhaseTabs";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle2, TrendingUp, AlertTriangle, Rocket } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

type Phase = Database['public']['Tables']['phases']['Row'];
type Solution = Database['public']['Tables']['solutions']['Row'] & {
  phases?: Database['public']['Tables']['phases']['Row'];
};
type App = Database['public']['Tables']['apps']['Row'] & {
  phases?: Database['public']['Tables']['phases']['Row'];
};
type Resource = Database['public']['Tables']['resources']['Row'] & {
  phases?: Database['public']['Tables']['phases']['Row'];
};

const SolutionsList = () => {
  const { activePhase, setPhase } = usePhase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [currentPhaseObject, setCurrentPhaseObject] = useState<Phase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch all phases
      const { data: phasesData } = await supabase
        .from('phases')
        .select('*');

      // Sort phases in the correct order: Spark, Momentum, Mastery
      const phaseOrder = ['spark', 'momentum', 'mastery'];
      const sortedPhases = (phasesData || []).sort((a, b) => {
        return phaseOrder.indexOf(a.slug) - phaseOrder.indexOf(b.slug);
      });

      setPhases(sortedPhases);

      // Determine effective phase slug from URL or context
      const paramPhase = searchParams.get('phase');
      let effectivePhaseSlug = activePhase;

      if (paramPhase && paramPhase !== effectivePhaseSlug) {
        effectivePhaseSlug = paramPhase as any;
        setPhase(paramPhase as any); // Update context if URL param is different
      }

      // Determine effective phase object
      const phaseObj = effectivePhaseSlug && effectivePhaseSlug !== 'all'
        ? sortedPhases.find(p => p.slug === effectivePhaseSlug) || null
        : null;

      setCurrentPhaseObject(phaseObj);

      // Fetch solutions
      let solutionsQuery = supabase
        .from('solutions')
        .select('*, phases(*)')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (phaseObj) {
        solutionsQuery = solutionsQuery.eq('phase_id', phaseObj.id);
      }

      const { data: solutionsData } = await solutionsQuery;
      setSolutions(solutionsData || []);

      // Fetch apps
      let appsQuery = supabase
        .from('apps')
        .select('*, phases(*)')
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (phaseObj) {
        appsQuery = appsQuery.eq('phase_id', phaseObj.id);
      }

      const { data: appsData } = await appsQuery;
      setApps(appsData || []);

      // Fetch resources
      let resourcesQuery = supabase
        .from('resources')
        .select('*, phases(*)')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (phaseObj) {
        resourcesQuery = resourcesQuery.eq('phase_id', phaseObj.id);
      }

      const { data: resourcesData } = await resourcesQuery;
      setResources(resourcesData || []);

      setLoading(false);
    };

    fetchData();
  }, [activePhase, searchParams, setPhase]);

  return (
    <>
      <SEO
        title="Solutions | SMB Evolution.ai"
        description="Phase-aware solutions, apps, and resources to help your business grow"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Universal Phase Hero */}
        <UniversalPhaseHero
          variant="solutions"
          size="compact"
          phasesData={phases}
          activePhase={activePhase}
          primaryCta={{
            label: "See recommended systems",
            href: "#solutions-recommendations"
          }}
          secondaryCta={{
            label: "Take the Assessment",
            href: "/assessment"
          }}
        />

        {/* Phase Context Section */}
        <Section variant="alt" className="py-16">
          <PhaseContextSection variant="solutions" className="my-0" />
        </Section>

        <Section className="py-20">
          {/* Phase Filters */}
          <PhaseTabs
            activePhase={activePhase}
            onPhaseChange={(slug) => {
              setPhase(slug as any);
              setSearchParams({ phase: slug });
            }}
          />

          {/* Phase Focus Section */}
          {/* Phase Focus Block */}
          {currentPhaseObject && (
            <div id="phase-focus" className="mt-20 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-center">
                What This Phase Is All About
              </h2>
              {currentPhaseObject.overview && (
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {currentPhaseObject.overview}
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {currentPhaseObject.primary_objectives && Array.isArray(currentPhaseObject.primary_objectives) && (
                  <div className="bg-secondary-light/30 p-6 rounded-xl border border-border/50">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary-blue" />
                      Key Objectives
                    </h3>
                    <ul className="space-y-3">
                      {(currentPhaseObject.primary_objectives as string[]).map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary-blue mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentPhaseObject.primary_pains && Array.isArray(currentPhaseObject.primary_pains) && (
                  <div className="bg-destructive/5 p-6 rounded-xl border border-destructive/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Common Roadblocks
                    </h3>
                    <ul className="space-y-3">
                      {(currentPhaseObject.primary_pains as string[]).map((pain, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-destructive font-bold">!</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{pain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {currentPhaseObject.next_10_weeks_focus && (
                <div className="mt-8 bg-primary-blue/5 border border-primary-blue/20 p-6 rounded-xl text-center">
                  <h3 className="font-bold text-primary-blue mb-2">
                    Focus for the Next 10 Weeks:
                  </h3>
                  <p className="text-lg font-medium">
                    {currentPhaseObject.next_10_weeks_focus}
                  </p>
                </div>
              )}
            </div>
          )}
        </Section>

        <Section className="py-20">
          {/* Phase Recommendations Intro */}
          {currentPhaseObject && (
            <div id="solutions-recommendations" className="mb-16 max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                What to Install in the Next 10 Weeks
              </h2>
              {activePhase.next_10_weeks_focus && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {activePhase.next_10_weeks_focus}
                </p>
              )}
            </div>
          )}


          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading content...</p>
            </div>
          ) : (
            <>
              {/* Solutions/Offers Section */}
              {solutions.length > 0 && (
                <ContentSection
                  title="Recommended Offers"
                  subtitle="Pick one or two systems to install first for your phase."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ...
                  </div>
                </ContentSection>
              )}

              {/* Apps Section */}
              {apps.length > 0 && (
                <ContentSection
                  title="Automation Apps for Your Phase"
                  subtitle="Always-on systems that do the work for you."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ...
                  </div>
                </ContentSection>
              )}

              {/* Resources Section */}
              {resources.length > 0 && (
                <ContentSection
                  title="Guides & Tools to Help You Evolve"
                  subtitle="Short, practical resources you can use today."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ...
                  </div>
                </ContentSection>
              )}

              {/* Empty State */}
              {solutions.length === 0 && apps.length === 0 && resources.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">
                    We're still building out offers for this phase. In the meantime, take the assessment again or explore cross-phase resources.
                  </p>
                  <Link to="/assessment">
                    <Button>
                      Go to Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </Section>

        {/* CTA Footer */}
        <Section variant="alt" className="py-20">
          <Card className="bg-primary text-primary-foreground shadow-smooth-lg">
            <CardContent className="p-12 text-center space-y-6">
              <Rocket className="h-16 w-16 mx-auto" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Not sure if this is your phase?
              </h2>
              <p className="text-xl max-w-2xl mx-auto opacity-95 mb-6">
                Take the assessment and we'll show you exactly where you are in the Spark → Momentum → Mastery journey—and which systems to install next.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/assessment">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Take the Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                    Explore All Solutions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default SolutionsList;
