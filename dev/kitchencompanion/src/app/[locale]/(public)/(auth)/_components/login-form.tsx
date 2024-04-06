"use client";

import { z } from "zod";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useState, useTransition, useRef } from "react";
import { PulseLoader } from "react-spinners";

import { login } from "@/app/[locale]/(public)/(auth)/_actions/login";
import { RedirectButton } from "@/components/redirect-button";
import { LoginSchema } from "@/lib/validation";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    setError(undefined);
    setSuccess(undefined);

    const email = ref.current?.elements.namedItem("email") as HTMLInputElement;
    const password = ref.current?.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    const userInfo: z.infer<typeof LoginSchema> = {
      email: email.value,
      password: password.value,
    };

    startTransition(async () => {
      login(userInfo).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
      });
    });
  };

  return (
    <>
      <RedirectButton href='/register'>
        <Button
          className='absolute right-4 top-4 md:right-8 md:top-8'
          variant={"link"}>
          Enregistrement
        </Button>
      </RedirectButton>
      <div className='flex flex-col justify-center min-w-[500px]'>
        <CardHeader className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>Connexion</h1>
          <p className='text-sm text-muted'>
            Entrez votre adresse courriel et votre mot de passe
          </p>
        </CardHeader>
        <CardContent>
          <form
            className='grid gap-2'
            ref={ref}
            action={onSubmit}>
            <div className='relative'>
              <Label
                className='sr-only'
                htmlFor='email'>
                Courriel
              </Label>
              <Input
                placeholder='nom@example.com'
                type='email'
                name='email'
                disabled={isPending}
              />
            </div>
            <div className='relative'>
              <Label
                className='sr-only'
                htmlFor='password'>
                Mot de passe
              </Label>
              <Input
                placeholder='Mot de passe'
                type='password'
                name='password'
                disabled={isPending}
              />
            </div>

            {error !== undefined && <FormError error={error} />}
            {success !== undefined && <FormSuccess success={success} />}

            <Button
              variant={"default"}
              type='submit'
              disabled={isPending}>
              {isPending ? <PulseLoader size={5} /> : "Connexion"}
            </Button>
            <div>
              <p className='text-[0.75rem] text-center font-normal text-muted'>
                Vous n'avez pas de compte?{" "}
                <Link
                  className='underline italic font-semibold'
                  href='/register'>
                  Inscrivez-vous!
                </Link>
              </p>
              <p className='px-5 text-[0.7rem] text-muted text-center'>
                <Link
                  className='underline italic font-semibold'
                  href='/forgot-password'>
                  Mot de passe oublié?
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </div>
    </>
  );
}
