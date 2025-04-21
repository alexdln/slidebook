"use client";

import { useNavigations } from "@/providers/navigation/hooks";
import "./slide-progress.scss";

export const SlideProgress: React.FC = () => {
    const { currentSlide, totalSlides, navigate } = useNavigations();
    const percentage = (currentSlide / totalSlides) * 100;

    return (
        <div className="slide-progress">
            <div className="slide-progress__bar" style={{ width: `${percentage}%` }}></div>
            <div className="slide-progress__dots">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        className="slide-progress__dot"
                        key={index}
                        onClick={() => navigate(index + 1, index + 1 > currentSlide ? "f" : "l")}
                        disabled={index + 1 === currentSlide}
                        title={`Go to slide ${index + 1}`}
                    >
                        <span className="slide-progress__dot-icon" />
                    </button>
                ))}
            </div>
        </div>
    );
};
