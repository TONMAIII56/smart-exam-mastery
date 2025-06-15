
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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

interface ExamData {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
}

const examData: ExamData = {
  id: 'civil-001',
  title: 'การสอบราชการ - ภาค ก',
  duration: 180,
  questions: [
    {
      id: 'q1',
      text: 'ข้อใดคือผลลัพธ์ของ 25 × 4 ÷ 2 - 10?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: '30' },
        { id: 'b', text: '40' },
        { id: 'c', text: '45' },
        { id: 'd', text: '50' }
      ],
      correctAnswer: 'b',
      explanation: '25 × 4 = 100, 100 ÷ 2 = 50, 50 - 10 = 40'
    },
    {
      id: 'q2',
      text: 'คำว่า "อักษร" หมายถึงข้อใด?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'ตัวหนังสือ' },
        { id: 'b', text: 'เสียงพูด' },
        { id: 'c', text: 'ภาษาเขียน' },
        { id: 'd', text: 'สัญลักษณ์' }
      ],
      correctAnswer: 'a',
      explanation: 'อักษร หมายถึง ตัวหนังสือหรือตัวพยัญชนะที่ใช้ในการเขียน'
    },
    {
      id: 'q3',
      text: 'The company ______ its new product next month.',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'launch' },
        { id: 'b', text: 'launches' },
        { id: 'c', text: 'will launch' },
        { id: 'd', text: 'launching' }
      ],
      correctAnswer: 'c',
      explanation: 'ใช้ future simple tense กับเหตุการณ์ในอนาคต'
    }
  ]
};

const ExamHeader: React.FC<{
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
}> = ({ title, currentQuestion, totalQuestions, timeLeft }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{title}</h1>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">คำถาม:</span>
              <span className="font-medium">{currentQuestion}/{totalQuestions}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className={`h-5 w-5 mr-2 ${timeLeft < 300 ? 'text-red-500' : 'text-gray-500'}`} />
              <span className={`font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-800'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>
    </header>
  );
};

const QuestionCard: React.FC<{
  question: Question;
  selectedAnswer: string | undefined;
  onAnswer: (questionId: string, answer: string) => void;
}> = ({ question, selectedAnswer, onAnswer }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="bg-blue-100 text-blue-800 font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4 text-sm">
            ?
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800 mb-4">{question.text}</h3>
            
            {question.type === 'multiple_choice' && question.options && (
              <div className="space-y-3">
                {question.options.map(option => (
                  <label 
                    key={option.id} 
                    className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedAnswer === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.id}
                      checked={selectedAnswer === option.id}
                      onChange={() => onAnswer(question.id, option.id)}
                      className="mt-1 mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option.text}</span>
                  </label>
                ))}
              </div>
            )}
            
            {question.type === 'true_false' && (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'true', label: 'ถูก', color: 'green' },
                  { value: 'false', label: 'ผิด', color: 'red' }
                ].map(({ value, label, color }) => (
                  <Button
                    key={value}
                    variant={selectedAnswer === value ? "default" : "outline"}
                    onClick={() => onAnswer(question.id, value)}
                    className={selectedAnswer === value ? 
                      (color === 'green' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600') : 
                      ''
                    }
                  >
                    {label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Exam: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(examData.duration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    navigate('/quiz-results', { 
      state: { 
        answers, 
        questions: examData.questions,
        examTitle: examData.title 
      } 
    });
  };

  const currentQ = examData.questions[currentQuestion];

  return (
    <div className="bg-gray-50 min-h-screen">
      <ExamHeader 
        title={examData.title}
        currentQuestion={currentQuestion + 1}
        totalQuestions={examData.questions.length}
        timeLeft={timeLeft}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <QuestionCard 
          question={currentQ}
          selectedAnswer={answers[currentQ.id]}
          onAnswer={handleAnswer}
        />
        
        <div className="mt-8 flex justify-between">
          <Button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            ย้อนกลับ
          </Button>
          
          {currentQuestion < examData.questions.length - 1 ? (
            <Button onClick={handleNext} className="flex items-center">
              ถัดไป
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              ส่งคำตอบ
            </Button>
          )}
        </div>
        
        <div className="mt-6 grid grid-cols-5 gap-2">
          {examData.questions.map((q, index) => (
            <Button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              variant={currentQuestion === index ? "default" : answers[q.id] ? "secondary" : "outline"}
              className="h-10"
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exam;
