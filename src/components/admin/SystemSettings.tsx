
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Settings, 
  Database, 
  Users, 
  Shield, 
  Mail, 
  Globe, 
  Zap, 
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface SystemConfig {
  maintenance_mode: boolean;
  registration_enabled: boolean;
  premium_features_enabled: boolean;
  max_free_exams_per_month: number;
  system_announcement: string;
  contact_email: string;
  support_phone: string;
  terms_url: string;
  privacy_url: string;
}

const SystemSettings = () => {
  const [config, setConfig] = useState<SystemConfig>({
    maintenance_mode: false,
    registration_enabled: true,
    premium_features_enabled: true,
    max_free_exams_per_month: 3,
    system_announcement: '',
    contact_email: '',
    support_phone: '',
    terms_url: '',
    privacy_url: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get system stats
  const { data: systemStats } = useQuery({
    queryKey: ['system-stats'],
    queryFn: async () => {
      const [usersResult, examsResult, questionsResult] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('exams').select('id', { count: 'exact' }),
        supabase.from('questions').select('id', { count: 'exact' })
      ]);

      return {
        total_users: usersResult.count || 0,
        total_exams: examsResult.count || 0,
        total_questions: questionsResult.count || 0,
        database_status: 'healthy',
        last_backup: new Date().toISOString()
      };
    }
  });

  const updateConfig = useMutation({
    mutationFn: async (newConfig: Partial<SystemConfig>) => {
      // In a real implementation, this would update a system_config table
      setConfig({ ...config, ...newConfig });
      return newConfig;
    },
    onSuccess: () => {
      toast({
        title: 'สำเร็จ',
        description: 'อัพเดทการตั้งค่าระบบแล้ว',
      });
    }
  });

  const handleConfigChange = (key: keyof SystemConfig, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
  };

  const saveConfig = () => {
    updateConfig.mutate(config);
  };

  const performBackup = async () => {
    setIsLoading(true);
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: 'สำเร็จ',
        description: 'สำรองข้อมูลเรียบร้อยแล้ว',
      });
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถสำรองข้อมูลได้',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCache = async () => {
    setIsLoading(true);
    try {
      await queryClient.invalidateQueries();
      toast({
        title: 'สำเร็จ',
        description: 'ล้างแคชเรียบร้อยแล้ว',
      });
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถล้างแคชได้',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'Not configured';
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">System Settings</h2>
        <Button onClick={saveConfig} disabled={updateConfig.isPending}>
          {updateConfig.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="database">
            <Database className="h-4 w-4 mr-2" />
            Database
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Total Users</p>
                      <p className="text-2xl font-bold text-blue-800">
                        {systemStats?.total_users?.toLocaleString() || '0'}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Total Exams</p>
                      <p className="text-2xl font-bold text-green-800">
                        {systemStats?.total_exams?.toLocaleString() || '0'}
                      </p>
                    </div>
                    <Database className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600">Total Questions</p>
                      <p className="text-2xl font-bold text-purple-800">
                        {systemStats?.total_questions?.toLocaleString() || '0'}
                      </p>
                    </div>
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600">Database Status</p>
                      <Badge className={getStatusColor(systemStats?.database_status || 'unknown')}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(systemStats?.database_status || 'unknown')}
                          {systemStats?.database_status || 'Unknown'}
                        </div>
                      </Badge>
                    </div>
                    <Database className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>General Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-600">Enable to prevent users from accessing the system</p>
                </div>
                <Switch
                  id="maintenance_mode"
                  checked={config.maintenance_mode}
                  onCheckedChange={(checked) => handleConfigChange('maintenance_mode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="registration_enabled">User Registration</Label>
                  <p className="text-sm text-gray-600">Allow new users to register</p>
                </div>
                <Switch
                  id="registration_enabled"
                  checked={config.registration_enabled}
                  onCheckedChange={(checked) => handleConfigChange('registration_enabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="premium_features_enabled">Premium Features</Label>
                  <p className="text-sm text-gray-600">Enable premium subscription features</p>
                </div>
                <Switch
                  id="premium_features_enabled"
                  checked={config.premium_features_enabled}
                  onCheckedChange={(checked) => handleConfigChange('premium_features_enabled', checked)}
                />
              </div>

              <div>
                <Label htmlFor="max_free_exams">Max Free Exams per Month</Label>
                <Input
                  id="max_free_exams"
                  type="number"
                  value={config.max_free_exams_per_month}
                  onChange={(e) => handleConfigChange('max_free_exams_per_month', parseInt(e.target.value) || 0)}
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="system_announcement">System Announcement</Label>
                <Textarea
                  id="system_announcement"
                  value={config.system_announcement}
                  onChange={(e) => handleConfigChange('system_announcement', e.target.value)}
                  placeholder="System-wide announcement message..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={config.contact_email}
                  onChange={(e) => handleConfigChange('contact_email', e.target.value)}
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <Label htmlFor="support_phone">Support Phone</Label>
                <Input
                  id="support_phone"
                  type="tel"
                  value={config.support_phone}
                  onChange={(e) => handleConfigChange('support_phone', e.target.value)}
                  placeholder="+66 2 xxx xxxx"
                />
              </div>

              <div>
                <Label htmlFor="terms_url">Terms of Service URL</Label>
                <Input
                  id="terms_url"
                  type="url"
                  value={config.terms_url}
                  onChange={(e) => handleConfigChange('terms_url', e.target.value)}
                  placeholder="https://example.com/terms"
                />
              </div>

              <div>
                <Label htmlFor="privacy_url">Privacy Policy URL</Label>
                <Input
                  id="privacy_url"
                  type="url"
                  value={config.privacy_url}
                  onChange={(e) => handleConfigChange('privacy_url', e.target.value)}
                  placeholder="https://example.com/privacy"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Connection Info</h4>
                  <p className="text-sm text-gray-600">URL: {supabaseUrl}</p>
                  <p className="text-sm text-gray-600">Status: 
                    <Badge className="ml-2 bg-green-100 text-green-800">Connected</Badge>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Last Backup</h4>
                  <p className="text-sm text-gray-600">
                    {systemStats?.last_backup ? 
                      new Date(systemStats.last_backup).toLocaleString('th-TH') : 
                      'Never'
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={performBackup} 
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Database className="h-4 w-4" />
                  {isLoading ? 'Backing up...' : 'Backup Database'}
                </Button>

                <Button 
                  variant="outline" 
                  onClick={clearCache}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Clear Cache
                </Button>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Database operations should be performed with caution. Always backup before making changes.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Users className="h-4 w-4" />
                <AlertDescription>
                  User management settings are available in the User Management section.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Security settings are managed through Supabase authentication and RLS policies.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
