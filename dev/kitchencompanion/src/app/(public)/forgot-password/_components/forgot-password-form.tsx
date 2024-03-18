"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { PulseLoader } from "react-spinners";
import { RedirectButton } from "@/components/redirect-button";
import { Label } from "@/components/ui/label";

import { useState, useTransition, useRef } from "react";

import { PasswordResetSchema } from "@/lib/validation";
import { sendPasswordResetToken } from "@/app/(public)/forgot-password/_actions/forgot-password";

export function ForgotPasswordForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  async function onSubmit() {
    setError(undefined);
    setSuccess(undefined);

    const email = ref.current?.elements.namedItem("email") as HTMLInputElement;

    const userEmail: z.infer<typeof PasswordResetSchema> = {
      email: email.value,
    };

    startTransition(async () => {
      sendPasswordResetToken(userEmail).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
      });
    });
  }

  return (
    <>
      <RedirectButton href='/login'>
        <Button
          className='absolute right-4 top-4 md:right-8 md:top-8'
          variant={"link"}>
          Connexion
        </Button>
      </RedirectButton>
      <div className='flex flex-col justify-center w-[500px]'>
        <CardHeader className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Mot de passe oublié?
          </h1>
          <p className='text-sm text-muted-foreground'>
            Entrez votre adresse courriel
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

            {error !== undefined && <FormError error={error} />}
            {success !== undefined && <FormSuccess success={success} />}

            <Button
              className='mt-4'
              variant={"default"}
              type='submit'
              disabled={isPending}>
              {isPending ? (
                <PulseLoader size={5} />
              ) : (
                "Réinitialiser le mot de passe"
              )}
            </Button>
          </form>
        </CardContent>
      </div>
    </>
  );
}
