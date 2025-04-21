"use client";

import { useCallback, useContext } from "react";
import { useRouter, useParams } from "next/navigation";

import { useSocket } from "@/providers/socket/hooks";
import { useSetSlider, useSlider } from "@/providers/slider/hooks";
import { useFragments, useSetFragments } from "@/providers/fragments/hooks";
import { SyncContext } from "./context";

export const useNavigations = (syncRefArg?: React.RefObject<boolean>) => {
    const params = useParams();
    const { currentSlide, fragment, totalSlides } = useSlider();
    const { setCurrentSlide: setNavigationParams } = useSetSlider();
    const { lastIndex } = useFragments();
    const setFragments = useSetFragments();
    const router = useRouter();
    const socket = useSocket();
    const syncRefHook = useSync();
    const syncRef = syncRefArg || syncRefHook;

    const nameOrSlide = params.pathname?.[0] || 0;
    const navigate = useCallback(
        (slideNumber: number, fragmentNumber: "f" | "l" | number = "f", skipEvent?: boolean, force?: boolean) => {
            if (slideNumber < 1 || slideNumber > totalSlides) return;

            if (!Number.isNaN(+nameOrSlide) || force) {
                if (slideNumber === currentSlide && !Number.isNaN(+nameOrSlide)) {
                    window.history.pushState({}, "", `/${slideNumber}/${fragmentNumber}`);
                } else {
                    setFragments({ slide: slideNumber, lastIndex: 0 });
                    router.push(`/${slideNumber}/${fragmentNumber}`);
                }
            }

            const password = sessionStorage.getItem("password");
            if (password && !skipEvent && syncRef.current) {
                socket?.emit("changeSlide", slideNumber, password, socket.id);
            }
            setNavigationParams({ slide: slideNumber, fragment: fragmentNumber });
        },
        [router, setFragments, currentSlide, nameOrSlide, totalSlides, setNavigationParams, socket, syncRef],
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

    return { currentSlide, fragment, totalSlides, lastIndex, navigate, prev, next };
};

export const useSync = () => {
    const syncRef = useContext(SyncContext);
    return syncRef;
};
