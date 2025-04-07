"use client";

import { useState } from "react";

import { AuthenticationContext, SetAuthenticationContext } from "./context";

export interface AuthenticationProviderProps {
    children: React.ReactNode;
}

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated }}>
            <SetAuthenticationContext.Provider value={{ setIsAuthenticated }}>
                {children}
            </SetAuthenticationContext.Provider>
        </AuthenticationContext.Provider>
    );
};
