import { ProductPriceType } from "@/types/product_price";


export type ProductType = {
    id: number;
    title: string;
    slug: string;
    image: string;
    featured: boolean;
    price_and_size: ProductPriceType[];
    discount: number;
    discount_type: "percent" | "fixed";
    short_description: string;
    details: string;
}