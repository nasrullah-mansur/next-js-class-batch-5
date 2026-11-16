'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function addUser(formData: FormData) {


    const cookieStore = await cookies();

    const db = createClient(cookieStore);

    const name = formData.get('name');
    const email = formData.get('email');


    const { error, data } = await db.from('users')
        .insert({
            name, email
        }).select();



}


