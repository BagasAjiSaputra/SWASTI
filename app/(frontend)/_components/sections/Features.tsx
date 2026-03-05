"use client";

import React from 'react';
import { Card } from '@/frontend/_components/ui/Card';
import { Zap, Brain, Map } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: Zap,
        title: 'Data Real-time',
        description: 'Akses langsung ke perubahan harga komoditas pokok dari berbagai pasar induk di seluruh Indonesia setiap hari.',
        color: '#3b82f6',
    },
    {
        icon: Brain,
        title: 'Prediksi AI',
        description: 'Analisis tren masa depan menggunakan algoritma kecerdasan buatan untuk mendeteksi lonjakan harga sebelum terjadi.',
        color: '#10b981',
    },
    {
        icon: Map,
        title: 'Pemetaan Risiko',
        description: 'Visualisasi wilayah dengan potensi kerawanan pangan dan titik panas kenaikan harga yang tidak stabil secara spasial.',
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
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tight"
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
                    <Card key={feature.title} delay={0.1 * i} className="group flex flex-col items-start h-full p-8">
                        <div
                            className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 transition-all duration-500 group-hover:rotate-[10deg] shadow-lg shadow-black/20"
                            style={{ backgroundColor: `${feature.color}15`, color: feature.color, border: `1px solid ${feature.color}30` }}
                        >
                            <feature.icon size={28} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                        <p className="text-muted-foreground text-base leading-relaxed mb-6 flex-grow">
                            {feature.description}
                        </p>
                        <motion.button
                            whileHover={{ x: 8 }}
                            className="text-white font-bold text-xs flex items-center gap-2 group/btn uppercase tracking-widest"
                            style={{ color: feature.color }}
                        >
                            Eksplorasi Fitur <span className="text-lg group-hover/btn:translate-x-1 transition-transform">→</span>
                        </motion.button>
                    </Card>
                ))}
            </div>
        </section>
    );
};
