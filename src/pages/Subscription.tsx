
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, X, Zap, Star, Settings, RefreshCw, Archive, BarChart3, Target, Award } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { PricingCard } from '@/components/subscription/PricingCard';
import { WeaknessAnalytics } from '@/components/subscription/WeaknessAnalytics';
import { FAQ } from '@/components/subscription/FAQ';

const SubscriptionPage = () => {
  const { subscription, isPremium, createCheckout, openCustomerPortal, isCreatingCheckout, isOpeningPortal, refreshSubscription } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Handle authentication redirect in useEffect
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Handle success/cancel from Stripe
    if (searchParams.get('success') === 'true') {
      toast({
        title: 'ชำระเงินสำเร็จ!',
        description: 'คุณได้อัพเกรดเป็นสมาชิก Premium แล้ว กำลังอัพเดตข้อมูล...',
      });
      // Refresh subscription after a short delay
      setTimeout(() => {
        refreshSubscription();
      }, 2000);
    } else if (searchParams.get('canceled') === 'true') {
      toast({
        title: 'ยกเลิกการชำระเงิน',
        description: 'คุณสามารถสมัครสมาชิกได้ทุกเมื่อ',
        variant: 'destructive',
      });
    }
  }, [searchParams, toast, refreshSubscription]);

  // Show loading or return early if no user
  if (!user) {
    return null;
  }

  const plans = [
    {
      plan: 'รายเดือน',
      price: '299',
      originalPrice: undefined,
      discount: undefined,
      perMonth: 'ต่อเดือน',
      features: [
        'เข้าถึงข้อสอบย้อนหลัง 5 ปี',
        'ระบบวิเคราะห์จุดอ่อน',
        'คลังข้อสอบส่วนตัว',
        'อัพเดตข้อสอบใหม่ตลอดปี'
      ],
      isPopular: false,
      planId: 'premium_monthly' as const
    },
    {
      plan: 'รายปี',
      price: '1,999',
      originalPrice: '3,588',
      discount: '44',
      perMonth: 'เพียง ฿166.58/เดือน',
      features: [
        'เข้าถึงข้อสอบย้อนหลัง 5 ปี',
        'ระบบวิเคราะห์จุดอ่อน',
        'คลังข้อสอบส่วนตัว',
        'อัพเดตข้อสอบใหม่ตลอดปี'
      ],
      isPopular: true,
      planId: 'premium_yearly' as const
    }
  ];

  const benefits = [
    {
      icon: Archive,
      title: 'คลังข้อสอบย้อนหลัง 5 ปี',
      description: 'ข้อสอบราชการ ภาค ก ทุกปี (2561-2566), ข้อสอบ TOEIC ย้อนหลัง 60 ชุด, ข้อสอบ AIS Aptitude Test ครบทุกสายงาน',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: BarChart3,
      title: 'ระบบวิเคราะห์ความเชี่ยวชาญ',
      description: 'วิเคราะห์จุดแข็ง-จุดอ่อน สร้างแบบทดสอบเฉพาะจุดอ่อน และระบบพยากรณ์คะแนนสอบจริง',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Target,
      title: 'แบบทดสอบเฉพาะบุคคล',
      description: 'สร้างแบบทดสอบที่ตรงกับจุดอ่อนของคุณ พร้อมแนะนำคอร์สเรียนเฉพาะบุคคล',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Award,
      title: 'รายงานความคืบหน้า',
      description: 'ออกรายงานความคืบหน้าประจำสัปดาห์ ติดตามการพัฒนาอย่างเป็นระบบ',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ปลดล็อกศักยภาพการสอบของคุณ
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            เข้าถึงคลังข้อสอบ 5,000+ ข้อ พร้อมระบบวิเคราะห์อัจฉริยะ
            ที่จะช่วยให้คุณเตรียมตัวสอบได้อย่างมีประสิทธิภาพ
          </p>
          <div className="inline-block bg-yellow-100 px-6 py-3 rounded-full text-yellow-800 border border-yellow-300">
            <span className="animate-pulse inline-block h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
            โปรโมชันพิเศษ! สมัครแผนรายปี ประหยัด 44% เหลือเพียง 15 ที่สุดท้าย
          </div>
        </div>

        {/* Current Status */}
        {subscription && (
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Badge 
                variant={isPremium ? "default" : "secondary"}
                className={`text-lg px-6 py-3 ${
                  isPremium ? 'bg-orange-500' : 'bg-gray-500'
                }`}
              >
                {isPremium ? (
                  <>
                    <Crown className="mr-2 h-5 w-5" />
                    Premium Member
                  </>
                ) : (
                  'Free Member'
                )}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshSubscription}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                อัพเดตสถานะ
              </Button>
            </div>
            
            {isPremium && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => openCustomerPortal()}
                  disabled={isOpeningPortal}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {isOpeningPortal ? 'กำลังเปิด...' : 'จัดการสมาชิก'}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Pricing Plans */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">เลือกแพ็กเกจที่เหมาะกับคุณ</h2>
          <p className="text-gray-600 text-center mb-12">เริ่มต้นการเป็นสมาชิก Premium วันนี้</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                onSubscribe={() => {
                  if (!isPremium) {
                    createCheckout(plan.planId);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">สิทธิประโยชน์ Premium</h2>
          <p className="text-gray-600 text-center mb-12">คุณสมบัติพิเศษที่จะเปลี่ยนวิธีการเตรียมสอบของคุณ</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`${benefit.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className={`h-8 w-8 ${benefit.color}`} />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Analytics Demo */}
          <div className="max-w-2xl mx-auto">
            <WeaknessAnalytics />
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 mb-20 text-center">
          <h3 className="text-2xl font-bold mb-4">รับประกันความพอใจ</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">ยกเลิกได้ทุกเมื่อ</h4>
              <p className="text-gray-600 text-sm">ไม่มีข้อผูกมัด ยกเลิกได้ตลอดเวลา</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <RefreshCw className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">คืนเงินภายใน 14 วัน</h4>
              <p className="text-gray-600 text-sm">หากไม่พอใจในบริการ</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Crown className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">สิทธิ์เต็มรูปแบบ</h4>
              <p className="text-gray-600 text-sm">แม้ยกเลิกแล้วจนถึงวันหมดอายุ</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <FAQ />
        </div>

        {/* Final CTA */}
        {!isPremium && (
          <div className="text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-12 rounded-2xl max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                เริ่มต้นทดลองใช้ฟรี 7 วัน
              </h2>
              <p className="text-white mb-8 max-w-2xl mx-auto text-lg">
                ไม่จำเป็นต้องใช้บัตรเครดิต เข้าถึงคุณสมบัติ Premium ทั้งหมดฟรี 7 วัน
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 text-lg"
                  onClick={() => createCheckout('premium_yearly')}
                  disabled={isCreatingCheckout}
                >
                  <Crown className="mr-2 h-5 w-5" />
                  {isCreatingCheckout ? 'กำลังเปิดหน้าชำระเงิน...' : 'เริ่มทดลองใช้ฟรี'}
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 text-lg"
                  onClick={() => createCheckout('premium_monthly')}
                  disabled={isCreatingCheckout}
                >
                  สมัครรายเดือน
                </Button>
              </div>
              <p className="text-orange-100 mt-4 text-sm">
                * ยกเลิกได้ทุกเมื่อก่อนหมดอายุการทดลองใช้
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
