
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { History, Eye, RotateCcw } from 'lucide-react';

interface QuestionVersionsProps {
  questionId: string;
  onClose: () => void;
}

const QuestionVersions = ({ questionId, onClose }: QuestionVersionsProps) => {
  const { data: versions, isLoading } = useQuery({
    queryKey: ['question-versions', questionId],
    queryFn: async () => {
      // Mock data for question versions
      return [
        {
          id: '1',
          version_number: 3,
          question_data: {
            question_text: 'ข้อใดไม่ใช่หลักการสำคัญของระบอบประชาธิปไตย? (เวอร์ชันปัจจุบัน)',
            options: [
              { option_text: 'หลักอำนาจอธิปไตยเป็นของปวงชน', is_correct: false },
              { option_text: 'หลักการแบ่งแยกอำนาจอธิปไตย', is_correct: false },
              { option_text: 'หลักการรวมอำนาจการปกครอง', is_correct: true },
              { option_text: 'หลักการเคารพสิทธิและเสรีภาพของประชาชน', is_correct: false }
            ]
          },
          created_at: '2024-06-15T10:30:00Z',
          created_by: 'admin@example.com'
        },
        {
          id: '2',
          version_number: 2,
          question_data: {
            question_text: 'ข้อใดไม่ใช่หลักการของระบอบประชาธิปไตย?',
            options: [
              { option_text: 'หลักอำนาจอธิปไตยเป็นของปวงชน', is_correct: false },
              { option_text: 'หลักการแบ่งแยกอำนาจ', is_correct: false },
              { option_text: 'หลักการรวมอำนาจ', is_correct: true },
              { option_text: 'หลักการเคารพสิทธิและเสรีภาพ', is_correct: false }
            ]
          },
          created_at: '2024-06-10T14:20:00Z',
          created_by: 'editor@example.com'
        },
        {
          id: '3',
          version_number: 1,
          question_data: {
            question_text: 'หลักการใดไม่ใช่หลักการของประชาธิปไตย?',
            options: [
              { option_text: 'อำนาจอธิปไตยเป็นของปวงชน', is_correct: false },
              { option_text: 'การแบ่งแยกอำนาจ', is_correct: false },
              { option_text: 'การรวมอำนาจ', is_correct: true }
            ]
          },
          created_at: '2024-06-05T09:15:00Z',
          created_by: 'creator@example.com'
        }
      ];
    }
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>กำลังโหลดประวัติคำถาม...</p>
      </div>
    );
  }

  const handleRevertToVersion = (versionNumber: number) => {
    // Implementation for reverting to a specific version
    console.log('Reverting to version:', versionNumber);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ประวัติการแก้ไขคำถาม</h3>
        <Badge variant="outline" className="flex items-center space-x-1">
          <History className="h-4 w-4" />
          <span>{versions?.length || 0} เวอร์ชัน</span>
        </Badge>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {versions?.map((version: any, index: number) => (
          <Card key={version.id} className={index === 0 ? 'border-blue-500' : ''}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-lg">
                    เวอร์ชัน {version.version_number}
                  </CardTitle>
                  {index === 0 && (
                    <Badge className="bg-blue-100 text-blue-800">
                      ปัจจุบัน
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {index > 0 && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRevertToVersion(version.version_number)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>แก้ไขโดย: {version.created_by}</p>
                <p>เมื่อ: {new Date(version.created_at).toLocaleString('th-TH')}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-700">คำถาม:</h5>
                  <p className="text-gray-900">{version.question_data.question_text}</p>
                </div>
                
                {version.question_data.options && (
                  <div>
                    <h5 className="font-medium text-gray-700">ตัวเลือก:</h5>
                    <div className="space-y-1">
                      {version.question_data.options.map((option: any, optIndex: number) => (
                        <div key={optIndex} className={`p-2 rounded text-sm ${
                          option.is_correct 
                            ? 'bg-green-100 text-green-800 font-medium' 
                            : 'bg-gray-100'
                        }`}>
                          {String.fromCharCode(65 + optIndex)}. {option.option_text}
                          {option.is_correct && ' ✓'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onClose}>
          ปิด
        </Button>
      </div>
    </div>
  );
};

export default QuestionVersions;
