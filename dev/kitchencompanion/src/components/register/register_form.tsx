"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RegisterResponse, register } from "@/app/actions/register";
import { User } from "@prisma/client";
import Link from "next/link";
import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    setError("");

    const email = (emailRef.current?.value as string) || "";
    const password = (passwordRef.current?.value as string) || "";

    startTransition(async () => {
      const newUser = {
        email: email as string,
        password: password as string,
      };

      await register(newUser as User).then(
        (data: RegisterResponse | undefined = {}) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRegistrationSuccessful(true);
          }
        }
      );
    });
  }

  function handleRedirect() {
    setRegistrationSuccessful(false);
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
          action={handleSubmit}>
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
              ref={emailRef as any}
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
              ref={passwordRef as any}
            />
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
