import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Rocket, Target, TrendingUp, ArrowRight, Sparkles, Zap, Trophy } from "lucide-react";
import { PhaseChip } from "@/components/PhaseChip";
import { PhaseAwareBadge } from "@/components/PhaseAwareBadge";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedForPhase } from "@/components/FeaturedForPhase";
import { UniversalPhaseHero } from "@/components/UniversalPhaseHero";
import { PhaseContextSection } from "@/components/PhaseContextSection";
import { ContentCard } from "@/components/ui/ContentCard";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type Phase = Database['public']['Tables']['phases']['Row'];
type SiteContent = Database['public']['Tables']['site_content']['Row'];

const Home = () => {
  const [phases, setPhases] = useState<Phase[]>([]);
  const [heroContent, setHeroContent] = useState({
    headline: "Evolve Your Business. Automate Your Growth. Master Your AI.",
    subheadline: "Take full control with strategic AI-powered guidance that accelerates your business evolution with ease",
    primaryCta: { label: "Get Your AI Score", href: "/assessment" },
    secondaryCta: { label: "View Solutions", href: "/solutions" }
  });
  const [stepsContent, setStepsContent] = useState({
    title: "How SMB Evolution.ai Works",
    subtitle: "",
    items: [] as Array<{ title: string; body: string }>
  });
  const [featuredContent, setFeaturedContent] = useState({
    title: "What to Focus on Right Now",
    subtitle: "Based on your phase, these are the most impactful systems to install first"
  });
  const [newsletterContent, setNewsletterContent] = useState({
    title: "Stay Ahead with AI for SMBs",
    body: "Get one practical, phase-aware AI and automation tip each week. No hype, just systems you can actually use."
  });

  useEffect(() => {
    const fetchContent = async () => {
      // Fetch phases
      const { data: phasesData } = await supabase
        .from('phases')
        .select('*');

      if (phasesData) {
        // Order phases as: spark, momentum, mastery
        const orderedPhases = ['spark', 'momentum', 'mastery']
          .map(slug => phasesData.find(p => p.slug === slug))
          .filter(Boolean) as Phase[];
        setPhases(orderedPhases);
      }

      // Fetch site content
      const { data: contentData } = await supabase
        .from('site_content')
        .select('*')
        .in('key', [
          'homepage.hero.headline',
          'homepage.hero.subheadline',
          'homepage.hero.primary_cta',
          'homepage.hero.secondary_cta',
          'homepage.steps.title',
          'homepage.steps.subtitle',
          'homepage.steps.items',
          'homepage.featured.title',
          'homepage.featured.subtitle',
          'homepage.newsletter.title',
          'homepage.newsletter.body'
        ]);

      if (contentData) {
        const contentMap = contentData.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, any>);

        if (contentMap['homepage.hero.headline']) {
          setHeroContent(prev => ({ ...prev, headline: contentMap['homepage.hero.headline'] }));
        }
        if (contentMap['homepage.hero.subheadline']) {
          setHeroContent(prev => ({ ...prev, subheadline: contentMap['homepage.hero.subheadline'] }));
        }
        // Removed primary_cta fetch to prevent flickering and enforce "Get Your AI Score"
        if (contentMap['homepage.hero.secondary_cta']) {
          setHeroContent(prev => ({ ...prev, secondaryCta: contentMap['homepage.hero.secondary_cta'] }));
        }
        if (contentMap['homepage.steps.title']) {
          setStepsContent(prev => ({ ...prev, title: contentMap['homepage.steps.title'] }));
        }
        if (contentMap['homepage.steps.subtitle']) {
          setStepsContent(prev => ({ ...prev, subtitle: contentMap['homepage.steps.subtitle'] }));
        }
        if (contentMap['homepage.steps.items']) {
          setStepsContent(prev => ({ ...prev, items: contentMap['homepage.steps.items'] }));
        }
        if (contentMap['homepage.featured.title']) {
          setFeaturedContent(prev => ({ ...prev, title: contentMap['homepage.featured.title'] }));
        }
        if (contentMap['homepage.featured.subtitle']) {
          setFeaturedContent(prev => ({ ...prev, subtitle: contentMap['homepage.featured.subtitle'] }));
        }
        if (contentMap['homepage.newsletter.title']) {
          setNewsletterContent(prev => ({ ...prev, title: contentMap['homepage.newsletter.title'] }));
        }
        if (contentMap['homepage.newsletter.body']) {
          setNewsletterContent(prev => ({ ...prev, body: contentMap['homepage.newsletter.body'] }));
        }
      }
    };

    fetchContent();
  }, []);

  const getPhaseIcon = (slug: string) => {
    switch (slug) {
      case 'spark': return Sparkles;
      case 'momentum': return Zap;
      case 'mastery': return Trophy;
      default: return Sparkles;
    }
  };

  return (
    <>
      <SEO />
      <Header />
      <main>
        {/* Compact Hero Section */}
        <section className="relative bg-bg-light overflow-hidden">
          {/* Geometric Decorative Shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[10%] left-[5%] w-32 h-32 rounded-2xl rotate-12 backdrop-blur-md bg-white/40 border border-white/50 shadow-lg animate-[float_8s_ease-in-out_infinite]" />
            <div className="absolute top-[40%] right-[5%] w-40 h-40 rounded-full backdrop-blur-md bg-electric-blue/10 border border-electric-blue/20 animate-[float_10s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[10%] left-[15%] w-24 h-24 rotate-45 backdrop-blur-md bg-spark-coral/10 border border-spark-coral/20 animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[20%] right-[15%] w-16 h-16 rounded-lg rotate-[-12deg] backdrop-blur-md bg-momentum-yellow/10 border border-momentum-yellow/20 animate-[float_9s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
            <div className="max-w-5xl mx-auto text-center space-y-8 mb-8">
              <PhaseAwareBadge />
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-tight text-deep-indigo">
                Evolve Your Business. Automate Your Growth.{" "}
                <span className="bg-gradient-to-r from-electric-blue to-bright-aqua bg-clip-text text-transparent">
                  Master Your AI.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto font-sans leading-relaxed">
                {heroContent.subheadline}
              </p>
              <div className="pt-8 flex gap-4 justify-center flex-wrap">
                <Link to={heroContent.primaryCta.href}>
                  <Button size="lg" className="text-lg px-10 h-14 rounded-full bg-gradient-to-r from-spark-coral to-momentum-yellow hover:scale-105 transition-transform duration-200 border-none shadow-smooth-lg text-white">
                    {heroContent.primaryCta.label}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to={heroContent.secondaryCta.href}>
                  <Button size="lg" variant="outline" className="text-lg px-10 h-14 rounded-full hover:scale-105 transition-transform duration-200 border-2">
                    {heroContent.secondaryCta.label}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Phase Context Section */}
        <Section variant="alt" className="py-16">
          <PhaseContextSection variant="home" className="my-0" />
        </Section>

        {/* Phases Section */}
        <Section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Three Phases of Evolution</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Every successful business follows a predictable path. We guide you through each stage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {phases.map((phase) => {
                const Icon = getPhaseIcon(phase.slug);
                const objectives = Array.isArray(phase.primary_objectives)
                  ? (phase.primary_objectives as string[])
                  : [];

                return (
                  <ContentCard
                    key={phase.id}
                    title={phase.title}
                    description={phase.headline || ""}
                    icon={Icon}
                    link={`/solutions?phase=${phase.slug}`}
                    tag={phase.slug}
                    className="h-full"
                  />
                );
              })}
            </div>
          </div>
        </Section>

        {/* How It Works Section */}
        {stepsContent.items.length > 0 && (
          <HowItWorks
            title={stepsContent.title}
            subtitle={stepsContent.subtitle}
            steps={stepsContent.items}
          />
        )}

        {/* Featured For Your Phase Section */}
        <Section variant="alt" className="py-20">
          <FeaturedForPhase
            title={featuredContent.title}
            subtitle={featuredContent.subtitle}
          />
        </Section>

        {/* Newsletter CTA Section */}
        <Section className="py-20">
          <Card className="shadow-smooth-lg border-2 border-primary-blue/20 max-w-4xl mx-auto">
            <CardContent className="p-12 text-center space-y-6">
              <Target className="h-16 w-16 text-primary-blue mx-auto" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold">{newsletterContent.title}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {newsletterContent.body}
              </p>
              <p className="text-sm text-muted-foreground pt-2 pb-4">
                We'll send tips tailored to your current phase. You can update your phase anytime by retaking the assessment.
              </p>
              <Link to="/newsletter">
                <Button size="lg" className="text-lg px-8 h-14">
                  Subscribe to Newsletter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Section>

        {/* Assessment CTA Section */}
        <Section variant="alt" className="py-20">
          <Card className="shadow-smooth-lg border-2 border-primary-blue/20">
            <CardContent className="p-12 text-center space-y-6">
              <Rocket className="h-16 w-16 text-primary-blue mx-auto" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Ready to Accelerate Your Growth?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto pb-4">
                Take our free assessment to discover exactly where you are and what you need next
              </p>
              <Link to="/assessment">
                <Button size="lg" className="gradient-hero text-lg px-8 h-14">
                  Start Your Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
