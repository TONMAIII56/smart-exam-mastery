
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Upload, Download, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';

const BulkUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedExam, setSelectedExam] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [uploadResults, setUploadResults] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: exams } = useQuery({
    queryKey: ['exams-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exams')
        .select('id, exam_name, exam_type, subject')
        .order('exam_name');
      if (error) throw error;
      return data;
    }
  });

  const downloadTemplate = () => {
    const template = `Question Text,Option 1,Option 2,Option 3,Option 4,Correct Answer,Explanation,Difficulty,Tags
"What is 2+2?","2","3","4","5","4","2+2 equals 4","easy","math,basic"
"What is the capital of Thailand?","Bangkok","Phuket","Chiang Mai","Pattaya","Bangkok","Bangkok is the capital city of Thailand","medium","geography,thailand"`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'question_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewData([]);
      setValidationErrors([]);
      setUploadResults(null);
      
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        parseCSVFile(file);
      } else {
        toast({
          title: 'ไฟล์ไม่ถูกต้อง',
          description: 'กรุณาเลือกไฟล์ CSV เท่านั้น',
          variant: 'destructive',
        });
      }
    }
  };

  const parseCSVFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
      
      const data = lines.slice(1).map((line, index) => {
        const values = parseCSVLine(line);
        const row: any = { rowNumber: index + 2 };
        
        headers.forEach((header, i) => {
          row[header] = values[i] || '';
        });
        
        return row;
      });
      
      setPreviewData(data);
      validateData(data);
    };
    reader.readAsText(file);
  };

  const parseCSVLine = (line: string): string[] => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  };

  const validateData = (data: any[]) => {
    const errors: string[] = [];
    
    data.forEach((row, index) => {
      if (!row['Question Text']?.trim()) {
        errors.push(`Row ${row.rowNumber}: Question text is required`);
      }
      
      if (!row['Option 1']?.trim() || !row['Option 2']?.trim()) {
        errors.push(`Row ${row.rowNumber}: At least 2 options are required`);
      }
      
      if (!row['Correct Answer']?.trim()) {
        errors.push(`Row ${row.rowNumber}: Correct answer is required`);
      }
      
      const correctAnswer = row['Correct Answer']?.trim();
      const options = [row['Option 1'], row['Option 2'], row['Option 3'], row['Option 4']]
        .filter(opt => opt?.trim());
      
      if (correctAnswer && !options.includes(correctAnswer)) {
        errors.push(`Row ${row.rowNumber}: Correct answer must match one of the options`);
      }
    });
    
    setValidationErrors(errors);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedExam || validationErrors.length > 0) {
      toast({
        title: 'ไม่สามารถอัปโหลดได้',
        description: 'กรุณาเลือกไฟล์และข้อสอบ และแก้ไขข้อผิดพลาดก่อน',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    const results = {
      total: previewData.length,
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    try {
      for (let i = 0; i < previewData.length; i++) {
        const row = previewData[i];
        setUploadProgress(((i + 1) / previewData.length) * 100);

        try {
          // Create question
          const { data: question, error: questionError } = await supabase
            .from('questions')
            .insert({
              exam_id: selectedExam,
              question_text: row['Question Text'].trim(),
              question_type: 'multiple_choice',
              difficulty_level: row['Difficulty']?.toLowerCase() || 'medium',
              explanation: row['Explanation'] || '',
              tags: row['Tags'] ? row['Tags'].split(',').map((t: string) => t.trim()) : [],
              status: 'draft',
              created_by: user?.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (questionError) throw questionError;

          // Create options
          const options = [
            row['Option 1'],
            row['Option 2'],
            row['Option 3'],
            row['Option 4']
          ].filter(opt => opt?.trim());

          const optionsData = options.map(option => ({
            question_id: question.id,
            option_text: option.trim(),
            is_correct: option.trim() === row['Correct Answer'].trim(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }));

          const { error: optionsError } = await supabase
            .from('options')
            .insert(optionsData);

          if (optionsError) throw optionsError;

          results.success++;
        } catch (error: any) {
          results.failed++;
          results.errors.push(`Row ${row.rowNumber}: ${error.message}`);
        }
      }

      setUploadResults(results);
      
      toast({
        title: 'อัปโหลดเสร็จสิ้น',
        description: `สำเร็จ ${results.success} คำถาม, ล้มเหลว ${results.failed} คำถาม`,
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถอัปโหลดได้',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Bulk Upload</h2>
        <Button onClick={downloadTemplate} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Questions from CSV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exam">Select Exam *</Label>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose exam to add questions to" />
                </SelectTrigger>
                <SelectContent>
                  {exams?.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.exam_name} ({exam.exam_type} - {exam.subject})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="file">CSV File *</Label>
              <Input
                id="file"
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
              />
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Uploading questions...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {validationErrors.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold mb-2">Validation Errors:</div>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.slice(0, 10).map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                  {validationErrors.length > 10 && (
                    <li className="text-sm font-medium">
                      ... and {validationErrors.length - 10} more errors
                    </li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {uploadResults && (
            <Alert className={uploadResults.failed === 0 ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold mb-2">Upload Results:</div>
                <div className="space-y-1 text-sm">
                  <div>Total: {uploadResults.total} questions</div>
                  <div className="text-green-600">Success: {uploadResults.success}</div>
                  <div className="text-red-600">Failed: {uploadResults.failed}</div>
                </div>
                {uploadResults.errors.length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer font-medium">View Errors</summary>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {uploadResults.errors.map((error: string, index: number) => (
                        <li key={index} className="text-sm text-red-600">{error}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !selectedExam || validationErrors.length > 0 || isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Questions
            </Button>
          </div>
        </CardContent>
      </Card>

      {previewData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Preview ({previewData.length} questions)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Row</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Options</TableHead>
                    <TableHead>Correct</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.slice(0, 50).map((row, index) => {
                    const hasError = validationErrors.some(error => 
                      error.includes(`Row ${row.rowNumber}:`)
                    );
                    
                    return (
                      <TableRow key={index} className={hasError ? 'bg-red-50' : ''}>
                        <TableCell>{row.rowNumber}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {row['Question Text']}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            {[row['Option 1'], row['Option 2'], row['Option 3'], row['Option 4']]
                              .filter(opt => opt?.trim())
                              .map((opt, i) => (
                                <div key={i} className="truncate max-w-32">
                                  {i + 1}. {opt}
                                </div>
                              ))}
                          </div>
                        </TableCell>
                        <TableCell>{row['Correct Answer']}</TableCell>
                        <TableCell>
                          {hasError ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {previewData.length > 50 && (
                <div className="text-center py-4 text-gray-500">
                  ... and {previewData.length - 50} more questions
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkUpload;
