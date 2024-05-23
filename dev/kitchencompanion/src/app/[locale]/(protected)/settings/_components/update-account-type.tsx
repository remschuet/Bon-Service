"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function UpdateAccountType() {
  function updateAccountType() {
    console.log("updateAccountType");
  }
  return (
    <Card>
      <CardHeader className='space-y-2'>
        <CardTitle>
          Vous souhaitez passer à un compte{" "}
          <span className='italic'>Chef </span>?
        </CardTitle>
        <CardDescription className='space-y-2'>
          Vous pouvez passer à un compte Chef pour accéder à plus de
          fonctionnalités, telles que la gestion des cuisines, des recettes, des
          contacts, etc.
        </CardDescription>
      </CardHeader>
      <CardFooter className='border-t px-6 py-4'>
        <Button onClick={updateAccountType}>Changer de type de compte</Button>
      </CardFooter>
    </Card>
  );
}
