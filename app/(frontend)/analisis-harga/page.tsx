"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { MasterLayout } from '@/frontend/layouts/Master';
import { Card } from '@/frontend/_components/ui/Card';
import { Button } from '@/frontend/_components/ui/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { cn } from '@/frontend/lib/utils';
import {
    TrendingUp,
    TrendingDown,
    Download,
    RefreshCcw,
    Calendar,
    ChevronDown,
    AlertCircle,
    ArrowUpRight,
    Search,
    MapPin,
    Layers,
    Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalisisHargaPage() {
    const [selectedCommodity, setSelectedCommodity] = useState("Cabai Merah");
    const [selectedRegion, setSelectedRegion] = useState("Nasional");
    const [startDate, setStartDate] = useState("2026-01-01");
    const [endDate, setEndDate] = useState("2026-06-30");

    // Formatter for display
    const formatDateObj = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
    };

    // Formatted range string for headers
    const displayRange = `${formatDateObj(startDate)} - ${formatDateObj(endDate)}`;

    const [isHydrated, setIsHydrated] = useState(false);
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Generate realistic data
    const generateData = (startStr: string, endStr: string, commodity: string) => {
        const start = new Date(startStr);
        const end = new Date(endStr);
        const data = [];

        const basePrices: Record<string, number> = {
            "Beras Premium": 14500,
            "Cabai Merah": 45000,
            "Bawang Merah": 32000,
            "Daging Ayam": 38000,
        };
        const basePrice = basePrices[commodity] || 25000;

        let currentDate = new Date(start);
        let currentPrice = basePrice;

        while (currentDate <= end) {
            const volatility = basePrice * 0.04;
            const change = (Math.random() - 0.48) * volatility;
            currentPrice = Math.max(basePrice * 0.5, currentPrice + change);

            data.push({
                date: new Date(currentDate).getTime(),
                value: Math.round(currentPrice / 100) * 100
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (data.length === 0) data.push({ date: new Date(), value: basePrice });
        return data;
    };

    useEffect(() => {
        if (!isHydrated) return;
        const newData = generateData(startDate, endDate, selectedCommodity);
        setChartData(newData);
    }, [startDate, endDate, selectedCommodity, isHydrated]);

    const stats = useMemo(() => {
        if (!isHydrated || chartData.length === 0) {
            return { avg: 0, max: 0, min: 0, maxDate: new Date(), minDate: new Date() };
        }

        let sum = 0, max = chartData[0].value, min = chartData[0].value;
        let maxDate = new Date(chartData[0].date), minDate = new Date(chartData[0].date);

        chartData.forEach(d => {
            sum += d.value;
            if (d.value > max) { max = d.value; maxDate = new Date(d.date); }
            if (d.value < min) { min = d.value; minDate = new Date(d.date); }
        });

        return {
            avg: Math.round(sum / chartData.length),
            max, min, maxDate, minDate
        };
    }, [chartData, isHydrated]);

    const formatRupiah = (val: number) => {
        const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
        return formatted.replace(/^Rp/, 'Rp ').replace(/\s+/g, ' ').trim();
    };

    const formatDateS = (date: Date) => date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

    const regionsData = [
        { name: "Jawa Barat", price: "44.500", status: "Waspada", statusColor: "warning", change: "+4.2%", trend: "up", supply: 60 },
        { name: "Sumatera Utara", price: "42.000", status: "Stabil", statusColor: "success", change: "-1.5%", trend: "down", supply: 80 },
        { name: "Jawa Timur", price: "46.800", status: "Kritis", statusColor: "danger", change: "+8.7%", trend: "up", supply: 40 },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            let dateLabel = label;
            try {
                if (!(label instanceof Date)) {
                    dateLabel = new Date(label);
                }
                dateLabel = dateLabel.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
            } catch (e) {}
            return (
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-xl relative backdrop-blur-md">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5">{dateLabel}</p>
                    <p className="text-xl font-black text-foreground tracking-tight">{formatRupiah(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    const currentBenchmark = useMemo(() => {
        const benchmarks: Record<string, number> = {
            "Beras Premium": 13900,
            "Cabai Merah": 37000,
            "Bawang Merah": 32000,
            "Daging Ayam": 36750,
        };
        return benchmarks[selectedCommodity] || 0;
    }, [selectedCommodity]);

    return (
        <MasterLayout>
            <div className="min-h-screen bg-background text-foreground pt-6 pb-12 px-6 lg:px-12 relative overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-40 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Activity className="w-3.5 h-3.5 text-primary text-xs" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Market Radar</span>
                                <div className="h-[1px] w-8 bg-slate-200" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live Analysis</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9]">
                                Analisis Tren <span className="text-primary italic">Harga</span>
                            </h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="h-9 gap-2 px-3 rounded-md transition-all font-bold">
                                <Download className="w-3 h-3" />
                                Ekspor
                            </Button>
                            <Button className="h-9 bg-primary hover:bg-blue-700 text-[10px] font-bold text-white gap-2 px-4 rounded-md transition-all shadow-md">
                                <RefreshCcw className="w-3 h-3" />
                                Perbarui
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                        {/* Selector Cards */}
                        {[
                            { label: "Pilih Komoditas", icon: Layers, value: selectedCommodity, setter: setSelectedCommodity, options: ["Beras Premium", "Cabai Merah", "Bawang Merah", "Daging Ayam"] },
                            { label: "Cakupan Wilayah", icon: MapPin, value: selectedRegion, setter: setSelectedRegion, options: ["Nasional", "Jawa Barat", "DKI Jakarta"] },
                        ].map((selector, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between group hover:bg-slate-50 transition-all cursor-pointer relative overflow-hidden shadow-sm">
                                <div className="flex items-center gap-4 relative z-10 w-full">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shrink-0 border border-primary/20 shadow-inner">
                                        <selector.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{selector.label}</span>
                                        <div className="relative w-full">
                                            <select
                                                value={selector.value}
                                                onChange={(e) => selector.setter(e.target.value)}
                                                className="bg-transparent text-sm font-bold text-foreground outline-none cursor-pointer pr-8 appearance-none w-full truncate"
                                            >
                                                {selector.options.map(opt => <option key={opt} className="bg-white text-foreground">{opt}</option>)}
                                            </select>
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-md border border-slate-200 bg-slate-50 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all pointer-events-none">
                                                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-[40px] rounded-full -mr-12 -mt-12 pointer-events-none" />
                            </div>
                        ))}

                        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between group hover:bg-slate-50 transition-all relative overflow-hidden shadow-sm">
                            <div className="flex items-center gap-4 relative z-10 w-full">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shrink-0 border border-primary/20 shadow-inner">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Rentang Tanggal</span>
                                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-sm font-bold text-foreground outline-none cursor-pointer w-full hover:border-primary/40 transition-all"
                                        />
                                        <span className="hidden sm:inline-block text-slate-300 font-bold">-</span>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-sm font-bold text-foreground outline-none cursor-pointer w-full hover:border-primary/40 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="space-y-4">
                         <Card className="p-5 bg-white border-slate-200 shadow-sm transition-all duration-700 hover:bg-blue-600 hover:border-blue-500 overflow-hidden hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)]">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                <Activity className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-500" />
                            </div>
                            <p className="text-[9px] font-black text-muted-foreground group-hover:text-blue-100/90 uppercase tracking-[0.2em] mb-2 transition-colors duration-500">Rerata Harga</p>
                            <div className="flex items-baseline gap-1.5 mb-2">
                                <h3 className="text-2xl font-black text-foreground group-hover:text-white tracking-tight transition-colors duration-500">
                                    {isHydrated && stats.avg > 0 ? formatRupiah(stats.avg) : "---"}
                                </h3>
                                <span className="text-xs font-bold text-muted-foreground group-hover:text-blue-100/60 transition-colors duration-500">/kg</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-white group-hover:border-white/30 transition-all duration-500">
                                    <TrendingUp className="w-3 h-3 text-emerald-600 group-hover:text-emerald-500 transition-colors duration-500" />
                                    <span className="text-[9px] font-black text-emerald-600 group-hover:text-emerald-500 transition-colors duration-500">+12.5%</span>
                                </div>
                            </div>
                        </Card>

                        {[
                            { label: "Harga Tertinggi", value: isHydrated && stats.max > 0 ? formatRupiah(stats.max) : "---", date: isHydrated && stats.max > 0 ? formatDateS(stats.maxDate) : "Memuat..." },
                            { label: "Harga Terendah", value: isHydrated && stats.min > 0 ? formatRupiah(stats.min) : "---", date: isHydrated && stats.min > 0 ? formatDateS(stats.minDate) : "Memuat..." },
                        ].map((s, idx) => (
                             <Card key={idx} className="p-5 bg-white border-slate-200 shadow-sm transition-all duration-700 hover:bg-blue-600 hover:border-blue-500 overflow-hidden hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)]">
                                <p className="text-[9px] font-black text-muted-foreground group-hover:text-blue-100/90 uppercase tracking-[0.2em] mb-2 transition-colors duration-500">{s.label}</p>
                                <h3 className="text-xl font-black text-foreground group-hover:text-white mb-1 tracking-tight transition-colors duration-500">{s.value}</h3>
                                <p className="text-[9px] font-medium text-muted-foreground group-hover:text-blue-200/60 italic transition-colors duration-500">Tercatat pada: {s.date}</p>
                            </Card>
                        ))}

                         <Card className="p-5 bg-blue-50/10 border-blue-100 flex flex-col justify-between transition-all duration-700 shadow-sm hover:bg-blue-600 hover:border-blue-500 overflow-hidden hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)]">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-5 h-5 rounded-md bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-white group-hover:border-white/30 transition-all duration-500">
                                        <Activity className="w-3 h-3 text-primary group-hover:text-blue-600 transition-colors duration-500" />
                                    </div>
                                    <h4 className="text-[9px] font-black text-primary group-hover:text-white uppercase tracking-widest transition-colors duration-500">AI Insight</h4>
                                </div>
                                <p className="text-[10px] text-slate-600 group-hover:text-white/90 leading-relaxed mb-3 font-medium transition-colors duration-500">
                                    Tren menunjukkan kenaikan harga yang stabil akibat anomali cuaca. Prediksi harga akan tetap tinggi hingga akhir kuartal.
                                </p>
                            </div>
                            <Button variant="ghost" className="p-0 h-auto text-[9px] font-bold text-primary hover:bg-transparent group-hover:text-white gap-1 uppercase tracking-widest transition-colors duration-500">
                                Lihat detail lengkap <ArrowUpRight className="w-2.5 h-2.5" />
                            </Button>
                        </Card>
                    </div>

                    <div className="lg:col-span-3">
                        <Card className="h-full min-h-[420px] p-6 bg-white border-slate-200 shadow-sm hover:shadow-sm hover:border-slate-200 hover:bg-white hover:text-foreground whitespace-nowrap">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
                                <div>
                                    <h2 className="text-lg font-black text-foreground mb-1 tracking-tight">Tren Harga {selectedCommodity}</h2>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{displayRange}</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-2 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-2 px-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Harga Pasar</span>
                                    </div>
                                    <div className="w-px h-3 bg-slate-200" />
                                    <div className="flex items-center gap-2 px-2">
                                        <div className="w-2 h-0.5 bg-amber-500 border-t border-dashed border-amber-500" />
                                        <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">HET</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[350px] mt-4 relative">
                                {isHydrated && chartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                                            <defs>
                                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                            <XAxis
                                                dataKey="date"
                                                tickFormatter={(tick) => {
                                                    try {
                                                        return new Date(tick).toLocaleDateString('id-ID', { month: 'short' }).toUpperCase();
                                                    } catch (e) { return '' }
                                                }}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 10, fontWeight: 900 }}
                                                dy={10}
                                            />
                                            <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }} />
                                            {isHydrated && currentBenchmark > 0 && (
                                                <ReferenceLine y={currentBenchmark} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={1.5}>
                                                    <Label value="HET" position="insideTopRight" fill="#f59e0b" fontSize={10} fontWeight={900} />
                                                </ReferenceLine>
                                            )}
                                            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" isAnimationActive={false} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <RefreshCcw className="w-6 h-6 text-primary/30 animate-spin" />
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-4">
                        <Card className="p-8 bg-white border-slate-200 shadow-sm hover:shadow-sm hover:border-slate-200 hover:bg-white hover:text-foreground">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-black text-foreground">Data Historis Wilayah</h3>
                                <Button variant="ghost" className="text-[10px] font-bold text-primary hover:bg-primary/10 gap-2 uppercase tracking-widest">
                                    Lihat Semua Data <ArrowUpRight className="w-3 h-3" />
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            {["Wilayah", "Harga Terkini", "Status", "Perubahan 7 Hari", "Tingkat Pasokan"].map(h => (
                                                <th key={h} className="text-left py-4 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {regionsData.map((region, idx) => (
                                            <tr key={idx} className="group transition-colors">
                                                <td className="py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                            <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                                        </div>
                                                        <span className="text-sm font-bold text-foreground/80">{region.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-5 font-bold text-foreground">Rp {region.price}</td>
                                                <td className="py-5">
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border",
                                                        region.statusColor === 'warning' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                        region.statusColor === 'success' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                        "bg-red-50 text-red-600 border-red-100"
                                                    )}>
                                                        {region.status}
                                                    </span>
                                                </td>
                                                <td className="py-5">
                                                    <span className={cn("text-sm font-bold", region.trend === 'up' ? "text-red-500" : "text-emerald-500")}>{region.change}</span>
                                                </td>
                                                <td className="py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div className="h-full bg-primary" style={{ width: `${region.supply}%` }} />
                                                        </div>
                                                        <span className="text-[10px] font-black text-muted-foreground">{region.supply}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}
