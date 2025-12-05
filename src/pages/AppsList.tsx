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
import { PhaseContextSection } from "@/components/PhaseContextSection";
import { usePhase } from "@/contexts/PhaseContext";
import { ContentCard } from "@/components/ui/ContentCard";
import { PhaseTabs } from "@/components/ui/PhaseTabs";
import { CategoryChips } from "@/components/ui/CategoryChips";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle2, TrendingUp, Package } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

type App = Database['public']['Tables']['apps']['Row'] & {
  phases?: Database['public']['Tables']['phases']['Row'];
};

type Phase = Database['public']['Tables']['phases']['Row'];

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'AI Tools', value: 'ai-tool' },
  { label: 'Always-On Systems', value: 'always-on' },
  { label: 'Financial Automation', value: 'finance' },
  { label: 'Lead Automation', value: 'lead-automation' }
];

const AppsList = () => {
  const { activePhase, setPhase } = usePhase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [apps, setApps] = useState<App[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [currentPhaseData, setCurrentPhaseData] = useState<Phase | null>(null);
  const [nextPhaseApps, setNextPhaseApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryFilter = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchData = async () => {
      const { apps: localApps } = await import('@/data/apps');

      // Mock phases data
      const phasesData = [
        { id: 'phase_spark', slug: 'spark', title: 'Spark', overview: 'Build your foundation with a few high-impact systems.', primary_pains: ['Manual data entry', 'Repetitive emails', 'Disorganized files'] },
        { id: 'phase_momentum', slug: 'momentum', title: 'Momentum', overview: 'Scale what works with repeatable systems.', primary_pains: ['Bottlenecks in delivery', 'Inconsistent quality', 'Team alignment'] },
        { id: 'phase_mastery', slug: 'mastery', title: 'Mastery', overview: 'Optimize, innovate, and lead with AI.', primary_pains: ['Lack of strategic insight', 'Slow decision making', 'Market disruption'] }
      ];

      const phaseOrder = ['spark', 'momentum', 'mastery'];
      const orderedPhases = phasesData.sort((a, b) => {
        return phaseOrder.indexOf(a.slug) - phaseOrder.indexOf(b.slug);
      });
      setPhases(orderedPhases as any);

      // Determine effective phase object
      const currentPhase = activePhase && activePhase !== 'all'
        ? orderedPhases.find(p => p.slug === activePhase)
        : null;

      setCurrentPhaseData(currentPhase as any || null);

      let filteredApps = localApps;

      if (currentPhase) {
        filteredApps = filteredApps.filter(a => a.phases?.slug === currentPhase.slug);
      }

      // Filter by category
      if (categoryFilter !== 'all') {
        filteredApps = filteredApps.filter(a => a.category === categoryFilter);
      }

      setApps(filteredApps as any);

      // Fetch next phase apps
      if (activePhase && activePhase !== 'all') {
        const currentIndex = phaseOrder.indexOf(activePhase);
        if (currentIndex < phaseOrder.length - 1) {
          const nextPhaseSlug = phaseOrder[currentIndex + 1];
          const nextApps = localApps.filter(a => a.phases?.slug === nextPhaseSlug).slice(0, 3);
          setNextPhaseApps(nextApps as any);
        } else {
          setNextPhaseApps([]);
        }
      } else {
        setNextPhaseApps([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [activePhase, categoryFilter]);

  const handlePhaseChange = (slug: string) => {
    setPhase(slug as any);
  };

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (activePhase && activePhase !== 'all') {
      newParams.set('phase', activePhase);
    }
    if (category !== 'all') {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const featuredApps = apps.filter(a => a.is_featured);
  const allApps = apps;

  const nextPhaseSlug = activePhase === 'spark' ? 'momentum' : activePhase === 'momentum' ? 'mastery' : null;
  const nextPhaseLabel = nextPhaseSlug?.charAt(0).toUpperCase() + nextPhaseSlug?.slice(1);

  return (
    <>
      <SEO
        title="Automation Apps | SMB Evolution.ai"
        description="Curated automation tools and apps for every stage of business growth"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Phase-Aware Hero */}
        <UniversalPhaseHero
          variant="apps"
          size="compact"
          phasesData={phases}
          activePhase={activePhase}
          primaryCta={{
            label: "See Recommended Apps",
            href: "#recommended-apps"
          }}
          secondaryCta={{
            label: "Explore Solutions",
            href: "/solutions"
          }}
        />

        {/* Phase Context Section */}
        <Section variant="alt" className="py-16">
          <PhaseContextSection variant="apps" className="my-0" />
        </Section>

        {/* Phase Filters */}
        <Section className="py-12 border-b border-border">
          <PhaseTabs
            activePhase={activePhase}
            onPhaseChange={handlePhaseChange}
          />
        </Section>

        {/* Category Filters */}
        <Section variant="alt" className="py-12 border-b border-border">
          <CategoryChips
            categories={CATEGORIES}
            activeCategory={categoryFilter}
            onCategoryChange={handleCategoryChange}
          />
        </Section>

        {loading ? (
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground">Loading apps...</p>
            </div>
          </section>
        ) : (
          <>
            {/* Phase Explanation Strip */}
            {currentPhaseData && (
              <section className="py-12 bg-secondary-light/30">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-heading font-bold mb-4">
                      Why these apps matter in the {currentPhaseData.title} phase
                    </h2>
                    {currentPhaseData.overview && (
                      <p className="text-muted-foreground mb-6">{currentPhaseData.overview}</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Recommended Apps */}
            {featuredApps.length > 0 && (
              <section id="recommended-apps" className="py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                      Recommended for Your Phase
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Essential tools to automate your {activePhase} growth.
                    </p>
                  </div>
                  <div className={featuredApps.length < 3 ? "flex justify-center flex-wrap gap-8" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
                    {featuredApps.map((app) => (
                      <ContentCard
                        key={app.id}
                        title={app.name}
                        description={app.oneliner || app.description || ""}
                        icon={Package}
                        link={app.cta_link || `/apps/${app.slug}`}
                        tag={app.category}
                        className="h-full max-w-md"
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Phase Pains Section */}
            {currentPhaseData?.primary_pains && Array.isArray(currentPhaseData.primary_pains) && (currentPhaseData.primary_pains as string[]).length > 0 && (
              <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                      Automation That Solves What You're Struggling With
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Based on what businesses in this phase struggle with:
                    </p>
                    <ul className="space-y-3 mb-6">
                      {(currentPhaseData.primary_pains as string[]).slice(0, 5).map((pain, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-destructive font-bold">!</span>
                          </div>
                          <span className="text-muted-foreground">{pain}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-base font-medium">
                      Here are the apps that remove these blockers immediately.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Phase Pains Section */}
            {currentPhaseData?.primary_pains && Array.isArray(currentPhaseData.primary_pains) && (currentPhaseData.primary_pains as string[]).length > 0 && (
              <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                      Automation That Solves What You're Struggling With
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Based on what businesses in this phase struggle with:
                    </p>
                    <ul className="space-y-3 mb-6">
                      {(currentPhaseData.primary_pains as string[]).slice(0, 5).map((pain, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-destructive font-bold">!</span>
                          </div>
                          <span className="text-muted-foreground">{pain}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-base font-medium">
                      Here are the apps that remove these blockers immediately.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* All Apps Grid */}
            <section className="py-16" id="all-apps">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                    All Apps for This Phase
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Browse every automation and AI tool built specifically for your current stage.
                  </p>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading apps...</p>
                  </div>
                ) : allApps.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No apps available for this phase yet. Check back soon!</p>
                    <Link to="/solutions">
                      <Button variant="outline">View Solutions Instead</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allApps.map((app) => (
                      <Card key={app.id} className="shadow-smooth hover:shadow-smooth-lg transition-smooth">
                        <CardContent className="p-6">
                          <div className="space-y-4 flex-grow">
                            <div className="flex items-start justify-between">
                              {app.phases && (
                                <PhaseChip phase={app.phases.slug as 'spark' | 'momentum' | 'mastery'} />
                              )}
                              {app.badge && (
                                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                  {app.badge}
                                </span>
                              )}
                            </div>
                            {app.category && (
                              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                                {app.category}
                              </div>
                            )}
                            <h3 className="text-xl font-heading font-bold">{app.name}</h3>
                            {app.outcome && (
                              <p className="text-sm font-medium text-primary-blue">{app.outcome}</p>
                            )}
                            <p className="text-muted-foreground text-sm line-clamp-3">
                              {app.oneliner || app.description}
                            </p>
                            {app.pricing && (
                              <div className="text-sm font-semibold text-foreground">
                                {typeof app.pricing === 'string'
                                  ? app.pricing
                                  : typeof app.pricing === 'number'
                                    ? `$${app.pricing}`
                                    : JSON.stringify(app.pricing)}
                              </div>
                            )}
                          </div>
                          <Link to={app.cta_link || `/apps/${app.slug}`} className="mt-6 block">
                            <Button className="w-full">
                              {app.cta_label || 'Explore App'}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Next Phase Preview */}
            {nextPhaseSlug && nextPhaseApps.length > 0 && (
              <section className="py-16 bg-gradient-subtle">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <TrendingUp className="h-12 w-12 text-primary-blue mx-auto mb-4" />
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                      What's Next in Your Evolution?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Preview what's coming as you grow into the {nextPhaseLabel} phase.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {nextPhaseApps.map((app) => (
                      <Card key={app.id} className="shadow-smooth hover:shadow-smooth-lg transition-smooth border-muted">
                        <CardContent className="p-6">
                          <div className="space-y-4 flex-grow">
                            {app.phases && (
                              <PhaseChip phase={app.phases.slug as 'spark' | 'momentum' | 'mastery'} />
                            )}
                            <h3 className="text-xl font-heading font-bold">{app.name}</h3>
                            <p className="text-muted-foreground text-sm">{app.oneliner || app.description}</p>
                          </div>
                          <Button variant="outline" className="w-full mt-6" asChild>
                            <Link to={`/apps?phase=${nextPhaseSlug}`}>
                              See {nextPhaseLabel} Systems
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* CTA Footer */}
            <section className="py-20 bg-primary-blue text-white">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Not sure where to start?
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                  Take the SMB Evolution Assessment and we'll show you exactly which apps give you the biggest immediate wins.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/assessment">Take the Assessment</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary-blue" asChild>
                    <Link to="/solutions">Explore Solutions</Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default AppsList;
