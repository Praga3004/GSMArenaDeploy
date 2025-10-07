import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AccessibilityProvider } from "@/hooks/use-accessibility"
import { AccessibilityToolbar } from "@/components/accessibility-toolbar"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { SkipToContent } from "@/components/skip-to-content"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "GSMArena - Mobile Phone Reviews and Specifications",
  description:
    "Comprehensive mobile phone database with detailed reviews, specifications, and comparisons. Find the perfect smartphone for your needs.",
  keywords: "mobile phones, smartphone reviews, phone specifications, phone comparison, GSMArena",
  authors: [{ name: "GSMArena Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AccessibilityProvider>
            <SkipToContent />
            {children}
            <AccessibilityToolbar />
            <PerformanceMonitor />
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
