"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Star, ArrowRight, User } from "lucide-react"

const reviews = [
  {
    id: 1,
    title: "iPhone 15 Pro Max: The Ultimate Photography Powerhouse",
    excerpt:
      "Apple's latest flagship delivers exceptional camera performance with the new 48MP main sensor and improved computational photography.",
    rating: 4.8,
    author: "Sarah Chen",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    image: "/iphone-15-pro-max-camera-review.jpg",
    category: "In-depth Review",
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra vs iPhone 15 Pro Max: The Ultimate Showdown",
    excerpt:
      "We compare the two flagship titans across performance, camera quality, battery life, and overall user experience.",
    rating: 4.7,
    author: "Mike Rodriguez",
    date: "Dec 12, 2024",
    readTime: "12 min read",
    image: "/galaxy-s24-ultra-vs-iphone-comparison.jpg",
    category: "Comparison",
  },
  {
    id: 3,
    title: "Google Pixel 8 Pro: AI Photography at Its Finest",
    excerpt:
      "Google's computational photography continues to impress with new AI features and improved low-light performance.",
    rating: 4.6,
    author: "Emma Thompson",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    image: "/google-pixel-8-pro-ai-camera.jpg",
    category: "Review",
  },
]

export function ReviewsSection() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Expert Reviews</h2>
        <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-2">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={review.image || "/placeholder.svg"}
                  alt={review.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{review.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{review.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-tech-accent transition-colors">
                  {review.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{review.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span>{review.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{review.date}</span>
                    <span>{review.readTime}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                  Read Review <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center">
        <Button variant="outline" size="lg">
          View All Reviews
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
