import { Smartphone, Mail, Twitter, Facebook, Instagram, Youtube } from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "Phones",
      links: ["Latest Phones", "Phone Finder", "Compare Phones", "Top Rated", "Budget Phones"],
    },
    {
      title: "Reviews",
      links: ["Latest Reviews", "Expert Reviews", "User Reviews", "Video Reviews", "Buying Guides"],
    },
    {
      title: "News",
      links: ["Latest News", "Rumors", "Launches", "Updates", "Industry News"],
    },
    {
      title: "Tools",
      links: ["Phone Finder", "Compare Tool", "Size Comparison", "Battery Test", "Camera Test"],
    },
    {
      title: "About",
      links: ["About Us", "Contact", "Privacy Policy", "Terms of Service", "Advertise"],
    },
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="h-6 w-6 text-tech-accent" />
              <div className="text-xl font-bold">
                <span className="text-tech-accent">GSM</span>Arena
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted source for mobile phone reviews, specifications, and comparisons since 2000.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-tech-accent cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-tech-accent cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-tech-accent cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-tech-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 GSMArena. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">contact@gsmarena.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
