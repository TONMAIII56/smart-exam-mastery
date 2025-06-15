
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Eye, Archive, Copy, History } from 'lucide-react';
import QuestionForm from './QuestionForm';
import QuestionVersions from './QuestionVersions';

type QuestionStatus = 'draft' | 'review' | 'published' | 'archived';
type DifficultyLevel = 'easy' | 'medium' | 'hard';

const QuestionBank = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | QuestionStatus>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | DifficultyLevel>('all');
  const [examFilter, setExamFilter] = useState('all');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: questions, isLoading } = useQuery({
    queryKey: ['admin-questions', searchTerm, statusFilter, difficultyFilter, examFilter],
    queryFn: async () => {
      let query = supabase
        .from('questions')
        .select('*, exams(exam_name, exam_type, subject), options(count)')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.ilike('question_text', `%${searchTerm}%`);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (difficultyFilter !== 'all') {
        query = query.eq('difficulty_level', difficultyFilter);
      }

      if (examFilter !== 'all') {
        query = query.eq('exam_id', examFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

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

  const updateQuestionStatus = useMutation({
    mutationFn: async ({ questionId, status }: { questionId: string; status: QuestionStatus }) => {
      const { error } = await supabase
        .from('questions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', questionId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      toast({
        title: 'สำเร็จ',
        description: 'อัพเดทสถานะคำถามแล้ว',
      });
    }
  });

  const cloneQuestion = useMutation({
    mutationFn: async (questionId: string) => {
      const { data: originalQuestion, error: questionError } = await supabase
        .from('questions')
        .select('*, options(*)')
        .eq('id', questionId)
        .single();

      if (questionError) throw questionError;

      const { data: newQuestion, error: createError } = await supabase
        .from('questions')
        .insert([{
          ...originalQuestion,
          id: undefined,
          question_text: `${originalQuestion.question_text} (Copy)`,
          status: 'draft' as QuestionStatus,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (createError) throw createError;

      if (originalQuestion.options && originalQuestion.options.length > 0) {
        const optionsToInsert = originalQuestion.options.map(option => ({
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

      return newQuestion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      toast({
        title: 'สำเร็จ',
        description: 'คัดลอกคำถามแล้ว',
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Question Bank</h2>
        <Button onClick={() => { setSelectedQuestion(null); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Question
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
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={(value: 'all' | QuestionStatus) => setStatusFilter(value)}>
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
            <Select value={difficultyFilter} onValueChange={(value: 'all' | DifficultyLevel) => setDifficultyFilter(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulty</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Select value={examFilter} onValueChange={setExamFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                {exams?.map((exam) => (
                  <SelectItem key={exam.id} value={exam.id}>
                    {exam.exam_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions ({questions?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">กำลังโหลด...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Exam</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions?.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium line-clamp-2">
                          {question.question_text}
                        </div>
                        <div className="text-sm text-gray-500">
                          Version {question.version}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{question.exams?.exam_name}</div>
                        <div className="text-gray-500">
                          {question.exams?.exam_type} - {question.exams?.subject}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {question.question_type || 'multiple_choice'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(question.difficulty_level)}>
                        {question.difficulty_level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(question.status)}>
                        {question.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(question.updated_at).toLocaleDateString('th-TH')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => { setSelectedQuestion(question); setShowForm(true); }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => { setSelectedQuestion(question); setShowVersions(true); }}
                        >
                          <History className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => cloneQuestion.mutate(question.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Select
                          value={question.status}
                          onValueChange={(status: QuestionStatus) => updateQuestionStatus.mutate({ questionId: question.id, status })}
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
                {selectedQuestion ? 'Edit Question' : 'Add New Question'}
              </DialogTitle>
            </DialogHeader>
            <QuestionForm
              question={selectedQuestion}
              onSuccess={() => {
                setShowForm(false);
                setSelectedQuestion(null);
                queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
              }}
              onCancel={() => {
                setShowForm(false);
                setSelectedQuestion(null);
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {showVersions && selectedQuestion && (
        <Dialog open={showVersions} onOpenChange={setShowVersions}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Question Version History</DialogTitle>
            </DialogHeader>
            <QuestionVersions
              questionId={selectedQuestion.id}
              onClose={() => {
                setShowVersions(false);
                setSelectedQuestion(null);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default QuestionBank;
