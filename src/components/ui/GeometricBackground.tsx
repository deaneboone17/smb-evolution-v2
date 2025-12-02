import React from 'react';

export const GeometricBackground = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-[#1B1B3A] relative overflow-hidden font-sans selection:bg-primary-blue/30">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Geometric Shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Shape 1: The Diamond/Cube */}
                <div className="absolute top-[10%] left-[5%] w-64 h-64 border border-white/5 bg-white/5 backdrop-blur-3xl rotate-45 rounded-3xl animate-[float_8s_ease-in-out_infinite]" />

                {/* Shape 2: The Orb */}
                <div className="absolute top-[40%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-br from-[#1C77C3]/20 to-transparent blur-3xl animate-[float_12s_ease-in-out_infinite]" />

                {/* Shape 3: The Triangle (SVG) */}
                <div className="absolute bottom-[15%] left-[15%] w-48 h-48 opacity-20 animate-[float_10s_ease-in-out_infinite]">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 10L90 90H10L50 10Z" stroke="white" strokeWidth="2" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
