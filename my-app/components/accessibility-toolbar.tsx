"use client"

import { Button } from "@/components/ui/button"
import { useAccessibility } from "@/hooks/use-accessibility"
import { Type, Minus, Plus, Eye, EyeOff } from "lucide-react"

export function AccessibilityToolbar() {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
  } = useAccessibility()

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background border rounded-lg p-2 shadow-lg">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={decreaseFontSize}
          aria-label="Decrease font size"
          disabled={fontSize <= 12}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={resetFontSize} aria-label="Reset font size">
          <Type className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={increaseFontSize}
          aria-label="Increase font size"
          disabled={fontSize >= 24}
        >
          <Plus className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleHighContrast}
          aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
        >
          {highContrast ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
