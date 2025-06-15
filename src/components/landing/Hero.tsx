
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, ArrowRight, Shield, Clock, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-orange-50 via-red-50 to-white py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-24 h-24 bg-orange-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-red-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-orange-300/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-[600px]">
          {/* Left Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 mb-6">
                <Award className="h-4 w-4 text-orange-600" />
                <span className="text-orange-700 font-medium text-sm">อันดับ 1 แพลตฟอร์มเตรียมสอบ กพ.</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              สอบผ่าน <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">กพ.</span> ด้วย
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">ระบบ AI</span> ที่แม่นยำที่สุด
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              เตรียมตัวสอบข้าราชการด้วยข้อสอบจำลองที่แม่นยำที่สุด 
              พร้อมระบบวิเคราะห์จุดอ่อน-จุดแข็งด้วย AI แบบเรียลไทม์
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mb-10 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>ระบบปลอดภัย 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>อัปเดตข้อสอบทุกสัปดาห์</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                <span>ผู้ใช้ 2,500+ คน</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-lg"
                onClick={() => navigate('/dashboard')}
              >
                เริ่มทำข้อสอบฟรี
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300"
                onClick={() => navigate('/subscription')}
              >
                <Crown className="mr-2 h-5 w-5" />
                ดูแผน Premium
              </Button>
            </div>

            {/* Social proof */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-500 mb-3">เชื่อถือโดยผู้สอบผ่านแล้วกว่า</p>
              <div className="flex justify-center lg:justify-start items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="text-yellow-400 text-lg">★</div>
                ))}
                <span className="ml-2 text-sm text-gray-600 font-medium">4.9/5 จาก 2,847 รีวิว</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 relative">
            <div className="relative max-w-lg mx-auto">
              {/* Main dashboard preview */}
              <div className="bg-white rounded-2xl shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500">Smart Exam Mastery</div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-orange-100 rounded-full"></div>
                    <div className="h-4 bg-red-100 rounded-full w-3/4"></div>
                    <div className="h-4 bg-orange-100 rounded-full w-1/2"></div>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">คะแนนล่าสุด</div>
                        <div className="text-lg font-bold text-orange-600">92%</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">ข้อสอบทำแล้ว</div>
                        <div className="text-lg font-bold text-red-600">247</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ผู้ใช้งานแล้ว</p>
                    <p className="font-bold text-lg text-gray-900">2,500+</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">อัตราสอบผ่าน</p>
                    <p className="font-bold text-lg text-gray-900">92%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-orange-500 mb-2">2,500+</div>
            <div className="text-gray-600 font-medium">ผู้ใช้งานทั่วประเทศ</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-red-500 mb-2">92%</div>
            <div className="text-gray-600 font-medium">อัตราสอบผ่าน</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-orange-500 mb-2">15,000+</div>
            <div className="text-gray-600 font-medium">ข้อสอบจำลอง</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-red-500 mb-2">4.9/5</div>
            <div className="text-gray-600 font-medium">คะแนนความพึงพอใจ</div>
          </div>
        </div>
      </div>
    </section>
  );
};
