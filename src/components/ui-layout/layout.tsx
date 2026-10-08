import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { TopNav } from './top-nav';

const tickerItems = [
  'Bay 04 live',
  'Priya Shah on commercial operator',
  'Spring pair .207 below reorder',
  'Olivia Martin install locked for Friday',
  'myQ hubs at zero',
  'Daniel Okonkwo net-30 due Friday',
  'Dispatch window clear after 15:30',
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const loop = [...tickerItems, ...tickerItems];

  return (
    <div className="min-h-screen md:grid md:grid-cols-[260px_minmax(0,1fr)]">
      <Sidebar className="sticky top-0 hidden h-screen md:flex" />
      <div className="flex min-h-screen min-w-0 flex-col">
        <TopNav />
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {loop.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_hsl(173_80%_50%)]" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8">
          <div className="mx-auto w-full max-w-[1440px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
