import { useState } from 'react';
import { CalendarClock, User, MapPin, PenTool as Tool } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AppointmentDetailsModal } from '@/components/modals/appointment-details-modal';
import { RescheduleModal } from '@/components/modals/reschedule-modal';
import { useToast } from '@/hooks/use-toast';
import type { UpcomingAppointment } from '@/types/appointments';

export function UpcomingAppointments() {
  const { toast } = useToast();
  const [selectedAppointment, setSelectedAppointment] = useState<UpcomingAppointment | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleAppointmentId, setRescheduleAppointmentId] = useState<string>('');

  const handleViewDetails = (appointment: UpcomingAppointment) => {
    setSelectedAppointment(appointment);
    setDetailsModalOpen(true);
  };

  const handleReschedule = (appointmentId: string) => {
    setRescheduleAppointmentId(appointmentId);
    setRescheduleModalOpen(true);
    setDetailsModalOpen(false);
  };

  const handleCompleteAppointment = (appointmentId: string) => {
    console.log('Complete appointment:', appointmentId);
    toast({
      title: 'Appointment Completed',
      description: 'Appointment has been marked as completed.',
    });
    setDetailsModalOpen(false);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    console.log('Cancel appointment:', appointmentId);
    toast({
      title: 'Appointment Cancelled',
      description: 'Appointment has been cancelled.',
    });
    setDetailsModalOpen(false);
  };

  const handleRescheduleSubmit = (appointmentId: string, newDate: Date, newTime: string, reason?: string) => {
    console.log('Reschedule appointment:', { appointmentId, newDate, newTime, reason });
    // Implementation for rescheduling appointment
    setRescheduleModalOpen(false);
  };

  const currentAppointment = appointments.find(apt => apt.id === rescheduleAppointmentId);

  return (
    <>
      <div className="space-y-8">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex flex-col space-y-3 rounded-md border p-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-semibold">{appointment.serviceType}</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarClock className="mr-1 h-4 w-4" />
                  <span>
                    {appointment.date} &middot; {appointment.time}
                  </span>
                </div>
              </div>
              <Badge status={appointment.status} />
            </div>
            <div className="grid gap-1 text-sm">
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{appointment.customerName}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{appointment.location}</span>
              </div>
              <div className="flex items-center">
                <Tool className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{appointment.technician}</span>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleReschedule(appointment.id)}
              >
                Reschedule
              </Button>
              <Button 
                size="sm"
                onClick={() => handleViewDetails(appointment)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AppointmentDetailsModal
        appointment={selectedAppointment}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        onReschedule={handleReschedule}
        onComplete={handleCompleteAppointment}
        onCancel={handleCancelAppointment}
      />

      <RescheduleModal
        open={rescheduleModalOpen}
        onOpenChange={setRescheduleModalOpen}
        appointmentId={rescheduleAppointmentId}
        currentDate={currentAppointment ? new Date(currentAppointment.date) : undefined}
        currentTime={currentAppointment?.time}
        onReschedule={handleRescheduleSubmit}
      />
    </>
  );
}

function Badge({ status }: { status: string }) {
  return (
    <div
      className={cn(
        'rounded-full px-2 py-1 text-xs font-semibold',
        status === 'Confirmed'
          ? 'bg-teal-500/20 text-teal-500'
          : status === 'In Progress'
          ? 'bg-amber-500/20 text-amber-500'
          : 'bg-slate-500/20 text-slate-500'
      )}
    >
      {status}
    </div>
  );
}

const appointments: UpcomingAppointment[] = [
  {
    id: '1',
    customerName: 'Michael Johnson',
    customerEmail: 'michael.johnson@email.com',
    customerPhone: '(555) 123-4567',
    serviceType: 'Garage Door Installation',
    date: 'Today',
    time: '2:00 PM - 4:00 PM',
    location: '123 Main St, Anytown, CA',
    technician: 'Alex Rodriguez',
    status: 'Confirmed',
    duration: '2 hours',
    estimatedCost: 1200,
    notes: 'Customer prefers white sectional door with windows. Access code: 1234.'
  },
  {
    id: '2',
    customerName: 'Sarah Williams',
    customerEmail: 'sarah.williams@email.com',
    customerPhone: '(555) 234-5678',
    serviceType: 'Spring Replacement',
    date: 'Tomorrow',
    time: '9:00 AM - 11:00 AM',
    location: '456 Oak Ave, Somewhere, CA',
    technician: 'Carlos Mendez',
    status: 'Pending',
    duration: '1.5 hours',
    estimatedCost: 350,
    notes: 'Garage door spring broke yesterday. Customer has two dogs.'
  },
  {
    id: '3',
    customerName: 'David Brown',
    customerEmail: 'david.brown@email.com',
    customerPhone: '(555) 345-6789',
    serviceType: 'Opener Repair',
    date: 'Jun 12',
    time: '1:00 PM - 2:00 PM',
    location: '789 Pine Rd, Nowhere, CA',
    technician: 'Jessica Taylor',
    status: 'In Progress',
    duration: '1 hour',
    estimatedCost: 285,
    notes: 'Garage door opener making strange noises. Under warranty.'
  },
];