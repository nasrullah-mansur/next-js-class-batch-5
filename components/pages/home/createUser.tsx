"use client";

import { createClient } from "@/utils/supabase/client";

export default function CreateUser() {

    const db = createClient()

    const handleClick = async () => {

        const { error, data } = await db.from("users")
            .insert([
                {
                    name: "another name",
                    email: "two40@email.com"
                },
                {
                    name: "another name",
                    email: "two50@email.com"
                }
            ])
            .select();

        console.log(error, data);


    }

    const deleteUserHandler = async () => {
        const { data } = await db.from('users')
            .delete()
            .eq('id', 10)
            .select();
    }

    return (
        <div>
            <button onClick={handleClick}>Add user</button>
            <button onClick={deleteUserHandler}>Delete User</button>
        </div>
    )
}
