"use client";

import { accountVerification } from "@/app/(public)/account-verification/_action/account-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PulseLoader } from "react-spinners";
import { Button } from "../ui/button";
import { RedirectButton } from "../redirect-button";

export const AccountVerificationForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const param = useSearchParams();
  const token = param.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Le jeton de vérification n'existe pas.");
      return;
    }

    startTransition(async () => {
      setError(undefined);
      setSuccess(undefined);

      await accountVerification(token)
        .then((result) => {
          setError(result.error);
          setSuccess(result.success);
        })
        .catch(() => {
          setError("Une erreur s'est produite.");
        });
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className='flex flex-col justify-center min-w-[500px] space-y-6'>
      <CardHeader className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Vérification de votre courriel
        </h1>
        {isPending && (
          <p className='italic text-sm text-center text-muted-foreground'>
            Vérification en cours...
          </p>
        )}
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center space-y-12'>
        {isPending && <PulseLoader />}
        {error && error !== undefined && <FormError error={error} />}
        {success && success !== undefined && <FormSuccess success={success} />}
        {!isPending && (
          <RedirectButton href='/login'>
            <Button variant={"link"}>Retour à la page de connexion</Button>
          </RedirectButton>
        )}
      </CardContent>
    </div>
  );
};
