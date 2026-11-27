/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadToCloudinary } from "@/src/lib/cloudinary-upload";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";



export async function POST(request: Request) {

    const cookie = await cookies();
    const db = createClient(cookie);

    /**
     * 1. Upload product data to products table
     * 2. Upload product image and get image URL
     * 3. Upload product gallery image and get URL then upload image info to product_galleries
     * 4. Upload price and size to database named product_price_and_size / product_variants
     */

    /* 
        export type ProductType = {
            id: number;
            title: string;
            slug: string;
            image: string;
            featured: boolean;
            price_and_size: ProductPriceType[];
            product_galleries?: ProductImageType[];
            discount: number;
            discount_type: "percent" | "fixed";
            short_description: string;
            details?: string;
        }

        export type ProductPriceType = {
            id: number;
            product_id: number;
            size: string;
            price: number;
        }

        export type ProductImageType = {
            id: number;
            src: string;
            alt: string;
            product_id: string;
        }

        1. upload product image to cludinary;
        2. upload product to database and get product id;
        3 / 4. upload product price and type to database / upload product image to database;
    
        */

    const formData = await request.formData();



    const image = formData.get('image');


    const price_and_size = JSON.parse(formData.get('price_and_size') as string);
    const product_image_gallery = formData.getAll('product_image_gallery');

    console.log(product_image_gallery);





    if (image) {

        const responseFromCloudinary: any = await uploadToCloudinary((image as File), {
            folder: "logo",
            publicId: "logo",
            overwrite: true
        })


        if (responseFromCloudinary.url) {

            const uploadableProduct = {
                title: formData.get('title'),
                slug: formData.get('slug'),
                image: responseFromCloudinary.url,
                featured: formData.get('featured') ? Boolean(formData.get('featured')) : false,
                // price_and_size: ProductPriceType[];
                // product_galleries?: ProductImageType[];
                discount: formData.get('discount'),
                discount_type: formData.get('discount_type'),
                short_description: formData.get('short_description'),
                details: formData.get('details'),
            }

            const { data: productData, error } = await db.from('products')
                .insert(uploadableProduct)
                .select()
                .single();


            if (!error) {

                const { data: priceData, error: priceError } = await db.from('product_prices')
                    .insert(price_and_size.map((product: any) => (
                        {
                            ...product,
                            product_id: productData.id,
                        }
                    )))
                    .select();


                product_image_gallery.forEach(async (imageFileFromFormData: any) => {

                    if (imageFileFromFormData) {
                        const responseCloudinary: any = await uploadToCloudinary((image as File), {
                            folder: "logo",
                            publicId: "logo",
                            overwrite: true
                        })

                        if (responseCloudinary.url) {

                            const { data, error } = await db.from('product_images')
                                .insert({
                                    src: responseCloudinary.url,
                                    alt: "product image",
                                    product_id: productData.id,
                                })

                        }
                    }


                });

            }



        }



    }


    return Response.json({
        status: true,
        message: "Data added successfully"
    }, { status: 201 })


}
