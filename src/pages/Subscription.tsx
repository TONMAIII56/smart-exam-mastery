
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, X, Zap } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
  const { subscription, isPremium, upgradeToPremiuMutation } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const features = [
    {
      name: 'ทำข้อสอบไม่จำกัด',
      free: false,
      premium: true,
    },
    {
      name: 'เข้าถึงข้อสอบทุกประเภท',
      free: false,
      premium: true,
    },
    {
      name: 'ดูเฉลยและคำอธิบาย',
      free: false,
      premium: true,
    },
    {
      name: 'วิเคราะห์ผลการสอบ',
      free: false,
      premium: true,
    },
    {
      name: 'ทำข้อสอบตัวอย่าง',
      free: true,
      premium: true,
    },
    {
      name: 'สร้างบัญชีผู้ใช้',
      free: true,
      premium: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            เลือกแผนที่เหมาะสมกับคุณ
          </h1>
          <p className="text-xl text-gray-600">
            อัพเกรดเป็น Premium เพื่อปลดล็อคฟีเจอร์พิเศษทั้งหมด
          </p>
        </div>

        {/* Current Status */}
        {subscription && (
          <div className="mb-8 text-center">
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
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">แผนฟรี</CardTitle>
              <CardDescription>เหมาะสำหรับการทดลองใช้</CardDescription>
              <div className="text-3xl font-bold">
                ฟรี
                <span className="text-lg font-normal text-gray-600">/เดือน</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    {feature.free ? (
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mr-3" />
                    )}
                    <span className={feature.free ? 'text-gray-900' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <p className="text-sm text-gray-600 mb-3">
                  • ทำข้อสอบได้ 3 ครั้งต่อวิชาต่อเดือน
                  <br />
                  • เข้าถึงข้อสอบพื้นฐาน
                </p>
                {!isPremium && (
                  <Badge variant="secondary">แผนปัจจุบัน</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-orange-200 shadow-lg">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-orange-500 text-white px-4 py-1">
                <Crown className="mr-1 h-4 w-4" />
                แนะนำ
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">Premium</CardTitle>
              <CardDescription>สำหรับการเรียนรู้อย่างจริงจัง</CardDescription>
              <div className="text-3xl font-bold text-orange-600">
                ฿199
                <span className="text-lg font-normal text-gray-600">/เดือน</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-900">{feature.name}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <p className="text-sm text-gray-600 mb-4">
                  • ทำข้อสอบได้ไม่จำกัด
                  <br />
                  • เข้าถึงข้อสอบทุกประเภท
                  <br />
                  • วิเคราะห์ผลการสอบโดยละเอียด
                </p>
                {isPremium ? (
                  <Badge className="bg-orange-500">แผนปัจจุบัน</Badge>
                ) : (
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => upgradeToPremiuMutation.mutate()}
                    disabled={upgradeToPremiuMutation.isPending}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    {upgradeToPremiuMutation.isPending ? 'กำลังอัพเกรด...' : 'อัพเกรดตอนนี้'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            ต้องการข้อมูลเพิ่มเติม? ติดต่อเราได้ที่ support@smartexammastery.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
