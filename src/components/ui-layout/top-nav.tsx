import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileSidebar } from './sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/components/auth/auth-provider';
import { useToast } from '@/hooks/use-toast';

export function TopNav() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out of your account',
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Get user initials
  const getInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || '';
    const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || '';
    return `${firstInitial}${lastInitial}` || user.email?.charAt(0)?.toUpperCase() || 'U';
  };

  const getUserDisplayName = () => {
    if (!user) return 'User';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'User';
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <MobileSidebar />
      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <form className="hidden flex-1 md:flex">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="relative h-8 w-8 rounded-full"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] font-medium text-white">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full p-0 hover:bg-accent"
                disabled={isLoggingOut}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={getUserDisplayName()} />
                  <AvatarFallback 
                    className="text-sm font-medium text-[#333333] bg-[#f0f0f0] border border-border"
                  >
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleNavigate('/account')}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleNavigate('/profile')}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleNavigate('/settings')}
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}