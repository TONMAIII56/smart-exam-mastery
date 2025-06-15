
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-าuto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            สอบผ่าน กพ. ด้วยระบบ AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            เตรียมตัวสอบข้าราชการด้วยข้อสอบจำลองที่แม่นยำที่สุด 
            พร้อมระบบวิเคราะห์จุดอ่อน-จุดแข็งด้วย AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
              onClick={() => navigate('/dashboard')}
            >
              เริ่มทำข้อสอบฟรี
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg"
              onClick={() => navigate('/subscription')}
            >
              <Crown className="mr-2 h-5 w-5" />
              ดูแผน Premium
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-orange-500 mb-2">10,000+</div>
              <div className="text-gray-600">ข้อสอบจำลอง</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-orange-500 mb-2">85%</div>
              <div className="text-gray-600">อัตราสอบผ่าน</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-orange-500 mb-2">4.8/5</div>
              <div className="text-gray-600">คะแนนความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
