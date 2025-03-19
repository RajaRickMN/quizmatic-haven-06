
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLearning } from '@/context/LearningContext';
import { ModuleType, Status } from '@/types';
import { RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  moduleType: ModuleType;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ moduleType }) => {
  const { 
    subjects, 
    topics, 
    filterOptions, 
    setFilterOptions,
    resetFlashcards,
    resetMCQs,
    resetTests
  } = useLearning();
  
  const [selectedSubject, setSelectedSubject] = useState<string>(filterOptions.subject || 'all');
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  
  // Update available topics when selected subject changes
  useEffect(() => {
    if (selectedSubject === 'all') {
      setAvailableTopics([]);
    } else if (topics[selectedSubject]) {
      setAvailableTopics(topics[selectedSubject]);
    }
    
    setFilterOptions({
      ...filterOptions,
      subject: selectedSubject,
      topic: 'all' // Reset topic when subject changes
    });
  }, [selectedSubject]);
  
  const handleStatusChange = (status: string) => {
    setFilterOptions({
      ...filterOptions,
      status: status as Status | 'all'
    });
  };
  
  const handleTopicChange = (topic: string) => {
    setFilterOptions({
      ...filterOptions,
      topic
    });
  };
  
  const handleReset = (type: 'correct' | 'wrong' | 'all') => {
    if (moduleType === 'flashcards') {
      resetFlashcards(type);
    } else if (moduleType === 'mcqs') {
      resetMCQs(type);
    } else if (moduleType === 'tests') {
      resetTests(type);
    }
  };
  
  return (
    <div className="w-full max-w-xs border-r bg-background/95 backdrop-blur-sm p-6 h-[calc(100vh-4rem)] overflow-y-auto">
      <h2 className="text-lg font-medium mb-6">Filters</h2>
      
      <div className="space-y-6">
        {/* Subject Filter */}
        <div>
          <Label htmlFor="subject" className="mb-2 block">Subject</Label>
          <Select 
            value={selectedSubject} 
            onValueChange={setSelectedSubject}
          >
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Topic Filter - Only show if a subject is selected */}
        {selectedSubject !== 'all' && availableTopics.length > 0 && (
          <div>
            <Label htmlFor="topic" className="mb-2 block">Topic</Label>
            <Select 
              value={filterOptions.topic} 
              onValueChange={handleTopicChange}
            >
              <SelectTrigger id="topic">
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {availableTopics.map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Status Filter */}
        <div>
          <Label className="mb-2 block">Status</Label>
          <RadioGroup 
            value={filterOptions.status}
            onValueChange={handleStatusChange}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="status-all" />
              <Label htmlFor="status-all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="correct" id="status-correct" />
              <Label htmlFor="status-correct">Correct</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wrong" id="status-wrong" />
              <Label htmlFor="status-wrong">Wrong</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unattempted" id="status-unattempted" />
              <Label htmlFor="status-unattempted">Unattempted</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Reset Buttons */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium mb-2">Reset Options</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleReset('correct')}
              className="w-full text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Correct
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleReset('wrong')}
              className="w-full text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Wrong
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleReset('all')}
              className="w-full col-span-2 text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
