
import React from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ModuleCard from '@/components/ui-custom/ModuleCard';
import { BookOpenText, BookCheck, FileText } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 container py-16">
        <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to LearningApp
          </h1>
          <p className="text-xl text-muted-foreground">
            Your interactive platform for flashcards, quizzes, and tests
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <ModuleCard
            title="Flashcards"
            description="Review and memorize with interactive flashcards"
            icon={<BookOpenText />}
            path="/flashcards"
            delay={300}
            moduleType="flashcards"
          />
          
          <ModuleCard
            title="Multiple Choice"
            description="Test your knowledge with multiple choice questions"
            icon={<BookCheck />}
            path="/mcq"
            delay={500}
            moduleType="mcqs"
          />
          
          <ModuleCard
            title="Tests"
            description="Challenge yourself with comprehensive tests"
            icon={<FileText />}
            path="/tests"
            delay={700}
            moduleType="tests"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
