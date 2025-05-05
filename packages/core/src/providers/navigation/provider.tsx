"use client";

import { useEffect, useRef } from "react";

import { useSocket } from "@/providers/socket/hooks";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

import { useNavigations } from "./hooks";
import { SyncContext } from "./context";

export interface NavigationProviderProps {
    children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const socket = useSocket();
    const syncRef = useRef(true);
    const { currentSlide, fragment, next, prev, navigate, totalSlides } = useNavigations(syncRef);

    // Set up keyboard navigation
    useKeyboardNavigation({
        onPrevious: prev,
        onNext: next,
        navigate,
        totalSlides,
        currentSlide,
    });

    useEffect(() => {
        if (!socket) return;

        // Listen for slide changes from the host
        socket.on(
            "slideChange",
            ({ slide, fragment: newFragment }: { slide: number; fragment: number | "f" | "l" }, socketId: string) => {
                if ((slide !== currentSlide || newFragment !== fragment) && socket.id !== socketId && syncRef.current) {
                    navigate(slide, newFragment, true);
                }
            },
        );

        socket.on(
            "currentSlide",
            ({ slide, fragment: newFragment }: { slide: number; fragment: number | "f" | "l" }) => {
                if ((slide !== currentSlide || newFragment !== fragment) && syncRef.current) {
                    navigate(slide, newFragment, true);
                }
            },
        );

        // Inform the server about the current slide view
        socket.emit("viewSlide", currentSlide);

        return () => {
            socket.off("slideChange");
            socket.off("currentSlide");
        };
    }, [socket, currentSlide, navigate]);

    useEffect(() => {
        socket?.emit("getCurrentSlide");
    }, [socket]);

    return <SyncContext.Provider value={syncRef}>{children}</SyncContext.Provider>;
};
