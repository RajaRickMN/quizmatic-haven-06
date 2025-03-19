
import * as XLSX from 'xlsx';
import { Flashcard, MCQ, Test } from '../types';

export const parseExcelData = (file: File): Promise<{
  flashcards: Flashcard[];
  mcqs: MCQ[];
  tests: Test[];
  subjects: Set<string>;
  topics: Record<string, Set<string>>;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        console.log('Excel sheets found:', workbook.SheetNames);
        
        const flashcards: Flashcard[] = [];
        const mcqs: MCQ[] = [];
        const tests: Test[] = [];
        
        // Track unique subjects and topics
        const subjects = new Set<string>();
        const topics: Record<string, Set<string>> = {};
        
        // Helper function to process subject and topic
        const processSubjectAndTopic = (subject: string, topic: string) => {
          // Ensure subject and topic are not empty
          const validSubject = subject?.trim() || 'General';
          const validTopic = topic?.trim() || 'General';
          
          // Add to our tracking sets
          subjects.add(validSubject);
          
          if (!topics[validSubject]) {
            topics[validSubject] = new Set<string>();
          }
          topics[validSubject].add(validTopic);
          
          return { subject: validSubject, topic: validTopic };
        };
        
        // Check if sheets exist
        if (workbook.SheetNames.includes('Flashcards')) {
          const worksheet = workbook.Sheets['Flashcards'];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          console.log('Flashcards data:', jsonData);
          
          jsonData.forEach((row: any, index: number) => {
            console.log(`Processing flashcard ${index + 1}:`, row);
            if (row.question) { // Ensure we have at least a question
              const { subject, topic } = processSubjectAndTopic(row.subject, row.topic);
              
              flashcards.push({
                id: row.id || `f${Date.now()}-${index}`,
                question: row.question || '',
                answer: row.answer || '',
                subject,
                topic,
                correct: Number(row.correct) || 0,
                wrong: Number(row.wrong) || 0,
                status: row.status || 'unattempted'
              });
            }
          });
        }
        
        if (workbook.SheetNames.includes('MCQs')) {
          const worksheet = workbook.Sheets['MCQs'];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          console.log('MCQs data:', jsonData);
          
          jsonData.forEach((row: any, index: number) => {
            console.log(`Processing MCQ ${index + 1}:`, row);
            if (row.question) { // Ensure we have at least a question
              const { subject, topic } = processSubjectAndTopic(row.subject, row.topic);
              
              mcqs.push({
                id: row.id || `m${Date.now()}-${index}`,
                question: row.question || '',
                options: {
                  a: row.option_a || '',
                  b: row.option_b || '',
                  c: row.option_c || '',
                  d: row.option_d || ''
                },
                key: row.key || 'a',
                explanation: row.explanation || '',
                subject,
                topic,
                status: row.status || 'unattempted'
              });
            }
          });
        }
        
        if (workbook.SheetNames.includes('Tests')) {
          const worksheet = workbook.Sheets['Tests'];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          console.log('Tests data:', jsonData);
          
          jsonData.forEach((row: any, index: number) => {
            console.log(`Processing test ${index + 1}:`, row);
            if (row.question) { // Ensure we have at least a question
              const { subject, topic } = processSubjectAndTopic(row.subject, row.topic);
              
              tests.push({
                id: row.id || `t${Date.now()}-${index}`,
                question: row.question || '',
                options: {
                  a: row.option_a || '',
                  b: row.option_b || '',
                  c: row.option_c || '',
                  d: row.option_d || ''
                },
                key: row.key || 'a',
                explanation: row.explanation || '',
                subject,
                topic,
                status: row.status || 'unattempted',
                testNumber: row.testNumber || '1'
              });
            }
          });
        }
        
        // Convert Set to array for the topics record
        const processedTopics: Record<string, string[]> = {};
        for (const subject in topics) {
          processedTopics[subject] = Array.from(topics[subject]);
        }
        
        console.log('Parsed data summary:', {
          flashcardsCount: flashcards.length,
          mcqsCount: mcqs.length,
          testsCount: tests.length,
          subjects: Array.from(subjects),
          topics: processedTopics
        });
        
        resolve({ 
          flashcards, 
          mcqs, 
          tests,
          subjects,
          topics
        });
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
