
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

// Reusable image validation
const imageFileSchema = z
    .instanceof(File, { message: "Please select an image" })
    .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        "Image size must be less than 5 MB"
    )
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only JPEG, PNG, and WebP images are allowed"
    );

// Product gallery validation
const productImageSchema = z.object({
    id: z.number().optional(),
    src: imageFileSchema
        .optional()
        .refine((file) => file !== undefined, {
            message: "Please select an image",
        }),
    alt: z.string().optional(),
});

// Product size and price validation
const priceAndSizeSchema = z.object({
    id: z.number().int().positive().optional(),
    product_id: z.number().int().positive().optional(),
    size: z.enum(["S", "M", "L", "XL", "XXL"]),
    price: z.number().positive("Price must be greater than 0"),
});

// Main product validation
export const createProductSchema = z.object({
    id: z.number().int().positive().optional(),

    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(150, "Title is too long"),

    slug: z
        .string()
        .min(1, "Slug is required")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),

    image: imageFileSchema,

    product_image_gallery: z
        .array(productImageSchema)
        .min(1, "At least one gallery image is required"),

    featured: z.boolean(),

    price_and_size: z
        .array(priceAndSizeSchema)
        .min(1, "At least one size and price is required"),

    discount: z.number().min(0, "Discount cannot be negative"),

    discount_type: z.enum(["percent", "fixed"]),

    short_description: z
        .string()
        .min(10, "Short description must be at least 10 characters")
        .max(300, "Short description is too long"),

    details: z
        .string()
        .min(10, "Product details must be at least 10 characters"),

}).superRefine((data, ctx) => {
    // Percentage discount cannot exceed 100
    if (data.discount_type === "percent" && data.discount > 100) {
        ctx.addIssue({
            code: "custom",
            path: ["discount"],
            message: "Percentage discount cannot exceed 100",
        });
    }

    // Prevent duplicate sizes
    const sizes = data.price_and_size.map((item) => item.size);

    if (new Set(sizes).size !== sizes.length) {
        ctx.addIssue({
            code: "custom",
            path: ["price_and_size"],
            message: "Duplicate product sizes are not allowed",
        });
    }
});

export type createProductFormValues = z.infer<
    typeof createProductSchema
>;
