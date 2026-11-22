
export type CartType = {
    id: number;
    product_id: number;
    price_and_size_id: number;
    title: string;
    image: string;
    mainPrice: number;
    discountPrice: number;
    size: string;
    discount: number;
    discount_type: "percent" | "fixed";
    quantity: number;
}