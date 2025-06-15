
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export interface SubscriptionInfo {
  plan: 'free' | 'premium';
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  is_premium: boolean;
  expires_at: string | null;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async (): Promise<SubscriptionInfo> => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) throw error;
      return data as SubscriptionInfo;
    },
    enabled: !!user?.id,
  });

  const createCheckoutMutation = useMutation({
    mutationFn: async (plan: 'premium_monthly' | 'premium_yearly') => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan }
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    },
    onError: (error) => {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถสร้างลิงค์ชำระเงินได้ กรุณาลองใหม่อีกครั้ง',
        variant: 'destructive',
      });
    },
  });

  const openCustomerPortalMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Open customer portal in a new tab
      window.open(data.url, '_blank');
    },
    onError: (error) => {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเปิดหน้าจัดการสมาชิกได้ กรุณาลองใหม่อีกครั้ง',
        variant: 'destructive',
      });
    },
  });

  const checkExamQuotaMutation = useMutation({
    mutationFn: async ({ examType, subject }: { examType: string; subject: string }) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase.rpc('check_exam_quota', {
        p_user_id: user.id,
        p_exam_type: examType,
        p_subject: subject
      });
      
      if (error) throw error;
      return data;
    },
  });

  const updateUsageMutation = useMutation({
    mutationFn: async ({ examType, subject }: { examType: string; subject: string }) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { error } = await supabase.rpc('update_usage_tracking', {
        p_user_id: user.id,
        p_exam_type: examType,
        p_subject: subject
      });
      
      if (error) throw error;
    },
  });

  const refreshSubscription = () => {
    queryClient.invalidateQueries({ queryKey: ['subscription', user?.id] });
  };

  return {
    subscription,
    isLoading,
    isPremium: subscription?.is_premium || false,
    createCheckout: createCheckoutMutation.mutate,
    openCustomerPortal: openCustomerPortalMutation.mutate,
    isCreatingCheckout: createCheckoutMutation.isPending,
    isOpeningPortal: openCustomerPortalMutation.isPending,
    checkExamQuota: checkExamQuotaMutation.mutateAsync,
    updateUsage: updateUsageMutation.mutateAsync,
    refreshSubscription,
  };
};
