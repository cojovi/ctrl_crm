import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Star,
  Users,
  Search,
  UserPlus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AddTechnicianForm } from '@/components/forms/add-technician-form';

interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'Available' | 'Busy' | 'Off Duty';
  specialties: string[];
  certifications: string[];
  rating: number;
  completedJobs: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  } | null;
  experience: string;
  joinDate: string;
  nextAvailable?: string;
}

const mockTechnicians: Technician[] = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@company.com',
    phone: '(555) 123-4567',
    status: 'Available',
    specialties: ['HVAC Systems', 'Electrical Work', 'Garage Door Installation'],
    certifications: ['EPA 608 Universal', 'NATE Certified', 'OSHA 30-Hour'],
    rating: 4.9,
    completedJobs: 247,
    location: {
      address: '123 Main St, Downtown',
      lat: 37.7749,
      lng: -122.4194
    },
    experience: '8 years',
    joinDate: '2016-03-15'
  },
  {
    id: '2',
    name: 'Carlos Mendez',
    email: 'carlos.mendez@company.com',
    phone: '(555) 234-5678',
    status: 'Busy',
    specialties: ['Plumbing', 'Water Heater Installation', 'Drain Cleaning'],
    certifications: ['Master Plumber License', 'Backflow Prevention', 'Green Plumber'],
    rating: 4.8,
    completedJobs: 189,
    location: {
      address: '456 Oak Ave, Northside',
      lat: 37.7849,
      lng: -122.4094
    },
    experience: '6 years',
    joinDate: '2018-07-22',
    nextAvailable: '2:30 PM'
  },
  {
    id: '3',
    name: 'Jessica Taylor',
    email: 'jessica.taylor@company.com',
    phone: '(555) 345-6789',
    status: 'Available',
    specialties: ['Electrical Systems', 'Smart Home Installation', 'Panel Upgrades'],
    certifications: ['Master Electrician', 'Smart Home Certified', 'Code Compliance'],
    rating: 4.7,
    completedJobs: 156,
    location: {
      address: '789 Pine Rd, Westside',
      lat: 37.7649,
      lng: -122.4294
    },
    experience: '5 years',
    joinDate: '2019-01-10'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@company.com',
    phone: '(555) 456-7890',
    status: 'Available',
    specialties: ['General Maintenance', 'Appliance Repair', 'Handyman Services'],
    certifications: ['General Contractor', 'Appliance Repair Certified', 'Safety Training'],
    rating: 4.8,
    completedJobs: 203,
    location: null,
    experience: '7 years',
    joinDate: '2017-09-05'
  },
  {
    id: '5',
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    phone: '(555) 567-8901',
    status: 'Off Duty',
    specialties: ['HVAC Specialist', 'Air Quality Systems', 'Energy Efficiency'],
    certifications: ['HVAC Excellence', 'Energy Star Certified', 'Indoor Air Quality'],
    rating: 4.9,
    completedJobs: 178,
    location: {
      address: '321 Cedar Ln, Southside',
      lat: 37.7549,
      lng: -122.4394
    },
    experience: '4 years',
    joinDate: '2020-05-18',
    nextAvailable: 'Tomorrow 8:00 AM'
  }
];

export function EnhancedTechnicians() {
  const { toast } = useToast();
  const [technicians, setTechnicians] = useState<Technician[]>(mockTechnicians);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [addTechnicianModalOpen, setAddTechnicianModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-500 hover:bg-green-600';
      case 'Busy': return 'bg-amber-500 hover:bg-amber-600';
      case 'Off Duty': return 'bg-gray-500 hover:bg-gray-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getAllSpecialties = () => {
    const specialties = new Set<string>();
    technicians.forEach(tech => {
      tech.specialties.forEach(specialty => specialties.add(specialty));
    });
    return Array.from(specialties);
  };

  const filteredTechnicians = technicians.filter(tech => {
    const matchesSearch = searchQuery === '' || 
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || tech.status === statusFilter;
    
    const matchesSpecialty = specialtyFilter === 'all' || 
      tech.specialties.some(specialty => specialty === specialtyFilter);
    
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const handleAddTechnician = (newTechnician: any) => {
    const technicianWithDefaults = {
      ...newTechnician,
      id: `tech-${Date.now()}`,
      status: 'Available' as const,
      rating: 0,
      completedJobs: 0,
      location: null,
      joinDate: new Date().toISOString(),
      skills: newTechnician.skills || [],
      certifications: newTechnician.certifications || [],
      specialties: newTechnician.skills || []
    };
    
    setTechnicians(prev => [...prev, technicianWithDefaults]);
    
    toast({
      title: 'Technician Added Successfully',
      description: `${newTechnician.name} has been added to the team.`,
    });
  };

  const availableCount = technicians.filter(t => t.status === 'Available').length;
  const busyCount = technicians.filter(t => t.status === 'Busy').length;
  const avgRating = (technicians.reduce((sum, t) => sum + t.rating, 0) / technicians.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Technicians</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{technicians.length}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Now</CardTitle>
            <Badge className="bg-green-500 hover:bg-green-600">{availableCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableCount}</div>
            <p className="text-xs text-muted-foreground">Ready for assignments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Busy</CardTitle>
            <Badge className="bg-amber-500 hover:bg-amber-600">{busyCount}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{busyCount}</div>
            <p className="text-xs text-muted-foreground">On active jobs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating}</div>
            <p className="text-xs text-muted-foreground">Customer satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Technician Directory
              </CardTitle>
              <CardDescription>Manage team members, skills, and availability</CardDescription>
            </div>
            <Button onClick={() => setAddTechnicianModalOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Technician
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search technicians or specialties..."
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
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Busy">Busy</SelectItem>
                <SelectItem value="Off Duty">Off Duty</SelectItem>
              </SelectContent>
            </Select>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="sm:w-[200px]">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {getAllSpecialties().map(specialty => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Technicians Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Technician</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTechnicians.map((technician) => (
                <TableRow key={technician.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={technician.avatar} />
                        <AvatarFallback>
                          {technician.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{technician.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {technician.experience} experience
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {technician.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {technician.phone}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-2">
                      <Badge className={getStatusColor(technician.status)}>
                        {technician.status}
                      </Badge>
                      {technician.nextAvailable && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {technician.nextAvailable}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      {technician.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {technician.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{technician.specialties.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{technician.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {technician.completedJobs} jobs
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{technician.experience}</div>
                      <div className="text-xs text-muted-foreground">
                        Since {new Date(technician.joinDate).getFullYear()}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {technician.location ? (
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate max-w-[120px]">
                          {technician.location.address}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Location not available</span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                      <Button variant="ghost" size="sm">
                        Schedule
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredTechnicians.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No technicians found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Technician Modal */}
      <AddTechnicianForm
        open={addTechnicianModalOpen}
        onOpenChange={setAddTechnicianModalOpen}
        onAddTechnician={handleAddTechnician}
      />
    </div>
  );
}