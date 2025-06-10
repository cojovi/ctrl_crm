import { ArrowRight, Calendar, CheckCircle, MessageSquare, User, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

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
  const events = mockTimelineEvents.filter(event => event.leadId === leadId);
  
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

const mockTimelineEvents = [
  {
    id: '1',
    leadId: '1',
    type: 'status_change' as const,
    content: 'Lead status changed from New to In Progress',
    timestamp: '2025-05-10T10:30:00Z',
    user: 'Sarah Admin',
    data: {
      fromStatus: 'New',
      toStatus: 'In Progress',
    },
  },
  {
    id: '2',
    leadId: '1',
    type: 'note' as const,
    content: 'Contacted customer via phone. They are interested in getting a quote for a new garage door.',
    timestamp: '2025-05-10T10:35:00Z',
    user: 'Sarah Admin',
  },
  {
    id: '3',
    leadId: '1',
    type: 'appointment' as const,
    content: 'Scheduled an appointment for a site visit to provide a quote.',
    timestamp: '2025-05-10T11:00:00Z',
    user: 'Sarah Admin',
    data: {
      date: 'May 15, 2025',
      time: '2:00  PM - 4:00 PM',
      technician: 'Alex Rodriguez',
    },
  },
  {
    id: '4',
    leadId: '1',
    type: 'quote' as const,
    content: 'Created quote for new garage door installation.',
    timestamp: '2025-05-15T16:30:00Z',
    user: 'Alex Rodriguez',
  },
  {
    id: '5',
    leadId: '1',
    type: 'status_change' as const,
    content: 'Lead status changed from In Progress to Quote Sent',
    timestamp: '2025-05-15T16:45:00Z',
    user: 'Alex Rodriguez',
    data: {
      fromStatus: 'In Progress',
      toStatus: 'Quote Sent',
    },
  },
];