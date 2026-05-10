"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      
      // 1. Usuário NÃO está logado
      if (!isAuthenticated) {
        if (pathname.startsWith("/admin")) {
          router.push("/login/admin");
        } else if (pathname.startsWith("/backstage")) {
          router.push("/login/backstage");
        }
        // Se for rota pública ou de login, não faz nada (deixa renderizar)
      } 
      
      // 2. Usuário ESTÁ logado
      else if (isAuthenticated && user) {
        
        // A. Se tentar acessar qualquer tela de login, joga pro painel dele
        if (pathname.startsWith("/login")) {
          if (user.role === "admin") router.push("/admin");
          else if (user.role === "catalogador") router.push("/backstage");
          else router.push("/perfil"); // colaborador
          return;
        }

        // B. Bloqueio RBAC Hierárquico rigoroso (Cruza roles com as rotas)
        if (pathname.startsWith("/admin") && user.role !== "admin") {
          router.push(user.role === "catalogador" ? "/backstage" : "/perfil");
        } else if (pathname.startsWith("/backstage") && user.role !== "catalogador") {
          router.push(user.role === "admin" ? "/admin" : "/perfil");
        }
      }
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  // Se a requisição de contexto estiver reidratando do localStorage / Supabase
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
          <p className="animate-pulse font-sans text-xs font-medium uppercase tracking-widest text-zinc-500">
            Verificando sessão...
          </p>
        </div>
      </div>
    );
  }

  // Se for a tela de login (não logado), destrava renderização visual do formulário.
  if (pathname.startsWith("/login")) {
    if (isAuthenticated) return null; // Previne "piscada" na tela antes do redirect rolar
    return <>{children}</>;
  }

  // Se não autenticado e NÃO for tela de login, trava renderização visual de tudo
  if (!isAuthenticated) {
    return null;
  }

  // Se a rota está blindada e o role não corresponde, trava renderização até redirecionar
  if (isAuthenticated && user) {
    if (pathname.startsWith("/admin") && user.role !== "admin") return null;
    if (pathname.startsWith("/backstage") && user.role !== "catalogador") return null;
  }

  return <>{children}</>;
}