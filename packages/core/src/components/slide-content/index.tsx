import clsx from "clsx";

import "./slide-content.scss";

export interface SlideContentProps {
    children: React.ReactNode;
    padding?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export const SlideContent: React.FC<SlideContentProps> = ({ children, padding = "lg" }) => (
    <div className="slide-content">
        <div className={clsx("slide-content__inner", padding !== "none" && `_padding-${padding}`)}>{children}</div>
    </div>
);
