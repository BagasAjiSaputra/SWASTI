"use client";

import React from 'react';
import { MasterLayout } from '@/frontend/layouts/Master';
import { Card } from '@/frontend/_components/ui/Card';
import { Button } from '@/frontend/_components/ui/Button';
import { 
    AlertTriangle, 
    ArrowUpRight, 
    TrendingUp, 
    Bell, 
    MapPin, 
    Calendar,
    ChevronRight,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/frontend/lib/utils';
import Link from 'next/link';

const alerts = [
    {
        id: 1,
        region: "Jawa Timur",
        commodity: "Cabai Merah",
        currentPrice: "Rp 46.800",
        increase: "+8.7%",
        status: "Kritis",
        statusColor: "text-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        description: "Kenaikan harga signifikan di atas batas normal dalam 3 hari terakhir."
    },
    {
        id: 2,
        region: "Jawa Barat",
        commodity: "Beras Premium",
        currentPrice: "Rp 15.200",
        increase: "+4.2%",
        status: "Waspada",
        statusColor: "text-amber-500",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        description: "Tren kenaikan terpantau stabil, mendekati Harga Eceran Tertinggi (HET)."
    },
    {
        id: 3,
        region: "Sumatera Selatan",
        commodity: "Bawang Merah",
        currentPrice: "Rp 34.500",
        increase: "+5.1%",
        status: "Waspada",
        statusColor: "text-amber-500",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        description: "Gangguan distribusi lokal menyebabkan stok menipis di pasar utama."
    }
];

export default function PeringatanDiniPage() {
    return (
        <MasterLayout>
            <div className="min-h-screen bg-slate-950 text-slate-200 pt-6 pb-12 px-6 lg:px-12 relative overflow-hidden">
                {/* Dark Premium Glows */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-40 right-1/4 w-[800px] h-[800px] bg-red-600/5 blur-[180px] rounded-full pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center border border-red-500/30">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                            </div>
                            <span className="text-xs font-black text-red-500 uppercase tracking-[0.2em]">Early Warning System</span>
                            <div className="h-[1px] w-12 bg-slate-800" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Real-time monitoring</span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6"
                        >
                            Sistem <span className="text-red-500 italic">Peringatan</span> <br />Dini Inflasi
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-400 max-w-2xl leading-relaxed"
                        >
                            Terdeteksi 3 wilayah dengan anomali harga pangan hari ini. Tindakan preventif disarankan untuk menjaga stabilitas pasokan lokal.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                        {alerts.map((alert, i) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                            >
                                <Card className={cn(
                                    "p-6 h-full flex flex-col justify-between transition-all duration-500 border border-white/5 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/10 group overflow-hidden relative"
                                )}>
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-2xl">
                                                    <MapPin className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{alert.region}</p>
                                                    <h3 className="text-xl font-bold text-white">{alert.commodity}</h3>
                                                </div>
                                            </div>
                                            <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", alert.bgColor, alert.statusColor, alert.borderColor)}>
                                                {alert.status}
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-end p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Harga Saat Ini</p>
                                                    <p className="text-2xl font-black text-white">{alert.currentPrice}</p>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-red-500 font-bold">
                                                    <TrendingUp className="w-4 h-4" />
                                                    <span>{alert.increase}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                                {alert.description}
                                            </p>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-white text-slate-950 hover:bg-slate-200 font-bold py-6 rounded-2xl gap-2 transition-all">
                                        <Link href="/analisis-harga" className="flex items-center gap-2">
                                            Detail Analisis <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </Button>

                                    {/* Decorative noise */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-8 bg-blue-600 border-none relative overflow-hidden group">
                            <div className="relative z-10">
                                <Bell className="w-12 h-12 text-white/50 mb-6 group-hover:scale-110 transition-transform duration-500" />
                                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Aktifkan Notifikasi Blast?</h3>
                                <p className="text-blue-100/80 mb-8 max-w-sm font-medium leading-relaxed">
                                    Dapatkan peringatan instan melalui WhatsApp dan Email untuk setiap perubahan harga di atas 5% secara otomatis.
                                </p>
                                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-black px-8 py-6 rounded-2xl shadow-xl">
                                    Konfigurasi Blast
                                </Button>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full pointer-events-none" />
                        </Card>

                        <div className="space-y-6 flex flex-col">
                            <Card className="flex-1 p-8 bg-white/5 border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center">
                                        <Search className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">Cari Wilayah Lain</h4>
                                        <p className="text-slate-500 text-sm font-medium">Cek potensi risiko di provinsi lain.</p>
                                    </div>
                                    <Button size="sm" className="ml-auto rounded-xl bg-white/10 hover:bg-white/20 text-white">
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </Card>

                            <Card className="flex-1 p-8 bg-white/5 border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">Laporan Historis EWS</h4>
                                        <p className="text-slate-500 text-sm font-medium">Lihat riwayat peringatan bulan Januari.</p>
                                    </div>
                                    <Button size="sm" className="ml-auto rounded-xl bg-white/10 hover:bg-white/20 text-white">
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}
