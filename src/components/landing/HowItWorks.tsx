
import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'ทำ Pre-test ฟรี',
      description: 'ทำแบบทดสอบสั้นๆ 15 ข้อ ใช้เวลาเพียง 5-10 นาที ไม่ต้องลงทะเบียน'
    },
    {
      number: 2,
      title: 'รับผลวิเคราะห์เบื้องต้น',
      description: 'ดูผลการทำข้อสอบและการวิเคราะห์จุดแข็ง-จุดอ่อนเบื้องต้น'
    },
    {
      number: 3,
      title: 'ลงทะเบียนเพื่อรับสิทธิ์เพิ่มเติม',
      description: 'สมัครสมาชิกเพื่อเข้าถึงข้อสอบเต็มรูปแบบและฟีเจอร์พิเศษ'
    },
    {
      number: 4,
      title: 'ทำข้อสอบและติดตามพัฒนาการ',
      description: 'ฝึกฝนอย่างต่อเนื่องและติดตามความก้าวหน้าของตัวเอง'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            วิธีการใช้งาน Smart Exam Mastery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            เริ่มต้นง่ายๆ ใน 4 ขั้นตอน และเตรียมความพร้อมสำหรับการสอบข้าราชการ
          </p>
        </div>
        
        <div className="relative">
          {/* เส้นเชื่อมระหว่างขั้นตอน (สำหรับ Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-200 -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 relative z-10">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
