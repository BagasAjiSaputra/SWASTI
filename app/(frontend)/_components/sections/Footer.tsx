import React from 'react';
import Link from 'next/link';
import { Activity, Instagram, Mail, Share2 } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-50 mt-20 pt-20 pb-10 px-6 sm:px-12 border-t border-slate-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6 cursor-pointer">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                            <img src="/logo/logoswasti.webp" alt="SWASTI Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-black text-foreground tracking-tighter">SWASTI</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
                        Platform monitoring inflasi dan analisis harga pangan nasional untuk masa depan yang lebih stabil.
                    </p>
                    <div className="flex gap-4">
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary transition-colors text-muted-foreground hover:text-white border border-slate-200 shadow-sm">
                            <Instagram size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary transition-colors text-muted-foreground hover:text-white border border-slate-200 shadow-sm">
                            <Mail size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary transition-colors text-muted-foreground hover:text-white border border-slate-200 shadow-sm">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>

                <div>
                    <h4 className="text-foreground font-semibold mb-6">Platform</h4>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:text-primary transition-colors">Dashboard Harga</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Peta Risiko Inflasi</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Analisis Komoditas</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">API Data</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-foreground font-semibold mb-6">Sumber Daya</h4>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:text-primary transition-colors">Pusat Bantuan</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Laporan Mingguan</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Metodologi Data</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Berita Ekonomi</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-foreground font-semibold mb-6">Kontak</h4>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Jakarta Central, Indonesia
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            +62 21 555 0123
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            info@swasti.id
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-slate-200 mt-16 pt-8 flex flex-col sm:row items-center justify-between gap-4 text-xs text-muted-foreground">
                <p>© 2023 SWASTI Platform. Seluruh hak cipta dilindungi.</p>
                <div className="flex gap-8">
                    <Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
                </div>
            </div>
        </footer>
    );
};
