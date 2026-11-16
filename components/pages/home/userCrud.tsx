/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, type FormEvent } from "react";

export default function UserCrud() {
    const [users, setUsers] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    })

    const db = createClient();


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const { data, error } = await db.from('users')
        //     .insert(formData)
        //     .select();


        // if (!error) {
        //     setUsers((prev) => {
        //         return [
        //             ...data,
        //             ...prev,
        //         ]
        //     })

        //     setFormData({
        //         email: "",
        //         name: ""
        //     })
        // }

        const res = await fetch('http://localhost:3000/api', {
            method: "POSt",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const responseData = await res.json();

        if (responseData.status) {
            setUsers((prev) => {
                return [
                    ...responseData.data,
                    ...prev,
                ]
            })

            setFormData({
                email: "",
                name: ""
            })
        }



    }


    useEffect(() => {


        const getData = async () => {
            const { data } = await db.from('users').select().order("id", { ascending: false });

            setUsers(data as any[]);

        }

        getData();


    }, [db]);




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Your name here" className="border p-2" />
                <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="Your email here" className="border p-2" />

                <button type="submit">Submit</button>
            </form>
            <ul>
                {users && users.map(user => (
                    <li className="border p-2" key={user.id}>
                        <p>{user.name}</p>
                        <p>{user.email}</p>

                        <Button variant={"destructive"}>Delete</Button>
                        <Button variant={"default"}>Edit</Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
