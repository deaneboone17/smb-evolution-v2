import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Lightbulb, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <>
      <SEO
        title="About Us | SMB Evolution.ai"
        description="Building the AI-Native Enterprise. We help business owners cross the chasm from Observer to Achiever."
      />
      <Header />
      <main className="min-h-screen bg-[#1B1B3A]">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">

            {/* Headline */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-white">
                Building the AI-Native Enterprise.
              </h1>
            </div>

            {/* Section 1: The Great Bifurcation */}
            <Card className="shadow-smooth-lg mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-white mb-4">The Great Bifurcation</h2>
                <p className="text-lg text-gray-300 font-inter leading-relaxed">
                  The economy is splitting in two. According to <span className="font-semibold text-white">McKinsey’s State of AI 2025 report</span>, while <span className="font-semibold text-white">78%</span> of organizations have adopted AI, only <span className="font-semibold text-white">6%</span> qualify as High Performers—those attributing significant earnings to their AI integration.
                </p>
                <p className="text-lg text-gray-300 font-inter leading-relaxed">
                  The vast majority are Observers—paralyzed by the velocity of <span className="font-semibold text-white">5,000 new tools</span> appearing weekly. The remaining 6% are Achievers who have recognized AI not as a tool, but as a new operating system for the enterprise.
                </p>
              </CardContent>
            </Card>

            {/* Section 2: Our Philosophy */}
            <Card className="shadow-smooth-lg mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-white mb-4">Our Philosophy</h2>
                <p className="text-lg text-gray-300 font-inter leading-relaxed">
                  We reject the "revolutionary" approach of tearing down existing business processes. We believe in Evolution.
                </p>
                <p className="text-lg text-gray-300 font-inter leading-relaxed">
                  We help business owners cross the chasm by weaving intelligence into the fabric of daily workflows—starting with a Spark of quick wins, building Momentum through connected systems, and achieving Mastery via autonomous agents.
                </p>
              </CardContent>
            </Card>

            {/* Section 3: The Architect */}
            <Card className="shadow-smooth-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-white mb-6">The Architect</h2>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-montserrat font-bold text-white mb-1">Deane Boone</h3>
                    <p className="text-[#1C77C3] font-medium mb-4">Founder & Lead Architect</p>
                    <p className="text-lg text-gray-300 font-inter leading-relaxed">
                      Deane is a strategic architect focused on the transition to the autonomous enterprise. He builds the systems that scale human capability, moving SMBs from "Random Acts of AI" to engineered, data-driven growth.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
