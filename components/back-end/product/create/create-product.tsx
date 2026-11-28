"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { productSize } from "@/data/produt-size";
import {
    createProductSchema,
    type createProductFormValues,
} from "@/lib/validations/product-schema";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { FileUploader } from "@/components/ui/file-uploader";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function CreateProductForm() {
    const router = useRouter();

    const form = useForm<createProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            title: "",
            slug: "",
            image: undefined,
            product_image_gallery: [{ src: undefined, alt: "" }],
            featured: false,
            price_and_size: [{ size: "M", price: 0 }],
            discount: 0,
            discount_type: "percent",
            short_description: "",
            details: "",
        },
    });

    const {
        fields: galleryFields,
        append: appendGallery,
        remove: removeGallery,
    } = useFieldArray({
        control: form.control,
        name: "product_image_gallery",
    });

    const {
        fields: priceFields,
        append: appendPrice,
        remove: removePrice,
    } = useFieldArray({
        control: form.control,
        name: "price_and_size",
    });

    const onSubmit = async (data: createProductFormValues) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("featured", String(data.featured));
        formData.append("discount", String(data.discount));
        formData.append("discount_type", data.discount_type);
        formData.append("short_description", data.short_description);
        formData.append("details", data.details);
        formData.append("price_and_size", JSON.stringify(data.price_and_size));

        if (data.image) {
            formData.append("image", data.image);
        }

        data.product_image_gallery?.forEach(({ src }) => {
            if (src) formData.append("product_image_gallery", src);
        });

        const response = await fetch("/api/product", {
            method: "POST",
            body: formData,
        });

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.status) {
            toast.success(responseData.message);
            form.reset();
            router.push("/back-end/products");
        }
    };

    const errors = form.formState.errors;

    return (
        <form
            id="create-product-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
            {/* Basic Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Enter your product details.</CardDescription>
                </CardHeader>

                <CardContent>
                    <FieldGroup>
                        <Field data-invalid={!!errors.title}>
                            <FieldLabel htmlFor="product-title">Product Title</FieldLabel>
                            <Input
                                id="product-title"
                                placeholder="Enter product title"
                                aria-invalid={!!errors.title}
                                {...form.register("title")}
                            />
                            {errors.title && <FieldError errors={[errors.title]} />}
                        </Field>

                        <Field data-invalid={!!errors.slug}>
                            <FieldLabel htmlFor="product-slug">Product Slug</FieldLabel>
                            <Input
                                id="product-slug"
                                placeholder="product-slug"
                                aria-invalid={!!errors.slug}
                                {...form.register("slug")}
                            />
                            <FieldDescription>
                                Example: premium-cotton-panjabi
                            </FieldDescription>
                            {errors.slug && <FieldError errors={[errors.slug]} />}
                        </Field>

                        <Controller
                            name="image"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Main Product Image</FieldLabel>
                                    <FileUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                        maxSize={MAX_IMAGE_SIZE}
                                    />
                                    {field.value && (
                                        <p className="text-sm text-muted-foreground">
                                            {field.value.name}
                                        </p>
                                    )}
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="featured"
                            control={form.control}
                            render={({ field }) => (
                                <Field
                                    orientation="horizontal"
                                    className="rounded-md border p-4"
                                >
                                    <Checkbox
                                        id="product-featured"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <div className="space-y-1">
                                        <FieldLabel htmlFor="product-featured">
                                            Featured Product
                                        </FieldLabel>
                                        <FieldDescription>
                                            Display this product as a featured item.
                                        </FieldDescription>
                                    </div>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </CardContent>
            </Card>

            {/* Product Gallery */}
            <Card>
                <CardHeader>
                    <CardTitle>Product Image Gallery</CardTitle>
                    <CardDescription>Add multiple product images.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {galleryFields.map((item, index) => (
                        <div key={item.id} className="flex items-start gap-3">
                            <div className="flex-1">
                                <Controller
                                    name={`product_image_gallery.${index}.src`}
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Gallery Image {index + 1}</FieldLabel>
                                            <FileUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                                maxSize={MAX_IMAGE_SIZE}
                                            />
                                            {field.value instanceof File && (
                                                <p className="text-sm text-muted-foreground">
                                                    {field.value.name}
                                                </p>
                                            )}
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => removeGallery(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => appendGallery({ src: undefined, alt: "" })}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Gallery Image
                    </Button>
                </CardContent>
            </Card>

            {/* Size and Price */}
            <Card>
                <CardHeader>
                    <CardTitle>Size & Pricing</CardTitle>
                    <CardDescription>
                        Set different prices for different sizes.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <FieldGroup>
                        {priceFields.map((item, index) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-1 gap-4 rounded-md border p-4 sm:grid-cols-[1fr_1fr_auto]"
                            >
                                <Controller
                                    name={`price_and_size.${index}.size`}
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Size</FieldLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger aria-invalid={fieldState.invalid}>
                                                    <SelectValue placeholder="Select size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {productSize.map((size) => (
                                                        <SelectItem key={size} value={size}>
                                                            {size}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name={`price_and_size.${index}.price`}
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Price (৳)</FieldLabel>
                                            <Input
                                                type="number"
                                                min="1"
                                                placeholder="1000"
                                                value={field.value ?? ""}
                                                onChange={(event) =>
                                                    field.onChange(
                                                        event.target.value === ""
                                                            ? undefined
                                                            : Number(event.target.value),
                                                    )
                                                }
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <div className="flex items-end">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        disabled={priceFields.length === 1}
                                        onClick={() => removePrice(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </FieldGroup>

                    <Button
                        type="button"
                        variant="outline"
                        className="mt-4"
                        onClick={() => appendPrice({ size: "M", price: 0 })}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Size & Price
                    </Button>

                    {errors.price_and_size?.message && (
                        <p className="mt-2 text-sm text-destructive">
                            {errors.price_and_size.message}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Discount */}
            <Card>
                <CardHeader>
                    <CardTitle>Discount Information</CardTitle>
                    <CardDescription>Configure product discounts.</CardDescription>
                </CardHeader>

                <CardContent>
                    <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Controller
                            name="discount"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Discount Value</FieldLabel>
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="10"
                                        value={field.value ?? ""}
                                        onChange={(event) =>
                                            field.onChange(
                                                event.target.value === ""
                                                    ? undefined
                                                    : Number(event.target.value),
                                            )
                                        }
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="discount_type"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Discount Type</FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder="Select discount type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="percent">Percentage (%)</SelectItem>
                                            <SelectItem value="fixed">Fixed Amount (৳)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </CardContent>
            </Card>

            {/* Description */}
            <Card>
                <CardHeader>
                    <CardTitle>Product Description</CardTitle>
                    <CardDescription>
                        Write your product descriptions and details.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <FieldGroup>
                        <Field data-invalid={!!errors.short_description}>
                            <FieldLabel>Short Description</FieldLabel>
                            <Textarea
                                rows={3}
                                placeholder="Write a short product description..."
                                aria-invalid={!!errors.short_description}
                                {...form.register("short_description")}
                            />
                            {errors.short_description && (
                                <FieldError errors={[errors.short_description]} />
                            )}
                        </Field>

                        <Field data-invalid={!!errors.details}>
                            <FieldLabel>Product Details</FieldLabel>
                            <Textarea
                                rows={6}
                                placeholder="Write complete product details..."
                                aria-invalid={!!errors.details}
                                {...form.register("details")}
                            />
                            {errors.details && <FieldError errors={[errors.details]} />}
                        </Field>
                    </FieldGroup>
                </CardContent>
            </Card>

            {/* Form Actions */}
            <Card>
                <CardFooter className="justify-end gap-3 pt-6">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>

                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Creating..." : "Create Product"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
