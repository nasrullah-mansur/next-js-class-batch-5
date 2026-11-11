/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function Products() {

    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    return (
        <div>

            {data.map((item: any) => (
                <div key={item.id}>{item.title}</div>
            ))}

        </div>
    )
}
