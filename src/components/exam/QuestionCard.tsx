
import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false';
  options?: Option[];
  audioUrl?: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswer: (questionId: string, answer: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedAnswer, onAnswer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayAudio = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-start">
        <div className="bg-blue-100 text-blue-800 font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
          ?
        </div>
        <div className="w-full">
          <h3 className="text-lg font-medium text-gray-800 mb-4">{question.text}</h3>
          
          {question.audioUrl && (
            <div className="mb-6">
              <button
                onClick={handlePlayAudio}
                disabled={isPlaying}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  isPlaying 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                <Volume2 className="h-5 w-5 mr-2" />
                {isPlaying ? 'กำลังเล่นเสียง...' : 'เล่นเสียงคำถาม'}
              </button>
              <p className="mt-1 text-sm text-gray-500">
                (กดฟังได้ 1 ครั้งเท่านั้น)
              </p>
            </div>
          )}
          
          {question.type === 'multiple_choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <label 
                  key={option.id} 
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAnswer === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={selectedAnswer === option.id}
                    onChange={() => onAnswer(question.id, option.id)}
                    className="mt-1 mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option.text}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'true_false' && (
            <div className="grid grid-cols-2 gap-4">
              {['true', 'false'].map((value) => (
                <button
                  key={value}
                  onClick={() => onAnswer(question.id, value)}
                  className={`py-3 px-4 rounded-md border transition-colors ${
                    selectedAnswer === value
                      ? value === 'true'
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {value === 'true' ? 'ถูก' : 'ผิด'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
