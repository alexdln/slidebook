import { RootPage } from "@/components/root-page"
import { generateStaticParamsFactory } from "@/lib/generate-static-params";
import { slides } from "@/lib/slides"

const SlidePage: React.FC<{ params: Promise<{ pathname: string[] }> }> = async ({ params }) => {
  const { pathname } = await params;

  return (
    <RootPage segments={pathname} slides={slides} />
  )
}

export const generateStaticParams = generateStaticParamsFactory(slides.length);

export default SlidePage;
