"use client";

import Link from "next/link";
import { useSlider } from "@/providers/slider/hooks";
import { cn } from "@/lib/utils";

export type BackLinkProps = {
    className?: string;
};

export const BackLink: React.FC<BackLinkProps> = ({ className }) => {
    const { currentSlide } = useSlider();

    return (
        <Link href={`/${currentSlide}`} className={cn("block text-gray-500 hover:text-gray-700", className)}>
            Back to Main View
        </Link>
    );
};
