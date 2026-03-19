import { Sidebar } from '@/components/admin/Sidebar';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
          <Sidebar />
          <div className="pl-64 flex flex-col min-h-screen">
            <main className="flex-1 overflow-auto bg-zinc-50/50">
              {children}
            </main>
          </div>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
