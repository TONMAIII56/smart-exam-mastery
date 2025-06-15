
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false';
  options?: Array<{
    id: string;
    text: string;
  }>;
  correctAnswer: string;
  explanation: string;
}

const CircularProgress: React.FC<{ score: number }> = ({ score }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={score >= 80 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444"}
          strokeWidth="6"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{score}%</span>
      </div>
    </div>
  );
};

const QuizResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { answers = {}, questions = [], examTitle = 'แบบทดสอบ' } = location.state || {};

  const correctCount = questions.filter(
    (q: Question) => answers[q.id] === q.correctAnswer
  ).length;
  
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  const getResultMessage = () => {
    if (score >= 80) return 'ยินดีด้วย! คุณผ่านการทดสอบ';
    if (score >= 50) return 'คุณทำได้ดี แต่ยังมีพื้นที่ให้พัฒนาอีก';
    return 'คุณควรทบทวนเนื้อหาเพิ่มเติม';
  };

  const getAnswerText = (question: Question, answerId: string) => {
    if (question.type === 'true_false') {
      return answerId === 'true' ? 'ถูก' : 'ผิด';
    }
    return question.options?.find(o => o.id === answerId)?.text || answerId;
  };

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">ไม่พบข้อมูลการสอบ</h2>
        <Button onClick={() => navigate('/quiz-selection')}>
          กลับสู่หน้าเลือกข้อสอบ
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-6">ผลการสอบ</CardTitle>
            <p className="text-xl text-gray-600">{examTitle}</p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-8">
              <CircularProgress score={score} />
            </div>
            
            <div className="mb-8">
              <p className="text-xl font-medium text-gray-700 mb-2">{getResultMessage()}</p>
              <p className="text-gray-600">
                คุณตอบถูก {correctCount} จาก {questions.length} ข้อ
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-blue-50">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-gray-600">คะแนนรวม</p>
                  <p className="text-2xl font-bold text-blue-600">{score}%</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-gray-600">ตอบถูก</p>
                  <p className="text-2xl font-bold text-green-600">{correctCount}</p>
                </CardContent>
              </Card>
              <Card className="bg-red-50">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-gray-600">ตอบผิด</p>
                  <p className="text-2xl font-bold text-red-600">{questions.length - correctCount}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button onClick={() => navigate('/quiz-selection')} variant="outline" className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                กลับสู่หน้าหลัก
              </Button>
              <Button onClick={() => window.location.reload()} className="flex items-center">
                <RotateCcw className="h-4 w-4 mr-2" />
                ทดสอบอีกครั้ง
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>สรุปคำตอบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {questions.map((question: Question, index: number) => {
                const isCorrect = answers[question.id] === question.correctAnswer;
                const userAnswer = answers[question.id];
                
                return (
                  <div key={question.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start mb-3">
                      <span className="bg-gray-100 text-gray-800 rounded-full h-8 w-8 flex items-center justify-center mr-3 text-sm font-medium">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">{question.text}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mr-2" />
                            )}
                            <span className="text-sm">
                              <span className="font-medium">คำตอบของคุณ: </span>
                              <Badge variant={isCorrect ? "default" : "destructive"}>
                                {getAnswerText(question, userAnswer)}
                              </Badge>
                            </span>
                          </div>
                          
                          {!isCorrect && (
                            <div className="flex items-center ml-7">
                              <span className="text-sm">
                                <span className="font-medium text-green-600">คำตอบที่ถูกต้อง: </span>
                                <Badge className="bg-green-100 text-green-800">
                                  {getAnswerText(question, question.correctAnswer)}
                                </Badge>
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {question.explanation && (
                          <div className="mt-3 bg-blue-50 p-3 rounded-md">
                            <p className="text-sm text-blue-800">
                              <span className="font-medium">คำอธิบาย: </span>
                              {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizResults;
