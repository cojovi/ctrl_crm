import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { leads as demoLeads } from '@/data/demo';

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
    setLeads(demoLeads);
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
