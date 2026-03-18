"use client";

import React, { useState } from 'react';
import { MasterLayout } from '@/frontend/layouts/Master';
import { cn } from '@/frontend/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import {
    Filter,
    Activity,
    ChevronLeft,
    PanelLeftOpen,
    TrendingUp,
    ChevronDown
} from 'lucide-react';
import { provinces } from '@/frontend/lib/data/provinces';

// Dynamic import for Leaflet (No SSR)
const MapWithNoSSR = dynamic(
    () => import('./_components/LeafletMap'),
    {
        ssr: false,
        loading: () => (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Activity className="w-10 h-10 text-primary animate-pulse" />
                    <p className="text-primary font-bold tracking-widest uppercase text-[10px]">Loading Lightweight Map...</p>
                </div>
            </div>
        )
    }
);

export default function PetaRisikoPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedProvince, setSelectedProvince] = useState("Seluruh Indonesia");
    const [selectedCommodity, setSelectedCommodity] = useState("Semua Komoditas (IHK)");
    const [activeProvince, setActiveProvince] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Initial mobile check and resize listener
    React.useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // On very small screens, start with sidebar closed
            if (mobile) setIsSidebarOpen(false);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleFilterChange = () => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <MasterLayout>
            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background relative">
                {/* Sidebar */}
                <AnimatePresence initial={false}>
                    {isSidebarOpen && (
                        <motion.aside
                            initial={{ width: 0, x: -320, opacity: 0 }}
                            animate={{ width: 320, x: 0, opacity: 1 }}
                            exit={{ width: 0, x: -320, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="border-r border-slate-200 bg-white/95 backdrop-blur-xl flex flex-col z-20 shadow-xl shadow-black/5"
                        >
                            <div className="p-6 flex-1 overflow-y-auto min-h-0 custom-scrollbar" data-lenis-prevent>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Update</span>
                                    </div>
                                </div>

                                <h1 className="text-2xl font-bold text-foreground mb-2 leading-tight">Peta Risiko Inflasi</h1>
                                <p className="text-xs text-muted-foreground mb-8 leading-relaxed opacity-70">
                                    Analisis sebaran risiko inflasi berdasarkan data real-time di 38 Provinsi Indonesia.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">
                                        <Filter className="w-3 h-3" />
                                        Filter Analisis
                                    </div>

                                    {/* Province Selector */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Pilih Provinsi</label>
                                        <div className="relative group/select">
                                            <select
                                                value={selectedProvince}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setSelectedProvince(val);
                                                    if (val === "Seluruh Indonesia") {
                                                        setActiveProvince(null);
                                                    } else {
                                                        const found = provinces.find((p: any) => p.name === val);
                                                        if (found) setActiveProvince(found);
                                                    }
                                                    handleFilterChange();
                                                }}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer transition-all duration-500 hover:bg-white hover:border-primary/50"
                                            >
                                                <option>Seluruh Indonesia</option>
                                                <optgroup label="Pulau Jawa" className="bg-white">
                                                    <option>DKI Jakarta</option>
                                                    <option>Jawa Barat</option>
                                                    <option>Jawa Tengah</option>
                                                    <option>DI Yogyakarta</option>
                                                    <option>Jawa Timur</option>
                                                    <option>Banten</option>
                                                </optgroup>
                                                <optgroup label="Sumatera" className="bg-white">
                                                    <option>Sumatera Utara</option>
                                                    <option>Sumatera Barat</option>
                                                    <option>Sumatera Selatan</option>
                                                    <option>Riau</option>
                                                    <option>Lampung</option>
                                                </optgroup>
                                                <optgroup label="Sulawesi" className="bg-white">
                                                    <option>Sulawesi Selatan</option>
                                                    <option>Sulawesi Utara</option>
                                                    <option>Sulawesi Tengah</option>
                                                </optgroup>
                                                <optgroup label="Bali & Nusa Tenggara" className="bg-white">
                                                    <option>Bali</option>
                                                    <option>NTB</option>
                                                    <option>NTT</option>
                                                </optgroup>
                                                <optgroup label="Papua" className="bg-white">
                                                    <option>Papua</option>
                                                    <option>Papua Barat</option>
                                                </optgroup>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none group-hover/select:text-primary transition-colors duration-500" />
                                        </div>
                                    </div>

                                    {/* Commodity Selector */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Komoditas Utama</label>
                                        <div className="relative group/select">
                                            <select
                                                value={selectedCommodity}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setSelectedCommodity(val);
                                                    if (selectedProvince !== "Seluruh Indonesia") {
                                                        const found = provinces.find((p: any) => p.name === selectedProvince);
                                                        if (found) setActiveProvince(found);
                                                    }
                                                    handleFilterChange();
                                                }}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer transition-all duration-500 hover:bg-white hover:border-primary/50"
                                            >
                                                <option>Semua Komoditas (IHK)</option>
                                                <optgroup label="Bahan Pokok" className="bg-white">
                                                    <option>Beras</option>
                                                    <option>Minyak Goreng</option>
                                                    <option>Gula Pasir</option>
                                                    <option>Tepung Terigu</option>
                                                </optgroup>
                                                <optgroup label="Bumbu Dapur" className="bg-white">
                                                    <option>Cabai Merah</option>
                                                    <option>Cabai Rawit</option>
                                                    <option>Bawang Merah</option>
                                                    <option>Bawang Putih</option>
                                                </optgroup>
                                                <optgroup label="Protein" className="bg-white">
                                                    <option>Daging Sapi</option>
                                                    <option>Daging Ayam</option>
                                                    <option>Telur Ayam</option>
                                                </optgroup>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none group-hover/select:text-primary transition-colors duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mini Stats Card */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm group hover:shadow-2xl hover:shadow-blue-600/20 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-500 cursor-default">
                                 <div className="flex justify-between items-start mb-2 relative z-10">
                                    <p className="text-[9px] font-black text-muted-foreground group-hover:text-white/70 uppercase tracking-widest transition-colors duration-500">Rerata Nasional</p>
                                    <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:bg-white transition-all duration-500">
                                        <TrendingUp className="w-3 h-3 text-red-500 group-hover:text-red-600 transition-colors duration-500" />
                                    </div>
                                </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-black text-foreground group-hover:text-white transition-colors duration-500">2.75%</span>
                                        <span className="text-[10px] font-bold text-red-500 group-hover:text-white/80 transition-colors duration-500">+0.42%</span>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Sidebar Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={cn(
                        "absolute top-6 z-[1010] w-10 h-10 bg-white border border-slate-200 rounded-xl shadow-xl flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary/5 hover:border-primary/30 group",
                        isSidebarOpen ? "left-[300px]" : "left-6"
                    )}
                    title={isSidebarOpen ? "Tutup Sidebar" : "Buka Sidebar"}
                >
                    {isSidebarOpen ? <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" /> : <PanelLeftOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                </button>

                {/* Map Area */}
                <main className="flex-1 relative bg-slate-100">
                    <MapWithNoSSR
                        provinces={provinces}
                        onProvinceClick={(prov: any) => setActiveProvince(prov)}
                        selectedCommodity={selectedCommodity}
                        activeProvince={activeProvince}
                        isSidebarOpen={isSidebarOpen}
                    />

                    {/* Legend */}
                    <div className="absolute bottom-8 right-8 z-[1000]">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-2xl min-w-[240px] group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Legenda Risiko</h4>
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between group/item cursor-help">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)] group-hover/item:scale-125 transition-transform" />
                                        <span className="text-xs font-bold text-foreground">Tinggi</span>
                                    </div>
                                    <span className="text-[8px] font-black text-red-500 uppercase opacity-0 group-hover/item:opacity-100 transition-opacity">Intervensi</span>
                                </div>
                                <div className="flex items-center justify-between group/item cursor-help">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)] group-hover/item:scale-125 transition-transform" />
                                        <span className="text-xs font-bold text-foreground">Sedang</span>
                                    </div>
                                    <span className="text-[8px] font-black text-amber-500 uppercase opacity-0 group-hover/item:opacity-100 transition-opacity">Waspada</span>
                                </div>
                                <div className="flex items-center justify-between group/item cursor-help">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] group-hover/item:scale-125 transition-transform" />
                                        <span className="text-xs font-bold text-foreground">Rendah</span>
                                    </div>
                                    <span className="text-[8px] font-black text-emerald-500 uppercase opacity-0 group-hover/item:opacity-100 transition-opacity">Aman</span>
                                </div>
                            </div>
                            
                            <div className="mt-6 pt-4 border-t border-slate-100">
                                <p className="text-[8px] text-muted-foreground leading-relaxed italic">
                                    *Data dihitung berdasarkan deviasi harga 7 hari terakhir dari rata-rata historis.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </MasterLayout>
    );
}
