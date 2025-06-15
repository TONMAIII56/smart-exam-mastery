
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Clock, CheckCircle, XCircle, Monitor, Smartphone, Tablet } from 'lucide-react';

interface ExamPreviewProps {
  examId: string;
  onClose: () => void;
}

const ExamPreview: React.FC<ExamPreviewProps> = ({ examId, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const { data: examData, isLoading } = useQuery({
    queryKey: ['exam-preview', examId],
    queryFn: async () => {
      const { data: exam, error: examError } = await supabase
        .from('exams')
        .select('*')
        .eq('id', examId)
        .single();

      if (examError) throw examError;

      const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('*, options(*)')
        .eq('exam_id', examId)
        .order('created_at');

      if (questionsError) throw questionsError;

      return { exam, questions };
    }
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading preview...</div>;
  }

  if (!examData) {
    return <div className="text-center py-8">No data found</div>;
  }

  const { exam, questions } = examData;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const getViewModeClass = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      default: return 'max-w-4xl mx-auto';
    }
  };

  const handleAnswer = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionId
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{exam.exam_name}</h3>
          <p className="text-gray-600">Preview Mode</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('desktop')}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('tablet')}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('mobile')}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={getViewModeClass()}>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{exam.time_limit || 0} min</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} />
            
            <div className="text-lg font-semibold">
              {currentQuestion?.question_text}
            </div>

            {currentQuestion?.question_image && (
              <img 
                src={currentQuestion.question_image} 
                alt="Question" 
                className="max-w-full h-auto rounded-lg"
              />
            )}

            <div className="space-y-2">
              {currentQuestion?.options?.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className={`w-full justify-start text-left ${
                    selectedAnswers[currentQuestionIndex] === option.id 
                      ? 'bg-blue-50 border-blue-300' 
                      : ''
                  }`}
                  onClick={() => handleAnswer(option.id)}
                >
                  <div className="flex items-center space-x-2">
                    {selectedAnswers[currentQuestionIndex] === option.id ? (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span>{option.option_text}</span>
                  </div>
                </Button>
              ))}
            </div>

            {currentQuestion?.explanation && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Explanation:</h4>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <div className="flex space-x-2">
                {questions.map((_, index) => (
                  <Button
                    key={index}
                    variant={index === currentQuestionIndex ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentQuestionIndex(index)}
                    className="w-8 h-8 p-0"
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <Button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={onClose}>Close Preview</Button>
      </div>
    </div>
  );
};

export default ExamPreview;
