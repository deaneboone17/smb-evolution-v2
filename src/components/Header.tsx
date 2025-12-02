import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Rocket } from "lucide-react";
import { useState } from "react";
import { usePhase } from "@/contexts/PhaseContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { activePhase } = usePhase();

  const navLinks = [
    { label: "Solutions", href: "/solutions" },
    { label: "Products", href: "/products" },
    { label: "Apps", href: "/apps" },
    { label: "Resources", href: "/resources" },
    { label: "Newsletter", href: "/newsletter" },
  ];

  const isActive = (href: string) => location.pathname === href;

  const getPhaseBadgeStyles = (phase: string) => {
    switch (phase) {
      case 'spark':
        return 'bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]';
      case 'momentum':
        return 'bg-[#FFD166]/20 text-[#FFD166] border-[#FFD166]';
      case 'mastery':
        return 'bg-[#06D6A0]/20 text-[#06D6A0] border-[#06D6A0]';
      default:
        return '';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1B1B3A]/90 backdrop-blur-md supports-[backdrop-filter]:bg-[#1B1B3A]/90">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2 font-montserrat font-bold text-xl text-white">
            <Rocket className="h-6 w-6 text-primary-blue" />
            <span>SMB Evolution.ai</span>
          </Link>

          {activePhase && activePhase !== 'all' && (
            <Link to={`/assessment/results/${activePhase}`}>
              <span className={`hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPhaseBadgeStyles(activePhase)} hover:opacity-80 transition-opacity cursor-pointer`}>
                {activePhase.charAt(0).toUpperCase() + activePhase.slice(1)} Mode
              </span>
            </Link>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-smooth relative ${isActive(link.href)
                ? "text-white"
                : "text-white/80 hover:text-white"
                }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-blue rounded-full" />
              )}
            </Link>
          ))}
          <Link to="/assessment">
            <Button variant="default" className="rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD166] text-white hover:scale-105 transition-transform duration-200 border-none">
              Take Assessment
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white hover:text-[#1C77C3] transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-[#1B1B3A]/95 backdrop-blur-xl border-b border-white/10 md:hidden shadow-xl">
            <div className="container mx-auto px-4 py-6 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-colors py-4 border-b border-white/5 last:border-0 ${isActive(link.href)
                    ? "text-[#1C77C3]"
                    : "text-gray-300 hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 pb-2">
                <Link to="/assessment" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" className="w-full h-12 text-base font-bold rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD166] text-white hover:scale-[1.02] transition-transform duration-200 border-none shadow-lg">
                    Take Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
