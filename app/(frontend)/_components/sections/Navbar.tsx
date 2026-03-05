"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/frontend/_components/ui/Button';
import { cn } from '@/frontend/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity } from 'lucide-react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const height = useTransform(scrollYProgress, [0, 0.1], [80, 70]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Dashboard', href: '#' },
        { name: 'Peta Risiko', href: '#' },
        { name: 'Tren Harga', href: '#' },
        { name: 'Laporan', href: '#' },
    ];

    return (
        <motion.nav
            style={{ height }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 sm:px-16 flex items-center justify-between',
                isScrolled ? 'bg-background/40 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
            )}
        >
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform duration-500">
                        <Activity className="text-white w-7 h-7" />
                    </div>
                    <div className="absolute -inset-1 bg-primary/20 blur-xl rounded-2xl -z-10 group-hover:bg-primary/40 transition-colors" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white group-hover:text-primary transition-colors duration-300">SWASTI</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                    Masuk
                </Button>
                <Button size="sm">
                    Daftar
                </Button>
            </div>
        </motion.nav>
    );
};
