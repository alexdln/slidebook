"use client";

import { createContext } from "react";

type AuthenticationContextType = {
    isAuthenticated: boolean;
};

type SetAuthenticationContextType = {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
    isAuthenticated: false,
});

export const SetAuthenticationContext = createContext<SetAuthenticationContextType>({
    setIsAuthenticated: () => {},
});
