import { type Slide } from "@/lib/types";
import { SlideContent } from "@/components/slide-content";
import { ListView } from "@/components/list-view";

import "./list-page.scss";

export type ListPageProps = {
    slides: Slide[];
};

export const ListPage: React.FC<ListPageProps> = ({ slides }) => (
    <ListView>
        {slides.map(({ component: SlideItem }, index) => (
            <SlideContent key={index}>
                <SlideItem slideNumber={index + 1} />
            </SlideContent>
        ))}
    </ListView>
);
