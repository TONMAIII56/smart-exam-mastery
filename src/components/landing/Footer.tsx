
import React from 'react';
import { Mail, Phone, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Smart Exam Mastery</h3>
            <p className="text-gray-400 mb-4">
              แพลตฟอร์มเตรียมสอบข้าราชการพลเรือนที่ช่วยให้คุณพร้อมสำหรับการสอบด้วยแบบทดสอบเสมือนจริง
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-gray-400 hover:text-white transition">หน้าหลัก</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition">คุณสมบัติ</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">วิธีการใช้งาน</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition">เสียงผู้ใช้</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">ข้อมูลเพิ่มเติม</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">เกี่ยวกับเรา</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">บทความ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">คำถามที่พบบ่อย</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">ข่าวสาร</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">ติดต่อเรา</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" /> 
                <a href="mailto:info@smartexammastery.com" className="hover:text-white transition">
                  info@smartexammastery.com
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" /> 
                <a href="tel:02-xxx-xxxx" className="hover:text-white transition">
                  02-XXX-XXXX
                </a>
              </li>
            </ul>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">นโยบาย</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">นโยบายความเป็นส่วนตัว</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">เงื่อนไขการใช้งาน</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Smart Exam Mastery. สงวนลิขสิทธิ์ทุกประการ.</p>
        </div>
      </div>
    </footer>
  );
};
