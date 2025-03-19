
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
      if (data.flashcards && data.flashcards.length > 0) {
        setFlashcards(data.flashcards);
        toast.success(`Imported ${data.flashcards.length} flashcards`);
      }
      
      if (data.mcqs && data.mcqs.length > 0) {
        setMCQs(data.mcqs);
        toast.success(`Imported ${data.mcqs.length} MCQs`);
      }
      
      if (data.tests && data.tests.length > 0) {
        setTests(data.tests);
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
