
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search, Edit, Shield, Crown, User, Calendar, Mail } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users', searchTerm, roleFilter, subscriptionFilter],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,username.ilike.%${searchTerm}%`);
      }

      if (roleFilter !== 'all') {
        query = query.eq('role', roleFilter);
      }

      if (subscriptionFilter !== 'all') {
        query = query.eq('subscription_plan', subscriptionFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const { data: userStats } = useQuery({
    queryKey: ['user-stats', selectedUser?.id],
    queryFn: async () => {
      if (!selectedUser?.id) return null;

      const { data: examResults, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('user_id', selectedUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return examResults;
    },
    enabled: !!selectedUser?.id
  });

  const updateUserRole = useMutation({
    mutationFn: async ({ userId, role, adminRole }: { userId: string; role: string; adminRole?: string }) => {
      const updateData: any = { role };
      if (adminRole !== undefined) {
        updateData.admin_role = adminRole || null;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'สำเร็จ',
        description: 'อัพเดทสิทธิ์ผู้ใช้แล้ว',
      });
    },
    onError: () => {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถอัพเดทสิทธิ์ได้',
        variant: 'destructive',
      });
    }
  });

  const updateSubscription = useMutation({
    mutationFn: async ({ userId, plan, status }: { userId: string; plan: string; status: string }) => {
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_plan: plan,
          subscription_status: status,
          subscription_end_date: plan === 'premium' 
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
            : null
        })
        .eq('id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'สำเร็จ',
        description: 'อัพเดทแผนสมาชิกแล้ว',
      });
    }
  });

  const getRoleColor = (role: string, adminRole?: string) => {
    if (adminRole === 'super_admin') return 'bg-red-100 text-red-800';
    if (adminRole === 'content_manager') return 'bg-blue-100 text-blue-800';
    if (adminRole === 'moderator') return 'bg-green-100 text-green-800';
    if (role === 'admin') return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getSubscriptionColor = (plan: string, status: string) => {
    if (plan === 'premium' && status === 'active') return 'bg-yellow-100 text-yellow-800';
    if (status === 'inactive') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getRoleIcon = (role: string, adminRole?: string) => {
    if (adminRole === 'super_admin') return <Crown className="h-4 w-4" />;
    if (adminRole) return <Shield className="h-4 w-4" />;
    return <User className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">User Management</h2>
        <div className="text-sm text-gray-600">
          Total Users: {users?.length || 0}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Subscription" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users ({users?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">กำลังโหลด...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          {getRoleIcon(user.role, user.admin_role)}
                        </div>
                        <div>
                          <div className="font-medium">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.username || 'No username'}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role, user.admin_role)}>
                        {user.admin_role || user.role || 'user'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSubscriptionColor(user.subscription_plan, user.subscription_status)}>
                        {user.subscription_plan || 'free'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(user.created_at).toLocaleDateString('th-TH')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {user.updated_at ? new Date(user.updated_at).toLocaleDateString('th-TH') : '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => { setSelectedUser(user); setShowUserDetail(true); }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Select
                          value={user.role || 'user'}
                          onValueChange={(role) => {
                            const adminRole = role === 'super_admin' ? 'super_admin' : 
                                            role === 'content_manager' ? 'content_manager' :
                                            role === 'moderator' ? 'moderator' : undefined;
                            updateUserRole.mutate({ 
                              userId: user.id, 
                              role: role === 'super_admin' || role === 'content_manager' || role === 'moderator' ? 'admin' : role,
                              adminRole 
                            });
                          }}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                            <SelectItem value="content_manager">Content Manager</SelectItem>
                            <SelectItem value="super_admin">Super Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={user.subscription_plan || 'free'}
                          onValueChange={(plan) => updateSubscription.mutate({ 
                            userId: user.id, 
                            plan,
                            status: 'active'
                          })}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {showUserDetail && selectedUser && (
        <Dialog open={showUserDetail} onOpenChange={setShowUserDetail}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                User Details: {selectedUser.first_name} {selectedUser.last_name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div><strong>Username:</strong> {selectedUser.username || 'N/A'}</div>
                    <div><strong>Email:</strong> {selectedUser.id}</div>
                    <div><strong>Age:</strong> {selectedUser.age || 'N/A'}</div>
                    <div><strong>Gender:</strong> {selectedUser.gender || 'N/A'}</div>
                    <div><strong>Education:</strong> {selectedUser.education_level || 'N/A'}</div>
                    <div><strong>Target Exam:</strong> {selectedUser.target_exam || 'N/A'}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Account Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div><strong>Role:</strong> 
                      <Badge className={`ml-2 ${getRoleColor(selectedUser.role, selectedUser.admin_role)}`}>
                        {selectedUser.admin_role || selectedUser.role || 'user'}
                      </Badge>
                    </div>
                    <div><strong>Subscription:</strong> 
                      <Badge className={`ml-2 ${getSubscriptionColor(selectedUser.subscription_plan, selectedUser.subscription_status)}`}>
                        {selectedUser.subscription_plan || 'free'}
                      </Badge>
                    </div>
                    <div><strong>Account Status:</strong> 
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        {selectedUser.account_status || 'active'}
                      </Badge>
                    </div>
                    <div><strong>Joined:</strong> {new Date(selectedUser.created_at).toLocaleDateString('th-TH')}</div>
                    <div><strong>Last Updated:</strong> {selectedUser.updated_at ? new Date(selectedUser.updated_at).toLocaleDateString('th-TH') : 'N/A'}</div>
                  </CardContent>
                </Card>
              </div>

              {userStats && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Exam History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userStats.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Exam</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Percentage</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userStats.slice(0, 10).map((result) => (
                            <TableRow key={result.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{result.exam_type}</div>
                                  <div className="text-sm text-gray-500">{result.subject}</div>
                                </div>
                              </TableCell>
                              <TableCell>{result.score}/{result.total_questions}</TableCell>
                              <TableCell>
                                <Badge className={result.percentage >= 80 ? 'bg-green-100 text-green-800' : 
                                               result.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                                               'bg-red-100 text-red-800'}>
                                  {result.percentage}%
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {new Date(result.created_at).toLocaleDateString('th-TH')}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No exam history found
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserManagement;
