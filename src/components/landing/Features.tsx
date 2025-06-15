
import React from 'react';
import { ClipboardCheck, BookOpen, BarChart3, Target, Brain, TrendingUp, Users, Lock } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'ระบบ AI วิเคราะห์แบบเรียลไทม์',
      description: 'วิเคราะห์จุดแข็ง-จุดอ่อนของคุณทันทีหลังทำข้อสอบ พร้อมแนะนำแผนการเรียนที่เหมาะสม',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      stats: 'ความแม่นยำ 95%'
    },
    {
      icon: ClipboardCheck,
      title: 'ข้อสอบจำลองเสมือนจริง',
      description: 'จำลองบรรยากาศการสอบจริงด้วยระบบจับเวลา รูปแบบข้อสอบ และระดับความยากที่เหมือนจริง',
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
      stats: '15,000+ ข้อสอบ'
    },
    {
      icon: BookOpen,
      title: 'ครอบคลุมทุกวิชาสอบ กพ.',
      description: 'ข้อสอบครบทุกวิชาสำคัญ ภาษาอังกฤษ คณิตศาสตร์ ภาษาไทย การเมืองการปกครอง และวิชาเฉพาะทาง',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      stats: '12 วิชาหลัก'
    },
    {
      icon: BarChart3,
      title: 'รายงานผลแบบละเอียด',
      description: 'วิเคราะห์ผลการทำข้อสอบแบบละเอียด แสดงสถิติความก้าวหน้า พร้อมคำแนะนำการปรับปรุง',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      stats: 'รายงาน 20+ แบบ'
    },
    {
      icon: Target,
      title: 'เฉลยละเอียดพร้อมเทคนิค',
      description: 'เฉลยข้อสอบครบทุกข้อพร้อมคำอธิบายเชิงลึก เทคนิคลัด และวิธีคิดแบบผู้เชี่ยวชาญ',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      stats: 'เฉลยครบ 100%'
    },
    {
      icon: TrendingUp,
      title: 'ติดตามความก้าวหน้า',
      description: 'ระบบติดตามผลการเรียนรู้แบบเรียลไทม์ พร้อมกราฟแสดงพัฒนาการและเป้าหมายที่ชัดเจน',
      gradient: 'from-teal-500 to-cyan-500',
      bgGradient: 'from-teal-50 to-cyan-50',
      stats: 'อัปเดตทุกวัน'
    },
    {
      icon: Users,
      title: 'ชุมชนผู้เรียน',
      description: 'เข้าร่วมชุมชนผู้เตรียมสอบ แลกเปลี่ยนประสบการณ์ ถาม-ตอบข้อสงสัย พร้อมการแข่งขันที่สร้างแรงบันดาลใจ',
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
      stats: '50,000+ สมาชิก'
    },
    {
      icon: Lock,
      title: 'ระบบรักษาความปลอดภัย',
      description: 'ข้อมูลส่วนตัวและผลการเรียนของคุณได้รับการปกป้องด้วยเทคโนโลยีเข้ารหัสระดับสูง',
      gradient: 'from-gray-500 to-slate-600',
      bgGradient: 'from-gray-50 to-slate-50',
      stats: 'SSL 256-bit'
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <Target className="h-4 w-4 text-orange-600" />
            <span className="text-orange-700 font-medium text-sm">คุณสมบัติเด่น</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ทำไมต้อง
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 ml-3">
              Smart Exam Mastery
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            แพลตฟอร์มที่ออกแบบมาเพื่อช่วยให้คุณเตรียมความพร้อมสำหรับการสอบข้าราชการได้อย่างมีประสิทธิภาพสูงสุด
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className={`group relative bg-gradient-to-br ${feature.bgGradient} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 cursor-pointer transform hover:-translate-y-2`}
              >
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-white/70 rounded-full text-xs font-medium text-gray-700">
                    {feature.stats}
                  </div>
                </div>
                
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Additional CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                พร้อมเริ่มต้นการเตรียมสอบแบบมืออาชีพแล้วหรือยัง?
              </h3>
              <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
                เข้าร่วมกับผู้เตรียมสอบกว่า 50,000 คนที่เลือกใช้ Smart Exam Mastery เป็นเครื่องมือหลักในการพิชิตข้อสอบ กพ.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  เริ่มทดลองใช้ฟรี
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300">
                  ดูการสาธิต
                </button>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
