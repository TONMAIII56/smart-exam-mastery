
import React from 'react';
import { CheckCircle, Brain, Target, BarChart3, Trophy, Zap } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: Brain,
      title: 'ประเมินระดับ IQ การสอบ',
      description: 'ทำแบบทดสอบเพื่อวิเคราะห์ระดับความรู้และจุดแข็ง-จุดอ่อนของคุณ',
      color: 'bg-blue-500'
    },
    {
      number: 2,
      icon: Target,
      title: 'เลือกแนวข้อสอบตรงกลุ่ม',
      description: 'ระบบแนะนำแบบทดสอบที่เหมาะสมกับระดับและเป้าหมายของคุณ',
      color: 'bg-green-500'
    },
    {
      number: 3,
      icon: Zap,
      title: 'ฝึก + เรียน + ทำซ้ำตามจุดอ่อน',
      description: 'เรียนรู้เทคนิคเฉพาะทางและฝึกฝนจนเก่งในจุดที่อ่อนที่สุด',
      color: 'bg-orange-500'
    },
    {
      number: 4,
      icon: BarChart3,
      title: 'สอบ Simulation + Feedback',
      description: 'ทำข้อสอบจำลองสถานการณ์จริงและรับผลการวิเคราะห์ทันที',
      color: 'bg-purple-500'
    },
    {
      number: 5,
      icon: Trophy,
      title: 'พร้อมสอบจริงด้วยความมั่นใจ',
      description: 'เข้าสอบจริงด้วยความพร้อมและมั่นใจ 100%',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="text-blue-700 font-medium text-sm">ระบบการเรียนที่พิสูจน์แล้ว</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ระบบ <span className="text-blue-600">5 ขั้นตอน</span> สู่การสอบผ่าน
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            วิธีการเรียนแบบวิทยาศาสตร์ที่ช่วยให้คุณสอบผ่าน ก.พ. ในเวลาที่เร็วที่สุด
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-green-200 via-orange-200 via-purple-200 to-yellow-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full border border-gray-100 group-hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              เริ่มต้นการเปลี่ยนแปลงวันนี้
            </h3>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              ระบบ 5 ขั้นตอนนี้ช่วยให้ผู้เรียนกว่า 2,500 คนสอบผ่าน ก.พ. แล้ว คุณจะเป็นคนต่อไปหรือไม่?
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              ✅ ทดลองใช้ฟรี – ฝึกเลยวันนี้
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
