import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  AlertTriangle, 
  Server, 
  Settings,
  Clock,
  CheckCircle,
  X
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'maintenance' | 'feedback' | 'emergency' | 'schedule' | 'system';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'emergency',
    priority: 'high',
    title: 'Emergency Service Request',
    message: 'Urgent garage door malfunction at 123 Oak Street. Customer reports door stuck halfway open.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    actionRequired: true
  },
  {
    id: '2',
    type: 'maintenance',
    priority: 'medium',
    title: 'Scheduled Maintenance Due',
    message: 'Hydraulic lift #2 is due for quarterly maintenance. Schedule within next 7 days.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    actionRequired: true
  },
  {
    id: '3',
    type: 'feedback',
    priority: 'low',
    title: 'New Customer Review',
    message: 'Sarah Johnson left a 5-star review: "Excellent service, very professional team!"',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
    actionRequired: false
  },
  {
    id: '4',
    type: 'schedule',
    priority: 'medium',
    title: 'Schedule Update',
    message: 'Alex Rodriguez has updated availability for tomorrow. 3 appointments affected.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: false,
    actionRequired: true
  },
  {
    id: '5',
    type: 'system',
    priority: 'low',
    title: 'System Backup Complete',
    message: 'Daily system backup completed successfully. All data secured.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    read: true,
    actionRequired: false
  },
  {
    id: '6',
    type: 'feedback',
    priority: 'medium',
    title: 'Customer Complaint',
    message: 'Michael Brown reported delayed service. Response time exceeded SLA.',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    read: false,
    actionRequired: true
  },
  {
    id: '7',
    type: 'maintenance',
    priority: 'high',
    title: 'Equipment Failure Alert',
    message: 'Diagnostic scanner #3 showing error codes. Immediate attention required.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    read: false,
    actionRequired: true
  },
  {
    id: '8',
    type: 'schedule',
    priority: 'low',
    title: 'Weekly Schedule Reminder',
    message: 'Next week\'s schedule has been published. Review assignments for accuracy.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    actionRequired: false
  }
];

export function NotificationsTab() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'maintenance': return <Settings className="h-4 w-4" />;
      case 'feedback': return <MessageSquare className="h-4 w-4" />;
      case 'emergency': return <AlertTriangle className="h-4 w-4" />;
      case 'schedule': return <Calendar className="h-4 w-4" />;
      case 'system': return <Server className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
      case 'medium': return 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-950/20';
      default: return 'border-l-gray-500';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
    const matchesSearch = searchQuery === '' || 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesPriority && matchesSearch;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">
              Active alerts and updates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Badge variant="destructive">{unreadCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">
              Require your attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highPriorityCount}</div>
            <p className="text-xs text-muted-foreground">
              Urgent action required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Notifications Center</CardTitle>
              <CardDescription>Manage alerts, updates, and system notifications</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={markAllAsRead}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark All Read
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sm:max-w-xs"
            />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="schedule">Schedule</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No notifications found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`border-l-4 transition-all duration-200 hover:shadow-md ${getPriorityColor(notification.priority)} ${
                !notification.read ? 'ring-1 ring-blue-200 dark:ring-blue-800' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-full ${
                      notification.type === 'emergency' ? 'bg-red-100 text-red-600' :
                      notification.type === 'maintenance' ? 'bg-blue-100 text-blue-600' :
                      notification.type === 'feedback' ? 'bg-green-100 text-green-600' :
                      notification.type === 'schedule' ? 'bg-amber-100 text-amber-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h4>
                        <Badge 
                          variant={
                            notification.priority === 'high' ? 'destructive' :
                            notification.priority === 'medium' ? 'default' :
                            'secondary'
                          }
                          className="text-xs"
                        >
                          {notification.priority}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge variant="outline" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                        {!notification.read && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {notification.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {notification.actionRequired && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {notification.type === 'emergency' && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Respond Now
                        </Button>
                      )}
                      {notification.type === 'maintenance' && (
                        <Button size="sm">
                          Schedule Maintenance
                        </Button>
                      )}
                      {notification.type === 'schedule' && (
                        <Button size="sm">
                          Review Schedule
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}