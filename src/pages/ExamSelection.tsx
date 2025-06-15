
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ExamData {
  id: string;
  title: string;
  description: string;
  duration: number;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  premium: boolean;
  tags: string[];
}

const exams: ExamData[] = [
  {
    id: 'civil-001',
    title: 'การสอบราชการ - ภาค ก',
    description: 'ความรู้ความสามารถทั่วไป (คณิตศาสตร์, ภาษาไทย, ภาษาอังกฤษ)',
    duration: 180,
    questionCount: 100,
    difficulty: 'medium',
    premium: false,
    tags: ['ราชการ', 'ภาค ก', 'ความรู้ทั่วไป']
  },
  {
    id: 'toeic-2023',
    title: 'TOEIC Simulation Test',
    description: 'แบบทดสอบจำลองการสอบ TOEIC พร้อมระบบตรวจอัตโนมัติ',
    duration: 120,
    questionCount: 200,
    difficulty: 'hard',
    premium: true,
    tags: ['TOEIC', 'ภาษาอังกฤษ', 'การทำงาน']
  },
  {
    id: 'aisat-prep',
    title: 'AIS Aptitude Test',
    description: 'แบบทดสอบความถนัดสำหรับสมัครงาน AIS',
    duration: 90,
    questionCount: 75,
    difficulty: 'hard',
    premium: true,
    tags: ['AIS', 'สมัครงาน', 'ความถนัด']
  }
];

const ExamCard: React.FC<{ exam: ExamData }> = ({ exam }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'ง่าย';
      case 'medium': return 'ปานกลาง';
      case 'hard': return 'ยาก';
      default: return 'ไม่ระบุ';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(exam.difficulty)}>
              {getDifficultyText(exam.difficulty)}
            </Badge>
            {exam.premium && (
              <Badge className="bg-yellow-100 text-yellow-800">
                <Star className="h-3 w-3 mr-1" />
                พรีเมียม
              </Badge>
            )}
          </div>
          <div className="text-gray-500 text-sm flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {exam.questionCount} คำถาม
          </div>
        </div>
        <CardTitle className="text-xl">{exam.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{exam.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {exam.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{exam.duration} นาที</span>
          </div>
          
          <Link to={`/exam/${exam.id}`}>
            <Button>เริ่มทำข้อสอบ</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const ExamSelection: React.FC = () => {
  const categories = ['ราชการ', 'TOEIC', 'AIS', 'ภาษาอังกฤษ', 'คณิตศาสตร์', 'ความถนัด'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">แบบทดสอบทั้งหมด</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {exams.map(exam => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">หมวดหมู่ข้อสอบ</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Badge 
              key={category}
              className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamSelection;
