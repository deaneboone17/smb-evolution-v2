import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy | SMB Evolution.ai"
        description="Our commitment to protecting your privacy and data"
      />
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: January 2025
            </p>

            <Card className="shadow-smooth mb-8">
              <CardContent className="p-8 prose prose-slate max-w-none">
                <h2 className="text-2xl font-heading font-bold mt-0">Introduction</h2>
                <p>
                  At SMB Evolution.ai, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>

                <h2 className="text-2xl font-heading font-bold mt-8">Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, including:
                </p>
                <ul>
                  <li>Name and contact information</li>
                  <li>Business information</li>
                  <li>Email address for newsletter subscriptions</li>
                  <li>Assessment responses and results</li>
                  <li>Payment information for products and services</li>
                </ul>

                <h2 className="text-2xl font-heading font-bold mt-8">How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Provide and improve our services</li>
                  <li>Send you newsletters and marketing communications</li>
                  <li>Process transactions</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Analyze usage patterns to improve our platform</li>
                </ul>

                <h2 className="text-2xl font-heading font-bold mt-8">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2 className="text-2xl font-heading font-bold mt-8">Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul>
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>

                <h2 className="text-2xl font-heading font-bold mt-8">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at privacy@smbevolution.ai
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;
