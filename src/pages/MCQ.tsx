
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import FilterSidebar from '@/components/layout/FilterSidebar';
import MCQView from '@/components/mcq/MCQView';
import { useLearning } from '@/context/LearningContext';
import { MCQ as MCQType } from '@/types';

const MCQ = () => {
  const { mcqs, filterOptions } = useLearning();
  const [filteredMCQs, setFilteredMCQs] = useState<MCQType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Apply filters
  useEffect(() => {
    let result = [...mcqs];
    
    // Filter by subject
    if (filterOptions.subject !== 'all') {
      result = result.filter(mcq => mcq.subject === filterOptions.subject);
    }
    
    // Filter by topic
    if (filterOptions.topic !== 'all') {
      result = result.filter(mcq => mcq.topic === filterOptions.topic);
    }
    
    // Filter by status
    if (filterOptions.status !== 'all') {
      result = result.filter(mcq => mcq.status === filterOptions.status);
    }
    
    setFilteredMCQs(result);
    setCurrentIndex(0); // Reset to first MCQ when filters change
  }, [mcqs, filterOptions]);
  
  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(filteredMCQs.length - 1, prev + 1));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <div className="flex-1 flex">
        <FilterSidebar moduleType="mcqs" />
        
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Multiple Choice Questions</h1>
            
            {filteredMCQs.length === 0 ? (
              <div className="text-center p-10 bg-accent/50 rounded-lg">
                <p className="text-muted-foreground">No MCQs match your current filters</p>
              </div>
            ) : (
              <MCQView
                mcqs={filteredMCQs}
                currentIndex={currentIndex}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MCQ;
