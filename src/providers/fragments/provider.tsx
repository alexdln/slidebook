"use client";

import { useEffect, useState } from "react";

import { useSlider } from "@/providers/slider/hooks";

import { FragmentsContext, SetFragmentsContext } from "./context";

export const FragmentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fragments, setFragments] = useState<{ slide?: number; lastIndex?: number | null }>({});
    const { currentSlide } = useSlider();

    useEffect(() => {
        setFragments((prev) => (prev.slide === currentSlide ? prev : {}));
    }, [currentSlide]);

    return (
        <FragmentsContext.Provider value={fragments}>
            <SetFragmentsContext.Provider value={setFragments}>{children}</SetFragmentsContext.Provider>
        </FragmentsContext.Provider>
    );
};
