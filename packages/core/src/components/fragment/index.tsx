"use client";

import { useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { useSlider } from "@/providers/slider/hooks";
import { useSetFragments } from "@/providers/fragments/hooks";
import { useSlide } from "@/providers/slide/hooks";

import "./fragment.scss";

export interface FragmentProps {
    children: React.ReactNode;
    index: number;
    timeout?: number;
    block?: boolean;
}

export const Fragment: React.FC<FragmentProps> = ({ children, index, timeout, block }) => {
    const pathname = usePathname();
    const { fragment } = useSlider();
    const { slideNumber, active } = useSlide();
    const setFragments = useSetFragments();

    const isViewPage = useMemo(() => pathname.startsWith("/list"), [pathname]);

    const activeFragment = useMemo(() => {
        if (fragment === "l") return true;
        if (fragment === "f") return index === 0;
        return index <= +fragment;
    }, [fragment, index]);

    const shouldRender = isViewPage || (active && activeFragment);

    const register = useCallback(
        (node: HTMLDivElement | null) => {
            if (!node || node.dataset.registered || !active) return;
            node.dataset.registered = "true";

            const currentItem = { node, timeout };

            setFragments((prev) => ({
                preparedSlide: slideNumber,
                fragments: { ...prev.fragments, [index]: currentItem },
            }));

            return () => {
                setFragments((prev) => {
                    const newFragments = { ...prev.fragments };
                    if (newFragments[index] === currentItem) {
                        delete newFragments[index];
                        return {
                            preparedSlide: slideNumber,
                            fragments: newFragments,
                        };
                    }
                    return prev;
                });
            };
        },
        [active, slideNumber, index, timeout, setFragments],
    );

    useEffect(() => {
        if (!block) {
            const currentItem = { node: undefined, timeout };
            setFragments((prev) => ({
                preparedSlide: slideNumber,
                fragments: { ...prev.fragments, [index]: currentItem },
            }));

            return () => {
                setFragments((prev) => {
                    const newFragments = { ...prev.fragments };
                    if (newFragments[index] === currentItem) {
                        delete newFragments[index];
                        return {
                            preparedSlide: slideNumber,
                            fragments: newFragments,
                        };
                    }
                    return prev;
                });
            };
        }
    }, [block, index, slideNumber, timeout, setFragments]);

    if (block) {
        return (
            <div ref={register} className={clsx("fragment", shouldRender && "fragment--active")}>
                {shouldRender && children}
            </div>
        );
    }

    return shouldRender ? children : null;
};
