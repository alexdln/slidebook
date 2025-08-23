import { type Slide } from "@/lib/types";
import { SlideContent, type SlideContentProps } from "@/components/slide-content";
import { ListView } from "@/components/list-view";

import "./list-page.scss";

export type ListPageProps = {
    slides: Slide[];
    padding?: SlideContentProps["padding"];
};

export const ListPage: React.FC<ListPageProps> = ({ slides, padding }) => (
    <ListView>
        {slides.map(({ component: SlideItem }, index) => (
            <SlideContent key={index} padding={padding}>
                <SlideItem slideNumber={index + 1} />
            </SlideContent>
        ))}
    </ListView>
);
