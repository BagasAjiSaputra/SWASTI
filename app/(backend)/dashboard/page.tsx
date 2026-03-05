"use client";

import React from 'react';
import { Card } from '@/backend/_components/ui/Card';
import { TrendingUp, Users, ShoppingCart, Activity } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Overview Dashboard</h1>
                <div className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg uppercase tracking-widest">
                    Live Data Monitoring
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', value: '12,450', icon: Users, color: 'blue' },
                    { label: 'Active Price Feeds', value: '458', icon: Activity, color: 'green' },
                    { label: 'Market Transactions', value: '89,120', icon: ShoppingCart, color: 'purple' },
                    { label: 'Inflasi Index', value: '5.2%', icon: TrendingUp, color: 'red' },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{item.label}</div>
                            <item.icon className="text-slate-900 opacity-20 group-hover:opacity-100 transition-opacity" size={20} />
                        </div>
                        <div className="text-3xl font-black text-slate-900">{item.value}</div>
                        <div className="text-[10px] items-center flex gap-1 mt-2 text-green-600 font-bold">
                            <TrendingUp size={12} /> +2.4% vs last month
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm min-h-[400px] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="text-slate-300 font-black text-6xl opacity-20 italic">BACKEND AREA</div>
                    <p className="text-slate-500 font-medium">Main dashboard charts and analysis will be integrated here.</p>
                    <div className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl inline-block hover:scale-105 transition-transform cursor-pointer">
                        Update Report
                    </div>
                </div>
            </div>
        </div>
    );
}
