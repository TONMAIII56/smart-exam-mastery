
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Edit, Eye, Archive, Clone, Filter } from 'lucide-react';
import ExamForm from './ExamForm';
import ExamPreview from './ExamPreview';

const ExamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedExam, setSelectedExam] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: exams, isLoading } = useQuery({
    queryKey: ['admin-exams', searchTerm, statusFilter, typeFilter],
    queryFn: async () => {
      let query = supabase
        .from('exams')
        .select('*, questions(count)')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`exam_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (typeFilter !== 'all') {
        query = query.eq('exam_type', typeFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const updateExamStatus = useMutation({
    mutationFn: async ({ examId, status }: { examId: string; status: string }) => {
      const { error } = await supabase
        .from('exams')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', examId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-exams'] });
      toast({
        title: 'สำเร็จ',
        description: 'อัพเดทสถานะข้อสอบแล้ว',
      });
    },
    onError: () => {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถอัพเดทสถานะได้',
        variant: 'destructive',
      });
    }
  });

  const cloneExam = useMutation({
    mutationFn: async (examId: string) => {
      // First get the original exam
      const { data: originalExam, error: examError } = await supabase
        .from('exams')
        .select('*')
        .eq('id', examId)
        .single();

      if (examError) throw examError;

      // Create new exam
      const { data: newExam, error: createError } = await supabase
        .from('exams')
        .insert({
          ...originalExam,
          id: undefined,
          exam_name: `${originalExam.exam_name} (Copy)`,
          status: 'draft',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (createError) throw createError;

      // Clone questions and options
      const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('*, options(*)')
        .eq('exam_id', examId);

      if (questionsError) throw questionsError;

      for (const question of questions) {
        const { data: newQuestion, error: questionError } = await supabase
          .from('questions')
          .insert({
            ...question,
            id: undefined,
            exam_id: newExam.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (questionError) throw questionError;

        if (question.options && question.options.length > 0) {
          const optionsToInsert = question.options.map(option => ({
            ...option,
            id: undefined,
            question_id: newQuestion.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }));

          const { error: optionsError } = await supabase
            .from('options')
            .insert(optionsToInsert);

          if (optionsError) throw optionsError;
        }
      }

      return newExam;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-exams'] });
      toast({
        title: 'สำเร็จ',
        description: 'คัดลอกข้อสอบแล้ว',
      });
    },
    onError: () => {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถคัดลอกข้อสอบได้',
        variant: 'destructive',
      });
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'civil-service': return 'bg-blue-100 text-blue-800';
      case 'toeic': return 'bg-purple-100 text-purple-800';
      case 'aisa': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Exam Management</h2>
        <Button onClick={() => { setSelectedExam(null); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Exam
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="civil-service">Civil Service</SelectItem>
                <SelectItem value="toeic">TOEIC</SelectItem>
                <SelectItem value="aisa">AISA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exams ({exams?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">กำลังโหลด...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams?.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{exam.exam_name}</div>
                        <div className="text-sm text-gray-500">{exam.exam_code}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(exam.exam_type)}>
                        {exam.exam_type}
                      </Badge>
                    </TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.total_questions || 0}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(exam.updated_at).toLocaleDateString('th-TH')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => { setSelectedExam(exam); setShowPreview(true); }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => { setSelectedExam(exam); setShowForm(true); }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => cloneExam.mutate(exam.id)}
                        >
                          <Clone className="h-4 w-4" />
                        </Button>
                        <Select
                          value={exam.status}
                          onValueChange={(status) => updateExamStatus.mutate({ examId: exam.id, status })}
                        >
                          <SelectTrigger className="w-32">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedExam ? 'Edit Exam' : 'Create New Exam'}
              </DialogTitle>
            </DialogHeader>
            <ExamForm
              exam={selectedExam}
              onSuccess={() => {
                setShowForm(false);
                setSelectedExam(null);
                queryClient.invalidateQueries({ queryKey: ['admin-exams'] });
              }}
              onCancel={() => {
                setShowForm(false);
                setSelectedExam(null);
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {showPreview && selectedExam && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Exam Preview: {selectedExam.exam_name}</DialogTitle>
            </DialogHeader>
            <ExamPreview
              examId={selectedExam.id}
              onClose={() => {
                setShowPreview(false);
                setSelectedExam(null);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ExamManagement;
