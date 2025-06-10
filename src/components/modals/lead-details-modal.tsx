import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign,
  FileText,
  Edit,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  notes?: string;
  doorType?: string;
  doorSize?: string;
}

interface LeadDetailsModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScheduleAppointment?: (leadId: string) => void;
  onCreateQuote?: (leadId: string) => void;
}

export function LeadDetailsModal({ 
  lead, 
  open, 
  onOpenChange, 
  onScheduleAppointment,
  onCreateQuote 
}: LeadDetailsModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!lead) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-teal-500 hover:bg-teal-600';
      case 'In Progress': return 'bg-amber-500 hover:bg-amber-600';
      case 'Quote Sent': return 'bg-purple-500 hover:bg-purple-600';
      case 'Closed Won': return 'bg-lime-500 hover:bg-lime-600';
      case 'Closed Lost': return 'bg-gray-500 hover:bg-gray-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const handleScheduleAppointment = async () => {
    setIsLoading(true);
    try {
      onScheduleAppointment?.(lead.id);
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateQuote = async () => {
    setIsLoading(true);
    try {
      onCreateQuote?.(lead.id);
    } catch (error) {
      console.error('Error creating quote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {lead.customerName}
            </DialogTitle>
            <Badge className={cn("text-white", getStatusColor(lead.status))}>
              {lead.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{lead.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{lead.phone}</span>
                </div>
                <div className="flex items-start gap-2 md:col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{lead.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lead Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lead Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Service Type</p>
                  <p className="text-sm font-semibold">{lead.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Source</p>
                  <p className="text-sm font-semibold">{lead.source}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expected Value</p>
                  <p className="text-sm font-semibold text-green-600">${lead.value.toFixed(2)}</p>
                </div>
                {lead.doorType && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Door Type</p>
                    <p className="text-sm font-semibold">{lead.doorType}</p>
                  </div>
                )}
                {lead.doorSize && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Door Size</p>
                    <p className="text-sm font-semibold">{lead.doorSize}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-sm font-semibold">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {lead.notes && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Notes</p>
                    <p className="text-sm">{lead.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleScheduleAppointment} disabled={isLoading}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button variant="outline" onClick={handleCreateQuote} disabled={isLoading}>
              <FileText className="mr-2 h-4 w-4" />
              Create Quote
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Lead
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}