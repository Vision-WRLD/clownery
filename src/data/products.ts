export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  material: string;
  sizes: string[];
  colors: string[];
  badge?: "new" | "sale" | "trending" | "limited";
}

export const products: Product[] = [
  {
    id: 1,
    name: "Kundan Bridal Necklace Set",
    price: 2499.99,
    image: "/images/kundan-necklace.jpg",
    category: "Necklaces",
    description: "A breathtaking kundan bridal necklace set with matching earrings, hand-set in gold-plated brass. The centrepiece features uncut glass polki stones surrounded by delicate pearl drops, perfect for the bride who honours tradition.",
    material: "22k Gold Plated, Kundan, Polki Glass, Freshwater Pearls",
    sizes: ["16\"", "18\"", "20\""],
    colors: ["Gold"],
  },
  {
    id: 2,
    name: "Jhumka Drop Earrings",
    price: 899.99,
    image: "/images/jhumka-earrings.jpg",
    category: "Earrings",
    description: "Classic gold jhumka earrings with intricate filigree bell detailing and tiny pearl accents along the rim. A timeless silhouette that pairs beautifully with any outfit — from a saree to an evening gown.",
    material: "18k Gold Plated, Freshwater Pearls",
    sizes: ["One Size"],
    colors: ["Gold"],
  },
  {
    id: 3,
    name: "Temple Gold Chain Necklace",
    price: 1299.99,
    image: "/images/temple-necklace.jpg",
    category: "Necklaces",
    description: "Inspired by South Indian temple jewellery, this gold chain necklace features Lakshmi coin pendants and delicate Lakshmi motifs. A stunning statement piece that carries blessings wherever you go.",
    material: "22k Yellow Gold Plated, Temple Coin Motifs",
    sizes: ["16\"", "18\"", "20\""],
    colors: ["Gold"],
  },
  {
    id: 4,
    name: "Meenakari Bangle Set",
    price: 3199.99,
    image: "/images/gold-bangles.jpg",
    category: "Bracelets",
    description: "A set of four hand-painted meenakari bangles featuring vibrant enamel work in royal blue, green, and ruby red. Each bangle is a miniature canvas of Rajasthani artistry, finished with 22k gold plating.",
    material: "22k Gold Plated Brass, Meenakari Enamel",
    sizes: ["S", "M", "L"],
    colors: ["Gold", "Rose Gold"],
  },
  {
    id: 5,
    name: "Polki Stackable Rings",
    price: 649.99,
    image: "/images/polki-rings.jpg",
    category: "Rings",
    description: "A set of three delicate stackable rings featuring uncut polki stones set in gold. Wear them together for a bold look or separately for everyday elegance. Each stone is unique — just like you.",
    material: "18k Gold Plated, Polki Uncut Diamonds",
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["Gold"],
  },
  {
    id: 6,
    name: "Chandbali Earrings",
    price: 1799.99,
    image: "/images/chandbali.jpg",
    category: "Earrings",
    description: "Stunning crescent-shaped chandbali earrings encrusted with kundan stones and finished with cascading pearl drops. Inspired by Mughal-era design, these are a showstopper for any festive occasion.",
    material: "22k Gold Plated, Kundan, Freshwater Pearls",
    sizes: ["One Size"],
    colors: ["Gold", "Rose Gold"],
  },
  {
    id: 7,
    name: "Maang Tikka",
    price: 599.99,
    image: "/images/maang-tikka.jpg",
    category: "Necklaces",
    description: "An elegant bridal maang tikka featuring a central emerald-green kundan stone surrounded by seed pearls, suspended from a delicate gold chain. The finishing touch for any bridal or festive look.",
    material: "22k Gold Plated, Kundan, Seed Pearls",
    sizes: ["One Size"],
    colors: ["Gold"],
  },
  {
    id: 8,
    name: "Antique Gold Bangle",
    price: 799.99,
    image: "/images/kada-cuff.jpg",
    category: "Bracelets",
    description: "A bold antique-finish gold bangle with engraved Indian floral motifs and a clean modern silhouette. This piece looks like it was passed down from your grandmother — because that's the feeling we want you to have.",
    material: "Antique Gold Plated Brass",
    sizes: ["S", "M", "L"],
    colors: ["Gold"],
  },
  {
    id: 9,
    name: "Ruby Kundan Rani Haar",
    price: 4299.99,
    image: "/images/rani-haar.jpg",
    category: "Necklaces",
    description: "A magnificent rani haar (queen's necklace) featuring multiple strands of ruby-red kundan stones, interspersed with gold beads and pearl drops. This is a heritage piece — the kind that becomes a family heirloom.",
    material: "22k Gold Plated, Kundan, Ruby Glass, Pearls",
    sizes: ["16\"", "18\"", "20\""],
    colors: ["Gold"],
  },
  {
    id: 10,
    name: "Gold Hoop Jhumka",
    price: 549.99,
    image: "/images/jhumka-earrings.jpg",
    category: "Earrings",
    description: "A modern take on the classic jhumka — gold hoops with delicate dangling bells and tiny beadwork. Light enough for everyday wear, elegant enough for a celebration. The best of both worlds.",
    material: "18k Gold Plated Brass",
    sizes: ["S", "M", "L"],
    colors: ["Gold", "Rose Gold"],
  },
  {
    id: 11,
    name: "Pearl Layered Necklace",
    price: 1899.99,
    image: "/images/pearl-necklace.jpg",
    category: "Necklaces",
    description: "A gorgeous layered pearl necklace with three strands of varying lengths, finished with gold-toned spacer beads and a traditional Indian clasp. Perfect for festive gatherings, weddings, or anytime you want to feel extraordinary.",
    material: "14k Gold Plated, Freshwater Pearls, Glass Beads",
    sizes: ["16\"", "18\"", "20\""],
    colors: ["Gold", "White Gold"],
  },
  {
    id: 12,
    name: "Kada Cuff Bracelet",
    price: 999.99,
    image: "/images/kada-cuff.jpg",
    category: "Bracelets",
    description: "A bold Sikh-inspired kada cuff bracelet in polished gold with engraved details and a clean modern silhouette. Symbolizing strength and unity, this piece carries deep meaning with timeless style.",
    material: "22k Gold Plated Sterling Silver",
    sizes: ["S", "M", "L"],
    colors: ["Gold", "Silver"],
  },
];

export const allSizes = ["5", "6", "7", "8", "9", "S", "M", "L", "One Size", "16\"", "18\"", "20\""];
export const allColors = ["Gold", "Silver", "Rose Gold", "White Gold"];
export const priceRanges = [
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "$1,000 – $2,000", min: 1000, max: 2000 },
  { label: "$2,000 – $3,000", min: 2000, max: 3000 },
  { label: "$3,000+", min: 3000, max: Infinity },
];
