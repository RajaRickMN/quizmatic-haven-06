
import React, { createContext, useContext, useState } from 'react';
import { ModuleType, Flashcard, MCQ, Test, Status, FilterOptions } from '../types';
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
  // Theme state
  const { theme, toggleTheme } = useThemeState();
  
  // Cards state
  const { flashcards, updateFlashcardStatus, resetFlashcards, setFlashcards } = useFlashcardState();
  const { mcqs, updateMCQStatus, resetMCQs, setMCQs } = useMCQState();
  const { tests, updateTestStatus, resetTests, setTests } = useTestState();
  
  // Filter state
  const { filterOptions, setFilterOptions } = useFilterState();
  
  // UI state
  const [currentModule, setCurrentModule] = useState<ModuleType | null>(null);
  
  // Import data
  const { importData } = useImportState(setFlashcards, setMCQs, setTests);
  
  const value = {
    // Data
    flashcards,
    mcqs,
    tests,
    
    // Import function
    importData,
    
    // Filters
    filterOptions,
    setFilterOptions,
    subjects,
    topics,
    
    // Flashcard functions
    updateFlashcardStatus,
    resetFlashcards,
    
    // MCQ functions
    updateMCQStatus,
    resetMCQs,
    
    // Test functions
    updateTestStatus,
    resetTests,
    
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
