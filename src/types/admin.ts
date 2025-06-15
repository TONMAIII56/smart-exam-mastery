
// Admin Dashboard Types
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type ExamType = 'civil-service' | 'toeic' | 'aisa';
export type SubjectType = 
  | 'general-knowledge' 
  | 'thai-language' 
  | 'mathematics'
  | 'english'
  | 'listening'
  | 'reading'
  | 'grammar'
  | 'vocabulary'
  | 'science'
  | 'general';
export type ExamStatus = 'draft' | 'review' | 'published' | 'archived';
export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_in_blank';
export type QuestionStatus = 'draft' | 'review' | 'published' | 'archived';
export type UserRole = 'user' | 'admin' | 'super_admin';
export type AdminRole = 'super_admin' | 'content_manager' | 'moderator';
export type SubscriptionPlan = 'free' | 'premium';
export type SubscriptionStatus = 'active' | 'inactive' | 'cancelled' | 'past_due';
export type AccountStatus = 'active' | 'inactive' | 'suspended';

export interface ExamFormData {
  exam_name: string;
  description: string;
  exam_type: ExamType;
  subject: SubjectType;
  time_limit: string;
  passing_score: string;
  difficulty_level: DifficultyLevel;
  premium_only: boolean;
  visibility: string;
  exam_code: string;
  tags: string;
  status: ExamStatus;
}

export interface QuestionData {
  question_text: string;
  options?: Array<{
    id?: string;
    option_text: string;
    is_correct: boolean;
    option_image?: string;
  }>;
  explanation?: string;
}

export interface Option {
  id?: string;
  option_text: string;
  is_correct: boolean;
  option_image?: string;
}

export const SUBJECT_OPTIONS = [
  { value: 'general-knowledge' as SubjectType, label: 'General Knowledge' },
  { value: 'thai-language' as SubjectType, label: 'Thai Language' },
  { value: 'mathematics' as SubjectType, label: 'Mathematics' },
  { value: 'english' as SubjectType, label: 'English' },
  { value: 'listening' as SubjectType, label: 'Listening' },
  { value: 'reading' as SubjectType, label: 'Reading' },
  { value: 'grammar' as SubjectType, label: 'Grammar' },
  { value: 'vocabulary' as SubjectType, label: 'Vocabulary' },
  { value: 'science' as SubjectType, label: 'Science' },
  { value: 'general' as SubjectType, label: 'General' }
];

export const DIFFICULTY_OPTIONS = [
  { value: 'easy' as DifficultyLevel, label: 'Easy' },
  { value: 'medium' as DifficultyLevel, label: 'Medium' },
  { value: 'hard' as DifficultyLevel, label: 'Hard' }
];

export const EXAM_TYPE_OPTIONS = [
  { value: 'civil-service' as ExamType, label: 'Civil Service' },
  { value: 'toeic' as ExamType, label: 'TOEIC' },
  { value: 'aisa' as ExamType, label: 'AISA' }
];

export const STATUS_OPTIONS = [
  { value: 'draft' as ExamStatus, label: 'Draft' },
  { value: 'review' as ExamStatus, label: 'Review' },
  { value: 'published' as ExamStatus, label: 'Published' },
  { value: 'archived' as ExamStatus, label: 'Archived' }
];
