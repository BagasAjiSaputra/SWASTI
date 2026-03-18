"use client";

import React from 'react';
import { Card } from '@/frontend/_components/ui/Card';
import { Sparkline } from '@/frontend/_components/ui/Sparkline';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { cn } from '@/frontend/lib/utils';
import { motion } from 'framer-motion';
import { StatsSkeleton } from '@/frontend/_components/ui/StatsSkeleton';

const stats = [
    {
        title: 'IHK Nasional',
        value: '115.82',
        change: '+0.28%',
        isUp: true,
        label: 'dari bulan lalu',
        color: '#3b82f6',
        data: Array.from({ length: 12 }, (_, i) => ({ date: new Date(2023, i, 1), value: 110 + Math.random() * 10 })),
    },
    {
        title: 'Inflasi MoM',
        value: '0.32%',
        change: '-0.08%',
        isUp: false,
        label: 'terjaga stabil',
        color: '#10b981',
        data: Array.from({ length: 12 }, (_, i) => ({ date: new Date(2023, i, 1), value: 0.1 + Math.random() * 0.4 })),
    },
    {
        title: 'Volatile Food',
        value: '5.14%',
        change: '+1.12%',
        isUp: true,
        label: 'butuh perhatian',
        color: '#ef4444',
        data: Array.from({ length: 12 }, (_, i) => ({ date: new Date(2023, i, 1), value: 2 + Math.random() * 5 })),
    },
];

export const Stats = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full">
            <div className="text-center mb-16 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-black mb-6 uppercase tracking-[0.2em]"
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Market Live Data
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight"
                >
                    Statistik Inflasi Nasional
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg max-w-2xl mx-auto"
                >
                    Ikhtisar indikator ekonomi makro terkini untuk memantau stabilitas harga konsumen secara nasional.
                </motion.p>
            </div>

            {loading ? (
                <StatsSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stats.map((stat, i) => (
                        <Card key={stat.title} delay={0.1 * i} className="group hover:border-primary/50 transition-all duration-700 bg-white shadow-sm border-slate-200 overflow-hidden hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]">
                            <div className="relative z-10 flex justify-between items-start mb-8">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-muted-foreground group-hover:text-blue-100/90 uppercase tracking-[0.2em] opacity-80 duration-500 transition-all">{stat.title}</p>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-4xl font-black text-foreground group-hover:text-white tracking-tighter duration-500 transition-all">{stat.value}</h3>
                                        <div className={cn(
                                            "flex items-center text-[10px] font-black px-2 py-0.5 rounded-full transition-all duration-500",
                                            stat.isUp 
                                                ? "bg-red-500/10 text-red-600 border border-red-500/20 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30" 
                                                : "bg-green-500/10 text-green-600 border border-green-500/20 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30"
                                        )}>
                                            {stat.isUp ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                                            {stat.change}
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-bold text-muted-foreground group-hover:text-blue-200/70 italic flex items-center gap-1.5 duration-500 transition-all uppercase tracking-wider">
                                        <span className={cn("w-1.5 h-1.5 rounded-full block duration-500 transition-all backdrop-blur-sm shadow-sm", stat.isUp ? "bg-red-500/40 group-hover:bg-white/60" : "bg-green-500/40 group-hover:bg-white/60")} /> 
                                        {stat.label}
                                    </p>
                                </div>
                                <div 
                                    className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-500 relative z-10",
                                        stat.color === '#ef4444' ? "bg-red-500/10 text-red-600 border border-red-500/20 group-hover:border-white/30" : stat.color === '#10b981' ? "bg-green-500/10 text-green-600 border border-green-500/20 group-hover:border-white/30" : "bg-blue-500/10 text-blue-600 border border-blue-500/20 group-hover:border-white/30"
                                    )}
                                    style={{ color: stat.color }}
                                >
                                    {/* Overlay for solid white on hover */}
                                    <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 shadow-xl" />
                                    {stat.color === '#ef4444' ? <AlertCircle size={24} /> : stat.color === '#10b981' ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                                </div>
                            </div>

                            <div 
                                className="relative z-10 h-28 w-full -mb-6 -mx-4 opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.02]"
                                style={{ color: stat.color }}
                            >
                                <div className="group-hover:text-white transition-colors duration-500 h-full w-full">
                                    <Sparkline data={stat.data} width={400} height={112} color="currentColor" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
};
