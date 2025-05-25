
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const startPreTest = () => {
    console.log('Navigate to pre-test');
  };

  return (
    <section id="hero" className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ทดสอบความพร้อมสอบข้าราชการ กพ ฟรี ใช้เวลาแค่ 5 นาที
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              เตรียมพร้อมสอบข้าราชการพลเรือนกับแบบทดสอบเสมือนจริง ครอบคลุมทุกวิชาสอบ
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
              <Button 
                onClick={startPreTest}
                size="lg"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl"
              >
                เริ่มทำแบบทดสอบฟรี
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                ดูตัวอย่างข้อสอบ
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">10,000+</p>
                <p className="text-gray-600">ผู้ใช้งาน</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">85%</p>
                <p className="text-gray-600">สอบผ่าน</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">4.8/5</p>
                <p className="text-gray-600">ความพึงพอใจ</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-white">📚</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">พร้อมสำหรับการสอบ</h3>
                  <p className="text-gray-600">เริ่มต้นฝึกฝนวันนี้</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
