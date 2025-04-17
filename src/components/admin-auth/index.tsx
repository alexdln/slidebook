"use client";

import { useActionState } from "react";
import Link from "next/link";

import { useSlider } from "@/providers/slider/hooks";
import { useAuthorize } from "@/providers/authentication/hooks";
import { AutoZoomContainer } from "../auto-zoom-container";

export const AdminAuth: React.FC = () => {
    const { currentSlide, fragment } = useSlider();
    const { authorize } = useAuthorize();

    const [state, formAction] = useActionState(
        async (_state: { error: string } | undefined, formData: FormData) => {
            const password = formData.get("password") as string;
            const response = await authorize(password);

            if (response?.error) {
                return { error: response.error };
            }
        },
        { error: "" },
    );

    return (
        <AutoZoomContainer>
            <div className="bg-slate-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Admin Authentication</h2>

                <form action={formAction}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                            Admin Key
                        </label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            id="password"
                            name="password"
                            className="w-full p-2 border border-slate-300 rounded-md"
                            placeholder="Enter admin password"
                            required
                        />
                    </div>

                    {state?.error && <div className="mb-4 text-red-500 text-sm">{state.error}</div>}

                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-blue-600 text-slate-50 py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <Link
                    href={`/${currentSlide}/${fragment}`}
                    className="block mt-4 w-full text-sm text-slate-500 hover:text-slate-700"
                >
                    Back to Presentation as Viewer
                </Link>
            </div>
        </AutoZoomContainer>
    );
};
