"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Search, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background via-muted/30 to-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Discover the Perfect <span className="text-tech-accent">Smartphone</span> for You
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Comprehensive reviews, detailed specifications, and expert comparisons to help you make the right choice
            from thousands of mobile devices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8">
              <Search className="mr-2 h-5 w-5" />
              Find Your Phone
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <TrendingUp className="mr-2 h-5 w-5" />
              Latest Reviews
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-accent mb-2">25,000+</div>
              <div className="text-sm text-muted-foreground">Phone Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-accent mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Brands Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-accent mb-2">10M+</div>
              <div className="text-sm text-muted-foreground">Monthly Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
