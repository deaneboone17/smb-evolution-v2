import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhaseChip } from "@/components/PhaseChip";
import { ArrowRight, BookOpen, Calendar, MessageCircle } from "lucide-react";

const AssessmentResults = () => {
  const { segment } = useParams<{ segment: 'low' | 'mid' | 'high' }>();
  
  const resultConfig = {
    low: {
      phase: 'spark' as const,
      title: 'You\'re in the Spark Phase',
      description: 'Focus on building your foundation and validating your core offering',
      recommendations: [
        'Establish core business processes',
        'Define your unique value proposition',
        'Build minimum viable systems',
        'Focus on early customer feedback'
      ],
      cta: {
        primary: { label: 'Explore Spark Resources', href: '/resources?phase=spark' },
        secondary: { label: 'Book Consultation', href: '/contact' }
      }
    },
    mid: {
      phase: 'momentum' as const,
      title: 'You\'re Building Momentum',
      description: 'Ready to scale operations and expand your market presence',
      recommendations: [
        'Optimize existing processes',
        'Build your team strategically',
        'Implement growth systems',
        'Expand customer acquisition'
      ],
      cta: {
        primary: { label: 'Join Our Webinar', href: '/events' },
        secondary: { label: 'View Growth Course', href: '/products' }
      }
    },
    high: {
      phase: 'mastery' as const,
      title: 'You\'re Approaching Mastery',
      description: 'Focus on leadership, innovation, and sustainable excellence',
      recommendations: [
        'Establish market leadership position',
        'Innovate within your industry',
        'Build systematic excellence',
        'Create scalable impact'
      ],
      cta: {
        primary: { label: 'Schedule Strategy Call', href: '/contact' },
        secondary: { label: 'Executive Resources', href: '/resources?phase=mastery' }
      }
    }
  };

  const config = resultConfig[segment || 'low'];

  return (
    <>
      <SEO 
        title={`Assessment Results: ${config.title} | SMB Evolution.ai`}
        description={config.description}
      />
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <PhaseChip phase={config.phase} className="mb-6" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {config.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {config.description}
              </p>
            </div>

            <Card className="shadow-smooth-lg mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-heading font-bold mb-6">Your Priority Actions</h2>
                <ul className="space-y-4">
                  {config.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-blue text-primary-foreground flex items-center justify-center font-bold mr-3">
                        {idx + 1}
                      </span>
                      <span className="text-base pt-1">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="shadow-smooth hover:shadow-smooth-lg transition-smooth">
                <CardContent className="p-6">
                  <BookOpen className="h-10 w-10 text-primary-blue mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-2">Curated Resources</h3>
                  <p className="text-muted-foreground mb-4">
                    Access guides and playbooks designed for your phase
                  </p>
                  <Link to={config.cta.primary.href}>
                    <Button className="w-full">
                      {config.cta.primary.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="shadow-smooth hover:shadow-smooth-lg transition-smooth">
                <CardContent className="p-6">
                  <MessageCircle className="h-10 w-10 text-primary-blue mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-2">Expert Guidance</h3>
                  <p className="text-muted-foreground mb-4">
                    Get personalized support from our team
                  </p>
                  <Link to={config.cta.secondary.href}>
                    <Button variant="outline" className="w-full">
                      {config.cta.secondary.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-smooth bg-muted">
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-primary-blue mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold mb-2">Want More Insights?</h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter for weekly tips tailored to your phase
                </p>
                <Link to="/newsletter">
                  <Button variant="secondary">Subscribe Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AssessmentResults;
