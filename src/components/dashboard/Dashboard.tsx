
import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Trophy, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();

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

  const { data: userAttempts } = useQuery({
    queryKey: ['user-attempts', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('exam_attempts')
        .select('*, exams(exam_name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          สวัสดี, {profile?.first_name || 'ผู้ใช้'}!
        </h1>
        <p className="text-gray-600 mt-2">
          ยินดีต้อนรับสู่ Smart Exam Mastery - เตรียมความพร้อมสำหรับการสอบของคุณ
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
              <p className="text-sm font-medium text-gray-600">ครั้งที่ทำสอบ</p>
              <p className="text-2xl font-bold text-gray-900">{userAttempts?.length || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ย</p>
              <p className="text-2xl font-bold text-gray-900">
                {userAttempts?.length ? 
                  Math.round(userAttempts.reduce((acc, attempt) => acc + (attempt.percentage || 0), 0) / userAttempts.length) 
                  : 0}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">เป้าหมาย</p>
              <p className="text-lg font-bold text-gray-900">
                {profile?.target_exam ? getExamTypeName(profile.target_exam) : 'ยังไม่ระบุ'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <Button>เริ่มทำข้อสอบ</Button>
                </div>
              ))}
              {(!exams || exams.length === 0) && (
                <p className="text-gray-500 text-center py-4">
                  ยังไม่มีข้อสอบในระบบ
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Attempts */}
        <Card>
          <CardHeader>
            <CardTitle>การทำข้อสอบล่าสุด</CardTitle>
            <CardDescription>
              ประวัติการทำข้อสอบของคุณ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userAttempts?.map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{(attempt.exams as any)?.exam_name}</h3>
                    <p className="text-sm text-gray-600">
                      คะแนน: {attempt.score}/{attempt.percentage}%
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(attempt.created_at).toLocaleDateString('th-TH')}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded text-sm ${
                    attempt.pass_status === 'pass' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {attempt.pass_status === 'pass' ? 'ผ่าน' : 'ไม่ผ่าน'}
                  </div>
                </div>
              ))}
              {(!userAttempts || userAttempts.length === 0) && (
                <p className="text-gray-500 text-center py-4">
                  ยังไม่มีการทำข้อสอบ
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
