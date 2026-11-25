import "server-only";

import cloudinary from "@/src/lib/cloudinary";

interface UploadOptions {
    folder?: string;
    publicId?: string;
    overwrite?: boolean;
}

export async function uploadToCloudinary(
    file: File,
    options: UploadOptions = {}
) {
    const {
        folder = "products",
        publicId,
        overwrite = false,
    } = options;

    // Validate file
    if (!file || file.size === 0) {
        throw new Error("Please provide a valid image file");
    }

    // Validate file size (5 MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
        throw new Error("Image size must be less than 5 MB");
    }

    // Validate image type
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPEG, PNG and WebP images are allowed");
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder,
                public_id: publicId,
                overwrite,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (!result) {
                    reject(new Error("Cloudinary upload failed"));
                    return;
                }

                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                    format: result.format,
                    width: result.width,
                    height: result.height,
                    bytes: result.bytes,
                });
            }
        ).end(buffer);
    });
}