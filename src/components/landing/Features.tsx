
import React from 'react';
import { ClipboardCheck, BookOpen, BarChart3, Target } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: ClipboardCheck,
      title: 'แบบทดสอบเสมือนจริง',
      description: 'จำลองบรรยากาศการสอบจริงด้วยระบบจับเวลาและรูปแบบข้อสอบที่เหมือนข้อสอบจริง'
    },
    {
      icon: BookOpen,
      title: 'ครอบคลุมทุกวิชาสอบ',
      description: 'ข้อสอบครบทุกวิชาสำคัญ ภาษาอังกฤษ คณิตศาสตร์ ภาษาไทย และการเมืองการปกครอง'
    },
    {
      icon: BarChart3,
      title: 'การวิเคราะห์จุดแข็ง-จุดอ่อน',
      description: 'รับรายงานการวิเคราะห์ผลการทำข้อสอบแบบละเอียด พร้อมคำแนะนำในการปรับปรุง'
    },
    {
      icon: Target,
      title: 'เฉลยละเอียดพร้อมคำอธิบาย',
      description: 'เฉลยข้อสอบครบทุกข้อพร้อมคำอธิบายที่ช่วยให้เข้าใจเนื้อหาได้ลึกซึ้งยิ่งขึ้น'
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ทำไมต้อง Smart Exam Mastery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            แพลตฟอร์มที่ออกแบบมาเพื่อช่วยให้คุณเตรียมความพร้อมสำหรับการสอบข้าราชการได้อย่างมีประสิทธิภาพ
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
              >
                <div className="text-indigo-600 mb-4">
                  <IconComponent size={48} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
