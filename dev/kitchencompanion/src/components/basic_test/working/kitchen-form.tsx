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
  actionCreateKitchen,
  actionCreateSupplierSupported,
  actionRemoveSupplierSupported,
} from "@/app/[locale]/(public)/test/kitchen/_action/kitchen-action";
import { createKitchen } from "@/db/data-access/kitchen";

export function KitchenForm() {
  const [isPending, startTransition] = useTransition();
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);

  console.log("kitchen form");

  async function handleRemoveDefaultKitchen(formData: FormData) {
    const userId = formData.get("userId") as string;
    await actionDestroyKitchenAndMore(userId);
  }

  async function handleSupplierSupported() {
    startTransition(async () => {
      actionRemoveSupplierSupported();
      actionCreateSupplierSupported();
    });
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

    startTransition(async () => {
      if (newKitchen) {
        actionCreateKitchen(newKitchen as Kitchen);
      }
    });
  }

  return (
    <>
      <Card className='w-[350px] h-[450px] grid place-content-center'>
        <CardHeader>Init User</CardHeader>
        <CardContent>
          <form
            action={handleCreateDefaultKitchen}
            className='grid gap-2'>
            <input
              type='text'
              name='userId'
              id='userId'
              placeholder='Enter userId'
            />
            <Button type='submit'>
              Init User (default supplier, recipebook)
            </Button>
          </form>
          <form
            action={handleRemoveDefaultKitchen}
            className='grid gap-2'>
            <input
              type='text'
              name='userId'
              id='userId'
              placeholder='Enter userId'
            />
            <Button type='submit'>
              Remove Init User (suppliers, recipebooks)
            </Button>
          </form>
        </CardContent>

        <CardHeader>Create Kitchens</CardHeader>
        <CardContent>
          <form
            action={handleCreateKitchen}
            className='grid gap-2'>
            <input
              type='text'
              name='userId'
              id='userId'
              placeholder='Enter userId'
            />
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter name'
            />
            <input
              type='text'
              name='costObj'
              id='costObj'
              placeholder='Enter costObj'
            />
            <Button type='submit'>Create kitchen</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Create SupplierSupported</CardHeader>
        <CardContent>
          <form
            action={handleSupplierSupported}
            className='grid gap-2'>
            <Button type='submit'>Create SupplierSupported</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
