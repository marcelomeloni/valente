'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, PenTool, Tags, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Usuários', href: '/admin/usuarios', icon: Users },
    { name: 'Obras', href: '/admin/obras', icon: BookOpen },
    { name: 'Autores', href: '/admin/autores', icon: PenTool },
    { name: 'Temas', href: '/admin/temas', icon: Tags },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-zinc-800 text-zinc-300 flex flex-col font-sans transition-all duration-300">
      <div className="flex h-16 items-center px-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
            <span className="font-serif text-lg font-bold text-white">V</span>
          </div>
          <h1 className="font-serif text-lg font-bold tracking-wide text-white">Acervo</h1>
        </div>
      </div>
      
      <div className="px-4 pb-2 mb-2">
        <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2">
          Menu Principal
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto w-full px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/5' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
              }`}
            >
              <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 mt-auto border-t border-zinc-800/50">
        <div className="mb-4 px-3 flex flex-col pt-3">
          <span className="font-sans text-sm font-semibold text-zinc-200 line-clamp-1 truncate">{user?.nome || 'Validando...'}</span>
          <span className="font-sans text-[11px] tracking-widest text-zinc-500 uppercase">{user?.role}</span>
        </div>
        <button onClick={logout} className="group flex w-full items-center gap-3 cursor-pointer rounded-md px-3 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:text-red-400">
          <LogOut className="h-4 w-4 text-zinc-500 group-hover:text-red-400 transition-colors" />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
}
