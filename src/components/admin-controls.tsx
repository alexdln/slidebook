"use client"

import { useCallback, useEffect } from "react"

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
          className="cursor-pointer w-20 bg-gray-200 py-2 px-4 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          «
        </button>
        <button
          onClick={() => setCurrentSlide(currentSlide - 1)}
          disabled={currentSlide === 1}
          className="cursor-pointer w-20 bg-gray-200 py-2 px-4 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ‹
        </button>
        <button
          onClick={actualizeSlide}
          className="cursor-pointer flex-1 bg-gray-200 py-2 px-4 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start from here
        </button>
        <button
          onClick={() => setCurrentSlide(currentSlide + 1)}
          disabled={currentSlide === totalSlides}
          className="cursor-pointer w-20 bg-blue-600 text-white py-2 px-4 rounded-md enabled:hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ›
        </button>
        <button
          onClick={() => setCurrentSlide(totalSlides)}
          disabled={currentSlide === totalSlides}
          className="cursor-pointer w-20 bg-blue-600 text-white py-2 px-4 rounded-md enabled:hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          »
        </button>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentSlide(num)}
            className={`cursor-pointer p-2 rounded-md ${currentSlide === num ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

