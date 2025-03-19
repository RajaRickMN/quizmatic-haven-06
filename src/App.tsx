
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LearningProvider } from "./context/LearningContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Flashcards from "./pages/Flashcards";
import MCQ from "./pages/MCQ";
import Tests from "./pages/Tests";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LearningProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/mcq" element={<MCQ />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LearningProvider>
  </QueryClientProvider>
);

export default App;
