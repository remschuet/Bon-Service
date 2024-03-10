"use client";

import { User } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RegisterResponse, register } from "@/app/actions/register";
import Link from "next/link";

import { registrationSchema } from "@/validation/schema";

import { useToast } from "@/components/ui/use-toast";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const ref = useRef<HTMLFormElement>(null);

  async function handleRegistetration(formdata: FormData) {
    // TODO: Ici on va vouloir faire une validation des champs
    // regex pour le courriel et le password, s'assurer que les champs sont pas vides

    const user = {
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
      confirmPassword: formdata.get("password-confirmation") as string,
    };

    // On utilise le schema zod pour valider le email et le password.
    const result = registrationSchema.safeParse(user);

    if (result.success) {
      await register({
        email: result.data.email,
        password: result.data.email,
      } as User).then((data: RegisterResponse | undefined = {}) => {
        if (data.error) {
          toast({
            variant: "destructive",
            title: "Oups! Quelque chose s'est mal passé.",
            description: data.error,
          });

          ref.current?.reset();
        } else {
          setRegistrationSuccessful(true);
        }
      });
    }
  }

  function handleRedirect() {
    router.push("/");
  }

  if (registrationSuccessful) {
    return (
      <div className='grid place-items-center gap-5'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Votre compte à été créé!
        </h1>
        <p className='text-sm text-muted-foreground'>
          Veuillez vérifier votre courriel pour activer votre compte
        </p>
        <Button
          variant={"outline"}
          onClick={handleRedirect}>
          Accéder à mon portail
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center lg:max-w-[500px] sm:min-w-[350px] '>
      <CardHeader className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Créer un compte
        </h1>
        <p className='text-sm text-muted-foreground'>
          Entrez votre adresse courriel pour créer un compte
        </p>
      </CardHeader>
      <CardContent>
        <form
          className='grid gap-6'
          ref={ref}
          action={handleRegistetration}>
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
            <div className='flex gap-1.5'>
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
              <Label
                className='sr-only'
                htmlFor='password-confirmation'>
                Confirmation Mot de Passe
              </Label>
              <Input
                id='password'
                placeholder='Confirmer le mot de passe'
                type='password'
                name='password-confirmation'
                variant={passwordMatch ? "success" : "destructive"}
              />
            </div>
          </div>
          <Button
            variant={"default"}
            type='submit'>
            Inscription
          </Button>
          <div className='flex gap-3 w-[60%] mx-auto text-center'>
            <p className='text-[0.75rem]'>
              En cliquant sur{" "}
              <span className='font-semibold italic'>Inscription</span> vous
              acceptez nos{" "}
              <Link
                href='/terms'
                className='underline'>
                {" "}
                conditions d'utilisation{" "}
              </Link>
              et notre{" "}
              <Link
                className='underline'
                href='/privacy'>
                politique de confidentialité
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
