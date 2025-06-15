
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CreatePaidSubscriptionParams {
  planId: 'premium_monthly' | 'premium_yearly';
  paymentMethodId?: string;
}

interface PaidSubscriptionResponse {
  subscription_id: string;
  client_secret?: string;
  status: 'success' | 'requires_action' | 'error';
  message?: string;
  error?: string;
}

export const usePaidSubscription = () => {
  const { toast } = useToast();

  const createPaidSubscriptionMutation = useMutation({
    mutationFn: async (params: CreatePaidSubscriptionParams): Promise<PaidSubscriptionResponse> => {
      const { data, error } = await supabase.functions.invoke('create-paid-subscription', {
        body: params
      });
      
      if (error) throw error;
      return data as PaidSubscriptionResponse;
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        toast({
          title: 'สำเร็จ!',
          description: data.message || 'สมัครสมาชิกสำเร็จ',
        });
      } else if (data.status === 'requires_action') {
        toast({
          title: 'ต้องการการยืนยัน',
          description: 'กรุณายืนยันการชำระเงิน',
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: error.message || 'ไม่สามารถสมัครสมาชิกได้',
        variant: 'destructive',
      });
    },
  });

  return {
    createPaidSubscription: createPaidSubscriptionMutation.mutate,
    isPending: createPaidSubscriptionMutation.isPending,
    isError: createPaidSubscriptionMutation.isError,
    error: createPaidSubscriptionMutation.error,
    data: createPaidSubscriptionMutation.data,
  };
};
