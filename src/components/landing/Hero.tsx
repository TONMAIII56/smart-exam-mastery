
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Users, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const startPreTest = () => {
    navigate('/quiz-selection');
  };

  const viewPremiumPlans = () => {
    navigate('/subscription');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-6 py-3 mb-8">
            <Award className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-semibold">2,500+ คนใช้งานและสอบผ่าน</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Exam Mastery
            </span>
            <br />
            <span className="text-gray-800">ระบบฝึกสอบอัจฉริยะ</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            เตรียมความพร้อมสำหรับการสอบด้วย AI ที่วิเคราะห์จุดอ่อนของคุณ 
            และสร้างแผนการฝึกฝนเฉพาะบุคคล เพิ่มโอกาสสอบผ่านสูงสุด 85%
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">2,500+</p>
                <p className="text-gray-600">ผู้ใช้งานที่สอบผ่าน</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-gray-600">อัตราการสอบผ่าน</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">5,000+</p>
                <p className="text-gray-600">ข้อสอบในระบบ</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              onClick={startPreTest}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Play className="mr-3 h-6 w-6" />
              เริ่มทดสอบฟรี
            </Button>
            <Button 
              onClick={viewPremiumPlans}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-4 px-10 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              ดูแผน Premium
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>

          {/* Trust Signal */}
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">รับประกันความพอใจ</h3>
                <p className="text-gray-600">หากไม่พึงพอใจ คืนเงิน 100% ภายใน 30 วัน</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-900">ระบบ AI ล่าสุด</p>
                  <p className="text-gray-600">วิเคราะห์แบบเรียลไทม์</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
