import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link, useLocation } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MDXRenderer } from '@/components/MDXRenderer';
import { supabase } from '@/integrations/supabase/client';
import { usePhase, Phase } from '@/contexts/PhaseContext';
import { Trophy, ArrowRight, CheckCircle } from 'lucide-react';
import { GeometricBackground } from "@/components/ui/GeometricBackground";

const PHASE_CONFIG = {
  Spark: {
    themeColor: 'text-[#FF6B6B]', // Coral
    borderColor: 'border-[#FF6B6B]',
    headline: 'You are in the SPARK Phase',
    subhead: 'You have high potential but need systems. Your focus is quick wins.',
    buttonText: 'Access Spark Playbook',
    buttonLink: '/playbooks/spark'
  },
  Momentum: {
    themeColor: 'text-[#FFD166]', // Yellow
    borderColor: 'border-[#FFD166]',
    headline: 'You are in the MOMENTUM Phase',
    subhead: 'You have traction. Now you need integrated workflows.',
    buttonText: 'Access Momentum Playbook',
    buttonLink: '/playbooks/momentum'
  },
  Mastery: {
    themeColor: 'text-[#06D6A0]', // Green
    borderColor: 'border-[#06D6A0]',
    headline: 'You are in the MASTERY Phase',
    subhead: 'You are an AI-Native organization. Focus on autonomy.',
    buttonText: 'Access Mastery Playbook',
    buttonLink: '/playbooks/mastery'
  }
};

const AssessmentResult = () => {
  const { resultSlug } = useParams<{ resultSlug: string }>();
  const [searchParams] = useSearchParams();
  const { state } = useLocation();
  const submissionId = searchParams.get('sid');
  const { setPhase } = usePhase();

  const [result, setResult] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Determine the result phase (fallback to Spark if undefined)
  // Capitalize first letter for config lookup
  const resultKey = (state?.result || resultSlug || 'Spark');
  const normalizedKey = resultKey.charAt(0).toUpperCase() + resultKey.slice(1).toLowerCase();
  // Ensure we have a valid key, default to Spark
  const phaseConfig = PHASE_CONFIG[normalizedKey as keyof typeof PHASE_CONFIG] || PHASE_CONFIG.Spark;

  useEffect(() => {
    if (normalizedKey) {
      setPhase(normalizedKey.toLowerCase() as Phase);
    }
  }, [normalizedKey, setPhase]);

  useEffect(() => {
    async function fetchData() {
      if (!submissionId || !resultSlug) return;

      try {
        // Fetch submission and result via secure RPC
        const { data: rpcData, error: rpcError } = await supabase.rpc('get_assessment_result', {
          p_submission_id: submissionId,
          p_result_slug: resultSlug
        });

        if (rpcError) throw rpcError;

        if (!rpcData || rpcData.length === 0) {
          throw new Error('No data found');
        }

        const resultData = Array.isArray(rpcData) ? rpcData[0] : rpcData;
        setSubmission(resultData.submission as any);
        setResult(resultData.result as any);

        // Log view event (fire and forget - no await)
        void supabase.from('funnel_events').insert({
          submission_id: submissionId,
          event: 'result_view',
          meta: { result_slug: resultSlug }
        });
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Dev only:', error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [submissionId, resultSlug]);

  if (loading) {
    return (
      <>
        <SEO title="Loading Results | SMB Evolution.ai" />
        <Header />
        <GeometricBackground>
          <div className="container mx-auto max-w-4xl space-y-8 py-12 px-4">
            <Skeleton className="h-16 w-3/4 mx-auto bg-white/10" />
            <Skeleton className="h-64 w-full bg-white/10" />
          </div>
        </GeometricBackground>
        <Footer />
      </>
    );
  }

  if (!result || !submission) {
    return (
      <>
        <SEO title="Results Not Found | SMB Evolution.ai" />
        <Header />
        <GeometricBackground>
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-heading font-bold text-white">Results Not Found</h1>
              <p className="text-gray-300">We couldn't find your assessment results.</p>
              <Link to="/assessment">
                <Button>Take Assessment</Button>
              </Link>
            </div>
          </div>
        </GeometricBackground>
        <Footer />
      </>
    );
  }

  const mdxComponents = {
    h3: ({ children }: any) => (
      <h3 className="mt-6 mb-2 font-montserrat font-semibold text-lg text-white">
        {children}
      </h3>
    ),
    ul: ({ children }: any) => <ul className="space-y-4 my-6">{children}</ul>,
    li: ({ children }: any) => (
      <li className="flex items-start gap-3">
        <CheckCircle className={`h-6 w-6 flex-shrink-0 mt-1 ${phaseConfig.themeColor}`} />
        <div className="flex-1 space-y-1">
          {children}
        </div>
      </li>
    ),
    strong: ({ children }: any) => (
      <strong className="block font-montserrat font-bold text-white text-lg mb-1">
        {children}
      </strong>
    ),
    p: ({ children }: any) => (
      <div className="text-sm text-gray-300 font-inter leading-relaxed mb-6">
        {children}
      </div>
    ),
  };

  return (
    <>
      <SEO
        title={`${phaseConfig.headline} | SMB Evolution.ai`}
        description={phaseConfig.subhead}
      />
      <Header />
      <GeometricBackground>
        <div className="container mx-auto max-w-4xl space-y-8 relative z-10 py-12 px-4">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <Trophy className={`h-16 w-16 mx-auto ${phaseConfig.themeColor}`} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white">
              {phaseConfig.headline}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {phaseConfig.subhead}
            </p>
          </div>

          {/* Score Card */}
          {submission && (
            <Card className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl overflow-hidden relative ${phaseConfig.borderColor} border-t-4`}>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Your Score</p>
                    <p className={`text-5xl font-montserrat font-bold ${phaseConfig.themeColor}`}>
                      {submission.score}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Segment</p>
                    <p className="text-2xl font-montserrat font-semibold capitalize text-white">
                      {submission.segment}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Assessment Date</p>
                    <p className="text-lg text-white">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Results */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
            <CardContent className="p-8 text-white">
              <h2 className="text-2xl font-montserrat font-bold mb-6 text-white">Detailed Insights</h2>
              <div className="prose prose-lg max-w-none prose-invert [&>div:last-child]:italic [&>div:last-child]:text-gray-400 [&>div:last-child]:text-sm [&>div:last-child]:mt-6 [&>div:last-child]:mb-0">
                <MDXRenderer content={result.body_md || ''} components={mdxComponents} />
              </div>
            </CardContent>
          </Card>

          {/* Breakdown */}
          {submission && submission.breakdown && (
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-white">Score Breakdown</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(submission.breakdown as Record<string, number>).map(([key, value]) => (
                    <div key={key} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-sm text-gray-400 capitalize mb-1">{key}</p>
                      <p className="text-2xl font-bold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Card className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl text-center ${phaseConfig.borderColor} border-t-2`}>
            <CardContent className="py-12">
              <p className="text-xl mb-6 text-white">Ready to take the next step?</p>
              <Link to={phaseConfig.buttonLink}>
                <Button size="lg" className="rounded-full bg-gradient-to-r from-[#1C77C3] to-[#06D6A0] text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-none text-lg px-8 h-14">
                  {phaseConfig.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </GeometricBackground>
      <Footer />
    </>
  );
};

export default AssessmentResult;
