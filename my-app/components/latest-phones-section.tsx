"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Star, ArrowRight, Smartphone } from "lucide-react"

const latestPhones = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: "$1,199",
    rating: 4.8,
    image: "/samsung-galaxy-s24-ultra.png",
    specs: ["200MP Camera", "8GB RAM", "256GB Storage", "5000mAh Battery"],
    isNew: true,
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: "$1,099",
    rating: 4.9,
    image: "/iphone-15-pro-max.png",
    specs: ["48MP Camera", "8GB RAM", "256GB Storage", "4441mAh Battery"],
    isNew: true,
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: "$999",
    rating: 4.7,
    image: "/google-pixel-8-pro.png",
    specs: ["50MP Camera", "12GB RAM", "128GB Storage", "5050mAh Battery"],
    isNew: false,
  },
  {
    id: 4,
    name: "OnePlus 12",
    brand: "OnePlus",
    price: "$799",
    rating: 4.6,
    image: "/oneplus-12-product-shot.png",
    specs: ["50MP Camera", "16GB RAM", "256GB Storage", "5400mAh Battery"],
    isNew: true,
  },
]

export function LatestPhonesSection() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Latest Phones</h2>
        <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-2">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPhones.map((phone) => (
            <Card key={phone.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
                  <img
                    src={phone.image || "/placeholder.svg"}
                    alt={phone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {phone.isNew && (
                    <Badge className="absolute top-2 left-2 bg-tech-accent text-tech-accent-foreground">New</Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">{phone.brand}</div>
                  <CardTitle className="text-lg leading-tight group-hover:text-tech-accent transition-colors">
                    {phone.name}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-tech-accent">{phone.price}</div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{phone.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  {phone.specs.slice(0, 3).map((spec, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-center">
                      <Smartphone className="h-3 w-3 mr-2" />
                      {spec}
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Details
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center">
        <Button variant="outline" size="lg">
          Browse All Phones
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
