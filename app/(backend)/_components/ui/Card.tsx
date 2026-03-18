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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                'group relative overflow-hidden rounded-xl bg-white border border-slate-200 p-6 md:p-8 transition-all duration-300 hover:border-slate-900 hover:shadow-2xl hover:shadow-slate-100',
                className
            )}
        >
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};
