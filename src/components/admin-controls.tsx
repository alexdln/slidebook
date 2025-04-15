"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";

import { useNavigations } from "@/providers/navigation/hooks";
import { useSocket } from "@/providers/socket/hooks";

import { SlideContent } from "./slide-content";
import { AutoZoomContainer } from "./auto-zoom-container";

export type AdminControlsProps = {
    children: React.ReactNode[];
    notes: React.ReactNode[];
};

export const AdminControls: React.FC<AdminControlsProps> = ({ children, notes }) => {
    const { currentSlide, totalSlides, navigate, prev, next, fragment } = useNavigations();
    const socket = useSocket();

    const actualizeSlide = useCallback(() => {
        socket?.emit("actualizeSlide", sessionStorage.getItem("password"));
    }, [socket]);

    useEffect(actualizeSlide, [actualizeSlide]);

    return (
        <div className="w-full max-w-4xl bg-slate-50 rounded-lg shadow-lg my-1 mt-4 mb-auto p-1">
            <div className="bg-slate-100 rounded-t-md overflow-hidden grid gap-2 grid-cols-2 justify-center">
                <p className="pt-3 px-[4%] text-sm font-bold">Current slide</p>
                <p className="pt-3 px-[4%] text-sm font-bold">Next slide</p>
            </div>
            <div className="bg-slate-100 rounded-b-md overflow-hidden grid gap-2 grid-cols-2 justify-center h-32 sm:h-48 md:h-60 lg:h-64">
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
            <div className="relative mt-2">
                <div className="flex justify-between gap-2 px-2">
                    <button
                        onClick={() => navigate(1)}
                        disabled={currentSlide === 1}
                        className="cursor-pointer min-w-9 h-9 bg-slate-200 py-1 px-2 rounded-md enabled:hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        «
                    </button>
                    <button
                        onClick={() => prev()}
                        disabled={currentSlide === 1}
                        className="cursor-pointer min-w-9 h-9 bg-slate-200 py-1 px-2 rounded-md enabled:hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ‹
                    </button>
                    <button
                        onClick={actualizeSlide}
                        className="cursor-pointer flex-1 h-9 bg-slate-200 py-1 px-2 rounded-md enabled:hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Present <span className="max-md:hidden">from current slide</span>
                    </button>
                    <button
                        onClick={() => next()}
                        disabled={currentSlide === totalSlides}
                        className="cursor-pointer min-w-9 h-9 bg-blue-600 text-slate-50 py-1 px-2 rounded-md enabled:hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ›
                    </button>
                    <button
                        onClick={() => navigate(totalSlides)}
                        disabled={currentSlide === totalSlides}
                        className="cursor-pointer min-w-9 h-9 bg-blue-600 text-slate-50 py-1 px-2 rounded-md enabled:hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        »
                    </button>
                </div>
                <div className="mt-2 flex gap-2 max-w-[100vw] overflow-x-auto px-2">
                    {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
                        <div className="group" key={num}>
                            <button
                                onClick={() => navigate(num, currentSlide <= num ? "l" : "f")}
                                className={`text-sm cursor-pointer p-2 h-9 min-w-9 rounded-md ${currentSlide === num ? "bg-blue-600 text-slate-50" : "bg-slate-200 hover:bg-slate-300"}`}
                            >
                                {num}
                            </button>
                            <div className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute w-60 h-40 sm:w-100 sm:h-56 left-1/2 -translate-x-1/2 -top-28 sm:-top-44">
                                <AutoZoomContainer transformOrigin="left top">
                                    <SlideContent>{children[num - 1]}</SlideContent>
                                </AutoZoomContainer>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-100 rounded-md p-2 mt-2 mx-2 text-sm">{notes[currentSlide - 1]}</div>

                <Link
                    href={`/${currentSlide}/${fragment}`}
                    className="block mx-2 my-3 w-full text-sm text-slate-500 hover:text-slate-700"
                >
                    Back to Main View
                </Link>
            </div>
        </div>
    );
};
