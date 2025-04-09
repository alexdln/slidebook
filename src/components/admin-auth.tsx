"use client";

import { startTransition, useActionState, useEffect } from "react";
import Link from "next/link";

import { useSlider } from "@/providers/slider/hooks";

export interface AdminAuthProps {
    onAuthenticated: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
    const { currentSlide } = useSlider();

    const [state, formAction] = useActionState(
        async (_state: { error: string } | undefined, formData: FormData) => {
            try {
                const password = formData.get("password") as string;
                const response = await fetch("/api/auth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password }),
                });

                if (response.ok) {
                    onAuthenticated();
                    sessionStorage.setItem("password", password);
                } else {
                    return { error: "Invalid admin password" };
                }
            } catch {
                return { error: "Authentication failed" };
            }
        },
        { error: "" },
    );

    useEffect(() => {
        const savedPassword = sessionStorage.getItem("password");
        if (savedPassword) {
            const formData = new FormData();
            formData.set("password", savedPassword);
            startTransition(() => {
                formAction(formData);
            });
        }
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Authentication</h2>

            <form action={formAction}>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Admin Key
                    </label>
                    <input
                        type="password"
                        autoComplete="current-password"
                        id="password"
                        name="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter admin password"
                        required
                    />
                </div>

                {state?.error && <div className="mb-4 text-red-500 text-sm">{state.error}</div>}

                <button
                    type="submit"
                    className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Login
                </button>
            </form>
            <Link
                href={`/${currentSlide}`}
                className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
                Back to Presentation as Viewer
            </Link>
        </div>
    );
};
