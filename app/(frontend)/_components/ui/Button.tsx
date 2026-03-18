"use client";

import React from 'react';
import { cn } from '@/frontend/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
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
        primary: 'bg-primary text-white hover:bg-blue-700 shadow-lg shadow-primary/20 transition-all duration-300',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-blue-600 hover:text-white transition-all duration-300',
        ghost: 'bg-transparent hover:bg-blue-600 hover:text-white text-foreground transition-all duration-300',
        outline: 'bg-transparent border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-500 text-foreground font-semibold transition-all duration-300'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg font-semibold'
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none',
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
