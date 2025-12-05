import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { UniversalPhaseHero } from "@/components/UniversalPhaseHero";
import { PhaseContextSection } from "@/components/PhaseContextSection";
import { usePhase } from "@/contexts/PhaseContext";
import { ContentCard } from "@/components/ui/ContentCard";
import { PhaseTabs } from "@/components/ui/PhaseTabs";
import { CategoryChips } from "@/components/ui/CategoryChips";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Clock } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Resource = Database['public']['Tables']['resources']['Row'] & {
  phases?: Database['public']['Tables']['phases']['Row'];
};

type Phase = Database['public']['Tables']['phases']['Row'];

const RESOURCE_TYPES = [
  { label: 'All', value: 'all' },
  { label: 'Articles', value: 'article' },
  { label: 'Guides', value: 'guide' },
  { label: 'Templates', value: 'template' },
  { label: 'Tools', value: 'tool' },
  { label: 'Checklists', value: 'checklist' },
  { label: 'Playbooks', value: 'playbook' }
];

const ResourcesList = () => {
  const { activePhase, setPhase } = usePhase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [currentPhaseData, setCurrentPhaseData] = useState<Phase | null>(null);
  const [loading, setLoading] = useState(true);

  const categoryFilter = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchData = async () => {
      const { resources: localResources } = await import('@/data/resources');

      // Mock phases data
      const phasesData = [
        { id: 'phase_spark', slug: 'spark', title: 'Spark', overview: 'Build your foundation with a few high-impact systems.' },
        { id: 'phase_momentum', slug: 'momentum', title: 'Momentum', overview: 'Scale what works with repeatable systems.' },
        { id: 'phase_mastery', slug: 'mastery', title: 'Mastery', overview: 'Optimize, innovate, and lead with AI.' }
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

      let filteredResources = localResources;

      if (currentPhase) {
        filteredResources = filteredResources.filter(r => r.phases?.slug === currentPhase.slug);
      }

      // Filter by category
      if (categoryFilter !== 'all') {
        filteredResources = filteredResources.filter(r => r.type === categoryFilter);
      }

      setResources(filteredResources as any);
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

  const featuredResources = resources.filter(r => r.is_featured);
  const allResources = resources;

  return (
    <>
      <SEO
        title="Resources | SMB Evolution.ai"
        description="Phase-aware guides, templates, and tools to help your business grow"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Universal Phase Hero */}
        <UniversalPhaseHero
          variant="resources"
          size="compact"
          phasesData={phases}
          activePhase={activePhase}
          primaryCta={{
            label: "Explore Resources",
            href: "#all-resources"
          }}
          secondaryCta={{
            label: "View Solutions",
            href: "/solutions"
          }}
        />

        {/* Phase Context Section */}
        <Section variant="alt" className="py-16">
          <PhaseContextSection variant="resources" className="my-0" />
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
            categories={RESOURCE_TYPES}
            activeCategory={categoryFilter}
            onCategoryChange={handleCategoryChange}
          />
        </Section>

        {loading ? (
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground">Loading resources...</p>
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
                      Why these resources matter in the {currentPhaseData.title} phase
                    </h2>
                    {currentPhaseData.overview && (
                      <p className="text-muted-foreground mb-6">{currentPhaseData.overview}</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Recommended Resources */}
            {featuredResources.length > 0 && (
              <section id="recommended-resources" className="py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                      Recommended for Your Phase
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Essential guides and tools for your {activePhase} growth.
                    </p>
                  </div>
                  <div className={featuredResources.length < 3 ? "flex justify-center flex-wrap gap-8" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
                    {featuredResources.map((resource) => (
                      <ContentCard
                        key={resource.id}
                        title={resource.title}
                        description={resource.summary || resource.headline || ""}
                        icon={Clock}
                        link={resource.cta_link || `/resources/${resource.slug}`}
                        tag={resource.type || resource.badge}
                        className="h-full max-w-md"
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* All Resources Grid */}
            <section id="all-resources" className="py-16 bg-secondary-light/20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                    All Resources
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Browse our full library of guides, templates, and tools.
                  </p>
                </div>

                {allResources.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-6">
                      No resources found for this selection.
                    </p>
                    <Button variant="outline" onClick={() => handleCategoryChange('all')}>
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className={allResources.length < 3 ? "flex justify-center flex-wrap gap-8" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
                    {allResources.map((resource) => (
                      <ContentCard
                        key={resource.id}
                        title={resource.title}
                        description={resource.summary || resource.headline || ""}
                        icon={Clock}
                        link={resource.cta_link || `/resources/${resource.slug}`}
                        tag={resource.type || resource.badge}
                        className="h-full max-w-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* CTA Footer */}
            <section className="py-20 bg-primary-blue text-white">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Not sure what resource you need next?
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                  Your phase determines which guides, templates, and tools will move the needle fastest. Take the assessment and we'll point you to the most relevant resources for where you are right now.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <Link to="/assessment">
                    <Button size="lg" variant="secondary">
                      Take the Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary-blue">
                      Browse Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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

export default ResourcesList;