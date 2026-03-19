import { BackstageSidebar } from '@/components/backstage/BackstageSidebar';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/auth/AuthGuard';

export const metadata = {
  title: 'Backstage — Acervo Valente',
};

export default function BackstageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="flex h-screen overflow-hidden bg-zinc-950">
          <BackstageSidebar />
          <main className="flex-1 overflow-y-auto bg-zinc-50">
            {children}
          </main>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}