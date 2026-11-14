import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";



export default async function Home() {

  const cookieStore = await cookies()
  const db = createClient(cookieStore)

  const { data: users } = await db.from('users').select()

  return (
    <div>

      {users && users.map((item: { id: string; name: string }) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  )
}
