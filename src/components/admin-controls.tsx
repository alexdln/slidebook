"use client"

import { useCallback, useEffect } from "react"
import Link from "next/link"

import { useSetSlider, useSlider } from "@/providers/slider/hooks"
import { useSocket } from "@/providers/socket/hooks"
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/lib/settings"

import { SlideContent } from "./slide-content"
import { AutoZoomContainer } from "./auto-zoom-container"

export type AdminControlsProps = {
  children: React.ReactNode[];
}

export const AdminControls: React.FC<AdminControlsProps> = ({ children }) => {
  const { currentSlide, totalSlides } = useSlider()
  const { setCurrentSlide } = useSetSlider()
  const socket = useSocket()

  const actualizeSlide = useCallback(() => {
    socket?.emit("actualizeSlide", sessionStorage.getItem('password'));
  }, [socket])

  useEffect(actualizeSlide, [actualizeSlide])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT }}>
      <div className="mb-6 border border-gray-200 rounded-lg">
        <div className="bg-gray-100 rounded-md overflow-hidden grid gap-2 grid-cols-2 justify-center">
          <p className="pt-4 text-center font-bold">
            Current slide
          </p>
          <p className="pt-4 text-center font-bold">
            Next slide
          </p>
        </div>
        <div className="bg-gray-100 rounded-md overflow-hidden grid gap-2 grid-cols-2 justify-center h-[360px]">
          <div className="flex items-center justify-center h-full">
            <AutoZoomContainer>
              <SlideContent>
                {children[currentSlide - 1]}
              </SlideContent>
            </AutoZoomContainer>
          </div>
          {currentSlide < totalSlides && (
            <div className="flex items-center justify-center h-full">
              Next slide
              <AutoZoomContainer>
                <SlideContent>
                  {children[currentSlide]}
                </SlideContent>
              </AutoZoomContainer>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={() => setCurrentSlide(1)}
          disabled={currentSlide === 1}
          className="cursor-pointer min-w-12 h-12 bg-gray-200 py-2 px-4 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          «
        </button>
        <button
          onClick={() => setCurrentSlide(currentSlide - 1)}
          disabled={currentSlide === 1}
          className="cursor-pointer min-w-12 h-12 bg-gray-200 py-2 px-4 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ‹
        </button>
        <button
          onClick={actualizeSlide}
          className="cursor-pointer flex-1 h-12 bg-gray-200 py-2 px-4 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Present from current slide
        </button>
        <button
          onClick={() => setCurrentSlide(currentSlide + 1)}
          disabled={currentSlide === totalSlides}
          className="cursor-pointer min-w-12 h-12 bg-blue-600 text-white py-2 px-4 rounded-md enabled:hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ›
        </button>
        <button
          onClick={() => setCurrentSlide(totalSlides)}
          disabled={currentSlide === totalSlides}
          className="cursor-pointer min-w-12 h-12 bg-blue-600 text-white py-2 px-4 rounded-md enabled:hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          »
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto">
        {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentSlide(num)}
            className={`cursor-pointer p-2 h-12 min-w-12 rounded-md ${currentSlide === num ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {num}
          </button>
        ))}
      </div>
      <Link
        href={`/${currentSlide}`}
        className="block mt-6 w-full text-center text-sm text-gray-500 hover:text-gray-700"
      >
        Back to Presentation
      </Link>
    </div>
  )
}

