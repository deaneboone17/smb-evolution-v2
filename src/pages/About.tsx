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
        description="Learn about our mission to empower small and medium businesses through strategic evolution"
      />
      <Header />
      <main className="min-h-screen bg-[#1B1B3A]">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
                About SMB Evolution.ai
              </h1>
              <p className="text-xl text-gray-300">
                Empowering businesses to evolve from startup spark to industry mastery
              </p>
            </div>

            <Card className="shadow-smooth-lg mb-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-3xl font-heading font-bold text-white">Building the AI-Native Economy.</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We believe every small and medium business has the potential to achieve extraordinary success. Our mission is to provide the strategic guidance, proven frameworks, and practical tools needed to navigate each stage of the business evolution journey.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="shadow-smooth bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <CardContent className="p-6 space-y-4">
                  <Target className="h-12 w-12 text-[#FF6B6B]" />
                  <h3 className="text-xl font-heading font-bold text-white">Our Vision</h3>
                  <p className="text-gray-300">
                    A world where every SMB reaches its full potential through strategic evolution and continuous growth.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-smooth bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <CardContent className="p-6 space-y-4">
                  <Users className="h-12 w-12 text-[#FFD166]" />
                  <h3 className="text-xl font-heading font-bold text-white">Our Approach</h3>
                  <p className="text-gray-300">
                    We combine proven business frameworks with personalized guidance tailored to your specific growth stage.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-smooth-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-heading font-bold mb-6 text-white">Core Values</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Lightbulb className="h-8 w-8 text-primary-blue mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-heading font-bold mb-2 text-white">Innovation</h3>
                      <p className="text-gray-300">
                        We continuously evolve our methodologies to incorporate the latest business insights and technologies.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <TrendingUp className="h-8 w-8 text-primary-blue mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-heading font-bold mb-2 text-white">Results-Driven</h3>
                      <p className="text-gray-300">
                        Every strategy, tool, and resource we provide is designed to deliver measurable business outcomes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Users className="h-8 w-8 text-primary-blue mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-heading font-bold mb-2 text-white">Partnership</h3>
                      <p className="text-gray-300">
                        We view ourselves as partners in your journey, invested in your long-term success.
                      </p>
                    </div>
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
