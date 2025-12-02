import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhaseChip } from "@/components/PhaseChip";
import { Badge } from "@/components/ui/badge";
import { UniversalPhaseHero } from "@/components/UniversalPhaseHero";
import { PhaseContextSection } from "@/components/PhaseContextSection";
import { usePhase } from "@/contexts/PhaseContext";
import { ContentCard } from "@/components/ui/ContentCard";
import { PhaseTabs } from "@/components/ui/PhaseTabs";
import { CategoryChips } from "@/components/ui/CategoryChips";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, DollarSign, Package, CheckCircle2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Phase = Database['public']['Tables']['phases']['Row'];
type Product = Database['public']['Tables']['products']['Row'] & {
  phases?: Phase;
};

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Playbooks', value: 'playbook' },
  { label: 'Toolkits', value: 'toolkit' },
  { label: 'Toolkits', 'value': 'toolkit' },
  { label: 'Subscriptions', value: 'subscription' },
  { label: 'Systems', value: 'system' },
  { label: 'Templates', value: 'template' }
];

const ProductsList = () => {
  const { activePhase, setPhase } = usePhase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryFilter = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all phases
      const { data: phasesData } = await supabase
        .from('phases')
        .select('*');

      const phaseOrder = ['spark', 'momentum', 'mastery'];
      const sortedPhases = (phasesData || []).sort((a, b) => {
        return phaseOrder.indexOf(a.slug) - phaseOrder.indexOf(b.slug);
      });
      setPhases(sortedPhases);

      // Determine current phase object based on global activePhase string
      const currentPhase = activePhase && activePhase !== 'all'
        ? sortedPhases.find(p => p.slug === activePhase) || null
        : null;

      // Build query
      let query = supabase
        .from('products')
        .select('*, phases(*)')
        .eq('published', true);

      // Filter by phase if one is selected
      if (currentPhase) {
        query = query.eq('phase_id', currentPhase.id);
      }

      // Apply sorting
      query = query
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      // Filter by category
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data } = await query;
      setProducts(data || []);

      setLoading(false);
    };

    fetchData();
  }, [activePhase, categoryFilter]);

  const handlePhaseChange = (slug: string) => {
    setPhase(slug as any); // Type assertion needed if slug is string but setPhase expects Phase
    // Category filter is preserved by context URL update logic if we don't touch it, 
    // BUT context replaces URL. We might lose category.
    // Context implementation: navigate(`${currentPath}?${currentSearch.toString()}`, { replace: true });
    // It uses window.location.search, so it preserves other params!
  };

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    // Context handles phase param, but we need to ensure we don't lose it if we were manually setting it.
    // Actually, since context syncs URL, we just need to update category.
    // But wait, setPhase updates URL with REPLACE. 
    // If we update category here, we should probably just update search params and let context sync?
    // No, context syncs ONE WAY (URL -> State) in useEffect.
    // And setPhase updates URL.
    // If we update category, we should keep the phase param.

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

  const getPhaseHeroCopy = () => {
    if (!activePhase || activePhase === 'all') return { subtitle: '', supporting: '' };

    const copyMap: Record<string, { subtitle: string; supporting: string }> = {
      spark: {
        subtitle: 'Spark: Build your foundation with a few high-impact systems.',
        supporting: "You don't need a huge tech stack or complicated funnels. Start with simple playbooks and systems that reclaim your time and prove your offer works."
      },
      momentum: {
        subtitle: 'Momentum: Scale what works with repeatable systems.',
        supporting: "You're busy and growth is real. These offers help you install proven automations and operating systems so your team can keep up without burning out."
      },
      mastery: {
        subtitle: 'Mastery: Optimize, innovate, and lead with AI.',
        supporting: 'Your business is established. Now it\'s about leverage—executive-level dashboards, predictive insights, and AI systems that make the business self-improving.'
      }
    };

    return copyMap[activePhase] || copyMap.spark;
  };

  const getNextPhase = (): Phase | null => {
    if (!activePhase || activePhase === 'all') return null;
    const phaseOrder = ['spark', 'momentum', 'mastery'];
    const currentIndex = phaseOrder.indexOf(activePhase);
    if (currentIndex < phaseOrder.length - 1) {
      return phases.find(p => p.slug === phaseOrder[currentIndex + 1]) || null;
    }
    return null;
  };

  const featuredProducts = products.filter(p => p.is_featured);
  const allProducts = products;
  const nextPhase = getNextPhase();

  // Helper to get the full phase object if needed for display
  const currentPhaseObject = phases.find(p => p.slug === activePhase) || null;

  return (
    <>
      <SEO
        title="Product Catalog | SMB Evolution.ai"
        description="Phase-aware playbooks, toolkits, and systems for Spark, Momentum, and Mastery businesses"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Universal Phase Hero */}
        <UniversalPhaseHero
          variant="products"
          size="compact"
          phasesData={phases}
          activePhase={activePhase}
          primaryCta={{
            label: "View offers for this phase",
            href: "#all-products"
          }}
          secondaryCta={{
            label: "Go to Solutions",
            href: "/solutions"
          }}
        />

        {/* Phase Context Section */}
        <Section variant="alt" className="py-16">
          <PhaseContextSection variant="products" className="my-0" />
        </Section>

        <Section className="py-20">
          {/* Phase Filter Tabs */}
          <PhaseTabs
            activePhase={activePhase}
            onPhaseChange={handlePhaseChange}
          />

          {/* Category Filters */}
          <CategoryChips
            categories={CATEGORIES}
            activeCategory={categoryFilter}
            onCategoryChange={handleCategoryChange}
          />
        </Section>

        {loading ? (
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </section>
        ) : (
          <>
            {/* Phase Explanation Strip */}
            {currentPhaseObject && (
              <section className="py-12 bg-secondary-light/30">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-heading font-bold mb-4">
                      Why these offers matter in the {currentPhaseObject.title} phase
                    </h2>
                    {currentPhaseObject.overview && (
                      <p className="text-muted-foreground mb-6">{currentPhaseObject.overview}</p>
                    )}
                    {currentPhaseObject.primary_objectives && Array.isArray(currentPhaseObject.primary_objectives) && (
                      <div>
                        <h3 className="font-semibold mb-3">In this phase, you're trying to:</h3>
                        <div className="space-y-2">
                          {(currentPhaseObject.primary_objectives as string[]).slice(0, 4).map((objective, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-primary-blue mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Recommended Products */}
            {featuredProducts.length > 0 && (
              <section id="recommended" className="py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                      Recommended for Your Phase
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Start here to get the fastest wins in the next 10 weeks.
                    </p>
                  </div>
                  <div className={featuredProducts.length < 3 ? "flex justify-center flex-wrap gap-8" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
                    {featuredProducts.map((product) => (
                      <ContentCard
                        key={product.id}
                        title={product.title}
                        description={product.outcome || product.headline || product.description || ""}
                        icon={Package}
                        link={product.cta_link || `/products/${product.slug}`}
                        tag={product.category}
                        className="h-full max-w-md"
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* All Products Grid */}
            <section id="all-products" className="py-16 bg-secondary-light/20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                    All Offers for This Phase
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Playbooks, toolkits, subscriptions, and systems built for where you are right now.
                  </p>
                </div>

                {allProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-6">
                      We're still adding products for this phase. In the meantime, explore our Solutions page for guidance.
                    </p>
                    <Link to="/solutions">
                      <Button>View Solutions</Button>
                    </Link>
                  </div>
                ) : (
                  <div className={allProducts.length < 3 ? "flex justify-center flex-wrap gap-8" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
                    {allProducts.map((product) => (
                      <ContentCard
                        key={product.id}
                        title={product.title}
                        description={product.outcome || product.short_pitch || product.description || ""}
                        icon={Package}
                        link={product.cta_link || `/products/${product.slug}`}
                        tag={product.category}
                        className="h-full max-w-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Cross-Phase Teaser */}
            {nextPhase && (
              <section className="py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-heading font-bold mb-4">
                      Looking Ahead to Your Next Phase
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      {activePhase === 'spark' && "Once your Spark foundations are running smoothly, these Momentum systems will help you scale without burning out."}
                      {activePhase === 'momentum' && "When your core systems are dialed in, these Mastery-level systems give you leverage and leadership visibility."}
                    </p>
                    <Link to={`/products?phase=${nextPhase.slug}`}>
                      <Button size="lg" variant="outline">
                        See all offers for {nextPhase.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* CTA Footer */}
            <section className="py-16 md:py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                    Not sure which offer to start with?
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Take the SMB Evolution Assessment and we'll highlight the one or two products that will make the biggest difference in the next 10 weeks for your current phase.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Link to="/assessment">
                      <Button size="lg" className="w-full sm:w-auto">
                        Take the Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/solutions">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        View Solutions by Phase
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
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

export default ProductsList;
