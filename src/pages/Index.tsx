
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Trophy, Clock, Users, Target, TrendingUp, Menu, X, ChevronRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const examTypes = [
    {
      id: 'civil-service',
      title: 'ข้าราชการ (ก.พ.)',
      description: 'ข้อสอบบรรจุข้าราชการพลเรือน',
      subjects: ['ความรู้รอบตัว', 'ภาษาไทย', 'คณิตศาสตร์', 'ภาษาอังกฤษ'],
      questions: 1250,
      icon: BookOpen,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'toeic',
      title: 'TOEIC',
      description: 'Test of English for International Communication',
      subjects: ['Listening', 'Reading', 'Grammar', 'Vocabulary'],
      questions: 800,
      icon: Target,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'aisa',
      title: 'AISA',
      description: 'Association of International Schools in Asia',
      subjects: ['Mathematics', 'Science', 'English', 'General Knowledge'],
      questions: 500,
      icon: TrendingUp,
      color: 'from-green-500 to-teal-500'
    }
  ];

  const stats = [
    { label: 'ผู้ใช้งานทั้งหมด', value: '12,345', icon: Users, color: 'text-blue-600' },
    { label: 'ข้อสอบทั้งหมด', value: '2,550', icon: BookOpen, color: 'text-orange-600' },
    { label: 'การทดสอบวันนี้', value: '89', icon: Clock, color: 'text-green-600' },
    { label: 'คะแนนเฉลี่ย', value: '78%', icon: Trophy, color: 'text-purple-600' }
  ];

  const navItems = [
    { label: 'หน้าแรก', href: '/', active: true },
    { label: 'ข้อสอบ', href: '/quiz-selection' },
    { label: 'อันดับคะแนน', href: '/leaderboard' },
    { label: 'เกี่ยวกับเรา', href: '/about' },
    { label: 'ติดต่อ', href: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-3 shadow-lg transform hover:scale-105 transition-transform duration-200">
                <BookOpen className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">SmartQuiz</h1>
                <p className="text-orange-100 text-sm">ระบบฝึกทำข้อสอบออนไลน์</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`text-white hover:bg-white/20 transition-all duration-200 ${
                    item.active ? 'bg-white/20 font-semibold' : ''
                  }`}
                  onClick={() => navigate(item.href)}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex space-x-3">
              <Button 
                variant="outline" 
                className="bg-white text-orange-600 hover:bg-orange-50 border-white transition-all duration-200 hover:scale-105"
                onClick={() => navigate('/login')}
              >
                เข้าสู่ระบบ
              </Button>
              <Button 
                className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => navigate('/register')}
              >
                สมัครสมาชิก
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
              <nav className="flex flex-col space-y-2 mt-4">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`text-white hover:bg-white/20 justify-start transition-all duration-200 ${
                      item.active ? 'bg-white/20 font-semibold' : ''
                    }`}
                    onClick={() => {
                      navigate(item.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
              <div className="flex flex-col space-y-2 mt-4">
                <Button 
                  variant="outline" 
                  className="bg-white text-orange-600 hover:bg-orange-50 border-white"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
                <Button 
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                >
                  สมัครสมาชิก
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-red-100/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              ฝึกทำข้อสอบ
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> ออนไลน์</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              เตรียมความพร้อมสำหรับการสอบ ก.พ., TOEIC, AISA และอื่น ๆ 
              ด้วยระบบฝึกทำข้อสอบที่ทันสมัย พร้อมการวิเคราะห์ผลและจัดอันดับ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200 group"
                onClick={() => navigate('/quiz-selection')}
              >
                เริ่มทำข้อสอบทันที
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
                onClick={() => navigate('/about')}
              >
                เรียนรู้เพิ่มเติม
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-white shadow-inner">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              สถิติการใช้งาน
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ข้อมูลการใช้งานล่าสุดของระบบ SmartQuiz ที่แสดงถึงความน่าเชื่อถือและความนิยม
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50"
                >
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-4`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                    <div className="text-gray-600 text-sm lg:text-base">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exam Types Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              ประเภทข้อสอบ
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              เลือกประเภทข้อสอบที่คุณต้องการฝึกทำ พร้อมข้อสอบคุณภาพสูงจากแหล่งข้อมูลที่เชื่อถือได้
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examTypes.map((exam, index) => {
              const Icon = exam.icon;
              return (
                <Card 
                  key={exam.id} 
                  className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden group bg-white"
                >
                  <div className={`h-2 bg-gradient-to-r ${exam.color}`}></div>
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className={`bg-gradient-to-br ${exam.color} rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{exam.title}</h4>
                      <p className="text-gray-600 text-sm lg:text-base">{exam.description}</p>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center text-sm lg:text-base">
                        <span className="text-gray-600">ข้อสอบทั้งหมด:</span>
                        <span className="font-semibold text-orange-600">{exam.questions.toLocaleString()} ข้อ</span>
                      </div>
                      <div className="text-sm lg:text-base text-gray-600">
                        <span className="font-medium">หมวดวิชา:</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {exam.subjects.slice(0, 2).map((subject, idx) => (
                            <span key={idx} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
                              {subject}
                            </span>
                          ))}
                          {exam.subjects.length > 2 && (
                            <span className="text-orange-600 text-xs lg:text-sm font-medium">+{exam.subjects.length - 2} อื่น ๆ</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200 group"
                      onClick={() => navigate(`/quiz-selection?type=${exam.id}`)}
                    >
                      เข้าทำข้อสอบ
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              ทำไมต้องเลือก SmartQuiz?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ระบบฝึกทำข้อสอบที่ครบครันและทันสมัย ด้วยเทคโนโลยีที่ช่วยให้การเรียนรู้มีประสิทธิภาพมากยิ่งขึ้น
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">จับเวลาแบบเรียลไทม์</h4>
              <p className="text-gray-600 leading-relaxed">ฝึกทำข้อสอบในเวลาจริง 1 นาทีต่อข้อ เพื่อเตรียมความพร้อมสำหรับการสอบจริง</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">ระบบจัดอันดับ</h4>
              <p className="text-gray-600 leading-relaxed">เปรียบเทียบคะแนนกับผู้ใช้อื่น และติดตามความก้าวหน้าของตัวเองอย่างต่อเนื่อง</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">วิเคราะห์จุดอ่อน</h4>
              <p className="text-gray-600 leading-relaxed">ระบบ AI วิเคราะห์และแนะนำหมวดที่ควรฝึกเพิ่มตามผลคะแนนของคุณ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl lg:text-2xl font-bold">SmartQuiz</span>
              </div>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-4">
                ระบบฝึกทำข้อสอบออนไลน์ที่ทันสมัย เพื่อเตรียมความพร้อมสำหรับการสอบทุกประเภท
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-200 cursor-pointer">
                  <span className="text-xs font-bold">FB</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-200 cursor-pointer">
                  <span className="text-xs font-bold">IG</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-200 cursor-pointer">
                  <span className="text-xs font-bold">YT</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">ประเภทข้อสอบ</h5>
              <ul className="space-y-3 text-sm lg:text-base text-gray-400">
                <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">ข้าราชการ (ก.พ.)</li>
                <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">TOEIC</li>
                <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">AISA</li>
                <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">อื่น ๆ</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">ฟีเจอร์</h5>
              <ul className="space-y-3 text-sm lg:text-base text-gray-400">
                <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">ฝึกทำข้อสอบ</li>
                <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">จัดอันดับ</li>
                <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">วิเคราะห์ผล</li>
                <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">สถิติความก้าวหน้า</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">ติดต่อเรา</h5>
              <ul className="space-y-3 text-sm lg:text-base text-gray-400">
                <li className="hover:text-orange-400 transition-colors duration-200">อีเมล: info@smartquiz.com</li>
                <li className="hover:text-orange-400 transition-colors duration-200">โทร: 02-123-4567</li>
                <li className="hover:text-orange-400 transition-colors duration-200">Line: @smartquiz</li>
                <li className="hover:text-orange-400 transition-colors duration-200">Facebook: SmartQuiz Thailand</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm lg:text-base text-gray-400">
            <p>&copy; 2024 SmartQuiz. สงวนลิขสิทธิ์. | นโยบายความเป็นส่วนตัว | เงื่อนไขการใช้งาน</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
