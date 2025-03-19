
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import FilterSidebar from '@/components/layout/FilterSidebar';
import MCQView from '@/components/mcq/MCQView';
import { useLearning } from '@/context/LearningContext';
import { Test } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const Tests = () => {
  const { tests, filterOptions, setFilterOptions } = useLearning();
  const [filteredTests, setFilteredTests] = useState<Test[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testNumbers, setTestNumbers] = useState<string[]>([]);
  
  // Get unique test numbers
  useEffect(() => {
    const uniqueTestNumbers = Array.from(new Set(tests.map(test => test.testNumber)));
    setTestNumbers(uniqueTestNumbers);
  }, [tests]);
  
  // Apply filters
  useEffect(() => {
    let result = [...tests];
    
    // Filter by test number
    if (filterOptions.testNumber && filterOptions.testNumber !== 'all') {
      result = result.filter(test => test.testNumber === filterOptions.testNumber);
    }
    
    // Filter by subject
    if (filterOptions.subject !== 'all') {
      result = result.filter(test => test.subject === filterOptions.subject);
    }
    
    // Filter by topic
    if (filterOptions.topic !== 'all') {
      result = result.filter(test => test.topic === filterOptions.topic);
    }
    
    // Filter by status
    if (filterOptions.status !== 'all') {
      result = result.filter(test => test.status === filterOptions.status);
    }
    
    setFilteredTests(result);
    setCurrentIndex(0); // Reset to first test when filters change
  }, [tests, filterOptions]);
  
  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(filteredTests.length - 1, prev + 1));
  };
  
  const handleTestNumberChange = (value: string) => {
    setFilterOptions({
      ...filterOptions,
      testNumber: value
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <div className="flex-1 flex">
        <FilterSidebar moduleType="tests" />
        
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Tests</h1>
              
              <div className="mt-4 md:mt-0 w-full md:w-auto md:ml-6">
                <div className="max-w-xs">
                  <Label htmlFor="test-number" className="mb-2 block">Test Number</Label>
                  <Select 
                    value={filterOptions.testNumber || 'all'} 
                    onValueChange={handleTestNumberChange}
                  >
                    <SelectTrigger id="test-number">
                      <SelectValue placeholder="Select test" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tests</SelectItem>
                      {testNumbers.map(num => (
                        <SelectItem key={num} value={num}>Test {num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {filteredTests.length === 0 ? (
              <div className="text-center p-10 bg-accent/50 rounded-lg">
                <p className="text-muted-foreground">No tests match your current filters</p>
              </div>
            ) : (
              <MCQView
                mcqs={filteredTests}
                currentIndex={currentIndex}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Tests;
