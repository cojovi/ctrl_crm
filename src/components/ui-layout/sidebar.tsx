import { cn } from '@/lib/utils';
import { NavLink, useNavigate } from 'react-router-dom';
import { GanttChartSquare, PieChart, CalendarClock, Users, HardHat as UserHardHat, PackageOpen, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/components/auth/auth-provider';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className={cn('flex h-full flex-col border-r border-cyan-400/15 bg-slate-950/70 backdrop-blur-xl', className)}>
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-teal-400/40 bg-teal-400/10 text-teal-300 shadow-[0_0_24px_-6px_hsl(173_80%_50%)]">
          <GanttChartSquare className="h-5 w-5" />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-teal-300/80">Ops console</p>
          <h2 className="font-mono text-sm font-semibold leading-tight text-foreground">Ctrl + Alt + Garage</h2>
        </div>
      </div>
      <div className="space-y-1 px-3">
        <NavItem to="/dashboard" icon={<PieChart className="h-4 w-4" />}>Dashboard</NavItem>
        <NavItem to="/leads" icon={<Users className="h-4 w-4" />}>Leads & Quotes</NavItem>
        <NavItem to="/schedule" icon={<CalendarClock className="h-4 w-4" />}>Schedule</NavItem>
        <NavItem to="/technicians" icon={<UserHardHat className="h-4 w-4" />}>Technicians</NavItem>
        <NavItem to="/customers" icon={<Users className="h-4 w-4" />}>Customers</NavItem>
        <NavItem to="/inventory" icon={<PackageOpen className="h-4 w-4" />}>Inventory</NavItem>
        <NavItem to="/settings" icon={<Settings className="h-4 w-4" />}>Settings</NavItem>
      </div>
      <div className="mt-auto space-y-3 p-4">
        <div className="rounded-lg border border-cyan-400/15 bg-cyan-400/5 px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center justify-between text-teal-200">
            <span>Bay 04</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
              Live
            </span>
          </div>
          <p className="mt-2 normal-case tracking-normal text-muted-foreground">8 techs on the board · 16 jobs this week</p>
        </div>
        <Button variant="outline" className="h-11 w-full justify-start border-cyan-400/20" onClick={handleLogout}>
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
        <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 border-cyan-400/20 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-[280px] flex-col border-cyan-400/20 bg-slate-950 p-0">
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
          'flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-200',
          isActive
            ? 'bg-teal-400/15 text-teal-100 shadow-[inset_2px_0_0_hsl(173_80%_50%)]'
            : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
        )
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
}
