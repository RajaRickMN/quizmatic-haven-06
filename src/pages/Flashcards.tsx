
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import FlashcardView from '@/components/flashcards/FlashcardView';
import { useLearning } from '@/context/LearningContext';
import { Flashcard } from '@/types';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Flashcards = () => {
  const { flashcards, filterOptions, setFilterOptions, subjects } = useLearning();
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Status filters
  const [showCorrect, setShowCorrect] = useState(true);
  const [showWrong, setShowWrong] = useState(true);
  const [showUnanswered, setShowUnanswered] = useState(true);
  
  // Selected subjects
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  
  // Apply filters
  useEffect(() => {
    let result = [...flashcards];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(card => 
        card.question.toLowerCase().includes(query) || 
        card.answer.toLowerCase().includes(query)
      );
    }
    
    // Status filters
    const statusesToShow: ('correct' | 'wrong' | 'unattempted')[] = [];
    if (showCorrect) statusesToShow.push('correct');
    if (showWrong) statusesToShow.push('wrong');
    if (showUnanswered) statusesToShow.push('unattempted');
    
    if (statusesToShow.length > 0) {
      result = result.filter(card => statusesToShow.includes(card.status as any));
    }
    
    // Subject filter
    if (selectedSubjects.length > 0) {
      result = result.filter(card => selectedSubjects.includes(card.subject));
    }
    
    setFilteredFlashcards(result);
    setCurrentIndex(0); // Reset to first card when filters change
  }, [flashcards, searchQuery, showCorrect, showWrong, showUnanswered, selectedSubjects]);
  
  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(filteredFlashcards.length - 1, prev + 1));
  };
  
  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subject)) {
        return prev.filter(s => s !== subject);
      } else {
        return [...prev, subject];
      }
    });
  };
  
  // Count flashcards by status for each subject
  const getStatusCounts = (subject: string) => {
    const subjectCards = flashcards.filter(card => card.subject === subject);
    const correct = subjectCards.filter(card => card.status === 'correct').length;
    const wrong = subjectCards.filter(card => card.status === 'wrong').length;
    const unanswered = subjectCards.filter(card => card.status === 'unattempted').length;
    
    return { correct, wrong, unanswered, total: subjectCards.length };
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-72 bg-background border-r p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Flashcards</h1>
          
          {/* Card count and progress */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              Card {currentIndex + 1} of {filteredFlashcards.length}
            </p>
            <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300" 
                style={{ width: `${filteredFlashcards.length ? ((currentIndex + 1) / filteredFlashcards.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          
          {/* Search */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">Filters</h2>
            <Input
              type="search"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            
            {/* Status filters */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-correct" 
                  checked={showCorrect}
                  onCheckedChange={() => setShowCorrect(!showCorrect)}
                />
                <Label htmlFor="show-correct">Show Correct</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-wrong" 
                  checked={showWrong}
                  onCheckedChange={() => setShowWrong(!showWrong)}
                />
                <Label htmlFor="show-wrong">Show Wrong</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-unanswered" 
                  checked={showUnanswered}
                  onCheckedChange={() => setShowUnanswered(!showUnanswered)}
                />
                <Label htmlFor="show-unanswered">Show Unanswered</Label>
              </div>
            </div>
          </div>
          
          {/* Subjects */}
          <div>
            <h2 className="text-lg font-medium mb-3">Subjects</h2>
            <div className="space-y-3">
              {subjects.map(subject => {
                const counts = getStatusCounts(subject);
                return (
                  <div key={subject} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`subject-${subject}`}
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={() => toggleSubject(subject)}
                      />
                      <Label htmlFor={`subject-${subject}`} className="font-medium uppercase">
                        {subject}
                      </Label>
                    </div>
                    <div className="ml-6 text-xs text-muted-foreground">
                      <span className="text-green-500">({counts.correct}</span>/
                      <span className="text-red-500">{counts.wrong}</span>/
                      <span className="text-gray-400">{counts.unanswered})</span> {counts.total}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto animate-fade-in">
          <div className="max-w-3xl mx-auto">
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
