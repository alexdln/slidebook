"use client";

import Link from "next/link";
import clsx from "clsx";

import { useSlider } from "@/providers/slider/hooks";

import "./back-link.scss";

export type BackLinkProps = {
    className?: string;
};

export const BackLink: React.FC<BackLinkProps> = ({ className }) => {
    const { currentSlide, fragment } = useSlider();

    return (
        <Link href={`/${currentSlide}/${fragment}`} className={clsx("back-link", className)}>
            Back to Main View
        </Link>
    );
};
