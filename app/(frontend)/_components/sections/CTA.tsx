"use client";

import React from 'react';
import { Button } from '@/frontend/_components/ui/Button';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

export const CTA = () => {
    return (
        <section className="min-h-[calc(100vh-100px)] flex flex-col justify-center py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative w-full rounded-[3rem] overflow-hidden bg-white border border-slate-200 p-10 md:p-14 lg:p-16 shadow-2xl shadow-primary/5 flex flex-col items-center text-center gap-8 backdrop-blur-3xl group mx-auto"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="max-w-3xl z-10">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-[1.1] tracking-tight">
                        Siap Memperkuat <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent drop-shadow-[0_0_30px_rgba(37,99,235,0.2)]">Stabilitas Harga?</span>
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                        Dapatkan akses penuh ke perangkat analisis SWASTI dan mulai buat keputusan berbasis data sekarang.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="px-8 h-14 text-base shadow-2xl shadow-primary/20 rounded-2xl group/btn hover:scale-105 transition-transform">
                            Mulai Gratis
                            <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                        </Button>
                        <Button variant="outline" size="lg" className="px-8 h-14 text-base gap-2 rounded-2xl font-bold">
                            <Mail size={18} className="text-primary group-hover:text-white transition-colors" />
                            Hubungi Tim Ahli
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl z-10">
                    <div className="p-6 rounded-[2rem] bg-white border border-slate-200 flex items-center gap-4 hover:bg-blue-600 hover:border-blue-500 group/card transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-blue-600/20">
                        <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0 shadow-inner border border-green-500/20 group-hover/card:bg-white/20 group-hover/card:border-white/30 group-hover/card:text-white transition-all duration-500">
                            <CheckCircle2 className="text-green-600 group-hover/card:text-white w-6 h-6 transition-colors duration-500" />
                        </div>
                        <div className="text-left">
                            <h4 className="text-foreground group-hover/card:text-white font-bold text-lg mb-0.5 flex items-center gap-2 transition-colors duration-500">
                                Terverifikasi
                            </h4>
                            <p className="text-muted-foreground group-hover/card:text-white/70 text-xs uppercase tracking-wider font-semibold opacity-70 transition-colors duration-500">Otoritas Terpercaya</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-white border border-slate-200 flex items-center gap-4 hover:bg-blue-600 hover:border-blue-500 group/card transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-blue-600/20">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 shadow-inner border border-primary/20 group-hover/card:bg-white/20 group-hover/card:border-white/30 group-hover/card:text-white transition-all duration-500">
                            <ShieldCheck className="text-primary group-hover/card:text-white w-6 h-6 transition-colors duration-500" />
                        </div>
                        <div className="text-left">
                            <h4 className="text-foreground group-hover/card:text-white font-bold text-lg mb-0.5 transition-colors duration-500">Terenkripsi</h4>
                            <p className="text-muted-foreground group-hover/card:text-white/70 text-xs uppercase tracking-wider font-semibold opacity-70 transition-colors duration-500">Standar Keamanan Tinggi</p>
                        </div>
                    </div>
                </div>

                {/* Decorative backgrounds */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[120px] pointer-events-none group-hover:bg-primary/30 transition-colors duration-1000" />
                <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-accent/10 blur-[100px] pointer-events-none group-hover:bg-accent/20 transition-colors duration-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 blur-[150px] pointer-events-none rounded-full" />
            </motion.div>
        </section>
    );
};
