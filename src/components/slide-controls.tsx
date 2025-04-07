"use client";

import { useSetSlider, useSlider } from "@/providers/slider/hooks";
import Link from "next/link";

export const SlideControls = () => {
    const { setCurrentSlide } = useSetSlider();
    const { currentSlide, totalSlides } = useSlider();

    return (
        <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-4">
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
            </div>
            <span className="text-sm text-gray-500">
                Slide {currentSlide} of {totalSlides}
            </span>
            <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
                Admin Access
            </Link>
        </div>
    );
};
