'use client'

import { useContext } from "react"

import { SetSliderContext, SliderContext } from "./context"

export const useSlider = () => {
    const { currentSlide, totalSlides } = useContext(SliderContext)

    return { currentSlide, totalSlides }
}

export const useSetSlider = () => {
    const { setCurrentSlide } = useContext(SetSliderContext)

    return { setCurrentSlide }
}

