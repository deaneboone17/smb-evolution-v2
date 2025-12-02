import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <>
      <SEO 
        title="Terms of Service | SMB Evolution.ai"
        description="Terms and conditions for using SMB Evolution.ai services"
      />
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: January 2025
            </p>

            <Card className="shadow-smooth mb-8">
              <CardContent className="p-8 prose prose-slate max-w-none">
                <h2 className="text-2xl font-heading font-bold mt-0">Agreement to Terms</h2>
                <p>
                  By accessing or using SMB Evolution.ai, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>

                <h2 className="text-2xl font-heading font-bold mt-8">Use of Services</h2>
                <p>
                  Our services are provided for business education and consulting purposes. You agree to:
                </p>
                <ul>
                  <li>Use services only for lawful purposes</li>
                  <li>Provide accurate information</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Not misuse or abuse our platform</li>
                </ul>

                <h2 className="text-2xl font-heading font-bold mt-8">Intellectual Property</h2>
                <p>
                  All content, features, and functionality of SMB Evolution.ai are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
                </p>

                <h2 className="text-2xl font-heading font-bold mt-8">Products and Services</h2>
                <p>
                  We reserve the right to:
                </p>
                <ul>
                  <li>Modify or discontinue services</li>
                  <li>Refuse service to anyone</li>
                  <li>Update pricing</li>
                  <li>Change product offerings</li>
                </ul>

                <h2 className="text-2xl font-heading font-bold mt-8">Limitation of Liability</h2>
                <p>
                  SMB Evolution.ai and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                </p>

                <h2 className="text-2xl font-heading font-bold mt-8">Refund Policy</h2>
                <p>
                  Refunds for products and services are handled on a case-by-case basis. Please contact us within 30 days of purchase for refund requests.
                </p>

                <h2 className="text-2xl font-heading font-bold mt-8">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of any material changes.
                </p>

                <h2 className="text-2xl font-heading font-bold mt-8">Contact Information</h2>
                <p>
                  For questions about these Terms of Service, contact us at legal@smbevolution.ai
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

export default Terms;
