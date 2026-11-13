

export async function GET() {


    return Response.json({
        status: true,
        data: {
            id: 1,
            email: "user@email.com",
            phone: "123"
        }
    });


}