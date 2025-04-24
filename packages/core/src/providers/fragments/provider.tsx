"use client";

import { useEffect, useState } from "react";

import { useSlider } from "@/providers/slider/hooks";

import { type FragmentsStore } from "./types";
import { FragmentsContext, SetFragmentsContext } from "./context";

export const FragmentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fragments, setFragments] = useState<FragmentsStore>({ fragments: [] });
    const { currentSlide } = useSlider();

    useEffect(() => {
        setFragments((prev) => (prev.preparedSlide === currentSlide ? prev : { fragments: [] }));
    }, [currentSlide]);

    return (
        <FragmentsContext.Provider value={fragments}>
            <SetFragmentsContext.Provider value={setFragments}>{children}</SetFragmentsContext.Provider>
        </FragmentsContext.Provider>
    );
};
