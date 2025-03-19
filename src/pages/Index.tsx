
import React from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ModuleCard from '@/components/ui-custom/ModuleCard';
import { useLearning } from '@/context/LearningContext';
import ExcelImport from '@/components/import/ExcelImport';
import { Layers, CheckCircle, Clipboard } from 'lucide-react';

const Index = () => {
  const { setCurrentModule } = useLearning();
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 p-6 lg:p-10 animate-fade-in">
        <div className="max-w-6xl mx-auto space-y-10">
          <section>
            <h1 className="text-4xl font-bold mb-6">Learning Made Simple</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your personal learning assistant for mastering any subject
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModuleCard 
                title="Flashcards" 
                description="Review concepts with interactive flashcards"
                icon={<Layers />}
                path="/flashcards"
                delay={100}
                moduleType="flashcards"
              />
              <ModuleCard 
                title="Multiple Choice" 
                description="Test your knowledge with MCQs"
                icon={<CheckCircle />}
                path="/mcq"
                delay={200}
                moduleType="mcqs"
              />
              <ModuleCard 
                title="Tests" 
                description="Complete comprehensive tests"
                icon={<Clipboard />}
                path="/tests"
                delay={300}
                moduleType="tests"
              />
            </div>
          </section>
          
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Import Your Learning Materials</h2>
            <p className="text-muted-foreground mb-6">
              Upload an Excel file named "app.xlsx" with sheets labeled "Flashcards", "MCQs", and "Tests" to import your learning materials.
            </p>
            <ExcelImport />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
