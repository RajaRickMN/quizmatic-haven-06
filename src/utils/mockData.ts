
import { Flashcard, MCQ, Test } from '../types';

export const subjects = ['Mathematics', 'Science', 'History', 'Languages'];
export const topics = {
  Mathematics: ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
  Science: ['Physics', 'Chemistry', 'Biology', 'Astronomy'],
  History: ['Ancient', 'Medieval', 'Modern', 'Contemporary'],
  Languages: ['English', 'Spanish', 'French', 'German']
};

export const mockFlashcards: Flashcard[] = [
  {
    id: 'f1',
    question: 'What is the quadratic formula?',
    answer: 'x = (-b ± √(b² - 4ac)) / 2a',
    subject: 'Mathematics',
    topic: 'Algebra',
    correct: 0,
    wrong: 0,
    status: 'unattempted'
  },
  {
    id: 'f2',
    question: 'What is the Pythagorean theorem?',
    answer: 'a² + b² = c²',
    subject: 'Mathematics',
    topic: 'Geometry',
    correct: 0,
    wrong: 0,
    status: 'unattempted'
  },
  {
    id: 'f3',
    question: 'What is the formula for the area of a circle?',
    answer: 'A = πr²',
    subject: 'Mathematics',
    topic: 'Geometry',
    correct: 0,
    wrong: 0,
    status: 'unattempted'
  },
  {
    id: 'f4',
    question: 'What is Newton\'s Second Law of Motion?',
    answer: 'F = ma (Force equals mass times acceleration)',
    subject: 'Science',
    topic: 'Physics',
    correct: 0,
    wrong: 0,
    status: 'unattempted'
  },
  {
    id: 'f5',
    question: 'What is the chemical formula for water?',
    answer: 'H₂O',
    subject: 'Science',
    topic: 'Chemistry',
    correct: 0,
    wrong: 0,
    status: 'unattempted'
  },
  {
    id: 'f6',
    question: 'When did World War II end?',
    answer: '1945',
    subject: 'History',
    topic: 'Modern',
    correct: 0,
    wrong: 0,
    status: 'unattempted'
  }
];

export const mockMCQs: MCQ[] = [
  {
    id: 'm1',
    question: 'Which of the following is NOT a prime number?',
    options: {
      a: '3',
      b: '5',
      c: '7',
      d: '9'
    },
    key: 'd',
    explanation: '9 is divisible by 3, making it a composite number. The other options (3, 5, and 7) are all prime numbers.',
    subject: 'Mathematics',
    topic: 'Algebra',
    status: 'unattempted'
  },
  {
    id: 'm2',
    question: 'What is the capital of France?',
    options: {
      a: 'Berlin',
      b: 'Madrid',
      c: 'Paris',
      d: 'Rome'
    },
    key: 'c',
    explanation: 'Paris is the capital city of France.',
    subject: 'History',
    topic: 'Modern',
    status: 'unattempted'
  },
  {
    id: 'm3',
    question: 'Which element has the atomic number 1?',
    options: {
      a: 'Helium',
      b: 'Hydrogen',
      c: 'Oxygen',
      d: 'Carbon'
    },
    key: 'b',
    explanation: 'Hydrogen has the atomic number 1, meaning it has 1 proton in its nucleus.',
    subject: 'Science',
    topic: 'Chemistry',
    status: 'unattempted'
  },
  {
    id: 'm4',
    question: 'What is the past tense of "go"?',
    options: {
      a: 'Goed',
      b: 'Went',
      c: 'Gone',
      d: 'Going'
    },
    key: 'b',
    explanation: 'The past tense of "go" is "went". "Gone" is the past participle, "going" is the present participle.',
    subject: 'Languages',
    topic: 'English',
    status: 'unattempted'
  }
];

export const mockTests: Test[] = [
  {
    id: 't1',
    question: 'What is the value of π (pi) to two decimal places?',
    options: {
      a: '3.14',
      b: '3.12',
      c: '3.16',
      d: '3.18'
    },
    key: 'a',
    explanation: 'π (pi) is approximately equal to 3.14159..., which rounds to 3.14 when expressed to two decimal places.',
    subject: 'Mathematics',
    topic: 'Geometry',
    status: 'unattempted',
    testNumber: '1'
  },
  {
    id: 't2',
    question: 'Which of these is NOT a state of matter?',
    options: {
      a: 'Solid',
      b: 'Liquid',
      c: 'Gas',
      d: 'Energy'
    },
    key: 'd',
    explanation: 'The three common states of matter are solid, liquid, and gas. Energy is not a state of matter.',
    subject: 'Science',
    topic: 'Physics',
    status: 'unattempted',
    testNumber: '1'
  },
  {
    id: 't3',
    question: 'Who was the first president of the United States?',
    options: {
      a: 'Thomas Jefferson',
      b: 'George Washington',
      c: 'Abraham Lincoln',
      d: 'John Adams'
    },
    key: 'b',
    explanation: 'George Washington was the first president of the United States, serving from 1789 to 1797.',
    subject: 'History',
    topic: 'Modern',
    status: 'unattempted',
    testNumber: '2'
  },
  {
    id: 't4',
    question: 'What is the largest ocean on Earth?',
    options: {
      a: 'Atlantic Ocean',
      b: 'Indian Ocean',
      c: 'Arctic Ocean',
      d: 'Pacific Ocean'
    },
    key: 'd',
    explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth\'s surface.',
    subject: 'Science',
    topic: 'Astronomy',
    status: 'unattempted',
    testNumber: '2'
  }
];
