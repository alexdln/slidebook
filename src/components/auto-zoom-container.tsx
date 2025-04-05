'use client'

import { useCallback } from "react";

import { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/lib/settings";

export interface AutoZoomContainerProps {
    children: React.ReactNode;
    transformOrigin?: string;
}

export const AutoZoomContainer: React.FC<AutoZoomContainerProps> = ({ children, transformOrigin = 'center' }) => {
    const registerResize = useCallback((ref: HTMLDivElement) => {
        const handleResize = () => {
            ref.style.opacity = '0';
            const parentWidth = ref.parentElement?.clientWidth;
            const parentHeight = ref.parentElement?.clientHeight;

            if (!parentWidth || !parentHeight || !SLIDE_WIDTH || !SLIDE_HEIGHT) return;

            const scale = Math.min((parentWidth - window.innerWidth * 0.02) / SLIDE_WIDTH, (parentHeight - window.innerHeight * 0.02) / SLIDE_HEIGHT);

            ref.style.opacity = '1';
            ref.style.transform = `scale(${scale})`;
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className="absolute" ref={registerResize} style={{ width: SLIDE_WIDTH, height: 'fit-content', transformOrigin, opacity: 0 }}>
            {children}
        </div>
    )
}