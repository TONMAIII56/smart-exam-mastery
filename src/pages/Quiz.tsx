import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/hooks/useSubscription';
import { QuotaChecker } from '@/components/subscription/QuotaChecker';
import { useToast } from '@/hooks/use-toast';

interface Option {
  id: string;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  question_text: string;
  options: Option[];
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { examType, subject } = location.state || { examType: '', subject: '' };
  const { isPremium, updateUsage } = useSubscription();
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching questions for examType:', examType, 'subject:', subject);
        
        // First, get the exam ID based on exam_type and subject
        const { data: examData, error: examError } = await supabase
          .from('exams')
          .select('id')
          .eq('exam_type', examType)
          .eq('subject', subject)
          .limit(1);

        if (examError) {
          console.error('Error fetching exam:', examError);
          toast({
            title: 'เกิดข้อผิดพลาด',
            description: 'ไม่สามารถโหลดข้อมูลการสอบได้ กรุณาลองใหม่อีกครั้ง',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        if (!examData || examData.length === 0) {
          console.log('No exam found for:', examType, subject);
          setQuestions([]);
          setIsLoading(false);
          return;
        }

        const examId = examData[0].id;
        console.log('Found exam ID:', examId);

        // Fetch questions for this exam
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('id, question_text, exam_id')
          .eq('exam_id', examId);

        if (questionsError) {
          console.error('Error fetching questions:', questionsError);
          toast({
            title: 'เกิดข้อผิดพลาด',
            description: 'ไม่สามารถโหลดคำถามได้ กรุณาลองใหม่อีกครั้ง',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        if (!questionsData || questionsData.length === 0) {
          console.log('No questions found for exam ID:', examId);
          setQuestions([]);
          setIsLoading(false);
          return;
        }

        console.log('Found questions:', questionsData.length);

        // Fetch options for all questions
        const questionIds = questionsData.map(q => q.id);
        const { data: optionsData, error: optionsError } = await supabase
          .from('options')
          .select('id, option_text, is_correct, question_id')
          .in('question_id', questionIds);

        if (optionsError) {
          console.error('Error fetching options:', optionsError);
          toast({
            title: 'เกิดข้อผิดพลาด',
            description: 'ไม่สามารถโหลดตัวเลือกได้ กรุณาลองใหม่อีกครั้ง',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        console.log('Found options:', optionsData?.length || 0);

        // Combine questions with their options
        const formattedQuestions: Question[] = questionsData.map(question => ({
          id: question.id,
          question_text: question.question_text,
          options: (optionsData || [])
            .filter(option => option.question_id === question.id)
            .map(option => ({
              id: option.id,
              option_text: option.option_text,
              is_correct: option.is_correct || false
            }))
        }));
        
        console.log('Formatted questions:', formattedQuestions.length);
        setQuestions(formattedQuestions);
        setStartTime(new Date());
      } catch (error) {
        console.error('Error in fetchQuestions:', error);
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: 'ไม่สามารถโหลดคำถามได้ กรุณาลองใหม่อีกครั้ง',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (examType && subject) {
      fetchQuestions();
    } else {
      console.log('Missing examType or subject:', { examType, subject });
      setIsLoading(false);
    }
  }, [examType, subject, toast]);

  const handleAnswer = (optionId: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isAnswered = (optionId: string) => {
    return answers[currentQuestionIndex] === optionId;
  };

  const handleSubmitQuiz = async () => {
    if (!user) return;

    try {
      const endTime = new Date();
      const totalTime = startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0;

      // Calculate score
      let correctAnswers = 0;
      const answersArray = Object.entries(answers).map(([questionIndex, selectedAnswer]) => {
        const questionIdx = parseInt(questionIndex);
        const question = questions[questionIdx];
        const correctAnswer = question.options.find(opt => opt.is_correct)?.id;
        const isCorrect = selectedAnswer === correctAnswer;
        
        if (isCorrect) correctAnswers++;
        
        return {
          question_id: question.id,
          selected_option_id: selectedAnswer,
          is_correct: isCorrect,
        };
      });

      const percentage = Math.round((correctAnswers / questions.length) * 100);

      // Save exam result
      const { data: examResult, error: resultError } = await supabase
        .from('exam_results')
        .insert({
          user_id: user.id,
          exam_type: examType,
          subject: subject,
          score: correctAnswers,
          total_questions: questions.length,
          percentage: percentage,
          time_taken: totalTime,
        })
        .select()
        .single();

      if (resultError) throw resultError;

      // Generate attempt ID for compatibility
      const attemptId = crypto.randomUUID();

      // Save user answers with proper mapping
      const userAnswersToSave = answersArray.map(answer => ({
        attempt_id: attemptId,
        result_id: examResult.id,
        question_id: answer.question_id,
        selected_option_id: answer.selected_option_id,
        is_correct: answer.is_correct,
        answer_time: new Date().toISOString(),
      }));

      const { error: answersError } = await supabase
        .from('user_answers')
        .insert(userAnswersToSave);

      if (answersError) throw answersError;

      // Update usage tracking for free users
      if (!isPremium) {
        await updateUsage({ examType, subject });
      }

      // Navigate to results
      navigate('/quiz-results', {
        state: {
          score: correctAnswers,
          totalQuestions: questions.length,
          percentage: percentage,
          timeSpent: totalTime,
          examType: examType,
          subject: subject,
          resultId: examResult.id,
        }
      });

    } catch (error) {
      console.error('Error saving quiz results:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถบันทึกผลการสอบได้ กรุณาลองใหม่อีกครั้ง',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-8 text-center">
        <div className="text-lg">กำลังโหลดข้อสอบ...</div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="container mx-auto mt-8 text-center">
        <Card>
          <CardContent className="p-8">
            <div className="text-lg mb-4">ไม่พบข้อสอบสำหรับหมวดนี้</div>
            <Button onClick={() => navigate('/quiz-selection')}>
              กลับไปเลือกหมวดใหม่
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <QuotaChecker examType={examType} subject={subject}>
      <div className="container mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <span>{`คำถามที่ ${currentQuestionIndex + 1} จาก ${questions.length}`}</span>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{`${Math.round(progress)}%`}</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} />
            <div className="text-lg font-semibold">{currentQuestion.question_text}</div>
            <div className="space-y-2">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className={`w-full justify-start ${isAnswered(option.id) ? 'bg-green-100 hover:bg-green-200' : ''}`}
                  onClick={() => handleAnswer(option.id)}
                >
                  {isAnswered(option.id) ? (
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="mr-2 h-4 w-4 text-gray-400" />
                  )}
                  {option.option_text}
                </Button>
              ))}
            </div>
            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                คำถามก่อนหน้า
              </Button>
              {currentQuestionIndex === questions.length - 1 ? (
                <Button onClick={handleSubmitQuiz}>ส่งคำตอบ</Button>
              ) : (
                <Button onClick={handleNextQuestion}>คำถามถัดไป</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </QuotaChecker>
  );
};

export default Quiz;
