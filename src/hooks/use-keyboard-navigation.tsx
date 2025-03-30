"use client"

import { useEffect } from "react"

export interface KeyboardNavigationProps {
  onPrevious: () => void
  onNext: () => void
  totalSlides: number
  currentSlide: number
  // disabled: boolean
}

export const useKeyboardNavigation = ({ onPrevious, onNext, totalSlides, currentSlide }: KeyboardNavigationProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // if (disabled) return
      e.preventDefault()

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          if (currentSlide > 1) {
            onPrevious()
          }
          break
        case "ArrowRight":
        case "ArrowDown":
        case " ": // Space key
          if (currentSlide < totalSlides) {
            onNext()
          }
          break
        case "Home":
          // Navigate to first slide
          if (currentSlide !== 1) {
            window.location.href = "/1"
          }
          break
        case "End":
          // Navigate to last slide
          if (currentSlide !== totalSlides) {
            window.location.href = `/${totalSlides}`
          }
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentSlide, totalSlides, onPrevious, onNext])
}

