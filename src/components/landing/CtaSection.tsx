
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Clock, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CtaSection: React.FC = () => {
  const navigate = useNavigate();

  const startPreTest = () => {
    navigate('/quiz-selection');
  };

  const viewMoreInfo = () => {
    navigate('/dashboard');
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-600 via-red-500 to-orange-500 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/10 rounded-full"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Sparkles className="h-5 w-5 text-white" />
            <span className="text-white font-semibold">ลองทดสอบฟรี ไม่เสียค่าใช้จ่าย</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            พร้อมทดสอบความพร้อม
            <br />
            ของคุณแล้วหรือยัง?
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            เริ่มต้นทำแบบทดสอบฟรีใน 5 นาที และค้นพบว่าคุณพร้อมสำหรับการสอบข้าราชการแค่ไหน
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Button 
            onClick={startPreTest}
            size="lg"
            className="bg-white hover:bg-gray-100 text-orange-600 font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-0"
          >
            เริ่มทำแบบทดสอบฟรี
          </Button>
          <Button 
            onClick={viewMoreInfo}
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-orange-600 py-4 px-10 rounded-xl font-semibold text-lg transition-all duration-300"
          >
            ดูข้อมูลเพิ่มเติม
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center gap-3 text-orange-100">
            <Gift className="h-6 w-6" />
            <span className="font-medium">ไม่ต้องลงทะเบียน</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-orange-100">
            <Sparkles className="h-6 w-6" />
            <span className="font-medium">ไม่มีค่าใช้จ่าย</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-orange-100">
            <Clock className="h-6 w-6" />
            <span className="font-medium">ใช้เวลาเพียง 5 นาที</span>
          </div>
        </div>
      </div>
    </section>
  );
};
