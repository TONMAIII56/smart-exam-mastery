
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, Trophy, Clock, Crown, BarChart3 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/components/auth/AuthProvider';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscription, isPremium } = useSubscription();

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

  const { data: recentResults } = useQuery({
    queryKey: ['recent-results', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: monthlyUsage } = useQuery({
    queryKey: ['monthly-usage', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const currentMonth = new Date().getFullYear() * 100 + new Date().getMonth() + 1;
      const { data, error } = await supabase
        .from('usage_tracking')
        .select('*')
        .eq('user_id', user.id)
        .eq('usage_month', currentMonth);
      
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

  const startExam = (examId?: string) => {
    if (examId) {
      navigate(`/quiz?examId=${examId}`);
    } else {
      navigate('/quiz-selection');
    }
  };

  const totalUsage = monthlyUsage?.reduce((sum, usage) => sum + (usage.usage_count || 0), 0) || 0;

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

      {/* Subscription Status */}
      {subscription && (
        <Card className={`mb-8 ${isPremium ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50' : 'border-gray-200'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isPremium && <Crown className="h-6 w-6 text-orange-500" />}
                <div>
                  <Badge 
                    variant={isPremium ? "default" : "secondary"}
                    className={isPremium ? 'bg-orange-500' : 'bg-gray-500'}
                  >
                    {isPremium ? 'Premium Member' : 'Free Member'}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    {isPremium 
                      ? 'คุณสามารถทำข้อสอบได้ไม่จำกัด'
                      : `คุณใช้สิทธิ์ไปแล้ว ${totalUsage} ครั้งในเดือนนี้`
                    }
                  </p>
                </div>
              </div>
              {!isPremium && (
                <Button 
                  onClick={() => navigate('/subscription')}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Crown className="mr-2 h-4 w-4" />
                  อัพเกรด Premium
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
              <p className="text-sm font-medium text-gray-600">ทำแล้ว</p>
              <p className="text-2xl font-bold text-gray-900">{recentResults?.length || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ย</p>
              <p className="text-2xl font-bold text-gray-900">
                {recentResults?.length 
                  ? Math.round(recentResults.reduce((sum, result) => sum + result.percentage, 0) / recentResults.length)
                  : 0
                }%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">สถานะ</p>
              <p className="text-lg font-bold text-gray-900">
                {isPremium ? 'Premium' : 'Free'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Results */}
      {recentResults && recentResults.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              ผลการสอบล่าสุด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">
                      {getExamTypeName(result.exam_type)} - {getSubjectName(result.subject)}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {new Date(result.completed_at || '').toLocaleDateString('th-TH')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {result.score}/{result.total_questions}
                    </p>
                    <Badge 
                      variant={result.percentage >= 70 ? "default" : "secondary"}
                      className={result.percentage >= 70 ? 'bg-green-500' : 'bg-red-500'}
                    >
                      {result.percentage.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
