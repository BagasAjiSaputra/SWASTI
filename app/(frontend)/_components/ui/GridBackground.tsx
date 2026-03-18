"use client";

import React from 'react';

export const GridBackground = () => {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Primary Grid - Adjusted for Light Mode */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Radial Mask for the Grid to fade out at edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_80%)]"></div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
        </div>
    );
};
