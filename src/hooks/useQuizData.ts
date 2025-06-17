
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  answer: string;
  explanation?: string;
  category: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export function useQuizData(category: string = 'mathematics', limit: number = 20) {
  const { data: questions, isLoading, error, refetch } = useQuery({
    queryKey: ['quiz-questions', category, limit],
    queryFn: async () => {
      console.log('Fetching questions for category:', category);
      
      const { data, error } = await supabase
        .from('exam_questions')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .limit(limit);

      if (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }

      console.log('Fetched questions:', data);
      
      // Transform the data to match our interface
      return data?.map(q => ({
        id: q.id,
        question: q.question,
        choices: Array.isArray(q.choices) ? q.choices as string[] : [],
        answer: q.answer,
        explanation: q.explanation || undefined,
        category: q.category,
        difficulty_level: q.difficulty_level || 'medium',
        tags: q.tags || []
      })) || [];
    },
    enabled: !!category
  });

  return { 
    questions: questions || [], 
    isLoading, 
    error, 
    refetch 
  };
}

export function useQuizCategories() {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['quiz-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exam_questions')
        .select('category')
        .eq('is_active', true);

      if (error) throw error;

      // Get unique categories
      const uniqueCategories = [...new Set(data?.map(q => q.category) || [])];
      return uniqueCategories;
    }
  });

  return { 
    categories: categories || [], 
    isLoading, 
    error 
  };
}
