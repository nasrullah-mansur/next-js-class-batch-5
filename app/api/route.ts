import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {


    return Response.json({
        name: "this is name"
    }, {
        status: 201
    });


}



export async function POST(request: Request) {

    // const formData = await request.formData()
    // const name = formData.get('name')
    // const email = formData.get('email')


    // return NextResponse.json({ name, email })

    const cookieStore = await cookies();

    const db = createClient(cookieStore);

    const formInputs = await request.json();

    const { error, data } = await db.from('users')
        .insert(formInputs).select();

    if (error) {
        return Response.json({
            status: false,
            message: "Something wrong",
            error: error
        })
    }

    return Response.json({
        status: true,
        message: "Data added successfully",
        data: data
    })

}

