import { BackstageSidebar } from '@/components/backstage/BackstageSidebar';

export const metadata = {
  title: 'Backstage — Acervo Valente',
};

export default function BackstageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      <BackstageSidebar />
      <main className="flex-1 overflow-y-auto bg-zinc-50">
        {children}
      </main>
    </div>
  );
}