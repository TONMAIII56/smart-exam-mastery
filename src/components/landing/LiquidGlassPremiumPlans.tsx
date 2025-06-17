
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown, Zap, Star, Users, Calendar, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LiquidGlassPremiumPlans: React.FC = () => {
  const navigate = useNavigate();

  const startFreeTrial = () => {
    navigate('/quiz-selection');
  };

  const plans = [
    {
      name: 'Premium รายเดือน',
      price: '299',
      originalPrice: '399',
      period: 'เดือน',
      badge: '⚡ ยอดนิยม',
      features: [
        'เข้าถึงข้อสอบทั้งหมด ไม่จำกัด',
        'วิเคราะห์จุดอ่อน-จุดแข็ง ด้วย AI',
        'บันทึกผลสอบและดูพัฒนาการ',
        'เทคนิคการจำและกลยุทธ์เฉพาะบุคคล',
        'ปลดล็อกโหมดจำลองสอบจริง',
        'รายงานวิเคราะห์ความก้าวหน้า'
      ],
      icon: Zap,
      isPopular: true,
      gradient: 'from-yellow-400 to-amber-500',
      glowColor: 'shadow-yellow-500/25'
    },
    {
      name: 'Premium รายปี (ประหยัดสุด)',
      price: '1,999',
      originalPrice: '4,788',
      period: 'ปี',
      badge: '🔥 ประหยัด 58%',
      features: [
        'ทุกอย่างใน Premium รายเดือน',
        'ประหยัดกว่า 58% เมื่อเทียบรายเดือน',
        'สิทธิ์พิเศษเข้าร่วมเวิร์กช็อปติวฟรี',
        'บทวิเคราะห์เชิงลึกพิเศษ',
        'ซัพพอร์ตพิเศษจากทีมติวเตอร์',
        'โบนัสคอร์สพิเศษตลอดปี'
      ],
      icon: Crown,
      isPopular: false,
      gradient: 'from-amber-500 to-yellow-600',
      glowColor: 'shadow-amber-500/25'
    },
    {
      name: 'Premium VIP (ลิมิเต็ด)',
      price: '4,999',
      originalPrice: '9,999',
      period: 'ปี',
      badge: '👑 เอ็กซ์คลูซีฟ',
      features: [
        'ทุกอย่างใน Premium รายปี',
        'การติวส่วนตัว 1:1 กับผู้เชี่ยวชาญ',
        'แผนการเรียนส่วนตัวจากผู้เชี่ยวชาญ',
        'เข้าถึงข้อสอบพิเศษเฉพาะ VIP',
        'รับประกันผ่านการสอบ หรือคืนเงิน',
        'สิทธิ์พิเศษในอีเวนต์เอ็กซ์คลูซีฟ'
      ],
      icon: Star,
      isPopular: false,
      gradient: 'from-yellow-500 to-yellow-400',
      glowColor: 'shadow-yellow-400/30'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects with golden theme */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-300/5 to-amber-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent text-lg font-semibold mb-4">
            แผนสมาชิก Premium
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            ปลดล็อกศักยภาพ
            <span className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              การสอบของคุณ
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            เลือกแผนที่เหมาะกับคุณ และเริ่มต้นการเตรียมสอบอย่างมืออาชีพ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${plan.isPopular ? 'ring-2 ring-yellow-400/50' : ''}`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 text-sm font-bold animate-glow">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${plan.glowColor} group-hover:animate-glow`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-6">
                    {plan.originalPrice && (
                      <p className="text-white/50 line-through text-lg">฿{plan.originalPrice}</p>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                        ฿{plan.price}
                      </span>
                      <span className="text-white/70">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={startFreeTrial}
                    className={`w-full py-6 text-lg font-bold rounded-xl transition-all duration-300 bg-gradient-to-r ${plan.gradient} hover:from-yellow-500 hover:to-amber-600 text-white shadow-lg hover:shadow-xl hover:${plan.glowColor}`}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    เลือกแผนนี้
                  </Button>
                </div>

                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-1 h-1 bg-amber-400/40 rounded-full animate-ping"></div>
              </div>
            );
          })}
        </div>

        {/* Free Trial CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 backdrop-blur-lg border border-yellow-400/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              🎯 ทดลองใช้ฟรี 7 วัน
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              ไม่มีข้อผูกมัด • ยกเลิกได้ทุกเมื่อ • เข้าถึงฟีเจอร์ทั้งหมด
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={startFreeTrial}
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold py-6 px-12 rounded-xl text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 animate-glow"
              >
                <Gift className="mr-2 h-6 w-6" />
                เริ่มทดลองฟรีทันที
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/subscription')}
                size="lg"
                className="border-2 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 font-bold py-6 px-8 rounded-xl text-xl backdrop-blur-sm"
              >
                <Calendar className="mr-2 h-5 w-5" />
                ดูรายละเอียดแผน
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
