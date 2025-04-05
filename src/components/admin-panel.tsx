'use client'

import Link from "next/link"

import { useAuthentication, useSetAuthentication } from "@/providers/authentication/hooks"
import { useSlider } from "@/providers/slider/hooks"

import { AdminControls } from "./admin-controls"
import { AdminAuth } from "./admin-auth"
import { useCallback } from "react"

export type AdminPanelProps = {
    children: React.ReactNode[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ children }) => {
    const { isAuthenticated } = useAuthentication()
    const { setIsAuthenticated } = useSetAuthentication()
    const { currentSlide } = useSlider()

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

            <Link
                href={`/${currentSlide}`}
                className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
                Back to Presentation
            </Link>
        </>
    )
}
