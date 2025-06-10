import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { TopNav } from './top-nav';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
      <Sidebar className="hidden border-r md:block" />
      <div className="flex flex-col">
        <TopNav />
        <ScrollArea className="flex-1 bg-background p-6">
          <div className="container mx-auto">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}