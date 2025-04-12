import { SLIDE_WIDTH, SLIDE_HEIGHT } from "@/lib/settings";

export interface SlideContentProps {
    children: React.ReactNode;
}

export const SlideContent: React.FC<SlideContentProps> = ({ children }) => (
    <div
        className="bg-slate-50 rounded-lg shadow-lg overflow-hidden"
        style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT }}
    >
        <div className="flex items-center justify-center p-8">{children}</div>
    </div>
);
