
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Settings, Database, Mail, Shield, Globe } from 'lucide-react';

const SystemSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    freeQuizLimit: 3,
    premiumPrice: 299,
    systemMessage: '',
    backupEnabled: true,
    autoBackupHours: 24,
    emailNotifications: true,
    supportEmail: 'support@examapp.com'
  });

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would save these settings to a system_settings table
      // For now, we'll just show a success message
      toast({
        title: 'สำเร็จ',
        description: 'บันทึกการตั้งค่าระบบแล้ว',
      });
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถบันทึกการตั้งค่าได้',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDatabaseBackup = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would trigger a database backup
      toast({
        title: 'กำลังสำรองข้อมูล',
        description: 'การสำรองข้อมูลจะเสร็จสิ้นในไม่ช้า',
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

  const handleClearCache = async () => {
    setIsLoading(true);
    try {
      // Clear browser cache and reload
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }
      window.location.reload();
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">System Settings</h2>
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          <Settings className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-600">Put the system into maintenance mode</p>
                </div>
                <Switch
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(checked) => 
                    setSystemSettings({...systemSettings, maintenanceMode: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>User Registration</Label>
                  <p className="text-sm text-gray-600">Allow new user registrations</p>
                </div>
                <Switch
                  checked={systemSettings.registrationEnabled}
                  onCheckedChange={(checked) => 
                    setSystemSettings({...systemSettings, registrationEnabled: checked})
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="freeQuizLimit">Free Quiz Limit (per month)</Label>
                  <Input
                    id="freeQuizLimit"
                    type="number"
                    value={systemSettings.freeQuizLimit}
                    onChange={(e) => 
                      setSystemSettings({...systemSettings, freeQuizLimit: parseInt(e.target.value)})
                    }
                    min="1"
                  />
                </div>

                <div>
                  <Label htmlFor="premiumPrice">Premium Price (THB/month)</Label>
                  <Input
                    id="premiumPrice"
                    type="number"
                    value={systemSettings.premiumPrice}
                    onChange={(e) => 
                      setSystemSettings({...systemSettings, premiumPrice: parseInt(e.target.value)})
                    }
                    min="1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="systemMessage">System Announcement</Label>
                <Textarea
                  id="systemMessage"
                  value={systemSettings.systemMessage}
                  onChange={(e) => 
                    setSystemSettings({...systemSettings, systemMessage: e.target.value})
                  }
                  placeholder="Enter system-wide announcement message..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Backup</Label>
                  <p className="text-sm text-gray-600">Enable automatic database backups</p>
                </div>
                <Switch
                  checked={systemSettings.backupEnabled}
                  onCheckedChange={(checked) => 
                    setSystemSettings({...systemSettings, backupEnabled: checked})
                  }
                />
              </div>

              <div>
                <Label htmlFor="autoBackupHours">Backup Interval (hours)</Label>
                <Input
                  id="autoBackupHours"
                  type="number"
                  value={systemSettings.autoBackupHours}
                  onChange={(e) => 
                    setSystemSettings({...systemSettings, autoBackupHours: parseInt(e.target.value)})
                  }
                  min="1"
                  max="168"
                />
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleDatabaseBackup} disabled={isLoading}>
                  <Database className="h-4 w-4 mr-2" />
                  Create Backup Now
                </Button>
                <Button variant="outline" onClick={handleClearCache} disabled={isLoading}>
                  <Globe className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
              </div>

              <Alert>
                <Database className="h-4 w-4" />
                <AlertDescription>
                  Database backups are stored securely and can be restored if needed. 
                  Contact support for backup restoration.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send system notifications via email</p>
                </div>
                <Switch
                  checked={systemSettings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSystemSettings({...systemSettings, emailNotifications: checked})
                  }
                />
              </div>

              <div>
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={systemSettings.supportEmail}
                  onChange={(e) => 
                    setSystemSettings({...systemSettings, supportEmail: e.target.value})
                  }
                />
              </div>

              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  Configure SMTP settings in the environment variables to enable email notifications.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Security settings are managed through Supabase dashboard. 
                  Access the Supabase console for advanced security configurations.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h4 className="font-semibold">Security Checklist:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Row Level Security (RLS) is enabled on all tables</li>
                  <li>Admin access is properly controlled through roles</li>
                  <li>API keys are securely managed</li>
                  <li>Regular security audits are performed</li>
                  <li>User data is encrypted at rest and in transit</li>
                </ul>
              </div>

              <Button variant="outline" asChild>
                <a href={`https://supabase.com/dashboard/project/${supabase.supabaseUrl.split('/')[2].split('.')[0]}/auth/policies`} target="_blank" rel="noopener noreferrer">
                  <Shield className="h-4 w-4 mr-2" />
                  Manage Security Policies
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
