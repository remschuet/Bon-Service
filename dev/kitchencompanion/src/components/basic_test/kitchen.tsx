import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createKitchen, dev_getAllKitchen} from "@/data_access/kitchen";
import { revalidatePath } from "next/cache";
import { Kitchen } from "@prisma/client";

export async function CreateKitchen() {

    const kitchens = await dev_getAllKitchen();

    async function handleCreateKitchen(formData: FormData){
        'use server'
        const newKitchen = {
            userId: formData.get("userId") as string,
            name: formData.get("name") as string,
            costObjective: parseInt(formData.get("costObj") as string),
        }

        await createKitchen(newKitchen as Kitchen);
        revalidatePath("/test");
    }

    return(
        <Card className="w-[350px] h-[450px] grid place-content-center">            
            <CardHeader>Create Kitchen</CardHeader>
            <CardContent>
                <form action={handleCreateKitchen} className="grid gap-2">
                    <input type="text" name="userId" id="userId" placeholder="Enter userId" />
                    <input type="text" name="name" id="name" placeholder="Enter name" />
                    <input type="text" name="costObj" id="costObj" placeholder="Enter costObj" />
                    <Button type="submit">Create kitchen</Button>
                </form>
            </CardContent>

            <CardHeader>Display all Kitchen (DEV MODE)</CardHeader>
            <ul>
                {kitchens.map((kitchen) => (
                    <li key={kitchen.id}>{kitchen.name}, " -- " 
                        {kitchen.kitchens.map(()=> (
                            <Button type="submit">Delete</Button>
                        ))}
                    </li>
                ))}
            </ul>

        </Card>
    );
}