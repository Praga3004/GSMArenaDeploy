"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

const brands = [
  { name: "Apple", logo: "/apple-logo.png", phoneCount: 45 },
  { name: "Samsung", logo: "/samsung-logo.png", phoneCount: 120 },
  { name: "Google", logo: "/google-logo.png", phoneCount: 25 },
  { name: "OnePlus", logo: "/oneplus-logo.jpg", phoneCount: 35 },
  { name: "Xiaomi", logo: "/xiaomi-logo.png", phoneCount: 85 },
  { name: "Huawei", logo: "/huawei-logo.png", phoneCount: 65 },
  { name: "Sony", logo: "/sony-logo.png", phoneCount: 20 },
  { name: "Oppo", logo: "/oppo-logo.jpg", phoneCount: 55 },
  { name: "Vivo", logo: "/vivo-logo.jpg", phoneCount: 45 },
  { name: "Realme", logo: "/realme-logo.jpg", phoneCount: 40 },
  { name: "Nothing", logo: "/nothing-logo.jpg", phoneCount: 8 },
  { name: "Motorola", logo: "/motorola-logo.png", phoneCount: 30 },
]

export function TopBrandsSection() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBrands = brands.filter((brand) => brand.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Browse by Brand</h2>
        <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-2">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Search Brands */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Brand Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredBrands.map((brand) => (
              <Card key={brand.name} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-tech-accent transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{brand.phoneCount} phones</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBrands.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No brands found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
