import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Solution = Database['public']['Tables']['solutions']['Row'];
type App = Database['public']['Tables']['apps']['Row'];
type Resource = Database['public']['Tables']['resources']['Row'];

interface FeaturedForPhaseProps {
  title: string;
  subtitle?: string;
}

export const FeaturedForPhase = ({ title, subtitle }: FeaturedForPhaseProps) => {
  const [currentPhase, setCurrentPhase] = useState<string>('spark');
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get phase from localStorage or default to spark
    const storedPhase = localStorage.getItem('assessmentPhase');
    if (storedPhase && ['spark', 'momentum', 'mastery'].includes(storedPhase)) {
      setCurrentPhase(storedPhase);
    }
  }, []);

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      setLoading(true);
      
      // Get phase_id for the current phase
      const { data: phase } = await supabase
        .from('phases')
        .select('id')
        .eq('slug', currentPhase)
        .single();

      if (!phase) {
        setLoading(false);
        return;
      }

      // Fetch solutions, apps, and resources for this phase (limit to 2 each for featured)
      const [solutionsRes, appsRes, resourcesRes] = await Promise.all([
        supabase
          .from('solutions')
          .select('*')
          .eq('published', true)
          .eq('phase_id', phase.id)
          .limit(2),
        supabase
          .from('apps')
          .select('*')
          .eq('published', true)
          .eq('phase_id', phase.id)
          .limit(2),
        supabase
          .from('resources')
          .select('*')
          .eq('published', true)
          .eq('phase_id', phase.id)
          .limit(2)
      ]);

      setSolutions(solutionsRes.data || []);
      setApps(appsRes.data || []);
      setResources(resourcesRes.data || []);
      setLoading(false);
    };

    fetchFeaturedContent();
  }, [currentPhase]);

  const allItems = [
    ...solutions.map(s => ({ type: 'Solution', title: s.name, description: s.problem, href: `/solutions/${s.slug}` })),
    ...apps.map(a => ({ type: 'App', title: a.name, description: a.oneliner, href: `/apps/${a.slug}` })),
    ...resources.map(r => ({ type: 'Resource', title: r.title, description: r.summary, href: `/resources/${r.slug}` }))
  ];

  if (loading) {
    return (
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading recommendations...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {allItems.length === 0 ? (
          <Card className="max-w-2xl mx-auto shadow-smooth">
            <CardContent className="p-12 text-center space-y-4">
              <p className="text-muted-foreground">
                We're building phase-specific recommendations for you.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/solutions">
                  <Button>Explore All Solutions</Button>
                </Link>
                <Link to="/assessment">
                  <Button variant="outline">Retake Assessment</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {allItems.slice(0, 6).map((item, index) => (
              <Card key={index} className="shadow-smooth hover:shadow-smooth-lg transition-smooth">
                <CardContent className="p-6 space-y-4">
                  <Badge variant="secondary">{item.type}</Badge>
                  <h3 className="text-xl font-heading font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {item.description}
                  </p>
                  <Link to={item.href}>
                    <Button variant="outline" className="w-full">
                      Learn More
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
  );
};
