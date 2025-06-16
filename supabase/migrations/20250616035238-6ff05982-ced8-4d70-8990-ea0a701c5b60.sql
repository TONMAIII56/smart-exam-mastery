
-- Create exam_questions table for storing quiz questions
CREATE TABLE public.exam_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  choices JSONB NOT NULL,
  answer TEXT NOT NULL,
  explanation TEXT,
  category TEXT NOT NULL,
  difficulty_level difficulty_level DEFAULT 'medium',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true
);

-- Add Row Level Security
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;

-- Create policies for exam_questions
CREATE POLICY "Public can view active questions" 
  ON public.exam_questions 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert questions" 
  ON public.exam_questions 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own questions" 
  ON public.exam_questions 
  FOR UPDATE 
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own questions" 
  ON public.exam_questions 
  FOR DELETE 
  TO authenticated
  USING (created_by = auth.uid());

-- Insert sample questions from the Thai language exam
INSERT INTO public.exam_questions (question, choices, answer, explanation, category, difficulty_level, tags) VALUES
('คำในข้อใดเป็นคำควบกล้ำไม่แท้?', '["กลอง", "ขรุขระ", "สร้าง", "กล้วย"]', 'สร้าง', 'คำว่า "สร้าง" เป็นคำควบกล้ำไม่แท้ เพราะออกเสียงว่า "ส-ร้าง" ไม่ใช่ "สร้าง"', 'thai-language', 'easy', ARRAY['ภาษาไทย', 'ไวยากรณ์']),
('ประโยคใดมีคำบุพบท?', '["เขากินข้าว", "ฉันไปโรงเรียน", "เธอสวยมาก", "เราวิ่งเล่น"]', 'ฉันไปโรงเรียน', 'คำว่า "ไป" ในประโยค "ฉันไปโรงเรียน" เป็นคำบุพบทที่แสดงทิศทาง', 'thai-language', 'easy', ARRAY['ภาษาไทย', 'ไวยากรณ์']),
('คำว่า "บรรทม" หมายถึงอะไร?', '["เดิน", "นอน", "กิน", "พูด"]', 'นอน', '"บรรทม" เป็นคำสุภาพที่หมายถึง "นอน"', 'thai-language', 'easy', ARRAY['ภาษาไทย', 'คำศัพท์']),
('ข้อใดคือคำราชาศัพท์ของคำว่า "กิน"?', '["เสวย", "ฉัน", "รับประทาน", "บริโภค"]', 'เสวย', '"เสวย" เป็นคำราชาศัพท์ที่ใช้กับพระมหากษัตริย์และพระบรมวงศานุวงศ์', 'thai-language', 'easy', ARRAY['ภาษาไทย', 'คำศัพท์']),
('วรรณคดีเรื่องใดกล่าวถึงทศกัณฐ์?', '["อิเหนา", "ขุนช้างขุนแผน", "รามเกียรติ์", "พระอภัยมณี"]', 'รามเกียรติ์', 'ทศกัณฐ์หรือทศพักตร์ คือพระยักษ์ในเรื่องรามเกียรติ์', 'thai-language', 'easy', ARRAY['ภาษาไทย', 'วรรณคดี']);

-- Insert sample general knowledge questions
INSERT INTO public.exam_questions (question, choices, answer, explanation, category, difficulty_level, tags) VALUES
('ข้อใดคือหลักการสำคัญของการปกครองระบอบประชาธิปไตย?', '["อำนาจอธิปไตยเป็นของปวงชน", "ผู้นำมีอำนาจสูงสุด", "การตัดสินใจโดยชนชั้นสูง", "การสืบทอดอำนาจทางสายเลือด"]', 'อำนาจอธิปไตยเป็นของปวงชน', 'ประชาธิปไตยหมายถึงการปกครองของปวงชน โดยปวงชน เพื่อปวงชน', 'general-knowledge', 'easy', ARRAY['ความรู้รอบตัว', 'การเมือง']),
('รัฐธรรมนูญแห่งราชอาณาจักรไทยฉบับปัจจุบันคือฉบับปี พ.ศ. ใด?', '["2540", "2550", "2560", "2562"]', '2560', 'รัฐธรรมนูญแห่งราชอาณาจักรไทย พุทธศักราช 2560 เป็นฉบับปัจจุบัน', 'general-knowledge', 'easy', ARRAY['ความรู้รอบตัว', 'กฎหมาย']),
('องค์กรใดมีหน้าที่ในการพิจารณาคดีความที่เกี่ยวข้องกับการเลือกตั้ง?', '["ศาลรัฐธรรมนูญ", "ศาลยุติธรรม", "ศาลปกครอง", "คณะกรรมการการเลือกตั้ง"]', 'ศาลรัฐธรรมนูญ', 'ศาลรัฐธรรมนูญมีอำนาจในการพิจารณาคดีเกี่ยวกับการเลือกตั้ง', 'general-knowledge', 'easy', ARRAY['ความรู้รอบตัว', 'การเมือง']);

-- Insert sample English questions
INSERT INTO public.exam_questions (question, choices, answer, explanation, category, difficulty_level, tags) VALUES
('What is the capital of France?', '["London", "Berlin", "Paris", "Rome"]', 'Paris', 'Paris is the capital city of France.', 'english', 'easy', ARRAY['ภาษาอังกฤษ', 'ความรู้ทั่วไป']),
('Which of the following is a verb?', '["Happy", "Run", "Table", "Blue"]', 'Run', '"Run" is a verb that shows action.', 'english', 'easy', ARRAY['ภาษาอังกฤษ', 'ไวยากรณ์']),
('Complete the sentence: I ___ a student.', '["am", "is", "are", "be"]', 'am', 'Use "am" with "I" in present tense.', 'english', 'easy', ARRAY['ภาษาอังกฤษ', 'ไวยากรณ์']);

-- Insert sample Math questions
INSERT INTO public.exam_questions (question, choices, answer, explanation, category, difficulty_level, tags) VALUES
('2 + 2 เท่ากับเท่าไร?', '["3", "4", "5", "6"]', '4', '2 + 2 = 4', 'mathematics', 'easy', ARRAY['คณิตศาสตร์', 'เลขคณิต']),
('10 - 3 เท่ากับเท่าไร?', '["6", "7", "8", "9"]', '7', '10 - 3 = 7', 'mathematics', 'easy', ARRAY['คณิตศาสตร์', 'เลขคณิต']),
('5 * 6 เท่ากับเท่าไร?', '["25", "30", "35", "40"]', '30', '5 × 6 = 30', 'mathematics', 'easy', ARRAY['คณิตศาสตร์', 'เลขคณิต']);
