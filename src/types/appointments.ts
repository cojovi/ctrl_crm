// Shared appointment types for consistency across components

export interface BaseAppointment {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceType: string;
  location: string;
  status: string;
  technician: string;
  notes?: string;
  estimatedCost?: number;
}

// For schedule view with Date objects
export interface ScheduleAppointment extends BaseAppointment {
  technicianId: string;
  start: Date;
  end: Date;
}

// For upcoming appointments with string dates/times
export interface UpcomingAppointment extends BaseAppointment {
  date: string;
  time: string;
  duration?: string;
}