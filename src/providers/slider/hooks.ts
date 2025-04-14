"use client";

import { useContext } from "react";

import { SetSliderContext, SliderContext } from "./context";

export const useSlider = () => {
    const { slide: currentSlide, fragment, totalSlides } = useContext(SliderContext);

    return { currentSlide, fragment, totalSlides };
};

export const useSetSlider = () => {
    const { setCurrentSlide } = useContext(SetSliderContext);

    return { setCurrentSlide };
};
