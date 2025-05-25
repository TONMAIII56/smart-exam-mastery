
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'คุณสมชาย ใจดี',
      position: 'นักวิชาการพัสดุปฏิบัติการ',
      avatar: '👨‍💼',
      content: 'Smart Exam Mastery ช่วยให้ผมเตรียมตัวสอบได้อย่างมีประสิทธิภาพ ข้อสอบเสมือนจริงและคำอธิบายละเอียดช่วยให้ผมเข้าใจเนื้อหาได้ดีขึ้นมาก'
    },
    {
      name: 'คุณสุภาพร สวยงาม',
      position: 'เจ้าพนักงานธุรการ',
      avatar: '👩‍💼',
      content: 'ระบบวิเคราะห์จุดแข็ง-จุดอ่อนช่วยให้ฉันทราบว่าควรเน้นไปที่วิชาไหน ทำให้การเตรียมตัวมีทิศทางและมีประสิทธิภาพมากขึ้น'
    },
    {
      name: 'คุณวิชัย มุ่งมั่น',
      position: 'นักวิชาการเงินและบัญชี',
      avatar: '👨‍💻',
      content: 'แบบทดสอบครอบคลุมทุกวิชาและมีความยากง่ายที่เหมาะสม ทำให้รู้สึกมั่นใจมากขึ้นเมื่อเข้าสอบจริง ขอบคุณมากครับ'
    },
    {
      name: 'คุณมาลี ขยันขันแข็ง',
      position: 'นักวิเคราะห์นโยบายและแผน',
      avatar: '👩‍🎓',
      content: 'ชอบที่ระบบให้เฉลยละเอียดพร้อมคำอธิบาย ทำให้เข้าใจว่าทำไมถึงผิดและควรแก้ไขอย่างไร การเรียนรู้จึงมีประสิทธิภาพมากขึ้น'
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            เสียงจากผู้ใช้ที่สอบผ่าน
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ฟังจากประสบการณ์จริงของผู้ที่ใช้ Smart Exam Mastery และสอบผ่านเข้าทำงานราชการ
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
