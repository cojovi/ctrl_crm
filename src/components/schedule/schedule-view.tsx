import { useState } from 'react';
import { Layout } from '../ui-layout/layout';
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
                  <div className="flex flex-1 flex-col gap-1 rounded-b-md border border-t-0 p-1 min-h-[400px]">
                    {filteredAppointments
                      .filter(apt => isSameDay(apt.start, day))
                      .sort((a, b) => a.start.getTime() - b.start.getTime())
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
      </div>
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
        "flex flex-col p-2 text-xs cursor-pointer hover:bg-accent transition-colors mb-1",
        appointment.status === 'Confirmed' && 'border-l-4 border-l-teal-500',
        appointment.status === 'In Progress' && 'border-l-4 border-l-amber-500',
        appointment.status === 'Completed' && 'border-l-4 border-l-lime-500',
        appointment.status === 'Cancelled' && 'border-l-4 border-l-gray-500',
        appointment.status === 'Pending' && 'border-l-4 border-l-blue-500'
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

// Comprehensive mock appointments for June 9-15, 2025 (current week shown in calendar)
const mockAppointments: Appointment[] = [
  // MONDAY - June 9, 2025
  {
    id: '1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '(555) 123-4567',
    serviceType: 'Installation',
    location: '123 Main St, San Francisco, CA',
    status: 'Confirmed',
    technicianId: 'tech-1',
    technician: 'Alex Rodriguez',
    start: new Date(2025, 5, 9, 8, 0), // June 9, 2025 8:00 AM
    end: new Date(2025, 5, 9, 10, 0),
    estimatedCost: 1200,
    notes: 'New garage door installation - sectional white door with windows.'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@email.com',
    customerPhone: '(555) 234-5678',
    serviceType: 'Maintenance',
    location: '456 Oak Ave, Oakland, CA',
    status: 'Confirmed',
    technicianId: 'tech-2',
    technician: 'Carlos Mendez',
    start: new Date(2025, 5, 9, 11, 0), // June 9, 2025 11:00 AM
    end: new Date(2025, 5, 9, 12, 0),
    estimatedCost: 150,
    notes: 'Quarterly maintenance check.'
  },
  {
    id: '3',
    customerName: 'Mike Chen',
    customerEmail: 'mike.chen@email.com',
    customerPhone: '(555) 345-6789',
    serviceType: 'Repair',
    location: '789 Pine Rd, Berkeley, CA',
    status: 'In Progress',
    technicianId: 'tech-1',
    technician: 'Alex Rodriguez',
    start: new Date(2025, 5, 9, 14, 0), // June 9, 2025 2:00 PM
    end: new Date(2025, 5, 9, 16, 0),
    estimatedCost: 350,
    notes: 'Spring replacement needed urgently.'
  },

  // TUESDAY - June 10, 2025
  {
    id: '4',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@email.com',
    customerPhone: '(555) 456-7890',
    serviceType: 'Installation',
    location: '321 Cedar Ln, San Mateo, CA',
    status: 'Confirmed',
    technicianId: 'tech-3',
    technician: 'Jessica Taylor',
    start: new Date(2025, 5, 10, 9, 0), // June 10, 2025 9:00 AM
    end: new Date(2025, 5, 10, 11, 30),
    estimatedCost: 1500,
    notes: 'Carriage house style door installation.'
  },
  {
    id: '5',
    customerName: 'Robert Wilson',
    customerEmail: 'robert.wilson@email.com',
    customerPhone: '(555) 567-8901',
    serviceType: 'Emergency Repair',
    location: '654 Elm St, Fremont, CA',
    status: 'Confirmed',
    technicianId: 'tech-2',
    technician: 'Carlos Mendez',
    start: new Date(2025, 5, 10, 13, 0), // June 10, 2025 1:00 PM
    end: new Date(2025, 5, 10, 15, 0),
    estimatedCost: 425,
    notes: 'Door completely stuck - emergency service.'
  },
  {
    id: '6',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.anderson@email.com',
    customerPhone: '(555) 678-9012',
    serviceType: 'Opener Repair',
    location: '987 Maple Dr, Mountain View, CA',
    status: 'Completed',
    technicianId: 'tech-4',
    technician: 'David Brown',
    start: new Date(2025, 5, 10, 16, 0), // June 10, 2025 4:00 PM
    end: new Date(2025, 5, 10, 17, 0),
    estimatedCost: 285,
    notes: 'Remote not working - opener repair completed.'
  },

  // WEDNESDAY - June 11, 2025
  {
    id: '7',
    customerName: 'James Martinez',
    customerEmail: 'james.martinez@email.com',
    customerPhone: '(555) 789-0123',
    serviceType: 'Inspection',
    location: '159 Birch Ave, Hayward, CA',
    status: 'Confirmed',
    technicianId: 'tech-5',
    technician: 'Maria Garcia',
    start: new Date(2025, 5, 11, 8, 30), // June 11, 2025 8:30 AM
    end: new Date(2025, 5, 11, 9, 30),
    estimatedCost: 150,
    notes: 'Annual safety inspection.'
  },
  {
    id: '8',
    customerName: 'Jennifer Lee',
    customerEmail: 'jennifer.lee@email.com',
    customerPhone: '(555) 890-1234',
    serviceType: 'Installation',
    location: '753 Walnut St, Palo Alto, CA',
    status: 'In Progress',
    technicianId: 'tech-1',
    technician: 'Alex Rodriguez',
    start: new Date(2025, 5, 11, 10, 0), // June 11, 2025 10:00 AM
    end: new Date(2025, 5, 11, 12, 30),
    estimatedCost: 1350,
    notes: 'Smart garage door with app integration.'
  },
  {
    id: '9',
    customerName: 'David Kim',
    customerEmail: 'david.kim@email.com',
    customerPhone: '(555) 901-2345',
    serviceType: 'Maintenance',
    location: '852 Rose St, San Jose, CA',
    status: 'Confirmed',
    technicianId: 'tech-3',
    technician: 'Jessica Taylor',
    start: new Date(2025, 5, 11, 14, 0), // June 11, 2025 2:00 PM
    end: new Date(2025, 5, 11, 15, 0),
    estimatedCost: 150,
    notes: 'Routine maintenance and lubrication.'
  },

  // THURSDAY - June 12, 2025
  {
    id: '10',
    customerName: 'Amy Rodriguez',
    customerEmail: 'amy.rodriguez@email.com',
    customerPhone: '(555) 012-3456',
    serviceType: 'Repair',
    location: '456 Sunset Blvd, Daly City, CA',
    status: 'Pending',
    technicianId: 'tech-2',
    technician: 'Carlos Mendez',
    start: new Date(2025, 5, 12, 9, 0), // June 12, 2025 9:00 AM
    end: new Date(2025, 5, 12, 11, 0),
    estimatedCost: 320,
    notes: 'Cable replacement needed.'
  },
  {
    id: '11',
    customerName: 'Thomas Brown',
    customerEmail: 'thomas.brown@email.com',
    customerPhone: '(555) 123-4567',
    serviceType: 'Installation',
    location: '123 Ocean View Dr, Pacifica, CA',
    status: 'Confirmed',
    technicianId: 'tech-4',
    technician: 'David Brown',
    start: new Date(2025, 5, 12, 13, 0), // June 12, 2025 1:00 PM
    end: new Date(2025, 5, 12, 15, 30),
    estimatedCost: 1180,
    notes: 'Insulated steel door installation.'
  },
  {
    id: '12',
    customerName: 'Maria Santos',
    customerEmail: 'maria.santos@email.com',
    customerPhone: '(555) 234-5678',
    serviceType: 'Opener Installation',
    location: '789 Valley Dr, Redwood City, CA',
    status: 'Confirmed',
    technicianId: 'tech-5',
    technician: 'Maria Garcia',
    start: new Date(2025, 5, 12, 16, 0), // June 12, 2025 4:00 PM
    end: new Date(2025, 5, 12, 17, 30),
    estimatedCost: 450,
    notes: 'Belt drive opener installation.'
  },

  // FRIDAY - June 13, 2025
  {
    id: '13',
    customerName: 'Kevin O\'Connor',
    customerEmail: 'kevin.oconnor@email.com',
    customerPhone: '(555) 345-6789',
    serviceType: 'Emergency Repair',
    location: '321 Hill St, Brisbane, CA',
    status: 'Confirmed',
    technicianId: 'tech-1',
    technician: 'Alex Rodriguez',
    start: new Date(2025, 5, 13, 8, 0), // June 13, 2025 8:00 AM
    end: new Date(2025, 5, 13, 10, 0),
    estimatedCost: 385,
    notes: 'Door off track - emergency repair.'
  },
  {
    id: '14',
    customerName: 'Rachel Green',
    customerEmail: 'rachel.green@email.com',
    customerPhone: '(555) 456-7890',
    serviceType: 'Maintenance',
    location: '654 Park Ave, Burlingame, CA',
    status: 'Completed',
    technicianId: 'tech-3',
    technician: 'Jessica Taylor',
    start: new Date(2025, 5, 13, 11, 0), // June 13, 2025 11:00 AM
    end: new Date(2025, 5, 13, 12, 0),
    estimatedCost: 150,
    notes: 'Preventive maintenance completed.'
  },
  {
    id: '15',
    customerName: 'Steven Park',
    customerEmail: 'steven.park@email.com',
    customerPhone: '(555) 567-8901',
    serviceType: 'Repair',
    location: '987 Garden St, Millbrae, CA',
    status: 'Confirmed',
    technicianId: 'tech-2',
    technician: 'Carlos Mendez',
    start: new Date(2025, 5, 13, 14, 30), // June 13, 2025 2:30 PM
    end: new Date(2025, 5, 13, 16, 0),
    estimatedCost: 275,
    notes: 'Weather stripping replacement.'
  },

  // SATURDAY - June 14, 2025
  {
    id: '16',
    customerName: 'Michelle Taylor',
    customerEmail: 'michelle.taylor@email.com',
    customerPhone: '(555) 678-9012',
    serviceType: 'Installation',
    location: '159 Meadow Ln, Foster City, CA',
    status: 'Confirmed',
    technicianId: 'tech-4',
    technician: 'David Brown',
    start: new Date(2025, 5, 14, 9, 0), // June 14, 2025 9:00 AM
    end: new Date(2025, 5, 14, 11, 30),
    estimatedCost: 1420,
    notes: 'Weekend installation - double car garage.'
  },
  {
    id: '17',
    customerName: 'Carlos Vega',
    customerEmail: 'carlos.vega@email.com',
    customerPhone: '(555) 789-0123',
    serviceType: 'Repair',
    location: '753 Marina Blvd, San Mateo, CA',
    status: 'In Progress',
    technicianId: 'tech-5',
    technician: 'Maria Garcia',
    start: new Date(2025, 5, 14, 13, 0), // June 14, 2025 1:00 PM
    end: new Date(2025, 5, 14, 14, 30),
    estimatedCost: 310,
    notes: 'Panel replacement needed.'
  },
  {
    id: '18',
    customerName: 'Nicole Wong',
    customerEmail: 'nicole.wong@email.com',
    customerPhone: '(555) 890-1234',
    serviceType: 'Inspection',
    location: '852 Bay St, Belmont, CA',
    status: 'Confirmed',
    technicianId: 'tech-1',
    technician: 'Alex Rodriguez',
    start: new Date(2025, 5, 14, 15, 30), // June 14, 2025 3:30 PM
    end: new Date(2025, 5, 14, 16, 30),
    estimatedCost: 150,
    notes: 'Pre-purchase inspection for new homeowner.'
  },

  // SUNDAY - June 15, 2025
  {
    id: '19',
    customerName: 'Brandon Lee',
    customerEmail: 'brandon.lee@email.com',
    customerPhone: '(555) 901-2345',
    serviceType: 'Emergency Repair',
    location: '456 Summit Dr, San Carlos, CA',
    status: 'Confirmed',
    technicianId: 'tech-2',
    technician: 'Carlos Mendez',
    start: new Date(2025, 5, 15, 10, 0), // June 15, 2025 10:00 AM
    end: new Date(2025, 5, 15, 12, 0),
    estimatedCost: 395,
    notes: 'Sunday emergency - spring broke overnight.'
  },
  {
    id: '20',
    customerName: 'Ashley Miller',
    customerEmail: 'ashley.miller@email.com',
    customerPhone: '(555) 012-3456',
    serviceType: 'Maintenance',
    location: '123 Hillside Ave, Atherton, CA',
    status: 'Confirmed',
    technicianId: 'tech-3',
    technician: 'Jessica Taylor',
    start: new Date(2025, 5, 15, 14, 0), // June 15, 2025 2:00 PM
    end: new Date(2025, 5, 15, 15, 0),
    estimatedCost: 150,
    notes: 'Premium customer - quarterly maintenance.'
  }
];