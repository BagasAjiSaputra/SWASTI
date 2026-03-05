import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "../_components/Sidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SWASTI | Backend Dashboard",
    description: "Dashboard management for SWASTI",
};

export default function BackendLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100 text-slate-900`}
            >
                <div className="flex h-screen overflow-hidden">
                    <div className="hidden md:block h-full">
                        <Sidebar />
                    </div>

                    <main className="flex-1 overflow-y-auto p-8 bg-white/50 backdrop-blur-sm relative">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
