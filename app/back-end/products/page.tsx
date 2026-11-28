

import ProductIndex from "@/components/back-end/product/index/product-index";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Products() {




    return (
        <div>
            <div className="flex justify-between py-6">
                <h1 className="text-3xl font-bold">Our Products</h1>
                <Button nativeButton={false} render={
                    <Link href={"/back-end/products/create"}>Create a new product</Link>
                }></Button>
            </div>

            <ProductIndex />
        </div>
    )
}
