
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Upload, File, CheckCircle, AlertTriangle, X } from 'lucide-react';

interface FileUploadQuizProps {
  onQuizCreated?: (quizData: any) => void;
}

export const FileUploadQuiz: React.FC<FileUploadQuizProps> = ({ onQuizCreated }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [examType, setExamType] = useState('');
  const [subject, setSubject] = useState('');
  const [uploadResults, setUploadResults] = useState<any>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'application/pdf'
      ];
      
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setUploadStatus('idle');
        setUploadResults(null);
      } else {
        toast({
          title: 'ไฟล์ไม่ถูกต้อง',
          description: 'กรุณาเลือกไฟล์ CSV, Excel, TXT หรือ PDF เท่านั้น',
          variant: 'destructive',
        });
      }
    }
  };

  const processFile = async () => {
    if (!selectedFile || !examType || !subject) {
      toast({
        title: 'ข้อมูลไม่ครบถ้วน',
        description: 'กรุณาเลือกไฟล์และระบุประเภทข้อสอบ',
        variant: 'destructive',
      });
      return;
    }

    setUploadStatus('uploading');
    
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock quiz creation results
      const mockQuizData = {
        id: 'quiz-' + Date.now(),
        title: `${examType} - ${subject}`,
        totalQuestions: Math.floor(Math.random() * 50) + 10,
        timeLimit: 60,
        difficulty: 'medium',
        questions: Array.from({ length: 15 }, (_, i) => ({
          id: `q${i + 1}`,
          question: `คำถามที่ ${i + 1} จากไฟล์ ${selectedFile.name}`,
          choices: [`ตัวเลือก A`, `ตัวเลือก B`, `ตัวเลือก C`, `ตัวเลือก D`],
          answer: 'A',
          category: subject,
          difficulty_level: 'medium',
          tags: [examType, subject]
        }))
      };
      
      const mockResults = {
        totalQuestions: mockQuizData.totalQuestions,
        successCount: mockQuizData.totalQuestions - 2,
        errorCount: 2,
        quizData: mockQuizData,
        errors: [
          { line: 5, message: 'คำถามไม่สมบูรณ์' },
          { line: 12, message: 'ไม่พบคำตอบที่ถูกต้อง' }
        ]
      };
      
      setUploadResults(mockResults);
      setUploadStatus('success');
      
      if (onQuizCreated) {
        onQuizCreated(mockQuizData);
      }
      
      toast({
        title: 'สร้างข้อสอบสำเร็จ',
        description: `สร้างข้อสอบ ${mockResults.successCount} ข้อสำเร็จ`,
      });
    } catch (error) {
      setUploadStatus('error');
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถประมวลผลไฟล์ได้',
        variant: 'destructive',
      });
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setUploadResults(null);
    setExamType('');
    setSubject('');
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>อัพโหลดไฟล์เพื่อสร้างข้อสอบ</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <File className="h-4 w-4" />
          <AlertDescription>
            รองรับไฟล์ CSV, Excel, TXT หรือ PDF ที่มีข้อสอบ ระบบจะแปลงเป็นข้อสอบอัตโนมัติ
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="exam_type">ประเภทข้อสอบ</Label>
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกประเภทข้อสอบ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil-service">การสอบราชการ</SelectItem>
                <SelectItem value="toeic">TOEIC</SelectItem>
                <SelectItem value="aisa">AISA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subject">หมวดวิชา</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกหมวดวิชา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general-knowledge">ความรู้ทั่วไป</SelectItem>
                <SelectItem value="mathematics">คณิตศาสตร์</SelectItem>
                <SelectItem value="thai-language">ภาษาไทย</SelectItem>
                <SelectItem value="english">ภาษาอังกฤษ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="file_upload">เลือกไฟล์</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
            {selectedFile ? (
              <div className="flex items-center justify-center space-x-2">
                <File className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setSelectedFile(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-600">
                  คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่
                </p>
                <p className="text-sm text-gray-500">
                  รองรับไฟล์ CSV, Excel, TXT, PDF
                </p>
              </div>
            )}
            <Input
              type="file"
              accept=".csv,.xlsx,.xls,.txt,.pdf"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={resetUpload}>
            ล้างข้อมูล
          </Button>
          <Button 
            onClick={processFile}
            disabled={uploadStatus === 'uploading' || !selectedFile || !examType || !subject}
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
          >
            {uploadStatus === 'uploading' ? 'กำลังประมวลผล...' : 'สร้างข้อสอบ'}
          </Button>
        </div>

        {uploadResults && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {uploadStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
                <span>ผลการสร้างข้อสอบ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">จำนวนทั้งหมด</p>
                  <p className="text-2xl font-bold">{uploadResults.totalQuestions}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">สำเร็จ</p>
                  <p className="text-2xl font-bold text-green-600">{uploadResults.successCount}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">ข้อผิดพลาด</p>
                  <p className="text-2xl font-bold text-red-600">{uploadResults.errorCount}</p>
                </div>
              </div>

              {uploadResults.errors && uploadResults.errors.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">ข้อผิดพลาด:</h4>
                  <div className="space-y-2">
                    {uploadResults.errors.map((error: any, index: number) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm">
                          <strong>บรรทัด {error.line}:</strong> {error.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadStatus === 'success' && (
                <div className="mt-6 pt-6 border-t">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={() => {
                      // Navigate to the created quiz
                      toast({
                        title: 'เริ่มทำข้อสอบ',
                        description: 'กำลังนำไปยังข้อสอบที่สร้างใหม่',
                      });
                    }}
                  >
                    เริ่มทำข้อสอบที่สร้างใหม่
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
