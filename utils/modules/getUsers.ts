"use server";

export const getUsers = async () => {
    // 'use cache'
    // cacheLife({
    //     revalidate: 10
    // })

    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        next: {
            revalidate: 10,
        }
    });

    if (!res.ok) {
        return [];
    }

    return await res.json();


}

