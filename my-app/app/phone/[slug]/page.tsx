import { PhoneDetailsPage } from "@/components/phone-details-page"

// This would normally fetch data based on the slug
const phoneData = {
  id: "samsung-galaxy-s24-ultra",
  name: "Samsung Galaxy S24 Ultra",
  brand: "Samsung",
  price: "$1,199",
  rating: 4.8,
  reviewCount: 1247,
  images: ["/samsung-galaxy-s24-ultra.png", "/samsung-galaxy-s24-ultra-back.png", "/samsung-galaxy-s24-ultra-side.png"],
  summary:
    "The Galaxy S24 Ultra represents Samsung's pinnacle of smartphone engineering, featuring a stunning 6.8-inch Dynamic AMOLED display, powerful Snapdragon 8 Gen 3 processor, and an exceptional 200MP camera system with advanced AI photography features.",
  pros: [
    "Exceptional 200MP camera with AI enhancements",
    "Brilliant 6.8-inch Dynamic AMOLED display",
    "Premium build quality with titanium frame",
    "All-day battery life with fast charging",
    "S Pen integration for productivity",
  ],
  cons: ["Premium price point", "Large size may not suit all users", "No significant design changes from predecessor"],
  verdict:
    "The Samsung Galaxy S24 Ultra continues to set the standard for flagship Android phones, delivering exceptional performance, camera quality, and features that justify its premium positioning.",
  specifications: {
    display: {
      size: "6.8 inches",
      resolution: "3120 x 1440 pixels",
      technology: "Dynamic AMOLED 2X",
      refreshRate: "120Hz adaptive",
      brightness: "2600 nits peak",
      protection: "Corning Gorilla Glass Victus 3",
    },
    performance: {
      processor: "Snapdragon 8 Gen 3",
      gpu: "Adreno 750",
      ram: "12GB LPDDR5X",
      storage: "256GB/512GB/1TB UFS 4.0",
      expandable: "No",
    },
    camera: {
      main: "200MP f/1.7 OIS",
      ultrawide: "12MP f/2.2 120°",
      telephoto1: "10MP f/2.4 3x optical zoom",
      telephoto2: "50MP f/3.4 5x optical zoom",
      front: "12MP f/2.2",
      video: "8K@30fps, 4K@60fps",
    },
    battery: {
      capacity: "5000mAh",
      charging: "45W wired, 15W wireless",
      reverseCharging: "4.5W wireless",
      batteryLife: "Up to 28 hours video playback",
    },
    connectivity: {
      network: "5G, 4G LTE",
      wifi: "Wi-Fi 7 (802.11be)",
      bluetooth: "5.3",
      nfc: "Yes",
      usb: "USB-C 3.2",
    },
    design: {
      dimensions: "162.3 x 79.0 x 8.6 mm",
      weight: "232g",
      materials: "Titanium frame, Gorilla Glass Victus 3",
      colors: "Titanium Black, Titanium Gray, Titanium Violet, Titanium Yellow",
      waterResistance: "IP68",
    },
  },
}

export default function PhoneDetailPage({ params }: { params: { slug: string } }) {
  return <PhoneDetailsPage phone={phoneData} />
}
