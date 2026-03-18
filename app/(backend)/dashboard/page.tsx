"use client";

import React from 'react';
import { Card } from '../_components/ui/Card';
import { Button } from '../_components/ui/Button';
import { TrendingUp, Users, ShoppingCart, Activity } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tighter italic">Dashboard <span className="text-primary not-italic">Overview</span></h1>
                    <p className="text-slate-400 font-bold mt-1 text-xs">Monitoring system SWASTI secara real-time.</p>
                </div>
                <div className="px-5 py-2.5 bg-slate-900 text-white text-[9px] font-black rounded-2xl uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 cursor-default">
                    Live Data Monitoring
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Price Feeds', value: '458', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Market Transactions', value: '89,120', icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Inflasi Index', value: '5.2%', icon: TrendingUp, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((item, i) => (
                    <Card key={i} className="p-6 hover:scale-[1.02] transition-transform shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-slate-300 font-black text-[8px] uppercase tracking-[0.3em]">{item.label}</div>
                            <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                                <item.icon size={16} />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{item.value}</div>
                        <div className="text-[9px] items-center flex gap-1 mt-3 text-emerald-500 font-black uppercase tracking-widest">
                            <TrendingUp size={12} /> +2.4%
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="p-12 flex items-center justify-center relative overflow-hidden group min-h-[400px] border-slate-200 rounded-2xl shadow-xl shadow-slate-100">
                <div className="text-center space-y-8 relative z-10">
                    <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-all duration-700 shadow-2xl shadow-slate-200">
                        <Activity className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-slate-900 font-black text-6xl mb-3 tracking-tighter select-none leading-none">SWASTI</div>
                        <p className="text-slate-400 font-bold max-w-sm mx-auto leading-relaxed text-[9px] uppercase tracking-widest">Sistem Integrasi Data Utama Nasional</p>
                    </div>
                    <Button variant="primary" className="px-10 py-5 text-sm rounded-xl">
                        Update Data Report
                    </Button>
                </div>
            </Card>
        </div>
    );
}
