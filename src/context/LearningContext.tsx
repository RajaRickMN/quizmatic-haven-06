
import React, { createContext, useContext, useState } from 'react';
import { ModuleType } from '../types';
import { subjects, topics } from '../utils/mockData';
import { LearningContextType } from './types';
import { useThemeState } from '../hooks/useThemeState';
import { useFlashcardState } from '../hooks/useFlashcardState';
import { useMCQState } from '../hooks/useMCQState';
import { useTestState } from '../hooks/useTestState';
import { useFilterState } from '../hooks/useFilterState';
import { useImportState } from '../hooks/useImportState';

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use our custom hooks to manage state
  const { theme, toggleTheme } = useThemeState();
  
  // We need to get the setState functions for flashcards, MCQs, and tests
  // so we can pass them to useImportState
  const [flashcardState, setFlashcardState] = useState(() => {
    const { flashcards, updateFlashcardStatus, resetFlashcards, setFlashcards } = useFlashcardState();
    return { flashcards, updateFlashcardStatus, resetFlashcards, setFlashcards };
  });
  
  const [mcqState, setMCQState] = useState(() => {
    const { mcqs, updateMCQStatus, resetMCQs, setMCQs } = useMCQState();
    return { mcqs, updateMCQStatus, resetMCQs, setMCQs };
  });
  
  const [testState, setTestState] = useState(() => {
    const { tests, updateTestStatus, resetTests, setTests } = useTestState();
    return { tests, updateTestStatus, resetTests, setTests };
  });
  
  const { filterOptions, setFilterOptions } = useFilterState();
  
  // Import data hook
  const { importData } = useImportState(
    flashcardState.setFlashcards,
    mcqState.setMCQs,
    testState.setTests
  );
  
  // UI state
  const [currentModule, setCurrentModule] = useState<ModuleType | null>(null);
  
  const value = {
    // Data
    flashcards: flashcardState.flashcards,
    mcqs: mcqState.mcqs,
    tests: testState.tests,
    
    // Import function
    importData,
    
    // Filters
    filterOptions,
    setFilterOptions,
    subjects,
    topics,
    
    // Flashcard functions
    updateFlashcardStatus: flashcardState.updateFlashcardStatus,
    resetFlashcards: flashcardState.resetFlashcards,
    
    // MCQ functions
    updateMCQStatus: mcqState.updateMCQStatus,
    resetMCQs: mcqState.resetMCQs,
    
    // Test functions
    updateTestStatus: testState.updateTestStatus,
    resetTests: testState.resetTests,
    
    // Theme
    theme,
    toggleTheme,
    
    // UI state
    currentModule,
    setCurrentModule,
  };
  
  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
