
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RegisterPopupProps {
  score: number;
  totalQuestions: number;
  onRegisterSuccess: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

interface FormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const RegisterPopup: React.FC<RegisterPopupProps> = ({
  score,
  totalQuestions,
  onRegisterSuccess,
  onCancel,
  isOpen
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormData>();
  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: loginErrors } } = useForm<{ email: string; password: string }>();

  const onSubmitRegister = async (data: FormData) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.name.split(' ')[0] || '',
            last_name: data.name.split(' ').slice(1).join(' ') || '',
            username: data.name,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "ลงทะเบียนสำเร็จ",
        description: "กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันบัญชี แต่คุณสามารถดูผลการสอบได้ทันที",
      });

      onRegisterSuccess();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถลงทะเบียนได้ โปรดลองอีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitLogin = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: "ยินดีต้อนรับกลับ!",
      });

      onRegisterSuccess();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถเข้าสู่ระบบได้",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              {showLoginForm ? 'เข้าสู่ระบบเพื่อดูผลการสอบ' : 'ลงทะเบียนเพื่อดูผลการสอบโดยละเอียด'}
            </h2>
            <p className="text-gray-600 text-center mt-2">
              คุณได้ <span className="font-bold text-orange-600">{score}/{totalQuestions}</span> คะแนน 
              {showLoginForm ? ' เข้าสู่ระบบเพื่อดูเฉลยและคำอธิบายโดยละเอียด' : ' ลงทะเบียนเพื่อดูเฉลยและคำอธิบายโดยละเอียด'}
            </p>
          </div>
          
          {!showLoginForm ? (
            <form onSubmit={handleSubmit(onSubmitRegister)} className="space-y-4">
              <div>
                <Input
                  placeholder="อีเมล"
                  type="email"
                  {...register('email', { 
                    required: 'กรุณากรอกอีเมล', 
                    pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                      message: 'รูปแบบอีเมลไม่ถูกต้อง' 
                    } 
                  })}
                  className={`rounded-lg border-2 transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <Input
                  placeholder="ชื่อ-นามสกุล"
                  {...register('name', { required: 'กรุณากรอกชื่อ-นามสกุล' })}
                  className={`rounded-lg border-2 transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="รหัสผ่าน (อย่างน้อย 8 ตัวอักษร)"
                  {...register('password', { 
                    required: 'กรุณากรอกรหัสผ่าน',
                    minLength: { value: 8, message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร' }
                  })}
                  className={`rounded-lg border-2 transition-colors ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'}`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  {...register('confirmPassword', { 
                    required: 'กรุณายืนยันรหัสผ่าน',
                    validate: value => value === watch('password') || 'รหัสผ่านไม่ตรงกัน'
                  })}
                  className={`rounded-lg border-2 transition-colors ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'}`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  {...register('acceptTerms', { required: 'กรุณายอมรับเงื่อนไขการใช้งาน' })}
                  className="mt-1"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-600 leading-relaxed">
                  ฉันยอมรับ <a href="#" className="text-orange-600 hover:underline font-medium">เงื่อนไขการใช้งาน</a> และ <a href="#" className="text-orange-600 hover:underline font-medium">นโยบายความเป็นส่วนตัว</a>
                </label>
              </div>
              {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>}
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    กำลังดำเนินการ...
                  </>
                ) : (
                  'ลงทะเบียนและดูผลการสอบ'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitLogin(onSubmitLogin)} className="space-y-4">
              <div>
                <Input
                  placeholder="อีเมล"
                  type="email"
                  {...registerLogin('email', { 
                    required: 'กรุณากรอกอีเมล', 
                    pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                      message: 'รูปแบบอีเมลไม่ถูกต้อง' 
                    } 
                  })}
                  className={`rounded-lg border-2 transition-colors ${loginErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'}`}
                />
                {loginErrors.email && <p className="text-red-500 text-sm mt-1">{loginErrors.email.message}</p>}
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="รหัสผ่าน"
                  {...registerLogin('password', { required: 'กรุณากรอกรหัสผ่าน' })}
                  className={`rounded-lg border-2 transition-colors ${loginErrors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'}`}
                />
                {loginErrors.password && <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  'เข้าสู่ระบบและดูผลการสอบ'
                )}
              </Button>
            </form>
          )}
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">หรือ</span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <button 
                type="button"
                onClick={() => {
                  setShowLoginForm(!showLoginForm);
                  reset();
                }}
                className="text-orange-600 text-sm hover:underline font-medium"
              >
                {showLoginForm ? 'ยังไม่มีบัญชี? สมัครสมาชิก' : 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={onCancel}
              className="text-gray-500 text-sm hover:underline transition-colors"
            >
              กลับไปหน้าหลัก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
