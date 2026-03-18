"use client";

import React, { useState } from 'react';
import { 
    Plus, 
    Search, 
    UserPlus, 
    Shield, 
    Mail, 
    MapPin, 
    MoreHorizontal, 
    Edit, 
    Trash2,
    ChevronLeft,
    ChevronRight,
    Lock,
    CheckCircle2
} from 'lucide-react';
import { Button } from '../_components/ui/Button';
import { Card } from '../_components/ui/Card';
import { motion } from 'framer-motion';

const users = [
    { id: 1, name: "Dr. Ahmad Hidayat", role: "Administrator", email: "ahmad.h@swasti.go.id", office: "Pusat (Jakarta)", status: "Active" },
    { id: 2, name: "Siti Aminah", role: "Petugas Input", email: "siti.a@dinas.jatim.go.id", office: "Jawa Timur", status: "Active" },
    { id: 3, name: "Budi Santoso", role: "Petugas Input", email: "budi.s@dinas.jabar.go.id", office: "Jawa Barat", status: "Inactive" },
    { id: 4, name: "Irfan Hakim", role: "Verifikator", email: "irfan.h@swasti.go.id", office: "Pusat (Jakarta)", status: "Active" },
    { id: 5, name: "Maya Saputra", role: "Petugas Input", email: "maya@dinas.bali.go.id", office: "Bali", status: "Active" },
];

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Matriks <span className="text-slate-300">Pengguna</span></h1>
                    <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-[10px]">Administrasi Hak Akses & Delegasi Otoritas Nasional</p>
                </div>
                <Button className="rounded-xl bg-slate-900 text-white hover:bg-black font-black px-10 py-5 text-sm flex items-center gap-4 transition-all shadow-xl shadow-slate-200">
                    <UserPlus size={20} />
                    Autentikasi User
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Direksi', value: '124', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Akses Pending', value: '12', icon: Lock, color: 'text-amber-500', bg: 'bg-amber-50/50' },
                    { label: 'Sesi Aktif', value: '89', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
                ].map((stat, i) => (
                    <Card key={i} className={`p-6 flex items-center gap-6 ${stat.bg} border-slate-100 rounded-2xl hover:scale-[1.02] transition-transform shadow-sm`}>
                        <div className={`w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center ${stat.color} shadow-sm group-hover:rotate-6 transition-transform`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="p-0 border-slate-200 shadow-sm rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row gap-6 justify-between items-center bg-slate-50/10">
                    <div className="relative w-full md:w-[400px] group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Mencari identitas digital..."
                            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-14 pr-6 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 transition-all font-bold shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100">Identity & Role</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100">Kontak & Lokasi</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-100 text-right">Manajemen</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((item, idx) => (
                                <motion.tr 
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-black text-[10px] shrink-0 shadow-lg shadow-slate-200 text-center">
                                                {item.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-slate-900 text-sm uppercase tracking-tight leading-none">{item.name}</p>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md">{item.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-[9px] text-slate-500 font-bold uppercase tracking-tight">
                                                <Mail size={12} className="text-slate-300" />
                                                <span>{item.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[9px] text-slate-500 font-bold uppercase tracking-tight">
                                                <MapPin size={12} className="text-slate-300" />
                                                <span>{item.office}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${item.status === 'Active' ? 'text-slate-900' : 'text-slate-400'}`}>
                                                {item.status}
                                            </span>
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
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Showing <span className="text-slate-900">05</span> / <span className="text-slate-900">124</span> Entries</p>
                    <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
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
