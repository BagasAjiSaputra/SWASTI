"use client";

import React from 'react';
import { MasterLayout } from '@/frontend/layouts/Master';
import { Card } from '@/frontend/_components/ui/Card';
import { Button } from '@/frontend/_components/ui/Button';
import { 
    FileText, 
    Download, 
    Calendar, 
    ArrowUpRight, 
    PieChart, 
    TrendingUp,
    ChevronRight,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const reports = [
    {
        title: "Laporan Ketahanan Pangan Februari 2026",
        date: "01 Mar 2026",
        type: "Monthly Report",
        size: "4.2 MB",
        tags: ["Inflasi", "Stabilitas", "Nasional"]
    },
    {
        title: "Analisis Volatilitas Harga Cabai Merah",
        date: "24 Feb 2026",
        type: "Special Analysis",
        size: "2.8 MB",
        tags: ["Komoditas", "Waspada"]
    },
    {
        title: "Laporan Tahunan SWASTI 2025",
        date: "15 Jan 2026",
        type: "Annual Report",
        size: "12.5 MB",
        tags: ["Archive", "Full Data"]
    }
];

export default function LaporanPage() {
    return (
        <MasterLayout>
            <div className="min-h-screen bg-background text-foreground pt-6 pb-12 px-6 lg:px-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Repository Data</span>
                                <div className="h-[1px] w-8 bg-slate-200" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Reports & Insights</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9]">
                                Pusat <span className="text-primary italic">Laporan</span> Digital
                            </h1>
                        </div>

                        <div className="relative group w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Cari laporan..." 
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3 space-y-4">
                            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-6">Laporan Terbaru</h3>
                            {reports.map((report, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Card className="p-6 bg-white border-slate-200 hover:border-primary/30 transition-all group cursor-default">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex gap-5">
                                                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all shrink-0">
                                                    <FileText className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{report.type}</span>
                                                        <span className="text-slate-300">•</span>
                                                        <span className="text-[10px] font-bold text-muted-foreground">{report.date}</span>
                                                    </div>
                                                    <h4 className="text-xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">{report.title}</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {report.tags.map((tag, j) => (
                                                            <span key={j} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3">
                                                <div className="text-right hidden md:block">
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">Size</p>
                                                    <p className="text-sm font-bold text-foreground">{report.size}</p>
                                                </div>
                                                <Button className="h-12 w-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20">
                                                    <Download className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}

                            <div className="pt-8">
                                <Button variant="outline" className="w-full py-8 rounded-3xl border-dashed border-2 font-black text-muted-foreground hover:bg-slate-50 hover:text-primary hover:border-primary transition-all">
                                    Lihat Arsip Laporan Lainnya
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="p-8 bg-slate-900 text-white border-none relative overflow-hidden">
                                <PieChart className="w-12 h-12 text-white/20 mb-6" />
                                <h3 className="text-2xl font-black mb-4">Generate Laporan Kustom</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">Buat laporan PDF otomatis berdasarkan parameter yang Anda tentukan.</p>
                                <Button className="w-full bg-primary hover:bg-blue-700 text-white font-black py-6 rounded-2xl gap-2 shadow-xl shadow-primary/20">
                                    Mulai Generate <ArrowUpRight className="w-4 h-4" />
                                </Button>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                            </Card>

                            <Card className="p-8 bg-white border-slate-200">
                                <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-6">Statistik Download</h4>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span className="text-sm font-bold text-slate-600">Total Unduhan</span>
                                        </div>
                                        <span className="text-sm font-black text-foreground">1,284</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            <span className="text-sm font-bold text-slate-600">User Aktif</span>
                                        </div>
                                        <span className="text-sm font-black text-foreground">42</span>
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between group cursor-pointer">
                                        <span className="text-xs font-black text-primary uppercase tracking-widest">Detail Activity</span>
                                        <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}
