"use client";

import { useContext } from "react";

import { FragmentsContext, SetFragmentsContext } from "./context";

export const useFragments = () => {
    return useContext(FragmentsContext);
};

export const useSetFragments = () => {
    return useContext(SetFragmentsContext);
};
