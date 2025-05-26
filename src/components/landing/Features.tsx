
import React from 'react';
import { ClipboardCheck, BookOpen, BarChart3, Target } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: ClipboardCheck,
      title: 'แบบทดสอบเสมือนจริง',
      description: 'จำลองบรรยากาศการสอบจริงด้วยระบบจับเวลาและรูปแบบข้อสอบที่เหมือนข้อสอบจริง',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    },
    {
      icon: BookOpen,
      title: 'ครอบคลุมทุกวิชาสอบ',
      description: 'ข้อสอบครบทุกวิชาสำคัญ ภาษาอังกฤษ คณิตศาสตร์ ภาษาไทย และการเมืองการปกครอง',
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      icon: BarChart3,
      title: 'การวิเคราะห์จุดแข็ง-จุดอ่อน',
      description: 'รับรายงานการวิเคราะห์ผลการทำข้อสอบแบบละเอียด พร้อมคำแนะนำในการปรับปรุง',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: Target,
      title: 'เฉลยละเอียดพร้อมคำอธิบาย',
      description: 'เฉลยข้อสอบครบทุกข้อพร้อมคำอธิบายที่ช่วยให้เข้าใจเนื้อหาได้ลึกซึ้งยิ่งขึ้น',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ทำไมต้อง
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 ml-3">
              Smart Exam Mastery
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            แพลตฟอร์มที่ออกแบบมาเพื่อช่วยให้คุณเตรียมความพร้อมสำหรับการสอบข้าราชการได้อย่างมีประสิทธิภาพ
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className={`group relative bg-gradient-to-br ${feature.bgGradient} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 cursor-pointer transform hover:-translate-y-2`}
              >
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
