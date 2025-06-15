
import React from 'react';
import { X, CheckCircle } from 'lucide-react';

export const BeforeAfterComparison: React.FC = () => {
  const comparisons = [
    {
      before: 'ท่องจำแต่ไม่เข้าใจ',
      after: 'ฝึกแบบวิเคราะห์และจำเชิงกลยุทธ์'
    },
    {
      before: 'ไม่มีระบบติดตามผล',
      after: 'AI วิเคราะห์จุดอ่อนแบบรายบุคคล'
    },
    {
      before: 'เครียด กดดัน',
      after: 'ค่อยๆ ปรับ mindset ให้มั่นใจ'
    },
    {
      before: 'สอบหลายรอบ ไม่ผ่านซะที',
      after: 'ผ่านในครั้งแรก หรือเร็วที่สุด'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            เปลี่ยนจาก <span className="text-red-400">การเรียนแบบเก่า</span>
            <br />
            สู่ <span className="text-green-400">ระบบเรียนอัจฉริยะ</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            เปรียบเทียบวิธีการเตรียมสอบแบบเดิม กับระบบ Smart Exam Mastery
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before Column */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-red-400 mb-2">วิธีเก่า</h3>
              <p className="text-red-200">การเตรียมตัวแบบดั้งเดิม</p>
            </div>
            
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                  <div className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-red-100 font-medium">{item.before}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After Column */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Smart Exam Mastery</h3>
              <p className="text-green-200">ระบบเรียนอัจฉริยะ</p>
            </div>
            
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-green-100 font-medium">{item.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              คุณจะเลือกทางไหน?
            </h3>
            <p className="text-orange-100 text-lg mb-6">
              อย่าเสียเวลาไปกับวิธีเก่าที่ไม่ได้ผล เริ่มใช้ระบบที่พิสูจน์แล้วว่าได้ผลจริง
            </p>
            <button className="bg-white text-orange-600 font-bold py-4 px-8 rounded-xl text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl">
              🚀 เริ่มเปลี่ยนแปลงเลย
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
