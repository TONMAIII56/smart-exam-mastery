
import React, { useState } from 'react';
import { useQuizData } from '@/hooks/useQuizData';
import { QuizRenderer } from '@/components/quiz/QuizRenderer';
import { QuizCategorySelector } from '@/components/quiz/QuizCategorySelector';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const QuizPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { questions, isLoading, error } = useQuizData(selectedCategory || '', 20);

  const handleCategorySelect = (category: string) => {
    console.log('Selected category:', category);
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <QuizCategorySelector onCategorySelect={handleCategorySelect} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center">กำลังโหลดข้อสอบ...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center">
              <p className="text-red-600 mb-4">เกิดข้อผิดพลาด: {error.message}</p>
              <Button onClick={handleBackToCategories}>
                กลับไปเลือกหมวดหมู่
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto mb-6">
        <Button 
          onClick={handleBackToCategories}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          กลับไปเลือกหมวดหมู่
        </Button>
      </div>
      
      <QuizRenderer 
        questions={questions}
        onComplete={(results) => {
          console.log('Quiz completed with results:', results);
        }}
      />
    </div>
  );
};

export default QuizPage;
