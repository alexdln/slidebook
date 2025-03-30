import Link from "next/link";

import { SlideContent } from "@/components/slide-content"
import { SlideProgress } from "@/components/slide-progress"
import { AdminPanel } from "@/components/admin-panel"
import { SlideControls } from "@/components/slide-controls";

const totalSlides = 20;

const SlidePage: React.FC<{ params: Promise<{ pathname: string[] }> }> = async ({ params }) => {
  const { pathname } = await params
  const [nameOrSlide] = pathname || ['1'];

  if (nameOrSlide === "admin") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <AdminPanel />
        </div>
      </main>
    )
  }

  const slideId = Number.parseInt(nameOrSlide as string) || 1

  return (
    <main key={slideId} className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <SlideContent slideNumber={slideId} />
        </div>

        <div className="p-4 w-full">
          <SlideProgress current={slideId} total={totalSlides} />
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-4">
              <SlideControls />
            </div>
            <span className="text-sm text-gray-500">
              Slide {slideId} of {totalSlides}
            </span>
            <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export const generateStaticParams = async () => {
  return Array.from({ length: totalSlides }, (_, i) => i + 1).reduce((acc, cur) => {
    acc.push({ pathname: [cur.toString()] });
    return acc;
  }, [{ pathname: ["admin"] }])
}

export default SlidePage;
