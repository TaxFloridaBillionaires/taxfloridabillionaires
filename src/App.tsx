import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { NavPanel, NavTrigger } from "@/components/NavPanel";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Endorsements from "./pages/Endorsements";
import Press from "./pages/Press";
import RichestPeople from "./pages/RichestPeople";
import NotFound from "./pages/NotFound";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};


const queryClient = new QueryClient();

const App = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavTrigger onOpen={() => setNavOpen(true)} />
          <NavPanel isOpen={navOpen} onClose={() => setNavOpen(false)} />

          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/endorsements" element={<Endorsements />} />
            <Route path="/press" element={<Press />} />
            <Route path="/richest-person-in-florida" element={<RichestPeople />} />
            <Route path="/billionaires-list" element={<RichestPeople variant="top26" showReasons={false} />} />
            <Route path="/admin" element={<Admin />} />


            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
