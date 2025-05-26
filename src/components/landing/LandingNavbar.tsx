
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
    console.log('Navigate to pre-test');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Smart Exam Mastery
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              หน้าหลัก
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              วิธีการใช้งาน
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              คุณสมบัติ
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              เสียงผู้ใช้
            </button>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={startPreTest}
                className="border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg"
              >
                เข้าสู่ระบบ
              </Button>
              <Button 
                onClick={startPreTest}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                เริ่มทำแบบทดสอบฟรี
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 rounded-b-lg shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors duration-200 font-medium"
              >
                หน้าหลัก
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors duration-200 font-medium"
              >
                วิธีการใช้งาน
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors duration-200 font-medium"
              >
                คุณสมบัติ
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors duration-200 font-medium"
              >
                เสียงผู้ใช้
              </button>
              
              <div className="px-3 py-2 space-y-3 border-t border-gray-200 mt-3 pt-3">
                <Button 
                  variant="outline" 
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg" 
                  onClick={startPreTest}
                >
                  เข้าสู่ระบบ
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg" 
                  onClick={startPreTest}
                >
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
