
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LiquidGlassNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const startPreTest = () => {
    navigate('/quiz-selection');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-b border-white/20 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Smart Exam Mastery
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="text-white/80 hover:text-cyan-400 transition-colors duration-200 font-medium">
              หน้าหลัก
            </button>
            <button className="text-white/80 hover:text-cyan-400 transition-colors duration-200 font-medium">
              คุณสมบัติ
            </button>
            <button className="text-white/80 hover:text-cyan-400 transition-colors duration-200 font-medium">
              แผนการเรียน
            </button>
            <button className="text-white/80 hover:text-cyan-400 transition-colors duration-200 font-medium">
              เสียงผู้ใช้
            </button>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={goToDashboard}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-xl"
              >
                เข้าสู่ระบบ
              </Button>
              <Button 
                onClick={startPreTest}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                ทดลองฟรี
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white/80 hover:text-cyan-400 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20 rounded-b-2xl shadow-2xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button className="block w-full text-left px-3 py-3 text-white/80 hover:text-cyan-400 hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium">
                หน้าหลัก
              </button>
              <button className="block w-full text-left px-3 py-3 text-white/80 hover:text-cyan-400 hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium">
                คุณสมบัติ
              </button>
              <button className="block w-full text-left px-3 py-3 text-white/80 hover:text-cyan-400 hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium">
                แผนการเรียน
              </button>
              <button className="block w-full text-left px-3 py-3 text-white/80 hover:text-cyan-400 hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium">
                เสียงผู้ใช้
              </button>
              
              <div className="px-3 py-2 space-y-3 border-t border-white/20 mt-3 pt-3">
                <Button 
                  variant="outline" 
                  className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-lg" 
                  onClick={goToDashboard}
                >
                  เข้าสู่ระบบ
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg" 
                  onClick={startPreTest}
                >
                  ทดลองฟรี
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
