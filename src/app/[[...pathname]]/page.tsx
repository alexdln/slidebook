import { SlideContent } from "@/components/slide-content"
import { AdminPanel } from "@/components/admin-panel"

const totalSlides = 20;

const SlidePage: React.FC<{ params: Promise<{ pathname: string[] }> }> = async ({ params }) => {
  const { pathname } = await params
  const [nameOrSlide] = pathname || ['1'];

  if (nameOrSlide === "admin") {
    return (
      <AdminPanel />
    )
  }

  const slideId = Number.parseInt(nameOrSlide as string) || 1

  return (
    <SlideContent slideNumber={slideId} />
  )
}

export const generateStaticParams = async () => {
  return Array.from({ length: totalSlides }, (_, i) => i + 1).reduce((acc, cur) => {
    acc.push({ pathname: [cur.toString()] });
    return acc;
  }, [{ pathname: ["admin"] }])
}

export default SlidePage;
