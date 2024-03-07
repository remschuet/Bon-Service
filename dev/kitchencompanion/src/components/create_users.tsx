import { User } from "@/server/type";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { createUser } from "@/server/db/dao_user";
import { revalidatePath } from "next/cache";

export function CreateUser() {

    async function handleCreateUser(formData: FormData){
        'use server'
        const newUser:User = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }

        await createUser(newUser);
        revalidatePath("/");

    }

    return(
        <Card className="w-[350px] h-[450px] grid place-content-center">
            <CardHeader>Create User</CardHeader>
            <CardContent>
                <form action={handleCreateUser}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <Button type="submit">Create User</Button>
                </form>
            </CardContent>
        </Card>
    );
}