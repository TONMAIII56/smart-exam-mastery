
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, BookOpen, Users, Star, Play, Target, Trophy, Zap } from 'lucide-react';

const QuizSelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const examType = searchParams.get('type') || 'civil-service';
  
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const examData = {
    'civil-service': {
      title: 'ข้าราชการ (ก.พ.)',
      subtitle: 'เตรียมตัวสอบข้าราชการพลเรือน',
      subjects: [
        {
          id: 'general-knowledge',
          name: 'ความรู้รอบตัว',
          description: 'ความรู้ทั่วไป สังคม การเมือง เศรษฐกิจ',
          questions: 350,
          difficulty: 'กลาง',
          avgScore: 72,
          timePerQuestion: 60,
          icon: '🌐',
          color: 'from-blue-500 to-blue-600'
        },
        {
          id: 'thai-language',
          name: 'ภาษาไทย',
          description: 'ไวยากรณ์ การเขียน การอ่าน วรรณคดี',
          questions: 280,
          difficulty: 'ง่าย',
          avgScore: 78,
          timePerQuestion: 60,
          icon: '📝',
          color: 'from-green-500 to-green-600'
        },
        {
          id: 'mathematics',
          name: 'คณิตศาสตร์',
          description: 'เลขคณิต พีชคณิต เรขาคณิต สถิติ',
          questions: 320,
          difficulty: 'ยาก',
          avgScore: 65,
          timePerQuestion: 60,
          icon: '🔢',
          color: 'from-red-500 to-red-600'
        },
        {
          id: 'english',
          name: 'ภาษาอังกฤษ',
          description: 'Grammar, Vocabulary, Reading Comprehension',
          questions: 300,
          difficulty: 'กลาง',
          avgScore: 70,
          timePerQuestion: 60,
          icon: '🔤',
          color: 'from-purple-500 to-purple-600'
        }
      ]
    },
    'toeic': {
      title: 'TOEIC',
      subtitle: 'Test of English for International Communication',
      subjects: [
        {
          id: 'listening',
          name: 'Listening',
          description: 'Photographs, Question-Response, Conversations, Talks',
          questions: 200,
          difficulty: 'กลาง',
          avgScore: 75,
          timePerQuestion: 60,
          icon: '🎧',
          color: 'from-indigo-500 to-indigo-600'
        },
        {
          id: 'reading',
          name: 'Reading',
          description: 'Incomplete Sentences, Text Completion, Reading Comprehension',
          questions: 200,
          difficulty: 'กลาง',
          avgScore: 73,
          timePerQuestion: 60,
          icon: '📖',
          color: 'from-teal-500 to-teal-600'
        },
        {
          id: 'grammar',
          name: 'Grammar',
          description: 'Tenses, Articles, Prepositions, Conjunctions',
          questions: 150,
          difficulty: 'ยาก',
          avgScore: 68,
          timePerQuestion: 60,
          icon: '📚',
          color: 'from-orange-500 to-orange-600'
        },
        {
          id: 'vocabulary',
          name: 'Vocabulary',
          description: 'Business Terms, Common Words, Synonyms',
          questions: 250,
          difficulty: 'กลาง',
          avgScore: 71,
          timePerQuestion: 60,
          icon: '💬',
          color: 'from-pink-500 to-pink-600'
        }
      ]
    },
    'aisa': {
      title: 'AISA',
      subtitle: 'Academic Intelligence Skills Assessment',
      subjects: [
        {
          id: 'mathematics',
          name: 'Mathematics',
          description: 'Algebra, Geometry, Statistics, Calculus',
          questions: 150,
          difficulty: 'ยาก',
          avgScore: 67,
          timePerQuestion: 60,
          icon: '🔢',
          color: 'from-cyan-500 to-cyan-600'
        },
        {
          id: 'science',
          name: 'Science',
          description: 'Physics, Chemistry, Biology, Earth Science',
          questions: 150,
          difficulty: 'ยาก',
          avgScore: 69,
          timePerQuestion: 60,
          icon: '⚗️',
          color: 'from-emerald-500 to-emerald-600'
        },
        {
          id: 'english',
          name: 'English',
          description: 'Reading, Writing, Grammar, Literature',
          questions: 100,
          difficulty: 'กลาง',
          avgScore: 74,
          timePerQuestion: 60,
          icon: '🔤',
          color: 'from-violet-500 to-violet-600'
        },
        {
          id: 'general',
          name: 'General Knowledge',
          description: 'History, Geography, Current Affairs',
          questions: 100,
          difficulty: 'กลาง',
          avgScore: 72,
          timePerQuestion: 60,
          icon: '🌍',
          color: 'from-amber-500 to-amber-600'
        }
      ]
    }
  };

  const currentExam = examData[examType as keyof typeof examData];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'ง่าย': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'กลาง': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'ยาก': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleStartQuiz = (subjectId: string) => {
    navigate(`/quiz?exam=${examType}&subject=${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-400 to-amber-500 shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/20 transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                กลับหน้าหลัก
              </Button>
              <div className="border-l border-white/30 h-8 hidden sm:block"></div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">{currentExam.title}</h1>
                <p className="text-yellow-100 text-sm lg:text-base mt-1">{currentExam.subtitle}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="text-sm text-yellow-100">ข้อสอบทั้งหมด</div>
              <div className="text-2xl font-bold">
                {currentExam.subjects.reduce((sum, subject) => sum + subject.questions, 0)} ข้อ
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold text-gray-800">1,234</div>
              <div className="text-sm text-gray-600">ผู้ทำข้อสอบวันนี้</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold text-gray-800">1 นาที</div>
              <div className="text-sm text-gray-600">ต่อข้อ</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold text-gray-800">73%</div>
              <div className="text-sm text-gray-600">คะแนนเฉลี่ย</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold text-gray-800">{currentExam.subjects.length}</div>
              <div className="text-sm text-gray-600">หมวดวิชา</div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Selection */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {currentExam.subjects.map((subject) => (
            <Card key={subject.id} className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${subject.color}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {subject.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-800">{subject.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{subject.description}</p>
                    </div>
                  </div>
                  <Badge className={`${getDifficultyColor(subject.difficulty)} border font-medium`}>
                    {subject.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-800">{subject.questions}</div>
                    <div className="text-xs text-gray-600">ข้อสอบ</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-800">{subject.avgScore}%</div>
                    <div className="text-xs text-gray-600">คะแนนเฉลี่ย</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-800">{subject.timePerQuestion}s</div>
                    <div className="text-xs text-gray-600">ต่อข้อ</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleStartQuiz(subject.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    เริ่มทำข้อสอบ
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/subject-stats?exam=${examType}&subject=${subject.id}`)}
                    className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-medium py-3 rounded-xl transition-all duration-300"
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    สถิติ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Practice Mode Options */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-800">โหมดการฝึกพิเศษ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <Button 
                variant="outline"
                className="group p-6 h-auto flex-col space-y-3 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-2xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate(`/quiz?exam=${examType}&mode=random`)}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  🎲
                </div>
                <div className="font-semibold text-gray-800">สุ่มข้อสอบ</div>
                <div className="text-sm text-gray-600 text-center leading-relaxed">ข้อสอบสุ่มจากทุกหมวดวิชา เหมาะสำหรับทบทวนรวดเร็ว</div>
              </Button>
              
              <Button 
                variant="outline"
                className="group p-6 h-auto flex-col space-y-3 border-2 border-dashed border-gray-300 hover:border-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate(`/quiz?exam=${examType}&mode=weakness`)}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="font-semibold text-gray-800">จุดอ่อน</div>
                <div className="text-sm text-gray-600 text-center leading-relaxed">ฝึกในหมวดที่ทำได้คะแนนต่ำ เพิ่มประสิทธิภาพการเรียน</div>
              </Button>
              
              <Button 
                variant="outline"
                className="group p-6 h-auto flex-col space-y-3 border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 rounded-2xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate(`/quiz?exam=${examType}&mode=timed`)}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="font-semibold text-gray-800">สอบจริง</div>
                <div className="text-sm text-gray-600 text-center leading-relaxed">จำลองสถานการณ์สอบจริง พร้อมจับเวลาแบบเต็มรูปแบบ</div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizSelection;
