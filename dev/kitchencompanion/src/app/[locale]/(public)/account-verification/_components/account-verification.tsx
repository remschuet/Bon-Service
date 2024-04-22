"use client";

import { accountVerification } from "@/app/[locale]/(public)/account-verification/_actions/account-verification-action";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { CardContent, CardHeader } from "@/components/ui/card";
import { PulseLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { RedirectButton } from "@/components/redirect-button";

export const AccountVerification = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const param = useSearchParams();
  const token = param.get("token");

  const onPageLoad = useCallback(async () => {
    if (!token) {
      setError("Le jeton de vérification n'existe pas.");
      return;
    }

    startTransition(async () => {
      setError(undefined);
      setSuccess(undefined);

      accountVerification(token)
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
    onPageLoad();
  }, [onPageLoad]);

  return (
    <div className="flex flex-col justify-center min-w-[500px] space-y-6">
      <CardHeader className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Vérification</h1>
        {isPending && (
          <p className="text-sm text-center text-muted-foreground">
            Nous vérifions votre addresse courriel.
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-12">
        {isPending && <PulseLoader />}
        {error && error !== undefined && <FormError error={error} />}
        {success && success !== undefined && <FormSuccess success={success} />}
        {!isPending && (
          <RedirectButton href="/login">
            <Button variant={"link"}>Connexion</Button>
          </RedirectButton>
        )}
      </CardContent>
    </div>
  );
};
