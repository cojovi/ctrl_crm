import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Edit, PenLine, Calendar, User, Phone, MapPin, Mail } from 'lucide-react';
import { LeadTimeline } from './lead-timeline';
import { LeadQuoteForm } from './lead-quote-form';
import { cn } from '@/lib/utils';
import { leads as demoLeads } from '@/data/demo';

export function LeadDetails() {
  const { id } = useParams<{ id: string }>();
  const [currentTab, setCurrentTab] = useState('overview');
  
  // In a real app, we would fetch the lead details from the API
  const lead = demoLeads.find((lead) => lead.id === id);
  
  if (!lead) {
    return <div>Lead not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/leads">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h2 className="text-2xl font-bold">{lead.customerName}</h2>
          <LeadStatusBadge status={lead.status} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Lead
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="quotes">Quotes</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Lead Information</CardTitle>
                  <CardDescription>View and edit lead details</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <LeadInfoItem icon={<User />} label="Customer" value={lead.customerName} />
                    <LeadInfoItem icon={<Mail />} label="Email" value={lead.email} />
                    <LeadInfoItem icon={<Phone />} label="Phone" value={lead.phone} />
                    <LeadInfoItem icon={<MapPin />} label="Address" value={lead.address} />
                    <LeadInfoItem icon={<PenLine />} label="Service Type" value={lead.serviceType} />
                    <LeadInfoItem icon={<PenLine />} label="Source" value={lead.source} />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Door Specifications</CardTitle>
                  <CardDescription>Information about the garage door</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <LeadInfoItem icon={<PenLine />} label="Door Type" value={lead.doorType} />
                    <LeadInfoItem icon={<PenLine />} label="Door Size" value={lead.doorSize} />
                    <LeadInfoItem icon={<PenLine />} label="Material" value={lead.material} />
                    <LeadInfoItem icon={<PenLine />} label="Color" value={lead.color} />
                    <LeadInfoItem icon={<PenLine />} label="Windows" value={lead.windows} />
                    <LeadInfoItem icon={<PenLine />} label="Opener" value={lead.opener} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{lead.notes}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="quotes" className="pt-4">
              <LeadQuoteForm leadId={id || ''} />
            </TabsContent>
            
            <TabsContent value="timeline" className="pt-4">
              <LeadTimeline leadId={id || ''} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">{lead.customerName}</span>
                <span className="text-sm text-muted-foreground">{lead.email}</span>
                <span className="text-sm text-muted-foreground">{lead.phone}</span>
                <span className="text-sm text-muted-foreground">{lead.address}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="justify-start">
                <PenLine className="mr-2 h-4 w-4" />
                Create Quote
              </Button>
              <Button variant="outline" className="justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Update Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LeadInfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

function LeadStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={cn(
        status === 'New' && 'bg-teal-500 hover:bg-teal-600',
        status === 'In Progress' && 'bg-amber-500 hover:bg-amber-600',
        status === 'Quote Sent' && 'bg-purple-500 hover:bg-purple-600',
        status === 'Closed Won' && 'bg-lime-500 hover:bg-lime-600',
        status === 'Closed Lost' && 'bg-gray-500 hover:bg-gray-600'
      )}
    >
      {status}
    </Badge>
  );
}
