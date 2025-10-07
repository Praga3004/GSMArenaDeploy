"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Accept exactly the same props as next-themes' ThemeProvider
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

/**
 * Tailwind + next-themes wrapper.
 * Use with: <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>...</ThemeProvider>
 *
 * Notes:
 * - Tailwind must have darkMode: "class" in tailwind.config.js
 * - Keep <html suppressHydrationWarning> to avoid mismatches on SSR
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}