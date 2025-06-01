import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SlideLayer } from "@slidebook/core/lib/components/slide-layer";

import { Layer } from "./slides/layer";
import { slides } from "./slides";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Slidebook",
    description: "Advanced presentation tool",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
            <Layer>
                <SlideLayer totalSlides={slides.length}>{children}</SlideLayer>
            </Layer>
        </body>
    </html>
);

export const dynamic = "error";

export default RootLayout;
