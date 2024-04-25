"use client";

import { useRef, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { PulseLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { RedirectButton } from "@/components/redirect-button";

import { passwordReset } from "@/app/[locale]/(public)/(auth)/_actions/password-reset-action";
import { partialRegistrationSchema } from "@/lib/validation";

export function PasswordResetForm() {
  const param = useSearchParams();
  const token = param.get("token");

  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    setError(undefined);
    setSuccess(undefined);

    if (!token) {
      setError("Le jeton de réinitialisation n'existe pas.");
      return;
    }

    const password = ref.current?.elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const passwordConfirmation = ref.current?.elements.namedItem(
      "password-confirmation"
    ) as HTMLInputElement;

    if (password.value !== passwordConfirmation.value) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const result = partialRegistrationSchema.safeParse({
      password: password.value,
    });

    if (!result.success) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    startTransition(async () => {
      passwordReset(token, password.value).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
      });
    });
  };

  return (
    <>
      <RedirectButton href="/login">
        <Button
          className="absolute right-4 top-4 md:right-8 md:top-8"
          variant={"link"}
        >
          Connexion
        </Button>
      </RedirectButton>
      <div className="flex flex-col justify-center w-[500px]">
        <CardHeader className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Changez votre mot de passe
          </h1>
          <p className="text-sm text-muted">Entrez un nouveau mot de passe</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-2" ref={ref} action={onSubmit}>
            <div className="relative">
              <Label className="sr-only" htmlFor="password">
                Mot de passe
              </Label>
              <Input
                placeholder="Nouveau mot de passe"
                type="password"
                name="password"
                disabled={isPending}
              />
            </div>
            <div className="relative">
              <Label className="sr-only" htmlFor="password">
                Confirmation mot de passe
              </Label>
              <Input
                placeholder="Confirmer mot de passe"
                type="password"
                name="password-confirmation"
                disabled={isPending}
              />
            </div>

            {error !== undefined && <FormError error={error} />}
            {success !== undefined && <FormSuccess success={success} />}

            <Button
              className="mt-4"
              variant={"default"}
              type="submit"
              disabled={isPending}
            >
              {isPending ? <PulseLoader size={5} /> : "Confirmer"}
            </Button>
          </form>
        </CardContent>
      </div>
    </>
  );
}
