import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CheckCircle, Lock, Sparkles, ArrowRight, Clock, Target, TrendingUp } from "lucide-react";

import { GeometricBackground } from "@/components/ui/GeometricBackground";

const Assessment = () => {
  return (
    <>
      <SEO
        title="Free Business Assessment | SMB Evolution.ai"
        description="Discover your business evolution stage and get personalized recommendations for your growth journey"
      />
      <Header />
      <GeometricBackground>
        {/* Hero Section */}
        <section className="py-20 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Sparkles className="h-16 w-16 text-[#FFD166] mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-white">
              Discover Your AI Maturity Score
            </h1>
            <p className="text-xl md:text-2xl font-inter text-gray-300 mb-8 max-w-2xl mx-auto">
              Stop guessing. Get a personalized roadmap from Spark to Mastery in under 3 minutes.
            </p>
            <Link to="/assessment/wizard">
              <PrimaryButton size="lg" className="text-lg px-8 py-6">
                Get My Score
                <ArrowRight className="ml-2 h-5 w-5" />
              </PrimaryButton>
            </Link>

            {/* Value Cards - Glassmorphic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-lg">
                <CardContent className="p-6 pt-8">
                  <Clock className="h-12 w-12 text-[#FF6B6B] mx-auto mb-4" />
                  <h3 className="text-xl font-montserrat font-bold mb-2 text-white">3-Minute Audit</h3>
                  <p className="text-gray-300">
                    Only 3 minutes to complete with immediate results
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-lg">
                <CardContent className="p-6 pt-8">
                  <Target className="h-12 w-12 text-[#FFD166] mx-auto mb-4" />
                  <h3 className="text-xl font-montserrat font-bold mb-2 text-white">Phase Diagnosis</h3>
                  <p className="text-gray-300">
                    Get tailored recommendations based on your unique situation
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-lg">
                <CardContent className="p-6 pt-8">
                  <TrendingUp className="h-12 w-12 text-[#06D6A0] mx-auto mb-4" />
                  <h3 className="text-xl font-montserrat font-bold mb-2 text-white">Instant Execution Plan</h3>
                  <p className="text-gray-300">
                    Receive clear next steps to advance your AI journey
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-12 text-white">
              What You'll Discover
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border border-white/10 shadow-smooth">
                <CardContent className="p-6">
                  <CheckCircle className="h-8 w-8 text-spark mb-3" />
                  <h3 className="text-lg font-montserrat font-bold mb-2 text-white">Your Current Phase</h3>
                  <p className="text-gray-300">
                    Understand whether you're in Spark, Momentum, or Mastery stage
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border border-white/10 shadow-smooth">
                <CardContent className="p-6">
                  <CheckCircle className="h-8 w-8 text-momentum mb-3" />
                  <h3 className="text-lg font-montserrat font-bold mb-2 text-white">Key Opportunities</h3>
                  <p className="text-gray-300">
                    Identify where AI can have the biggest impact on your business
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border border-white/10 shadow-smooth">
                <CardContent className="p-6">
                  <CheckCircle className="h-8 w-8 text-mastery mb-3" />
                  <h3 className="text-lg font-montserrat font-bold mb-2 text-white">Priority Actions</h3>
                  <p className="text-gray-300">
                    Get a clear list of next steps to advance your AI maturity
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border border-white/10 shadow-smooth">
                <CardContent className="p-6">
                  <CheckCircle className="h-8 w-8 text-primary-blue mb-3" />
                  <h3 className="text-lg font-montserrat font-bold mb-2 text-white">Resource Recommendations</h3>
                  <p className="text-gray-300">
                    Access curated tools, guides, and services for your level
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of businesses who've used our assessment to accelerate their AI journey
            </p>
            <Link to="/assessment/wizard">
              <PrimaryButton size="lg" className="text-lg px-8 py-6">
                Get My Score
                <ArrowRight className="ml-2 h-5 w-5" />
              </PrimaryButton>
            </Link>
            <p className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-4">
              <Lock className="h-4 w-4" />
              No credit card required • Results in 3 minutes • 100% Free
            </p>
          </div>
        </section>
      </GeometricBackground>
      <Footer />
    </>
  );
};

export default Assessment;
