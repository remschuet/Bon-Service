"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { dev_getAllKitchen } from "@/db/data-access/user";
import { useTransition } from "react";
import React, { useState } from "react";

import { revalidatePath } from "next/cache";
import { Kitchen } from "@prisma/client";
import {
  actionCreateKitchenWhenUserCreate,
  actionDestroyKitchenAndMore,
} from "@/app/(public)/test/kitchen/_action/kitchen-action";

export function KitchenForm() {
  const [isPending, startTransition] = useTransition();
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);

  console.log("kitchen form");

  async function handleRemoveDefaultKitchen(formData: FormData) {
    const userId = formData.get("userId") as string;
    await actionDestroyKitchenAndMore(userId);
  }

  async function handleCreateDefaultKitchen(formData: FormData) {
    const userId = formData.get("userId") as string;

    startTransition(async () => {
      if (userId !== null) {
        actionCreateKitchenWhenUserCreate(userId);
      }
    });
  }

  async function handleCreateKitchen(formData: FormData) {
    const newKitchen = {
      userId: formData.get("userId") as string,
      name: formData.get("name") as string,
      costObjective: parseInt(formData.get("costObj") as string),
    };
    console.log("kitchen creation");

    startTransition(async () => {
      if (newKitchen) {
        // actionCreateKitchenWhenUserCreate(newKitchen as Kitchen);
      }
    });
  }

  return (
    <Card className="w-[350px] h-[450px] grid place-content-center">
      <CardHeader>Create Kitchens</CardHeader>
      <CardContent>
        <form action={handleCreateDefaultKitchen} className="grid gap-2">
          <input
            type="text"
            name="userId"
            id="userId"
            placeholder="Enter userId"
          />
          <Button type="submit">Create kitchen When user created</Button>
        </form>
        <form action={handleRemoveDefaultKitchen} className="grid gap-2">
          <input
            type="text"
            name="userId"
            id="userId"
            placeholder="Enter userId"
          />
          <Button type="submit">Remove kitchen and all default value</Button>
        </form>
      </CardContent>

      <CardHeader>Create Kitchens</CardHeader>
      <CardContent>
        <form action={handleCreateKitchen} className="grid gap-2">
          <input
            type="text"
            name="userId"
            id="userId"
            placeholder="Enter userId"
          />
          <input type="text" name="name" id="name" placeholder="Enter name" />
          <input
            type="text"
            name="costObj"
            id="costObj"
            placeholder="Enter costObj"
          />
          <Button type="submit">Create kitchen</Button>
        </form>

        <CardHeader>Display all Kitchen (DEV MODE)</CardHeader>
        <ul></ul>

        <CardHeader>Display all Kitchen Julien</CardHeader>
        <ul></ul>
      </CardContent>
    </Card>
  );
}
