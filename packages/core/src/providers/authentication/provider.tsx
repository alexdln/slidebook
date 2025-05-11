"use client";

import { useCallback, useEffect, useState } from "react";

import { CONFIGURED_SERVER } from "@/lib/settings";

import { AuthenticationContext, AuthorizeContext } from "./context";

export interface AuthenticationProviderProps {
    children: React.ReactNode;
}

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authorize = useCallback(async (secret: string, restore?: boolean) => {
        if (!CONFIGURED_SERVER) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL || ""}/${restore ? "restore" : "auth"}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ secret }),
                },
            );

            if (response.ok) {
                const secret = await response.text();
                sessionStorage.setItem("secret", secret);
                setIsAuthenticated(true);
            } else {
                return { error: "Invalid host secret" };
            }
        } catch {
            return { error: "Authentication failed" };
        }
    }, []);

    useEffect(() => {
        const secret = sessionStorage.getItem("secret");
        if (secret && CONFIGURED_SERVER) {
            authorize(secret, true);
        }
    }, [authorize]);

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated }}>
            <AuthorizeContext.Provider value={{ authorize }}>{children}</AuthorizeContext.Provider>
        </AuthenticationContext.Provider>
    );
};
