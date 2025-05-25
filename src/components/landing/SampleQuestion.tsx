
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SampleQuestion: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const sampleQuestion = {
    subject: 'ภาษาไทย',
    question: 'ข้อใดใช้คำราชาศัพท์ไม่ถูกต้อง',
    options: [
      { id: 'a', text: 'พระบาทสมเด็จพระเจ้าอยู่หัวทรงพระราชทานพระบรมราโชวาท', isCorrect: false },
      { id: 'b', text: 'สมเด็จพระราชินีทรงพระกรุณาโปรดเกล้าฯ ให้ความช่วยเหลือ', isCorrect: false },
      { id: 'c', text: 'พระองค์ท่านเสด็จพระราชดำเนินไปทรงเปิดงาน', isCorrect: true },
      { id: 'd', text: 'สมเด็จพระกนิษฐาธิราชเจ้าทรงพระราชนิพนธ์หนังสือ', isCorrect: false }
    ],
    explanation: 'คำตอบที่ถูกต้องคือ ข้อ ค. เพราะควรใช้ "เสด็จพระราชดำเนิน" แทน "เสด็จพระราชดำเนินไป" เนื่องจากคำราชาศัพท์ไม่ควรตามด้วยคำอื่นที่แสดงทิศทาง'
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowResult(true);
    }
  };

  const startFullPreTest = () => {
    console.log('Navigate to full pre-test');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ลองทำข้อสอบตัวอย่าง
          </h2>
          <p className="text-xl text-gray-600">
            ทดสอบความรู้ของคุณกับข้อสอบตัวอย่างจากข้อสอบจริง
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {sampleQuestion.subject}
              </span>
              <span className="text-sm text-gray-500">ข้อ 1/1</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-lg font-medium mb-6 text-gray-900">
              {sampleQuestion.question}
            </p>
            
            <div className="space-y-3 mb-6">
              {sampleQuestion.options.map((option) => (
                <div key={option.id} className="flex items-start">
                  <input 
                    type="radio" 
                    id={`option-${option.id}`}
                    name="sample-question" 
                    value={option.id}
                    checked={selectedAnswer === option.id}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="mt-1 mr-3 text-indigo-600 focus:ring-indigo-500"
                    disabled={showResult}
                  />
                  <label 
                    htmlFor={`option-${option.id}`} 
                    className={`text-gray-700 cursor-pointer ${
                      showResult 
                        ? option.isCorrect 
                          ? 'text-green-700 font-semibold' 
                          : selectedAnswer === option.id && !option.isCorrect
                            ? 'text-red-700 line-through'
                            : 'text-gray-500'
                        : 'hover:text-gray-900'
                    }`}
                  >
                    {option.id.toUpperCase()}. {option.text}
                  </label>
                </div>
              ))}
            </div>

            {!showResult ? (
              <Button 
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="w-full sm:w-auto"
              >
                ตรวจคำตอบ
              </Button>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">คำอธิบาย:</h4>
                <p className="text-blue-800">{sampleQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button 
            onClick={startFullPreTest}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            ทำแบบทดสอบเต็มรูปแบบ (15 ข้อ)
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            ใช้เวลาเพียง 5-10 นาที • ไม่ต้องลงทะเบียน
          </p>
        </div>
      </div>
    </section>
  );
};
