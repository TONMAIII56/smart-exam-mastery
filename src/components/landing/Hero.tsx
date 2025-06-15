
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Users, Award, TrendingUp, Clock, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const startFreeTrial = () => {
    navigate('/quiz-selection');
  };

  const scrollToPremiumPlans = () => {
    const premiumSection = document.querySelector('[data-section="premium-plans"]');
    if (premiumSection) {
      premiumSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-6 py-3 mb-8">
            <Target className="h-5 w-5 text-orange-600" />
            <span className="text-orange-700 font-semibold">2,500+ คนใช้และสอบผ่าน ก.พ. แล้ว</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              สอบ ก.พ. ให้ผ่านใน 60 วัน
            </span>
            <br />
            <span className="text-white">ด้วยระบบฝึกแบบอัจฉริยะ</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            ระบบฝึกข้อสอบ + วิเคราะห์จุดอ่อนแบบ AI 
            <br className="hidden md:block" />
            พร้อมเทคนิคจำเร็วที่เข้าใจง่าย
          </p>

          {/* Key Benefits */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3 text-white">
                <div className="bg-green-500 p-1 rounded-full">
                  <span className="text-white text-sm">✅</span>
                </div>
                <span className="font-medium">ฝึกผ่านระบบ AI วิเคราะห์จุดอ่อนเฉพาะบุคคล</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="bg-green-500 p-1 rounded-full">
                  <span className="text-white text-sm">✅</span>
                </div>
                <span className="font-medium">เนื้อหาครบทุกหมวดของ ก.พ. พร้อมแนวข้อสอบจริง</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="bg-green-500 p-1 rounded-full">
                  <span className="text-white text-sm">✅</span>
                </div>
                <span className="font-medium">เทคนิคจำเร็ว + กลยุทธ์สอบผ่านรอบเดียว</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="bg-green-500 p-1 rounded-full">
                  <span className="text-white text-sm">✅</span>
                </div>
                <span className="font-medium">ระบบวัดผลและปรับแผนการเรียนแบบอัจฉริยะ</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">2,500+</p>
                <p className="text-blue-200">ผู้สอบผ่าน ก.พ.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">85%</p>
                <p className="text-blue-200">อัตราการสอบผ่าน</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-2 rounded-full">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">60</p>
                <p className="text-blue-200">วันเฉลี่ยสอบผ่าน</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              onClick={startFreeTrial}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 border-2 border-orange-400"
            >
              <Zap className="mr-3 h-7 w-7" />
              🚀 ทดลองฟรี 7 วัน
            </Button>
            <Button 
              onClick={scrollToPremiumPlans}
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm py-6 px-12 rounded-xl font-semibold text-xl transition-all duration-300"
            >
              ดูแผน Premium
              <ArrowRight className="ml-3 h-7 w-7" />
            </Button>
          </div>

          {/* Trust Signal */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-2">พร้อมเปลี่ยน IQ เป็นคะแนนสอบหรือยัง?</h3>
                <p className="text-blue-200">รับประกันผลลัพธ์ หรือคืนเงิน 100% ภายใน 30 วัน</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-semibold text-white">ระบบ AI ล่าสุด</p>
                  <p className="text-blue-200">วิเคราะห์แบบเรียลไทม์</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
