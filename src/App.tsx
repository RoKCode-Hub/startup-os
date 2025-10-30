
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/BlogEditor";
import BlogEdit from "./pages/BlogEdit";
import Content from "./pages/Content";
import Podcast from "./pages/Podcast";
import ChatBot from "./pages/ChatBot";
import HealthCheck from "./pages/HealthCheck";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Imprint from "./pages/Imprint";
import DataPrivacy from "./pages/DataPrivacy";
import ProtectedRoute from "./components/ProtectedRoute";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CookieBanner />
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/post/:id" element={<BlogPost />} />
          <Route path="/blog/new" element={
            <ProtectedRoute>
              <BlogEditor />
            </ProtectedRoute>
          } />
          <Route path="/blog/edit/:id" element={
            <ProtectedRoute>
              <BlogEdit />
            </ProtectedRoute>
          } />
          <Route path="/content" element={<Content />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/health-check" element={<HealthCheck />} />
          <Route path="/login" element={<Login />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/data-privacy" element={<DataPrivacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
