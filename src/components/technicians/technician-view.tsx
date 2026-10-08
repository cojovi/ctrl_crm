import { useState } from 'react';
import { Layout } from '../ui-layout/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Users,
  Search,
  UserPlus,
  Calendar
} from 'lucide-react';
import { technicians as demoTechnicians } from '@/data/demo';

interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  status: 'Available' | 'Busy' | 'Off Duty';
  rating: number;
  completedJobs: number;
  current_location: {
    lat: number;
    lng: number;
    address: string;
  } | null;
  experience: string;
  certifications: string[];
  nextAvailable?: string;
}

export function TechnicianView() {
  const [technicians] = useState<Technician[]>(demoTechnicians);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-500 hover:bg-green-600 text-white';
      case 'Busy': return 'bg-amber-500 hover:bg-amber-600 text-white';
      case 'Off Duty': return 'bg-gray-500 hover:bg-gray-600 text-white';
      default: return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  };

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const availableCount = technicians.filter(t => t.status === 'Available').length;
  const busyCount = technicians.filter(t => t.status === 'Busy').length;
  const avgRating = (technicians.reduce((sum, t) => sum + t.rating, 0) / technicians.length).toFixed(1);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="page-title">Technicians</h2>
            <p className="text-muted-foreground">
              Manage technician schedules, skills, and availability
            </p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Technician
          </Button>
        </div>

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

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Search Technicians</CardTitle>
            <CardDescription>Find technicians by name or skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search technicians or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Technicians Table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Directory</CardTitle>
            <CardDescription>Comprehensive list of all technicians and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Technician</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTechnicians.map((tech) => (
                  <TableRow key={tech.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/placeholder-user.jpg`} />
                          <AvatarFallback>
                            {tech.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{tech.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {tech.experience} experience
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {tech.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          {tech.phone}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        {tech.skills.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs mr-1">
                            {skill}
                          </Badge>
                        ))}
                        {tech.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{tech.skills.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-2">
                        <Badge className={getStatusColor(tech.status)}>
                          {tech.status}
                        </Badge>
                        {tech.nextAvailable && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {tech.nextAvailable}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{tech.rating}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {tech.completedJobs} jobs completed
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      {tech.current_location ? (
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate max-w-[120px]">
                            {tech.current_location.address}
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}