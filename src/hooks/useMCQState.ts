
import { useState, useEffect } from 'react';
import { MCQ, Status } from '../types';
import { mockMCQs } from '../utils/mockData';
import { toast } from 'sonner';

export const useMCQState = () => {
  const [mcqs, setMCQs] = useState<MCQ[]>(mockMCQs);
  
  // Load MCQs from localStorage if exists
  useEffect(() => {
    const savedMCQs = localStorage.getItem('mcqs');
    if (savedMCQs) {
      setMCQs(JSON.parse(savedMCQs));
    }
  }, []);
  
  // Update localStorage when data changes
  useEffect(() => {
    localStorage.setItem('mcqs', JSON.stringify(mcqs));
  }, [mcqs]);
  
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
  
  return { mcqs, updateMCQStatus, resetMCQs };
};
