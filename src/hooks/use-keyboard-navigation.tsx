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

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault()
          if (currentSlide > 1) {
            onPrevious()
          }
          break
        case "ArrowRight":
        case "ArrowDown":
        case " ": // Space key
          e.preventDefault()
          if (currentSlide < totalSlides) {
            onNext()
          }
          break
        case "Home":
          e.preventDefault()
          // Navigate to first slide
          if (currentSlide !== 1) {
            window.location.href = "/1"
          }
          break
        case "End":
          e.preventDefault()
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

