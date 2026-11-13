import { getUsers } from "@/utils/modules/getUsers";



export default async function Home() {

  const users = await getUsers();

  return (
    <div>

      {users.map((item: { id: string; name: string }) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  )
}
