"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserInformation } from "@/hooks/useUserInformation";

export function UpdateInformation() {
  const { userInformation } = useUserInformation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modifiez vos informations personnelles</CardTitle>
        <CardDescription>
          Vous pouvez modifier vos informations personnelles telles que votre
          nom, votre adresse, votre numéro de téléphone, etc.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div className='space-y-2'>
            <Label className='font-semibold'>Nom</Label>
            <Input
              type='text'
              placeholder={userInformation.name}
            />
          </div>
          <div className='space-y-2'>
            <Label className='font-semibold'>Avatar</Label>
            <Input
              type='file'
              name='image'
              id='image'
              accept='image/jpeg, image/png'
            />
          </div>
          <div className='space-y-2'>
            <Label className='font-semibold'>Numéro de téléphone</Label>
            <Input
              type='text'
              placeholder={
                !userInformation.phone
                  ? "Entrez votre numéro de téléphone"
                  : userInformation.phone
              }
            />
          </div>
          <div className='space-y-2'>
            <Label className='font-semibold'>Adresse</Label>
            <Input
              type='text'
              placeholder={
                !userInformation.address
                  ? "Entrez votre adresse"
                  : userInformation.address
              }
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className='border-t px-6 py-4'>
        <Button disabled>Sauvegarder</Button>
      </CardFooter>
    </Card>
  );
}
