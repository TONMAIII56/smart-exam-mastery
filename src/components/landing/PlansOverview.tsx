
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PlansOverview: React.FC = () => {
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

  const plans = [
    {
      name: 'Free Basic',
      description: 'เริ่มต้นทดลองใช้งานฟรี',
      features: [
        'ข้อสอบย้อนหลัง 1 ปี',
        'ระบบวิเคราะห์เบื้องต้น',
        'ฝึกข้อสอบพื้นฐาน',
        'รายงานผลคะแนน'
      ],
      cta: {
        label: 'ทดลองใช้ฟรี',
        action: startFreeTrial,
        style: 'outline'
      },
      icon: Users,
      isPopular: false
    },
    {
      name: 'Premium',
      description: 'ระบบเต็มรูปแบบสำหรับผู้จริงจัง',
      features: [
        'คลังข้อสอบ 5 ปี',
        'AI วิเคราะห์จุดอ่อนเฉพาะบุคคล',
        'รายงานประจำสัปดาห์',
        'เวิร์กช็อปติวพิเศษ',
        'เทคนิคการจำแบบมืออาชีพ',
        'ซัพพอร์ตตลอด 24 ชั่วโมง'
      ],
      cta: {
        label: 'สมัคร Premium',
        action: scrollToPremiumPlans,
        style: 'default'
      },
      badge: 'แนะนำ',
      icon: Crown,
      isPopular: true
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            เลือกแผนที่เหมาะกับคุณ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            เริ่มต้นฟรี หรือเลือก Premium เพื่อประสบการณ์เต็มรูปแบบ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  plan.isPopular 
                    ? 'border-orange-500 border-2 transform scale-105' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-sm font-bold">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`${plan.isPopular ? 'bg-orange-500' : 'bg-blue-500'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-lg">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={plan.cta.action}
                    variant={plan.cta.style as any}
                    className={`w-full py-6 text-lg font-bold rounded-xl transition-all duration-300 ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
                        : ''
                    }`}
                  >
                    {plan.cta.label}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
