"use client";

import { useRef } from "react";

import { SyncContext } from "./context";

export interface NavigationProviderProps {
    children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const syncRef = useRef<HTMLInputElement | null>(null);

    return <SyncContext.Provider value={syncRef}>{children}</SyncContext.Provider>;
};
