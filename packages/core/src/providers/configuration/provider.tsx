"use client";

import { useEffect } from "react";

import { useSync } from "@/providers/navigation/hooks";

import { useKeyboardNavigation, useSocketNavigation } from "./hooks";

export interface ConfigurationProviderProps {
    children?: React.ReactNode;
}

export const ConfigurationProvider: React.FC<ConfigurationProviderProps> = ({ children }) => {
    useKeyboardNavigation();
    useSocketNavigation();
    const syncRef = useSync();

    useEffect(() => {
        const sync = document.cookie.match(/sb_sync=([^;]+)/)?.[1];
        syncRef.toggle(!sync || sync === "true");
    }, []);

    return <>{children}</>;
};
