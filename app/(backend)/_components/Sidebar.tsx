"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Database, FileText, Settings, LogOut, ShieldCheck, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Komoditas', icon: Database, href: '/komoditas' },
    { name: 'Manajemen User', icon: Users, href: '/users' },
    { name: 'Security', icon: ShieldCheck, href: '/dashboard/security' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-white text-slate-900 p-6 flex flex-col h-full border-r border-slate-100">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-2xl shadow-slate-200">
                    <ShieldCheck className="text-white" size={20} />
                </div>
                <div>
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic leading-none">SWASTI</h2>
                    <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mt-1">Core System</p>
                </div>
            </div>

            <nav className="flex-1 space-y-3">
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 px-2">Main Navigation</div>
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group relative border-l-2 border-transparent",
                            pathname === item.href
                                ? "bg-slate-50 text-slate-900 border-l-slate-900 shadow-none translate-x-1"
                                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                        )}
                    >
                        <item.icon size={20} className={cn(
                            "transition-all duration-500",
                            pathname === item.href ? "text-white scale-110" : "text-slate-400 group-hover:text-slate-900 group-hover:scale-110"
                        )} />
                        <span className="font-bold text-[13px] tracking-tight">{item.name}</span>
                        {pathname === item.href && (
                            <motion.div 
                                layoutId="sidebar-active"
                                className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white opacity-40"
                            />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-50 space-y-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 group cursor-default">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm group-hover:rotate-12 transition-transform">
                        <ShieldCheck size={16} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Active Access</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">Admin Privilege Enabled</p>
                    </div>
                </div>

                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-black text-[11px] tracking-tighter uppercase group bg-transparent border border-transparent hover:border-red-100">
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Logout System
                </button>
            </div>
        </aside>
    );
};
