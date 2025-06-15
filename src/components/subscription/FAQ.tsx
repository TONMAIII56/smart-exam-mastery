
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "สามารถยกเลิกสมาชิกเมื่อไหร่ก็ได้หรือไม่?",
      answer: "ใช่ คุณสามารถยกเลิกได้ทุกเมื่อ โดยจะสามารถใช้งานได้จนถึงวันหมดอายุ"
    },
    {
      question: "มีบริการทดลองใช้หรือไม่?",
      answer: "มีบริการทดลองใช้ฟรี 7 วัน สำหรับสมาชิกใหม่"
    },
    {
      question: "ชำระเงินด้วยวิธีใดบ้าง?",
      answer: "บัตรเครดิต/เดบิต, Internet Banking, PromptPay, TrueMoney Wallet"
    },
    {
      question: "สามารถเปลี่ยนแพ็กเกจได้หรือไม่?",
      answer: "ใช่ เปลี่ยนได้ตลอดเวลา โดยระบบจะคำนวณส่วนต่างให้อัตโนมัติ"
    },
    {
      question: "ชำระเงินแล้วเริ่มใช้งานได้เมื่อไหร่?",
      answer: "ทันทีหลังชำระเงินสำเร็จ ระบบจะเปิดสิทธิ์ Premium ให้โดยอัตโนมัติ"
    },
    {
      question: "มีคืนเงินหรือไม่?",
      answer: "มีนโยบายคืนเงินภายใน 14 วัน หากไม่พอใจในบริการ"
    },
    {
      question: "เข้าถึงข้อสอบย้อนหลังได้อย่างไร?",
      answer: "ในเมนู \"คลังข้อสอบ\" จะมีตัวกรองให้เลือกปีที่ต้องการ"
    },
    {
      question: "ดูรายงานวิเคราะห์จุดอ่อนที่ไหน?",
      answer: "ในแดชบอร์ดส่วนตัว > แท็บ \"การวิเคราะห์\""
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">คำถามที่พบบ่อย</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
