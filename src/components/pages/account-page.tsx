import { useState, useEffect } from 'react';
import { Layout } from '../ui-layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  CreditCard,
  Activity,
  Settings,
  Upload,
  Save,
  Edit,
  Lock
} from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export function AccountPage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: 'System Administrator with 5+ years of experience managing garage door service operations.'
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been updated successfully.',
      });
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || '';
    const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || '';
    return `${firstInitial}${lastInitial}` || user.email?.charAt(0)?.toUpperCase() || 'U';
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Loading Account...</h2>
            <p className="text-muted-foreground">Please wait while we load your account information.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Account</h2>
            <p className="text-muted-foreground">
              Manage your account settings and view your activity
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Profile Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl bg-[#f0f0f0] text-[#333333]">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <Shield className="mr-1 h-3 w-3" />
                        {user.role}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        Joined {user.joinDate ? format(new Date(user.joinDate), 'MMMM yyyy') : 'Recently'}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditMode(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Login</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Today</div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(), 'h:mm a')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                  <Shield className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Active</div>
                  <p className="text-xs text-muted-foreground">
                    All systems operational
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xl bg-[#f0f0f0] text-[#333333]">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Button>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed from this page
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditMode}
                    className="h-24 resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  {isEditMode ? (
                    <>
                      <Button onClick={handleSaveProfile} disabled={isLoading}>
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditMode(false)}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditMode(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-muted-foreground">
                        Last changed 3 months ago
                      </p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Active Sessions</h4>
                      <p className="text-sm text-muted-foreground">
                        Manage your active login sessions
                      </p>
                    </div>
                    <Button variant="outline">View Sessions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Login</TableCell>
                      <TableCell>{format(new Date(), 'MMM d, yyyy h:mm a')}</TableCell>
                      <TableCell>Web browser login</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Profile updated</TableCell>
                      <TableCell>Dec 8, 2024 2:30 PM</TableCell>
                      <TableCell>Updated phone number</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Password changed</TableCell>
                      <TableCell>Nov 15, 2024 9:15 AM</TableCell>
                      <TableCell>Password security update</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Login</TableCell>
                      <TableCell>Nov 14, 2024 8:45 AM</TableCell>
                      <TableCell>Web browser login</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}