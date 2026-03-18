"use client";

import React, { useState } from 'react';
import { 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Edit, 
    Trash2, 
    Database, 
    TrendingUp, 
    TrendingDown,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Button } from '../_components/ui/Button';
import { Card } from '../_components/ui/Card';
import { motion } from 'framer-motion';

const commodities = [
    { id: 1, name: "Beras Premium", category: "Pangan Pokok", price: "Rp 15.200", trend: "+2.4%", status: "Stabil" },
    { id: 2, name: "Cabai Merah", category: "Hortikutura", price: "Rp 46.800", trend: "+8.7%", status: "Meningkat" },
    { id: 3, name: "Bawang Merah", category: "Hortikutura", price: "Rp 34.500", trend: "-1.2%", status: "Menurun" },
    { id: 4, name: "Daging Sapi", category: "Peternakan", price: "Rp 135.000", trend: "+0.5%", status: "Stabil" },
    { id: 5, name: "Telur Ayam", category: "Peternakan", price: "Rp 28.400", trend: "+1.8%", status: "Meningkat" },
    { id: 6, name: "Minyak Goreng", category: "Pangan Pokok", price: "Rp 18.200", trend: "0.0%", status: "Stabil" },
];

export default function KomoditasPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Komoditas <span className="text-slate-300">Data</span></h1>
                    <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-[10px]">Pusat Informasi & Manajemen Inventori Nasional</p>
                </div>
                <Button className="rounded-xl bg-slate-900 text-white hover:bg-black font-black px-10 py-5 text-sm flex items-center gap-4 transition-all shadow-xl shadow-slate-200">
                    <Plus size={18} />
                    Tambah Dokumen
                </Button>
            </div>

            <Card className="p-0 shadow-sm border-slate-200 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row gap-6 justify-between items-center bg-slate-50/20">
                    <div className="relative w-full md:w-[400px] group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Cari komoditas..."
                            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-14 pr-6 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 transition-all font-bold shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none py-3 px-6 rounded-xl border-slate-200 flex items-center gap-2 text-xs">
                            <Filter size={16} /> Filter Ops
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100">Komoditas</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100">Kategori</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100">Harga</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100">Tren</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100 text-right">Manajemen</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {commodities.map((item, idx) => (
                                <motion.tr 
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shrink-0 group-hover:rotate-6 transition-transform">
                                                <Database size={16} />
                                            </div>
                                            <span className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <span className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] bg-slate-100 px-2.5 py-1 rounded-lg">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4">
                                        <span className="font-black text-slate-900 text-sm">RP {item.price.replace('Rp ', '')}</span>
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className={`flex items-center gap-2 font-black text-[9px] uppercase tracking-widest ${
                                            item.status === 'Meningkat' ? 'text-red-600' : 
                                            item.status === 'Menurun' ? 'text-emerald-600' : 'text-slate-900'
                                        }`}>
                                            {item.trend}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all rounded-lg shadow-sm">
                                                <Edit size={14} />
                                            </button>
                                            <button className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-all rounded-lg shadow-sm">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 flex justify-between items-center bg-slate-50/30">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">Showing <span className="text-slate-900">06</span> / <span className="text-slate-900">24</span> Base Entries</p>
                    <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl">
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 border-none rounded-lg text-slate-400 hover:text-slate-900">
                            <ChevronLeft size={16} />
                        </Button>
                        <Button variant="primary" size="sm" className="w-8 h-8 p-0 bg-slate-900 text-white font-black text-[10px] rounded-lg shadow-lg shadow-slate-200">
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 border-none rounded-lg text-slate-400 hover:text-slate-900">
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
