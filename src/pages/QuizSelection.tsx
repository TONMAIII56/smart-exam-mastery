
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, BookOpen, Users, Star, Play } from 'lucide-react';

const QuizSelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const examType = searchParams.get('type') || 'civil-service';
  
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const examData = {
    'civil-service': {
      title: 'ข้าราชการ (ก.พ.)',
      subjects: [
        {
          id: 'general-knowledge',
          name: 'ความรู้รอบตัว',
          description: 'ความรู้ทั่วไป สังคม การเมือง เศรษฐกิจ',
          questions: 350,
          difficulty: 'กลาง',
          avgScore: 72,
          timePerQuestion: 60,
          icon: '🌐'
        },
        {
          id: 'thai-language',
          name: 'ภาษาไทย',
          description: 'ไวยากรณ์ การเขียน การอ่าน วรรณคดี',
          questions: 280,
          difficulty: 'ง่าย',
          avgScore: 78,
          timePerQuestion: 60,
          icon: '📝'
        },
        {
          id: 'mathematics',
          name: 'คณิตศาสตร์',
          description: 'เลขคณิต พีชคณิต เรขาคณิต สถิติ',
          questions: 320,
          difficulty: 'ยาก',
          avgScore: 65,
          timePerQuestion: 60,
          icon: '🔢'
        },
        {
          id: 'english',
          name: 'ภาษาอังกฤษ',
          description: 'Grammar, Vocabulary, Reading Comprehension',
          questions: 300,
          difficulty: 'กลาง',
          avgScore: 70,
          timePerQuestion: 60,
          icon: '🔤'
        }
      ]
    },
    'toeic': {
      title: 'TOEIC',
      subjects: [
        {
          id: 'listening',
          name: 'Listening',
          description: 'Photographs, Question-Response, Conversations, Talks',
          questions: 200,
          difficulty: 'กลาง',
          avgScore: 75,
          timePerQuestion: 60,
          icon: '🎧'
        },
        {
          id: 'reading',
          name: 'Reading',
          description: 'Incomplete Sentences, Text Completion, Reading Comprehension',
          questions: 200,
          difficulty: 'กลาง',
          avgScore: 73,
          timePerQuestion: 60,
          icon: '📖'
        },
        {
          id: 'grammar',
          name: 'Grammar',
          description: 'Tenses, Articles, Prepositions, Conjunctions',
          questions: 150,
          difficulty: 'ยาก',
          avgScore: 68,
          timePerQuestion: 60,
          icon: '📚'
        },
        {
          id: 'vocabulary',
          name: 'Vocabulary',
          description: 'Business Terms, Common Words, Synonyms',
          questions: 250,
          difficulty: 'กลาง',
          avgScore: 71,
          timePerQuestion: 60,
          icon: '💬'
        }
      ]
    },
    'aisa': {
      title: 'AISA',
      subjects: [
        {
          id: 'mathematics',
          name: 'Mathematics',
          description: 'Algebra, Geometry, Statistics, Calculus',
          questions: 150,
          difficulty: 'ยาก',
          avgScore: 67,
          timePerQuestion: 60,
          icon: '🔢'
        },
        {
          id: 'science',
          name: 'Science',
          description: 'Physics, Chemistry, Biology, Earth Science',
          questions: 150,
          difficulty: 'ยาก',
          avgScore: 69,
          timePerQuestion: 60,
          icon: '⚗️'
        },
        {
          id: 'english',
          name: 'English',
          description: 'Reading, Writing, Grammar, Literature',
          questions: 100,
          difficulty: 'กลาง',
          avgScore: 74,
          timePerQuestion: 60,
          icon: '🔤'
        },
        {
          id: 'general',
          name: 'General Knowledge',
          description: 'History, Geography, Current Affairs',
          questions: 100,
          difficulty: 'กลาง',
          avgScore: 72,
          timePerQuestion: 60,
          icon: '🌍'
        }
      ]
    }
  };

  const currentExam = examData[examType as keyof typeof examData];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'ง่าย': return 'bg-green-100 text-green-800';
      case 'กลาง': return 'bg-yellow-100 text-yellow-800';
      case 'ยาก': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartQuiz = (subjectId: string) => {
    navigate(`/quiz?exam=${examType}&subject=${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      {/* Header */}
      <header className="bg-yellow-400 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-white hover:bg-yellow-500"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                กลับหน้าหลัก
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">{currentExam.title}</h1>
                <p className="text-yellow-100 text-sm">เลือกหมวดวิชาที่ต้องการฝึกทำข้อสอบ</p>
              </div>
            </div>
            <div className="text-white text-right">
              <div className="text-sm text-yellow-100">ข้อสอบทั้งหมด</div>
              <div className="text-lg font-bold">
                {currentExam.subjects.reduce((sum, subject) => sum + subject.questions, 0)} ข้อ
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">1,234</div>
              <div className="text-sm text-gray-600">ผู้ทำข้อสอบวันนี้</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">1 นาที</div>
              <div className="text-sm text-gray-600">ต่อข้อ</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">73%</div>
              <div className="text-sm text-gray-600">คะแนนเฉลี่ย</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">{currentExam.subjects.length}</div>
              <div className="text-sm text-gray-600">หมวดวิชา</div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {currentExam.subjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{subject.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{subject.description}</p>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(subject.difficulty)}>
                    {subject.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{subject.questions}</div>
                    <div className="text-gray-600">ข้อสอบ</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{subject.avgScore}%</div>
                    <div className="text-gray-600">คะแนนเฉลี่ย</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{subject.timePerQuestion}s</div>
                    <div className="text-gray-600">ต่อข้อ</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => handleStartQuiz(subject.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    เริ่มทำข้อสอบ
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/subject-stats?exam=${examType}&subject=${subject.id}`)}
                    className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                  >
                    สถิติ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Practice Mode Options */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-yellow-500" />
              <span>โหมดการฝึก</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                variant="outline"
                className="p-4 h-auto flex-col space-y-2 border-dashed border-2 hover:border-yellow-500 hover:bg-yellow-50"
                onClick={() => navigate(`/quiz?exam=${examType}&mode=random`)}
              >
                <div className="text-2xl">🎲</div>
                <div className="font-medium">สุ่มข้อสอบ</div>
                <div className="text-sm text-gray-600 text-center">ข้อสอบสุ่มจากทุกหมวดวิชา</div>
              </Button>
              
              <Button 
                variant="outline"
                className="p-4 h-auto flex-col space-y-2 border-dashed border-2 hover:border-blue-500 hover:bg-blue-50"
                onClick={() => navigate(`/quiz?exam=${examType}&mode=weakness`)}
              >
                <div className="text-2xl">🎯</div>
                <div className="font-medium">จุดอ่อน</div>
                <div className="text-sm text-gray-600 text-center">ฝึกในหมวดที่ทำได้คะแนนต่ำ</div>
              </Button>
              
              <Button 
                variant="outline"
                className="p-4 h-auto flex-col space-y-2 border-dashed border-2 hover:border-green-500 hover:bg-green-50"
                onClick={() => navigate(`/quiz?exam=${examType}&mode=timed`)}
              >
                <div className="text-2xl">⏱️</div>
                <div className="font-medium">สอบจริง</div>
                <div className="text-sm text-gray-600 text-center">จำลองสถานการณ์สอบจริง</div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizSelection;
