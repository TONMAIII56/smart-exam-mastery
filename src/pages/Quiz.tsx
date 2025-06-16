import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExamHeader } from '@/components/exam/ExamHeader';
import { QuestionCard } from '@/components/exam/QuestionCard';
import { ExamResult } from '@/components/exam/ExamResult';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false';
  options?: Option[];
  correctAnswer: string;
  explanation?: string;
  audioUrl?: string;
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: Question[];
}

// ข้อสอบภาษาไทยชุดใหม่
const thaiLanguageExam: ExamData = {
  id: 'thai-language-new',
  title: 'ข้อสอบภาษาไทย',
  subject: 'thai-language',
  duration: 60,
  questions: [
    {
      id: 'q1',
      text: 'คำในข้อใดเป็นคำควบกล้ำไม่แท้?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'กลอง' },
        { id: 'b', text: 'ขรุขระ' },
        { id: 'c', text: 'สร้าง' },
        { id: 'd', text: 'กล้วย' }
      ],
      correctAnswer: 'c',
      explanation: 'คำว่า "สร้าง" เป็นคำควบกล้ำไม่แท้ เพราะออกเสียงว่า "ส-ร้าง" ไม่ใช่ "สร้าง"'
    },
    {
      id: 'q2',
      text: 'ประโยคใดมีคำบุพบท?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เขากินข้าว' },
        { id: 'b', text: 'ฉันไปโรงเรียน' },
        { id: 'c', text: 'เธอสวยมาก' },
        { id: 'd', text: 'เราวิ่งเล่น' }
      ],
      correctAnswer: 'b',
      explanation: 'คำว่า "ไป" ในประโยค "ฉันไปโรงเรียน" เป็นคำบุพบทที่แสดงทิศทาง'
    },
    {
      id: 'q3',
      text: 'คำว่า "บรรทม" หมายถึงอะไร?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เดิน' },
        { id: 'b', text: 'นอน' },
        { id: 'c', text: 'กิน' },
        { id: 'd', text: 'พูด' }
      ],
      correctAnswer: 'b',
      explanation: '"บรรทม" เป็นคำสุภาพที่หมายถึง "นอน"'
    },
    {
      id: 'q4',
      text: 'ข้อใดคือคำราชาศัพท์ของคำว่า "กิน"?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เสวย' },
        { id: 'b', text: 'ฉัน' },
        { id: 'c', text: 'รับประทาน' },
        { id: 'd', text: 'บริโภค' }
      ],
      correctAnswer: 'a',
      explanation: '"เสวย" เป็นคำราชาศัพท์ที่ใช้กับพระมหากษัตริย์และพระบรมวงศานุวงศ์'
    },
    {
      id: 'q5',
      text: 'วรรณคดีเรื่องใดกล่าวถึงทศกัณฐ์?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'อิเหนา' },
        { id: 'b', text: 'ขุนช้างขุนแผน' },
        { id: 'c', text: 'รามเกียรติ์' },
        { id: 'd', text: 'พระอภัยมณี' }
      ],
      correctAnswer: 'c',
      explanation: 'ทศกัณฐ์หรือทศพักตร์ คือพระยักษ์ในเรื่องรามเกียรติ์'
    },
    {
      id: 'q6',
      text: 'คำว่า "มัจฉา" หมายถึงอะไร?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'นก' },
        { id: 'b', text: 'ปลา' },
        { id: 'c', text: 'ช้าง' },
        { id: 'd', text: 'ม้า' }
      ],
      correctAnswer: 'b',
      explanation: '"มัจฉา" เป็นคำบาลีที่หมายถึง "ปลา"'
    },
    {
      id: 'q7',
      text: 'ข้อใดคือลักษณะของคำนาม?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'คำที่ใช้เรียกชื่อคน สัตว์ สิ่งของ สถานที่' },
        { id: 'b', text: 'คำที่ใช้แสดงอาการ' },
        { id: 'c', text: 'คำที่ใช้ขยายคำนาม' },
        { id: 'd', text: 'คำที่ใช้เชื่อมประโยค' }
      ],
      correctAnswer: 'a',
      explanation: 'คำนามคือคำที่ใช้เรียกชื่อคน สัตว์ สิ่งของ สถานที่ และสิ่งต่างๆ'
    },
    {
      id: 'q8',
      text: 'พยัญชนะในข้อใดเป็นอักษรกลางทั้งหมด?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'ก จ ด ต' },
        { id: 'b', text: 'ข ฉ ถ ผ' },
        { id: 'c', text: 'ค ช ท พ' },
        { id: 'd', text: 'ง ญ น ม' }
      ],
      correctAnswer: 'a',
      explanation: 'ก จ ด ต เป็นอักษรกลางทั้งหมด'
    },
    {
      id: 'q9',
      text: 'ประโยคใดเป็นประโยคความรวม?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เขากินข้าว' },
        { id: 'b', text: 'ฉันชอบอ่านหนังสือและฟังเพลง' },
        { id: 'c', text: 'เธอสวยมาก' },
        { id: 'd', text: 'เราวิ่งเล่น' }
      ],
      correctAnswer: 'b',
      explanation: 'ประโยคความรวมคือประโยคที่มีส่วนสมบูรณ์ตั้งแต่ 2 ส่วนขึ้นไป เชื่อมด้วยคำเชื่อม'
    },
    {
      id: 'q10',
      text: 'คำว่า "อัสดง" หมายถึงอะไร?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'ขึ้น' },
        { id: 'b', text: 'ตก' },
        { id: 'c', text: 'สว่าง' },
        { id: 'd', text: 'มืด' }
      ],
      correctAnswer: 'b',
      explanation: '"อัสดง" หมายถึง "ตก" หรือ "ลง"'
    },
    {
      id: 'q11',
      text: 'ข้อใดคือคำที่มาจากภาษาบาลี?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'กษัตริย์' },
        { id: 'b', text: 'บุตร' },
        { id: 'c', text: 'ธรรม' },
        { id: 'd', text: 'วิทยา' }
      ],
      correctAnswer: 'c',
      explanation: '"ธรรม" เป็นคำที่มาจากภาษาบาลี'
    },
    {
      id: 'q12',
      text: 'สำนวน "ชักใย" หมายถึงอะไร?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'สร้างใยแมงมุม' },
        { id: 'b', text: 'วางแผนการร้าย' },
        { id: 'c', text: 'ทำกิจกรรมร่วมกัน' },
        { id: 'd', text: 'ทำงานหนัก' }
      ],
      correctAnswer: 'b',
      explanation: '"ชักใย" หมายถึง การวางแผนการร้าย หรือการคิดแผนการร้าย'
    },
    {
      id: 'q13',
      text: 'คำใดเป็นคำกริยา?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'สวย' },
        { id: 'b', text: 'วิ่ง' },
        { id: 'c', text: 'โต๊ะ' },
        { id: 'd', text: 'และ' }
      ],
      correctAnswer: 'b',
      explanation: '"วิ่ง" เป็นคำกริยาที่แสดงการกระทำ'
    },
    {
      id: 'q14',
      text: 'ข้อใดคือคำประพันธ์ประเภทกลอนสุภาพ?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'โคลงสี่สุภาพ' },
        { id: 'b', text: 'กาพย์ยานี 11' },
        { id: 'c', text: 'กลอนแปด' },
        { id: 'd', text: 'ฉันท์' }
      ],
      correctAnswer: 'c',
      explanation: 'กลอนแปดเป็นคำประพันธ์ประเภทกลอนสุภาพ'
    },
    {
      id: 'q15',
      text: 'คำว่า "พฤกษา" หมายถึงอะไร?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'ภูเขา' },
        { id: 'b', text: 'แม่น้ำ' },
        { id: 'c', text: 'ต้นไม้' },
        { id: 'd', text: 'ดอกไม้' }
      ],
      correctAnswer: 'c',
      explanation: '"พฤกษา" หมายถึง "ต้นไม้"'
    },
    {
      id: 'q16',
      text: 'ข้อใดคือคำไวพจน์ของคำว่า "ดวงจันทร์"?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'ดวงอาทิตย์' },
        { id: 'b', text: 'จันทรา' },
        { id: 'c', text: 'ดวงดาว' },
        { id: 'd', text: 'เมฆ' }
      ],
      correctAnswer: 'b',
      explanation: '"จันทรา" เป็นคำไวพจน์ของคำว่า "ดวงจันทร์"'
    },
    {
      id: 'q17',
      text: 'ประโยคใดเป็นประโยคกรรม?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เขากินข้าว' },
        { id: 'b', text: 'ฉันถูกตี' },
        { id: 'c', text: 'เธอร้องเพลง' },
        { id: 'd', text: 'เราไปเที่ยว' }
      ],
      correctAnswer: 'b',
      explanation: 'ประโยคกรรมคือประโยคที่ประธานถูกกระทำ ในที่นี้ "ฉัน" ถูกตี'
    },
    {
      id: 'q18',
      text: 'คำว่า "กัมปนาท" หมายถึงอะไร?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เสียงดังสนั่น' },
        { id: 'b', text: 'เสียงเบา' },
        { id: 'c', text: 'เสียงไพเราะ' },
        { id: 'd', text: 'เสียงแหลม' }
      ],
      correctAnswer: 'a',
      explanation: '"กัมปนาท" หมายถึง "เสียงดังสนั่น"'
    },
    {
      id: 'q19',
      text: 'ข้อใดคือคำที่มาจากภาษาอังกฤษ?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'กุหลาบ' },
        { id: 'b', text: 'คอมพิวเตอร์' },
        { id: 'c', text: 'กะทิ' },
        { id: 'd', text: 'ขนม' }
      ],
      correctAnswer: 'b',
      explanation: '"คอมพิวเตอร์" เป็นคำที่มาจากภาษาอังกฤษ (Computer)'
    },
    {
      id: 'q20',
      text: 'สำนวน "น้ำขึ้นให้รีบตัก" หมายถึงอะไร?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เมื่อมีโอกาสดีควรรีบฉวยไว้' },
        { id: 'b', text: 'ตักน้ำตอนน้ำขึ้น' },
        { id: 'c', text: 'อย่ารอช้า' },
        { id: 'd', text: 'ทำอะไรให้เร็ว' }
      ],
      correctAnswer: 'a',
      explanation: 'สำนวนนี้หมายถึง เมื่อมีโอกาสดีควรรีบฉวยโอกาสไว้'
    },
    {
      id: 'q21',
      text: 'คำใดเป็นคำวิเศษณ์?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'สวย' },
        { id: 'b', text: 'กิน' },
        { id: 'c', text: 'หนังสือ' },
        { id: 'd', text: 'ใน' }
      ],
      correctAnswer: 'a',
      explanation: '"สวย" เป็นคำวิเศษณ์ที่ใช้ขยายคำนาม'
    },
    {
      id: 'q22',
      text: 'ข้อใดคือลักษณะของคำสรรพนาม?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'คำที่ใช้เรียกชื่อคน สัตว์ สิ่งของ สถานที่' },
        { id: 'b', text: 'คำที่ใช้แทนคำนาม' },
        { id: 'c', text: 'คำที่ใช้แสดงอาการ' },
        { id: 'd', text: 'คำที่ใช้ขยายคำนาม' }
      ],
      correctAnswer: 'b',
      explanation: 'คำสรรพนามคือคำที่ใช้แทนคำนาม เช่น เขา เธอ ฉัน เรา'
    },
    {
      id: 'q23',
      text: 'พยัญชนะในข้อใดเป็นอักษรสูงทั้งหมด?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'ก จ ด ต' },
        { id: 'b', text: 'ข ฉ ถ ผ' },
        { id: 'c', text: 'ค ช ท พ' },
        { id: 'd', text: 'ง ญ น ม' }
      ],
      correctAnswer: 'b',
      explanation: 'ข ฉ ถ ผ เป็นอักษรสูงทั้งหมด'
    },
    {
      id: 'q24',
      text: 'ประโยคใดเป็นประโยคความซ้อน?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เขากินข้าว' },
        { id: 'b', text: 'ฉันชอบคนที่พูดความจริง' },
        { id: 'c', text: 'เธอสวยมาก' },
        { id: 'd', text: 'เราวิ่งเล่น' }
      ],
      correctAnswer: 'b',
      explanation: 'ประโยคความซ้อนคือประโยคที่มีประโยคย่อยรวมอยู่ด้วย'
    },
    {
      id: 'q25',
      text: 'คำว่า "อุทยาน" หมายถึงอะไร?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'บ้าน' },
        { id: 'b', text: 'โรงเรียน' },
        { id: 'c', text: 'สวน' },
        { id: 'd', text: 'ตลาด' }
      ],
      correctAnswer: 'c',
      explanation: '"อุทยาน" หมายถึง "สวน" หรือ "สวนสาธารณะ"'
    }
  ]
};

// Mock data สำหรับข้อสอบราชการ - ภาษาไทย
const civilServiceThaiMock: ExamData = {
  id: 'civil-thai',
  title: 'การสอบราชการ - ภาษาไทย',
  subject: 'thai-language',
  duration: 90,
  questions: [
    {
      id: 'q1',
      text: 'คำว่า "อักษร" หมายถึงข้อใด?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'ตัวหนังสือ' },
        { id: 'b', text: 'เสียงพูด' },
        { id: 'c', text: 'ภาษาเขียน' },
        { id: 'd', text: 'สัญลักษณ์' }
      ],
      correctAnswer: 'a',
      explanation: 'อักษร หมายถึง ตัวหนังสือหรือตัวพยัญชนะที่ใช้ในการเขียน'
    },
    {
      id: 'q2',
      text: 'ข้อใดเป็นคำราชาศัพท์?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'กิน' },
        { id: 'b', text: 'เสวย' },
        { id: 'c', text: 'ทาน' },
        { id: 'd', text: 'บริโภค' }
      ],
      correctAnswer: 'b',
      explanation: '"เสวย" เป็นคำราชาศัพท์ที่ใช้กับพระมหากษัตริย์และพระบรมวงศานุวงศ์'
    },
    {
      id: 'q3',
      text: 'ประโยค "เขาไปตลาดเมื่อเช้า" มีกรรมกี่ตัว?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: '0 ตัว' },
        { id: 'b', text: '1 ตัว' },
        { id: 'c', text: '2 ตัว' },
        { id: 'd', text: '3 ตัว' }
      ],
      correctAnswer: 'a',
      explanation: 'ประโยคนี้ไม่มีกรรม เพราะ "ไป" เป็นกริยาอกรรมก'
    },
    {
      id: 'q4',
      text: 'คำว่า "สันโดษ" มีความหมายว่าอย่างไร?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เศร้าโศก' },
        { id: 'b', text: 'พอใจในสิ่งที่มี' },
        { id: 'c', text: 'โกรธแค้น' },
        { id: 'd', text: 'ดีใจยินดี' }
      ],
      correctAnswer: 'b',
      explanation: '"สันโดษ" หมายถึง การพอใจในสิ่งที่ตนมี ไม่โลภมาก'
    },
    {
      id: 'q5',
      text: 'ข้อใดเป็นการใช้เครื่องหมายวรรคตอนที่ถูกต้อง?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เขาถาม "คุณไปไหน"' },
        { id: 'b', text: 'เขาถาม "คุณไปไหน?"' },
        { id: 'c', text: 'เขาถาม, "คุณไปไหน?"' },
        { id: 'd', text: 'เขาถามว่า "คุณไปไหน?"' }
      ],
      correctAnswer: 'd',
      explanation: 'การใช้คำว่า "ว่า" ก่อนเครื่องหมายคำพูดเป็นการใช้ที่ถูกต้อง'
    }
  ]
};

// Mock data สำหรับข้อสอบ TOEIC - การฟัง
const toeicListeningMock: ExamData = {
  id: 'toeic-listening',
  title: 'TOEIC - การฟัง',
  subject: 'listening',
  duration: 45,
  questions: [
    {
      id: 'q1',
      text: 'Listen to the conversation and answer the question: What time does the meeting start?',
      audioUrl: '/audio/toeic-1.mp3',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: '9:00 AM' },
        { id: 'b', text: '10:00 AM' },
        { id: 'c', text: '2:00 PM' },
        { id: 'd', text: '3:00 PM' }
      ],
      correctAnswer: 'b',
      explanation: 'The woman says: "The meeting has been moved to 10 o\'clock."'
    },
    {
      id: 'q2',
      text: 'Listen to the announcement: Where is flight CA102 departing for?',
      audioUrl: '/audio/toeic-2.mp3',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Bangkok' },
        { id: 'b', text: 'Singapore' },
        { id: 'c', text: 'Tokyo' },
        { id: 'd', text: 'Seoul' }
      ],
      correctAnswer: 'd',
      explanation: 'The announcement says: "Flight CA102 to Seoul is now boarding."'
    }
  ]
};

// Mock data สำหรับข้อสอบความรู้ทั่วไป
const generalKnowledgeMock: ExamData = {
  id: 'general-knowledge',
  title: 'การสอบราชการ - ความรู้ทั่วไป',
  subject: 'general-knowledge',
  duration: 90,
  questions: [
    {
      id: 'q1',
      text: 'เมืองหลวงของประเทศไทยคือข้อใด?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'เชียงใหม่' },
        { id: 'b', text: 'กรุงเทพมหานคร' },
        { id: 'c', text: 'ขอนแก่น' },
        { id: 'd', text: 'หาดใหญ่' }
      ],
      correctAnswer: 'b',
      explanation: 'กรุงเทพมหานครเป็นเมืองหลวงและศูนย์กลางการปกครองของประเทศไทย'
    },
    {
      id: 'q2',
      text: 'ประเทศไทยมีกี่จังหวัด?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: '76 จังหวัด' },
        { id: 'b', text: '77 จังหวัด' },
        { id: 'c', text: '78 จังหวัด' },
        { id: 'd', text: '79 จังหวัด' }
      ],
      correctAnswer: 'b',
      explanation: 'ประเทศไทยมี 77 จังหวัด โดยจังหวัดล่าสุดที่แยกออกมาคือจังหวัดบึงกาฬ'
    }
  ]
};

const Quiz: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const exam = searchParams.get('exam');
  const subject = searchParams.get('subject');
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // โหลดข้อสอบตามประเภทและหมวดหมู่
  useEffect(() => {
    if (!exam || !subject) {
      setIsLoading(false);
      return;
    }
    
    console.log('Loading exam:', exam, 'subject:', subject);
    
    // จำลองการโหลดข้อมูล
    setTimeout(() => {
      if (exam === 'civil-service' && subject === 'thai-language') {
        // ใช้ข้อสอบภาษาไทยชุดใหม่
        setExamData(thaiLanguageExam);
        setTimeLeft(thaiLanguageExam.duration * 60);
      } else if (exam === 'civil-service' && subject === 'general-knowledge') {
        setExamData(generalKnowledgeMock);
        setTimeLeft(generalKnowledgeMock.duration * 60);
      } else if (exam === 'toeic' && subject === 'listening') {
        setExamData(toeicListeningMock);
        setTimeLeft(toeicListeningMock.duration * 60);
      } else {
        // ข้อสอบอื่นๆ ใช้ข้อมูลภาษาไทยเป็นค่าเริ่มต้น
        setExamData(thaiLanguageExam);
        setTimeLeft(thaiLanguageExam.duration * 60);
      }
      setIsLoading(false);
    }, 1000);
  }, [exam, subject]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (examData && currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsFinished(true);
  };

  // คำนวณคะแนน
  const calculateScore = () => {
    if (!examData) return 0;
    
    let correct = 0;
    examData.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / examData.questions.length) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">กำลังโหลดข้อสอบ...</p>
          <p className="text-gray-500">
            {exam && subject ? (
              <>
                <span className="font-medium capitalize">{exam}</span> -{' '}
                <span className="capitalize">{subject}</span>
              </>
            ) : (
              'กรุณาเลือกข้อสอบ'
            )}
          </p>
        </div>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">ไม่พบข้อสอบ</h2>
          <p className="text-gray-600 mb-4">กรุณาเลือกข้อสอบที่ต้องการ</p>
          <button
            onClick={() => navigate('/quiz-selection')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
          >
            เลือกข้อสอบ
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return <ExamResult 
      score={calculateScore()} 
      totalQuestions={examData.questions.length}
      answers={answers}
      questions={examData.questions}
    />;
  }

  const currentQ = examData.questions[currentQuestion];

  return (
    <div className="bg-gray-50 min-h-screen">
      <ExamHeader 
        title={examData.title}
        currentQuestion={currentQuestion + 1}
        totalQuestions={examData.questions.length}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <QuestionCard 
          question={currentQ}
          selectedAnswer={answers[currentQ.id]}
          onAnswer={handleAnswer}
        />
        
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-md transition-colors ${
              currentQuestion === 0 
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            ย้อนกลับ
          </button>
          
          {currentQuestion < examData.questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              ถัดไป
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              ส่งคำตอบ
            </button>
          )}
        </div>
        
        <div className="mt-6 grid grid-cols-5 gap-2">
          {examData.questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              className={`h-10 rounded-md flex items-center justify-center transition-colors ${
                currentQuestion === index
                  ? 'bg-blue-600 text-white'
                  : answers[q.id]
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
