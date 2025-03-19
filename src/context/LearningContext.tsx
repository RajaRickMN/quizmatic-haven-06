
import React, { createContext, useContext, useState } from 'react';
import { ModuleType, Flashcard, MCQ, Test, Status, FilterOptions } from '../types';
import { subjects as defaultSubjects, topics as defaultTopics } from '../utils/mockData';
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
  
  // Dynamically updated subjects and topics
  const [subjects, setSubjects] = useState<string[]>(defaultSubjects);
  const [topics, setTopics] = useState<Record<string, string[]>>(defaultTopics);
  
  // Update functions for subjects and topics
  const updateSubjects = (newSubjects: string[]) => {
    setSubjects(prevSubjects => {
      // Combine existing subjects with new ones, avoiding duplicates
      const combinedSubjects = [...new Set([...prevSubjects, ...newSubjects])];
      console.log("Updated subjects:", combinedSubjects);
      return combinedSubjects;
    });
  };

  const updateTopics = (newTopics: Record<string, string[]>) => {
    setTopics(prevTopics => {
      const combinedTopics = { ...prevTopics };
      
      // For each subject in newTopics, add its topics to the combined topics
      for (const subject in newTopics) {
        if (combinedTopics[subject]) {
          // Combine existing topics with new ones, avoiding duplicates
          combinedTopics[subject] = [...new Set([...combinedTopics[subject], ...newTopics[subject]])];
        } else {
          combinedTopics[subject] = [...newTopics[subject]];
        }
      }
      
      console.log("Updated topics:", combinedTopics);
      return combinedTopics;
    });
  };
  
  // Filter state
  const { filterOptions, setFilterOptions } = useFilterState();
  
  // UI state
  const [currentModule, setCurrentModule] = useState<ModuleType | null>(null);
  
  // Import data - passing updateSubjects and updateTopics directly to avoid circular dependency
  const { importData } = useImportState(
    setFlashcards, 
    setMCQs, 
    setTests, 
    updateSubjects,
    updateTopics
  );
  
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
    updateSubjects,
    updateTopics,
    
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
