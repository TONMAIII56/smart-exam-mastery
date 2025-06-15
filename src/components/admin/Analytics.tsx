
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, FileText, Target, Calendar, Award } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [examFilter, setExamFilter] = useState('all');

  const { data: stats } = useQuery({
    queryKey: ['admin-stats', timeRange],
    queryFn: async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(timeRange));

      // Get exam results stats
      const { data: examResults, error: resultsError } = await supabase
        .from('exam_results')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (resultsError) throw resultsError;

      // Get question stats
      const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('status, difficulty_level, exam_id, exams(exam_type)');

      if (questionsError) throw questionsError;

      // Get user stats
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('created_at, subscription_plan')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (usersError) throw usersError;

      return {
        examResults: examResults || [],
        questions: questions || [],
        users: users || []
      };
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

  if (!stats) {
    return <div className="text-center py-8">กำลังโหลด...</div>;
  }

  // Calculate metrics
  const totalExamsCompleted = stats.examResults.length;
  const averageScore = stats.examResults.length > 0 
    ? Math.round(stats.examResults.reduce((sum, result) => sum + result.percentage, 0) / stats.examResults.length)
    : 0;
  const totalQuestions = stats.questions.length;
  const newUsers = stats.users.length;

  // Exam type distribution
  const examTypeData = stats.examResults.reduce((acc: any, result) => {
    acc[result.exam_type] = (acc[result.exam_type] || 0) + 1;
    return acc;
  }, {});

  const examTypeChartData = Object.entries(examTypeData).map(([type, count]) => ({
    name: type,
    value: count
  }));

  // Score distribution
  const scoreRanges = {
    '0-20': 0,
    '21-40': 0,
    '41-60': 0,
    '61-80': 0,
    '81-100': 0
  };

  stats.examResults.forEach(result => {
    const score = result.percentage;
    if (score <= 20) scoreRanges['0-20']++;
    else if (score <= 40) scoreRanges['21-40']++;
    else if (score <= 60) scoreRanges['41-60']++;
    else if (score <= 80) scoreRanges['61-80']++;
    else scoreRanges['81-100']++;
  });

  const scoreDistributionData = Object.entries(scoreRanges).map(([range, count]) => ({
    range,
    count
  }));

  // Question difficulty distribution
  const difficultyData = stats.questions.reduce((acc: any, question) => {
    const difficulty = question.difficulty_level || 'medium';
    acc[difficulty] = (acc[difficulty] || 0) + 1;
    return acc;
  }, {});

  const difficultyChartData = Object.entries(difficultyData).map(([level, count]) => ({
    name: level,
    value: count
  }));

  // Daily exam completions (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const dailyExamsData = last7Days.map(date => {
    const count = stats.examResults.filter(result => 
      result.created_at?.startsWith(date)
    ).length;
    return {
      date: new Date(date).toLocaleDateString('th-TH', { month: 'short', day: 'numeric' }),
      exams: count
    };
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams Completed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExamsCompleted}</div>
            <p className="text-xs text-muted-foreground">
              In the last {timeRange} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Across all completed exams
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuestions}</div>
            <p className="text-xs text-muted-foreground">
              In question bank
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newUsers}</div>
            <p className="text-xs text-muted-foreground">
              In the last {timeRange} days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Exam Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={examTypeChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {examTypeChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Exam Completions */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Exam Completions (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyExamsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="exams" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Question Difficulty Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Question Difficulty Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={difficultyChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {difficultyChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
