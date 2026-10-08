import { addDays, addMinutes, setHours, setMinutes, startOfWeek } from 'date-fns';

const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

function at(dayOffset: number, hour: number, minute: number) {
  return setMinutes(setHours(addDays(weekStart, dayOffset), hour), minute);
}

function daysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

export const technicians = [
  {
    id: 'tech-1',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@ctrlaltgarage.com',
    phone: '(415) 555-0142',
    skills: ['Sectional Install', 'Torsion Springs', 'Commercial Doors'],
    specialties: ['Sectional Install', 'Torsion Springs', 'Commercial Doors'],
    status: 'Available' as const,
    rating: 4.9,
    completedJobs: 312,
    current_location: { lat: 37.7749, lng: -122.4194, address: 'Mission District, San Francisco' },
    location: { lat: 37.7749, lng: -122.4194, address: 'Mission District, San Francisco' },
    experience: '8 years',
    certifications: ['IDEA Certified', 'OSHA 30', 'LiftMaster Pro'],
    joinDate: '2018-03-12',
    color: 'bg-teal-500',
  },
  {
    id: 'tech-2',
    name: 'Carlos Mendez',
    email: 'carlos.mendez@ctrlaltgarage.com',
    phone: '(510) 555-0177',
    skills: ['Opener Repair', 'Belt Drive', 'Smart Openers'],
    specialties: ['Opener Repair', 'Belt Drive', 'Smart Openers'],
    status: 'Busy' as const,
    rating: 4.8,
    completedJobs: 241,
    current_location: { lat: 37.8044, lng: -122.2712, address: 'Lake Merritt, Oakland' },
    location: { lat: 37.8044, lng: -122.2712, address: 'Lake Merritt, Oakland' },
    experience: '6 years',
    certifications: ['Chamberlain Certified', 'Low Voltage', 'OSHA 10'],
    joinDate: '2020-01-20',
    nextAvailable: '3:30 PM',
    color: 'bg-amber-500',
  },
  {
    id: 'tech-3',
    name: 'Jessica Taylor',
    email: 'jessica.taylor@ctrlaltgarage.com',
    phone: '(650) 555-0194',
    skills: ['Panel Replacement', 'Insulation', 'Custom Wood Doors'],
    specialties: ['Panel Replacement', 'Insulation', 'Custom Wood Doors'],
    status: 'Available' as const,
    rating: 4.7,
    completedJobs: 198,
    current_location: { lat: 37.4419, lng: -122.143, address: 'Downtown Palo Alto' },
    location: { lat: 37.4419, lng: -122.143, address: 'Downtown Palo Alto' },
    experience: '5 years',
    certifications: ['Clopay Installer', 'Custom Door Fabrication'],
    joinDate: '2021-06-02',
    color: 'bg-purple-500',
  },
  {
    id: 'tech-4',
    name: 'David Brown',
    email: 'david.brown@ctrlaltgarage.com',
    phone: '(408) 555-0118',
    skills: ['Cables & Rollers', 'Weather Seal', 'Preventive Maintenance'],
    specialties: ['Cables & Rollers', 'Weather Seal', 'Preventive Maintenance'],
    status: 'Available' as const,
    rating: 4.8,
    completedJobs: 267,
    current_location: null,
    location: null,
    experience: '9 years',
    certifications: ['IDEA Certified', 'Safety Inspection'],
    joinDate: '2017-09-14',
    color: 'bg-lime-500',
  },
  {
    id: 'tech-5',
    name: 'Maria Garcia',
    email: 'maria.garcia@ctrlaltgarage.com',
    phone: '(925) 555-0160',
    skills: ['Emergency Service', 'Off-Track Doors', 'Spring Repair'],
    specialties: ['Emergency Service', 'Off-Track Doors', 'Spring Repair'],
    status: 'Off Duty' as const,
    rating: 4.9,
    completedJobs: 224,
    current_location: { lat: 37.9101, lng: -122.0652, address: 'Walnut Creek yard' },
    location: { lat: 37.9101, lng: -122.0652, address: 'Walnut Creek yard' },
    experience: '7 years',
    certifications: ['Emergency Response', 'Torsion Spring Specialist'],
    joinDate: '2019-04-08',
    nextAvailable: 'Tomorrow 8:00 AM',
    color: 'bg-blue-500',
  },
  {
    id: 'tech-6',
    name: 'Priya Shah',
    email: 'priya.shah@ctrlaltgarage.com',
    phone: '(415) 555-0133',
    skills: ['Commercial Operators', 'Rolling Steel', 'Loading Docks'],
    specialties: ['Commercial Operators', 'Rolling Steel', 'Loading Docks'],
    status: 'Busy' as const,
    rating: 4.8,
    completedJobs: 176,
    current_location: { lat: 37.789, lng: -122.401, address: 'SOMA warehouse row' },
    location: { lat: 37.789, lng: -122.401, address: 'SOMA warehouse row' },
    experience: '6 years',
    certifications: ['Commercial Door Tech', 'Fire Door Inspection'],
    joinDate: '2020-11-03',
    nextAvailable: '5:00 PM',
    color: 'bg-rose-500',
  },
  {
    id: 'tech-7',
    name: 'Nate Coleman',
    email: 'nate.coleman@ctrlaltgarage.com',
    phone: '(408) 555-0186',
    skills: ['Wi-Fi Openers', 'myQ Setup', 'Keypad Programming'],
    specialties: ['Wi-Fi Openers', 'myQ Setup', 'Keypad Programming'],
    status: 'Available' as const,
    rating: 4.6,
    completedJobs: 143,
    current_location: { lat: 37.3688, lng: -122.0363, address: 'Sunnyvale' },
    location: { lat: 37.3688, lng: -122.0363, address: 'Sunnyvale' },
    experience: '4 years',
    certifications: ['LiftMaster myQ', 'Genie Aladdin Connect'],
    joinDate: '2022-02-16',
    color: 'bg-cyan-500',
  },
  {
    id: 'tech-8',
    name: 'Elena Vasquez',
    email: 'elena.vasquez@ctrlaltgarage.com',
    phone: '(510) 555-0129',
    skills: ['New Construction', 'Carriage House', 'Glass Panel Doors'],
    specialties: ['New Construction', 'Carriage House', 'Glass Panel Doors'],
    status: 'Available' as const,
    rating: 4.9,
    completedJobs: 158,
    current_location: { lat: 37.8715, lng: -122.273, address: 'Berkeley' },
    location: { lat: 37.8715, lng: -122.273, address: 'Berkeley' },
    experience: '5 years',
    certifications: ['Amarr Certified', 'Custom Glass Install'],
    joinDate: '2021-08-30',
    color: 'bg-orange-500',
  },
];

type CustomerStatus = 'Active' | 'Inactive' | 'VIP';

const customerSeeds: Array<{
  name: string;
  city: string;
  zip: string;
  street: string;
  status: CustomerStatus;
  spent: number;
  services: number;
  since: string;
  last: string;
  next?: string;
  notes: string;
  phone: string;
}> = [
  { name: 'John Smith', city: 'San Francisco', zip: '94105', street: '123 Main Street', status: 'VIP', spent: 8450, services: 11, since: '3 years 2 months', last: '2026-09-28', next: '2026-12-15', notes: 'Always asks for Alex. Two-car garage, morning windows only.', phone: '(415) 555-2201' },
  { name: 'Sarah Johnson', city: 'Oakland', zip: '94610', street: '456 Oak Avenue', status: 'Active', spent: 3120, services: 6, since: '2 years 4 months', last: '2026-10-02', next: '2027-01-08', notes: 'Two dogs. Ring the bell, do not knock.', phone: '(510) 555-2202' },
  { name: 'Michael Brown', city: 'Berkeley', zip: '94704', street: '789 Pine Road', status: 'Active', spent: 1890, services: 3, since: '1 year 4 months', last: '2026-08-19', next: '2026-11-19', notes: 'Works from home. Any arrival window is fine.', phone: '(510) 555-2203' },
  { name: 'Emily Davis', city: 'San Mateo', zip: '94401', street: '321 Cedar Lane', status: 'Inactive', spent: 620, services: 2, since: '4 years 1 month', last: '2025-11-02', notes: 'Moved last winter. Confirm the new address before booking.', phone: '(650) 555-2204' },
  { name: 'Robert Wilson', city: 'San Jose', zip: '95112', street: '654 Elm Street', status: 'Active', spent: 4680, services: 8, since: '2 years 8 months', last: '2026-09-14', next: '2026-12-02', notes: 'Weekend appointments. Gate code 4419.', phone: '(408) 555-2205' },
  { name: 'Lisa Anderson', city: 'Fremont', zip: '94536', street: '987 Maple Drive', status: 'VIP', spent: 12640, services: 16, since: '4 years 6 months', last: '2026-10-06', next: '2026-11-20', notes: 'Owns three rental properties. Wants itemized invoices.', phone: '(510) 555-2206' },
  { name: 'James Martinez', city: 'Hayward', zip: '94541', street: '159 Birch Avenue', status: 'Active', spent: 2140, services: 5, since: '1 year 11 months', last: '2026-07-22', next: '2026-10-22', notes: 'Senior discount on file. Prefers Carlos.', phone: '(510) 555-2207' },
  { name: 'Jennifer Lee', city: 'Mountain View', zip: '94041', street: '753 Walnut Street', status: 'VIP', spent: 5920, services: 9, since: '2 years 6 months', last: '2026-09-30', next: '2026-12-30', notes: 'Wants text updates and a myQ opener on every job.', phone: '(650) 555-2208' },
  { name: 'Olivia Martin', city: 'Palo Alto', zip: '94301', street: '88 University Avenue', status: 'Active', spent: 2750, services: 4, since: '11 months', last: '2026-10-01', next: '2027-01-01', notes: 'New construction. Builder is still on site until 4 PM.', phone: '(650) 555-2209' },
  { name: 'Noah Patel', city: 'Sunnyvale', zip: '94086', street: '410 Eleanor Way', status: 'Active', spent: 1540, services: 3, since: '8 months', last: '2026-09-05', next: '2026-12-05', notes: 'HOA requires carriage-house style panels.', phone: '(408) 555-2210' },
  { name: 'Ava Chen', city: 'Daly City', zip: '94015', street: '22 Hillcrest Boulevard', status: 'Active', spent: 980, services: 2, since: '6 months', last: '2026-08-11', next: '2026-11-11', notes: 'Steep driveway. Park on the street.', phone: '(415) 555-2211' },
  { name: 'William Kim', city: 'Redwood City', zip: '94063', street: '1405 Broadway', status: 'VIP', spent: 7340, services: 10, since: '3 years 9 months', last: '2026-10-04', next: '2026-11-18', notes: 'Commercial bay plus a residential door at the house.', phone: '(650) 555-2212' },
  { name: 'Sofia Alvarez', city: 'Concord', zip: '94520', street: '67 Todos Santos', status: 'Active', spent: 1325, services: 3, since: '1 year 2 months', last: '2026-06-18', next: '2026-10-18', notes: 'Spanish-speaking household. Elena is the preferred tech.', phone: '(925) 555-2213' },
  { name: 'Ethan Brooks', city: 'Walnut Creek', zip: '94596', street: '900 Ygnacio Valley Road', status: 'Inactive', spent: 410, services: 1, since: '2 years', last: '2025-04-09', notes: 'One-time spring job. No maintenance plan.', phone: '(925) 555-2214' },
  { name: 'Maya Thompson', city: 'Alameda', zip: '94501', street: '1510 Webster Street', status: 'Active', spent: 3560, services: 6, since: '1 year 7 months', last: '2026-09-21', next: '2026-12-21', notes: 'Island access. Morning ferry traffic, arrive after 9.', phone: '(510) 555-2215' },
  { name: 'Daniel Okonkwo', city: 'Santa Clara', zip: '95050', street: '2755 El Camino Real', status: 'VIP', spent: 9810, services: 13, since: '5 years', last: '2026-10-07', next: '2026-11-04', notes: 'Shop account. Net-30 billing. Three bay doors.', phone: '(408) 555-2216' },
];

export const customers = customerSeeds.map((seed, index) => {
  const tech = technicians[index % technicians.length].name;
  const slug = seed.name.toLowerCase().replace(/ /g, '.');
  return {
    id: String(index + 1),
    name: seed.name,
    email: `${slug}@email.com`,
    phone: seed.phone,
    address: seed.street,
    city: seed.city,
    state: 'CA',
    zip: seed.zip,
    status: seed.status,
    totalSpent: seed.spent,
    lastService: seed.last,
    nextMaintenance: seed.next,
    serviceCount: seed.services,
    notes: seed.notes,
    joinDate: '2022-04-12',
    customerSince: seed.since,
    preferences: index % 2 === 0
      ? ['Text updates', 'Morning window']
      : ['Email invoice', 'Afternoon window'],
    serviceHistory: [
      { id: `${index}-a`, date: seed.last, service: 'Seasonal tune-up', technician: tech, amount: 165, status: 'Completed' as const },
      { id: `${index}-b`, date: '2026-06-14', service: 'Spring and cable service', technician: technicians[(index + 1) % technicians.length].name, amount: 420, status: 'Completed' as const },
      { id: `${index}-c`, date: '2025-11-03', service: 'Opener replacement', technician: technicians[(index + 2) % technicians.length].name, amount: 890, status: 'Completed' as const },
    ],
    equipment: [
      {
        id: `${index}-eq`,
        type: index % 3 === 0 ? 'Garage Door' : 'Garage Door Opener',
        model: ['Clopay Gallery', 'LiftMaster 87504', 'Amarr Classica', 'Chamberlain B6753'][index % 4],
        installDate: '2023-05-15',
        warrantyExpires: '2028-05-15',
        lastMaintenance: seed.last,
        nextMaintenance: seed.next ?? 'Not scheduled',
      },
    ],
  };
});

const leadStatuses = ['New', 'In Progress', 'Quote Sent', 'Closed Won', 'Closed Lost'] as const;
const serviceTypes = ['Installation', 'Repair', 'Replacement', 'Inspection', 'Spring Replacement', 'Opener Upgrade', 'Emergency', 'Maintenance'];
const sources = ['Website', 'Google Ads', 'Referral', 'Yelp', 'Nextdoor', 'Repeat customer'];
const doorTypes = ['Sectional', 'Carriage House', 'Roll-Up', 'Contemporary Glass'];
const materials = ['Steel', 'Insulated Steel', 'Wood Composite', 'Aluminum & Glass'];
const colors = ['White', 'Almond', 'Black', 'Charcoal', 'Walnut'];
const openers = ['Belt Drive', 'Wall Mount', 'Chain Drive', 'Jackshaft'];

export const leads = customers.slice(0, 16).map((customer, index) => ({
  id: String(index + 1),
  customer: customer.name,
  customerName: customer.name,
  email: customer.email,
  phone: customer.phone,
  address: `${customer.address}, ${customer.city}, ${customer.state} ${customer.zip}`,
  status: leadStatuses[index % leadStatuses.length],
  serviceType: serviceTypes[index % serviceTypes.length],
  createdAt: daysAgo(index + 1),
  value: [2450, 380, 6200, 175, 890, 4100, 540, 1850, 960, 7300, 290, 1540, 480, 2200, 125, 8600][index],
  source: sources[index % sources.length],
  doorType: doorTypes[index % doorTypes.length],
  doorSize: ['8x7', '9x7', '16x7', '16x8', '18x8'][index % 5],
  material: materials[index % materials.length],
  color: colors[index % colors.length],
  windows: index % 2 === 0 ? 'Top row, insulated' : 'None',
  opener: openers[index % openers.length],
  notes: customer.notes,
}));

export const recentLeads = leads.slice(0, 6).map((lead) => ({
  id: lead.id,
  name: lead.customerName,
  email: lead.email,
  avatar: '',
  status: lead.status,
}));

export const timelineEvents: Array<{
  id: string;
  leadId: string;
  type: 'status_change' | 'note' | 'appointment' | 'quote';
  content: string;
  timestamp: string;
  user: string;
  data?: Record<string, string>;
}> = leads.flatMap((lead) => [
  {
    id: `${lead.id}-created`,
    leadId: lead.id,
    type: 'note' as const,
    content: `Lead created from ${lead.source}. ${lead.notes}`,
    timestamp: lead.createdAt,
    user: 'Admin',
  },
  {
    id: `${lead.id}-quote`,
    leadId: lead.id,
    type: 'quote' as const,
    content: `Draft quote prepared for ${lead.serviceType.toLowerCase()} at $${lead.value.toFixed(2)}.`,
    timestamp: daysAgo(Math.max(0, Number(lead.id) - 1)),
    user: technicians[Number(lead.id) % technicians.length].name,
  },
  {
    id: `${lead.id}-status`,
    leadId: lead.id,
    type: 'status_change' as const,
    content: `Status set to ${lead.status}.`,
    timestamp: daysAgo(Math.max(0, Number(lead.id) - 2)),
    user: 'Admin',
    data: {
      fromStatus: lead.status === 'New' ? 'Uncontacted' : 'New',
      toStatus: lead.status,
    },
  },
]);

const appointmentSeeds = [
  { day: 0, hour: 8, minute: 0, duration: 120, customer: 'John Smith', service: 'Sectional install', tech: 'tech-1', status: 'Completed', city: 'San Francisco' },
  { day: 0, hour: 11, minute: 0, duration: 90, customer: 'Ava Chen', service: 'Off-track repair', tech: 'tech-5', status: 'Completed', city: 'Daly City' },
  { day: 0, hour: 14, minute: 0, duration: 60, customer: 'Noah Patel', service: 'Safety inspection', tech: 'tech-4', status: 'Completed', city: 'Sunnyvale' },
  { day: 1, hour: 8, minute: 30, duration: 150, customer: 'Daniel Okonkwo', service: 'Commercial bay door', tech: 'tech-6', status: 'Completed', city: 'Santa Clara' },
  { day: 1, hour: 13, minute: 0, duration: 90, customer: 'Maya Thompson', service: 'Opener upgrade', tech: 'tech-7', status: 'Completed', city: 'Alameda' },
  { day: 2, hour: 9, minute: 0, duration: 120, customer: 'Lisa Anderson', service: 'Rental property tune-up', tech: 'tech-3', status: 'Completed', city: 'Fremont' },
  { day: 2, hour: 13, minute: 30, duration: 75, customer: 'Sofia Alvarez', service: 'Spring replacement', tech: 'tech-8', status: 'Completed', city: 'Concord' },
  { day: 3, hour: 8, minute: 0, duration: 90, customer: 'Sarah Johnson', service: 'Opener repair', tech: 'tech-2', status: 'In Progress', city: 'Oakland' },
  { day: 3, hour: 10, minute: 30, duration: 120, customer: 'William Kim', service: 'Glass panel install', tech: 'tech-8', status: 'Confirmed', city: 'Redwood City' },
  { day: 3, hour: 14, minute: 0, duration: 60, customer: 'James Martinez', service: 'Cable replacement', tech: 'tech-4', status: 'Confirmed', city: 'Hayward' },
  { day: 4, hour: 8, minute: 0, duration: 180, customer: 'Olivia Martin', service: 'New construction install', tech: 'tech-1', status: 'Confirmed', city: 'Palo Alto' },
  { day: 4, hour: 13, minute: 0, duration: 90, customer: 'Jennifer Lee', service: 'myQ setup', tech: 'tech-7', status: 'Confirmed', city: 'Mountain View' },
  { day: 4, hour: 15, minute: 30, duration: 45, customer: 'Ethan Brooks', service: 'Quote walkthrough', tech: 'tech-3', status: 'Cancelled', city: 'Walnut Creek' },
  { day: 5, hour: 9, minute: 0, duration: 120, customer: 'Robert Wilson', service: 'Weather seal + rollers', tech: 'tech-4', status: 'Confirmed', city: 'San Jose' },
  { day: 5, hour: 13, minute: 0, duration: 150, customer: 'Lisa Anderson', service: 'Second property install', tech: 'tech-6', status: 'Confirmed', city: 'Fremont' },
  { day: 6, hour: 10, minute: 0, duration: 90, customer: 'Michael Brown', service: 'Emergency spring', tech: 'tech-5', status: 'Confirmed', city: 'Berkeley' },
];

export const appointments = appointmentSeeds.map((job, index) => ({
  id: String(index + 1),
  customerName: job.customer,
  serviceType: job.service,
  location: `${job.city}, CA`,
  status: job.status,
  technicianId: job.tech,
  technician: technicians.find((tech) => tech.id === job.tech)?.name ?? 'Unassigned',
  start: at(job.day, job.hour, job.minute),
  end: addMinutes(at(job.day, job.hour, job.minute), job.duration),
}));

export const upcomingAppointments = appointments
  .filter((appointment) => appointment.status !== 'Completed' && appointment.status !== 'Cancelled')
  .slice(0, 6)
  .map((appointment) => ({
    id: appointment.id,
    serviceType: appointment.serviceType,
    date: appointment.start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    time: `${appointment.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${appointment.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`,
    customer: appointment.customerName,
    location: appointment.location,
    technician: appointment.technician,
    status: appointment.status,
  }));

export const inventoryItems = [
  { id: 'inv-1', name: 'Torsion spring pair, .250 wire', sku: 'SPR-250-P', category: 'Springs', quantity: 18, reorderPoint: 8, unitPrice: 86, location: 'Aisle A1' },
  { id: 'inv-2', name: 'Torsion spring pair, .207 wire', sku: 'SPR-207-P', category: 'Springs', quantity: 4, reorderPoint: 8, unitPrice: 74, location: 'Aisle A1' },
  { id: 'inv-3', name: 'Extension spring, 160 lb', sku: 'SPR-EXT-160', category: 'Springs', quantity: 0, reorderPoint: 6, unitPrice: 42, location: 'Aisle A2' },
  { id: 'inv-4', name: 'LiftMaster 87504-267 belt opener', sku: 'OPN-LM-87504', category: 'Openers', quantity: 7, reorderPoint: 3, unitPrice: 428, location: 'Cage B' },
  { id: 'inv-5', name: 'Chamberlain B6753T wall mount', sku: 'OPN-CH-B6753', category: 'Openers', quantity: 2, reorderPoint: 2, unitPrice: 512, location: 'Cage B' },
  { id: 'inv-6', name: 'Genie 6170 chain drive', sku: 'OPN-GE-6170', category: 'Openers', quantity: 5, reorderPoint: 2, unitPrice: 219, location: 'Cage B' },
  { id: 'inv-7', name: 'Steel panel, white short', sku: 'PNL-ST-WHT-S', category: 'Panels', quantity: 24, reorderPoint: 10, unitPrice: 64, location: 'Rack C3' },
  { id: 'inv-8', name: 'Insulated panel, black long', sku: 'PNL-IN-BLK-L', category: 'Panels', quantity: 6, reorderPoint: 8, unitPrice: 118, location: 'Rack C4' },
  { id: 'inv-9', name: 'Carriage house overlay, walnut', sku: 'PNL-CH-WAL', category: 'Panels', quantity: 3, reorderPoint: 2, unitPrice: 246, location: 'Rack C1' },
  { id: 'inv-10', name: 'Nylon roller, 13-ball', sku: 'HRD-RLR-13', category: 'Hardware', quantity: 80, reorderPoint: 24, unitPrice: 6.5, location: 'Bin D12' },
  { id: 'inv-11', name: 'Steel roller, 2 inch', sku: 'HRD-RLR-ST', category: 'Hardware', quantity: 12, reorderPoint: 20, unitPrice: 4.25, location: 'Bin D13' },
  { id: 'inv-12', name: 'Lift cable, 8 ft', sku: 'HRD-CBL-8', category: 'Hardware', quantity: 15, reorderPoint: 10, unitPrice: 18, location: 'Bin D2' },
  { id: 'inv-13', name: 'Bottom seal, 16 ft', sku: 'WTH-BSEAL-16', category: 'Weatherstrip', quantity: 22, reorderPoint: 8, unitPrice: 27, location: 'Aisle E' },
  { id: 'inv-14', name: 'Side seal kit', sku: 'WTH-SIDE', category: 'Weatherstrip', quantity: 1, reorderPoint: 6, unitPrice: 34, location: 'Aisle E' },
  { id: 'inv-15', name: '3-button remote', sku: 'RMT-3BTN', category: 'Remotes', quantity: 40, reorderPoint: 12, unitPrice: 29, location: 'Counter' },
  { id: 'inv-16', name: 'Wireless keypad', sku: 'RMT-KEYPAD', category: 'Remotes', quantity: 9, reorderPoint: 6, unitPrice: 48, location: 'Counter' },
  { id: 'inv-17', name: 'myQ hub', sku: 'SMT-MYQ', category: 'Smart', quantity: 0, reorderPoint: 4, unitPrice: 39, location: 'Counter' },
  { id: 'inv-18', name: 'Safety sensor pair', sku: 'SAF-SENSOR', category: 'Safety', quantity: 14, reorderPoint: 6, unitPrice: 32, location: 'Bin F4' },
  { id: 'inv-19', name: 'Hinge, #1', sku: 'HRD-HNG-1', category: 'Hardware', quantity: 60, reorderPoint: 20, unitPrice: 3.1, location: 'Bin D8' },
  { id: 'inv-20', name: 'Strut, 2 inch', sku: 'HRD-STRUT-2', category: 'Hardware', quantity: 11, reorderPoint: 8, unitPrice: 22, location: 'Rack C6' },
  { id: 'inv-21', name: 'Commercial operator, 1/2 HP', sku: 'OPN-COM-12', category: 'Openers', quantity: 2, reorderPoint: 1, unitPrice: 890, location: 'Cage B' },
  { id: 'inv-22', name: 'Window insert, cascade', sku: 'PNL-WIN-CAS', category: 'Panels', quantity: 16, reorderPoint: 6, unitPrice: 41, location: 'Rack C2' },
];

export function stockStatus(item: { quantity: number; reorderPoint: number }) {
  if (item.quantity === 0) return 'Out of Stock';
  if (item.quantity <= item.reorderPoint) return 'Low Stock';
  return 'In Stock';
}

export const inventoryValue = inventoryItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

export const notifications = [
  { id: '1', type: 'emergency' as const, priority: 'high' as const, title: 'Door stuck halfway', message: 'Ava Chen in Daly City reports the door stopped mid-travel. Maria is closest.', timestamp: new Date(Date.now() - 18 * 60 * 1000), read: false, actionRequired: true },
  { id: '2', type: 'schedule' as const, priority: 'high' as const, title: 'Overlap on Friday morning', message: 'Alex is booked for Olivia Martin at 8:00 and a callback in San Mateo at 8:30.', timestamp: new Date(Date.now() - 50 * 60 * 1000), read: false, actionRequired: true },
  { id: '3', type: 'maintenance' as const, priority: 'medium' as const, title: 'Low stock: .207 springs', message: 'Only 4 torsion spring pairs left. Reorder point is 8.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), read: false, actionRequired: true },
  { id: '4', type: 'feedback' as const, priority: 'low' as const, title: '5-star review from Jennifer Lee', message: '"Nate had the myQ app working before he left the driveway."', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), read: true, actionRequired: false },
  { id: '5', type: 'system' as const, priority: 'low' as const, title: 'Quote PDFs exported', message: '12 quotes from this week were saved to the office drive.', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), read: true, actionRequired: false },
  { id: '6', type: 'schedule' as const, priority: 'medium' as const, title: 'Ethan Brooks cancelled', message: 'Saturday quote walkthrough in Walnut Creek was cancelled by the customer.', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), read: false, actionRequired: false },
  { id: '7', type: 'emergency' as const, priority: 'high' as const, title: 'Broken spring, Berkeley', message: 'Michael Brown can hear a loud bang. Door will not open. Offer the Sunday slot.', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), read: false, actionRequired: true },
  { id: '8', type: 'maintenance' as const, priority: 'medium' as const, title: 'myQ hubs are out', message: 'SKU SMT-MYQ is at zero. Two installs next week need a hub.', timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), read: false, actionRequired: true },
  { id: '9', type: 'feedback' as const, priority: 'medium' as const, title: 'HOA note from Noah Patel', message: 'Sunnyvale HOA rejected the first panel sample. They want the walnut overlay.', timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000), read: true, actionRequired: true },
  { id: '10', type: 'schedule' as const, priority: 'low' as const, title: 'Daniel Okonkwo net-30 reminder', message: 'Shop account invoice 1842 is due Friday.', timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), read: true, actionRequired: false },
  { id: '11', type: 'system' as const, priority: 'low' as const, title: 'Route sheets printed', message: 'Tomorrow’s routes for Alex, Elena, and Nate are ready at the front desk.', timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), read: true, actionRequired: false },
  { id: '12', type: 'maintenance' as const, priority: 'high' as const, title: 'Side seal kits nearly gone', message: 'One kit left in aisle E. Four maintenance jobs this week use that seal.', timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000), read: false, actionRequired: true },
  { id: '13', type: 'feedback' as const, priority: 'low' as const, title: 'Referral from Robert Wilson', message: 'His neighbor on Elm Street wants a 16x7 insulated door quote.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), read: true, actionRequired: false },
  { id: '14', type: 'schedule' as const, priority: 'medium' as const, title: 'Priya running long in SOMA', message: 'Commercial operator install is 40 minutes over. Push the Fremont stop.', timestamp: new Date(Date.now() - 40 * 60 * 1000), read: false, actionRequired: true },
];

export const revenueByMonth = [
  { name: 'Jan', revenue: 41200, appointments: 86, leads: 34 },
  { name: 'Feb', revenue: 38640, appointments: 79, leads: 29 },
  { name: 'Mar', revenue: 45110, appointments: 94, leads: 41 },
  { name: 'Apr', revenue: 42880, appointments: 88, leads: 36 },
  { name: 'May', revenue: 47350, appointments: 101, leads: 44 },
  { name: 'Jun', revenue: 51220, appointments: 110, leads: 48 },
  { name: 'Jul', revenue: 49860, appointments: 106, leads: 42 },
  { name: 'Aug', revenue: 53410, appointments: 114, leads: 51 },
  { name: 'Sep', revenue: 56180, appointments: 121, leads: 47 },
  { name: 'Oct', revenue: 38940, appointments: 74, leads: 28 },
];

export const customerRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
export const newLeadCount = leads.filter((lead) => lead.status === 'New').length;
