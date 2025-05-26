
import React from 'react';
import { Settings, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={goHome}
              className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Smart Exam Mastery
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={goHome}>
              <Home className="mr-2 h-4 w-4" />
              หน้าหลัก
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              ตั้งค่า
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
