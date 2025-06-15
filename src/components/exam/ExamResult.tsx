
import React from 'react';
import { CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false';
  options?: Option[];
  correctAnswer: string;
  explanation?: string;
}

interface ExamResultProps {
  score: number;
  totalQuestions: number;
  answers: { [key: string]: string };
  questions: Question[];
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

export const ExamResult: React.FC<ExamResultProps> = ({ score, totalQuestions, answers, questions }) => {
  const navigate = useNavigate();
  
  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correctAnswer
  ).length;
  
  const getResultMessage = () => {
    if (score >= 80) return 'ยินดีด้วย! คุณผ่านการทดสอบ';
    if (score >= 50) return 'คุณทำได้ดี แต่ยังมีพื้นที่ให้พัฒนาอีก';
    return 'คุณควรทบทวนเนื้อหาเพิ่มเติม';
  };

  const getRecommendations = () => {
    if (score >= 80) {
      return 'คุณมีความรู้ในระดับดีมาก สามารถเตรียมตัวสำหรับการสอบจริงได้เลย';
    } else if (score >= 50) {
      return 'ควรทบทวนเนื้อหาในส่วนที่ตอบผิดและทำแบบทดสอบเพิ่มเติม';
    } else {
      return 'ควรศึกษาเนื้อหาให้เข้าใจก่อนทำแบบทดสอบอีกครั้ง';
    }
  };

  const getAnswerText = (question: Question, answerId: string) => {
    if (question.type === 'true_false') {
      return answerId === 'true' ? 'ถูก' : 'ผิด';
    }
    return question.options?.find(o => o.id === answerId)?.text || answerId;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
          <h2 className="text-3xl font-bold mb-6">ผลการสอบ</h2>
          
          <div className="mb-8">
            <CircularProgress score={score} />
          </div>
          
          <div className="mb-8">
            <p className="text-xl font-medium text-gray-700 mb-2">{getResultMessage()}</p>
            <p className="text-gray-600 mb-4">
              คุณตอบถูก {correctCount} จาก {totalQuestions} ข้อ
            </p>
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <p className="font-medium">คำแนะนำ:</p>
              <p className="text-gray-700">{getRecommendations()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">คะแนนรวม</p>
              <p className="text-2xl font-bold text-blue-600">{score}%</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">ตอบถูก</p>
              <p className="text-2xl font-bold text-green-600">{correctCount}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">ตอบผิด</p>
              <p className="text-2xl font-bold text-red-600">{totalQuestions - correctCount}</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md flex items-center"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              ทดสอบอีกครั้ง
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md flex items-center"
            >
              <Home className="h-4 w-4 mr-2" />
              กลับสู่หน้าหลัก
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-6">สรุปคำตอบ</h3>
          <div className="space-y-6">
            {questions.map((question, index) => {
              const isCorrect = answers[question.id] === question.correctAnswer;
              const userAnswer = answers[question.id];
              
              return (
                <div key={question.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start mb-3">
                    <span className="bg-gray-100 text-gray-800 rounded-full h-8 w-8 flex items-center justify-center mr-3 text-sm font-medium flex-shrink-0">
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
                            <span className={`inline-block px-2 py-1 rounded text-sm ${
                              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {getAnswerText(question, userAnswer)}
                            </span>
                          </span>
                        </div>
                        
                        {!isCorrect && (
                          <div className="flex items-center ml-7">
                            <span className="text-sm">
                              <span className="font-medium text-green-600">คำตอบที่ถูกต้อง: </span>
                              <span className="inline-block px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                                {getAnswerText(question, question.correctAnswer)}
                              </span>
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
        </div>
      </div>
    </div>
  );
};
