
import React from 'react';
import { Brain, BarChart3, Target, Zap, Users, Trophy } from 'lucide-react';

export const LiquidGlassFeatures: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI วิเคราะห์ส่วนบุคคล",
      description: "ระบบ AI วิเคราะห์จุดอ่อนและแนะนำแผนการเรียนเฉพาะคุณ",
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      icon: BarChart3,
      title: "ติดตามผลแบบเรียลไทม์",
      description: "วัดความก้าวหน้าและปรับแผนการเรียนอัตโนมัติ",
      gradient: "from-amber-500 to-yellow-600"
    },
    {
      icon: Target,
      title: "เทคนิคเฉพาะทาง",
      description: "เทคนิคการสอบและกลยุทธ์ที่ได้ผลจริง",
      gradient: "from-yellow-400 to-amber-400"
    },
    {
      icon: Zap,
      title: "เรียนรู้เร็ว",
      description: "ระบบจำแบบวิทยาศาสตร์ที่ช่วยให้จำได้ยาวนาน",
      gradient: "from-amber-400 to-yellow-500"
    },
    {
      icon: Users,
      title: "ชุมชนผู้เรียน",
      description: "เรียนร่วมกับเพื่อนและแลกเปลี่ยนประสบการณ์",
      gradient: "from-yellow-500 to-amber-600"
    },
    {
      icon: Trophy,
      title: "รับประกันผลลัพธ์",
      description: "สอบไม่ผ่านคืนเงิน 100% ภายใน 30 วัน",
      gradient: "from-amber-500 to-yellow-400"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background effects with golden theme */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent text-lg font-semibold mb-4">
            คุณสมบัติเด่น
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            ทำไมต้องเลือก
            <span className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Smart Exam Mastery
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            ระบบการเรียนรู้ที่ออกแบบเฉพาะสำหรับการสอบข้าราชการ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:animate-glow`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-8 w-1 h-1 bg-amber-400/40 rounded-full animate-ping"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
