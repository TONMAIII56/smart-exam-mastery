
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

interface ExamFormProps {
  exam?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const ExamForm = ({ exam, onSuccess, onCancel }: ExamFormProps) => {
  const [formData, setFormData] = useState({
    exam_name: exam?.exam_name || '',
    exam_code: exam?.exam_code || '',
    exam_type: exam?.exam_type || 'civil-service',
    subject: exam?.subject || 'general-knowledge',
    description: exam?.description || '',
    time_limit: exam?.time_limit || 90,
    passing_score: exam?.passing_score || 70,
    difficulty_level: exam?.difficulty_level || 'medium',
    premium_only: exam?.premium_only || false,
    status: exam?.status || 'draft',
    visibility: exam?.visibility || 'public'
  });

  const { toast } = useToast();

  const createExamMutation = useMutation({
    mutationFn: async (data: any) => {
      if (exam) {
        const { error } = await supabase
          .from('exams')
          .update(data)
          .eq('id', exam.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('exams')
          .insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: 'สำเร็จ',
        description: exam ? 'อัพเดทข้อสอบแล้ว' : 'สร้างข้อสอบใหม่แล้ว',
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
    createExamMutation.mutate(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{exam ? 'แก้ไขข้อสอบ' : 'สร้างข้อสอบใหม่'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exam_name">ชื่อข้อสอบ</Label>
              <Input
                id="exam_name"
                value={formData.exam_name}
                onChange={(e) => handleChange('exam_name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="exam_code">รหัสข้อสอบ</Label>
              <Input
                id="exam_code"
                value={formData.exam_code}
                onChange={(e) => handleChange('exam_code', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exam_type">ประเภทข้อสอบ</Label>
              <Select
                value={formData.exam_type}
                onValueChange={(value) => handleChange('exam_type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil-service">การสอบราชการ</SelectItem>
                  <SelectItem value="toeic">TOEIC</SelectItem>
                  <SelectItem value="aisa">AISA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subject">หมวดวิชา</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => handleChange('subject', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general-knowledge">ความรู้ทั่วไป</SelectItem>
                  <SelectItem value="mathematics">คณิตศาสตร์</SelectItem>
                  <SelectItem value="thai-language">ภาษาไทย</SelectItem>
                  <SelectItem value="english-language">ภาษาอังกฤษ</SelectItem>
                  <SelectItem value="listening">การฟัง</SelectItem>
                  <SelectItem value="reading">การอ่าน</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">คำอธิบาย</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="time_limit">เวลาทำข้อสอบ (นาที)</Label>
              <Input
                id="time_limit"
                type="number"
                value={formData.time_limit}
                onChange={(e) => handleChange('time_limit', parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="passing_score">คะแนนผ่าน (%)</Label>
              <Input
                id="passing_score"
                type="number"
                value={formData.passing_score}
                onChange={(e) => handleChange('passing_score', parseInt(e.target.value) || 0)}
                min="0"
                max="100"
              />
            </div>
            <div>
              <Label htmlFor="difficulty_level">ระดับความยาก</Label>
              <Select
                value={formData.difficulty_level}
                onValueChange={(value) => handleChange('difficulty_level', value)}
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
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="status">สถานะ</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange('status', value)}
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
            <div>
              <Label htmlFor="visibility">การมองเห็น</Label>
              <Select
                value={formData.visibility}
                onValueChange={(value) => handleChange('visibility', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">สาธารณะ</SelectItem>
                  <SelectItem value="private">ส่วนตัว</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="premium_only"
                checked={formData.premium_only}
                onChange={(e) => handleChange('premium_only', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="premium_only">สำหรับสมาชิกพรีเมียมเท่านั้น</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              ยกเลิก
            </Button>
            <Button type="submit" disabled={createExamMutation.isPending}>
              {createExamMutation.isPending ? 'กำลังบันทึก...' : 'บันทึก'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExamForm;
