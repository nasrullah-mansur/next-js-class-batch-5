"use client";

import CreateUser from '@/components/back-end/users/create-user';
import UserTable from '@/components/back-end/users/user-table';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type UserType = { id: number; name: string; email: string }

export default function UsersClient() {

    const [users, setUsers] = useState<UserType[]>([]);
    const db = createClient()

    useEffect(() => {


        async function getData() {
            const { data, error } = await db.from('users').select().order('id', { ascending: false })

            if (!error) {
                setUsers(data);
            }
        }

        getData();


    }, [db])

    const handleCreate = (user: UserType) => {
        setUsers((prev) => {
            return [
                user,
                ...prev
            ]
        })
    }

    return (
        <div>

            <div className="flex justify-between items-center mb-8">

                <h1 className="font-semibold text-2xl">Our Users</h1>
                <CreateUser onCreate={handleCreate} />
            </div>

            <div className="rounded-md border">
                <UserTable users={users} />
            </div>

        </div>
    )
}
