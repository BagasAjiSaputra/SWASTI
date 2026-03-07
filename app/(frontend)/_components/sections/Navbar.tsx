"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/frontend/_components/ui/Button';
import { cn } from '@/frontend/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Search, LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const height = useTransform(scrollYProgress, [0, 0.1], [72, 64]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Peta Risiko', href: '/peta-risiko' },
        { name: 'Analisis Harga', href: '#' },
        { name: 'Laporan Strategis', href: '#' },
        { name: 'Pusat Data', href: '#' },
    ];

    return (
        <motion.nav
            style={{ height }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-12 flex items-center justify-between gap-4',
                isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/5' : 'bg-[#020617]/50 backdrop-blur-md border-b border-white/5'
            )}
        >
            {/* Logo Section */}
            <div className="flex-shrink-0">
                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform duration-500">
                            <Activity className="text-white w-6 h-6" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tighter text-white leading-none">SWASTI</span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Platform Inflasi</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Links - Centered on Desktop */}
            <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                            "text-sm font-semibold transition-all relative py-2 tracking-wide whitespace-nowrap",
                            pathname === link.href ? "text-white" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        {link.name}
                        {pathname === link.href && (
                            <motion.div
                                layoutId="nav-active"
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]"
                            />
                        )}
                    </Link>
                ))}
            </div>

            {/* Actions Section */}
            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/5 gap-2 px-6 rounded-full border border-white/10">
                    <LogIn className="w-4 h-4" />
                    Masuk
                </Button>
            </div>
        </motion.nav>
    );
};
