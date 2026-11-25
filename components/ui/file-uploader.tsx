/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ImagePlus, UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";

interface FileUploaderProps {
    value?: File;
    onChange: (file?: File) => void;
    maxSize?: number;
    accept?: Record<string, string[]>;
    disabled?: boolean;
}

export function FileUploader({
    value,
    onChange,
    maxSize = 5 * 1024 * 1024,
    accept = {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
    },
    disabled = false,
}: FileUploaderProps) {
    const [preview, setPreview] = useState<string>();

    // Generate and clean up image preview URL
    useEffect(() => {
        if (!value) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(value);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [value]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
    } = useDropzone({
        accept,
        maxSize,
        multiple: false,
        disabled,
        onDropAccepted: (files) => {
            onChange(files[0]);
        },
    });

    const rejectionMessage = fileRejections[0]?.errors[0]?.message;

    return (
        <div className="space-y-3">
            {preview ? (
                <div className="relative w-full max-w-sm overflow-hidden rounded-lg border bg-muted">
                    <img
                        src={preview}
                        alt="Image preview"
                        className="h-56 w-full object-contain"
                    />

                    <div className="absolute right-2 top-2 flex gap-2">
                        <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => onChange(undefined)}
                            disabled={disabled}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="border-t bg-background p-3">
                        <p className="truncate text-sm font-medium">
                            {value?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {((value?.size ?? 0) / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`
                        flex min-h-48 cursor-pointer flex-col items-center
                        justify-center rounded-lg border-2 border-dashed
                        p-6 text-center transition-colors
                        ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
                        ${isDragReject ? "border-destructive bg-destructive/5" : ""}
                        ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-primary"}
                    `}
                >
                    <input {...getInputProps()} />

                    {isDragActive ? (
                        <UploadCloud className="mb-3 h-10 w-10 text-primary" />
                    ) : (
                        <ImagePlus className="mb-3 h-10 w-10 text-muted-foreground" />
                    )}

                    <p className="text-sm font-medium">
                        {isDragActive
                            ? "Drop your image here"
                            : "Drag & drop an image here"}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        or click to browse from your computer
                    </p>

                    <p className="mt-3 text-xs text-muted-foreground">
                        JPEG, PNG or WebP · Maximum 5 MB
                    </p>
                </div>
            )}

            {rejectionMessage && (
                <p className="text-sm text-destructive">
                    {rejectionMessage}
                </p>
            )}
        </div>
    );
}