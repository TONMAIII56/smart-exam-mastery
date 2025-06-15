
import React from 'react';
import { Shield, CheckCircle, Heart, Award } from 'lucide-react';

export const SatisfactionGuarantee: React.FC = () => {
  const guarantees = [
    {
      icon: Shield,
      title: 'รับประกันความพอใจ 100%',
      description: 'หากไม่พอใจภายใน 7 วันแรก คืนเงินเต็มจำนวน'
    },
    {
      icon: CheckCircle,
      title: 'ไม่มีข้อผูกมัด',
      description: 'ยกเลิกได้ทุกเมื่อ ไม่มีค่าธรรมเนียมแอบแฝง'
    },
    {
      icon: Heart,
      title: 'สนับสนุนตลอด 24/7',
      description: 'ทีมสนับสนุนพร้อมช่วยเหลือทุกเมื่อที่คุณต้องการ'
    },
    {
      icon: Award,
      title: 'คุณภาพระดับมืออาชีพ',
      description: 'พัฒนาโดยผู้เชี่ยวชาญด้านการสอบราชการ'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-2 mb-6">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-green-700 font-medium text-sm">การรับประกัน</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            รับประกัน<span className="text-green-600">ความพอใจ</span> 100%
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            หากคุณไม่พอใจภายใน 7 วันแรก เรายินดีคืนเงินเต็มจำนวน – เพราะเรามั่นใจในคุณภาพ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((guarantee, index) => {
            const IconComponent = guarantee.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {guarantee.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {guarantee.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shield className="h-12 w-12 text-green-500" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900">เรามั่นใจในคุณภาพ</h3>
                <p className="text-gray-600">ดังนั้นเราจึงให้การรับประกันที่แข็งแกร่ง</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <p className="text-green-800 font-medium text-lg">
                "หากคุณไม่เห็นการปรับปรุงคะแนนภายใน 7 วันแรก เราจะคืนเงินให้ 100% ทันที"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
