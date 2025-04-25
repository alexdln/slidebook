"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

import { useNavigations } from "@/providers/navigation/hooks";
import { useSocket } from "@/providers/socket/hooks";

import { AutoZoomContainer } from "../auto-zoom-container";

import "./host-controls.scss";

export type HostControlsProps = {
    children: React.ReactNode[];
    notes: React.ReactNode[];
};

export const HostControls: React.FC<HostControlsProps> = ({ children, notes }) => {
    const { currentSlide, totalSlides, navigate, prev, next, fragment } = useNavigations();
    const socket = useSocket();

    const actualizeSlide = useCallback(() => {
        socket?.emit("actualizeSlide", sessionStorage.getItem("password"));
    }, [socket]);

    useEffect(actualizeSlide, [actualizeSlide]);

    return (
        <div className="host-controls">
            <div className="host-controls__header">
                <p className="host-controls__header-text">Current slide</p>
                <p className="host-controls__header-text">Next slide</p>
            </div>
            <div className="host-controls__preview">
                <div className="host-controls__preview-item">
                    <AutoZoomContainer padding={0} transformOrigin="left top">
                        {children[currentSlide - 1]}
                    </AutoZoomContainer>
                </div>
                {currentSlide < totalSlides && (
                    <div className="host-controls__preview-item">
                        <AutoZoomContainer padding={0} transformOrigin="left top">
                            {children[currentSlide]}
                        </AutoZoomContainer>
                    </div>
                )}
            </div>
            <div className="host-controls__controls">
                <div className="host-controls__buttons">
                    <button onClick={() => navigate(1)} disabled={currentSlide === 1} className="host-controls__button">
                        «
                    </button>
                    <button onClick={() => prev()} disabled={currentSlide === 1} className="host-controls__button">
                        ‹
                    </button>
                    <button
                        onClick={actualizeSlide}
                        className={clsx("host-controls__button", "host-controls__button--flex")}
                    >
                        Present <span className="max-md:hidden">from current slide</span>
                    </button>
                    <button
                        onClick={() => next()}
                        disabled={currentSlide === totalSlides}
                        className={clsx("host-controls__button", "host-controls__button--primary")}
                    >
                        ›
                    </button>
                    <button
                        onClick={() => navigate(totalSlides)}
                        disabled={currentSlide === totalSlides}
                        className={clsx("host-controls__button", "host-controls__button--primary")}
                    >
                        »
                    </button>
                </div>
                <div className="host-controls__slides">
                    {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
                        <div className="host-controls__slide-group" key={num}>
                            <button
                                onClick={() => navigate(num, currentSlide > num ? "l" : "f")}
                                className={clsx(
                                    "host-controls__slide-button",
                                    currentSlide === num
                                        ? "host-controls__slide-button--active"
                                        : "host-controls__slide-button--inactive",
                                )}
                            >
                                {num}
                            </button>
                            <div className="host-controls__slide-preview">
                                <AutoZoomContainer transformOrigin="left top" padding={0}>
                                    {children[num - 1]}
                                </AutoZoomContainer>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="host-controls__notes">{notes[currentSlide - 1]}</div>

                <Link href={`/${currentSlide}/${fragment}`} className="host-controls__back-link">
                    Back to Main View
                </Link>
            </div>
        </div>
    );
};
