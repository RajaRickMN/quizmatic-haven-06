
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { parseExcelData } from '@/utils/excelImport';
import { useLearning } from '@/context/LearningContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadIcon, FileWarning } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ExcelImport = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState('');
  const { importData } = useLearning();

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setFileError('');
    
    try {
      // Verify it's an Excel file
      if (!file.name.endsWith('.xlsx')) {
        setFileError('Please upload an Excel (.xlsx) file');
        toast.error('Please upload an Excel (.xlsx) file');
        setIsLoading(false);
        return;
      }
      
      toast.info(`Processing file: ${file.name}...`);
      console.log('Processing file:', file.name);
      const data = await parseExcelData(file);
      
      // Count items to be imported
      const totalItems = data.flashcards.length + data.mcqs.length + data.tests.length;
      
      if (totalItems === 0) {
        setFileError('No valid data found in the Excel file. Please make sure it has sheets named "Flashcards", "MCQs", or "Tests" with the correct column headers.');
        toast.error('No valid data found in the Excel file');
      } else {
        toast.info(`Found ${totalItems} items to import...`);
        
        // Log subjects and topics from import
        console.log('Subjects from import:', data.subjects);
        console.log('Topics from import:', data.topics);
        
        importData(data);
        toast.success('Data imported successfully');
      }
    } catch (error) {
      console.error('Import error:', error);
      setFileError('Failed to parse the Excel file. Please check the file format.');
      toast.error('Failed to import data. Please check the file format.');
    } finally {
      setIsLoading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Import Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fileError && (
            <Alert variant="destructive" className="mb-4">
              <FileWarning className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{fileError}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 border-gray-300 dark:border-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Excel (.xlsx) files
                </p>
              </div>
              <Input
                ref={fileInputRef}
                id="excel-upload"
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handleImport}
                disabled={isLoading}
              />
            </label>
          </div>
          <Button 
            onClick={handleClick} 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Importing...' : 'Select File'}
          </Button>
          
          <div className="text-sm text-muted-foreground mt-4">
            <p>Your Excel file should contain sheets named:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Flashcards (with columns: id, question, answer, subject, topic)</li>
              <li>MCQs (with columns: id, question, option_a, option_b, option_c, option_d, key, explanation, subject, topic)</li>
              <li>Tests (with columns: id, question, option_a, option_b, option_c, option_d, key, explanation, subject, topic, testNumber)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcelImport;
