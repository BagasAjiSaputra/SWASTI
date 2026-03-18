"use client";

import React, { useState } from 'react';
import { MasterLayout } from '@/frontend/layouts/Master';
import { Card } from '@/frontend/_components/ui/Card';
import { Button } from '@/frontend/_components/ui/Button';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    ComposedChart,
    Line
} from 'recharts';
import { 
    BrainCircuit, 
    TrendingUp, 
    CloudRain, 
    Calendar, 
    Truck, 
    Info,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/frontend/lib/utils';

// Mock data for prediction with confidence interval
const predictionData = [
    { name: 'Jan', actual: 42000, predicted: 42000, lower: 42000, upper: 42000 },
    { name: 'Feb', actual: 43500, predicted: 43500, lower: 43500, upper: 43500 },
    { name: 'Mar', actual: 41000, predicted: 41000, lower: 41000, upper: 41000 },
    { name: 'Apr', actual: 44000, predicted: 44000, lower: 44000, upper: 44000 },
    { name: 'Mei', actual: null, predicted: 46000, lower: 44500, upper: 48000 },
    { name: 'Jun', actual: null, predicted: 48500, lower: 46000, upper: 51000 },
    { name: 'Jul', actual: null, predicted: 47000, lower: 43000, upper: 50500 },
];

const riskFactors = [
    {
        icon: CloudRain,
        label: "Anomali Cuaca",
        level: "Tinggi",
        color: "text-red-500",
        desc: "Curah hujan tinggi di sentra produksi Jawa Timur menghambat panen raya."
    },
    {
        icon: Calendar,
        label: "Hari Besar",
        level: "Sedang",
        color: "text-amber-500",
        desc: "Peningkatan permintaan menjelang HBKN Idul Adha mulai terasa di pasar."
    },
    {
        icon: Truck,
        label: "Distribusi",
        level: "Rendah",
        color: "text-emerald-500",
        desc: "Kelancaran logistik antar pulau terpantau stabil tanpa kendala berarti."
    }
];

export default function PrediksiPage() {
    return (
        <MasterLayout>
            <div className="min-h-screen bg-background text-foreground pt-6 pb-12 px-6 lg:px-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">SWASTI Intelligence</span>
                                <div className="h-[1px] w-8 bg-slate-200" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Predictive Analytics</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9]">
                                Dashboard <span className="text-primary italic">Prediksi</span> AI
                            </h1>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-white border border-slate-200 p-2 rounded-2xl shadow-sm">
                            <Button variant="ghost" className="rounded-xl font-bold bg-slate-50">30 Hari</Button>
                            <Button variant="ghost" className="rounded-xl font-bold">90 Hari</Button>
                            <Button variant="ghost" className="rounded-xl font-bold">1 Tahun</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                        <Card className="lg:col-span-3 p-8 bg-white border-slate-200 shadow-sm overflow-hidden">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
                                <div>
                                    <h2 className="text-xl font-black text-foreground mb-1 tracking-tight">Proyeksi Harga Cabai Merah</h2>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Estimasi berbasis Deep Learning Model v2.4</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                        <span className="text-[9px] font-black text-muted-foreground uppercase">Actual</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-primary/30" />
                                        <span className="text-[9px] font-black text-muted-foreground uppercase">Confidence Area</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={predictionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 11, fontWeight: 900 }}
                                            dy={15}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 11, fontWeight: 900 }}
                                            tickFormatter={(val) => `Rp${val/1000}k`}
                                        />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                                            itemStyle={{ fontWeight: 900, color: '#2563eb' }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="upper" 
                                            stroke="none" 
                                            fill="url(#colorConfidence)" 
                                            connectNulls
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="lower" 
                                            stroke="none" 
                                            fill="#fff" 
                                            connectNulls
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="actual" 
                                            stroke="#2563eb" 
                                            strokeWidth={4} 
                                            dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} 
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="predicted" 
                                            stroke="#2563eb" 
                                            strokeWidth={3} 
                                            strokeDasharray="8 8" 
                                            dot={false}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        <div className="space-y-6">
                            <Card className="p-6 bg-primary text-white border-none shadow-xl shadow-primary/20 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                                        <BrainCircuit className="w-5 h-5" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Confidence Level</p>
                                    <h3 className="text-4xl font-black mb-1">89.4%</h3>
                                    <p className="text-xs text-white/80 font-medium leading-relaxed">
                                        Model memiliki akurasi tinggi untuk prediksi 14 hari ke depan.
                                    </p>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                            </Card>

                            <Card className="p-6 bg-white border-slate-200 shadow-sm">
                                <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-6">Faktor Risiko Utama</h4>
                                <div className="space-y-6">
                                    {riskFactors.map((risk, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                                                <risk.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-bold text-foreground">{risk.label}</span>
                                                    <span className={cn("text-[8px] font-black uppercase px-2 py-0.5 rounded-full border", risk.color, risk.color.replace('text', 'bg') + '/10', risk.color.replace('text', 'border') + '/20')}>
                                                        {risk.level}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                                                    {risk.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-8 bg-slate-900 border-none group cursor-pointer hover:bg-slate-800 transition-colors">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Rekomendasi Kebijakan</h4>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">Strategi intervensi pasar berdasarkan prediksi tren harga.</p>
                        </Card>
                        
                        <Card className="p-8 bg-white border-slate-200 group cursor-pointer hover:border-primary/30 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                                    <Info className="w-6 h-6" />
                                </div>
                                <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
                            </div>
                            <h4 className="text-xl font-bold text-foreground mb-2">Metodologi AI</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed font-medium">Pelajari bagaimana model kami memproses ribuan data poin.</p>
                        </Card>

                        <Card className="p-8 bg-white border-slate-200 group cursor-pointer hover:border-primary/30 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                                    <CloudRain className="w-6 h-6" />
                                </div>
                                <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
                            </div>
                            <h4 className="text-xl font-bold text-foreground mb-2">Analisis Cuaca</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed font-medium">Detail korelasi antara curah hujan dan harga komoditas.</p>
                        </Card>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}
