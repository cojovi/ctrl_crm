import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Customer {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  projectStatus: string;
  lastContact: string;
  projectValue: number;
  notes: string;
  avatar?: string;
}

export function RecentCustomers() {
  return (
    <div className="space-y-8">
      {recentCustomers.map((customer) => (
        <div key={customer.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={customer.avatar} alt="Avatar" />
            <AvatarFallback>{customer.company.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{customer.company}</p>
            <p className="text-sm text-muted-foreground">
              {customer.contactPerson}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge 
              variant={customer.projectStatus === 'Active' ? 'default' : 
                       customer.projectStatus === 'Planning' ? 'secondary' : 
                       customer.projectStatus === 'On Hold' ? 'outline' : 
                       customer.projectStatus === 'Completed' ? 'default' : 'default'}
              className={customer.projectStatus === 'Active' ? 'bg-teal-500 hover:bg-teal-600' : 
                         customer.projectStatus === 'Planning' ? 'bg-amber-500 hover:bg-amber-600' : 
                         customer.projectStatus === 'Completed' ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              {customer.projectStatus}
            </Badge>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

const recentCustomers: Customer[] = [
  {
    id: '1',
    company: 'Viveiros Custom Homes',
    contactPerson: 'Maria Viveiros',
    email: 'maria@viveiroscustomhomes.com',
    phone: '(555) 234-7890',
    address: '1247 Oakwood Drive, San Rafael, CA 94901',
    projectStatus: 'Active',
    lastContact: '2025-01-14',
    projectValue: 125000,
    notes: 'Luxury custom home project requiring premium garage door systems with smart home integration. Multiple bay doors needed.'
  },
  {
    id: '2',
    company: 'Corbin Casa\'s',
    contactPerson: 'James Corbin',
    email: 'james@corbincasas.com',
    phone: '(555) 345-8901',
    address: '892 Hillside Avenue, Mill Valley, CA 94941',
    projectStatus: 'Planning',
    lastContact: '2025-01-12',
    projectValue: 85000,
    notes: 'Mid-century modern renovation project. Client interested in minimalist garage door designs with wood accents.'
  },
  {
    id: '3',
    company: 'Amaya Amazing Abodes',
    contactPerson: 'Sofia Amaya',
    email: 'sofia@amayaabodes.com',
    phone: '(555) 456-9012',
    address: '2156 Sunset Boulevard, Sausalito, CA 94965',
    projectStatus: 'Active',
    lastContact: '2025-01-15',
    projectValue: 95000,
    notes: 'Contemporary home construction with emphasis on energy efficiency. Insulated garage doors with windows required.'
  },
  {
    id: '4',
    company: 'Carolyns Cribs',
    contactPerson: 'Carolyn Mitchell',
    email: 'carolyn@carolynscribs.com',
    phone: '(555) 567-0123',
    address: '743 Redwood Lane, Novato, CA 94947',
    projectStatus: 'On Hold',
    lastContact: '2025-01-08',
    projectValue: 67000,
    notes: 'Family home renovation project currently on hold due to permit delays. Standard residential garage door replacement.'
  },
  {
    id: '5',
    company: 'Teresa\'s Tidy Houses',
    contactPerson: 'Teresa Rodriguez',
    email: 'teresa@teresastidyhouses.com',
    phone: '(555) 678-1234',
    address: '1589 Garden Street, Petaluma, CA 94952',
    projectStatus: 'Completed',
    lastContact: '2025-01-03',
    projectValue: 45000,
    notes: 'Recently completed flip project. Installed cost-effective garage door solutions for resale property.'
  },
  {
    id: '6',
    company: 'Cojovi Homes',
    contactPerson: 'Vincent Cojovi',
    email: 'vincent@cojovihomes.com',
    phone: '(555) 789-2345',
    address: '3421 Marina Drive, San Anselmo, CA 94960',
    projectStatus: 'Planning',
    lastContact: '2025-01-10',
    projectValue: 110000,
    notes: 'High-end custom home development. Seeking premium garage door solutions with commercial-grade materials and finishes.'
  },
];