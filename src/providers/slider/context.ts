"use client";

import { createContext } from "react";

type SliderContextType = {
    currentSlide: number;
    totalSlides: number;
};

type SetSliderContextType = {
    setCurrentSlide: (slide: number) => void;
};

export const SliderContext = createContext<SliderContextType>({
    currentSlide: 1,
    totalSlides: 20,
});

export const SetSliderContext = createContext<SetSliderContextType>({
    setCurrentSlide: () => {},
});
