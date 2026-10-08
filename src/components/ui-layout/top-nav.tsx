import { useEffect, useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileSidebar } from './sidebar';
import { useAuth } from '@/components/auth/auth-provider';
import { notifications } from '@/data/demo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function TopNav() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [now, setNow] = useState(() => new Date());
  const unread = notifications.filter((item) => !item.read).length;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-cyan-400/15 bg-slate-950/75 px-4 backdrop-blur-xl md:px-6">
      <MobileSidebar />
      <form className="hidden min-w-0 flex-1 md:block" onSubmit={(event) => event.preventDefault()}>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search the board..."
            className="h-11 border-cyan-400/20 bg-slate-900/70 pl-9 font-mono text-sm"
          />
        </div>
      </form>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-lime-200 sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
          Dispatch online
        </div>
        <time className="hidden font-mono text-xs text-muted-foreground lg:block" dateTime={now.toISOString()}>
          {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </time>
        <Button variant="outline" size="icon" className="relative h-11 w-11 rounded-full border-cyan-400/20" aria-label={`${unread} notifications`}>
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-500 px-1 text-[10px] font-semibold text-slate-950">
            {unread}
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-full border-cyan-400/20" aria-label="Account menu">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-teal-500/20 font-mono text-xs text-teal-100">AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-cyan-400/20 bg-slate-950">
            <DropdownMenuLabel className="font-mono">{user?.username ?? 'admin'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
