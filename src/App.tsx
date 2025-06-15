
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import QuizSelection from "./pages/QuizSelection";
import ExamSelection from "./pages/ExamSelection";
import Quiz from "./pages/Quiz";
import Exam from "./pages/Exam";
import QuizResults from "./pages/QuizResults";
import Subscription from "./pages/Subscription";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/quiz-selection" element={<QuizSelection />} />
            <Route path="/exam-selection" element={<ExamSelection />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/exam/:id" element={<Exam />} />
            <Route path="/quiz-results" element={<QuizResults />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
