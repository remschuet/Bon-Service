import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createKitchen } from "@/data_access/kitchen";
import { dev_getAllKitchen, getKitchensByAdminById } from "@/data_access/user";

import { revalidatePath } from "next/cache";
import { Kitchen } from "@prisma/client";

export async function LinkKitchenUser() {
    return (<>SALT</>);
}