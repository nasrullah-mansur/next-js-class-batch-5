import { uploadToCloudinary } from "@/src/lib/cloudinary-upload";


export async function POST(request: Request) {

    const formData = await request.formData();

    const image = formData.get('image');

    if (image) {

        const data = await uploadToCloudinary((image as File), {
            folder: "logo",
            publicId: "logo",
            overwrite: true
        })

        console.log(data);



    }


    return Response.json({
        status: true,
        data: formData
    })


}
