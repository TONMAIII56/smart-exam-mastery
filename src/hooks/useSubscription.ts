
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
      
      const { data, error } = await supabase.rpc('check_user_subscription', {
        user_id: user.id
      });
      
      if (error) throw error;
      return data[0] as SubscriptionInfo;
    },
    enabled: !!user?.id,
  });

  const upgradeToPremiuMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: user.id,
          plan: 'premium',
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription', user?.id] });
      toast({
        title: 'อัพเกรดสำเร็จ!',
        description: 'คุณได้อัพเกรดเป็นสมาชิก Premium แล้ว',
      });
    },
    onError: (error) => {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถอัพเกรดได้ กรุณาลองใหม่อีกครั้ง',
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

  return {
    subscription,
    isLoading,
    isPremium: subscription?.is_premium || false,
    upgradeToPremiuMutation,
    checkExamQuota: checkExamQuotaMutation.mutateAsync,
    updateUsage: updateUsageMutation.mutateAsync,
  };
};
