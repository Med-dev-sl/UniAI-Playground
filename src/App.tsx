import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import OAuthConsent from './pages/OAuthConsent';
import { AuthProvider } from "@/hooks/useAuth";
import { CourseProvider } from "@/contexts/CourseContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import AppDownloadModal from "@/components/AppDownloadModal";
import { DesktopControls } from "@/components/DesktopControls";

const queryClient = new QueryClient();
// OAuth providers need real paths; native app navigation retains hash routing.
const AppRouter = ['/auth', '/.lovable/oauth/consent'].includes(window.location.pathname) ? BrowserRouter : HashRouter;

// Add class to body if in Electron
if (window.navigator.userAgent.indexOf('Electron') !== -1) {
  document.documentElement.classList.add('is-electron');
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CourseProvider>
        <TooltipProvider>
          <DesktopControls />
          <Toaster />
          <Sonner />
          <AppDownloadModal />
          <AppRouter>
            <div className="electron-padding w-full h-full min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AppRouter>
        </TooltipProvider>
      </CourseProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
