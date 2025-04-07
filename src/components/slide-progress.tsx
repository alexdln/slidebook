"use client";

import { useSlider } from "@/providers/slider/hooks";

export const SlideProgress: React.FC = () => {
    const { currentSlide, totalSlides } = useSlider();
    const percentage = (currentSlide / totalSlides) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};
