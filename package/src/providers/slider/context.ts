"use client";

import { createContext } from "react";

type Fragment = string | number;

type SliderContextType = {
    slide: number;
    fragment: Fragment;
    totalSlides: number;
};

type SetSliderContextType = {
    setCurrentSlide: ({ slide, fragment }: { slide: number; fragment: Fragment }) => void;
};

export const SliderContext = createContext<SliderContextType>({
    slide: 1,
    fragment: "f",
    totalSlides: 20,
});

export const SetSliderContext = createContext<SetSliderContextType>({
    setCurrentSlide: () => ({}),
});
