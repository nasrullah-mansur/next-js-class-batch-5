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
import { useState } from "react";

type UserType = { id: number; name: string; email: string }

export default function CreateUser({ onCreate }: { onCreate: (user: UserType) => void }) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        setIsSubmitting(true);
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;

        const db = createClient();

        const { data, error } = await db.from("users").insert({
            name, email
        }).select()

        if (!error) {
            onCreate(data[0])
        }

        setIsSubmitting(false);
        setOpen(false);

        // onSubmit({ name: name.trim(), email: email.trim() });
        // setName("");
        // setEmail("");
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={
                <Button>Create User</Button>
            }>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={"mb-3"}>Are you absolutely sure?</DialogTitle>
                    <DialogDescription render={
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="e.g. Alice Johnson"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="e.g. alice@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Add User"}
                            </Button>
                        </form>
                    }>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
