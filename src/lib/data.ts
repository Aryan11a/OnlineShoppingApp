export type Listing = {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  description: string;
  sellerId: string;
  seller: string;
  avatar: string;
  phone: string;
  rating: number;
  reviews: number;
  soldCount: number;
  area: string;
  status: "available" | "sold";
  priceNote: string;
  comparablePrice: string;
};

const photo = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const currentSeller = {
  id: "jordan",
  name: "Jordan Davis",
  avatar: photo("photo-1534528741775-53994a69daeb", 160),
  phone: "(917) 555-0128",
};

export const initialListings: Listing[] = [
  {
    id: "chair",
    title: "Mid-century lounge chair",
    price: 145,
    category: "Home",
    condition: "Very good",
    images: [photo("photo-1567538096630-e0c55bd6374c"), photo("photo-1505693416388-ac5ce068fe85")],
    description: "A classic lounge chair in warm walnut and textured oatmeal fabric. Comfortable, sturdy, and ready for a new home. A few subtle marks on the legs; the upholstery is clean.",
    sellerId: "maya",
    seller: "Maya Chen",
    avatar: photo("photo-1534528741775-53994a69daeb", 160),
    phone: "(718) 555-0184",
    rating: 4.9,
    reviews: 28,
    soldCount: 14,
    area: "Brooklyn, 1.2 mi",
    status: "available",
    priceNote: "Good value",
    comparablePrice: "Rs. 180–240 nearby",
  },
  {
    id: "camera",
    title: "Canon AE-1 film camera",
    price: 210,
    category: "Electronics",
    condition: "Excellent",
    images: [photo("photo-1516035069371-29a1b244cc32"), photo("photo-1510127034890-ba27508e9f1c")],
    description: "A well-kept 35mm classic. Light meter works, shutter speeds tested, lens is clean. Includes the original strap and a fresh battery.",
    sellerId: "leo",
    seller: "Leo Martin",
    avatar: photo("photo-1500648767791-00dcc994a43e", 160),
    phone: "(718) 555-0125",
    rating: 5.0,
    reviews: 19,
    soldCount: 9,
    area: "Fort Greene, 2.4 mi",
    status: "available",
    priceNote: "Fair price",
    comparablePrice: "Rs. 200–280 nearby",
  },
  {
    id: "lamp",
    title: "Mushroom glass table lamp",
    price: 68,
    category: "Home",
    condition: "Like new",
    images: [photo("photo-1507473885765-e6ed057f782c"), photo("photo-1507473885765-e6ed057f782c&sat=-20")],
    description: "Soft amber glass with a warm glow. Works perfectly and looks lovely on a bedside table. Bulb included.",
    sellerId: "nina",
    seller: "Nina Brooks",
    avatar: photo("photo-1531123897727-8f129e1688ce", 160),
    phone: "(347) 555-0158",
    rating: 4.8,
    reviews: 35,
    soldCount: 22,
    area: "Park Slope, 3.1 mi",
    status: "available",
    priceNote: "Below average",
    comparablePrice: "Rs. 85–120 nearby",
  },
  {
    id: "tote",
    title: "Everyday leather tote",
    price: 82,
    category: "Fashion",
    condition: "Good",
    images: [photo("photo-1590874103328-eac38a683ce7"), photo("photo-1584917865442-de89df76afd3")],
    description: "Soft, broken-in leather with a roomy interior and a secure zip pocket. Gently used and still in great shape.",
    sellerId: "ava",
    seller: "Ava Patel",
    avatar: photo("photo-1524504388940-b1c1722653e1", 160),
    phone: "(929) 555-0102",
    rating: 4.7,
    reviews: 16,
    soldCount: 7,
    area: "Williamsburg, 2.0 mi",
    status: "available",
    priceNote: "Good value",
    comparablePrice: "Rs. 95–135 nearby",
  },
  {
    id: "record-player",
    title: "Vintage record player",
    price: 125,
    category: "Electronics",
    condition: "Very good",
    images: [photo("photo-1461360228754-6e81c478b882"), photo("photo-1603048588665-791ca8aea617")],
    description: "Tested turntable with a clear, warm sound. Includes dust cover and power cable. Ready to play your favorite records.",
    sellerId: "sam",
    seller: "Sam Rivera",
    avatar: photo("photo-1506794778202-cad84cf45f1d", 160),
    phone: "(718) 555-0179",
    rating: 4.9,
    reviews: 41,
    soldCount: 31,
    area: "Bed-Stuy, 3.8 mi",
    status: "available",
    priceNote: "Fair price",
    comparablePrice: "Rs. 120–175 nearby",
  },
  {
    id: "monstera",
    title: "Large monstera + ceramic pot",
    price: 42,
    category: "Home",
    condition: "Good",
    images: [photo("photo-1614594975525-e45190c55d0b"), photo("photo-1501004318641-b39e6451bec6")],
    description: "A healthy, happy monstera with new leaves and a handmade ceramic pot. Moving soon, so it needs a sunny new spot.",
    sellerId: "jules",
    seller: "Jules Parker",
    avatar: photo("photo-1544005313-94ddf0286df2", 160),
    phone: "(347) 555-0192",
    rating: 4.6,
    reviews: 12,
    soldCount: 4,
    area: "Clinton Hill, 1.8 mi",
    status: "available",
    priceNote: "Local favorite",
    comparablePrice: "Rs. 45–70 nearby",
  },
];

export const categories = ["For you", "Home", "Electronics", "Fashion", "Outdoors", "Books"];
export const formatPrice = (amount: number) => `Rs. ${amount.toLocaleString()}`;
