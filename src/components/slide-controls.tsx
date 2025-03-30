'use client'

import { useSetSlider, useSlider } from "@/providers/slider/hooks"

export const SlideControls = () => {
    const { setCurrentSlide } = useSetSlider()
    const { currentSlide, totalSlides } = useSlider();

    return (
        <>
            <button
                onClick={() => setCurrentSlide(currentSlide - 1)}
                disabled={currentSlide === 1}
                className="cursor-pointer text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                ← Prev
            </button>
            <button
                onClick={() => setCurrentSlide(currentSlide + 1)}
                disabled={currentSlide === totalSlides}
                className="cursor-pointer text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next →
            </button>
        </>
    )
}
