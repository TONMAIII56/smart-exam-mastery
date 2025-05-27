
import React, { useEffect, useState } from 'react';
import { AlertCircle, Crown } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

interface QuotaCheckerProps {
  examType: string;
  subject: string;
  children: React.ReactNode;
}

export const QuotaChecker: React.FC<QuotaCheckerProps> = ({ 
  examType, 
  subject, 
  children 
}) => {
  const { isPremium, checkExamQuota } = useSubscription();
  const [hasQuota, setHasQuota] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkQuota = async () => {
      if (isPremium) {
        setHasQuota(true);
        setIsLoading(false);
        return;
      }

      try {
        const quota = await checkExamQuota({ examType, subject });
        setHasQuota(quota);
      } catch (error) {
        console.error('Error checking quota:', error);
        setHasQuota(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkQuota();
  }, [examType, subject, isPremium, checkExamQuota]);

  if (isLoading) {
    return <div className="animate-pulse">กำลังตรวจสอบสิทธิ์...</div>;
  }

  if (hasQuota) {
    return <>{children}</>;
  }

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="space-y-3">
        <div>
          <strong>คุณได้ใช้สิทธิ์ทำข้อสอบครบแล้ว</strong>
          <p className="text-sm text-gray-600 mt-1">
            ผู้ใช้แผนฟรีสามารถทำข้อสอบได้ 3 ครั้งต่อวิชาต่อเดือน
          </p>
        </div>
        <Button 
          onClick={() => navigate('/subscription')}
          className="bg-orange-500 hover:bg-orange-600"
          size="sm"
        >
          <Crown className="mr-2 h-4 w-4" />
          อัพเกรดเป็น Premium เพื่อทำข้อสอบไม่จำกัด
        </Button>
      </AlertDescription>
    </Alert>
  );
};
