
import React, { useState, useEffect } from 'react';
import { Flashcard as FlashcardType, Status } from '@/types';
import Card from '@/components/ui-custom/Card';
import StatusBadge from '@/components/ui-custom/StatusBadge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check, X, Edit } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { cn } from '@/lib/utils';

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
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [answer, setAnswer] = useState('');
  const { updateFlashcardStatus } = useLearning();
  
  const currentFlashcard = flashcards[currentIndex];
  
  // Reset flip and edit state when changing cards
  useEffect(() => {
    setIsFlipped(false);
    setIsEditMode(false);
    setAnswer('');
  }, [currentIndex]);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (isFlipped) {
      setIsEditMode(false);
    }
  };
  
  const handleEdit = () => {
    setIsEditMode(true);
    setAnswer(currentFlashcard.answer);
  };
  
  const handleStatusUpdate = (status: Status) => {
    updateFlashcardStatus(currentFlashcard.id, status);
    onNext();
  };
  
  if (!currentFlashcard) {
    return (
      <Card className="min-h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">No flashcards available</p>
      </Card>
    );
  }
  
  return (
    <div className="mt-6 relative">
      <div className={cn(
        "relative w-full min-h-[400px] flashcard",
        isFlipped && "flipped"
      )}>
        {/* Front side (Question) */}
        <div className="flashcard-front w-full h-full">
          <Card className="h-full flex flex-col">
            <div className="absolute top-4 right-4">
              <StatusBadge status={currentFlashcard.status} />
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-medium text-muted-foreground">
                {currentFlashcard.subject} ❯ {currentFlashcard.topic}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentIndex + 1} / {flashcards.length}
              </p>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <h3 className="text-2xl font-medium text-center">
                {currentFlashcard.question}
              </h3>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button onClick={handleFlip} className="w-full">
                Show Answer
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Back side (Answer) */}
        <div className="flashcard-back w-full h-full">
          <Card className="h-full flex flex-col">
            <div className="absolute top-4 right-4">
              <StatusBadge status={currentFlashcard.status} />
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-medium text-muted-foreground">
                {currentFlashcard.subject} ❯ {currentFlashcard.topic}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentIndex + 1} / {flashcards.length}
              </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <h4 className="text-lg font-medium mb-3 text-muted-foreground">Answer:</h4>
              
              {isEditMode ? (
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full h-32 p-4 rounded-md bg-background border focus:ring-2 focus:ring-primary focus:outline-none"
                />
              ) : (
                <h3 className="text-2xl font-medium text-center">
                  {currentFlashcard.answer}
                </h3>
              )}
              
              {!isEditMode && (
                <Button 
                  onClick={handleEdit} 
                  variant="outline" 
                  size="icon"
                  className="absolute top-0 right-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button 
                onClick={handleFlip} 
                variant="outline"
              >
                Back
              </Button>
              <Button 
                onClick={() => handleStatusUpdate('wrong')} 
                variant="destructive"
              >
                <X className="h-4 w-4 mr-2" />
                Wrong
              </Button>
              <Button 
                onClick={() => handleStatusUpdate('correct')} 
                variant="default"
                className="bg-correct hover:bg-correct/90"
              >
                <Check className="h-4 w-4 mr-2" />
                Correct
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <Button 
          onClick={onPrevious} 
          variant="outline" 
          size="icon"
          disabled={currentIndex === 0}
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          onClick={onNext} 
          variant="outline" 
          size="icon"
          disabled={currentIndex === flashcards.length - 1}
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FlashcardView;
