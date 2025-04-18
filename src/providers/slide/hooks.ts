"use client";

import { useContext } from "react";

import { SlideContext } from "./context";

export const useSlide = () => {
    return useContext(SlideContext);
};
