"use client"

import { useState } from "react"
import { Search, Menu, X, Moon, Sun, Settings, Type, Contrast, Accessibility } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAccessibility } from "@/hooks/use-accessibility"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()
  const { fontSize, setFontSize, highContrast, setHighContrast, reducedMotion, setReducedMotion } = useAccessibility()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Phone Finder", href: "/finder" },
    { name: "Compare", href: "/compare" },
    { name: "Reviews", href: "/reviews" },
    { name: "News", href: "/news" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
              <span className="text-primary">GSM</span>Arena
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1"
                role="menuitem"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search phones, brands, reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
                aria-label="Search phones, brands, and reviews"
              />
            </div>
          </div>

          {/* Theme Toggle & Settings */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Accessibility settings">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Accessibility className="h-4 w-4" />
                  Accessibility Settings
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Font Size */}
                <div className="p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <Label className="text-sm font-medium">Font Size</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                    <Slider
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                      max={1.5}
                      min={0.8}
                      step={0.1}
                      className="w-full"
                      aria-label="Adjust font size"
                    />
                    <div className="text-xs text-center text-muted-foreground">
                      Current: {Math.round(fontSize * 100)}%
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator />

                {/* High Contrast */}
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Contrast className="h-4 w-4" />
                      <Label htmlFor="high-contrast" className="text-sm font-medium">
                        High Contrast
                      </Label>
                    </div>
                    <Switch
                      id="high-contrast"
                      checked={highContrast}
                      onCheckedChange={setHighContrast}
                      aria-label="Toggle high contrast mode"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Increases contrast for better visibility</p>
                </div>

                <DropdownMenuSeparator />

                {/* Reduced Motion */}
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <Label htmlFor="reduced-motion" className="text-sm font-medium">
                        Reduce Motion
                      </Label>
                    </div>
                    <Switch
                      id="reduced-motion"
                      checked={reducedMotion}
                      onCheckedChange={setReducedMotion}
                      aria-label="Toggle reduced motion"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Minimizes animations and transitions</p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                  <Accessibility className="mr-2 h-4 w-4" />
                  Keyboard Shortcuts
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4" role="menu">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
