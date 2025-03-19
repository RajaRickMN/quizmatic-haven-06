
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import FilterSidebar from '@/components/layout/FilterSidebar';
import FlashcardView from '@/components/flashcards/FlashcardView';
import { useLearning } from '@/context/LearningContext';
import { Flashcard } from '@/types';

const Flashcards = () => {
  const { flashcards, filterOptions } = useLearning();
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Apply filters
  useEffect(() => {
    let result = [...flashcards];
    
    // Filter by subject
    if (filterOptions.subject !== 'all') {
      result = result.filter(card => card.subject === filterOptions.subject);
    }
    
    // Filter by topic
    if (filterOptions.topic !== 'all') {
      result = result.filter(card => card.topic === filterOptions.topic);
    }
    
    // Filter by status
    if (filterOptions.status !== 'all') {
      result = result.filter(card => card.status === filterOptions.status);
    }
    
    setFilteredFlashcards(result);
    setCurrentIndex(0); // Reset to first card when filters change
  }, [flashcards, filterOptions]);
  
  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(filteredFlashcards.length - 1, prev + 1));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <div className="flex-1 flex">
        <FilterSidebar moduleType="flashcards" />
        
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Flashcards</h1>
            
            {filteredFlashcards.length === 0 ? (
              <div className="text-center p-10 bg-accent/50 rounded-lg">
                <p className="text-muted-foreground">No flashcards match your current filters</p>
              </div>
            ) : (
              <FlashcardView
                flashcards={filteredFlashcards}
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

export default Flashcards;
