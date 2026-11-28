/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadToCloudinary } from "@/src/lib/cloudinary-upload";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";



export async function POST(request: Request) {

    const cookie = await cookies();
    const db = createClient(cookie);


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


                if (priceError) {
                    return Response.json({
                        status: false,
                        message: "price data uploading failed",
                    })
                }


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
