import { ArrowRight, Calendar, CheckCircle, MessageSquare, User, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { timelineEvents } from '@/data/demo';

interface TimelineEvent {
  id: string;
  type: 'status_change' | 'note' | 'appointment' | 'quote';
  content: string;
  timestamp: string;
  user: string;
  data?: Record<string, any>;
}

interface LeadTimelineProps {
  leadId: string;
}

export function LeadTimeline({ leadId }: LeadTimelineProps) {
  // In a real app, we would fetch the timeline events from the API
  const events = timelineEvents.filter(event => event.leadId === leadId);
  
  return (
    <div className="space-y-8">
      {events.map((event, index) => (
        <div key={event.id} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2",
                event.type === 'status_change' && "border-teal-500 bg-teal-500/20 text-teal-500",
                event.type === 'note' && "border-amber-500 bg-amber-500/20 text-amber-500",
                event.type === 'appointment' && "border-purple-500 bg-purple-500/20 text-purple-500",
                event.type === 'quote' && "border-blue-500 bg-blue-500/20 text-blue-500"
              )}
            >
              {event.type === 'status_change' && <CheckCircle className="h-5 w-5" />}
              {event.type === 'note' && <MessageSquare className="h-5 w-5" />}
              {event.type === 'appointment' && <Calendar className="h-5 w-5" />}
              {event.type === 'quote' && <File className="h-5 w-5" />}
            </div>
            {index < events.length - 1 && (
              <div className="h-full w-0.5 bg-border" />
            )}
          </div>
          <div className="flex flex-col pb-8">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">{getEventTitle(event)}</div>
              <div className="text-xs text-muted-foreground">
                {format(new Date(event.timestamp), 'MMM d, yyyy h:mm a')}
              </div>
            </div>
            <div className="mt-1 text-sm">
              {event.content}
            </div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <User className="mr-1 h-3 w-3" />
              <span>{event.user}</span>
            </div>
            {event.type === 'status_change' && event.data?.fromStatus && event.data?.toStatus && (
              <div className="mt-2 flex items-center text-xs">
                <div className="flex items-center">
                  <span className="text-muted-foreground">{event.data.fromStatus}</span>
                  <ArrowRight className="mx-1 h-3 w-3" />
                  <span className="font-medium">{event.data.toStatus}</span>
                </div>
              </div>
            )}
            {event.type === 'appointment' && event.data?.date && event.data?.time && (
              <div className="mt-2 rounded-md border bg-muted/50 p-2 text-xs">
                <div className="flex flex-col space-y-1">
                  <span>
                    <span className="font-medium">Date:</span> {event.data.date}
                  </span>
                  <span>
                    <span className="font-medium">Time:</span> {event.data.time}
                  </span>
                  <span>
                    <span className="font-medium">Technician:</span> {event.data.technician}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function getEventTitle(event: TimelineEvent): string {
  switch (event.type) {
    case 'status_change':
      return 'Status Updated';
    case 'note':
      return 'Note Added';
    case 'appointment':
      return 'Appointment Scheduled';
    case 'quote':
      return 'Quote Created';
    default:
      return 'Event';
  }
}
