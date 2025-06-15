
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight, Target, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  const startFreeTrial = () => {
    navigate('/quiz-selection');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-400/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-6 py-3 mb-8">
            <Trophy className="h-5 w-5 text-orange-600" />
            <span className="text-orange-700 font-semibold">เวลาที่ดีที่สุดคือตอนนี้</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            เริ่มฝึกสอบ <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">ก.พ.</span> วันนี้…
            <br />
            แล้วปลดล็อกชีวิตราชการ
          </h2>

          <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            ทดลองใช้ฟรี 7 วัน – ไม่มีข้อผูกมัด
            <br />
            <span className="text-orange-300 font-semibold">เริ่มต้นการเปลี่ยนแปลงที่จะเปลี่ยนชีวิตคุณไปตลอดกาล</span>
          </p>
        </div>

        {/* Key benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">เป้าหมายชัดเจน</h3>
            <p className="text-blue-100">ระบบจะช่วยให้คุณมีเป้าหมายและแผนการเรียนที่ชัดเจน</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">ผลลัพธ์รวดเร็ว</h3>
            <p className="text-blue-100">เห็นการปรับปรุงคะแนนได้ภายใน 2-3 สัปดาห์แรก</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <Trophy className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">ความสำเร็จที่ยั่งยืน</h3>
            <p className="text-blue-100">สร้างพื้นฐานที่แข็งแกร่งสำหรับการทำงานราชการ</p>
          </div>
        </div>

        {/* Main CTA */}
        <div className="space-y-8">
          <Button
            onClick={startFreeTrial}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-8 px-16 rounded-2xl text-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 border-2 border-orange-400"
          >
            <Zap className="mr-4 h-8 w-8" />
            🚀 เริ่มฝึกทันที – ฟรี 7 วัน
            <ArrowRight className="ml-4 h-8 w-8" />
          </Button>

          <p className="text-blue-200 text-lg">
            ✅ ไม่ต้องใช้บัตรเครดิต • ✅ ยกเลิกได้ทุกเมื่อ • ✅ รับประกันความพอใจ 100%
          </p>
        </div>

        {/* Social proof */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
          <p className="text-orange-300 font-semibold text-xl mb-4">
            "เข้าร่วมกับผู้ที่ประสบความสำเร็จกว่า 2,500+ คน"
          </p>
          <p className="text-blue-100 text-lg">
            คุณจะเป็นคนต่อไปที่สอบผ่าน ก.พ. และเปลี่ยนชีวิตสู่เส้นทางราชการหรือไม่?
          </p>
        </div>
      </div>
    </section>
  );
};
