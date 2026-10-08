import { CalendarClock, User, MapPin, PenTool as Tool } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { upcomingAppointments as appointments } from '@/data/demo';

export function UpcomingAppointments() {
  return (
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
              <span>{appointment.customer}</span>
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
            <Button variant="outline" size="sm">Reschedule</Button>
            <Button size="sm">View Details</Button>
          </div>
        </div>
      ))}
    </div>
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