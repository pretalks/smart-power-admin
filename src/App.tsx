import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Shop = lazy(() => import("./pages/Shop"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const KitItemDetail = lazy(() => import("./pages/KitItemDetail"));
const GovtSubsidy = lazy(() => import("./pages/GovtSubsidy"));
const SubsidyDetail = lazy(() => import("./pages/SubsidyDetail"));
const AMCService = lazy(() => import("./pages/AMCService"));
const AMCDetail = lazy(() => import("./pages/AMCDetail"));
const Contact = lazy(() => import("./pages/Contact"));

import { AuthProvider } from "./contexts/AuthContext";
import { SiteProvider } from "./contexts/SiteContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const GlobalSettings = lazy(() => import("./pages/admin/GlobalSettings"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const SubsidyStates = lazy(() => import("./pages/admin/SubsidyStates"));
const AdminReviews = lazy(() => import("./pages/admin/AdminReviews"));
const HomepageControl = lazy(() => import("./pages/admin/HomepageControl"));

const queryClient = new QueryClient();

const Loader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SiteProvider>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:slug" element={<ServiceDetail />} />
                <Route path="/shop/installation-kit/:slug" element={<KitItemDetail />} />
                <Route path="/govt-subsidy" element={<GovtSubsidy />} />
                <Route path="/govt-subsidy/:slug" element={<SubsidyDetail />} />
                <Route path="/amc-service" element={<AMCService />} />
                <Route path="/amc-service/:slug" element={<AMCDetail />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/global-settings" element={<GlobalSettings />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/subsidy" element={<SubsidyStates />} />
                    <Route path="/admin/reviews" element={<AdminReviews />} />
                    <Route path="/admin/homepage" element={<HomepageControl />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </SiteProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
