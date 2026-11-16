import { addUser } from "@/app/api/actions";

export default function About() {
    return (
        <div>


            <form action={addUser}>
                <input className="border" name="name" type="text" placeholder="Your name" />
                <input className="border" name="email" type="email" placeholder="Your email" />
                <button type="submit">Add User</button>
            </form>


        </div>
    )
}
