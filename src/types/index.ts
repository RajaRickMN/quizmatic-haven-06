
export type Status = 'correct' | 'wrong' | 'unattempted';

export interface FilterOptions {
  subject: string;
  topic: string;
  status: Status | 'all';
  testNumber?: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  topic: string;
  correct: number;
  wrong: number;
  status: Status;
}

export interface MCQ {
  id: string;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  key: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  subject: string;
  topic: string;
  status: Status;
}

export interface Test extends MCQ {
  testNumber: string;
}

export type ModuleType = 'flashcards' | 'mcqs' | 'tests';
