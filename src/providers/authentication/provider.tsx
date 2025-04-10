"use client";

import { useCallback, useEffect, useState } from "react";

import { AuthenticationContext, AuthorizeContext } from "./context";

export interface AuthenticationProviderProps {
    children: React.ReactNode;
}

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authorize = useCallback(async (password: string) => {
        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                setIsAuthenticated(true);
                sessionStorage.setItem("password", password);
            } else {
                return { error: "Invalid admin password" };
            }
        } catch {
            return { error: "Authentication failed" };
        }
    }, []);

    useEffect(() => {
        authorize(sessionStorage.getItem("password") || "");
    }, [authorize]);

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated }}>
            <AuthorizeContext.Provider value={{ authorize }}>{children}</AuthorizeContext.Provider>
        </AuthenticationContext.Provider>
    );
};
