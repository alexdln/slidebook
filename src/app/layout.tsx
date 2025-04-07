import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SlideLayer } from "@/components/slide-layer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Presentation App",
    description: "Real-time presentation with Socket.io",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <body className={`${inter.className} bg-gray-100`}>
            <SlideLayer>{children}</SlideLayer>
        </body>
    </html>
);

export default RootLayout;
