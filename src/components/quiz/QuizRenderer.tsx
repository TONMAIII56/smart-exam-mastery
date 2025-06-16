
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion } from '@/hooks/useQuizData';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizRendererProps {
  questions: QuizQuestion[];
  onComplete?: (results: QuizResult[]) => void;
}

interface QuizResult {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export const QuizRenderer: React.FC<QuizRendererProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [startTime] = useState(Date.now());

  if (!questions || questions.length === 0) {
    return (
      <Card className="p-6">
        <CardContent>
          <p className="text-center text-gray-600">ไม่พบข้อสอบในหมวดหมู่นี้</p>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    const quizResults: QuizResult[] = questions.map(question => {
      const selectedAnswer = selectedAnswers[question.id] || '';
      return {
        questionId: question.id,
        selectedAnswer,
        isCorrect: selectedAnswer === question.answer,
        timeSpent: Math.round((Date.now() - startTime) / questions.length / 1000)
      };
    });

    setResults(quizResults);
    setShowResults(true);
    onComplete?.(quizResults);
  };

  if (showResults) {
    const correctCount = results.filter(r => r.isCorrect).length;
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">ผลการทำข้อสอบ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-2">{percentage}%</div>
            <div className="text-xl text-gray-600">
              ตอบถูก {correctCount} จาก {questions.length} ข้อ
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const result = results.find(r => r.questionId === question.id);
              const isCorrect = result?.isCorrect;
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">ข้อ {index + 1}: {question.question}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {question.choices.map((choice, choiceIndex) => {
                          const isSelected = result?.selectedAnswer === choice;
                          const isCorrectAnswer = choice === question.answer;
                          
                          let className = "p-2 rounded border text-sm ";
                          if (isCorrectAnswer) {
                            className += "bg-green-100 border-green-300 text-green-800";
                          } else if (isSelected && !isCorrectAnswer) {
                            className += "bg-red-100 border-red-300 text-red-800";
                          } else {
                            className += "bg-gray-50 border-gray-200";
                          }
                          
                          return (
                            <div key={choiceIndex} className={className}>
                              {choice}
                            </div>
                          );
                        })}
                      </div>
                      {question.explanation && (
                        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                          <strong>คำอธิบาย:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button onClick={() => window.location.reload()}>
              ทำข้อสอบใหม่
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>ข้อสอบ</CardTitle>
            <span className="text-sm text-gray-600">
              ข้อ {currentIndex + 1} จาก {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">
              ข้อ {currentIndex + 1}: {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.choices.map((choice, index) => (
                <label 
                  key={index}
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestion.id] === choice
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={choice}
                    checked={selectedAnswers[currentQuestion.id] === choice}
                    onChange={() => handleAnswerSelect(choice)}
                    className="mt-1 mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{choice}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              ย้อนกลับ
            </Button>

            <div className="text-sm text-gray-600">
              {Object.keys(selectedAnswers).length} / {questions.length} ข้อ
            </div>

            {currentIndex === questions.length - 1 ? (
              <Button
                onClick={handleFinish}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                ส่งคำตอบ
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                ถัดไป
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentIndex(index)}
                variant={currentIndex === index ? "default" : selectedAnswers[questions[index].id] ? "secondary" : "outline"}
                size="sm"
                className="h-10"
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
