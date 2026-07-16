"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export interface User {
  id: string | number;
  nome: string;
  username?: string;
  email?: string;
  avatar_url?: string;
  role: "admin" | "catalogador" | "colaborador";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  loginGoogle: (redirectTo?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("@Valente:token");
        const storedUser = localStorage.getItem("@Valente:user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setToken(session.access_token);
          setUser({
            id: session.user.id,
            nome: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || "Colaborador",
            email: session.user.email,
            avatar_url: session.user.user_metadata.avatar_url,
            role: "colaborador",
          });
        }
      } catch (e) {
        
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === "SIGNED_IN" && session) {
          setToken(session.access_token);
          setUser({
            id: session.user.id,
            nome: session.user.user_metadata.full_name,
            email: session.user.email,
            avatar_url: session.user.user_metadata.avatar_url,
            role: "colaborador",
          });
        } else if (event === "SIGNED_OUT") {
          if (user?.role === "colaborador") {
            setToken(null);
            setUser(null);
          }
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user?.role]);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("@Valente:token", newToken);
    localStorage.setItem("@Valente:user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const loginGoogle = async (redirectTo: string = "/perfil") => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${redirectTo}`,
      },
    });
  };

  const logout = async () => {
    setIsLoading(true);
    
    if (user?.role === "colaborador") {
      await supabase.auth.signOut();
    }

    localStorage.removeItem("@Valente:token");
    localStorage.removeItem("@Valente:user");
    setToken(null);
    setUser(null);
    
    router.push("/");
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}