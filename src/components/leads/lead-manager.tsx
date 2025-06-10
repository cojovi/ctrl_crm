import { Layout } from '../ui-layout/layout';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { PlusCircle, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadsList } from './leads-list';
import { LeadDetails } from './lead-details';
import { CreateLeadForm } from './create-lead-form';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function LeadManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Leads & Quotes</h2>
                  <p className="text-muted-foreground">
                    Manage your leads, create quotes, and convert to customers
                  </p>
                </div>
                <Button onClick={() => navigate('/leads/new')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Lead
                </Button>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                        <span className="sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        New Leads
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>
                        In Progress
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>
                        Quote Sent
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>
                        Closed
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="sr-only">Sort</span>
                  </Button>
                </div>

                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Leads</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <LeadsList searchQuery={searchQuery} />
            </div>
          }
        />
        <Route path="/new" element={<CreateLeadForm />} />
        <Route path="/:id" element={<LeadDetails />} />
      </Routes>
    </Layout>
  );
}