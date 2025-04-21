"use client";

import clsx from "clsx";

import { useNavigations } from "@/providers/navigation/hooks";

import "./slide-link.scss";

export interface SlideLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    slide: number;
    fragment?: number;
}

export const SlideLink: React.FC<SlideLinkProps> = ({ slide, fragment, className, ...props }) => {
    const { navigate } = useNavigations();

    return (
        <button
            onClick={() => navigate(slide, fragment, false, true)}
            className={clsx("slide-link", className)}
            {...props}
        />
    );
};
