
import React, { useState, useEffect } from 'react';
import { MCQ as MCQType, Status } from '@/types';
import Card from '@/components/ui-custom/Card';
import StatusBadge from '@/components/ui-custom/StatusBadge';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { cn } from '@/lib/utils';

interface MCQViewProps {
  mcqs: MCQType[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

const MCQView: React.FC<MCQViewProps> = ({
  mcqs,
  currentIndex,
  onPrevious,
  onNext
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { updateMCQStatus } = useLearning();
  
  const currentMCQ = mcqs[currentIndex];
  
  // Reset state when changing MCQs
  useEffect(() => {
    setSelectedOption(null);
    setHasSubmitted(false);
  }, [currentIndex]);
  
  const handleOptionChange = (value: string) => {
    if (!hasSubmitted) {
      setSelectedOption(value);
    }
  };
  
  const handleSubmit = () => {
    if (!selectedOption || hasSubmitted) return;
    
    setHasSubmitted(true);
    const isCorrect = selectedOption === currentMCQ.key;
    const status: Status = isCorrect ? 'correct' : 'wrong';
    updateMCQStatus(currentMCQ.id, status);
  };
  
  const getOptionClasses = (option: string) => {
    if (!hasSubmitted) return '';
    
    if (option === currentMCQ.key) {
      return 'bg-correct/20 border-correct/30';
    }
    
    if (option === selectedOption && option !== currentMCQ.key) {
      return 'bg-wrong/20 border-wrong/30';
    }
    
    return '';
  };
  
  if (!currentMCQ) {
    return (
      <Card className="min-h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">No MCQs available</p>
      </Card>
    );
  }
  
  return (
    <div className="mt-6">
      <Card className="w-full min-h-[400px]">
        <div className="absolute top-4 right-4">
          <StatusBadge status={currentMCQ.status} />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-muted-foreground">
            {currentMCQ.subject} ❯ {currentMCQ.topic}
          </p>
          <p className="text-sm text-muted-foreground">
            {currentIndex + 1} / {mcqs.length}
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-6">{currentMCQ.question}</h3>
          
          <RadioGroup value={selectedOption || ""} className="space-y-3">
            {Object.entries(currentMCQ.options).map(([key, value]) => (
              <div
                key={key}
                className={cn(
                  "flex items-center space-x-2 rounded-lg border p-4 transition-all",
                  getOptionClasses(key),
                  !hasSubmitted && "hover:bg-accent hover:border-accent"
                )}
              >
                <RadioGroupItem 
                  value={key} 
                  id={`option-${key}`} 
                  disabled={hasSubmitted}
                  onClick={() => handleOptionChange(key)}
                />
                <Label 
                  htmlFor={`option-${key}`}
                  className="flex-1 cursor-pointer"
                >
                  <span className="font-medium mr-2">
                    {key.toUpperCase()}:
                  </span>
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {hasSubmitted && (
          <div className="mb-6 mt-4 p-4 bg-accent rounded-lg">
            <h4 className="font-medium mb-2">Explanation:</h4>
            <p>{currentMCQ.explanation}</p>
          </div>
        )}
        
        <div className="mt-auto">
          {!hasSubmitted ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedOption}
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              onClick={onNext} 
              className="w-full"
            >
              Next Question
            </Button>
          )}
        </div>
      </Card>
      
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
          disabled={currentIndex === mcqs.length - 1}
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MCQView;
