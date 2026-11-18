/* eslint-disable @typescript-eslint/no-unused-vars */
import SlickSlider from "@/components/front-end/pages/single-product/SlickSlider";
import Container from "@/components/ui/container";
import { ProductType } from "@/types/product";
import { ProductImageType } from "@/types/product_image";

import ProductDetailsClient from "@/components/front-end/pages/single-product/product-details";
import ProductCart from "@/components/front-end/shared/produt-cart";


const product: ProductType = {
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
    product_galleries: [
        { id: 1, src: 'https://placehold.co/600x400/222/fff?text=Product+1', alt: 'Product 1' },
        { id: 2, src: 'https://placehold.co/600x400/444/fff?text=Product+2', alt: 'Product 2' },
        { id: 3, src: 'https://placehold.co/600x400/666/fff?text=Product+3', alt: 'Product 3' },
        { id: 4, src: 'https://placehold.co/600x400/888/fff?text=Product+4', alt: 'Product 4' },
        { id: 5, src: 'https://placehold.co/600x400/aaa/000?text=Product+5', alt: 'Product 5' },
    ],
    discount: 15,
    discount_type: "percent",
    short_description: "Elegant white panjabi with a timeless look.",
    details: "A classic white panjabi suitable for Eid, Jummah, and special occasions."
};

export const related_products: ProductType[] = [
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

];


export default async function ProductDetails(
    {
        params
    }: {
        params: Promise<{ slug: string }>
    }) {

    const { slug } = await params;


    const { product_galleries, details, ...rest } = product;


    return (
        <Container className="py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                    <SlickSlider productImages={(product_galleries as ProductImageType[])} />
                </div>
                <div>

                    <ProductDetailsClient product={rest} />

                </div>
            </div>

            <div className="my-20">
                <h3 className="text-3xl">Product Details</h3>
                {details &&
                    <p>details</p>
                }
            </div>

            <div className="mb-20">
                <h3 className="text-3xl">Related Product</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {related_products.map(product => (
                        <ProductCart key={product.id} product={product} />
                    ))}
                </div>


            </div>



        </Container>
    )
}

