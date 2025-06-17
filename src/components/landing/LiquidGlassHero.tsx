
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LiquidGlassHero: React.FC = () => {
  const navigate = useNavigate();

  const startFreeTrial = () => {
    navigate('/quiz-selection');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-400/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Glass morphism container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-8 py-4 mb-12 shadow-2xl">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <Target className="h-5 w-5 text-cyan-400" />
            <span className="text-white font-semibold tracking-wide">2,500+ ผู้สอบผ่าน ก.พ. แล้ว</span>
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </div>

          {/* Main headline with gradient text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              สอบ ก.พ. ผ่าน
            </span>
            <span className="block text-white/90">
              ใน 60 วัน
            </span>
          </h1>

          {/* Subtitle with glass effect */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              ระบบ AI วิเคราะห์จุดอ่อน + เทคนิคจำเร็ว
              <br />
              <span className="text-cyan-300 font-semibold">สร้างผลลัพธ์จริงภายใน 2 เดือน</span>
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: "🎯", title: "AI วิเคราะห์", desc: "จุดอ่อนเฉพาะบุคคล" },
              { icon: "📚", title: "เนื้อหาครบ", desc: "ทุกหมวดของ ก.พ." },
              { icon: "⚡", title: "เทคนิคจำเร็ว", desc: "สอบผ่านรอบเดียว" },
              { icon: "📊", title: "ระบบอัจฉริยะ", desc: "วัดผลแบบเรียลไทม์" }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              onClick={startFreeTrial}
              size="lg"
              className="relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-2xl text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-2 border border-cyan-400/30"
            >
              <Zap className="mr-3 h-7 w-7" />
              เริ่มทดลองฟรี 7 วัน
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="bg-white/5 backdrop-blur-lg border-2 border-white/20 text-white hover:bg-white/10 py-6 px-12 rounded-2xl font-semibold text-xl transition-all duration-300 hover:scale-105"
            >
              ดูแผนการเรียน
              <ArrowRight className="ml-3 h-7 w-7" />
            </Button>
          </div>

          {/* Stats with liquid glass effect */}
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">97%</div>
                <div className="text-white/70">อัตราผ่าน</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">60</div>
                <div className="text-white/70">วันเฉลี่ย</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">2,500+</div>
                <div className="text-white/70">ผู้ใช้งาน</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute top-1/3 right-10 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-500"></div>
    </section>
  );
};
