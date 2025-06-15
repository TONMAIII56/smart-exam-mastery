
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, X, Zap, Star, Settings, RefreshCw } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { PaidSubscriptionForm } from '@/components/subscription/PaidSubscriptionForm';

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

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            เพิ่มโอกาสสอบผ่าน กพ. ด้วยแผน Premium
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ผู้ที่สมัครแผน Premium มีโอกาสสอบผ่านมากกว่า <span className="font-bold text-[#FF5800]">85%</span> เมื่อเทียบกับผู้ที่ไม่ได้ใช้งาน
          </p>
          <div className="mt-4 inline-block bg-yellow-100 px-4 py-2 rounded-full text-sm font-medium text-yellow-800 border border-yellow-300">
            <span className="animate-pulse inline-block h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
            โปรโมชันพิเศษ! สมัครวันนี้ รับส่วนลด 30% เหลือเพียง 15 ที่สุดท้าย
          </div>
        </div>

        {/* Current Status */}
        {subscription && (
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Badge 
                variant={isPremium ? "default" : "secondary"}
                className={`text-lg px-4 py-2 ${
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

        {/* Debug info for subscription data */}
        <div className="mb-8 text-center">
          <details className="inline-block text-left">
            <summary className="text-sm text-gray-500 cursor-pointer">Debug: Subscription Data</summary>
            <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
              {JSON.stringify({ subscription, isPremium, user: user?.id }, null, 2)}
            </pre>
          </details>
        </div>

        {/* Main Content - Show PaidSubscriptionForm if not premium */}
        {!isPremium ? (
          <div className="mb-12">
            <PaidSubscriptionForm 
              onSuccess={() => {
                toast({
                  title: 'สำเร็จ!',
                  description: 'กำลังเปิดหน้าชำระเงิน...',
                });
              }}
            />
          </div>
        ) : (
          <div className="text-center mb-12">
            <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <Crown className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle>คุณเป็นสมาชิก Premium แล้ว</CardTitle>
                <CardDescription>
                  ขอบคุณที่เป็นสมาชิก Premium กับเรา
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Feature Comparison */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {/* Free Plan */}
          <Card className="relative shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Free</CardTitle>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-bold">0฿</span>
                <span className="text-gray-500">/เดือน</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>ทำข้อสอบ 3 ครั้ง/วิชา/เดือน</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>เข้าถึงข้อสอบพื้นฐาน</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>ดูเฉลยพื้นฐาน</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">ทำข้อสอบไม่จำกัด</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">เฉลยละเอียดพร้อมเทคนิค</span>
                </li>
              </ul>
              {!isPremium && (
                <Badge variant="secondary" className="w-full justify-center py-2">
                  แผนปัจจุบันของคุณ
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Premium Monthly */}
          <Card className="relative shadow-xl border-2 border-[#FF5800] scale-105 z-10">
            <div className="absolute -top-4 left-0 right-0 mx-auto w-max bg-[#FF5800] text-white text-sm font-medium py-1 px-4 rounded-full">
              แนะนำ
            </div>
            <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold p-2 rounded-full transform rotate-12">
              ลด 30%
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Premium รายเดือน</CardTitle>
              <div className="mt-4 mb-2">
                <span className="text-lg text-gray-500 line-through">199฿</span>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">139฿</span>
                <span className="text-gray-500">/เดือน</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">ทุกอย่างในแผน Free</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">ทำข้อสอบไม่จำกัด</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">เข้าถึงข้อสอบทั้งหมด</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">เฉลยละเอียดพร้อมเทคนิค</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">วิเคราะห์จุดอ่อน-จุดแข็ง</span>
                </li>
              </ul>
              {isPremium ? (
                <Badge className="w-full justify-center py-2 bg-orange-500">
                  แผนปัจจุบันของคุณ
                </Badge>
              ) : (
                <Button 
                  className="w-full bg-[#FF5800] hover:bg-[#E04E00] font-medium"
                  onClick={() => createCheckout('premium_monthly')}
                  disabled={isCreatingCheckout}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  {isCreatingCheckout ? 'กำลังเปิดหน้าชำระเงิน...' : 'เริ่มใช้งาน Premium'}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Premium Yearly */}
          <Card className="relative shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Premium รายปี</CardTitle>
              <div className="mt-4 mb-2">
                <span className="text-lg text-gray-500 line-through">2,388฿</span>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">1,390฿</span>
                <span className="text-gray-500">/ปี</span>
                <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  ประหยัด 42%
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>ทุกอย่างในแผน Premium</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>ประหยัดกว่าแบบรายเดือน</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>ใช้งานได้ตลอดปี</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>รับอัปเดตข้อสอบใหม่ฟรี</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => createCheckout('premium_yearly')}
                disabled={isCreatingCheckout}
              >
                {isCreatingCheckout ? 'กำลังเปิดหน้าชำระเงิน...' : 'อัพเกรดเป็นรายปี'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">ผู้ใช้ Premium พูดถึงเรา</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">ส</span>
                </div>
                <div>
                  <h4 className="font-bold">สมชาย ใจดี</h4>
                  <p className="text-sm text-gray-500">นักวิชาการพัสดุปฏิบัติการ</p>
                </div>
              </div>
              <p className="text-gray-600">
                "หลังจากใช้ Premium ผมสอบผ่านในครั้งแรก! ข้อสอบเสมือนจริงและคำอธิบายละเอียดช่วยให้ผมเข้าใจเนื้อหาได้ดีขึ้นมาก"
              </p>
              <div className="mt-3 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-pink-600 font-bold">ส</span>
                </div>
                <div>
                  <h4 className="font-bold">สุภาพร สวยงาม</h4>
                  <p className="text-sm text-gray-500">เจ้าพนักงานธุรการ</p>
                </div>
              </div>
              <p className="text-gray-600">
                "คุ้มค่ามาก! ระบบวิเคราะห์จุดแข็ง-จุดอ่อนช่วยให้ฉันทราบว่าควรเน้นไปที่วิชาไหน ทำให้การเตรียมตัวมีประสิทธิภาพมากขึ้น"
              </p>
              <div className="mt-3 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">ว</span>
                </div>
                <div>
                  <h4 className="font-bold">วิชัย มุ่งมั่น</h4>
                  <p className="text-sm text-gray-500">นักวิชาการเงินและบัญชี</p>
                </div>
              </div>
              <p className="text-gray-600">
                "ลงทุน 139 บาทต่อเดือน แต่ได้เงินเดือนข้าราชการกลับมาหลายหมื่น คุ้มมาก! ขอบคุณที่ช่วยให้ผมสอบผ่าน"
              </p>
              <div className="mt-3 flex">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
                <Star className="h-5 w-5 text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        {!isPremium && (
          <div className="text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-2xl max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                เริ่มต้นเตรียมสอบอย่างมืออาชีพวันนี้
              </h2>
              <p className="text-white mb-6 max-w-2xl mx-auto">
                อย่าปล่อยให้โอกาสในการสอบผ่านหลุดมือ เพียง 139฿ ต่อเดือน คุณจะได้รับเครื่องมือที่ดีที่สุดในการเตรียมสอบ กพ.
              </p>
              <Button 
                className="bg-white text-[#FF5800] hover:bg-gray-100 font-bold py-3 px-8 text-lg"
                onClick={() => createCheckout('premium_monthly')}
                disabled={isCreatingCheckout}
              >
                เริ่มใช้งาน Premium ตอนนี้
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
