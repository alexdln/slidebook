
'use client'

import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { useSocket } from "@/providers/socket/hooks";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

import { SliderContext, SetSliderContext } from "./context";

export interface SliderProviderProps {
    children: React.ReactNode
    totalSlides: number;
}

export const SliderProvider: React.FC<SliderProviderProps> = ({ children, totalSlides }) => {
    const params = useParams()
    const nameOrSlide = params.pathname?.[0];
    const slideNumber = nameOrSlide?.match(/^\d+$/) && Number.parseInt(nameOrSlide as string)
    const router = useRouter()
    const socket = useSocket()
    const [currentSlide, setCurrentSlide] = useState(slideNumber || 1);

    const navigateToSlide = useCallback((slideNumber: number) => {
        if (slideNumber < 1 || slideNumber > totalSlides) return

        if (nameOrSlide !== "admin") {
            router.push(`/${slideNumber}`)
        }
        setCurrentSlide(slideNumber)
    }, [router, nameOrSlide, totalSlides, setCurrentSlide])

    // Set up keyboard navigation
    useKeyboardNavigation({
        onPrevious: () => navigateToSlide(currentSlide - 1),
        onNext: () => navigateToSlide(currentSlide + 1),
        totalSlides,
        currentSlide,
    })

    useEffect(() => {
        if (!socket) return

        // Listen for slide changes from the admin
        socket.on("slideChange", (slideNumber: number) => {
            if (slideNumber !== currentSlide) {
                navigateToSlide(slideNumber)
            }
        })
        // Listen for slide changes from the admin
        socket.on("currentSlide", (slideNumber: number) => {
            if (slideNumber !== currentSlide) {
                navigateToSlide(slideNumber)
            }
        })

        // Inform the server about the current slide view
        socket.emit("viewSlide", currentSlide)

        return () => {
            socket.off("slideChange")
        }
    }, [socket, currentSlide, navigateToSlide])

    useEffect(() => {
        if (slideNumber) {
            setCurrentSlide(slideNumber)
        }
    }, [slideNumber])

    useEffect(() => {
        socket?.emit("getCurrentSlide")
    }, [socket])

    return (
        <SliderContext.Provider value={{ currentSlide, totalSlides }}>
            <SetSliderContext.Provider value={{ setCurrentSlide: navigateToSlide }}>
                {children}
            </SetSliderContext.Provider>
        </SliderContext.Provider>
    )
}
