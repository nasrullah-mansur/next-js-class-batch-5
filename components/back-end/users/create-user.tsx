/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";


export type UserType = {
    id: number;
    name: string;
    email: string;
};

type Props = {
    onCreate: (user: UserType) => void;
    onUpdate: (user: UserType) => void;
    updateUser: UserType | null;
    onClear: () => void;
};

export default function CreateUser({
    onCreate,
    onUpdate,
    updateUser,
    onClear,
}: Props) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const db = createClient();

    useEffect(() => {
        if (updateUser) {
            setName(updateUser.name);
            setEmail(updateUser.email);
            setOpen(true);
        }
    }, [updateUser]);

    const handleModalOpenChange = (value: boolean) => {
        setOpen(value);

        if (!value) {
            setName("");
            setEmail("");
            setErrorMessage("");
            onClear();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) return;

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            if (updateUser) {
                const { data, error } = await db
                    .from("users")
                    .update({
                        name: name.trim(),
                        email: email.trim(),
                    })
                    .eq("id", updateUser.id)
                    .select()
                    .single();

                if (error) {
                    throw error

                }

                onUpdate(data);
            } else {
                const { data, error } = await db
                    .from("users")
                    .insert({
                        name: name.trim(),
                        email: email.trim(),
                    })
                    .select()
                    .single();

                if (error) throw error;

                onCreate(data);
            }

            handleModalOpenChange(false);

        } catch (error) {
            console.error(error);
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={handleModalOpenChange}
        >
            <DialogTrigger render={<Button>Create User</Button>} />

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {updateUser ? "Update User" : "Create User"}
                    </DialogTitle>

                    <DialogDescription>
                        Manage user information.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="e.g. Alice Johnson"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="e.g. alice@example.com"
                            required
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Saving..."
                            : updateUser
                                ? "Update User"
                                : "Add User"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
