
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const startPreTest = () => {
    // Navigate to pre-test page
    console.log('Navigate to pre-test');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-indigo-600">
              Smart Exam Mastery
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              หน้าหลัก
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              วิธีการใช้งาน
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              คุณสมบัติ
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              เสียงผู้ใช้
            </button>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={startPreTest}>
                เข้าสู่ระบบ
              </Button>
              <Button onClick={startPreTest}>
                เริ่มทำแบบทดสอบฟรี
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600 transition"
              >
                หน้าหลัก
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600 transition"
              >
                วิธีการใช้งาน
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600 transition"
              >
                คุณสมบัติ
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600 transition"
              >
                เสียงผู้ใช้
              </button>
              
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" className="w-full" onClick={startPreTest}>
                  เข้าสู่ระบบ
                </Button>
                <Button className="w-full" onClick={startPreTest}>
                  เริ่มทำแบบทดสอบฟรี
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
