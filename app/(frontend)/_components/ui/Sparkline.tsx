"use client";

import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { AreaClosed, LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { scaleTime, scaleLinear } from '@visx/scale';
import { extent, max } from 'd3-array';

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

    // Scales
    const xScale = useMemo(
        () =>
            scaleTime({
                range: [0, innerWidth],
                domain: extent(data, d => d.date) as [Date, Date],
            }),
        [innerWidth, data]
    );

    const yScale = useMemo(
        () =>
            scaleLinear({
                range: [innerHeight, 0],
                domain: [0, (max(data, d => d.value) || 0) * 1.2],
                nice: true,
            }),
        [innerHeight, data]
    );

    return (
        <svg width={width} height={height}>
            <Group left={margin.left} top={margin.top}>
                <AreaClosed<DataPoint>
                    data={data}
                    x={d => xScale(d.date) ?? 0}
                    y={d => yScale(d.value) ?? 0}
                    yScale={yScale}
                    fill={`url(#area-gradient-${color.replace('#', '')})`}
                    curve={curveMonotoneX}
                />
                <LinePath<DataPoint>
                    data={data}
                    x={d => xScale(d.date) ?? 0}
                    y={d => yScale(d.value) ?? 0}
                    stroke={color}
                    strokeWidth={2}
                    curve={curveMonotoneX}
                />
                <defs>
                    <linearGradient id={`area-gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
            </Group>
        </svg>
    );
};
