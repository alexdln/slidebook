import { SlideContent } from "@/components/slide-content";
import { HostPanel } from "@/components/host-panel";
import { ListView } from "@/components/list-view";
import { Slide } from "@/lib/slides";

import "./root-page.scss";

export type RootPageProps = {
    segments: string[];
    slides: Slide[];
};

export const RootPage: React.FC<RootPageProps> = async ({ segments, slides }) => {
    const [nameOrSlide] = segments || ["1"];

    if (nameOrSlide === "host") {
        return (
            <HostPanel
                notes={slides.map(({ notes: Notes }, index) => (
                    <Notes slideNumber={index + 1} key={index} />
                ))}
            >
                {slides.map(({ component: SlideItem }, index) => (
                    <SlideContent key={index}>
                        <SlideItem slideNumber={index + 1} />
                    </SlideContent>
                ))}
            </HostPanel>
        );
    }

    if (nameOrSlide === "list") {
        return (
            <ListView>
                {slides.map(({ component: SlideItem }, index) => (
                    <SlideContent key={index}>
                        <SlideItem slideNumber={index + 1} />
                    </SlideContent>
                ))}
            </ListView>
        );
    }

    const slideNumber = Number.parseInt(nameOrSlide as string) || 1;
    const { component: Slide } = slides[slideNumber - 1];

    return (
        <SlideContent>
            <Slide slideNumber={slideNumber} />
        </SlideContent>
    );
};
