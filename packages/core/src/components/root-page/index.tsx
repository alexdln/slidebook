import { type Slide } from "@/lib/types";
import { SlideProvider } from "@/providers/slide/provider";
import { SlideContent, type SlideContentProps } from "@/components/slide-content";
import { HostPanel } from "@/components/host-panel";
import { ListView } from "@/components/list-view";
import { NotesPanel } from "@/components/notes-panel";

import "./root-page.scss";

export type RootPageProps = {
    segments: string[];
    slides: Slide[];
    padding?: SlideContentProps["padding"];
};

export const RootPage: React.FC<RootPageProps> = ({ segments, slides, padding }) => {
    const [nameOrSlide] = segments || ["1"];

    if (nameOrSlide === "host") {
        return (
            <HostPanel
                notes={(slides.filter((el) => el.notes) as Required<Slide>[]).map(({ notes: Notes }, index) => (
                    <Notes slideNumber={index + 1} key={index} />
                ))}
            >
                {slides.map(({ component: SlideItem }, index) => (
                    <SlideProvider slideNumber={index + 1} totalSlides={slides.length} key={index}>
                        <SlideContent padding={padding}>
                            <SlideItem slideNumber={index + 1} />
                        </SlideContent>
                    </SlideProvider>
                ))}
            </HostPanel>
        );
    }

    if (nameOrSlide === "list") {
        return (
            <ListView padding={padding}>
                {slides.map(({ component: SlideItem }, index) => (
                    <SlideProvider slideNumber={index + 1} totalSlides={slides.length} key={index}>
                        <SlideContent padding={padding}>
                            <SlideItem slideNumber={index + 1} />
                        </SlideContent>
                    </SlideProvider>
                ))}
            </ListView>
        );
    }

    const slideNumber = Number.parseInt(nameOrSlide as string) || 1;
    const { component: Slide, notes: Notes } = slides[slideNumber - 1];

    return (
        <SlideProvider slideNumber={slideNumber} totalSlides={slides.length}>
            <SlideContent padding={padding}>
                <Slide slideNumber={slideNumber} />
                <NotesPanel notes={Notes ? <Notes slideNumber={slideNumber} /> : undefined} />
            </SlideContent>
        </SlideProvider>
    );
};
