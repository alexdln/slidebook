"use client";

import { useEffect } from "react";

import { useSocket } from "@/providers/socket/hooks";
import { useNavigations, useSync } from "@/providers/navigation/hooks";

export const useKeyboardNavigation = () => {
    const { currentSlide, next, prev, navigate, totalSlides } = useNavigations();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault();
                    prev();
                    break;
                case "ArrowRight":
                case "ArrowDown":
                case " ": // Space key
                    e.preventDefault();
                    next();
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
    }, [currentSlide, totalSlides, prev, next, navigate]);
};

export const useSocketNavigation = () => {
    const { currentSlide, fragment, navigate } = useNavigations();
    const socket = useSocket();
    const syncRef = useSync();

    useEffect(() => {
        if (!socket) return;

        // Listen for slide changes from the host
        socket.on(
            "slideChange",
            ({ s: newSlide, f: newFragment }: { s: number; f: number | "f" | "l" }, socketId: string) => {
                if (
                    (newSlide !== currentSlide || newFragment !== fragment) &&
                    socket.id !== socketId &&
                    syncRef?.checked
                ) {
                    navigate(newSlide, newFragment, true);
                }
            },
        );

        socket.on("currentSlide", ({ s: newSlide, f: newFragment }: { s: number; f: number | "f" | "l" }) => {
            if ((newSlide !== currentSlide || newFragment !== fragment) && syncRef?.checked) {
                navigate(newSlide, newFragment, true);
            }
        });

        return () => {
            socket.off("slideChange");
            socket.off("currentSlide");
        };
    }, [socket, currentSlide, navigate]);

    useEffect(() => {
        socket?.on("connect", () => {
            socket.emit("getCurrentSlide");
        });
        if (socket?.connected) {
            socket.emit("getCurrentSlide");
        }
    }, [socket]);
};
