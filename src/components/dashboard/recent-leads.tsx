import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LeadDetailsModal } from '@/components/modals/lead-details-modal';

interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  serviceType: string;
  source: string;
  createdAt: string;
  value: number;
  avatar?: string;
  notes?: string;
  doorType?: string;
  doorSize?: string;
}

export function RecentLeads() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const handleScheduleAppointment = (leadId: string) => {
    console.log('Schedule appointment for lead:', leadId);
    // Implementation for scheduling appointment
    setModalOpen(false);
  };

  const handleCreateQuote = (leadId: string) => {
    console.log('Create quote for lead:', leadId);
    // Implementation for creating quote
    setModalOpen(false);
  };

  return (
    <>
      <div className="space-y-8">
        {recentLeads.map((lead) => (
          <div key={lead.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={lead.avatar} alt="Avatar" />
              <AvatarFallback>{lead.customerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{lead.customerName}</p>
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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleViewLead(lead)}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      <LeadDetailsModal
        lead={selectedLead}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onScheduleAppointment={handleScheduleAppointment}
        onCreateQuote={handleCreateQuote}
      />
    </>
  );
}

const recentLeads: Lead[] = [
  {
    id: '1',
    customerName: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    phone: '(555) 123-4567',
    address: '123 Oak Street, San Francisco, CA 94105',
    avatar: '/placeholder-user.jpg',
    status: 'New',
    serviceType: 'Garage Door Installation',
    source: 'Website',
    createdAt: '2025-01-15T10:30:00Z',
    value: 1200.00,
    doorType: 'Sectional',
    doorSize: '16x7',
    notes: 'Customer interested in white sectional door with windows. Prefers installation next week.'
  },
  {
    id: '2',
    customerName: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    phone: '(555) 234-5678',
    address: '456 Pine Avenue, Oakland, CA 94610',
    avatar: '/placeholder-user.jpg',
    status: 'In Progress',
    serviceType: 'Repair',
    source: 'Referral',
    createdAt: '2025-01-14T14:15:00Z',
    value: 350.00,
    notes: 'Garage door spring replacement needed. Customer has dogs, ring doorbell.'
  },
  {
    id: '3',
    customerName: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    phone: '(555) 345-6789',
    address: '789 Cedar Lane, Berkeley, CA 94704',
    avatar: '/placeholder-user.jpg',
    status: 'Quote Sent',
    serviceType: 'Installation',
    source: 'Google',
    createdAt: '2025-01-13T09:45:00Z',
    value: 1500.00,
    doorType: 'Carriage House',
    doorSize: '18x7',
    notes: 'Quote sent for carriage house style door. Customer comparing with other vendors.'
  },
  {
    id: '4',
    customerName: 'William Kim',
    email: 'will.kim@email.com',
    phone: '(555) 456-7890',
    address: '321 Maple Drive, San Mateo, CA 94401',
    avatar: '/placeholder-user.jpg',
    status: 'New',
    serviceType: 'Maintenance',
    source: 'Facebook',
    createdAt: '2025-01-12T16:20:00Z',
    value: 150.00,
    notes: 'Annual maintenance check requested. Customer is very detail-oriented.'
  },
  {
    id: '5',
    customerName: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    phone: '(555) 567-8901',
    address: '654 Elm Street, Fremont, CA 94536',
    avatar: '/placeholder-user.jpg',
    status: 'In Progress',
    serviceType: 'Emergency Repair',
    source: 'Phone',
    createdAt: '2025-01-11T11:30:00Z',
    value: 425.00,
    notes: 'Emergency repair - door stuck halfway open. Needs immediate attention.'
  },
];