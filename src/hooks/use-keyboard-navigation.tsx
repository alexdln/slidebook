"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
export interface KeyboardNavigationProps {
    onPrevious: () => void;
    onNext: () => void;
    totalSlides: number;
    currentSlide: number;
}

export const useKeyboardNavigation = ({ onPrevious, onNext, totalSlides, currentSlide }: KeyboardNavigationProps) => {
    const { push } = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault();
                    if (currentSlide > 1) {
                        onPrevious();
                    }
                    break;
                case "ArrowRight":
                case "ArrowDown":
                case " ": // Space key
                    e.preventDefault();
                    if (currentSlide < totalSlides) {
                        onNext();
                    }
                    break;
                case "Home":
                    e.preventDefault();
                    // Navigate to first slide
                    if (currentSlide !== 1) {
                        push("/1");
                    }
                    break;
                case "End":
                    e.preventDefault();
                    // Navigate to last slide
                    if (currentSlide !== totalSlides) {
                        push(`/${totalSlides}`);
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
    }, [currentSlide, totalSlides, onPrevious, onNext, push]);
};
