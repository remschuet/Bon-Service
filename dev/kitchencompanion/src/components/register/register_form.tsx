import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { createUser } from "@/data_access/user";
import { Card, CardContent, CardHeader } from "../ui/card";

export function RegisterForm() {
  async function handleCreateUser(formData: FormData) {
    "use server";

    const newUser = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    await createUser(newUser as User);
    revalidatePath("/");
  }

  return (
    <div className='relative h-[100vh] md:grid lg:max-w-none lg:grid-cols-3 lg:px-0'>
      <Button
        className='absolute right-4 top-4 md:right-8 md:top-8'
        variant={"link"}>
        Connexion
      </Button>
      <div className='h-full flex-col bg-stone-700 p-12 text-white lg:flex dark:border-r'>
        <div className='text-xl font-medium'>Kitchen Companion</div>
        <div className='mt-auto'>
          <blockquote className=' max-w-[70%] space-y-2'>
            <p className='text-lg'>
              “Grace à Kitchen Companion j'arrive à concacrer plus de temps à
              l'élaboration de mes menus et moins de temps à la gestion de ma
              cuisine.”
            </p>
            <p className='text-sm'>Normand Laprise</p>
          </blockquote>
        </div>
      </div>
      <div className='lg:px-8 grid place-content-center col-span-2'>
        <Card className='p-8 flex w-full flex-col justify-center space-y-6 sm:min-w-[350px]'>
          <CardHeader className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Créer un compte
            </h1>
            <p className='text-sm text-muted-foreground'>
              Entrez votre adresse courriel pour créer un compte
            </p>
          </CardHeader>
          <CardContent className='grid gap-6'>
            <form
              action={handleCreateUser}
              className='grid gap-6'>
              <div className='grid gap-1.5'>
                <Label
                  className='sr-only'
                  htmlFor='email'>
                  Courriel
                </Label>
                <Input
                  id='email'
                  placeholder='nom@example.com'
                  type='email'
                  name='email'
                />
                <Label
                  className='sr-only'
                  htmlFor='password'>
                  Mot de passe
                </Label>
                <Input
                  id='password'
                  placeholder='Mot de passe'
                  type='password'
                  name='password'
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex gap-3'>
                  <Checkbox id='terms' />
                  <Label
                    className='text-[0.8rem]'
                    htmlFor='terms'>
                    J'accèpte les conditions d'utilisation
                  </Label>
                </div>
                <div className='flex gap-3'>
                  <Checkbox id='privacy' />
                  <Label
                    className='text-[0.8rem]'
                    htmlFor='privacy'>
                    J'accèpte la politique de confidentialité
                  </Label>
                </div>
              </div>
              <Button
                variant={"default"}
                type='submit'>
                Inscription
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
