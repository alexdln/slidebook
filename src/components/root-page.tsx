import { SlideContent } from "@/components/slide-content";
import { AdminPanel } from "@/components/admin-panel";
import { Slide } from "@/lib/slides";

export type RootPageProps = {
    segments: string[];
    slides: Slide[];
};

export const RootPage: React.FC<RootPageProps> = async ({ segments, slides }) => {
    const [nameOrSlide] = segments || ["1"];

    if (nameOrSlide === "admin") {
        return (
            <AdminPanel>
                {slides.map(({ component: SlideItem }, index) => (
                    <SlideContent key={index}>
                        <SlideItem slideNumber={index + 1} />
                    </SlideContent>
                ))}
            </AdminPanel>
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
