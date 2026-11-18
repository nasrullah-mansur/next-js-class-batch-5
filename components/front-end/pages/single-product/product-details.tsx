"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductType } from "@/types/product";
import { product_discount } from "@/utils/product_discount";
import { product_price_range } from "@/utils/product_price_range";

export default function ProductDetails({ product }: { product: ProductType }) {
    return (
        <>
            <h1 className="text-5xl">{product.title}</h1>
            <p className="mt-10 text-lg">${product_price_range(product.price_and_size)} <span className="text-xs">({product_discount(product.discount, product.discount_type)})</span></p>

            <ul className="mt-6">
                {product.price_and_size.map(item => (
                    <li key={item.id} className="flex items-center gap-x-2 mb-2">
                        <Checkbox id={`size-${item.id}`} />
                        <Label htmlFor={`size-${item.id}`}>{`Size: ${item.size}, price: ${item.price}`}</Label>
                    </li>
                ))}
            </ul>


            <p>Selected Size is: M</p>


            <div className="grid grid-cols-2 gap-3 mt-8">
                <Button className={"w-full"}>Order Now</Button>
                <Button className={"w-full"}>Add To Cart</Button>
            </div>
        </>
    )
}
