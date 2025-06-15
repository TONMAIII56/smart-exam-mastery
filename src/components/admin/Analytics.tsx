
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, FileText, CheckCircle, TrendingUp } from 'lucide-react';

const Analytics = () => {
  // Mock data for demonstration
  const { data: analyticsData } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      // In a real implementation, this would fetch actual analytics data
      return {
        totalUsers: 1247,
        totalExams: 45,
        totalAttempts: 3890,
        averageScore: 72.5,
        monthlyData: [
          { month: 'ม.ค.', users: 150, exams: 45 },
          { month: 'ก.พ.', users: 220, exams: 67 },
          { month: 'มี.ค.', users: 180, exams: 89 },
          { month: 'เม.ย.', users: 290, exams: 123 },
          { month: 'พ.ค.', users: 340, exams: 156 },
          { month: 'มิ.ย.', users: 410, exams: 189 }
        ],
        examTypeData: [
          { name: 'การสอบราชการ', value: 45, color: '#3b82f6' },
          { name: 'TOEIC', value: 30, color: '#10b981' },
          { name: 'AISA', value: 25, color: '#f59e0b' }
        ],
        recentActivity: [
          { date: '2024-06-15', activity: 'ผู้ใช้ใหม่ลงทะเบียน', count: 23 },
          { date: '2024-06-15', activity: 'การทำข้อสอบ', count: 145 },
          { date: '2024-06-14', activity: 'ข้อสอบใหม่', count: 3 },
          { date: '2024-06-14', activity: 'ผู้ใช้ใหม่ลงทะเบียน', count: 18 }
        ]
      };
    }
  });

  if (!analyticsData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">กำลังโหลดข้อมูลการวิเคราะห์...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ผู้ใช้ทั้งหมด</p>
                <p className="text-3xl font-bold">{analyticsData.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12% จากเดือนที่แล้ว</p>
              </div>
              <Users className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ข้อสอบทั้งหมด</p>
                <p className="text-3xl font-bold">{analyticsData.totalExams}</p>
                <p className="text-sm text-green-600">+3 ข้อสอบใหม่</p>
              </div>
              <FileText className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">การทำข้อสอบ</p>
                <p className="text-3xl font-bold">{analyticsData.totalAttempts.toLocaleString()}</p>
                <p className="text-sm text-green-600">+8% จากเดือนที่แล้ว</p>
              </div>
              <CheckCircle className="h-12 w-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ย</p>
                <p className="text-3xl font-bold">{analyticsData.averageScore}%</p>
                <p className="text-sm text-green-600">+2.3% จากเดือนที่แล้ว</p>
              </div>
              <TrendingUp className="h-12 w-12 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>การเติบโตรายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#3b82f6" name="ผู้ใช้ใหม่" />
                <Bar dataKey="exams" fill="#10b981" name="การทำข้อสอบ" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>สัดส่วนประเภทข้อสอบ</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.examTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.examTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>กิจกรรมล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{activity.activity}</p>
                  <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString('th-TH')}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{activity.count}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>อัตราการผ่านข้อสอบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">68%</div>
              <p className="text-gray-600">ผู้ใช้ที่ผ่านข้อสอบ</p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>เวลาเฉลี่ยในการทำข้อสอบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">45</div>
              <p className="text-gray-600">นาที</p>
              <p className="text-sm text-gray-500 mt-2">จากเวลาที่กำหนด 60 นาที</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ข้อสอบยอดนิยม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">การสอบราชการ - ภาค ก</span>
                <span className="font-bold">456</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">TOEIC Simulation</span>
                <span className="font-bold">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">AIS Aptitude Test</span>
                <span className="font-bold">123</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
