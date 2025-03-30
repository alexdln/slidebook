"use client"

import { useCallback, useEffect } from "react"

import { useSetSlider, useSlider } from "@/providers/slider/hooks"
import { useSocket } from "@/providers/socket/hooks"

import { SlideContent } from "./slide-content"
import { SlideProgress } from "./slide-progress"

export const AdminControls = () => {
  const { currentSlide, totalSlides } = useSlider()
  const { setCurrentSlide } = useSetSlider()
  const socket = useSocket()

  const changeSlide = (slideNumber: number) => {
    setCurrentSlide(slideNumber)
    socket?.emit("changeSlide", slideNumber, sessionStorage.getItem('password'));
  }

  const actualizeSlide = useCallback(() => {
    socket?.emit("actualizeSlide", sessionStorage.getItem('password'));
  }, [socket])

  useEffect(actualizeSlide, [actualizeSlide])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6 border border-gray-200 rounded-lg">
        <div className="bg-gray-100 rounded-md overflow-hidden grid gap-2 grid-cols-2 items-center justify-center">
          <SlideContent slideNumber={currentSlide} />
          {currentSlide < totalSlides && (
            <SlideContent slideNumber={currentSlide + 1} />
          )}
        </div>
      </div>

      <div className="mb-4">
        <SlideProgress current={currentSlide} total={totalSlides} />
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-500">
            Slide {currentSlide} of {totalSlides}
          </span>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={() => changeSlide(1)}
          disabled={currentSlide === 1}
          className="cursor-pointer w-20 bg-gray-200 py-2 px-4 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          «
        </button>
        <button
          onClick={() => changeSlide(currentSlide - 1)}
          disabled={currentSlide === 1}
          className="cursor-pointer w-20 bg-gray-200 py-2 px-4 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ‹
        </button>
        <button
          onClick={actualizeSlide}
          className="cursor-pointer flex-1 bg-gray-200 py-2 px-4 rounded-md enabled:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Actualize for all
        </button>
        <button
          onClick={() => changeSlide(currentSlide + 1)}
          disabled={currentSlide === totalSlides}
          className="cursor-pointer w-20 bg-blue-600 text-white py-2 px-4 rounded-md enabled:hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ›
        </button>
        <button
          onClick={() => changeSlide(totalSlides)}
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
            onClick={() => changeSlide(num)}
            className={`cursor-pointer p-2 rounded-md ${currentSlide === num ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

