import Link from "next/link";

import { SlideContent } from "./slide-content";
import { AutoZoomContainer } from "./auto-zoom-container";
import { BackLink } from "./back-link";

export type ListViewProps = {
    children: React.ReactNode[];
};

export const ListView: React.FC<ListViewProps> = ({ children }) => (
    <div className="max-w-full bg-slate-50 rounded-lg shadow-lg m-1 p-4 mt-3">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 w-7xl max-w-full gap-2">
            {children.map((child, index) => (
                <div key={index} className="relative h-48 md:h-60 lg:h-64">
                    <div className="absolute -top-2 -left-2 bg-slate-900/50 text-slate-100 rounded-md h-8 min-w-8 flex items-center justify-center z-10 pointer-events-none">
                        {index + 1}
                    </div>
                    <AutoZoomContainer transformOrigin="left top">
                        <SlideContent>{child}</SlideContent>
                        <Link
                            href={`/${index + 1}`}
                            className="absolute block top-0 left-0 w-full h-full bg-slate-300/30 hover:bg-blue-600/30 focus:bg-blue-600/30 transition-colors duration-300 rounded-md"
                        />
                    </AutoZoomContainer>
                </div>
            ))}
        </div>
        <div className="relative mt-8">
            <BackLink className="my-3 w-full text-center text-sm" />
        </div>
    </div>
);
