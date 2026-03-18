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

    const provinces = [
        // Sumatera
        { name: 'Aceh', coords: [4.6951, 96.7494], risk: 'Sedang', value: '2.45%', commodity: 'Beras' },
        { name: 'Sumatera Utara', coords: [2.1121, 99.1332], risk: 'Sedang', value: '2.85%', commodity: 'Bawang Merah' },
        { name: 'Sumatera Barat', coords: [-0.7392, 100.8000], risk: 'Tinggi', value: '3.90%', commodity: 'Cabai Rawit' },
        { name: 'Riau', coords: [0.5071, 101.4478], risk: 'Rendah', value: '1.92%', commodity: 'Minyak Goreng' },
        { name: 'Kepulauan Riau', coords: [3.9456, 108.1428], risk: 'Sedang', value: '2.10%', commodity: 'Daging Ayam' },
        { name: 'Jambi', coords: [-1.6101, 103.6131], risk: 'Tinggi', value: '4.15%', commodity: 'Cabai Merah' },
        { name: 'Bengkulu', coords: [-3.7928, 102.2608], risk: 'Sedang', value: '3.05%', commodity: 'Beras' },
        { name: 'Sumatera Selatan', coords: [-3.3194, 104.9147], risk: 'Sedang', value: '2.65%', commodity: 'Gula Pasir' },
        { name: 'Kepulauan Bangka Belitung', coords: [-2.1317, 106.1169], risk: 'Tinggi', value: '3.75%', commodity: 'Ikan Segar' },
        { name: 'Lampung', coords: [-4.5586, 105.4068], risk: 'Sedang', value: '2.90%', commodity: 'Beras' },

        // Jawa
        { name: 'DKI Jakarta', coords: [-6.2088, 106.8456], risk: 'Sedang', value: '2.95%', commodity: 'Daging Sapi' },
        { name: 'Jawa Barat', coords: [-6.9175, 107.6191], risk: 'Tinggi', value: '4.10%', commodity: 'Beras' },
        { name: 'Banten', coords: [-6.4058, 106.0600], risk: 'Sedang', value: '3.25%', commodity: 'Telur Ayam' },
        { name: 'Jawa Tengah', coords: [-7.0624, 110.4203], risk: 'Sedang', value: '3.15%', commodity: 'Bawang Merah' },
        { name: 'DI Yogyakarta', coords: [-7.7956, 110.3695], risk: 'Rendah', value: '1.85%', commodity: 'Stabil' },
        { name: 'Jawa Timur', coords: [-7.5, 112.7], risk: 'Tinggi', value: '3.42%', commodity: 'Cabai Merah' },

        // Bali & Nusa Tenggara
        { name: 'Bali', coords: [-8.3405, 115.0920], risk: 'Sedang', value: '2.70%', commodity: 'Daging Ayam' },
        { name: 'NTB', coords: [-8.6529, 117.3616], risk: 'Rendah', value: '1.50%', commodity: 'Jagung' },
        { name: 'NTT', coords: [-8.6574, 121.0794], risk: 'Tinggi', value: '4.80%', commodity: 'Beras' },

        // Kalimantan
        { name: 'Kalimantan Barat', coords: [-0.2787, 110.3204], risk: 'Sedang', value: '2.80%', commodity: 'Bawang Putih' },
        { name: 'Kalimantan Tengah', coords: [-1.6815, 113.3824], risk: 'Tinggi', value: '4.30%', commodity: 'Beras' },
        { name: 'Kalimantan Selatan', coords: [-3.0926, 115.2838], risk: 'Sedang', value: '3.10%', commodity: 'Daging Ayam' },
        { name: 'Kalimantan Timur', coords: [0.5387, 116.4194], risk: 'Sedang', value: '2.95%', commodity: 'Minyak Goreng' },
        { name: 'Kalimantan Utara', coords: [3.0731, 116.0414], risk: 'Rendah', value: '1.75%', commodity: 'Cabai Rawit' },

        // Sulawesi
        { name: 'Sulawesi Utara', coords: [0.6247, 123.9750], risk: 'Rendah', value: '1.40%', commodity: 'Tomat' },
        { name: 'Gorontalo', coords: [0.6999, 122.4467], risk: 'Sedang', value: '2.50%', commodity: 'Jagung' },
        { name: 'Sulawesi Tengah', coords: [-1.4300, 121.4456], risk: 'Tinggi', value: '3.85%', commodity: 'Beras' },
        { name: 'Sulawesi Barat', coords: [-2.8440, 119.2321], risk: 'Sedang', value: '2.75%', commodity: 'Minyak Goreng' },
        { name: 'Sulawesi Selatan', coords: [-3.6688, 119.9740], risk: 'Sedang', value: '3.20%', commodity: 'Beras' },
        { name: 'Sulawesi Tenggara', coords: [-4.1449, 122.1746], risk: 'Tinggi', value: '4.20%', commodity: 'Cabai Merah' },

        // Maluku & Papua
        { name: 'Maluku', coords: [-3.2385, 130.1453], risk: 'Tinggi', value: '4.60%', commodity: 'Ikan Segar' },
        { name: 'Maluku Utara', coords: [0.6328, 127.8488], risk: 'Tinggi', value: '4.95%', commodity: 'Beras' },
        { name: 'Papua Barat', coords: [-1.3, 133.0], risk: 'Tinggi', value: '5.10%', commodity: 'Gula Pasir' },
        { name: 'Papua Barat Daya', coords: [-0.8833, 131.25], risk: 'Sedang', value: '3.40%', commodity: 'Beras' },
        { name: 'Papua', coords: [-4.2699, 138.0804], risk: 'Tinggi', value: '5.20%', commodity: 'Beras' },
        { name: 'Papua Tengah', coords: [-3.9, 136.0], risk: 'Tinggi', value: '4.85%', commodity: 'Telur Ayam' },
        { name: 'Papua Pegunungan', coords: [-4.0, 139.0], risk: 'Tinggi', value: '5.50%', commodity: 'Ubi Jalar' },
        { name: 'Papua Selatan', coords: [-7.0, 140.0], risk: 'Sedang', value: '3.15%', commodity: 'Beras' },
    ];

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
                                                        const found = provinces.find(p => p.name === val);
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
                                                        const found = provinces.find(p => p.name === selectedProvince);
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
                        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-5 shadow-2xl min-w-[200px]">
                            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Legenda</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                                    <span className="text-xs font-bold text-foreground/80">Risiko Tinggi</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    <span className="text-xs font-bold text-foreground/80">Risiko Rendah</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </MasterLayout>
    );
}
