
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Trophy, Clock, Users, Target, TrendingUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const examTypes = [
    {
      id: 'civil-service',
      title: 'ข้าราชการ (ก.พ.)',
      description: 'ข้อสอบบรรจุข้าราชการพลเรือน',
      subjects: ['ความรู้รอบตัว', 'ภาษาไทย', 'คณิตศาสตร์', 'ภาษาอังกฤษ'],
      questions: 1250,
      icon: BookOpen
    },
    {
      id: 'toeic',
      title: 'TOEIC',
      description: 'Test of English for International Communication',
      subjects: ['Listening', 'Reading', 'Grammar', 'Vocabulary'],
      questions: 800,
      icon: Target
    },
    {
      id: 'aisa',
      title: 'AISA',
      description: 'Association of International Schools in Asia',
      subjects: ['Mathematics', 'Science', 'English', 'General Knowledge'],
      questions: 500,
      icon: TrendingUp
    }
  ];

  const stats = [
    { label: 'ผู้ใช้งานทั้งหมด', value: '12,345', icon: Users },
    { label: 'ข้อสอบทั้งหมด', value: '2,550', icon: BookOpen },
    { label: 'การทดสอบวันนี้', value: '89', icon: Clock },
    { label: 'คะแนนเฉลี่ย', value: '78%', icon: Trophy }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      {/* Header */}
      <header className="bg-yellow-400 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-2">
                <BookOpen className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">SmartQuiz</h1>
                <p className="text-yellow-100 text-sm">ระบบฝึกทำข้อสอบออนไลน์</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="bg-white text-yellow-600 hover:bg-yellow-50"
                onClick={() => navigate('/login')}
              >
                เข้าสู่ระบบ
              </Button>
              <Button 
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                onClick={() => navigate('/register')}
              >
                สมัครสมาชิก
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            ฝึกทำข้อสอบ
            <span className="text-yellow-600"> ออนไลน์</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            เตรียมความพร้อมสำหรับการสอบ ก.พ., TOEIC, AISA และอื่น ๆ 
            ด้วยระบบฝึกทำข้อสอบที่ทันสมัย พร้อมการวิเคราะห์ผลและจัดอันดับ
          </p>
          <Button 
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-lg"
            onClick={() => navigate('/quiz-selection')}
          >
            เริ่มทำข้อสอบทันที
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exam Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ประเภทข้อสอบ
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {examTypes.map((exam) => {
              const Icon = exam.icon;
              return (
                <Card key={exam.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-yellow-600" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">{exam.title}</h4>
                      <p className="text-gray-600 text-sm">{exam.description}</p>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">ข้อสอบทั้งหมด:</span>
                        <span className="font-semibold text-yellow-600">{exam.questions} ข้อ</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">หมวดวิชา:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {exam.subjects.slice(0, 2).map((subject, idx) => (
                            <span key={idx} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                              {subject}
                            </span>
                          ))}
                          {exam.subjects.length > 2 && (
                            <span className="text-yellow-600 text-xs">+{exam.subjects.length - 2} อื่น ๆ</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={() => navigate(`/quiz-selection?type=${exam.id}`)}
                    >
                      เข้าทำข้อสอบ
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ทำไมต้องเลือก SmartQuiz?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">จับเวลาแบบเรียลไทม์</h4>
              <p className="text-gray-600">ฝึกทำข้อสอบในเวลาจริง 1 นาทีต่อข้อ เพื่อเตรียมความพร้อม</p>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">ระบบจัดอันดับ</h4>
              <p className="text-gray-600">เปรียบเทียบคะแนนกับผู้ใช้อื่น และติดตามความก้าวหน้า</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">วิเคราะห์จุดอ่อน</h4>
              <p className="text-gray-600">ระบบแนะนำหมวดที่ควรฝึกเพิ่มตามผลคะแนน</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <span className="text-xl font-bold">SmartQuiz</span>
              </div>
              <p className="text-gray-400 text-sm">
                ระบบฝึกทำข้อสอบออนไลน์ที่ทันสมัย เพื่อเตรียมความพร้อมสำหรับการสอบทุกประเภท
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">ประเภทข้อสอบ</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>ข้าราชการ (ก.พ.)</li>
                <li>TOEIC</li>
                <li>AISA</li>
                <li>อื่น ๆ</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">ฟีเจอร์</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>ฝึกทำข้อสอบ</li>
                <li>จัดอันดับ</li>
                <li>วิเคราะห์ผล</li>
                <li>สถิติความก้าวหน้า</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">ติดต่อเรา</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>อีเมล: info@smartquiz.com</li>
                <li>โทร: 02-123-4567</li>
                <li>Line: @smartquiz</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 SmartQuiz. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
