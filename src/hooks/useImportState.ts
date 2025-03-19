
import { useCallback } from 'react';
import { Flashcard, MCQ, Test } from '../types';
import { toast } from 'sonner';
import { useLearning } from '../context/LearningContext';

export const useImportState = (
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>,
  setMCQs: React.Dispatch<React.SetStateAction<MCQ[]>>,
  setTests: React.Dispatch<React.SetStateAction<Test[]>>
) => {
  const { updateSubjects, updateTopics } = useLearning();
  
  const importData = useCallback(
    (data: { 
      flashcards: Flashcard[]; 
      mcqs: MCQ[]; 
      tests: Test[]; 
      subjects?: Set<string>;
      topics?: Record<string, Set<string>>;
    }) => {
      console.log('Importing data:', data);
      
      const processingResults = {
        flashcardsAdded: 0,
        mcqsAdded: 0,
        testsAdded: 0
      };
      
      // Process subjects and topics if available
      if (data.subjects && data.topics) {
        console.log('Updating subjects and topics:', data.subjects, data.topics);
        updateSubjects(Array.from(data.subjects));
        
        // Convert Sets to Arrays for topics
        const processedTopics: Record<string, string[]> = {};
        for (const subject in data.topics) {
          processedTopics[subject] = Array.from(data.topics[subject]);
        }
        updateTopics(processedTopics);
      }
      
      if (data.flashcards && Array.isArray(data.flashcards) && data.flashcards.length > 0) {
        console.log('Setting flashcards:', data.flashcards);
        setFlashcards(prevFlashcards => {
          const newFlashcards = [...prevFlashcards];
          // Add only flashcards with unique IDs
          data.flashcards.forEach(card => {
            if (!newFlashcards.some(existing => existing.id === card.id)) {
              newFlashcards.push(card);
              processingResults.flashcardsAdded++;
            }
          });
          return newFlashcards;
        });
      }
      
      if (data.mcqs && Array.isArray(data.mcqs) && data.mcqs.length > 0) {
        console.log('Setting MCQs:', data.mcqs);
        setMCQs(prevMCQs => {
          const newMCQs = [...prevMCQs];
          // Add only MCQs with unique IDs
          data.mcqs.forEach(mcq => {
            if (!newMCQs.some(existing => existing.id === mcq.id)) {
              newMCQs.push(mcq);
              processingResults.mcqsAdded++;
            }
          });
          return newMCQs;
        });
      }
      
      if (data.tests && Array.isArray(data.tests) && data.tests.length > 0) {
        console.log('Setting tests:', data.tests);
        setTests(prevTests => {
          const newTests = [...prevTests];
          // Add only tests with unique IDs
          data.tests.forEach(test => {
            if (!newTests.some(existing => existing.id === test.id)) {
              newTests.push(test);
              processingResults.testsAdded++;
            }
          });
          return newTests;
        });
      }
      
      // Display appropriate toast messages based on what was imported
      if (processingResults.flashcardsAdded > 0) {
        toast.success(`Imported ${processingResults.flashcardsAdded} flashcards`);
      }
      
      if (processingResults.mcqsAdded > 0) {
        toast.success(`Imported ${processingResults.mcqsAdded} MCQs`);
      }
      
      if (processingResults.testsAdded > 0) {
        toast.success(`Imported ${processingResults.testsAdded} tests`);
      }
      
      if (processingResults.flashcardsAdded === 0 && processingResults.mcqsAdded === 0 && processingResults.testsAdded === 0) {
        toast.error('No data found in the imported file');
      }
    },
    [setFlashcards, setMCQs, setTests, updateSubjects, updateTopics]
  );
  
  return { importData };
};
