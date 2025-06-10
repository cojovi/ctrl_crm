import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock,
  PenTool as Tool,
  Edit,
  MessageSquare,
  CheckCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Appointment {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceType: string;
  location: string;
  status: string;
  technician: string;
  date: string;
  time: string;
  duration?: string;
  notes?: string;
  estimatedCost?: number;
}

interface AppointmentDetailsModalProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReschedule?: (appointmentId: string) => void;
  onComplete?: (appointmentId: string) => void;
  onCancel?: (appointmentId: string) => void;
}

export function AppointmentDetailsModal({ 
  appointment, 
  open, 
  onOpenChange,
  onReschedule,
  onComplete,
  onCancel
}: AppointmentDetailsModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!appointment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-teal-500 hover:bg-teal-600';
      case 'In Progress': return 'bg-amber-500 hover:bg-amber-600';
      case 'Completed': return 'bg-lime-500 hover:bg-lime-600';
      case 'Cancelled': return 'bg-gray-500 hover:bg-gray-600';
      case 'Pending': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const handleAction = async (action: 'reschedule' | 'complete' | 'cancel') => {
    setIsLoading(true);
    try {
      switch (action) {
        case 'reschedule':
          onReschedule?.(appointment.id);
          break;
        case 'complete':
          onComplete?.(appointment.id);
          break;
        case 'cancel':
          onCancel?.(appointment.id);
          break;
      }
    } catch (error) {
      console.error(`Error ${action}ing appointment:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {appointment.serviceType} - {appointment.customerName}
            </DialogTitle>
            <Badge className={cn("text-white", getStatusColor(appointment.status))}>
              {appointment.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Appointment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{appointment.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">{appointment.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tool className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Technician</p>
                    <p className="text-sm text-muted-foreground">{appointment.technician}</p>
                  </div>
                </div>
                {appointment.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{appointment.duration}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2 md:col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{appointment.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">{appointment.customerName}</p>
                  </div>
                </div>
                {appointment.customerEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{appointment.customerEmail}</p>
                    </div>
                  </div>
                )}
                {appointment.customerPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{appointment.customerPhone}</p>
                    </div>
                  </div>
                )}
                {appointment.estimatedCost && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Estimated Cost:</span>
                    <span className="text-sm font-semibold text-green-600">
                      ${appointment.estimatedCost.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Service Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Service Type</p>
                <p className="text-sm font-semibold mb-4">{appointment.serviceType}</p>
                
                {appointment.notes && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Notes</p>
                      <p className="text-sm">{appointment.notes}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {appointment.status === 'Confirmed' && (
              <>
                <Button 
                  onClick={() => handleAction('reschedule')} 
                  disabled={isLoading}
                  variant="outline"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Reschedule
                </Button>
                <Button 
                  onClick={() => handleAction('complete')} 
                  disabled={isLoading}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark Complete
                </Button>
                <Button 
                  onClick={() => handleAction('cancel')} 
                  disabled={isLoading}
                  variant="destructive"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            )}
            {appointment.status === 'In Progress' && (
              <Button 
                onClick={() => handleAction('complete')} 
                disabled={isLoading}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Complete
              </Button>
            )}
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Add Note
            </Button>
            <Button variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Call Customer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}