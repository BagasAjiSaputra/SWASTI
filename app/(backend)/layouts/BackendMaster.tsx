import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Sidebar } from "../_components/Sidebar";

const robotoFlex = Roboto_Flex({
    subsets: ["latin"],
    variable: "--font-roboto-flex",
});

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
                className={`${robotoFlex.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 font-sans`}
            >
                <div className="flex h-screen overflow-hidden relative">
                    <div className="hidden md:block h-full relative z-20">
                        <Sidebar />
                    </div>

                    <main className="flex-1 overflow-y-auto p-12 bg-white relative z-10 border-l border-slate-100 shadow-sm">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
