import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhaseChip } from "@/components/PhaseChip";
import { UniversalPhaseHero } from "@/components/UniversalPhaseHero";
import { PhaseContextSection } from "@/components/PhaseContextSection";
import { usePhase } from "@/contexts/PhaseContext";
import { PhaseTabs } from "@/components/ui/PhaseTabs";
import { CategoryChips } from "@/components/ui/CategoryChips";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Mail, FileText } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type NewsletterIssue = Database['public']['Tables']['newsletter_issues']['Row'] & {
  phases?: Database['public']['Tables']['phases']['Row'];
};

type Phase = Database['public']['Tables']['phases']['Row'];

const NewsletterList = () => {
  const { activePhase, setPhase } = usePhase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [currentPhaseData, setCurrentPhaseData] = useState<Phase | null>(null);

  const typeFilter = searchParams.get('type') || 'all';

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all phases
      const { data: phasesData } = await supabase
        .from('phases')
        .select('*');

      const phaseOrder = ['spark', 'momentum', 'mastery'];
      const orderedPhases = (phasesData || []).sort((a, b) => {
        return phaseOrder.indexOf(a.slug) - phaseOrder.indexOf(b.slug);
      });
      setPhases(orderedPhases);

      // Determine effective phase object
      const currentPhase = activePhase && activePhase !== 'all'
        ? orderedPhases.find(p => p.slug === activePhase)
        : null;

      setCurrentPhaseData(currentPhase || null);

      // Build query
      let query = supabase
        .from('newsletter_issues')
        .select('*, phases(*)')
        .eq('published', true)
        .order('priority', { ascending: false })
        .order('published_at', { ascending: false });

      if (currentPhase) {
        query = query.eq('phase_id', currentPhase.id);
      }

      // Filter by type
      if (typeFilter && typeFilter !== 'all') {
        query = query.eq('type', typeFilter);
      }

      const { data } = await query;
      setIssues(data || []);

      setLoading(false);
    };

    fetchData();
  }, [activePhase, typeFilter]);

  const handlePhaseChange = (slug: string) => {
    setPhase(slug as any);
    // Update URL search params for phase
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('phase');
    } else {
      newParams.set('phase', slug);
    }
    setSearchParams(newParams);
  };

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams);
    if (type === 'all') {
      params.delete('type');
    } else {
      params.set('type', type);
    }
    setSearchParams(params);
  };

  return (
    <>
      <SEO
        title="Newsletter | SMB Evolution.ai"
        description="Phase-aware insights and strategies delivered to your inbox"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Universal Phase Hero */}
        <UniversalPhaseHero
          variant="newsletter"
          size="compact"
          phasesData={phases}
          activePhase={activePhase}
          className="bg-[#1B1B3A] [&_h1]:text-white [&_h1]:font-montserrat [&_p]:text-gray-300 [&_p]:font-inter"
          primaryCta={{
            label: "Subscribe Now",
            href: "#newsletter-subscribe"
          }}
          secondaryCta={{
            label: "Read Latest Issues",
            href: "#all-posts"
          }}
        />

        {/* Phase Context Section - Only show if specific phase selected */}
        {currentPhaseData && (
          <Section variant="alt" className="py-16">
            <PhaseContextSection variant="newsletter" className="my-0" />
          </Section>
        )}

        <Section className="py-16">
          {/* Phase Filter Tabs */}
          <PhaseTabs
            activePhase={activePhase}
            onPhaseChange={handlePhaseChange}
          />

          {/* Type Filters */}
          <CategoryChips
            categories={[
              { label: 'All', value: 'all' },
              { label: 'Insights', value: 'insight' },
              { label: 'Guides', value: 'guide' },
              { label: 'Case Studies', value: 'case-study' },
              { label: 'Announcements', value: 'announcement' }
            ]}
            activeCategory={typeFilter}
            onCategoryChange={handleTypeChange}
            className="mb-12"
          />

          {/* Phase Context Block - Only if specific phase selected */}
          {currentPhaseData && (
            <Card className="mb-12 shadow-smooth">
              <CardContent className="p-8">
                <h2 className="text-2xl font-heading font-bold mb-4">
                  What to Focus on in {currentPhaseData.title}
                </h2>
                {currentPhaseData.overview && (
                  <p className="text-muted-foreground mb-6">{currentPhaseData.overview}</p>
                )}
                {currentPhaseData.primary_objectives && Array.isArray(currentPhaseData.primary_objectives) && currentPhaseData.primary_objectives.length > 0 && (
                  <div>
                    <h3 className="font-heading font-bold mb-3">Right now, you should focus on:</h3>
                    <ul className="space-y-2">
                      {(currentPhaseData.primary_objectives as string[]).slice(0, 5).map((obj, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary-blue mt-1">•</span>
                          <span className="text-muted-foreground">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </Section>

        {/* Recommended Posts Section */}
        {issues.filter(i => i.is_featured).length > 0 && (
          <Section variant="alt" className="py-16">
            <div id="recommended-posts">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold mb-3">
                  Recommended Reads {activePhase !== 'all' ? `for ${currentPhaseData?.title}` : ''}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Start with these high-impact articles tailored to your stage.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues
                  .filter(i => i.is_featured)
                  .slice(0, 3)
                  .map((issue) => (
                    <Card key={issue.id} className="shadow-smooth hover:shadow-smooth-lg transition-smooth">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          {issue.badge && (
                            <span className="inline-block px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-full text-xs font-medium">
                              {issue.badge}
                            </span>
                          )}
                          {issue.phases && (
                            <PhaseChip phase={issue.phases.slug as 'spark' | 'momentum' | 'mastery'} />
                          )}
                          <h3 className="text-xl font-heading font-bold line-clamp-2">{issue.title}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-3">{issue.summary}</p>
                          {issue.published_at && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(issue.published_at).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          )}
                          <Link to={`/newsletter/${issue.slug}`}>
                            <Button size="sm" className="w-full">
                              Read Article
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </Section>
        )}

        {/* All Posts Grid */}
        <Section className="py-16">
          <div id="all-posts">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold mb-3">
                {activePhase === 'all' ? 'All Newsletter Articles' : `All ${currentPhaseData?.title} Articles`}
              </h2>
              <p className="text-muted-foreground">
                Browse every AI-for-SMB insight.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading articles...</p>
              </div>
            ) : issues.length === 0 ? (
              // Empty State - Glassmorphism
              <div className="max-w-2xl mx-auto">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-white/60" />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                    No {currentPhaseData?.title || 'Newsletter'} editions available yet.
                  </h3>
                  <p className="text-white/60 mb-8">
                    Stay tuned for upcoming insights.
                  </p>
                  <a href="#newsletter-subscribe">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                      Get Notified
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-6">
                {issues.map((issue) => (
                  <Card key={issue.id} className="shadow-smooth hover:shadow-smooth-lg transition-smooth">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {issue.badge && (
                              <span className="inline-block px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium">
                                {issue.badge}
                              </span>
                            )}
                            {issue.phases && (
                              <PhaseChip phase={issue.phases.slug as 'spark' | 'momentum' | 'mastery'} />
                            )}
                            {issue.type && (
                              <span className="text-xs text-muted-foreground capitalize">
                                {issue.type}
                              </span>
                            )}
                          </div>
                          <h3 className="text-2xl font-heading font-bold">{issue.title}</h3>
                        </div>
                        {issue.published_at && (
                          <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                            {new Date(issue.published_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-6">{issue.summary}</p>
                      <Link to={`/newsletter/${issue.slug}`}>
                        <Button>
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* Enhanced Newsletter Subscribe Section */}
        <Section variant="alt" className="py-16">
          <Card id="newsletter-subscribe" className="max-w-2xl mx-auto shadow-smooth">
            <CardContent className="p-8 md:p-12 text-center">
              <Mail className="h-12 w-12 text-primary-blue mx-auto mb-4" />
              <h2 className="text-3xl font-heading font-bold mb-4">
                Subscribe for Weekly AI + Automation Insights
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Get actionable ideas tailored to your phase (Spark, Momentum, or Mastery). No fluff. No hype. Just results.
              </p>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/80 border-white/20 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                  <Button type="submit" className="gradient-hero">
                    Subscribe
                  </Button>
                </form>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                You're in! Expect your first phase-aware AI insight next week.
              </p>
            </CardContent>
          </Card>
        </Section>

        {/* CTA Footer */}
        <Section className="py-16">
          <Card className="max-w-3xl mx-auto shadow-smooth bg-gradient-to-br from-primary-blue/5 to-accent/5">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Want Personalized Recommendations?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Take the SMB Evolution Assessment and get a phase-specific roadmap for what to automate next.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/assessment">
                  <Button size="lg" className="gradient-hero">
                    Take the Assessment
                  </Button>
                </Link>
                <Link to="/solutions">
                  <Button size="lg" variant="outline">
                    Browse Solutions
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

export default NewsletterList;
