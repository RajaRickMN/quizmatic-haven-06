
import React, { useState, useEffect } from 'react';
import { Flashcard as FlashcardType, Status } from '@/types';
import { Button } from '@/components/ui/button';
import { useLearning } from '@/context/LearningContext';

interface FlashcardViewProps {
  flashcards: FlashcardType[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

const FlashcardView: React.FC<FlashcardViewProps> = ({
  flashcards,
  currentIndex,
  onPrevious,
  onNext
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const { updateFlashcardStatus } = useLearning();
  
  const currentFlashcard = flashcards[currentIndex];
  
  // Reset answer visibility when changing cards
  useEffect(() => {
    setShowAnswer(false);
  }, [currentIndex]);
  
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };
  
  const handleCorrect = () => {
    updateFlashcardStatus(currentFlashcard.id, 'correct');
    onNext();
  };
  
  const handleWrong = () => {
    updateFlashcardStatus(currentFlashcard.id, 'wrong');
    onNext();
  };
  
  if (!currentFlashcard) {
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-accent/50 rounded-lg">
        <p className="text-muted-foreground">No flashcards available</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <div className="bg-[#2a2a2a] text-white rounded-lg p-8 min-h-[300px] flex flex-col">
        {/* Question display */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <h2 className="text-2xl font-medium text-center">
            {currentFlashcard.question}
          </h2>
        </div>
        
        {/* Controls */}
        <div className="space-y-4">
          {!showAnswer ? (
            <Button 
              onClick={handleShowAnswer}
              className="w-full bg-[#25b3a7] hover:bg-[#1e968c] text-white"
            >
              Show Answer (Space)
            </Button>
          ) : (
            <div className="bg-[#222] p-4 rounded-md mb-4">
              <p className="text-lg">{currentFlashcard.answer}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="bg-[#25b3a7] hover:bg-[#1e968c] text-white"
            >
              Previous
            </Button>
            <Button
              onClick={onNext}
              disabled={currentIndex === flashcards.length - 1}
              className="bg-[#25b3a7] hover:bg-[#1e968c] text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      
      {/* Navigation progress */}
      <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
        <div>Card {currentIndex + 1} of {flashcards.length}</div>
        <div className="w-3/4 bg-secondary h-1 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full" 
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardView;
