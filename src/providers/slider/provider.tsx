"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { SliderContext, SetSliderContext } from "./context";

export interface SliderProviderProps {
    children: React.ReactNode;
    totalSlides: number;
}

export const SliderProvider: React.FC<SliderProviderProps> = ({ children, totalSlides }) => {
    const params = useParams();
    const [nameOrSlide, fragment] = params.pathname || ["1", "f"];
    const slideNumber = nameOrSlide.match(/^\d+$/) && Number.parseInt(nameOrSlide as string);
    const [currentSlide, setCurrentSlide] = useState({
        slide: slideNumber || 1,
        fragment: (fragment as string | number) || "f",
    });

    return (
        <SliderContext.Provider value={{ slide: currentSlide.slide, fragment: currentSlide.fragment, totalSlides }}>
            <SetSliderContext.Provider value={{ setCurrentSlide }}>{children}</SetSliderContext.Provider>
        </SliderContext.Provider>
    );
};
