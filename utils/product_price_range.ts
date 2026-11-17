
// priceArr: ProductPriceType[]

import { ProductPriceType } from "@/types/product_price";

export const product_price_range = (priceArr: ProductPriceType[]) => {

    if (priceArr.length == 1) {
        return `${priceArr[0].price}`;
    }



    const prices = priceArr.map(data => data.price); // "1200"

    return `${Math.min(...prices)} - ${Math.max(...prices)}`; // "1200 - 1400"



}