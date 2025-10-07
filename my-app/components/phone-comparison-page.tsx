"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Star,
  Search,
  Smartphone,
  Cpu,
  Camera,
  Battery,
  Wifi,
  Palette,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Phone {
  id: string
  name: string
  brand: string
  price: string
  rating: number
  image: string
  specifications: Record<string, Record<string, string>>
}

interface ComparisonData {
  phones: Phone[]
}

interface PhoneComparisonPageProps {
  initialData: ComparisonData
}

const categoryIcons = {
  display: Smartphone,
  performance: Cpu,
  camera: Camera,
  battery: Battery,
  connectivity: Wifi,
  design: Palette,
}

const categoryOrder = ["display", "performance", "camera", "battery", "connectivity", "design"]

export function PhoneComparisonPage({ initialData }: PhoneComparisonPageProps) {
  const [phones, setPhones] = useState<Phone[]>(initialData.phones)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    display: true,
    performance: true,
    camera: true,
    battery: true,
    connectivity: false,
    design: false,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddPhone, setShowAddPhone] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [phones])

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const removePhone = (phoneId: string) => {
    setPhones((prev) => prev.filter((phone) => phone.id !== phoneId))
  }

  const addPhone = () => {
    // In a real app, this would open a phone selector modal
    setShowAddPhone(true)
  }

  const getComparisonValue = (category: string, spec: string, phones: Phone[]) => {
    const values = phones
      .map((phone) => {
        const value = phone.specifications[category]?.[spec]
        if (!value) return null

        // Extract numeric values for comparison
        const numericMatch = value.match(/(\d+(?:\.\d+)?)/)
        return numericMatch ? Number.parseFloat(numericMatch[1]) : null
      })
      .filter((v) => v !== null)

    if (values.length === 0) return { best: [], worst: [] }

    const max = Math.max(...values)
    const min = Math.min(...values)

    // Determine if higher is better based on the spec type
    const higherIsBetter = [
      "size",
      "resolution",
      "refreshRate",
      "brightness",
      "ram",
      "storage",
      "antutu",
      "main",
      "capacity",
      "charging",
      "wireless",
      "batteryLife",
    ].some((key) => spec.toLowerCase().includes(key.toLowerCase()))

    const bestValue = higherIsBetter ? max : min
    const worstValue = higherIsBetter ? min : max

    const bestIndices: number[] = []
    const worstIndices: number[] = []

    phones.forEach((phone, index) => {
      const value = phone.specifications[category]?.[spec]
      if (!value) return

      const numericMatch = value.match(/(\d+(?:\.\d+)?)/)
      const numericValue = numericMatch ? Number.parseFloat(numericMatch[1]) : null

      if (numericValue === bestValue) bestIndices.push(index)
      if (numericValue === worstValue && bestValue !== worstValue) worstIndices.push(index)
    })

    return { best: bestIndices, worst: worstIndices }
  }

  const getCellClassName = (category: string, spec: string, phoneIndex: number) => {
    const { best, worst } = getComparisonValue(category, spec, phones)

    if (best.includes(phoneIndex)) {
      return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
    }
    if (worst.includes(phoneIndex)) {
      return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
    }
    return ""
  }

  const getComparisonIcon = (category: string, spec: string, phoneIndex: number) => {
    const { best, worst } = getComparisonValue(category, spec, phones)

    if (best.includes(phoneIndex)) {
      return <TrendingUp className="h-3 w-3 text-green-600 ml-1" />
    }
    if (worst.includes(phoneIndex)) {
      return <TrendingDown className="h-3 w-3 text-red-600 ml-1" />
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Phone Comparison</h1>
          <p className="text-muted-foreground">
            Compare specifications side by side to find the perfect phone for your needs
          </p>
        </div>

        {/* Comparison Table */}
        <div className="relative">
          {/* Sticky Header */}
          <div ref={headerRef} className="sticky top-16 z-40 bg-background border-b shadow-sm">
            <div className="grid gap-4 p-4" style={{ gridTemplateColumns: `200px repeat(${phones.length}, 1fr) auto` }}>
              {/* Empty cell for spec labels */}
              <div className="flex items-center">
                <span className="font-semibold text-sm">Specifications</span>
              </div>

              {/* Phone Headers */}
              {phones.map((phone, index) => (
                <Card key={phone.id} className="relative">
                  <CardContent className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => removePhone(phone.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>

                    <div className="text-center">
                      <div className="w-16 h-20 mx-auto mb-3 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={phone.image || "/placeholder.svg"}
                          alt={phone.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Badge variant="secondary" className="mb-2">
                        {phone.brand}
                      </Badge>
                      <h3 className="font-semibold text-sm leading-tight mb-2">{phone.name}</h3>
                      <div className="text-lg font-bold text-primary mb-1">{phone.price}</div>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{phone.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Phone Button */}
              <div className="flex items-center">
                <Button
                  variant="outline"
                  onClick={addPhone}
                  className="h-full min-h-[200px] w-full border-dashed bg-transparent"
                >
                  <div className="text-center">
                    <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Add Phone</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Comparison Content */}
          <div className="space-y-6 mt-6">
            {categoryOrder.map((category) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons]
              const isExpanded = expandedCategories[category]
              const specs = phones[0]?.specifications[category] || {}

              return (
                <Card key={category}>
                  <CardHeader>
                    <button
                      onClick={() => toggleCategory(category)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <CardTitle className="capitalize">{category}</CardTitle>
                      </div>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent>
                      <div className="space-y-3">
                        {Object.keys(specs).map((spec) => (
                          <div
                            key={spec}
                            className="grid gap-4"
                            style={{ gridTemplateColumns: `200px repeat(${phones.length}, 1fr)` }}
                          >
                            {/* Spec Label */}
                            <div className="flex items-center py-3 px-4 bg-muted/30 rounded-lg">
                              <span className="text-sm font-medium capitalize">
                                {spec.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                            </div>

                            {/* Spec Values */}
                            {phones.map((phone, phoneIndex) => {
                              const value = phone.specifications[category]?.[spec] || "N/A"
                              const cellClassName = getCellClassName(category, spec, phoneIndex)
                              const comparisonIcon = getComparisonIcon(category, spec, phoneIndex)

                              return (
                                <div
                                  key={`${phone.id}-${spec}`}
                                  className={`flex items-center justify-center py-3 px-4 rounded-lg border ${cellClassName}`}
                                >
                                  <span className="text-sm font-medium text-center flex items-center">
                                    {value}
                                    {comparisonIcon}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button variant="outline" size="lg">
              <Search className="mr-2 h-4 w-4" />
              Find Similar Phones
            </Button>
            <Button variant="outline" size="lg">
              Export Comparison
            </Button>
            <Button variant="outline" size="lg">
              Share Comparison
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
