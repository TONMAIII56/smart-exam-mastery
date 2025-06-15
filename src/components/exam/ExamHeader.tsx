
import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface ExamHeaderProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({ 
  title, 
  currentQuestion, 
  totalQuestions, 
  timeLeft, 
  setTimeLeft 
}) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">คำถาม:</span>
              <span className="font-medium">{currentQuestion}/{totalQuestions}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-red-500" />
              <span className={`font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-800'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
    </header>
  );
};
