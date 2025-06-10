import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface RescheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: string;
  currentDate?: Date;
  currentTime?: string;
  onReschedule?: (appointmentId: string, newDate: Date, newTime: string, reason?: string) => void;
}

const timeSlots = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
];

export function RescheduleModal({
  open,
  onOpenChange,
  appointmentId,
  currentDate,
  currentTime,
  onReschedule
}: RescheduleModalProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(currentDate);
  const [selectedTime, setSelectedTime] = useState<string>(currentTime || '');
  const [reason, setReason] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: 'Missing Information',
        description: 'Please select both date and time for rescheduling.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await onReschedule?.(appointmentId, selectedDate, selectedTime, reason);
      toast({
        title: 'Appointment Rescheduled',
        description: `Appointment has been rescheduled to ${format(selectedDate, 'PPP')} at ${selectedTime}.`,
      });
      onOpenChange(false);
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setReason('');
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to reschedule appointment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedDate(currentDate);
    setSelectedTime(currentTime || '');
    setReason('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Reschedule Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label className="text-sm font-medium">Select New Date</Label>
            <div className="mt-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className="rounded-md border"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="time-select" className="text-sm font-medium">
              Select New Time
            </Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reason" className="text-sm font-medium">
              Reason for Rescheduling (Optional)
            </Label>
            <Textarea
              id="reason"
              placeholder="Enter reason for rescheduling..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2 h-20 resize-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleReschedule} disabled={isLoading}>
              {isLoading ? 'Rescheduling...' : 'Reschedule'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}