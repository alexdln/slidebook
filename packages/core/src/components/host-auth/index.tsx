"use client";

import { useActionState } from "react";
import Link from "next/link";

import { useSlider } from "@/providers/slider/hooks";
import { useAuthorize } from "@/providers/authentication/hooks";

import { AutoZoomContainer } from "../auto-zoom-container";

import "./host-auth.scss";

export const HostAuth: React.FC = () => {
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
            <div className="host-auth">
                <h2 className="host-auth-title">Host Authentication</h2>

                <form action={formAction}>
                    <div className="mb-4">
                        <label htmlFor="password" className="host-auth-label">
                            Host Key
                        </label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            id="password"
                            name="password"
                            className="host-auth-input"
                            placeholder="Enter host password"
                            required
                        />
                    </div>

                    {state?.error && <div className="host-auth-error">{state.error}</div>}

                    <button type="submit" className="host-auth-button">
                        Login
                    </button>
                </form>
                <Link href={`/${currentSlide}/${fragment}`} className="host-auth-link">
                    Back to Presentation as Viewer
                </Link>
            </div>
        </AutoZoomContainer>
    );
};
