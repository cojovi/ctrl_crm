import { Layout } from '../ui-layout/layout';
import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScheduleAppointmentForm } from './schedule-appointment-form';
import { TechnicianFilter } from './technician-filter';
import { AppointmentDetailsModal } from '@/components/modals/appointment-details-modal';
import { RescheduleModal } from '@/components/modals/reschedule-modal';
import { useToast } from '@/hooks/use-toast';

interface Appointment {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceType: string;
  location: string;
  status: string;
  technicianId: string;
  technician: string;
  start: Date;
  end: Date;
  notes?: string;
  estimatedCost?: number;
}

export function ScheduleView() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [selectedTechnicians, setSelectedTechnicians] = useState<string[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleAppointmentId, setRescheduleAppointmentId] = useState<string>('');

  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const filteredAppointments = selectedTechnicians.length === 0
    ? appointments
    : appointments.filter(apt => selectedTechnicians.includes(apt.technicianId));

  const prevWeek = () => {
    setSelectedDate(addDays(selectedDate, -7));
  };

  const nextWeek = () => {
    setSelectedDate(addDays(selectedDate, 7));
  };

  const handleTechnicianChange = (technicianIds: string[]) => {
    setSelectedTechnicians(technicianIds);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
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
    toast({
      title: 'Appointment Rescheduled',
      description: `Appointment has been rescheduled to ${format(newDate, 'PPP')} at ${newTime}.`,
    });
    setRescheduleModalOpen(false);
  };

  const currentAppointment = appointments.find(apt => apt.id === rescheduleAppointmentId);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
            <p className="text-muted-foreground">
              Manage appointments and technician schedules
            </p>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule Appointment</DialogTitle>
              </DialogHeader>
              <ScheduleAppointmentForm onClose={() => setOpenDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="md:w-1/4">
            <TechnicianFilter
              onChange={handleTechnicianChange}
              selectedTechnicians={selectedTechnicians}
            />
          </div>

          <div className="flex-1 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium">
                      {format(startDate, 'MMMM d, yyyy')} - {format(addDays(startDate, 6), 'MMMM d, yyyy')}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={prevWeek}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextWeek}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day, i) => (
                <div key={i} className="flex flex-col">
                  <div
                    className={cn(
                      "flex flex-col items-center rounded-t-md p-2",
                      isSameDay(day, new Date()) ? 'bg-teal-500 text-white' : 'bg-muted'
                    )}
                  >
                    <span className="text-xs font-medium">
                      {format(day, 'EEE')}
                    </span>
                    <span className="text-sm font-bold">
                      {format(day, 'd')}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 rounded-b-md border border-t-0 p-1 min-h-[200px]">
                    {filteredAppointments
                      .filter(apt => isSameDay(apt.start, day))
                      .map(apt => (
                        <AppointmentCard 
                          key={apt.id} 
                          appointment={apt} 
                          onClick={() => handleAppointmentClick(apt)}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
        currentDate={currentAppointment ? currentAppointment.start : undefined}
        currentTime={currentAppointment ? format(currentAppointment.start, 'h:mm a') : undefined}
        onReschedule={handleRescheduleSubmit}
      />
    </Layout>
  );
}

function AppointmentCard({ 
  appointment, 
  onClick 
}: { 
  appointment: Appointment;
  onClick: () => void;
}) {
  return (
    <Card
      className={cn(
        "flex flex-col p-2 text-xs cursor-pointer hover:bg-accent transition-colors",
        appointment.status === 'Confirmed' && 'border-l-4 border-l-teal-500',
        appointment.status === 'In Progress' && 'border-l-4 border-l-amber-500',
        appointment.status === 'Completed' && 'border-l-4 border-l-lime-500',
        appointment.status === 'Cancelled' && 'border-l-4 border-l-gray-500'
      )}
      onClick={onClick}
    >
      <div className="font-medium truncate">{appointment.customerName}</div>
      <div className="text-muted-foreground truncate">{appointment.serviceType}</div>
      <div className="mt-1 text-muted-foreground">
        {format(appointment.start, 'h:mm a')} - {format(appointment.end, 'h:mm a')}
      </div>
      <div className="text-muted-foreground truncate text-xs mt-1">
        {appointment.technician}
      </div>
    </Card>
  );
}

// Updated mock appointments with current week dates (December 2024)
const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '(555) 123-4567',
    serviceType: 'Installation',
    location: '123 Main St, Anytown, CA',
    status: 'Confirmed',
    technicianId: 'tech-1',
    technician: 'Alex Rodriguez',
    start: new Date(2024, 11, 9, 9, 0), // December 9, 2024 9:00 AM (Monday)
    end: new Date(2024, 11, 9, 11, 0),
    estimatedCost: 1200,
    notes: 'Customer prefers white sectional door with windows.'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@email.com',
    customerPhone: '(555) 234-5678',
    serviceType: 'Repair',
    location: '456 Oak Ave, Somewhere, CA',
    status: 'In Progress',
    technicianId: 'tech-2',
    technician: 'Carlos Mendez',
    start: new Date(2024, 11, 10, 13, 0), // December 10, 2024 1:00 PM (Tuesday)
    end: new Date(2024, 11, 10, 15, 0),
    estimatedCost: 350,
    notes: 'Spring replacement needed. Customer has dogs.'
  },
  {
    id: '3',
    customerName: 'Michael Williams',
    customerEmail: 'michael.williams@email.com',
    customerPhone: '(555) 345-6789',
    serviceType: 'Inspection',
    location: '789 Pine Rd, Nowhere, CA',
    status: 'Completed',
    technicianId: 'tech-1',
    technician: 'Alex Rodriguez',
    start: new Date(2024, 11, 11, 10, 0), // December 11, 2024 10:00 AM (Wednesday)
    end: new Date(2024, 11, 11, 11, 0),
    estimatedCost: 150,
    notes: 'Annual maintenance inspection.'
  },
  {
    id: '4',
    customerName: 'Emily Brown',
    customerEmail: 'emily.brown@email.com',
    customerPhone: '(555) 456-7890',
    serviceType: 'Installation',
    location: '101 Cedar Ln, Anytown, CA',
    status: 'Cancelled',
    technicianId: 'tech-3',
    technician: 'Jessica Taylor',
    start: new Date(2024, 11, 12, 14, 0), // December 12, 2024 2:00 PM (Thursday)
    end: new Date(2024, 11, 12, 16, 0),
    estimatedCost: 1500,
    notes: 'Customer rescheduled due to weather concerns.'
  },
  {
    id: '5',
    customerName: 'James Taylor',
    customerEmail: 'james.taylor@email.com',
    customerPhone: '(555) 567-8901',
    serviceType: 'Repair',
    location: '202 Elm St, Somewhere, CA',
    status: 'Confirmed',
    technicianId: 'tech-2',
    technician: 'Carlos Mendez',
    start: new Date(2024, 11, 13, 9, 0), // December 13, 2024 9:00 AM (Friday)
    end: new Date(2024, 11, 13, 10, 30),
    estimatedCost: 285,
    notes: 'Opener repair - remote not working.'
  },
  {
    id: '6',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.anderson@email.com',
    customerPhone: '(555) 678-9012',
    serviceType: 'Maintenance',
    location: '987 Maple Drive, Fremont, CA',
    status: 'Confirmed',
    technicianId: 'tech-3',
    technician: 'Jessica Taylor',
    start: new Date(2024, 11, 14, 14, 0), // December 14, 2024 2:00 PM (Saturday)
    end: new Date(2024, 11, 14, 15, 30),
    estimatedCost: 150,
    notes: 'Quarterly maintenance check for VIP customer.'
  },
  {
    id: '7',
    customerName: 'Robert Wilson',
    customerEmail: 'robert.wilson@email.com',
    customerPhone: '(555) 789-0123',
    serviceType: 'Emergency Repair',
    location: '654 Pine Avenue, Oakland, CA',
    status: 'Confirmed',
    technicianId: 'tech-1',
    technician: 'Alex Rodriguez',
    start: new Date(2024, 11, 15, 11, 0), // December 15, 2024 11:00 AM (Sunday)
    end: new Date(2024, 11, 15, 12, 30),
    estimatedCost: 425,
    notes: 'Emergency call - garage door completely stuck.'
  }
];