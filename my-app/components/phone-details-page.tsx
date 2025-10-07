"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Star,
  ChevronDown,
  ChevronUp,
  Share2,
  Heart,
  Compass as Compare,
  Info,
  Camera,
  Battery,
  Cpu,
  Smartphone,
  Palette,
  Wifi,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommentsSection } from "@/components/comments-section"

interface PhoneData {
  id: string
  name: string
  brand: string
  price: string
  rating: number
  reviewCount: number
  images: string[]
  summary: string
  pros: string[]
  cons: string[]
  verdict: string
  specifications: {
    display: Record<string, string>
    performance: Record<string, string>
    camera: Record<string, string>
    battery: Record<string, string>
    connectivity: Record<string, string>
    design: Record<string, string>
  }
}

interface PhoneDetailsPageProps {
  phone: PhoneData
}

const technicalTerms: Record<string, string> = {
  "Dynamic AMOLED": "Advanced display technology offering vibrant colors, deep blacks, and energy efficiency",
  "Snapdragon 8 Gen 3": "Qualcomm's flagship mobile processor with advanced AI capabilities and 5G connectivity",
  LPDDR5X: "Latest generation of mobile RAM offering faster speeds and lower power consumption",
  "UFS 4.0": "Ultra-fast storage technology for quicker app loading and file transfers",
  OIS: "Optical Image Stabilization - reduces camera shake for sharper photos and videos",
  nits: "Unit of measurement for display brightness - higher nits mean better visibility in sunlight",
  IP68: "Water and dust resistance rating - can withstand submersion up to 1.5m for 30 minutes",
  "Wi-Fi 7": "Latest wireless standard offering faster speeds and better connectivity",
}

export function PhoneDetailsPage({ phone }: PhoneDetailsPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"simple" | "expert">("simple")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    display: true,
    performance: true,
    camera: true,
    battery: true,
    connectivity: false,
    design: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const TechnicalTerm = ({ term, children }: { term: string; children: React.ReactNode }) => {
    const definition = technicalTerms[term]

    if (!definition) return <>{children}</>

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="underline decoration-dotted cursor-help">{children}</span>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{definition}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const SpecificationRow = ({
    label,
    value,
    technical = false,
  }: { label: string; value: string; technical?: boolean }) => {
    if (viewMode === "simple" && technical) return null

    return (
      <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
        <span className="text-muted-foreground text-sm">{label}</span>
        <span className="font-medium text-sm">
          {technical ? <TechnicalTerm term={value}>{value}</TechnicalTerm> : value}
        </span>
      </div>
    )
  }

  const sectionIcons = {
    display: Smartphone,
    performance: Cpu,
    camera: Camera,
    battery: Battery,
    connectivity: Wifi,
    design: Palette,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-foreground">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/phones" className="hover:text-foreground">
            {phone.brand}
          </a>
          <span className="mx-2">/</span>
          <span className="text-foreground">{phone.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Main Image */}
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
                  <img
                    src={phone.images[currentImageIndex] || "/placeholder.svg"}
                    alt={phone.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Thumbnails */}
                <div className="flex gap-2 mb-6">
                  {phone.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? "border-primary" : "border-border"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${phone.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Compare className="mr-2 h-4 w-4" />
                    Add to Compare
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Heart className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{phone.brand}</Badge>
                <Badge variant="outline">Flagship</Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">{phone.name}</h1>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary">{phone.price}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{phone.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({phone.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">View:</span>
                  <Button
                    variant={viewMode === "simple" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("simple")}
                  >
                    Simple
                  </Button>
                  <Button
                    variant={viewMode === "expert" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("expert")}
                  >
                    Expert
                  </Button>
                </div>
              </div>
            </div>

            {/* Review Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Review Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{phone.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros</h4>
                    <ul className="space-y-1">
                      {phone.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-600 mt-1">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons</h4>
                    <ul className="space-y-1">
                      {phone.cons.map((con, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-red-600 mt-1">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Our Verdict</h4>
                  <p className="text-sm text-muted-foreground">{phone.verdict}</p>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {viewMode === "simple" ? "Essential specs for everyday users" : "Complete technical specifications"}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(phone.specifications).map(([category, specs]) => {
                  const IconComponent = sectionIcons[category as keyof typeof sectionIcons]
                  const isExpanded = expandedSections[category]

                  return (
                    <div key={category} className="border rounded-lg">
                      <button
                        onClick={() => toggleSection(category)}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <span className="font-semibold capitalize">{category}</span>
                        </div>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-2">
                          {Object.entries(specs).map(([key, value]) => {
                            const isAdvanced =
                              viewMode === "simple" &&
                              ["gpu", "expandable", "reverseCharging", "usb", "materials"].includes(key)

                            return (
                              <SpecificationRow
                                key={key}
                                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                                value={value}
                                technical={Object.keys(technicalTerms).some((term) => value.includes(term))}
                              />
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Related Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" size="lg" className="h-auto p-4 bg-transparent">
                <div className="text-left">
                  <div className="font-semibold">Compare with Similar</div>
                  <div className="text-sm text-muted-foreground">See how it stacks up</div>
                </div>
              </Button>
              <Button variant="outline" size="lg" className="h-auto p-4 bg-transparent">
                <div className="text-left">
                  <div className="font-semibold">Full Review</div>
                  <div className="text-sm text-muted-foreground">Read our detailed analysis</div>
                </div>
              </Button>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <CommentsSection />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
