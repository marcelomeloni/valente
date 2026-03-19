'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        if (pathname.startsWith('/admin')) {
          router.push('/login/admin');
        } else if (pathname.startsWith('/backstage')) {
          router.push('/login/backstage');
        }
      } else if (isAuthenticated && user) {
        // Bloqueio RBAC Hierárquico: Separar rigidamente Catalogadores e Administradores
        if (pathname.startsWith('/admin') && user.role !== 'admin') {
          router.push('/backstage');
        } else if (pathname.startsWith('/backstage') && user.role !== 'catalogador') {
          router.push('/admin');
        }
      }
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  // Se a requisição de contexto estiver reidratando do localStorage
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
          <p className="font-sans text-xs font-medium text-zinc-500 uppercase tracking-widest animate-pulse">
            Verificando sessão...
          </p>
        </div>
      </div>
    );
  }

  // Se for a tela de login vazada (não logado), destrava renderização visual do formulário. 
  if (pathname.startsWith('/login')) {
    if (isAuthenticated) return null; // Ele vai redirecionar pro painel correto logado lá em cima
    return <>{children}</>;
  }

  // Se não autenticado e NÃO for tela de login, trava renderização visual de tudo
  if (!isAuthenticated) {
    return null;
  }

  // Se a rota está blindada e o role não corresponde, trava renderização até redirecionar
  if (isAuthenticated && user) {
    if (pathname.startsWith('/admin') && user.role !== 'admin') return null;
    if (pathname.startsWith('/backstage') && user.role !== 'catalogador') return null;
  }

  return <>{children}</>;
}
