
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp, TrendingDown, RotateCcw, Home, Share2, Target } from 'lucide-react';

const QuizResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '1');
  const examType = searchParams.get('exam') || 'civil-service';
  const subjectId = searchParams.get('subject') || 'general-knowledge';
  
  const percentage = Math.round((score / total) * 100);
  
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 50) return { grade: 'C+', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage >= 40) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' };
  };
  
  const gradeInfo = getGrade(percentage);
  
  const mockStats = {
    avgScore: 73,
    yourRank: 245,
    totalUsers: 1234,
    improvement: 5,
    streak: 3,
    totalQuizzes: 12
  };

  const subjects = [
    { name: 'ความรู้รอบตัว', score: 75, trend: 'up' },
    { name: 'ภาษาไทย', score: 82, trend: 'up' },
    { name: 'คณิตศาสตร์', score: 68, trend: 'down' },
    { name: 'ภาษาอังกฤษ', score: 71, trend: 'up' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-white">
            <div className="mb-4">
              <Trophy className="h-16 w-16 mx-auto mb-2" />
              <h1 className="text-3xl font-bold">ผลคะแนนของคุณ</h1>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-yellow-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{score}</div>
                <div className="text-sm">ข้อถูก</div>
              </div>
              <div className="text-6xl font-bold text-white">/</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{total}</div>
                <div className="text-sm">ข้อทั้งหมด</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Score Card */}
        <Card className="mb-8 border-2 border-yellow-200">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold text-gray-800 mb-2">{percentage}%</div>
              <Badge className={`${gradeInfo.bg} ${gradeInfo.color} text-lg px-4 py-2`}>
                เกรด {gradeInfo.grade}
              </Badge>
            </div>
            
            <Progress value={percentage} className="h-4 mb-4" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{mockStats.yourRank}</div>
                <div className="text-sm text-gray-600">อันดับของคุณ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{mockStats.totalUsers}</div>
                <div className="text-sm text-gray-600">ผู้เข้าสอบทั้งหมด</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+{mockStats.improvement}%</div>
                <div className="text-sm text-gray-600">เทียบครั้งก่อน</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{mockStats.streak}</div>
                <div className="text-sm text-gray-600">วันติดต่อกัน</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Performance Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-yellow-500" />
                <span>การวิเคราะห์ผลคะแนน</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">คะแนนของคุณ</span>
                  <span className="font-bold text-lg">{percentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">คะแนนเฉลี่ย</span>
                  <span className="font-bold">{mockStats.avgScore}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ดีกว่าเฉลี่ย</span>
                  <span className={`font-bold ${percentage > mockStats.avgScore ? 'text-green-600' : 'text-red-600'}`}>
                    {percentage > mockStats.avgScore ? '+' : ''}{percentage - mockStats.avgScore}%
                  </span>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-gray-800 mb-3">คำแนะนำ</h4>
                  {percentage >= 80 ? (
                    <p className="text-green-700 text-sm">
                      🎉 เยี่ยมมาก! คุณมีความรู้ในหมวดนี้อยู่ในระดับดี ลองทำข้อสอบหมวดอื่น ๆ เพื่อเพิ่มความรู้
                    </p>
                  ) : percentage >= 60 ? (
                    <p className="text-blue-700 text-sm">
                      👍 ดีมาก! คุณสามารถพัฒนาต่อได้ ลองทบทวนเนื้อหาและฝึกทำข้อสอบเพิ่มเติม
                    </p>
                  ) : (
                    <p className="text-orange-700 text-sm">
                      💪 ยังต้องพัฒนาอีกนิดหน่อย แนะนำให้ศึกษาเนื้อหาพื้นฐานเพิ่มเติมและฝึกทำข้อสอบบ่อย ๆ
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <span>คะแนนรายหมวด</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">{subject.name}</span>
                      {subject.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={subject.score} className="w-20 h-2" />
                      <span className="font-semibold w-12 text-right">{subject.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">หมวดที่ควรพัฒนา</h4>
                <p className="text-yellow-700 text-sm">
                  คณิตศาสตร์ - คะแนนต่ำกว่าเฉลี่ย แนะนำให้ฝึกทำข้อสอบเพิ่มเติม
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          <Button 
            onClick={() => navigate(`/quiz?exam=${examType}&subject=${subjectId}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>ทำใหม่</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate(`/quiz-selection?type=${examType}`)}
            className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>เลือกหมวดอื่น</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/leaderboard')}
            className="border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center space-x-2"
          >
            <Trophy className="h-4 w-4" />
            <span>อันดับ</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="border-gray-500 text-gray-600 hover:bg-gray-50 flex items-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>หน้าหลัก</span>
          </Button>
        </div>

        {/* Share Section */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-gray-800 mb-3">แชร์ผลคะแนน</h3>
            <p className="text-gray-600 text-sm mb-4">
              แชร์ผลคะแนนกับเพื่อน ๆ และเชิญชวนให้มาทำข้อสอบด้วยกัน
            </p>
            <Button variant="outline" className="flex items-center space-x-2 mx-auto">
              <Share2 className="h-4 w-4" />
              <span>แชร์ผลคะแนน</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizResults;
