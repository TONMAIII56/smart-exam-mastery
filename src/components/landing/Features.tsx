
import React from 'react';
import { Archive, BarChart, Target, Award, Brain, Clock, Users, CheckCircle } from 'lucide-react';

export const Features: React.FC = () => {
  const benefits = [
    {
      icon: Archive,
      title: 'คลังข้อสอบ 5 ปี',
      description: 'ข้อสอบ ก.พ. + AIS Aptitude + TOEIC ย้อนหลัง พร้อมเฉลยแบบละเอียด',
      color: 'bg-blue-500'
    },
    {
      icon: BarChart,
      title: 'วิเคราะห์จุดอ่อน',
      description: 'ระบบ AI วิเคราะห์คะแนน–แนะแนวทางปรับปรุงแบบเรียลไทม์',
      color: 'bg-green-500'
    },
    {
      icon: Target,
      title: 'แบบฝึกเฉพาะบุคคล',
      description: 'ทดสอบอิงจุดอ่อนและจัดคลังส่วนบุคคลตามความต้องการ',
      color: 'bg-orange-500'
    },
    {
      icon: Award,
      title: 'รายงานความคืบหน้า',
      description: 'รายงานสรุปผลพัฒนาการรายสัปดาห์พร้อมคำแนะนำ',
      color: 'bg-purple-500'
    },
    {
      icon: Brain,
      title: 'เทคนิคจำเร็ว',
      description: 'เทคนิคการจำแบบมืออาชีพที่ช่วยให้จำได้นาน จำได้เร็ว',
      color: 'bg-pink-500'
    },
    {
      icon: Clock,
      title: 'ฝึกแบบมีแผน',
      description: 'แผนการเรียนที่ปรับตามเวลาที่มี และเป้าหมายของคุณ',
      color: 'bg-indigo-500'
    },
    {
      icon: Users,
      title: 'ชุมชนผู้เรียน',
      description: 'เข้าร่วมกลุ่มผู้เรียนและแลกเปลี่ยนประสบการณ์',
      color: 'bg-teal-500'
    },
    {
      icon: CheckCircle,
      title: 'การันตีผลลัพธ์',
      description: 'รับประกันผลลัพธ์ หรือคืนเงิน 100% ภายใน 30 วัน',
      color: 'bg-red-500'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-blue-700 font-medium text-sm">ฟีเจอร์เด่น</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ทำไมต้องเลือก <span className="text-blue-600">Smart Exam Mastery</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ระบบเตรียมสอบ ก.พ. ที่ครบครันที่สุด ด้วยเทคโนโลยี AI และเทคนิคการสอนมืออาชีพ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`${benefit.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Signals */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🏆 ผลลัพธ์ที่พิสูจน์แล้ว
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <p className="text-gray-700 font-medium">ผู้ใช้ที่สอบผ่าน ก.พ.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">97%</div>
              <p className="text-gray-700 font-medium">อัตราความสำเร็จ</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">60</div>
              <p className="text-gray-700 font-medium">วันเฉลี่ยในการสอบผ่าน</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
