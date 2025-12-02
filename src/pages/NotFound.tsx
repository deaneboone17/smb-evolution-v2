import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("Dev only - 404:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1B1B3A]">
      <div className="text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-heading font-bold text-white">404 - Lost in the Void.</h1>
        <p className="text-xl md:text-2xl text-gray-300">It looks like you ventured too far. Let's get you back on track.</p>
        <Link to="/">
          <Button size="lg" className="mt-4 gradient-hero">
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
