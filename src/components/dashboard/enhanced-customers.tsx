import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AddCustomerForm } from '@/components/forms/add-customer-form';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign,
  History,
  Settings,
  Search,
  UserPlus
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  avatar?: string;
  status: 'Active' | 'Inactive' | 'VIP';
  totalSpent: number;
  lastService: string;
  nextMaintenance?: string;
  serviceHistory: ServiceRecord[];
  equipment: Equipment[];
  preferences: string[];
  notes: string;
  joinDate: string;
  customerSince: string;
}

interface ServiceRecord {
  id: string;
  date: string;
  service: string;
  technician: string;
  amount: number;
  status: 'Completed' | 'Scheduled' | 'Cancelled';
}

interface Equipment {
  id: string;
  type: string;
  model: string;
  installDate: string;
  warrantyExpires: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    status: 'VIP',
    totalSpent: 4850.00,
    lastService: '2025-01-10',
    nextMaintenance: '2025-03-15',
    serviceHistory: [
      { id: '1', date: '2025-01-10', service: 'Garage Door Installation', technician: 'Alex Rodriguez', amount: 1200, status: 'Completed' },
      { id: '2', date: '2024-11-15', service: 'Maintenance Check', technician: 'Carlos Mendez', amount: 150, status: 'Completed' },
      { id: '3', date: '2024-08-20', service: 'Spring Replacement', technician: 'Alex Rodriguez', amount: 350, status: 'Completed' }
    ],
    equipment: [
      { id: '1', type: 'Garage Door', model: 'Clopay Gallery Series', installDate: '2023-05-15', warrantyExpires: '2028-05-15', lastMaintenance: '2025-01-10', nextMaintenance: '2025-07-10' }
    ],
    preferences: ['Weekend appointments', 'Email reminders', 'Text notifications'],
    notes: 'VIP customer - always requests Alex Rodriguez. Prefers morning appointments.',
    joinDate: '2023-05-15',
    customerSince: '1 year 8 months'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 234-5678',
    address: '456 Oak Avenue',
    city: 'Oakland',
    state: 'CA',
    zip: '94610',
    status: 'Active',
    totalSpent: 2340.00,
    lastService: '2025-01-08',
    nextMaintenance: '2025-04-08',
    serviceHistory: [
      { id: '1', date: '2025-01-08', service: 'Opener Repair', technician: 'Jessica Taylor', amount: 285, status: 'Completed' },
      { id: '2', date: '2024-09-12', service: 'Annual Maintenance', technician: 'David Brown', amount: 120, status: 'Completed' }
    ],
    equipment: [
      { id: '1', type: 'Garage Door Opener', model: 'LiftMaster 8500W', installDate: '2022-09-12', warrantyExpires: '2027-09-12', lastMaintenance: '2025-01-08', nextMaintenance: '2025-04-08' }
    ],
    preferences: ['Evening appointments', 'Phone calls only'],
    notes: 'Has two dogs - ring doorbell instead of knocking.',
    joinDate: '2022-09-12',
    customerSince: '2 years 4 months'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 345-6789',
    address: '789 Pine Road',
    city: 'Berkeley',
    state: 'CA',
    zip: '94704',
    status: 'Active',
    totalSpent: 1890.00,
    lastService: '2024-12-15',
    serviceHistory: [
      { id: '1', date: '2024-12-15', service: 'Emergency Repair', technician: 'Carlos Mendez', amount: 425, status: 'Completed' },
      { id: '2', date: '2024-06-20', service: 'Installation', technician: 'Alex Rodriguez', amount: 950, status: 'Completed' }
    ],
    equipment: [
      { id: '1', type: 'Garage Door', model: 'Amarr Classica', installDate: '2024-06-20', warrantyExpires: '2029-06-20', lastMaintenance: '2024-12-15', nextMaintenance: '2025-06-20' }
    ],
    preferences: ['Flexible timing', 'Text notifications'],
    notes: 'Works from home - any time is convenient.',
    joinDate: '2024-06-20',
    customerSince: '7 months'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 456-7890',
    address: '321 Cedar Lane',
    city: 'San Mateo',
    state: 'CA',
    zip: '94401',
    status: 'Inactive',
    totalSpent: 620.00,
    lastService: '2024-08-30',
    serviceHistory: [
      { id: '1', date: '2024-08-30', service: 'Maintenance', technician: 'Maria Garcia', amount: 135, status: 'Completed' },
      { id: '2', date: '2024-03-15', service: 'Repair', technician: 'David Brown', amount: 485, status: 'Completed' }
    ],
    equipment: [
      { id: '1', type: 'Garage Door Opener', model: 'Chamberlain B970', installDate: '2021-03-15', warrantyExpires: '2024-03-15', lastMaintenance: '2024-08-30', nextMaintenance: 'Overdue' }
    ],
    preferences: ['Email only', 'Daytime appointments'],
    notes: 'Customer moved - update address if they contact us.',
    joinDate: '2021-03-15',
    customerSince: '3 years 10 months'
  }
];

export function EnhancedCustomers() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [addCustomerModalOpen, setAddCustomerModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-purple-500 hover:bg-purple-600';
      case 'Active': return 'bg-green-500 hover:bg-green-600';
      case 'Inactive': return 'bg-gray-500 hover:bg-gray-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchQuery === '' || 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'totalSpent': return b.totalSpent - a.totalSpent;
      case 'lastService': return new Date(b.lastService).getTime() - new Date(a.lastService).getTime();
      default: return 0;
    }
  });

  const handleAddCustomer = (newCustomer: any) => {
    setCustomers(prev => [...prev, newCustomer]);
    toast({
      title: 'Customer Added',
      description: `${newCustomer.name} has been added to your customer database.`,
    });
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const vipCustomers = customers.filter(c => c.status === 'VIP').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Registered customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Badge className="bg-green-500 hover:bg-green-600">{activeCustomers}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
            <Badge className="bg-purple-500 hover:bg-purple-600">{vipCustomers}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{vipCustomers}</div>
            <p className="text-xs text-muted-foreground">Premium tier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Customer lifetime value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Management
              </CardTitle>
              <CardDescription>Manage customer profiles, service history, and preferences</CardDescription>
            </div>
            <Button onClick={() => setAddCustomerModalOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="sm:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="totalSpent">Total Spent</SelectItem>
                <SelectItem value="lastService">Last Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Service History</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Service</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback>
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Customer for {customer.customerSince}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-start gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                      <div className="text-sm">
                        <div>{customer.address}</div>
                        <div className="text-muted-foreground">
                          {customer.city}, {customer.state} {customer.zip}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <History className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {customer.serviceHistory.length} services
                        </span>
                      </div>
                      {customer.equipment.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Settings className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {customer.equipment.length} equipment
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-medium text-green-600">
                      ${customer.totalSpent.toLocaleString()}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        {format(new Date(customer.lastService), 'MMM d, yyyy')}
                      </div>
                      {customer.nextMaintenance && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Next: {customer.nextMaintenance === 'Overdue' ? 
                            <span className="text-red-600 font-medium">Overdue</span> :
                            customer.nextMaintenance
                          }
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                      <Button variant="ghost" size="sm">
                        Schedule Service
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredCustomers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No customers found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddCustomerForm
        open={addCustomerModalOpen}
        onOpenChange={setAddCustomerModalOpen}
        onAddCustomer={handleAddCustomer}
      />
    </div>
  );
}