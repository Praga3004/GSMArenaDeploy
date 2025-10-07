import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewsSection } from "@/components/news-section"
import { LatestPhonesSection } from "@/components/latest-phones-section"
import { ReviewsSection } from "@/components/reviews-section"
import { TopBrandsSection } from "@/components/top-brands-section"
import { Footer } from "@/components/footer"
import { SkipToContent } from "@/components/skip-to-content"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      <Header />
      <main id="main-content">
        <HeroSection />
        <div className="container mx-auto px-4 py-8 space-y-12">
          <NewsSection />
          <LatestPhonesSection />
          <ReviewsSection />
          <TopBrandsSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
