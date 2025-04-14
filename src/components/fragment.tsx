"use client";

import { usePathname } from "next/navigation";

import { useSlider } from "@/providers/slider/hooks";
import { useSetFragments } from "@/providers/fragments/hooks";

export interface FragmentProps {
    children: React.ReactNode;
    index: number;
}

export const Fragment: React.FC<FragmentProps> = ({ children, index }) => {
    const { currentSlide, fragment } = useSlider();
    const pathname = usePathname();
    const setFragments = useSetFragments();

    const registerFragment = (node: HTMLDivElement | null) => {
        if (!node || node.dataset.registered) return;

        node.dataset.registered = "true";

        setFragments((prev) => {
            if (prev.lastIndex === undefined || prev.lastIndex === null || prev.slide !== currentSlide) {
                return { slide: currentSlide, lastIndex: index };
            }

            if (prev.lastIndex < index) return { slide: currentSlide, lastIndex: index };

            return prev;
        });
    };

    const isViewPage = pathname?.startsWith("/list");
    const isActive = isViewPage || fragment === "l" || (fragment === "f" && index === 0) || index <= +fragment;

    if (!isActive) return <div ref={registerFragment} />;

    return <div ref={registerFragment}>{children}</div>;
};
