

export async function GET() {




    return Response.json({
        status: true,
        message: "Data retrieved successful",
        data: [
            {
                id: 1,
                name: "product one",
                price: 100
            },
            {
                id: 1,
                name: "product one",
                price: 100
            },
        ]
    });


}