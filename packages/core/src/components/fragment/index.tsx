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
    timeout?: number;
}

export const Fragment: React.FC<FragmentProps> = ({ children, index, timeout }) => {
    const pathname = usePathname();
    const { fragment } = useSlider();
    const { slideNumber, active } = useSlide();
    const setFragments = useSetFragments();

    const registerFragment = (node: HTMLDivElement | null) => {
        if (!node || node.dataset.registered || !active) return;

        node.dataset.registered = "true";

        setFragments((prev) => {
            if (prev.preparedSlide === undefined || prev.preparedSlide !== slideNumber || !(index in prev.fragments)) {
                return { preparedSlide: slideNumber, fragments: { ...prev.fragments, [index]: { node, timeout } } };
            }

            return prev;
        });
    };

    const isViewPage = pathname?.startsWith("/list");
    const activeFragment = isViewPage || fragment === "l" || (fragment === "f" && index === 0) || index <= +fragment;

    return (
        <div ref={registerFragment} className={clsx("fragment fragment--active")}>
            {activeFragment && active && children}
        </div>
    );
};
