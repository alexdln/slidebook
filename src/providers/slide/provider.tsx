"use client";

import { useSlider } from "../slider/hooks";
import { SlideContext } from "./context";

export interface SlideProviderProps {
    children: React.ReactNode;
    active?: boolean;
    slideNumber: number;
}

export const SlideProvider: React.FC<SlideProviderProps> = ({ children, active, slideNumber }) => {
    const { currentSlide } = useSlider();

    return (
        <SlideContext.Provider value={{ active: active ?? currentSlide === slideNumber, slideNumber }}>
            {children}
        </SlideContext.Provider>
    );
};
