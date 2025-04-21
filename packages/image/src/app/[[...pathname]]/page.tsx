import { RootPage } from "@slidebook/core/lib/components/root-page";
import { generateStaticParamsFactory } from "@slidebook/core/lib/lib/generate-static-params";
import { slides } from "./slides";

const SlidePage: React.FC<{ params: Promise<{ pathname: string[] }> }> = async ({ params }) => {
    const { pathname } = await params;

    return <RootPage segments={pathname} slides={slides} />;
};

export const generateStaticParams = generateStaticParamsFactory(slides.length);

export default SlidePage;
