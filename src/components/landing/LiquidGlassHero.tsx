
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LiquidGlassHero: React.FC = () => {
  const navigate = useNavigate();

  const startPreTest = () => {
    navigate('/quiz-selection');
  };

  const goToSubscription = () => {
    navigate('/subscription');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background effects with golden theme */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/15 to-yellow-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-300/5 to-amber-400/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-lg border border-yellow-400/30 rounded-full px-6 py-3 mb-8">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-yellow-300 font-medium">
              ระบบเตรียมสอบอัจฉริยะ รุ่นใหม่ล่าสุด
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              เตรียมสอบ
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              อย่างเซียน
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-12">
            ระบบ AI วิเคราะห์จุดอ่อน สร้างแผนการเรียนเฉพาะคุณ 
            พร้อมเทคนิคเฉพาะทางที่ช่วยให้คุณ
            <span className="text-yellow-400 font-semibold"> สอบผ่านแน่นอน</span>
          </p>
        </div>

        {/* Statistics */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">95%</div>
            <div className="text-white/60">อัตราผ่านการสอบ</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">50K+</div>
            <div className="text-white/60">ผู้ใช้ทั่วประเทศ</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">5K+</div>
            <div className="text-white/60">ข้อสอบจริง</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            onClick={startPreTest}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold py-6 px-12 rounded-2xl text-xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-1 group animate-glow"
          >
            <Target className="mr-3 h-6 w-6 group-hover:animate-pulse" />
            ทดสอบความพร้อมฟรี
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={goToSubscription}
            variant="outline"
            size="lg"
            className="bg-white/5 backdrop-blur-lg border-2 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 font-bold py-6 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Zap className="mr-2 h-5 w-5" />
            ดูแผน Premium
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI วิเคราะห์ส่วนบุคคล</h3>
            <p className="text-white/60 text-sm">ระบบ AI วิเคราะห์จุดอ่อนและสร้างแผนการเรียนเฉพาะคุณ</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">ข้อสอบจริง 5 ปี</h3>
            <p className="text-white/60 text-sm">ข้อสอบย้อนหลัง 5 ปี พร้อมเฉลยละเอียด</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">รับประกันผลลัพธ์</h3>
            <p className="text-white/60 text-sm">สอบไม่ผ่านคืนเงิน 100% ภายใน 30 วัน</p>
          </div>
        </div>
      </div>
    </section>
  );
};
