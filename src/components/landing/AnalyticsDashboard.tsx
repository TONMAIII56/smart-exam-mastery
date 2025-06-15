
import React from 'react';
import { BarChart3, TrendingUp, Target, Brain } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const skills = [
    { name: 'คณิตศาสตร์', level: 65, color: 'bg-blue-500' },
    { name: 'ภาษาอังกฤษ', level: 80, color: 'bg-green-500' },
    { name: 'เหตุผล', level: 45, color: 'bg-red-500' },
    { name: 'ความรู้ทั่วไป', level: 70, color: 'bg-yellow-500' }
  ];

  const stats = [
    { label: 'ข้อสอบที่ทำแล้ว', value: '1,247', icon: Target },
    { label: 'คะแนนเฉลี่ย', value: '72%', icon: TrendingUp },
    { label: 'จุดอ่อนที่ปรับปรุงแล้ว', value: '8', icon: Brain }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span className="text-blue-700 font-medium text-sm">Dashboard วิเคราะห์ผล</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ดูตัวอย่าง <span className="text-blue-600">Dashboard</span> วิเคราะห์ผล
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            คุณจะเห็นจุดแข็ง–จุดอ่อนของคุณอย่างชัดเจน พร้อมคำแนะนำอัตโนมัติ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Skills Analysis */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">วิเคราะห์ความเชี่ยวชาญตามหมวด</h3>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="font-bold text-gray-900">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${skill.color}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3">💡 คำแนะนำสำหรับคุณ</h4>
                <ul className="space-y-2 text-blue-800">
                  <li>• ควรฝึกฝนหัวข้อ "เหตุผล" เพิ่มเติม เป็นจุดอ่อนหลัก</li>
                  <li>• แนะนำให้ทำข้อสอบเร่งความเร็วในหมวดคณิตศาสตร์</li>
                  <li>• จุดแข็งของคุณคือภาษาอังกฤษ ควรใช้เป็นจุดขายในการสอบ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
