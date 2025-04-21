import { type Slide } from "@/lib/types";
import { SlideProvider } from "@/providers/slide/provider";
import { SlideContent } from "@/components/slide-content";
import { HostPanel } from "@/components/host-panel";
import { ListView } from "@/components/list-view";

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
                notes={(slides.filter((el) => el.notes) as Required<Slide>[]).map(({ notes: Notes }, index) => (
                    <Notes slideNumber={index + 1} key={index} />
                ))}
            >
                {slides.map(({ component: SlideItem }, index) => (
                    <SlideProvider slideNumber={index + 1} key={index}>
                        <SlideContent>
                            <SlideItem slideNumber={index + 1} />
                        </SlideContent>
                    </SlideProvider>
                ))}
            </HostPanel>
        );
    }

    if (nameOrSlide === "list") {
        return (
            <ListView>
                {slides.map(({ component: SlideItem }, index) => (
                    <SlideProvider slideNumber={index + 1} key={index}>
                        <SlideContent>
                            <SlideItem slideNumber={index + 1} />
                        </SlideContent>
                    </SlideProvider>
                ))}
            </ListView>
        );
    }

    const slideNumber = Number.parseInt(nameOrSlide as string) || 1;
    const { component: Slide } = slides[slideNumber - 1];

    return (
        <SlideProvider slideNumber={slideNumber}>
            <SlideContent>
                <Slide slideNumber={slideNumber} />
            </SlideContent>
        </SlideProvider>
    );
};
