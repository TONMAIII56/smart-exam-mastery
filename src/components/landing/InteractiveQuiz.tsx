
import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Target, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InteractiveQuiz: React.FC = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz-selection');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-orange-200">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-6 py-3 mb-6">
              <Brain className="h-5 w-5 text-orange-600" />
              <span className="text-orange-700 font-semibold">ทดสอบความพร้อม</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              วัดระดับ <span className="text-orange-600">IQ การสอบ ก.พ.</span> ฟรี!
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              ทำแบบทดสอบ 10 ข้อ ใช้เวลาเพียง 5 นาที 
              รับผลวิเคราะห์จุดแข็ง-จุดอ่อนทันที
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center gap-3 justify-center">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">10 ข้อคัดสรร</p>
                  <p className="text-gray-600 text-sm">จากข้อสอบจริง</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 justify-center">
                <div className="bg-green-500 p-2 rounded-full">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">ผลทันที</p>
                  <p className="text-gray-600 text-sm">วิเคราะห์ AI</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 justify-center">
                <div className="bg-purple-500 p-2 rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">5 นาที</p>
                  <p className="text-gray-600 text-sm">ใช้เวลาสั้น</p>
                </div>
              </div>
            </div>

            <Button
              onClick={startQuiz}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 px-12 rounded-xl text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <Brain className="mr-3 h-7 w-7" />
              🧠 เริ่มทำแบบทดสอบ
            </Button>

            <p className="text-gray-500 mt-4">ฟรี ไม่ต้องสมัครสมาชิก</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              🎯 หลังทำแบบทดสอบคุณจะได้
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-500 p-1 rounded-full mt-1">
                  <span className="text-white text-sm">✅</span>
                </div>
                <span className="text-gray-700 font-medium">คะแนน IQ การสอบ ก.พ. ของคุณ</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500 p-1 rounded-full mt-1">
                  <span className="text-white text-sm">✅</span>
                </div>
                <span className="text-gray-700 font-medium">จุดแข็ง-จุดอ่อนในแต่ละหมวด</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500 p-1 rounded-full mt-1">
                  <span className="text-white text-sm">✅</span>
                </div>
                <span className="text-gray-700 font-medium">แผนการเรียนเฉพาะบุคคล</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500 p-1 rounded-full mt-1">
                  <span className="text-white text-sm">✅</span>
                </div>
                <span className="text-gray-700 font-medium">เทคนิคปรับปรุงแบบเจาะจง</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
