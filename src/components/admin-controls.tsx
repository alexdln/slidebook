"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";

import { useSetSlider, useSlider } from "@/providers/slider/hooks";
import { useSocket } from "@/providers/socket/hooks";

import { SlideContent } from "./slide-content";
import { AutoZoomContainer } from "./auto-zoom-container";

export type AdminControlsProps = {
    children: React.ReactNode[];
};

export const AdminControls: React.FC<AdminControlsProps> = ({ children }) => {
    const { currentSlide, totalSlides } = useSlider();
    const { setCurrentSlide } = useSetSlider();
    const socket = useSocket();

    const actualizeSlide = useCallback(() => {
        socket?.emit("actualizeSlide", sessionStorage.getItem("password"));
    }, [socket]);

    useEffect(actualizeSlide, [actualizeSlide]);

    return (
        <div className="max-w-full bg-white rounded-lg shadow-lg m-1 p-1">
            <div className="bg-gray-100 rounded-t-md overflow-hidden grid gap-2 grid-cols-2 justify-center">
                <p className="pt-4 px-1 text-sm font-bold">Current slide</p>
                <p className="pt-4 px-1 text-sm font-bold">Next slide</p>
            </div>
            <div className="bg-gray-100 rounded-b-md overflow-hidden grid gap-2 grid-cols-2 justify-center h-32 md:h-40 lg:h-52 xl:h-64">
                <div className="flex items-center justify-center">
                    <AutoZoomContainer>
                        <SlideContent>{children[currentSlide - 1]}</SlideContent>
                    </AutoZoomContainer>
                </div>
                {currentSlide < totalSlides && (
                    <div className="flex items-center justify-center">
                        <AutoZoomContainer>
                            <SlideContent>{children[currentSlide]}</SlideContent>
                        </AutoZoomContainer>
                    </div>
                )}
            </div>
            <div className="mt-8">
                <div className="flex justify-between gap-2 px-2">
                    <button
                        onClick={() => setCurrentSlide(1)}
                        disabled={currentSlide === 1}
                        className="cursor-pointer min-w-9 h-9 bg-gray-200 py-1 px-2 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        «
                    </button>
                    <button
                        onClick={() => setCurrentSlide(currentSlide - 1)}
                        disabled={currentSlide === 1}
                        className="cursor-pointer min-w-9 h-9 bg-gray-200 py-1 px-2 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ‹
                    </button>
                    <button
                        onClick={actualizeSlide}
                        className="cursor-pointer flex-1 h-9 bg-gray-200 py-1 px-2 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Present <span className="max-md:hidden">from current slide</span>
                    </button>
                    <button
                        onClick={() => setCurrentSlide(currentSlide + 1)}
                        disabled={currentSlide === totalSlides}
                        className="cursor-pointer min-w-9 h-9 bg-blue-600 text-white py-1 px-2 rounded-md enabled:hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ›
                    </button>
                    <button
                        onClick={() => setCurrentSlide(totalSlides)}
                        disabled={currentSlide === totalSlides}
                        className="cursor-pointer min-w-9 h-9 bg-blue-600 text-white py-1 px-2 rounded-md enabled:hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        »
                    </button>
                </div>

                <div className="mt-4 flex gap-2 max-w-[100vw] overflow-x-auto px-2">
                    {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setCurrentSlide(num)}
                            className={`text-sm cursor-pointer p-2 h-9 min-w-9 rounded-md ${currentSlide === num ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <Link
                    href={`/${currentSlide}`}
                    className="block mt-6 mb-3 w-full text-center text-sm text-gray-500 hover:text-gray-700"
                >
                    Back to Main View
                </Link>
            </div>
        </div>
    );
};
