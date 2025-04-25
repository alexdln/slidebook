"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";

import { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/lib/settings";

import "./auto-zoom-container.scss";

export interface AutoZoomContainerProps {
    children: React.ReactNode;
    transformOrigin?: string;
    ignoredPaths?: string[];
    padding?: number;
}

export const AutoZoomContainer: React.FC<AutoZoomContainerProps> = ({
    children,
    ignoredPaths,
    transformOrigin = "center",
    padding = 0.02,
}) => {
    const pathname = usePathname();
    const registerResize = useCallback(
        (ref: HTMLDivElement) => {
            const handleResize = () => {
                ref.style.transform = `scale(0)`;
                const parentWidth = ref.parentElement?.clientWidth;
                const parentHeight = ref.parentElement?.clientHeight;

                if (!parentWidth || !parentHeight || !SLIDE_WIDTH || !SLIDE_HEIGHT) return;

                const scale = Math.min(
                    (parentWidth - window.innerWidth * padding) / SLIDE_WIDTH,
                    (parentHeight - window.innerHeight * padding) / SLIDE_HEIGHT,
                );

                ref.style.transform = `scale(${scale})`;
            };

            window.addEventListener("resize", handleResize);
            handleResize();

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        },
        [padding],
    );

    if (ignoredPaths?.includes(pathname)) {
        return <>{children}</>;
    }

    return (
        <div
            ref={registerResize}
            className="auto-zoom-container"
            style={{
                transformOrigin,
            }}
        >
            {children}
        </div>
    );
};
