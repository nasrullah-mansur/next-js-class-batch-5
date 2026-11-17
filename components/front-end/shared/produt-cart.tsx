import { Button } from '@/components/ui/button'
import { ProductType } from '@/types/product'
import { product_discount } from '@/utils/product_discount'
import { product_price_range } from '@/utils/product_price_range'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCart({ product }: { product: ProductType }) {
    return (
        <div className="border p-2">
            <Image
                src={product.image}
                alt={product.title}
                width={640}
                height={800}
                className="w-full"
            />

            <h4>
                <Link className="block font-semibold text-lg py-2" href={"#"}>
                    {product.title}
                </Link>
            </h4>

            <p className="text-sm">${product_price_range(product.price_and_size)} <span className="text-xs">({product_discount(product.discount, product.discount_type)})</span></p>

            <Button className="flex justify-center items-center w-full mt-3 cursor-pointer"
                render={<Link href={"#"}>
                    Order Now
                </Link>}
            >

            </Button>


        </div>
    )
}
