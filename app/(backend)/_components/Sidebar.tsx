"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Database, FileText, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Data Management', icon: Database, href: '/dashboard/data' },
    { name: 'Reports', icon: FileText, href: '/dashboard/reports' },
    { name: 'Security', icon: ShieldCheck, href: '/dashboard/security' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-slate-950 text-white p-8 flex flex-col h-full border-r border-white/5 shadow-2xl">
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <ShieldCheck className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-black tracking-tighter uppercase italic">SWASTI</h2>
            </div>

            <nav className="flex-1 space-y-2">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">Menu Utama</div>
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
                            pathname === item.href
                                ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon size={20} className={cn(
                            "transition-transform group-hover:scale-110",
                            pathname === item.href ? "text-white" : "text-slate-500 group-hover:text-primary"
                        )} />
                        <span className="font-bold text-sm tracking-tight">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto space-y-6">
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5 space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Online</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                        Database terhubung dengan pasar pusat.
                    </p>
                </div>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm tracking-tight group">
                    <LogOut size={20} className="group-hover:rotate-180 transition-transform" />
                    Keluar Sesi
                </button>
            </div>
        </aside>
    );
};
