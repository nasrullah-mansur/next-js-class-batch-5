import LatestProduct from "@/components/front-end/pages/home/latest-product";
import { ProductType } from "@/types/product";


export const products: ProductType[] = [
  {
    id: 1,
    title: "Premium Cotton Panjabi",
    slug: "premium-cotton-panjabi",
    image: "/products/panjabi-img.png",
    featured: true,
    price_and_size: [
      { id: 1, product_id: 1, size: "M", price: 1200 },
      { id: 2, product_id: 1, size: "L", price: 1300 },
      { id: 3, product_id: 1, size: "XL", price: 1400 }
    ],
    discount: 10,
    discount_type: "percent",
    short_description: "Comfortable premium cotton panjabi for everyday wear.",
    details: "Made with high-quality cotton fabric, featuring a stylish design and comfortable fitting."
  },
  {
    id: 2,
    title: "Classic White Panjabi",
    slug: "classic-white-panjabi",
    image: "/products/panjabi-img.png",
    featured: true,
    price_and_size: [
      { id: 4, product_id: 2, size: "M", price: 1100 },
      { id: 5, product_id: 2, size: "L", price: 1200 },
      { id: 6, product_id: 2, size: "XL", price: 1300 }
    ],
    discount: 15,
    discount_type: "percent",
    short_description: "Elegant white panjabi with a timeless look.",
    details: "A classic white panjabi suitable for Eid, Jummah, and special occasions."
  },
  {
    id: 3,
    title: "Black Premium Panjabi",
    slug: "black-premium-panjabi",
    image: "/products/panjabi-img.png",
    featured: false,
    price_and_size: [
      { id: 7, product_id: 3, size: "M", price: 1500 },
      { id: 8, product_id: 3, size: "L", price: 1600 },
      { id: 9, product_id: 3, size: "XL", price: 1700 }
    ],
    discount: 200,
    discount_type: "fixed",
    short_description: "Stylish black panjabi with premium finishing.",
    details: "Designed with premium fabric, elegant buttons, and a modern collar."
  },
  {
    id: 4,
    title: "Navy Blue Casual Panjabi",
    slug: "navy-blue-casual-panjabi",
    image: "/products/panjabi-img.png",
    featured: false,
    price_and_size: [
      { id: 10, product_id: 4, size: "M", price: 1000 },
      { id: 11, product_id: 4, size: "L", price: 1100 },
      { id: 12, product_id: 4, size: "XL", price: 1200 }
    ],
    discount: 5,
    discount_type: "percent",
    short_description: "A casual navy blue panjabi for daily use.",
    details: "Lightweight and breathable fabric with a comfortable regular fit."
  },
  {
    id: 5,
    title: "Maroon Eid Special Panjabi",
    slug: "maroon-eid-special-panjabi",
    image: "/products/panjabi-img.png",
    featured: true,
    price_and_size: [
      { id: 13, product_id: 5, size: "M", price: 1800 },
      { id: 14, product_id: 5, size: "L", price: 1900 },
      { id: 15, product_id: 5, size: "XL", price: 2000 }
    ],
    discount: 15,
    discount_type: "percent",
    short_description: "Beautiful maroon panjabi for Eid celebrations.",
    details: "An elegant festive panjabi with beautiful embroidery and premium stitching."
  },
  {
    id: 6,
    title: "Olive Green Panjabi",
    slug: "olive-green-panjabi",
    image: "/products/panjabi-img.png",
    featured: false,
    price_and_size: [
      { id: 16, product_id: 6, size: "M", price: 1250 },
      { id: 17, product_id: 6, size: "L", price: 1350 },
      { id: 18, product_id: 6, size: "XL", price: 1450 }
    ],
    discount: 100,
    discount_type: "fixed",
    short_description: "Trendy olive green panjabi with a modern design.",
    details: "A fashionable panjabi made from soft fabric with excellent stitching quality."
  },
  {
    id: 7,
    title: "Sky Blue Cotton Panjabi",
    slug: "sky-blue-cotton-panjabi",
    image: "/products/panjabi-img.png",
    featured: false,
    price_and_size: [
      { id: 19, product_id: 7, size: "M", price: 1150 },
      { id: 20, product_id: 7, size: "L", price: 1250 },
      { id: 21, product_id: 7, size: "XL", price: 1350 }
    ],
    discount: 10,
    discount_type: "percent",
    short_description: "Fresh sky blue cotton panjabi for a smart look.",
    details: "Soft cotton fabric with a minimal design, ideal for casual and formal occasions."
  },
  {
    id: 8,
    title: "Ash Grey Formal Panjabi",
    slug: "ash-grey-formal-panjabi",
    image: "/products/panjabi-img.png",
    featured: true,
    price_and_size: [
      { id: 22, product_id: 8, size: "M", price: 1600 },
      { id: 23, product_id: 8, size: "L", price: 1700 },
      { id: 24, product_id: 8, size: "XL", price: 1800 }
    ],
    discount: 200,
    discount_type: "fixed",
    short_description: "Sophisticated ash grey panjabi for formal events.",
    details: "A premium formal panjabi featuring a clean design and refined finishing."
  }
];





export default function Home() {
  return (
    <>
      <LatestProduct products={products} />
      {/* <FeaturedProducts products={products} /> */}
    </>
  )
}
