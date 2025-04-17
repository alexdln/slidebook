"use client";

import { useActionState } from "react";
import Link from "next/link";

import { useSlider } from "@/providers/slider/hooks";
import { useAuthorize } from "@/providers/authentication/hooks";

import { AutoZoomContainer } from "../auto-zoom-container";

import "./admin-auth.scss";

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
            <div className="admin-auth">
                <h2 className="admin-auth-title">Admin Authentication</h2>

                <form action={formAction}>
                    <div className="mb-4">
                        <label htmlFor="password" className="admin-auth-label">
                            Admin Key
                        </label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            id="password"
                            name="password"
                            className="admin-auth-input"
                            placeholder="Enter admin password"
                            required
                        />
                    </div>

                    {state?.error && <div className="admin-auth-error">{state.error}</div>}

                    <button type="submit" className="admin-auth-button">
                        Login
                    </button>
                </form>
                <Link href={`/${currentSlide}/${fragment}`} className="admin-auth-link">
                    Back to Presentation as Viewer
                </Link>
            </div>
        </AutoZoomContainer>
    );
};
