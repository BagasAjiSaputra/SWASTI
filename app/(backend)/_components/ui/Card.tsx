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
                'group relative overflow-hidden rounded-[2rem] bg-slate-900/50 border border-white/5 p-8 md:p-10 backdrop-blur-2xl hover:bg-slate-900/60 hover:border-primary/30 transition-all duration-700 shadow-xl hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] hover:-translate-y-1',
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};
