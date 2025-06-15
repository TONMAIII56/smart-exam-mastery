
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export const WeaknessAnalytics: React.FC = () => {
  const skills = [
    { name: 'คณิตศาสตร์', level: 65, color: 'bg-yellow-500' },
    { name: 'ภาษาอังกฤษ', level: 80, color: 'bg-green-600' },
    { name: 'เหตุผล', level: 45, color: 'bg-red-500' },
    { name: 'ความรู้ทั่วไป', level: 70, color: 'bg-green-600' }
  ];

  const recommendations = [
    'ควรฝึกฝนหัวข้อ "เหตุผล" เพิ่มเติม',
    'ลองทำแบบทดสอบเร่งความเร็วในหมวดเหตุผล',
    'ทบทวนข้อสอบคณิตศาสตร์ย้อนหลัง 2 ปี'
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">วิเคราะห์ความเชี่ยวชาญ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${skill.color}`} 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="font-medium mb-3">คำแนะนำ</h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
