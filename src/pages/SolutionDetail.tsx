import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhaseChip } from "@/components/PhaseChip";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, DollarSign, Calendar } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Solution = Database['public']['Tables']['solutions']['Row'] & {
  phases?: Database['public']['Tables']['phases']['Row'];
};

const SolutionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolution = async () => {
      const { data } = await supabase
        .from('solutions')
        .select('*, phases(*)')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      setSolution(data);
      setLoading(false);
    };

    fetchSolution();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!solution) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Solution Not Found</h1>
            <Link to="/solutions">
              <Button>Back to Solutions</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const deliverables = solution.deliverables as string[] | null;

  return (
    <>
      <SEO 
        title={`${solution.name} | SMB Evolution.ai`}
        description={solution.problem || ''}
      />
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {solution.phases && (
              <PhaseChip phase={solution.phases.slug as 'spark' | 'momentum' | 'mastery'} className="mb-6" />
            )}
            
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {solution.name}
            </h1>

            {solution.tier && (
              <p className="text-xl text-primary-blue font-semibold mb-8">{solution.tier}</p>
            )}

            {solution.problem && (
              <Card className="shadow-smooth mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-heading font-bold mb-4">The Challenge</h2>
                  <p className="text-lg text-muted-foreground">{solution.problem}</p>
                </CardContent>
              </Card>
            )}

            {solution.approach && (
              <Card className="shadow-smooth mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-heading font-bold mb-4">Our Approach</h2>
                  <p className="text-lg text-muted-foreground">{solution.approach}</p>
                </CardContent>
              </Card>
            )}

            {deliverables && deliverables.length > 0 && (
              <Card className="shadow-smooth mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-heading font-bold mb-6">What You'll Receive</h2>
                  <ul className="space-y-3">
                    {deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-mastery mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-smooth-lg bg-muted">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-2">Investment</h3>
                    {(solution.price_from || solution.price_to) && (
                      <div className="flex items-center text-3xl font-bold text-primary-blue">
                        <DollarSign className="h-6 w-6" />
                        <span>
                          {solution.price_from && solution.price_to
                            ? `${solution.price_from} - ${solution.price_to}`
                            : solution.price_from
                            ? `From ${solution.price_from}`
                            : `Up to ${solution.price_to}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Link to="/contact">
                  <Button size="lg" className="w-full gradient-hero">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book a Consultation
                  </Button>
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

export default SolutionDetail;
