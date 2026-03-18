"use client";

import React, { useMemo } from 'react';

interface DataPoint {
    date: Date;
    value: number;
}

interface SparklineProps {
    data: DataPoint[];
    width: number;
    height: number;
    color?: string;
}

export const Sparkline = ({
    data,
    width,
    height,
    color = '#2563eb'
}: SparklineProps) => {
    const margin = { top: 4, right: 0, bottom: 4, left: 0 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const { pathData, areaData } = useMemo(() => {
        if (!data || data.length < 2) return { pathData: '', areaData: '' };

        const minDate = Math.min(...data.map(d => d.date.getTime()));
        const maxDate = Math.max(...data.map(d => d.date.getTime()));
        const maxValue = Math.max(...data.map(d => d.value)) * 1.2 || 1;

        const dateRange = maxDate - minDate || 1;

        const points = data.map(d => ({
            x: ((d.date.getTime() - minDate) / dateRange) * innerWidth + margin.left,
            y: innerHeight - ((d.value / maxValue) * innerHeight) + margin.top
        }));

        // Create smooth cubic bezier curve
        let path = `M ${points[0].x},${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const curr = points[i];
            const next = points[i + 1];
            const cp1x = curr.x + (next.x - curr.x) / 2;
            const cp1y = curr.y;
            const cp2x = curr.x + (next.x - curr.x) / 2;
            const cp2y = next.y;
            path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
        }

        const area = `${path} L ${points[points.length - 1].x},${innerHeight + margin.top} L ${points[0].x},${innerHeight + margin.top} Z`;

        return { pathData: path, areaData: area };
    }, [data, innerWidth, innerHeight, margin.left, margin.top]);

    const gradientId = useMemo(() => `sparkline-gradient-${Math.random().toString(36).substr(2, 9)}`, []);
 
     return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible transition-colors duration-500">
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
            </defs>
            <path
                d={areaData}
                fill={`url(#${gradientId})`}
                className="transition-all duration-500"
            />
            <path
                d={pathData}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-500"
            />
        </svg>
    );
};
