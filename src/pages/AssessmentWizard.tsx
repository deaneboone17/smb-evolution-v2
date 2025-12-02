import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AssessmentWizard } from '@/components/AssessmentWizard';
import { useAssessmentConfig } from '@/hooks/useAssessmentConfig';
import { Skeleton } from '@/components/ui/skeleton';
import { GeometricBackground } from "@/components/ui/GeometricBackground";

const AssessmentWizardPage = () => {
  const navigate = useNavigate();
  const { config, loading, error } = useAssessmentConfig('ai-readiness');

  const handleComplete = (resultSlug: string, submissionId: string) => {
    navigate(`/assessment/results/${resultSlug}?sid=${submissionId}`, {
      state: { result: resultSlug }
    });
  };

  if (loading) {
    return (
      <>
        <SEO title="Assessment Loading | SMB Evolution.ai" />
        <Header />
        <GeometricBackground>
          <div className="container mx-auto max-w-3xl space-y-4 py-12 px-4">
            <Skeleton className="h-12 w-full bg-white/10" />
            <Skeleton className="h-64 w-full bg-white/10" />
          </div>
        </GeometricBackground>
        <Footer />
      </>
    );
  }

  if (error || !config) {
    return (
      <>
        <SEO title="Assessment Not Found | SMB Evolution.ai" />
        <Header />
        <GeometricBackground>
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-heading font-bold text-white">Assessment Not Available</h1>
              <p className="text-gray-300">The assessment you're looking for couldn't be loaded.</p>
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        </GeometricBackground>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${config.title} | SMB Evolution.ai`}
        description={config.description}
      />
      <Header />
      <GeometricBackground>
        <AssessmentWizard config={config} onComplete={handleComplete} />
      </GeometricBackground>
      <Footer />
    </>
  );
};

export default AssessmentWizardPage;
