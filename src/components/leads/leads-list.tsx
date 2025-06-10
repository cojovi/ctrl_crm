import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface Lead {
  id: string;
  customer: string;
  email: string;
  phone: string;
  status: string;
  serviceType: string;
  createdAt: string;
  value: number;
}

interface LeadsListProps {
  searchQuery: string;
}

export function LeadsList({ searchQuery }: LeadsListProps) {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);

  // Simulate API call to fetch leads
  useEffect(() => {
    // This would be replaced with an actual API call
    setLeads(mockLeads);
  }, []);

  // Filter leads based on search query
  const filteredLeads = leads.filter((lead) =>
    lead.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="hidden md:table-cell">Value</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div className="font-medium">{lead.customer}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {lead.email}
                  </div>
                </TableCell>
                <TableCell>{lead.serviceType}</TableCell>
                <TableCell>
                  <LeadStatusBadge status={lead.status} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${lead.value.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function LeadStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={cn(
        status === 'New' && 'bg-teal-500 hover:bg-teal-600',
        status === 'In Progress' && 'bg-amber-500 hover:bg-amber-600',
        status === 'Quote Sent' && 'bg-purple-500 hover:bg-purple-600',
        status === 'Closed Won' && 'bg-lime-500 hover:bg-lime-600',
        status === 'Closed Lost' && 'bg-gray-500 hover:bg-gray-600'
      )}
    >
      {status}
    </Badge>
  );
}

const mockLeads: Lead[] = [
  {
    id: '1',
    customer: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    status: 'New',
    serviceType: 'Installation',
    createdAt: '2025-05-01T09:00:00Z',
    value: 1200.0,
  },
  {
    id: '2',
    customer: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 234-5678',
    status: 'In Progress',
    serviceType: 'Repair',
    createdAt: '2025-05-02T10:30:00Z',
    value: 350.0,
  },
  {
    id: '3',
    customer: 'Michael Williams',
    email: 'michael.w@example.com',
    phone: '(555) 345-6789',
    status: 'Quote Sent',
    serviceType: 'Replacement',
    createdAt: '2025-05-03T14:15:00Z',
    value: 850.0,
  },
  {
    id: '4',
    customer: 'Emily Brown',
    email: 'emily.b@example.com',
    phone: '(555) 456-7890',
    status: 'Closed Won',
    serviceType: 'Installation',
    createdAt: '2025-05-04T11:45:00Z',
    value: 1500.0,
  },
  {
    id: '5',
    customer: 'James Taylor',
    email: 'james.t@example.com',
    phone: '(555) 567-8901',
    status: 'Closed Lost',
    serviceType: 'Repair',
    createdAt: '2025-05-05T13:20:00Z',
    value: 275.0,
  },
  {
    id: '6',
    customer: 'Jennifer Davis',
    email: 'jennifer.d@example.com',
    phone: '(555) 678-9012',
    status: 'New',
    serviceType: 'Inspection',
    createdAt: '2025-05-06T15:30:00Z',
    value: 150.0,
  },
  {
    id: '7',
    customer: 'Robert Miller',
    email: 'robert.m@example.com',
    phone: '(555) 789-0123',
    status: 'In Progress',
    serviceType: 'Replacement',
    createdAt: '2025-05-07T09:10:00Z',
    value: 950.0,
  },
  {
    id: '8',
    customer: 'Lisa Wilson',
    email: 'lisa.w@example.com',
    phone: '(555) 890-1234',
    status: 'Quote Sent',
    serviceType: 'Installation',
    createdAt: '2025-05-08T10:45:00Z',
    value: 1350.0,
  },
];