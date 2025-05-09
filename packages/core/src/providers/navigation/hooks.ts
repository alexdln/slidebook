"use client";

import { useCallback, useContext, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { useSocket } from "@/providers/socket/hooks";
import { useSetSlider, useSlider } from "@/providers/slider/hooks";
import { useFragments, useSetFragments } from "@/providers/fragments/hooks";

import { SyncContext } from "./context";

export const useNavigations = (syncRefArg?: React.RefObject<HTMLInputElement | null>) => {
    const params = useParams();
    const { currentSlide, fragment, totalSlides } = useSlider();
    const { setCurrentSlide: setNavigationParams } = useSetSlider();
    const { fragments } = useFragments();
    const setFragments = useSetFragments();
    const router = useRouter();
    const socket = useSocket();
    const syncRefHook = useSync();
    const lastIndex = +(Object.keys(fragments).sort((a, b) => +b - +a)[0] || 0);
    const nameOrSlide = params.pathname?.[0] || 0;

    const navigate = useCallback(
        (slideNumber: number, fragmentNumber: "f" | "l" | number = "f", skipEvent?: boolean, force?: boolean) => {
            if (slideNumber < 1 || slideNumber > totalSlides) return;

            if (!Number.isNaN(+nameOrSlide) || force) {
                if (slideNumber === currentSlide && !Number.isNaN(+nameOrSlide)) {
                    window.history.pushState({}, "", `/${slideNumber}/${fragmentNumber}`);
                } else {
                    setFragments({ preparedSlide: slideNumber, fragments: [] });
                    router.push(`/${slideNumber}/${fragmentNumber}`);
                }
            }

            const secret = sessionStorage.getItem("secret");
            const syncRef = syncRefArg?.current || syncRefHook;
            if (secret && !skipEvent && syncRef?.checked) {
                socket?.emit("changeSlide", { slide: slideNumber, fragment: fragmentNumber }, secret, socket.id);
            }
            setNavigationParams({ slide: slideNumber, fragment: fragmentNumber });
        },
        [router, setFragments, currentSlide, nameOrSlide, totalSlides, setNavigationParams, socket, syncRefArg],
    );

    const prev = useCallback(
        (skipEvent?: boolean) => {
            if (currentSlide === 1 && (+fragment === 0 || lastIndex === 0)) return;

            if (!lastIndex || +fragment === 0 || fragment === "f") {
                navigate(currentSlide - 1, "l", skipEvent);
            } else if (fragment === "l") {
                navigate(currentSlide, lastIndex - 1, skipEvent);
            } else if (!Number.isNaN(+fragment)) {
                navigate(currentSlide, +fragment - 1, skipEvent);
            }
        },
        [navigate, currentSlide, lastIndex, fragment],
    );

    const next = useCallback(
        (skipEvent?: boolean) => {
            if (currentSlide === totalSlides && (!lastIndex || +fragment === lastIndex || lastIndex === 0)) {
                return;
            }

            if (!lastIndex || +fragment === lastIndex || fragment === "l") {
                navigate(currentSlide + 1, "f", skipEvent);
            } else if (fragment === "f") {
                navigate(currentSlide, 1, skipEvent);
            } else if (!Number.isNaN(+fragment)) {
                navigate(currentSlide, +fragment + 1, skipEvent);
            }
        },
        [navigate, currentSlide, totalSlides, lastIndex, fragment],
    );

    useEffect(() => {
        let currentFragment;
        const keys = Object.keys(fragments).sort((a, b) => +b - +a);
        if (fragment === "f") {
            currentFragment = fragments[0];
        } else if (fragment === "l") {
            currentFragment = fragments[+keys[keys.length - 1]];
        } else if (!Number.isNaN(+fragment)) {
            currentFragment = fragments[+fragment];
        }

        if (currentFragment?.timeout) {
            const timeout = setTimeout(() => {
                next();
            }, currentFragment.timeout);

            return () => clearTimeout(timeout);
        }
        return () => ({});
    }, [fragments, fragment, next]);

    return { currentSlide, fragment, totalSlides, lastIndex, navigate, prev, next, push: router.push };
};

export const useSync = () => {
    const syncRef = useContext(SyncContext);

    return {
        get checked() {
            return syncRef?.current?.checked;
        },
        toggle: (value?: boolean) => {
            if (!syncRef?.current) return;

            const newValue = value ?? !syncRef.current.checked;
            syncRef.current.checked = newValue;
            localStorage.setItem("sync", newValue.toString());
        },
        register: (node: HTMLInputElement) => {
            if (!syncRef) return;
            syncRef.current = node;
        },
    };
};
