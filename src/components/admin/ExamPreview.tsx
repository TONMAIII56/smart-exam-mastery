
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Clock, FileText, Users, Award } from 'lucide-react';

interface ExamPreviewProps {
  examId: string;
  onClose: () => void;
}

const ExamPreview = ({ examId, onClose }: ExamPreviewProps) => {
  const { data: exam, isLoading } = useQuery({
    queryKey: ['exam-preview', examId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exams')
        .select(`
          *,
          questions (
            id,
            question_text,
            question_type,
            difficulty_level,
            options (
              id,
              option_text,
              is_correct
            )
          )
        `)
        .eq('id', examId)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>กำลังโหลดข้อมูลข้อสอบ...</p>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="text-center py-8">
        <p>ไม่พบข้อมูลข้อสอบ</p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Exam Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{exam.exam_name}</CardTitle>
              <p className="text-gray-600 mt-2">{exam.description}</p>
            </div>
            <div className="flex space-x-2">
              <Badge className={getStatusColor(exam.status)}>
                {exam.status}
              </Badge>
              {exam.premium_only && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  Premium
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">เวลา</p>
                <p className="font-medium">{exam.time_limit} นาที</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">คำถาม</p>
                <p className="font-medium">{exam.questions?.length || 0} ข้อ</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">คะแนนผ่าน</p>
                <p className="font-medium">{exam.passing_score}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getDifficultyColor(exam.difficulty_level)}>
                {exam.difficulty_level}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Preview */}
      <Card>
        <CardHeader>
          <CardTitle>คำถามในข้อสอบ ({exam.questions?.length || 0} ข้อ)</CardTitle>
        </CardHeader>
        <CardContent>
          {exam.questions && exam.questions.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {exam.questions.map((question: any, index: number) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">คำถามที่ {index + 1}</h4>
                    <Badge className={getDifficultyColor(question.difficulty_level)}>
                      {question.difficulty_level}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-3">{question.question_text}</p>
                  
                  {question.question_type === 'multiple_choice' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option: any, optIndex: number) => (
                        <div key={option.id} className={`p-2 rounded text-sm ${
                          option.is_correct 
                            ? 'bg-green-100 text-green-800 font-medium' 
                            : 'bg-gray-100'
                        }`}>
                          {String.fromCharCode(65 + optIndex)}. {option.option_text}
                          {option.is_correct && ' ✓'}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>ยังไม่มีคำถามในข้อสอบนี้</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลเพิ่มเติม</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">รหัสข้อสอบ</p>
              <p className="font-medium">{exam.exam_code || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ประเภท</p>
              <p className="font-medium">{exam.exam_type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">หมวดวิชา</p>
              <p className="font-medium">{exam.subject}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">การมองเห็น</p>
              <p className="font-medium">{exam.visibility}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">สร้างเมื่อ</p>
              <p className="font-medium">{new Date(exam.created_at).toLocaleDateString('th-TH')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">อัพเดทล่าสุด</p>
              <p className="font-medium">{new Date(exam.updated_at).toLocaleDateString('th-TH')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          ปิด
        </Button>
        <Button>
          แก้ไขข้อสอบ
        </Button>
      </div>
    </div>
  );
};

export default ExamPreview;
