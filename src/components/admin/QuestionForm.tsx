
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { Plus, Minus } from 'lucide-react';

interface QuestionFormProps {
  question?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const QuestionForm = ({ question, onSuccess, onCancel }: QuestionFormProps) => {
  const [formData, setFormData] = useState({
    exam_id: question?.exam_id || '',
    question_text: question?.question_text || '',
    question_type: question?.question_type || 'multiple_choice',
    difficulty_level: question?.difficulty_level || 'medium',
    score: question?.score || 1,
    explanation: question?.explanation || '',
    status: question?.status || 'draft'
  });

  const [options, setOptions] = useState(
    question?.options || [
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false }
    ]
  );

  const { toast } = useToast();

  const createQuestionMutation = useMutation({
    mutationFn: async (data: any) => {
      if (question) {
        const { error } = await supabase
          .from('questions')
          .update(data.questionData)
          .eq('id', question.id);
        if (error) throw error;

        // Update options
        await supabase.from('options').delete().eq('question_id', question.id);
        if (data.options.length > 0) {
          const { error: optionsError } = await supabase
            .from('options')
            .insert(data.options.map((opt: any) => ({ ...opt, question_id: question.id })));
          if (optionsError) throw optionsError;
        }
      } else {
        const { data: newQuestion, error } = await supabase
          .from('questions')
          .insert([data.questionData])
          .select()
          .single();
        if (error) throw error;

        if (data.options.length > 0) {
          const { error: optionsError } = await supabase
            .from('options')
            .insert(data.options.map((opt: any) => ({ ...opt, question_id: newQuestion.id })));
          if (optionsError) throw optionsError;
        }
      }
    },
    onSuccess: () => {
      toast({
        title: 'สำเร็จ',
        description: question ? 'อัพเดทคำถามแล้ว' : 'สร้างคำถามใหม่แล้ว',
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถบันทึกข้อมูลได้',
        variant: 'destructive',
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validOptions = options.filter(opt => opt.option_text.trim() !== '');
    const hasCorrectAnswer = validOptions.some(opt => opt.is_correct);

    if (formData.question_type === 'multiple_choice' && !hasCorrectAnswer) {
      toast({
        title: 'ข้อผิดพลาด',
        description: 'กรุณาเลือกคำตอบที่ถูกต้อง',
        variant: 'destructive',
      });
      return;
    }

    createQuestionMutation.mutate({
      questionData: formData,
      options: validOptions
    });
  };

  const addOption = () => {
    setOptions([...options, { option_text: '', is_correct: false }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, field: string, value: any) => {
    const updatedOptions = [...options];
    if (field === 'is_correct' && value) {
      // Ensure only one correct answer for multiple choice
      updatedOptions.forEach((opt, i) => {
        opt.is_correct = i === index;
      });
    } else {
      updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    }
    setOptions(updatedOptions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{question ? 'แก้ไขคำถาม' : 'สร้างคำถามใหม่'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="question_text">คำถาม</Label>
            <Textarea
              id="question_text"
              value={formData.question_text}
              onChange={(e) => setFormData(prev => ({ ...prev, question_text: e.target.value }))}
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="question_type">ประเภทคำถาม</Label>
              <Select
                value={formData.question_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, question_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple_choice">เลือกตอบ</SelectItem>
                  <SelectItem value="true_false">ถูก/ผิด</SelectItem>
                  <SelectItem value="essay">เขียนตอบ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="difficulty_level">ระดับความยาก</Label>
              <Select
                value={formData.difficulty_level}
                onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty_level: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">ง่าย</SelectItem>
                  <SelectItem value="medium">ปานกลาง</SelectItem>
                  <SelectItem value="hard">ยาก</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="score">คะแนน</Label>
              <Input
                id="score"
                type="number"
                value={formData.score}
                onChange={(e) => setFormData(prev => ({ ...prev, score: parseInt(e.target.value) || 1 }))}
                min="1"
              />
            </div>
          </div>

          {formData.question_type === 'multiple_choice' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>ตัวเลือก</Label>
                <Button type="button" size="sm" onClick={addOption}>
                  <Plus className="h-4 w-4 mr-1" />
                  เพิ่มตัวเลือก
                </Button>
              </div>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correct_answer"
                      checked={option.is_correct}
                      onChange={(e) => updateOption(index, 'is_correct', e.target.checked)}
                      className="mt-1"
                    />
                    <Input
                      placeholder={`ตัวเลือก ${index + 1}`}
                      value={option.option_text}
                      onChange={(e) => updateOption(index, 'option_text', e.target.value)}
                      className="flex-1"
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeOption(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="explanation">คำอธิบาย (ไม่บังคับ)</Label>
            <Textarea
              id="explanation"
              value={formData.explanation}
              onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="status">สถานะ</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">แบบร่าง</SelectItem>
                <SelectItem value="review">รอการตรวจสอบ</SelectItem>
                <SelectItem value="published">เผยแพร่แล้ว</SelectItem>
                <SelectItem value="archived">เก็บถาวร</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              ยกเลิก
            </Button>
            <Button type="submit" disabled={createQuestionMutation.isPending}>
              {createQuestionMutation.isPending ? 'กำลังบันทึก...' : 'บันทึก'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
