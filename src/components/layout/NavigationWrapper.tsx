'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBackstageOrLogin = pathname?.startsWith('/backstage') || pathname?.startsWith('/login');

  if (isBackstageOrLogin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}