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
import { useSession } from "@/hooks/useSession";

export function UpdatePassword() {
  const { id } = useSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Changer votre mot de passe</CardTitle>
        <CardDescription>
          Si vous pensez que votre mot de passe a été compromis, vous pouvez le
          changer ici.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className='space-y-2'>
          <Input
            name='userId'
            type='hidden'
            value={id}
          />
          <div className='space-y-2'>
            <Label className='font-semibold'>Ancien mot de passe</Label>
            <Input
              type='password'
              placeholder='Votre ancient mot de passe'
            />
          </div>
          <div className='space-y-2'>
            <Label className='font-semibold'>Nouveau mot de passe</Label>
            <Input
              name='newPassword'
              type='password'
              placeholder='Nouveau mot de passe'
            />
            <Input
              type='password'
              placeholder='Confirmer le nouveau mot de passe'
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className='border-t px-6 py-4'>
        <Button>Confirmer</Button>
      </CardFooter>
    </Card>
  );
}
