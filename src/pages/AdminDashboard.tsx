
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Shield, FileText, BarChart3, Users, Upload, Settings } from 'lucide-react';
import ExamManagement from '@/components/admin/ExamManagement';
import QuestionBank from '@/components/admin/QuestionBank';
import BulkUpload from '@/components/admin/BulkUpload';
import Analytics from '@/components/admin/Analytics';
import UserManagement from '@/components/admin/UserManagement';
import SystemSettings from '@/components/admin/SystemSettings';

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('exams');

  // Check if user has admin permissions
  if (!user || !profile?.admin_role) {
    return <Navigate to="/" replace />;
  }

  const isAdmin = ['super_admin', 'content_manager', 'moderator'].includes(profile.admin_role);
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'content_manager': return 'bg-blue-100 text-blue-800';
      case 'moderator': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'exams', label: 'Exam Management', icon: FileText, component: ExamManagement },
    { id: 'questions', label: 'Question Bank', icon: Shield, component: QuestionBank },
    { id: 'upload', label: 'Bulk Upload', icon: Upload, component: BulkUpload },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: Analytics },
    { id: 'users', label: 'User Management', icon: Users, component: UserManagement, adminOnly: true },
    { id: 'settings', label: 'System Settings', icon: Settings, component: SystemSettings, superAdminOnly: true },
  ];

  const filteredTabs = tabs.filter(tab => {
    if (tab.superAdminOnly && profile.admin_role !== 'super_admin') return false;
    if (tab.adminOnly && !['super_admin', 'content_manager'].includes(profile.admin_role)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Exam Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getRoleColor(profile.admin_role)}>
                {profile.admin_role?.replace('_', ' ').toUpperCase()}
              </Badge>
              <div className="text-right">
                <p className="font-medium">{profile.first_name} {profile.last_name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            {filteredTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {filteredTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <tab.component />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
