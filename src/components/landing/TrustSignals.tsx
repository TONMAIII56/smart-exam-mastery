
import React from 'react';
import { Shield, Award, Clock, Users, CheckCircle, Star } from 'lucide-react';

export const TrustSignals: React.FC = () => {
  const trustBadges = [
    {
      icon: Shield,
      title: 'ความปลอดภัยระดับสูง',
      description: 'ระบบเข้ารหัสข้อมูลมาตรฐาน SSL 256-bit',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Award,
      title: 'รับรองคุณภาพ',
      description: 'ข้อสอบผ่านการตรวจสอบจากผู้เชี่ยวชาญ',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Clock,
      title: 'อัปเดตต่อเนื่อง',
      description: 'เพิ่มข้อสอบใหม่และปรับปรุงทุกสัปดาห์',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Users,
      title: 'ชุมชนผู้เรียน',
      description: 'เข้าร่วมกับผู้เรียนกว่า 50,000 คนทั่วประเทศ',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const organizations = [
    { name: 'กระทรวงการคลัง', logo: '🏛️' },
    { name: 'กรมสรรพากร', logo: '📊' },
    { name: 'ธนาคารกรุงไทย', logo: '🏦' },
    { name: 'บริษัท ปตท.', logo: '⛽' },
    { name: 'จุฬาลงกรณ์มหาวิทยาลัย', logo: '🎓' },
    { name: 'มหาวิทยาลัยเกษตรศาสตร์', logo: '🌱' }
  ];

  const achievements = [
    { metric: '50,000+', label: 'ผู้ใช้งานทั่วประเทศ' },
    { metric: '92%', label: 'อัตราสอบผ่าน' },
    { metric: '15,000+', label: 'ข้อสอบในระบบ' },
    { metric: '4.9/5', label: 'คะแนนความพึงพอใจ' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-orange-600" />
            <span className="text-orange-700 font-medium text-sm">เชื่อถือโดยองค์กรชั้นนำ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ผู้นำด้านการเตรียมสอบ
            <span className="text-orange-600"> กพ.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ไว้วางใจโดยหน่วยงานราชการ องค์กรเอกชน และสถาบันการศึกษาชั้นนำทั่วประเทศ
          </p>
        </div>

        {/* Organizations Trust */}
        <div className="mb-16">
          <h3 className="text-lg font-medium text-gray-500 text-center mb-8">ใช้งานโดยผู้สอบจากหน่วยงานเหล่านี้</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {organizations.map((org, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {org.logo}
                </div>
                <span className="text-sm text-gray-600 text-center font-medium">
                  {org.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group text-center">
                <div className={`${badge.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-8 w-8 ${badge.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{badge.title}</h3>
                <p className="text-gray-600 leading-relaxed">{badge.description}</p>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">ความสำเร็จที่ภาคภูมิใจ</h3>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto">
              ตัวเลขที่พิสูจน์ความเป็นเลิศของแพลตฟอร์มเตรียมสอบอันดับ 1 ของประเทศ
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  {achievement.metric}
                </div>
                <div className="text-orange-100 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Guarantee */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-green-100 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">รับประกันความปลอดภัย</h4>
            <p className="text-gray-600">ข้อมูลส่วนตัวของคุณได้รับการปกป้องด้วยระบบเข้ารหัสระดับธนาคาร</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-100 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">รับประกันผลลัพธ์</h4>
            <p className="text-gray-600">เพิ่มคะแนนสอบอย่างน้อย 30% หรือคืนเงิน 100% ภายใน 30 วัน</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-purple-100 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">สนับสนุนตลอด 24 ชม.</h4>
            <p className="text-gray-600">ทีมงานผู้เชี่ยวชาญพร้อมช่วยเหลือคุณทุกปัญหาตลอด 24 ชั่วโมง</p>
          </div>
        </div>
      </div>
    </section>
  );
};
