'use client'

import { useEffect, useRef } from "react"

import { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/lib/settings";

export interface AutoZoomContainerProps {
    children: React.ReactNode;
    transformOrigin?: string;
}

export const AutoZoomContainer: React.FC<AutoZoomContainerProps> = ({ children, transformOrigin = 'center' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleResize = () => {
            const parentWidth = containerRef.current?.parentElement?.clientWidth;
            const parentHeight = containerRef.current?.parentElement?.clientHeight;

            if (!parentWidth || !parentHeight || !SLIDE_WIDTH || !SLIDE_HEIGHT) return;

            const scale = Math.min((parentWidth - window.innerWidth * 0.02) / SLIDE_WIDTH, (parentHeight - window.innerHeight * 0.02) / SLIDE_HEIGHT);

            if (containerRef.current) containerRef.current.style.transform = `scale(${scale})`;
        }

        window.addEventListener('resize', handleResize)
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="absolute" ref={containerRef} style={{ width: SLIDE_WIDTH, height: 'fit-content', transformOrigin }}>
            {children}
        </div>
    )
}