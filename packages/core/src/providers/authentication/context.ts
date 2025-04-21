"use client";

import { createContext } from "react";

type AuthenticationContextType = {
    isAuthenticated: boolean;
};

type AuthorizeContextType = {
    authorize: (password: string) => Promise<{ error?: string } | void>;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
    isAuthenticated: false,
});

export const AuthorizeContext = createContext<AuthorizeContextType>({
    authorize: async () => ({}),
});
