
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play } from 'lucide-react';

export const Hero: React.FC = () => {
  const startPreTest = () => {
    console.log('Navigate to pre-test');
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF5800' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                ทดสอบความพร้อม
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  สอบข้าราชการ
                </span>
                <br />
                <span className="text-4xl md:text-5xl lg:text-6xl">ฟรี ใน 5 นาที</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                เตรียมพร้อมสอบข้าราชการพลเรือน (กพ) ด้วยแบบทดสอบเสมือนจริง 
                ครอบคลุมทุกวิชาสอบ พร้อมการวิเคราะห์ผลแบบละเอียด
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={startPreTest}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                เริ่มทำแบบทดสอบฟรี
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                ดูตัวอย่างข้อสอบ
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group cursor-pointer">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 mb-3 transform group-hover:scale-105 transition-transform duration-300">
                  <p className="text-3xl md:text-4xl font-bold text-white">10K+</p>
                </div>
                <p className="text-gray-600 font-medium">ผู้ใช้งาน</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 mb-3 transform group-hover:scale-105 transition-transform duration-300">
                  <p className="text-3xl md:text-4xl font-bold text-white">85%</p>
                </div>
                <p className="text-gray-600 font-medium">สอบผ่าน</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 mb-3 transform group-hover:scale-105 transition-transform duration-300">
                  <p className="text-3xl md:text-4xl font-bold text-white">4.8/5</p>
                </div>
                <p className="text-gray-600 font-medium">ความพึงพอใจ</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                <div className="aspect-square bg-gradient-to-br from-orange-100 via-red-50 to-orange-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')`
                  }}></div>
                  <div className="text-center relative z-10">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <span className="text-5xl">📚</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">พร้อมสำหรับการสอบ</h3>
                    <p className="text-gray-600 font-medium">เริ่มต้นฝึกฝนวันนี้</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
