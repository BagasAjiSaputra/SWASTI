"use client";

import React from 'react';
import { Card } from '@/frontend/_components/ui/Card';
import { cn } from '@/frontend/lib/utils';
import { Zap, Brain, Map } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: Zap,
        title: 'Data Real-time',
        description: 'Pantau fluktuasi harga pangan secara instan dari 500+ pasar induk nasional dengan presisi data harian yang akurat.',
        color: '#3b82f6',
    },
    {
        icon: Brain,
        title: 'Prediksi AI',
        description: 'Deteksi dini anomali harga menggunakan Neural Networks untuk memitigasi risiko inflasi sebelum berdampak luas.',
        color: '#10b981',
    },
    {
        icon: Map,
        title: 'Pemetaan Risiko',
        description: 'Visualisasi geospasial kerawanan pangan untuk mengidentifikasi titik panas kenaikan harga di tiap wilayah secara detail.',
        color: '#ef4444',
    },
];

export const Features = () => {
    return (
        <section className="min-h-[calc(100vh-100px)] flex flex-col justify-center py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black mb-4 uppercase tracking-[0.2em]"
                    >
                        FITUR UNGGULAN
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 leading-tight tracking-tight"
                    >
                        Solusi Data Terintegrasi untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Kebijakan Cerdas</span>
                    </motion.h2>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground lg:max-w-md text-base md:text-lg leading-relaxed font-medium"
                >
                    Kami menghadirkan teknologi mutakhir untuk membantu pemantauan pasar yang lebih akurat dan responsif bagi seluruh stakeholder.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                {features.map((feature, i) => (
                    <Card key={feature.title} delay={0.1 * i} className="group flex flex-col items-start h-full p-8 bg-white border-slate-200 transition-all duration-700 hover:shadow-[0_30px_70px_rgba(37,99,235,0.25)]">
                        <div
                            className={cn(
                                "w-16 h-16 rounded-[1.8rem] flex items-center justify-center mb-6 transition-all duration-700 group-hover:rotate-[15deg] shadow-lg shadow-black/5 relative z-10",
                            )}
                            style={{ 
                                backgroundColor: `${feature.color}15`,
                                color: feature.color, 
                                border: `1px solid ${feature.color}30` 
                            }}
                        >
                            {/* Force white on hover with an overlay to overcome inline style specificity */}
                            <div className="absolute inset-0 bg-white rounded-[1.8rem] opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 shadow-xl border border-white/50" />
                            <feature.icon size={30} className="group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-xl md:text-2xl font-black text-foreground group-hover:text-white mb-4 tracking-tight transition-all duration-500">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground group-hover:text-blue-50/90 text-[13px] md:text-sm leading-relaxed mb-8 flex-grow transition-all duration-500 font-medium opacity-90">
                                {feature.description}
                            </p>
                            <motion.button
                                whileHover={{ x: 8 }}
                                className="font-black text-[10px] flex items-center gap-2 group/btn uppercase tracking-[0.2em] transition-all duration-500 mt-auto"
                            >
                                <span className="group-hover:text-white transition-colors duration-500" style={{ color: feature.color }}>
                                    <span className="group-hover:text-white">Eksplorasi Fitur</span>
                                </span>
                                <span className="text-lg group-hover/btn:translate-x-1 transition-transform group-hover:text-white duration-500" style={{ color: feature.color }}>
                                    <span className="group-hover:text-white">→</span>
                                </span>
                            </motion.button>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};
