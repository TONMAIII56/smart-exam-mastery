
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, CreditCard, Calendar } from 'lucide-react';
import { usePaidSubscription } from '@/hooks/usePaidSubscription';
import { useSubscription } from '@/hooks/useSubscription';

interface PaidSubscriptionFormProps {
  onSuccess?: () => void;
}

export const PaidSubscriptionForm: React.FC<PaidSubscriptionFormProps> = ({ onSuccess }) => {
  const [selectedPlan, setSelectedPlan] = useState<'premium_monthly' | 'premium_yearly'>('premium_monthly');
  const { createPaidSubscription, isPending } = usePaidSubscription();
  const { isPremium } = useSubscription();

  const plans = [
    {
      id: 'premium_monthly' as const,
      name: 'Premium รายเดือน',
      price: 139,
      originalPrice: 199,
      period: 'เดือน',
      discount: '30%',
      features: [
        'ทำข้อสอบไม่จำกัด',
        'เข้าถึงข้อสอบทั้งหมด',
        'เฉลยละเอียดพร้อมเทคนิค',
        'วิเคราะห์จุดอ่อน-จุดแข็ง',
      ],
    },
    {
      id: 'premium_yearly' as const,
      name: 'Premium รายปี',
      price: 1390,
      originalPrice: 2388,
      period: 'ปี',
      discount: '42%',
      features: [
        'ทุกอย่างในแผน Premium',
        'ประหยัดกว่าแบบรายเดือน',
        'ใช้งานได้ตลอดปี',
        'รับอัปเดตข้อสอบใหม่ฟรี',
      ],
    },
  ];

  const handleSubscribe = () => {
    createPaidSubscription({ planId: selectedPlan });
    if (onSuccess) {
      onSuccess();
    }
  };

  if (isPremium) {
    return (
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
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
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">เลือกแผนการสมัครสมาชิก</h2>
        <p className="text-gray-600">เริ่มต้นการเตรียมสอบอย่างมืออาชีพ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedPlan === plan.id 
                ? 'border-orange-500 ring-2 ring-orange-200' 
                : 'border-gray-200'
            } ${plan.id === 'premium_monthly' ? 'relative' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.id === 'premium_monthly' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white">แนะนำ</Badge>
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {plan.id === 'premium_monthly' ? (
                    <CreditCard className="h-5 w-5 text-orange-500" />
                  ) : (
                    <Calendar className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    ฿{plan.originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    ลด {plan.discount}
                  </Badge>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">฿{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Crown className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {selectedPlan === plan.id && (
                <Badge className="w-full justify-center py-2 bg-orange-100 text-orange-800">
                  แผนที่เลือก
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={handleSubscribe}
          disabled={isPending}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
          size="lg"
        >
          <Crown className="mr-2 h-5 w-5" />
          {isPending 
            ? 'กำลังดำเนินการ...' 
            : `สมัคร ${plans.find(p => p.id === selectedPlan)?.name}`
          }
        </Button>
        
        <p className="text-sm text-gray-500 mt-2">
          ยกเลิกได้ทุกเมื่อ ไม่มีข้อผูกมัด
        </p>
      </div>
    </div>
  );
};
