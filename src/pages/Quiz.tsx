
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExamHeader } from '@/components/exam/ExamHeader';
import { QuestionCard } from '@/components/exam/QuestionCard';
import { ExamResult } from '@/components/exam/ExamResult';

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
  audioUrl?: string;
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: Question[];
}

// Mock data สำหรับข้อสอบราชการ - ภาษาไทย
const civilServiceThaiMock: ExamData = {
  id: 'civil-thai',
  title: 'การสอบราชการ - ภาษาไทย',
  subject: 'thai-language',
  duration: 90,
  questions: [
    {
      id: 'q1',
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
      id: 'q2',
      text: 'ข้อใดเป็นคำราชาศัพท์?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'กิน' },
        { id: 'b', text: 'เสวย' },
        { id: 'c', text: 'ทาน' },
        { id: 'd', text: 'บริโภค' }
      ],
      correctAnswer: 'b',
      explanation: '"เสวย" เป็นคำราชาศัพท์ที่ใช้กับพระมหากษัตริย์และพระบรมวงศานุวงศ์'
    },
    {
      id: 'q3',
      text: 'ประโยค "เขาไปตลาดเมื่อเช้า" มีกรรมกี่ตัว?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: '0 ตัว' },
        { id: 'b', text: '1 ตัว' },
        { id: 'c', text: '2 ตัว' },
        { id: 'd', text: '3 ตัว' }
      ],
      correctAnswer: 'a',
      explanation: 'ประโยคนี้ไม่มีกรรม เพราะ "ไป" เป็นกริยาอกรรมก'
    },
    {
      id: 'q4',
      text: 'คำว่า "สันโดษ" มีความหมายว่าอย่างไร?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เศร้าโศก' },
        { id: 'b', text: 'พอใจในสิ่งที่มี' },
        { id: 'c', text: 'โกรธแค้น' },
        { id: 'd', text: 'ดีใจยินดี' }
      ],
      correctAnswer: 'b',
      explanation: '"สันโดษ" หมายถึง การพอใจในสิ่งที่ตนมี ไม่โลภมาก'
    },
    {
      id: 'q5',
      text: 'ข้อใดเป็นการใช้เครื่องหมายวรรคตอนที่ถูกต้อง?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เขาถาม "คุณไปไหน"' },
        { id: 'b', text: 'เขาถาม "คุณไปไหน?"' },
        { id: 'c', text: 'เขาถาม, "คุณไปไหน?"' },
        { id: 'd', text: 'เขาถามว่า "คุณไปไหน?"' }
      ],
      correctAnswer: 'd',
      explanation: 'การใช้คำว่า "ว่า" ก่อนเครื่องหมายคำพูดเป็นการใช้ที่ถูกต้อง'
    }
  ]
};

// Mock data สำหรับข้อสอบ TOEIC - การฟัง
const toeicListeningMock: ExamData = {
  id: 'toeic-listening',
  title: 'TOEIC - การฟัง',
  subject: 'listening',
  duration: 45,
  questions: [
    {
      id: 'q1',
      text: 'Listen to the conversation and answer the question: What time does the meeting start?',
      audioUrl: '/audio/toeic-1.mp3',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: '9:00 AM' },
        { id: 'b', text: '10:00 AM' },
        { id: 'c', text: '2:00 PM' },
        { id: 'd', text: '3:00 PM' }
      ],
      correctAnswer: 'b',
      explanation: 'The woman says: "The meeting has been moved to 10 o\'clock."'
    },
    {
      id: 'q2',
      text: 'Listen to the announcement: Where is flight CA102 departing for?',
      audioUrl: '/audio/toeic-2.mp3',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Bangkok' },
        { id: 'b', text: 'Singapore' },
        { id: 'c', text: 'Tokyo' },
        { id: 'd', text: 'Seoul' }
      ],
      correctAnswer: 'd',
      explanation: 'The announcement says: "Flight CA102 to Seoul is now boarding."'
    }
  ]
};

const Quiz: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const exam = searchParams.get('exam');
  const subject = searchParams.get('subject');
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // โหลดข้อสอบตามประเภทและหมวดหมู่
  useEffect(() => {
    if (!exam || !subject) {
      setIsLoading(false);
      return;
    }
    
    console.log('Loading exam:', exam, 'subject:', subject);
    
    // จำลองการโหลดข้อมูล
    setTimeout(() => {
      if (exam === 'civil-service' && subject === 'thai-language') {
        setExamData(civilServiceThaiMock);
        setTimeLeft(civilServiceThaiMock.duration * 60);
      } else if (exam === 'toeic' && subject === 'listening') {
        setExamData(toeicListeningMock);
        setTimeLeft(toeicListeningMock.duration * 60);
      } else {
        // ข้อสอบอื่นๆ ใช้ข้อมูลภาษาไทยเป็นค่าเริ่มต้น
        setExamData(civilServiceThaiMock);
        setTimeLeft(civilServiceThaiMock.duration * 60);
      }
      setIsLoading(false);
    }, 1000);
  }, [exam, subject]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (examData && currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsFinished(true);
  };

  // คำนวณคะแนน
  const calculateScore = () => {
    if (!examData) return 0;
    
    let correct = 0;
    examData.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / examData.questions.length) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">กำลังโหลดข้อสอบ...</p>
          <p className="text-gray-500">
            {exam && subject ? (
              <>
                <span className="font-medium capitalize">{exam}</span> -{' '}
                <span className="capitalize">{subject}</span>
              </>
            ) : (
              'กรุณาเลือกข้อสอบ'
            )}
          </p>
        </div>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">ไม่พบข้อสอบ</h2>
          <p className="text-gray-600 mb-4">กรุณาเลือกข้อสอบที่ต้องการ</p>
          <button
            onClick={() => navigate('/quiz-selection')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
          >
            เลือกข้อสอบ
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return <ExamResult 
      score={calculateScore()} 
      totalQuestions={examData.questions.length}
      answers={answers}
      questions={examData.questions}
    />;
  }

  const currentQ = examData.questions[currentQuestion];

  return (
    <div className="bg-gray-50 min-h-screen">
      <ExamHeader 
        title={examData.title}
        currentQuestion={currentQuestion + 1}
        totalQuestions={examData.questions.length}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <QuestionCard 
          question={currentQ}
          selectedAnswer={answers[currentQ.id]}
          onAnswer={handleAnswer}
        />
        
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-md transition-colors ${
              currentQuestion === 0 
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            ย้อนกลับ
          </button>
          
          {currentQuestion < examData.questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              ถัดไป
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              ส่งคำตอบ
            </button>
          )}
        </div>
        
        <div className="mt-6 grid grid-cols-5 gap-2">
          {examData.questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              className={`h-10 rounded-md flex items-center justify-center transition-colors ${
                currentQuestion === index
                  ? 'bg-blue-600 text-white'
                  : answers[q.id]
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
