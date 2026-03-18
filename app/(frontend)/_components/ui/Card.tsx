import React from 'react';
import { cn } from '@/frontend/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const Card = ({ children, className, delay = 0 }: CardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                'group relative overflow-hidden rounded-3xl bg-white/70 border border-slate-200/60 p-7 backdrop-blur-2xl transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:bg-blue-600 hover:border-blue-500 hover:text-white',
                className
            )}
        >
            {/* Soft Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Animated Bottom Glow */}
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-blue-400/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};
