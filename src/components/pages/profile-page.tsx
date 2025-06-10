import { useState, useEffect } from 'react';
import { Layout } from '../ui-layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Upload,
  Save,
  Edit,
  Briefcase,
  Globe,
  Clock
} from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: '',
    jobTitle: '',
    department: '',
    timezone: '',
    dateFormat: '',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: '123 Business Ave',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        bio: 'Experienced system administrator specializing in garage door service management systems. Passionate about optimizing workflows and improving customer service delivery.',
        jobTitle: 'System Administrator',
        department: 'Operations',
        timezone: 'America/Los_Angeles',
        dateFormat: 'MM/dd/yyyy',
        notifications: {
          email: true,
          push: true,
          sms: false
        }
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('notifications.')) {
      const notificationField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
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
        description: 'Your profile has been updated successfully.',
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
            <h2 className="text-2xl font-bold mb-2">Loading Profile...</h2>
            <p className="text-muted-foreground">Please wait while we load your profile information.</p>
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
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            <p className="text-muted-foreground">
              Manage your personal information and preferences
            </p>
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
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl bg-[#f0f0f0] text-[#333333]">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                {isEditMode && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-xl font-semibold">
                    {formData.firstName} {formData.lastName}
                  </h3>
                  <p className="text-muted-foreground">{formData.jobTitle}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">
                    <Briefcase className="mr-1 h-3 w-3" />
                    {formData.department}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    Joined {user.joinDate ? format(new Date(user.joinDate), 'MMMM yyyy') : 'Recently'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  Contact support to change your email address
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

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditMode}
                  className="h-20 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Work Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => handleInputChange('department', value)}
                  disabled={!isEditMode}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Address</h4>
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditMode}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={formData.timezone} 
                  onValueChange={(value) => handleInputChange('timezone', value)}
                  disabled={!isEditMode}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select 
                  value={formData.dateFormat} 
                  onValueChange={(value) => handleInputChange('dateFormat', value)}
                  disabled={!isEditMode}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={formData.notifications.email}
                  onCheckedChange={(checked) => handleInputChange('notifications.email', checked)}
                  disabled={!isEditMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive browser notifications
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={formData.notifications.push}
                  onCheckedChange={(checked) => handleInputChange('notifications.push', checked)}
                  disabled={!isEditMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive text messages
                  </p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={formData.notifications.sms}
                  onCheckedChange={(checked) => handleInputChange('notifications.sms', checked)}
                  disabled={!isEditMode}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}