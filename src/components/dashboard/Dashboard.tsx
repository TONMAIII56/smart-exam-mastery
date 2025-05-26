
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Trophy, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const { data: exams } = useQuery({
    queryKey: ['exams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('is_active', true)
        .limit(6);
      
      if (error) throw error;
      return data;
    },
  });

  const getExamTypeName = (type: string) => {
    switch (type) {
      case 'civil-service': return 'ข้าราชการ';
      case 'toeic': return 'TOEIC';
      case 'aisa': return 'AISA';
      default: return type;
    }
  };

  const getSubjectName = (subject: string) => {
    const subjectMap: Record<string, string> = {
      'general-knowledge': 'ความรู้ทั่วไป',
      'thai-language': 'ภาษาไทย',
      'mathematics': 'คณิตศาสตร์',
      'english': 'ภาษาอังกฤษ',
      'listening': 'การฟัง',
      'reading': 'การอ่าน',
      'grammar': 'ไวยากรณ์',
      'vocabulary': 'คำศัพท์',
      'science': 'วิทยาศาสตร์',
      'general': 'ทั่วไป',
    };
    return subjectMap[subject] || subject;
  };

  const startExam = (examId?: string) => {
    if (examId) {
      navigate(`/quiz?examId=${examId}`);
    } else {
      navigate('/quiz-selection');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ยินดีต้อนรับสู่ Smart Exam Mastery
        </h1>
        <p className="text-gray-600 mt-2">
          เตรียมความพร้อมสำหรับการสอบของคุณ
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ข้อสอบทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{exams?.length || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Target className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">เป้าหมาย</p>
              <p className="text-lg font-bold text-gray-900">สำเร็จการศึกษา</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ระดับ</p>
              <p className="text-lg font-bold text-gray-900">เริ่มต้น</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">สถานะ</p>
              <p className="text-lg font-bold text-gray-900">พร้อมทำข้อสอบ</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Exams */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อสอบที่ใช้ได้</CardTitle>
          <CardDescription>
            เลือกข้อสอบที่คุณต้องการทำ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exams?.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{exam.exam_name}</h3>
                  <p className="text-sm text-gray-600">
                    {getExamTypeName(exam.exam_type)} - {getSubjectName(exam.subject)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {exam.total_questions} ข้อ • {exam.time_limit} นาที
                  </p>
                </div>
                <Button onClick={() => startExam(exam.id)}>เริ่มทำข้อสอบ</Button>
              </div>
            ))}
            {(!exams || exams.length === 0) && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">ยังไม่มีข้อสอบในระบบ</p>
                <p className="text-sm text-gray-400 mb-4">ระบบจะเพิ่มข้อสอบในเร็วๆ นี้</p>
                <Button onClick={() => startExam()}>ทดลองทำข้อสอบตัวอย่าง</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
