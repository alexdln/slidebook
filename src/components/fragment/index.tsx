"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

import { useSlider } from "@/providers/slider/hooks";
import { useSetFragments } from "@/providers/fragments/hooks";
import { useSlide } from "@/providers/slide/hooks";

import "./fragment.scss";

export interface FragmentProps {
    children: React.ReactNode;
    index: number;
}

export const Fragment: React.FC<FragmentProps> = ({ children, index }) => {
    const pathname = usePathname();
    const { fragment } = useSlider();
    const { slideNumber, active } = useSlide();
    const setFragments = useSetFragments();

    const registerFragment = (node: HTMLDivElement | null) => {
        if (!node || node.dataset.registered || !active) return;

        node.dataset.registered = "true";

        setFragments((prev) => {
            if (prev.lastIndex === undefined || prev.lastIndex === null || prev.slide !== slideNumber) {
                return { slide: slideNumber, lastIndex: index };
            }

            if (prev.lastIndex < index) return { slide: slideNumber, lastIndex: index };

            return prev;
        });
    };

    const isViewPage = pathname?.startsWith("/list");
    const activeFragment = isViewPage || fragment === "l" || (fragment === "f" && index === 0) || index <= +fragment;

    if (!activeFragment && active) return <div ref={registerFragment} />;

    return (
        <div ref={registerFragment} className={clsx("fragment fragment--active")}>
            {children}
        </div>
    );
};
