import { SlideContent } from "@/components/slide-content";
import { AdminPanel } from "@/components/admin-panel";
import { Slide } from "@/lib/slides";

export type AdminPageProps = {
    slides: Slide[];
};

export const AdminPage: React.FC<AdminPageProps> = ({ slides }) => (
    <AdminPanel>
        {slides.map(({ component: SlideItem }, index) => (
            <SlideContent key={index}>
                <SlideItem slideNumber={index + 1} />
            </SlideContent>
        ))}
    </AdminPanel>
);
