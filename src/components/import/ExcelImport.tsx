
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { parseExcelData } from '@/utils/excelImport';
import { useLearning } from '@/context/LearningContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadIcon } from 'lucide-react';

const ExcelImport = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { importData } = useLearning();

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    
    try {
      if (file.name !== 'app.xlsx') {
        toast.error('Please upload a file named "app.xlsx"');
        setIsLoading(false);
        return;
      }
      
      const data = await parseExcelData(file);
      importData(data);
      toast.success('Data imported successfully!');
    } catch (error) {
      console.error('Import error:', error);
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
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 border-gray-300 dark:border-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Only app.xlsx file is accepted
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcelImport;
