
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

interface FeatureGateProps {
  children: React.ReactNode;
  feature: string;
  isPremiumFeature?: boolean;
  fallback?: React.ReactNode;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({ 
  children, 
  feature, 
  isPremiumFeature = false,
  fallback 
}) => {
  const { subscription, isPremium } = useSubscription();
  const navigate = useNavigate();

  // If it's not a premium feature, show content
  if (!isPremiumFeature) {
    return <>{children}</>;
  }

  // If user has premium access, show content
  if (isPremium) {
    return <>{children}</>;
  }

  // Show fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default premium gate UI
  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <Crown className="h-8 w-8 text-orange-500" />
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          <Lock className="h-5 w-5" />
          ฟีเจอร์สำหรับสมาชิก Premium
        </CardTitle>
        <CardDescription>
          อัพเกรดเป็น Premium เพื่อปลดล็อค {feature}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            แผน {subscription?.plan === 'free' ? 'ฟรี' : 'Premium'}
          </Badge>
          <p className="text-sm text-gray-600">
            สมาชิก Premium จะได้รับ:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• ทำข้อสอบได้ไม่จำกัด</li>
            <li>• เข้าถึงข้อสอบทุกประเภท</li>
            <li>• ดูเฉลยและคำอธิบายโดยละเอียด</li>
            <li>• วิเคราะห์ผลการสอบ</li>
          </ul>
        </div>
        <Button 
          onClick={() => navigate('/subscription')}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Crown className="mr-2 h-4 w-4" />
          อัพเกรดเป็น Premium
        </Button>
      </CardContent>
    </Card>
  );
};
