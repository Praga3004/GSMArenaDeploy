"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Star,
  Smartphone,
  Camera,
  Battery,
  Cpu,
  Grid3X3,
  List,
  ArrowUpDown,
  Info,
  RefreshCw,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Phone {
  id: string
  name: string
  brand: string
  price: number
  priceRange: string
  rating: number
  image: string
  releaseDate: string
  specs: {
    displaySize: number
    ram: number
    storage: number
    cameraMP: number
    batteryCapacity: number
    processor: string
    os: string
    network: string
    waterResistance: string
    weight: number
  }
  features: string[]
}

interface PhoneFinderPageProps {
  phoneDatabase: Phone[]
}

const filterTooltips = {
  brand: "Choose from popular smartphone manufacturers",
  priceRange: "Select phones within your budget range",
  displaySize: "Screen size measured diagonally in inches",
  ram: "Random Access Memory - affects multitasking performance",
  storage: "Internal storage capacity for apps, photos, and files",
  cameraMP: "Main camera resolution in megapixels",
  batteryCapacity: "Battery capacity in mAh - higher means longer battery life",
  os: "Operating system - Android or iOS",
  network: "Cellular network compatibility",
  waterResistance: "Protection against water and dust ingress",
}

export function PhoneFinderPage({ phoneDatabase }: PhoneFinderPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("rating")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [displaySizeRange, setDisplaySizeRange] = useState([5.0, 7.0])
  const [ramRange, setRamRange] = useState([4, 24])
  const [storageRange, setStorageRange] = useState([64, 1024])
  const [cameraRange, setCameraRange] = useState([12, 200])
  const [batteryRange, setBatteryRange] = useState([3000, 6000])
  const [selectedOS, setSelectedOS] = useState<string[]>([])
  const [selectedNetwork, setSelectedNetwork] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Get unique values for filters
  const brands = useMemo(() => [...new Set(phoneDatabase.map((phone) => phone.brand))], [phoneDatabase])
  const priceRanges = useMemo(() => [...new Set(phoneDatabase.map((phone) => phone.priceRange))], [phoneDatabase])
  const operatingSystems = useMemo(() => [...new Set(phoneDatabase.map((phone) => phone.specs.os))], [phoneDatabase])
  const networks = useMemo(() => [...new Set(phoneDatabase.map((phone) => phone.specs.network))], [phoneDatabase])
  const allFeatures = useMemo(() => {
    const features = new Set<string>()
    phoneDatabase.forEach((phone) => phone.features.forEach((feature) => features.add(feature)))
    return Array.from(features)
  }, [phoneDatabase])

  // Filter and sort phones
  const filteredPhones = useMemo(() => {
    const filtered = phoneDatabase.filter((phone) => {
      // Search query
      if (
        searchQuery &&
        !phone.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !phone.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(phone.brand)) {
        return false
      }

      // Price range filter
      if (selectedPriceRanges.length > 0 && !selectedPriceRanges.includes(phone.priceRange)) {
        return false
      }

      // Price slider
      if (phone.price < priceRange[0] || phone.price > priceRange[1]) {
        return false
      }

      // Display size
      if (phone.specs.displaySize < displaySizeRange[0] || phone.specs.displaySize > displaySizeRange[1]) {
        return false
      }

      // RAM
      if (phone.specs.ram < ramRange[0] || phone.specs.ram > ramRange[1]) {
        return false
      }

      // Storage
      if (phone.specs.storage < storageRange[0] || phone.specs.storage > storageRange[1]) {
        return false
      }

      // Camera
      if (phone.specs.cameraMP < cameraRange[0] || phone.specs.cameraMP > cameraRange[1]) {
        return false
      }

      // Battery
      if (phone.specs.batteryCapacity < batteryRange[0] || phone.specs.batteryCapacity > batteryRange[1]) {
        return false
      }

      // OS
      if (selectedOS.length > 0 && !selectedOS.includes(phone.specs.os)) {
        return false
      }

      // Network
      if (selectedNetwork.length > 0 && !selectedNetwork.includes(phone.specs.network)) {
        return false
      }

      // Features
      if (selectedFeatures.length > 0 && !selectedFeatures.some((feature) => phone.features.includes(feature))) {
        return false
      }

      return true
    })

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "price":
          aValue = a.price
          bValue = b.price
          break
        case "rating":
          aValue = a.rating
          bValue = b.rating
          break
        case "name":
          aValue = a.name
          bValue = b.name
          break
        case "releaseDate":
          aValue = new Date(a.releaseDate)
          bValue = new Date(b.releaseDate)
          break
        default:
          return 0
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [
    phoneDatabase,
    searchQuery,
    selectedBrands,
    selectedPriceRanges,
    priceRange,
    displaySizeRange,
    ramRange,
    storageRange,
    cameraRange,
    batteryRange,
    selectedOS,
    selectedNetwork,
    selectedFeatures,
    sortBy,
    sortOrder,
  ])

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedBrands([])
    setSelectedPriceRanges([])
    setPriceRange([0, 1500])
    setDisplaySizeRange([5.0, 7.0])
    setRamRange([4, 24])
    setStorageRange([64, 1024])
    setCameraRange([12, 200])
    setBatteryRange([3000, 6000])
    setSelectedOS([])
    setSelectedNetwork([])
    setSelectedFeatures([])
  }

  const FilterTooltip = ({ content, children }: { content: string; children: React.ReactNode }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            {children}
            <Info className="h-3 w-3 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Phone Finder</h1>
          <p className="text-muted-foreground">Find your perfect smartphone using our advanced filtering system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search phones..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Separator />

                {/* Brand */}
                <div>
                  <FilterTooltip content={filterTooltips.brand}>
                    <Label className="text-sm font-medium mb-3 block">Brand</Label>
                  </FilterTooltip>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBrands([...selectedBrands, brand])
                            } else {
                              setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                            }
                          }}
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <FilterTooltip content={filterTooltips.priceRange}>
                    <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                  </FilterTooltip>
                  <div className="space-y-2 mb-4">
                    {priceRanges.map((range) => (
                      <div key={range} className="flex items-center space-x-2">
                        <Checkbox
                          id={`price-${range}`}
                          checked={selectedPriceRanges.includes(range)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPriceRanges([...selectedPriceRanges, range])
                            } else {
                              setSelectedPriceRanges(selectedPriceRanges.filter((p) => p !== range))
                            }
                          }}
                        />
                        <Label htmlFor={`price-${range}`} className="text-sm capitalize">
                          {range}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1500}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                  </div>
                </div>

                <Separator />

                {/* Display Size */}
                <div>
                  <FilterTooltip content={filterTooltips.displaySize}>
                    <Label className="text-sm font-medium mb-3 block">Display Size</Label>
                  </FilterTooltip>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{displaySizeRange[0]}"</span>
                      <span>{displaySizeRange[1]}"</span>
                    </div>
                    <Slider
                      value={displaySizeRange}
                      onValueChange={setDisplaySizeRange}
                      max={7.0}
                      min={5.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                <Separator />

                {/* RAM */}
                <div>
                  <FilterTooltip content={filterTooltips.ram}>
                    <Label className="text-sm font-medium mb-3 block">RAM</Label>
                  </FilterTooltip>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{ramRange[0]}GB</span>
                      <span>{ramRange[1]}GB</span>
                    </div>
                    <Slider value={ramRange} onValueChange={setRamRange} max={24} min={4} step={2} className="w-full" />
                  </div>
                </div>

                <Separator />

                {/* Storage */}
                <div>
                  <FilterTooltip content={filterTooltips.storage}>
                    <Label className="text-sm font-medium mb-3 block">Storage</Label>
                  </FilterTooltip>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{storageRange[0]}GB</span>
                      <span>{storageRange[1]}GB</span>
                    </div>
                    <Slider
                      value={storageRange}
                      onValueChange={setStorageRange}
                      max={1024}
                      min={64}
                      step={64}
                      className="w-full"
                    />
                  </div>
                </div>

                <Separator />

                {/* Operating System */}
                <div>
                  <FilterTooltip content={filterTooltips.os}>
                    <Label className="text-sm font-medium mb-3 block">Operating System</Label>
                  </FilterTooltip>
                  <div className="space-y-2">
                    {operatingSystems.map((os) => (
                      <div key={os} className="flex items-center space-x-2">
                        <Checkbox
                          id={`os-${os}`}
                          checked={selectedOS.includes(os)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedOS([...selectedOS, os])
                            } else {
                              setSelectedOS(selectedOS.filter((o) => o !== os))
                            }
                          }}
                        />
                        <Label htmlFor={`os-${os}`} className="text-sm">
                          {os}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="text-sm text-muted-foreground">{filteredPhones.length} phones found</div>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="releaseDate">Release Date</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  <ArrowUpDown className="h-4 w-4" />
                </Button>

                {/* View Mode */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Grid/List */}
            {filteredPhones.length === 0 ? (
              <Card className="p-12 text-center">
                <Smartphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No phones found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={clearAllFilters}>Clear All Filters</Button>
              </Card>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredPhones.map((phone) => (
                  <Card key={phone.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    {viewMode === "grid" ? (
                      <>
                        <div className="aspect-[3/4] overflow-hidden rounded-t-lg bg-muted p-4">
                          <img
                            src={phone.image || "/placeholder.svg"}
                            alt={phone.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-2">
                            {phone.brand}
                          </Badge>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {phone.name}
                          </h3>
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-xl font-bold text-primary">${phone.price}</div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{phone.rating}</span>
                            </div>
                          </div>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-3 w-3" />
                              {phone.specs.displaySize}" display
                            </div>
                            <div className="flex items-center gap-2">
                              <Camera className="h-3 w-3" />
                              {phone.specs.cameraMP}MP camera
                            </div>
                            <div className="flex items-center gap-2">
                              <Battery className="h-3 w-3" />
                              {phone.specs.batteryCapacity}mAh
                            </div>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                            <img
                              src={phone.image || "/placeholder.svg"}
                              alt={phone.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <Badge variant="secondary" className="mb-1">
                                  {phone.brand}
                                </Badge>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                  {phone.name}
                                </h3>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-primary">${phone.price}</div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{phone.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Smartphone className="h-3 w-3" />
                                {phone.specs.displaySize}"
                              </div>
                              <div className="flex items-center gap-1">
                                <Cpu className="h-3 w-3" />
                                {phone.specs.ram}GB RAM
                              </div>
                              <div className="flex items-center gap-1">
                                <Camera className="h-3 w-3" />
                                {phone.specs.cameraMP}MP
                              </div>
                              <div className="flex items-center gap-1">
                                <Battery className="h-3 w-3" />
                                {phone.specs.batteryCapacity}mAh
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
