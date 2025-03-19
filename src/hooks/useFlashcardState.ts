
import { useState, useEffect } from 'react';
import { Flashcard, Status } from '../types';
import { mockFlashcards } from '../utils/mockData';
import { toast } from 'sonner';

export const useFlashcardState = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards);
  
  // Load flashcards from localStorage if exists
  useEffect(() => {
    const savedFlashcards = localStorage.getItem('flashcards');
    if (savedFlashcards) {
      setFlashcards(JSON.parse(savedFlashcards));
    }
  }, []);
  
  // Update localStorage when data changes
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);
  
  const updateFlashcardStatus = (id: string, status: Status) => {
    setFlashcards(currentFlashcards => 
      currentFlashcards.map(card => {
        if (card.id === id) {
          const newCard = { ...card, status };
          if (status === 'correct') {
            newCard.correct += 1;
          } else if (status === 'wrong') {
            newCard.wrong += 1;
          }
          return newCard;
        }
        return card;
      })
    );
  };
  
  const resetFlashcards = (type: 'correct' | 'wrong' | 'all') => {
    setFlashcards(currentFlashcards => 
      currentFlashcards.map(card => {
        if (type === 'all' || card.status === type) {
          return { 
            ...card, 
            status: 'unattempted',
            ...(type === 'all' || type === 'correct' ? { correct: 0 } : {}),
            ...(type === 'all' || type === 'wrong' ? { wrong: 0 } : {})
          };
        }
        return card;
      })
    );
    
    toast.success(`Reset ${type} flashcards successfully`);
  };
  
  return { flashcards, updateFlashcardStatus, resetFlashcards };
};
