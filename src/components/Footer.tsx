import { Link } from "react-router-dom";
import { Rocket, Mail, Linkedin, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Footer = () => {
  return (
    <footer className="bg-[#1B1B3A] border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-montserrat font-bold text-xl text-white">
              <Rocket className="h-6 w-6 text-primary-blue" />
              <span>SMB Evolution.ai</span>
            </Link>
            <p className="text-sm text-[#E8EBF0]">
              Transform your business journey through strategic evolution
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="LinkedIn" className="text-[#E8EBF0] hover:text-primary-blue transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-[#E8EBF0] hover:text-primary-blue transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:hello@smbevolution.ai" aria-label="Email" className="text-[#E8EBF0] hover:text-primary-blue transition-smooth">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-white">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/solutions" className="text-[#E8EBF0] hover:text-white transition-smooth">Consulting Services</Link></li>
              <li><Link to="/products" className="text-[#E8EBF0] hover:text-white transition-smooth">Products</Link></li>
              <li><Link to="/apps" className="text-[#E8EBF0] hover:text-white transition-smooth">Apps</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources" className="text-[#E8EBF0] hover:text-white transition-smooth">Guides & Playbooks</Link></li>
              <li><Link to="/newsletter" className="text-[#E8EBF0] hover:text-white transition-smooth">Newsletter</Link></li>
              <li><Link to="/about" className="text-[#E8EBF0] hover:text-white transition-smooth">About Us</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-sm text-[#E8EBF0] mb-3">Get the latest insights delivered to your inbox</p>
            <form className="flex flex-col space-y-2">
              <Input type="email" placeholder="your@email.com" className="text-sm bg-white/5 border-white/10 text-white placeholder:text-white/50" />
              <Button type="submit" size="sm" className="gradient-hero">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#E8EBF0]/60">
          <p>&copy; 2025 SMB Evolution.ai. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-smooth">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-smooth">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-smooth">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
