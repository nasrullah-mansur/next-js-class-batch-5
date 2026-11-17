import ProductCart from "@/components/front-end/shared/produt-cart";
import Container from "@/components/ui/container";
import { ProductType } from "@/types/product";

export default function LatestProduct({ products }: { products: ProductType[] }) {
    return (
        <Container>

            <h1 className="py-10 font-bold text-4xl text-center">Our latest Products</h1>




            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {products.map(product => (
                    <ProductCart product={product} key={product.id} />
                ))}
            </div>

        </Container>
    )
}
