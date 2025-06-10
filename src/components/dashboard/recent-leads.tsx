import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function RecentLeads() {
  return (
    <div className="space-y-8">
      {recentLeads.map((lead) => (
        <div key={lead.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={lead.avatar} alt="Avatar" />
            <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{lead.name}</p>
            <p className="text-sm text-muted-foreground">
              {lead.email}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge 
              variant={lead.status === 'New' ? 'default' : 
                       lead.status === 'In Progress' ? 'secondary' : 
                       lead.status === 'Quote Sent' ? 'outline' : 'default'}
              className={lead.status === 'New' ? 'bg-teal-500 hover:bg-teal-600' : 
                         lead.status === 'In Progress' ? 'bg-amber-500 hover:bg-amber-600' : ''}
            >
              {lead.status}
            </Badge>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

const recentLeads = [
  {
    id: '1',
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    avatar: '/placeholder-user.jpg',
    status: 'New',
  },
  {
    id: '2',
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    avatar: '/placeholder-user.jpg',
    status: 'In Progress',
  },
  {
    id: '3',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/placeholder-user.jpg',
    status: 'Quote Sent',
  },
  {
    id: '4',
    name: 'William Kim',
    email: 'will.kim@email.com',
    avatar: '/placeholder-user.jpg',
    status: 'New',
  },
  {
    id: '5',
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    avatar: '/placeholder-user.jpg',
    status: 'In Progress',
  },
];