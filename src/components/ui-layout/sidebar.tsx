import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { GanttChartSquare, PieChart, CalendarClock, Users, HardHat as UserHardHat, PackageOpen, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account',
    });
    // Implement actual logout logic here
  };

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 flex items-center gap-2 px-2 text-xl font-semibold tracking-tight">
            <GanttChartSquare className="h-6 w-6 text-teal-500" />
            <span className="text-teal-500">CMAConnect</span>
          </h2>
          <div className="space-y-1">
            <NavItem to="/dashboard" icon={<PieChart className="mr-2 h-4 w-4" />}>
              Dashboard
            </NavItem>
            <NavItem to="/leads" icon={<Users className="mr-2 h-4 w-4" />}>
              Leads & Quotes
            </NavItem>
            <NavItem to="/schedule" icon={<CalendarClock className="mr-2 h-4 w-4" />}>
              Schedule
            </NavItem>
            <NavItem to="/technicians" icon={<UserHardHat className="mr-2 h-4 w-4" />}>
              Technicians
            </NavItem>
            <NavItem to="/customers" icon={<Users className="mr-2 h-4 w-4" />}>
              Customers
            </NavItem>
            <NavItem to="/inventory" icon={<PackageOpen className="mr-2 h-4 w-4" />}>
              Inventory
            </NavItem>
            <NavItem to="/settings" icon={<Settings className="mr-2 h-4 w-4" />}>
              Settings
            </NavItem>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function NavItem({ to, icon, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors',
          isActive
            ? 'bg-accent text-accent-foreground'
            : 'transparent text-muted-foreground'
        )
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
}