"use client";

import { useEffect } from "react";

export interface KeyboardNavigationProps {
    onPrevious: () => void;
    onNext: () => void;
    navigate: (slideNumber: number, fragmentNumber?: "f" | "l" | number, skipEvent?: boolean, force?: boolean) => void;
    totalSlides: number;
    currentSlide: number;
}

export const useKeyboardNavigation = ({
    onPrevious,
    onNext,
    navigate,
    totalSlides,
    currentSlide,
}: KeyboardNavigationProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault();
                    onPrevious();
                    break;
                case "ArrowRight":
                case "ArrowDown":
                case " ": // Space key
                    e.preventDefault();
                    onNext();
                    break;
                case "Home":
                    e.preventDefault();
                    // Navigate to first slide
                    if (currentSlide !== 1) {
                        navigate(1, "f");
                    }
                    break;
                case "End":
                    e.preventDefault();
                    // Navigate to last slide
                    if (currentSlide !== totalSlides) {
                        navigate(totalSlides, "l");
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentSlide, totalSlides, onPrevious, onNext, navigate]);
};
