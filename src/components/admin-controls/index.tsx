"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

import { useNavigations } from "@/providers/navigation/hooks";
import { useSocket } from "@/providers/socket/hooks";

import { SlideContent } from "../slide-content";
import { AutoZoomContainer } from "../auto-zoom-container";

import "./admin-controls.scss";

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
        <div className="admin-controls">
            <div className="admin-controls__header">
                <p className="admin-controls__header-text">Current slide</p>
                <p className="admin-controls__header-text">Next slide</p>
            </div>
            <div className="admin-controls__preview">
                <div className="admin-controls__preview-item">
                    <AutoZoomContainer>
                        <SlideContent>{children[currentSlide - 1]}</SlideContent>
                    </AutoZoomContainer>
                </div>
                {currentSlide < totalSlides && (
                    <div className="admin-controls__preview-item">
                        <AutoZoomContainer>
                            <SlideContent>{children[currentSlide]}</SlideContent>
                        </AutoZoomContainer>
                    </div>
                )}
            </div>
            <div className="admin-controls__controls">
                <div className="admin-controls__buttons">
                    <button
                        onClick={() => navigate(1)}
                        disabled={currentSlide === 1}
                        className="admin-controls__button"
                    >
                        «
                    </button>
                    <button onClick={() => prev()} disabled={currentSlide === 1} className="admin-controls__button">
                        ‹
                    </button>
                    <button
                        onClick={actualizeSlide}
                        className={clsx("admin-controls__button", "admin-controls__button--flex")}
                    >
                        Present <span className="max-md:hidden">from current slide</span>
                    </button>
                    <button
                        onClick={() => next()}
                        disabled={currentSlide === totalSlides}
                        className={clsx("admin-controls__button", "admin-controls__button--primary")}
                    >
                        ›
                    </button>
                    <button
                        onClick={() => navigate(totalSlides)}
                        disabled={currentSlide === totalSlides}
                        className={clsx("admin-controls__button", "admin-controls__button--primary")}
                    >
                        »
                    </button>
                </div>
                <div className="admin-controls__slides">
                    {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
                        <div className="admin-controls__slide-group" key={num}>
                            <button
                                onClick={() => navigate(num, currentSlide <= num ? "l" : "f")}
                                className={clsx(
                                    "admin-controls__slide-button",
                                    currentSlide === num
                                        ? "admin-controls__slide-button--active"
                                        : "admin-controls__slide-button--inactive",
                                )}
                            >
                                {num}
                            </button>
                            <div className="admin-controls__slide-preview">
                                <AutoZoomContainer transformOrigin="left top">
                                    <SlideContent>{children[num - 1]}</SlideContent>
                                </AutoZoomContainer>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="admin-controls__notes">{notes[currentSlide - 1]}</div>

                <Link href={`/${currentSlide}/${fragment}`} className="admin-controls__back-link">
                    Back to Main View
                </Link>
            </div>
        </div>
    );
};
