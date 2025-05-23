
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, AlertCircle, Check, X, SkipForward, ArrowRight, Flag } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  difficulty: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const examType = searchParams.get('exam') || 'civil-service';
  const subjectId = searchParams.get('subject') || 'general-knowledge';
  const mode = searchParams.get('mode') || 'normal';

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Sample questions - in real app, this would come from API
  const sampleQuestions: Question[] = [
    {
      id: '1',
      question: 'ประเทศไทยมีพื้นที่กี่ตารางกิโลเมตร?',
      choices: ['513,120', '510,890', '514,000', '512,500'],
      correctAnswer: 0,
      explanation: 'ประเทศไทยมีพื้นที่ทั้งหมด 513,120 ตารางกิโลเมตร เป็นอันดับที่ 50 ของโลก',
      subject: 'ความรู้รอบตัว',
      difficulty: 'ง่าย'
    },
    {
      id: '2',
      question: 'สินค้าออกเรือนแทรกซ์อะไร คือ สินค้าที่ได้รับยกเว้นภาษี?',
      choices: ['สินค้าส่งออก', 'สินค้านำเข้า', 'สินค้าโรงงาน', 'สินค้าอุปโภค'],
      correctAnswer: 0,
      explanation: 'ดูแล็กซ์ คือ การยกเว้นภาษีสำหรับสินค้าส่งออก เพื่อเพิ่มความสามารถในการแข่งขันในตลาดต่างประเทศ',
      subject: 'ความรู้รอบตัว',
      difficulty: 'กลาง'
    },
    {
      id: '3',
      question: 'องค์กรใดเป็นผู้รับผิดชอบหลักในการกำกับดูแลตลาดทุนของไทย?',
      choices: ['ธนาคารแห่งประเทศไทย', 'กรมสรรพากร', 'สำนักงาน ก.ล.ต.', 'กระทรวงการคลัง'],
      correctAnswer: 2,
      explanation: 'สำนักงานคณะกรรมการกำกับหลักทรัพย์และตลาดหลักทรัพย์ (ก.ล.ต.) เป็นหน่วยงานหลักในการกำกับดูแลตลาดทุน',
      subject: 'ความรู้รอบตัว',
      difficulty: 'กลาง'
    }
  ];

  const [questions] = useState<Question[]>(sampleQuestions);
  const currentQuestion = questions[currentQuestionIndex];

  // Initialize answers array
  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
  }, [questions.length]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswered]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setShowExplanation(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowExplanation(true);
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
    
    // Update score
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
      setTimeLeft(60);
    } else {
      // Quiz completed
      navigate(`/quiz-results?exam=${examType}&subject=${subjectId}&score=${score}&total=${questions.length}`);
    }
  };

  const handleSkipQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = null;
    setAnswers(newAnswers);
    handleNextQuestion();
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestionIndex)) {
      newFlagged.delete(currentQuestionIndex);
    } else {
      newFlagged.add(currentQuestionIndex);
    }
    setFlaggedQuestions(newFlagged);
  };

  const getChoiceStyle = (index: number) => {
    if (!showExplanation) {
      return selectedAnswer === index 
        ? 'border-yellow-500 bg-yellow-50' 
        : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50';
    }
    
    if (index === currentQuestion.correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-800';
    }
    
    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return 'border-red-500 bg-red-50 text-red-800';
    }
    
    return 'border-gray-200 bg-gray-50';
  };

  const getChoiceIcon = (index: number) => {
    if (!showExplanation) return null;
    
    if (index === currentQuestion.correctAnswer) {
      return <Check className="h-5 w-5 text-green-600" />;
    }
    
    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return <X className="h-5 w-5 text-red-600" />;
    }
    
    return null;
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      {/* Header */}
      <header className="bg-yellow-400 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-yellow-500"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-white">
                  {currentQuestion?.subject} - ข้อที่ {currentQuestionIndex + 1}
                </h1>
                <div className="flex items-center space-x-4 text-yellow-100 text-sm">
                  <span>คะแนน: {score}/{questions.length}</span>
                  <span>•</span>
                  <span>เหลือ {questions.length - currentQuestionIndex - 1} ข้อ</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right text-white">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className={`font-bold ${timeLeft <= 10 ? 'text-red-200' : ''}`}>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFlag}
                className={`text-white hover:bg-yellow-500 ${
                  flaggedQuestions.has(currentQuestionIndex) ? 'bg-yellow-600' : ''
                }`}
              >
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-3">
            <Progress value={progressPercentage} className="h-2 bg-yellow-300" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <Badge variant="outline" className="text-sm">
                {currentQuestion?.difficulty}
              </Badge>
              <div className="text-sm text-gray-500">
                ข้อ {currentQuestionIndex + 1} จาก {questions.length}
              </div>
            </div>
            
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
              {currentQuestion?.question}
            </h2>
            
            <div className="space-y-4">
              {currentQuestion?.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 flex items-center justify-between ${getChoiceStyle(index)}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center font-semibold text-gray-600">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-800">{choice}</span>
                  </div>
                  {getChoiceIcon(index)}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Explanation */}
        {showExplanation && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">คำอธิบาย</h3>
                  <p className="text-blue-700">{currentQuestion?.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {!isAnswered && (
              <Button
                variant="outline"
                onClick={handleSkipQuestion}
                className="flex items-center space-x-2"
              >
                <SkipForward className="h-4 w-4" />
                <span>ข้าม</span>
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            {isAnswered && (
              <Button
                onClick={handleNextQuestion}
                className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center space-x-2 px-6"
              >
                <span>
                  {currentQuestionIndex < questions.length - 1 ? 'ข้อถัดไป' : 'ดูผลคะแนน'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigation */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">ภาพรวมข้อสอบ</h3>
            <div className="grid grid-cols-10 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentQuestionIndex(index);
                    setSelectedAnswer(answers[index]);
                    setIsAnswered(answers[index] !== null);
                    setShowExplanation(answers[index] !== null);
                    setTimeLeft(60);
                  }}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-yellow-500 text-white'
                      : answers[index] !== null
                      ? 'bg-green-100 text-green-800'
                      : flaggedQuestions.has(index)
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mt-3">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>ข้อปัจจุบัน</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                <span>ตอบแล้ว</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                <span>ทำเครื่องหมาย</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
