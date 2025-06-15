
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Plus, X, Trash2 } from 'lucide-react';

interface QuestionFormProps {
  question?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

interface Option {
  id?: string;
  option_text: string;
  is_correct: boolean;
  option_image?: string;
}

type DifficultyLevel = 'easy' | 'medium' | 'hard';
type QuestionType = 'multiple_choice' | 'true_false' | 'fill_in_blank';
type QuestionStatus = 'draft' | 'review' | 'published' | 'archived';

const QuestionForm: React.FC<QuestionFormProps> = ({ question, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    exam_id: '',
    question_text: '',
    question_type: 'multiple_choice' as QuestionType,
    difficulty_level: 'medium' as DifficultyLevel,
    score: 1,
    explanation: '',
    question_image: '',
    status: 'draft' as QuestionStatus
  });
  const [options, setOptions] = useState<Option[]>([
    { option_text: '', is_correct: false },
    { option_text: '', is_correct: false }
  ]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: exams } = useQuery({
    queryKey: ['exams-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exams')
        .select('id, exam_name, exam_type, subject')
        .order('exam_name');
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (question) {
      setFormData({
        exam_id: question.exam_id || '',
        question_text: question.question_text || '',
        question_type: question.question_type || 'multiple_choice',
        difficulty_level: question.difficulty_level || 'medium',
        score: question.score || 1,
        explanation: question.explanation || '',
        question_image: question.question_image || '',
        status: question.status || 'draft'
      });
      setTags(question.tags || []);
      
      // Load existing options
      if (question.id) {
        loadOptions(question.id);
      }
    }
  }, [question]);

  const loadOptions = async (questionId: string) => {
    try {
      const { data: optionsData, error } = await supabase
        .from('options')
        .select('*')
        .eq('question_id', questionId)
        .order('created_at');

      if (error) throw error;

      if (optionsData && optionsData.length > 0) {
        setOptions(optionsData.map(opt => ({
          id: opt.id,
          option_text: opt.option_text,
          is_correct: opt.is_correct || false,
          option_image: opt.option_image || ''
        })));
      }
    } catch (error) {
      console.error('Error loading options:', error);
    }
  };

  const addOption = () => {
    setOptions([...options, { option_text: '', is_correct: false }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, field: keyof Option, value: any) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    
    // If setting this option as correct, unset others for multiple choice
    if (field === 'is_correct' && value && formData.question_type === 'multiple_choice') {
      newOptions.forEach((opt, i) => {
        if (i !== index) {
          opt.is_correct = false;
        }
      });
    }
    
    setOptions(newOptions);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.exam_id) {
        throw new Error('Please select an exam');
      }

      if (!formData.question_text.trim()) {
        throw new Error('Question text is required');
      }

      if (options.filter(opt => opt.option_text.trim()).length < 2) {
        throw new Error('At least 2 options are required');
      }

      if (!options.some(opt => opt.is_correct)) {
        throw new Error('At least one correct answer is required');
      }

      const questionData = {
        exam_id: formData.exam_id,
        question_text: formData.question_text,
        question_type: formData.question_type,
        difficulty_level: formData.difficulty_level,
        score: formData.score,
        explanation: formData.explanation,
        question_image: formData.question_image || null,
        status: formData.status,
        tags: tags,
        updated_at: new Date().toISOString(),
        ...(question ? {} : { created_by: user?.id, created_at: new Date().toISOString() })
      };

      let questionId = question?.id;

      if (question) {
        // Update existing question
        const { error } = await supabase
          .from('questions')
          .update({
            ...questionData,
            version: (question.version || 1) + 1
          })
          .eq('id', question.id);
        
        if (error) throw error;

        // Create version entry with proper JSON data
        const versionData = {
          question_text: question.question_text,
          options: options.filter(opt => opt.option_text.trim())
        };

        await supabase
          .from('question_versions')
          .insert([{
            question_id: question.id,
            version_number: question.version || 1,
            question_data: versionData as any,
            created_by: user?.id
          }]);
      } else {
        // Create new question
        const { data: newQuestion, error } = await supabase
          .from('questions')
          .insert([questionData])
          .select()
          .single();
        
        if (error) throw error;
        questionId = newQuestion.id;
      }

      // Update options
      if (question) {
        // Delete existing options
        await supabase
          .from('options')
          .delete()
          .eq('question_id', question.id);
      }

      // Insert new options
      const validOptions = options.filter(opt => opt.option_text.trim());
      if (validOptions.length > 0) {
        const optionsToInsert = validOptions.map(option => ({
          question_id: questionId,
          option_text: option.option_text.trim(),
          is_correct: option.is_correct,
          option_image: option.option_image || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));

        const { error: optionsError } = await supabase
          .from('options')
          .insert(optionsToInsert);

        if (optionsError) throw optionsError;
      }

      toast({
        title: 'สำเร็จ',
        description: question ? 'อัพเดทคำถามแล้ว' : 'สร้างคำถามใหม่แล้ว',
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error saving question:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: error.message || 'ไม่สามารถบันทึกคำถามได้',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="exam_id">Exam *</Label>
            <Select value={formData.exam_id} onValueChange={(value) => setFormData({ ...formData, exam_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select exam" />
              </SelectTrigger>
              <SelectContent>
                {exams?.map((exam) => (
                  <SelectItem key={exam.id} value={exam.id}>
                    {exam.exam_name} ({exam.exam_type} - {exam.subject})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="question_type">Question Type</Label>
            <Select value={formData.question_type} onValueChange={(value: QuestionType) => setFormData({ ...formData, question_type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                <SelectItem value="true_false">True/False</SelectItem>
                <SelectItem value="fill_in_blank">Fill in Blank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="difficulty_level">Difficulty Level</Label>
            <Select value={formData.difficulty_level} onValueChange={(value: DifficultyLevel) => setFormData({ ...formData, difficulty_level: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="score">Score</Label>
            <Input
              id="score"
              type="number"
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) || 1 })}
              min="1"
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: QuestionStatus) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="question_image">Question Image URL</Label>
            <Input
              id="question_image"
              value={formData.question_image}
              onChange={(e) => setFormData({ ...formData, question_image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="question_text">Question Text *</Label>
        <Textarea
          id="question_text"
          value={formData.question_text}
          onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
          rows={3}
          required
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Answer Options
            <Button type="button" variant="outline" size="sm" onClick={addOption}>
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="flex-1 space-y-2">
                <Input
                  value={option.option_text}
                  onChange={(e) => updateOption(index, 'option_text', e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <Input
                  value={option.option_image || ''}
                  onChange={(e) => updateOption(index, 'option_image', e.target.value)}
                  placeholder="Image URL (optional)"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={option.is_correct}
                  onCheckedChange={(checked) => updateOption(index, 'is_correct', checked)}
                />
                <Label className="text-sm">Correct</Label>
              </div>
              {options.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div>
        <Label htmlFor="explanation">Explanation</Label>
        <Textarea
          id="explanation"
          value={formData.explanation}
          onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
          rows={3}
          placeholder="Detailed explanation for the correct answer..."
        />
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add tag and press Enter"
            className="flex-1"
          />
          <Button type="button" onClick={addTag} variant="outline">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (question ? 'Update Question' : 'Create Question')}
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
