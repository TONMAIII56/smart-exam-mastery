
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PremiumPlans: React.FC = () => {
  const navigate = useNavigate();

  const startFreeTrial = () => {
    navigate('/quiz-selection');
  };

  const plans = [
    {
      name: 'รายเดือน',
      price: '฿299',
      period: 'เดือน',
      features: [
        'ใช้งานระบบฝึกสอบครบทุกฟีเจอร์',
        'วิเคราะห์จุดอ่อนด้วย AI',
        'บันทึกผล + ดูพัฒนาการย้อนหลัง',
        'เทคนิคการจำ และกลยุทธ์เฉพาะบุคคล'
      ],
      icon: Calendar,
      isPopular: false
    },
    {
      name: 'รายปี (ลดพิเศษ)',
      price: '฿1,999',
      originalPrice: '฿3,588',
      period: 'ปี',
      badge: '🔥 ประหยัดกว่า 44%',
      features: [
        'ใช้งานได้ไม่จำกัดตลอด 12 เดือน',
        'สิทธิ์พิเศษเข้าร่วมเวิร์กช็อปติวฟรี',
        'ปลดล็อกบทวิเคราะห์เชิงลึก',
        'ซัพพอร์ตพิเศษจากทีมติวเตอร์'
      ],
      icon: Crown,
      isPopular: true
    }
  ];

  return (
    <section data-section="premium-plans" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <Crown className="h-4 w-4 text-orange-600" />
            <span className="text-orange-700 font-medium text-sm">แผนสมาชิก Premium</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            สมัครแผน <span className="text-blue-600">Premium</span>
            <br />
            พร้อมสอบผ่านอย่างมั่นใจ
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            เลือกแผนที่ใช่ แล้วฝึกสอบแบบมีระบบ พร้อมเทคนิคและการวิเคราะห์ส่วนบุคคลครบชุด
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                  plan.isPopular 
                    ? 'border-orange-500 transform scale-105' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-sm font-bold">
                      แนะนำที่สุด
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`${plan.isPopular ? 'bg-orange-500' : 'bg-blue-500'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  
                  {plan.badge && (
                    <div className="mb-4">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    {plan.originalPrice && (
                      <p className="text-gray-500 line-through text-lg">{plan.originalPrice}</p>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={startFreeTrial}
                  className={`w-full py-6 text-lg font-bold rounded-xl transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Users className="mr-2 h-5 w-5" />
                  เลือกแผนนี้
                </Button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={startFreeTrial}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-12 rounded-xl text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            🎯 ทดลองใช้ฟรี 7 วัน
          </Button>
          <p className="text-gray-600 mt-4">ไม่มีข้อผูกมัด • ยกเลิกได้ทุกเมื่อ</p>
        </div>
      </div>
    </section>
  );
};
