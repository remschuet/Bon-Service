"use client";

import { User } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RegisterResponse, register, userExist } from "@/app/actions/register";
import Link from "next/link";

import { partialRegistrationSchema } from "@/validation/schema";

import { useToast } from "@/components/ui/use-toast";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@/components/icons/check-circle";
import { debounce } from "@/lib/utils";

export function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(
    "default" as "default" | "destructive"
  );
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [validated, setValidated] = useState(false);

  const ref = useRef<HTMLFormElement>(null);

  function handlePasswordValidation() {
    const password = ref.current?.elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const passwordConfirmation = ref.current?.elements.namedItem(
      "password-confirmation"
    ) as HTMLInputElement;

    const result = partialRegistrationSchema.safeParse({
      password: password.value,
    });

    if (password.value !== passwordConfirmation.value || !result.success) {
      setPasswordMatch("destructive");
    } else {
      setPasswordMatch("default");
      setPasswordValid(result.success);
    }
  }

  const handleEmailValidation = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = e.target.value;
      const schemaValidationResult = partialRegistrationSchema.safeParse({
        email: email,
      });

      if (schemaValidationResult.success) {
        const userExists = await userExist(email);
        setEmailValid(!userExists);
      } else {
        setEmailValid(false);
      }
    },
    500
  );

  function handleFormValidation() {
    if (emailValid && passwordValid) {
      setValidated(true);
    }
  }

  async function handleRegistetration(formdata: FormData) {
    const user = {
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
    };

    await register({
      email: user.email,
      password: user.password,
    } as User).then((data: RegisterResponse | undefined = {}) => {
      if (data.error) {
        toast({
          variant: "destructive",
          title: "Oups! Quelque chose s'est mal passé.",
          description: data.error,
        });

        ref.current?.reset();
        setEmailValid(false);
        setPasswordValid(false);
        setValidated(false);
      } else {
        setRegistrationSuccessful(true);
      }
    });
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
          onChange={handleFormValidation}
          action={handleRegistetration}>
          <div className='grid gap-1.5'>
            <div className='relative'>
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
                onChange={handleEmailValidation}
              />
              {emailValid && (
                <CheckCircleIcon className='absolute w-6 h-6 top-2 right-2 text-success-foreground' />
              )}
            </div>
            <div className='flex gap-1.5'>
              <Label
                className='sr-only'
                htmlFor='password'>
                Mot de passe
              </Label>
              <Input
                id='password'
                onChange={handlePasswordValidation}
                placeholder='Mot de passe'
                type='password'
                name='password'
              />
              <div className='relative w-full'>
                <Label
                  className='sr-only'
                  htmlFor='password-confirmation'>
                  Confirmation Mot de Passe
                </Label>
                <Input
                  id='password-confirmation'
                  onChange={handlePasswordValidation}
                  placeholder='Confirmer le mot de passe'
                  type='password'
                  name='password-confirmation'
                  variant={passwordMatch}
                />
                {passwordValid && (
                  <CheckCircleIcon className='absolute w-6 h-6 top-2 right-2 text-success-foreground' />
                )}
              </div>
            </div>
          </div>
          <div>
            <p className='px-5 text-[0.7rem] text-muted-foreground'>
              Votre mot de passe doit contenir au moins 8 caractères, une
              majuscule, une minuscule et un chiffre.
            </p>
          </div>
          <Button
            variant={"default"}
            type='submit'
            disabled={!validated}>
            Inscription
          </Button>
          <div className='flex gap-3 w-[80%] mx-auto text-center'>
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
