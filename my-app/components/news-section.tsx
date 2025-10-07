"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const newsItems = [
  {
    id: 1,
    title: "Samsung Galaxy S25 Ultra leaked specifications reveal major camera upgrades",
    excerpt:
      "Latest leaks suggest the upcoming flagship will feature a 200MP main sensor with improved low-light performance.",
    category: "Leaks",
    time: "2 hours ago",
    image: "/samsung-galaxy-s25-ultra-mockup.jpg",
  },
  {
    id: 2,
    title: "Apple iPhone 16 Pro Max review: The ultimate smartphone experience",
    excerpt:
      "Our comprehensive review covers performance, camera quality, battery life, and everything you need to know.",
    category: "Reviews",
    time: "5 hours ago",
    image: "/iphone-16-pro-max-review.jpg",
  },
  {
    id: 3,
    title: "Google Pixel 9 Pro receives major camera update with new AI features",
    excerpt: "The latest software update brings enhanced computational photography and new AI-powered editing tools.",
    category: "Updates",
    time: "1 day ago",
    image: "/google-pixel-9-pro-camera.jpg",
  },
]

export function NewsSection() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Latest News</h2>
        <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-2">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.time}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-tech-accent transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                  Read more <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center">
        <Button variant="outline" size="lg">
          View All News
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
