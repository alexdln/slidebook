"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSlider } from "../slider/hooks";
import { SlideContext } from "./context";

export interface SlideProviderProps {
    children: React.ReactNode;
    active?: boolean;
    slideNumber: number;
    totalSlides?: number;
}

export const SlideProvider: React.FC<SlideProviderProps> = ({ children, active, slideNumber, totalSlides }) => {
    const { currentSlide } = useSlider();
    const { prefetch } = useRouter();

    useEffect(() => {
        if (totalSlides && slideNumber > 2) {
            prefetch(`/${slideNumber - 2}/f`);
            prefetch(`/${slideNumber - 2}/l`);
        }
        if (totalSlides && slideNumber > 1) {
            prefetch(`/${slideNumber - 1}/f`);
            prefetch(`/${slideNumber - 1}/l`);
        }
        if (totalSlides && slideNumber < totalSlides) {
            prefetch(`/${slideNumber + 1}/f`);
            prefetch(`/${slideNumber + 1}/l`);
        }
        if (totalSlides && slideNumber < totalSlides - 1) {
            prefetch(`/${slideNumber + 2}/f`);
            prefetch(`/${slideNumber + 2}/l`);
        }
    }, [slideNumber, prefetch, totalSlides]);

    return (
        <SlideContext.Provider value={{ active: active ?? currentSlide === slideNumber, slideNumber }}>
            {children}
        </SlideContext.Provider>
    );
};
