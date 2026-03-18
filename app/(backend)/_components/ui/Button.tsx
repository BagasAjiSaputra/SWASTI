"use client";

import React from 'react';
import { cn } from '@/frontend/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    children: React.ReactNode;
}

export const Button = ({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200 transition-all duration-500',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 transition-all duration-500',
        ghost: 'bg-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-all duration-500',
        outline: 'bg-transparent border border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-500 transition-all duration-500'
    };

    const sizes = {
        sm: 'px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em]',
        md: 'px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em]',
        lg: 'px-10 py-5 text-[12px] font-black uppercase tracking-[0.2em]',
        icon: 'p-3'
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'inline-flex items-center justify-center rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-slate-900 disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
