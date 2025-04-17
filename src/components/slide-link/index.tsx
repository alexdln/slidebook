"use client";

import { useNavigations } from "@/providers/navigation/hooks";

export interface SlideLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    slide: number;
    fragment?: number;
}

export const SlideLink: React.FC<SlideLinkProps> = ({ slide, fragment, ...props }) => {
    const { navigate } = useNavigations();

    return <button onClick={() => navigate(slide, fragment, false, true)} {...props} />;
};
