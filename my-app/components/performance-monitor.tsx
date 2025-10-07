"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage?: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)

  useEffect(() => {
    // Measure page load performance
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart
      const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart

      // Memory usage (if available)
      const memoryUsage = (performance as any).memory?.usedJSHeapSize

      setMetrics({
        loadTime,
        renderTime,
        memoryUsage,
      })
    }

    // Wait for page to fully load
    if (document.readyState === "complete") {
      measurePerformance()
    } else {
      window.addEventListener("load", measurePerformance)
      return () => window.removeEventListener("load", measurePerformance)
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development" || !metrics) {
    return null
  }

  return (
    <div className="fixed top-4 left-4 z-50 bg-background border rounded-lg p-2 text-xs opacity-50 hover:opacity-100 transition-opacity">
      <div>Load: {metrics.loadTime.toFixed(2)}ms</div>
      <div>Render: {metrics.renderTime.toFixed(2)}ms</div>
      {metrics.memoryUsage && <div>Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB</div>}
    </div>
  )
}
