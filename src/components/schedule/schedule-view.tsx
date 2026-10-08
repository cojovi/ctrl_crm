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
import { appointments as demoAppointments } from '@/data/demo';

interface Appointment {
  id: string;
  customerName: string;
  serviceType: string;
  location: string;
  status: string;
  technicianId: string;
  start: Date;
  end: Date;
}

export function ScheduleView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [appointments] = useState<Appointment[]>(demoAppointments);
  const [selectedTechnicians, setSelectedTechnicians] = useState<string[]>([]);

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

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="page-title">Schedule</h2>
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

          <div className="min-w-0 flex-1 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

            <div className="overflow-x-auto pb-2">
            <div className="grid min-w-[920px] grid-cols-7 gap-3">
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
                  <div className="flex flex-1 flex-col gap-1 rounded-b-md border border-t-0 p-1">
                    {filteredAppointments
                      .filter(apt => isSameDay(apt.start, day))
                      .map(apt => (
                        <AppointmentCard key={apt.id} appointment={apt} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <Card
      className={cn(
        "flex flex-col p-2 text-xs cursor-pointer hover:bg-accent transition-colors",
        appointment.status === 'Confirmed' && 'border-l-4 border-l-teal-500',
        appointment.status === 'In Progress' && 'border-l-4 border-l-amber-500',
        appointment.status === 'Completed' && 'border-l-4 border-l-lime-500',
        appointment.status === 'Cancelled' && 'border-l-4 border-l-gray-500'
      )}
    >
      <div className="font-medium truncate">{appointment.customerName}</div>
      <div className="text-muted-foreground truncate">{appointment.serviceType}</div>
      <div className="mt-1 text-muted-foreground">
        {format(appointment.start, 'h:mm a')} - {format(appointment.end, 'h:mm a')}
      </div>
    </Card>
  );
}
