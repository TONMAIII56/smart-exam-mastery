import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { RegisterPopup } from '@/components/auth/RegisterPopup';
import { useAuth } from '@/components/auth/AuthProvider';

// Define types for quiz data structure
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Subject {
  title: string;
  questions: Question[];
}

interface ExamData {
  [subjectId: string]: Subject;
}

interface MockQuizData {
  [examType: string]: ExamData;
}

// Mock quiz data with proper typing
const mockQuizData: MockQuizData = {
  'civil-service': {
    'general-knowledge': {
      title: 'ความรู้ทั่วไป',
      questions: [
        {
          id: 1,
          question: 'เมืองหลวงของประเทศไทยคือข้อใด?',
          options: ['เชียงใหม่', 'กรุงเทพมหานคร', 'ขอนแก่น', 'หาดใหญ่'],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'แม่น้ำที่ยาวที่สุดในประเทศไทยคือข้อใด?',
          options: ['แม่น้ำเจ้าพระยา', 'แม่น้ำมูล', 'แม่น้ำชี', 'แม่น้ำน่าน'],
          correctAnswer: 0
        },
        {
          id: 3,
          question: 'ประเทศไทยมีกี่จังหวัด?',
          options: ['75', '76', '77', '78'],
          correctAnswer: 2
        },
        {
          id: 4,
          question: 'สัญลักษณ์ประจำชาติไทยคือข้อใด?',
          options: ['ดอกบัว', 'ดอกราชพฤกษ์', 'ดอกจิก', 'ดอกกุหลาบ'],
          correctAnswer: 1
        },
        {
          id: 5,
          question: 'ภูเขาที่สูงที่สุดในประเทศไทยคือข้อใด?',
          options: ['ดอยอินทนนท์', 'ดอยผ้าห่มปก', 'ดอยหลวงเชียงดาว', 'ดอยสุเทพ'],
          correctAnswer: 0
        }
      ]
    }
  }
};

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const examType = searchParams.get('exam') || 'civil-service';
  const subjectId = searchParams.get('subject') || 'general-knowledge';
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [showPopup, setShowPopup] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Safe access to quiz data with type checking
  const quizData = mockQuizData[examType]?.[subjectId];
  
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleFinishQuiz();
    }
  }, [timeLeft, quizCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    quizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handleFinishQuiz = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setQuizCompleted(true);
    
    // Store quiz results in session storage
    sessionStorage.setItem('quizResults', JSON.stringify({
      score: finalScore,
      total: quizData.questions.length,
      exam: examType,
      subject: subjectId,
      answers: answers,
      questions: quizData.questions
    }));
    
    // If user is already authenticated, go directly to results
    if (user) {
      navigate(`/quiz-results?score=${finalScore}&total=${quizData.questions.length}&exam=${examType}&subject=${subjectId}`);
    } else {
      // Show registration popup for non-authenticated users
      setShowPopup(true);
    }
  };

  const handleRegisterSuccess = () => {
    setShowPopup(false);
    navigate(`/quiz-results?score=${score}&total=${quizData.questions.length}&exam=${examType}&subject=${subjectId}`);
  };

  const handleCancelPopup = () => {
    setShowPopup(false);
    navigate('/');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
  const currentQ = quizData.questions[currentQuestion];

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบข้อสอบ</h1>
          <Button onClick={() => navigate('/quiz-selection')}>
            กลับไปเลือกข้อสอบ
          </Button>
        </div>
      </div>
    );
  }

  if (quizCompleted && !user) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardContent className="p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">ทำแบบทดสอบเสร็จสิ้น!</h1>
              <p className="text-xl text-gray-600 mb-6">
                คุณได้ <span className="font-bold text-orange-600">{score}/{quizData.questions.length}</span> คะแนน
              </p>
              <p className="text-gray-500">
                กรุณาลงทะเบียนเพื่อดูผลการสอบโดยละเอียดและเฉลย
              </p>
            </CardContent>
          </Card>
        </div>
        <RegisterPopup
          score={score}
          totalQuestions={quizData.questions.length}
          onRegisterSuccess={handleRegisterSuccess}
          onCancel={handleCancelPopup}
          isOpen={showPopup}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{quizData.title}</h1>
            <div className="flex items-center space-x-2 text-orange-600">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-gray-500 mt-2">
            ข้อ {currentQuestion + 1} จาก {quizData.questions.length}
          </p>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion] === index
                      ? 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                  }`}
                >
                  <span className="font-medium mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>ข้อก่อนหน้า</span>
          </Button>

          <div className="flex space-x-4">
            {currentQuestion === quizData.questions.length - 1 ? (
              <Button
                onClick={handleFinishQuiz}
                className="bg-green-600 hover:bg-green-700 text-white px-8"
                disabled={answers[currentQuestion] === undefined}
              >
                ส่งคำตอบ
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600"
              >
                <span>ข้อต่อไป</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">ภาพรวมการตอบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {quizData.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`aspect-square rounded-lg border-2 text-sm font-medium transition-all ${
                    index === currentQuestion
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : answers[index] !== undefined
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-orange-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <RegisterPopup
        score={score}
        totalQuestions={quizData.questions.length}
        onRegisterSuccess={handleRegisterSuccess}
        onCancel={handleCancelPopup}
        isOpen={showPopup}
      />
    </div>
  );
};

export default Quiz;
