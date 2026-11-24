
"use client";

import CreateUser from '@/components/back-end/users/create-user';
import UserTable from '@/components/back-end/users/user-table';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useMemo, useState } from 'react';

export type UserType = {
    id: number;
    name: string;
    email: string;
};

export default function UsersClient() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [updateUser, setUpdateUser] = useState<UserType | null>(null);

    const db = useMemo(() => createClient(), []);

    useEffect(() => {
        async function getData() {
            const { data, error } = await db
                .from('users')
                .select('*')
                .order('id', { ascending: false });

            if (error) {
                console.error(error.message);
                return;
            }

            setUsers(data ?? []);
        }

        getData();
    }, [db]);

    const handleCreate = (user: UserType) => {
        setUsers(prev => [user, ...prev]);
    };

    const handleUpdate = (user: UserType) => {
        setUsers(prev =>
            prev.map(item => item.id === user.id ? user : item)
        );

        setUpdateUser(null);
    };

    const handleEdit = async (id: number) => {
        const { data, error } = await db
            .from('users')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            console.error(error.message);
            return;
        }

        if (data) {
            setUpdateUser(data);
        }
    };

    const handleClear = () => {
        setUpdateUser(null);
    };

    const handleDelete = async (id: number) => {

        const isConfirm = confirm("are you sure you want to delete it?");

        if (!isConfirm) return;

        const { error } = await db.from("users").delete()
            .eq('id', id).select();

        if (!error) {
            setUsers(users.filter(user => user.id != id));
        }


    }


    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-semibold text-2xl">
                    Our Users
                </h1>

                <CreateUser
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    updateUser={updateUser}
                    onClear={handleClear}
                />
            </div>

            <div className="rounded-md border">
                <UserTable
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    users={users}
                />
            </div>
        </div>
    );
}
