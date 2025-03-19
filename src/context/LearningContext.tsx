import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Flashcard, 
  MCQ, 
  Test, 
  Status, 
  FilterOptions, 
  ModuleType 
} from '../types';
import { 
  mockFlashcards, 
  mockMCQs, 
  mockTests,
  subjects,
  topics
} from '../utils/mockData';
import { toast } from "sonner";

interface LearningContextType {
  // Data
  flashcards: Flashcard[];
  mcqs: MCQ[];
  tests: Test[];
  
  // Filters
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  subjects: string[];
  topics: Record<string, string[]>;
  
  // Flashcard functions
  updateFlashcardStatus: (id: string, status: Status) => void;
  resetFlashcards: (type: 'correct' | 'wrong' | 'all') => void;
  
  // MCQ functions
  updateMCQStatus: (id: string, status: Status) => void;
  resetMCQs: (type: 'correct' | 'wrong' | 'all') => void;
  
  // Test functions
  updateTestStatus: (id: string, status: Status) => void;
  resetTests: (type: 'correct' | 'wrong' | 'all') => void;
  
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  // UI state
  currentModule: ModuleType | null;
  setCurrentModule: (module: ModuleType | null) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Data state
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards);
  const [mcqs, setMCQs] = useState<MCQ[]>(mockMCQs);
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [currentModule, setCurrentModule] = useState<ModuleType | null>(null);
  
  // Filter state
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    subject: 'all',
    topic: 'all',
    status: 'all',
  });
  
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  
  // Initialize from localStorage on mount
  useEffect(() => {
    // Load theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'dark' | 'light');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
    
    // Load data from localStorage if exists
    const savedFlashcards = localStorage.getItem('flashcards');
    if (savedFlashcards) {
      setFlashcards(JSON.parse(savedFlashcards));
    }
    
    const savedMCQs = localStorage.getItem('mcqs');
    if (savedMCQs) {
      setMCQs(JSON.parse(savedMCQs));
    }
    
    const savedTests = localStorage.getItem('tests');
    if (savedTests) {
      setTests(JSON.parse(savedTests));
    }
  }, []);
  
  // Update localStorage when data changes
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);
  
  useEffect(() => {
    localStorage.setItem('mcqs', JSON.stringify(mcqs));
  }, [mcqs]);
  
  useEffect(() => {
    localStorage.setItem('tests', JSON.stringify(tests));
  }, [tests]);
  
  // Theme toggler
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  // Flashcard functions
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
  
  // MCQ functions
  const updateMCQStatus = (id: string, status: Status) => {
    setMCQs(currentMCQs => 
      currentMCQs.map(mcq => {
        if (mcq.id === id) {
          return { ...mcq, status };
        }
        return mcq;
      })
    );
  };
  
  const resetMCQs = (type: 'correct' | 'wrong' | 'all') => {
    setMCQs(currentMCQs => 
      currentMCQs.map(mcq => {
        if (type === 'all' || mcq.status === type) {
          return { ...mcq, status: 'unattempted' };
        }
        return mcq;
      })
    );
    
    toast.success(`Reset ${type} MCQs successfully`);
  };
  
  // Test functions
  const updateTestStatus = (id: string, status: Status) => {
    setTests(currentTests => 
      currentTests.map(test => {
        if (test.id === id) {
          return { ...test, status };
        }
        return test;
      })
    );
  };
  
  const resetTests = (type: 'correct' | 'wrong' | 'all') => {
    setTests(currentTests => 
      currentTests.map(test => {
        if (type === 'all' || test.status === type) {
          return { ...test, status: 'unattempted' };
        }
        return test;
      })
    );
    
    toast.success(`Reset ${type} tests successfully`);
  };
  
  const value = {
    // Data
    flashcards,
    mcqs,
    tests,
    
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
