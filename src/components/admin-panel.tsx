'use client'

import Link from "next/link"

import { useAuthentication, useSetAuthentication } from "@/providers/authentication/hooks"
import { useSlider } from "@/providers/slider/hooks"

import { AdminControls } from "./admin-controls"
import { AdminAuth } from "./admin-auth"

export const AdminPanel = () => {
    const { isAuthenticated } = useAuthentication()
    const { setIsAuthenticated } = useSetAuthentication()
    const { currentSlide } = useSlider()

    return (
        <>
            {!isAuthenticated ? <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} /> : <AdminControls />}

            <Link
                href={`/${currentSlide}`}
                className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
                Back to Presentation
            </Link>
        </>
    )
}
