
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuizCategories } from '@/hooks/useQuizData';
import { BookOpen, Calculator, Globe, Languages } from 'lucide-react';

interface QuizCategorySelectorProps {
  onCategorySelect: (category: string) => void;
}

const categoryIcons = {
  'mathematics': Calculator,
  'thai-language': Languages,
  'english': Globe,
  'general-knowledge': BookOpen
};

const categoryNames = {
  'mathematics': 'คณิตศาสตร์',
  'thai-language': 'ภาษาไทย',
  'english': 'ภาษาอังกฤษ',
  'general-knowledge': 'ความรู้รอบตัว'
};

export const QuizCategorySelector: React.FC<QuizCategorySelectorProps> = ({ onCategorySelect }) => {
  const { categories, isLoading, error } = useQuizCategories();

  if (isLoading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center">กำลังโหลดหมวดหมู่...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center text-red-600">เกิดข้อผิดพลาด: {error.message}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">เลือกหมวดหมู่ข้อสอบ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons] || BookOpen;
            const name = categoryNames[category as keyof typeof categoryNames] || category;
            
            return (
              <Button
                key={category}
                onClick={() => onCategorySelect(category)}
                variant="outline"
                className="h-24 flex flex-col items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
              >
                <Icon className="h-8 w-8 text-blue-600" />
                <span className="font-medium">{name}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
