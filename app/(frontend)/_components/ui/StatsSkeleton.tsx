"use client";

import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card } from '@/frontend/_components/ui/Card';

export const StatsSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#1e293b" highlightColor="#334155">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-full">
                                <Skeleton width="40%" height={16} className="mb-2" />
                                <Skeleton width="60%" height={32} />
                            </div>
                            <Skeleton circle width={40} height={40} />
                        </div>
                        <Skeleton height={80} />
                    </Card>
                ))}
            </div>
        </SkeletonTheme>
    );
};
