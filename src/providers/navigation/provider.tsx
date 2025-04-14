"use client";

import { useEffect } from "react";

import { useSocket } from "@/providers/socket/hooks";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

import { useNavigations } from "./hooks";

export const NavigationProvider: React.FC = () => {
    const socket = useSocket();
    const { currentSlide, next, prev, totalSlides, navigate } = useNavigations();

    // Set up keyboard navigation
    useKeyboardNavigation({
        onPrevious: prev,
        onNext: next,
        totalSlides,
        currentSlide,
    });

    useEffect(() => {
        if (!socket) return;

        // Listen for slide changes from the admin
        socket.on("slideChange", (slideNumber: number, socketId: string) => {
            if (slideNumber !== currentSlide && socket.id !== socketId) {
                navigate(slideNumber, "f");
            }
        });
        // Listen for slide changes from the admin
        socket.on("currentSlide", (slideNumber: number) => {
            if (slideNumber !== currentSlide) {
                navigate(slideNumber, "f", true);
            }
        });

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

    return <></>;
};
