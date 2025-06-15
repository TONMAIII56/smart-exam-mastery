
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, BookOpen, BarChart3, Settings } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isPremium } = useSubscription();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">แดชบอร์ด</h1>
        <p className="text-gray-600">จัดการการเรียนและติดตามความคืบหน้าของคุณ</p>
      </div>

      {/* Subscription Status Card */}
      <Card className="mb-6 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-lg">
                {isPremium ? 'สมาชิก Premium' : 'สมาชิกฟรี'}
              </CardTitle>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/subscription')}
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              {isPremium ? 'จัดการสมาชิก' : 'อัพเกรดเป็น Premium'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {isPremium 
              ? 'คุณกำลังใช้งานแผน Premium เข้าถึงฟีเจอร์ทั้งหมดได้ไม่จำกัด'
              : 'อัพเกรดเป็น Premium เพื่อเข้าถึงข้อสอบทั้งหมดและฟีเจอร์พิเศษ'
            }
          </CardDescription>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/quiz-selection')}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">ทำข้อสอบ</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>เริ่มทำข้อสอบและทดสอบความรู้</CardDescription>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/exam-selection')}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <CardTitle className="text-lg">สอบจำลอง</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>ทดสอบความพร้อมด้วยข้อสอบจำลอง</CardDescription>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/subscription')}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-lg">สมาชิก Premium</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>จัดการแผนสมาชิกและการชำระเงิน</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>กิจกรรมล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">ยังไม่มีกิจกรรมล่าสุด</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
