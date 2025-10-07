"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface AccessibilityContextType {
  fontSize: number
  setFontSize: (size: number) => void
  highContrast: boolean
  setHighContrast: (enabled: boolean) => void
  reducedMotion: boolean
  setReducedMotion: (enabled: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState(1)
  const [highContrast, setHighContrastState] = useState(false)
  const [reducedMotion, setReducedMotionState] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem("accessibility-font-size")
    const savedHighContrast = localStorage.getItem("accessibility-high-contrast")
    const savedReducedMotion = localStorage.getItem("accessibility-reduced-motion")

    if (savedFontSize) {
      setFontSizeState(Number.parseFloat(savedFontSize))
    }
    if (savedHighContrast) {
      setHighContrastState(savedHighContrast === "true")
    }
    if (savedReducedMotion) {
      setReducedMotionState(savedReducedMotion === "true")
    }

    // Check for system preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches && !savedReducedMotion) {
      setReducedMotionState(true)
    }
  }, [])

  // Apply font size to document
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}rem`
  }, [fontSize])

  // Apply high contrast class
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  // Apply reduced motion class
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add("reduced-motion")
    } else {
      document.documentElement.classList.remove("reduced-motion")
    }
  }, [reducedMotion])

  const setFontSize = (size: number) => {
    setFontSizeState(size)
    localStorage.setItem("accessibility-font-size", size.toString())
  }

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled)
    localStorage.setItem("accessibility-high-contrast", enabled.toString())
  }

  const setReducedMotion = (enabled: boolean) => {
    setReducedMotionState(enabled)
    localStorage.setItem("accessibility-reduced-motion", enabled.toString())
  }

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        reducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
