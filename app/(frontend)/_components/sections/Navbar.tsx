"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/frontend/_components/ui/Button';
import { cn } from '@/frontend/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Search, LogIn, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const height = 64;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on navigation
    const pathname = usePathname();
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Peta Risiko', href: '/peta-risiko' },
        { name: 'Analisis Harga', href: '/analisis-harga' },
        { name: 'Laporan Strategis', href: '#' },
        { name: 'Pusat Data', href: '#' },
    ];

    return (
        <>
            <motion.nav
                style={{ height }}
                className={cn(
                    "fixed top-0 inset-x-0 z-[9999] flex items-center justify-between px-6 sm:px-10 transition-all duration-500",
                    isScrolled || isMenuOpen ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm' : 'bg-blue-600 border-b border-transparent'
                )}
            >
                {/* Logo Section */}
                <div className="flex-shrink-0 z-[10000]">
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <img src="/logo/logoswasti.webp" alt="SWASTI Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className={cn("text-lg md:text-xl font-black tracking-tighter leading-none transition-colors duration-500", (isScrolled || isMenuOpen) ? "text-blue-600" : "text-white")}>SWASTI</span>
                            <span className={cn("text-[8px] md:text-[10px] uppercase tracking-widest font-semibold transition-colors duration-500", (isScrolled || isMenuOpen) ? "text-slate-500" : "text-blue-100/70")}>Platform Inflasi</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation Links - Desktop */}
                <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-semibold transition-all relative py-2 tracking-wide whitespace-nowrap duration-500",
                                isScrolled 
                                    ? (pathname === link.href ? "text-blue-600" : "text-slate-600 hover:text-blue-600")
                                    : (pathname === link.href ? "text-white" : "text-blue-100/80 hover:text-white")
                            )}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="nav-active"
                                    className={cn(
                                        "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-500",
                                        isScrolled ? "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" : "bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                                    )}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Actions Section */}
                <div className="flex items-center justify-end gap-4">
                    <div className="hidden lg:block">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className={cn(
                                "gap-2 px-6 rounded-full font-black shadow-lg transition-all duration-500",
                                isScrolled 
                                    ? "bg-blue-600 border-transparent text-white hover:bg-blue-700 shadow-blue-900/10" 
                                    : "bg-white border-transparent text-blue-600 hover:bg-blue-50 shadow-blue-900/20"
                            )}
                        >
                            <LogIn className="w-4 h-4" />
                            Masuk
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={cn(
                            "lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 z-[10000]",
                            (isScrolled || isMenuOpen) ? "text-slate-900 bg-slate-100" : "text-white bg-white/10"
                        )}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[9998] bg-white pt-24 px-8 flex flex-col gap-8 lg:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-xl font-semibold tracking-tight flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group",
                                            pathname === link.href 
                                                ? "text-blue-600 bg-blue-50" 
                                                : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                                        )}
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full bg-blue-600 transition-all duration-500",
                                            pathname === link.href ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100"
                                        )} />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-auto pb-12"
                        >
                            <Button className="w-full h-14 rounded-2xl text-base font-semibold shadow-xl shadow-blue-900/10 focus:ring-0">
                                Masuk ke Platform
                                <LogIn className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
