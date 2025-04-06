'use client'

import { useCallback } from "react"

import { useAuthentication, useSetAuthentication } from "@/providers/authentication/hooks"

import { AdminControls } from "./admin-controls"
import { AdminAuth } from "./admin-auth"

export type AdminPanelProps = {
    children: React.ReactNode[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ children }) => {
    const { isAuthenticated } = useAuthentication()
    const { setIsAuthenticated } = useSetAuthentication()

    const onAuthenticated = useCallback(() => {
        setIsAuthenticated(true)
    }, [setIsAuthenticated])

    return (
        <>
            {!isAuthenticated ? (
                <AdminAuth onAuthenticated={onAuthenticated} />
            ) : (
                <AdminControls>
                    {children}
                </AdminControls>
            )}
        </>
    )
}
