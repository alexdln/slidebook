"use client";

import { useRouter } from "next/navigation";

import { useNavigations } from "@/providers/navigation/hooks";

import "./slide-progress.scss";

export const SlideProgress: React.FC = () => {
    const { currentSlide, totalSlides, navigate } = useNavigations();
    const { prefetch } = useRouter();
    const percentage = (currentSlide / totalSlides) * 100;

    return (
        <div
            className="slide-progress"
            style={{ "--dot-size": `calc((100vw - 2rem) / ${totalSlides})` } as React.CSSProperties}
        >
            <div className="slide-progress__bar" style={{ width: `${percentage}%` }}></div>
            <div className="slide-progress__dots">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        className="slide-progress__dot"
                        key={index}
                        onClick={() => navigate(index + 1, index + 1 > currentSlide ? "f" : "l")}
                        disabled={index + 1 === currentSlide}
                        title={`Go to slide ${index + 1}`}
                        onMouseEnter={() => prefetch(`/${index + 1}/${index + 1 > currentSlide ? "f" : "l"}`)}
                    >
                        <span className="slide-progress__dot-icon" />
                    </button>
                ))}
            </div>
        </div>
    );
};
