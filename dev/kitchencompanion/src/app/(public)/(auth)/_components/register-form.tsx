"use client";

import { User } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { register, userExist } from "@/app/(public)/(auth)/_actions/register";
import Link from "next/link";

import { partialRegistrationSchema } from "@/validation/schema";
import { debounce } from "@/lib/utils";

import { useState, useRef, useEffect, useTransition } from "react";

import { BadgeCheck, BadgeAlert } from "lucide-react";
import { RedirectButton } from "@/components/redirect-button";
import { PulseLoader } from "react-spinners";

export function RegisterForm() {
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [formValidated, setFormValidated] = useState(false);
  const [isPending, startTransition] = useTransition();

  const ref = useRef<HTMLFormElement>(null);

  function handlePasswordValidation() {
    const password = ref.current?.elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const passwordConfirmation = ref.current?.elements.namedItem(
      "password-confirmation"
    ) as HTMLInputElement;

    // Si les champs sont vides, on ne valide pas
    if (password.value === "" || passwordConfirmation.value === "") {
      setPasswordValid(null);
      return;
    }

    const result = partialRegistrationSchema.safeParse({
      password: password.value,
    });

    setPasswordValid(
      password.value === passwordConfirmation.value && result.success
    );
  }

  // Debounce la validation du email pour éviter de faire trop de requêtes à la base de données

  const handleEmailValidation = debounce(async (e) => {
    const email = e.target.value;

    // Si le champ est vide, on ne valide pas
    if (email.length === 0) {
      setEmailValid(null);
      return;
    }

    const schemaValidationResult = partialRegistrationSchema.safeParse({
      email: email,
    });

    if (schemaValidationResult.success) {
      const userExists = await userExist(email);
      setEmailValid(!userExists);
    }
  }, 250);

  async function handleRegistetration(formdata: FormData) {
    const user = {
      name: formdata.get("name") as string,
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
    };

    startTransition(async () => {
      register({
        name: user.name,
        email: user.email,
        password: user.password,
      } as User).then((data) => {
        if (data.status === 200) {
          setRegistrationSuccessful(true);
        }
      });
    });
  }

  useEffect(() => {
    if (emailValid === null) return;
    if (passwordValid === null) return;

    setFormValidated(emailValid && passwordValid);
  }, [emailValid, passwordValid]);

  useEffect(() => {
    if (!registrationSuccessful) {
      ref.current?.reset();
      setEmailValid(null);
      setPasswordValid(null);
      setFormValidated(false);
    }
  }, [registrationSuccessful]);

  if (registrationSuccessful) {
    return (
      <>
        <RedirectButton href='/login'>
          <Button
            className='absolute right-4 top-4 md:right-8 md:top-8'
            variant={"link"}>
            Connexion
          </Button>
        </RedirectButton>
        <div className='grid place-items-center gap-5'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Votre compte à été créé!
          </h1>
          <p className='text-sm text-muted-foreground'>
            Veuillez vérifier votre courriel pour activer votre compte
          </p>
        </div>
      </>
    );
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
      <div className='flex flex-col justify-center max-w-[500px]'>
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
              <div className='relative'>
                <Label className='sr-only'>Nom</Label>
                <Input
                  id='name'
                  placeholder='Jean Tremblay'
                  type='text'
                  name='name'
                  disabled={isPending}
                />
              </div>
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
                  disabled={isPending}
                />
                {emailValid && (
                  <BadgeCheck className='absolute w-6 h-6 top-2 right-2 text-success-foreground' />
                )}
                {!emailValid && emailValid !== null && (
                  <BadgeAlert className='absolute w-6 h-6 top-2 right-2 text-destructive' />
                )}
              </div>
              <div className='flex gap-1.5'>
                <div className='w-[50%]'>
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
                    disabled={isPending}
                  />
                </div>
                <div className='relative w-[50%]'>
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
                    disabled={isPending}
                  />

                  {passwordValid && (
                    <BadgeCheck className='absolute w-6 h-6 top-2 right-2 text-success-foreground' />
                  )}
                  {!passwordValid && passwordValid !== null && (
                    <BadgeAlert className='absolute w-6 h-6 top-2 right-2 text-destructive' />
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
              disabled={!formValidated || isPending}>
              {isPending ? <PulseLoader size={5} /> : "Inscription"}
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
    </>
  );
}
