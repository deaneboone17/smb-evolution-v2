import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PhaseProvider } from "@/contexts/PhaseContext";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import AssessmentResults from "./pages/AssessmentResults";
import AssessmentWizard from "./pages/AssessmentWizard";
import AssessmentResult from "./pages/AssessmentResult";
import AdminAssessments from "./pages/AdminAssessments";
import Login from "./pages/Login";
import SolutionsList from "./pages/SolutionsList";
import SolutionDetail from "./pages/SolutionDetail";
import ProductsList from "./pages/ProductsList";
import AppsList from "./pages/AppsList";
import ResourcesList from "./pages/ResourcesList";
import NewsletterList from "./pages/NewsletterList";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import SparkPlaybook from "./pages/playbooks/SparkPlaybook";
import MomentumPlaybook from "./pages/playbooks/MomentumPlaybook";
import MasteryPlaybook from "./pages/playbooks/MasteryPlaybook";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PhaseProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assessment/wizard" element={<AssessmentWizard />} />
              <Route path="/assessment/results/:resultSlug" element={<AssessmentResult />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/assessments" element={<AdminAssessments />} />
              <Route path="/solutions" element={<SolutionsList />} />
              <Route path="/solutions/:slug" element={<SolutionDetail />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/apps" element={<AppsList />} />
              <Route path="/resources" element={<ResourcesList />} />
              <Route path="/newsletter" element={<NewsletterList />} />
              <Route path="/playbooks/spark" element={<SparkPlaybook />} />
              <Route path="/playbooks/momentum" element={<MomentumPlaybook />} />
              <Route path="/playbooks/mastery" element={<MasteryPlaybook />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PhaseProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
