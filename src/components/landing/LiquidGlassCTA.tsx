
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LiquidGlassCTA: React.FC = () => {
  const navigate = useNavigate();

  const startFreeTrial = () => {
    navigate('/quiz-selection');
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main content */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-12 shadow-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Shield className="h-5 w-5 text-emerald-400" />
            <span className="text-emerald-300 font-semibold">รับประกันความพอใจ 100%</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            พร้อมเริ่มต้น
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              การเปลี่ยนแปลง
            </span>
            แล้วหรือยัง?
          </h2>

          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            เริ่มทดลองใช้ฟรี 7 วัน ไม่มีข้อผูกมัด
            <br />
            <span className="text-cyan-300 font-semibold">เปลี่ยนชีวิตคุณไปตลอดกาล</span>
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Sparkles className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">ไม่ต้องใช้บัตรเครดิต</h3>
              <p className="text-white/70 text-sm">ทดลองใช้ฟรีได้เลย</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Clock className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">ยกเลิกได้ทุกเมื่อ</h3>
              <p className="text-white/70 text-sm">ไม่มีข้อผูกมัดใดๆ</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">รับประกัน 30 วัน</h3>
              <p className="text-white/70 text-sm">คืนเงิน 100% หากไม่พอใจ</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-6">
            <Button
              onClick={startFreeTrial}
              size="lg"
              className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-8 px-16 rounded-2xl text-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-3 border border-cyan-400/30"
            >
              <span className="relative z-10 flex items-center">
                🚀 เริ่มทดลองฟรี 7 วัน
                <ArrowRight className="ml-4 h-8 w-8" />
              </span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Button>

            <p className="text-white/60 text-lg">
              ✅ ไม่ต้องใช้บัตรเครดิต • ✅ ไม่มีค่าธรรมเนียมแอบแฝง • ✅ เริ่มใช้งานได้ทันที
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-16 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
          <p className="text-cyan-300 font-semibold text-xl mb-4">
            "มาร่วมกับผู้ที่ประสบความสำเร็จกว่า 2,500+ คน"
          </p>
          <p className="text-white/70 text-lg">
            คุณจะเป็นคนต่อไปที่สอบผ่าน ก.พ. และเปลี่ยนชีวิตสู่เส้นทางราชการหรือไม่?
          </p>
        </div>
      </div>
    </section>
  );
};
