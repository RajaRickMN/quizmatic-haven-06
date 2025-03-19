
import { useState, useEffect } from 'react';
import { Test, Status } from '../types';
import { mockTests } from '../utils/mockData';
import { toast } from 'sonner';

export const useTestState = () => {
  const [tests, setTests] = useState<Test[]>(mockTests);
  
  // Load tests from localStorage if exists
  useEffect(() => {
    const savedTests = localStorage.getItem('tests');
    if (savedTests) {
      setTests(JSON.parse(savedTests));
    }
  }, []);
  
  // Update localStorage when data changes
  useEffect(() => {
    localStorage.setItem('tests', JSON.stringify(tests));
  }, [tests]);
  
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
  
  return { tests, updateTestStatus, resetTests };
};
