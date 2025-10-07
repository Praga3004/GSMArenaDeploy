import { PhoneComparisonPage } from "@/components/phone-comparison-page"

// Mock data for comparison
const comparisonData = {
  phones: [
    {
      id: "samsung-galaxy-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: "$1,199",
      rating: 4.8,
      image: "/samsung-galaxy-s24-ultra.png",
      specifications: {
        display: {
          size: "6.8 inches",
          resolution: "3120 x 1440 pixels",
          technology: "Dynamic AMOLED 2X",
          refreshRate: "120Hz adaptive",
          brightness: "2600 nits",
          protection: "Gorilla Glass Victus 3",
        },
        performance: {
          processor: "Snapdragon 8 Gen 3",
          gpu: "Adreno 750",
          ram: "12GB LPDDR5X",
          storage: "256GB/512GB/1TB UFS 4.0",
          antutu: "1,680,000",
        },
        camera: {
          main: "200MP f/1.7 OIS",
          ultrawide: "12MP f/2.2 120°",
          telephoto: "10MP + 50MP (3x + 5x)",
          front: "12MP f/2.2",
          video: "8K@30fps",
        },
        battery: {
          capacity: "5000mAh",
          charging: "45W wired",
          wireless: "15W wireless",
          batteryLife: "28 hours",
        },
        connectivity: {
          network: "5G",
          wifi: "Wi-Fi 7",
          bluetooth: "5.3",
          nfc: "Yes",
          usb: "USB-C 3.2",
        },
        design: {
          dimensions: "162.3 x 79.0 x 8.6 mm",
          weight: "232g",
          materials: "Titanium + Glass",
          waterResistance: "IP68",
          colors: "4 options",
        },
      },
    },
    {
      id: "iphone-15-pro-max",
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: "$1,099",
      rating: 4.9,
      image: "/iphone-15-pro-max.png",
      specifications: {
        display: {
          size: "6.7 inches",
          resolution: "2796 x 1290 pixels",
          technology: "Super Retina XDR OLED",
          refreshRate: "120Hz adaptive",
          brightness: "2000 nits",
          protection: "Ceramic Shield",
        },
        performance: {
          processor: "A17 Pro",
          gpu: "6-core GPU",
          ram: "8GB LPDDR5",
          storage: "256GB/512GB/1TB NVMe",
          antutu: "1,641,883",
        },
        camera: {
          main: "48MP f/1.78 OIS",
          ultrawide: "12MP f/2.2 120°",
          telephoto: "12MP f/2.8 (3x)",
          front: "12MP f/1.9",
          video: "4K@60fps ProRes",
        },
        battery: {
          capacity: "4441mAh",
          charging: "27W wired",
          wireless: "15W MagSafe",
          batteryLife: "29 hours",
        },
        connectivity: {
          network: "5G",
          wifi: "Wi-Fi 6E",
          bluetooth: "5.3",
          nfc: "Yes",
          usb: "USB-C 3.0",
        },
        design: {
          dimensions: "159.9 x 76.7 x 8.25 mm",
          weight: "221g",
          materials: "Titanium + Glass",
          waterResistance: "IP68",
          colors: "4 options",
        },
      },
    },
    {
      id: "google-pixel-8-pro",
      name: "Google Pixel 8 Pro",
      brand: "Google",
      price: "$999",
      rating: 4.7,
      image: "/google-pixel-8-pro.png",
      specifications: {
        display: {
          size: "6.7 inches",
          resolution: "2992 x 1344 pixels",
          technology: "LTPO OLED",
          refreshRate: "120Hz adaptive",
          brightness: "2400 nits",
          protection: "Gorilla Glass Victus 2",
        },
        performance: {
          processor: "Google Tensor G3",
          gpu: "Immortalis-G715s MC10",
          ram: "12GB LPDDR5X",
          storage: "128GB/256GB/512GB UFS 3.1",
          antutu: "1,118,956",
        },
        camera: {
          main: "50MP f/1.68 OIS",
          ultrawide: "48MP f/1.95 125.8°",
          telephoto: "48MP f/2.8 (5x)",
          front: "10.5MP f/2.2",
          video: "4K@60fps",
        },
        battery: {
          capacity: "5050mAh",
          charging: "30W wired",
          wireless: "23W wireless",
          batteryLife: "24 hours",
        },
        connectivity: {
          network: "5G",
          wifi: "Wi-Fi 7",
          bluetooth: "5.3",
          nfc: "Yes",
          usb: "USB-C 3.2",
        },
        design: {
          dimensions: "162.6 x 76.5 x 8.8 mm",
          weight: "213g",
          materials: "Aluminum + Glass",
          waterResistance: "IP68",
          colors: "3 options",
        },
      },
    },
  ],
}

export default function ComparePage() {
  return <PhoneComparisonPage initialData={comparisonData} />
}
