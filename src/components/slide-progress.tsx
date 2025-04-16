"use client";

import { useNavigations } from "@/providers/navigation/hooks";

export const SlideProgress: React.FC = () => {
    const { currentSlide, totalSlides, navigate } = useNavigations();
    const percentage = (currentSlide / totalSlides) * 100;

    return (
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${percentage}%` }}
            ></div>
            <div className="flex gap-1 w-full -mt-5">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        className="cursor-pointer flex-1 py-2 text-transparent enabled:hover:text-blue-500"
                        key={index}
                        onClick={() => navigate(index + 1, index + 1 > currentSlide ? "f" : "l")}
                        disabled={index + 1 === currentSlide}
                        title={`Go to slide ${index + 1}`}
                    >
                        <span className="block w-4 h-4 mx-auto rounded-full text-inherit bg-current" />
                    </button>
                ))}
            </div>
        </div>
    );
};
