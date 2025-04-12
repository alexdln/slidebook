import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SlideLayer } from "@/components/slide-layer";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Slidebook",
    description: "Advanced presentation tool",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "bg-slate-100 text-slate-950")}>
            <SlideLayer>{children}</SlideLayer>
        </body>
    </html>
);

export default RootLayout;
