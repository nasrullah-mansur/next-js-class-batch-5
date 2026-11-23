
"use client";

import { CounterButton } from "@/components/counter-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useCartStore } from "@/providers/cartProvider";
import { ProductType } from "@/types/product";
import { generateEightDigitNumber } from "@/utils/genarateEightDigitsNumber";
import { product_discount } from "@/utils/product_discount";
import { productPriceAfterDiscount } from "@/utils/product_price_after_discount";
import { product_price_range } from "@/utils/product_price_range";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type PriceAndSizeType = { id: number; count: number; price: number; size: string; }

export default function ProductDetails({ product }: { product: ProductType }) {
    const [orderBtnActive, setOrderBtnActive] = useState(true);

    const [price_and_size, setPrice_and_size] = useState<PriceAndSizeType[]>([
        // {
        //     "id": 4,
        //     "count": 1,
        //     "price": 1100,
        //     "size": "M"
        // }
    ]);

    const { carts, addToCart } = useCartStore((state) => state)


    // console.log(price_and_size, carts);




    const checkCheckboxActive = (id: number) => {
        const isExistOnState = price_and_size.find(item => item.id === id);

        if (isExistOnState) {
            return true;
        } else {
            return false;
        }
    }

    const handleCheckChanged = (id: number, price: number, size: string) => {
        const isExistOnState = price_and_size.find(item => item.id === id);

        if (isExistOnState) {
            return setPrice_and_size((prev) => {
                return prev.filter(item => item.id != id);
            })

        }

        return setPrice_and_size([
            ...price_and_size,
            {
                id: id,
                count: 1,
                price,
                size,
            }
        ])

    }

    const handleUpdateCount = (id: number, count: number) => {
        setPrice_and_size((prev) => {
            return prev.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        count,
                    }
                }

                return item;
            });
        })
    }

    // Handle Order;

    const orderDemoData = {
        product_id: 4,
        price_and_size: [
            {
                id: 4,
                count: 2,
            },
            {
                id: 2,
                count: 1,
            }
        ]
    }

    const handleOrder = () => {
        setOrderBtnActive(false);
        if (price_and_size.length === 0) {
            toast.error("Please select a size first then order");
            setOrderBtnActive(true);
        }
    }

    const handleAddToCart = () => {
        setOrderBtnActive(false);
        if (price_and_size.length === 0) {
            toast.error("Please select a size first then order");
            setOrderBtnActive(true);
        }

        price_and_size.forEach(item => {

            addToCart({
                id: generateEightDigitNumber(),
                product_id: product.id,
                price_and_size_id: item.id,
                title: product.title,
                image: product.image,
                mainPrice: item.price,
                discountPrice: productPriceAfterDiscount(item.price, product.discount, product.discount_type),
                size: item.size,
                discount: product.discount,
                discount_type: product.discount_type,
                quantity: item.count
            })


        })



        setOrderBtnActive(true);
    }


    useEffect(() => {



    }, []);


    return (
        <>
            <h1 className="text-5xl">{product.title}</h1>
            <p className="mt-10 text-lg">${product_price_range(product.price_and_size)} <span className="text-xs">({product_discount(product.discount, product.discount_type)})</span></p>

            <ul className="mt-6 flex flex-wrap gap-2">
                {product.price_and_size.map(item => (
                    <li key={item.id} className={`border p-3 rounded-sm ${checkCheckboxActive(item.id) == true ? "border-gray-500" : "border-gray-200"}`}>
                        <div className="flex items-center gap-x-2">
                            <Checkbox onCheckedChange={() => handleCheckChanged(item.id, item.price, item.size)} checked={checkCheckboxActive(item.id)} id={`size-${item.id}`} />
                            <Label htmlFor={`size-${item.id}`}>
                                {`Size: ${item.size}, price: ${productPriceAfterDiscount(item.price, product.discount, product.discount_type)}`}

                                <span className="line-through">({item.price})</span>
                            </Label>
                        </div>

                        {checkCheckboxActive(item.id) &&
                            <div className="mt-3 flex items-center gap-2">
                                <span>Quantity: </span>
                                <CounterButton min={1} initialCount={1} onChange={(count) => handleUpdateCount(item.id, count)} />
                            </div>
                        }
                    </li>
                ))}
            </ul>





            <div className="grid grid-cols-2 gap-3 mt-8">
                <Button disabled={!orderBtnActive} onClick={handleOrder} className={"w-full"}>
                    {!orderBtnActive && <Spinner />}
                    <span>{!orderBtnActive ? "Processing, please wait ..." : "Order Now"}</span>
                </Button>
                <Button disabled={!orderBtnActive} className={"w-full"} onClick={handleAddToCart}>

                    {!orderBtnActive && <Spinner />}
                    <span>{!orderBtnActive ? "Processing, please wait ..." : "Add To Cart"}</span>

                </Button>
            </div>
        </>
    )
}
