"use client";

import UserTableRow from "@/components/back-end/users/user-table-row";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type UserType = { id: number; name: string; email: string }

export default function UserTable({ users, onEdit, onDelete }: { users: UserType[], onEdit: (id: number) => void; onDelete: (id: number) => void }) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-[80px] text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users && users.map((user) => (
                    <UserTableRow onDelete={onDelete} onEdit={onEdit} key={user.id} user={user} />
                ))}
            </TableBody>
        </Table>
    )
}
