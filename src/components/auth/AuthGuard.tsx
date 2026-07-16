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
      
      
      if (!isAuthenticated) {
        if (pathname.startsWith("/admin")) {
          router.push("/login/admin");
        } else if (pathname.startsWith("/backstage")) {
          router.push("/login/backstage");
        }
        
      } 
      
      
      else if (isAuthenticated && user) {
        
        
        if (pathname.startsWith("/login")) {
          if (user.role === "admin") router.push("/admin");
          else if (user.role === "catalogador") router.push("/backstage");
          else router.push("/perfil"); 
          return;
        }

        
        if (pathname.startsWith("/admin") && user.role !== "admin") {
          router.push(user.role === "catalogador" ? "/backstage" : "/perfil");
        } else if (pathname.startsWith("/backstage") && user.role !== "catalogador") {
          router.push(user.role === "admin" ? "/admin" : "/perfil");
        }
      }
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  
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

  
  if (pathname.startsWith("/login")) {
    if (isAuthenticated) return null; 
    return <>{children}</>;
  }

  
  if (!isAuthenticated) {
    return null;
  }

  
  if (isAuthenticated && user) {
    if (pathname.startsWith("/admin") && user.role !== "admin") return null;
    if (pathname.startsWith("/backstage") && user.role !== "catalogador") return null;
  }

  return <>{children}</>;
}