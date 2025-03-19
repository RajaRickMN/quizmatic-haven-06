
import * as XLSX from 'xlsx';
import { Flashcard, MCQ, Test } from '../types';

export const parseExcelData = (file: File): Promise<{
  flashcards: Flashcard[];
  mcqs: MCQ[];
  tests: Test[];
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        const flashcards: Flashcard[] = [];
        const mcqs: MCQ[] = [];
        const tests: Test[] = [];
        
        // Check if sheets exist
        if (workbook.SheetNames.includes('Flashcards')) {
          const worksheet = workbook.Sheets['Flashcards'];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          jsonData.forEach((row: any) => {
            flashcards.push({
              id: row.id || `f${flashcards.length + 1}`,
              question: row.question || '',
              answer: row.answer || '',
              subject: row.subject || 'General',
              topic: row.topic || 'General',
              correct: row.correct || 0,
              wrong: row.wrong || 0,
              status: row.status || 'unattempted'
            });
          });
        }
        
        if (workbook.SheetNames.includes('MCQs')) {
          const worksheet = workbook.Sheets['MCQs'];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          jsonData.forEach((row: any) => {
            mcqs.push({
              id: row.id || `m${mcqs.length + 1}`,
              question: row.question || '',
              options: {
                a: row.option_a || '',
                b: row.option_b || '',
                c: row.option_c || '',
                d: row.option_d || ''
              },
              key: row.key || 'a',
              explanation: row.explanation || '',
              subject: row.subject || 'General',
              topic: row.topic || 'General',
              status: row.status || 'unattempted'
            });
          });
        }
        
        if (workbook.SheetNames.includes('Tests')) {
          const worksheet = workbook.Sheets['Tests'];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          jsonData.forEach((row: any) => {
            tests.push({
              id: row.id || `t${tests.length + 1}`,
              question: row.question || '',
              options: {
                a: row.option_a || '',
                b: row.option_b || '',
                c: row.option_c || '',
                d: row.option_d || ''
              },
              key: row.key || 'a',
              explanation: row.explanation || '',
              subject: row.subject || 'General',
              topic: row.topic || 'General',
              status: row.status || 'unattempted',
              testNumber: row.testNumber || '1'
            });
          });
        }
        
        resolve({ flashcards, mcqs, tests });
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      reject(error);
    };
    
    reader.readAsBinaryString(file);
  });
};
