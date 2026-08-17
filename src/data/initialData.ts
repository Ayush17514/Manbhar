import { Product, Category, Review, Order, User } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    name: "Rings",
    image: "/uploads/categories/rings.webp",
    description: "Solitaire, bridal & everyday statement rings crafted to perfection."
  },
  {
    name: "Necklaces",
    image: "/uploads/categories/necklace.jpe",
    description: "Intricately designed chokers, layered chains & regal necklaces."
  },
  {
    name: "Earrings",
    image: "/uploads/categories/earrings.jpe",
    description: "Studs, jhumkas, drops & hoops that capture brilliant light."
  },
  {
    name: "Bracelets",
    image: "/uploads/categories/braclet.jpe",
    description: "Refined tennis bracelets, cuffs & charm adornments."
  },
  {
    name: "Pendants",
    image: "/uploads/categories/pendant.jpe",
    description: "Delicate solitary motifs and custom symbolic treasures."
  },
  {
    name: "Gold Chains",
    image: "/uploads/categories/gold-chain.jpg",
    description: "Classic curb, rope & hallmarked gold chains in various karats."
  },
  {
    name: "Bangles",
    image: "/uploads/categories/bangle.jpe",
    description: "Traditional and contemporary gold & diamond studded bangles."
  },
  {
    name: "Kada",
    image: "/uploads/categories/kada.jpe",
    description: "Bold handcrafted ethnic and modern everyday kadas."
  },
  {
    name: "Gold Idol",
    image: "/uploads/categories/gold-idol.jpe",
    description: "Devotional masterpieces and spiritual divine artifacts."
  },
  {
    name: "Name Pendants",
    image: "/uploads/categories/customized.jpe",
    description: "Personalized custom-letter CAD crafted jewelry."
  },
  {
    name: "Rakhi Jewellery",
    image: "/uploads/categories/rakhi.jpe",
    description: "Precious gold and silver heirloom celebratory keepsakes."
  },
  {
    name: "Mangalsutras",
    image: "/uploads/categories/mangalsutra.jpe",
    description: "Sacred bond of eternal love sculpted in gold and diamonds."
  },
  {
    name: "Anklets",
    image: "/uploads/categories/anklet.webp",
    description: "Graceful 925 sterling silver and gold-plated payals."
  },
  {
    name: "Nose Pin",
    image: "/uploads/categories/nose-pin.jpe",
    description: "Petite diamond studs and traditional Indian nose rings."
  },
  {
    name: "Cufflinks",
    image: "/uploads/categories/cufflinks.jpe",
    description: "Sophisticated bespoke cufflinks for gentlemen."
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Princess Cut Aquamarine Zircon Engagement Ring",
    description: "Princess cut aquamarine gemstone ring encircled by shimmering micro-pave zircon crystals. Built in premium brass alloy with radiant 18K gold electro-plating finish. Designed for timeless bridal engagements and special celebrations.",
    price: 499.00,
    originalPrice: 899.00,
    stock: 18,
    images: [
      "/uploads/categories/rings.webp",
      "/uploads/products/1751630894_6867c42e8c64a.jpg",
      "/uploads/products/1751630894_6867c42e8c971.jpg"
    ],
    category: "Rings",
    tag: "Bestseller",
    size: "US 7 (17.3 mm)",
    dimensions: "12mm x 14mm Crown",
    material: "Brass / 18K Gold Plated",
    stones: "Aquamarine and Zircon",
    gross_weight: 4.20,
    metal_weight: 3.50,
    stone_weight: 0.70,
    additional_info: "Comes with luxury velvet presentation box and warranty certificate.",
    rating: 4.9,
    reviewCount: 42,
    created_at: "2025-09-20T12:52:14"
  },
  {
    id: 2,
    title: "Royal Emerald Heritage Choker Necklace",
    description: "A heritage masterpiece handcrafted by master Jaipur karigars. Features vibrant synthetic Colombian emerald centerpieces adorned with handset moissanite polki stones and cultured pearl tassels.",
    price: 3499.00,
    originalPrice: 4999.00,
    stock: 7,
    images: [
      "/uploads/categories/necklace.jpe",
      "/uploads/products/1751631828_6867c7d4eedf9.jpg",
      "/uploads/products/1751631828_6867c7d4ef155.jpg"
    ],
    category: "Necklaces",
    tag: "Trending",
    size: "16-inch adjustable dori",
    dimensions: "45mm Pendant Width",
    material: "22K Gold Micron Plating",
    stones: "Emerald and Polki Kundan",
    gross_weight: 38.50,
    metal_weight: 31.00,
    stone_weight: 7.50,
    additional_info: "Anti-tarnish electrocoat finish with velvet lined display case.",
    rating: 4.8,
    reviewCount: 29,
    created_at: "2025-09-18T10:14:00"
  },
  {
    id: 3,
    title: "Celestial Diamond Cascade Drop Earrings",
    description: "Brilliant tear-drop diamond chandelier earrings that gracefully catch the ambient light. Perfect for evening cocktail soirees, weddings, and red-carpet moments.",
    price: 1299.00,
    originalPrice: 1999.00,
    stock: 22,
    images: [
      "/uploads/categories/earrings.jpe",
      "/uploads/products/1751020188_685e729c643b0.jpeg",
      "/uploads/products/1751024352_685e82e0be1dc.jpeg"
    ],
    category: "Earrings",
    tag: "Bestseller",
    size: "4.8 cm Length",
    dimensions: "48mm x 18mm",
    material: "925 Sterling Silver",
    stones: "Solitaire Cut Zirconia",
    gross_weight: 8.60,
    metal_weight: 7.20,
    stone_weight: 1.40,
    additional_info: "Hypoallergenic push-back closure. Certified 925 Hallmark stamped.",
    rating: 5.0,
    reviewCount: 56,
    created_at: "2025-09-15T08:30:00"
  },
  {
    id: 4,
    title: "Infinity Link Solitaire Tennis Bracelet",
    description: "Continuous brilliance featuring 42 round brilliant-cut stones individually set in four-prong basket mounts. Features an ultra-secure double-safety foldover clasp.",
    price: 999.00,
    originalPrice: 1499.00,
    stock: 14,
    images: [
      "/uploads/categories/braclet.jpe",
      "/uploads/products/1751092069_685f8b650cee4.jpg",
      "/uploads/products/1751024724_685e84540f40e.jpeg"
    ],
    category: "Bracelets",
    tag: "Featured",
    size: "7.0 inches (17.8 cm)",
    dimensions: "4mm Width",
    material: "18K White Gold Finish",
    stones: "Moissanite Crystals",
    gross_weight: 12.40,
    metal_weight: 9.80,
    stone_weight: 2.60,
    additional_info: "Water-resistant coating with luxury travel pouch included.",
    rating: 4.7,
    reviewCount: 31,
    created_at: "2025-09-12T14:20:00"
  },
  {
    id: 5,
    title: "Gleaming Solitaire Heart Pendant with Chain",
    description: "An evocative tribute to romance. A sparkling heart-cut stone encased in a pave halo setting, suspended gracefully from an Italian 18-inch box chain.",
    price: 599.00,
    originalPrice: 999.00,
    stock: 25,
    images: [
      "/uploads/categories/pendant.jpe",
      "/uploads/pendant_id_1.jpe",
      "/uploads/1749452904_303.jpg"
    ],
    category: "Pendants",
    tag: "Bestseller",
    size: "18-inch Chain Included",
    dimensions: "16mm x 14mm",
    material: "Rose Gold Polish",
    stones: "AAA Grade Cubic Zirconia",
    gross_weight: 5.10,
    metal_weight: 4.30,
    stone_weight: 0.80,
    additional_info: "Includes complimentary 18K rose gold-toned delicate box chain.",
    rating: 4.9,
    reviewCount: 64,
    created_at: "2025-09-10T11:00:00"
  },
  {
    id: 6,
    title: "Handcrafted 22K Classic Gold Rope Chain",
    description: "Pure traditional Indian craftsmanship. Intricate twisted rope links engineered for maximum shine, flexibility, and lifelong durability.",
    price: 5295.00,
    originalPrice: 6500.00,
    stock: 5,
    images: [
      "/uploads/categories/gold-chain.jpg",
      "/uploads/1748947340_CAD1240006.JPG",
      "/uploads/1749452596_CAD290001.jpg"
    ],
    category: "Gold Chains",
    tag: "New",
    size: "22 inches",
    dimensions: "3.5mm link gauge",
    material: "22K Gold Plated Brass",
    stones: "None",
    gross_weight: 18.00,
    metal_weight: 18.00,
    stone_weight: 0.00,
    additional_info: "Sturdy lobster claw clasp with reinforced jump rings.",
    rating: 4.8,
    reviewCount: 19,
    created_at: "2025-09-08T15:45:00"
  },
  {
    id: 7,
    title: "Artisanal Carved Peacock Bridal Kada",
    description: "Majestic peacock finials encrusted with ruby-red stones and green enamel accents. Hand-engraved floral arabesques on the solid body with side-screw hinge for effortless wear.",
    price: 2499.00,
    originalPrice: 3200.00,
    stock: 8,
    images: [
      "/uploads/categories/kada.jpe",
      "/uploads/categories/bangle.jpe",
      "/uploads/gauraa.webp"
    ],
    category: "Kada",
    tag: "Featured",
    size: "2.6 (Medium-Large)",
    dimensions: "60mm Inner Diameter",
    material: "Antique Gold Brass",
    stones: "Ruby & Zirconia",
    gross_weight: 42.00,
    metal_weight: 38.50,
    stone_weight: 3.50,
    additional_info: "Traditional Jaipur Meenakari and Jadau stone setting technique.",
    rating: 4.9,
    reviewCount: 23,
    created_at: "2025-09-05T09:10:00"
  },
  {
    id: 8,
    title: "Divine Lord Ganesha Gold Idol Artifact",
    description: "Blessing Lord Ganesha idol crafted with intricate divine ornaments, seated on a blossoming lotus pedestal. Ideal for sacred home altars, car dashboards, and auspicious gifting.",
    price: 1699.00,
    originalPrice: 2299.00,
    stock: 12,
    images: [
      "/uploads/categories/gold-idol.jpe",
      "/uploads/1749452753_CAD250001re.jpg",
      "/uploads/gauraa2.jpe"
    ],
    category: "Gold Idol",
    tag: "Bestseller",
    size: "Height: 3.5 inches",
    dimensions: "85mm x 55mm x 40mm",
    material: "Gold Leaf Electroformed Brass",
    stones: "Ruby Crystal Accent",
    gross_weight: 165.00,
    metal_weight: 165.00,
    stone_weight: 0.00,
    additional_info: "Comes in a transparent acrylic display box with velvet base.",
    rating: 5.0,
    reviewCount: 38,
    created_at: "2025-09-02T16:00:00"
  },
  {
    id: 9,
    title: "Customized Name Pendant in Calligraphy Script",
    description: "Express your unique identity or gift someone special with our bespoke CAD customized name necklace. Precision laser-cut in graceful calligraphy script with high-gloss mirror shine.",
    price: 899.00,
    originalPrice: 1299.00,
    stock: 50,
    images: [
      "/uploads/categories/customized.jpe",
      "/uploads/products/1750420720_68554cf05ae95.png",
      "/uploads/products/1750420720_68554cf05bae2.png"
    ],
    category: "Name Pendants",
    tag: "Trending",
    size: "16-18 inch adjustable",
    dimensions: "Variable (Approx 35mm)",
    material: "925 Silver / 18K Gold Plated",
    stones: "Optional Zircon Dot",
    gross_weight: 4.80,
    metal_weight: 4.80,
    stone_weight: 0.00,
    additional_info: "Custom made to order. Supports English and Hindi scripts.",
    rating: 4.9,
    reviewCount: 78,
    created_at: "2025-08-28T13:30:00"
  },
  {
    id: 10,
    title: "Traditional Sacred Mangalsutra with Black Beads",
    description: "Symbol of holy marital union. Features a dual-row black bead chain with a handcrafted floral diamond pendant centerpiece.",
    price: 1899.00,
    originalPrice: 2699.00,
    stock: 15,
    images: [
      "/uploads/categories/mangalsutra.jpe",
      "/uploads/products/1751972426_686cfa4a91a6f.jpg",
      "/uploads/products/1751972426_686cfa4a91d61.jpg"
    ],
    category: "Mangalsutras",
    tag: "Bestseller",
    size: "18 inches",
    dimensions: "22mm Centerpiece",
    material: "22K Gold Plated Alloy",
    stones: "American Diamond",
    gross_weight: 9.50,
    metal_weight: 7.80,
    stone_weight: 1.70,
    additional_info: "Double row auspicious black spinel beads on high-tensile wire.",
    rating: 4.8,
    reviewCount: 35,
    created_at: "2025-08-25T11:45:00"
  },
  {
    id: 11,
    title: "Luminous Floral Diamond Nose Pin",
    description: "A delicate 7-stone floral blossom nose stud with a secure screw-back mechanism. Lightweight and engineered for sensitive skin.",
    price: 349.00,
    originalPrice: 599.00,
    stock: 30,
    images: [
      "/uploads/categories/nose-pin.jpe",
      "/uploads/products/1751972805_686cfbc59f186.jpg",
      "/uploads/products/1751972805_686cfbc59f45b.jpg"
    ],
    category: "Nose Pin",
    tag: "Featured",
    size: "Standard Piercing Gauge",
    dimensions: "5.5mm Flower",
    material: "18K Solid Gold Look Brass",
    stones: "Micro Pave Zirconia",
    gross_weight: 0.80,
    metal_weight: 0.60,
    stone_weight: 0.20,
    additional_info: "Smooth comfort screw-back post for daily effortless wear.",
    rating: 4.7,
    reviewCount: 22,
    created_at: "2025-08-20T17:15:00"
  },
  {
    id: 12,
    title: "Auspicious Silver Ghungroo Payal Anklet Pair",
    description: "Melodious Indian silver anklets adorned with sweet chiming ghungroos and delicate bell charms. Rhodium coated for lifetime anti-tarnish luster.",
    price: 799.00,
    originalPrice: 1199.00,
    stock: 16,
    images: [
      "/uploads/categories/anklet.webp",
      "/uploads/products/1751973061_686cfcc512875.jpg",
      "/uploads/products/1751973061_686cfcc512b9b.jpg"
    ],
    category: "Anklets",
    tag: "New",
    size: "10 inches each (Pair of 2)",
    dimensions: "6mm Band Width",
    material: "925 Sterling Silver Plated",
    stones: "None",
    gross_weight: 24.00,
    metal_weight: 24.00,
    stone_weight: 0.00,
    additional_info: "Sold as a matched pair with traditional S-hook clasp.",
    rating: 4.9,
    reviewCount: 41,
    created_at: "2025-08-15T14:00:00"
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    product_id: 1,
    name: "Pooja Sharma",
    rating: 5,
    comment: "The aquamarine color is breathtaking! Looks exactly like solid gold fine jewelry. The packaging was top-notch.",
    created_at: "2025-09-22T14:20:00",
    verified: true
  },
  {
    id: "rev-2",
    product_id: 1,
    name: "Ritu Khandelwal",
    rating: 5,
    comment: "Ordered this for my engagement anniversary. My husband loved the sparkle. Delivery in Jaipur was within 2 days!",
    created_at: "2025-09-21T18:10:00",
    verified: true
  },
  {
    id: "rev-3",
    product_id: 2,
    name: "Ananya Deshmukh",
    rating: 5,
    comment: "Wore this royal choker for my cousin's wedding. Got compliments all evening. The green stones look ultra-luxurious.",
    created_at: "2025-09-19T11:45:00",
    verified: true
  },
  {
    id: "rev-4",
    product_id: 3,
    name: "Meera Sen",
    rating: 5,
    comment: "Lightweight on the ears despite the generous chandelier drop. Super comfortable all night long.",
    created_at: "2025-09-16T19:30:00",
    verified: true
  },
  {
    id: "rev-5",
    product_id: 5,
    name: "Sneha Patel",
    rating: 5,
    comment: "The heart pendant is my daily go-to accessory now. Does not tarnish even with everyday wear.",
    created_at: "2025-09-12T16:05:00",
    verified: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1",
    order_number: "MB20250830A213AE",
    user_id: 2,
    name: "Ayushi Agrawal",
    phone: "9694410462",
    email: "beingayushi13@gmail.com",
    address: "B-14 Malviya Nagar, Near World Trade Park",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302017",
    payment_method: "COD",
    subtotal: 5295.00,
    gst: 158.85,
    shipping: 0.00,
    making: 529.50,
    discount: 0.00,
    grand_total: 5983.35,
    payment_status: "Pending",
    order_status: "Delivered",
    items: [
      {
        product_id: 6,
        title: "Handcrafted 22K Classic Gold Rope Chain",
        price: 5295.00,
        quantity: 1,
        image: "/uploads/categories/gold-chain.jpg"
      }
    ],
    created_at: "2025-08-30T14:28:32"
  },
  {
    id: "ord-2",
    order_number: "MB20250831CEE4F3",
    user_id: 2,
    name: "Ayush Agrawal",
    phone: "8685865868",
    email: "manbharcadjewellery22@gmail.com",
    address: "44 Johari Bazaar, Pink City",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302003",
    payment_method: "UPI",
    subtotal: 999.00,
    gst: 29.97,
    shipping: 50.00,
    making: 99.90,
    discount: 0.00,
    grand_total: 1178.87,
    payment_status: "Paid",
    order_status: "Shipped",
    items: [
      {
        product_id: 4,
        title: "Infinity Link Solitaire Tennis Bracelet",
        price: 999.00,
        quantity: 1,
        image: "/uploads/categories/braclet.jpe"
      }
    ],
    created_at: "2025-08-31T03:46:33"
  }
];

export const INITIAL_USER: User = {
  id: 2,
  name: "Ayush Agrawal",
  email: "manbharcadjewellery22@gmail.com",
  phone: "7828298545",
  role: "admin"
};
