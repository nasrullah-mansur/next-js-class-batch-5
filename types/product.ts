import { ProductImageType } from "@/types/product_image";
import { ProductPriceType } from "@/types/product_price";


export type ProductType = {
    id: number;
    title: string;
    slug: string;
    image: string;
    featured: boolean;
    price_and_size: ProductPriceType[];
    product_prices: ProductPriceType[];
    product_galleries?: ProductImageType[];
    product_images?: ProductImageType[];
    discount: number;
    discount_type: "percent" | "fixed";
    short_description: string;
    details?: string;
}