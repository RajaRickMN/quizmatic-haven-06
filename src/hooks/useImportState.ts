
import { useCallback } from 'react';
import { Flashcard, MCQ, Test } from '../types';
import { toast } from 'sonner';

export const useImportState = (
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>,
  setMCQs: React.Dispatch<React.SetStateAction<MCQ[]>>,
  setTests: React.Dispatch<React.SetStateAction<Test[]>>
) => {
  const importData = useCallback(
    (data: { flashcards: Flashcard[]; mcqs: MCQ[]; tests: Test[] }) => {
      console.log('Importing data:', data);
      
      if (data.flashcards && data.flashcards.length > 0) {
        console.log('Setting flashcards:', data.flashcards);
        setFlashcards(prevFlashcards => {
          const newFlashcards = [...prevFlashcards];
          // Add only flashcards with unique IDs
          data.flashcards.forEach(card => {
            if (!newFlashcards.some(existing => existing.id === card.id)) {
              newFlashcards.push(card);
            }
          });
          return newFlashcards;
        });
        toast.success(`Imported ${data.flashcards.length} flashcards`);
      }
      
      if (data.mcqs && data.mcqs.length > 0) {
        console.log('Setting MCQs:', data.mcqs);
        setMCQs(prevMCQs => {
          const newMCQs = [...prevMCQs];
          // Add only MCQs with unique IDs
          data.mcqs.forEach(mcq => {
            if (!newMCQs.some(existing => existing.id === mcq.id)) {
              newMCQs.push(mcq);
            }
          });
          return newMCQs;
        });
        toast.success(`Imported ${data.mcqs.length} MCQs`);
      }
      
      if (data.tests && data.tests.length > 0) {
        console.log('Setting tests:', data.tests);
        setTests(prevTests => {
          const newTests = [...prevTests];
          // Add only tests with unique IDs
          data.tests.forEach(test => {
            if (!newTests.some(existing => existing.id === test.id)) {
              newTests.push(test);
            }
          });
          return newTests;
        });
        toast.success(`Imported ${data.tests.length} tests`);
      }
      
      if (!data.flashcards.length && !data.mcqs.length && !data.tests.length) {
        toast.error('No data found in the imported file');
      }
    },
    [setFlashcards, setMCQs, setTests]
  );
  
  return { importData };
};
