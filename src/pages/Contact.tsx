import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Us | SMB Evolution.ai"
        description="Get in touch with our team for personalized business guidance"
      />
      <Header />
      <main className="min-h-screen bg-[#1B1B3A]">
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">Get In Touch</h1>
              <p className="text-xl text-gray-300">Ready to accelerate your business evolution? Let's talk.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Contact Form */}
              <Card className="shadow-smooth-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl h-fit">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-heading font-bold mb-6 text-white">Send us a message</h2>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Name</Label>
                      <Input id="name" placeholder="Your name" className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:ring-[#1C77C3]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:ring-[#1C77C3]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-300">Company</Label>
                      <Input id="company" placeholder="Your company name" className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:ring-[#1C77C3]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your business and how we can help..."
                        rows={5}
                        className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:ring-[#1C77C3]"
                      />
                    </div>
                    <Button type="submit" className="w-full gradient-hero">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Right Column: Info Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
                <Card className="shadow-smooth bg-white/5 border border-white/10 rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start space-y-3">
                      <Mail className="h-6 w-6 text-[#1C77C3]" />
                      <div>
                        <h3 className="font-montserrat font-bold text-lg text-white mb-1">Email</h3>
                        <a
                          href="mailto:hello@smbevolution.ai"
                          className="font-inter text-sm text-gray-300 hover:text-[#1C77C3] transition-colors break-all"
                        >
                          deane.boone@smbevolution.ai
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-smooth bg-white/5 border border-white/10 rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start space-y-3">
                      <Phone className="h-6 w-6 text-[#1C77C3]" />
                      <div>
                        <h3 className="font-montserrat font-bold text-lg text-white mb-1">Phone</h3>
                        <a
                          href="https://calendly.com/deane-boone-smbevolution/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-inter text-sm text-[#1C77C3] hover:underline"
                        >
                          Schedule a call through our calendar
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-smooth bg-white/5 border border-white/10 rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start space-y-3">
                      <MapPin className="h-6 w-6 text-[#1C77C3]" />
                      <div>
                        <h3 className="font-montserrat font-bold text-lg text-white mb-1">Location</h3>
                        <p className="font-inter text-sm text-gray-300">Global / Remote</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-smooth bg-white/5 border border-white/10 rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start space-y-3">
                      <div className="h-6 w-6 flex items-center justify-center">
                        <span className="text-[#1C77C3] font-bold text-lg">🕒</span>
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-lg text-white mb-1">Hours</h3>
                        <div className="font-inter text-sm text-gray-300 space-y-1">
                          <p>Mon-Fri: 9am - 6pm EST</p>
                          <p>Sat-Sun: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
