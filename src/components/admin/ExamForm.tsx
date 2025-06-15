
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
import { X } from 'lucide-react';

interface ExamFormProps {
  exam?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

type DifficultyLevel = 'easy' | 'medium' | 'hard';
type ExamType = 'civil-service' | 'toeic' | 'aisa';
type ExamStatus = 'draft' | 'review' | 'published' | 'archived';

const ExamForm: React.FC<ExamFormProps> = ({ exam, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    exam_name: '',
    description: '',
    exam_type: 'civil-service' as ExamType,
    subject: '',
    time_limit: '',
    passing_score: '',
    difficulty_level: 'medium' as DifficultyLevel,
    premium_only: false,
    visibility: 'public',
    exam_code: '',
    tags: '',
    status: 'draft' as ExamStatus
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (exam) {
      setFormData({
        exam_name: exam.exam_name || '',
        description: exam.description || '',
        exam_type: exam.exam_type || 'civil-service',
        subject: exam.subject || '',
        time_limit: exam.time_limit?.toString() || '',
        passing_score: exam.passing_score?.toString() || '',
        difficulty_level: exam.difficulty_level || 'medium',
        premium_only: exam.premium_only || false,
        visibility: exam.visibility || 'public',
        exam_code: exam.exam_code || '',
        tags: '',
        status: exam.status || 'draft'
      });
      setTags(exam.tags || []);
    }
  }, [exam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const examData = {
        exam_name: formData.exam_name,
        description: formData.description,
        exam_type: formData.exam_type,
        subject: formData.subject,
        time_limit: formData.time_limit ? parseInt(formData.time_limit) : null,
        passing_score: formData.passing_score ? parseInt(formData.passing_score) : null,
        difficulty_level: formData.difficulty_level,
        premium_only: formData.premium_only,
        visibility: formData.visibility,
        exam_code: formData.exam_code,
        tags: tags,
        status: formData.status,
        updated_at: new Date().toISOString(),
        ...(exam ? {} : { created_by: user?.id, created_at: new Date().toISOString() })
      };

      if (exam) {
        const { error } = await supabase
          .from('exams')
          .update(examData)
          .eq('id', exam.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('exams')
          .insert([examData]);
        
        if (error) throw error;
      }

      toast({
        title: 'สำเร็จ',
        description: exam ? 'อัพเดทข้อสอบแล้ว' : 'สร้างข้อสอบใหม่แล้ว',
      });

      onSuccess();
    } catch (error) {
      console.error('Error saving exam:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถบันทึกข้อสอบได้',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="exam_name">Exam Name *</Label>
            <Input
              id="exam_name"
              value={formData.exam_name}
              onChange={(e) => setFormData({ ...formData, exam_name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="exam_code">Exam Code</Label>
            <Input
              id="exam_code"
              value={formData.exam_code}
              onChange={(e) => setFormData({ ...formData, exam_code: e.target.value })}
              placeholder="e.g., MATH-2024-001"
            />
          </div>

          <div>
            <Label htmlFor="exam_type">Exam Type *</Label>
            <Select value={formData.exam_type} onValueChange={(value: ExamType) => setFormData({ ...formData, exam_type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select exam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil-service">Civil Service</SelectItem>
                <SelectItem value="toeic">TOEIC</SelectItem>
                <SelectItem value="aisa">AISA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general-knowledge">General Knowledge</SelectItem>
                <SelectItem value="thai-language">Thai Language</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="listening">Listening</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="grammar">Grammar</SelectItem>
                <SelectItem value="vocabulary">Vocabulary</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="general">General</SelectItem>
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
            <Label htmlFor="time_limit">Time Limit (minutes)</Label>
            <Input
              id="time_limit"
              type="number"
              value={formData.time_limit}
              onChange={(e) => setFormData({ ...formData, time_limit: e.target.value })}
              min="1"
            />
          </div>

          <div>
            <Label htmlFor="passing_score">Passing Score (%)</Label>
            <Input
              id="passing_score"
              type="number"
              value={formData.passing_score}
              onChange={(e) => setFormData({ ...formData, passing_score: e.target.value })}
              min="0"
              max="100"
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: ExamStatus) => setFormData({ ...formData, status: value })}>
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
            <Label htmlFor="visibility">Visibility</Label>
            <Select value={formData.visibility} onValueChange={(value) => setFormData({ ...formData, visibility: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="premium_only"
              checked={formData.premium_only}
              onCheckedChange={(checked) => setFormData({ ...formData, premium_only: checked })}
            />
            <Label htmlFor="premium_only">Premium Only</Label>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
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
          {isLoading ? 'Saving...' : (exam ? 'Update Exam' : 'Create Exam')}
        </Button>
      </div>
    </form>
  );
};

export default ExamForm;
