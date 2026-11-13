import { cacheLife } from "next/cache";


export const getUsers = async () => {
    'use cache'
    cacheLife({
        revalidate: 10
    })

    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!res.ok) {
        return [];
    }

    return await res.json();


}

