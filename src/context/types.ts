
import { Flashcard, MCQ, Test, Status, FilterOptions, ModuleType } from '../types';

export interface LearningContextType {
  // Data
  flashcards: Flashcard[];
  mcqs: MCQ[];
  tests: Test[];
  
  // Data import
  importData: (data: { 
    flashcards: Flashcard[]; 
    mcqs: MCQ[]; 
    tests: Test[];
    subjects?: Set<string>;
    topics?: Record<string, Set<string>>;
  }) => void;
  
  // Filters
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  subjects: string[];
  topics: Record<string, string[]>;
  updateSubjects: (newSubjects: string[]) => void;
  updateTopics: (newTopics: Record<string, string[]>) => void;
  
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
