
import React from 'react';
import { Button } from '@/components/ui/button';

export const CtaSection: React.FC = () => {
  const startPreTest = () => {
    console.log('Navigate to pre-test');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          พร้อมทดสอบความพร้อมของคุณแล้วหรือยัง?
        </h2>
        <p className="text-xl text-indigo-100 mb-8">
          เริ่มต้นทำแบบทดสอบฟรีใน 5 นาที และค้นพบว่าคุณพร้อมสำหรับการสอบข้าราชการแค่ไหน
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Button 
            onClick={startPreTest}
            size="lg"
            className="w-full sm:w-auto bg-white hover:bg-gray-100 text-indigo-600 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl"
          >
            เริ่มทำแบบทดสอบฟรี
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-indigo-600"
          >
            ดูข้อมูลเพิ่มเติม
          </Button>
        </div>
        <p className="text-sm text-indigo-200 mt-4">
          ไม่ต้องลงทะเบียน • ไม่มีค่าใช้จ่าย • ใช้เวลาเพียง 5 นาที
        </p>
      </div>
    </section>
  );
};
