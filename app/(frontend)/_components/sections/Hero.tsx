"use client";

import React from 'react';
import { Button } from '@/frontend/_components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import { TrendingUp, Activity, X } from 'lucide-react';
import { cn } from '@/frontend/lib/utils';
import { createPortal } from 'react-dom';


const priceUpdates = [
    { label: "Beras Medium", price: "Rp 12.400", change: "1.2%", up: true },
    { label: "Cabai Merah", price: "Rp 45.000", change: "5.4%", up: false },
    { label: "Minyak Goreng", price: "Rp 16.200", change: "0.8%", up: false },
    { label: "Daging Sapi", price: "Rp 135.000", change: "2.1%", up: true },
    { label: "Gula Pasir", price: "Rp 17.500", change: "0.5%", up: true },
    { label: "Telur Ayam", price: "Rp 28.400", change: "3.2%", up: false },
];

export const Hero = () => {
    const [textIndex, setTextIndex] = React.useState(0);
    const [videoOpen, setVideoOpen] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    const titles = [
        { span: "Harga Pangan", first: "Solusi Informasi", second: "Bersama Swasti" },
        { span: "Ekonomi", first: "Navigasi", second: "Lebih Cerdas dan Akurat" }
    ];

    React.useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % titles.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Prevent scrolling when video is open
    React.useEffect(() => {
        if (videoOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [videoOpen]);

    const VideoModal = () => {
        if (!mounted || !videoOpen) return null;

        return createPortal(
            <AnimatePresence>
                {videoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl cursor-crosshair"
                            onClick={() => setVideoOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative w-full max-w-[840px] aspect-video bg-slate-950 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] z-10 p-2"
                        >
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black">
                                <video
                                    className="w-full h-full object-cover"
                                    controls
                                    autoPlay
                                    src="/mp4/Inflasi_Pangan_Indonesia.mp4"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* Close Button - More subtle and integrated */}
                            <button
                                onClick={() => setVideoOpen(false)}
                                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/40 hover:bg-primary backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group z-30 border border-white/10"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform" />
                            </button>

                            {/* Minimal Decorative Label */}
                            <div className="absolute top-5 left-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5 backdrop-blur-md z-30">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.1em]">SWASTI Presentation</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>,
            document.body
        );
    };

    return (
        <section className="relative h-[calc(100vh-80px)] min-h-[600px] flex flex-col pb-8 px-8 sm:px-16 overflow-hidden">
            <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-4 lg:gap-6 my-auto">

                {/* Compact Ticker Tape */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative w-full border-y border-slate-200 py-1.5 overflow-hidden bg-white/40 backdrop-blur-sm"
                >
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="flex whitespace-nowrap gap-12 items-center"
                    >
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-12 items-center">
                                {priceUpdates.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 group cursor-pointer py-1 px-3 rounded-md hover:bg-blue-600 transition-all duration-500">
                                        <span className="text-[8px] font-bold text-muted-foreground group-hover:text-white/70 uppercase tracking-widest transition-colors duration-500">
                                            {item.label}
                                        </span>
                                        <span className="text-xs font-black text-foreground group-hover:text-white transition-colors duration-500">{item.price}</span>
                                        <span className={cn(
                                            "text-[8px] font-bold flex items-center transition-colors duration-500",
                                            item.up ? "text-green-600 group-hover:text-white" : "text-red-600 group-hover:text-white"
                                        )}>
                                            {item.up ? "▲" : "▼"} {item.change}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="relative z-10 text-left order-2 lg:order-1 flex flex-col justify-center">

                        {/* Fixed-Height Container to prevent layout shift */}
                        <div className="relative w-full h-[130px] md:h-[200px] lg:h-[240px] flex flex-col justify-start overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={textIndex}
                                    className="absolute inset-0 text-4xl md:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight text-foreground lg:text-left"
                                >
                                    {/* Typing Animation for First Part */}
                                    <motion.span
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            visible: { transition: { staggerChildren: 0.03 } }
                                        }}
                                    >
                                        {titles[textIndex].first.split("").map((char, i) => (
                                            <motion.span
                                                key={i}
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    visible: { opacity: 1 }
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </motion.span>{" "}

                                    <span className="relative inline-block">
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent"
                                        >
                                            {titles[textIndex].span}
                                        </motion.span>
                                        <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ delay: 1.0, duration: 0.8 }}
                                                d="M0 3C20 3 30 1 50 1C70 1 80 3 100 3"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                fill="none"
                                                className="text-primary/40"
                                            />
                                        </svg>
                                    </span> <br />

                                    {/* Typing Animation for Second Part */}
                                    <motion.span
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            visible: { transition: { staggerChildren: 0.03, delayChildren: 1.2 } }
                                        }}
                                    >
                                        {titles[textIndex].second.split("").map((char, i) => (
                                            <motion.span
                                                key={i}
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    visible: { opacity: 1 }
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </motion.span>
                                </motion.h1>
                            </AnimatePresence>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-xl lg:mx-0 opacity-70"
                        >
                            Analisis cerdas untuk stabilitas pangan nasional. Mengubah data pasar menjadi kebijakan strategis melalui teknologi AI.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-8"
                        >
                            <Button size="lg" className="h-12 px-8 rounded-xl group shadow-lg shadow-primary/10 text-sm font-bold">
                                Mulai Eksplorasi
                                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button variant="outline" size="lg" className="h-12 px-8 rounded-xl backdrop-blur-sm shadow-sm font-bold">
                                Lihat Laporan
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex items-center justify-start gap-3"
                        >


                        </motion.div>
                    </div>

                    {/* Right Content */}
                    <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-10 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden w-full max-w-[560px] aspect-[16/10] group cursor-pointer hover:border-primary transition-all duration-500"
                            onClick={() => setVideoOpen(true)}
                        >
                            <video
                                src="/mp4/Inflasi_Pangan_Indonesia.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-3xl shadow-primary/50 group-hover:bg-primary/90 transition-all border-4 border-white/20"
                                >
                                    <Play fill="white" size={20} className="ml-1" />
                                </motion.div>
                            </div>

                            {/* Inner Glass Glow Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Compact Floating Updates */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-2 z-20 bg-white border border-slate-200 p-3 rounded-xl shadow-2xl hidden md:block backdrop-blur-xl group hover:bg-blue-600 hover:border-blue-500 transition-all duration-500"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-white/20 group-hover:text-white transition-all duration-500">
                                    <TrendingUp size={14} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-bold text-muted-foreground group-hover:text-white/70 uppercase mb-0.5 tracking-tighter transition-colors duration-500">Video Inflasi</p>
                                    <p className="text-xs font-black text-foreground group-hover:text-white tracking-tight transition-colors duration-500">Tonton Sekarang</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <VideoModal />
        </section>
    );
};
