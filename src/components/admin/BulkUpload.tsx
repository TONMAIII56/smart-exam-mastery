
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, FileText, CheckCircle, AlertTriangle, X } from 'lucide-react';

const BulkUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [examType, setExamType] = useState('');
  const [subject, setSubject] = useState('');
  const [uploadResults, setUploadResults] = useState<any>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setSelectedFile(file);
        setUploadStatus('idle');
      } else {
        toast({
          title: 'ไฟล์ไม่ถูกต้อง',
          description: 'กรุณาเลือกไฟล์ CSV หรือ Excel เท่านั้น',
          variant: 'destructive',
        });
      }
    }
  };

  const handleUpload = async () => {
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
      
      // Mock results
      const mockResults = {
        totalRows: 50,
        successCount: 45,
        errorCount: 5,
        errors: [
          { row: 3, message: 'คำถามว่างเปล่า' },
          { row: 7, message: 'ตัวเลือกไม่ครบ' },
          { row: 12, message: 'ไม่มีคำตอบที่ถูกต้อง' },
          { row: 23, message: 'รูปแบบไม่ถูกต้อง' },
          { row: 34, message: 'คำถามซ้ำ' }
        ]
      };
      
      setUploadResults(mockResults);
      setUploadStatus('success');
      
      toast({
        title: 'อัพโลดสำเร็จ',
        description: `นำเข้าคำถาม ${mockResults.successCount} ข้อสำเร็จ`,
      });
    } catch (error) {
      setUploadStatus('error');
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถอัพโลดไฟล์ได้',
        variant: 'destructive',
      });
    }
  };

  const downloadTemplate = () => {
    // Create a sample CSV template
    const csvContent = `question_text,option_a,option_b,option_c,option_d,correct_answer,explanation,difficulty_level
"ข้อใดคือเมืองหลวงของประเทศไทย?","กรุงเทพฯ","เชียงใหม่","ภูเก็ต","ขอนแก่น","A","กรุงเทพฯ หรือ กรุงเทพมหานคร เป็นเมืองหลวงของประเทศไทย","easy"
"2 + 2 เท่ากับเท่าใด?","3","4","5","6","B","2 + 2 = 4","easy"`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'question_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setUploadResults(null);
    setExamType('');
    setSubject('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Bulk Upload</h2>
        <Button onClick={downloadTemplate} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          ดาวน์โหลดแบบฟอร์ม
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>อัพโลดคำถามจำนวนมาก</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              สามารถอัพโลดไฟล์ CSV หรือ Excel ที่มีคำถามหลายข้อพร้อมกัน กรุณาดาวน์โหลดแบบฟอร์มตัวอย่างก่อนการใช้งาน
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
                  <SelectItem value="english-language">ภาษาอังกฤษ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="file_upload">เลือกไฟล์</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {selectedFile ? (
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="h-8 w-8 text-blue-600" />
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
                    รองรับไฟล์ CSV และ Excel เท่านั้น
                  </p>
                </div>
              )}
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
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
              onClick={handleUpload}
              disabled={uploadStatus === 'uploading' || !selectedFile || !examType || !subject}
            >
              {uploadStatus === 'uploading' ? 'กำลังอัพโหลด...' : 'อัพโหลด'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {uploadResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {uploadStatus === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
              <span>ผลการอัพโหลด</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">จำนวนทั้งหมด</p>
                <p className="text-2xl font-bold">{uploadResults.totalRows}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">สำเร็จ</p>
                <p className="text-2xl font-bold text-green-600">{uploadResults.successCount}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">ผิดพลาด</p>
                <p className="text-2xl font-bold text-red-600">{uploadResults.errorCount}</p>
              </div>
            </div>

            {uploadResults.errors.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">ข้อผิดพลาด:</h4>
                <div className="space-y-2">
                  {uploadResults.errors.map((error: any, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm">
                        <strong>แถว {error.row}:</strong> {error.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkUpload;
